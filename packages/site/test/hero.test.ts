import { describe, it, expect } from 'vitest';
import { SAMPLE_PACKS } from '@iyulab/u-board-samples';
import { HERO_BOARD, boardExtent, thumbnailOf, recordedNote } from '../src/gallery';

describe('the home page board', () => {
  const pack = SAMPLE_PACKS.find(p => p.id === HERO_BOARD);

  it('is a board of the gallery, with a picture for a browser that runs no script', () => {
    expect(pack, `${HERO_BOARD} is not in the gallery`).toBeDefined();
    expect(thumbnailOf(HERO_BOARD)).toBeDefined();
  });

  it('is drawn over a background, so its box has the drawing’s proportions', () => {
    expect(boardExtent(pack!)).toBeDefined();
  });

  it('says in both languages what its values are', () => {
    for (const locale of ['ko', 'en'] as const) expect(recordedNote(pack!, locale).length).toBeGreaterThan(20);
  });
});
