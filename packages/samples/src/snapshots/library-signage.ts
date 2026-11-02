// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-02T04:10:10.000Z",
  "responses": {
    "desk": {
      "/desk/now": {
        "library": "한결시립도서관",
        "date": "11월 2일 월요일",
        "hours": "09:00 – 21:00",
        "updatedAt": "2026-11-02T04:10:00Z"
      },
      "/desk/rooms": {
        "value": [
          {
            "id": "r1",
            "floor": "1F",
            "name": "종합열람실",
            "total": 120,
            "used": 54,
            "free": 66,
            "level": "plenty",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "r2",
            "floor": "2F",
            "name": "일반열람실",
            "total": 200,
            "used": 171,
            "free": 29,
            "level": "busy",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "r3",
            "floor": "3F",
            "name": "노트북실",
            "total": 80,
            "used": 80,
            "free": 0,
            "level": "full",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "r4",
            "floor": "4F",
            "name": "스터디룸",
            "total": 36,
            "used": 12,
            "free": 24,
            "level": "plenty",
            "updatedAt": "2026-11-02T04:10:00Z"
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      },
      "/desk/programs": {
        "value": [
          {
            "id": "p1",
            "time": "10:00",
            "title": "그림책 읽어주는 시간",
            "place": "어린이자료실",
            "left": 6,
            "state": "open",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "p2",
            "time": "11:00",
            "title": "이달의 시인 낭독회",
            "place": "1층 로비",
            "left": 0,
            "state": "full",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "p3",
            "time": "13:30",
            "title": "스마트폰 사진 기초",
            "place": "3층 강의실",
            "left": 3,
            "state": "closing",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "p4",
            "time": "15:00",
            "title": "독서 모임 «여름의 끝»",
            "place": "4층 스터디룸 2",
            "left": 5,
            "state": "open",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "p5",
            "time": "16:30",
            "title": "청소년 진로 특강",
            "place": "다목적홀",
            "left": 22,
            "state": "open",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "p6",
            "time": "18:00",
            "title": "야간 개관 영화 상영",
            "place": "지하 시청각실",
            "left": 40,
            "state": "open",
            "updatedAt": "2026-11-02T04:10:00Z"
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      },
      "/desk/hourly": {
        "value": [
          {
            "hour": "9시",
            "pct": 22
          },
          {
            "hour": "10시",
            "pct": 41
          },
          {
            "hour": "11시",
            "pct": 58
          },
          {
            "hour": "12시",
            "pct": 49
          },
          {
            "hour": "13시",
            "pct": 63
          },
          {
            "hour": "14시",
            "pct": 71
          },
          {
            "hour": "15시",
            "pct": 77
          },
          {
            "hour": "16시",
            "pct": 68
          },
          {
            "hour": "17시",
            "pct": 55
          },
          {
            "hour": "18시",
            "pct": 38
          },
          {
            "hour": "19시",
            "pct": 24
          },
          {
            "hour": "20시",
            "pct": 12
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      }
    }
  }
};
