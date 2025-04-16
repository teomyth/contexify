---
sidebar_position: 3
---

# Interceptors Example

This example demonstrates how to use Contexify's interceptor feature to add cross-cutting concerns.

## What are Interceptors?

Interceptors allow you to execute code before and after method calls without modifying the method itself. This is useful for adding cross-cutting concerns like logging, performance monitoring, error handling, etc.

## Creating an Interceptor

First, let's create a simple logging interceptor:

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

## Using Interceptors

### Method-level Interceptors

You can apply interceptors to specific methods using the `@intercept` decorator:

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

### Class-level Interceptors

You can apply interceptors to all methods of a class:

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

### Multiple Interceptors

You can apply multiple interceptors to a method or class. They will be executed in the order they are specified:

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

## Common Interceptor Patterns

### Caching Interceptor

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

### Error Handling Interceptor

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

## Complete Example

The complete example code can be found in the [examples/features/interceptors](https://github.com/teomyth/contexify/tree/main/examples/features/interceptors) directory.

## Key Points

- Interceptors allow you to add cross-cutting concerns without modifying the method itself
- You can apply interceptors to specific methods or entire classes
- You can combine multiple interceptors to implement complex functionality
- Common use cases include logging, caching, error handling, and performance monitoring
