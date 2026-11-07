// Example data written for the sample, not recorded from a source — the eight planets' well-known figures (mean distance from the
// Sun in astronomical units, equatorial diameter, surface gravity, the length of a day), set down as a visitor kiosk would
// list them. Each planet is keyed by the name of its encyclopedia page, which is what the board's links are built from.
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-11-03T01:00:00Z';

type Planet = [name: string, kind: 'rocky' | 'gas' | 'ice', au: number, diameter: number, gravity: number, day: string];

const PLANETS: Planet[] = [
  ['수성', 'rocky', 0.39, 4879, 3.7, '하루 58일 15시간'],
  ['금성', 'rocky', 0.72, 12104, 8.9, '하루 243일 · 역자전'],
  ['지구', 'rocky', 1.0, 12742, 9.8, '하루 23시간 56분'],
  ['화성', 'rocky', 1.52, 6779, 3.7, '하루 24시간 37분'],
  ['목성', 'gas', 5.2, 139820, 24.8, '하루 9시간 56분'],
  ['토성', 'gas', 9.54, 116460, 10.4, '하루 10시간 33분'],
  ['천왕성', 'ice', 19.2, 50724, 8.9, '하루 17시간 — 누워서 돈다'],
  ['해왕성', 'ice', 30.1, 49244, 11.2, '하루 16시간 6분'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-11-03T01:00:10.000Z',
  responses: {
    kiosk: {
      '/kiosk/now': { name: '태양계 안내 키오스크', updatedAt: RECORDED },
      '/kiosk/planets': {
        value: PLANETS.map(([name, kind, au, diameter, gravity, day]) => ({ name, kind, au, diameter, gravity, day, updatedAt: RECORDED })),
        updatedAt: RECORDED,
      },
    },
  },
};
