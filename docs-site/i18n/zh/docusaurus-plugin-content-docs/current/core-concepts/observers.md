---
sidebar_position: 5
---

# 观察者和事件

## 什么是 Context 事件？

Context 事件是当绑定被添加或移除时由 Context 发出的通知。这些事件允许您对 Context 中的变化做出反应，例如当新服务被注册或配置被更新时。

Context 发出以下事件：

- `bind`：当新绑定添加到上下文时发出
- `unbind`：当现有绑定从上下文中移除时发出
- `error`：当观察者在通知过程中抛出错误时发出

## Context 事件监听器

您可以使用标准的事件发射器模式监听上下文事件。

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

## 什么是 Context 观察者？

Context 观察者提供了一种更结构化的方式来响应上下文事件。与事件监听器不同，观察者：

- 可以过滤它们感兴趣的绑定
- 可以执行异步操作
- 以受控方式接收通知

上下文观察者是实现 `ContextObserver` 接口的对象：

```typescript
interface ContextObserver {
  // An optional filter function to match bindings
  filter?: BindingFilter;

  // Listen on 'bind', 'unbind', or other events
  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context): ValueOrPromise<void>;
}
```

## 创建和使用 Context 观察者

以下是创建和使用上下文观察者的示例：

```typescript
import { Context, ContextObserver } from 'contexify';

const context = new Context('my-context');

// Create an observer
const serviceObserver: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // You can perform async operations here
      return registerServiceWithRegistry(binding.key);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      return unregisterServiceFromRegistry(binding.key);
    }
  }
};

// Register the observer
context.subscribe(serviceObserver);

// Add a binding with 'service' tag
context.bind('services.UserService')
  .toClass(UserService)
  .tag('service');
// Output: Service registered: services.UserService
```

## 观察者函数

如果您不需要过滤功能，可以使用简单的函数作为观察者：

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Create an observer function
const observerFn = (event, binding, ctx) => {
  console.log(`Event: ${event}, Binding: ${binding.key}`);
};

// Register the observer function
context.subscribe(observerFn);
```

## Context 视图

Context 视图是建立在观察者之上的更高级抽象。它们允许您跟踪匹配特定过滤器的一组绑定并获取其解析值。

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

### Context 视图事件

当绑定从视图中添加或移除时，Context 视图会发出事件：

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Listen for 'refresh' events
controllersView.on('refresh', () => {
  console.log('Controllers view refreshed');
});

// Listen for 'resolve' events
controllersView.on('resolve', () => {
  console.log('Controllers view resolved');
});
```

## 观察者错误处理

上下文观察者抛出的错误通过上下文链报告：

1. 如果链中的任何上下文有 `error` 监听器，则在该上下文上发出 `error` 事件
2. 如果没有上下文有 `error` 监听器，则在当前上下文上发出 `error` 事件，这可能导致进程退出

建议在观察者中处理错误：

```typescript
const observer: ContextObserver = {
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    try {
      // Your observer logic
    } catch (error) {
      console.error('Error in observer:', error);
      // Handle the error
    }
  }
};
```

## 最佳实践

- 使用观察者进行组件的动态发现
- 保持观察者专注于单一关注点
- 在观察者中正确处理错误
- 使用上下文视图跟踪相关绑定
- 注意观察者对性能的影响，特别是对于频繁变化的绑定
- 在不再需要上下文视图时关闭它们以避免内存泄漏

## 下一步

现在您已经了解了观察者和事件，可以了解：

- [Context](./context) - 绑定的容器
- [Binding](./binding) - 如何注册依赖项
- [依赖注入](./dependency-injection) - 如何将依赖项注入到类中
