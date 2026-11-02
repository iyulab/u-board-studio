// library-signage: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/library-signage.js';

const board: Board = {
  "board": {
    "title": "한결시립도서관 열람실 안내",
    "theme": "dark",
    "accent": "#38bdf8",
    "skin": {
      "palette": {
        "paper": "#0e182b",
        "ink": "#f2f6ff",
        "muted": "#8fa3c4",
        "rule": "#1e2c47",
        "backdrop": "#070d19"
      },
      "font": "\"Pretendard Variable\", Pretendard, \"Noto Sans KR\", system-ui, sans-serif",
      "frame": "card",
      "radius": 20,
      "shadow": "none",
      "numerals": {
        "scale": "xxlarge",
        "weight": 800
      }
    }
  },
  "statuses": {
    "open": {
      "tone": "ok",
      "label": "신청 가능"
    },
    "closing": {
      "tone": "warn",
      "label": "마감 임박"
    },
    "full": {
      "tone": "alarm",
      "label": "만석",
      "emphasis": "invert"
    },
    "done": {
      "tone": "past",
      "label": "종료"
    },
    "plenty": {
      "tone": "ok",
      "label": "여유"
    },
    "ok": {
      "tone": "next",
      "label": "보통"
    },
    "busy": {
      "tone": "warn",
      "label": "혼잡"
    }
  },
  "data": {
    "now": {
      "from": "desk",
      "path": "/desk/now",
      "time": "updatedAt",
      "fields": {
        "library": {},
        "date": {},
        "hours": {}
      }
    },
    "rooms": {
      "from": "desk",
      "path": "/desk/rooms",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "floor": {},
        "total": {},
        "used": {},
        "free": {
          "label": "남은 자리",
          "unit": "석"
        },
        "level": {
          "state": "raw",
          "names": {
            "plenty": "여유",
            "ok": "보통",
            "busy": "혼잡",
            "full": "만석"
          }
        }
      }
    },
    "roomTotals": {
      "from": "desk",
      "path": "/desk/rooms",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "freeAll": {
          "label": "지금 앉을 수 있는 자리",
          "unit": "석",
          "derive": {
            "op": "sum",
            "field": "free"
          },
          "state": [
            "alarm",
            1,
            "warn",
            30,
            "ok"
          ]
        }
      }
    },
    "programs": {
      "from": "desk",
      "path": "/desk/programs",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw",
          "names": {
            "open": "신청 가능",
            "closing": "마감 임박",
            "full": "마감",
            "done": "종료"
          }
        },
        "time": {},
        "title": {},
        "place": {},
        "left": {
          "unit": "석 남음"
        }
      }
    },
    "hourly": {
      "from": "desk",
      "path": "/desk/hourly",
      "list": "/value",
      "answerTime": "/updatedAt"
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "now",
      "title": "{{library}}",
      "kicker": "TODAY · 열람실 안내",
      "subtitle": "{{date}} · 개관 {{hours}}",
      "size": "xxlarge",
      "kickerInk": "accent"
    },
    "total": {
      "as": "stat",
      "of": "roomTotals",
      "show": "freeAll"
    },
    "tag": {
      "as": "label",
      "title": "예시 데이터",
      "size": "small",
      "ink": "muted",
      "face": "pill"
    },
    "room": {
      "as": "status-card",
      "each": "rooms",
      "title": "{{floor}} {{name}}",
      "show": [
        "level",
        "free"
      ],
      "state": "level",
      "meter": {
        "field": "used",
        "max": "total"
      },
      "numerals": {
        "scale": "xxlarge",
        "weight": 800
      }
    },
    "programs": {
      "as": "list",
      "of": "programs",
      "title": "오늘의 프로그램",
      "primary": "title",
      "secondary": "place",
      "time": "time",
      "badge": "state",
      "trailing": "left",
      "state": "state",
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "hourly": {
      "as": "chart.bar",
      "of": "hourly",
      "title": "시간대별 혼잡도 · 좌석 이용률(%)",
      "x": "hour",
      "y": "pct",
      "echarts": {
        "series": [
          {
            "itemStyle": {
              "borderRadius": [
                8,
                8,
                0,
                0
              ]
            }
          }
        ],
        "visualMap": {
          "show": false,
          "type": "piecewise",
          "dimension": 1,
          "pieces": [
            {
              "lt": 75,
              "color": "#38bdf8"
            },
            {
              "gte": 75,
              "color": "#fbbf24"
            }
          ]
        }
      }
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 도서관이 아닙니다 · 자리는 열람실 입구 계수기에서 센 값 · 5분마다 갱신",
      "size": "small",
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
        980,
        170
      ],
      "total": [
        1080,
        40,
        460,
        150
      ],
      "tag": [
        1380,
        192,
        160,
        30
      ],
      "room": {
        "r1": [
          60,
          236,
          340,
          216
        ],
        "r2": [
          436,
          236,
          340,
          216
        ],
        "r3": [
          812,
          236,
          340,
          216
        ],
        "r4": [
          1188,
          236,
          340,
          216
        ]
      },
      "programs": [
        60,
        480,
        760,
        460
      ],
      "hourly": [
        860,
        480,
        680,
        380
      ],
      "foot": [
        60,
        960,
        1200,
        24
      ]
    },
    "shapes": {
      "rule": {
        "line": [
          [
            60,
            210
          ],
          [
            1540,
            210
          ]
        ],
        "width": 2,
        "tone": "accent"
      }
    }
  }
};

export const librarySignage: SamplePack = {
  id: 'library-signage',
  title: {"ko":"도서관 안내 화면","en":"Library signage"},
  field: {"ko":"도서관 운영","en":"Library operations"},
  kind: {"ko":"큰 활자 안내 화면 — 멀리서 한눈에","en":"A large-type notice screen, read from across the room"},
  domain: 'education',
  styles: ["signage"],
  summary: {"ko":"도서관 입구의 안내 화면 한 장 — 열람실 자리, 오늘의 행사, 반납 마감을 멀리서도 읽히는 큰 활자로. 예시 데이터로 그렸습니다.","en":"A library entrance screen — reading-room seats, today's events and the return deadline in type large enough to read from across the room. Example data written for the board."},
  connectors: [
    {
      "key": "desk",
      "name": "예시 열람실 현황",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 도서관이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
