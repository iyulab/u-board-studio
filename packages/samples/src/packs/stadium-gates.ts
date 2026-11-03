// stadium-gates: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/stadium-gates.js';

const board: Board = {
  "board": {
    "title": "한강종합경기장 입장 현황",
    "theme": "light",
    "accent": "#d9482b",
    "skin": {
      "palette": {
        "paper": "#f6f3ea",
        "ink": "#1b2430",
        "muted": "#6b7686",
        "rule": "#c9c3b4",
        "ground": "#1b2430",
        "backdrop": "#f6f3ea"
      },
      "font": "\"Pretendard Variable\", Pretendard, \"Noto Sans KR\", system-ui, sans-serif",
      "mono": "\"IBM Plex Mono\", \"D2Coding\", ui-monospace, monospace",
      "frame": "flat",
      "radius": 0,
      "shadow": "none",
      "numerals": {
        "scale": "regular",
        "weight": 600
      }
    }
  },
  "statuses": {
    "smooth": {
      "tone": "idle",
      "label": "원활",
      "glyph": "○"
    },
    "busy": {
      "tone": "idle",
      "label": "혼잡",
      "glyph": "△",
      "emphasis": "hatch"
    },
    "jam": {
      "tone": "alarm",
      "label": "지연",
      "glyph": "●",
      "emphasis": "invert"
    }
  },
  "data": {
    "match": {
      "from": "desk",
      "path": "/desk/match",
      "time": "updatedAt",
      "fields": {
        "venue": {},
        "date": {},
        "home": {},
        "away": {},
        "kickoff": {}
      }
    },
    "gates": {
      "from": "desk",
      "path": "/desk/gates",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "code": {
          "label": "게이트"
        },
        "name": {
          "label": "이름"
        },
        "queue": {
          "label": "대기",
          "unit": "명",
          "format": "number"
        },
        "open": {
          "label": "열린 레인"
        },
        "lanes": {
          "label": "전체 레인"
        },
        "wait": {
          "label": "예상",
          "unit": "분"
        },
        "level": {
          "label": "상태",
          "state": "raw",
          "names": {
            "smooth": "원활",
            "busy": "혼잡",
            "jam": "지연"
          }
        }
      }
    },
    "stands": {
      "from": "desk",
      "path": "/desk/stands",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "capacity": {},
        "seated": {},
        "pct": {
          "label": "점유",
          "unit": "%",
          "state": [
            "off",
            60,
            "idle",
            75,
            "info",
            90,
            "now"
          ]
        }
      }
    },
    "gateTotals": {
      "from": "desk",
      "path": "/desk/gates",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "queueAll": {
          "label": "대기 합계",
          "unit": "명",
          "format": "number",
          "derive": {
            "op": "sum",
            "field": "queue"
          }
        }
      }
    },
    "standTotals": {
      "from": "desk",
      "path": "/desk/stands",
      "list": "/value",
      "time": "updatedAt",
      "fields": {
        "seatedAll": {
          "label": "입장 완료",
          "unit": "명",
          "format": "number",
          "derive": {
            "op": "sum",
            "field": "seated"
          }
        },
        "capacityAll": {
          "label": "정원",
          "unit": "명",
          "format": "number",
          "derive": {
            "op": "sum",
            "field": "capacity"
          }
        }
      }
    }
  },
  "parts": {
    "head": {
      "as": "header",
      "of": "match",
      "title": "{{venue}}",
      "kicker": "GATE FLOW · 경기 전 입장 현황",
      "subtitle": "{{date}} · {{home}} vs {{away}} · 킥오프 {{kickoff}}",
      "scale": "xlarge",
      "kickerInk": "accent"
    },
    "seated": {
      "as": "status-card",
      "of": "standTotals",
      "title": "입장 완료",
      "show": [
        "seatedAll",
        "capacityAll"
      ],
      "meter": {
        "field": "seatedAll",
        "max": "capacityAll"
      },
      "numerals": {
        "scale": "xxlarge",
        "weight": 200
      }
    },
    "gatesTable": {
      "as": "table",
      "of": "gates",
      "show": [
        "code",
        "name",
        "queue",
        "open",
        "wait",
        "level"
      ]
    },
    "legend": {
      "as": "label",
      "title": "▨ 좌석 점유 — 성김 <60% · 중간 60–75% · 촘촘 75–90% · 거의 참 ≥90%  |  선 길이 = 대기열 · 굵고 붉은 선 = 지연(예상 25분 이상)",
      "scale": "small",
      "ink": "muted"
    },
    "queueAll": {
      "as": "stat",
      "of": "gateTotals",
      "title": "대기 합계",
      "show": "queueAll",
      "numerals": {
        "scale": "small",
        "weight": 600
      }
    },
    "foot": {
      "as": "label",
      "title": "예시 데이터 — 실제 경기장이 아닙니다 · 게이트 계수기는 1분마다 갱신 · 예상 대기 = 대기 인원 ÷ (열린 레인 × 레인당 분당 처리)",
      "scale": "small",
      "ink": "muted"
    },
    "stand-s1": {
      "as": "element",
      "element": "stand",
      "of": "stands[s1]",
      "props": {
        "vw": 157.5,
        "vh": 89.1,
        "d": "M2.7 2 L155.5 39.1 L127.1 87.1 L2 57 Z",
        "cx": 74.2,
        "cy": 36.4,
        "cy2": 51.4,
        "name": "N1"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s2": {
      "as": "element",
      "element": "stand",
      "of": "stands[s2]",
      "props": {
        "vw": 145.5,
        "vh": 133.5,
        "d": "M31.6 2 L143.5 103.4 L93.6 131.5 L2 49.3 Z",
        "cx": 74.1,
        "cy": 63.8,
        "cy2": 78.8,
        "name": "N2"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s3": {
      "as": "element",
      "element": "stand",
      "of": "stands[s3]",
      "props": {
        "vw": 95.5,
        "vh": 143.2,
        "d": "M52.6 2 L93.5 140.5 L35.5 141.2 L2 28.9 Z",
        "cx": 54.6,
        "cy": 74,
        "cy2": 89,
        "name": "NE"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s4": {
      "as": "element",
      "element": "stand",
      "of": "stands[s4]",
      "props": {
        "vw": 95.5,
        "vh": 143.2,
        "d": "M93.5 2.7 L52.6 141.2 L2 114.2 L35.5 2 Z",
        "cx": 54.6,
        "cy": 65.1,
        "cy2": 80.1,
        "name": "E1"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s5": {
      "as": "element",
      "element": "stand",
      "of": "stands[s5]",
      "props": {
        "vw": 145.5,
        "vh": 133.5,
        "d": "M143.5 30.1 L31.6 131.5 L2 84.2 L93.6 2 Z",
        "cx": 74.1,
        "cy": 65.7,
        "cy2": 80.7,
        "name": "E2"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s6": {
      "as": "element",
      "element": "stand",
      "of": "stands[s6]",
      "props": {
        "vw": 157.5,
        "vh": 89.1,
        "d": "M155.5 50 L2.7 87.1 L2 32.1 L127.1 2 Z",
        "cx": 74.2,
        "cy": 48.6,
        "cy2": 63.6,
        "name": "SE"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s7": {
      "as": "element",
      "element": "stand",
      "of": "stands[s7]",
      "props": {
        "vw": 157.5,
        "vh": 89.1,
        "d": "M154.8 87.1 L2 50 L30.4 2 L155.5 32.1 Z",
        "cx": 83.3,
        "cy": 48.6,
        "cy2": 63.6,
        "name": "S1"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s8": {
      "as": "element",
      "element": "stand",
      "of": "stands[s8]",
      "props": {
        "vw": 145.5,
        "vh": 133.5,
        "d": "M113.9 131.5 L2 30.1 L51.9 2 L143.5 84.2 Z",
        "cx": 71.4,
        "cy": 65.7,
        "cy2": 80.7,
        "name": "S2"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s9": {
      "as": "element",
      "element": "stand",
      "of": "stands[s9]",
      "props": {
        "vw": 95.5,
        "vh": 143.2,
        "d": "M42.9 141.2 L2 2.7 L60 2 L93.5 114.2 Z",
        "cx": 40.9,
        "cy": 65.1,
        "cy2": 80.1,
        "name": "SW"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s10": {
      "as": "element",
      "element": "stand",
      "of": "stands[s10]",
      "props": {
        "vw": 95.5,
        "vh": 143.2,
        "d": "M2 140.5 L42.9 2 L93.5 28.9 L60 141.2 Z",
        "cx": 40.9,
        "cy": 74,
        "cy2": 89,
        "name": "W1"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s11": {
      "as": "element",
      "element": "stand",
      "of": "stands[s11]",
      "props": {
        "vw": 145.5,
        "vh": 133.5,
        "d": "M2 103.4 L113.9 2 L143.5 49.3 L51.9 131.5 Z",
        "cx": 71.4,
        "cy": 63.8,
        "cy2": 78.8,
        "name": "W2"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "stand-s12": {
      "as": "element",
      "element": "stand",
      "of": "stands[s12]",
      "props": {
        "vw": 157.5,
        "vh": 89.1,
        "d": "M2 39.1 L154.8 2 L155.5 57 L30.4 87.1 Z",
        "cx": 83.3,
        "cy": 36.4,
        "cy2": 51.4,
        "name": "NW"
      },
      "bind": {
        "pct": "pct",
        "tone": "pct.tone"
      }
    },
    "gate-g1": {
      "as": "element",
      "element": "gate",
      "of": "gates[g1]",
      "props": {
        "deg": -90,
        "ndeg": 90,
        "lx": 128,
        "anchor": "middle",
        "code": "A"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g2": {
      "as": "element",
      "element": "gate",
      "of": "gates[g2]",
      "props": {
        "deg": -45,
        "ndeg": 45,
        "lx": 128,
        "anchor": "start",
        "code": "B"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g3": {
      "as": "element",
      "element": "gate",
      "of": "gates[g3]",
      "props": {
        "deg": 0,
        "ndeg": 0,
        "lx": 128,
        "anchor": "start",
        "code": "C"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g4": {
      "as": "element",
      "element": "gate",
      "of": "gates[g4]",
      "props": {
        "deg": 45,
        "ndeg": -45,
        "lx": 128,
        "anchor": "start",
        "code": "D"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g5": {
      "as": "element",
      "element": "gate",
      "of": "gates[g5]",
      "props": {
        "deg": 90,
        "ndeg": -90,
        "lx": 128,
        "anchor": "middle",
        "code": "E"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g6": {
      "as": "element",
      "element": "gate",
      "of": "gates[g6]",
      "props": {
        "deg": 135,
        "ndeg": -135,
        "lx": 110,
        "anchor": "end",
        "code": "F"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g7": {
      "as": "element",
      "element": "gate",
      "of": "gates[g7]",
      "props": {
        "deg": 180,
        "ndeg": -180,
        "lx": 110,
        "anchor": "end",
        "code": "G"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
      }
    },
    "gate-g8": {
      "as": "element",
      "element": "gate",
      "of": "gates[g8]",
      "props": {
        "deg": 225,
        "ndeg": -225,
        "lx": 110,
        "anchor": "end",
        "code": "H"
      },
      "bind": {
        "queue": "queue",
        "wait": "wait",
        "jam": "jam",
        "tone": "level.tone"
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
      "head": [
        1100,
        50,
        440,
        140
      ],
      "seated": [
        1100,
        205,
        440,
        180
      ],
      "gatesTable": [
        1100,
        405,
        440,
        320
      ],
      "legend": [
        1100,
        730,
        440,
        80
      ],
      "foot": [
        60,
        950,
        1000,
        24
      ],
      "queueAll": [
        1398,
        868,
        140,
        56
      ],
      "stand-s1": [
        551.1,
        213,
        157.5,
        89.1
      ],
      "stand-s2": [
        681.7,
        253.6,
        145.5,
        133.5
      ],
      "stand-s3": [
        776.5,
        361,
        95.5,
        143.2
      ],
      "stand-s4": [
        776.5,
        505.8,
        95.5,
        143.2
      ],
      "stand-s5": [
        681.7,
        622.9,
        145.5,
        133.5
      ],
      "stand-s6": [
        551.1,
        707.9,
        157.5,
        89.1
      ],
      "stand-s7": [
        391.3,
        707.9,
        157.5,
        89.1
      ],
      "stand-s8": [
        272.8,
        622.9,
        145.5,
        133.5
      ],
      "stand-s9": [
        228,
        505.8,
        95.5,
        143.2
      ],
      "stand-s10": [
        228,
        361,
        95.5,
        143.2
      ],
      "stand-s11": [
        272.8,
        253.6,
        145.5,
        133.5
      ],
      "stand-s12": [
        391.3,
        213,
        157.5,
        89.1
      ],
      "gate-g1": [
        350,
        65,
        440,
        300
      ],
      "gate-g2": [
        576.3,
        149.9,
        440,
        300
      ],
      "gate-g3": [
        670,
        355,
        440,
        300
      ],
      "gate-g4": [
        576.3,
        560.1,
        440,
        300
      ],
      "gate-g5": [
        350,
        645,
        440,
        300
      ],
      "gate-g6": [
        123.7,
        560.1,
        440,
        300
      ],
      "gate-g7": [
        30,
        355,
        440,
        300
      ],
      "gate-g8": [
        123.7,
        149.9,
        440,
        300
      ]
    },
    "shapes": {
      "concourse": {
        "path": "M798 505 C798 627.1 687 726 550 726 C413 726 302 627.1 302 505 C302 382.9 413 284 550 284 C687 284 798 382.9 798 505 Z",
        "width": 0.8,
        "tone": "idle",
        "dash": true
      },
      "pitch": {
        "box": [
          340,
          375,
          420,
          260
        ],
        "width": 1.5,
        "tone": "idle"
      },
      "halfway": {
        "line": [
          [
            550,
            375
          ],
          [
            550,
            635
          ]
        ],
        "width": 1,
        "tone": "idle"
      },
      "box-w": {
        "box": [
          340,
          443,
          66,
          124
        ],
        "width": 1,
        "tone": "idle"
      },
      "box-e": {
        "box": [
          694,
          443,
          66,
          124
        ],
        "width": 1,
        "tone": "idle"
      },
      "north-arrow": {
        "path": "M90 90 L97 126 L90 120 L83 126 Z",
        "width": 1,
        "tone": "idle"
      },
      "north-n": {
        "text": "N",
        "at": [
          90,
          78
        ],
        "size": 13
      },
      "scale-bar": {
        "line": [
          [
            70,
            905
          ],
          [
            270,
            905
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-tick-0": {
        "line": [
          [
            70,
            899
          ],
          [
            70,
            911
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-tick-50": {
        "line": [
          [
            120,
            899
          ],
          [
            120,
            911
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-tick-100": {
        "line": [
          [
            170,
            899
          ],
          [
            170,
            911
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-tick-150": {
        "line": [
          [
            220,
            899
          ],
          [
            220,
            911
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-tick-200": {
        "line": [
          [
            270,
            899
          ],
          [
            270,
            911
          ]
        ],
        "width": 1.4,
        "tone": "idle"
      },
      "scale-0": {
        "text": "0",
        "at": [
          70,
          927
        ],
        "size": 12
      },
      "scale-100": {
        "text": "100 m",
        "at": [
          240,
          927
        ],
        "size": 12
      },
      "grid-x1": {
        "text": "1",
        "at": [
          141.7,
          52
        ],
        "size": 12
      },
      "grid-x2": {
        "text": "2",
        "at": [
          305,
          52
        ],
        "size": 12
      },
      "grid-x3": {
        "text": "3",
        "at": [
          468.3,
          52
        ],
        "size": 12
      },
      "grid-x4": {
        "text": "4",
        "at": [
          631.7,
          52
        ],
        "size": 12
      },
      "grid-x5": {
        "text": "5",
        "at": [
          795,
          52
        ],
        "size": 12
      },
      "grid-x6": {
        "text": "6",
        "at": [
          958.3,
          52
        ],
        "size": 12
      },
      "grid-yA": {
        "text": "A",
        "at": [
          34,
          152
        ],
        "size": 12
      },
      "grid-yB": {
        "text": "B",
        "at": [
          34,
          328
        ],
        "size": 12
      },
      "grid-yC": {
        "text": "C",
        "at": [
          34,
          504
        ],
        "size": 12
      },
      "grid-yD": {
        "text": "D",
        "at": [
          34,
          680
        ],
        "size": 12
      },
      "grid-yE": {
        "text": "E",
        "at": [
          34,
          856
        ],
        "size": 12
      },
      "frame-outer": {
        "box": [
          20,
          20,
          1560,
          960
        ],
        "width": 2,
        "tone": "idle"
      },
      "frame-inner": {
        "box": [
          26,
          26,
          1548,
          948
        ],
        "width": 0.8,
        "tone": "idle"
      },
      "title-block": {
        "box": [
          1100,
          830,
          440,
          72
        ],
        "width": 1.5,
        "tone": "idle"
      },
      "tb-h": {
        "line": [
          [
            1100,
            866
          ],
          [
            1540,
            866
          ]
        ],
        "width": 1,
        "tone": "idle"
      },
      "tb-v1": {
        "line": [
          [
            1320,
            830
          ],
          [
            1320,
            866
          ]
        ],
        "width": 1,
        "tone": "idle"
      },
      "tb-v2": {
        "line": [
          [
            1246,
            866
          ],
          [
            1246,
            902
          ]
        ],
        "width": 1,
        "tone": "idle"
      },
      "tb-v3": {
        "line": [
          [
            1394,
            866
          ],
          [
            1394,
            902
          ]
        ],
        "width": 1,
        "tone": "idle"
      },
      "tb-project": {
        "text": "PROJECT · 한강종합경기장 입장 관제",
        "at": [
          1108,
          853
        ],
        "size": 12
      },
      "tb-sheet": {
        "text": "SHEET · GF-01",
        "at": [
          1328,
          853
        ],
        "size": 12
      },
      "tb-date": {
        "text": "DATE · 11-02 18:05",
        "at": [
          1108,
          889
        ],
        "size": 12
      },
      "tb-scale": {
        "text": "SCALE · 1:2000",
        "at": [
          1254,
          889
        ],
        "size": 12
      },
      "centre-circle": {
        "path": "M588 505 C588 526 571 543 550 543 C529 543 512 526 512 505 C512 484 529 467 550 467 C571 467 588 484 588 505 Z",
        "width": 1,
        "tone": "idle"
      }
    },
    "links": {}
  },
  "elements": {
    "stand": {
      "template": "<svg viewBox=\"0 0 {{vw}} {{vh}}\" role=\"img\" aria-label=\"{{name}} 점유 {{pct}}%\"><defs><pattern id=\"h1\" width=\"14\" height=\"14\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"14\" stroke=\"currentColor\" stroke-width=\"0.7\"/></pattern><pattern id=\"h2\" width=\"9\" height=\"9\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"9\" stroke=\"currentColor\" stroke-width=\"0.9\"/></pattern><pattern id=\"h3\" width=\"6\" height=\"6\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"1.1\"/></pattern><pattern id=\"h4\" width=\"4\" height=\"4\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"4\" stroke=\"currentColor\" stroke-width=\"1.6\"/></pattern></defs><path class=\"w {{tone}}\" d=\"{{d}}\"/><text class=\"n\" x=\"{{cx}}\" y=\"{{cy}}\">{{name}}</text><text class=\"p\" x=\"{{cx}}\" y=\"{{cy2}}\">{{pct}}%</text></svg>",
      "style": "svg{width:100%;height:100%;overflow:visible;color:var(--u-widget-text)}.w{stroke:currentColor;stroke-width:1.2;fill:none}.off{fill:url(#h1)}.idle{fill:url(#h2)}.info{fill:url(#h3)}.now{fill:url(#h4)}text{font-family:var(--u-widget-font-mono);text-anchor:middle;fill:currentColor;paint-order:stroke;stroke:var(--u-widget-surface);stroke-width:4;stroke-linejoin:round}.n{font-size:13px;font-weight:600}.p{font-size:12px}",
      "props": {
        "vw": "number",
        "vh": "number",
        "d": "string",
        "cx": "number",
        "cy": "number",
        "cy2": "number",
        "name": "string",
        "pct": "number",
        "tone": "string"
      }
    },
    "gate": {
      "template": "<svg viewBox=\"-200 -150 440 300\" role=\"img\" aria-label=\"{{code}} 게이트 대기 {{queue}}명, 예상 {{wait}}분\"><g class=\"g {{tone}}\"><g transform=\"rotate({{deg}})\"><line class=\"trace\" x1=\"14\" y1=\"0\" x2=\"114\" y2=\"0\"/><line class=\"dim\" x1=\"14\" y1=\"0\" x2=\"114\" y2=\"0\" pathLength=\"1500\" stroke-dasharray=\"{{queue}} 1500\"/><line class=\"tick\" x1=\"14\" y1=\"-6\" x2=\"14\" y2=\"6\"/><rect class=\"sq\" x=\"-9\" y=\"-9\" width=\"18\" height=\"18\"/><path class=\"cloud {{jam}}\" d=\"M118 0 A14 14 0 0 1 111.6 15 A14 14 0 0 1 94 26 A14 14 0 0 1 70 30 A14 14 0 0 1 46 26 A14 14 0 0 1 28.4 15 A14 14 0 0 1 22 0 A14 14 0 0 1 28.4 -15 A14 14 0 0 1 46 -26 A14 14 0 0 1 70 -30 A14 14 0 0 1 94 -26 A14 14 0 0 1 111.6 -15 A14 14 0 0 1 118 0\"/></g><g transform=\"rotate({{deg}}) translate({{lx}} 0) rotate({{ndeg}})\"><text class=\"c\" text-anchor=\"{{anchor}}\" y=\"-3\">{{code}}</text><text class=\"q\" text-anchor=\"{{anchor}}\" y=\"13\">{{queue | grouped:0}}명 · {{wait}}분</text></g></g></svg>",
      "style": "svg{width:100%;height:100%;overflow:visible}.g{--c:var(--u-widget-text);color:var(--c)}.alarm{--c:var(--u-widget-negative)}.trace{stroke:var(--u-widget-border);stroke-width:1}.dim{stroke:var(--c);stroke-width:1.6}.alarm .dim{stroke-width:3}.tick{stroke:var(--c);stroke-width:1.4}.sq{fill:var(--u-widget-surface);stroke:var(--c);stroke-width:2}.cloud{display:none;fill:none;stroke:var(--u-widget-negative);stroke-width:1.6}.cloud.true{display:block}text{font-family:var(--u-widget-font-mono);fill:var(--c)}.c{font-size:15px;font-weight:700}.q{font-size:12px}",
      "props": {
        "deg": "number",
        "ndeg": "number",
        "lx": "number",
        "anchor": "string",
        "code": "string",
        "queue": "number",
        "wait": "number",
        "jam": "string",
        "tone": "string"
      }
    }
  }
};

export const stadiumGates: SamplePack = {
  id: 'stadium-gates',
  title: {"ko":"경기장 게이트 현황","en":"Stadium gates"},
  field: {"ko":"경기장 운영","en":"Stadium operations"},
  kind: {"ko":"밝은 기술도면 — 게이트와 스탠드를 도면 위에","en":"A light technical drawing — gates and stands on the plan"},
  domain: 'leisure',
  styles: ["drawing","minimal"],
  summary: {"ko":"경기장 도면 위에 여덟 게이트의 대기와 열두 스탠드의 점유를 얹은 한 장 — 밝은 종이 위 가는 선과 한 가지 강조색. 예시 데이터로 그렸습니다.","en":"A stadium plan carrying the queue at eight gates and the occupancy of twelve stands — fine lines and one accent colour on pale paper. Example data written for the board."},
  connectors: [
    {
      "key": "desk",
      "name": "예시 경기장 입장 현황",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 경기장이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
