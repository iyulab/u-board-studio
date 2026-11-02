// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-10-29T03:00:30.000Z",
  "responses": {
    "budget": {
      "/budget/now": {
        "city": "한결시",
        "year": 2026,
        "asOf": "10월 말",
        "executed": 17454,
        "rate": 71.8,
        "updatedAt": "2026-10-29T03:00:00Z"
      },
      "/budget/tree": {
        "value": [
          {
            "name": "복지",
            "value": 9800,
            "children": [
              {
                "name": "노인",
                "value": 3200
              },
              {
                "name": "아동·보육",
                "value": 3600
              },
              {
                "name": "장애인",
                "value": 1500
              },
              {
                "name": "기초생활",
                "value": 1500
              }
            ]
          },
          {
            "name": "교통",
            "value": 3900,
            "children": [
              {
                "name": "버스",
                "value": 1700
              },
              {
                "name": "도로",
                "value": 1400
              },
              {
                "name": "자전거·보행",
                "value": 800
              }
            ]
          },
          {
            "name": "교육·문화",
            "value": 3300,
            "children": [
              {
                "name": "학교 지원",
                "value": 1500
              },
              {
                "name": "도서관",
                "value": 900
              },
              {
                "name": "문화시설",
                "value": 900
              }
            ]
          },
          {
            "name": "환경",
            "value": 2700,
            "children": [
              {
                "name": "공원",
                "value": 1100
              },
              {
                "name": "자원순환",
                "value": 900
              },
              {
                "name": "하천",
                "value": 700
              }
            ]
          },
          {
            "name": "안전",
            "value": 2400,
            "children": [
              {
                "name": "소방",
                "value": 1100
              },
              {
                "name": "재난 대응",
                "value": 800
              },
              {
                "name": "CCTV",
                "value": 500
              }
            ]
          },
          {
            "name": "행정",
            "value": 2200,
            "children": [
              {
                "name": "예비비",
                "value": 900
              },
              {
                "name": "청사",
                "value": 700
              },
              {
                "name": "정보화",
                "value": 600
              }
            ]
          }
        ],
        "updatedAt": "2026-10-29T03:00:00Z"
      },
      "/budget/rates": {
        "value": [
          {
            "name": "복지",
            "rate": 78,
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "name": "교통",
            "rate": 64,
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "name": "교육·문화",
            "rate": 71,
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "name": "환경",
            "rate": 55,
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "name": "안전",
            "rate": 82,
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "name": "행정",
            "rate": 69,
            "updatedAt": "2026-10-29T03:00:00Z"
          }
        ],
        "updatedAt": "2026-10-29T03:00:00Z"
      },
      "/budget/projects": {
        "value": [
          {
            "id": "p-4",
            "what": "마을버스 야간 노선 신설",
            "where": "동부 · 서부 생활권",
            "cost": "18억",
            "state": "info",
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "id": "p-3",
            "what": "하천변 자전거길 이음",
            "where": "한결천 3.2 km",
            "cost": "42억",
            "state": "ok",
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "id": "p-2",
            "what": "초등학교 앞 보행 안전 구간",
            "where": "12개 학교",
            "cost": "27억",
            "state": "ok",
            "updatedAt": "2026-10-29T03:00:00Z"
          },
          {
            "id": "p-1",
            "what": "노후 공원 놀이시설 교체",
            "where": "9개 공원",
            "cost": "15억",
            "state": "warn",
            "updatedAt": "2026-10-29T03:00:00Z"
          }
        ],
        "updatedAt": "2026-10-29T03:00:00Z"
      }
    }
  }
};
