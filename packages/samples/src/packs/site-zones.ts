// A building site's morning on one wide drawing: a card for each of the three zones in its state, and far below them the
// day's tasks of each zone, large enough to read. Pressing a zone's card takes the view to that zone's tasks, and a zone that
// goes into alarm does the same by itself — the overview stays small and the detail is a press away. Nothing here is drawn
// by an element of its own: built-in parts only, three triggers that press a card and three that follow a status. No public
// source carries one site's crews, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/site-zones.js';

const board: Board = {
  board: {
    title: '현장 구역 상황판',
    theme: 'dark',
    accent: '#38bdf8',
    skin: {
      palette: { paper: '#0e2038', ink: '#e8f0fa', muted: '#8fa6c2', rule: '#2a4a72' },
      frame: 'flat',
      radius: 6,
    },
  },
  statuses: {
    ok: { tone: 'ok', label: '정상' },
    warn: { tone: 'warn', label: '주의' },
    alarm: { tone: 'alarm', label: '작업 중지', emphasis: 'invert' },
  },
  data: {
    site: {
      from: 'site',
      path: '/site/now',
      time: 'updatedAt',
      fields: { name: {}, day: {} },
    },
    zones: {
      from: 'site',
      path: '/site/zones',
      list: '/value',
      key: 'zone',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, summary: {}, workers: { unit: '명' }, cap: {} },
    },
    tasksA: {
      from: 'site',
      path: '/site/tasks',
      list: '/value',
      key: 'id',
      where: { zone: 'A' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, task: {}, crew: {}, at: {} },
    },
    tasksB: {
      from: 'site',
      path: '/site/tasks',
      list: '/value',
      key: 'id',
      where: { zone: 'B' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, task: {}, crew: {}, at: {} },
    },
    tasksC: {
      from: 'site',
      path: '/site/tasks',
      list: '/value',
      key: 'id',
      where: { zone: 'C' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, task: {}, crew: {}, at: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'site',
      title: '{{name}} · {{day}}',
      kicker: '현장 구역 상황판',
      subtitle: '예시 데이터',
    },
    zoneA: {
      as: 'status-card',
      of: 'zones[A]',
      title: '{{name}}',
      subtitle: '{{summary}}',
      state: 'state',
      meter: { field: 'workers', max: 'cap', form: 'bar' },
    },
    zoneB: {
      as: 'status-card',
      of: 'zones[B]',
      title: '{{name}}',
      subtitle: '{{summary}}',
      state: 'state',
      meter: { field: 'workers', max: 'cap', form: 'bar' },
    },
    zoneC: {
      as: 'status-card',
      of: 'zones[C]',
      title: '{{name}}',
      subtitle: '{{summary}}',
      state: 'state',
      meter: { field: 'workers', max: 'cap', form: 'bar' },
    },
    detailA: { as: 'list', of: 'tasksA', title: '구역 A — 오늘의 작업', primary: 'task', secondary: 'crew', trailing: 'at', state: 'state' },
    detailB: { as: 'list', of: 'tasksB', title: '구역 B — 오늘의 작업', primary: 'task', secondary: 'crew', trailing: 'at', state: 'state' },
    detailC: { as: 'list', of: 'tasksC', title: '구역 C — 오늘의 작업', primary: 'task', secondary: 'crew', trailing: 'at', state: 'state' },
  },
  triggers: [
    { on: { event: 'click', part: 'zoneA' }, do: [{ action: 'focus', part: 'detailA' }] },
    { on: { event: 'click', part: 'zoneB' }, do: [{ action: 'focus', part: 'detailB' }] },
    { on: { event: 'click', part: 'zoneC' }, do: [{ action: 'focus', part: 'detailC' }] },
    { on: { event: 'enter', part: 'zoneA', status: 'alarm' }, do: [{ action: 'focus', part: 'detailA' }] },
    { on: { event: 'enter', part: 'zoneB', status: 'alarm' }, do: [{ action: 'focus', part: 'detailB' }] },
    { on: { event: 'enter', part: 'zoneC', status: 'alarm' }, do: [{ action: 'focus', part: 'detailC' }] },
  ],
  layout: {
    kind: 'canvas',
    size: [1800, 920],
    place: {
      title: [24, 16, 1752, 84],
      zoneA: [48, 130, 520, 150],
      zoneB: [640, 130, 520, 150],
      zoneC: [1232, 130, 520, 150],
      detailA: [48, 410, 520, 440],
      detailB: [640, 410, 520, 440],
      detailC: [1232, 410, 520, 440],
    },
    shapes: {
      hint: { text: '구역 카드를 누르면 아래의 그 구역 작업으로 가까이 갑니다', at: [48, 330], size: 18, tone: 'idle' },
      frameA: { box: [24, 360, 568, 520], label: '구역 A', dash: true },
      frameB: { box: [616, 360, 568, 520], label: '구역 B', dash: true },
      frameC: { box: [1208, 360, 568, 520], label: '구역 C', dash: true },
    },
  },
};

export const siteZones: SamplePack = {
  id: 'site-zones',
  title: { ko: '현장 구역 상황판', en: 'Building site zones' },
  field: { ko: '건설·구역 관리', en: 'Construction zone management' },
  kind: { ko: '넓은 도면 — 구역 카드를 누르면 그 구역 작업으로 확대', en: 'One wide drawing — press a zone card to zoom to its tasks' },
  domain: 'construction',
  styles: ['drawing'],
  summary: {
    ko: '신축 현장의 아침 — 세 구역이 카드 한 장씩 상태와 인원으로 서고, 그 아래 멀리에 구역마다 오늘의 작업이 크게 놓인다. 카드를 누르면 그 구역의 작업으로 가까이 가고, 구역이 작업 중지로 바뀌면 보드가 스스로 그리로 간다. 예시 데이터.',
    en: 'A building site on a morning — three zones as a card each in its state and headcount, and far below them the day\'s tasks of each zone, large. Pressing a card goes close to that zone\'s tasks, and a zone going to stopped work takes the view there by itself. Example data.',
  },
  connectors: [
    {
      key: 'site',
      name: '예시 현장 관리',
      example: true,
      attribution: { text: '예시 데이터 — 실제 현장이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
