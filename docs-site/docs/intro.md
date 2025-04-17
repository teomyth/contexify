---
sidebar_position: 1
---

# Getting Started

Welcome to **Contexify**, a powerful TypeScript dependency injection container with context-based IoC capabilities.

## Installation

Install Contexify using your favorite package manager:

```bash
# Using npm
npm install contexify

# Using yarn
yarn add contexify

# Using pnpm
pnpm add contexify
```

## Basic Usage

Here's a simple example demonstrating the basic usage of Contexify:

```typescript
import { Context, injectable, inject } from 'contexify';

// Create a context
const context = new Context('application');

// Define a service
@injectable()
class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Define a service that depends on the logger
@injectable()
class UserService {
  constructor(@inject('services.LoggerService') private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Bind the services to the context
context.bind('services.LoggerService').toClass(LoggerService);
context.bind('services.UserService').toClass(UserService);

// Use the services
async function run() {
  // Resolve the UserService from the context
  const userService = await context.get<UserService>('services.UserService');

  // Create a user
  const user = userService.createUser('John');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## Core Concepts

### Context

Context is the core of Contexify. It serves as a registry for dependencies, allowing you to manage all dependencies in your application.

```typescript
// Create a root context
const rootContext = new Context('root');

// Create a child context
const childContext = new Context(rootContext, 'child');
```

### Binding

Bindings connect keys to values, classes, or factory functions.

```typescript
// Bind a value
context.bind('config.port').to(3000);

// Bind a class
context.bind('services.UserService').toClass(UserService);

// Bind a factory function
context.bind('services.DbConnection').toDynamicValue(() => {
  return createDbConnection();
});
```

### Dependency Injection

Contexify supports constructor injection using the `@inject` decorator.

```typescript
@injectable()
class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService,
    @inject('config.apiKey') private apiKey: string
  ) {}

  async getUser(id: string) {
    // Use the injected dependencies
    return this.userService.findById(id);
  }
}
```

## Next Steps

Now that you have a basic understanding of Contexify, you can explore more advanced features:

- [Core Concepts](./category/core-concepts) - Learn about the fundamental concepts of Contexify
- [API Reference](./api) - View the detailed API documentation
- [Examples](./category/examples) - See examples of Contexify in action
