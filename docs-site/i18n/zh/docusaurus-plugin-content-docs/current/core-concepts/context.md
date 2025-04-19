---
sidebar_position: 1
---

# 上下文
## Context

## 什么是 Context？

Context 是 Contexify 框架的核心。它作为：

- 应用程序中所有状态和依赖项的抽象
- 应用程序中任何内容的全局注册表（配置、状态、依赖项、类等）
- 用于将依赖项注入到代码中的[控制反转](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC)容器

Context 系统允许您以结构化和灵活的方式管理依赖项，使您的应用程序更加模块化和可测试。

## Context 层次结构

Context 系统的一个关键特性是其层次化特性。Context 可以组织成父子关系，形成 Context 链。

```typescript
import { Context } from 'contexify';

// 创建根上下文
const rootContext = new Context('root');

// 创建以 rootContext 为父级的子上下文
const serverContext = new Context(rootContext, 'server');

// 创建另一个子上下文
const requestContext = new Context(serverContext, 'request');
```

这种层次结构允许：

- **继承**：子上下文继承其父上下文的绑定
- **隔离**：对子上下文的更改不会影响父上下文
- **作用域**：应用程序的不同部分可以有自己的特定绑定的上下文

## Context 级别

在典型的应用程序中，您将有三个级别的上下文：

### 1. 应用程序级别上下文（全局）

- 在整个应用程序生命周期中存储所有初始和修改的应用程序状态
- 通常在创建应用程序时配置
- 作为所有其他上下文的根上下文

```typescript
import { Context } from 'contexify';

// 创建一个扩展 Context 的应用程序类
class Application extends Context {
  constructor() {
    super('application');
  }
}

// 创建应用程序实例
const app = new Application();

// 注册应用程序范围的服务
app.bind('services.ConfigService').toClass(ConfigService);
app.bind('services.LoggerService').toClass(LoggerService);
```

### 2. 服务器级别上下文

- 应用程序级别上下文的子级
- 保存特定于特定服务器实例的配置
- 对于每个服务器可能有不同配置的多服务器应用程序很有用

```typescript
// 创建服务器上下文
const serverContext = new Context(app, 'server');

// 配置服务器特定的绑定
serverContext.bind('server.port').to(3000);
serverContext.bind('server.host').to('localhost');
```

### 3. 请求级别上下文（每个请求）

- 为每个传入请求创建
- 扩展服务器级别上下文
- 请求完成后进行垃圾回收
- 允许请求特定的依赖项和状态

```typescript
// 对于每个传入请求
const requestContext = new Context(serverContext, 'request');

// 绑定请求特定数据
requestContext.bind('request.body').to(requestBody);
requestContext.bind('request.headers').to(requestHeaders);
```

## 创建和使用 Context

以下是创建和使用 Context 的基本示例：

```typescript
import { Context } from 'contexify';

// Create a context
const context = new Context('my-context');

// Bind a value to a key
context.bind('greeting').to('Hello, world!');

// Retrieve the value
async function run() {
  const greeting = await context.get('greeting');
  console.log(greeting); // Output: Hello, world!
}

run().catch(err => console.error(err));
```

## Context 事件

当添加或删除绑定时，Context 会发出事件。您可以监听这些事件以响应 Context 中的变化。

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Listen for 'bind' events
context.on('bind', event => {
  console.log(`Binding added: ${event.binding.key}`);
});

// Listen for 'unbind' events
context.on('unbind', event => {
  console.log(`Binding removed: ${event.binding.key}`);
});

// Add a binding
context.bind('greeting').to('Hello, world!');
// Output: Binding added: greeting

// Remove a binding
context.unbind('greeting');
// Output: Binding removed: greeting
```

## Context 观察者

对于更高级的用例，您可以使用 Context 观察者异步响应 Context 事件。

```typescript
import { Context, ContextObserver } from 'contexify';

const context = new Context('my-context');

// Create an observer
const observer: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
    }
  }
};

// Register the observer
context.subscribe(observer);

// Add a binding with 'service' tag
context.bind('services.UserService')
  .toClass(UserService)
  .tag('service');
// Output: Service registered: services.UserService
```

## Context 视图

Context 视图允许您跟踪匹配特定过滤器的一组绑定。这对于动态跟踪扩展或插件很有用。

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Create a view that tracks all bindings with 'controller' tag
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Get all controller instances
async function getControllers() {
  const controllers = await controllersView.values();
  return controllers;
}

// Add a controller
context.bind('controllers.UserController')
  .toClass(UserController)
  .tag('controller');

// Now getControllers() will include UserController
```

## 下一步

现在您已经了解了 Context 概念，可以了解：

- [绑定](./binding) - 如何注册和管理依赖项
- [依赖注入](./dependency-injection) - 如何将依赖项注入到类中
- [API 参考](../api/overview) - 查看详细的 API 文档
