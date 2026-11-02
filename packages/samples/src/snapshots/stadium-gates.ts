// Example data written for the board, not recorded from a source.
import type { SampleSnapshot } from '../sample-pack.js';

export const snapshot: SampleSnapshot = {
  "capturedAt": "2026-11-02T09:05:10.000Z",
  "responses": {
    "desk": {
      "/desk/match": {
        "home": "한강FC",
        "away": "파도SC",
        "kickoff": "19:30",
        "date": "11월 2일 월요일",
        "venue": "한강종합경기장",
        "capacity": 42400,
        "updatedAt": "2026-11-02T09:05:00Z"
      },
      "/desk/gates": {
        "value": [
          {
            "id": "g1",
            "code": "A",
            "name": "북문",
            "queue": 120,
            "open": 4,
            "lanes": 6,
            "wait": 4,
            "level": "smooth",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g2",
            "code": "B",
            "name": "북동문",
            "queue": 410,
            "open": 4,
            "lanes": 6,
            "wait": 12,
            "level": "busy",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g3",
            "code": "C",
            "name": "동문",
            "queue": 1260,
            "open": 5,
            "lanes": 8,
            "wait": 32,
            "level": "jam",
            "jam": true,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g4",
            "code": "D",
            "name": "남동문",
            "queue": 340,
            "open": 4,
            "lanes": 6,
            "wait": 10,
            "level": "busy",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g5",
            "code": "E",
            "name": "남문",
            "queue": 90,
            "open": 3,
            "lanes": 6,
            "wait": 4,
            "level": "smooth",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g6",
            "code": "F",
            "name": "서남문",
            "queue": 560,
            "open": 4,
            "lanes": 6,
            "wait": 18,
            "level": "busy",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g7",
            "code": "G",
            "name": "서문",
            "queue": 880,
            "open": 6,
            "lanes": 8,
            "wait": 19,
            "level": "busy",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "g8",
            "code": "H",
            "name": "북서문",
            "queue": 210,
            "open": 4,
            "lanes": 6,
            "wait": 6,
            "level": "smooth",
            "jam": false,
            "updatedAt": "2026-11-02T09:05:00Z"
          }
        ],
        "updatedAt": "2026-11-02T09:05:00Z"
      },
      "/desk/stands": {
        "value": [
          {
            "id": "s1",
            "name": "N1",
            "capacity": 3600,
            "seated": 2900,
            "pct": 81,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s2",
            "name": "N2",
            "capacity": 3600,
            "seated": 3050,
            "pct": 85,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s3",
            "name": "NE",
            "capacity": 3400,
            "seated": 3120,
            "pct": 92,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s4",
            "name": "E1",
            "capacity": 3600,
            "seated": 3490,
            "pct": 97,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s5",
            "name": "E2",
            "capacity": 3600,
            "seated": 3300,
            "pct": 92,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s6",
            "name": "SE",
            "capacity": 3400,
            "seated": 2210,
            "pct": 65,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s7",
            "name": "S1",
            "capacity": 3600,
            "seated": 2050,
            "pct": 57,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s8",
            "name": "S2",
            "capacity": 3600,
            "seated": 1740,
            "pct": 48,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s9",
            "name": "SW",
            "capacity": 3400,
            "seated": 2480,
            "pct": 73,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s10",
            "name": "W1",
            "capacity": 3600,
            "seated": 3010,
            "pct": 84,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s11",
            "name": "W2",
            "capacity": 3600,
            "seated": 3280,
            "pct": 91,
            "updatedAt": "2026-11-02T09:05:00Z"
          },
          {
            "id": "s12",
            "name": "NW",
            "capacity": 3400,
            "seated": 2330,
            "pct": 69,
            "updatedAt": "2026-11-02T09:05:00Z"
          }
        ],
        "updatedAt": "2026-11-02T09:05:00Z"
      }
    }
  }
};
