import { afterEach, describe, expect, it, vi } from 'vitest';
import { snapshotClock } from './index.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('the clock of a recording', () => {
  it('says the moment it was recorded when the page opens, and moves on as the page stays open', () => {
    vi.useFakeTimers({ now: new Date('2026-11-01T09:00:00Z') });
    const clock = snapshotClock('2026-10-31T07:01:11Z');
    expect(clock()).toBe(Date.parse('2026-10-31T07:01:11Z'));
    vi.advanceTimersByTime(90_000);
    expect(clock()).toBe(Date.parse('2026-10-31T07:01:11Z') + 90_000);
  });

  it('is the machine’s clock when the recording has no readable time', () => {
    vi.useFakeTimers({ now: new Date('2026-11-01T09:00:00Z') });
    expect(snapshotClock('not a time')()).toBe(Date.parse('2026-11-01T09:00:00Z'));
  });
});
