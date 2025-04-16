---
sidebar_position: 2
---

# Component Creation Guide

This guide provides instructions for creating reusable components with Contexify.

## What is a Component?

A component is a collection of related bindings that can be reused across applications. Components are a great way to organize your code and promote modularity.

Components typically include:

- Services
- Providers
- Binding keys
- Type definitions
- Configuration

## Component Structure

Here's a recommended structure for a component:

```
components/
└── my-component/
    ├── index.ts              # Component exports
    ├── keys.ts               # Binding keys
    ├── types.ts              # Type definitions
    ├── services/             # Services
    │   ├── index.ts          # Service exports
    │   └── my-service.ts     # Service implementation
    ├── providers/            # Providers
    │   ├── index.ts          # Provider exports
    │   └── my-provider.ts    # Provider implementation
    └── config.ts             # Component configuration
```

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

Now, create the component class:

```typescript
// components/logger/index.ts
import { createBindingFromClass, Binding } from 'contexify';
import { ConsoleLogger } from './services';
import { LoggerBindings } from './keys';
import { LoggerConfig } from './types';

export class LoggerComponent {
  bindings: Binding[] = [];

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

// Re-export everything
export * from './keys';
export * from './types';
export * from './services';
```

## Using the Component

Now you can use the component in your application:

```typescript
import { Context } from 'contexify';
import { LoggerComponent, LoggerBindings, Logger } from './components/logger';

// Create a context
const context = new Context('application');

// Add the logger component
const loggerComponent = new LoggerComponent({ level: 'debug', prefix: 'MyApp' });
for (const binding of loggerComponent.bindings) {
  context.add(binding);
}

// Use the logger
async function run() {
  const logger = await context.get<Logger>(LoggerBindings.SERVICE);
  
  logger.debug('This is a debug message');
  logger.info('This is an info message');
  logger.warn('This is a warning message');
  logger.error('This is an error message');
}

run().catch(err => console.error(err));
```

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

- **Single Responsibility**: Each component should have a single responsibility
- **Clear Interfaces**: Define clear interfaces for your component's services
- **Configuration**: Make your component configurable
- **Extension Points**: Provide extension points for other components
- **Documentation**: Document your component's API and configuration options
- **Testing**: Write tests for your component
- **Versioning**: Use semantic versioning for your component

## Next Steps

Now that you understand how to create components, you can learn about:

- [Application Structure](./application-structure) - How to structure your application
- [Testing](./testing) - How to test your components
- [Core Concepts](../category/core-concepts) - Learn about the core concepts of Contexify
