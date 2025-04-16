---
sidebar_position: 3
---

# 观察者示例

本示例演示了如何使用 Contexify 的观察者功能。

```typescript
import { Context, ContextObserver } from 'contexify';

// 创建一个上下文
const context = new Context('application');

// 创建一个观察者
const serviceObserver: ContextObserver = {
  // 只对带有 'service' 标签的绑定感兴趣
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
    }
  }
};

// 注册观察者
context.subscribe(serviceObserver);

// 添加绑定
context.bind('services.UserService')
  .to({ name: 'UserService' })
  .tag('service');

context.bind('services.OrderService')
  .to({ name: 'OrderService' })
  .tag('service');

context.bind('repositories.UserRepository')
  .to({ name: 'UserRepository' })
  .tag('repository');

// 移除绑定
context.unbind('services.OrderService');

// 输出:
// Service registered: services.UserService
// Service registered: services.OrderService
// Service unregistered: services.OrderService
```

## 使用上下文视图

上下文视图是建立在观察者之上的更高级抽象。它们允许您跟踪匹配特定过滤器的一组绑定并获取其解析值。

```typescript
import { Context } from 'contexify';

// 创建一个上下文
const context = new Context('application');

// 创建一个视图，跟踪所有带有 'controller' 标签的绑定
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// 监听视图事件
controllersView.on('refresh', () => {
  console.log('Controllers view refreshed');
});

// 添加控制器
context.bind('controllers.UserController')
  .to({ name: 'UserController' })
  .tag('controller');

context.bind('controllers.OrderController')
  .to({ name: 'OrderController' })
  .tag('controller');

// 获取所有控制器
async function getControllers() {
  const controllers = await controllersView.values();
  console.log('Controllers:', controllers.map(c => c.name));
}

// 移除一个控制器
function removeOrderController() {
  context.unbind('controllers.OrderController');
}

// 运行示例
async function run() {
  await getControllers();
  // 输出: Controllers: ['UserController', 'OrderController']
  
  removeOrderController();
  
  await getControllers();
  // 输出: Controllers: ['UserController']
}

run().catch(err => console.error(err));
```

## 了解更多

要了解更多关于观察者和事件的信息，请参阅[观察者和事件](../core-concepts/observers)文档。
