import { Context, inject, injectable } from 'contexify';

/**
 * This example demonstrates the usage of Context to manage plugins.
 */

// Define a plugin interface
interface Plugin {
  name: string;
  initialize(): void;
}

// Define some plugin implementations
@injectable()
class LoggingPlugin implements Plugin {
  name = 'logging';

  initialize() {
    console.log('Logging plugin initialized');
  }
}

@injectable()
class AuthPlugin implements Plugin {
  name = 'auth';

  initialize() {
    console.log('Auth plugin initialized');
  }
}

@injectable()
class CachePlugin implements Plugin {
  name = 'cache';

  initialize() {
    console.log('Cache plugin initialized');
  }
}

// Define a plugin manager
@injectable()
class PluginManager {
  private initializedPlugins: string[] = [];

  constructor(@inject('plugins') private plugins: Plugin[]) {}

  async initializePlugins() {
    console.log(`Found ${this.plugins.length} plugins`);

    // Initialize all plugins
    this.plugins.forEach((plugin) => {
      plugin.initialize();
      this.initializedPlugins.push(plugin.name);
    });

    return this.initializedPlugins;
  }
}

export async function contextViewExample() {
  // Create a context
  const context = new Context('example');

  // Create plugin instances
  const loggingPlugin = new LoggingPlugin();
  const authPlugin = new AuthPlugin();
  const cachePlugin = new CachePlugin();

  // Bind plugins as an array
  context.bind('plugins').to([loggingPlugin, authPlugin, cachePlugin]);

  // Bind the plugin manager
  context.bind('managers.PluginManager').toClass(PluginManager);

  // Resolve the plugin manager
  const pluginManager = await context.get<PluginManager>(
    'managers.PluginManager'
  );

  // Initialize plugins
  const initializedPlugins = await pluginManager.initializePlugins();
  console.log('Initialized plugins:', initializedPlugins);

  return {
    initializedPlugins,
  };
}

// Run the example if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  contextViewExample().catch(console.error);
}
