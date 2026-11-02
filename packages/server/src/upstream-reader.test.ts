import { describe, it, expect, vi } from 'vitest';
import type { ResolvedBinding } from '@iyulab/u-board/domain';

const reading: { current: ResolvedBinding & { meta?: unknown } } = { current: { value: 1, quality: 'live' } };
vi.mock('./db/connectors.js', () => ({ findConnector: async () => ({ id: 'c1' }) }));
vi.mock('./resolve-connector.js', () => ({ readSource: async () => reading.current }));

import { upstreamReader } from './upstream-reader.js';

const read = () => upstreamReader({ db: {} as never, secrets: {} as never }, {} as never, 'w1')('c1', {});

describe('what the public routes read through', () => {
  it('leaves out what went wrong in words, which is for whoever fixes the data source', async () => {
    reading.current = { value: undefined, quality: 'disconnected', reason: 'source', message: 'The key is not valid.' };
    expect(await read()).toEqual({ value: undefined, quality: 'disconnected', reason: 'source' });
  });

  it('leaves out what a reading says about its value (meta), whatever a source gives', async () => {
    reading.current = { value: 4, quality: 'live', observedAt: '2026-11-03T00:00:00.000Z', meta: { source: 'sensor 14' } };
    const served = await read();
    expect(served).toEqual({ value: 4, quality: 'live', observedAt: '2026-11-03T00:00:00.000Z' });
    expect(served).not.toHaveProperty('meta');
  });
});
