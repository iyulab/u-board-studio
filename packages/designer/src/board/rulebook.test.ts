import { describe, expect, it } from 'vitest';
import { PART_KINDS } from '@iyulab/u-board/domain';
import { toViewDocument } from '@iyulab/u-board/domain';
import { RULEBOOK_EXAMPLE, boardRulebook, sharedChartOptions } from './rulebook.js';
import { boardSchema } from '@iyulab/u-board/domain';
import { EMPHASES, FRAMES, TONES } from '@iyulab/u-board/domain';
import { validateBoard } from '@iyulab/u-board/domain';

const rulebook = boardRulebook();
const shared = sharedChartOptions();
const sharedLine = rulebook.split('\n').find(line => line.startsWith('Every `chart.*` also takes'))!;
const defs = (boardSchema() as { $defs: Record<string, { properties: Record<string, unknown> }> }).$defs;

describe('the v2 rulebook', () => {
  it('works through a board that is valid and draws', () => {
    expect(validateBoard(RULEBOOK_EXAMPLE).filter(i => !i.hint)).toEqual([]);
    expect(() => toViewDocument(RULEBOOK_EXAMPLE)).not.toThrow();
    expect(rulebook).toContain(JSON.stringify(RULEBOOK_EXAMPLE, null, 1));
  });

  it('lists every kind a part may be, with its options', () => {
    for (const kind of PART_KINDS) {
      const row = rulebook.split('\n').find(line => line.startsWith(`| \`${kind.kind}\` |`));
      expect(row, kind.kind).toBeDefined();
      const isChart = kind.kind.startsWith('chart.');
      for (const option of [...kind.own, ...kind.options]) {
        if (isChart && shared.includes(option)) expect(sharedLine, `${kind.kind} ${option}`).toContain(`\`${option}\``);
        else expect(row, `${kind.kind} ${option}`).toContain(`\`${option}\``);
      }
    }
  });

  it('says the options every chart takes once, and keeps them off each chart row', () => {
    expect(shared).toEqual(expect.arrayContaining(['x', 'y', 'label', 'value', 'group']));
    const chartRow = rulebook.split('\n').find(line => line.startsWith('| `chart.bar` |'))!;
    for (const option of shared) expect(chartRow).not.toContain(`\`${option}\``);
    expect(chartRow).toContain('`horizontal`');
  });

  it('names every key of a data read and of a link, every tone, emphasis and frame', () => {
    for (const key of [...Object.keys(defs.query!.properties), ...Object.keys(defs.groupLink!.properties)]) expect(rulebook).toContain(`- \`${key}\``);
    for (const word of [...TONES, ...EMPHASES, ...FRAMES]) expect(rulebook).toContain(`\`${word}\``);
  });

  // Read whole by a model on every board it writes: a budget, raised on purpose, not by drift (16 000 → 16 500 for the
  // fields computed from a list and the fields of a list's items).
  it('stays short enough to read whole', () => {
    expect(rulebook.length).toBeLessThan(16_500);
  });
});
