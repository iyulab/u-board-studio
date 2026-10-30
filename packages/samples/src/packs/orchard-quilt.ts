// An orchard in its harvest week laid out as a quilt top: cotton patches in a gingham, a stripe and a diamond print
// stitched together with running-stitch seams and cornerstones where the sashing crosses, a woven fabric label for a
// masthead. Each patch is a plot, and every tree in it is a button sewn on its row with a small stitched leaf: the
// button's colour, a mark beside its word and a dashed rim for a tree already picked tell its state. A plot is one group
// made per item of the plots list, and its trees are drawn per item of the list inside that item, each placed by its own
// place in the plot. Below, the key and the kilograms picked each day. The orchard is made up, so the values are example data.

import type { Board } from '@iyulab/u-board/domain';
import type { SamplePack } from '../sample-pack.js';
import { snapshot } from '../snapshots/orchard-quilt.js';

const board: Board = {
  "board": {
    "theme": "light",
    "accent": "#c8553a"
  },
  "presets": {
    "plot": {
      "as": "group",
      "size": [
        400,
        360
      ],
      "parts": {
        "head": {
          "as": "element",
          "element": "plothead",
          "bind": {
            "name": "name",
            "crop": "crop",
            "ripe": "ripe",
            "picked": "picked",
            "scab": "scab",
            "total": "total"
          }
        },
        "tree": {
          "as": "element",
          "element": "tree",
          "each": "/trees",
          "bind": {
            "no": "no",
            "state": "state",
            "word": "word",
            "kg": "kg"
          }
        }
      },
      "place": {
        "head": [
          12,
          12,
          376,
          52
        ],
        "tree": {
          "at": [
            "x",
            "y"
          ],
          "frame": [
            0,
            0,
            40,
            36
          ],
          "size": [
            76,
            86
          ]
        }
      }
    }
  },
  "elements": {
    "tree": {
      "template": "<article class=\"t {{state}}\"><svg viewBox=\"0 0 76 46\" aria-hidden=\"true\"><path class=\"lf\" d=\"M 50 15 C 50 5 58 2 68 4 C 68 13 61 17 50 15 Z\"/><path class=\"vn\" d=\"M 52 13 L 66 6\"/><circle class=\"b\" cx=\"36\" cy=\"26\" r=\"17\"/><circle class=\"rm\" cx=\"36\" cy=\"26\" r=\"12.5\"/><circle class=\"hl\" cx=\"31\" cy=\"21\" r=\"1.9\"/><circle class=\"hl\" cx=\"41\" cy=\"21\" r=\"1.9\"/><circle class=\"hl\" cx=\"31\" cy=\"31\" r=\"1.9\"/><circle class=\"hl\" cx=\"41\" cy=\"31\" r=\"1.9\"/><path class=\"th\" d=\"M 31 21 L 41 21 M 31 31 L 41 31\"/></svg><b>{{no}} · {{kg}}kg</b><i>{{word}}</i></article>",
      "style": ".t{height:100%;box-sizing:border-box;display:grid;grid-template-rows:46px auto auto;justify-items:center;align-content:start;gap:2px;font-family:\"Pretendard\", \"Malgun Gothic\", \"Apple SD Gothic Neo\", sans-serif;color:#3a2a20}\n.t svg{width:76px;height:46px;display:block}\n.b{fill:var(--c);stroke:rgba(58,42,32,.5);stroke-width:1}\n.rm{fill:none;stroke:rgba(255,250,240,.55);stroke-width:1.5}\n.hl{fill:#3a2a20;fill-opacity:.65}\n.th{fill:none;stroke:#fffaf0;stroke-width:1.8;stroke-linecap:round}\n.lf{fill:#78a058;stroke:#fffaf0;stroke-width:1.2;stroke-dasharray:2.4 1.8}\n.vn{fill:none;stroke:#fffaf0;stroke-width:1;stroke-dasharray:2 1.5}\nb{font-size:12px;font-weight:800;white-space:nowrap}\ni{font-style:normal;font-size:12px;font-weight:800;padding:1px 6px;background:#fffaf0;border:1.5px solid var(--c);border-radius:9px;white-space:nowrap}\n.ripe{--c:#d6532f}.ripe i::before{content:\"◆ \"}\n.ripening{--c:#e0a82e}.ripening i::before{content:\"◇ \"}\n.scab{--c:#7a4468}.scab i::before{content:\"✕ \"}\n.picked{--c:#9b8d70}.picked .b{fill:none;stroke:var(--c);stroke-width:2.2;stroke-dasharray:3 3}.picked .th{stroke:var(--c)}.picked .hl{fill:var(--c)}.picked i::before{content:\"○ \"}\n.young{--c:#6f9b52}.young i::before{content:\"▲ \"}",
      "props": {
        "no": "string",
        "state": "string",
        "word": "string",
        "kg": "number"
      }
    },
    "plothead": {
      "template": "<header class=\"ph\"><div><h2>{{name}}</h2><p>{{crop}}</p></div><dl><div><dt>익음</dt><dd>{{ripe}}</dd></div><div><dt>수확</dt><dd>{{picked}}</dd></div><div><dt>병 의심</dt><dd>{{scab}}</dd></div><div><dt>전체</dt><dd>{{total}}</dd></div></dl></header>",
      "style": ".ph{height:100%;box-sizing:border-box;display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px;padding:0 12px;background:#fffaf0;border:2px dashed #7b5a3a;border-radius:6px;font-family:\"Pretendard\", \"Malgun Gothic\", \"Apple SD Gothic Neo\", sans-serif;color:#3a2a20}\nh2{margin:0;font-size:18px;font-weight:900;letter-spacing:.04em}\np{margin:0;font-size:12px;color:#6b5640}\ndl{margin:0;display:flex;gap:4px}\ndl div{display:grid;justify-items:center;min-width:38px;padding:2px 0;border-left:1.5px dotted #b9a47f}\ndl div:first-child{border-left:0}\ndt{font-size:11px;color:#6b5640;white-space:nowrap}\ndd{margin:0;font-size:18px;font-weight:900;font-variant-numeric:tabular-nums}",
      "props": {
        "name": "string",
        "crop": "string",
        "ripe": "number",
        "picked": "number",
        "scab": "number",
        "total": "number"
      }
    },
    "masthead": {
      "template": "<header class=\"mh\"><svg viewBox=\"0 0 56 40\" aria-hidden=\"true\"><path class=\"f\" d=\"M 32 12 C 32 4 38 1 46 2 C 46 9 41 13 32 12 Z\"/><circle class=\"k\" cx=\"22\" cy=\"23\" r=\"14\"/><circle class=\"h\" cx=\"18\" cy=\"19\" r=\"1.7\"/><circle class=\"h\" cx=\"26\" cy=\"19\" r=\"1.7\"/><circle class=\"h\" cx=\"18\" cy=\"27\" r=\"1.7\"/><circle class=\"h\" cx=\"26\" cy=\"27\" r=\"1.7\"/></svg><div><small>{{t.series}}</small><h1>{{t.name}}</h1></div><div class=\"dt\"><span>{{t.date}}</span><b>{{t.time}}</b></div></header>",
      "style": ".mh{height:100%;box-sizing:border-box;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:20px;padding:0 36px;background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px),#2c4468;color:#f6efdc;outline:2px dashed #f6efdc;outline-offset:-8px;border-radius:3px;font-family:\"Pretendard\", \"Malgun Gothic\", \"Apple SD Gothic Neo\", sans-serif}\nsvg{width:56px;height:40px;display:block}\n.k{fill:#e9c47e;stroke:#f6efdc;stroke-width:1}\n.h{fill:#2c4468}\n.f{fill:#8fb26d;stroke:#f6efdc;stroke-width:1.2;stroke-dasharray:2.4 1.8}\nsmall{display:block;font-size:13px;letter-spacing:.22em;color:#e9c47e;font-weight:700}\nh1{margin:0;font-size:30px;font-weight:900;letter-spacing:.1em;line-height:1.15}\n.dt{display:flex;align-items:baseline;gap:14px}\nspan{font-size:16px}\nb{font-size:28px;font-weight:900;background:#f6efdc;color:#2c4468;padding:0 10px;border-radius:2px;font-variant-numeric:tabular-nums}",
      "props": {
        "t": "object"
      }
    },
    "legend": {
      "template": "<section class=\"lg\"><h3>단추 읽는 법</h3><ul><li class=\"ripe\"><s></s><b>◆ 익음</b><span>따도 되는 나무</span></li><li class=\"ripening\"><s></s><b>◇ 익는 중</b><span>며칠 더 두는 나무</span></li><li class=\"picked\"><s></s><b>○ 수확함</b><span>이미 딴 나무</span></li><li class=\"scab\"><s></s><b>✕ 병 의심</b><span>잎·열매를 살피는 나무</span></li><li class=\"young\"><s></s><b>▲ 어린나무</b><span>아직 열매를 따지 않음</span></li></ul></section>",
      "style": ".lg{height:100%;box-sizing:border-box;padding:10px 18px;background:#fffaf0;border:2px dashed #5d7a9c;border-radius:6px;font-family:\"Pretendard\", \"Malgun Gothic\", \"Apple SD Gothic Neo\", sans-serif;color:#3a2a20}\nh3{margin:0 0 6px;font-size:16px;font-weight:900;letter-spacing:.12em;color:#34506f}\nul{margin:0;padding:0;list-style:none;display:grid;gap:5px}\nli{display:grid;grid-template-columns:30px 92px 1fr;align-items:center;font-size:14px}\ns{display:block;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 7px 7px,#3a2a20 1.4px,transparent 2px),radial-gradient(circle at 15px 7px,#3a2a20 1.4px,transparent 2px),radial-gradient(circle at 7px 15px,#3a2a20 1.4px,transparent 2px),radial-gradient(circle at 15px 15px,#3a2a20 1.4px,transparent 2px),var(--c);box-shadow:inset 0 0 0 3px rgba(255,250,240,.45)}\nb{font-weight:800}\nspan{color:#6b5640;font-size:13px}\n.ripe{--c:#d6532f}.ripening{--c:#e0a82e}.scab{--c:#7a4468}.young{--c:#6f9b52}\n.picked s{background:none;box-shadow:none;border:2.2px dashed #9b8d70}"
    }
  },
  "data": {
    "now": {
      "from": "orchard",
      "path": "/orchard/now",
      "time": "updatedAt",
      "fresh": 600,
      "fields": {
        "value": {}
      }
    },
    "plots": {
      "from": "orchard",
      "path": "/orchard/plots",
      "list": "/value",
      "key": "id",
      "time": "updatedAt",
      "fresh": 600,
      "fields": {
        "name": {},
        "crop": {},
        "ripe": {},
        "picked": {},
        "scab": {},
        "total": {},
        "trees": {
          "items": {
            "no": {},
            "x": {},
            "y": {},
            "kg": {},
            "state": {},
            "word": {
              "at": "/state",
              "names": {
                "ripe": "익음",
                "ripening": "익는 중",
                "scab": "병 의심",
                "picked": "수확함",
                "young": "어린나무"
              }
            }
          }
        }
      }
    },
    "harvest": {
      "from": "orchard",
      "path": "/orchard/harvest",
      "list": "/value",
      "fresh": 600,
      "answerTime": "/updatedAt"
    }
  },
  "parts": {
    "masthead": {
      "as": "element",
      "element": "masthead",
      "of": "now",
      "bind": {
        "t": "value"
      }
    },
    "plots": {
      "use": "plot",
      "each": "plots"
    },
    "legend": {
      "as": "element",
      "element": "legend"
    },
    "harvest": {
      "as": "chart.bar",
      "of": "harvest",
      "title": "일별 수확량(kg) — 30일은 10시 20분까지",
      "x": "day",
      "y": "kg",
      "series": [
        {
          "label": "수확량",
          "color": "#c8553a"
        }
      ]
    }
  },
  "layout": {
    "kind": "canvas",
    "size": [
      1280,
      720
    ],
    "background": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221280%22%20height%3D%22720%22%20viewBox%3D%220%200%201280%20720%22%3E%0A%3Cdefs%3E%0A%3Cpattern%20id%3D%22q%22%20width%3D%2236%22%20height%3D%2236%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%200%2036%20L%2036%200%22%20stroke%3D%22%239c8358%22%20stroke-opacity%3D%22.28%22%20stroke-width%3D%221%22%2F%3E%3C%2Fpattern%3E%0A%3Cpattern%20id%3D%22g%22%20width%3D%2220%22%20height%3D%2220%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23f7e6df%22%2F%3E%3Crect%20width%3D%2220%22%20height%3D%2210%22%20fill%3D%22%23c8574a%22%20fill-opacity%3D%22.2%22%2F%3E%3Crect%20width%3D%2210%22%20height%3D%2220%22%20fill%3D%22%23c8574a%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fpattern%3E%0A%3Cpattern%20id%3D%22s%22%20width%3D%2214%22%20height%3D%2214%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Crect%20width%3D%2214%22%20height%3D%2214%22%20fill%3D%22%23e6eed9%22%2F%3E%3Crect%20width%3D%227%22%20height%3D%2214%22%20fill%3D%22%23b9cfa0%22%20fill-opacity%3D%22.7%22%2F%3E%3C%2Fpattern%3E%0A%3Cpattern%20id%3D%22d%22%20width%3D%2226%22%20height%3D%2226%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Crect%20width%3D%2226%22%20height%3D%2226%22%20fill%3D%22%23f8e5c2%22%2F%3E%3Cpath%20d%3D%22M%2013%203%20L%2023%2013%20L%2013%2023%20L%203%2013%20Z%22%20fill%3D%22%23edc57f%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%222.2%22%20fill%3D%22%23cf8f3b%22%2F%3E%3C%2Fpattern%3E%0A%3Cpattern%20id%3D%22p%22%20width%3D%2222%22%20height%3D%2222%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Crect%20width%3D%2222%22%20height%3D%2222%22%20fill%3D%22%23e9eff6%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%223%22%20fill%3D%22%23bccde0%22%2F%3E%3Ccircle%20cx%3D%2217%22%20cy%3D%2217%22%20r%3D%223%22%20fill%3D%22%23bccde0%22%2F%3E%3C%2Fpattern%3E%0A%3Cpattern%20id%3D%22l%22%20width%3D%226%22%20height%3D%226%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Crect%20width%3D%226%22%20height%3D%226%22%20fill%3D%22%23fbf5e6%22%2F%3E%3Cpath%20d%3D%22M%200%203%20H%206%20M%203%200%20V%206%22%20stroke%3D%22%23eadfc4%22%20stroke-width%3D%221%22%2F%3E%3C%2Fpattern%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%221280%22%20height%3D%22720%22%20fill%3D%22%23dccba6%22%2F%3E%0A%3Crect%20width%3D%221280%22%20height%3D%22720%22%20fill%3D%22url(%23q)%22%2F%3E%0A%0A%3Crect%20x%3D%22424%22%20y%3D%2288%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23b5523b%22%2F%3E%0A%3Cpath%20d%3D%22M%20427%2091%20L%20437%20101%20M%20437%2091%20L%20427%20101%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3Crect%20x%3D%22840%22%20y%3D%2288%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%233f6b8f%22%2F%3E%0A%3Cpath%20d%3D%22M%20843%2091%20L%20853%20101%20M%20853%2091%20L%20843%20101%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3Crect%20x%3D%22424%22%20y%3D%22464%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%233f6b8f%22%2F%3E%0A%3Cpath%20d%3D%22M%20427%20467%20L%20437%20477%20M%20437%20467%20L%20427%20477%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3Crect%20x%3D%22840%22%20y%3D%22464%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23b5523b%22%2F%3E%0A%3Cpath%20d%3D%22M%20843%20467%20L%20853%20477%20M%20853%20467%20L%20843%20477%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%3Crect%20x%3D%2224%22%20y%3D%22104%22%20width%3D%22400%22%20height%3D%22360%22%20fill%3D%22%23a8473f%22%2F%3E%0A%3Crect%20x%3D%2233%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22url(%23g)%22%2F%3E%0A%3Crect%20x%3D%2228.5%22%20y%3D%22108.5%22%20width%3D%22391%22%20height%3D%22351%22%20fill%3D%22none%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%222.2%22%20stroke-dasharray%3D%227%205%22%2F%3E%0A%3Crect%20x%3D%2233%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22none%22%20stroke%3D%22%237d2f2a%22%20stroke-opacity%3D%22.55%22%20stroke-width%3D%221.2%22%20stroke-dasharray%3D%223%203%22%2F%3E%3Cline%20x1%3D%2246%22%20y1%3D%22220%22%20x2%3D%22402%22%20y2%3D%22220%22%20stroke%3D%22%237d2f2a%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2246%22%20y1%3D%22312%22%20x2%3D%22402%22%20y2%3D%22312%22%20stroke%3D%22%237d2f2a%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2246%22%20y1%3D%22404%22%20x2%3D%22402%22%20y2%3D%22404%22%20stroke%3D%22%237d2f2a%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%3Crect%20x%3D%22440%22%20y%3D%22104%22%20width%3D%22400%22%20height%3D%22360%22%20fill%3D%22%236d8a56%22%2F%3E%0A%3Crect%20x%3D%22449%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22url(%23s)%22%2F%3E%0A%3Crect%20x%3D%22444.5%22%20y%3D%22108.5%22%20width%3D%22391%22%20height%3D%22351%22%20fill%3D%22none%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%222.2%22%20stroke-dasharray%3D%227%205%22%2F%3E%0A%3Crect%20x%3D%22449%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22none%22%20stroke%3D%22%2341592f%22%20stroke-opacity%3D%22.55%22%20stroke-width%3D%221.2%22%20stroke-dasharray%3D%223%203%22%2F%3E%3Cline%20x1%3D%22462%22%20y1%3D%22220%22%20x2%3D%22818%22%20y2%3D%22220%22%20stroke%3D%22%2341592f%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%22462%22%20y1%3D%22312%22%20x2%3D%22818%22%20y2%3D%22312%22%20stroke%3D%22%2341592f%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%22462%22%20y1%3D%22404%22%20x2%3D%22818%22%20y2%3D%22404%22%20stroke%3D%22%2341592f%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%3Crect%20x%3D%22856%22%20y%3D%22104%22%20width%3D%22400%22%20height%3D%22360%22%20fill%3D%22%23c9822f%22%2F%3E%0A%3Crect%20x%3D%22865%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22url(%23d)%22%2F%3E%0A%3Crect%20x%3D%22860.5%22%20y%3D%22108.5%22%20width%3D%22391%22%20height%3D%22351%22%20fill%3D%22none%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%222.2%22%20stroke-dasharray%3D%227%205%22%2F%3E%0A%3Crect%20x%3D%22865%22%20y%3D%22113%22%20width%3D%22382%22%20height%3D%22342%22%20fill%3D%22none%22%20stroke%3D%22%238a5514%22%20stroke-opacity%3D%22.55%22%20stroke-width%3D%221.2%22%20stroke-dasharray%3D%223%203%22%2F%3E%3Cline%20x1%3D%22878%22%20y1%3D%22220%22%20x2%3D%221234%22%20y2%3D%22220%22%20stroke%3D%22%238a5514%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%22878%22%20y1%3D%22312%22%20x2%3D%221234%22%20y2%3D%22312%22%20stroke%3D%22%238a5514%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%22878%22%20y1%3D%22404%22%20x2%3D%221234%22%20y2%3D%22404%22%20stroke%3D%22%238a5514%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20stroke-dasharray%3D%222%205%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%3Crect%20x%3D%2224%22%20y%3D%22480%22%20width%3D%22400%22%20height%3D%22224%22%20fill%3D%22%235d7a9c%22%2F%3E%0A%3Crect%20x%3D%2233%22%20y%3D%22489%22%20width%3D%22382%22%20height%3D%22206%22%20fill%3D%22url(%23p)%22%2F%3E%0A%3Crect%20x%3D%2228.5%22%20y%3D%22484.5%22%20width%3D%22391%22%20height%3D%22215%22%20fill%3D%22none%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%222.2%22%20stroke-dasharray%3D%227%205%22%2F%3E%0A%3Crect%20x%3D%2233%22%20y%3D%22489%22%20width%3D%22382%22%20height%3D%22206%22%20fill%3D%22none%22%20stroke%3D%22%2334506f%22%20stroke-opacity%3D%22.55%22%20stroke-width%3D%221.2%22%20stroke-dasharray%3D%223%203%22%2F%3E%0A%0A%3Crect%20x%3D%22440%22%20y%3D%22480%22%20width%3D%22816%22%20height%3D%22224%22%20fill%3D%22%238a6a4a%22%2F%3E%0A%3Crect%20x%3D%22449%22%20y%3D%22489%22%20width%3D%22798%22%20height%3D%22206%22%20fill%3D%22url(%23l)%22%2F%3E%0A%3Crect%20x%3D%22444.5%22%20y%3D%22484.5%22%20width%3D%22807%22%20height%3D%22215%22%20fill%3D%22none%22%20stroke%3D%22%23fffaf0%22%20stroke-width%3D%222.2%22%20stroke-dasharray%3D%227%205%22%2F%3E%0A%3Crect%20x%3D%22449%22%20y%3D%22489%22%20width%3D%22798%22%20height%3D%22206%22%20fill%3D%22none%22%20stroke%3D%22%235b4128%22%20stroke-opacity%3D%22.55%22%20stroke-width%3D%221.2%22%20stroke-dasharray%3D%223%203%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%221272%22%20height%3D%22712%22%20fill%3D%22none%22%20stroke%3D%22%232c4468%22%20stroke-width%3D%228%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%221272%22%20height%3D%22712%22%20fill%3D%22none%22%20stroke%3D%22%23f6efdc%22%20stroke-width%3D%221.5%22%20stroke-dasharray%3D%226%205%22%2F%3E%0A%3C%2Fsvg%3E",
    "place": {
      "masthead": [
        24,
        16,
        1232,
        72
      ],
      "plots": {
        "a": [
          24,
          104,
          400,
          360
        ],
        "b": [
          440,
          104,
          400,
          360
        ],
        "c": [
          856,
          104,
          400,
          360
        ]
      },
      "legend": [
        36,
        492,
        376,
        200
      ],
      "harvest": [
        456,
        494,
        784,
        196
      ]
    }
  }
};

