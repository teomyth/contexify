import { Context, inject } from 'contexify';

class Greeter {
  constructor(@inject('prefix') private prefix: string) {}
  greet(name: string) {
    return `[${this.prefix}] Hello, ${name}!`;
  }
}

export async function main() {
  const appCtx = new Context('app');

  // Create a context per request, with `appCtx` as the parent
  const requestCtx = new Context(appCtx, 'request');

  const greeterBinding = appCtx
    .bind('services.Greeter')
    .toClass(Greeter)
    .tag('greeter');

  // Set prefix to `app` at app context level
  appCtx.bind('prefix').to(appCtx.name);

  // Get a greeter from request context
  let greeter = await requestCtx.get<Greeter>(greeterBinding.key);

  // Inherit `prefix` from app context
  console.log(greeter.greet('John'));

  // Set `prefix` at request context level
  requestCtx.bind('prefix').to(requestCtx.name);
  greeter = await requestCtx.get<Greeter>(greeterBinding.key);
  // Now the request context prefix is used
  console.log(greeter.greet('John'));

  // Get a greeter from app context
  greeter = await appCtx.get<Greeter>(greeterBinding.key);
  // Now the app context prefix is used
  console.log(greeter.greet('John'));
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./context-chain.js')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
