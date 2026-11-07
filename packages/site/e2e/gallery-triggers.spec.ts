import { expect, test } from '@playwright/test';

// A gallery board that carries triggers does what they say, pressed the way a visitor presses it. `site-zones` takes the
// view to a zone's tasks when the zone's card is pressed — by the pointer or from the keyboard. `solar-kiosk` opens the page
// of the planet whose tile is pressed in a new tab, the address filled in with the planet's name. `marathon-day` opens a
// condition's public page only while that condition is under a warning — the card of a clear one is not a button.
// `park-guide` draws a map by an element whose marked regions are buttons; pressing one takes the view to that area's programs.
// `ward-shifts` opens on the notes of the shift that is on now, by triggers on the board's first drawing.
for (const how of ['click', 'keyboard'] as const) {
  test(`site-zones: pressing a zone card by ${how} brings its tasks close`, async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 1000 });
    await page.goto('/gallery/site-zones/', { waitUntil: 'domcontentloaded' });
    const board = page.locator('[data-sample-board="site-zones"]');
    await board.scrollIntoViewIfNeeded();
    const tasks = board.locator('[data-node-id="detailC"]').first();
    await expect(tasks).toBeAttached({ timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await page.waitForTimeout(800);
    const before = (await tasks.boundingBox())!;
    const card = board.locator('[data-node-id="zoneC"]').first();
    await expect(card).toHaveAttribute('role', 'button');
    if (how === 'click') await card.click();
    else {
      await card.focus();
      await page.keyboard.press('Enter');
    }
    await expect.poll(async () => (await tasks.boundingBox())!.width, { timeout: 5_000 }).toBeGreaterThan(before.width * 1.3);
  });
}

for (const how of ['click', 'keyboard'] as const) {
  test(`solar-kiosk: pressing a planet's tile by ${how} opens its page in a new tab`, async ({ page, context }) => {
    // The page of an outside site is not loaded: the address the tab was sent to is what is checked.
    await context.route('https://ko.wikipedia.org/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>page</title>' }));
    await page.setViewportSize({ width: 1400, height: 1000 });
    await page.goto('/gallery/solar-kiosk/', { waitUntil: 'domcontentloaded' });
    const board = page.locator('[data-sample-board="solar-kiosk"]');
    await board.scrollIntoViewIfNeeded();
    const tile = board.getByRole('button', { name: /^지구/ }).first();
    await expect(tile).toBeAttached({ timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const opened = context.waitForEvent('page');
    if (how === 'click') await tile.click();
    else {
      await tile.focus();
      await page.keyboard.press('Enter');
    }
    const tab = await opened;
    expect(tab.url()).toBe('https://ko.wikipedia.org/wiki/%EC%A7%80%EA%B5%AC');
  });
}

test('marathon-day: only a card under a warning is a button, and it opens its public page', async ({ page, context }) => {
  await context.route('https://www.weather.go.kr/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>page</title>' }));
  await page.setViewportSize({ width: 1400, height: 1000 });
  await page.goto('/gallery/marathon-day/', { waitUntil: 'domcontentloaded' });
  const board = page.locator('[data-sample-board="marathon-day"]');
  await board.scrollIntoViewIfNeeded();
  const warned = board.getByRole('button', { name: /^폭염/ }).first();
  await expect(warned).toBeAttached({ timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  // A clear card is not offered as a button — it has no trigger it can run — and pressing it opens nothing.
  await expect(board.getByRole('button', { name: /^강풍/ })).toHaveCount(0);
  await expect(board.getByRole('button', { name: /^대기질/ })).toHaveCount(0);
  const opened: string[] = [];
  context.on('page', tab => opened.push(tab.url()));
  await board.getByText('강풍', { exact: true }).first().click();
  await page.waitForTimeout(1500);
  expect(opened).toEqual([]);
  const tab = context.waitForEvent('page');
  await warned.click();
  expect((await tab).url()).toBe('https://www.weather.go.kr/');
});

for (const how of ['click', 'keyboard'] as const) {
  test(`park-guide: pressing an area on the map by ${how} brings its programs close`, async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 1000 });
    await page.goto('/gallery/park-guide/', { waitUntil: 'domcontentloaded' });
    const board = page.locator('[data-sample-board="park-guide"]');
    await board.scrollIntoViewIfNeeded();
    const programs = board.locator('[data-node-id="birds"]').first();
    await expect(programs).toBeAttached({ timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await page.waitForTimeout(800);
    const before = (await programs.boundingBox())!;
    // The element marks the region; a marked region some trigger listens for is a button to the page.
    const area = board.getByRole('button', { name: '새 구역' }).first();
    await expect(area).toBeAttached();
    if (how === 'click') await area.click();
    else {
      await area.focus();
      await page.keyboard.press('Enter');
    }
    await expect.poll(async () => (await programs.boundingBox())!.width, { timeout: 5_000 }).toBeGreaterThan(before.width * 1.3);
  });
}

test('ward-shifts: the board opens on the notes of the shift on now', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 1000 });
  await page.goto('/gallery/ward-shifts/', { waitUntil: 'domcontentloaded' });
  const board = page.locator('[data-sample-board="ward-shifts"]');
  await board.scrollIntoViewIfNeeded();
  const evening = board.locator('[data-node-id="notesEvening"]').first();
  await expect(evening).toBeAttached({ timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  // The recording is of the evening: the board's first drawing brought its notes close. Fitted whole, the three columns of the
  // board would each take about a quarter of the view's width; brought close, the evening's takes over two fifths.
  const frame = (await board.boundingBox())!;
  await expect.poll(async () => (await evening.boundingBox())!.width / frame.width, { timeout: 5_000 }).toBeGreaterThan(0.36);
});
