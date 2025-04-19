---
sidebar_position: 4
---

# Decorators

Contexify provides a set of decorators that make it easy to work with dependency injection in TypeScript.

## @injectable()

Marks a class as injectable, allowing Contexify to create instances of it.

**Syntax:**
```typescript
function injectable(): ClassDecorator;
```

**Example:**
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

## @inject()

Injects a dependency by its binding key.

**Syntax:**
```typescript
function inject(
  bindingKey: string,
  options?: InjectionOptions
): ParameterDecorator & PropertyDecorator;
```

**Parameters:**
- `bindingKey`: The key of the binding to inject.
- `options` (optional): Options for the injection.

**Example:**
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

**Property Injection Example:**
```typescript
@injectable()
class UserService {
  @inject('repositories.UserRepository')
  private userRepo: UserRepository;

  getUsers() {
    return this.userRepo.findAll();
  }
}
```

## @inject.tag()

Injects all dependencies that match a specific tag.

**Syntax:**
```typescript
namespace inject {
  function tag(
    tag: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

**Parameters:**
- `tag`: The tag to match.
- `options` (optional): Options for the injection.

**Example:**
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
context.bind('loggers.console').to(new Logger('console')).tag('logger');
context.bind('loggers.file').to(new Logger('file')).tag('logger');
context.bind('app').toClass(Application);

// Resolve the application (all services with the 'logger' tag are automatically injected)
const app = await context.get<Application>('app');
app.run();
// Output:
// [console] Application started
// [file] Application started
```

## @inject.getter()

Injects a function that can be used to get the dependency later.

**Syntax:**
```typescript
namespace inject {
  function getter(
    bindingKey: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

**Parameters:**
- `bindingKey`: The key of the binding to inject.
- `options` (optional): Options for the injection.

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

## @inject.view()

Injects a ContextView that tracks bindings matching a filter.

**Syntax:**
```typescript
namespace inject {
  function view(
    filter: BindingFilter,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

**Parameters:**
- `filter`: A function that filters bindings.
- `options` (optional): Options for the injection.

**Example:**
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

## @config()

Injects configuration for the current binding.

**Syntax:**
```typescript
function config(
  propertyPath?: string | ConfigurationOptions
): ParameterDecorator & PropertyDecorator;
```

**Parameters:**
- `propertyPath` (optional): The path to the configuration property, or configuration options.

**Example:**
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

## @intercept()

Applies interceptors to a method or class.

**Syntax:**
```typescript
function intercept(
  ...interceptors: (Interceptor | Constructor<Interceptor>)[]
): MethodDecorator & ClassDecorator;
```

**Parameters:**
- `interceptors`: One or more interceptors to apply.

**Example:**
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

**Class-level Interceptor Example:**
```typescript
// Apply interceptor to all methods in the class
@injectable()
@intercept(new LoggingInterceptor())
class UserService {
  async findUsers() {
    // ...
  }

  async createUser(name: string) {
    // ...
  }
}
```

## Complete Example

Here's a complete example showing how to use the decorators together:

```typescript
import {
  Context,
  injectable,
  inject,
  config,
  intercept,
  Interceptor,
  InvocationContext,
  ValueOrPromise
} from 'contexify';

// Define an interceptor
class LoggingInterceptor implements Interceptor {
  intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<any>) {
    console.log(`Calling ${invocationCtx.methodName}`);
    const result = next();
    console.log(`${invocationCtx.methodName} completed`);
    return result;
  }
}

// Define a configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

// Define a repository
@injectable()
class UserRepository {
  constructor(
    @config('database') private dbConfig: DatabaseConfig,
    @inject('services.LoggerService') private logger: LoggerService
  ) {}

  findAll() {
    this.logger.log(`Finding all users using ${this.dbConfig.host}:${this.dbConfig.port}`);
    return ['user1', 'user2', 'user3'];
  }
}

// Define a logger service
@injectable()
class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Define a user service
@injectable()
@intercept(new LoggingInterceptor())
class UserService {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository,
    @inject.getter('config.appName') private getAppName: Getter<string>
  ) {}

  async getUsers() {
    const appName = await this.getAppName();
    console.log(`Getting users for ${appName}`);
    return this.userRepo.findAll();
  }
}

// Create a context
const context = new Context('application');

// Bind services and configuration
context.bind('services.LoggerService').toClass(LoggerService);
context.bind('repositories.UserRepository').toClass(UserRepository);
context.bind('services.UserService').toClass(UserService);

context.bind('config.appName').to('MyApp');
context.configure('repositories.UserRepository').to({
  database: {
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'secret'
  }
});

// Use the services
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const users = await userService.getUsers();
  console.log('Users:', users);
}

run().catch(err => console.error(err));
```
