---
sidebar_position: 1
---

# 入门指南

欢迎使用 **Contexify**，这是一个强大的 TypeScript 依赖注入容器，提供基于上下文的 IoC 功能。

## 安装

使用您喜欢的包管理器安装 Contexify：

```bash
# Using npm
npm install contexify

# Using yarn
yarn add contexify

# Using pnpm
pnpm add contexify
```

## 基本用法

以下是一个简单的示例，展示了 Contexify 的基本用法：

```typescript
import { Context, injectable, inject } from 'contexify';

// Create a context
const context = new Context('application');

// Define a service
@injectable()
class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Define a service that depends on logger
@injectable()
class UserService {
  constructor(@inject('services.LoggerService') private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Bind services to the context
context.bind('services.LoggerService').toClass(LoggerService);
context.bind('services.UserService').toClass(UserService);

// Use the services
async function run() {
  // Resolve UserService from the context
  const userService = await context.get<UserService>('services.UserService');

  // Create a user
  const user = userService.createUser('John Doe');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## 核心概念

### Context（上下文）

Context 是 Contexify 的核心，它作为依赖的注册表，允许您管理应用程序中的所有依赖项。

```typescript
// Create a root context
const rootContext = new Context('root');

// Create a child context
const childContext = new Context(rootContext, 'child');
```

### Binding（绑定）

绑定将键连接到值、类或工厂函数。

```typescript
// Bind a value
context.bind('config.port').to(3000);

// Bind a class
context.bind('services.UserService').toClass(UserService);

// Bind a factory function
context.bind('services.DbConnection').toDynamicValue(() => {
  return createDbConnection();
});
```

### 依赖注入

Contextify 支持使用 `@inject` 装饰器进行构造函数注入。

```typescript
@injectable()
class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService,
    @inject('config.apiKey') private apiKey: string
  ) {}

  async getUser(id: string) {
    // Use injected dependencies
    return this.userService.findById(id);
  }
}
```

## 下一步

现在您已经了解了 Contexify 的基础知识，可以探索更多高级功能：

- [核心概念](./category/core-concepts) - 了解 Contexify 的基本概念
- [API 参考](./api) - 查看详细的 API 文档
- [示例](./category/examples) - 查看 Contexify 在实际应用中的示例
