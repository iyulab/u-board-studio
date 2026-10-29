import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COPY, SOURCE_URL, LIBRARY_URL, DOCS_URL, PRODUCT_DOCS_URL, SELF_HOSTING_URL, NPM_URL, CONTACT_URL, APP_URL, SITE_URL } from '../src/copy';

// What the site says about where things are and under which license is checked against what this repository (and the
// package it depends on) says — a move of a repository or a change of license left the site wrong once, and no test noticed.

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const repoRoot = path.resolve(siteDir, '../..');
const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8')) as { name: string; license: string };

const URLS = { SITE_URL, APP_URL, SOURCE_URL, LIBRARY_URL, DOCS_URL, PRODUCT_DOCS_URL, SELF_HOSTING_URL, NPM_URL, CONTACT_URL };
const PRODUCT = 'https://github.com/iyulab/u-board-studio';
const LIBRARY = 'https://github.com/iyulab/U-Board';

describe('where the site sends a reader', () => {
  it('names only the two repositories of the project', () => {
    for (const [name, url] of Object.entries(URLS)) {
      if (!url.startsWith('https://github.com/')) continue;
      expect(url === PRODUCT || url.startsWith(`${PRODUCT}/`) || url === LIBRARY || url.startsWith(`${LIBRARY}/`), name).toBe(true);
    }
  });

  // A link into this repository is checked against it; the library's own repository is not here to look in.
  it('links only to files and folders this repository has, when it links into it', () => {
    for (const [name, url] of Object.entries(URLS)) {
      const m = url.match(/^https:\/\/github\.com\/iyulab\/u-board-studio\/(?:blob|tree)\/main\/(.+)$/);
      if (!m) continue;
      expect(existsSync(path.join(repoRoot, m[1])), `${name}: ${m[1]}`).toBe(true);
    }
  });

  it('keeps every address in the copy file, where these checks see it', () => {
    const files = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap(e => {
        const full = path.join(dir, e.name);
        return e.isDirectory() ? files(full) : /\.(astro|ts)$/.test(e.name) ? [full] : [];
      });
    const stray = files(path.join(siteDir, 'src'))
      .filter(f => path.basename(f) !== 'copy.ts')
      .flatMap(f => [...readFileSync(f, 'utf8').matchAll(/https?:\/\/[^\s'"`)<>]+/g)].map(m => `${path.relative(siteDir, f)}: ${m[0]}`))
      .filter(u => !/w3\.org|schema\.org|sitemaps\.org/.test(u));
    expect(stray).toEqual([]);
  });
});

describe('what the site says about packages and licenses', () => {
  // The package's exports do not list its package.json, so it is read from where the workspace installs it.
  const installed = ['node_modules', '../../node_modules'].map(d => path.join(siteDir, d, '@iyulab/u-board/package.json')).find(existsSync);
  const library = readJson(installed!);
  const designer = readJson(path.join(repoRoot, 'packages/designer/package.json'));
  const server = readJson(path.join(repoRoot, 'packages/server/package.json'));

  it('says the library is MIT and the product AGPL-3.0, as their packages do', () => {
    expect(library.license).toBe('MIT');
    expect(designer.license).toBe('AGPL-3.0-or-later');
    expect(server.license).toBe('AGPL-3.0-or-later');
    for (const locale of ['ko', 'en'] as const) {
      const text = COPY[locale].license.body;
      expect(text, locale).toContain('MIT');
      expect(text, locale).toContain('AGPL-3.0');
    }
  });

  it('names the library and the authoring package as they are published', () => {
    const delivery = COPY.en.delivery.items.find(i => i.claim === 'delivery-library')!.body;
    expect(delivery).toContain(library.name);
    expect(delivery).toContain(designer.name);
    expect(NPM_URL.endsWith(library.name)).toBe(true);
  });
});
