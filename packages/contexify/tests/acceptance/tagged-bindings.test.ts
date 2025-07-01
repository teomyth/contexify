import { beforeAll, describe, expect, it } from 'vitest';

import { type Binding, Context } from '../../src/index.js';

describe('Context bindings - Tagged bindings', () => {
  let ctx: Context;
  let binding: Binding;
  beforeAll(createContext); // given a context;
  beforeAll(createBinding);

  describe('tag', () => {
    describe('when the binding is tagged', () => {
      beforeAll(tagBinding);

      it('has a tag name', () => {
        expect(binding.tagNames).toContain('controller');
      });

      function tagBinding() {
        binding.tag('controller');
      }
    });

    describe('when the binding is tagged with multiple names', () => {
      beforeAll(tagBinding);

      it('has tags', () => {
        expect(binding.tagNames).toContain('controller');
        expect(binding.tagNames).toContain('rest');
      });

      function tagBinding() {
        binding.tag('controller', 'rest');
      }
    });

    describe('when the binding is tagged with name/value objects', () => {
      beforeAll(tagBinding);

      it('has tags', () => {
        expect(binding.tagNames).toContain('controller');
        expect(binding.tagNames).toContain('name');
        // In Vitest, we need to check individual properties instead of the whole object
        const tagMap = binding.tagMap;
        expect(tagMap.name).toBe('my-controller');
        expect(tagMap.controller).toBe('controller');
        // Original assertion that doesn't work in Vitest
        // expect(binding.tagMap).toContain({
        //   name: 'my-controller',
        //   controller: 'controller',
        // });
      });

      function tagBinding() {
        binding.tag({ name: 'my-controller' }, 'controller');
      }
    });
  });

  function createContext() {
    ctx = new Context();
  }
  function createBinding() {
    binding = ctx.bind('foo').to('bar');
  }
});
