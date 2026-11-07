// A product company's deploy week on one wall in the colours of a Bauhaus poster: each team's release windows as bars across the
// five days (a gantt), how many deploys went out in each two hours of each weekday as a grid of squares (a heatmap) — the
// week's busiest hour is where the squares are densest and Friday afternoon is bare, the freeze — the week's figures and the
// rollbacks. Built-in parts only; no public source carries one team's deploy history, so the values are example data.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/deploy-calendar.js';


const board: Board = {
  board: {
    title: '배포 달력',
    accent: '#d62828',
    skin: {
      palette: { paper: '#f2ece0', ink: '#111111', muted: '#5a5348', rule: '#111111' },
      font: '"Arial Black", "Pretendard", "Malgun Gothic", sans-serif',
      frame: 'flat',
      radius: 0,
      shadow: 'hard',
    },
  },
  statuses: {
    ok: { tone: 'ok', label: '정상' },
    warn: { tone: 'warn', label: '되돌림' },
    alarm: { tone: 'alarm', label: '장애' },
  },
  data: {
    now: {
      from: 'ci',
      path: '/ci/now',
      time: 'updatedAt',
      fields: {
        week: {},
        deploys: { label: '이번 주 배포', unit: '건' },
        rollbacks: { label: '되돌림', unit: '건', state: ['ok', 1, 'warn', 5, 'alarm'] },
        failureShare: { label: '실패 비율', unit: '%', digits: 1 },
        lead: { label: '변경 반영까지', unit: '분' },
      },
    },
    windows: { from: 'ci', path: '/ci/windows', list: '/value' },
    heat: { from: 'ci', path: '/ci/heat', list: '/value' },
    rollbacks: {
      from: 'ci',
      path: '/ci/rollbacks',
      list: '/value',
      key: 'id',
      time: 'updatedAt',
      fields: { state: { state: 'raw' }, what: {}, who: {}, when: {} },
    },
  },
  parts: {
    title: {
      as: 'header',
      of: 'now',
      title: '배포 달력 · {{week}}',
      kicker: '릴리스 주간',
      subtitle: '팀별 배포 창과 시간대별 배포 · 예시 데이터',
    },
    deploys: { as: 'stat', of: 'now', show: 'deploys', title: '이번 주 배포' },
    rolled: { as: 'stat', of: 'now', show: 'rollbacks', title: '되돌림' },
    share: { as: 'stat', of: 'now', show: 'failureShare', title: '실패 비율' },
    lead: { as: 'stat', of: 'now', show: 'lead', title: '변경 반영까지' },
    windows: {
      as: 'chart.gantt',
      of: 'windows',
      title: '팀별 배포 창',
      y: 'team',
      start: 'start',
      end: 'end',
      label: 'name',
      categories: ['결제', '앱', '검색', '플랫폼'],
      colors: ['#1d4e89'],
    },
    heat: {
      as: 'chart.heatmap',
      of: 'heat',
      title: '요일 × 시간대 배포 수',
      x: 'slot',
      y: 'day',
      value: 'deploys',
      colorRange: ['#f2ece0', '#d62828'],
    },
    rollbacks: {
      as: 'list',
      of: 'rollbacks',
      title: '이번 주 되돌림',
      primary: 'what',
      secondary: 'who',
      trailing: 'when',
    },
  },
  layout: {
    kind: 'grid',
    items: [
      ['title', 12],
      { id: 'deploys', span: 3, height: 100 },
      { id: 'rolled', span: 3, height: 100 },
      { id: 'share', span: 3, height: 100 },
      { id: 'lead', span: 3, height: 100 },
      { id: 'windows', span: 7, height: 340 },
      { id: 'heat', span: 5, height: 340 },
      { id: 'rollbacks', span: 12, height: 300 },
    ],
  },
};

export const deployCalendar: SamplePack = {
  id: 'deploy-calendar',
  title: { ko: '배포 달력', en: 'Deploy calendar' },
  field: { ko: '소프트웨어 릴리스', en: 'Software releases' },
  kind: { ko: '그리드 배치 — 간트 막대와 시간대 격자를 한 장에', en: 'Grid layout — gantt bars and an hour grid on one page' },
  domain: 'it',
  styles: ['art'],
  summary: {
    ko: '제품 회사의 한 주 배포를 바우하우스 포스터의 색으로 — 팀마다 배포 창을 가로 막대(간트)로, 요일 × 두 시간 칸마다 나간 배포 수를 짙어지는 네모(히트맵)로 그려 수요일 오후가 몰리고 금요일 오후는 동결이라 빈 것이 한눈에 보인다. 이번 주 배포 · 되돌림 · 실패 비율과 되돌림 목록을 곁들인다. 크림 바탕에 원색, 직각과 굵은 그림자. 예시 데이터.',
    en: "A product company's deploy week in the colours of a Bauhaus poster — each team's release windows as horizontal bars (a gantt) and the deploys that went out in each two hours of each weekday as squares that darken (a heatmap), so Wednesday afternoon's rush and Friday afternoon's freeze show at a glance, with the week's deploys, rollbacks and failure share and a list of the rollbacks. Primary colours on cream, right angles and heavy shadows. Example data.",
  },
  connectors: [
    {
      key: 'ci',
      name: '예시 배포 기록',
      example: true,
      attribution: { text: '예시 데이터 — 실제 회사의 기록이 아닙니다' },
    },
  ],
  board,
  snapshot,
};
