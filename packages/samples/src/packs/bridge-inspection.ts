// A bridge's periodic safety inspection as the one-page report it is written as: nearly everything on it is a field of a single
// record — the bridge's name and route, its grade as a whole and the score behind it, the dimensions, the four members rated
// one to nine, the load it is posted for against the load it was designed for — and only the defects found are a list of their
// own. Each rating takes its tone from the number it holds, so a bearing at five reads as one to repair without a word saying so.
// Built-in parts only, on a light page with a serif face, as a typed report would be. No public source carries one bridge's
// inspection, so the values are example data written for the board.

import type { Board, Field } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/bridge-inspection.js';


/** A member's rating, one to nine: from seven it is sound, at five or six it is to be repaired, below five it is urgent. */
const rating: Field = { unit: '/ 9', state: ['alarm', 5, 'warn', 7, 'ok'] };

const board: Board = {
  board: {
    title: '교량 정기 안전 점검 조서',
    accent: '#3d6b73',
    skin: {
      palette: { paper: '#f6f2e7', ink: '#1f2a2c', muted: '#68787a', rule: '#cfc6ad' },
      font: '"Batang", "Noto Serif KR", "Nanum Myeongjo", serif',
      frame: 'flat',
      radius: 2,
      shadow: 'none',
    },
  },
  statuses: {
    ok: { tone: 'ok', label: '양호' },
    warn: { tone: 'warn', label: '보수 필요' },
    alarm: { tone: 'alarm', label: '긴급' },
    info: { tone: 'info', label: '관찰' },
  },
  data: {
    report: {
      from: 'bridge',
      path: '/bridge/report',
      time: 'updatedAt',
      fields: {
        state: { state: 'raw' },
        loadState: { state: 'raw' },
        name: {},
        route: {},
        date: {},
        verdict: {},
        verdictNote: {},
        loadNote: {},
        score: {},
        scoreMax: {},
        built: { label: '준공', unit: '년' },
        length: { label: '총 연장', unit: 'm' },
        width: { label: '유효 폭', unit: 'm' },
        spans: { label: '경간 수', unit: '경간' },
        adt: { label: '일 교통량', unit: '대/일', format: 'number' },
        deck: rating,
        girders: rating,
        bearings: rating,
        piers: rating,
        posted: { label: '게시 하중', unit: 't' },
        design: { label: '설계 하중', unit: 't' },
      },
    },
    defects: {
      from: 'bridge',
      path: '/bridge/defects',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, where: {}, what: {}, action: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'report',
      title: '{{name}}',
      kicker: '교량 정기 안전 점검 조서',
      subtitle: '{{route}} · 점검일 {{date}} · 예시 데이터',
    },
    verdict: {
      as: 'status-card',
      of: 'report',
      title: '{{verdict}}',
      subtitle: '{{verdictNote}}',
      state: 'state',
      meter: { field: 'score', max: 'scoreMax', form: 'bar' },
    },
    facts: {
      as: 'stat-list',
      of: 'report',
      title: '제원',
      show: ['built', 'length', 'width', 'spans', 'adt'],
    },
    deck: { as: 'stat', of: 'report', show: 'deck', title: '바닥판' },
    girders: { as: 'stat', of: 'report', show: 'girders', title: '거더' },
    bearings: { as: 'stat', of: 'report', show: 'bearings', title: '받침' },
    piers: { as: 'stat', of: 'report', show: 'piers', title: '교각 · 교대' },
    load: {
      as: 'status-card',
      of: 'report',
      title: '통행 하중',
      subtitle: '{{loadNote}}',
      state: 'loadState',
      show: ['posted'],
      meter: { field: 'posted', max: 'design', form: 'bar' },
    },
    defects: {
      as: 'list',
      of: 'defects',
      title: '발견된 손상',
      primary: 'what',
      secondary: 'where',
      trailing: 'action',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      { id: 'verdict', span: 7, height: 180 },
      { id: 'facts', span: 5, height: 210 },
      { id: 'deck', span: 3, height: 100 },
      { id: 'girders', span: 3, height: 100 },
      { id: 'bearings', span: 3, height: 100 },
      { id: 'piers', span: 3, height: 100 },
      { id: 'load', span: 5, height: 330 },
      { id: 'defects', span: 7, height: 330 },
    ],
  },
};

export const bridgeInspection: SamplePack = {
  id: 'bridge-inspection',
  title: { ko: '교량 정기 안전 점검 조서', en: 'Bridge safety inspection report' },
  field: { ko: '교량 유지관리', en: 'Bridge maintenance' },
  kind: { ko: '그리드 배치 — 한 건의 기록을 한 장의 조서로', en: 'Grid layout — one record laid out as a one-page report' },
  domain: 'construction',
  styles: ['print'],
  summary: {
    ko: '교량 하나의 정기 안전 점검 조서 — 거의 모든 칸이 한 건의 기록에서 읽힌다. 맨 위에 전체 등급과 점수, 제원, 네 부재의 평점(숫자가 5 아래면 긴급, 6까지면 보수 필요라 색으로 읽히고), 게시 하중과 설계 하중의 막대, 그리고 발견된 손상만 따로 목록으로. 연한 종이 바탕에 명조 계열 글꼴로 서류처럼. 예시 데이터.',
    en: "One bridge's periodic safety inspection as a one-page report — nearly every cell is read from a single record: its grade as a whole and the score behind it, the dimensions, the ratings of four members (the number says the tone: below five is urgent, up to six is to be repaired), the posted load against the design load as a bar, and only the defects found as a list of their own. A pale paper ground with a serif face, as a typed form would be. Example data.",
  },
  connectors: [
    {
      key: 'bridge',
      name: '예시 교량 점검',
      example: true,
      attribution: { text: '예시 데이터 — 실제 교량이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
