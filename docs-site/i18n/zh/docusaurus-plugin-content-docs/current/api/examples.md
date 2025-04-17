---
sidebar_position: 2
---

# API 使用示例

本节提供 Contexify API 的使用示例，帮助您更好地理解如何在实际应用中使用这些 API。

## Context 类示例

### 创建上下文

```typescript
// 创建一个根上下文
const rootContext = new Context('root');

// 创建一个子上下文
const childContext = new Context(rootContext, 'child');
```

### 绑定和解析值

```typescript
// 绑定一个简单的值
context.bind('greeting').to('Hello, world!');

// 异步解析值
const greeting = await context.get<string>('greeting');
console.log(greeting); // 输出: Hello, world!

// 同步解析值（如果可能）
const greetingSync = context.getSync<string>('greeting');
console.log(greetingSync); // 输出: Hello, world!
```

### 绑定类

```typescript
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

// 绑定类
context.bind('services.GreetingService').toClass(GreetingService);

// 解析类实例
const greetingService = await context.get<GreetingService>('services.GreetingService');
console.log(greetingService.sayHello('John')); // 输出: Hello, John!
```

### 使用动态值

```typescript
// 绑定动态值
context.bind('currentTime').toDynamicValue(() => new Date().toISOString());

// 每次解析都会获取新的值
const time1 = await context.get<string>('currentTime');
// 等待一段时间
const time2 = await context.get<string>('currentTime');
console.log(time1 !== time2); // 输出: true
```

### 使用提供者

```typescript
@injectable()
class TimeProvider implements Provider<string> {
  value() {
    return new Date().toISOString();
  }
}

// 绑定提供者
context.bind('currentTime').toProvider(TimeProvider);

// 解析值
const time = await context.get<string>('currentTime');
console.log(time); // 输出当前时间
```

### 使用别名

```typescript
// 绑定一个值
context.bind('config.apiUrl').to('https://api.example.com');

// 创建别名
context.bind('apiUrl').toAlias('config.apiUrl');

// 通过别名解析
const apiUrl = await context.get<string>('apiUrl');
console.log(apiUrl); // 输出: https://api.example.com
```

### 设置绑定作用域

```typescript
// 单例作用域（默认）
context.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);

// 瞬态作用域（每次解析创建新实例）
context.bind('transient').toDynamicValue(() => new Date()).inScope(BindingScope.TRANSIENT);

// 上下文作用域（在同一上下文中共享实例）
context.bind('contextScoped').toDynamicValue(() => new Date()).inScope(BindingScope.CONTEXT);
```

### 使用标签

```typescript
// 添加标签
context.bind('service.user').toClass(UserService).tag('service');
context.bind('service.order').toClass(OrderService).tag('service');
context.bind('service.payment').toClass(PaymentService).tag('service');

// 通过标签查找绑定
const serviceBindings = await context.findByTag('service');
console.log(serviceBindings.length); // 输出: 3
```

### 使用上下文视图

```typescript
// 创建一个视图，跟踪所有带有 'service' 标签的绑定
const serviceView = context.createView<any>(binding => binding.tags.has('service'));

// 获取所有匹配的绑定
const bindings = serviceView.bindings();
console.log(bindings.length); // 输出: 3

// 解析所有匹配的值
const services = await serviceView.resolve();
console.log(services.length); // 输出: 3
```

## 装饰器示例

### @injectable() 装饰器

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

// 现在可以通过 Context 创建 UserService 实例
context.bind('services.UserService').toClass(UserService);
const userService = await context.get<UserService>('services.UserService');
```

### @inject() 装饰器

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

// 绑定依赖
context.bind('repositories.UserRepository').toClass(UserRepository);
context.bind('services.UserService').toClass(UserService);

// 解析 UserService（自动注入 UserRepository）
const userService = await context.get<UserService>('services.UserService');
console.log(userService.getUsers()); // 输出: ['user1', 'user2', 'user3']
```

### @inject.tag() 装饰器

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

// 绑定多个带有相同标签的服务
context.bind('loggers.console').toClass(Logger).tag('logger').to(new Logger('console'));
context.bind('loggers.file').toClass(Logger).tag('logger').to(new Logger('file'));
context.bind('app').toClass(Application);

// 解析应用（自动注入所有带有 'logger' 标签的服务）
const app = await context.get<Application>('app');
app.run();
// 输出:
// [console] Application started
// [file] Application started
```

### @inject.getter() 装饰器

```typescript
@injectable()
class ConfigService {
  constructor(@inject.getter('config.database') private getDbConfig: Getter<any>) {}
  
