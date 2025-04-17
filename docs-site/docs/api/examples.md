---
sidebar_position: 2
---

# API Usage Examples

This section provides examples of using the Contexify API to help you better understand how to use these APIs in real applications.

## Context Class Examples

### Creating Contexts

```typescript
// Create a root context
const rootContext = new Context('root');

// Create a child context
const childContext = new Context(rootContext, 'child');
```

### Binding and Resolving Values

```typescript
// Bind a simple value
context.bind('greeting').to('Hello, world!');

// Resolve the value asynchronously
const greeting = await context.get<string>('greeting');
console.log(greeting); // Output: Hello, world!

// Resolve the value synchronously (if possible)
const greetingSync = context.getSync<string>('greeting');
console.log(greetingSync); // Output: Hello, world!
```

### Binding Classes

```typescript
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

// Bind the class
context.bind('services.GreetingService').toClass(GreetingService);

// Resolve the class instance
const greetingService = await context.get<GreetingService>('services.GreetingService');
console.log(greetingService.sayHello('John')); // Output: Hello, John!
```

### Using Dynamic Values

```typescript
// Bind a dynamic value
context.bind('currentTime').toDynamicValue(() => new Date().toISOString());

// Each resolution gets a new value
const time1 = await context.get<string>('currentTime');
// Wait for some time
const time2 = await context.get<string>('currentTime');
console.log(time1 !== time2); // Output: true
```

### Using Providers

```typescript
@injectable()
class TimeProvider implements Provider<string> {
  value() {
    return new Date().toISOString();
  }
}

// Bind the provider
context.bind('currentTime').toProvider(TimeProvider);

// Resolve the value
const time = await context.get<string>('currentTime');
console.log(time); // Outputs the current time
```

### Using Aliases

```typescript
// Bind a value
context.bind('config.apiUrl').to('https://api.example.com');

// Create an alias
context.bind('apiUrl').toAlias('config.apiUrl');

// Resolve through the alias
const apiUrl = await context.get<string>('apiUrl');
console.log(apiUrl); // Output: https://api.example.com
```

### Setting Binding Scope

```typescript
// Singleton scope (default)
context.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);

// Transient scope (new instance for each resolution)
context.bind('transient').toDynamicValue(() => new Date()).inScope(BindingScope.TRANSIENT);

// Context scope (instance shared within the same context)
context.bind('contextScoped').toDynamicValue(() => new Date()).inScope(BindingScope.CONTEXT);
```

### Using Tags

```typescript
// Add tags
context.bind('service.user').toClass(UserService).tag('service');
context.bind('service.order').toClass(OrderService).tag('service');
context.bind('service.payment').toClass(PaymentService).tag('service');

// Find bindings by tag
const serviceBindings = await context.findByTag('service');
console.log(serviceBindings.length); // Output: 3
```

### Using Context Views

```typescript
// Create a view that tracks all bindings with the 'service' tag
const serviceView = context.createView<any>(binding => binding.tags.has('service'));

// Get all matching bindings
const bindings = serviceView.bindings();
console.log(bindings.length); // Output: 3

// Resolve all matching values
const services = await serviceView.resolve();
console.log(services.length); // Output: 3
```

## Decorator Examples

### @injectable() Decorator

```typescript
@injectable()
class UserService {
  constructor() {
    console.log('UserService created');
  }
  
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}

// Now UserService can be created through Context
context.bind('services.UserService').toClass(UserService);
const userService = await context.get<UserService>('services.UserService');
```

### @inject() Decorator

```typescript
@injectable()
class UserRepository {
  findAll() {
    return ['user1', 'user2', 'user3'];
  }
}

@injectable()
class UserService {
  constructor(@inject('repositories.UserRepository') private userRepo: UserRepository) {}
  
  getUsers() {
    return this.userRepo.findAll();
  }
}

// Bind dependencies
context.bind('repositories.UserRepository').toClass(UserRepository);
context.bind('services.UserService').toClass(UserService);

// Resolve UserService (UserRepository is automatically injected)
const userService = await context.get<UserService>('services.UserService');
console.log(userService.getUsers()); // Output: ['user1', 'user2', 'user3']
```

### @inject.tag() Decorator

