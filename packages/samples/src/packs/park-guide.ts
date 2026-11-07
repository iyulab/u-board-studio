// A zoo's guide board for a Saturday afternoon: a drawn map of its three areas with how many wait at each, and far below it
// the area's programs of the day, large enough to read. The map is an element, and the regions it marks are what a visitor
// presses — pressing the savanna, the aquarium or the bird house on the map takes the view to that area's programs. A
// template element draws the map and raises the event of the region pressed; the board's three triggers listen for them.
// No public source carries one zoo's queues and programs, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/park-guide.js';

const board: Board = {
  board: {
    title: '바람언덕 동물원 안내',
    theme: 'light',
    accent: '#2f7d4f',
    skin: {
      palette: { paper: '#fbf3df', ink: '#3b2f1e', muted: '#7a6a4f', rule: '#d9c79c' },
      frame: 'flat',
      radius: 12,
    },
  },
  statuses: {
    now: { tone: 'now', label: '지금' },
    soon: { tone: 'next', label: '곧' },
    later: { tone: 'idle', label: '나중' },
  },
  elements: {
    'park-map': {
      template: `<svg viewBox="0 0 1000 420" role="group" aria-label="동물원 안내도 — 구역을 누르면 아래에 그 구역의 프로그램이 나옵니다">
  <path class="walk" d="M60 396 C 300 380, 700 410, 940 392" />
  <g class="zone savanna" data-ub-event="pick-savanna" aria-label="초원 구역">
    <rect x="40" y="60" width="300" height="300" rx="34" />
    <text x="190" y="190" class="name">초원</text>
    <text x="190" y="236" class="wait">대기 {{savanna}}명</text>
  </g>
  <g class="zone aquarium" data-ub-event="pick-aquarium" aria-label="바다 구역">
    <rect x="350" y="60" width="300" height="300" rx="34" />
    <text x="500" y="190" class="name">바다</text>
    <text x="500" y="236" class="wait">대기 {{aquarium}}명</text>
  </g>
  <g class="zone birds" data-ub-event="pick-birds" aria-label="새 구역">
    <rect x="660" y="60" width="300" height="300" rx="34" />
    <text x="810" y="190" class="name">새</text>
    <text x="810" y="236" class="wait">대기 {{birds}}명</text>
  </g>
</svg>`,
      style: `svg{display:block;width:100%;height:100%}
.walk{fill:none;stroke:#b89b5e;stroke-width:10;stroke-linecap:round;stroke-dasharray:1 22}
.zone{cursor:pointer}
.zone rect{stroke:var(--u-widget-text);stroke-width:3}
.savanna rect{fill:#e9c46a}.aquarium rect{fill:#8ecae6}.birds rect{fill:#b7d9a8}
.zone:hover rect,.zone:focus rect{stroke-width:7}
.name{font:700 46px var(--u-widget-font-family);fill:var(--u-widget-text);text-anchor:middle}
.wait{font:600 28px var(--u-widget-font-family);fill:var(--u-widget-text);text-anchor:middle}`,
      props: { savanna: 'number', aquarium: 'number', birds: 'number' },
    },
  },
  data: {
    park: {
      from: 'park',
      path: '/park/now',
      time: 'updatedAt',
      fields: { name: {}, day: {} },
    },
    crowd: {
      from: 'park',
      path: '/park/crowd',
      time: 'updatedAt',
      fields: { savanna: {}, aquarium: {}, birds: {} },
    },
    programsSavanna: {
      from: 'park',
      path: '/park/programs',
      list: '/value',
      key: 'id',
      where: { zone: 'savanna' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, what: {}, at: {} },
    },
    programsAquarium: {
      from: 'park',
      path: '/park/programs',
      list: '/value',
      key: 'id',
      where: { zone: 'aquarium' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, what: {}, at: {} },
    },
    programsBirds: {
      from: 'park',
      path: '/park/programs',
      list: '/value',
      key: 'id',
      where: { zone: 'birds' },
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, what: {}, at: {} },
    },
  },
  parts: {
    title: { as: 'header', of: 'park', title: '{{name}} · {{day}}', kicker: '오늘의 안내', subtitle: '지도의 구역을 누르면 아래의 그 구역 프로그램으로 가까이 갑니다 · 예시 데이터' },
    map: { as: 'element', element: 'park-map', of: 'crowd', bind: { savanna: 'savanna', aquarium: 'aquarium', birds: 'birds' } },
    savanna: { as: 'list', of: 'programsSavanna', title: '초원 — 오늘의 프로그램', primary: 'what', trailing: 'at', state: 'state' },
    aquarium: { as: 'list', of: 'programsAquarium', title: '바다 — 오늘의 프로그램', primary: 'what', trailing: 'at', state: 'state' },
    birds: { as: 'list', of: 'programsBirds', title: '새 — 오늘의 프로그램', primary: 'what', trailing: 'at', state: 'state' },
  },
  triggers: [
    { on: { event: 'element', part: 'map', name: 'pick-savanna' }, do: [{ action: 'focus', part: 'savanna' }] },
    { on: { event: 'element', part: 'map', name: 'pick-aquarium' }, do: [{ action: 'focus', part: 'aquarium' }] },
    { on: { event: 'element', part: 'map', name: 'pick-birds' }, do: [{ action: 'focus', part: 'birds' }] },
  ],
  layout: {
    kind: 'canvas',
    size: [1600, 900],
    place: {
      title: [24, 16, 1552, 84],
      map: [300, 120, 1000, 420],
      savanna: [40, 640, 480, 210],
      aquarium: [560, 640, 480, 210],
      birds: [1080, 640, 480, 210],
    },
    shapes: {
      frameSavanna: { box: [24, 600, 512, 270], label: '초원', dash: true },
      frameAquarium: { box: [544, 600, 512, 270], label: '바다', dash: true },
      frameBirds: { box: [1064, 600, 512, 270], label: '새', dash: true },
    },
  },
};

export const parkGuide: SamplePack = {
  id: 'park-guide',
  title: { ko: '동물원 안내', en: 'Zoo guide' },
  field: { ko: '동물원 안내', en: 'Zoo visitor guide' },
  kind: { ko: '그린 지도 — 지도의 구역을 누르면 그 구역 프로그램으로 확대', en: 'A drawn map — press an area on it to zoom to its programs' },
  domain: 'leisure',
  styles: ['craft'],
  summary: {
    ko: '토요일 오후 동물원 안내판 — 세 구역의 지도(요소가 그림)와 구역별 대기 인원, 멀리 아래에 구역마다 오늘의 프로그램이 크게 놓인다. 지도의 구역을 누르면 그 구역 프로그램으로 가까이 간다 — 요소가 눌린 영역의 이름을 알리고 보드의 트리거가 듣는다. 예시 데이터.',
    en: "A zoo's guide on a Saturday afternoon — a map of three areas (drawn by an element) with how many wait at each, and far below it each area's programs of the day, large. Pressing an area on the map takes the view to its programs — the element tells which region was pressed and the board's triggers listen. Example data.",
  },
  connectors: [
    {
      key: 'park',
      name: '예시 동물원 안내',
      example: true,
      attribution: { text: '예시 데이터 — 실제 동물원이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
