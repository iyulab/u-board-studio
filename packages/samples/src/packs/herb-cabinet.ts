// A herbal clinic's cabinet of forty drawers on a wall display: a drawer for each herb with what is left in it against
// what it holds full, the ones that need an order ringed — short of stock in amber, empty in red — and under the cabinet
// the day so far, the herbs used most this week and what is on its way. The drawers are one rule: the items of one
// part, flowing eight to a row. Nothing here is drawn by an element of its own: five built-in parts. No public source
// carries a clinic's stock, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/herb-cabinet.js';

const board: Board = {
  board: {
    title: '약장 재고',
    theme: 'dark',
    accent: '#c8553d',
    skin: {
      palette: { paper: '#2b1f16', ink: '#f1e6cf', muted: '#b79f7c', rule: '#6b4f33' },
      frame: 'plate',
      radius: 2,
    },
  },
  statuses: {
    enough: { tone: 'ok', label: '충분' },
    low: { tone: 'warn', label: '발주' },
    out: { tone: 'alarm', label: '소진', emphasis: 'invert' },
  },
  data: {
    clinic: {
      from: 'clinic',
      path: '/clinic/now',
      time: 'updatedAt',
      fields: {
        name: {},
        date: {},
        prepared: { label: '오늘 조제', unit: '첩' },
        waiting: { label: '대기 환자', unit: '명' },
        wait: { label: '평균 대기', unit: '분' },
      },
    },
    drawers: {
      from: 'clinic',
      path: '/clinic/drawers',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, use: {}, stock: { unit: 'g' }, full: {}, reorder: {} },
    },
    usage: { from: 'clinic', path: '/clinic/usage', list: '/value', key: 'herb', answerTime: '/updatedAt', fields: { grams: { unit: 'g' } } },
    deliveries: {
      from: 'clinic',
      path: '/clinic/deliveries',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { herb: {}, note: {}, when: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'clinic',
      title: '{{name}} · {{date}}',
      kicker: '약장 재고판',
      subtitle: '예시 데이터',
    },
    drawer: {
      as: 'status-card',
      each: 'drawers',
      title: '{{name}}',
      subtitle: '{{use}}',
      show: ['state'],
      meter: { field: 'stock', max: 'full', form: 'bar' },
      highlight: 'reorder',
    },
    today: {
      as: 'stat-list',
      of: 'clinic',
      title: '오늘',
      show: ['prepared', 'waiting', 'wait'],
    },
    usage: {
      as: 'bar-list',
      of: 'usage',
      title: '이번 주 많이 쓴 약재',
      label: 'herb',
      value: 'grams',
    },
    coming: {
      as: 'list',
      of: 'deliveries',
      title: '들어올 약재',
      primary: 'herb',
      secondary: 'note',
      trailing: 'when',
    },
  },
  layout: {
    kind: 'canvas',
    size: [1920, 1160],
    place: {
      title: [24, 16, 1872, 84],
      drawer: { flow: { at: [24, 112], cell: [223, 136], gap: [12, 10], columns: 8 } },
      today: [24, 848, 520, 290],
      usage: [560, 848, 640, 290],
      coming: [1216, 848, 680, 290],
    },
  },
};

export const herbCabinet: SamplePack = {
  id: 'herb-cabinet',
  title: { ko: '한의원 약장 재고판', en: 'Herb cabinet stock' },
  field: { ko: '한의원·약재', en: 'Herbal clinic' },
  kind: { ko: '도면 위 배치(캔버스) — 대형 상황판, 서랍 마흔 칸', en: 'Placed on a drawing (canvas) — a wall display, forty drawers' },
  domain: 'health',
  styles: ['korean'],
  summary: {
    ko: '한의원 약장의 서랍 마흔 칸 — 서랍마다 약재 이름과 효능, 남은 양이 가득 찼을 때에 견준 막대로 보이고, 발주가 필요한 서랍은 고리가 걸린다(부족은 호박색, 소진은 붉은 면). 약장 아래에는 오늘의 조제 · 대기, 이번 주 많이 쓴 약재, 들어올 약재. 서랍은 «한 부품의 항목을 여덟씩 흘려 놓기» 한 규칙이고 요소 없이 빌트인 부품 다섯으로 그렸다. 예시 데이터.',
    en: 'The forty drawers of a herbal clinic\'s cabinet on a wall display — each with the herb and what it is for and what is left against what it holds full, a ring on the ones that need an order (short of stock in amber, empty filled red); under the cabinet the day so far, the herbs used most this week and what is on its way. The drawers are one rule — the items of one part flowing eight to a row — and nothing is drawn by an element of its own: five built-in parts. Example data.',
  },
  connectors: [
    {
      key: 'clinic',
      name: '예시 한의원 약장',
      example: true,
      attribution: { text: '예시 데이터 — 실제 한의원이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
