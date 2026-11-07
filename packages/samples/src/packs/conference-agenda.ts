// A conference's programme on the lobby screen: a card for each session of the three halls, laid out slot by slot, each in
// the state its start time puts it in — over, on now, next, later — read against the time the board is read, so the screen
// keeps its own state as the afternoon goes and the data never says which session is where. One session is ringed by itself:
// the talk to catch, whatever state it is in. Nothing here is drawn by an element of its own: four built-in parts, the cards
// made by one rule — a part for each session of a list. No public source carries one conference's programme, so the values
// are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/conference-agenda.js';

const board: Board = {
  board: {
    title: '오늘의 세션',
    theme: 'dark',
    accent: '#a78bfa',
    skin: {
      palette: { paper: '#14121f', ink: '#eeeaf7', muted: '#9a93b3', rule: '#2e2a45' },
      frame: 'flat',
      radius: 8,
    },
  },
  statuses: {
    past: { tone: 'past', label: '종료' },
    now: { tone: 'now', label: '진행 중', emphasis: 'invert' },
    next: { tone: 'next', label: '곧 시작' },
    later: { tone: 'idle', label: '예정' },
  },
  data: {
    event: {
      from: 'program',
      path: '/program/now',
      time: 'updatedAt',
      fields: { name: {}, day: {} },
    },
    sessions: {
      from: 'program',
      path: '/program/sessions',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: {
        // A session started more than 45 minutes ago is over, one that started within the last 45 is on now, one that starts
        // within the next 45 is next. The sessions are all 45 minutes, so the start time says all of it.
        start: { state: { relative: ['past', -2700, 'now', 1, 'next', 2700, 'later'] } },
        at: {},
        room: {},
        title: {},
        speaker: {},
        featured: {},
      },
    },
    notices: {
      from: 'program',
      path: '/program/notices',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { note: {}, at: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'event',
      title: '{{name}} · {{day}}',
      kicker: '세션 안내',
      subtitle: '로비 안내판 · 예시 데이터',
    },
    session: {
      as: 'status-card',
      each: 'sessions',
      title: '{{title}}',
      subtitle: '{{room}} · {{at}} · {{speaker}}',
      show: ['start'],
      highlight: 'featured',
    },
    notices: {
      as: 'list',
      of: 'notices',
      title: '안내',
      primary: 'note',
      trailing: 'at',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      { id: 'session', span: 4 },
      { id: 'notices', span: 12, height: 260 },
    ],
  },
};

export const conferenceAgenda: SamplePack = {
  id: 'conference-agenda',
  title: { ko: '학회 세션 안내판', en: 'Conference session screen' },
  field: { ko: '교육·행사', en: 'Events' },
  kind: { ko: '그리드 배치 — 세션마다 한 카드, 시각이 상태를 정한다', en: 'Grid layout — a card a session, its time sets its state' },
  domain: 'education',
  styles: ['signage'],
  summary: {
    ko: '학회 둘째 날 오후의 로비 안내판 — 세 홀의 세션이 한 카드씩 시간 순으로 깔리고, 카드마다 종료 · 진행 중 · 곧 시작 · 예정이 붙는다. 상태는 데이터가 말해 주지 않는다: 세션의 시작 시각을 지금과 견줘 보드가 읽으므로 오후가 흘러도 화면이 스스로 따라간다. 한 카드는 상태와 별개로 고리가 걸려 «놓치지 말 것»을 가리키고, 아래에는 안내 목록이 있다. 예시 데이터.',
    en: "A conference lobby screen on the afternoon of its second day — the sessions of three halls laid out card by card in time order, each carrying over, on now, next or later. The data never says which: the board reads each session's start time against the time it is read, so the screen follows the afternoon on its own. One card is ringed apart from its state to point at the talk to catch, and a list of notices sits below. Example data.",
  },
  connectors: [
    {
      key: 'program',
      name: '예시 학회 프로그램',
      example: true,
      attribution: { text: '예시 데이터 — 실제 행사가 아닙니다' },
    },
  ],
  board,
  snapshot,
};
