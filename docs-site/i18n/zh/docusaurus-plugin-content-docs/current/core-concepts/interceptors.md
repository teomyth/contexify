---
sidebar_position: 4
---

# 拦截器
## Interceptors

## 什么是拦截器？

拦截器是 Contexify 中的一个强大功能，允许您向方法添加横切关注点。它们拦截方法调用，可以在方法执行前后执行代码，甚至修改方法的行为。

拦截器的常见用例包括：

- 日志记录
- 性能监控
- 错误处理
- 事务管理
- 缓存
- 授权
- 验证

## 拦截器如何工作

拦截器通过将原始方法包装在拦截器函数链中来工作。当调用方法时，请求在到达方法之前流经拦截器链，然后响应再流回链。

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐   │
│  │         │     │         │     │         │     │         │   │
│  │ Request │ ──► │ Logger  │ ──► │ Cache   │ ──► │ Method  │   │
│  │         │     │         │     │         │     │         │   │
│  └─────────┘     └─────────┘     └─────────┘     └─────────┘   │
│                      │               │               │         │
│                      │               │               │         │
│                      ▼               ▼               ▼         │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐   │
│  │         │     │         │     │         │     │         │   │
│  │ Response│ ◄── │ Logger  │ ◄── │ Cache   │ ◄── │ Method  │   │
│  │         │     │         │     │         │     │         │   │
│  └─────────┘     └─────────┘     └─────────┘     └─────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 创建拦截器

拦截器是实现 `Interceptor` 接口的类。

```typescript
import { Interceptor, InvocationContext, ValueOrPromise } from 'contexify';

class LogInterceptor implements Interceptor {
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    // Code executed before the method call
    console.log(`Calling method: ${invocationCtx.methodName}`);

    try {
      // Call the next interceptor or the method itself
      const result = await next();

      // Code executed after the method call
      console.log(`Method ${invocationCtx.methodName} returned:`, result);

      // Return the result
      return result;
    } catch (error) {
      // Code executed if the method throws an error
      console.error(`Method ${invocationCtx.methodName} failed:`, error);
      throw error;
    }
  }
}
```

## 使用拦截器

### 方法级拦截器

您可以使用 `@intercept` 装饰器将拦截器应用于特定方法：

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
class UserService {
  @intercept(LogInterceptor)
  async createUser(userData: UserData) {
    // Method implementation
    return { id: '123', ...userData };
  }
}
```

### 类级拦截器

您可以将拦截器应用于类的所有方法：

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
@intercept(LogInterceptor)
class UserService {
  async createUser(userData: UserData) {
    // Method implementation
    return { id: '123', ...userData };
  }

  async getUser(id: string) {
    // Method implementation
    return { id, name: 'John Doe' };
  }
}
```

### 多个拦截器

您可以将多个拦截器应用于方法或类。它们将按照指定的顺序执行：

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor, CacheInterceptor, AuthInterceptor } from './interceptors';

@injectable()
class UserService {
  @intercept(AuthInterceptor, LogInterceptor, CacheInterceptor)
  async getUser(id: string) {
    // Method implementation
    return { id, name: 'John Doe' };
  }
}
```

## 拦截器上下文

`InvocationContext` 提供有关被拦截方法的信息。

```typescript
interface InvocationContext {
  // The target object (instance of the class)
  target: object;

  // The method name
  methodName: string;

  // The method arguments
  args: any[];

  // Additional metadata
  metadata?: { [key: string]: any };
}
```

您可以在拦截器中使用此信息，根据被调用的方法、其参数或目标对象做出决策。

## 常见拦截器模式

### 日志拦截器

```typescript
class LogInterceptor implements Interceptor {
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    const { methodName, args } = invocationCtx;
    console.log(`Calling ${methodName} with args:`, args);

    const start = Date.now();
    try {
      const result = await next();
      const duration = Date.now() - start;
      console.log(`${methodName} completed in ${duration}ms with result:`, result);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`${methodName} failed after ${duration}ms with error:`, error);
      throw error;
    }
  }
}
```

### 缓存拦截器

```typescript
class CacheInterceptor implements Interceptor {
  private cache = new Map<string, any>();

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    const { methodName, args } = invocationCtx;
    const cacheKey = `${methodName}:${JSON.stringify(args)}`;

    // Check if result is in cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Call the method
    const result = await next();

    // Cache the result
    this.cache.set(cacheKey, result);

    return result;
  }
}
```

### 错误处理拦截器

```typescript
class ErrorHandlingInterceptor implements Interceptor {
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    try {
      return await next();
    } catch (error) {
      // Handle the error
      console.error('Error in method execution:', error);

      // You can transform the error
      throw new ApplicationError('An error occurred', { cause: error });
    }
  }
}
```

## 最佳实践

- 保持拦截器专注于单一关注点
- 使用组合来组合多个拦截器
- 注意拦截器的顺序
- 在拦截器中正确处理错误
- 如果拦截器需要访问服务，请使用依赖注入
- 考虑拦截器对性能的影响，特别是对于频繁调用的方法

## 下一步

现在您已经了解了拦截器，可以了解：

- [观察者](./observers) - 如何对 Context 中的变化做出反应
- [依赖注入](./dependency-injection) - 如何将依赖项注入到类中
- [绑定](./binding) - 如何注册依赖项
