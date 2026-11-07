// Example data written for the sample, not recorded from a source — no public source carries one building site's crews. It is
// ten in the morning on a weekday: the framing crew is pouring a floor under a wind advisory, the earthworks are steady, and
// the scaffolding on the outside has been stopped for an inspection. Each zone sends its summary and its tasks of the day.
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-11-03T01:00:00Z';

type Task = [string, string, string, 'ok' | 'warn' | 'alarm'];

const TASKS: Record<'A' | 'B' | 'C', Task[]> = {
  A: [
    ['3층 슬래브 타설', '콘크리트 팀', '09:00', 'warn'],
    ['4층 철근 배근', '철근 팀', '10:30', 'ok'],
    ['2층 거푸집 해체', '목수 팀', '13:00', 'ok'],
    ['안전 난간 점검', '안전 팀', '14:00', 'warn'],
    ['자재 반입 — 레미콘 2대', '자재 팀', '15:30', 'ok'],
  ],
  B: [
    ['남측 굴착 마무리', '토공 팀', '08:30', 'ok'],
    ['되메우기 다짐', '토공 팀', '11:00', 'ok'],
    ['배수로 정비', '설비 팀', '13:30', 'ok'],
    ['흙막이 계측 점검', '안전 팀', '15:00', 'ok'],
  ],
  C: [
    ['외부 비계 안전 점검', '안전 팀', '09:30', 'alarm'],
    ['비계 연결재 보강', '비계 팀', '11:00', 'alarm'],
    ['작업 재개 승인 대기', '감리', '14:00', 'warn'],
    ['외벽 마감재 반입', '자재 팀', '16:00', 'ok'],
  ],
};

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-11-03T01:00:10.000Z',
  responses: {
    site: {
      '/site/now': { name: '한결 주상복합 신축 현장', day: '화요일 오전', updatedAt: RECORDED },
      '/site/zones': {
        value: [
          { zone: 'A', name: '구역 A · 골조', summary: '3층 타설 중 — 강풍 주의보', state: 'warn', workers: 42, cap: 60, updatedAt: RECORDED },
          { zone: 'B', name: '구역 B · 토공', summary: '굴착 안정 — 계측 이상 없음', state: 'ok', workers: 18, cap: 30, updatedAt: RECORDED },
          { zone: 'C', name: '구역 C · 외부 비계', summary: '작업 중지 — 비계 점검', state: 'alarm', workers: 0, cap: 25, updatedAt: RECORDED },
        ],
        updatedAt: RECORDED,
      },
      '/site/tasks': {
        value: (Object.keys(TASKS) as Array<'A' | 'B' | 'C'>).flatMap(zone =>
          TASKS[zone].map(([task, crew, at, state], i) => ({ id: `${zone}${i + 1}`, zone, task, crew, at, state, updatedAt: RECORDED }))
        ),
        updatedAt: RECORDED,
      },
    },
  },
};
