import { once } from 'events';
import { promisify } from 'util';

import { beforeEach, describe, expect, it } from 'vitest';

import {
  type Binding,
  Context,
  type ContextEventType,
  type ContextObserver,
  filterByTag,
} from '../../src/index.js';

const setImmediateAsync = promisify(setImmediate);

/**
 * Create a subclass of context so that we can access parents and registry
 * for assertions
 */
class TestContext extends Context {
  get parentEventListener() {
    return this.subscriptionManager.parentContextEventListener;
  }

  /**
   * Wait until the context event queue is empty or an error is thrown
   */
  waitUntilObserversNotified(): Promise<void> {
    return this.subscriptionManager.waitUntilPendingNotificationsDone(100);
  }
}

describe('Context', () => {
  let ctx: TestContext;
  beforeEach(() => {
    /* given a context */ createContext();
  });

  describe('observer subscription', () => {
    let nonMatchingObserver: ContextObserver;

    beforeEach(givenNonMatchingObserver);

    it('subscribes observers', () => {
      ctx.subscribe(nonMatchingObserver);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(true);
    });

    it('unsubscribes observers', () => {
      ctx.subscribe(nonMatchingObserver);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(true);
      ctx.unsubscribe(nonMatchingObserver);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(false);
    });

    it('allows subscription.unsubscribe()', () => {
      const subscription = ctx.subscribe(nonMatchingObserver);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(true);
      subscription.unsubscribe();
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(false);
      expect(subscription.closed).toBe(true);
    });

    it('registers observers on context with parent', () => {
      const childCtx = new TestContext(ctx, 'child');
      expect(childCtx.parentEventListener).toBeUndefined();
      childCtx.subscribe(nonMatchingObserver);
      expect(typeof childCtx.parentEventListener).toBe('function');
      expect(childCtx.isSubscribed(nonMatchingObserver)).toBe(true);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(false);
    });

    it('un-registers observers on context chain', () => {
      const childCtx = new Context(ctx, 'child');
      childCtx.subscribe(nonMatchingObserver);
      expect(childCtx.isSubscribed(nonMatchingObserver)).toBe(true);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(false);
      childCtx.unsubscribe(nonMatchingObserver);
      expect(childCtx.isSubscribed(nonMatchingObserver)).toBe(false);
      expect(ctx.isSubscribed(nonMatchingObserver)).toBe(false);
    });

    it('un-registers observers on context chain during close', () => {
      const childCtx = new TestContext(ctx, 'child');
      childCtx.subscribe(nonMatchingObserver);
      childCtx.close();
      expect(childCtx.parentEventListener).toBeUndefined();
      expect(childCtx.isSubscribed(nonMatchingObserver)).toBe(false);
    });

    function givenNonMatchingObserver() {
      nonMatchingObserver = {
        filter: (binding) => false,
        observe: () => {},
      };
    }
  });

  describe('event notification', () => {
    const events: string[] = [];
    let nonMatchingObserverCalled = false;

    beforeEach(givenObservers);

    it('emits one bind event toMatching observers', async () => {
      ctx.bind('foo').to('foo-value');
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
      ]);
      expect(nonMatchingObserverCalled).toBe(false);
    });

    it('emits multiple bind events toMatching observers', async () => {
      ctx.bind('foo').to('foo-value');
      ctx.bind('xyz').to('xyz-value');
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
        'SYNC:xyz:xyz-value:bind',
        'ASYNC:xyz:xyz-value:bind',
      ]);
    });

    it('emits unbind event toMatching observers', async () => {
      ctx.bind('foo').to('foo-value');
      await ctx.waitUntilObserversNotified();
      ctx.unbind('foo');
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
        'SYNC:foo:foo-value:unbind',
        'ASYNC:foo:foo-value:unbind',
      ]);
      expect(nonMatchingObserverCalled).toBe(false);
    });

    it('emits bind/unbind events for rebind toMatching observers', async () => {
      ctx.bind('foo').to('foo-value');
      await ctx.waitUntilObserversNotified();
      ctx.bind('foo').to('new-foo-value');
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
        'SYNC:foo:foo-value:unbind',
        'ASYNC:foo:foo-value:unbind',
        'SYNC:foo:new-foo-value:bind',
        'ASYNC:foo:new-foo-value:bind',
      ]);
      expect(nonMatchingObserverCalled).toBe(false);
    });

    it('does not trigger observers if affected binding is the same', async () => {
      const binding = ctx.bind('foo').to('foo-value');
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
      ]);
      ctx.add(binding);
      await ctx.waitUntilObserversNotified();
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
      ]);
    });

    it('reports error if an observer fails', () => {
      ctx.bind('bar').to('bar-value');
      return expect(ctx.waitUntilObserversNotified()).rejects.toThrow(
        'something wrong - async'
      );
    });

    it('does not trigger observers registered after an event', async () => {
      ctx.bind('foo').to('foo-value');
      process.nextTick(() => {
        // Register a new observer after 1st event
        ctx.subscribe((event, binding, context) => {
          const val = binding.getValue(context);
          events.push(`LATE:${binding.key}:${val}:${event}`);
        });
      });

      await ctx.waitUntilObserversNotified();
      // The late observer is not triggered
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
      ]);
      // Emit another event
      ctx.bind('xyz').to('xyz-value');
      await ctx.waitUntilObserversNotified();
      // Now the late observer is triggered
      expect(events).toEqual([
        'SYNC:foo:foo-value:bind',
        'ASYNC:foo:foo-value:bind',
        'SYNC:xyz:xyz-value:bind',
        'ASYNC:xyz:xyz-value:bind',
        'LATE:xyz:xyz-value:bind',
      ]);
    });

    function givenObservers() {
      nonMatchingObserverCalled = false;
      events.splice(0, events.length);
      // An observer does not match the criteria
      const nonMatchingObserver: ContextObserver = {
        filter: (binding) => false,
        observe: () => {
          nonMatchingObserverCalled = true;
        },
      };
      // A sync observer matches the criteria
      const matchingObserver: ContextObserver = {
        observe: (event, binding, context) => {
          // Make sure the binding is configured with value
          // when the observer is notified
          const val = binding.getValue(context);
          events.push(`SYNC:${binding.key}:${val}:${event}`);
        },
      };
      // An async observer matches the criteria
      const matchingAsyncObserver: ContextObserver = {
        filter: (binding) => true,
        observe: async (event, binding, context) => {
          await setImmediateAsync();
          const val = binding.getValue(context);
          events.push(`ASYNC:${binding.key}:${val}:${event}`);
        },
      };
      // An async observer matches the criteria that throws an error
      const matchingAsyncObserverWithError: ContextObserver = {
        filter: (binding) => binding.key === 'bar',
        observe: async () => {
          await setImmediateAsync();
          throw new Error('something wrong - async');
        },
      };
      ctx.subscribe(nonMatchingObserver);
      ctx.subscribe(matchingObserver);
      ctx.subscribe(matchingAsyncObserver);
      ctx.subscribe(matchingAsyncObserverWithError);
    }
  });

  describe('event notification for context chain', () => {
    let app: Context;
    let server: Context;

    let contextObserver: MyObserverForControllers;
    beforeEach(givenControllerObserver);

    it('receives notifications of matching binding events', async () => {
      const controllers = await getControllers();
      // We have server: 1, app: 2
      // NOTE: The controllers are not guaranteed to be ['1', '2'] as the events
      // are emitted by two context objects and they are processed asynchronously
      expect(controllers).toContain('1@server');
      expect(controllers).toContain('2@app');
      server.unbind('controllers.1');
      // Now we have app: 2
      expect(await getControllers()).toEqual(['2@app']);
      app.unbind('controllers.2');
      // All controllers are gone from the context chain
      expect(await getControllers()).toEqual([]);
      // Add a new controller - server: 3
      givenController(server, '3');
      expect(await getControllers()).toEqual(['3@server']);
    });

    it('does not emit matching binding events from parent if shadowed', async () => {
      // We have server: 1, app: 2
      givenController(app, '1');
      // All controllers are gone from the context chain
      expect(await getControllers()).not.toContain('1@app');
    });

    it('reports error on current context if an observer fails', async () => {
      const err = new Error('something wrong - 1');
      server.subscribe((event, binding) => {
        if (binding.key === 'bar') {
          return Promise.reject(err);
        }
      });
      server.bind('bar').to('bar-value');
      // Please note the following code registers an `error` listener on `server`
      // so that error events are caught before it is reported as unhandled.
      const [obj] = await once(server, 'error');
      expect(obj).toBe(err);
    });

    it('reports error on the first context with error listeners on the chain', async () => {
      const err = new Error('something wrong - 2');
      server.subscribe((event, binding) => {
        if (binding.key === 'bar') {
          return Promise.reject(err);
        }
      });
      server.bind('bar').to('bar-value');
      // No error listener is registered on `server`
      const [obj] = await once(app, 'error');
      expect(obj).toBe(err);
    });

    class MyObserverForControllers implements ContextObserver {
      controllers: Set<string> = new Set();
      filter = filterByTag('controller');
      observe(
        event: ContextEventType,
        binding: Readonly<Binding<unknown>>,
        context: Context
      ) {
        const name = `${binding.tagMap.name}@${context.name}`;
        if (event === 'bind') {
          this.controllers.add(name);
        } else if (event === 'unbind') {
          this.controllers.delete(name);
        }
      }
    }

    function givenControllerObserver() {
      givenServerWithinAnApp();
      contextObserver = new MyObserverForControllers();
      server.subscribe(contextObserver);
      givenController(server, '1');
      givenController(app, '2');
    }

    function givenController(context: Context, controllerName: string) {
      class MyController {
        name = controllerName;
      }
      context
        .bind(`controllers.${controllerName}`)
        .toClass(MyController)
        .tag('controller', { name: controllerName });
    }

    async function getControllers() {
      return new Promise<string[]>((resolve) => {
        // Wrap it inside `setImmediate` to make the events are triggered
        setImmediate(() => resolve(Array.from(contextObserver.controllers)));
      });
    }

    function givenServerWithinAnApp() {
      app = new Context('app');
      server = new Context(app, 'server');
    }
  });

  function createContext() {
    ctx = new TestContext();
  }
});
