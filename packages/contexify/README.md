# Contexify

[![npm version](https://img.shields.io/npm/v/contexify.svg)](https://www.npmjs.com/package/contexify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/teomyth/contexify/actions/workflows/ci.yml/badge.svg)](https://github.com/teomyth/contexify/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/contexify.svg)](https://www.npmjs.com/package/contexify)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/node/v/contexify.svg)](https://nodejs.org/en/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/teomyth/contexify/pulls)

A TypeScript library providing a powerful dependency injection container with context-based IoC capabilities, inspired by LoopBack's Context system.

## Installation

```bash
# Using npm
npm install contexify

# Using yarn
yarn add contexify

# Using pnpm
pnpm add contexify
```

## Features

[![Bundle Size](https://img.shields.io/badge/Bundle%20Size-<10KB-success)](../../README.md#dependencies)
[![Dependencies](https://img.shields.io/badge/Dependencies-1-success)](../../README.md#dependencies)
[![Browser Compatible](https://img.shields.io/badge/Browser-Compatible-success)](../../README.md#dependencies)
[![Modular](https://img.shields.io/badge/Modular-Yes-success)](../../README.md#modular-usage)

- **Dependency Injection**: Inject dependencies into classes, properties, and methods
- **IoC Container**: Manage dependencies with a powerful inversion of control container
- **Binding System**: Bind values, classes, providers, and more to keys
- **Scoping**: Control the lifecycle of your dependencies with different scopes
- **Tagging**: Tag bindings for easy discovery and grouping
- **Interceptors**: Add cross-cutting concerns to your methods
- **Context Hierarchy**: Create parent-child relationships between contexts
- **Context Events**: Subscribe to binding events for dynamic behavior
- **Context Views**: Track and observe bindings matching specific criteria
- **Configuration by Convention**: Easily configure components with a consistent pattern
- Written in TypeScript
- ESM format
- Comprehensive test coverage
- Automated CI/CD workflow

## What is Context?

A Context is:

- An abstraction of all state and dependencies in your application
- A global registry for anything/everything in your app (all configs, state, dependencies, classes, etc.)
- An [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) container used to inject dependencies into your code

### Why is it important?

- You can use the context as a way to give your application more "info" so that other dependencies in your app may retrieve it. It works as a centralized place/global built-in/in-memory storage mechanism.
- Contexify can help "manage" your resources automatically (through Dependency Injection and decorators).
- You have full access to updated/real-time application and request state at all times.

## Context Hierarchy

Contextify's context system allows an unlimited amount of Context instances, each of which may have a parent Context.

An application typically has three "levels" of context:

1. **Application-level context (global)**

   - Stores all the initial and modified app states throughout the entire life of the app
   - Generally configured when the application is created

2. **Server-level context**

   - Is a child of application-level context
   - Holds configuration specific to a particular server instance

3. **Request-level context**
   - Dynamically created for each incoming server request
   - Extends the application level context to give you access to application-level dependencies during the request/response lifecycle
   - Can be garbage-collected once the response is sent for memory management

## Usage

### Creating a Context

```typescript
import { Context } from 'contexify';

// Create a new context without a parent
const rootCtx = new Context('root-ctx');

// Create a context with a parent
const serverCtx = new Context(rootCtx, 'server-ctx');

// Create a context with a parent but no explicit name (a unique ID will be generated)
const reqCtx = new Context(serverCtx);
```

### Binding Values

```typescript
// Bind a constant value
ctx.bind('greeting').to('Hello, World!');

// Bind a class
class GreetingService {
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}
ctx.bind('services.GreetingService').toClass(GreetingService);

// Bind a provider
class ConfigProvider implements Provider<{ appName: string }> {
  value() {
    return { appName: 'My App' };
  }
}
ctx.bind('config').toProvider(ConfigProvider);

// Bind a dynamic value
ctx.bind('timestamp').toDynamicValue(() => Date.now());

// Bind an alias
ctx.bind('currentConfig').toAlias('config');
```

### Resolving Values

```typescript
// Get a value
const greeting = await ctx.get('greeting');
console.log(greeting); // Hello, World!

// Get a value synchronously
const greetingSync = ctx.getSync('greeting');
console.log(greetingSync); // Hello, World!

// Get a value with a property path
const appName = await ctx.get('config#appName');
console.log(appName); // My App
```

### Dependency Injection

```typescript
import { inject, binding } from 'contexify';

@binding.bind({ tags: ['controller'] })
class GreetingController {
  constructor(
    @inject.constructor('services.GreetingService')
    private greetingService: GreetingService
  ) {}

  @inject.property('config')
  private config: { appName: string };

  @inject.context()
  private context: Context;

  welcome(name: string) {
    return `${this.config.appName}: ${this.greetingService.greet(name)}`;
  }
}

// Bind the controller
ctx.bind('controllers.GreetingController').toClass(GreetingController);

// Get the controller
const controller = await ctx.get('controllers.GreetingController');
console.log(controller.welcome('John')); // My App: Hello, John!
```

### Finding Bindings

```typescript
// Find bindings by tag
const controllers = ctx.findByTag('controller');

// Find bindings by key pattern
const services = ctx.find('services.*');

// Find bindings by custom filter
const bindings = ctx.find((binding) => binding.key.startsWith('services.'));
```

### Context Hierarchy

```typescript
// Create a parent context
const parent = new Context('parent');
parent.bind('parentValue').to('I am from parent');

// Create a child context
const child = new Context(parent, 'child');
child.bind('childValue').to('I am from child');

// Child can access parent bindings
console.log(await child.get('parentValue')); // I am from parent
console.log(await child.get('childValue')); // I am from child

// Parent cannot access child bindings
console.log(await parent.get('childValue', { optional: true })); // undefined
```

### Context Events

A Context instance can emit events when bindings are added or removed:

```typescript
// Listen for binding events
ctx.on('bind', (event) => {
  console.log(`Binding added: ${event.binding.key}`);
});

ctx.on('unbind', (event) => {
  console.log(`Binding removed: ${event.binding.key}`);
});

// Add a binding to trigger the event
ctx.bind('newService').toClass(NewService);
```

### Context Observers

Context observers provide a more powerful way to react to binding changes, with support for asynchronous operations:

```typescript
// Create an observer
const observer = {
  // Only observe bindings with the 'controller' tag
  filter: (binding) => binding.tagMap.controller != null,

  // Handle binding events
  observe: async (eventType, binding, context) => {
    if (eventType === 'bind') {
      console.log(`Controller added: ${binding.key}`);
      // Perform async operations...
    } else if (eventType === 'unbind') {
      console.log(`Controller removed: ${binding.key}`);
      // Perform async operations...
    }
  },
};

// Subscribe the observer to the context
ctx.subscribe(observer);
```

### Context Views

Context views allow you to track a dynamic set of bindings matching specific criteria:

```typescript
// Create a view of all controller bindings
const controllerFilter = (binding) => binding.tagMap.controller != null;
const controllersView = ctx.createView(controllerFilter);

// Get all controller instances
const controllers = await controllersView.values();

// The view automatically updates when bindings change
ctx.bind('controllers.NewController').toClass(NewController).tag('controller');

// Now includes the new controller
const updatedControllers = await controllersView.values();
```

### Configuration by Convention

Contextify provides a convention for configuring components:

```typescript
import { inject, config } from 'contexify';

class RestServer {
  constructor(
    // Inject configuration for this binding
    @config()
    private serverConfig: RestServerConfig = {}
  ) {
    // Use configuration...
    console.log(`Server port: ${serverConfig.port}`);
  }
}

// Bind the server
ctx.bind('servers.RestServer.server1').toClass(RestServer);

// Configure the server
ctx.configure('servers.RestServer.server1').to({
  port: 3000,
  protocol: 'https',
});

// You can have multiple instances with different configurations
ctx.bind('servers.RestServer.server2').toClass(RestServer);
ctx.configure('servers.RestServer.server2').to({
  port: 8080,
  protocol: 'http',
});
```

## Dependencies

Contextify is designed to be lightweight with carefully selected dependencies. We've chosen high-quality libraries that provide essential functionality while maintaining a small footprint:

| Dependency                                      | Size (min+gz) | Purpose                        | Dependencies         | Browser Compatible |
| ----------------------------------------------- | ------------- | ------------------------------ | -------------------- | ------------------ |
| [metarize](https://github.com/teomyth/metarize) | ~5.0 KB       | TypeScript metadata reflection | 1 (reflect-metadata) | ✓                  |

### Why These Dependencies?

We carefully evaluated each dependency against these criteria:

- **Size Impact**: All dependencies combined add less than 10KB minified+gzipped
- **Quality**: Well-tested, widely-used in production environments
- **Functionality**: Each provides essential features that would be complex to implement correctly

**metarize**: Handles TypeScript metadata reflection for decorators with minimal overhead, providing type-safe decorator APIs that would otherwise require significantly more code to implement.

## Development

### Prerequisites

- Node.js (v20, v22, or v24)
- pnpm (v10 or later)

### Setup

```bash
# Clone the repository
git clone https://github.com/teomyth/contexify.git
cd contexify

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

### Available Scripts

- `pnpm build` - Build the project
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Run linting
- `pnpm format` - Format code
- `pnpm release` - Release a new version

## Modular Usage

Contextify is designed to be modular, allowing you to import only the parts you need. This can significantly reduce your bundle size if you don't need all features.

### Core Module

The core module provides the basic functionality without any dependencies on decorators or metadata reflection:

```typescript
// Import only the core functionality
import { Context, Binding } from 'contexify/core';

// Create a context
const ctx = new Context('app');

// Bind values
ctx.bind('greeting').to('Hello, World!');
const greeting = ctx.getSync('greeting');
```

### Decorators Module

The decorators module provides TypeScript decorators for dependency injection:

```typescript
// Import decorators
import { inject, injectable } from 'contexify/decorators';

@injectable()
class GreetingService {
  constructor(@inject('greeting') private greeting: string) {}

  greet(name: string) {
    return `${this.greeting} ${name}!`;
  }
}
```

### Interceptors Module

The interceptors module provides method interception capabilities:

```typescript
// Import interceptors
import { Interceptor } from 'contexify/interceptors';

// Create an interceptor
const loggingInterceptor: Interceptor = async (context, next) => {
  console.log(`Before: ${context.targetName}`);
  const result = await next();
  console.log(`After: ${context.targetName}`);
  return result;
};
```

### Full Package

If you need all features, you can import from the main package:

```typescript
// Import everything
import { Context, inject, Interceptor } from 'contexify';
```

## License

MIT

## Acknowledgements

Contexify was originally based on the Context module from [LoopBack 4](https://github.com/loopbackio/loopback-next). That project is licensed under the MIT License. We thank IBM and LoopBack contributors for their work in creating this excellent dependency injection framework.

For more details on the original copyright and license information, please see the [NOTICE.md](../../NOTICE.md) file in this project.
