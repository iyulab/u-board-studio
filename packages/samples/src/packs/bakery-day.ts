// bakery-day: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/bakery-day.js';

const board: Board = {
  "board": {
    "title": "오늘의 제과 현황",
    "theme": "light",
    "accent": "#c2392b",
    "skin": {
      "palette": {
        "paper": "#fbf3e1",
        "ink": "#3a2417",
        "muted": "#8a6a52",
        "rule": "#e7d5b1",
        "backdrop": "#d9bb8c"
      },
      "font": "\"Pretendard Variable\", Pretendard, \"Noto Sans KR\", \"Malgun Gothic\", system-ui, sans-serif",
      "display": "\"Noto Serif KR\", \"Nanum Myeongjo\", Batang, Georgia, serif",
      "frame": "card",
      "radius": 26,
      "shadow": "soft",
      "numerals": {
        "scale": "xlarge",
        "weight": 900
      }
    }
  },
  "statuses": {
    "queued": {
      "tone": "next",
      "label": "대기"
    },
    "baking": {
      "tone": "now",
      "label": "굽는 중",
      "emphasis": "invert"
    },
    "ready": {
      "tone": "ok",
      "label": "준비됨"
    },
    "picked": {
      "tone": "past",
      "label": "수령"
    },
    "enough": {
      "tone": "ok",
      "label": "충분"
    },
    "low": {
      "tone": "warn",
      "label": "부족"
    },
    "out": {
      "tone": "alarm",
      "label": "없음",
      "emphasis": "invert"
    }
  },
  "data": {
    "shop": {
      "from": "orders",
      "path": "/orders/now",
      "time": "updatedAt",
      "fields": {
        "shop": {},
        "date": {}
      }
    },
    "orders": {
      "from": "orders",
      "path": "/orders/list",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw",
          "names": {
            "queued": "대기",
            "baking": "굽는 중",
            "ready": "준비됨",
            "picked": "수령"
          }
        },
        "pickup": {},
        "who": {},
        "items": {},
        "qty": {}
      }
    },
    "orderCounts": {
      "from": "orders",
      "path": "/orders/list",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "waiting": {
          "derive": {
            "op": "count",
            "where": {
              "state": "queued"
            }
          },
          "unit": "건"
        },
        "inOven": {
          "derive": {
            "op": "count",
            "where": {
              "state": "baking"
            }
          },
          "unit": "건"
        },
        "toBake": {
          "derive": {
            "op": "sum",
            "field": "qty",
            "where": {
              "state": "queued"
            }
          },
          "unit": "개"
        },
        "all": {
          "derive": {
            "op": "count"
          },
          "unit": "건"
        }
      }
    },
    "hourly": {
      "from": "orders",
      "path": "/orders/hourly",
      "list": "/value",
      "answerTime": "/updatedAt"
    },
    "pantry": {
      "from": "pantry",
      "path": "/pantry/stock",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "level": {
          "state": "raw"
        },
        "tag": {},
        "pct": {
          "unit": "%"
        }
      }
    },
    "pantryCounts": {
      "from": "pantry",
      "path": "/pantry/stock",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "short": {
          "derive": {
            "op": "count",
            "where": {
              "level": "low"
            }
          },
          "unit": "가지",
          "state": [
            "ok",
            1,
            "warn",
            4,
            "alarm"
          ]
        }
      }
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "shop",
      "title": "{{shop}}",
      "kicker": "오늘의 주문 · 카운터 현황",
      "subtitle": "{{date}} · 예시 데이터",
      "scale": "xlarge",
      "kickerInk": "accent"
    },
    "waiting": {
      "as": "stat",
      "of": "orderCounts",
      "show": "waiting",
      "title": "구워야 할 주문"
    },
    "inOven": {
      "as": "stat",
      "of": "orderCounts",
      "show": "inOven",
      "title": "지금 오븐에"
    },
    "toBake": {
      "as": "stat",
      "of": "orderCounts",
      "show": "toBake",
      "title": "더 구울 빵"
    },
    "short": {
      "as": "stat",
      "of": "pantryCounts",
      "show": "short",
      "title": "모자란 재료"
    },
    "orders": {
      "as": "list",
      "of": "orders",
      "title": "찾아가는 시각 순서",
      "primary": "who",
      "badge": "state",
      "secondary": "items",
      "trailing": "pickup",
      "state": "state",
      "compact": true,
      "max": 8,
      "numerals": {
        "scale": "regular",
        "weight": 700
      }
    },
    "pantry": {
      "as": "bar-list",
      "of": "pantry",
      "title": "재료 재고",
      "label": "tag",
      "value": "pct",
      "max": 100,
      "state": "level",
      "compact": true
    },
    "hourly": {
      "as": "chart.bar",
      "of": "hourly",
      "title": "시간대별 찾아갈 빵 (개)",
      "x": "hour",
      "y": "qty",
      "colors": [
        "#d9a35b"
      ],
      "echarts": {
        "series": [
          {
            "itemStyle": {
              "borderRadius": [
                12,
                12,
                12,
                12
              ]
            },
            "label": {
              "show": true,
              "position": "top",
              "color": "#3a2417",
              "fontWeight": 700
            }
          }
        ],
        "visualMap": {
          "show": false,
          "type": "piecewise",
          "dimension": 1,
          "pieces": [
            {
              "gte": 40,
              "color": "#8a4b2a"
            },
            {
              "lt": 40,
              "color": "#d9a35b"
            }
          ]
        }
      }
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 가게가 아닙니다 · 숫자는 주문장과 재고표의 목록에서 센 값",
      "scale": "small",
      "ink": "muted"
    }
  },
  "layout": {
    "kind": "canvas",
    "size": [
      1600,
      1000
    ],
    "place": {
      "title": [
        60,
        30,
        900,
        150
      ],
      "waiting": [
        60,
        190,
        340,
        116
      ],
      "inOven": [
        424,
        190,
        340,
        116
      ],
      "toBake": [
        788,
        190,
        340,
        116
      ],
      "short": [
        1152,
        190,
        340,
        116
      ],
      "orders": [
        60,
        330,
        760,
        610
      ],
      "pantry": [
        844,
        330,
        648,
        330
      ],
      "hourly": [
        844,
        684,
        648,
        256
      ],
      "foot": [
        60,
        954,
        1000,
        22
      ]
    },
    "shapes": {
      "stitch": {
        "line": [
          [
            30,
            24
          ],
          [
            1570,
            24
          ],
          [
            1570,
            976
          ],
          [
            30,
            976
          ],
          [
            30,
            24
          ]
        ],
        "tone": "idle",
        "width": 2,
        "dash": true
      }
    }
  }
};

