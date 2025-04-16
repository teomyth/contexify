---
sidebar_position: 2
---

# 组件创建指南

本指南提供了使用 Contexify 创建可重用组件的说明。

## 什么是组件？

组件是可以在应用程序之间重用的相关绑定的集合。组件是组织代码和促进模块化的好方法。

组件通常包括：

- 服务
- 提供者
- 绑定键
- 类型定义
- 配置

## 组件结构

以下是组件的推荐结构：

```
components/
└── my-component/
    ├── index.ts              # 组件导出
    ├── keys.ts               # 绑定键
    ├── types.ts              # 类型定义
    ├── services/             # 服务
    │   ├── index.ts          # 服务导出
    │   └── my-service.ts     # 服务实现
    ├── providers/            # 提供者
    │   ├── index.ts          # 提供者导出
    │   └── my-provider.ts    # 提供者实现
    └── config.ts             # 组件配置
```

## 创建组件

让我们创建一个简单的日志组件作为示例。

### 1. 定义绑定键

首先，为您的组件定义绑定键：

```typescript
// components/logger/keys.ts
export namespace LoggerBindings {
  export const COMPONENT = 'components.Logger';
  export const SERVICE = 'services.Logger';
  export const CONFIG = 'config.logger';
}
```

### 2. 定义类型

接下来，为您的组件定义类型：

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

### 3. 实现服务

现在，实现组件的服务：

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

### 4. 创建组件类

现在，创建组件类：

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

## 使用组件

现在您可以在应用程序中使用该组件：

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

## 带提供者的组件

提供者是一种特殊类型的绑定，可用于动态创建值。它们对于创建需要复杂初始化的依赖项很有用。

让我们向日志组件添加一个文件日志提供者：

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

现在，更新组件类以包含文件日志提供者：

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

## 带扩展点的组件

扩展点允许其他组件扩展您组件的功能。让我们向日志组件添加一个扩展点：

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

现在，其他组件可以扩展日志组件：

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

## 最佳实践

- **单一职责**：每个组件应该有一个单一的职责
- **清晰的接口**：为组件的服务定义清晰的接口
- **配置**：使组件可配置
- **扩展点**：为其他组件提供扩展点
- **文档**：记录组件的 API 和配置选项
- **测试**：为组件编写测试
- **版本控制**：为组件使用语义版本控制

## 下一步

现在您已经了解了如何创建组件，可以了解：

- [应用程序结构](./application-structure) - 如何构建应用程序
- [测试](./testing) - 如何测试组件
- [核心概念](../category/core-concepts) - 了解 Contexify 的核心概念
