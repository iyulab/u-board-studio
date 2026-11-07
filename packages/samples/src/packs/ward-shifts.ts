// A hospital ward's handover board across its three shifts: a card for each in the state its start time puts it in — over,
// on now, next — and under each the handover notes of that shift, large enough to read. The board opens on the shift that is
// on now: three triggers on the board's first drawing, each held back until its own shift is the one on now, bring that
// shift's notes into view, so whoever opens the board at four in the afternoon lands on the evening shift's and at midnight
// on the night shift's. Nothing here is drawn by an element of its own: built-in parts only. No public source carries one
// ward's shifts, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/ward-shifts.js';

const board: Board = {
  board: {
    title: '병동 교대 인수인계',
    theme: 'light',
    accent: '#0f766e',
    skin: {
      palette: { paper: '#f2f7f6', ink: '#12302d', muted: '#5b7a76', rule: '#c5dad6' },
      frame: 'flat',
      radius: 10,
    },
  },
  statuses: {
    past: { tone: 'past', label: '근무 끝' },
    now: { tone: 'now', label: '근무 중', emphasis: 'invert' },
    next: { tone: 'next', label: '다음 근무' },
    later: { tone: 'idle', label: '예정' },
    urgent: { tone: 'alarm', label: '확인' },
    routine: { tone: 'idle', label: '일상' },
  },
  data: {
    ward: {
      from: 'ward',
      path: '/ward/now',
      time: 'updatedAt',
      fields: { name: {}, day: {} },
    },
    shifts: {
      from: 'ward',
      path: '/ward/shifts',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: {
        // A shift started more than eight hours ago is over, one that started within the last eight is on now, one that starts
        // within the next eight is next. The shifts are all eight hours, so the start time says all of it.
        start: { state: { relative: ['past', -28800, 'now', 1, 'next', 28800, 'later'] } },
        name: {},
        hours: {},
        nurses: { unit: '명' },
      },
    },
    memosDay: {
      from: 'ward',
      path: '/ward/memos',
      list: '/value',
      key: 'id',
      where: { shift: 'day' },
      time: 'updatedAt',
      fields: { band: { state: 'raw' }, note: {}, at: {} },
    },
    memosEvening: {
      from: 'ward',
      path: '/ward/memos',
      list: '/value',
      key: 'id',
      where: { shift: 'evening' },
      time: 'updatedAt',
      fields: { band: { state: 'raw' }, note: {}, at: {} },
    },
    memosNight: {
      from: 'ward',
      path: '/ward/memos',
      list: '/value',
      key: 'id',
      where: { shift: 'night' },
      time: 'updatedAt',
      fields: { band: { state: 'raw' }, note: {}, at: {} },
    },
  },
  parts: {
    title: { as: 'header', of: 'ward', title: '{{name}} · {{day}}', kicker: '교대 인수인계', subtitle: '열면 지금 근무 중인 조의 인계 메모로 바로 갑니다 · 예시 데이터' },
    day: { as: 'status-card', of: 'shifts[day]', title: '{{name}} {{hours}}', subtitle: '간호 {{nurses}}', show: ['start'] },
    evening: { as: 'status-card', of: 'shifts[evening]', title: '{{name}} {{hours}}', subtitle: '간호 {{nurses}}', show: ['start'] },
    night: { as: 'status-card', of: 'shifts[night]', title: '{{name}} {{hours}}', subtitle: '간호 {{nurses}}', show: ['start'] },
    notesDay: { as: 'list', of: 'memosDay', title: '주간조 인계', primary: 'note', trailing: 'at', state: 'band' },
    notesEvening: { as: 'list', of: 'memosEvening', title: '저녁조 인계', primary: 'note', trailing: 'at', state: 'band' },
    notesNight: { as: 'list', of: 'memosNight', title: '야간조 인계', primary: 'note', trailing: 'at', state: 'band' },
  },
  // When the board first draws, it goes to the notes of the shift that is on now — each trigger waits for its own shift.
  triggers: [
    { on: { event: 'open' }, when: { part: 'day', status: 'now' }, do: [{ action: 'focus', part: 'notesDay' }] },
    { on: { event: 'open' }, when: { part: 'evening', status: 'now' }, do: [{ action: 'focus', part: 'notesEvening' }] },
    { on: { event: 'open' }, when: { part: 'night', status: 'now' }, do: [{ action: 'focus', part: 'notesNight' }] },
  ],
  layout: {
    kind: 'canvas',
    size: [2400, 760],
    place: {
      title: [24, 16, 2352, 84],
      day: [40, 130, 720, 140],
      evening: [840, 130, 720, 140],
      night: [1640, 130, 720, 140],
      notesDay: [40, 330, 720, 360],
      notesEvening: [840, 330, 720, 360],
      notesNight: [1640, 330, 720, 360],
    },
    shapes: {
      frameDay: { box: [24, 300, 752, 430], label: '주간 07–15', dash: true },
      frameEvening: { box: [824, 300, 752, 430], label: '저녁 15–23', dash: true },
      frameNight: { box: [1624, 300, 752, 430], label: '야간 23–07', dash: true },
    },
  },
};

export const wardShifts: SamplePack = {
  id: 'ward-shifts',
  title: { ko: '병동 교대 인수인계', en: 'Ward shift handover' },
  field: { ko: '병동 간호 인수인계', en: 'Ward nursing handover' },
  kind: { ko: '넓은 도면 — 열면 지금 근무 중인 조의 메모로 바로 간다', en: 'One wide drawing — opens on the notes of the shift on now' },
  domain: 'health',
  styles: ['operations'],
  summary: {
    ko: '내과 병동의 교대 인수인계판 — 주간 · 저녁 · 야간 세 조가 카드 한 장씩 시작 시각이 정하는 상태(끝 · 근무 중 · 다음)로 서고, 아래에 조마다 인계 메모가 놓인다. 보드를 처음 열면 지금 근무 중인 조의 메모로 스스로 가까이 간다 — 첫 그리기에 걸린 트리거 셋이 각자 «자기 조가 근무 중일 때만» 움직인다. 예시 데이터.',
    en: "A medical ward's shift handover board — the day, evening and night shifts as a card each in the state its start time puts it in (over, on now, next), and under them each shift's handover notes. When the board is first opened it goes by itself to the notes of the shift on now — three triggers on the first drawing, each moving only while its own shift is the one on now. Example data.",
  },
  connectors: [
    {
      key: 'ward',
      name: '예시 병동 근무',
      example: true,
      attribution: { text: '예시 데이터 — 실제 병동이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
