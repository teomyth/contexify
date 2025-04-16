---
sidebar_position: 1
---

# Basic Example

This example demonstrates the basic usage of Contexify, including creating a context, binding services, and using dependency injection.

## Complete Example

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

## Step-by-Step Explanation

### 1. Define Interfaces

First, we define interfaces for our services:

```typescript
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
```

Defining interfaces helps with loose coupling and better testability.

### 2. Implement Services

Next, we implement our services:

```typescript
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
```

Note:
- The `@injectable()` decorator marks the class as injectable
- The `@inject('services.Logger')` decorator injects the Logger service

### 3. Create a Context

Then, we create a context:

```typescript
const context = new Context('application');
```

### 4. Bind Services

We bind our services to the context:

```typescript
context.bind('services.Logger').toClass(ConsoleLogger);
context.bind('services.UserService').toClass(DefaultUserService);
```

### 5. Use Services

Finally, we get the service from the context and use it:

```typescript
async function run() {
  const userService = await context.get<UserService>('services.UserService');
  const user = await userService.createUser('John Doe');
  console.log('Created user:', user);
}

run().catch(err => console.error(err));
```

## Key Points

- **Dependency Injection**: `UserService` depends on `Logger` through constructor injection
- **Inversion of Control**: The creation and lifecycle of services are managed by the Context
- **Loose Coupling**: Services interact through interfaces rather than concrete implementations

## Next Steps

Check out more advanced examples:

- [Modular Application](./modular-app)
- [Interceptors](./interceptors)
- [Observers and Events](./observers)
