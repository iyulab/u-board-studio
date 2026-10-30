// Example data written for the sample — the orchard, its plots and its trees are made up. Keep it consistent: it is
// 10:20 on a Friday in the last week of October, the middle of the harvest. Three plots: apples, pears and persimmons.
// A tree stands in one of a few places of its plot's planting rows (the places are in metres across the plot, so a
// place left out is a tree that was taken down). A tree's state is stored as the raw state; the words are the board's.
// Each plot's counts are counted from its trees. The bars are the kilograms picked each day of the week; they are
// written on their own, not summed from the trees.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-30T01:20:00Z';

type State = 'ripe' | 'ripening' | 'scab' | 'picked' | 'young';

/** The places a tree can stand in, in metres across a plot (x along the rows, y down the plot): three planting rows, the
 *  middle one offset by half a tree. */
const PLACES: ReadonlyArray<readonly [number, number]> = [
  [4.8, 11.6], [14.2, 11.6], [23.6, 11.6], [33.0, 11.6],
  [9.5, 20.8], [18.9, 20.8], [28.3, 20.8],
  [4.8, 30.0], [14.2, 30.0], [23.6, 30.0], [33.0, 30.0],
];

/** A tree: the place it stands in, its state, and its kilograms (the estimate on the tree, or what it gave; a young tree has none). */
type Tree = readonly [place: number, state: State, kg: number];

const PLOTS: ReadonlyArray<{ id: string; letter: string; name: string; crop: string; trees: Tree[] }> = [
  {
    id: 'a', letter: 'A', name: '해뜰 사과밭', crop: '후지 · 1988년 심음',
    trees: [[0, 'ripe', 44], [1, 'picked', 38], [2, 'ripe', 41], [3, 'ripening', 36], [4, 'ripening', 33], [5, 'ripe', 47], [6, 'scab', 28], [8, 'ripe', 40], [10, 'young', 0]],
  },
  {
    id: 'b', letter: 'B', name: '달무리 배밭', crop: '신고 · 1994년 심음',
    trees: [[0, 'picked', 41], [1, 'ripe', 45], [2, 'picked', 36], [3, 'ripening', 38], [4, 'picked', 44], [5, 'ripening', 40], [7, 'ripe', 43], [9, 'scab', 31]],
  },
  {
    id: 'c', letter: 'C', name: '노을 감밭', crop: '둥시 · 2001년 심음',
    trees: [[1, 'ripening', 34], [2, 'ripe', 39], [3, 'ripening', 31], [4, 'ripe', 36], [5, 'scab', 27], [7, 'young', 0], [9, 'ripening', 35]],
  },
];

const countOf = (trees: Tree[], state: State) => trees.filter(([, s]) => s === state).length;

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-30T01:20:20.000Z',
  responses: {
    orchard: {
      '/orchard/now': { value: { series: '10월 수확철 · 구역별 나무', name: '도담 과수원', date: '10월 30일 금요일', time: '10:20' }, updatedAt: at },
      '/orchard/plots': {
        value: PLOTS.map(({ id, letter, name, crop, trees }) => ({
          id,
          name,
          crop,
          ripe: countOf(trees, 'ripe'),
          picked: countOf(trees, 'picked'),
          scab: countOf(trees, 'scab'),
          total: trees.length,
          trees: trees.map(([place, state, kg], i) => ({ no: `${letter}-${i + 1}`, x: PLACES[place]![0], y: PLACES[place]![1], state, kg })),
          updatedAt: at,
        })),
        updatedAt: at,
      },
      '/orchard/harvest': {
        value: [
          { day: '24일', kg: 186 },
          { day: '25일', kg: 204 },
          { day: '26일', kg: 97 },
          { day: '27일', kg: 133 },
          { day: '28일', kg: 158 },
          { day: '29일', kg: 172 },
          { day: '30일', kg: 159 },
        ],
        updatedAt: at,
      },
    },
  },
};
