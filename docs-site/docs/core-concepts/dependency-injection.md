---
sidebar_position: 3
---

# Dependency Injection

## What is Dependency Injection?

Dependency Injection (DI) is a design pattern that allows you to inject dependencies into your classes rather than creating them inside the class. This makes your code more modular, testable, and maintainable.

In Contexify, dependency injection is implemented through the Context system and decorators.

## Benefits of Dependency Injection

- **Decoupling**: Classes don't need to know how to create their dependencies
- **Testability**: Dependencies can be easily mocked for testing
- **Flexibility**: Dependencies can be changed without modifying the class
- **Reusability**: Classes can be reused with different dependencies

## Basic Dependency Injection

The most common form of dependency injection is constructor injection, where dependencies are provided through the constructor.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserService {
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

In this example:
- `@injectable()` marks the class as injectable, allowing Contexify to create instances of it
- `@inject('repositories.UserRepository')` tells Contexify to inject the dependency with the key 'repositories.UserRepository'

## Injection Decorators

Contexify provides several decorators for dependency injection:

### @injectable()

Marks a class as injectable, allowing Contexify to create instances of it.

```typescript
import { injectable } from 'contexify';

@injectable()
class UserService {
  // ...
}
```

### @inject()

Injects a dependency by its binding key.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService
  ) {}
}
```

### @inject.tag()

Injects all dependencies that match a specific tag.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class PluginManager {
  constructor(
    @inject.tag('plugin') private plugins: Plugin[]
  ) {}
}
```

### @inject.getter()

Injects a function that can be used to get the dependency later.

```typescript
import { injectable, inject, Getter } from 'contexify';

@injectable()
class UserController {
  constructor(
    @inject.getter('services.UserService') private getUserService: Getter<UserService>
  ) {}

  async getUsers() {
    // Get the service when needed
    const userService = await this.getUserService();
    return userService.getUsers();
  }
}
```

### @inject.view()

Injects a ContextView that tracks bindings matching a filter.

```typescript
import { injectable, inject, ContextView } from 'contexify';

@injectable()
class PluginManager {
  constructor(
    @inject.view(binding => binding.tagMap.plugin != null)
    private pluginsView: ContextView<Plugin>
  ) {}

  async getPlugins() {
    return this.pluginsView.values();
  }
}
```

### @config()

Injects configuration for the current binding.

```typescript
import { injectable, config } from 'contexify';

@injectable()
class EmailService {
  constructor(
    @config() private config: EmailConfig = {}
  ) {}
}
```

## Property Injection

In addition to constructor injection, Contexify also supports property injection.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  @inject('services.UserService')
  private userService: UserService;

  async getUsers() {
    return this.userService.getUsers();
  }
}
```

## Method Injection

Contexify also supports method injection.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserController {
  async getUsers(
    @inject('services.UserService') userService: UserService
  ) {
    return userService.getUsers();
  }
}
```

## Optional Dependencies

You can mark dependencies as optional, which means they won't cause an error if they're not found.

```typescript
import { injectable, inject } from 'contexify';

@injectable()
class UserService {
  constructor(
    @inject('services.Logger', { optional: true }) private logger?: Logger
  ) {}

  async createUser(userData: UserData) {
    if (this.logger) {
      this.logger.log('Creating user');
    }
    // ...
  }
}
```

## Circular Dependencies

Circular dependencies occur when two or more classes depend on each other. Contexify provides ways to handle circular dependencies using `@inject.getter()`.

```typescript
import { injectable, inject, Getter } from 'contexify';

@injectable()
class ServiceA {
  constructor(
    @inject.getter('services.ServiceB') private getServiceB: Getter<ServiceB>
  ) {}

  async doSomething() {
    const serviceB = await this.getServiceB();
    return serviceB.doSomethingElse();
  }
}

@injectable()
class ServiceB {
  constructor(
    @inject.getter('services.ServiceA') private getServiceA: Getter<ServiceA>
  ) {}

  async doSomethingElse() {
    const serviceA = await this.getServiceA();
    return serviceA.doSomething();
  }
}
```

## Best Practices

- Use constructor injection for required dependencies
- Use property injection for optional dependencies
- Use `@inject.getter()` for circular dependencies
- Use meaningful binding keys that follow a consistent naming convention
- Keep your classes focused and with a single responsibility
- Use interfaces for dependencies to make your code more testable

## Next Steps

Now that you understand Dependency Injection, you can learn about:

- [Context](./context) - The container for dependencies
- [Binding](./binding) - How to register dependencies
- [API Reference](../api) - View the detailed API documentation
