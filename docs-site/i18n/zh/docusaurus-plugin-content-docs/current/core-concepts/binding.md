---
sidebar_position: 2
---

# 绑定
## Binding

## 什么是 Binding？

Binding 是 Context 中键和值之间的连接。它是 Contexify 中依赖注入系统的基本构建块。

绑定允许您：

- 在 Context 中注册值、类或工厂函数
- 控制依赖项的生命周期
- 为发现和分组标记绑定
- 配置依赖项的解析方式

## 绑定键

绑定键是用于在 Context 中查找值的唯一标识符。它们通常是遵循命名约定的字符串。

```typescript
import { Context } from 'contexify';

const context = new Context();

// Using a simple string as a binding key
context.bind('greeting').to('Hello, world!');

// Using a namespaced key (recommended)
context.bind('services.UserService').toClass(UserService);
```

### 命名约定

建议为绑定键使用一致的命名约定。以下是一些常见模式：

- `{namespace}.{name}`：使用命名空间和名称（例如，`services.UserService`）
- 为命名空间使用复数形式（例如，`services`、`repositories`、`controllers`）
- 对于配置，使用 `config.{component}`（例如，`config.api`）

## 绑定类型

Contexify 支持几种类型的绑定：

### 值绑定

将常量值绑定到键。

```typescript
// Bind a string
context.bind('greeting').to('Hello, world!');

// Bind a number
context.bind('config.port').to(3000);

// Bind an object
context.bind('config.database').to({
  host: 'localhost',
  port: 5432,
  username: 'admin'
});
```

### 类绑定

将类构造函数绑定到键。解析绑定时，将实例化该类。

```typescript
import { Context, injectable } from 'contexify';

@injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2'];
  }
}

const context = new Context();
context.bind('services.UserService').toClass(UserService);

// 稍后，解析时
const userService = await context.get('services.UserService');
console.log(userService.getUsers()); // ['user1', 'user2']
```

### 工厂函数绑定

绑定一个在解析绑定时创建值的工厂函数。

```typescript
context.bind('services.DbConnection').toDynamicValue(() => {
  // This function is called when the binding is resolved
  return createDbConnection();
});
```

### 提供者绑定

绑定一个在解析绑定时创建值的提供者类。

```typescript
import { Context, Provider, injectable } from 'contexify';

@injectable()
class DbConnectionProvider implements Provider<DbConnection> {
  constructor(@inject('config.database') private config: DbConfig) {}

  value() {
    // This method is called when the binding is resolved
    return createDbConnection(this.config);
  }
}

context.bind('services.DbConnection').toProvider(DbConnectionProvider);
```

## 绑定作用域

绑定作用域控制解析值的生命周期。

```typescript
import { Context, BindingScope } from 'contexify';

const context = new Context();

// Singleton: One instance for the entire application
context
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// 瞬态：每次解析时新实例
context
  .bind('services.RequestHandler')
  .toClass(RequestHandler)
  .inScope(BindingScope.TRANSIENT);

// Context: One instance per context
context
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

### 作用域指南

- **SINGLETON**：用于具有共享状态的服务（配置、数据库连接）
- **TRANSIENT**：用于每次使用时需要新实例的组件
- **CONTEXT**：用于在特定上下文中共享的组件

## 绑定标签

标签允许您对绑定进行分类和发现。

```typescript
import { Context } from 'contexify';

const context = new Context();

// Add tags to a binding
context
  .bind('controllers.UserController')
  .toClass(UserController)
  .tag('controller', 'rest');

// Find bindings by tag
async function findControllers() {
  const controllerBindings = await context.findByTag('controller');
  return controllerBindings;
}
```

## 绑定配置

您可以使用其他元数据配置绑定。

```typescript
import { Context } from 'contexify';

const context = new Context();

// Configure a binding
context
  .bind('services.EmailService')
  .toClass(EmailService)
  .tag('service')
  .inScope(BindingScope.SINGLETON)
  .configure(binding => {
    binding.description = 'Email service for sending notifications';
  });
```

## 创建和管理绑定

### 添加绑定

```typescript
import { Context, Binding } from 'contexify';

const context = new Context();

// Using the bind method
context.bind('greeting').to('Hello, world!');

// Creating a binding first and then adding it
const binding = Binding.create('services.UserService')
  .toClass(UserService)
  .tag('service');

context.add(binding);
```

### 移除绑定

```typescript
// Remove a binding
context.unbind('greeting');
```

### 检查绑定是否存在

```typescript
// Check if a binding exists
const exists = context.contains('greeting');
console.log(exists); // true or false
```

### 查找绑定

```typescript
// Find bindings by tag
const serviceBindings = await context.findByTag('service');

// Find bindings by key pattern
const userBindings = await context.find(/^services\.User/);
```

## 下一步

现在您已经了解了绑定，可以了解：

- [依赖注入](./dependency-injection) - 如何将依赖项注入到类中
- [Context](./context) - 绑定的容器
- [API 参考](../api) - 查看详细的 API 文档
