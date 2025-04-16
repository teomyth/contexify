---
sidebar_position: 2
---

# 模块化应用程序示例

本示例演示如何使用 Contexify 构建模块化应用程序。

## 概述

模块化应用程序示例展示了如何：

- 构建模块化应用程序
- 创建和使用组件
- 管理组件之间的依赖关系
- 配置应用程序
- 处理应用程序生命周期

## 应用程序类

应用程序类是模块化应用程序的核心。它扩展了 `Context` 类，并作为应用程序的根上下文。

```typescript
// Application class
import { Context } from 'contexify';
import { AuthComponent } from './components/authentication';
import { ApiComponent } from './components/api';
import { ConfigKeys, configureApplication } from './config';

export class ModularApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Configure the application
    configureApplication(this);

    // Add components
    this.component(new AuthComponent());
    this.component(new ApiComponent());

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  // Add a component to the application
  component(component: { bindings?: any[] }) {
    if (component.bindings) {
      for (const binding of component.bindings) {
        this.add(binding);
      }
    }
    return this;
  }

  // Start the application
  async start() {
    console.log('Application starting...');

    // Get the server configuration
    const serverConfig = await this.get(ConfigKeys.SERVER);

    console.log(`Server listening on port ${serverConfig.port}`);
  }

  // Stop the application
  async stop() {
    console.log('Application stopping...');

    // Application cleanup logic
    this.close();
  }
}
```

## 认证组件

认证组件为应用程序提供认证服务。

```typescript
// Authentication component
import { createBindingFromClass, Binding } from 'contexify';
import { DefaultAuthService } from './services';
import { DefaultAuthProvider } from './providers';
import { AuthBindings } from './keys';

export class AuthComponent {
  bindings = [
    // Bind the component itself
    Binding.create(AuthBindings.COMPONENT)
      .to(this)
      .tag('component'),

    // Bind the auth service
    createBindingFromClass(DefaultAuthService, {
      key: AuthBindings.SERVICE,
    }).tag('service'),

    // Bind the auth provider
    createBindingFromClass(DefaultAuthProvider, {
      key: AuthBindings.PROVIDER,
    }).tag('provider'),
  ];
}
```

## API 组件

API 组件为应用程序的 API 提供控制器。

```typescript
// API component
import { createBindingFromClass, Binding } from 'contexify';
import { UserController } from './controllers';
import { ApiBindings } from './keys';

export class ApiComponent {
  bindings = [
    // Bind the component itself
    Binding.create(ApiBindings.COMPONENT)
      .to(this)
      .tag('component'),

    // Bind the user controller
    createBindingFromClass(UserController, {
      key: ApiBindings.CONTROLLER,
    }).tag('controller'),
  ];
}
```

## 配置

配置目录包含应用程序的配置。

```typescript
// Configuration
import { Context } from 'contexify';
import { ConfigKeys } from './keys';

export interface ServerConfig {
  port: number;
  host: string;
}

export function configureApplication(app: Context) {
  // Server configuration
  app.bind(ConfigKeys.SERVER).to({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
  });
}
```

## 入口点

应用程序的入口点创建并启动应用程序。

```typescript
// Entry point
import { ModularApplication } from './application';

async function main() {
  // Create the application
  const app = new ModularApplication();

  // Setup the application
  await app.setup();

  // Start the application
  await app.start();

  console.log('Application is running');

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await app.stop();
    process.exit(0);
  });
}

main().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
```

## 关键要点

- **模块化架构**：应用程序被组织成组件，每个组件都有自己的职责
- **依赖注入**：组件通过依赖注入相互依赖
- **配置**：应用程序通过上下文进行配置
- **生命周期管理**：应用程序管理其组件的生命周期

## 完整示例

完整的示例代码可以在 [examples/modular-app](https://github.com/teomyth/contexify/tree/main/examples/modular-app) 目录中找到。
