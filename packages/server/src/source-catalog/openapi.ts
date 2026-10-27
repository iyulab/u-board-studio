import { CATALOG_LIMITS, CatalogError, type CatalogEntry, type CatalogField, type SourceCatalog } from './types.js';

/**
 * An OpenAPI document (3.x, or Swagger 2.0) as a catalog: each path that can be read (a `get` operation), with the fields
 * of the object — or of each item of the list — it answers with, and the query parameters it takes. Only reads are
 * listed: a board reads, and writes go through the actions a connector declares.
 */

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);

/** How deep a schema is followed through references, so a document that refers to itself ends. */
const SCHEMA_DEPTH = 8;

export function summarizeOpenApi(document: unknown): SourceCatalog {
  if (!isObject(document) || (document.openapi === undefined && document.swagger === undefined) || !isObject(document.paths)) {
    throw new CatalogError('the description document is not an OpenAPI document (it has no "openapi" or "swagger" and no "paths")');
  }
  const schemas: Json = isObject(document.components) && isObject(document.components.schemas) ? document.components.schemas : isObject(document.definitions) ? document.definitions : {};

  /** A schema with a reference followed, and `allOf` joined. */
  const resolve = (schema: unknown, depth = 0): Json | undefined => {
    if (!isObject(schema) || depth > SCHEMA_DEPTH) return undefined;
    if (typeof schema.$ref === 'string') return resolve(schemas[schema.$ref.slice(schema.$ref.lastIndexOf('/') + 1)], depth + 1);
    if (Array.isArray(schema.allOf)) {
      const parts = schema.allOf.map(p => resolve(p, depth + 1)).filter((p): p is Json => p !== undefined);
      const properties = Object.assign({}, ...parts.map(p => (isObject(p.properties) ? p.properties : {})));
      return { ...schema, type: 'object', properties };
    }
    return schema;
  };

  const typeName = (schema: unknown): string => {
    if (!isObject(schema)) return 'any';
    if (typeof schema.$ref === 'string') return schema.$ref.slice(schema.$ref.lastIndexOf('/') + 1);
    if (schema.type === 'array') return `array<${typeName(schema.items)}>`;
    if (typeof schema.type === 'string') return typeof schema.format === 'string' ? `${schema.type}:${schema.format}` : schema.type;
    return Array.isArray(schema.allOf) || isObject(schema.properties) ? 'object' : 'any';
  };

  const fieldsOf = (schema: Json | undefined): { fields: CatalogField[]; cut: number } => {
    const properties = schema && isObject(schema.properties) ? Object.entries(schema.properties) : [];
    const fields = properties.slice(0, CATALOG_LIMITS.fields).map(([name, value]): CatalogField => {
      const nullable = isObject(value) && (value.nullable === true || (isObject(resolve(value)) && resolve(value)!.nullable === true));
      return { name, type: typeName(value), ...(nullable ? { nullable: true as const } : {}) };
    });
    return { fields, cut: properties.length - fields.length };
  };

  const entries: CatalogEntry[] = [];
  let total = 0;
  for (const [path, item] of Object.entries(document.paths)) {
    if (!isObject(item) || !isObject(item.get)) continue;
    total++;
    if (entries.length >= CATALOG_LIMITS.entries) continue;
    const get = item.get;
    const parameters = [...(Array.isArray(item.parameters) ? item.parameters : []), ...(Array.isArray(get.parameters) ? get.parameters : [])].filter(
      (p): p is Json => isObject(p) && p.in === 'query' && typeof p.name === 'string'
    );
    const responses = isObject(get.responses) ? get.responses : {};
    const ok = isObject(responses['200']) ? responses['200'] : isObject(responses.default) ? responses.default : undefined;
    // 3.x answers with a media type's schema; Swagger 2.0 with the response's own.
    const json = ok && isObject(ok.content) ? (isObject(ok.content['application/json']) ? ok.content['application/json'] : Object.values(ok.content).find(isObject)) : undefined;
    const answer = resolve(isObject(json) ? json.schema : ok?.schema);
    const list = answer?.type === 'array';
    const { fields, cut } = fieldsOf(list ? resolve(answer.items) : answer);
    const about = typeof get.summary === 'string' ? get.summary : typeof get.description === 'string' ? get.description.split('\n')[0] : undefined;
    const required = parameters.filter(p => p.required === true).map(p => p.name as string);
    entries.push({
      path,
      shape: list ? 'list' : 'item',
      ...(about ? { about: about.slice(0, 300) } : {}),
      fields,
      query: parameters.map(p => p.name as string),
      ...(required.length > 0 ? { required } : {}),
      ...(cut > 0 ? { fieldsCut: cut } : {}),
    });
  }
  if (total === 0) throw new CatalogError('the description document has no path that can be read (no "get" operation)');
  const info = document.info;
  return {
    kind: 'openapi',
    ...(isObject(info) && typeof info.title === 'string' ? { title: info.title } : {}),
    entries,
    ...(total > entries.length ? { entriesCut: total - entries.length } : {}),
  };
}
