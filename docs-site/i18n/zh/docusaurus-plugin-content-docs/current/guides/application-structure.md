---
sidebar_position: 1
---

# 应用程序结构指南

本指南提供了使用 Contexify 构建应用程序结构的建议。

## 概述

结构良好的应用程序更易于维护、测试和扩展。Contexify 提供了创建模块化和灵活的应用程序结构的工具。

## 推荐的应用程序结构

以下是使用 Contexify 的典型应用程序的推荐结构：

```
src/
├── application.ts              # 主应用程序类
├── index.ts                    # 入口点
├── components/                 # 可重用组件
│   ├── authentication/         # 认证组件
│   │   ├── index.ts            # 组件导出
│   │   ├── keys.ts             # 绑定键
│   │   ├── types.ts            # 类型定义
│   │   ├── services/           # 服务
│   │   └── providers/          # 提供者
│   └── ...                     # 其他组件
├── controllers/                # 控制器
│   ├── index.ts                # 控制器导出
│   ├── user-controller.ts      # 用户控制器
│   └── ...                     # 其他控制器
├── models/                     # 领域模型
│   ├── index.ts                # 模型导出
│   ├── user.model.ts           # 用户模型
│   └── ...                     # 其他模型
├── repositories/               # 数据访问仓库
│   ├── index.ts                # 仓库导出
│   ├── user.repository.ts      # 用户仓库
│   └── ...                     # 其他仓库
├── services/                   # 业务逻辑服务
│   ├── index.ts                # 服务导出
│   ├── user.service.ts         # 用户服务
│   └── ...                     # 其他服务
└── config/                     # 配置
    ├── index.ts                # 配置导出
    ├── keys.ts                 # 绑定键
    └── types.ts                # 类型定义
```

## 应用程序类

应用程序类是应用程序的核心。它扩展了 `Context` 类，并作为应用程序的根上下文。

```typescript
import { Context, createBindingFromClass } from 'contexify';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserRepository } from './repositories';
import { AuthComponent } from './components/authentication';

export class MyApplication extends Context {
  constructor() {
    super('application');
    
    // Configure the application
    this.configure();
  }
  
  private configure() {
    // Register components
    this.component(new AuthComponent());
    
    // Register services
    this.bind('services.UserService').toClass(UserService);
    
    // Register repositories
    this.bind('repositories.UserRepository').toClass(UserRepository);
    
    // Register controllers
    this.bind('controllers.UserController').toClass(UserController);
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
    // Application startup logic
  }
  
  // Stop the application
  async stop() {
    console.log('Application stopping...');
    // Application cleanup logic
    this.close();
  }
}
```

## 组件

组件是可以在应用程序之间重用的相关绑定的集合。它们是组织代码和促进模块化的好方法。

```typescript
import { createBindingFromClass } from 'contexify';
import { AuthService } from './services';
import { TokenProvider } from './providers';

export class AuthComponent {
  bindings = [
    createBindingFromClass(AuthService),
    createBindingFromClass(TokenProvider),
  ];
}
```

## 控制器

控制器处理传入的请求并返回响应。它们通常依赖于服务来执行业务逻辑。

```typescript
import { injectable, inject } from 'contexify';
import { UserService } from '../services';
import { User } from '../models';

@injectable()
export class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService
  ) {}
  
  async getUser(id: string): Promise<User> {
    return this.userService.getUser(id);
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }
}
```

## 服务

服务包含应用程序的业务逻辑。它们通常依赖于仓库来访问数据。

```typescript
import { injectable, inject } from 'contexify';
import { UserRepository } from '../repositories';
import { User } from '../models';

@injectable()
export class UserService {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository
  ) {}
  
  async getUser(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    // Business logic
    return this.userRepo.create(userData);
  }
}
```

## 仓库

仓库处理数据访问。它们通常依赖于数据源来连接数据库。

```typescript
import { injectable, inject } from 'contexify';
import { DataSource } from '../config';
import { User } from '../models';

@injectable()
export class UserRepository {
  constructor(
    @inject('datasources.default') private dataSource: DataSource
  ) {}
  
  async findById(id: string): Promise<User> {
    // Data access logic
    return this.dataSource.findById('users', id);
  }
  
  async create(userData: Partial<User>): Promise<User> {
    // Data access logic
    return this.dataSource.create('users', userData);
  }
}
```

## 配置

配置存储在上下文中，可以被服务和其他组件访问。

```typescript
import { Context } from 'contexify';

// Configuration keys
export namespace ConfigKeys {
  export const DATABASE = 'config.database';
  export const SERVER = 'config.server';
}

// Configuration types
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ServerConfig {
  port: number;
  host: string;
}

// Configure the application
export function configureApplication(app: Context) {
  // Database configuration
  app.bind(ConfigKeys.DATABASE).to({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp',
  });
  
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
import { MyApplication } from './application';
import { configureApplication } from './config';

async function main() {
  // Create the application
  const app = new MyApplication();
  
  // Configure the application
  configureApplication(app);
  
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

## 最佳实践

- **关注点分离**：保持应用程序的不同部分分离（控制器、服务、仓库）
- **依赖注入**：使用依赖注入使代码更易于测试和维护
- **基于组件的架构**：将相关功能组织到组件中
- **配置管理**：使用上下文管理配置
- **绑定命名约定**：对绑定键使用一致的命名约定
- **错误处理**：在整个应用程序中实现适当的错误处理
- **生命周期管理**：正确管理应用程序及其组件的生命周期

## 下一步

现在您已经了解了如何构建应用程序，可以了解：

- [组件创建](./component-creation) - 如何创建可重用组件
- [测试](./testing) - 如何测试您的应用程序
- [核心概念](../category/core-concepts) - 了解 Contexify 的核心概念
