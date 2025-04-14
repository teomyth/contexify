
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {Binding, Context} from '../../src/index.js';

describe(`Context bindings - Unlocking bindings`, () => {
  describe('Unlocking a locked binding', () => {
    let ctx: Context;
    let binding: Binding;
    beforeAll(createContext); // given a context;
    beforeAll(createLockedBinding); // and a bound key `foo` that is locked;

    describe('when the binding', () => {
      describe('is unlocked', () => {
        beforeAll(unlockBinding);

        it("sets it's lock state to false", () => {
          expect(binding.isLocked).toBe(false);
        });

        function unlockBinding() {
          binding.unlock();
        }
      });
    });

    describe('when the context', () => {
      describe('rebinds the duplicate key with an unlocked binding', () => {
        it('does not throw a rebinding error', () => {
          const operation = () => ctx.bind('foo').to('baz');
          expect(operation).to.not.throw();
        });

        it('binds the duplicate key to the new value', async () => {
          const result = await ctx.get('foo');
          expect(result).toBe('baz');
        });
      });
    });

    function createContext() {
      ctx = new Context();
    }
    function createLockedBinding() {
      binding = ctx.bind('foo').to('bar');
      binding.lock();
    }
  });
});
