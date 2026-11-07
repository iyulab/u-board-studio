// A city marathon's race-day page for its volunteers' desk: how many have entered, are on the course and have finished; the
// morning's three conditions — heat, wind, air — each in its state; and a tile for each aid station in how well it is
// stocked. A condition under a warning links to the public page that carries it, and a condition with none does not: the
// trigger on each card is guarded by that card's own state (`when`), so pressing a clear card opens nothing. Nothing here is
// drawn by an element of its own: built-in parts only. No public source carries one race's field, so the values are example
// data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/marathon-day.js';

const board: Board = {
  board: {
    title: '강변 시민 마라톤',
    theme: 'light',
    accent: '#b4261c',
    skin: {
      palette: { paper: '#f7f1e3', ink: '#1f1b16', muted: '#6e6552', rule: '#cbbf9f' },
      frame: 'flat',
      radius: 4,
    },
  },
  statuses: {
    ok: { tone: 'ok', label: '이상 없음' },
    warn: { tone: 'warn', label: '주의' },
    alarm: { tone: 'alarm', label: '경보' },
    open: { tone: 'ok', label: '운영 중' },
    busy: { tone: 'warn', label: '혼잡' },
    closed: { tone: 'alarm', label: '중단', emphasis: 'invert' },
  },
  data: {
    race: {
      from: 'race',
      path: '/race/now',
      time: 'updatedAt',
      fields: { name: {}, day: {} },
    },
    totals: {
      from: 'race',
      path: '/race/totals',
      time: 'updatedAt',
      fields: { entered: { unit: '명', format: 'number' }, onCourse: { unit: '명', format: 'number' }, finished: { unit: '명', format: 'number' } },
    },
    conditions: {
      from: 'race',
      path: '/race/conditions',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, note: {} },
    },
    stations: {
      from: 'race',
      path: '/race/stations',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, note: {}, water: { unit: '%' } },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'race',
      title: '{{name}} · {{day}}',
      kicker: '대회 본부 상황판',
      subtitle: '특보가 걸린 조건 카드를 누르면 그 소식을 싣는 공공 누리집이 새 탭에서 열립니다 · 예시 데이터',
    },
    entered: { as: 'stat', of: 'totals', show: 'entered', title: '참가' },
    onCourse: { as: 'stat', of: 'totals', show: 'onCourse', title: '지금 코스 위' },
    finished: { as: 'stat', of: 'totals', show: 'finished', title: '완주' },
    heat: { as: 'status-card', of: 'conditions[heat]', title: '{{name}}', subtitle: '{{note}}', state: 'state' },
    wind: { as: 'status-card', of: 'conditions[wind]', title: '{{name}}', subtitle: '{{note}}', state: 'state' },
    air: { as: 'status-card', of: 'conditions[air]', title: '{{name}}', subtitle: '{{note}}', state: 'state' },
    station: {
      as: 'status-card',
      each: 'stations',
      title: '{{name}}',
      subtitle: '{{note}}',
      state: 'state',
      meter: { field: 'water', min: 0, max: 100, form: 'bar' },
    },
  },
  // A condition's card opens the public page that carries it — and only while that condition is under a warning or an alarm.
  triggers: [
    { on: { event: 'click', part: 'heat' }, when: { part: 'heat', status: ['warn', 'alarm'] }, do: [{ action: 'open-link', url: 'https://www.weather.go.kr/' }] },
    { on: { event: 'click', part: 'wind' }, when: { part: 'wind', status: ['warn', 'alarm'] }, do: [{ action: 'open-link', url: 'https://www.weather.go.kr/' }] },
    { on: { event: 'click', part: 'air' }, when: { part: 'air', status: ['warn', 'alarm'] }, do: [{ action: 'open-link', url: 'https://www.airkorea.or.kr/' }] },
  ],
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      ['entered', 4],
      ['onCourse', 4],
      ['finished', 4],
      { id: 'heat', span: 4, height: 120 },
      { id: 'wind', span: 4, height: 120 },
      { id: 'air', span: 4, height: 120 },
      { id: 'station', span: 3, height: 150 },
    ],
  },
};

export const marathonDay: SamplePack = {
  id: 'marathon-day',
  title: { ko: '시민 마라톤 대회 본부', en: 'City marathon race desk' },
  field: { ko: '대회 운영', en: 'Race operations' },
  kind: { ko: '그리드 배치 — 특보가 걸린 카드만 공공 누리집으로 이어진다', en: 'Grid layout — only a card under a warning links to its public page' },
  domain: 'leisure',
  styles: ['print'],
  summary: {
    ko: '시민 마라톤 대회 본부의 한 장 — 참가 · 코스 위 · 완주 인원, 폭염 · 강풍 · 대기질 세 조건과 코스 급수대 여덟 곳의 재고. 특보가 걸린 조건(폭염)의 카드를 누르면 그 소식을 싣는 공공 누리집이 새 탭에서 열리고, 특보가 없는 카드는 눌러도 열리지 않는다 — 트리거마다 그 카드 자신의 상태가 조건이다. 예시 데이터.',
    en: "A city marathon's race desk on one page — how many have entered, are on the course and have finished, three conditions (heat, wind, air) and the stock at eight aid stations along the course. A card under a warning (the heat) opens the public page that carries it in a new tab; a card with none opens nothing — each trigger is guarded by its own card's state. Example data.",
  },
  connectors: [
    {
      key: 'race',
      name: '예시 대회 운영',
      example: true,
      attribution: { text: '예시 데이터 — 실제 대회가 아닙니다' },
    },
  ],
  board,
  snapshot,
};
