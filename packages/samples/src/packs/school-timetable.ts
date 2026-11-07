// One class's week as a timetable: a row for each day and in it a tile for each period, the subject with its teacher
// and room. The period being taught now is ringed; a lesson made up, an assessment, a lesson cancelled say so in their
// state. Nothing here is drawn by an element of its own: five built-in parts, the rows made by one rule — the periods
// grouped by day, flowing in a box each. Plain paper, no drawing behind it.
// No public source carries one class's timetable, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/school-timetable.js';

const board: Board = {
  board: {
    title: '시간표',
    theme: 'light',
    accent: '#2f6f5e',
    skin: {
      palette: { paper: '#f6f7f4', ink: '#1f2a37', muted: '#6b7684', rule: '#d9ddd5' },
      frame: 'flat',
      radius: 6,
    },
  },
  statuses: {
    regular: { tone: 'idle', label: '수업' },
    makeup: { tone: 'info', label: '보강' },
    exam: { tone: 'warn', label: '평가' },
    cancelled: { tone: 'alarm', label: '결강', emphasis: 'invert' },
  },
  data: {
    school: {
      from: 'school',
      path: '/school/now',
      time: 'updatedAt',
      fields: { school: {}, classroom: {}, week: {} },
    },
    periods: {
      from: 'school',
      path: '/school/periods',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, day: {}, period: {}, subject: {}, note: {}, now: {} },
    },
    changes: {
      from: 'school',
      path: '/school/changes',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, slot: {}, what: {}, note: {} },
    },
    hours: {
      from: 'school',
      path: '/school/hours',
      list: '/value',
      key: 'subject',
      time: 'updatedAt',
      fields: { hours: { unit: '시간' } },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'school',
      title: '{{school}} {{classroom}} · {{week}}',
      kicker: '주간 시간표',
      subtitle: '예시 데이터',
    },
    period: {
      as: 'status-card',
      each: 'periods',
      title: '{{subject}}',
      subtitle: '{{note}}',
      show: ['state'],
      highlight: 'now',
    },
    changes: {
      as: 'list',
      of: 'changes',
      title: '이번 주 달라진 시간',
      primary: 'what',
      secondary: 'note',
      trailing: 'slot',
    },
    hours: {
      as: 'bar-list',
      of: 'hours',
      title: '이번 주 수업 시수',
      label: 'subject',
      value: 'hours',
    },
  },
  layout: {
    kind: 'canvas',
    size: [1280, 1176],
    place: {
      title: [24, 16, 1232, 84],
      period: {
        by: 'day',
        boxes: { at: [24, 112], gap: [16, 10], columns: 1, label: '{{key}}' },
        flow: { cell: [190, 96], gap: [8, 8], columns: 6, pad: [10, 30] },
      },
      changes: [24, 848, 760, 300],
      hours: [800, 848, 456, 300],
    },
  },
};

export const schoolTimetable: SamplePack = {
  id: 'school-timetable',
  title: { ko: '학급 시간표', en: 'Class timetable' },
  field: { ko: '교육·학교', en: 'School' },
  kind: { ko: '도면 위 배치(캔버스) — 요일마다 한 줄, 교시마다 한 칸', en: 'Placed on a drawing (canvas) — a row a day, a tile a period' },
  domain: 'education',
  styles: ['minimal'],
  summary: {
    ko: '중학교 한 학급의 주간 시간표 — 요일마다 한 줄에 교시마다 한 칸, 과목과 선생님·교실이 보이고, 지금 수업 중인 칸에 고리가 걸린다. 보강·평가·결강인 시간은 상태로 말하고, 아래에는 이번 주 달라진 시간과 주요 과목의 시수. 요소 없이 빌트인 부품 넷과 «요일로 묶어 흘려 놓기» 한 규칙으로 그렸다. 예시 데이터.',
    en: 'A lower secondary class\'s week as a timetable — a row a day and a tile a period, each with the subject, teacher and room, the period being taught now ringed. A lesson made up, an assessment or a cancelled one says so in its state; below, what changed this week and the hours of the main subjects. Drawn with no element of its own: four built-in parts and one rule that groups the periods by day. Example data.',
  },
  connectors: [
    {
      key: 'school',
      name: '예시 학급 시간표',
      example: true,
      attribution: { text: '예시 데이터 — 실제 학급이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
