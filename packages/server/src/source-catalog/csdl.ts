import { readXmlElements, type XmlElement } from './mini-xml.js';
import { CATALOG_LIMITS, CatalogError, type CatalogEntry, type CatalogField, type SourceCatalog } from './types.js';

/**
 * An OData service's `$metadata` — CSDL, as XML (what OData services answer) or as JSON (CSDL JSON 4.01) — as a catalog:
 * each entity set and singleton of the service's container, with the fields of its entity type (its base types'
 * included), its key, the things it relates to, and the query options it accepts. The options the service restricts in
 * its Capabilities annotations (`FilterRestrictions`, `SortRestrictions`, and the like) are left out or marked.
 */

interface RawProperty {
  name: string;
  type: string;
  nullable: boolean;
}

interface RawType {
  baseType?: string;
  key: string[];
  properties: RawProperty[];
  relations: { name: string; type: string }[];
}

/** What a set's Capabilities annotations say, by the term's last word (`FilterRestrictions`). */
type Restrictions = Record<string, { flags: Record<string, boolean>; lists: Record<string, string[]> }>;

interface RawSet {
  name: string;
  /** The qualified name of its entity type. */
  type: string;
  singleton: boolean;
  restrictions: Restrictions;
}

const STANDARD_SET_OPTIONS = ['$filter', '$select', '$orderby', '$top', '$skip', '$count', '$expand'] as const;
const SINGLETON_OPTIONS = ['$select', '$expand'] as const;

export function summarizeCsdlXml(text: string): SourceCatalog {
  const root = readXmlElements(text);
  if (root.name !== 'Edmx') throw new CatalogError('the XML description document is not an OData $metadata (its root is not Edmx)');
  const types = new Map<string, RawType>();
  const sets: RawSet[] = [];
  /** Annotations given outside the set they are about: by the set's target path (`NS.Container/People`). */
  const outside = new Map<string, Restrictions>();
  const schemas = root.children.flatMap(service => service.children.filter(e => e.name === 'Schema'));
  if (schemas.length === 0) throw new CatalogError('the XML description document has no schema');
  for (const schema of schemas) {
    const names = [schema.attrs.Namespace, schema.attrs.Alias].filter((n): n is string => !!n);
    for (const element of schema.children) {
      if (element.name === 'EntityType') {
        const type = rawEntityType(element);
        for (const ns of names) types.set(`${ns}.${element.attrs.Name}`, type);
      } else if (element.name === 'EntityContainer') {
        for (const member of element.children) {
          if (member.name !== 'EntitySet' && member.name !== 'Singleton') continue;
          const type = member.name === 'EntitySet' ? member.attrs.EntityType : member.attrs.Type;
          if (member.attrs.Name && type) sets.push({ name: member.attrs.Name, type, singleton: member.name === 'Singleton', restrictions: restrictionsOf(member) });
        }
      } else if (element.name === 'Annotations' && element.attrs.Target) {
        outside.set(element.attrs.Target, { ...outside.get(element.attrs.Target), ...restrictionsOf(element) });
      }
    }
  }
  for (const set of sets) {
    for (const [target, restrictions] of outside) if (target.endsWith(`/${set.name}`)) Object.assign(set.restrictions, restrictions);
  }
  return catalogOf(types, sets, schemas[0]!.attrs.Namespace);
}

function rawEntityType(element: XmlElement): RawType {
  return {
    ...(element.attrs.BaseType ? { baseType: element.attrs.BaseType } : {}),
    key: element.children.find(c => c.name === 'Key')?.children.filter(c => c.name === 'PropertyRef').map(c => c.attrs.Name ?? '') ?? [],
    properties: element.children
      .filter(c => c.name === 'Property')
      .map(c => ({ name: c.attrs.Name ?? '', type: c.attrs.Type ?? 'Edm.String', nullable: c.attrs.Nullable !== 'false' })),
    relations: element.children.filter(c => c.name === 'NavigationProperty').map(c => ({ name: c.attrs.Name ?? '', type: c.attrs.Type ?? '' })),
  };
}

/** The Capabilities restrictions among the annotations written in `element`: each a record of flags and lists. */
function restrictionsOf(element: XmlElement): Restrictions {
  const restrictions: Restrictions = {};
  for (const annotation of element.children.filter(c => c.name === 'Annotation')) {
    const term = annotation.attrs.Term ?? '';
    if (!term.includes('.Capabilities.')) continue;
    const entry: Restrictions[string] = { flags: {}, lists: {} };
    const record = annotation.children.find(c => c.name === 'Record');
    // A term whose value is a plain boolean (`TopSupported`) is the record's one flag, named by the term.
    if (annotation.attrs.Bool !== undefined) entry.flags[''] = annotation.attrs.Bool !== 'false';
    for (const value of record?.children.filter(c => c.name === 'PropertyValue') ?? []) {
      const property = value.attrs.Property ?? '';
      if (value.attrs.Bool !== undefined) entry.flags[property] = value.attrs.Bool !== 'false';
      const collection = value.children.find(c => c.name === 'Collection');
      if (collection) entry.lists[property] = collection.children.map(c => c.text).filter(t => t !== '');
    }
    restrictions[term.slice(term.lastIndexOf('.') + 1)] = entry;
  }
  return restrictions;
}

