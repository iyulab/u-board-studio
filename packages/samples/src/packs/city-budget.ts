// city-budget: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/city-budget.js';

const board: Board = {
  "board": {
    "title": "시 예산 한눈에",
    "theme": "light",
    "accent": "#d2452a",
    "skin": {
      "palette": {
        "paper": "#f6f1e7",
        "ink": "#171a24",
        "muted": "#6b6a64",
        "rule": "#d9d2c1",
        "backdrop": "#f6f1e7"
      },
      "font": "\"Pretendard Variable\", Pretendard, \"Noto Sans KR\", \"Malgun Gothic\", system-ui, sans-serif",
      "display": "\"Noto Serif KR\", \"Nanum Myeongjo\", Batang, Georgia, serif",
      "frame": "flat",
      "radius": 0,
      "shadow": "none",
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    }
  },
  "statuses": {
    "slow": {
      "tone": "alarm",
      "label": "더딤"
    },
    "normal": {
      "tone": "info",
      "label": "보통"
    },
    "ok": {
      "tone": "ok",
      "label": "완료"
    },
    "warn": {
      "tone": "warn",
      "label": "지연"
    },
    "info": {
      "tone": "info",
      "label": "진행"
    }
  },
  "data": {
    "now": {
      "from": "budget",
      "path": "/budget/now",
      "time": "updatedAt",
      "fields": {
        "city": {},
        "year": {},
        "asOf": {},
        "executed": {
          "label": "지금까지 쓴 돈",
          "unit": "억 원",
          "format": "number"
        },
        "rate": {
          "label": "집행률",
          "unit": "%",
          "digits": 1,
          "state": [
            "slow",
            1000,
            "normal"
          ]
        }
      }
    },
    "tree": {
      "from": "budget",
      "path": "/budget/tree",
      "list": "/value",
      "time": "updatedAt"
    },
    "total": {
      "from": "budget",
      "path": "/budget/tree",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "sum": {
          "derive": {
            "op": "sum",
            "field": "value"
          },
          "label": "총 예산",
          "unit": "억 원",
          "format": "number"
        }
      }
    },
    "rates": {
      "from": "budget",
      "path": "/budget/rates",
      "list": "/value",
      "key": "name",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "rate": {
          "unit": "%",
          "state": [
            "slow",
            60,
            "normal"
          ]
        }
      }
    },
    "projects": {
      "from": "budget",
      "path": "/budget/projects",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw",
          "names": {
            "ok": "완료",
            "warn": "지연",
            "info": "진행"
          }
        },
        "what": {},
        "where": {},
        "cost": {}
      }
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "now",
      "title": "{{city}}는 올해 예산의 {{rate}}%를 썼다",
      "kicker": "시민 예산 보고",
      "subtitle": "{{asOf}} 기준 · 여섯 부서의 사업별 예산과 집행 · 예시 데이터",
      "scale": "xlarge",
      "kickerInk": "accent"
    },
    "whole": {
      "as": "stat",
      "of": "total",
      "show": "sum",
      "title": "총 예산"
    },
    "spent": {
      "as": "stat",
      "of": "now",
      "show": "executed",
      "title": "지금까지 쓴 돈"
    },
    "rate": {
      "as": "stat",
      "of": "now",
      "show": "rate",
      "title": "집행률"
    },
    "tree": {
      "as": "chart.treemap",
      "of": "tree",
      "title": "어디에 쓰나 — 부서와 사업(억 원)",
      "colors": [
        "#26324d",
        "#2d3b5c",
        "#34456b",
        "#7a2a1d",
        "#425889",
        "#496298"
      ],
      "echarts": {
        "series": [
          {
            "leafDepth": 2,
            "top": 6,
            "bottom": 6,
            "left": 0,
            "right": 0,
            "breadcrumb": {
              "show": false
            },
            "upperLabel": {
              "show": true,
              "height": 28,
              "color": "#171a24",
              "fontWeight": 700,
              "fontSize": 15,
              "fontFamily": "\"Noto Serif KR\", \"Nanum Myeongjo\", Batang, Georgia, serif"
            },
            "label": {
              "show": true,
              "color": "#ffffff",
              "fontSize": 12,
              "formatter": "{b}\n{c}"
            },
            "itemStyle": {
              "borderColor": "#f6f1e7",
              "borderWidth": 2,
              "gapWidth": 2
            }
          }
        ]
      }
    },
    "rates": {
      "as": "bar-list",
      "of": "rates",
      "title": "얼마나 썼나 — 부서별 집행률",
      "label": "name",
      "value": "rate",
      "state": "rate",
      "compact": true
    },
    "projects": {
      "as": "list",
      "of": "projects",
      "title": "주민참여예산으로 뽑힌 사업",
      "primary": "what",
      "secondary": "where",
      "trailing": "cost",
      "state": "state",
      "compact": true,
      "badge": "state",
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 도시의 예산이 아닙니다 · 단위 억 원 · 집행률은 부서별 예산에 대한 쓴 돈의 비율",
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
        56,
        30,
        900,
        196
      ],
      "whole": [
        980,
        44,
        180,
        110
      ],
      "spent": [
        1170,
        44,
        180,
        110
      ],
      "rate": [
        1360,
        44,
        184,
        110
      ],
      "tree": [
        56,
        250,
        860,
        470
      ],
      "rates": [
        980,
        250,
        564,
        360
      ],
      "projects": [
        56,
        730,
        1488,
        238
      ],
      "foot": [
        56,
        972,
        1200,
        20
      ]
    },
    "shapes": {
      "ruleTop": {
        "line": [
          [
            56,
            24
          ],
          [
            1544,
            24
          ]
        ],
        "tone": "idle",
        "width": 2
      },
      "ruleMid": {
        "line": [
          [
            56,
            246
          ],
          [
            1544,
            246
          ]
        ],
        "tone": "idle",
        "width": 1
      },
      "ruleLow": {
        "line": [
          [
            56,
            722
          ],
          [
            1544,
            722
          ]
        ],
        "tone": "idle",
        "width": 1
      },
      "divA": {
        "line": [
          [
            1165,
            52
          ],
          [
            1165,
            150
          ]
        ],
        "tone": "idle",
        "width": 1
      },
      "divB": {
        "line": [
          [
            1355,
            52
          ],
          [
            1355,
            150
          ]
        ],
        "tone": "idle",
        "width": 1
      }
    }
  }
};

