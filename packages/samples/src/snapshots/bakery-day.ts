// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-01T01:30:10.000Z",
  "responses": {
    "orders": {
      "/orders/now": {
        "shop": "한결 베이커리",
        "date": "11월 1일 일요일",
        "updatedAt": "2026-11-01T01:30:00Z"
      },
      "/orders/list": {
        "value": [
          {
            "id": "o1",
            "pickup": "09:30",
            "who": "서하은",
            "items": "소금빵 6",
            "qty": 6,
            "state": "picked",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o2",
            "pickup": "10:00",
            "who": "정도윤",
            "items": "식빵 2 · 바게트 1",
            "qty": 3,
            "state": "picked",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o3",
            "pickup": "10:15",
            "who": "한유나",
            "items": "크루아상 12",
            "qty": 12,
            "state": "ready",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o4",
            "pickup": "10:30",
            "who": "모아 카페",
            "items": "샌드위치 24",
            "qty": 24,
            "state": "ready",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o5",
            "pickup": "11:00",
            "who": "문지호",
            "items": "단팥빵 8",
            "qty": 8,
            "state": "baking",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o6",
            "pickup": "11:00",
            "who": "해든 어린이집",
            "items": "우유식빵 10",
            "qty": 10,
            "state": "baking",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o7",
            "pickup": "11:30",
            "who": "이서진",
            "items": "바게트 4",
            "qty": 4,
            "state": "baking",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o8",
            "pickup": "12:00",
            "who": "모아 카페",
            "items": "크루아상 30",
            "qty": 30,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o9",
            "pickup": "12:30",
            "who": "박민재",
            "items": "호밀빵 3",
            "qty": 3,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o10",
            "pickup": "13:00",
            "who": "다온 사무실",
            "items": "샌드위치 40",
            "qty": 40,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o11",
            "pickup": "14:00",
            "who": "윤채원",
            "items": "생크림 케이크 1호",
            "qty": 1,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o12",
            "pickup": "15:00",
            "who": "최하준",
            "items": "소금빵 12",
            "qty": 12,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o13",
            "pickup": "16:00",
            "who": "강다온",
            "items": "쿠키 세트 5",
            "qty": 5,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "o14",
            "pickup": "17:00",
            "who": "동네 반찬가게",
            "items": "식빵 6",
            "qty": 6,
            "state": "queued",
            "updatedAt": "2026-11-01T01:30:00Z"
          }
        ],
        "updatedAt": "2026-11-01T01:30:00Z"
      },
      "/orders/hourly": {
        "value": [
          {
            "hour": "9시",
            "qty": 6
          },
          {
            "hour": "10시",
            "qty": 39
          },
          {
            "hour": "11시",
            "qty": 22
          },
          {
            "hour": "12시",
            "qty": 33
          },
          {
            "hour": "13시",
            "qty": 40
          },
          {
            "hour": "14시",
            "qty": 1
          },
          {
            "hour": "15시",
            "qty": 12
          },
          {
            "hour": "16시",
            "qty": 5
          },
          {
            "hour": "17시",
            "qty": 6
          }
        ],
        "updatedAt": "2026-11-01T01:30:00Z"
      }
    },
    "pantry": {
      "/pantry/stock": {
        "value": [
          {
            "id": "강력분",
            "tag": "강력분 18kg",
            "name": "강력분",
            "left": "18kg",
            "pct": 72,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "박력분",
            "tag": "박력분 8kg",
            "name": "박력분",
            "left": "8kg",
            "pct": 40,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "버터",
            "tag": "버터 2kg",
            "name": "버터",
            "left": "2kg",
            "pct": 22,
            "level": "low",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "우유",
            "tag": "우유 13L",
            "name": "우유",
            "left": "13L",
            "pct": 65,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "달걀",
            "tag": "달걀 3판",
            "name": "달걀",
            "left": "3판",
            "pct": 15,
            "level": "low",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "설탕",
            "tag": "설탕 16kg",
            "name": "설탕",
            "left": "16kg",
            "pct": 80,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "생크림",
            "tag": "생크림 0L",
            "name": "생크림",
            "left": "0L",
            "pct": 0,
            "level": "out",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "이스트",
            "tag": "이스트 550g",
            "name": "이스트",
            "left": "550g",
            "pct": 55,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "팥앙금",
            "tag": "팥앙금 3kg",
            "name": "팥앙금",
            "left": "3kg",
            "pct": 28,
            "level": "low",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "소금",
            "tag": "소금 9kg",
            "name": "소금",
            "left": "9kg",
            "pct": 90,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          },
          {
            "id": "견과류",
            "tag": "견과류 1.2kg",
            "name": "견과류",
            "left": "1.2kg",
            "pct": 60,
            "level": "enough",
            "updatedAt": "2026-11-01T01:30:00Z"
          }
        ],
        "updatedAt": "2026-11-01T01:30:00Z"
      }
    }
  }
};
