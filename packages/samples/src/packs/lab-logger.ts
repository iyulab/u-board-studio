// lab-logger: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/lab-logger.js';

const board: Board = {
  "board": {
    "title": "과학실 수질 로거",
    "theme": "dark",
    "accent": "#39ff8a",
    "skin": {
      "palette": {
        "paper": "#04100a",
        "ink": "#c9f5da",
        "muted": "#6fae88",
        "rule": "#143d28",
        "backdrop": "#030b07"
      },
      "font": "\"JetBrains Mono\", \"D2Coding\", Consolas, \"Malgun Gothic\", monospace",
      "display": "\"JetBrains Mono\", \"D2Coding\", Consolas, \"Malgun Gothic\", monospace",
      "frame": "glow",
      "radius": 2,
      "shadow": "none",
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    }
  },
  "statuses": {
    "ok": {
      "tone": "ok",
      "label": "범위 안"
    },
    "warn": {
      "tone": "warn",
      "label": "주의"
    },
    "alarm": {
      "tone": "alarm",
      "label": "범위 밖"
    },
    "info": {
      "tone": "info",
      "label": "메모"
    }
  },
  "data": {
    "now": {
      "from": "lab",
      "path": "/lab/now",
      "time": "updatedAt",
      "fields": {
        "room": {},
        "class": {},
        "topic": {}
      }
    },
    "channels": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "temp": {
          "label": "수온",
          "unit": "℃",
          "digits": 1,
          "state": [
            "ok",
            25,
            "warn",
            30,
            "alarm"
          ]
        },
        "ph": {
          "label": "pH",
          "digits": 1,
          "state": [
            "alarm",
            6,
            "warn",
            6.5,
            "ok",
            8.6,
            "warn",
            9,
            "alarm"
          ]
        },
        "cond": {
          "label": "전도도",
          "unit": "µS/cm",
          "state": [
            "ok",
            800,
            "warn",
            1500,
            "alarm"
          ]
        },
        "turb": {
          "label": "탁도",
          "unit": "NTU",
          "digits": 1,
          "state": [
            "ok",
            5,
            "warn",
            10,
            "alarm"
          ]
        },
        "oxygen": {
          "label": "용존산소",
          "unit": "mg/L",
          "digits": 1,
          "state": [
            "alarm",
            4,
            "warn",
            6,
            "ok"
          ]
        }
      }
    },
    "oxygen": {
      "from": "lab",
      "path": "/lab/oxygen",
      "list": "/value"
    },
    "notes": {
      "from": "lab",
      "path": "/lab/notes",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "time": {},
        "who": {},
        "what": {}
      }
    },
    "tempRead": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "temp": {
          "label": "수온",
          "unit": "℃",
          "digits": 1,
          "state": [
            "ok",
            25,
            "warn",
            30,
            "alarm"
          ]
        }
      }
    },
    "phRead": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "ph": {
          "label": "pH",
          "digits": 1,
          "state": [
            "alarm",
            6,
            "warn",
            6.5,
            "ok",
            8.6,
            "warn",
            9,
            "alarm"
          ]
        }
      }
    },
    "condRead": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "cond": {
          "label": "전도도",
          "unit": "µS/cm",
          "state": [
            "ok",
            800,
            "warn",
            1500,
            "alarm"
          ]
        }
      }
    },
    "turbRead": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "turb": {
          "label": "탁도",
          "unit": "NTU",
          "digits": 1,
          "state": [
            "ok",
            5,
            "warn",
            10,
            "alarm"
          ]
        }
      }
    },
    "oxygenRead": {
      "from": "lab",
      "path": "/lab/channels",
      "list": "/value",
      "pivot": {
        "key": "channel",
        "value": "reading"
      },
      "time": "updatedAt",
      "fields": {
        "oxygen": {
          "label": "용존산소",
          "unit": "mg/L",
          "digits": 1,
          "state": [
            "alarm",
            4,
            "warn",
            6,
            "ok"
          ]
        }
      }
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "now",
      "title": "{{room}} · {{class}}",
      "kicker": "WATER LOGGER · 수질 실습 로거 · CH 1–5",
      "subtitle": "{{topic}} · 예시 데이터",
      "scale": "xlarge",
      "kickerInk": "accent"
    },
    "temp": {
      "as": "status-card",
      "of": "tempRead",
      "title": "수온 TEMP",
      "state": "temp",
      "meter": {
        "field": "temp",
        "min": 0,
        "max": 40
      },
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "ph": {
      "as": "status-card",
      "of": "phRead",
      "title": "pH",
      "state": "ph",
      "meter": {
        "field": "ph",
        "min": 4,
        "max": 11
      },
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "cond": {
      "as": "status-card",
      "of": "condRead",
      "title": "전도도 COND",
      "state": "cond",
      "meter": {
        "field": "cond",
        "min": 0,
        "max": 2000
      },
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "turb": {
      "as": "status-card",
      "of": "turbRead",
      "title": "탁도 TURB",
      "state": "turb",
      "meter": {
        "field": "turb",
        "min": 0,
        "max": 15
      },
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "oxygen": {
      "as": "status-card",
      "of": "oxygenRead",
      "title": "용존산소 DO",
      "state": "oxygen",
      "meter": {
        "field": "oxygen",
        "min": 0,
        "max": 10
      },
      "numerals": {
        "scale": "xlarge",
        "weight": 300
      }
    },
    "curve": {
      "as": "chart.line",
      "of": "oxygen",
      "title": "DO 용존산소 mg/L — 오늘 실습 시간",
      "x": "time",
      "y": "oxygen",
      "echarts": {
        "yAxis": {
          "min": 3,
          "max": 9
        },
        "series": [
          {
            "symbol": "circle",
            "symbolSize": 7,
            "lineStyle": {
              "width": 3,
              "shadowBlur": 12,
              "shadowColor": "#39ff8a"
            },
            "markLine": {
              "symbol": "none",
              "silent": true,
              "lineStyle": {
                "type": "dashed",
                "width": 1.5
              },
              "data": [
                {
                  "yAxis": 6,
                  "lineStyle": {
                    "color": "#ffb020"
                  },
                  "label": {
                    "formatter": "6.0 주의선",
                    "color": "#ffb020",
                    "position": "insideEndTop"
                  }
                },
                {
                  "yAxis": 4,
                  "lineStyle": {
                    "color": "#ff4a4a"
                  },
                  "label": {
                    "formatter": "4.0 위험선",
                    "color": "#ff4a4a",
                    "position": "insideEndTop"
                  }
                }
              ]
            },
            "endLabel": {
              "show": true,
              "formatter": "{c} mg/L",
              "color": "#ffb020",
              "fontSize": 20,
              "fontWeight": 700,
              "distance": 10
            }
          }
        ],
        "xAxis": {
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "#143d28"
            }
          }
        }
      }
    },
    "notes": {
      "as": "list",
      "of": "notes",
      "title": "LOG 모둠 기록",
      "primary": "what",
      "secondary": "who",
      "trailing": "time",
      "state": "state",
      "numerals": {
        "scale": "large"
      }
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 학교의 측정값이 아닙니다 · 색은 허용 범위에 견준 상태",
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
        124
      ],
      "temp": [
        56,
        168,
        276,
        190
      ],
      "ph": [
        359,
        168,
        276,
        190
      ],
      "cond": [
        662,
        168,
        276,
        190
      ],
      "turb": [
        965,
        168,
        276,
        190
      ],
      "oxygen": [
        1268,
        168,
        276,
        190
      ],
      "curve": [
        56,
        384,
        900,
        560
      ],
      "notes": [
        988,
        384,
        556,
        560
      ],
      "foot": [
        56,
        962,
        1200,
        22
      ]
    }
  }
};

