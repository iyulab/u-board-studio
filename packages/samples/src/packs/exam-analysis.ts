// One class's mid-term as an analyst would lay it out: five kinds of chart that none of the other boards draws — a radar of the
// subjects against the year's, the spread of the class's marks, the five classes' marks side by side as boxes, the hours studied
// against the mark, and what moved the mean since the last exam — with the class's count, mean, highest and lowest counted from
// the list of its students. Nothing here is drawn by an element of its own: built-in parts only. No public source carries one
// class's marks, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/exam-analysis.js';

const board: Board = {
  board: {
    title: '시험 결과 분석',
    theme: 'light',
    accent: '#b45309',
    skin: {
      palette: { paper: '#fbf8f1', ink: '#232018', muted: '#7a7261', rule: '#d9d1bd' },
      frame: 'flat',
      radius: 4,
    },
  },
  data: {
    exam: {
      from: 'exam',
      path: '/exam/now',
      time: 'updatedAt',
      fields: { school: {}, klass: {}, exam: {} },
    },
    // Counted from the list of students: how many sat, the mean, the highest and the lowest mark.
    summary: {
      from: 'exam',
      path: '/exam/students',
      list: '/value',
      time: 'updatedAt',
      fields: {
        count: { derive: { op: 'count' }, unit: '명' },
        mean: { derive: { op: 'avg', field: 'score' }, unit: '점', digits: 1 },
        top: { derive: { op: 'max', field: 'score' }, unit: '점' },
        low: { derive: { op: 'min', field: 'score' }, unit: '점' },
      },
    },
    students: { from: 'exam', path: '/exam/students', list: '/value', answerTime: '/updatedAt' },
    subjects: { from: 'exam', path: '/exam/subjects', list: '/value', answerTime: '/updatedAt' },
    classes: { from: 'exam', path: '/exam/classes', list: '/value', answerTime: '/updatedAt' },
    steps: { from: 'exam', path: '/exam/steps', list: '/value', answerTime: '/updatedAt' },
  },
  parts: {
    title: {
      as: 'header',
      of: 'exam',
      title: '{{school}} {{klass}} · {{exam}}',
      kicker: '시험 결과 분석',
      subtitle: '예시 데이터',
    },
    count: { as: 'stat', of: 'summary', show: 'count', title: '응시' },
    mean: { as: 'stat', of: 'summary', show: 'mean', title: '평균' },
    top: { as: 'stat', of: 'summary', show: 'top', title: '최고' },
    low: { as: 'stat', of: 'summary', show: 'low', title: '최저' },
    subjects: {
      as: 'chart.radar',
      of: 'subjects',
      title: '과목별 평균 — 우리 반과 학년',
      axis: 'subject',
      y: ['우리 반', '학년 평균'],
    },
    spread: {
      as: 'chart.histogram',
      of: 'students',
      title: '점수 분포',
      value: 'score',
      bins: 7,
    },
    classes: {
      as: 'chart.box',
      of: 'classes',
      title: '반별 점수 분포',
      x: 'klass',
      y: ['min', 'q1', 'median', 'q3', 'max'],
    },
    hours: {
      as: 'chart.scatter',
      of: 'students',
      title: '공부한 시간과 점수',
      x: 'hours',
      y: 'score',
    },
    steps: {
      as: 'chart.waterfall',
      of: 'steps',
      title: '평균은 무엇 때문에 움직였나 (점)',
      x: 'step',
      y: 'delta',
      total: 'total',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      ['count', 3],
      ['mean', 3],
      ['top', 3],
      ['low', 3],
      { id: 'subjects', span: 6, height: 340 },
      { id: 'spread', span: 6, height: 340 },
      { id: 'classes', span: 6, height: 320 },
      { id: 'hours', span: 6, height: 320 },
      { id: 'steps', span: 12, height: 320 },
    ],
  },
};

export const examAnalysis: SamplePack = {
  id: 'exam-analysis',
  title: { ko: '시험 결과 분석', en: 'Exam results analysis' },
  field: { ko: '교육·성적 분석', en: 'Education & marks analysis' },
  kind: { ko: '그리드 배치 — 한 반의 시험을 다섯 가지 차트로', en: "Grid layout — one class's exam in five kinds of chart" },
  domain: 'education',
  styles: ['print'],
  summary: {
    ko: '중학교 한 반의 중간고사를 분석가처럼 펼친 한 장 — 응시 · 평균 · 최고 · 최저(학생 목록에서 센 값), 과목별 평균을 학년과 겹친 레이더, 점수 분포 히스토그램, 다섯 반의 상자그림, 공부한 시간과 점수의 산점도, 평균을 움직인 요인의 폭포 차트. 다른 판이 그리지 않은 차트 다섯 종. 예시 데이터.',
    en: "One lower-secondary class's mid-term laid out as an analyst would — the count, mean, highest and lowest marks (counted from the list of students), a radar of the subjects' means over the year's, a histogram of the marks, box plots of the five classes, a scatter of hours studied against the mark, and a waterfall of what moved the mean. Five kinds of chart no other board draws. Example data.",
  },
  connectors: [
    {
      key: 'exam',
      name: '예시 성적 관리',
      example: true,
      attribution: { text: '예시 데이터 — 실제 학교가 아닙니다' },
    },
  ],
  board,
  snapshot,
};
