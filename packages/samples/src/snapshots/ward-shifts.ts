// Example data written for the sample, not recorded from a source — no public source carries one ward's shifts and handover
// notes. It is twenty past four in the afternoon on a Tuesday: the day shift ended at three, the evening shift is an hour and
// twenty minutes in, and the night shift starts at eleven. Nothing in it says which shift is in which state — the board reads
// that from each shift's start time and the time it is read (it draws a recording by the recording's own clock).
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-11-03T07:20:00Z';

/** `HH:mm` in Korea (UTC+9) on the day of the recording, as an ISO instant. */
function startOf(timeOfDay: string): string {
  const [h, m] = timeOfDay.split(':').map(Number);
  return new Date(Date.parse('2026-11-03T00:00:00Z') + ((h! - 9) * 60 + m!) * 60_000).toISOString().replace('.000Z', 'Z');
}

type Memo = [shift: 'day' | 'evening' | 'night', band: 'urgent' | 'routine', note: string, at: string];

const MEMOS: Memo[] = [
  ['day', 'routine', '12호 수액 교체 완료 — 다음은 18시', '11:40'],
  ['day', 'routine', '7호 보호자 면담 — 퇴원 안내 설명', '13:00'],
  ['day', 'urgent', '3호 혈압 불안정 — 저녁에도 30분 간격 확인', '14:30'],
  ['evening', 'urgent', '3호 혈압 30분 간격 확인 (16:30 다음)', '16:00'],
  ['evening', 'routine', '5호 석식 전 혈당 측정', '17:00'],
  ['evening', 'routine', '9호 신규 입원 — 병실 준비 끝', '18:30'],
  ['night', 'routine', '12호 수액 교체 — 22시', '22:00'],
  ['night', 'urgent', '3호 상태에 따라 당직의 호출 기준 확인', '23:00'],
  ['night', 'routine', '새벽 5시 채혈 대상 4명 — 명단은 스테이션', '05:00'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-11-03T07:20:20.000Z',
  responses: {
    ward: {
      '/ward/now': { name: '내과 병동 7B', day: '화요일', updatedAt: RECORDED },
      '/ward/shifts': {
        value: [
          { id: 'day', name: '주간', hours: '07–15시', nurses: 6, start: startOf('07:00'), updatedAt: RECORDED },
          { id: 'evening', name: '저녁', hours: '15–23시', nurses: 5, start: startOf('15:00'), updatedAt: RECORDED },
          { id: 'night', name: '야간', hours: '23–07시', nurses: 4, start: startOf('23:00'), updatedAt: RECORDED },
        ],
        updatedAt: RECORDED,
      },
      '/ward/memos': {
        value: MEMOS.map(([shift, band, note, at], i) => ({ id: `m${i + 1}`, shift, band, note, at, updatedAt: RECORDED })),
        updatedAt: RECORDED,
      },
    },
  },
};
