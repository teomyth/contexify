import { beforeEach, describe, expect, it } from 'vitest';

import {
  type AsyncProxy,
  BindingScope,
  Context,
  createProxyWithInterceptors,
  type Interceptor,
  inject,
  intercept,
  type Provider,
  ResolutionSession,
  type ValueOrPromise,
} from '../../src/index.js';

describe('Interception proxy', () => {
  let ctx: Context;

  beforeEach(givenContextAndEvents);

  it('invokes async interceptors on an async method', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }
    const proxy = createProxyWithInterceptors(new MyController(), ctx);
    const msg = await proxy.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: before-greet',
      'log: after-greet',
      'convertName: after-greet',
    ]);
  });

  it('creates a proxy that converts sync method to be async', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      greet(name: string) {
        return `Hello, ${name}`;
      }
    }
    const proxy = createProxyWithInterceptors(new MyController(), ctx);
    const msg = await proxy.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: before-greet',
      'log: after-greet',
      'convertName: after-greet',
    ]);

    // Make sure `greet` always return Promise now
    expect(proxy.greet('Jane')).toBeInstanceOf(Promise);
  });

  it('creates async methods for the proxy', async () => {
    class MyController {
      name: string;

      greet(name: string): string {
        return `Hello, ${name}`;
      }

      async hello(name: string) {
        return `Hello, ${name}`;
      }
    }

    interface ExpectedAsyncProxyForMyController {
      name: string;
      greet(name: string): ValueOrPromise<string>; // the return type becomes `Promise<string>`
      hello(name: string): Promise<string>; // the same as MyController
    }

    const proxy = createProxyWithInterceptors(new MyController(), ctx);
    const greeting = await proxy.greet('John');
    expect(greeting).toEqual('Hello, John');

    // Enforce compile time check to ensure the AsyncProxy typing works for TS

    const check: ExpectedAsyncProxyForMyController = proxy;
  });

  it('invokes interceptors on a static method', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // The class level `log` will be applied
      static greetStatic(name: string) {
        return `Hello, ${name}`;
      }
    }
    ctx.bind('name').to('John');
    const proxy = createProxyWithInterceptors(MyController, ctx);
    const msg = await proxy.greetStatic('John');
    expect(msg).toBe('Hello, John');
    expect(events).toEqual([
      'log: before-greetStatic',
      'log: after-greetStatic',
    ]);
  });

  it('accesses properties on the proxy', () => {
    class MyController {
      constructor(public prefix: string) {}

      greet() {
        return `${this.prefix}: Hello`;
      }
    }

    const proxy = createProxyWithInterceptors(new MyController('abc'), ctx);
    expect(proxy.prefix).toEqual('abc');
    proxy.prefix = 'xyz';
    expect(proxy.prefix).toEqual('xyz');
  });

  it('accesses static properties on the proxy', () => {
    class MyController {
      static count = 0;
    }

    const proxyForClass = createProxyWithInterceptors(MyController, ctx);
    expect(proxyForClass.count).toEqual(0);
    proxyForClass.count = 3;
    expect(proxyForClass.count).toEqual(3);
  });

  it('supports asProxyWithInterceptors resolution option', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }
    ctx.bind('my-controller').toClass(MyController);
    const proxy = await ctx.get<MyController>('my-controller', {
      asProxyWithInterceptors: true,
    });
    const msg = await proxy!.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: [my-controller] before-greet',
      'log: [my-controller] after-greet',
      'convertName: after-greet',
    ]);
  });

  it('supports asProxyWithInterceptors resolution option for singletons', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }
    ctx
      .bind('my-controller')
      .toClass(MyController)
      .inScope(BindingScope.SINGLETON);

    // Proxy version
    let proxy = await ctx.get<MyController>('my-controller', {
      asProxyWithInterceptors: true,
    });
    let msg = await proxy!.greet('John');
    expect(msg).toBe('Hello, JOHN');

    // Non proxy version
    const inst = await ctx.get<MyController>('my-controller');
    msg = await inst.greet('John');
    expect(msg).toBe('Hello, John');

    // Try the proxy again
    proxy = await ctx.get<MyController>('my-controller', {
      asProxyWithInterceptors: true,
    });
    msg = await proxy!.greet('John');
    expect(msg).toBe('Hello, JOHN');
  });

  it('supports asProxyWithInterceptors resolution option for dynamic value', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }

    ctx.bind('my-controller').toDynamicValue(() => new MyController());
    const proxy = await ctx.get<MyController>('my-controller', {
      asProxyWithInterceptors: true,
    });
    const msg = await proxy!.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: [my-controller] before-greet',
      'log: [my-controller] after-greet',
      'convertName: after-greet',
    ]);
  });

  it('supports asProxyWithInterceptors resolution option for provider', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }

    class MyControllerProvider implements Provider<MyController> {
      value() {
        return new MyController();
      }
    }

    ctx.bind('my-controller').toProvider(MyControllerProvider);
    const proxy = await ctx.get<MyController>('my-controller', {
      asProxyWithInterceptors: true,
    });
    const msg = await proxy!.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: [my-controller] before-greet',
      'log: [my-controller] after-greet',
      'convertName: after-greet',
    ]);
  });

  it('allows asProxyWithInterceptors for non-object value', async () => {
    ctx.bind('my-value').toDynamicValue(() => 'my-value');
    const value = await ctx.get<string>('my-value', {
      asProxyWithInterceptors: true,
    });
    expect(value).toEqual('my-value');
  });

  it('supports asProxyWithInterceptors resolution option for @inject', async () => {
    // Apply `log` to all methods on the class
    @intercept(log)
    class MyController {
      // Apply multiple interceptors. The order of `log` will be preserved as it
      // explicitly listed at method level
      @intercept(convertName, log)
      async greet(name: string) {
        return `Hello, ${name}`;
      }
    }

    class DummyController {
      constructor(
        @inject('my-controller', { asProxyWithInterceptors: true })
        public readonly myController: AsyncProxy<MyController>
      ) {}
    }
    ctx.bind('my-controller').toClass(MyController);
    ctx.bind('dummy-controller').toClass(DummyController);
    const dummyController = await ctx.get<DummyController>('dummy-controller');
    const msg = await dummyController.myController.greet('John');
    expect(msg).toBe('Hello, JOHN');
    expect(events).toEqual([
      'convertName: before-greet',
      'log: [dummy-controller --> my-controller] before-greet',
      'log: [dummy-controller --> my-controller] after-greet',
      'convertName: after-greet',
    ]);
  });

  let events: string[];

  const log: Interceptor = async (invocationCtx, next) => {
    let source: string;
    if (invocationCtx.source instanceof ResolutionSession) {
      source = `[${invocationCtx.source.getBindingPath()}] `;
    } else {
      source = invocationCtx.source ? `[${invocationCtx.source}] ` : '';
    }
    events.push(`log: ${source}before-${invocationCtx.methodName}`);
    const result = await next();
    events.push(`log: ${source}after-${invocationCtx.methodName}`);
    return result;
  };

  // An interceptor to convert the 1st arg to upper case
  const convertName: Interceptor = async (invocationCtx, next) => {
    events.push('convertName: before-' + invocationCtx.methodName);
    invocationCtx.args[0] = (invocationCtx.args[0] as string).toUpperCase();
    const result = await next();
    events.push('convertName: after-' + invocationCtx.methodName);
    return result;
  };

  function givenContextAndEvents() {
    ctx = new Context();
    events = [];
  }
});
