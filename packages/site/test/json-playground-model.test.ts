import { describe, it, expect } from 'vitest';
import { SAMPLE_PACKS } from '@iyulab/u-board-samples';
import { countUnread, playgroundStatus, readPlayground } from '../src/live/json-playground-model';
import { dataOf } from '../src/gallery';

const pack = SAMPLE_PACKS.find(p => p.id === 'seoul-air')!;
const definition = JSON.stringify(pack.board);
const data = JSON.stringify(dataOf(pack));

describe('JSON playground', () => {
  it('reads a gallery board as published', () => {
    const reading = readPlayground(definition, data);
    expect(reading.problems).toEqual([]);
    expect(reading.board).toEqual(pack.board);
    expect(reading.data?.connectors.map(c => c.key)).toEqual(pack.connectors.map(c => c.key));
  });

  it('names a text that is not JSON', () => {
    const reading = readPlayground('{ "parts": ', data);
    expect(reading.board).toBeUndefined();
    expect(reading.problems).toHaveLength(1);
    expect(reading.problems[0]).toMatchObject({ in: 'definition', path: '' });
  });

  it('points at what the definition gets wrong', () => {
    const broken = { ...pack.board, board: { theme: 'dim' } };
    const reading = readPlayground(JSON.stringify(broken), data);
    expect(reading.board).toBeUndefined();
    expect(reading.problems).toContainEqual(expect.objectContaining({ in: 'definition', path: '/board/theme' }));
  });

  it('points at what the data is missing', () => {
    const reading = readPlayground(definition, JSON.stringify({ connectors: [{ key: '' }], responses: {} }));
    expect(reading.data).toBeUndefined();
    expect(reading.problems.map(p => p.path)).toEqual(['/connectors/0/key', '/capturedAt']);
  });
});

describe('JSON playground status line', () => {
  const text = { ok: 'ok', problems: '{n} problems', unread: '{n} unread' };

  it('says the problems of the text first, then the parts with no value, then ok', () => {
    expect(playgroundStatus(2, 3, text)).toBe('2 problems');
    expect(playgroundStatus(0, 3, text)).toBe('3 unread');
    expect(playgroundStatus(0, 0, text)).toBe('ok');
  });

  it('counts the parts the viewer marks disconnected, and nothing else', () => {
    const marks = (selector: string) => (selector === '[data-quality="disconnected"]' ? { length: 2 } : { length: 99 });
    expect(countUnread({ querySelectorAll: marks } as unknown as ParentNode)).toBe(2);
  });
});
