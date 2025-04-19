---
sidebar_position: 2
---

# 应用程序架构

本文档提供了使用 Contexify 构建应用程序的最佳实践。

## 应用程序类扩展 Context

创建一个扩展 Context 的应用程序类作为应用程序的核心：

```typescript
import { Context, injectable } from 'contexify';

export class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // 注册核心服务
    this.bind('logger').toClass(Logger);

    // 添加组件
    this.component(AuthComponent);
    this.component(ApiComponent);

    // 您可以在这里执行异步初始化
    // 例如，连接数据库、加载配置等
    await Promise.resolve(); // 实际异步操作的占位符

    console.log('应用程序设置完成');
    return this;
  }

  async start() {
    // 启动应用程序
    console.log('应用程序启动中...');
    // 启动逻辑...
  }

  async stop() {
    // 停止应用程序
    console.log('应用程序停止中...');
    // 清理逻辑...
    this.close(); // 关闭 Context
  }
}
```

## 组件和模块化设计

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

## 生命周期管理

您的应用程序应该管理组件和服务的生命周期：

```typescript
export class MyApplication extends Context {
  // ...

  async start() {
    // 获取所有需要初始化的服务
    const initializers = await this.findByTag('initializer');

    // 按顺序初始化
    for (const initializer of initializers) {
      const service = await this.get(initializer.key);
      await service.initialize();
    }

    console.log('应用程序已启动');
  }

  async stop() {
    // 获取所有需要清理的服务
    const cleaners = await this.findByTag('cleaner');

    // 按顺序清理
    for (const cleaner of cleaners) {
      const service = await this.get(cleaner.key);
      await service.cleanup();
    }

    this.close();
    console.log('应用程序已停止');
  }
}
```
