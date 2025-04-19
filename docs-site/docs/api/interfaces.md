---
sidebar_position: 5
---

# Interfaces and Types

Contexify provides a set of interfaces and types that define the core concepts of the framework.

## Interfaces

### Provider

The `Provider` interface defines a class that can create values dynamically.

**Definition:**
```typescript
interface Provider<T> {
  value(): ValueOrPromise<T>;
}
```

**Methods:**
- `value()`: Returns a value or a promise of a value.

**Example:**
```typescript
@injectable()
class RandomNumberProvider implements Provider<number> {
  value() {
    return Math.random();
  }
}

// Bind the provider
context.bind('random').toProvider(RandomNumberProvider);

// Resolve values
const random1 = await context.get<number>('random');
const random2 = await context.get<number>('random');
console.log(random1 !== random2); // Output: true
```

### Interceptor

The `Interceptor` interface defines a class that can intercept method calls.

**Definition:**
```typescript
interface Interceptor {
  intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ): ValueOrPromise<any>;
}
```

**Methods:**
- `intercept(invocationCtx, next)`: Intercepts a method call. `invocationCtx` contains information about the method being called, and `next` is a function that continues the method execution.

**Example:**
```typescript
// Define a caching interceptor
class CachingInterceptor implements Interceptor {
  private cache = new Map<string, any>();

  intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<any>) {
    const cacheKey = `${invocationCtx.targetClass.name}.${invocationCtx.methodName}(${JSON.stringify(invocationCtx.args)})`;

    if (this.cache.has(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);
      return this.cache.get(cacheKey);
    }

    console.log(`Cache miss for ${cacheKey}`);
    const result = next();

    if (result instanceof Promise) {
      return result.then(value => {
        this.cache.set(cacheKey, value);
        return value;
      });
    }

    this.cache.set(cacheKey, result);
    return result;
  }
}

// Use the caching interceptor
@injectable()
class ExpensiveService {
  @intercept(new CachingInterceptor())
  async computeExpensiveValue(input: string) {
    console.log(`Computing expensive value for ${input}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Result for ${input}`;
  }
}
```

### ContextObserver

The `ContextObserver` interface defines a class that can observe context events.

**Definition:**
```typescript
interface ContextObserver {
  filter?: BindingFilter;
  observe(
    eventType: string,
    binding: Readonly<Binding<unknown>>,
    context: Context
  ): ValueOrPromise<void>;
}
```

**Properties:**
- `filter` (optional): A function that filters bindings to observe.

**Methods:**
- `observe(eventType, binding, context)`: Called when an event occurs. `eventType` is the type of event, `binding` is the binding involved, and `context` is the context where the event occurred.

**Example:**
```typescript
// Define an observer
class BindingObserver implements ContextObserver {
  // Only observe bindings with the 'service' tag
  filter = (binding: Readonly<Binding<unknown>>) => binding.tags.has('service');

  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context) {
    console.log(`Event: ${eventType}, Binding: ${binding.key}`);
  }
}

// Create a context and subscribe the observer
const context = new Context('app');
context.subscribe(new BindingObserver());

// Add a binding (will trigger the observer)
context.bind('services.UserService').toClass(UserService).tag('service');
// Output: Event: bind, Binding: services.UserService

// Resolve the binding (will trigger the observer)
await context.get('services.UserService');
// Output: Event: resolve:before, Binding: services.UserService
// Output: Event: resolve:after, Binding: services.UserService
```

### InvocationContext

The `InvocationContext` interface provides information about a method invocation.

**Definition:**
```typescript
interface InvocationContext {
  target: object;
  targetClass: Constructor<any>;
  methodName: string;
  args: any[];
}
```

**Properties:**
- `target`: The object on which the method is being called.
- `targetClass`: The class of the object.
- `methodName`: The name of the method being called.
- `args`: The arguments passed to the method.

**Example:**
```typescript
// Define an interceptor that logs method invocations
class LoggingInterceptor implements Interceptor {
  intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<any>) {
    console.log(`Calling ${invocationCtx.targetClass.name}.${invocationCtx.methodName} with args:`, invocationCtx.args);
    return next();
  }
}
```

## Enums

### BindingScope

The `BindingScope` enum defines the scope of a binding.

**Definition:**
```typescript
enum BindingScope {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
  CONTEXT = 'context',
}
```

**Values:**
- `SINGLETON`: The binding creates a single instance that is shared across all contexts.
- `TRANSIENT`: The binding creates a new instance for each resolution.
- `CONTEXT`: The binding creates a single instance that is shared within the same context.

