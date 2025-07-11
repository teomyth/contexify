import { describe, expect, it } from 'vitest';

import {
  getDeepProperty,
  resolveList,
  resolveMap,
  resolveUntil,
  transformValueOrPromise,
} from '../../src/index.js';

describe('getDeepProperty', () => {
  it('gets the root value if path is empty', () => {
    const obj = { x: { y: 1 } };
    expect(getDeepProperty(obj, '')).toEqual(obj);
  });

  it('gets the root value with a name', () => {
    const obj = { x: { y: 1 } };
    expect(getDeepProperty(obj, 'x')).toEqual({ y: 1 });
  });

  it('gets the root value with a path', () => {
    const obj = { x: { y: 1 } };
    expect(getDeepProperty(obj, 'x.y')).toEqual(1);
  });

  it('returns undefined for non-existent path', () => {
    const obj = { x: { y: 1 } };
    expect(getDeepProperty(obj, 'x.z')).toBeUndefined();
  });

  it('allows undefined value', () => {
    expect(getDeepProperty(undefined, 'x.z')).toBeUndefined();
    expect(getDeepProperty(null, 'x.z')).toBeUndefined();
  });

  it('allows null value', () => {
    expect(getDeepProperty({ x: { z: null } }, 'x.z')).toBeNull();
    expect(getDeepProperty(null, '')).toBeNull();
  });

  it('allows boolean value', () => {
    expect(getDeepProperty(true, 'x.z')).toBeUndefined();
  });

  it('allows number value', () => {
    expect(getDeepProperty(1, 'x.z')).toBeUndefined();
    expect(getDeepProperty(Number.NaN, 'x.z')).toBeUndefined();
  });

  it('allows to get length string value', () => {
    expect(getDeepProperty('xyz', 'length')).toEqual(3);
  });

  it('allows to get length and items of an array by index', () => {
    const arr = ['x', 'y'];
    expect(getDeepProperty(arr, 'length')).toEqual(2);
    expect(getDeepProperty(arr, '0')).toEqual('x');
    expect(getDeepProperty(arr, '1')).toEqual('y');
  });

  it('allows to get items of a nested array by index', () => {
    const obj = { a: ['x', 'y'] };
    expect(getDeepProperty(obj, 'a.0')).toEqual('x');
    expect(getDeepProperty(obj, 'a.1')).toEqual('y');
  });

  it('allows to use parameter types', () => {
    const arr = ['x', 'y'];
    expect(getDeepProperty<number>(arr, 'length')).toEqual(2);
    expect(getDeepProperty<string>(arr, '0')).toEqual('x');
    expect(getDeepProperty<string, string[]>(arr, '1')).toEqual('y');
    expect(getDeepProperty<string>(arr, '1')).toEqual('y');
  });
});

describe('resolveList', () => {
  it('resolves an array of values', () => {
    const source = ['a', 'b'];
    const result = resolveList(source, (v) => v.toUpperCase());
    expect(result).toEqual(['A', 'B']);
  });

  it('resolves an array of promises', async () => {
    const source = ['a', 'b'];
    const result = await resolveList(source, (v) =>
      Promise.resolve(v.toUpperCase())
    );
    expect(result).toEqual(['A', 'B']);
  });

  it('resolves an array of promises or values', async () => {
    const source = ['a', 'b'];
    const result = await resolveList(source, (v) =>
      v === 'a' ? 'A' : Promise.resolve(v.toUpperCase())
    );
    expect(result).toEqual(['A', 'B']);
  });

  it('resolves an array of promises or values with index', async () => {
    const source = ['a', 'b'];
    const result = await resolveList(source, (v, i) =>
      v === 'a' ? 'A' + i : Promise.resolve(v.toUpperCase() + i)
    );
    expect(result).toEqual(['A0', 'B1']);
  });

  it('resolves an object of values with index and array', () => {
    const result = resolveList(['a', 'b'], (v, i, list) => {
      return v.toUpperCase() + i + list.length;
    });
    expect(result).toEqual(['A02', 'B12']);
  });
});

