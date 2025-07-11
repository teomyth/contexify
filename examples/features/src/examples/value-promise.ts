import {
  Context,
  type ContextView,
  filterByTag,
  isPromiseLike,
  resolveList,
  resolveMap,
  transformValueOrPromise,
  type ValueOrPromise,
} from 'contexify';

/**
 * Interface for greeters
 */
interface Greeter {
  language: string;
  /**
   * Greet in the given language
   * @param name - Name
   * @returns A message or a promise of a message
   */
  greet(name: string): ValueOrPromise<string>;
}

class ChineseGreeter implements Greeter {
  language = 'zh';
  greet(name: string) {
    return `[value] 你好，${name}！`;
  }
}

class EnglishGreeter implements Greeter {
  language = 'en';
  greet(name: string) {
    return `[value] Hello, ${name}!`;
  }
}

class AsyncChineseGreeter implements Greeter {
  language = 'zh';
  /**
   * Async was of greeting
   * @param name - Name
   */
  greet(name: string): Promise<string> {
    return new Promise<string>((resolve) =>
      setImmediate(() => {
        resolve(`[promise] 你好，${name}！`);
      })
    );
  }
}

export async function main() {
  const ctx = new Context('app');

  // Add EnglishGreeter for now
  ctx.bind('greeters.EnglishGreeter').toClass(EnglishGreeter).tag('greeter');

  // Add ChineseGreeter
  ctx.bind('greeters.ChineseGreeter').toClass(ChineseGreeter).tag('greeter');

  // Find all greeters
  const greetersView = ctx.createView<Greeter>(filterByTag('greeter'));

  // Greet from all greeters
  await greetFromAll(greetersView);

  // Replace ChineseGreeter with AsyncChineseGreeter
  ctx
    .bind('greeters.ChineseGreeter')
    .toClass(AsyncChineseGreeter)
    .tag('greeter');

  // Greet from all greeters again
  await greetFromAll(greetersView);
}

/**
 * Invoke all greeters to print out greetings in all supported langauges
 * @param greetersView - A context view representing all greeters
 */
async function greetFromAll(greetersView: ContextView<Greeter>) {
  // Get all greeter instances
  const greeters = await greetersView.values();

  // Collect greetings as an array from all greeters
  const greetings = resolveList(greeters, (greeter) => {
    return greeter.greet('John');
  });

  // Check if the result is a Promise (async) or value (sync)
  if (isPromiseLike(greetings)) {
    console.log('async:', await greetings);
  } else {
    console.log('sync:', greetings);
  }

  // Collect greetings as a map keyed by language from al greeters
  const greeterMap: {
    [language: string]: Greeter;
  } = {};
  greeters.filter((greeter) => (greeterMap[greeter.language] = greeter));

  const greetingsByLanguage = resolveMap(greeterMap, (greeter) =>
    greeter.greet('Jane')
  );

  // Print out all map entries
  await transformValueOrPromise(greetingsByLanguage, console.log);
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./value-promise.js')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
