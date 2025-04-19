---
sidebar_position: 3
---

# 依赖注入最佳实践

本文档提供了使用 Contexify 进行依赖注入的最佳实践。

## 使用装饰器进行依赖注入

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

## 绑定键命名约定

使用一致的命名约定来组织绑定键：

```typescript
// 服务
app.bind('services.EmailService').toClass(EmailService);

// 仓库
app.bind('repositories.UserRepository').toClass(UserRepository);

// 控制器
app.bind('controllers.UserController').toClass(UserController);

// 配置
app.bind('config.api').to({
  port: 3000,
  host: 'localhost',
});
```

推荐的命名模式：

- `{namespace}.{name}`：使用命名空间和名称
- 对命名空间使用复数形式（services、repositories、controllers）
- 对于配置，使用 `config.{component}`

## 作用域管理

根据组件的性质选择适当的作用域：

```typescript
import { BindingScope } from 'contexify';

// 单例服务
app
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// 每次请求一个实例
app
  .bind('controllers.RequestController')
  .toClass(RequestController)
  .inScope(BindingScope.TRANSIENT);

// 在当前上下文中的单例
app
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

作用域指南：

- **SINGLETON**：用于具有共享状态的服务（配置、数据库连接）
- **TRANSIENT**：用于每次使用时需要新实例的组件
- **CONTEXT**：用于在特定上下文中共享的组件