export const bakeryDay: SamplePack = {
  id: 'bakery-day',
  title: { ko: '제과점 오늘의 주문', en: "A bakery's orders of the day" },
  field: { ko: '식품·주문 접수', en: 'Food & order intake' },
  kind: { ko: '그리드 배치 — 두 원천의 목록을 세어 한 장에', en: 'Grid layout — two sources, their lists counted on one page' },
  domain: 'agrifood',
  styles: ['art'],
  summary: {
    ko: '동네 제과점의 아침 카운터 — 주문이 찾아가는 시각 순서로 대기 · 굽는 중 · 준비됨 · 수령으로 서고, 그 옆에 «구워야 할 주문 · 오븐에 든 것 · 더 구울 빵 수 · 모자란 재료»가 센 값으로 놓이며, 재료는 재고 막대로 보인다. 주문장과 재고표는 따로 있는 두 원천이고, 숫자는 어느 쪽도 보내지 않고 목록에서 센 것이다. 예시 데이터.',
    en: "A neighbourhood bakery's counter in the morning — the orders in the order they are picked up, each waiting, in the oven, ready or picked up, beside them a count of the orders to bake, what is in the oven, the pieces still to bake and the ingredients running short, and the pantry as a stock bar for each. The order book and the stock sheet are two sources, and the counts are sent by neither: they are counted from the lists. Example data.",
  },
  connectors: [
    {
      "key": "orders",
      "name": "예시 주문장",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 가게가 아닙니다"
      }
    },
    {
      "key": "pantry",
      "name": "예시 재고표",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 가게가 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
