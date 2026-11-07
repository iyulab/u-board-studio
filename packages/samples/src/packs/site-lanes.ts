// A building site's work plan as lanes: one lane per trade — rebar, formwork, sleeves, concrete, curing — and in each
// lane a card per zone, each with its state and how much of its work is done. The work on the critical path is ringed
// in amber; a stopped one is filled red. Nothing here is drawn by an element of its own: five built-in parts, the
// lanes made by one rule — the cards grouped by trade, flowing in a box each. The drawing under it follows the skin.
// No public source carries a site's plan, so the values are example data written for the board.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/site-lanes.js';

const board: Board = {
  "board": {
    "title": "공정 레인",
    "theme": "dark",
    "accent": "#fbbf24",
    "skin": {
      "palette": {
        "paper": "#10263d",
        "ink": "#e8f0f8",
        "muted": "#8fa9c4",
        "rule": "#2e4f73"
      },
      "frame": "flat",
      "radius": 4
    }
  },
  "statuses": {
    "done": {
      "tone": "ok",
      "label": "완료"
    },
    "running": {
      "tone": "info",
      "label": "작업 중"
    },
    "waiting": {
      "tone": "idle",
      "label": "대기"
    },
    "blocked": {
      "tone": "alarm",
      "label": "중단",
      "emphasis": "invert"
    }
  },
  "data": {
    "site": {
      "from": "site",
      "path": "/site/now",
      "time": "updatedAt",
      "fields": {
        "name": {},
        "floor": {},
        "date": {},
        "weather": {}
      }
    },
    "tasks": {
      "from": "site",
      "path": "/site/tasks",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fields": {
        "state": {
          "state": "raw"
        },
        "done": {},
        "planned": {},
        "note": {},
        "critical": {},
        "what": {},
        "zone": {},
        "trade": {}
      }
    },
    "crews": {
      "from": "site",
      "path": "/site/crews",
      "list": "/value",
      "key": "trade",
      "time": "updatedAt",
      "fields": {
        "workers": {
          "unit": "명"
        }
      }
    },
    "totals": {
      "from": "site",
      "path": "/site/totals",
      "time": "updatedAt",
      "fields": {
        "done": {
          "label": "완료",
          "unit": "공종"
        },
        "running": {
          "label": "작업 중",
          "unit": "공종"
        },
        "waiting": {
          "label": "대기",
          "unit": "공종"
        },
        "blocked": {
          "label": "중단",
          "unit": "공종"
        }
      }
    }
  },
  "parts": {
    "title": {
      "as": "header",
      "of": "site",
      "title": "{{name}} · {{floor}} · {{date}}",
      "kicker": "공정 레인",
      "subtitle": "예시 데이터"
    },
    "task": {
      "as": "status-card",
      "each": "tasks",
      "title": "{{zone}}구역 · {{what}}",
      "subtitle": "{{note}}",
      "show": [
        "state"
      ],
      "meter": {
        "field": "done",
        "max": "planned",
        "form": "bar"
      },
      "highlight": "critical"
    },
    "crew": {
      "as": "bar-list",
      "of": "crews",
      "title": "오늘 투입 인원",
      "label": "trade",
      "value": "workers"
    },
    "totals": {
      "as": "stat-list",
      "of": "totals",
      "title": "공종 진행",
      "show": [
        "done",
        "running",
        "waiting",
        "blocked"
      ]
    }
  },
  "layout": {
    "kind": "canvas",
    "size": [
      1280,
      1014
    ],
    "background": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221280%22%20height%3D%221014%22%20viewBox%3D%220%200%201280%201014%22%3E%3Crect%20width%3D%221280%22%20height%3D%221014%22%20fill%3D%22var(--u-widget-bg%2C%20%2310263d)%22%2F%3E%3Cpath%20d%3D%22M0%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M40%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M80%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M120%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M160%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M200%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M240%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M280%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M320%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M360%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M400%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M440%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M480%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M520%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M560%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M600%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M640%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M680%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M720%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M760%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M800%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M840%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M880%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M920%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M960%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1000%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1040%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1080%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1120%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1160%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M1200%200V1014%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%200H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%2040H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%2080H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20120H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20160H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20200H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20240H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20280H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20320H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20360H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20400H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20440H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20480H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20520H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20560H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20600H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20640H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20680H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20720H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20760H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20800H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20840H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20880H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20920H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%20960H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Cpath%20d%3D%22M0%201000H1280%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-opacity%3D%22.35%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%221264%22%20height%3D%22998%22%20fill%3D%22none%22%20stroke%3D%22var(--u-widget-border%2C%20%232e4f73)%22%20stroke-width%3D%223%22%2F%3E%3Ctext%20x%3D%221252%22%20y%3D%22998%22%20text-anchor%3D%22end%22%20font-size%3D%2211%22%20letter-spacing%3D%222%22%20fill%3D%22var(--u-widget-text-secondary%2C%20%238fa9c4)%22%3ESHEET%2005%20%C2%B7%20TRADE%20LANES%20%C2%B7%205F%20FRAME%3C%2Ftext%3E%3C%2Fsvg%3E",
    "place": {
      "title": [
        24,
        16,
        1232,
        84
      ],
      "task": {
        "by": "trade",
        "boxes": {
          "at": [
            24,
            112
          ],
          "gap": [
            16,
            14
          ],
          "columns": 5,
          "label": "{{key}}"
        },
        "flow": {
          "cell": [
            212,
            140
          ],
          "gap": [
            8,
            8
          ],
          "columns": 1,
          "pad": [
            10,
            30
          ]
        }
      },
      "crew": [
        24,
        748,
        600,
        250
      ],
      "totals": [
        640,
        748,
        608,
        250
      ]
    }
  }
};

export const siteLanes: SamplePack = {
  id: "site-lanes",
  title: {
    "ko": "공정 레인",
    "en": "Trade lanes"
  },
  field: {
    "ko": "건설·공정",
    "en": "Construction schedule"
  },
  kind: {
    "ko": "도면 위 배치(캔버스) — 공종별 레인",
    "en": "Placed on a drawing (canvas) — a lane per trade"
  },
  domain: "construction",
  styles: [
    "drawing"
  ],
  summary: {
    "ko": "골조 공사의 공종별 레인 — 철근·거푸집·설비 슬리브·콘크리트·양생마다 구역별 카드가 상태와 진행량을 보이고, 임계 경로의 작업은 호박색 테두리, 중단된 작업은 붉게 칠해진다. 요소 없이 빌트인 부품 다섯과 «공종으로 묶어 흘려 놓기» 한 규칙으로 그렸다. 예시 데이터.",
    "en": "The frame of a building, one lane per trade — rebar, formwork, sleeves, concrete, curing — each lane a card per zone with its state and how much is done; the work on the critical path is ringed in amber, a stopped one filled red. Drawn with no element of its own: five built-in parts and one rule that groups the cards by trade. Example data."
  },
  connectors: [
    {
      "key": "site",
      "name": "예시 공사 현장 공정표",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 현장이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
