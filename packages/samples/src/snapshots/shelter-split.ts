// Example data written for the sample, not recorded from a source — no public source carries a district's shelters
// as they fill. It is the afternoon of a heavy-rain warning: eight shelters on a district's map, each with its
// people and its capacity. Keep it consistent: a shelter's state follows from its fill (closed because it is flooded,
// full at its capacity, crowded from three quarters), the totals are counted from the shelters, and the list is in
// order of fill, the fullest first.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T07:20:00Z';

type State = 'open' | 'crowded' | 'full' | 'closed';

/** [name, where on the map (x, y), people, capacity, closed because of flooding]. */
const SHELTERS: Array<[string, number, number, number, number, boolean]> = [
  ['온새미초등학교', 110, 165, 120, 400, false],
  ['주민센터', 300, 135, 210, 260, false],
  ['다목적 체육관', 470, 215, 500, 500, false],
  ['중앙도서관', 520, 95, 90, 300, false],
  ['복지회관', 130, 385, 175, 220, false],
  ['가람중학교', 340, 480, 60, 450, false],
  ['문화센터', 505, 410, 0, 200, true],
  ['지하 주차장 대피소', 545, 300, 140, 600, false],
];

const stateOf = (people: number, capacity: number, flooded: boolean): State =>
  flooded ? 'closed' : people >= capacity ? 'full' : people / capacity >= 0.75 ? 'crowded' : 'open';

const ROWS = SHELTERS.map(([name, x, y, people, capacity, flooded]) => ({
  id: name,
  name,
  x,
  y,
  people,
  capacity,
  pct: Math.round((people / capacity) * 100),
  state: stateOf(people, capacity, flooded),
  note: flooded ? '침수 — 이용 중단' : `${people}명 / ${capacity}명`,
  updatedAt: at,
})).sort((a, b) => b.pct - a.pct);

const open = ROWS.filter(r => r.state !== 'closed');
const sum = (rows: typeof ROWS, key: 'people' | 'capacity') => rows.reduce((n, r) => n + r[key], 0);

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T07:20:30.000Z',
  responses: {
    city: {
      '/city/now': {
        district: '온새미구',
        alert: '호우주의보',
        open: open.length,
        total: ROWS.length,
        people: sum(open, 'people'),
        room: sum(open, 'capacity') - sum(open, 'people'),
        updatedAt: at,
      },
      '/city/shelters': { value: ROWS, updatedAt: at },
    },
  },
};
