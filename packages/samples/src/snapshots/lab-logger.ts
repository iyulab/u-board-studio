// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-10-29T05:40:30.000Z",
  "responses": {
    "lab": {
      "/lab/now": {
        "room": "과학실 2",
        "class": "2학년 3반",
        "topic": "연못물 수질 비교",
        "updatedAt": "2026-10-29T05:40:00Z"
      },
      "/lab/channels": {
        "value": [
          {
            "channel": "temp",
            "reading": 22.8,
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "channel": "ph",
            "reading": 7.4,
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "channel": "cond",
            "reading": 412,
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "channel": "turb",
            "reading": 6.2,
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "channel": "oxygen",
            "reading": 5.4,
            "updatedAt": "2026-10-29T05:40:00Z"
          }
        ],
        "updatedAt": "2026-10-29T05:40:00Z"
      },
      "/lab/oxygen": {
        "value": [
          {
            "time": "09:00",
            "oxygen": 8.4
          },
          {
            "time": "09:30",
            "oxygen": 8.3
          },
          {
            "time": "10:00",
            "oxygen": 8.1
          },
          {
            "time": "10:30",
            "oxygen": 7.9
          },
          {
            "time": "11:00",
            "oxygen": 7.6
          },
          {
            "time": "11:30",
            "oxygen": 7.2
          },
          {
            "time": "12:00",
            "oxygen": 6.9
          },
          {
            "time": "12:30",
            "oxygen": 6.5
          },
          {
            "time": "13:00",
            "oxygen": 6.2
          },
          {
            "time": "13:30",
            "oxygen": 5.9
          },
          {
            "time": "14:00",
            "oxygen": 5.6
          },
          {
            "time": "14:30",
            "oxygen": 5.4
          }
        ],
        "updatedAt": "2026-10-29T05:40:00Z"
      },
      "/lab/notes": {
        "value": [
          {
            "id": "n-4",
            "time": "14:10",
            "who": "3모둠",
            "what": "용존산소가 6 아래로 — 시료에 공기를 불어 넣어 봄",
            "state": "warn",
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "id": "n-3",
            "time": "13:20",
            "who": "1모둠",
            "what": "탁도 6 — 시료를 가라앉혀 윗물만 다시 잼",
            "state": "warn",
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "id": "n-2",
            "time": "11:00",
            "who": "2모둠",
            "what": "pH 7.4 · 전도도 412 — 수돗물과 비교표에 적음",
            "state": "ok",
            "updatedAt": "2026-10-29T05:40:00Z"
          },
          {
            "id": "n-1",
            "time": "09:10",
            "who": "선생님",
            "what": "로거 다섯 채널 보정 확인",
            "state": "info",
            "updatedAt": "2026-10-29T05:40:00Z"
          }
        ],
        "updatedAt": "2026-10-29T05:40:00Z"
      }
    }
  }
};
