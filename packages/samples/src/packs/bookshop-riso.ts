// A small independent bookshop's front table, printed the way a risograph prints: a blue ink and a fluorescent
// pink on warm uncoated paper, hard offset shadows like a plate that did not register, no gradients. A card for each of twelve
// titles with how many copies are on the shelf against what the shelf holds, the ones to reorder ringed (short in pink, sold
// out filled), and beside them the week by genre and what is on its way. Nothing here is drawn by an element of its own: five
// built-in parts under one skin. No public source carries a shop's shelves, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/bookshop-riso.js';

const board: Board = {
  board: {
    title: '책방 앞 테이블',
    accent: '#ff48b0',
    skin: {
      palette: { paper: '#f6f0e2', ink: '#1d2a78', muted: '#6a6f9c', rule: '#1d2a78', backdrop: '#e9e0cb' },
      frame: 'plate',
      radius: 0,
      shadow: 'hard',
    },
  },
  statuses: {
    in: { tone: 'ok', label: '진열' },
    low: { tone: 'warn', label: '추가 주문' },
    out: { tone: 'alarm', label: '품절', emphasis: 'invert' },
  },
  data: {
    shop: {
      from: 'shop',
      path: '/shop/now',
      time: 'updatedAt',
      fields: {
        name: {},
        date: {},
        sold: { label: '오늘 판 책', unit: '권' },
        visitors: { label: '오늘 방문', unit: '명' },
        orders: { label: '주문 들어옴', unit: '건' },
      },
    },
    titles: {
      from: 'shop',
      path: '/shop/titles',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, writer: {}, left: { unit: '권' }, cap: {}, reorder: {} },
    },
    genres: { from: 'shop', path: '/shop/genres', list: '/value', key: 'genre', answerTime: '/updatedAt', fields: { copies: { unit: '권' } } },
    incoming: {
      from: 'shop',
      path: '/shop/incoming',
      list: '/value',
      key: 'id',
      answerTime: '/updatedAt',
      fields: { title: {}, note: {}, when: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'shop',
      title: '{{name}} · {{date}}',
      kicker: '앞 테이블 재고',
      subtitle: '예시 데이터',
    },
    book: {
      as: 'status-card',
      each: 'titles',
      title: '{{name}}',
      subtitle: '{{writer}}',
      show: ['state'],
      meter: { field: 'left', max: 'cap', form: 'bar' },
      highlight: 'reorder',
    },
    today: {
      as: 'stat-list',
      of: 'shop',
      title: '오늘',
      show: ['sold', 'visitors', 'orders'],
    },
    genres: {
      as: 'bar-list',
      of: 'genres',
      title: '이번 주 많이 나간 갈래',
      label: 'genre',
      value: 'copies',
    },
    coming: {
      as: 'list',
      of: 'incoming',
      title: '들어올 책',
      primary: 'title',
      secondary: 'note',
      trailing: 'when',
    },
  },
  layout: {
    kind: 'canvas',
    size: [1500, 990],
    place: {
      title: [24, 16, 1452, 84],
      book: { flow: { at: [24, 116], cell: [345, 150], gap: [14, 14], columns: 4 } },
      today: [24, 626, 440, 340],
      genres: [484, 626, 520, 340],
      coming: [1024, 626, 452, 340],
    },
  },
};

export const bookshopRiso: SamplePack = {
  id: 'bookshop-riso',
  title: { ko: '독립서점 앞 테이블 재고', en: 'Bookshop front table' },
  field: { ko: '독립서점·책', en: 'Independent bookshop' },
  kind: { ko: '도면 위 배치(캔버스) — 서점 앞 테이블, 책 열두 권', en: "Placed on a drawing (canvas) — a shop's front table, twelve titles" },
  domain: 'services',
  styles: ['print', 'craft'],
  summary: {
    ko: '독립서점 앞 테이블의 책 열두 권 — 권마다 제목과 지은이, 선반에 남은 권수가 선반 칸 수에 견준 막대로 보이고, 더 시켜야 할 책은 고리가 걸린다(모자람은 형광 분홍, 품절은 채운 면). 아래에는 오늘 판 책 · 이번 주 갈래별 판매 · 들어올 책. 리소그래프 인쇄처럼 파랑 잉크와 형광 분홍, 어긋난 판 같은 단단한 그림자. 요소 없이 내장 부품 다섯 개와 스킨만으로 그렸다. 예시 데이터.',
    en: "Twelve titles on a bookshop's front table — each with its writer and the copies left against what the shelf holds, a ring on the ones to reorder (short in fluorescent pink, sold out filled); below, today's sales, the week by genre and what is on its way. Printed like a risograph: blue ink and fluorescent pink, hard shadows like a plate that did not register. No element — five built-in parts and a skin. Example data.",
  },
  connectors: [
    {
      key: 'shop',
      name: '예시 독립서점',
      example: true,
      attribution: { text: '예시 데이터 — 실제 서점이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
