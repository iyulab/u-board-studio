import { summarizeCsdlJson, summarizeCsdlXml } from './csdl.js';
import { summarizeOpenApi } from './openapi.js';
import { CatalogError, type CatalogKind, type SourceCatalog } from './types.js';

export { CATALOG_LIMITS, CatalogError } from './types.js';
export type { CatalogEntry, CatalogField, CatalogKind, SourceCatalog } from './types.js';

/**
 * The catalog of a source made from its description document, read as the kind it is named as. An `odata` document is
 * XML (CSDL) or JSON (CSDL JSON), told apart by its first character; an `openapi` document is JSON.
 */
export function summarizeDescription(kind: CatalogKind, text: string): SourceCatalog {
  const first = text.trimStart()[0];
  if (kind === 'odata' && first === '<') return summarizeCsdlXml(text);
  let document: unknown;
  try {
    document = JSON.parse(text);
  } catch {
    throw new CatalogError(kind === 'odata' ? 'the description document is neither XML nor JSON' : 'the OpenAPI description document is not JSON');
  }
  return kind === 'odata' ? summarizeCsdlJson(document) : summarizeOpenApi(document);
}