export const orchardQuilt: SamplePack = {
  id: "orchard-quilt",
  title: {
    "ko": "수확철 과수원 — 퀼트 패치워크",
    "en": "An orchard at harvest — patchwork quilt"
  },
  field: {
    "ko": "과수원·농업",
    "en": "Orchards & farming"
  },
  kind: {
    "ko": "구역별 나무 상태·일별 수확",
    "en": "Trees by plot and the harvest by day"
  },
  domain: "agrifood",
  styles: ["craft"],
  summary: {
    "ko": "수확철 과수원을 퀼트로 — 사과·배·감 세 구역이 서로 다른 천(깅엄·줄무늬·마름모)으로 이어 붙은 패치가 되고, 이음선마다 홈질이 보이며 구역 사이에는 모서리 조각이 놓입니다. 나무는 구역의 줄에 달린 단추 하나에 작은 잎을 수놓은 모양: 단추 색과 곁의 기호·말로 상태를 알립니다 — ◆ 익음, ◇ 익는 중, ✕ 병 의심, ○ 수확함(점선 테두리), ▲ 어린나무. 구역은 목록의 항목마다 만들어지는 묶음이고, 나무는 그 항목 안 목록의 항목마다 제 자리(구역 안 미터 좌표)에 놓입니다. 위쪽 직조 라벨에 과수원 이름과 시각, 아래에 단추 읽는 법과 일별 수확량. 과수원은 지어낸 것이라 예시 데이터입니다.",
    "en": "An orchard in its harvest week as a quilt — three plots of apples, pears and persimmons become patches of different cloth (gingham, stripes, diamonds) joined by running-stitch seams, with cornerstones where the sashing crosses. A tree is one button sewn on its row with a small stitched leaf, and tells its state by the button’s colour and the mark and word beside it: a diamond for ripe, an outlined diamond for ripening, a cross for a suspected disease, a ring with a dashed rim for already picked, a triangle for a young tree. A plot is a group made per item of a list, and its trees are drawn per item of the list inside that item, each at its own place in the plot (metres across it). A woven label above carries the orchard’s name and the time; below, the key and the kilograms picked each day. The orchard is made up. Example data."
  },
  connectors: [
    {
      "key": "orchard",
      "name": "예시 과수원 API",
      "example": true,
      "attribution": {
        "text": "예시 데이터 — 실제 과수원이 아닙니다"
      }
    }
  ],
  board,
  snapshot,
};
