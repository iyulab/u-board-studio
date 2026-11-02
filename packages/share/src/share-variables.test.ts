import { describe, it, expect } from 'vitest';
import { variablesInAddress, variablesQuery } from './share-variables.js';

describe('the values an address asks the board’s variables for', () => {
  it('reads the keys that start with v. and leaves the board and the token alone', () => {
    expect(variablesInAddress('?board=b1&token=tok&v.line=L2&v.pump=P7')).toEqual({ line: 'L2', pump: 'P7' });
    expect(variablesInAddress('?board=b1&token=tok')).toEqual({});
    expect(variablesInAddress('')).toEqual({});
  });

  it('takes the first value of a name that repeats, and leaves out a name that is not a word, a long value, and names past the cap', () => {
    expect(variablesInAddress('?v.line=L1&v.line=L2')).toEqual({ line: 'L1' });
    expect(variablesInAddress('?v.=x&v.a%20b=x&v.line%5B%5D=x')).toEqual({});
    expect(variablesInAddress(`?v.line=${'L'.repeat(201)}`)).toEqual({});
    const many = Array.from({ length: 40 }, (_, i) => `v.n${i}=x`).join('&');
    expect(Object.keys(variablesInAddress(`?${many}`))).toHaveLength(32);
  });

  it('writes the same values as the query a board read carries — nothing at all when none were asked', () => {
    expect(variablesQuery({})).toBe('');
    expect(variablesQuery({ line: 'L2', pump: 'P 7' })).toBe('?v.line=L2&v.pump=P+7');
    expect(variablesInAddress(variablesQuery({ line: 'L2', pump: 'P 7' }))).toEqual({ line: 'L2', pump: 'P 7' });
  });
});