export function summarizeCsdlJson(document: unknown): SourceCatalog {
  const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
  if (!isObject(document) || typeof document.$Version !== 'string') throw new CatalogError('the JSON description document is not an OData $metadata (CSDL JSON has a "$Version")');
  const types = new Map<string, RawType>();
  const sets: RawSet[] = [];
  const container = typeof document.$EntityContainer === 'string' ? document.$EntityContainer : undefined;
  let title: string | undefined;
  for (const [namespace, members] of Object.entries(document)) {
    if (namespace.startsWith('$') || !isObject(members)) continue;
    title ??= namespace;
    for (const [name, member] of Object.entries(members)) {
      if (!isObject(member)) continue;
      if (member.$Kind === 'EntityType') {
        const type: RawType = {
          ...(typeof member.$BaseType === 'string' ? { baseType: member.$BaseType } : {}),
          key: Array.isArray(member.$Key) ? member.$Key.map(k => (typeof k === 'string' ? k : isObject(k) ? Object.keys(k)[0] ?? '' : '')) : [],
          properties: [],
          relations: [],
        };
        for (const [property, value] of Object.entries(member)) {
          if (property.startsWith('$') || property.startsWith('@') || !isObject(value)) continue;
          const written = typeof value.$Type === 'string' ? value.$Type : 'Edm.String';
          const typeName = value.$Collection === true ? `Collection(${written})` : written;
          if (value.$Kind === 'NavigationProperty') type.relations.push({ name: property, type: typeName });
          else type.properties.push({ name: property, type: typeName, nullable: value.$Nullable === true });
        }
        types.set(`${namespace}.${name}`, type);
      } else if (member.$Kind === 'EntityContainer' && (container === undefined || container === `${namespace}.${name}`)) {
        for (const [setName, set] of Object.entries(member)) {
          if (setName.startsWith('$') || !isObject(set) || set.$Kind !== undefined || typeof set.$Type !== 'string') continue;
          sets.push({ name: setName, type: set.$Type, singleton: set.$Collection !== true, restrictions: jsonRestrictions(set) });
        }
      }
    }
  }
  return catalogOf(types, sets, title);
}

function jsonRestrictions(set: Record<string, unknown>): Restrictions {
  const restrictions: Restrictions = {};
  for (const [term, value] of Object.entries(set)) {
    if (!term.startsWith('@') || !term.includes('.Capabilities.')) continue;
    const entry: Restrictions[string] = { flags: {}, lists: {} };
    if (typeof value === 'boolean') entry.flags[''] = value;
    else if (typeof value === 'object' && value !== null) {
      for (const [property, v] of Object.entries(value)) {
        if (typeof v === 'boolean') entry.flags[property] = v;
        else if (Array.isArray(v)) entry.lists[property] = v.filter((x): x is string => typeof x === 'string');
      }
    }
    restrictions[term.slice(term.lastIndexOf('.') + 1)] = entry;
  }
  return restrictions;
}

/** A qualified type name without its namespace, inside any `Collection( )`; the `Edm.` types stay as they are. */
const shortType = (type: string): string => type.replace(/(Collection\()?([\w.]+)(\))?/, (_m, open: string | undefined, name: string, close: string | undefined) => `${open ?? ''}${name.startsWith('Edm.') ? name : name.slice(name.lastIndexOf('.') + 1)}${close ?? ''}`);

function catalogOf(types: Map<string, RawType>, sets: RawSet[], title: string | undefined): SourceCatalog {
  if (sets.length === 0) throw new CatalogError('the description document names no entity set or singleton');
  const entries: CatalogEntry[] = [];
  for (const set of sets.slice(0, CATALOG_LIMITS.entries)) {
    // The type's own fields after its base types', the key from the nearest type that has one.
    const chain: RawType[] = [];
    for (let type = types.get(set.type); type !== undefined && !chain.includes(type); type = type.baseType ? types.get(type.baseType) : undefined) chain.unshift(type);
    const properties = chain.flatMap(t => t.properties);
    const relations = chain.flatMap(t => t.relations);
    const key = [...chain].reverse().find(t => t.key.length > 0)?.key ?? [];
    const filter = set.restrictions.FilterRestrictions;
    const sort = set.restrictions.SortRestrictions;
    const fields: CatalogField[] = properties.slice(0, CATALOG_LIMITS.fields).map(p => ({
      name: p.name,
      type: shortType(p.type),
      ...(p.nullable ? { nullable: true as const } : {}),
      ...(filter && (filter.flags.Filterable === false || filter.lists.NonFilterableProperties?.includes(p.name)) ? { filter: false as const } : {}),
      ...(sort && (sort.flags.Sortable === false || sort.lists.NonSortableProperties?.includes(p.name)) ? { sort: false as const } : {}),
    }));
    const options: readonly string[] = set.singleton ? SINGLETON_OPTIONS : STANDARD_SET_OPTIONS;
    const refused = (term: string, flag = ''): boolean => set.restrictions[term]?.flags[flag] === false;
    const query = options.filter(
      o =>
        !(o === '$filter' && refused('FilterRestrictions', 'Filterable')) &&
        !(o === '$orderby' && refused('SortRestrictions', 'Sortable')) &&
        !(o === '$top' && refused('TopSupported')) &&
        !(o === '$skip' && refused('SkipSupported')) &&
        !(o === '$count' && refused('CountRestrictions', 'Countable')) &&
        !(o === '$expand' && refused('ExpandRestrictions', 'Expandable'))
    );
    entries.push({
      path: `/${set.name}`,
      shape: set.singleton ? 'item' : 'set',
      ...(key.length > 0 ? { key } : {}),
      fields,
      ...(relations.length > 0 ? { relations: relations.map(r => ({ name: r.name, type: shortType(r.type) })) } : {}),
      query,
      ...(properties.length > fields.length ? { fieldsCut: properties.length - fields.length } : {}),
    });
  }
  return { kind: 'odata', ...(title ? { title } : {}), entries, ...(sets.length > entries.length ? { entriesCut: sets.length - entries.length } : {}) };
}
