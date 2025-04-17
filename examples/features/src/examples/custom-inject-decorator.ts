import { BindingKey, Context, inject } from 'contexify';

const CURRENT_USER = BindingKey.create<string>('currentUser');

/**
 * Create a decorator to inject the current user name
 */
function whoAmI() {
  return inject(CURRENT_USER);
}

/**
 * A class with dependency injection
 */
class Greeter {
  constructor(@whoAmI() private userName: string) {}

  hello() {
    return `Hello, ${this.userName}`;
  }
}

export async function main() {
  const ctx = new Context('invocation-context');
  ctx.bind(CURRENT_USER).to('John');
  ctx.bind('greeter').toClass(Greeter);
  const greeter = await ctx.get<Greeter>('greeter');
  console.log(greeter.hello());
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./custom-inject-decorator.js')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
