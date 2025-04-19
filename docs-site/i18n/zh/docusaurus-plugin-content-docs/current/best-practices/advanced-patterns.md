---
sidebar_position: 4
---

# 高级模式

本文档提供了使用 Contexify 的高级模式和最佳实践。

## 使用拦截器

拦截器允许您在方法调用前后执行代码：

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
export class UserService {
  @intercept(LogInterceptor)
  async createUser(userData: UserData) {
    // 创建用户的逻辑
  }
}
```

拦截器用例：

- 日志记录
- 性能监控
- 错误处理
- 事务管理
- 缓存

## 使用观察者模式

观察 Context 中的绑定变化：

```typescript
import { ContextObserver } from 'contexify';

export class ServiceRegistry implements ContextObserver {
  // 只关注带有 'service' 标签的绑定
  filter = (binding) => binding.tagMap.service != null;

  observe(event: string, binding: Binding) {
    if (event === 'bind') {
      console.log(`服务已注册: ${binding.key}`);
      // 处理新服务
    } else if (event === 'unbind') {
      console.log(`服务已注销: ${binding.key}`);
      // 清理服务
    }
  }
}

// 注册观察者
app.subscribe(new ServiceRegistry());
```

观察者用例：

- 动态服务发现和注册
- 监控绑定变化
- 实现插件系统

## 配置管理

使用 Context 的配置功能管理应用程序配置：

```typescript
// 注册配置
app.configure('services.EmailService').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});

// 在服务中使用配置
@injectable()
export class EmailService {
  constructor(@config() private config: EmailConfig) {}

  async sendEmail(options: EmailOptions) {
    // 通过 this.config 访问配置
  }
}
```

配置最佳实践：

- 使用 `configure()` 和 `@config()` 而不是硬编码配置键
- 为配置提供默认值
- 支持特定环境的配置覆盖

## 总结

使用 Context 作为应用程序核心的高级模式：

1. **使用拦截器**：添加横切关注点，如日志记录和错误处理
2. **实现观察者**：监控绑定变化并对其做出反应
3. **管理配置**：使用 Context 的配置功能实现灵活的配置
4. **使用标签**：为绑定添加标签，以便更容易发现和管理
5. **创建自定义提供者**：实现自定义提供者，用于复杂的依赖解析
