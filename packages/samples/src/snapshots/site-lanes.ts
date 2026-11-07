// Example data written for the sample, not recorded from a source — no public source carries a building site's
// work plan. It is Thursday morning on the fifth-floor frame of a new building: the floor is cast zone by zone, and
// each trade (rebar, formwork, sleeves, concrete, curing) works through zones A to D in turn. Keep it consistent:
// a trade starts a zone only after the one before it has finished there, and the counts are counted from the work.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T00:30:00Z';

type State = 'done' | 'running' | 'waiting' | 'blocked';

/** What each trade does in each zone: [zone, work, state, done, planned, unit, note, on the critical path]. */
const LANES: Record<string, Array<[string, string, State, number, number, string, string, boolean]>> = {
  철근: [
    ['A', '철근 배근', 'done', 38, 38, 't', '검측 합격', false],
    ['B', '철근 배근', 'done', 41, 41, 't', '검측 합격', false],
    ['C', '철근 배근', 'running', 29, 44, 't', '오늘 14시 마감', true],
    ['D', '철근 배근', 'blocked', 0, 40, 't', '자재 입고 지연 — 내일 오전', true],
  ],
  거푸집: [
    ['A', '거푸집 조립', 'done', 520, 520, 'm²', '검측 합격', false],
    ['B', '거푸집 조립', 'running', 310, 560, 'm²', '3개 조 작업', false],
    ['C', '거푸집 조립', 'waiting', 0, 540, 'm²', '철근 뒤', false],
    ['D', '거푸집 조립', 'waiting', 0, 500, 'm²', '철근 뒤', false],
  ],
  '설비 슬리브': [
    ['A', '슬리브 매립', 'done', 64, 64, '개소', '확인 완료', false],
    ['B', '슬리브 매립', 'running', 33, 58, '개소', '배관 협의 1건', true],
    ['C', '슬리브 매립', 'waiting', 0, 61, '개소', '철근 뒤', false],
    ['D', '슬리브 매립', 'waiting', 0, 55, '개소', '철근 뒤', false],
  ],
  콘크리트: [
    ['A', '타설', 'done', 118, 118, 'm³', '어제 완료', false],
    ['B', '타설', 'waiting', 0, 126, 'm³', '내일 예정', false],
    ['C', '타설', 'waiting', 0, 122, 'm³', '모레 예정', false],
    ['D', '타설', 'waiting', 0, 110, 'm³', '3일 뒤 예정', false],
  ],
  '양생·검측': [
    ['A', '양생', 'running', 5, 7, '일', '압축강도 시험 대기', false],
    ['B', '양생', 'waiting', 0, 7, '일', '타설 뒤', false],
    ['C', '양생', 'waiting', 0, 7, '일', '타설 뒤', false],
    ['D', '양생', 'waiting', 0, 7, '일', '타설 뒤', false],
  ],
};

const TASKS = Object.entries(LANES).flatMap(([trade, rows]) =>
  rows.map(([zone, what, state, done, planned, unit, note, critical]) => ({ id: `${trade}-${zone}`, trade, zone, what, state, done, planned, unit, note, critical, updatedAt: at })),
);
const count = (state: State) => TASKS.filter(t => t.state === state).length;

/** Workers on site today, per trade — a trade with nobody working today is not listed. */
const CREWS: Array<[string, number]> = [['철근', 14], ['거푸집', 22], ['설비 슬리브', 6], ['양생·검측', 3]];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T00:30:30.000Z',
  responses: {
    site: {
      '/site/now': { name: '온새미 센터 신축', floor: '5층 골조', date: '10월 29일 목요일', weather: '맑음 · 12°C · 바람 약함', updatedAt: at },
      '/site/tasks': { value: TASKS, updatedAt: at },
      '/site/crews': { value: CREWS.map(([trade, workers]) => ({ trade, workers })), updatedAt: at },
      '/site/totals': { done: count('done'), running: count('running'), waiting: count('waiting'), blocked: count('blocked'), updatedAt: at },
    },
  },
};
