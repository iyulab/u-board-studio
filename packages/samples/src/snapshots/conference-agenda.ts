// Example data written for the sample, not recorded from a source — no public source carries one conference's programme. It
// is twenty past two in the afternoon of the second day: three halls run 45-minute sessions, each hall starting at a different
// quarter of the hour, so the sessions «now» and «next» form a wavefront across the halls. Nothing in it says which session
// is in which state — the board reads that from each session's start time and the time it is read (the board draws a recording
// by the recording's own clock, so it says now what it said then).
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-10-29T05:20:00Z';
/** The hall's sessions as [time of day in Korea, title, speaker, featured]. */
type Row = [string, string, string, boolean?];

const HALLS: Array<{ room: string; rows: Row[] }> = [
  {
    room: 'A홀',
    rows: [
      ['12:30', '레이크하우스, 이제 선택이 아니라 기본', '이도윤'],
      ['13:15', '테이블 포맷 전쟁의 끝', '박지후'],
      ['14:00', '스트리밍 장애 사후 분석 열두 가지', '최하은'],
      ['14:45', '피처 스토어 없이 시작하기', '정민재'],
      ['15:30', '초청 강연 — 데이터는 누구의 것인가', '한서윤', true],
      ['16:15', '폐막 패널 — 2027 로드맵', '패널 토론'],
    ],
  },
  {
    room: 'B홀',
    rows: [
      ['12:45', '쿼리 플랜 읽기 워크숍', '오세린'],
      ['13:30', '모델 리팩터링 실습', '강태오'],
      ['14:15', '변경 데이터 캡처 파이프라인 직접 만들기', '윤지아'],
      ['15:00', '데이터 계약 쓰기 실습', '신우진'],
      ['15:45', '관측 가능한 파이프라인', '임서현'],
      ['16:30', '실습 마무리와 질의응답', '진행팀'],
    ],
  },
  {
    room: 'C홀',
    rows: [
      ['13:00', '은행 코어 이관 사례', '문재원'],
      ['13:45', '물류 실시간 도착 예측 사례', '배소율'],
      ['14:30', '병원 데이터 거버넌스 사례', '송하준'],
      ['15:15', '제조 품질 예측 사례', '조은서'],
      ['16:00', '공공데이터 개방 사례', '류시안'],
      ['16:45', '데이터팀 첫 90일', '노아름'],
    ],
  },
];

/** `HH:mm` in Korea (UTC+9) on the day of the recording, as an ISO instant. */
function startOf(timeOfDay: string): string {
  const [h, m] = timeOfDay.split(':').map(Number);
  return new Date(Date.parse('2026-10-29T00:00:00Z') + ((h! - 9) * 60 + m!) * 60_000).toISOString().replace('.000Z', 'Z');
}

// In the order the board lays them out: slot by slot, a card for each hall, so a row is the same slot of the three.
const sessions = HALLS[0]!.rows.flatMap((_, slot) =>
  HALLS.map(({ room, rows }) => {
    const [at, title, speaker, featured] = rows[slot]!;
    return { id: `${room}-${at}`, room, at, start: startOf(at), title, speaker, featured: featured === true, updatedAt: RECORDED };
  })
);

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T05:20:20.000Z',
  responses: {
    program: {
      '/program/now': {
        name: '데이터 엔지니어링 컨퍼런스 2026',
        day: '둘째 날',
        updatedAt: RECORDED,
      },
      '/program/sessions': { value: sessions, updatedAt: RECORDED },
      '/program/notices': {
        value: [
          { id: 'lunch', note: '점심 도시락은 2층 로비에서 14시 30분까지 받을 수 있어요', at: '14:30' },
          { id: 'networking', note: '네트워킹 간식 시간 — 3층 라운지', at: '15:30' },
          { id: 'survey', note: '설문에 답하면 기념품을 드립니다 — 안내 데스크', at: '17:00' },
          { id: 'cloak', note: '보관소는 행사 종료 30분 뒤에 닫습니다', at: '18:30' },
        ],
        updatedAt: RECORDED,
      },
    },
  },
};
