// apron-control: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/apron-control.js';

const board: Board = {
  "board": {
    "title": "바다만 공항 주기장 관제",
    "theme": "dark",
    "accent": "#6fd8e6",
    "skin": {
      "palette": {
        "paper": "#0c111b",
        "ink": "#e9eef6",
        "muted": "#7d8aa1",
        "rule": "#1a2333",
        "ground": "#e9eef6"
      },
      "font": "\"Pretendard Variable\", Inter, \"Segoe UI\", \"Malgun Gothic\", system-ui, sans-serif",
      "mono": "\"JetBrains Mono\", \"Cascadia Mono\", Consolas, monospace",
      "frame": "glow",
      "radius": 10,
      "shadow": "none"
    }
  },
  "statuses": {
    "free": {
      "tone": "info",
      "label": "가용"
    },
    "busy": {
      "tone": "idle",
      "label": "정상"
    },
    "late": {
      "tone": "warn",
      "label": "지연"
    },
    "blocked": {
      "tone": "alarm",
      "label": "폐쇄"
    },
    "ontime": {
      "tone": "idle",
      "label": "정시"
    },
    "ok": {
      "tone": "ok",
      "label": "정상"
    },
    "warn": {
      "tone": "warn",
      "label": "주의"
    },
    "alarm": {
      "tone": "alarm",
      "label": "경보"
    }
  },
  "symbols": {
    "busy": {
      "viewBox": "-12 -12 24 24",
      "path": "M0 -11C1.2 -11 1.8 -9 1.8 -7L1.8 -3L11 2L11 4L1.8 2L1.5 7L4.5 9L4.5 10.5L0 9.5L-4.5 10.5L-4.5 9L-1.5 7L-1.8 2L-11 4L-11 2L-1.8 -3L-1.8 -7C-1.8 -9 -1.2 -11 0 -11Z"
    },
    "late": {
      "viewBox": "-12 -12 24 24",
      "path": "M0 -11C1.2 -11 1.8 -9 1.8 -7L1.8 -3L11 2L11 4L1.8 2L1.5 7L4.5 9L4.5 10.5L0 9.5L-4.5 10.5L-4.5 9L-1.5 7L-1.8 2L-11 4L-11 2L-1.8 -3L-1.8 -7C-1.8 -9 -1.2 -11 0 -11Z"
    },
    "free": {
      "viewBox": "-12 -12 24 24",
      "path": "M-1 -9H1V-1H9V1H1V9H-1V1H-9V-1H-1Z"
    },
    "blocked": {
      "viewBox": "-12 -12 24 24",
      "path": "M0 -10L10 8L-10 8Z"
    }
  },
  "data": {
    "now": {
      "from": "apron",
      "path": "/apron/now",
      "time": "updatedAt",
      "fields": {
        "airport": {},
        "time": {}
      }
    },
    "stands": {
      "from": "apron",
      "path": "/apron/stands",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "name": {},
        "note": {},
        "pier": {}
      }
    },
    "standTotals": {
      "from": "apron",
      "path": "/apron/stands",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "free": {
          "derive": {
            "op": "count",
            "where": {
              "state": "free"
            }
          },
          "unit": "곳"
        },
        "busy": {
          "derive": {
            "op": "count",
            "where": {
              "state": "busy"
            }
          },
          "unit": "곳"
        },
        "late": {
          "derive": {
            "op": "count",
            "where": {
              "state": "late"
            }
          },
          "unit": "곳",
          "state": [
            "ok",
            1,
            "warn"
          ]
        },
        "blocked": {
          "derive": {
            "op": "count",
            "where": {
              "state": "blocked"
            }
          },
          "unit": "곳",
          "state": [
            "ok",
            1,
            "alarm"
          ]
        }
      }
    },
    "piers": {
      "from": "apron",
      "path": "/apron/piers",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "name": {},
        "summary": {}
      }
    },
    "field": {
      "from": "field",
      "path": "/field/now",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "wind": {
          "unit": "m/s"
        },
        "gust": {
          "unit": "m/s"
        },
        "note": {}
      }
    },
    "flights": {
      "from": "apron",
      "path": "/apron/flights",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "band": {
          "state": "raw"
        },
        "flight": {},
        "to": {},
        "plan": {},
        "note": {},
        "delayMin": {
          "unit": "분"
        }
      }
    },
    "crews": {
      "from": "apron",
      "path": "/apron/crews",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "team": {},
        "jobs": {
          "unit": "건"
        }
      }
    },
    "hourly": {
      "from": "apron",
      "path": "/apron/hourly",
      "list": "/value",
      "answerTime": "/updatedAt"
    },
    "tasksA": {
      "from": "apron",
      "path": "/apron/tasks",
      "list": "/value",
      "key": "id",
      "where": {
        "pier": "A"
      },
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "what": {},
        "at": {}
      }
    },
    "tasksB": {
      "from": "apron",
      "path": "/apron/tasks",
      "list": "/value",
      "key": "id",
      "where": {
        "pier": "B"
      },
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "what": {},
        "at": {}
      }
    },
    "tasksC": {
      "from": "apron",
      "path": "/apron/tasks",
      "list": "/value",
      "key": "id",
      "where": {
        "pier": "C"
      },
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "what": {},
        "at": {}
      }
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "now",
      "title": "{{airport}}",
      "kicker": "APRON CONTROL · 주기장 관제"
    },
    "occupancy": {
      "as": "status-grid",
      "of": "stands",
      "state": "state",
      "columns": 24,
      "cell": "dot"
    },
    "key": {
      "as": "legend"
    },
    "hourly": {
      "as": "chart.bar",
      "of": "hourly",
      "title": "시간대별 출발",
      "x": "hour",
      "y": "departures"
    },
    "clock": {
      "as": "element",
      "element": "clk",
      "of": "now",
      "bind": {
        "time": "time"
      }
    },
    "wind": {
      "as": "element",
      "element": "pill",
      "of": "field",
      "bind": {
        "note": "note",
        "wind": "wind",
        "gust": "gust"
      }
    },
    "free": {
      "as": "element",
      "element": "kpi",
      "of": "standTotals",
      "props": {
        "label": "가용",
        "tone": "info"
      },
      "bind": {
        "value": "free"
      }
    },
    "busy": {
      "as": "element",
      "element": "kpi",
      "of": "standTotals",
      "props": {
        "label": "정상",
        "tone": "idle"
      },
      "bind": {
        "value": "busy"
      }
    },
    "late": {
      "as": "element",
      "element": "kpi",
      "of": "standTotals",
      "props": {
        "label": "지연",
        "tone": "warn"
      },
      "bind": {
        "value": "late"
      }
    },
    "blocked": {
      "as": "element",
      "element": "kpi",
      "of": "standTotals",
      "props": {
        "label": "폐쇄",
        "tone": "alarm"
      },
      "bind": {
        "value": "blocked"
      }
    },
    "stand": {
      "as": "element",
      "element": "stand",
      "each": "stands",
      "bind": {
        "state": "state",
        "name": "name",
        "note": "note"
      }
    },
    "flights": {
      "as": "element",
      "element": "frow",
      "each": "flights",
      "bind": {
        "band": "band",
        "flight": "flight",
        "to": "to",
        "plan": "plan",
        "delay": "delayMin",
        "note": "note"
      }
    },
    "crews": {
      "as": "element",
      "element": "crow",
      "each": "crews",
      "bind": {
        "team": "team",
        "jobs": "jobs"
      }
    },
    "tasksA": {
      "as": "element",
      "element": "titem",
      "each": "tasksA",
      "bind": {
        "state": "state",
        "at": "at",
        "what": "what"
      }
    },
    "tasksB": {
      "as": "element",
      "element": "titem",
      "each": "tasksB",
      "bind": {
        "state": "state",
        "at": "at",
        "what": "what"
      }
    },
    "tasksC": {
      "as": "element",
      "element": "titem",
      "each": "tasksC",
      "bind": {
        "state": "state",
        "at": "at",
        "what": "what"
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
      "title": [
        30,
        22,
        560,
        70
      ],
      "wind": [
        640,
        34,
        340,
        48
      ],
      "free": [
        1076,
        124,
        110,
        84
      ],
      "busy": [
        1202,
        124,
        110,
        84
      ],
      "late": [
        1328,
        124,
        110,
        84
      ],
      "blocked": [
        1454,
        124,
        110,
        84
      ],
      "occupancy": [
        1070,
        208,
        484,
        50
      ],
      "stand": {
        "flow": {
          "at": [
            44,
            170
          ],
          "cell": [
            62,
            112
          ],
          "columns": 4,
          "gap": [
            4,
            12
          ],
          "pad": [
            6,
            38
          ]
        },
        "by": "pier",
        "boxes": {
          "at": [
            44,
            150
          ],
          "columns": 3,
          "gap": [
            14,
            0
          ],
          "label": "{{key}} 램프"
        }
      },
      "key": [
        34,
        600,
        400,
        40
      ],
      "flights": {
        "flow": {
          "at": [
            1076,
            296
          ],
          "cell": [
            472,
            36
          ],
          "columns": 1,
          "gap": [
            0,
            0
          ]
        }
      },
      "crews": {
        "flow": {
          "at": [
            1076,
            590
          ],
          "cell": [
            472,
            24
          ],
          "columns": 1,
          "gap": [
            0,
            0
          ]
        }
      },
      "hourly": [
        1070,
        758,
        484,
        196
      ],
      "tasksA": {
        "flow": {
          "at": [
            44,
            756
          ],
          "cell": [
            290,
            56
          ],
          "columns": 1,
          "gap": [
            0,
            2
          ]
        }
      },
      "tasksB": {
        "flow": {
          "at": [
            366,
            756
          ],
          "cell": [
            290,
            56
          ],
          "columns": 1,
          "gap": [
            0,
            2
          ]
        }
      },
      "tasksC": {
        "flow": {
          "at": [
            688,
            756
          ],
          "cell": [
            290,
            56
          ],
          "columns": 1,
          "gap": [
            0,
            2
          ]
        }
      },
      "clock": [
        1330,
        22,
        240,
        64
      ]
    },
    "shapes": {
      "apron": {
        "box": [
          30,
          112,
          1000,
          560
        ],
        "label": "주기장 배치 — 24 stands · 3 piers"
      },
      "stats": {
        "box": [
          1054,
          112,
          516,
          140
        ]
      },
      "delays": {
        "box": [
          1054,
          260,
          516,
          272
        ],
        "label": "항공편 — 지연 우선"
      },
      "crewsFrame": {
        "box": [
          1054,
          548,
          516,
          178
        ],
        "label": "작업조별 건수"
      },
      "hourlyFrame": {
        "box": [
          1054,
          742,
          516,
          228
        ],
        "label": "시간대별 출발"
      },
      "tasksFrame": {
        "box": [
          30,
          692,
          1000,
          278
        ],
        "label": "오후 작업"
      },
      "tA": {
        "text": "A 램프",
        "at": [
          44,
          736
        ],
        "size": 13
      },
      "tB": {
        "text": "B 램프",
        "at": [
          366,
          736
        ],
        "size": 13
      },
      "tC": {
        "text": "C 램프",
        "at": [
          688,
          736
        ],
        "size": 13
      }
    },
    "background": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'1600'%20height%3D'1000'%3E%3Cdefs%3E%3CradialGradient%20id%3D'a'%20cx%3D'20%25'%20cy%3D'-10%25'%20r%3D'60%25'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%2314203a'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%2314203a'%20stop-opacity%3D'0'%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D'b'%20cx%3D'100%25'%20cy%3D'100%25'%20r%3D'55%25'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%230f2036'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%230f2036'%20stop-opacity%3D'0'%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'%23070a11'%2F%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'url(%23a)'%2F%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'url(%23b)'%2F%3E%3C%2Fsvg%3E"
  },
  "elements": {
    "clk": {
      "template": "<div class=\"c\">{{time}}</div>",
      "style": ".c{font-family:inherit;font-weight:200;font-size:46px;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--u-widget-text);text-align:right;padding-top:6px}",
      "props": {
        "time": "string"
      }
    },
    "kpi": {
      "template": "<div class=\"k t-{{tone}}\"><span class=\"l\">{{label}}</span><b class=\"v\">{{value}}</b><span class=\"u\">곳</span></div>",
      "style": ".k{display:flex;flex-direction:column;gap:2px}.l{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--u-widget-text-secondary)}.v{font-family:inherit;font-weight:200;font-size:46px;line-height:1;font-variant-numeric:tabular-nums;color:var(--u-widget-text)}.u{font-size:12px;color:var(--u-widget-text-secondary)}.t-info .v{color:#6fd8e6}.t-warn .v{color:#f3b84b}.t-alarm .v{color:#ee5d5d}",
      "props": {
        "label": "string",
        "value": "number",
        "tone": "string"
      }
    },
    "pill": {
      "template": "<div class=\"p\"><i></i><span>{{note}}</span><span class=\"n\">풍속 <b>{{wind}}</b> · 돌풍 <b>{{gust}}</b> m/s</span></div>",
      "style": ".p{display:flex;align-items:center;gap:14px;height:100%;padding:0 18px;border-radius:999px;border:1px solid #4a3b17;background:linear-gradient(90deg,#2a2210,#171209);font-size:13px;color:#f2d79a}i{width:8px;height:8px;border-radius:50%;background:#f3b84b;box-shadow:0 0 12px #f3b84b}b{color:#fff;font-variant-numeric:tabular-nums}",
      "props": {
        "note": "string",
        "wind": "number",
        "gust": "number"
      }
    },
    "stand": {
      "template": "<div class=\"s s-{{state}}\"><svg class=\"pl\" viewBox=\"-12 -12 24 24\"><path d=\"M0 -11C1.2 -11 1.8 -9 1.8 -7L1.8 -3L11 2L11 4L1.8 2L1.5 7L4.5 9L4.5 10.5L0 9.5L-4.5 10.5L-4.5 9L-1.5 7L-1.8 2L-11 4L-11 2L-1.8 -3L-1.8 -7C-1.8 -9 -1.2 -11 0 -11Z\"/></svg><svg class=\"ad\" viewBox=\"-12 -12 24 24\"><path d=\"M-1 -9H1V-1H9V1H1V9H-1V1H-9V-1H-1Z\"/></svg><svg class=\"bk\" viewBox=\"-12 -12 24 24\"><path d=\"M0 -10L10 8L-10 8Z\"/></svg><b>{{name}}</b><i>{{note}}</i></div>",
      "style": ".s{box-sizing:border-box;height:100%;border-radius:8px;border:1px solid #1c283d;background:#0e1522;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:12px;gap:3px}svg{width:40px;height:40px;display:none}.s-busy .pl{display:block;fill:#8ea6c6}.s-late .pl{display:block;fill:#f3b84b;filter:drop-shadow(0 0 7px #f3b84b88)}.s-free .ad{display:block;fill:#6fd8e6}.s-blocked .bk{display:block;fill:#ee5d5d}.s-free{border:1px dashed #2f7f8c;background:#0e1d26}.s-blocked{border-color:#7a2a2e;background:repeating-linear-gradient(45deg,#2a1316 0 4px,#4a1d21 4px 7px)}b{font-family:inherit;font-weight:600;font-size:14px;line-height:1;color:#e9eef6;font-variant-numeric:tabular-nums;margin-top:6px}.s-free b{color:#6fd8e6}i{font:normal 10px/1 \"JetBrains Mono\",Consolas,monospace;color:#7d8aa1}.s-late i{color:#f3b84b}",
      "props": {
        "state": "string",
        "name": "string",
        "note": "string"
      }
    },
    "frow": {
      "template": "<div class=\"r r-{{band}}\"><b class=\"f\">{{flight}}</b><span class=\"to\">{{to}}</span><span class=\"t\">{{plan}}</span><progress value=\"{{delay}}\" max=\"40\"></progress><span class=\"d\">{{note}}</span></div>",
      "style": ".r{display:flex;align-items:center;gap:12px;height:100%;font-size:14px;color:var(--u-widget-text)}.r-ontime{opacity:.55}.f{width:78px;font:600 14px \"JetBrains Mono\",Consolas,monospace}.to{width:52px;color:#b6c0d0}.t{width:52px;font:13px \"JetBrains Mono\",Consolas,monospace;color:#7d8aa1}progress{flex:1;height:5px;appearance:none;border:0;border-radius:3px;background:#131b29}progress::-webkit-progress-bar{background:#131b29;border-radius:3px}progress::-webkit-progress-value{background:linear-gradient(90deg,#8a6a24,#f3b84b);border-radius:3px;box-shadow:0 0 10px #f3b84b55}.d{width:50px;text-align:right;font-weight:600;color:#f3b84b}.r-ontime .d{color:#7d8aa1;font-weight:400}",
      "props": {
        "band": "string",
        "flight": "string",
        "to": "string",
        "plan": "string",
        "delay": "number",
        "note": "string"
      }
    },
    "crow": {
      "template": "<div class=\"r\"><span class=\"n\">{{team}}</span><progress value=\"{{jobs}}\" max=\"14\"></progress><b>{{jobs}}</b></div>",
      "style": ".r{display:flex;align-items:center;gap:14px;height:100%;font-size:13px;color:#b6c0d0}.n{width:56px}progress{flex:1;height:3px;appearance:none;border:0;background:#131b29}progress::-webkit-progress-bar{background:#131b29}progress::-webkit-progress-value{background:#6f87ab;border-radius:3px}b{width:24px;text-align:right;color:var(--u-widget-text);font-variant-numeric:tabular-nums}",
      "props": {
        "team": "string",
        "jobs": "number"
      }
    },
    "titem": {
      "template": "<div class=\"ti ti-{{state}}\"><time>{{at}}</time><span>{{what}}</span></div>",
      "style": ".ti{position:relative;box-sizing:border-box;height:100%;padding:0 0 0 26px;font-size:13.5px;line-height:1.4;color:#c4cddb}.ti::before{content:\"\";position:absolute;left:5px;top:6px;width:9px;height:9px;border-radius:50%;background:#3d6b86}.ti::after{content:\"\";position:absolute;left:9px;top:20px;bottom:-6px;width:1px;background:#243049}time{display:block;font:11.5px \"JetBrains Mono\",Consolas,monospace;color:#7d8aa1;letter-spacing:.06em}.ti-warn::before{background:#f3b84b;box-shadow:0 0 12px #f3b84b88}.ti-alarm::before{background:#ee5d5d;box-shadow:0 0 14px #ee5d5d99}",
      "props": {
        "state": "string",
        "at": "string",
        "what": "string"
      }
    }
  }
};

