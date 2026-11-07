// A district's emergency shelters while it rains: on the left the district's map with a marker for each shelter in its
// state, on the right how many are open and how many people they hold, and the shelters in order of how full they are.
// The page is split in two — a map panel and a stack beside it — and nothing in either is drawn by an element of its
// own: the built-in marker, a list of counts and a bar list. The map is a plain drawing in the board's colours.
// No public source carries a district's shelters as they fill, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/shelter-split.js';

const line = (d: string, width: number, opacity: number, token = 'border', color = '#3a3f46') =>
  `<path d="${d}" fill="none" stroke="var(--u-widget-${token}, ${color})" stroke-width="${width}" stroke-opacity="${opacity}" stroke-linecap="round"/>`;

/** The district as a schematic map: a river through it, the roads, a few blocks. Drawn in the board's colours so a skin recolours it. */
const map = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="744" viewBox="0 0 640 744">',
  '<rect width="640" height="744" fill="var(--u-widget-bg, #15181c)"/>',
  // the river, wide and pale, with its two banks
  line('M-20 330 C110 300 190 450 300 430 S500 290 660 340', 40, 0.22, 'accent', '#38bdf8'),
  line('M-20 311 C110 281 190 431 300 411 S500 271 660 321', 2, 0.5, 'accent', '#38bdf8'),
  line('M-20 349 C110 319 190 469 300 449 S500 309 660 359', 2, 0.5, 'accent', '#38bdf8'),
  // the roads
  line('M0 100 H640', 6, 0.5),
  line('M0 250 H640', 4, 0.35),
  line('M0 520 H640', 4, 0.35),
  line('M0 650 H640', 6, 0.5),
  line('M90 0 V744', 4, 0.35),
  line('M300 0 V744', 6, 0.5),
  line('M540 0 V744', 4, 0.35),
  // the blocks
  ...[
    [110, 120, 70, 50],
    [320, 120, 70, 40],
    [420, 150, 90, 60],
    [560, 120, 60, 80],
    [110, 270, 60, 50],
    [420, 270, 80, 40],
    [110, 540, 100, 60],
    [330, 560, 110, 50],
    [430, 670, 90, 40],
    [560, 540, 60, 70],
  ].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="var(--u-widget-border, #3a3f46)" fill-opacity="0.35"/>`),
  '<text x="624" y="732" text-anchor="end" font-size="11" letter-spacing="2" fill="var(--u-widget-text-secondary, #9aa0a8)">DISTRICT MAP · SCHEMATIC</text>',
  '</svg>',
].join('');

const board: Board = {
  board: {
    title: '대피소 수용 현황',
    theme: 'dark',
    accent: '#facc15',
    skin: {
      palette: { paper: '#1c2025', ink: '#f4f1e6', muted: '#9aa0a8', rule: '#3a3f46' },
      frame: 'flat',
      radius: 3,
    },
  },
  statuses: {
    open: { tone: 'ok', label: '수용 중' },
    crowded: { tone: 'warn', label: '혼잡' },
    full: { tone: 'alarm', label: '만원', emphasis: 'invert' },
    closed: { tone: 'off', label: '이용 중단' },
  },
  data: {
    city: {
      from: 'city',
      path: '/city/now',
      time: 'updatedAt',
      fields: {
        district: {},
        alert: {},
        open: { label: '운영 중인 대피소', unit: '곳' },
        people: { label: '수용 인원', unit: '명' },
        room: { label: '남은 자리', unit: '명' },
      },
    },
    shelters: {
      from: 'city',
      path: '/city/shelters',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, pct: { unit: '%' }, note: {}, x: {}, y: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'city',
      title: '{{district}} 대피소 수용 현황',
      kicker: '재난 안전',
      subtitle: '예시 데이터',
    },
    shelter: {
      as: 'marker',
      each: 'shelters',
      show: 'state',
      shape: 'ring',
      note: '{{note}}',
    },
    totals: {
      as: 'stat-list',
      of: 'city',
      title: '지금',
      show: ['open', 'people', 'room'],
    },
    fill: {
      as: 'bar-list',
      of: 'shelters',
      title: '찬 정도 — 높은 곳부터',
      label: 'name',
      value: 'pct',
      state: 'state',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      {
        span: 7,
        canvas: {
          size: [640, 744],
          background: `data:image/svg+xml,${encodeURIComponent(map)}`,
          place: {
            shelter: { at: ['x', 'y'], size: [150, 48] },
          },
        },
      },
      {
        span: 5,
        grid: [
          { id: 'totals', span: 12, height: 160 },
          { id: 'fill', span: 12, height: 560 },
        ],
      },
    ],
  },
};

export const shelterSplit: SamplePack = {
  id: 'shelter-split',
  title: { ko: '대피소 수용 현황', en: 'Shelters while it rains' },
  field: { ko: '공공·재난 안전', en: 'Public safety' },
  kind: { ko: '그리드 배치 — 왼쪽 지도 · 오른쪽 목록으로 나눈 한 장', en: 'Grid layout — a map on the left, a stack on the right' },
  domain: 'public',
  styles: ['signage'],
  summary: {
    ko: '호우주의보가 내린 오후, 한 구의 대피소 여덟 곳 — 왼쪽에는 구의 모식 지도 위에 곳마다 한 표지(수용 중 · 혼잡 · 만원 · 이용 중단)와 인원, 오른쪽에는 운영 중인 곳 수 · 수용 인원 · 남은 자리와 찬 정도 순 막대. 한 장을 지도 쪽과 목록 쪽으로 나눈 분할형이고 요소 없이 빌트인 부품(표지 · 수치 목록 · 막대 목록)으로 그렸다. 예시 데이터.',
    en: "An afternoon of a heavy-rain warning, eight emergency shelters of a district — on the left a schematic map with a marker for each in its state (open, crowded, full, closed) and its people, on the right how many are open, how many people they hold and how many places are left, and a bar for each in order of how full it is. One page split into a map and a stack, drawn with no element of its own: the built-in marker, a list of counts and a bar list. Example data.",
  },
  connectors: [
    {
      key: 'city',
      name: '예시 구 대피소 현황',
      example: true,
      attribution: { text: '예시 데이터 — 실제 대피소 현황이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
