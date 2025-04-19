---
sidebar_position: 2
---

# Component Creation Guide

> **Note:** Component support is planned for the second phase of development and is not yet available in the current version of Contexify. This guide outlines the planned approach and will be updated when component support is implemented.

This guide provides instructions for creating reusable components with Contexify, following patterns inspired by LoopBack 4's component architecture.

## What is a Component?

A component is a collection of related bindings that can be reused across applications. Components are a great way to organize your code and promote modularity.

Components typically include:

- Services
- Providers
- Binding keys
- Type definitions
- Configuration

## Component Structure

Here's a recommended structure for a component, following LoopBack 4's component patterns:

```
src/
└── components/
    └── my-component/
        ├── index.ts              # Main entry point that exports the component class and public APIs
        ├── component.ts          # Component class definition
        ├── keys.ts               # Binding keys (constants)
        ├── types.ts              # Type definitions and interfaces
        ├── services/             # Services provided by the component
        │   ├── index.ts          # Service exports
        │   └── my-service.ts     # Service implementation
        ├── providers/            # Providers for creating values dynamically
        │   ├── index.ts          # Provider exports
        │   └── my-provider.ts    # Provider implementation
        └── decorators/           # Custom decorators (if any)
            ├── index.ts          # Decorator exports
            └── my-decorator.ts   # Decorator implementation
```

This structure follows the principle of organizing code by feature (component) rather than by type, making it easier to understand and maintain.

## Creating a Component

Let's create a simple logging component as an example.

### 1. Define Binding Keys

First, define the binding keys for your component:

```typescript
// components/logger/keys.ts
export namespace LoggerBindings {
  export const COMPONENT = 'components.Logger';
  export const SERVICE = 'services.Logger';
  export const CONFIG = 'config.logger';
}
```

### 2. Define Types

Next, define the types for your component:

```typescript
// components/logger/types.ts
export interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}
```

### 3. Implement Services

Now, implement the services for your component:

```typescript
// components/logger/services/console-logger.ts
import { injectable, config } from 'contexify';
import { Logger, LoggerConfig } from '../types';
import { LoggerBindings } from '../keys';

@injectable()
export class ConsoleLogger implements Logger {
  constructor(
    @config({
      fromBinding: LoggerBindings.COMPONENT,
      propertyPath: 'config',
    })
    private config: LoggerConfig = { level: 'info' }
  ) {}

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`${this.getPrefix()} ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`${this.getPrefix()} ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`${this.getPrefix()} ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`${this.getPrefix()} ${message}`, ...args);
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevelIndex = levels.indexOf(this.config.level);
    const logLevelIndex = levels.indexOf(level);
    return logLevelIndex >= configLevelIndex;
  }

  private getPrefix(): string {
    return this.config.prefix ? `[${this.config.prefix}]` : '';
  }
}

// components/logger/services/index.ts
export * from './console-logger';
```

### 4. Create Component Class

Now, create the component class following LoopBack 4's component pattern:

```typescript
// src/components/logger/component.ts
import { createBindingFromClass, Binding, injectable } from 'contexify';
import { ConsoleLogger } from './services';
import { LoggerBindings } from './keys';
import { LoggerConfig } from './types';

/**
 * Logger Component for providing logging capabilities
 */
@injectable({ tags: ['component'] })
export class LoggerComponent {
  /**
   * Bindings provided by this component
   */
  bindings: Binding[] = [];

  /**
   * Constructor for creating a LoggerComponent instance
   * @param config - Configuration for the logger
   */
  constructor(config: LoggerConfig = { level: 'info' }) {
    this.bindings = [
      // Bind the component itself
      Binding.create(LoggerBindings.COMPONENT)
        .to(this)
        .tag('component'),

      // Bind the logger service
      createBindingFromClass(ConsoleLogger, {
        key: LoggerBindings.SERVICE,
      }).tag('service'),

      // Bind the configuration
      Binding.create(LoggerBindings.CONFIG)
        .to(config)
        .tag('config'),
    ];
  }
}

