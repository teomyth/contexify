---
sidebar_position: 1
---

# 最佳实践概述

本文档提供了在 Contexify 框架中使用 Context 系统的最佳实践，参考了 LoopBack 框架的设计概念和实践经验。

## Context 使用模式

使用 Context 时，有几种常见模式。以下是对这些模式的分析和推荐的最佳实践。

### 不推荐：全局 Context 对象

```typescript
// 不推荐的模式
const globalContext = new Context();
globalContext.bind('service').toClass(MyService);

// 在应用程序的任何地方
const service = globalContext.getSync('service');
service.doSomething();
```

**问题**：

- 创建全局状态，使测试和管理变得困难
- 隐藏依赖项，使代码更难理解和维护
- 无法轻松替换或模拟测试依赖项

### 不推荐：Context 作为参数

```typescript
// 不推荐的模式
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
// 推荐的模式
export class MyApplication extends Context {
  constructor() {
    super('application');
    this.bind('service').toClass(MyService);
  }
}

// 使用应用程序类
const app = new MyApplication();
app.start();
```

**好处**：

- 应用程序本身是一个 Context，提供清晰的架构边界
- 组件可以通过依赖注入获取其依赖项
- 易于测试，因为依赖项可以被模拟或替换
- 支持模块化设计和可扩展性

有关更详细的最佳实践，请参阅以下部分：
- [应用程序架构](./application-architecture.md)
- [依赖注入最佳实践](./dependency-injection.md)
- [高级模式](./advanced-patterns.md)
