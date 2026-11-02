// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-02T04:10:10.000Z",
  "responses": {
    "registry": {
      "/status/now": {
        "name": "릴레이 클라우드",
        "date": "11월 2일 월요일 · 13:10 KST",
        "updatedAt": "2026-11-02T04:10:00Z"
      },
      "/status/services": {
        "value": [
          {
            "id": "s1",
            "name": "API 게이트웨이",
            "tag": "API 게이트웨이 · 서울",
            "region": "서울",
            "state": "operational",
            "p95": 84,
            "uptime": 99.99,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s2",
            "name": "인증",
            "tag": "인증 · 서울",
            "region": "서울",
            "state": "operational",
            "p95": 61,
            "uptime": 99.98,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s3",
            "name": "결제",
            "tag": "결제 · 서울",
            "region": "서울",
            "state": "degraded",
            "p95": 410,
            "uptime": 99.71,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s4",
            "name": "알림",
            "tag": "알림 · 도쿄",
            "region": "도쿄",
            "state": "operational",
            "p95": 120,
            "uptime": 99.95,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s5",
            "name": "검색",
            "tag": "검색 · 도쿄",
            "region": "도쿄",
            "state": "operational",
            "p95": 96,
            "uptime": 99.93,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s6",
            "name": "파일 저장소",
            "tag": "파일 저장소 · 서울",
            "region": "서울",
            "state": "maintenance",
            "p95": 0,
            "uptime": 99.9,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s7",
            "name": "웹 훅",
            "tag": "웹 훅 · 싱가포르",
            "region": "싱가포르",
            "state": "degraded",
            "p95": 380,
            "uptime": 99.82,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s8",
            "name": "대시보드",
            "tag": "대시보드 · 서울",
            "region": "서울",
            "state": "operational",
            "p95": 140,
            "uptime": 99.97,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s9",
            "name": "메시지 큐",
            "tag": "메시지 큐 · 도쿄",
            "region": "도쿄",
            "state": "outage",
            "p95": 0,
            "uptime": 99.34,
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "s10",
            "name": "로그 수집",
            "tag": "로그 수집 · 싱가포르",
            "region": "싱가포르",
            "state": "operational",
            "p95": 77,
            "uptime": 99.96,
            "updatedAt": "2026-11-02T04:10:00Z"
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      }
    },
    "incidents": {
      "/incidents/open": {
        "value": [
          {
            "id": "i1",
            "at": "13:02",
            "title": "메시지 큐 연결 거부 — 도쿄 리전",
            "state": "investigating",
            "severity": "critical",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "i2",
            "at": "12:41",
            "title": "결제 승인 지연(p95 400ms 초과)",
            "state": "identified",
            "severity": "major",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "i3",
            "at": "12:20",
            "title": "웹 훅 재시도 폭증",
            "state": "identified",
            "severity": "minor",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "i4",
            "at": "11:05",
            "title": "파일 저장소 정기 점검(30분)",
            "state": "monitoring",
            "severity": "maintenance",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "i5",
            "at": "09:48",
            "title": "검색 색인 지연",
            "state": "resolved",
            "severity": "minor",
            "updatedAt": "2026-11-02T04:10:00Z"
          },
          {
            "id": "i6",
            "at": "08:15",
            "title": "알림 일부 누락",
            "state": "resolved",
            "severity": "minor",
            "updatedAt": "2026-11-02T04:10:00Z"
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      },
      "/incidents/errors": {
        "value": [
          {
            "hour": "02시",
            "rate": 0.2
          },
          {
            "hour": "03시",
            "rate": 0.1
          },
          {
            "hour": "04시",
            "rate": 0.2
          },
          {
            "hour": "05시",
            "rate": 0.3
          },
          {
            "hour": "06시",
            "rate": 0.2
          },
          {
            "hour": "07시",
            "rate": 0.4
          },
          {
            "hour": "08시",
            "rate": 0.9
          },
          {
            "hour": "09시",
            "rate": 0.6
          },
          {
            "hour": "10시",
            "rate": 0.3
          },
          {
            "hour": "11시",
            "rate": 0.5
          },
          {
            "hour": "12시",
            "rate": 1.8
          },
          {
            "hour": "13시",
            "rate": 2.6
          }
        ],
        "updatedAt": "2026-11-02T04:10:00Z"
      }
    }
  }
};