  async connectToDatabase() {
    // 只在需要时获取配置
    const dbConfig = await this.getDbConfig();
    console.log(`Connecting to ${dbConfig.host}:${dbConfig.port}`);
  }
}

// 绑定配置
context.bind('config.database').to({
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'secret'
});

context.bind('services.ConfigService').toClass(ConfigService);

// 解析服务
const configService = await context.get<ConfigService>('services.ConfigService');
await configService.connectToDatabase(); // 输出: Connecting to localhost:5432
```

### @inject.view() 装饰器

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

// 绑定插件和管理器
context.bind('plugins.logger').to(new Plugin('logger')).tag('plugin');
context.bind('plugins.auth').to(new Plugin('auth')).tag('plugin');
context.bind('plugins.cache').to(new Plugin('cache')).tag('plugin');
context.bind('managers.PluginManager').toClass(PluginManager);

// 解析管理器并初始化插件
const pluginManager = await context.get<PluginManager>('managers.PluginManager');
await pluginManager.initializePlugins();
// 输出:
// Plugin logger initialized
// Plugin auth initialized
// Plugin cache initialized
```

### @config() 装饰器

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

// 绑定配置
context.configure('services.DatabaseService').to({
  database: {
    host: 'localhost',
    port: 5432
  }
});

context.bind('services.DatabaseService').toClass(DatabaseService);

// 解析服务
const dbService = await context.get<DatabaseService>('services.DatabaseService');
dbService.connect(); // 输出: Connecting to database at localhost:5432
```

### @intercept() 装饰器

```typescript
// 定义一个拦截器
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

// 使用拦截器
@injectable()
class UserService {
  @intercept(new LoggingInterceptor())
  async findUsers() {
    // 模拟数据库查询
    await new Promise(resolve => setTimeout(resolve, 100));
    return ['user1', 'user2', 'user3'];
  }
}

// 绑定服务
context.bind('services.UserService').toClass(UserService);

// 解析服务并调用方法
const userService = await context.get<UserService>('services.UserService');
const users = await userService.findUsers();
// 输出:
// Calling findUsers with args: []
// findUsers completed in 100ms
```

## 接口示例

### Provider 接口

```typescript
@injectable()
class RandomNumberProvider implements Provider<number> {
  value() {
    return Math.random();
  }
}

// 绑定提供者
context.bind('random').toProvider(RandomNumberProvider);

// 解析值
const random1 = await context.get<number>('random');
const random2 = await context.get<number>('random');
console.log(random1 !== random2); // 输出: true
```

### Interceptor 接口

```typescript
// 定义一个缓存拦截器
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

// 使用缓存拦截器
@injectable()
class ExpensiveService {
  @intercept(new CachingInterceptor())
  async computeExpensiveValue(input: string) {
    console.log(`Computing expensive value for ${input}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Result for ${input}`;
  }
}

// 绑定服务
context.bind('services.ExpensiveService').toClass(ExpensiveService);

// 解析服务并调用方法
const expensiveService = await context.get<ExpensiveService>('services.ExpensiveService');

// 第一次调用（缓存未命中）
let result1 = await expensiveService.computeExpensiveValue('test');
console.log(result1); // 输出: Result for test

// 第二次调用（缓存命中）
let result2 = await expensiveService.computeExpensiveValue('test');
console.log(result2); // 输出: Result for test
```

### ContextObserver 接口

```typescript
// 定义一个观察者
class BindingObserver implements ContextObserver {
  // 只观察带有 'service' 标签的绑定
  filter = (binding: Readonly<Binding<unknown>>) => binding.tags.has('service');
  
  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context) {
    console.log(`Event: ${eventType}, Binding: ${binding.key}`);
  }
}

// 创建上下文并订阅观察者
const context = new Context('app');
context.subscribe(new BindingObserver());

// 添加绑定（会触发观察者）
context.bind('services.UserService').toClass(UserService).tag('service');
// 输出: Event: bind, Binding: services.UserService

// 解析绑定（会触发观察者）
await context.get('services.UserService');
// 输出: Event: resolve:before, Binding: services.UserService
// 输出: Event: resolve:after, Binding: services.UserService
```

## 更多示例

有关更多示例，请参阅 [示例](../examples/basic-example.md) 部分或查看 [GitHub 仓库](https://github.com/teomyth/contexify) 中的示例代码。
