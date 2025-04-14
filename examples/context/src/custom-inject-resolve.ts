import {
  BindingKey,
  Context,
  inject,
  Injection,
  ResolutionSession,
  ResolverFunction,
} from 'contexify';

/**
 * Custom resolver function for bindings
 * @param ctx The current context
 * @param injection Metadata about the injection
 * @param session Current resolution session
 */
const resolve: ResolverFunction = (
  ctx: Context,
  injection: Readonly<Injection>,
  session: ResolutionSession,
) => {
  console.log('Context: %s Binding: %s', ctx.name, session.currentBinding!.key);
  const targetName = ResolutionSession.describeInjection(injection).targetName;
  console.log('Injection: %s', targetName);
  return injection.member === 'prefix' ? new Date().toISOString() : 'John';
};

/**
 * A class with dependency injection
 */
class Greeter {
  constructor(@inject('', {}, resolve) private name: string) {}

  @inject('', {}, resolve)
  prefix = '';

  hello() {
    return `[${this.prefix}] Hello, ${this.name}`;
  }
}

const GREETER = BindingKey.create<Greeter>('greeter');

export async function main() {
  const ctx = new Context('invocation-context');
  ctx.bind(GREETER).toClass(Greeter);
  const greeter = await ctx.get(GREETER);
  console.log(greeter.hello());
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./custom-inject-resolve.js')) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
