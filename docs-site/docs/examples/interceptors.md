---
sidebar_position: 3
---

# 拦截器示例

本示例演示如何使用 Contexify 的拦截器功能来添加横切关注点。

## 什么是拦截器？

拦截器允许您在方法调用前后执行代码，而无需修改方法本身。这对于添加日志记录、性能监控、错误处理等横切关注点非常有用。

## 创建拦截器

首先，让我们创建一个简单的日志拦截器：

```typescript
import { Interceptor, InvocationContext, ValueOrPromise } from 'contexify';

class LogInterceptor implements Interceptor {
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    // Code executed before the method call
    const { methodName, args } = invocationCtx;
    console.log(`Calling ${methodName} method with args:`, args);

    const start = Date.now();
    try {
      // Call the next interceptor or the method itself
      const result = await next();

      // Code executed after the method call
      const duration = Date.now() - start;
      console.log(`${methodName} method completed in ${duration}ms with result:`, result);

      // Return the result
      return result;
    } catch (error) {
      // Code executed if the method throws an error
      const duration = Date.now() - start;
      console.error(`${methodName} method failed after ${duration}ms with error:`, error);
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
import { AuthInterceptor, LogInterceptor, CacheInterceptor } from './interceptors';

@injectable()
class UserService {
  @intercept(AuthInterceptor, LogInterceptor, CacheInterceptor)
  async getUser(id: string) {
    // Method implementation
    return { id, name: 'John Doe' };
  }
}
```

## 常见拦截器模式

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
      console.error('Error during method execution:', error);

      // You can transform the error
      throw new ApplicationError('An error occurred', { cause: error });
    }
  }
}
```

## 完整示例

完整的示例代码可以在 [examples/features/interceptors](https://github.com/teomyth/contexify/tree/main/examples/features/interceptors) 目录中找到。

## 关键要点

- 拦截器允许您在不修改方法本身的情况下添加横切关注点
- 您可以将拦截器应用于特定方法或整个类
- 您可以组合多个拦截器来实现复杂的功能
- 常见用例包括日志记录、缓存、错误处理和性能监控
