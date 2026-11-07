// Example data written for the sample, not recorded from a source — no public source carries one road race's field and aid
// stations. It is twenty to ten on a Sunday morning, an hour and forty minutes into a city marathon: most of the field is on the
// course, the first finishers are home, one condition is under a warning (heat) and two are clear, and the third aid station is
// crowded while the last is closed for a spill.
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-11-03T00:40:00Z';

type Station = [km: number, state: 'open' | 'busy' | 'closed', water: number, note: string];

const STATIONS: Station[] = [
  [5, 'open', 82, '물 · 이온 음료'],
  [10, 'open', 71, '물 · 이온 음료'],
  [15, 'busy', 48, '물 · 바나나 — 줄이 길다'],
  [20, 'open', 66, '물 · 젤'],
  [25, 'open', 59, '물 · 이온 음료'],
  [30, 'busy', 37, '물 · 젤 — 재고 낮음'],
  [35, 'open', 74, '물 · 얼음 수건'],
  [40, 'closed', 0, '엎지른 물 정리 중 — 38 km 쪽으로 안내'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-11-03T00:40:10.000Z',
  responses: {
    race: {
      '/race/now': { name: '강변 시민 마라톤', day: '일요일 오전 9시 40분', updatedAt: RECORDED },
      '/race/totals': { entered: 12000, onCourse: 8420, finished: 2310, updatedAt: RECORDED },
      '/race/conditions': {
        value: [
          { id: 'heat', name: '폭염', note: '체감 31℃ — 주의보', state: 'warn', updatedAt: RECORDED },
          { id: 'wind', name: '강풍', note: '순간 3 m/s — 특보 없음', state: 'ok', updatedAt: RECORDED },
          { id: 'air', name: '대기질', note: '초미세먼지 12 — 좋음', state: 'ok', updatedAt: RECORDED },
        ],
        updatedAt: RECORDED,
      },
      '/race/stations': {
        value: STATIONS.map(([km, state, water, note]) => ({ id: `s${km}`, name: `${km} km 급수대`, state, water, note, updatedAt: RECORDED })),
        updatedAt: RECORDED,
      },
    },
  },
};
