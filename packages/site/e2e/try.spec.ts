import { test, expect } from '@playwright/test';

// The page to build a board in the browser opens a board of the gallery in the product's authoring view, drawn with that
// board's own answers: widgets are on it, none says it has no source, and nothing in the page failed.
test('the try page opens a gallery board in the authoring view', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/try/');
  const editor = page.locator('[data-playground]');
  await expect(editor.locator('[data-node-id]').first()).toBeAttached({ timeout: 20_000 });
  expect(await editor.locator('[data-node-id]').count()).toBeGreaterThan(5);
  // The board reads its recorded answers: a value drawn from them (a pump out of order) is on screen.
  await expect(editor.getByText('고장 정지').first()).toBeVisible();
  expect(errors).toEqual([]);
});
