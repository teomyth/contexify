import {
  Binding,
  Context,
  createBindingFromClass,
  inject,
  injectable,
} from 'contexify';

/**
 * This example demonstrates how to create and use components in Contexify.
 * Components are collections of related bindings that can be reused across applications.
 */

// Define interfaces
interface Logger {
  log(message: string): void;
}

interface Component {
  bindings?: Binding[];
}

// Implement services
@injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

@injectable()
class FileLogger implements Logger {
  constructor(@inject('config.logFile') private logFile: string) {}

  log(message: string) {
    console.log(`[FILE:${this.logFile}] ${message}`);
  }
}

// Create a logging component
@injectable()
class LoggingComponent implements Component {
  constructor() {
    this.bindings = [
      // Bind the component itself
      Binding.create('components.Logging')
        .to(this)
        .tag('component'),

      // Bind the console logger
      createBindingFromClass(ConsoleLogger, {
        key: 'services.ConsoleLogger',
      }).tag('logger'),

      // Bind the file logger
      createBindingFromClass(FileLogger, {
        key: 'services.FileLogger',
      }).tag('logger'),
    ];
  }

  bindings: Binding[];
}

// Create an application class
class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Configure the application
    this.bind('config.logFile').to('app.log');

    // Add components
    this.component(new LoggingComponent());

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  // Add a component to the application
  component(component: Component) {
    if (component.bindings) {
      for (const binding of component.bindings) {
        this.add(binding);
      }
    }
    return this;
  }

  async start() {
    // Get all loggers
    const loggerBindings = await this.findByTag('logger');
    const loggers: Logger[] = [];

    for (const binding of loggerBindings) {
      const logger = await this.get<Logger>(binding.key);
      loggers.push(logger);
    }

    // Use all loggers
    for (const logger of loggers) {
      logger.log('Application started');
    }
  }
}

async function run() {
  // Create the application
  const app = new MyApplication();

  // Setup the application
  await app.setup();

  // Start the application
  await app.start();
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch((err) => console.error(err));
}
