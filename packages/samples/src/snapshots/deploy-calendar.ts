// Example data written for the sample, not recorded from a source — no public source carries one team's deploy history. It is
// a Friday afternoon (16:00) in a product company: four teams' release windows across the week as bars, how many deploys went out in
// each hour of each weekday as a grid of squares, and the rollbacks of the week. Keep it consistent: the week's deploy count is
// the sum of the grid, the rollbacks listed are the ones the failure share is counted from (3 of 114 ≈ 2.6 %), and the freeze
// begins at 15:00 on Friday, so that slot and the next are bare.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-30T07:00:00Z';

const DAYS = ['월', '화', '수', '목', '금'] as const;
const SLOTS = ['09', '11', '13', '15', '17'] as const;

/** Deploys that went out in each two-hour slot of each weekday — heavier mid-week, none late on Friday (a freeze). */
const GRID: Record<(typeof DAYS)[number], readonly number[]> = {
  월: [2, 4, 3, 5, 1],
  화: [4, 8, 6, 9, 2],
  수: [5, 9, 8, 11, 3],
  목: [4, 7, 6, 5, 2],
  금: [3, 5, 2, 0, 0],
};
const total = DAYS.reduce((sum, day) => sum + GRID[day].reduce((a, b) => a + b, 0), 0);

/** One bar per release window: a team, the day and hour it opens and closes (Monday 2026-10-26 is day 0). */
const WINDOWS: Array<[team: string, name: string, from: string, to: string]> = [
  ['결제', '결제 2.14', '2026-10-26T01:00:00Z', '2026-10-27T08:00:00Z'],
  ['결제', '결제 2.15', '2026-10-28T01:00:00Z', '2026-10-30T08:00:00Z'],
  ['앱', '앱 5.8', '2026-10-26T04:00:00Z', '2026-10-28T09:00:00Z'],
  ['앱', '앱 5.9', '2026-10-29T00:00:00Z', '2026-10-30T08:00:00Z'],
  ['검색', '색인 개편', '2026-10-27T01:00:00Z', '2026-10-29T08:00:00Z'],
  ['검색', '검색 3.2', '2026-10-29T05:00:00Z', '2026-10-30T07:00:00Z'],
  ['플랫폼', '게이트웨이', '2026-10-26T00:00:00Z', '2026-10-27T05:00:00Z'],
  ['플랫폼', '인증 이전', '2026-10-28T02:00:00Z', '2026-10-30T06:00:00Z'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-30T07:00:30.000Z',
  responses: {
    ci: {
      '/ci/now': { week: '10월 5주차', deploys: total, rollbacks: 3, failureShare: Math.round((3 / total) * 1000) / 10, lead: 42, updatedAt: at },
      '/ci/windows': {
        value: WINDOWS.map(([team, name, start, end]) => ({ team, name, start, end })),
        updatedAt: at,
      },
      '/ci/heat': {
        // The grid draws its first row at the bottom, so the week is listed from Friday back to Monday to read Monday on top.
        value: [...DAYS].reverse().flatMap(day => SLOTS.map((slot, i) => ({ day, slot: `${slot}시`, deploys: GRID[day][i]! }))),
        updatedAt: at,
      },
      '/ci/rollbacks': {
        value: [
          { id: 'r-3', what: '앱 5.8 푸시 알림 중복 — 이전 판으로', who: '앱', when: '수 15:20', state: 'warn', updatedAt: at },
          { id: 'r-2', what: '결제 2.14 카드사 응답 시간 초과 — 설정 되돌림', who: '결제', when: '화 11:40', state: 'alarm', updatedAt: at },
          { id: 'r-1', what: '색인 개편 중 검색 지연 — 단계 중단', who: '검색', when: '화 09:30', state: 'warn', updatedAt: at },
        ],
        updatedAt: at,
      },
    },
  },
};
