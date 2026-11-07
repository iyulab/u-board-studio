// Example data written for the sample, not recorded from a source — no public source carries one class's timetable.
// It is Thursday, third period, of the fifth week of the term in a lower secondary school class: thirty periods in a
// week (five days of six), the hours of each subject counted from them. Four periods are not ordinary — a lesson made
// up, two assessments, and one cancelled because the teacher is away — and the board has to say which.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T01:50:00Z';

type State = 'regular' | 'makeup' | 'exam' | 'cancelled';

/** The teacher and the room each subject has: [teacher, room]. A subject with no room of its own is taught in the class's. */
const WHO: Record<string, [string, string]> = {
  국어: ['한가람', '2-3'],
  수학: ['오세림', '2-3'],
  영어: ['문하늘', '2-3'],
  과학: ['윤새벽', '과학실'],
  사회: ['장보람', '2-3'],
  체육: ['배누리', '체육관'],
  음악: ['서아름', '음악실'],
  미술: ['송다온', '미술실'],
  '기술·가정': ['임소라', '가정실'],
  도덕: ['고은빛', '2-3'],
  창체: ['이솔', '2-3'],
  자습: ['이솔', '2-3'],
};

/** The week, a day to a row, a period to a place in it: [subject, state] — a period that differs from its ordinary
 *  self says so in the state. */
const WEEK: Array<[string, Array<[string, State?]>]> = [
  ['월요일', [['국어'], ['수학'], ['영어'], ['과학'], ['체육'], ['창체']]],
  ['화요일', [['사회'], ['국어'], ['수학'], ['영어', 'makeup'], ['미술'], ['기술·가정']]],
  ['수요일', [['과학'], ['영어'], ['국어'], ['사회'], ['도덕'], ['창체']]],
  ['목요일', [['수학'], ['체육'], ['과학'], ['사회'], ['음악', 'cancelled'], ['자습']]],
  ['금요일', [['국어'], ['수학', 'exam'], ['영어', 'exam'], ['체육'], ['기술·가정'], ['자습']]],
];

/** What a period that is not ordinary says in its line under the subject. */
const NOTES: Record<string, string> = {
  '화요일-4': '지난주 결강 보강',
  '목요일-5': '출장 → 자습으로 대체',
  '금요일-2': '단원 평가',
  '금요일-3': '말하기 평가',
};

const PERIODS = WEEK.flatMap(([day, row]) =>
  row.map(([subject, state = 'regular'], i) => {
    const [teacher, room] = WHO[subject]!;
    const period = i + 1;
    const note = NOTES[`${day}-${period}`] ?? `${teacher} · ${room}`;
    return { id: `${day}-${period}`, day, period, subject, state, note, now: day === '목요일' && period === 3, updatedAt: at };
  }),
);

/** The hours a subject has in the week, counted from the periods that really are held (a cancelled one is not). */
const HOURS = new Map<string, number>();
for (const p of PERIODS) if (p.state !== 'cancelled') HOURS.set(p.subject, (HOURS.get(p.subject) ?? 0) + 1);
const MAIN = ['국어', '수학', '영어', '과학', '사회'];

const CHANGES = PERIODS.filter(p => p.state !== 'regular').map(p => ({
  id: p.id,
  slot: `${p.day.slice(0, 1)} ${p.period}교시`,
  what: `${p.subject}`,
  note: p.note,
  state: p.state,
  updatedAt: at,
}));

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T01:50:30.000Z',
  responses: {
    school: {
      '/school/now': { school: '새솔중학교', classroom: '2학년 3반', week: '10월 5주차 · 목요일 3교시', updatedAt: at },
      '/school/periods': { value: PERIODS, updatedAt: at },
      '/school/changes': { value: CHANGES, updatedAt: at },
      '/school/hours': { value: MAIN.map(subject => ({ subject, hours: HOURS.get(subject) ?? 0 })), updatedAt: at },
    },
  },
};
