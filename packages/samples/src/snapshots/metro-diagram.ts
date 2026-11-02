// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-02T09:10:00Z",
  "responses": {
    "metro": {
      "/metro/now": {
        "network": "한결 도시철도",
        "time": "저녁 퇴근 시간",
        "updatedAt": "2026-11-02T09:10:00Z"
      },
      "/metro/stations": {
        "value": [
          {
            "id": "r1",
            "name": "북벌",
            "x": 110,
            "y": 420,
            "state": "ok",
            "note": "다음 열차 3분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "r2",
            "name": "새솔",
            "x": 300,
            "y": 420,
            "state": "ok",
            "note": "다음 열차 4분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "r3",
            "name": "달빛",
            "x": 490,
            "y": 420,
            "state": "crowded",
            "note": "승강장 혼잡",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "hub",
            "name": "한결중앙",
            "x": 720,
            "y": 420,
            "state": "crowded",
            "note": "두 노선 환승",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "v"
          },
          {
            "id": "r5",
            "name": "푸른",
            "x": 950,
            "y": 420,
            "state": "ok",
            "note": "다음 열차 5분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "r6",
            "name": "하늬",
            "x": 1140,
            "y": 420,
            "state": "ok",
            "note": "다음 열차 6분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "r7",
            "name": "바다",
            "x": 1310,
            "y": 420,
            "state": "closed",
            "note": "야간 공사",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "h"
          },
          {
            "id": "b1",
            "name": "높새",
            "x": 720,
            "y": 150,
            "state": "ok",
            "note": "다음 열차 4분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "v"
          },
          {
            "id": "b2",
            "name": "솔내",
            "x": 720,
            "y": 285,
            "state": "ok",
            "note": "다음 열차 3분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "v"
          },
          {
            "id": "b4",
            "name": "여울",
            "x": 720,
            "y": 555,
            "state": "ok",
            "note": "다음 열차 3분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "v"
          },
          {
            "id": "b5",
            "name": "물빛",
            "x": 720,
            "y": 690,
            "state": "ok",
            "note": "다음 열차 5분",
            "updatedAt": "2026-11-02T09:10:00Z",
            "dir": "v"
          }
        ],
        "updatedAt": "2026-11-02T09:10:00Z"
      },
      "/metro/segments": {
        "value": [
          {
            "id": "r1-r2",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "r2-r3",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "r3-hub",
            "state": "slow",
            "words": "서행 — 신호 점검",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "hub-r5",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "r5-r6",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "r6-r7",
            "state": "closed",
            "words": "운행 중지",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "b1-b2",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "b2-hub",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "hub-b4",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          },
          {
            "id": "b4-b5",
            "state": "ok",
            "words": "정상",
            "updatedAt": "2026-11-02T09:10:00Z"
          }
        ],
        "updatedAt": "2026-11-02T09:10:00Z"
      }
    }
  }
};
