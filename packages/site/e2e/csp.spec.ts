import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

// The site is served with the content security policy in public/_headers (Cloudflare Pages adds it; the preview server
// does not). This draws the pages under exactly that policy — the policy is read from the file, so the two cannot differ —
// and fails on any violation the browser reports: a script written into a page, a picture or a font from outside, a request
// to somewhere the policy does not name.
const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
const policy = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1];

async function underPolicy(page: Page) {
  expect(policy, 'public/_headers has no Content-Security-Policy').toBeTruthy();
  // Only the pages (documents) get the header; everything else passes through untouched.
  await page.route('**/*', async route => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': policy! } });
  });
  await page.addInitScript(() => {
    const seen: string[] = [];
    (window as unknown as { __violations: string[] }).__violations = seen;
    document.addEventListener('securitypolicyviolation', e => seen.push(`${e.violatedDirective} ← ${e.blockedURI || 'inline'} (${e.sourceFile ?? ''}:${e.lineNumber})`));
  });
}

const violations = (page: Page) => page.evaluate(() => (window as unknown as { __violations: string[] }).__violations);

const PAGES: Array<[string, string]> = [
  ['the home page', '/'],
  ['the home page in English', '/en/'],
  ['the gallery', '/gallery/'],
  ['a gallery board', '/gallery/water-pumps/'],
  ['a gallery board drawn over a picture', '/gallery/heating-nixie/'],
  ['the JSON playground', '/playground/?board=seoul-air'],
  ['the try page', '/try/'],
];

for (const [name, url] of PAGES) {
  test(`${name} is drawn under the policy, with no violation`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await underPolicy(page);
    await page.goto(url);
    // A board is drawn by script: it is on screen once a node of it is — the policy did not stop the script that draws it.
    await page.waitForLoadState('networkidle');
    if (url !== '/gallery/') await expect(page.locator('[data-node-id], [data-u-widget], u-widget').first()).toBeAttached({ timeout: 20_000 });
    expect(await violations(page)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('the policy blocks what it should: a script written into the page does not run', async ({ page }) => {
  await underPolicy(page);
  await page.goto('/');
  const ran = await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.__ran = true';
    document.head.appendChild(script);
    return (window as unknown as { __ran?: boolean }).__ran === true;
  });
  expect(ran).toBe(false);
  expect((await violations(page)).length).toBeGreaterThan(0);
});

// The live site has Cloudflare's analytics beacon injected at its edge (the preview server injects nothing, so the pages above
// never load it). The policy names its two origins; this loads a stand-in script from the beacon's address that reports to the
// beacon's collector, so removing either origin from the policy fails here rather than silently ending the page-view count.
test('the policy lets the analytics beacon load and report', async ({ page }) => {
  await underPolicy(page);
  await page.route('https://static.cloudflareinsights.com/beacon.min.js', route =>
    route.fulfill({ contentType: 'text/javascript', body: "fetch('https://cloudflareinsights.com/cdn-cgi/rum', { method: 'POST', body: '{}', keepalive: true }).then(() => { window.__reported = true; }, () => { window.__reported = false; });" })
  );
  await page.route('https://cloudflareinsights.com/cdn-cgi/rum', route => route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } }));
  await page.goto('/');
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    document.head.appendChild(script);
  });
  await expect.poll(() => page.evaluate(() => (window as unknown as { __reported?: boolean }).__reported)).toBe(true);
  expect(await violations(page)).toEqual([]);
});
