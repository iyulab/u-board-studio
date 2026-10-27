/**
 * What a data source says about itself, in the words a board is drawn with: the paths it answers, the fields of what
 * they answer with their types, the key, and the query options each accepts. Made from the source's own description
 * document (OData `$metadata`, an OpenAPI document) — for discovery only; a board still reads through data reads.
 */

export type CatalogKind = 'odata' | 'openapi';

/** One field of what an entry answers with. */
export interface CatalogField {
  name: string;
  /** The type as the description says it (`Edm.String`, `string`, `integer`, `Collection(NS.Person)`, `array<Pet>`). */
  type: string;
  /** Said only when the description says the field may be absent or null. */
  nullable?: true;
  /** Said only when the source refuses it: the field cannot be filtered on / ordered by. */
  filter?: false;
  sort?: false;
}

/** A path the source answers, with what it answers with. */
export interface CatalogEntry {
  /** The request, relative to the source's base: `/People`, `/pet/{petId}`. */
  path: string;
  /** `set` — a collection of items; `item` — one item (an OData singleton, an OpenAPI path that answers one object);
   *  `list` — an OpenAPI path that answers an array. */
  shape: 'set' | 'item' | 'list';
  /** What the description says it is, when it says: an OpenAPI operation's summary. */
  about?: string;
  /** The fields naming an item, when the description says. */
  key?: string[];
  fields: CatalogField[];
  /** Things hanging off an item that are read by their own request (OData navigation properties). */
  relations?: { name: string; type: string }[];
  /** The query options the entry accepts (`$filter`, a parameter named `line`). */
  query: string[];
  /** Those of `query` the request cannot do without, when the description says. */
  required?: string[];
  /** Fields were left out because the entry has more than the catalog holds. */
  fieldsCut?: number;
}

export interface SourceCatalog {
  kind: CatalogKind;
  /** What the description calls the service, when it says. */
  title?: string;
  entries: CatalogEntry[];
  /** Entries were left out because the description has more than the catalog holds. */
  entriesCut?: number;
}

/** The limits of a catalog. A description document is read from outside, so it is held to a size. */
export const CATALOG_LIMITS = {
  /** The largest description document read, in bytes. */
  documentBytes: 4_000_000,
  /** The most entries a catalog holds. */
  entries: 2_000,
  /** The most fields one entry holds. */
  fields: 300,
  /** The deepest an XML document nests. */
  xmlDepth: 64,
  /** The most elements an XML document has. */
  xmlElements: 400_000,
} as const;

/** A description document the catalog cannot be made from: not the kind it was named as, or past a limit. */
export class CatalogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CatalogError';
  }
}
