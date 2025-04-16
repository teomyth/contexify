---
sidebar_position: 1
---

# 基本示例

本示例展示了 Contexify 的基本用法，包括创建上下文、绑定服务和使用依赖注入。

## 完整示例

```typescript
import { Context, injectable, inject } from 'contexify';

// Define interfaces
interface Logger {
  log(message: string): void;
}

interface UserService {
  createUser(name: string): Promise<User>;
}

interface User {
  id: string;
  name: string;
}

// Implement services
@injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

@injectable()
class DefaultUserService implements UserService {
  constructor(@inject('services.Logger') private logger: Logger) {}

  async createUser(name: string): Promise<User> {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Create a context
const context = new Context('application');

// Bind services
context.bind('services.Logger').toClass(ConsoleLogger);
context.bind('services.UserService').toClass(DefaultUserService);

// Use services
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const user = await userService.createUser('John Doe');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## 逐步解释

### 1. 定义接口

首先，我们定义了服务的接口：

```typescript
interface Logger {
  log(message: string): void;
}

interface UserService {
  createUser(name: string): Promise<User>;
}

interface User {
  id: string;
  name: string;
}
```

定义接口有助于实现松耦合和更好的可测试性。

### 2. 实现服务

接下来，我们实现了服务：

```typescript
@injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

@injectable()
class DefaultUserService implements UserService {
  constructor(@inject('services.Logger') private logger: Logger) {}

  async createUser(name: string): Promise<User> {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}
```

注意：
- `@injectable()` 装饰器标记类为可注入
- `@inject('services.Logger')` 装饰器注入 Logger 服务

### 3. 创建上下文

然后，我们创建一个上下文：

```typescript
const context = new Context('application');
```

### 4. 绑定服务

我们将服务绑定到上下文：

```typescript
context.bind('services.Logger').toClass(ConsoleLogger);
context.bind('services.UserService').toClass(DefaultUserService);
```

### 5. 使用服务

最后，我们从上下文中获取服务并使用它：

```typescript
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const user = await userService.createUser('John Doe');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## 关键点

- **依赖注入**：`UserService` 通过构造函数注入依赖于 `Logger`
- **控制反转**：服务的创建和生命周期由 Context 管理
- **松耦合**：服务通过接口而不是具体实现进行交互

## 下一步

查看更多高级示例：

- [模块化应用程序](./modular-app)
- [拦截器](./interceptors)
- [观察者和事件](./observers)
