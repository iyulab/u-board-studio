import { test, expect } from '@playwright/test';

// The JSON playground draws a gallery board from its published files, names a mistake by its path, draws again once it
// is fixed — and a board's page opens it there.
test('the playground draws a board from its JSON and points at what is wrong', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/gallery/heating-nixie/');
  await page.getByRole('link', { name: /플레이그라운드에서 열기/ }).click();
  await expect(page).toHaveURL(/\/playground\/\?board=heating-nixie$/);
  // The page's own status line (the board's widgets have status roles of their own).
  const status = page.locator('[data-status]');
  await expect(status).toHaveText(/문제 없음/);
  await expect(page.locator('[data-view] [data-node-id]').first()).toBeAttached();

  const definition = page.locator('[data-field="definition"]');
  const text = await definition.inputValue();
  await definition.fill(text.replace('"theme": "dark"', '"theme": "dim"'));
  await expect(status).toHaveText(/문제 1개/);
  await expect(page.locator('[data-problems] li')).toHaveText([/\/board\/theme/]);

  await definition.fill(text);
  await expect(status).toHaveText(/문제 없음/);
  expect(errors).toEqual([]);
});

// A board that checks clean can still draw parts that got no value — the status line says how many instead of "no problems".
test('the playground says how many parts got no value once the board is drawn', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/playground/?board=heating-nixie');
  const status = page.locator('[data-status]');
  await expect(status).toHaveText(/문제 없음/);

  const data = page.locator('[data-field="data"]');
  const text = await data.inputValue();
  await data.fill(text.replace('"/net/now"', '"/net/gone"'));
  await expect(status).toHaveText(/보드를 그렸습니다 — 값을 받지 못한 부품 [1-9]\d*개/);
  await expect(page.locator('[data-view] [data-quality="disconnected"]').first()).toBeAttached();

  await data.fill(text);
  await expect(status).toHaveText(/문제 없음/);
  expect(errors).toEqual([]);
});

// A board whose trigger asks for another board: one of the gallery's opens in the playground, any other is said so.
test('the playground opens the gallery board a trigger asks for, and says so for one it does not have', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/playground/?board=heating-nixie');
  const status = page.locator('[data-status]');
  await expect(status).toHaveText(/문제 없음/);

  const leading = (board: string) =>
    JSON.stringify({
      parts: { go: { as: 'label', title: 'Go' } },
      layout: { kind: 'grid', items: ['go'] },
      triggers: [{ on: { event: 'click', part: 'go' }, do: [{ action: 'go-to-board', board }] }],
    });
  const definition = page.locator('[data-field="definition"]');
  const view = page.locator('[data-view]');

  await definition.fill(leading('somewhere-else'));
  // The page draws a moment after the typing stops: the new board is on screen once its own label is.
  await expect(view.getByText('Go')).toBeVisible();
  await view.getByRole('button', { name: /Go/ }).click();
  await expect(status).toHaveText(/«somewhere-else»/);

  await definition.fill(leading('seoul-air'));
  await expect(status).toHaveText(/문제 없음/);
  await expect(view.getByText('Go')).toBeVisible();
  await view.getByRole('button', { name: /Go/ }).click();
  await expect(page).toHaveURL(/\/playground\/\?board=seoul-air$/);
  await expect(page.locator('[data-board-picker]')).toHaveValue('seoul-air');
  expect(errors).toEqual([]);
});