export const apronControl: SamplePack = {
  id: 'apron-control',
  title: { ko: '공항 주기장 관제', en: 'Airport apron control' },
  field: { ko: '공항 지상 조업', en: 'Airport ground operations' },
  kind: { ko: '넓은 도면 — 주기장 스물넷을 점으로, 램프 카드를 누르면 그 램프 작업으로', en: 'One wide drawing — twenty-four stands as dots; press a pier to go to its tasks' },
  domain: 'transport',
  styles: ['control-room'],
  summary: {
    ko: '공항 지상 조업 관제 한 장 — 램프 셋의 주기장 스물넷이 데이터가 말하는 자리에 비어 있음 · 운영 · 지연 · 폐쇄로 서고, 상태별 개수는 목록에서 센 값, 램프마다 카드, 두 번째 원천의 측풍, 지연 항공편 · 조업 팀 작업 · 시간별 출발. 램프 카드를 누르면 멀리 아래의 그 램프 오후 작업으로 가까이 가고, 측풍이 주의보인 동안에는 측풍 카드를 눌러 공공 기상 누리집을 연다. 예시 데이터.',
    en: "An airport's ground-operations control wall on one canvas — the twenty-four stands of three piers standing where the data puts them as free, in use, late or closed, the counts of each worked out from the list, a card for each pier, the field's wind from a second source, the flights running late, each crew's work and the hours' departures. Pressing a pier's card goes close to that pier's tasks far below, and while the wind is under an advisory its card opens the public weather page. Example data.",
  },
  connectors: [
    {
      "key": "apron",
      "name": "예시 주기장 관제",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 공항이 아닙니다"
      }
    },
    {
      "key": "field",
      "name": "예시 기상 관측",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 관측이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
