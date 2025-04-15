import {config, Context} from 'contexify';

/**
 * Configuration for greeters
 */
type GreeterConfig = {
  prefix?: string;
  includeDate?: boolean;
};

/**
 * A greeter service
 */
class Greeter {
  constructor(
    /**
     * Inject configuration for this bound instance
     */
    @config() private settings: GreeterConfig = {},
  ) {}

  greet(name: string) {
    const prefix = this.settings.prefix ? `${this.settings.prefix}` : '';
    const date = this.settings.includeDate
      ? `[${new Date().toISOString()}]`
      : '';
    return `${date} ${prefix}: Hello, ${name}`;
  }
}

export async function main() {
  const ctx = new Context();

  // Configure `greeter` with `{prefix: '>>>', includeDate: true}`
  ctx
    .configure<GreeterConfig>('greeter')
    .to({prefix: '>>>', includeDate: true});
  ctx.bind('greeter').toClass(Greeter);

  const greeter = await ctx.get<Greeter>('greeter');
  console.log(greeter.greet('Ray'));
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./configuration-injection.js')) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
