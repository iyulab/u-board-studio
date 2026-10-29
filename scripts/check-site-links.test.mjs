import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addressesIn, verdict } from './check-site-links.mjs';

const answering = status => async () => ({ ok: status >= 200 && status < 300, status });

test('finds each https address once, in order, and no other text', () => {
  const text = "export const A = 'https://a.example/x'; // see https://b.example/y\nexport const B = 'https://a.example/x';\nconst c = 'http://www.w3.org/ns';";
  assert.deepEqual(addressesIn(text), ['https://a.example/x', 'https://b.example/y']);
});

test('an address that answers is ok, one that does not is broken with its status', async () => {
  assert.deepEqual(await verdict('https://github.com/iyulab/u-board-studio', answering(200)), { state: 'ok' });
  assert.deepEqual(await verdict('https://github.com/iyulab/u-board-studio', answering(404)), { state: 'broken', status: 404 });
});

test('a host that turns scripts away is unverifiable, not broken — but only that host, and only for 403 or 429', async () => {
  assert.deepEqual(await verdict('https://www.npmjs.com/package/x', answering(403)), { state: 'unverifiable', status: 403 });
  assert.deepEqual(await verdict('https://www.npmjs.com/package/x', answering(404)), { state: 'broken', status: 404 });
  assert.deepEqual(await verdict('https://github.com/iyulab/u-board-studio', answering(403)), { state: 'broken', status: 403 });
});

test('a request that fails is broken, with the reason', async () => {
  const failing = async () => {
    throw new Error('getaddrinfo ENOTFOUND');
  };
  assert.deepEqual(await verdict('https://nowhere.invalid/', failing), { state: 'broken', status: 'getaddrinfo ENOTFOUND' });
});