// src/components/logger/index.ts
export * from './component';
export * from './keys';
export * from './types';
export * from './services';
```

This follows LoopBack 4's pattern of using the `@injectable` decorator with a 'component' tag and providing clear documentation for the component class and its methods.

## Using the Component

Once component support is implemented, you will be able to use the component in your application like this:

```typescript
import { Application } from 'contexify';
import { LoggerComponent, LoggerBindings, Logger } from './components/logger';

// Create an application
const app = new Application();

// Add the logger component with configuration
app.component(LoggerComponent, { level: 'debug', prefix: 'MyApp' });

// Use the logger in your application
async function run() {
  // Get the logger from the application context
  const logger = await app.get<Logger>(LoggerBindings.SERVICE);

  // Use the logger
  logger.debug('This is a debug message');
  logger.info('This is an info message');
  logger.warn('This is a warning message');
  logger.error('This is an error message');
}

run().catch(err => console.error(err));
```

This simplified approach follows LoopBack 4's pattern of using the `component()` method to register components with an application.

## Component with Providers

Providers are a special type of binding that can be used to create values dynamically. They are useful for creating dependencies that require complex initialization.

Let's add a file logger provider to our logger component:

```typescript
// components/logger/providers/file-logger.provider.ts
import { Provider, injectable, config } from 'contexify';
import { Logger, LoggerConfig } from '../types';
import { LoggerBindings } from '../keys';
import * as fs from 'fs';
import * as path from 'path';

export interface FileLoggerConfig extends LoggerConfig {
  file: string;
}

@injectable()
export class FileLoggerProvider implements Provider<Logger> {
  constructor(
    @config({
      fromBinding: LoggerBindings.COMPONENT,
      propertyPath: 'fileConfig',
    })
    private fileConfig: FileLoggerConfig
  ) {}

  value(): Logger {
    // Create the log directory if it doesn't exist
    const logDir = path.dirname(this.fileConfig.file);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    return {
      debug: (message: string, ...args: any[]) => {
        this.log('DEBUG', message, args);
      },
      info: (message: string, ...args: any[]) => {
        this.log('INFO', message, args);
      },
      warn: (message: string, ...args: any[]) => {
        this.log('WARN', message, args);
      },
      error: (message: string, ...args: any[]) => {
        this.log('ERROR', message, args);
      },
    };
  }

  private log(level: string, message: string, args: any[]): void {
    const timestamp = new Date().toISOString();
    const prefix = this.fileConfig.prefix ? `[${this.fileConfig.prefix}]` : '';
    const logMessage = `${timestamp} ${level} ${prefix} ${message} ${args.length ? JSON.stringify(args) : ''}`;

    fs.appendFileSync(this.fileConfig.file, logMessage + '\n');
  }
}

// components/logger/providers/index.ts
export * from './file-logger.provider';
```

Now, update the component class to include the file logger provider:

```typescript
// components/logger/index.ts
import { createBindingFromClass, Binding } from 'contexify';
import { ConsoleLogger } from './services';
import { FileLoggerProvider } from './providers';
import { LoggerBindings } from './keys';
import { LoggerConfig } from './types';
import { FileLoggerConfig } from './providers/file-logger.provider';

export class LoggerComponent {
  bindings: Binding[] = [];

  constructor(
    config: LoggerConfig = { level: 'info' },
    fileConfig?: FileLoggerConfig
  ) {
    this.bindings = [
      // Bind the component itself
      Binding.create(LoggerBindings.COMPONENT)
        .to({ config, fileConfig })
        .tag('component'),

      // Bind the console logger service
      createBindingFromClass(ConsoleLogger, {
        key: LoggerBindings.SERVICE,
      }).tag('service'),
    ];

    // Add the file logger provider if fileConfig is provided
    if (fileConfig) {
      this.bindings.push(
        Binding.create(LoggerBindings.SERVICE + '.file')
          .toProvider(FileLoggerProvider)
          .tag('service')
      );
    }
  }
}

