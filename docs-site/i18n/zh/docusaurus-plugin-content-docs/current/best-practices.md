---
sidebar_position: 4
---

# 最佳实践

本文档提供了在 Contexify 框架中使用 Context 系统的最佳实践，参考了 LoopBack 框架的设计概念和实践经验。

## Context 使用模式

使用 Context 时，有几种常见模式。以下是对这些模式的分析和推荐的最佳实践。

### 不推荐：全局 Context 对象

```typescript
// NOT recommended pattern
const globalContext = new Context();
globalContext.bind('service').toClass(MyService);

// Anywhere in the application
const service = globalContext.getSync('service');
service.doSomething();
```

**问题**：

- 创建全局状态，使测试和管理变得困难
- 隐藏依赖项，使代码更难理解和维护
- 无法轻松替换或模拟测试依赖项

### 不推荐：Context 作为参数

```typescript
// NOT recommended pattern
function doSomething(context: Context) {
  const service = context.getSync('service');
  service.doSomething();
}
```

**问题**：

- 仍然隐藏了实际的依赖项
- 使函数依赖于 Context API 而不是它实际需要的服务
- 难以测试，因为您需要创建和配置 Context

### 推荐：扩展 Context 创建特定领域的应用程序核心

```typescript
// Recommended pattern
export class MyApplication extends Context {
  constructor() {
    super('application');
    this.bind('service').toClass(MyService);
  }
}

// Using the application class
const app = new MyApplication();
app.start();
```

**好处**：

- 应用程序本身是一个 Context，提供清晰的架构边界
- 组件可以通过依赖注入获取其依赖项
- 易于测试，因为依赖项可以被模拟或替换
- 支持模块化设计和可扩展性

## 应用程序架构

### 应用程序类扩展 Context

创建一个扩展 Context 的应用程序类作为应用程序的核心：

```typescript
import { Context, injectable } from 'contexify';

export class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Register core services
    this.bind('logger').toClass(Logger);

    // Add components
    this.component(AuthComponent);
    this.component(ApiComponent);

    // You can perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  async start() {
    // Start the application
    console.log('Application starting...');
    // Startup logic...
  }

  async stop() {
    // Stop the application
    console.log('Application stopping...');
    // Cleanup logic...
    this.close(); // Close the Context
  }
}
```

### 组件和模块化设计

组件是用于扩展应用程序功能的相关绑定的集合：

```typescript
import { injectable, Binding } from 'contexify';

export interface Component {
  bindings?: Binding[];
  providers?: Constructor<Provider<unknown>>[];
}

@injectable()
export class AuthComponent implements Component {
  bindings = [
    createBindingFromClass(AuthService),
    createBindingFromClass(TokenService),
  ];
}
```

使用组件可以：

- 将相关功能组合在一起
- 促进模块化设计
- 支持可插拔架构
- 简化依赖项管理

### 生命周期管理

您的应用程序应该管理组件和服务的生命周期：

```typescript
export class MyApplication extends Context {
  // ...

  async start() {
    // Get all services that need initialization
    const initializers = await this.findByTag('initializer');

    // Initialize in order
    for (const initializer of initializers) {
      const service = await this.get(initializer.key);
      await service.initialize();
    }

    console.log('Application started');
  }

  async stop() {
    // Get all services that need cleanup
    const cleaners = await this.findByTag('cleaner');

    // Cleanup in order
    for (const cleaner of cleaners) {
      const service = await this.get(cleaner.key);
      await service.cleanup();
    }

    this.close();
    console.log('Application stopped');
  }
}
```

## 依赖注入最佳实践

### 使用装饰器进行依赖注入

建议使用装饰器进行依赖注入，而不是直接从 Context 检索依赖项：

```typescript
import { inject, injectable } from 'contexify';

@injectable()
export class UserController {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository,
    @inject('services.EmailService') private emailService: EmailService
  ) {}

  async createUser(userData: UserData) {
    const user = await this.userRepo.create(userData);
    await this.emailService.sendWelcomeEmail(user);
    return user;
  }
}
```

好处：

- 依赖项是明确和可见的
- 易于测试，因为依赖项可以被模拟
- 代码更清晰和可维护

### 绑定键命名约定

使用一致的命名约定来组织绑定键：

```typescript
// Services
app.bind('services.EmailService').toClass(EmailService);

// Repositories
app.bind('repositories.UserRepository').toClass(UserRepository);

// Controllers
app.bind('controllers.UserController').toClass(UserController);

// Configuration
app.bind('config.api').to({
  port: 3000,
  host: 'localhost',
});
```

推荐的命名模式：

- `{namespace}.{name}`：使用命名空间和名称
- 对命名空间使用复数形式（services、repositories、controllers）
- 对于配置，使用 `config.{component}`

### 作用域管理

根据组件的性质选择适当的作用域：

```typescript
import { BindingScope } from 'contexify';

// Singleton service
app
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// One instance per request
app
  .bind('controllers.RequestController')
  .toClass(RequestController)
  .inScope(BindingScope.TRANSIENT);

// Singleton in the current context
app
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

作用域指南：

- **SINGLETON**：用于具有共享状态的服务（配置、数据库连接）
- **TRANSIENT**：用于每次使用时需要新实例的组件
- **CONTEXT**：用于在特定上下文中共享的组件

## 高级模式

### 使用拦截器

拦截器允许您在方法调用前后执行代码：

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
export class UserService {
  @intercept(LogInterceptor)
  async createUser(userData: UserData) {
    // Logic to create a user
  }
}
```

拦截器用例：

- 日志记录
- 性能监控
- 错误处理
- 事务管理
- 缓存

### 使用观察者模式

观察 Context 中的绑定变化：

```typescript
import { ContextObserver } from 'contexify';

export class ServiceRegistry implements ContextObserver {
  // Only interested in bindings with 'service' tag
  filter = (binding) => binding.tagMap.service != null;

  observe(event: string, binding: Binding) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // Handle new service
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      // Cleanup service
    }
  }
}

// Register the observer
app.subscribe(new ServiceRegistry());
```

观察者用例：

- 动态服务发现和注册
- 监控绑定变化
- 实现插件系统

### 配置管理

使用 Context 的配置功能管理应用程序配置：

```typescript
// Register configuration
app.configure('services.EmailService').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});

// Use configuration in a service
@injectable()
export class EmailService {
  constructor(@config() private config: EmailConfig) {}

  async sendEmail(options: EmailOptions) {
    // Access configuration via this.config
  }
}
```

配置最佳实践：

- 使用 `configure()` 和 `@config()` 而不是硬编码配置键
- 为配置提供默认值
- 支持特定环境的配置覆盖

## 总结

使用 Context 作为应用程序核心的最佳实践：

1. **应用程序扩展 Context**：让您的应用程序类扩展 Context 以作为依赖注入容器
2. **使用组件实现模块化**：使用组件组织相关功能和绑定
3. **依赖注入优于直接访问**：使用 `@inject` 和其他装饰器注入依赖项
4. **一致的命名约定**：对绑定键使用一致的命名模式
5. **适当的作用域管理**：根据组件性质选择合适的绑定作用域
6. **利用高级功能**：使用拦截器、观察者和配置管理来增强您的应用程序

通过遵循这些最佳实践，您可以构建模块化、可测试和可维护的应用程序，利用 Contexify 框架的强大功能。
