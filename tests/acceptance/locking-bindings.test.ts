
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {Binding, Context} from '../../src/index.js';

describe('Context bindings - Locking bindings', () => {
  describe('Binding with a duplicate key', () => {
    let ctx: Context;
    let binding: Binding;
    beforeAll(createContext); // given a context;
    beforeAll(createBinding); // and a bound key `foo`;

    describe('when the binding', () => {
      describe('is created', () => {
        it('is locked by default', () => {
          expect(binding.isLocked).toBe(false);
        });
      });

      describe('is locked', () => {
        beforeAll(lockBinding);

        it("sets it's lock state to true", () => {
          expect(binding.isLocked).toBe(true);
        });

        function lockBinding() {
          binding.lock();
        }
      });
    });

    describe('when the context', () => {
      describe('is binding to an existing key', () => {
        it('throws a rebind error', () => {
          const key = 'foo';
          const operation = () => ctx.bind('foo');
          expect(operation).toThrow(
            new RegExp(`Cannot rebind key "${key}" to a locked binding`),
          );
        });
      });
    });

    function createContext() {
      ctx = new Context();
    }
    function createBinding() {
      binding = ctx.bind('foo');
    }
  });
});
