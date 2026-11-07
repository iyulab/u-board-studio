// Example data written for the sample, not recorded from a source — no public source carries one zoo's queues and programs. It
// is two in the afternoon on a Saturday: the savanna's crowd is the largest, the aquarium's feeding is on now and the bird
// house's show is next.
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-11-03T05:00:00Z';

type Program = [zone: 'savanna' | 'aquarium' | 'birds', at: string, what: string, state: 'now' | 'soon' | 'later'];

const PROGRAMS: Program[] = [
  ['savanna', '13:30', '기린 먹이 주기', 'now'],
  ['savanna', '14:30', '사자 사육사 이야기', 'soon'],
  ['savanna', '15:30', '코끼리 목욕', 'later'],
  ['aquarium', '14:00', '펭귄 먹이 시간', 'now'],
  ['aquarium', '15:00', '바다사자 훈련 보기', 'soon'],
  ['aquarium', '16:00', '해파리 야간 조명', 'later'],
  ['birds', '14:20', '앵무새 말하기 쇼', 'soon'],
  ['birds', '15:10', '맹금류 비행 시범', 'later'],
  ['birds', '16:00', '홍학 무리 걷기', 'later'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-11-03T05:00:10.000Z',
  responses: {
    park: {
      '/park/now': { name: '바람언덕 동물원', day: '토요일 오후 2시', updatedAt: RECORDED },
      '/park/crowd': { savanna: 38, aquarium: 12, birds: 5, updatedAt: RECORDED },
      '/park/programs': {
        value: PROGRAMS.map(([zone, at, what, state], i) => ({ id: `p${i + 1}`, zone, at, what, state, updatedAt: RECORDED })),
        updatedAt: RECORDED,
      },
    },
  },
};
