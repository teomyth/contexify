import { beforeAll, describe, expect, it } from 'vitest';

import { type BoundValue, Context } from '../../src/index.js';

describe('Context bindings - Finding bindings', () => {
  let ctx: Context;

  describe('Finding all binding', () => {
    beforeAll(createContext); // given a context
    beforeAll(() => {
      // with two simple bindings
      createBinding('foo', 'bar');
      createBinding('baz', 'qux');
    });

    describe('when I find all bindings', () => {
      it('returns all bindings', () => {
        const bindings = ctx.find();
        const keys = bindings.map((binding) => {
          return binding.key;
        });
        expect(keys).toContain('foo');
        expect(keys).toContain('baz');
      });
    });
  });

  describe('Finding bindings by pattern', () => {
    beforeAll(createContext); // given a context
    beforeAll(() => {
      // with namespaced bindings
      createBinding('my.foo', 'bar');
      createBinding('my.baz', 'qux');
      createBinding('ur.quux', 'quuz');
    });

    describe('when I find all bindings using a pattern', () => {
      it('returns all bindings matching the pattern', () => {
        const bindings = ctx.find('my.*');
        const keys = bindings.map((binding) => binding.key);
        expect(keys).toContain('my.foo');
        expect(keys).toContain('my.baz');
        expect(keys).not.toContain('ur.quux');
      });
    });
  });

  describe('Finding bindings by tag', () => {
    beforeAll(createContext); // given a context
    beforeAll(createTaggedBindings); // with tagged bindings

    describe('when I find binding by tag', () => {
      it('returns all bindings matching the tag', () => {
        const bindings = ctx.findByTag('dog');
        const dogs = bindings.map((binding) => binding.key);
        expect(dogs).toContain('spot');
        expect(dogs).toContain('fido');
      });
    });

    function createTaggedBindings() {
      class Dog {}
      ctx.bind('spot').to(new Dog()).tag('dog');
      ctx.bind('fido').to(new Dog()).tag('dog');
    }
  });

  function createContext() {
    ctx = new Context();
  }
  function createBinding(key: string, value: BoundValue) {
    ctx.bind(key).to(value);
  }
});
