import { CATALOG_LIMITS, CatalogError } from './types.js';

/** An element of an XML document: its local name (the namespace prefix dropped), its attributes, its child elements and
 *  the text written directly in it (trimmed, and held to a length — a description document's text is short). */
export interface XmlElement {
  name: string;
  attrs: Record<string, string>;
  children: XmlElement[];
  text: string;
}

const TEXT_CAP = 1_000;

const NAMED: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };

/** An attribute value with its predefined and numeric character references read; any other reference is kept as written. */
function unescape(value: string): string {
  if (!value.includes('&')) return value;
  return value.replace(/&(?:#x([0-9a-fA-F]+)|#([0-9]+)|([a-z]+));/g, (whole, hex: string | undefined, dec: string | undefined, name: string | undefined) => {
    if (name !== undefined) return NAMED[name] ?? whole;
    const code = hex !== undefined ? parseInt(hex, 16) : parseInt(dec!, 10);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
  });
}

const localName = (qualified: string): string => qualified.slice(qualified.indexOf(':') + 1);

/**
 * Reads the elements and attributes of an XML document — all an OData `$metadata` is read for. Text between elements is
 * not kept. Made for a document that comes from outside, so it does less than an XML parser, on purpose: a document
 * type declaration (`<!DOCTYPE>`, with the entities it could define) is refused rather than read, so there is nothing
 * to expand; a character reference is read only in an attribute value; and the size, depth and number of elements are
 * held to the catalog's limits.
 */
export function readXmlElements(text: string): XmlElement {
  if (text.length > CATALOG_LIMITS.documentBytes) throw new CatalogError('the description document is larger than the catalog reads');
  const root: XmlElement = { name: '#document', attrs: {}, children: [], text: '' };
  const open: XmlElement[] = [root];
  let elements = 0;
  let i = 0;
  while (i < text.length) {
    const lt = text.indexOf('<', i);
    if (lt < 0) break;
    const written = text.slice(i, lt).trim();
    if (written !== '') {
      const into = open[open.length - 1]!;
      into.text = `${into.text}${into.text === '' ? '' : ' '}${unescape(written)}`.slice(0, TEXT_CAP);
    }
    if (text.startsWith('<!--', lt)) {
      const end = text.indexOf('-->', lt + 4);
      if (end < 0) throw new CatalogError('the XML description document ends inside a comment');
      i = end + 3;
    } else if (text.startsWith('<![CDATA[', lt)) {
      const end = text.indexOf(']]>', lt + 9);
      if (end < 0) throw new CatalogError('the XML description document ends inside a CDATA section');
      i = end + 3;
    } else if (text.startsWith('<?', lt)) {
      const end = text.indexOf('?>', lt + 2);
      if (end < 0) throw new CatalogError('the XML description document ends inside a processing instruction');
      i = end + 2;
    } else if (text.startsWith('<!', lt)) {
      throw new CatalogError('the XML description document declares a document type — it is not read');
    } else if (text.startsWith('</', lt)) {
      const end = text.indexOf('>', lt + 2);
      if (end < 0) throw new CatalogError('the XML description document ends inside a tag');
      const name = localName(text.slice(lt + 2, end).trim());
      const top = open.pop();
      if (open.length === 0 || top!.name !== name) throw new CatalogError(`the XML description document closes <${name}> where it was not opened`);
      i = end + 1;
    } else {
      const tag = readStartTag(text, lt + 1);
      if (++elements > CATALOG_LIMITS.xmlElements) throw new CatalogError('the XML description document has more elements than the catalog reads');
      const element: XmlElement = { name: tag.name, attrs: tag.attrs, children: [], text: '' };
      open[open.length - 1]!.children.push(element);
      if (!tag.selfClosing) {
        if (open.length > CATALOG_LIMITS.xmlDepth) throw new CatalogError('the XML description document nests deeper than the catalog reads');
        open.push(element);
      }
      i = tag.end;
    }
  }
  if (open.length !== 1) throw new CatalogError(`the XML description document ends inside <${open[open.length - 1]!.name}>`);
  if (root.children.length !== 1) throw new CatalogError('the XML description document has no single root element');
  return root.children[0]!;
}

/** A start tag read from just after its `<`: the element's name and attributes, and where the tag ends. */
function readStartTag(text: string, from: number): { name: string; attrs: Record<string, string>; selfClosing: boolean; end: number } {
  let i = from;
  while (i < text.length && !/[\s/>]/.test(text[i]!)) i++;
  const name = localName(text.slice(from, i));
  if (name === '') throw new CatalogError('the XML description document has a tag with no name');
  const attrs: Record<string, string> = {};
  for (;;) {
    while (i < text.length && /\s/.test(text[i]!)) i++;
    if (i >= text.length) throw new CatalogError('the XML description document ends inside a tag');
    if (text[i] === '>') return { name, attrs, selfClosing: false, end: i + 1 };
    if (text[i] === '/') {
      if (text[i + 1] !== '>') throw new CatalogError(`the XML description document has a stray "/" in <${name}>`);
      return { name, attrs, selfClosing: true, end: i + 2 };
    }
    const nameStart = i;
    while (i < text.length && !/[\s=/>]/.test(text[i]!)) i++;
    const written = text.slice(nameStart, i);
    const attr = localName(written);
    while (i < text.length && /\s/.test(text[i]!)) i++;
    if (text[i] !== '=') throw new CatalogError(`the XML description document has an attribute with no value in <${name}>`);
    i++;
    while (i < text.length && /\s/.test(text[i]!)) i++;
    const quote = text[i];
    if (quote !== '"' && quote !== "'") throw new CatalogError(`the XML description document has an unquoted attribute value in <${name}>`);
    const close = text.indexOf(quote, i + 1);
    if (close < 0) throw new CatalogError(`the XML description document ends inside an attribute of <${name}>`);
    // Namespace declarations are not attributes of the model.
    if (written !== 'xmlns' && !written.startsWith('xmlns:')) attrs[attr] = unescape(text.slice(i + 1, close));
    i = close + 1;
  }
}
