// status-console: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/status-console.js';

const board: Board = {
  "board": {
    "title": "서비스 상태 콘솔",
    "theme": "dark",
    "accent": "#6ea8fe",
    "skin": {
      "palette": {
        "paper": "#141a29",
        "ink": "#e8ecf4",
        "muted": "#8b95a8",
        "rule": "#232c40",
        "backdrop": "#0b0f1a"
      },
      "font": "\"Pretendard Variable\", Pretendard, \"Noto Sans KR\", system-ui, sans-serif",
      "frame": "card",
      "radius": 16,
      "shadow": "soft",
      "numerals": {
        "scale": "large",
        "weight": 600
      }
    }
  },
  "statuses": {
    "operational": {
      "tone": "ok",
      "label": "정상"
    },
    "degraded": {
      "tone": "warn",
      "label": "성능 저하"
    },
    "outage": {
      "tone": "alarm",
      "label": "장애",
      "emphasis": "invert"
    },
    "maintenance": {
      "tone": "idle",
      "label": "점검"
    },
    "investigating": {
      "tone": "alarm",
      "label": "조사 중"
    },
    "identified": {
      "tone": "warn",
      "label": "원인 파악"
    },
    "monitoring": {
      "tone": "info",
      "label": "모니터링"
    },
    "resolved": {
      "tone": "ok",
      "label": "해결"
    }
  },
  "data": {
    "now": {
      "from": "registry",
      "path": "/status/now",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "date": {}
      }
    },
    "services": {
      "from": "registry",
      "path": "/status/services",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw",
          "names": {
            "operational": "정상",
            "degraded": "성능 저하",
            "outage": "장애",
            "maintenance": "점검"
          }
        },
        "name": {},
        "tag": {},
        "p95": {
          "unit": "ms"
        },
        "uptime": {
          "unit": "%"
        }
      }
    },
    "serviceCounts": {
      "from": "registry",
      "path": "/status/services",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "healthy": {
          "derive": {
            "op": "count",
            "where": {
              "state": "operational"
            }
          },
          "unit": "개"
        },
        "trouble": {
          "derive": {
            "op": "count",
            "where": {
              "state": "outage"
            }
          },
          "unit": "개",
          "state": [
            "ok",
            1,
            "alarm"
          ]
        },
        "slow": {
          "derive": {
            "op": "count",
            "where": {
              "state": "degraded"
            }
          },
          "unit": "개",
          "state": [
            "ok",
            1,
            "warn",
            3,
            "alarm"
          ]
        },
        "uptime": {
          "derive": {
            "op": "avg",
            "field": "uptime"
          },
          "unit": "%",
          "digits": 2
        }
      }
    },
    "incidents": {
      "from": "incidents",
      "path": "/incidents/open",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw",
          "names": {
            "investigating": "조사 중",
            "identified": "원인 파악",
            "monitoring": "모니터링",
            "resolved": "해결"
          }
        },
        "at": {},
        "title": {},
        "severity": {}
      }
    },
    "incidentCounts": {
      "from": "incidents",
      "path": "/incidents/open",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "open": {
          "derive": {
            "op": "count",
            "where": {
              "state": "investigating"
            }
          },
          "unit": "건",
          "state": [
            "ok",
            1,
            "alarm"
          ]
        }
      }
    },
    "errors": {
      "from": "incidents",
      "path": "/incidents/errors",
      "list": "/value",
      "answerTime": "/updatedAt"
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "now",
      "title": "{{name}}",
      "kicker": "서비스 상태 · 실시간",
      "subtitle": "{{date}} · 예시 데이터",
      "size": "xlarge",
      "kickerInk": "accent"
    },
    "healthy": {
      "as": "stat",
      "of": "serviceCounts",
      "show": "healthy",
      "title": "정상 서비스"
    },
    "slow": {
      "as": "stat",
      "of": "serviceCounts",
      "show": "slow",
      "title": "성능 저하"
    },
    "trouble": {
      "as": "stat",
      "of": "serviceCounts",
      "show": "trouble",
      "title": "장애"
    },
    "uptime": {
      "as": "stat",
      "of": "serviceCounts",
      "show": "uptime",
      "title": "30일 평균 가동률"
    },
    "services": {
      "as": "status-grid",
      "of": "services",
      "title": "서비스",
      "label": "name",
      "value": "p95",
      "state": "state",
      "cell": "chip",
      "columns": 2
    },
    "incidents": {
      "as": "list",
      "of": "incidents",
      "title": "인시던트",
      "primary": "title",
      "secondary": "severity",
      "time": "at",
      "badge": "state",
      "state": "state",
      "compact": true,
      "numerals": {
        "scale": "large"
      }
    },
    "errors": {
      "as": "chart.area",
      "of": "errors",
      "title": "시간대별 오류율 (%)",
      "x": "hour",
      "y": "rate",
      "smooth": true,
      "colors": [
        "#6ea8fe"
      ],
      "echarts": {
        "series": [
          {
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
                    "color": "rgba(110,168,254,0.55)"
                  },
                  {
                    "offset": 1,
                    "color": "rgba(110,168,254,0)"
                  }
                ]
              }
            },
            "endLabel": {
              "show": true,
              "formatter": "{c}%",
              "color": "#e8ecf4",
              "fontWeight": 700
            },
            "markLine": {
              "silent": true,
              "symbol": "none",
              "lineStyle": {
                "type": "dashed",
                "color": "#ff6b6b"
              },
              "label": {
                "formatter": "SLO 1%",
                "color": "#ff6b6b",
                "position": "insideEndTop"
              },
              "data": [
                {
                  "yAxis": 1
                }
              ]
            }
          }
        ]
      }
    },
    "latency": {
      "as": "bar-list",
      "of": "services",
      "title": "p95 지연 (ms)",
      "label": "name",
      "value": "p95",
      "state": "state",
      "compact": true
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 서비스가 아닙니다 · 숫자는 서비스 목록과 장애 기록에서 센 값",
      "size": "small",
      "ink": "muted"
    },
    "banner": {
      "as": "status-card",
      "of": "serviceCounts",
      "show": [
        "trouble"
      ],
      "title": "일부 시스템 장애",
      "subtitle": "메시지 큐(도쿄)가 응답하지 않습니다 · 팀이 조사 중입니다",
      "compact": true,
      "numerals": {
        "scale": "xlarge",
        "weight": 300
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
        60,
        24,
        900,
        100
      ],
      "banner": [
        60,
        134,
        1480,
        76
      ],
      "healthy": [
        60,
        226,
        350,
        108
      ],
      "slow": [
        434,
        226,
        350,
        108
      ],
      "trouble": [
        808,
        226,
        350,
        108
      ],
      "uptime": [
        1182,
        226,
        358,
        108
      ],
      "services": [
        60,
        350,
        520,
        590
      ],
      "incidents": [
        604,
        350,
        520,
        590
      ],
      "errors": [
        1148,
        350,
        392,
        280
      ],
      "latency": [
        1148,
        654,
        392,
        286
      ],
      "foot": [
        60,
        954,
        1100,
        22
      ]
    }
  }
};

export const statusConsole: SamplePack = {
  id: 'status-console',
  title: {"ko":"서비스 상태 콘솔","en":"Service status console"},
  field: {"ko":"서비스 운영","en":"Service operations"},
  kind: {"ko":"넓은 도면 — 서비스 상태 · 인시던트 · 시간대 오류율을 한 화면에","en":"One wide screen — service health, incidents and hourly error rates"},
  domain: 'it',
  styles: ["control-room"],
  summary: {"ko":"서비스 아홉 개의 상태와 인시던트 여섯, 열두 시간대의 오류율을 한 화면에 — 둥근 카드와 미묘한 그라디언트의 현대적인 상태 콘솔. 예시 데이터로 그렸습니다.","en":"Nine services, six incidents and twelve hours of error rates on one screen — a modern status console of rounded cards and subtle gradients. Example data written for the board."},
  connectors: [
    {
      "key": "registry",
      "name": "예시 서비스 목록",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 서비스가 아닙니다"
      }
    },
    {
      "key": "incidents",
      "name": "예시 장애 기록",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 서비스가 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