// Re-export everything
export * from './keys';
export * from './types';
export * from './services';
export * from './providers';
```

## Component with Extension Points

Extension points allow other components to extend your component's functionality. Let's add an extension point to our logger component:

```typescript
// components/logger/keys.ts
export namespace LoggerBindings {
  export const COMPONENT = 'components.Logger';
  export const SERVICE = 'services.Logger';
  export const CONFIG = 'config.logger';
  export const EXTENSIONS = 'extensions.logger';
}

// components/logger/types.ts
export interface LoggerExtension {
  name: string;
  log(level: string, message: string, args: any[]): void;
}

// components/logger/services/console-logger.ts
import { injectable, config, inject } from 'contexify';
import { Logger, LoggerConfig, LoggerExtension } from '../types';
import { LoggerBindings } from '../keys';

@injectable()
export class ConsoleLogger implements Logger {
  constructor(
    @config({
      fromBinding: LoggerBindings.COMPONENT,
      propertyPath: 'config',
    })
    private config: LoggerConfig = { level: 'info' },

    @inject.tag(LoggerBindings.EXTENSIONS)
    private extensions: LoggerExtension[] = []
  ) {}

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`${this.getPrefix()} ${message}`, ...args);
      this.notifyExtensions('debug', message, args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`${this.getPrefix()} ${message}`, ...args);
      this.notifyExtensions('info', message, args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`${this.getPrefix()} ${message}`, ...args);
      this.notifyExtensions('warn', message, args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`${this.getPrefix()} ${message}`, ...args);
      this.notifyExtensions('error', message, args);
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevelIndex = levels.indexOf(this.config.level);
    const logLevelIndex = levels.indexOf(level);
    return logLevelIndex >= configLevelIndex;
  }

  private getPrefix(): string {
    return this.config.prefix ? `[${this.config.prefix}]` : '';
  }

  private notifyExtensions(level: string, message: string, args: any[]): void {
    for (const extension of this.extensions) {
      try {
        extension.log(level, message, args);
      } catch (error) {
        console.error(`Error in logger extension ${extension.name}:`, error);
      }
    }
  }
}
```

Now, other components can extend the logger component:

```typescript
// components/metrics/index.ts
import { Binding } from 'contexify';
import { LoggerBindings, LoggerExtension } from '../logger';

export class MetricsLoggerExtension implements LoggerExtension {
  name = 'metrics';

  log(level: string, message: string, args: any[]): void {
    // Track metrics for log events
    if (level === 'error') {
      // Increment error counter
      this.incrementErrorCounter();
    }
  }

  private incrementErrorCounter(): void {
    // Implementation details
  }
}

export class MetricsComponent {
  bindings: Binding[] = [
    Binding.create(`${LoggerBindings.EXTENSIONS}.metrics`)
      .to(new MetricsLoggerExtension())
      .tag(LoggerBindings.EXTENSIONS),
  ];
}
```

## Best Practices

Following LoopBack 4's component design principles, here are some best practices for creating components:

- **Single Responsibility**: Each component should have a single, well-defined responsibility
- **Clear Interfaces**: Define clear interfaces for your component's services and extension points
- **Configuration**: Make your component configurable with sensible defaults
- **Extension Points**: Provide well-documented extension points for other components
- **Documentation**: Document your component's API, configuration options, and usage examples
- **Testing**: Write comprehensive tests for your component, including unit and integration tests
- **Versioning**: Use semantic versioning for your component
- **Discoverability**: Use appropriate tags for bindings to make them discoverable
- **Naming Conventions**: Follow consistent naming conventions for binding keys
- **Dependency Declaration**: Clearly declare dependencies on other components
- **Lifecycle Management**: Properly handle component initialization and cleanup

> **Note:** Remember that component support is planned for the second phase of development. The current version of Contexify does not yet support components as described in this guide.

## Next Steps

Now that you understand how to create components, you can learn about:

- [Application Structure](./application-structure) - How to structure your application
- [Testing](./testing) - How to test your components
- [Core Concepts](../category/core-concepts) - Learn about the core concepts of Contexify
