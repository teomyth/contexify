---
sidebar_position: 3
---

# 依赖注入
## Dependency Injection

## 什么是依赖注入？

依赖注入（DI）是一种设计模式，允许您将依赖项注入到类中，而不是在类内部创建它们。这使您的代码更加模块化、可测试和可维护。

在 Contexify 中，依赖注入是通过 Context 系统和装饰器实现的。

## 依赖注入的好处

- **解耦**：类不需要知道如何创建其依赖项
- **可测试性**：依赖项可以轻松地为测试进行模拟
- **灵活性**：可以在不修改类的情况下更改依赖项
- **可重用性**：类可以与不同的依赖项重复使用

## 基本依赖注入

最常见的依赖注入形式是构造函数注入，其中依赖项通过构造函数提供。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserService {
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

在这个例子中：
- `@injectable()` 将类标记为可注入，允许 Contexify 创建它的实例
- `@inject('repositories.UserRepository')` 告诉 Contexify 注入具有键 'repositories.UserRepository' 的依赖项

## 注入装饰器

Contexify 提供了几个用于依赖注入的装饰器：

### @injectable()

将类标记为可注入，允许 Contexify 创建它的实例。

```typescript
import { injectable } from 'contexify';

@injectable()
class UserService {
  // ...
}
```

### @inject()

通过其绑定键注入依赖项。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService
  ) {}
}
```

### @inject.tag()

注入匹配特定标签的所有依赖项。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class PluginManager {
  constructor(
    @inject.tag('plugin') private plugins: Plugin[]
  ) {}
}
```

### @inject.getter()

注入一个可以稍后用于获取依赖项的函数。

```typescript
import { injectable, inject, Getter } from 'contexify';

@injectable()
class UserController {
  constructor(
    @inject.getter('services.UserService') private getUserService: Getter<UserService>
  ) {}

  async getUsers() {
    // Get the service when needed
    const userService = await this.getUserService();
    return userService.getUsers();
  }
}
```

### @inject.view()

注入一个跟踪匹配过滤器的绑定的 ContextView。

```typescript
import { injectable, inject, ContextView } from 'contexify';

@injectable()
class PluginManager {
  constructor(
    @inject.view(binding => binding.tagMap.plugin != null)
    private pluginsView: ContextView<Plugin>
  ) {}

  async getPlugins() {
    return this.pluginsView.values();
  }
}
```

### @config()

为当前绑定注入配置。

```typescript
import { injectable, config } from 'contexify';

@injectable()
class EmailService {
  constructor(
    @config() private config: EmailConfig = {}
  ) {}
}
```

## 属性注入

除了构造函数注入外，Contexify 还支持属性注入。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  @inject('services.UserService')
  private userService: UserService;

  async getUsers() {
    return this.userService.getUsers();
  }
}
```

## 方法注入

Contexify 还支持方法注入。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  async getUsers(
    @inject('services.UserService') userService: UserService
  ) {
    return userService.getUsers();
  }
}
```

## 可选依赖项

您可以将依赖项标记为可选，这意味着如果找不到它们，它们不会导致错误。

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserService {
  constructor(
    @inject('services.Logger', { optional: true }) private logger?: Logger
  ) {}

  async createUser(userData: UserData) {
    if (this.logger) {
      this.logger.log('Creating user');
    }
    // ...
  }
}
```

## 循环依赖

循环依赖发生在两个或多个类相互依赖时。Contexify 提供了使用 `@inject.getter()` 处理循环依赖的方法。

```typescript
import { injectable, inject, Getter } from 'contexify';

@injectable()
class ServiceA {
  constructor(
    @inject.getter('services.ServiceB') private getServiceB: Getter<ServiceB>
  ) {}

  async doSomething() {
    const serviceB = await this.getServiceB();
    return serviceB.doSomethingElse();
  }
}

@injectable()
class ServiceB {
  constructor(
    @inject.getter('services.ServiceA') private getServiceA: Getter<ServiceA>
  ) {}

  async doSomethingElse() {
    const serviceA = await this.getServiceA();
    return serviceA.doSomething();
  }
}
```

## 最佳实践

- 对必需的依赖项使用构造函数注入
- 对可选依赖项使用属性注入
- 对循环依赖使用 `@inject.getter()`
- 使用遵循一致命名约定的有意义的绑定键
- 保持类专注并具有单一责任
- 使用接口作为依赖项，使代码更可测试

## 下一步

现在您已经了解了依赖注入，可以了解：

- [Context](./context) - 依赖项的容器
- [Binding](./binding) - 如何注册依赖项
- [API 参考](../api) - 查看详细的 API 文档
