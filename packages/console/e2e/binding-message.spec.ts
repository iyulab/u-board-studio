import { test, expect } from '@playwright/test';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';

// A signed-in viewer is told which part of a binding to fix. The source answers, but not with what the
// binding points at; the server's resolve says so in a message, the console hands the message to the
// library, and the tooltip of the part's quality mark carries it after the cause — where the public
// share surface, which leaves the message out, says only that the value is not in the source.
test('a part whose binding finds nothing says where, in the quality tooltip of the board view', async ({ page }) => {
  let upstreamCalls = 0;
  const mockServer = createServer((_req, res) => {
    upstreamCalls++;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ value: [{ Status: 'Running' }] }));
  });
  await new Promise<void>(resolve => mockServer.listen(0, resolve));
  const mockBaseUrl = `http://127.0.0.1:${(mockServer.address() as AddressInfo).port}`;

  try {
    const signup = await page.request.post('/api/auth/signup', {
      data: { email: 'e2e-binding-message@test.com', password: 'p4ssword!', name: 'E2E Binding Message' },
    });
    expect(signup.status()).toBe(201);
    const { workspaceId } = await signup.json();

    const connector = await (await page.request.post(`/api/workspaces/${workspaceId}/connectors`, {
      data: { name: 'Mock Plant API', baseUrl: mockBaseUrl, authType: 'none' },
    })).json();
    const board = await (await page.request.post(`/api/workspaces/${workspaceId}/boards`, { data: { name: 'Missing Value' } })).json();
    // One part that finds its value and one that points past the end of the collection.
    const saved = await page.request.put(`/api/workspaces/${workspaceId}/boards/${board.id}`, {
      data: {
        document: {
          data: {
            assets: {
              from: connector.id,
              path: '/assets',
              fields: { found: { at: '/value/0/Status', label: 'Found' }, missing: { at: '/value/7/Status', label: 'Missing' } },
            },
          },
          parts: {
            found: { as: 'stat-list', of: 'assets', show: ['found'] },
            missing: { as: 'stat-list', of: 'assets', show: ['missing'] },
          },
          layout: { kind: 'canvas', size: [600, 300], place: { found: [40, 40, 240, 100], missing: [320, 40, 240, 100] } },
        },
      },
    });
    expect(saved.ok()).toBe(true);

    await page.goto(`/boards/${board.id}`);
    await expect(page.getByTestId('canvas')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ has: page.getByText('Found', { exact: true }) })).toContainText('Running');
    // The cause is there, and after it the library's message for the binding that was not live.
    const mark = page.locator('[title^="연결 끊김"]');
    await expect(mark).toHaveCount(1);
    await expect(mark).toHaveAttribute('title', /\/value\/7\/Status.*not found/);
    expect(upstreamCalls).toBeGreaterThan(0);
  } finally {
    await new Promise<void>(resolve => mockServer.close(() => resolve()));
  }
});
