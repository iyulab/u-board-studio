// Example data written for the sample, not recorded from a source — no public source carries a bookshop's shelves. It is a
// Saturday afternoon in a small independent bookshop: twelve titles on the front table, how many copies are on the shelf against
// what the shelf holds, and what is on its way. Keep it consistent: a title is short when a fifth or less of its shelf is left,
// out at nothing; the titles that need an order are the ones the incoming list is for. The titles and writers are made up.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-11-14T06:30:00Z';

type State = 'in' | 'low' | 'out';

/** The front table, in the order it is laid: [title, writer, genre, what the shelf holds, what is on it]. */
const TITLES: Array<[string, string, string, number, number]> = [
  ['파란 우체통의 계절', '한여름', '소설', 20, 14],
  ['작은 가게의 장부', '오도윤', '에세이', 16, 3],
  ['골목 지도 만들기', '서연우', '여행', 12, 9],
  ['밤의 제과점', '류하린', '소설', 20, 0],
  ['느린 편지', '문이안', '시', 14, 11],
  ['손으로 쓰는 하루', '배소율', '에세이', 16, 12],
  ['낡은 라디오 수리법', '곽도현', '취미', 10, 2],
  ['여름 끝의 수영장', '진서아', '소설', 18, 15],
  ['식물에게 말 걸기', '민채원', '취미', 12, 7],
  ['지하철 마지막 칸', '허지호', '소설', 20, 4],
  ['한 장짜리 요리', '노은서', '요리', 14, 10],
  ['달리는 사람의 노트', '강태오', '에세이', 12, 0],
];

const stateOf = (cap: number, left: number): State => (left === 0 ? 'out' : left * 5 <= cap ? 'low' : 'in');

const INCOMING: Array<[string, number, string]> = [
  ['밤의 제과점', 20, '월요일'],
  ['달리는 사람의 노트', 12, '월요일'],
  ['작은 가게의 장부', 16, '화요일'],
  ['낡은 라디오 수리법', 10, '수요일'],
  ['지하철 마지막 칸', 15, '수요일'],
];

const GENRES: Array<[string, number]> = [['소설', 61], ['에세이', 44], ['취미', 23], ['시', 17], ['여행', 15], ['요리', 12]];

export const snapshot: SampleSnapshot = {
  capturedAt: at,
  responses: {
    shop: {
      '/shop/now': {
        name: '골목책방 모서리',
        date: '11월 14일 토요일 · 15:30',
        sold: 31,
        visitors: 118,
        orders: 5,
        updatedAt: at,
      },
      '/shop/titles': {
        value: TITLES.map(([name, writer, genre, cap, left], i) => ({
          id: `t${i + 1}`,
          name,
          writer: `${writer} · ${genre}`,
          state: stateOf(cap, left),
          left,
          cap,
          reorder: stateOf(cap, left) !== 'in',
          updatedAt: at,
        })),
        updatedAt: at,
      },
      '/shop/genres': { value: GENRES.map(([genre, copies]) => ({ genre, copies })), updatedAt: at },
      '/shop/incoming': {
        value: INCOMING.map(([title, copies, when]) => ({ id: title, title, note: `${copies}권`, when })),
        updatedAt: at,
      },
    },
  },
};
