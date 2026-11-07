// A service's public status page: one banner that says how it is as a whole, a cell for each service in its state,
// the response time over the day and what is going on about it — stacked in order, each in the room it needs, at any
// screen width. Nothing here is drawn by an element of its own: five built-in parts, the cells of a status grid and
// a meter whose end is a field. No public source carries a service's own status, so the values are example data
// written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/status-page.js';

const board: Board = {
  board: {
    title: '서비스 상태',
    theme: 'dark',
    accent: '#2dd4bf',
    skin: {
      palette: { paper: '#0f1b24', ink: '#e6f1f5', muted: '#7f98a6', rule: '#23404f' },
      frame: 'flat',
      radius: 8,
    },
  },
  statuses: {
    ok: { tone: 'ok', label: '정상' },
    warn: { tone: 'warn', label: '성능 저하' },
    alarm: { tone: 'alarm', label: '장애', emphasis: 'invert' },
    info: { tone: 'info', label: '점검 중' },
  },
  data: {
    status: {
      from: 'status',
      path: '/status/now',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, summary: {}, detail: {}, up: { unit: '개 정상' }, total: {} },
    },
    services: {
      from: 'status',
      path: '/status/services',
      list: '/value',
      key: 'name',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, name: {}, words: {} },
    },
    latency: { from: 'status', path: '/status/latency', list: '/value', answerTime: '/updatedAt' },
    incidents: {
      from: 'status',
      path: '/status/incidents',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, title: {}, note: {}, when: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'status',
      title: '{{name}} 서비스 상태',
      kicker: '상태 페이지',
      subtitle: '예시 데이터',
    },
    overall: {
      as: 'status-card',
      of: 'status',
      title: '{{summary}}',
      subtitle: '{{detail}}',
      state: 'state',
      meter: { field: 'up', max: 'total', form: 'bar' },
    },
    services: {
      as: 'status-grid',
      of: 'services',
      title: '서비스별 상태',
      label: 'name',
      value: 'words',
      state: 'state',
      columns: 4,
      cell: 'chip',
    },
    latency: {
      as: 'chart.line',
      of: 'latency',
      title: 'API 응답 시간 p95 (ms) — 최근 24시간',
      x: 'hour',
      y: 'p95',
    },
    incidents: {
      as: 'list',
      of: 'incidents',
      title: '진행 중인 일과 최근 해결',
      primary: 'title',
      secondary: 'note',
      trailing: 'when',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      ['overall', 12],
      { id: 'services', span: 12, height: 190 },
      { id: 'latency', span: 7, height: 330 },
      { id: 'incidents', span: 5, height: 330 },
    ],
  },
};

export const statusPage: SamplePack = {
  id: 'status-page',
  title: { ko: '서비스 상태 페이지', en: 'Service status page' },
  field: { ko: 'IT·서비스 운영', en: 'IT service operations' },
  kind: { ko: '그리드 배치 — 위에서 아래로 쌓은 한 장', en: 'Grid layout — one page stacked top to bottom' },
  domain: 'it',
  styles: ['operations'],
  summary: {
    ko: '서비스의 공개 상태 페이지 — 맨 위에 전체 상태를 한 줄로(정상 서비스 9/12의 막대), 그 아래 서비스마다 한 칸의 상태, 하루의 응답 시간 선, 진행 중인 일과 어제 해결된 일의 목록. 위에서 아래로 쌓은 그리드 한 장이고 화면 폭에 따라 줄이 접힌다. 요소 없이 빌트인 부품 다섯으로 그렸다. 예시 데이터.',
    en: "A service's public status page — one line on top for how it is as a whole (a bar of how many services are fine), below it a cell for each service in its state, the response time over the day as a line, and a list of what is going on and what was solved yesterday. One grid stacked top to bottom, folding with the width of the screen. Drawn with no element of its own: five built-in parts. Example data.",
  },
  connectors: [
    {
      key: 'status',
      name: '예시 서비스 상태',
      example: true,
      attribution: { text: '예시 데이터 — 실제 서비스가 아닙니다' },
    },
  ],
  board,
  snapshot,
};