```typescript
@injectable()
class Logger {
  constructor(private name: string) {}
  
  log(message: string) {
    console.log(`[${this.name}] ${message}`);
  }
}

@injectable()
class Application {
  constructor(@inject.tag('logger') private loggers: Logger[]) {}
  
  run() {
    this.loggers.forEach(logger => logger.log('Application started'));
  }
}

// Bind multiple services with the same tag
context.bind('loggers.console').toClass(Logger).tag('logger').to(new Logger('console'));
context.bind('loggers.file').toClass(Logger).tag('logger').to(new Logger('file'));
context.bind('app').toClass(Application);

// Resolve the application (all services with the 'logger' tag are automatically injected)
const app = await context.get<Application>('app');
app.run();
// Output:
// [console] Application started
// [file] Application started
```

### @inject.getter() Decorator

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

// Bind configuration
context.bind('config.database').to({
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'secret'
});

context.bind('services.ConfigService').toClass(ConfigService);

// Resolve the service
const configService = await context.get<ConfigService>('services.ConfigService');
await configService.connectToDatabase(); // Output: Connecting to localhost:5432
```

### @inject.view() Decorator

```typescript
@injectable()
class Plugin {
  constructor(public name: string) {}
  
  initialize() {
    console.log(`Plugin ${this.name} initialized`);
  }
}

@injectable()
class PluginManager {
  constructor(
    @inject.view(binding => binding.tags.has('plugin'))
    private pluginView: ContextView<Plugin>
  ) {}
  
  async initializePlugins() {
    const plugins = await this.pluginView.resolve();
    plugins.forEach(plugin => plugin.initialize());
  }
}

// Bind plugins and manager
context.bind('plugins.logger').to(new Plugin('logger')).tag('plugin');
context.bind('plugins.auth').to(new Plugin('auth')).tag('plugin');
context.bind('plugins.cache').to(new Plugin('cache')).tag('plugin');
context.bind('managers.PluginManager').toClass(PluginManager);

// Resolve manager and initialize plugins
const pluginManager = await context.get<PluginManager>('managers.PluginManager');
await pluginManager.initializePlugins();
// Output:
// Plugin logger initialized
// Plugin auth initialized
// Plugin cache initialized
```

### @config() Decorator

```typescript
@injectable()
class DatabaseService {
  constructor(
    @config('database.host') private host: string,
    @config('database.port') private port: number
  ) {}
  
  connect() {
    console.log(`Connecting to database at ${this.host}:${this.port}`);
  }
}

// Bind configuration
context.configure('services.DatabaseService').to({
  database: {
    host: 'localhost',
    port: 5432
  }
});

context.bind('services.DatabaseService').toClass(DatabaseService);

// Resolve the service
const dbService = await context.get<DatabaseService>('services.DatabaseService');
dbService.connect(); // Output: Connecting to database at localhost:5432
```

### @intercept() Decorator

```typescript
// Define an interceptor
class LoggingInterceptor implements Interceptor {
  intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<any>) {
    console.log(`Calling ${invocationCtx.methodName} with args:`, invocationCtx.args);
    const start = Date.now();
    const result = next();
    
    if (result instanceof Promise) {
      return result.then(value => {
        console.log(`${invocationCtx.methodName} completed in ${Date.now() - start}ms`);
        return value;
      });
    }
    
    console.log(`${invocationCtx.methodName} completed in ${Date.now() - start}ms`);
    return result;
  }
}

// Use the interceptor
@injectable()
class UserService {
  @intercept(new LoggingInterceptor())
  async findUsers() {
    // Simulate database query
    await new Promise(resolve => setTimeout(resolve, 100));
    return ['user1', 'user2', 'user3'];
  }
}

// Bind the service
context.bind('services.UserService').toClass(UserService);

// Resolve the service and call the method
const userService = await context.get<UserService>('services.UserService');
const users = await userService.findUsers();
// Output:
// Calling findUsers with args: []
// findUsers completed in 100ms
```

## Interface Examples

### Provider Interface

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

### Interceptor Interface

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

// Bind the service
context.bind('services.ExpensiveService').toClass(ExpensiveService);

// Resolve the service and call the method
const expensiveService = await context.get<ExpensiveService>('services.ExpensiveService');

// First call (cache miss)
let result1 = await expensiveService.computeExpensiveValue('test');
console.log(result1); // Output: Result for test

// Second call (cache hit)
let result2 = await expensiveService.computeExpensiveValue('test');
console.log(result2); // Output: Result for test
```

### ContextObserver Interface

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

## More Examples

For more examples, see the [Examples](../examples/basic-example.md) section or check out the example code in the [GitHub repository](https://github.com/teomyth/contexify).
