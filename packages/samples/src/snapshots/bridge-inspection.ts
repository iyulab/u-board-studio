// Example data written for the sample, not recorded from a source — no public source carries one bridge's inspection. It is a
// plate-girder bridge of 1998 on a provincial road, after its biennial inspection: the deck and the piers are sound, the girders
// are fine but for a coat, and the bearings are the one thing to repair — so the grade as a whole is the bearings' (the lowest
// member sets it). Keep it consistent: the verdict follows the lowest rating, and the posted load is below the design load by
// the share the bearings' wear takes.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T01:30:00Z';

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T01:30:30.000Z',
  responses: {
    bridge: {
      '/bridge/report': {
        name: '새말대교',
        route: '지방도 312호선',
        date: '2026-10-27',
        state: 'warn',
        loadState: 'warn',
        verdict: 'C 등급 — 보수 필요',
        verdictNote: '받침의 고무가 늙어 한 곳이 기울었습니다. 다른 부재는 양호해 통행은 그대로 둡니다.',
        loadNote: '받침 보수가 끝날 때까지 게시 하중을 설계 하중보다 낮춰 둡니다.',
        score: 68,
        scoreMax: 100,
        built: 1998,
        length: 184,
        width: 11.5,
        spans: 4,
        adt: 18400,
        deck: 7,
        girders: 7,
        bearings: 5,
        piers: 8,
        posted: 32,
        design: 40,
        updatedAt: at,
      },
      '/bridge/defects': {
        value: [
          { id: 'd-07', what: '받침 B2 고무 노화 · 한쪽 기울어짐', where: '2번 교각 · 상류', action: '교체', state: 'warn', updatedAt: at },
          { id: 'd-05', what: '신축이음 틈에서 물이 샘', where: '3번 경간 끝', action: '보수', state: 'warn', updatedAt: at },
          { id: 'd-03', what: '바닥판 아래 균열 폭 0.2 mm', where: '2번 경간 중앙', action: '관찰', state: 'info', updatedAt: at },
          { id: 'd-01', what: '난간 도장 박리', where: '하류 쪽 전 구간', action: '재도장', state: 'ok', updatedAt: at },
        ],
        updatedAt: at,
      },
    },
  },
};
