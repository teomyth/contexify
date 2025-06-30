import { describe, expect, it } from 'vitest';

import { isPromiseLike } from '../../src/index.js';

describe('isPromise', () => {
  it('returns false for undefined', () => {
    expect(isPromiseLike(undefined)).toBe(false);
  });

  it('returns false for a string value', () => {
    expect(isPromiseLike('string-value')).toBe(false);
  });

  it('returns false for a plain object', () => {
    expect(isPromiseLike({ foo: 'bar' })).toBe(false);
  });

  it('returns false for an array', () => {
    expect(isPromiseLike([1, 2, 3])).toBe(false);
  });

  it('returns false for a Date', () => {
    expect(isPromiseLike(new Date())).toBe(false);
  });

  it('returns true for a native Promise', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });

  it('returns true for a Promise-like object', () => {
    const promiseLike = {
      then: () => {},
    };
    expect(isPromiseLike(promiseLike)).toBe(true);
  });

  it('returns false when .then() is not a function', () => {
    expect(isPromiseLike({ then: 'later' })).toBe(false);
  });
});
