// Example data written for the sample, not recorded from a source — no public source carries a service's own
// status. It is mid-afternoon on a weekday: nine of twelve services are fine, payment and notifications are slow and
// the data pipeline is in its planned maintenance. Keep it consistent: the count of services that are fine is
// counted from the services, and the incidents are the ones that are not fine plus yesterday's, which is over.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T06:10:00Z';

type State = 'ok' | 'warn' | 'alarm' | 'info';

const SERVICES: Array<[string, State]> = [
  ['API 게이트웨이', 'ok'],
  ['인증', 'ok'],
  ['결제', 'warn'],
  ['알림 발송', 'warn'],
  ['파일 저장소', 'ok'],
  ['검색', 'ok'],
  ['웹 콘솔', 'ok'],
  ['모바일 API', 'ok'],
  ['웹훅', 'ok'],
  ['데이터 파이프라인', 'info'],
  ['리포트 생성', 'ok'],
  ['관리자 도구', 'ok'],
];
/** What each state is called on the page — the words the board's statuses carry, which a cell shows beside the name. */
const WORDS: Record<State, string> = { ok: '정상', warn: '성능 저하', alarm: '장애', info: '점검 중' };
const up = SERVICES.filter(([, state]) => state === 'ok').length;

/** The 95th percentile of the gateway's response time by hour, in ms: steady, then a rise in the afternoon that is the payment slowdown. */
const P95 = [112, 108, 104, 101, 99, 103, 118, 134, 141, 138, 136, 140, 144, 139, 188, 246, 231, 187, 152, 138, 131, 124, 118, 114];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T06:10:30.000Z',
  responses: {
    status: {
      '/status/now': {
        name: '온새미 플랫폼',
        state: SERVICES.some(([, st]) => st === 'alarm') ? 'alarm' : SERVICES.some(([, st]) => st === 'warn') ? 'warn' : 'ok',
        summary: '일부 서비스 성능 저하',
        detail: '결제와 알림 발송이 평소보다 느립니다 — 조치 중입니다',
        up,
        total: SERVICES.length,
        updatedAt: at,
      },
      '/status/services': { value: SERVICES.map(([name, state]) => ({ name, state, words: WORDS[state], updatedAt: at })), updatedAt: at },
      '/status/latency': { value: P95.map((p95, hour) => ({ hour: `${String(hour).padStart(2, '0')}:00`, p95 })), updatedAt: at },
      '/status/incidents': {
        value: [
          { id: 'inc-0412', title: '결제 승인 지연', note: '카드사 응답이 느려 승인에 몇 초가 더 걸립니다', state: 'warn', when: '14:20', updatedAt: at },
          { id: 'inc-0413', title: '알림 발송 지연', note: '발송 큐가 쌓여 처리량을 늘리는 중입니다', state: 'warn', when: '14:45', updatedAt: at },
          { id: 'inc-0409', title: '데이터 파이프라인 점검', note: '예정된 점검 — 16:00에 끝납니다', state: 'info', when: '13:00', updatedAt: at },
          { id: 'inc-0408', title: '웹 콘솔 502', note: '해결됨 — 배포를 되돌렸습니다', state: 'ok', when: '어제', updatedAt: at },
        ],
        updatedAt: at,
      },
    },
  },
};