export const labLogger: SamplePack = {
  id: 'lab-logger',
  title: { ko: '과학실 수질 로거', en: 'School lab water logger' },
  field: { ko: '학교 과학 실습', en: 'School science practicals' },
  kind: { ko: '그리드 배치 — 이름과 값의 행으로 답하는 센서 하나를 칸마다 나눠 읽기', en: 'Grid layout — one sensor that answers in rows of a name and a value, read as a card for each' },
  domain: 'education',
  styles: ['retro'],
  summary: {
    ko: '학교 과학실의 수질 실습 로거 — 로거가 «채널 이름과 값»의 행으로만 답해도 보드는 그 목록을 한 건으로 읽어 채널마다 한 칸을 만든다. 수온 · pH · 전도도 · 탁도 · 용존산소가 각자 허용 범위에 견준 색으로 보이고(pH는 띠 안에서만, 산소는 바닥 위에서만 정상), 오른쪽에는 오후 내내 떨어진 산소 곡선과 모둠 기록. 검은 바탕에 앰버 글자의 로거 화면. 예시 데이터.',
    en: "A school lab's water logger for a pond-water practical — the logger answers only in rows of a channel name and a value, yet the board reads the list as one item and makes a card for each channel. Temperature, pH, conductivity, turbidity and dissolved oxygen each take a tone from the range the practical allows (the pH is fine only within a band, the oxygen only above a floor), and beside them are the oxygen's curve as it fell through the afternoon and the groups' notes. An amber-on-black logger screen. Example data.",
  },
  connectors: [
    {
      "key": "lab",
      "name": "예시 과학실 로거",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 학교의 측정값이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
