// Example data written for the sample, not recorded from a source — no public source carries one class's marks. The mid-term of
// the second term of a lower-secondary year with five classes: 3rd-year class 2 has twenty-eight students, and the page sets
// its marks against the year's. The students' marks and study hours are made by a small fixed generator, so the data is the
// same on every build and every one is a plausible mark.
import type { SampleSnapshot } from '../sample-pack.js';

const RECORDED = '2026-10-30T06:00:00Z';

/** A small fixed generator: the same sequence every time, uniform in [0, 1). */
function sequence(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = sequence(20261030);

/** Twenty-eight students: the hours they studied the week before, and a mark that follows them with its own spread. */
const STUDENTS = Array.from({ length: 28 }, (_, i) => {
  const hours = Math.round((2 + random() * 12) * 2) / 2;
  const mark = Math.max(35, Math.min(100, Math.round(48 + hours * 3.1 + (random() - 0.5) * 22)));
  return { id: `s${i + 1}`, hours, score: mark };
});

/** The subjects as [name, this class's mean, the year's mean]. */
const SUBJECTS: Array<[string, number, number]> = [
  ['국어', 78, 74],
  ['수학', 71, 76],
  ['영어', 82, 77],
  ['과학', 75, 72],
  ['사회', 80, 75],
  ['역사', 69, 73],
];

/** The five classes' marks as [class, lowest, first quartile, median, third quartile, highest]. */
const CLASSES: Array<[string, number, number, number, number, number]> = [
  ['1반', 42, 58, 69, 79, 96],
  ['2반', 38, 62, 74, 84, 98],
  ['3반', 45, 60, 71, 80, 94],
  ['4반', 36, 55, 66, 77, 93],
  ['5반', 40, 59, 70, 81, 97],
];

/** What moved the class's mean from the last exam to this one, in points; the last row is the mean now. */
const STEPS: Array<[string, number, boolean?]> = [
  ['지난 시험 평균', 71.4, true],
  ['국어', 1.8],
  ['수학', -2.1],
  ['영어', 2.6],
  ['과학', 0.9],
  ['사회', 1.5],
  ['역사', -0.6],
  ['이번 시험 평균', 75.5, true],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-30T06:00:10.000Z',
  responses: {
    exam: {
      '/exam/now': { school: '한결 중학교', klass: '3학년 2반', exam: '2학기 중간고사', updatedAt: RECORDED },
      '/exam/students': { value: STUDENTS.map(s => ({ ...s, updatedAt: RECORDED })), updatedAt: RECORDED },
      '/exam/subjects': { value: SUBJECTS.map(([subject, mine, grade]) => ({ subject, '우리 반': mine, '학년 평균': grade })), updatedAt: RECORDED },
      '/exam/classes': {
        value: CLASSES.map(([klass, min, q1, median, q3, max]) => ({ klass, min, q1, median, q3, max })),
        updatedAt: RECORDED,
      },
      '/exam/steps': {
        value: STEPS.map(([step, delta, total]) => ({ step, delta, ...(total ? { total: true } : {}) })),
        updatedAt: RECORDED,
      },
    },
  },
};