**Example:**
```typescript
// Singleton scope (default)
context.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);

// Transient scope (new instance for each resolution)
context.bind('transient').toDynamicValue(() => new Date()).inScope(BindingScope.TRANSIENT);

// Context scope (instance shared within the same context)
context.bind('contextScoped').toDynamicValue(() => new Date()).inScope(BindingScope.CONTEXT);
```

## Types

### Constructor

The `Constructor` type represents a class constructor.

**Definition:**
```typescript
type Constructor<T> = new (...args: any[]) => T;
```

**Example:**
```typescript
function createInstance<T>(ctor: Constructor<T>): T {
  return new ctor();
}

const userService = createInstance(UserService);
```

### ValueOrPromise

The `ValueOrPromise` type represents a value or a promise of a value.

**Definition:**
```typescript
type ValueOrPromise<T> = T | Promise<T>;
```

**Example:**
```typescript
function getValue(): ValueOrPromise<string> {
  if (Math.random() > 0.5) {
    return 'Synchronous value';
  } else {
    return Promise.resolve('Asynchronous value');
  }
}
```

### Getter

The `Getter` type represents a function that returns a value or a promise of a value.

**Definition:**
```typescript
type Getter<T> = () => ValueOrPromise<T>;
```

**Example:**
```typescript
@injectable()
class ConfigService {
  constructor(@inject.getter('config.database') private getDbConfig: Getter<any>) {}

  async connectToDatabase() {
    // Get the configuration only when needed
    const dbConfig = await this.getDbConfig();
    console.log(`Connecting to ${dbConfig.host}:${dbConfig.port}`);
  }
}
```

### BindingFilter

The `BindingFilter` type represents a function that filters bindings.

**Definition:**
```typescript
type BindingFilter = (binding: Readonly<Binding<unknown>>) => boolean;
```

**Example:**
```typescript
// Create a filter for service bindings
const serviceFilter: BindingFilter = binding => binding.tags.has('service');

// Create a view using the filter
const serviceView = context.createView<any>(serviceFilter);
```

### BindingComparator

The `BindingComparator` type represents a function that compares bindings.

**Definition:**
```typescript
type BindingComparator = (a: Readonly<Binding<unknown>>, b: Readonly<Binding<unknown>>) => number;
```

**Example:**
```typescript
// Create a comparator that sorts bindings by key
const keyComparator: BindingComparator = (a, b) => a.key.localeCompare(b.key);

// Create a view using the filter and comparator
const serviceView = context.createView<any>(serviceFilter, keyComparator);
```

## Complete Example

Here's a complete example showing how to use these interfaces and types together:

```typescript
import {
  Context,
  Binding,
  BindingScope,
  Provider,
  Interceptor,
  ContextObserver,
  InvocationContext,
  ValueOrPromise,
  Constructor,
  Getter,
  BindingFilter,
  BindingComparator,
  injectable,
  intercept
} from 'contexify';

// Create a context
const context = new Context('application');

// Define a provider
@injectable()
class ConfigProvider implements Provider<any> {
  value(): ValueOrPromise<any> {
    return {
      apiUrl: 'https://api.example.com',
      timeout: 5000
    };
  }
}

// Define an interceptor
class LoggingInterceptor implements Interceptor {
  intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<any>): ValueOrPromise<any> {
    console.log(`Calling ${invocationCtx.methodName}`);
    const result = next();
    console.log(`${invocationCtx.methodName} completed`);
    return result;
  }
}

// Define an observer
class ServiceObserver implements ContextObserver {
  filter: BindingFilter = binding => binding.tags.has('service');

  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context): ValueOrPromise<void> {
    console.log(`Service event: ${eventType}, binding: ${binding.key}`);
  }
}

// Define a service
@injectable()
class UserService {
  @intercept(new LoggingInterceptor())
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}

// Bind services and configuration
context.bind('config').toProvider(ConfigProvider);
context.bind('services.UserService').toClass(UserService).tag('service').inScope(BindingScope.SINGLETON);

// Subscribe the observer
context.subscribe(new ServiceObserver());

// Define a binding filter and comparator
const serviceFilter: BindingFilter = binding => binding.tags.has('service');
const keyComparator: BindingComparator = (a, b) => a.key.localeCompare(b.key);

// Create a view
const serviceView = context.createView<any>(serviceFilter, keyComparator);

// Use the services
async function run() {
  // Resolve the config
  const config = await context.get<any>('config');
  console.log('Config:', config);

  // Resolve the user service
  const userService = await context.get<UserService>('services.UserService');
  console.log('Users:', userService.getUsers());

  // Get all service bindings
  const serviceBindings = serviceView.bindings();
  console.log(`Found ${serviceBindings.length} service bindings`);
}

run().catch(err => console.error(err));
```
