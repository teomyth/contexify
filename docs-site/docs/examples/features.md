---
sidebar_position: 2
---

# 功能示例

本节提供了 Contexify 各种功能的独立示例。

## 基本的 Context 和 Binding

此示例演示了 Context 和 Binding 的基本用法。

```typescript
import { Context } from 'contexify';

// Create a context
const context = new Context('my-context');

// Bind a value
context.bind('greeting').to('Hello, world!');

// Retrieve the value
async function run() {
  const greeting = await context.get('greeting');
  console.log(greeting); // Output: Hello, world!
}

run().catch(err => console.error(err));
```

## 依赖注入

此示例演示了使用 `@inject` 装饰器进行依赖注入。

```typescript
import { Context, injectable, inject } from 'contexify';

// Define interfaces
interface Logger {
  log(message: string): void;
}

interface UserService {
  createUser(name: string): Promise<User>;
}

interface User {
  id: string;
  name: string;
}

// Implement services
@injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

@injectable()
class DefaultUserService implements UserService {
  constructor(@inject('services.Logger') private logger: Logger) {}

  async createUser(name: string): Promise<User> {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Create a context
const context = new Context('application');

// Bind services
context.bind('services.Logger').toClass(ConsoleLogger);
context.bind('services.UserService').toClass(DefaultUserService);

// Use services
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const user = await userService.createUser('John Doe');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## Context 层次结构

此示例演示了上下文层次结构。

```typescript
import { Context } from 'contexify';

// Create a root context
const rootContext = new Context('root');
rootContext.bind('greeting').to('Hello from root!');
rootContext.bind('name').to('Root');

// Create a child context
const childContext = new Context(rootContext, 'child');
childContext.bind('name').to('Child');

// Create a grandchild context
const grandchildContext = new Context(childContext, 'grandchild');

// Retrieve values
async function run() {
  // Grandchild inherits from child and root
  console.log(await grandchildContext.get('greeting')); // Output: Hello from root!
  console.log(await grandchildContext.get('name')); // Output: Child (from child context)

  // Child inherits from root
  console.log(await childContext.get('greeting')); // Output: Hello from root!
  console.log(await childContext.get('name')); // Output: Child

  // Root only has its own bindings
  console.log(await rootContext.get('greeting')); // Output: Hello from root!
  console.log(await rootContext.get('name')); // Output: Root
}

run().catch(err => console.error(err));
```

## 绑定作用域

此示例演示了不同的绑定作用域。

```typescript
import { Context, BindingScope, injectable } from 'contexify';

@injectable()
class Counter {
  private count = 0;

  increment() {
    this.count++;
    return this.count;
  }

  getCount() {
    return this.count;
  }
}

// Create a context
const context = new Context('application');

// Singleton scope: One instance for the entire application
context
  .bind('counters.singleton')
  .toClass(Counter)
  .inScope(BindingScope.SINGLETON);

// Transient scope: New instance each time it's resolved
context
  .bind('counters.transient')
  .toClass(Counter)
  .inScope(BindingScope.TRANSIENT);

// Context scope: One instance per context
context
  .bind('counters.context')
  .toClass(Counter)
  .inScope(BindingScope.CONTEXT);

// Use counters
async function run() {
  // Singleton counter
  const singleton1 = await context.get('counters.singleton');
  const singleton2 = await context.get('counters.singleton');
  
  singleton1.increment();
  console.log('Singleton 1 count:', singleton1.getCount()); // Output: 1
  console.log('Singleton 2 count:', singleton2.getCount()); // Output: 1 (same instance)
  
  // Transient counter
  const transient1 = await context.get('counters.transient');
  const transient2 = await context.get('counters.transient');
  
  transient1.increment();
  console.log('Transient 1 count:', transient1.getCount()); // Output: 1
  console.log('Transient 2 count:', transient2.getCount()); // Output: 0 (different instance)
  
  // Context counter
  const context1 = await context.get('counters.context');
  const context2 = await context.get('counters.context');
  
  context1.increment();
  console.log('Context 1 count:', context1.getCount()); // Output: 1
  console.log('Context 2 count:', context2.getCount()); // Output: 1 (same instance in this context)
  
  // Create a child context
  const childContext = new Context(context, 'child');
  
  // Context counter in child context
  const childContext1 = await childContext.get('counters.context');
  
  console.log('Child context count:', childContext1.getCount()); // Output: 0 (different instance in child context)
}

run().catch(err => console.error(err));
```

## 拦截器

此示例演示了拦截器的使用。

```typescript
import { Context, injectable, intercept, Interceptor, InvocationContext, ValueOrPromise } from 'contexify';

// Define an interceptor
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

// Define a service with intercepted methods
@injectable()
class CalculatorService {
  @intercept(LogInterceptor)
  add(a: number, b: number): number {
    return a + b;
  }
  
