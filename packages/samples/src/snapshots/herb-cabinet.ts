// Example data written for the sample, not recorded from a source — no public source carries a clinic's stock. It is
// a weekday afternoon in a herbal clinic: forty drawers of the herb cabinet, each with what is in it against what
// it holds when full. Keep it consistent: a drawer is short of stock when under a seventh part is left, empty at
// nothing; the drawers that need an order are the ones the deliveries on the list are for.
import type { SampleSnapshot } from '../sample-pack.js';

const at = '2026-10-29T05:40:00Z';

type State = 'enough' | 'low' | 'out';

/** The drawers in the order they are in the cabinet, row by row: [herb, what it is for, what a full drawer holds (g), what is in it (g)]. */
const DRAWERS: Array<[string, string, number, number]> = [
  ['감초', '조화', 2000, 1650],
  ['당귀', '보혈', 1500, 200],
  ['천궁', '활혈', 1200, 900],
  ['작약', '완급', 1500, 1100],
  ['황기', '보기', 2000, 1800],
  ['인삼', '대보원기', 800, 90],
  ['숙지황', '보음', 1500, 1300],
  ['백출', '건비', 1200, 700],
  ['복령', '이수', 1500, 1400],
  ['진피', '이기', 1000, 620],
  ['계지', '해표', 800, 500],
  ['마황', '발한', 600, 0],
  ['생강', '온중', 1000, 380],
  ['대추', '보중', 2500, 2100],
  ['길경', '선폐', 900, 760],
  ['시호', '소간', 1000, 430],
  ['황금', '청열', 900, 150],
  ['갈근', '해기', 1200, 950],
  ['방풍', '거풍', 800, 310],
  ['독활', '거습', 800, 540],
  ['두충', '보간신', 1000, 720],
  ['구기자', '보간', 1500, 1250],
  ['산수유', '수렴', 1000, 260],
  ['맥문동', '윤폐', 1200, 880],
  ['오미자', '수렴', 900, 90],
  ['산약', '보비', 1500, 1180],
  ['택사', '이수', 1000, 640],
  ['목통', '이뇨', 600, 410],
  ['천마', '식풍', 500, 120],
  ['반하', '조습', 700, 60],
  ['치자', '청열', 800, 590],
  ['연교', '해독', 900, 480],
  ['박하', '소풍', 600, 300],
  ['금은화', '해독', 800, 420],
  ['결명자', '명목', 1200, 980],
  ['의이인', '이습', 2000, 1500],
  ['향부자', '이기', 1000, 700],
  ['익모초', '조경', 800, 350],
  ['홍화', '활혈', 500, 240],
  ['오가피', '거풍습', 900, 610],
];

const stateOf = (stock: number, full: number): State => (stock === 0 ? 'out' : stock / full < 1 / 7 ? 'low' : 'enough');

const ROWS = DRAWERS.map(([name, use, full, stock]) => ({
  id: name,
  name,
  use,
  stock,
  full,
  state: stateOf(stock, full),
  reorder: stateOf(stock, full) !== 'enough',
  updatedAt: at,
}));

/** What is on its way for the drawers that need an order: [herb, what comes (g), when]. Every one of them is a drawer that needs it. */
const DELIVERIES: Array<[string, number, string]> = [
  ['마황', 600, '내일 오전'],
  ['당귀', 1000, '모레'],
  ['인삼', 500, '다음 주 월요일'],
];

export const snapshot: SampleSnapshot = {
  capturedAt: '2026-10-29T05:40:30.000Z',
  responses: {
    clinic: {
      '/clinic/now': { name: '온새미 한의원', date: '10월 29일 목요일 오후', prepared: 38, waiting: 5, wait: 12, updatedAt: at },
      '/clinic/drawers': { value: ROWS, updatedAt: at },
      '/clinic/usage': {
        value: [
          { herb: '감초', grams: 640 },
          { herb: '대추', grams: 520 },
          { herb: '생강', grams: 480 },
          { herb: '당귀', grams: 410 },
          { herb: '천궁', grams: 360 },
        ],
        updatedAt: at,
      },
      '/clinic/deliveries': {
        value: DELIVERIES.map(([herb, grams, when]) => ({ id: herb, herb, note: `${grams.toLocaleString('en-US')}g — ${ROWS.find(r => r.name === herb)!.state === 'out' ? '소진' : '부족'}`, when, updatedAt: at })),
        updatedAt: at,
      },
    },
  },
};
