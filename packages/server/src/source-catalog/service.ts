import { type HttpConnector } from '../db/connectors.js';
import { buildResolveTarget, readDescriptionDocument, type ResolveState } from '../resolve-connector.js';
import { CatalogError, type SourceCatalog } from './types.js';
import { summarizeDescription } from './index.js';

/** How long a catalog made from a description document answers before the document is read again (milliseconds). A
 *  source's model changes rarely, and a catalog is read when someone is looking for what to bind — not on a poll. */
export const DEFAULT_CATALOG_TTL_MS = 10 * 60_000;

/** The most catalogs kept at once; the oldest go first. */
const MAX_KEPT = 50;

/**
 * The catalog of `connector`'s description document, from the cache when it is younger than `ttlMs`, else read from the
 * source — within the connector's address, with its credentials, and the catalog's limits. A read that fails is not
 * kept, so the next asks again. The same document asked for while it is being read is read once.
 */
export async function catalogFor(connector: HttpConnector, state: ResolveState, ttlMs = DEFAULT_CATALOG_TTL_MS, now = Date.now()): Promise<SourceCatalog> {
  const document = connector.descriptionDocument;
  if (!document) throw new CatalogError('the source names no description document');
  const kept = (state.catalogs ??= new Map());
  const key = `${connector.id} ${document.kind} ${document.path}`;
  const hit = kept.get(key);
  if (hit && now - hit.at < ttlMs) return hit.catalog;
  const target = buildResolveTarget(connector, { path: document.path });
  if (!target) throw new CatalogError('the description document is not at a path under the source');
  const catalog = readDescriptionDocument(connector, target, state).then(text => summarizeDescription(document.kind, text));
  kept.set(key, { at: now, catalog });
  catalog.catch(() => {
    if (kept.get(key)?.catalog === catalog) kept.delete(key);
  });
  if (kept.size > MAX_KEPT) kept.delete(kept.keys().next().value!);
  return catalog;
}
