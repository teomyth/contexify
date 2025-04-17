---
sidebar_position: 2
---

# Binding

## What is a Binding?

A Binding is a connection between a key and a value in the Context. It's the fundamental building block of the dependency injection system in Contexify.

Bindings allow you to:

- Register values, classes, or factory functions in the Context
- Control the lifecycle of dependencies
- Tag bindings for discovery and grouping
- Configure how dependencies are resolved

## Binding Keys

Binding keys are unique identifiers used to look up values in the Context. They are typically strings that follow a naming convention.

```typescript
import { Context } from 'contexify';

const context = new Context();

// Using a simple string as a binding key
context.bind('greeting').to('Hello, world!');

// Using a namespaced key (recommended)
context.bind('services.UserService').toClass(UserService);
```

### Naming Conventions

It's recommended to use a consistent naming convention for binding keys. Here are some common patterns:

- `{namespace}.{name}`: Use namespace and name (e.g., `services.UserService`)
- Use plural forms for namespaces (e.g., `services`, `repositories`, `controllers`)
- For configurations, use `config.{component}` (e.g., `config.api`)

## Binding Types

Contexify supports several types of bindings:

### Value Binding

Bind a constant value to a key.

```typescript
// Bind a string
context.bind('greeting').to('Hello, world!');

// Bind a number
context.bind('config.port').to(3000);

// Bind an object
context.bind('config.database').to({
  host: 'localhost',
  port: 5432,
  username: 'admin'
});
```

### Class Binding

Bind a class constructor to a key. The class will be instantiated when the binding is resolved.

```typescript
import { Context, injectable } from 'contexify';

@injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2'];
  }
}

const context = new Context();
context.bind('services.UserService').toClass(UserService);

// Later, when resolved
const userService = await context.get('services.UserService');
console.log(userService.getUsers()); // ['user1', 'user2']
```

### Factory Function Binding

Bind a factory function that creates the value when the binding is resolved.

```typescript
context.bind('services.DbConnection').toDynamicValue(() => {
  // This function is called when the binding is resolved
  return createDbConnection();
});
```

### Provider Binding

Bind a provider class that creates the value when the binding is resolved.

```typescript
import { Context, Provider, injectable } from 'contexify';

@injectable()
class DbConnectionProvider implements Provider<DbConnection> {
  constructor(@inject('config.database') private config: DbConfig) {}

  value() {
    // This method is called when the binding is resolved
    return createDbConnection(this.config);
  }
}

context.bind('services.DbConnection').toProvider(DbConnectionProvider);
```

## Binding Scopes

Binding scopes control the lifecycle of the resolved values.

```typescript
import { Context, BindingScope } from 'contexify';

const context = new Context();

// Singleton: One instance for the entire application
context
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// Transient: New instance each time it's resolved
context
  .bind('services.RequestHandler')
  .toClass(RequestHandler)
  .inScope(BindingScope.TRANSIENT);

// Context: One instance per context
context
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

### Scope Guidelines

- **SINGLETON**: For services with shared state (configurations, database connections)
- **TRANSIENT**: For components that need a new instance each time they're used
- **CONTEXT**: For components shared within a specific context

## Binding Tags

Tags allow you to categorize and discover bindings.

```typescript
import { Context } from 'contexify';

const context = new Context();

// Add tags to a binding
context
  .bind('controllers.UserController')
  .toClass(UserController)
  .tag('controller', 'rest');

// Find bindings by tag
async function findControllers() {
  const controllerBindings = await context.findByTag('controller');
  return controllerBindings;
}
```

## Binding Configuration

You can configure bindings with additional metadata.

```typescript
import { Context } from 'contexify';

const context = new Context();

// Configure a binding
context
  .bind('services.EmailService')
  .toClass(EmailService)
  .tag('service')
  .inScope(BindingScope.SINGLETON)
  .configure(binding => {
    binding.description = 'Email service for sending notifications';
  });
```

## Creating and Managing Bindings

### Adding Bindings

```typescript
import { Context, Binding } from 'contexify';

const context = new Context();

// Using the bind method
context.bind('greeting').to('Hello, world!');

// Creating a binding first and then adding it
const binding = Binding.create('services.UserService')
  .toClass(UserService)
  .tag('service');

context.add(binding);
```

### Removing Bindings

```typescript
// Remove a binding
context.unbind('greeting');
```

### Checking if a Binding Exists

```typescript
// Check if a binding exists
const exists = context.contains('greeting');
console.log(exists); // true or false
```

### Finding Bindings

```typescript
// Find bindings by tag
const serviceBindings = await context.findByTag('service');

// Find bindings by key pattern
const userBindings = await context.find(/^services\.User/);
```

## Next Steps

Now that you understand Bindings, you can learn about:

- [Dependency Injection](./dependency-injection) - How to inject dependencies into your classes
- [Context](./context) - The container for bindings
- [API Reference](../api) - View the detailed API documentation
