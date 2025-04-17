import { describe, it, expect, beforeEach } from 'vitest';

import { BindingKey, Context, inject, invokeMethod } from '../../src/index.js';
import createDebugger from '../../src/utils/debug.js';

const debug = createDebugger('contexify:test');

class InfoController {
  static sayHello(@inject('user') user: string): string {
    const msg = `Hello ${user}`;
    debug(msg);
    return msg;
  }

  hello(@inject('user', { optional: true }) user = 'Mary'): string {
    const msg = `Hello ${user}`;
    debug(msg);
    return msg;
  }

  greet(prefix: string, @inject('user') user: string): string {
    const msg = `[${prefix}] Hello ${user}`;
    debug(msg);
    return msg;
  }

  greetWithDefault(prefix = '***', @inject('user') user: string): string {
    const msg = `[${prefix}] Hello ${user}`;
    debug(msg);
    return msg;
  }
}

const INFO_CONTROLLER = BindingKey.create<InfoController>('controllers.info');

describe('Context bindings - Injecting dependencies of method', () => {
  let ctx: Context;
  beforeEach(() => {
    /* given a context */ createContext();
  });

  it('injects prototype method args', async () => {
    const instance = await ctx.get(INFO_CONTROLLER);
    // Invoke the `hello` method => Hello John
    const msg = await invokeMethod(instance, 'hello', ctx);
    expect(msg).toEqual('Hello John');
  });

  it('injects optional prototype method args', async () => {
    ctx = new Context();
    ctx.bind(INFO_CONTROLLER).toClass(InfoController);
    const instance = await ctx.get(INFO_CONTROLLER);
    // Invoke the `hello` method => Hello Mary
    const msg = await invokeMethod(instance, 'hello', ctx);
    expect(msg).toEqual('Hello Mary');
  });

  it('injects prototype method args with non-injected ones', async () => {
    const instance = await ctx.get(INFO_CONTROLLER);
    // Invoke the `hello` method => Hello John
    const msg = await invokeMethod(instance, 'greet', ctx, ['INFO']);
    expect(msg).toEqual('[INFO] Hello John');
  });

  it('injects prototype method args with non-injected ones with default', async () => {
    const instance = await ctx.get(INFO_CONTROLLER);
    // Invoke the `hello` method => Hello John
    const msg = await invokeMethod(instance, 'greetWithDefault', ctx, ['INFO']);
    expect(msg).toEqual('[INFO] Hello John');
  });

  it('injects static method args', async () => {
    // Invoke the `sayHello` method => Hello John
    const msg = await invokeMethod(InfoController, 'sayHello', ctx);
    expect(msg).toEqual('Hello John');
  });

  it('throws error if not all args can be resolved', async () => {
    const instance = await ctx.get(INFO_CONTROLLER);
    expect(() => {
      invokeMethod(instance, 'greet', ctx);
    }).toThrow(
      /The argument 'InfoController\.prototype\.greet\[0\]' is not decorated for dependency injection/
    );
    expect(() => {
      invokeMethod(instance, 'greet', ctx);
    }).toThrow(
      /but no value was supplied by the caller\. Did you forget to apply @inject\(\) to the argument\?/
    );
  });

  function createContext() {
    ctx = new Context();
    ctx.bind('user').toDynamicValue(() => Promise.resolve('John'));
    ctx.bind(INFO_CONTROLLER).toClass(InfoController);
  }
});
