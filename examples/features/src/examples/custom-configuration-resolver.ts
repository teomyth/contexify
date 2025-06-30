import {
  type BindingAddress,
  type ConfigurationResolver,
  Context,
  ContextBindings,
  DefaultConfigurationResolver,
  inject,
  type ResolutionOptions,
  type ValueOrPromise,
} from 'contexify';

/**
 * A custom configuration resolver that looks up env variables first
 */
class EnvConfigResolver
  extends DefaultConfigurationResolver
  implements ConfigurationResolver
{
  constructor(@inject.context() public readonly context: Context) {
    super(context);
  }

  /**
   * Try to find a matching env variable (case insensitive)
   * @param key The binding key
   */
  private getFromEnvVars(key: string) {
    let val;
    let found;
    for (const k in process.env) {
      if (k.toUpperCase() === key.toUpperCase()) {
        val = process.env[k];
        found = k;
        break;
      }
    }
    if (val == null) return val;
    console.log(
      'Loading configuration for binding "%s" from env variable "%s"',
      key,
      found
    );
    try {
      return JSON.parse(val);
    } catch (err) {
      return val;
    }
  }

  getConfigAsValueOrPromise<ConfigValueType>(
    key: BindingAddress<unknown>,
    configPath?: string,
    resolutionOptions?: ResolutionOptions
  ): ValueOrPromise<ConfigValueType | undefined> {
    const val = this.getFromEnvVars(key.toString());
    if (val != null) return val;
    return super.getConfigAsValueOrPromise(key, configPath, resolutionOptions);
  }
}

export async function main() {
  const ctx = new Context();
  ctx.bind(ContextBindings.CONFIGURATION_RESOLVER).toClass(EnvConfigResolver);

  // Configure `foo` with `{bar: 'abc'}`
  // To override it with env var, use `foo='{"bar":"abc"}'`.
  ctx.configure('foo').to({ bar: 'abc' });

  const fooConfig = await ctx.getConfig('foo');
  console.log(fooConfig);

  ctx.configure('bar').to('xyz');
  const barConfig = ctx.getConfigSync('bar');
  console.log(barConfig);
}

// Run this example directly
if (
  import.meta.url === import.meta.resolve('./custom-configuration-resolver.js')
) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
