// sales-bi: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/sales-bi.js';

const board: Board = {
  "board": {
    "title": "월 마감 영업 현황",
    "theme": "light",
    "accent": "#b2502b",
    "skin": {
      "palette": {
        "paper": "#ffffff",
        "ink": "#1c1a17",
        "muted": "#7b766d",
        "rule": "#e8e4dc"
      },
      "font": "\"Pretendard Variable\", Inter, \"Segoe UI\", \"Malgun Gothic\", system-ui, sans-serif",
      "frame": "card",
      "radius": 18,
      "shadow": "soft"
    }
  },
  "statuses": {
    "short": {
      "tone": "alarm",
      "label": "크게 미달"
    },
    "behind": {
      "tone": "warn",
      "label": "미달"
    },
    "ontrack": {
      "tone": "ok",
      "label": "순항"
    },
    "ahead": {
      "tone": "info",
      "label": "초과"
    },
    "up": {
      "tone": "ok",
      "label": "증가"
    },
    "down": {
      "tone": "alarm",
      "label": "감소"
    }
  },
  "data": {
    "company": {
      "from": "sales",
      "path": "/sales/now",
      "time": "updatedAt",
      "fields": {
        "company": {},
        "period": {}
      }
    },
    "regions": {
      "from": "sales",
      "path": "/sales/regions",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "band": {
          "state": "raw"
        },
        "name": {},
        "sales": {
          "unit": "억"
        },
        "target": {
          "unit": "억"
        },
        "rate": {
          "unit": "%"
        }
      }
    },
    "regionTotals": {
      "from": "sales",
      "path": "/sales/regions",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "total": {
          "derive": {
            "op": "sum",
            "field": "sales"
          },
          "unit": "억",
          "format": "number"
        },
        "mean": {
          "derive": {
            "op": "avg",
            "field": "rate"
          },
          "unit": "%",
          "digits": 1
        },
        "behind": {
          "derive": {
            "op": "count",
            "where": {
              "band": "behind"
            }
          },
          "unit": "곳"
        },
        "short": {
          "derive": {
            "op": "count",
            "where": {
              "band": "short"
            }
          },
          "unit": "곳"
        },
        "ahead": {
          "derive": {
            "op": "count",
            "where": {
              "band": "ahead"
            }
          },
          "unit": "곳"
        }
      }
    },
    "products": {
      "from": "sales",
      "path": "/sales/products",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "sold": {
          "unit": "개",
          "format": "number"
        },
        "change": {
          "unit": "%",
          "digits": 1,
          "state": [
            "down",
            0,
            "up"
          ]
        },
        "history": {}
      }
    },
    "channels": {
      "from": "sales",
      "path": "/sales/channels",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "sales": {
          "unit": "억"
        }
      }
    },
    "trend": {
      "from": "sales",
      "path": "/sales/trend",
      "list": "/value",
      "answerTime": "/updatedAt"
    },
    "deals": {
      "from": "sales",
      "path": "/sales/deals",
      "list": "/value",
      "key": "id",
      "fields": {
        "band": {
          "state": "raw"
        },
        "client": {},
        "owner": {},
        "stage": {},
        "amount": {}
      },
      "answerTime": "/updatedAt"
    },
    "alerts": {
      "from": "sales",
      "path": "/sales/alerts",
      "list": "/value",
      "key": "id",
      "fields": {
        "band": {
          "state": "raw"
        },
        "note": {}
      },
      "answerTime": "/updatedAt"
    }
  },
  "parts": {
    "title": {
      "as": "element",
      "element": "brand",
      "of": "company",
      "bind": {
        "company": "company",
        "period": "period"
      }
    },
    "total": {
      "as": "element",
      "element": "kpi",
      "of": "regionTotals",
      "props": {
        "label": "이달 누계 매출 · 시도 합계",
        "unit": "억",
        "cap": "17개 시도의 합"
      },
      "bind": {
        "value": "total"
      }
    },
    "mean": {
      "as": "element",
      "element": "kpim",
      "of": "regionTotals",
      "props": {
        "label": "목표 대비 평균",
        "unit": "%",
        "cap": "시도별 달성률의 평균"
      },
      "bind": {
        "value": "mean"
      }
    },
    "behind": {
      "as": "element",
      "element": "kpi",
      "of": "regionTotals",
      "props": {
        "label": "목표에 못 미친 지역 (미달)",
        "unit": "곳",
        "cap": ""
      },
      "bind": {
        "value": "behind",
        "b": "behind",
        "s": "short"
      }
    },
    "ahead": {
      "as": "element",
      "element": "kpi",
      "of": "regionTotals",
      "props": {
        "label": "목표를 넘긴 지역",
        "unit": "곳",
        "cap": "초과 달성"
      },
      "bind": {
        "value": "ahead"
      }
    },
    "region": {
      "as": "element",
      "element": "rt",
      "each": "regions",
      "bind": {
        "band": "band",
        "name": "name",
        "rate": "rate",
        "sales": "sales",
        "target": "target"
      }
    },
    "product": {
      "as": "stat",
      "each": "products",
      "show": "sold",
      "title": "{{name}}",
      "trend": "history"
    },
    "channel": {
      "as": "element",
      "element": "chn",
      "each": "channels",
      "bind": {
        "name": "name",
        "sales": "sales"
      }
    },
    "trend": {
      "as": "chart.area",
      "of": "trend",
      "title": "월 매출 추이 (억 원)",
      "x": "month",
      "y": "sales",
      "smooth": true,
      "echarts": {
        "series": [
          {
            "symbol": "none",
            "lineStyle": {
              "width": 2.2
            },
            "areaStyle": {
              "color": {
                "type": "linear",
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "colorStops": [
                  {
                    "offset": 0,
                    "color": "rgba(178,80,43,0.28)"
                  },
                  {
                    "offset": 1,
                    "color": "rgba(178,80,43,0)"
                  }
                ]
              }
            },
            "endLabel": {
              "show": true,
              "formatter": "{b} {c}",
              "offset": [
                -34,
                -26
              ],
              "color": "#fff",
              "backgroundColor": "#1c1a17",
              "borderRadius": 8,
              "padding": [
                5,
                9
              ],
              "fontSize": 11.5
            }
          }
        ]
      }
    },
    "alerts": {
      "as": "element",
      "element": "al",
      "each": "alerts",
      "bind": {
        "band": "band",
        "note": "note"
      }
    },
    "deals": {
      "as": "element",
      "element": "dl",
      "each": "deals",
      "bind": {
        "client": "client",
        "owner": "owner",
        "stage": "stage",
        "amount": "amount",
        "band": "band"
      }
    },
    "key": {
      "as": "element",
      "element": "lg"
    },
    "cardRegion": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "시도별 목표 달성",
        "sub": "달성률 · 매출/목표(억)"
      }
    },
    "cardProduct": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "상품별 판매",
        "sub": "판매량(개) · 전월 대비"
      }
    },
    "cardAlert": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "눈여겨볼 것",
        "sub": ""
      }
    },
    "cardChannel": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "채널별 매출",
        "sub": "합계 2,100억"
      }
    },
    "cardDeals": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "진행 중인 큰 거래",
        "sub": ""
      }
    },
    "chip": {
      "as": "element",
      "element": "chip",
      "props": {
        "text": "단위 억 원 · 예시 데이터"
      }
    },
    "chg": {
      "as": "element",
      "element": "chg",
      "each": "products",
      "bind": {
        "dir": "change.status",
        "change": "change"
      }
    }
  },
  "layout": {
    "kind": "canvas",
    "size": [
      1600,
      1000
    ],
    "place": {
      "cardRegion": [
        28,
        222,
        572,
        336
      ],
      "cardAlert": [
        1272,
        222,
        300,
        336
      ],
      "cardProduct": [
        28,
        574,
        760,
        398
      ],
      "cardChannel": [
        804,
        574,
        330,
        398
      ],
      "cardDeals": [
        1150,
        574,
        422,
        398
      ],
      "title": [
        28,
        20,
        620,
        56
      ],
      "chip": [
        1398,
        34,
        174,
        30
      ],
      "total": [
        28,
        92,
        372,
        114
      ],
      "mean": [
        418,
        92,
        372,
        114
      ],
      "behind": [
        808,
        92,
        372,
        114
      ],
      "ahead": [
        1198,
        92,
        372,
        114
      ],
      "region": {
        "인천": [
          50,
          270,
          124,
          50
        ],
        "서울": [
          178,
          270,
          124,
          50
        ],
        "경기": [
          306,
          270,
          124,
          50
        ],
        "강원": [
          434,
          270,
          124,
          50
        ],
        "충남": [
          50,
          326,
          124,
          50
        ],
        "세종": [
          178,
          326,
          124,
          50
        ],
        "충북": [
          306,
          326,
          124,
          50
        ],
        "경북": [
          434,
          326,
          124,
          50
        ],
        "전북": [
          50,
          382,
          124,
          50
        ],
        "대전": [
          178,
          382,
          124,
          50
        ],
        "대구": [
          306,
          382,
          124,
          50
        ],
        "울산": [
          434,
          382,
          124,
          50
        ],
        "광주": [
          50,
          438,
          124,
          50
        ],
        "전남": [
          178,
          438,
          124,
          50
        ],
        "경남": [
          306,
          438,
          124,
          50
        ],
        "부산": [
          434,
          438,
          124,
          50
        ],
        "제주": [
          178,
          494,
          124,
          50
        ]
      },
      "key": [
        340,
        522,
        250,
        26
      ],
      "trend": [
        616,
        222,
        640,
        336
      ],
      "alerts": {
        "flow": {
          "at": [
            1294,
            262
          ],
          "cell": [
            262,
            62
          ],
          "columns": 1,
          "gap": [
            0,
            8
          ]
        }
      },
      "product": {
        "flow": {
          "at": [
            44,
            626
          ],
          "cell": [
            176,
            104
          ],
          "columns": 4,
          "gap": [
            6,
            8
          ]
        }
      },
      "chg": {
        "flow": {
          "at": [
            114,
            634
          ],
          "cell": [
            100,
            16
          ],
          "columns": 4,
          "gap": [
            82,
            96
          ]
        }
      },
      "channel": {
        "flow": {
          "at": [
            826,
            622
          ],
          "cell": [
            286,
            72
          ],
          "columns": 1,
          "gap": [
            0,
            14
          ]
        }
      },
      "deals": {
        "flow": {
          "at": [
            1172,
            618
          ],
          "cell": [
            378,
            64
          ],
          "columns": 1,
          "gap": [
            0,
            6
          ]
        }
      }
    },
    "background": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'1600'%20height%3D'1000'%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'%23f2f0eb'%2F%3E%3C%2Fsvg%3E"
  },
  "elements": {
    "card": {
      "template": "<div class=\"c\"><b>{{title}}</b><small>{{sub}}</small></div>",
      "style": ".c{font-family:inherit;height:100%;background:#fff;border-radius:18px;box-shadow:0 1px 0 #fff inset,0 1px 2px #1c1a170d,0 10px 28px -14px #1c1a1730;padding:18px 22px;box-sizing:border-box;color:#1c1a17}b{font-size:13.5px;font-weight:600}small{font-size:12px;color:#7b766d;margin-left:8px}",
      "props": {
        "title": "string",
        "sub": "string"
      }
    },
    "brand": {
      "template": "<div class=\"b\"><i>한</i><b>{{company}}</b><span>{{period}}</span></div>",
      "style": ".b{font-family:inherit;display:flex;align-items:center;gap:14px;height:100%;color:#1c1a17}i{font-style:normal;width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#c9653b,#7e3418);display:grid;place-items:center;color:#fff;font-weight:700;font-size:15px}b{font-size:19px;font-weight:650;letter-spacing:-.01em}span{color:#7b766d;font-size:14px}",
      "props": {
        "company": "string",
        "period": "string"
      }
    },
    "chip": {
      "template": "<div class=\"p\">{{text}}</div>",
      "style": ".p{font-family:inherit;display:inline-flex;align-items:center;padding:0 13px;height:30px;border-radius:999px;background:#fff;border:1px solid #e8e4dc;font-size:12.5px;color:#7b766d;box-sizing:border-box}",
      "props": {
        "text": "string"
      }
    },
    "kpi": {
      "template": "<div class=\"k\"><span class=\"l\">{{label}}</span><div class=\"v\"><b>{{value | grouped:0}}</b><i>{{unit}}</i></div><span class=\"s\">{{cap}}{{#b}}미달 {{b}} · 크게 미달 {{s}}{{/b}}</span></div>",
      "style": ".k{font-family:inherit;position:relative;height:100%;background:#fff;border-radius:18px;box-shadow:0 1px 0 #fff inset,0 1px 2px #1c1a170d,0 10px 28px -14px #1c1a1730;color:#1c1a17}.l{position:absolute;left:22px;top:18px;font-size:12.5px;color:#7b766d}.v{position:absolute;left:22px;top:38px;line-height:1}b{font-size:40px;font-weight:650;letter-spacing:-.03em;font-variant-numeric:tabular-nums}i{font-style:normal;font-size:18px;font-weight:500;color:#7b766d;margin-left:4px}.s{position:absolute;left:22px;bottom:13px;font-size:12px;color:#7b766d}",
      "props": {
        "label": "string",
        "unit": "string",
        "cap": "string",
        "value": "number",
        "b": "number",
        "s": "number"
      }
    },
    "kpim": {
      "template": "<div class=\"k\"><span class=\"l\">{{label}}</span><div class=\"v\"><b>{{value | fixed:1}}</b><i>{{unit}}</i></div><span class=\"s\">{{cap}}</span></div>",
      "style": ".k{font-family:inherit;position:relative;height:100%;background:#fff;border-radius:18px;box-shadow:0 1px 0 #fff inset,0 1px 2px #1c1a170d,0 10px 28px -14px #1c1a1730;color:#1c1a17}.l{position:absolute;left:22px;top:18px;font-size:12.5px;color:#7b766d}.v{position:absolute;left:22px;top:38px;line-height:1}b{font-size:40px;font-weight:650;letter-spacing:-.03em;font-variant-numeric:tabular-nums}i{font-style:normal;font-size:18px;font-weight:500;color:#7b766d;margin-left:4px}.s{position:absolute;left:22px;bottom:13px;font-size:12px;color:#7b766d}",
      "props": {
        "label": "string",
        "unit": "string",
        "cap": "string",
        "value": "number"
      }
    },
    "rt": {
      "template": "<div class=\"t b-{{band}}\"><span class=\"n\">{{name}}</span><b class=\"r\">{{rate}}<small>%</small></b><span class=\"s\">{{sales}}/{{target}}</span></div>",
      "style": ".t{font-family:inherit;position:relative;height:100%;border-radius:10px;border-left:3px solid var(--c);background:var(--bg);box-sizing:border-box;color:#1c1a17}.b-short{--c:#d44a3f;--bg:#fbe7e4}.b-behind{--c:#e19a2b;--bg:#fcefd9}.b-ontrack{--c:#3b9a78;--bg:#e3f2ec}.b-ahead{--c:#2e5bd1;--bg:#e4eafa}.n{position:absolute;left:9px;top:5px;font-size:11.5px;font-weight:600}.r{position:absolute;right:9px;top:8px;font-size:20px;font-weight:700;letter-spacing:-.03em;color:var(--c);font-variant-numeric:tabular-nums}small{font-size:10px;font-weight:600}.s{position:absolute;left:9px;bottom:5px;font-size:10px;color:#7b766d;font-variant-numeric:tabular-nums}",
      "props": {
        "band": "string",
        "name": "string",
        "rate": "number",
        "sales": "number",
        "target": "number"
      }
    },
    "al": {
      "template": "<div class=\"a a-{{band}}\"><i></i><span>{{note}}</span></div>",
      "style": ".a{font-family:inherit;display:flex;gap:12px;align-items:stretch;height:100%;font-size:12.5px;line-height:1.45;color:#1c1a17}i{width:3px;border-radius:2px;background:var(--c);flex:none}.a-short{--c:#d44a3f}.a-behind{--c:#e19a2b}.a-ontrack{--c:#3b9a78}.a-ahead{--c:#2e5bd1}span{align-self:center}",
      "props": {
        "band": "string",
        "note": "string"
      }
    },
    "chg": {
      "template": "<div class=\"g d-{{dir}}\">{{change}}%</div>",
      "style": ".g{font-family:inherit;font-size:11.5px;font-weight:600;text-align:right;font-variant-numeric:tabular-nums}.d-up,.d-증가{color:#3b9a78}.d-up::before,.d-증가::before{content:\"▲ \"}.d-down,.d-감소{color:#d44a3f}.d-down::before,.d-감소::before{content:\"▼ \"}",
      "props": {
        "dir": "string",
        "change": "number"
      }
    },
    "chn": {
      "template": "<div class=\"h\"><div class=\"t\"><b>{{name}}</b><span>{{sales}}억</span></div><progress value=\"{{sales}}\" max=\"1000\"></progress></div>",
      "style": ".h{font-family:inherit;display:flex;flex-direction:column;justify-content:center;gap:7px;height:100%;color:#1c1a17}.t{display:flex;justify-content:space-between;font-size:13px}b{font-weight:600}span{color:#7b766d;font-variant-numeric:tabular-nums}progress{appearance:none;width:100%;height:12px;border:0;border-radius:999px;background:#f1efe9;overflow:hidden}progress::-webkit-progress-bar{background:#f1efe9;border-radius:999px}progress::-webkit-progress-value{background:linear-gradient(90deg,#d0764a,#b2502b);border-radius:999px}",
      "props": {
        "name": "string",
        "sales": "number"
      }
    },
    "dl": {
      "template": "<div class=\"d\"><div class=\"w\"><b>{{client}}</b><span>{{owner}}</span></div><i class=\"p p-{{band}}\">{{stage}}</i><b class=\"m\">{{amount}}</b></div>",
      "style": ".d{font-family:inherit;display:flex;align-items:center;gap:10px;height:100%;border-bottom:1px solid #eeeae2;color:#1c1a17}.w{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0}.w b{font-size:13.5px;font-weight:600}.w span{font-size:12px;color:#7b766d}.p{font-style:normal;font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px;background:var(--bg);color:var(--c)}.p-ontrack{--c:#2d7d60;--bg:#e3f2ec}.p-behind{--c:#a8691a;--bg:#fcefd9}.p-ahead{--c:#2e5bd1;--bg:#e4eafa}.p-short{--c:#b83a30;--bg:#fbe7e4}.m{font-size:17px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;min-width:56px;text-align:right}",
      "props": {
        "client": "string",
        "owner": "string",
        "stage": "string",
        "amount": "string",
        "band": "string"
      }
    },
    "lg": {
      "template": "<div class=\"l\"><i style=\"--c:#d44a3f\"></i><span>크게 미달</span><i style=\"--c:#e19a2b\"></i><span>미달</span><i style=\"--c:#3b9a78\"></i><span>순항</span><i style=\"--c:#2e5bd1\"></i><span>초과</span></div>",
      "style": ".l{font-family:inherit;display:flex;align-items:center;gap:6px;height:100%;font-size:11.5px;color:#7b766d}i{width:9px;height:9px;border-radius:3px;background:var(--c);margin-left:8px;flex:none}span{white-space:nowrap}",
      "props": {}
    }
  }
};

