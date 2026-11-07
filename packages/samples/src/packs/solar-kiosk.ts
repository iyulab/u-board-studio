// A science museum's kiosk on the eight planets: a tile for each in its kind and what a day there is like, a bar of its surface
// gravity, and under them how far each lies from the Sun. Pressing a planet's tile opens that planet's encyclopedia page in a
// new tab — one trigger made for every planet the list carries, its address filled in with the planet's name. The counts of
// each kind are worked out from the list. Nothing here is drawn by an element of its own: built-in parts only. The figures are
// the planets' well-known ones, set down as example data for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/solar-kiosk.js';

const board: Board = {
  board: {
    title: '태양계 안내 키오스크',
    theme: 'dark',
    accent: '#a78bfa',
    skin: {
      palette: { paper: '#0b0b1e', ink: '#ece9ff', muted: '#9a96c4', rule: '#2c2a5a' },
      frame: 'flat',
      radius: 14,
    },
  },
  statuses: {
    rocky: { tone: 'warn', label: '암석 행성' },
    gas: { tone: 'info', label: '가스 거인' },
    ice: { tone: 'accent', label: '얼음 거인' },
  },
  data: {
    kiosk: {
      from: 'kiosk',
      path: '/kiosk/now',
      time: 'updatedAt',
      fields: { name: {} },
    },
    planets: {
      from: 'kiosk',
      path: '/kiosk/planets',
      list: '/value',
      key: 'name',
      time: 'updatedAt',
      fields: {
        kind: { state: 'raw' },
        name: {},
        day: {},
        au: { unit: 'AU' },
        diameter: { unit: 'km', format: 'number' },
        gravity: { unit: 'm/s²' },
      },
    },
    // Counted from the list: how many planets of each kind.
    kinds: {
      from: 'kiosk',
      path: '/kiosk/planets',
      list: '/value',
      time: 'updatedAt',
      fields: {
        rocky: { derive: { op: 'count', where: { kind: 'rocky' } }, unit: '개' },
        gas: { derive: { op: 'count', where: { kind: 'gas' } }, unit: '개' },
        ice: { derive: { op: 'count', where: { kind: 'ice' } }, unit: '개' },
      },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'kiosk',
      title: '{{name}}',
      kicker: '천문 과학관 1층',
      subtitle: '행성을 누르면 그 행성의 백과 문서가 새 탭에서 열립니다 · 예시 데이터',
    },
    rocky: { as: 'stat', of: 'kinds', show: 'rocky', title: '암석 행성' },
    gas: { as: 'stat', of: 'kinds', show: 'gas', title: '가스 거인' },
    ice: { as: 'stat', of: 'kinds', show: 'ice', title: '얼음 거인' },
    planet: {
      as: 'status-card',
      each: 'planets',
      title: '{{name}}',
      subtitle: '{{day}}',
      state: 'kind',
      meter: { field: 'gravity', min: 0, max: 26, form: 'bar' },
    },
    distance: {
      as: 'bar-list',
      of: 'planets',
      title: '태양에서의 거리 (AU)',
      label: 'name',
      value: 'au',
      state: 'kind',
    },
  },
  // One trigger for every planet: pressing its tile opens the planet's page. The address is written out; the planet's name,
  // the list's key, is the only hole and goes in the path.
  triggers: [{ on: { event: 'click', part: 'planet' }, do: [{ action: 'open-link', url: 'https://ko.wikipedia.org/wiki/{{key}}' }] }],
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      ['rocky', 4],
      ['gas', 4],
      ['ice', 4],
      { id: 'planet', span: 3, height: 158 },
      { id: 'distance', span: 12, height: 410 },
    ],
  },
};

export const solarKiosk: SamplePack = {
  id: 'solar-kiosk',
  title: { ko: '태양계 안내 키오스크', en: 'Solar system kiosk' },
  field: { ko: '과학관 안내', en: 'Science museum guide' },
  kind: { ko: '그리드 배치 — 행성 타일을 누르면 백과 문서가 열린다', en: 'Grid layout — press a planet to open its encyclopedia page' },
  domain: 'environment',
  styles: ['signage'],
  summary: {
    ko: '과학관 1층의 태양계 안내 화면 — 맨 위에 암석 행성 · 가스 거인 · 얼음 거인이 각각 몇 개인지(목록에서 센 값), 행성 여덟이 종류와 하루의 길이, 표면 중력 막대로 한 칸씩, 맨 아래에 태양에서의 거리. 행성 타일을 누르면 그 행성의 백과 문서가 새 탭에서 열린다 — 트리거 하나가 목록의 행성마다 하나씩 만들어진다. 예시 데이터.',
    en: "A science museum's solar-system screen — on top how many planets are rocky, gas giants and ice giants (counted from the list), a tile for each of the eight planets in its kind, the length of its day and a bar of its surface gravity, and under them how far each lies from the Sun. Pressing a planet's tile opens its encyclopedia page in a new tab — one trigger made for every planet in the list. Example data.",
  },
  connectors: [
    {
      key: 'kiosk',
      name: '예시 전시 안내',
      example: true,
      attribution: { text: '예시 데이터 — 행성의 널리 알려진 값을 옮겨 적은 것입니다' },
    },
  ],
  board,
  snapshot,
};
