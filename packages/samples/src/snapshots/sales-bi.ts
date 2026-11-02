// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-01T00:00:00Z",
  "responses": {
    "sales": {
      "/sales/now": {
        "company": "한결 로스터스",
        "period": "11월 마감",
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/regions": {
        "value": [
          {
            "id": "서울",
            "name": "서울",
            "sales": 412,
            "target": 400,
            "rate": 103,
            "band": "ontrack",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "부산",
            "name": "부산",
            "sales": 168,
            "target": 180,
            "rate": 93,
            "band": "behind",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "대구",
            "name": "대구",
            "sales": 121,
            "target": 115,
            "rate": 105,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "인천",
            "name": "인천",
            "sales": 156,
            "target": 150,
            "rate": 104,
            "band": "ontrack",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "광주",
            "name": "광주",
            "sales": 78,
            "target": 90,
            "rate": 87,
            "band": "behind",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "대전",
            "name": "대전",
            "sales": 84,
            "target": 80,
            "rate": 105,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "울산",
            "name": "울산",
            "sales": 92,
            "target": 100,
            "rate": 92,
            "band": "behind",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "세종",
            "name": "세종",
            "sales": 36,
            "target": 30,
            "rate": 120,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "경기",
            "name": "경기",
            "sales": 520,
            "target": 480,
            "rate": 108,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "강원",
            "name": "강원",
            "sales": 54,
            "target": 70,
            "rate": 77,
            "band": "short",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "충북",
            "name": "충북",
            "sales": 70,
            "target": 66,
            "rate": 106,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "충남",
            "name": "충남",
            "sales": 98,
            "target": 95,
            "rate": 103,
            "band": "ontrack",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "전북",
            "name": "전북",
            "sales": 64,
            "target": 72,
            "rate": 89,
            "band": "behind",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "전남",
            "name": "전남",
            "sales": 59,
            "target": 70,
            "rate": 84,
            "band": "behind",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "경북",
            "name": "경북",
            "sales": 101,
            "target": 105,
            "rate": 96,
            "band": "ontrack",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "경남",
            "name": "경남",
            "sales": 133,
            "target": 140,
            "rate": 95,
            "band": "ontrack",
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "제주",
            "name": "제주",
            "sales": 47,
            "target": 44,
            "rate": 107,
            "band": "ahead",
            "updatedAt": "2026-11-01T00:00:00Z"
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/products": {
        "value": [
          {
            "id": "원두 세트",
            "name": "원두 세트",
            "sold": 18400,
            "change": 6.2,
            "history": [
              15940,
              16633,
              16286,
              17326,
              17326,
              18400
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "드립백",
            "name": "드립백",
            "sold": 24100,
            "change": 3.4,
            "history": [
              21443,
              22375,
              21909,
              23308,
              23308,
              24100
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "텀블러",
            "name": "텀블러",
            "sold": 5200,
            "change": -4.8,
            "history": [
              5025,
              5244,
              5134,
              5462,
              5462,
              5200
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "머그",
            "name": "머그",
            "sold": 3900,
            "change": -1.2,
            "history": [
              3632,
              3789,
              3711,
              3947,
              3947,
              3900
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "캡슐",
            "name": "캡슐",
            "sold": 31800,
            "change": 9.5,
            "history": [
              26718,
              27879,
              27299,
              29041,
              29041,
              31800
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "시럽",
            "name": "시럽",
            "sold": 7600,
            "change": 0.8,
            "history": [
              6937,
              7238,
              7087,
              7540,
              7540,
              7600
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "디저트 박스",
            "name": "디저트 박스",
            "sold": 4300,
            "change": 12.1,
            "history": [
              3529,
              3682,
              3606,
              3836,
              3836,
              4300
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "선물 세트",
            "name": "선물 세트",
            "sold": 9800,
            "change": 21.4,
            "history": [
              7427,
              7750,
              7588,
              8072,
              8072,
              9800
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "구독권",
            "name": "구독권",
            "sold": 6400,
            "change": 5,
            "history": [
              5608,
              5851,
              5730,
              6095,
              6095,
              6400
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "필터",
            "name": "필터",
            "sold": 8800,
            "change": -2.6,
            "history": [
              8312,
              8674,
              8493,
              9035,
              9035,
              8800
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "그라인더",
            "name": "그라인더",
            "sold": 1200,
            "change": -9.3,
            "history": [
              1217,
              1270,
              1244,
              1323,
              1323,
              1200
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "에이프런",
            "name": "에이프런",
            "sold": 900,
            "change": 1.9,
            "history": [
              813,
              848,
              830,
              883,
              883,
              900
            ],
            "updatedAt": "2026-11-01T00:00:00Z"
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/channels": {
        "value": [
          {
            "id": "온라인 몰",
            "name": "온라인 몰",
            "sales": 940,
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "오프라인 매장",
            "name": "오프라인 매장",
            "sales": 610,
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "도매",
            "name": "도매",
            "sales": 330,
            "updatedAt": "2026-11-01T00:00:00Z"
          },
          {
            "id": "구독",
            "name": "구독",
            "sales": 220,
            "updatedAt": "2026-11-01T00:00:00Z"
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/trend": {
        "value": [
          {
            "month": "12월",
            "sales": 1710
          },
          {
            "month": "1월",
            "sales": 1520
          },
          {
            "month": "2월",
            "sales": 1480
          },
          {
            "month": "3월",
            "sales": 1620
          },
          {
            "month": "4월",
            "sales": 1690
          },
          {
            "month": "5월",
            "sales": 1760
          },
          {
            "month": "6월",
            "sales": 1700
          },
          {
            "month": "7월",
            "sales": 1810
          },
          {
            "month": "8월",
            "sales": 1930
          },
          {
            "month": "9월",
            "sales": 1980
          },
          {
            "month": "10월",
            "sales": 2050
          },
          {
            "month": "11월",
            "sales": 2100
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/deals": {
        "value": [
          {
            "id": "d1",
            "client": "한빛 호텔 그룹",
            "owner": "정서윤",
            "stage": "계약 협의",
            "amount": "4.2억",
            "band": "ontrack"
          },
          {
            "id": "d2",
            "client": "새봄 프랜차이즈",
            "owner": "오지훈",
            "stage": "시음 평가",
            "amount": "3.1억",
            "band": "ontrack"
          },
          {
            "id": "d3",
            "client": "이음 마트",
            "owner": "문하린",
            "stage": "단가 조정",
            "amount": "2.6억",
            "band": "behind"
          },
          {
            "id": "d4",
            "client": "다온 항공 케이터링",
            "owner": "강도현",
            "stage": "계약 체결",
            "amount": "5.0억",
            "band": "ahead"
          },
          {
            "id": "d5",
            "client": "푸른 대학교",
            "owner": "윤채원",
            "stage": "입찰 대기",
            "amount": "1.8억",
            "band": "behind"
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      },
      "/sales/alerts": {
        "value": [
          {
            "id": "a1",
            "note": "광주 · 전남 · 전북 — 서남권 3곳이 목표의 90% 아래",
            "band": "short"
          },
          {
            "id": "a2",
            "note": "그라인더 판매가 지난달보다 9.3% 감소",
            "band": "behind"
          },
          {
            "id": "a3",
            "note": "선물 세트가 21% 늘어 재고가 사흘치",
            "band": "behind"
          },
          {
            "id": "a4",
            "note": "세종 · 서울 · 경기 — 목표를 넘김",
            "band": "ahead"
          }
        ],
        "updatedAt": "2026-11-01T00:00:00Z"
      }
    }
  }
};