export const salesBi: SamplePack = {
  id: 'sales-bi',
  title: { ko: '월 마감 영업 현황', en: 'Month-end sales' },
  field: { ko: '영업·매출 분석', en: 'Sales analytics' },
  kind: { ko: '그리드 배치 — 타일 마흔 개를 몇 줄의 정의로', en: 'Grid layout — over forty tiles from a few lines of definition' },
  domain: 'services',
  styles: ['minimal'],
  summary: {
    ko: '커피 로스터의 월 마감 매출 한 장 — 맨 위에 누계 · 목표 대비 · 못 미친 지역 수 · 넘긴 지역 수(전부 목록에서 센 값), 17개 시도가 목표에 얼마나 왔는지 한 칸씩, 상품 열두 개와 채널 넷의 한 칸씩, 한 해의 곡선과 큰 거래 · 눈여겨볼 것. 칸은 목록의 항목마다 하나씩 규칙 하나로 만들어진다. 예시 데이터.',
    en: "A coffee roaster's month-end sales on one page — on top the month's total, the mean against target, and how many provinces are behind and how many ahead (all counted from lists), a tile for each of 17 provinces in how far it has got against its target, a tile for each of twelve products and four channels, the year's curve, and the big deals and what to look at. The tiles are made by one rule each, a part for each item of a list. Example data.",
  },
  connectors: [
    {
      "key": "sales",
      "name": "예시 영업 관리",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 회사가 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