export const cityBudget: SamplePack = {
  id: 'city-budget',
  title: { ko: '시 예산 한눈에', en: "A city's budget at a glance" },
  field: { ko: '지방자치·재정', en: 'Local government finance' },
  kind: { ko: '그리드 배치 — 부서가 사업을 품은 트리를 면적으로', en: 'Grid layout — a tree of departments holding programmes, drawn as area' },
  domain: 'public',
  styles: ['minimal'],
  summary: {
    ko: '시 예산 한 해를 시민에게 보이는 한 장 — 부서가 사업을 품은 «나무» 모양의 데이터를 트리맵의 면적으로 그리고(큰 네모가 큰 돈), 총 예산은 부서 목록에서 더해 내며, 쓴 돈 · 집행률과 부서별 집행 막대, 주민참여예산으로 뽑힌 사업을 곁들인다. 흰 바탕에 짙은 남색 글자의 간결한 인포그래픽. 예시 데이터.',
    en: "A city's year of budget as a page for its residents — data in the shape of a tree, each department holding its programmes, drawn as a treemap whose bigger squares are bigger sums; the total is worked out from the departments' list, with what has been spent and its rate, a bar of how much each department has spent, and the projects residents voted for. A clean infographic, deep blue on white. Example data.",
  },
  connectors: [
    {
      "key": "budget",
      "name": "예시 시 예산",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 도시의 예산이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
