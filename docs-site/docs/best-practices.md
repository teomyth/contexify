---
sidebar_position: 4
---

# Best Practices

This document provides best practices for using the Context system in the Contexify framework, referencing design concepts and practical experience from the LoopBack framework.

## Context Usage Patterns

When using Context, there are several common patterns. Below is an analysis of these patterns and recommended best practices.

### Not Recommended: Global Context Object

```typescript
// Not recommended pattern
const globalContext = new Context();
globalContext.bind('service').toClass(MyService);

// Anywhere in the application
const service = globalContext.getSync('service');
service.doSomething();
```

**Problems**:

- Creates global state, making it difficult to test and manage
- Hides dependencies, making code harder to understand and maintain
- Cannot easily replace or mock dependencies for testing

### Not Recommended: Context as a Parameter

```typescript
// Not recommended pattern
function doSomething(context: Context) {
  const service = context.getSync('service');
  service.doSomething();
}
```

**Problems**:

- Still hides the actual dependencies
- Makes the function dependent on the Context API rather than the services it actually needs
- Difficult to test because you need to create and configure a Context

### Recommended: Extending Context to Create a Domain-Specific Application Core

```typescript
// Recommended pattern
export class MyApplication extends Context {
  constructor() {
    super('application');
    this.bind('service').toClass(MyService);
  }
}

// Using the application class
const app = new MyApplication();
app.start();
```

**Benefits**:

- The application itself is a Context, providing clear architectural boundaries
- Components can get their dependencies through dependency injection
- Easy to test because dependencies can be mocked or replaced
- Supports modular design and extensibility

## Application Architecture

### Application Class Extending Context

Create an application class that extends Context as the core of your application:

```typescript
import { Context, injectable } from 'contexify';

export class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Register core services
    this.bind('logger').toClass(Logger);

    // Add components
    this.component(AuthComponent);
    this.component(ApiComponent);

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  async start() {
    // Start the application
    console.log('Application starting...');
    // Startup logic...
  }

  async stop() {
    // Stop the application
    console.log('Application stopping...');
    // Cleanup logic...
    this.close(); // Close the Context
  }
}
```

### Components and Modular Design

Components are collections of related bindings used to extend application functionality:

```typescript
import { injectable, Binding } from 'contexify';

export interface Component {
  bindings?: Binding[];
  providers?: Constructor<Provider<unknown>>[];
}

@injectable()
export class AuthComponent implements Component {
  bindings = [
    createBindingFromClass(AuthService),
    createBindingFromClass(TokenService),
  ];
}
```

Using components allows you to:

- Group related functionality together
- Promote modular design
- Support a pluggable architecture
- Simplify dependency management

### Lifecycle Management

Your application should manage the lifecycle of components and services:

```typescript
export class MyApplication extends Context {
  // ...

  async start() {
    // Get all services that need initialization
    const initializers = await this.findByTag('initializer');

    // Initialize in sequence
    for (const initializer of initializers) {
      const service = await this.get(initializer.key);
      await service.initialize();
    }

    console.log('Application started');
  }

  async stop() {
    // Get all services that need cleanup
    const cleaners = await this.findByTag('cleaner');

    // Clean up in sequence
    for (const cleaner of cleaners) {
      const service = await this.get(cleaner.key);
      await service.cleanup();
    }

    this.close();
    console.log('Application stopped');
  }
}
```

## Dependency Injection Best Practices

### Use Decorators for Dependency Injection

It's recommended to use decorators for dependency injection instead of directly retrieving dependencies from the Context:

```typescript
import { inject, injectable } from 'contexify';

@injectable()
export class UserController {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository,
    @inject('services.EmailService') private emailService: EmailService
  ) {}

  async createUser(userData: UserData) {
    const user = await this.userRepo.create(userData);
    await this.emailService.sendWelcomeEmail(user);
    return user;
  }
}
```

Benefits:

- Dependencies are explicit and visible
- Easy to test, as dependencies can be mocked
- Code is cleaner and more maintainable

### Binding Key Naming Conventions

Use consistent naming conventions to organize binding keys:

```typescript
// Services
app.bind('services.EmailService').toClass(EmailService);

// Repositories
app.bind('repositories.UserRepository').toClass(UserRepository);

// Controllers
app.bind('controllers.UserController').toClass(UserController);

// Configuration
app.bind('config.api').to({
  port: 3000,
  host: 'localhost',
});
```

Recommended naming patterns:

- `{namespace}.{name}`: Use namespace and name
- Use plural forms for namespaces (services, repositories, controllers)
- For configurations, use `config.{component}`

### Scope Management

Choose appropriate scopes based on the nature of the component:

```typescript
import { BindingScope } from 'contexify';

// Singleton service
app
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// One instance per request
app
  .bind('controllers.RequestController')
  .toClass(RequestController)
  .inScope(BindingScope.TRANSIENT);

// Singleton in the current context
app
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

Scope guidelines:

- **SINGLETON**: For services with shared state (configurations, database connections)
- **TRANSIENT**: For components that need a new instance each time they're used
- **CONTEXT**: For components shared within a specific context

## Advanced Patterns

### Using Interceptors

Interceptors allow you to execute code before and after method calls:

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
export class UserService {
  @intercept(LogInterceptor)
  async createUser(userData: UserData) {
    // Logic to create a user
  }
}
```

Interceptor use cases:

- Logging
- Performance monitoring
- Error handling
- Transaction management
- Caching

### Using the Observer Pattern

Observe binding changes in the Context:

```typescript
import { ContextObserver } from 'contexify';

export class ServiceRegistry implements ContextObserver {
  // Only interested in bindings with 'service' tag
  filter = (binding) => binding.tagMap.service != null;

  observe(event: string, binding: Binding) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // Handle new service
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      // Clean up service
    }
  }
}

// Register the observer
app.subscribe(new ServiceRegistry());
```

Observer use cases:

- Dynamic service discovery and registration
- Monitoring binding changes
- Implementing plugin systems

### Configuration Management

Use Context's configuration capabilities to manage application configuration:

```typescript
// Register configuration
app.configure('services.EmailService').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});

// Use configuration in services
@injectable()
export class EmailService {
  constructor(@config() private config: EmailConfig) {}

  async sendEmail(options: EmailOptions) {
    // Access configuration via this.config
  }
}
```

Configuration best practices:

- Use `configure()` and `@config()` instead of hardcoding configuration keys
- Provide default values for configuration
- Support environment-specific configuration overrides

## Summary

Best practices for using Context as your application core:

1. **Application extends Context**: Let your application class extend Context to serve as a dependency injection container
2. **Use Components for Modularity**: Organize related functionality and bindings with components
3. **Dependency Injection over Direct Access**: Use `@inject` and other decorators to inject dependencies
4. **Consistent Naming Conventions**: Use consistent naming patterns for binding keys
5. **Appropriate Scope Management**: Choose suitable binding scopes based on component nature
6. **Leverage Advanced Features**: Use interceptors, observers, and configuration management to enhance your application

By following these best practices, you can build modular, testable, and maintainable applications that leverage the powerful capabilities of the Contexify framework.
