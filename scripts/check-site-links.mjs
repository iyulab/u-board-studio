#!/usr/bin/env node
// check-site-links.mjs
// Asks the network whether every address the introduction site sends a reader to still answers. The site's tests
// check what they can without it (an address into this repository points at a file that exists); this is the part
// only a request can tell — a repository renamed, a documentation page moved. It is not part of `npm run check`: a test
// that depends on other people's servers fails for reasons no commit of ours caused. Run it before a change to the
// site's addresses is pushed, or on a schedule.
//
// A registry or host that refuses a script (the npm website answers 403 to one) is reported as unverifiable, not broken.
//
// Usage:
//   node scripts/check-site-links.mjs     # exit 1 and list every address that does not answer

import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const COPY_FILE = new URL('../packages/site/src/copy.ts', import.meta.url);
const UNVERIFIABLE_HOSTS = new Set(['www.npmjs.com']);

/** Every https address written in a text, once, in order. */
export function addressesIn(text) {
  return [...new Set([...text.matchAll(/https:\/\/[^\s'"`)<>]+/g)].map(m => m[0]))];
}

/** `ok`, `unverifiable` (a host that turns scripts away, answering 403/429), or `broken` with the status or error. */
export async function verdict(url, fetchImpl = fetch) {
  try {
    const response = await fetchImpl(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000), headers: { 'user-agent': 'Mozilla/5.0 (u-board site link check)' } });
    if (response.ok) return { state: 'ok' };
    if ((response.status === 403 || response.status === 429) && UNVERIFIABLE_HOSTS.has(new URL(url).host)) return { state: 'unverifiable', status: response.status };
    return { state: 'broken', status: response.status };
  } catch (error) {
    return { state: 'broken', status: String(error?.message ?? error) };
  }
}

async function main() {
  const urls = addressesIn(readFileSync(COPY_FILE, 'utf8'));
  let broken = 0;
  for (const url of urls) {
    const result = await verdict(url);
    if (result.state === 'broken') broken++;
    console.log(`${result.state.padEnd(12)} ${result.status ?? ''} ${url}`);
  }
  if (broken > 0) {
    console.error(`\n${broken} of ${urls.length} addresses do not answer.`);
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