describe('resolveMap', () => {
  it('resolves an object of values', () => {
    const source = { a: 'x', b: 'y' };
    const result = resolveMap(source, (v) => v.toUpperCase());
    expect(result).toEqual({ a: 'X', b: 'Y' });
  });

  it('does not set a key with value undefined', () => {
    const source = { a: 'x', b: undefined };
    const result = resolveMap(source, (v) => v?.toUpperCase());
    expect(result).not.toHaveProperty('b');
    expect(result).toEqual({ a: 'X' });
  });

  it('resolves an object of promises', async () => {
    const source = { a: 'x', b: 'y' };
    const result = await resolveMap(source, (v) =>
      Promise.resolve(v.toUpperCase())
    );
    expect(result).toEqual({ a: 'X', b: 'Y' });
  });

  it('does not set a key with promise resolved to undefined', async () => {
    const source = { a: 'x', b: undefined };
    const result = await resolveMap(source, (v) =>
      Promise.resolve(v?.toUpperCase())
    );
    expect(result).not.toHaveProperty('b');
    expect(result).toEqual({ a: 'X' });
  });

  it('resolves an object of promises or values', async () => {
    const source = { a: 'x', b: 'y' };
    const result = await resolveMap(source, (v) =>
      v === 'x' ? 'X' : Promise.resolve(v.toUpperCase())
    );
    expect(result).toEqual({ a: 'X', b: 'Y' });
  });

  it('resolves an object of promises or values with key', async () => {
    const source = { a: 'x', b: 'y' };
    const result = await resolveMap(source, (v, p) =>
      v === 'x' ? 'X' + p : Promise.resolve(v.toUpperCase() + p)
    );
    expect(result).toEqual({ a: 'Xa', b: 'Yb' });
  });

  it('resolves an object of values with key and object', () => {
    const result = resolveMap({ a: 'x', b: 'y' }, (v, p, map) => {
      return v.toUpperCase() + p + Object.keys(map).length;
    });
    expect(result).toEqual({ a: 'Xa2', b: 'Yb2' });
  });
});

describe('resolveUntil', () => {
  it('resolves an iterator of values', () => {
    const source = ['a', 'b', 'c'];
    const result = resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => v.toUpperCase(),
      (s, v) => s === 'a'
    );
    expect(result).toEqual('A');
  });

  it('resolves an iterator of values until the end', () => {
    const source = ['a', 'b', 'c'];
    const result = resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => v.toUpperCase(),
      (s, v) => false
    );
    expect(result).toBeUndefined();
  });

  it('resolves an iterator of promises', async () => {
    const source = ['a', 'b', 'c'];
    const result = await resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => Promise.resolve(v.toUpperCase()),
      (s, v) => true
    );
    expect(result).toEqual('A');
  });

  it('handles a rejected promise from resolver', async () => {
    const source = ['a', 'b', 'c'];
    const result = resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => Promise.reject(new Error(v)),
      (s, v) => true
    );
    await expect(result).rejects.toThrow('a');
  });

  it('reports an error thrown from resolver', () => {
    const source = ['a', 'b', 'c'];
    const task = () =>
      resolveUntil<string, string>(
        source[Symbol.iterator](),
        (v) => {
          throw new Error(v);
        },
        (s, v) => true
      );
    expect(task).toThrow('a');
  });

  it('handles a rejected promise from evaluator', async () => {
    const source = ['a', 'b', 'c'];
    const result = resolveUntil<string, string>(
      source[Symbol.iterator](),
      async (v) => v.toUpperCase(),
      (s, v) => {
        throw new Error(v);
      }
    );
    await expect(result).rejects.toThrow('A');
  });

  it('handles mixed value and promise items ', async () => {
    const source = ['b', 'C', 'B', 'c', 'a', 'A'];

    const result = await resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => {
        const up = v.toUpperCase();
        if (up === v) return up;
        // Produces a value for upper case
        return Promise.resolve(up); // Produces a promise for lower case
      },
      (s, v) => s === 'a'
    );
    expect(result).toEqual('A');
  });

  it('does not cause stack overflow for large # of value items', () => {
    // Create a large array of 1000 items
    const source = new Array<string>(1000);
    // Fill 0-949 with 'b'
    source.fill('b', 0, 950);
    // Fill 950-999 with 'a'
    source.fill('a', 950);
    const result = resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => v.toUpperCase(),
      (s, v) => s === 'a'
    );
    expect(result).toEqual('A');
  });

  it('does not cause stack overflow for large # of promise items', async () => {
    // Create a large array of 1000 items
    const source = new Array<string>(1000);
    // Fill 0-949 with 'b'
    source.fill('b', 0, 950);
    // Fill 950-999 with 'a'
    source.fill('a', 950);
    const result = await resolveUntil<string, string>(
      source[Symbol.iterator](),
      (v) => Promise.resolve(v.toUpperCase()),
      (s, v) => s === 'a'
    );
    expect(result).toEqual('A');
  });
});

describe('transformValueOrPromise', () => {
  it('transforms a value', () => {
    const result = transformValueOrPromise('a', (v) => v?.toUpperCase());
    expect(result).toEqual('A');
  });

  it('transforms a promise', async () => {
    const result = await transformValueOrPromise(Promise.resolve('a'), (v) =>
      v?.toUpperCase()
    );
    expect(result).toEqual('A');
  });

  it('transforms a value to promise', async () => {
    const result = await transformValueOrPromise('a', (v) =>
      Promise.resolve(v?.toUpperCase())
    );
    expect(result).toEqual('A');
  });

  it('handles a rejected promise from the transformer', async () => {
    const result = transformValueOrPromise('a', (v) =>
      Promise.reject(new Error(v))
    );
    await expect(result).rejects.toThrow('a');
  });

  it('handles an error thrown from the transformer', () => {
    expect(() =>
      transformValueOrPromise('a', (v) => {
        throw new Error(v);
      })
    ).toThrow('a');
  });
});
