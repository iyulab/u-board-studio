// metro-diagram: drawn in the design loop from the board's own parts and elements — example data written for the board, no public source carries it.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/metro-diagram.js';

const board: Board = {
  "board": {
    "title": "도시철도 노선도",
    "theme": "light",
    "accent": "#2c5fc9",
    "skin": {
      "palette": {
        "paper": "#fffdf8",
        "ink": "#26231e",
        "muted": "#80796b",
        "rule": "#ece4d2"
      },
      "font": "\"Pretendard Variable\", Inter, \"Malgun Gothic\", system-ui, sans-serif",
      "frame": "card",
      "radius": 20,
      "shadow": "soft"
    }
  },
  "statuses": {
    "ok": {
      "tone": "info",
      "label": "정상"
    },
    "crowded": {
      "tone": "warn",
      "label": "혼잡"
    },
    "slow": {
      "tone": "warn",
      "label": "서행",
      "emphasis": "hatch"
    },
    "closed": {
      "tone": "alarm",
      "label": "운행 중지",
      "emphasis": "hatch"
    }
  },
  "data": {
    "now": {
      "from": "metro",
      "path": "/metro/now",
      "time": "updatedAt",
      "fields": {
        "network": {},
        "time": {}
      }
    },
    "stations": {
      "from": "metro",
      "path": "/metro/stations",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "name": {},
        "note": {},
        "x": {},
        "y": {},
        "id": {},
        "dir": {}
      }
    },
    "segments": {
      "from": "metro",
      "path": "/metro/segments",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "words": {}
      }
    },
    "stationsH": {
      "from": "metro",
      "path": "/metro/stations",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "name": {},
        "note": {},
        "x": {},
        "y": {},
        "id": {},
        "dir": {}
      },
      "where": {
        "dir": "h"
      }
    },
    "stationsV": {
      "from": "metro",
      "path": "/metro/stations",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "name": {},
        "note": {},
        "x": {},
        "y": {},
        "id": {},
        "dir": {}
      },
      "where": {
        "dir": "v"
      }
    }
  },
  "parts": {
    "title": {
      "as": "element",
      "element": "head",
      "of": "now",
      "bind": {
        "network": "network",
        "time": "time"
      }
    },
    "pill1": {
      "as": "element",
      "element": "pill",
      "props": {
        "n": 1,
        "text": "1호선"
      }
    },
    "pill2": {
      "as": "element",
      "element": "pill",
      "props": {
        "n": 2,
        "text": "2호선"
      }
    },
    "station": {
      "as": "element",
      "element": "stn",
      "each": "stations",
      "bind": {
        "id": "id",
        "state": "state"
      }
    },
    "nameH": {
      "as": "element",
      "element": "lh",
      "each": "stationsH",
      "bind": {
        "id": "id",
        "state": "state",
        "name": "name",
        "note": "note"
      }
    },
    "nameV": {
      "as": "element",
      "element": "lv",
      "each": "stationsV",
      "bind": {
        "id": "id",
        "state": "state",
        "name": "name",
        "note": "note"
      }
    },
    "cardIssues": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "눈여겨볼 곳"
      }
    },
    "cardNext": {
      "as": "element",
      "element": "card",
      "props": {
        "title": "다음 열차"
      }
    },
    "issues": {
      "as": "element",
      "element": "isu",
      "each": "segments",
      "bind": {
        "state": "state",
        "words": "words"
      }
    },
    "next": {
      "as": "element",
      "element": "nxt",
      "each": "stations",
      "bind": {
        "id": "id",
        "name": "name",
        "note": "note"
      }
    },
    "key": {
      "as": "element",
      "element": "lg"
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
        28,
        24,
        520,
        128
      ],
      "pill1": [
        38,
        458,
        64,
        26
      ],
      "pill2": [
        770,
        140,
        64,
        26
      ],
      "station": {
        "at": [
          "x",
          "y"
        ],
        "frame": [
          -8.181818181818173,
          -57.07070707070707,
          1446.3636363636363,
          953.030303030303
        ],
        "size": [
          40,
          40
        ]
      },
      "nameH": {
        "at": [
          "x",
          "y"
        ],
        "frame": [
          -8.181818181818173,
          -77.27272727272728,
          1446.3636363636363,
          932.8282828282828
        ],
        "size": [
          150,
          48
        ],
        "anchor": "top"
      },
      "nameV": {
        "at": [
          "x",
          "y"
        ],
        "frame": [
          -26.363636363636353,
          -57.07070707070707,
          1428.181818181818,
          953.030303030303
        ],
        "size": [
          130,
          64
        ],
        "anchor": "left"
      },
      "cardIssues": [
        28,
        792,
        540,
        184
      ],
      "cardNext": [
        584,
        792,
        616,
        184
      ],
      "key": [
        1220,
        792,
        352,
        184
      ],
      "issues": {
        "flow": {
          "at": [
            46,
            832
          ],
          "cell": [
            250,
            26
          ],
          "columns": 2,
          "gap": [
            8,
            2
          ]
        }
      },
      "next": {
        "flow": {
          "at": [
            602,
            832
          ],
          "cell": [
            186,
            26
          ],
          "columns": 3,
          "gap": [
            10,
            2
          ]
        }
      }
    },
    "links": {
      "r1-r2": {
        "from": "station/r1",
        "to": "station/r2",
        "tone": "info",
        "width": 12
      },
      "r1-r2-s": {
        "from": "station/r1",
        "to": "station/r2",
        "of": "segments[r1-r2]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "r2-r3": {
        "from": "station/r2",
        "to": "station/r3",
        "tone": "info",
        "width": 12
      },
      "r2-r3-s": {
        "from": "station/r2",
        "to": "station/r3",
        "of": "segments[r2-r3]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "r3-hub": {
        "from": "station/r3",
        "to": "station/hub",
        "tone": "info",
        "width": 12
      },
      "r3-hub-s": {
        "from": "station/r3",
        "to": "station/hub",
        "of": "segments[r3-hub]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "hub-r5": {
        "from": "station/hub",
        "to": "station/r5",
        "tone": "info",
        "width": 12
      },
      "hub-r5-s": {
        "from": "station/hub",
        "to": "station/r5",
        "of": "segments[hub-r5]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "r5-r6": {
        "from": "station/r5",
        "to": "station/r6",
        "tone": "info",
        "width": 12
      },
      "r5-r6-s": {
        "from": "station/r5",
        "to": "station/r6",
        "of": "segments[r5-r6]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "r6-r7": {
        "from": "station/r6",
        "to": "station/r7",
        "tone": "info",
        "width": 12
      },
      "r6-r7-s": {
        "from": "station/r6",
        "to": "station/r7",
        "of": "segments[r6-r7]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "b1-b2": {
        "from": "station/b1",
        "to": "station/b2",
        "tone": "ok",
        "width": 12
      },
      "b1-b2-s": {
        "from": "station/b1",
        "to": "station/b2",
        "of": "segments[b1-b2]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "b2-hub": {
        "from": "station/b2",
        "to": "station/hub",
        "tone": "ok",
        "width": 12
      },
      "b2-hub-s": {
        "from": "station/b2",
        "to": "station/hub",
        "of": "segments[b2-hub]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "hub-b4": {
        "from": "station/hub",
        "to": "station/b4",
        "tone": "ok",
        "width": 12
      },
      "hub-b4-s": {
        "from": "station/hub",
        "to": "station/b4",
        "of": "segments[hub-b4]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      },
      "b4-b5": {
        "from": "station/b4",
        "to": "station/b5",
        "tone": "ok",
        "width": 12
      },
      "b4-b5-s": {
        "from": "station/b4",
        "to": "station/b5",
        "of": "segments[b4-b5]",
        "show": "state",
        "width": 12,
        "weight": {
          "field": "state",
          "map": {
            "ok": 0.1,
            "*": 12
          }
        }
      }
    },
    "background": "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'1600'%20height%3D'1000'%3E%3Cdefs%3E%3Cpattern%20id%3D'd'%20width%3D'26'%20height%3D'26'%20patternUnits%3D'userSpaceOnUse'%3E%3Ccircle%20cx%3D'2'%20cy%3D'2'%20r%3D'1.1'%20fill%3D'%23d9ceb4'%2F%3E%3C%2Fpattern%3E%3ClinearGradient%20id%3D's'%20x1%3D'0'%20x2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23cfe6ee'%20stop-opacity%3D'0'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%239fcfe0'%20stop-opacity%3D'.9'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'%23f4efe2'%2F%3E%3Crect%20width%3D'1600'%20height%3D'1000'%20fill%3D'url(%23d)'%2F%3E%3Cpath%20d%3D'M-20%20650C220%20600%20360%20760%20640%20740S1000%20640%201200%20760S1480%20880%201640%20820L1640%201020L-20%201020Z'%20fill%3D'%23dcecef'%20opacity%3D'.75'%2F%3E%3Cpath%20d%3D'M1500%200C1470%20120%201560%20220%201520%20330S1480%20520%201530%20640S1590%20860%201560%201000L1620%201000L1620%200Z'%20fill%3D'url(%23s)'%2F%3E%3Cg%20fill%3D'%23cfe3c4'%20opacity%3D'.85'%3E%3Cellipse%20cx%3D'300'%20cy%3D'300'%20rx%3D'130'%20ry%3D'64'%2F%3E%3Cellipse%20cx%3D'1090'%20cy%3D'250'%20rx%3D'150'%20ry%3D'58'%2F%3E%3Cellipse%20cx%3D'470'%20cy%3D'610'%20rx%3D'120'%20ry%3D'52'%2F%3E%3Cellipse%20cx%3D'1180'%20cy%3D'610'%20rx%3D'130'%20ry%3D'56'%2F%3E%3C%2Fg%3E%3Cg%20fill%3D'%23b5d3a6'%3E%3Ccircle%20cx%3D'346'%20cy%3D'300'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'225'%20cy%3D'334'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'307'%20cy%3D'262'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'333'%20cy%3D'321'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'191'%20cy%3D'291'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'373'%20cy%3D'277'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'284'%20cy%3D'329'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'245'%20cy%3D'248'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'389'%20cy%3D'316'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1143'%20cy%3D'250'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'1003'%20cy%3D'281'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1098'%20cy%3D'215'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1128'%20cy%3D'269'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'964'%20cy%3D'241'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1174'%20cy%3D'229'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1071'%20cy%3D'277'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'1027'%20cy%3D'203'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1192'%20cy%3D'264'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'512'%20cy%3D'610'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'400'%20cy%3D'638'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'476'%20cy%3D'579'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'500'%20cy%3D'627'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'370'%20cy%3D'602'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'537'%20cy%3D'592'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'455'%20cy%3D'634'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'420'%20cy%3D'568'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'552'%20cy%3D'623'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1226'%20cy%3D'610'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'1105'%20cy%3D'640'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1187'%20cy%3D'577'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1213'%20cy%3D'628'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'1071'%20cy%3D'602'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1253'%20cy%3D'590'%20r%3D'15'%2F%3E%3Ccircle%20cx%3D'1164'%20cy%3D'636'%20r%3D'9'%2F%3E%3Ccircle%20cx%3D'1125'%20cy%3D'565'%20r%3D'12'%2F%3E%3Ccircle%20cx%3D'1269'%20cy%3D'624'%20r%3D'15'%2F%3E%3C%2Fg%3E%3Cg%20fill%3D'none'%20stroke%3D'%23bfdbe6'%20stroke-width%3D'2'%3E%3Cpath%20d%3D'M1522%2090q16%20-9%2032%200t32%200'%2F%3E%3Cpath%20d%3D'M1526%20250q16%20-9%2032%200t32%200'%2F%3E%3Cpath%20d%3D'M1530%20430q16%20-9%2032%200t32%200'%2F%3E%3Cpath%20d%3D'M1534%20610q16%20-9%2032%200t32%200'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
  },
  "elements": {
    "head": {
      "template": "<div class=\"h\"><span class=\"k\">운행 현황</span><b>{{network}}</b><span class=\"s\">노선도 · {{time}}</span><div class=\"bg\"><i class=\"a\">1</i><i class=\"b\">2</i></div></div>",
      "style": ".h{font-family:inherit;position:relative;height:100%;background:#fffdf8;border-radius:20px;box-shadow:0 1px 2px #26231e14,0 14px 30px -16px #26231e44;border:1px solid #ece4d2;box-sizing:border-box;color:#26231e}.k{position:absolute;left:28px;top:20px;font-size:12.5px;color:#80796b;letter-spacing:.08em}b{position:absolute;left:28px;top:42px;font-size:33px;font-weight:800;letter-spacing:-.02em}.s{position:absolute;left:28px;bottom:16px;font-size:14px;color:#80796b}.bg{position:absolute;right:28px;top:30px;display:flex;gap:8px}i{font-style:normal;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px}.a{background:#2c5fc9}.b{background:#1c9a5a}",
      "props": {
        "network": "string",
        "time": "string"
      }
    },
    "pill": {
      "template": "<div class=\"p p{{n}}\">{{text}}</div>",
      "style": ".p{font-family:inherit;height:100%;border-radius:999px;color:#fff;font-weight:800;font-size:13px;display:grid;place-items:center}.p1{background:#2c5fc9}.p2{background:#1c9a5a}",
      "props": {
        "n": "number",
        "text": "string"
      }
    },
    "stn": {
      "template": "<div class=\"s l-{{id}} st-{{state}}\"><i class=\"g\"></i></div>",
      "style": ".s{font-family:inherit;position:relative;height:100%;--c:#2c5fc9}.l-b1,.l-b2,.l-b4,.l-b5{--c:#1c9a5a}.g{position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:#fff;border:6px solid var(--c);box-sizing:border-box}.st-crowded .g{border-color:#e8a02a;box-shadow:0 0 0 5px #e8a02a24}.st-crowded .g::after{content:\"\";position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#e8a02a}.st-closed .g{background:#e9e4d8;border-color:#d44b3c}.st-closed .g::after{content:\"✕\";position:absolute;inset:0;display:grid;place-items:center;color:#d44b3c;font-size:14px;font-weight:900}.l-hub .g{width:38px;height:38px;margin:-19px 0 0 -19px;border:6px solid #26231e;background:conic-gradient(#2c5fc9 0 25%,#1c9a5a 25% 50%,#2c5fc9 50% 75%,#1c9a5a 75%)}.l-hub .g::after{content:\"\";position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#26231e}",
      "props": {
        "id": "string",
        "state": "string"
      }
    },
    "lh": {
      "template": "<div class=\"t l-{{id}} st-{{state}}\"><b>{{name}}</b><span>{{note}}</span></div>",
      "style": ".t{font-family:inherit;height:100%;padding-top:4px;box-sizing:border-box;text-align:center;color:#26231e}.l-b1,.l-b2,.l-b4,.l-b5,.l-hub{display:none}b{display:block;font-size:15px;font-weight:700;line-height:1.2}span{display:block;font-size:11.5px;color:#80796b;margin-top:2px}.st-crowded span{color:#b8780f}.st-closed span{color:#d44b3c;font-weight:700}",
      "props": {
        "id": "string",
        "state": "string",
        "name": "string",
        "note": "string"
      }
    },
    "lv": {
      "template": "<div class=\"t l-{{id}} st-{{state}}\"><div><b>{{name}}</b><span>{{note}}</span></div></div>",
      "style": ".t{font-family:inherit;height:100%;padding-left:8px;box-sizing:border-box;display:flex;align-items:center;color:#26231e}.l-r1,.l-r2,.l-r3,.l-r5,.l-r6,.l-r7{display:none}.l-hub{align-items:flex-start}b{display:block;font-size:15px;font-weight:700;line-height:1.2}.l-hub b{font-size:17px}span{display:block;font-size:11.5px;color:#80796b;margin-top:2px}.st-crowded span{color:#b8780f}",
      "props": {
        "id": "string",
        "state": "string",
        "name": "string",
        "note": "string"
      }
    },
    "card": {
      "template": "<div class=\"c\"><b>{{title}}</b></div>",
      "style": ".c{font-family:inherit;height:100%;background:#fffdf8;border-radius:20px;box-shadow:0 1px 2px #26231e14,0 14px 30px -16px #26231e44;border:1px solid #ece4d2;box-sizing:border-box;padding:16px 22px;color:#80796b}b{font-size:12.5px;letter-spacing:.06em;font-weight:600}",
      "props": {
        "title": "string"
      }
    },
    "isu": {
      "template": "<div class=\"r r-{{state}}\"><i></i><span>{{words}}</span></div>",
      "style": ".r{font-family:inherit;display:flex;align-items:center;gap:10px;height:100%;font-size:13.5px;color:#26231e}i{font-style:normal;font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:999px;min-width:50px;text-align:center;box-sizing:border-box;background:#eee7d6;color:#80796b}.r-ok i::before{content:\"정상\"}.r-slow i::before{content:\"서행\"}.r-closed i::before{content:\"운행 중지\"}.r-ok{opacity:.5}.r-slow i{background:#fcefd2;color:#a8690f}.r-closed i{background:#fbe0dc;color:#b83a2c}",
      "props": {
        "state": "string",
        "words": "string"
      }
    },
    "nxt": {
      "template": "<div class=\"n l-{{id}}\"><i></i><b>{{name}}</b><span>{{note}}</span></div>",
      "style": ".n{font-family:inherit;display:flex;align-items:center;gap:8px;height:100%;font-size:13.5px;color:#26231e;--c:#2c5fc9}.l-b1,.l-b2,.l-b4,.l-b5{--c:#1c9a5a}.l-hub{--c:#26231e}i{width:9px;height:9px;border-radius:50%;background:var(--c);flex:none}b{font-weight:600}span{margin-left:auto;font-size:12px;color:#80796b;font-variant-numeric:tabular-nums}",
      "props": {
        "id": "string",
        "name": "string",
        "note": "string"
      }
    },
    "lg": {
      "template": "<div class=\"l\"><b>상태</b><div><u class=\"a\"></u>정상</div><div><u class=\"b\"></u>혼잡</div><div><u class=\"c\"></u>서행</div><div><u class=\"d\"></u>운행 중지</div></div>",
      "style": ".l{font-family:inherit;height:100%;background:#fffdf8;border-radius:20px;box-shadow:0 1px 2px #26231e14,0 14px 30px -16px #26231e44;border:1px solid #ece4d2;box-sizing:border-box;padding:16px 22px;color:#26231e;font-size:13.5px}.l>b{display:block;font-size:12.5px;letter-spacing:.06em;font-weight:600;color:#80796b;margin-bottom:10px}.l>div{display:flex;align-items:center;gap:12px;height:30px}u{display:inline-block;flex:none;width:44px}.a{height:6px;border-radius:3px;background:#2c5fc9}.b{width:22px;height:22px;margin:0 11px;border-radius:50%;border:4px solid #e8a02a;box-sizing:border-box}.c{height:6px;background:repeating-linear-gradient(90deg,#e8a02a 0 8px,transparent 8px 14px)}.d{height:8px;background:repeating-linear-gradient(135deg,#bdb6a4 0 3px,#e9e4d8 3px 6px)}",
      "props": {}
    }
  }
};

export const metroDiagram: SamplePack = {
  id: 'metro-diagram',
  title: { ko: '도시철도 노선도', en: 'Metro line diagram' },
  field: { ko: '교통·노선 운행', en: 'Transit line operations' },
  kind: { ko: '노선도 — 역은 점, 선로는 연결선', en: 'Line diagram — stations as dots, tracks as links' },
  domain: 'transport',
  styles: ['drawing'],
  summary: {
    ko: '작은 도시철도의 노선도 — 두 노선이 한 환승역에서 만나고, 역마다 점 하나가 정상 · 혼잡 · 운행 중지로, 이웃한 두 역 사이의 선로마다 선 하나가 정상 · 서행 · 중지로 그려진다. 노선 이름은 끝에 쓰이고 색이 뜻하는 바는 범례가 말한다. 퇴근 시간의 한 장. 예시 데이터.',
    en: 'A small metro on its line diagram — two lines crossing at a hub, a dot for each station as normal, crowded or closed, a line for each stretch of track between two neighbours as running, slow or stopped, the lines named at their ends and a key to what the colours say. One evening rush. Example data.',
  },
  connectors: [
    {
      "key": "metro",
      "name": "예시 운행 정보",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 노선이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
