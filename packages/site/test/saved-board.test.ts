import { describe, it, expect } from 'vitest';
import { SAMPLE_PACKS } from '@iyulab/u-board-samples';
import { HERO_BOARD } from '../src/gallery';
import { savedBoard, STORAGE_KEY, OLD_STORAGE_KEYS } from '../src/live/saved-board';

const board = SAMPLE_PACKS.find(p => p.id === HERO_BOARD)!.board;
const store = (value: string | null) => ({ getItem: (key: string) => (key === STORAGE_KEY ? value : null) });

describe('the board the playground keeps in the browser', () => {
  it('opens again as it was saved', () => {
    expect(savedBoard(store(JSON.stringify(board)))).toEqual(board);
  });

  // A board from an older page, or one edited by hand, must not leave the page empty or broken.
  it('is ignored when missing, unreadable or not a board the product accepts', () => {
    expect(savedBoard(store(null))).toBeUndefined();
    expect(savedBoard(store('{not json'))).toBeUndefined();
    expect(savedBoard(store(JSON.stringify({ parts: {} })))).toBeUndefined();
    expect(savedBoard(undefined)).toBeUndefined();
  });

  // The page's sources changed with the board it opens; a board saved under the old key reads one that is gone.
  it('does not read a board an earlier version of the page saved', () => {
    for (const old of OLD_STORAGE_KEYS) expect(old).not.toBe(STORAGE_KEY);
  });
});
