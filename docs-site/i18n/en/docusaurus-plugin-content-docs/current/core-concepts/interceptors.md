---
sidebar_position: 4
---

# Interceptors

## What are Interceptors?

Interceptors are a powerful feature in Contexify that allow you to add cross-cutting concerns to your methods. They intercept method calls and can execute code before and after the method execution, or even modify the method's behavior.

Common use cases for interceptors include:

- Logging
- Performance monitoring
- Error handling
- Transaction management
- Caching
- Authorization
- Validation

## How Interceptors Work

Interceptors work by wrapping the original method in a chain of interceptor functions. When a method is called, the request flows through the interceptor chain before reaching the method, and then the response flows back through the chain.

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

## Creating an Interceptor

An interceptor is a class that implements the `Interceptor` interface.

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

## Using Interceptors

### Method-level Interceptors

You can apply interceptors to specific methods using the `@intercept` decorator.

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

You can apply interceptors to all methods of a class.

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

You can apply multiple interceptors to a method or class. They will be executed in the order they are specified.

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

## Interceptor Context

The `InvocationContext` provides information about the method being intercepted.

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

You can use this information in your interceptor to make decisions based on the method being called, its arguments, or the target object.

## Common Interceptor Patterns

### Logging Interceptor

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

## Best Practices

- Keep interceptors focused on a single concern
- Use composition to combine multiple interceptors
- Be mindful of the order of interceptors
- Handle errors properly in interceptors
- Use dependency injection in interceptors if they need access to services
- Consider the performance impact of interceptors, especially for frequently called methods

## Next Steps

Now that you understand Interceptors, you can learn about:

- [Observers](./observers) - How to react to changes in the Context
- [Dependency Injection](./dependency-injection) - How to inject dependencies into your classes
- [Binding](./binding) - How to register dependencies