  @intercept(LogInterceptor)
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

// Create a context
const context = new Context('application');

// Bind the service
context.bind('services.CalculatorService').toClass(CalculatorService);

// Use the service
async function run() {
  const calculator = await context.get<CalculatorService>('services.CalculatorService');
  
  // Call the add method
  const sum = calculator.add(2, 3);
  console.log('Sum:', sum);
  
  // Call the divide method
  try {
    const quotient = calculator.divide(10, 2);
    console.log('Quotient:', quotient);
    
    // This will throw an error
    calculator.divide(10, 0);
  } catch (error) {
    console.error('Error caught:', error.message);
  }
}

run().catch(err => console.error(err));
```

## Context 事件和观察者

此示例演示了上下文事件和观察者。

```typescript
import { Context, ContextObserver } from 'contexify';

// Create a context
const context = new Context('application');

// Create an observer
const serviceObserver: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
    }
  }
};

// Register the observer
context.subscribe(serviceObserver);

// Add bindings
context.bind('services.UserService')
  .to({ name: 'UserService' })
  .tag('service');

context.bind('services.OrderService')
  .to({ name: 'OrderService' })
  .tag('service');

context.bind('repositories.UserRepository')
  .to({ name: 'UserRepository' })
  .tag('repository');

// Remove a binding
context.unbind('services.OrderService');

// Output:
// Service registered: services.UserService
// Service registered: services.OrderService
// Service unregistered: services.OrderService
```

## Context 视图

此示例演示了上下文视图。

```typescript
import { Context } from 'contexify';

// Create a context
const context = new Context('application');

// Create a view that tracks all bindings with 'controller' tag
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Listen for view events
controllersView.on('refresh', () => {
  console.log('Controllers view refreshed');
});

// Add controllers
context.bind('controllers.UserController')
  .to({ name: 'UserController' })
  .tag('controller');

context.bind('controllers.OrderController')
  .to({ name: 'OrderController' })
  .tag('controller');

// Get all controllers
async function getControllers() {
  const controllers = await controllersView.values();
  console.log('Controllers:', controllers.map(c => c.name));
}

// Remove a controller
function removeOrderController() {
  context.unbind('controllers.OrderController');
}

// Run the example
async function run() {
  await getControllers();
  // Output: Controllers: ['UserController', 'OrderController']
  
  removeOrderController();
  
  await getControllers();
  // Output: Controllers: ['UserController']
}

run().catch(err => console.error(err));
```

## 配置

此示例演示了配置管理。

```typescript
import { Context, injectable, config } from 'contexify';

// Define configuration types
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface ServerConfig {
  port: number;
  host: string;
}

// Define a service that uses configuration
@injectable()
class DatabaseService {
  constructor(
    @config() private config: DatabaseConfig
  ) {}
  
  connect() {
    const { host, port, username, password, database } = this.config;
    console.log(`Connecting to database ${database} at ${host}:${port} with username ${username}`);
    // In a real application, this would connect to a database
  }
}

// Create a context
const context = new Context('application');

// Bind the service
context.bind('services.DatabaseService').toClass(DatabaseService);

// Configure the service
context.configure('services.DatabaseService').to({
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'myapp',
});

// Use the service
async function run() {
  const dbService = await context.get<DatabaseService>('services.DatabaseService');
  dbService.connect();
  // Output: Connecting to database myapp at localhost:5432 with username admin
}

run().catch(err => console.error(err));
```

## 提供者

此示例演示了提供者的使用。

```typescript
import { Context, Provider, injectable, inject } from 'contexify';

// Define interfaces
interface Logger {
  log(message: string): void;
}

interface LoggerFactory {
  createLogger(name: string): Logger;
}

// Implement a provider
@injectable()
class LoggerFactoryProvider implements Provider<LoggerFactory> {
  value(): LoggerFactory {
    return {
      createLogger: (name: string): Logger => {
        return {
          log: (message: string) => {
            console.log(`[${name}] ${message}`);
          },
        };
      },
    };
  }
}

// Implement a service that uses the provider
@injectable()
class UserService {
  private logger: Logger;
  
  constructor(
    @inject('factories.LoggerFactory') loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.createLogger('UserService');
  }
  
  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Create a context
const context = new Context('application');

// Bind the provider
context.bind('factories.LoggerFactory').toProvider(LoggerFactoryProvider);

// Bind the service
context.bind('services.UserService').toClass(UserService);

// Use the service
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const user = userService.createUser('John Doe');
  console.log('Created user:', user);
  // Output:
  // [UserService] Creating user: John Doe
  // Created user: { id: '1621234567890', name: 'John Doe' }
}

run().catch(err => console.error(err));
```

## 下一步

现在您已经看到了 Contexify 各种功能的示例，您可以：

- 探索[模块化应用程序示例](./modular-app)，了解这些功能如何在完整应用程序中使用
- 阅读[核心概念](../category/core-concepts)文档，了解有关这些示例中演示的概念的更多信息
- 查看[指南](../category/guides)，获取最佳实践和操作说明
