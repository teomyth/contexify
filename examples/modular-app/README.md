# Modular Application Example

This example application demonstrates how to build modular and extensible applications using the Context system of the Contexify framework.

## Overview

This example implements a simple task management system that showcases the following concepts:

1. Using Context as the application core
2. Implementing modular design through components
3. Managing dependencies using dependency injection
4. Implementing cross-cutting concerns with interceptors
5. Monitoring binding changes with the observer pattern

## Project Structure

```
modular-app/
├── src/
│   ├── application.ts         # Application class
│   ├── components/            # Components
│   │   ├── core/              # Core component
│   │   │   ├── index.ts
│   │   │   ├── keys.ts        # Binding keys
│   │   │   └── services/      # Core services
│   │   └── task/              # Task component
│   │       ├── index.ts
│   │       ├── keys.ts        # Binding keys
│   │       ├── models/        # Task models
│   │       └── services/      # Task services
│   ├── interceptors/          # Interceptors
│   ├── observers/             # Observers
│   └── index.ts               # Entry file
└── README.md                  # Documentation
```

## Key Concepts

### Application Class

The `Application` class extends `Context` and serves as the core of the application. It is responsible for:

- Registering components and services
- Managing application lifecycle
- Providing dependency injection container

### Components

Components are collections of related functionality, including:

- Service implementations
- Model definitions
- Binding configurations

Each component is added to the application through the `component()` method.

### Dependency Injection

Services have their dependencies injected through constructors:

```typescript
@injectable()
export class TaskService {
  constructor(
    @inject(CoreKeys.LOGGER) private logger: Logger,
    @inject(TaskKeys.TASK_REPOSITORY) private taskRepo: TaskRepository
  ) {}

  // ...
}
```

### Interceptors

Interceptors implement cross-cutting concerns such as logging, performance monitoring, etc.:

```typescript
@injectable()
export class LoggingInterceptor implements Interceptor {
  constructor(@inject(CoreKeys.LOGGER) private logger: Logger) {}

  async intercept(invocationCtx: InvocationContext, next: () => Promise<any>) {
    this.logger.info(
      `Calling: ${invocationCtx.targetName}.${invocationCtx.methodName}`
    );
    const start = Date.now();
    try {
      const result = await next();
      const duration = Date.now() - start;
      this.logger.info(
        `Completed: ${invocationCtx.targetName}.${invocationCtx.methodName} in ${duration}ms`
      );
      return result;
    } catch (err) {
      this.logger.error(
        `Failed: ${invocationCtx.targetName}.${invocationCtx.methodName}`,
        err
      );
      throw err;
    }
  }
}
```

### Observers

Observers are used to monitor binding changes:

```typescript
export class ServiceObserver implements ContextObserver {
  constructor(@inject(CoreKeys.LOGGER) private logger: Logger) {}

  filter = (binding) => binding.tagMap.service != null;

  observe(event: string, binding: Binding) {
    if (event === 'bind') {
      this.logger.info(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      this.logger.info(`Service unregistered: ${binding.key}`);
    }
  }
}
```

## Running the Example

1. Install dependencies:

   ```
   pnpm install
   ```

2. Build the project:

   ```
   pnpm build
   ```

3. Run the example:
   ```
   pnpm start
   ```

## Learning Points

Through this example, you can learn:

1. How to use Context as the application core
2. How to implement modular design through components
3. How to manage dependencies using dependency injection
4. How to implement cross-cutting concerns with interceptors
5. How to monitor binding changes with the observer pattern

These patterns and practices can help you build more modular, testable, and maintainable applications.
