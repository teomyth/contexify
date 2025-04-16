---
sidebar_position: 1
---

# Context

## What is Context?

Context is the core of the Contexify framework. It serves as:

- An abstraction of all state and dependencies in your application
- A global registry for anything and everything in your app (configurations, state, dependencies, classes, etc.)
- An [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) container used to inject dependencies into your code

The Context system allows you to manage dependencies in a structured and flexible way, making your application more modular and testable.

## Context Hierarchy

One of the key features of the Context system is its hierarchical nature. Contexts can be organized in a parent-child relationship, forming a Context chain.

```typescript
import { Context } from 'contexify';

// Create a root context
const rootContext = new Context('root');

// Create a child context with rootContext as its parent
const serverContext = new Context(rootContext, 'server');

// Create another child context
const requestContext = new Context(serverContext, 'request');
```

This hierarchy allows for:

- **Inheritance**: Child contexts inherit bindings from their parent contexts
- **Isolation**: Changes to a child context don't affect the parent context
- **Scoping**: Different parts of your application can have their own context with specific bindings

## Context Levels

In a typical application, you'll have three levels of contexts:

### 1. Application-level Context (Global)

- Stores all the initial and modified app states throughout the entire life of the app
- Generally configured when the application is created
- Serves as the root context for all other contexts

```typescript
import { Context } from 'contexify';

// Create an application class that extends Context
class Application extends Context {
  constructor() {
    super('application');
  }
}

// Create an application instance
const app = new Application();

// Register application-wide services
app.bind('services.ConfigService').toClass(ConfigService);
app.bind('services.LoggerService').toClass(LoggerService);
```

### 2. Server-level Context

- Child of the application-level context
- Holds configuration specific to a particular server instance
- Useful for multi-server applications where each server might have different configurations

```typescript
// Create a server context
const serverContext = new Context(app, 'server');

// Configure server-specific bindings
serverContext.bind('server.port').to(3000);
serverContext.bind('server.host').to('localhost');
```

### 3. Request-level Context (Per Request)

- Created for each incoming request
- Extends the server-level context
- Garbage-collected once the request is completed
- Allows for request-specific dependencies and state

```typescript
// For each incoming request
const requestContext = new Context(serverContext, 'request');

// Bind request-specific data
requestContext.bind('request.body').to(requestBody);
requestContext.bind('request.headers').to(requestHeaders);
```

## Creating and Using a Context

Here's a basic example of creating and using a Context:

```typescript
import { Context } from 'contexify';

// Create a context
const context = new Context('my-context');

// Bind a value to a key
context.bind('greeting').to('Hello, world!');

// Retrieve the value
async function run() {
  const greeting = await context.get('greeting');
  console.log(greeting); // Output: Hello, world!
}

run().catch(err => console.error(err));
```

## Context Events

A Context emits events when bindings are added or removed. You can listen to these events to react to changes in the Context.

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Listen for 'bind' events
context.on('bind', event => {
  console.log(`Binding added: ${event.binding.key}`);
});

// Listen for 'unbind' events
context.on('unbind', event => {
  console.log(`Binding removed: ${event.binding.key}`);
});

// Add a binding
context.bind('greeting').to('Hello, world!');
// Output: Binding added: greeting

// Remove a binding
context.unbind('greeting');
// Output: Binding removed: greeting
```

## Context Observers

For more advanced use cases, you can use Context Observers to react to changes in the Context asynchronously.

```typescript
import { Context, ContextObserver } from 'contexify';

const context = new Context('my-context');

// Create an observer
const observer: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
    }
  }
};

// Register the observer
context.subscribe(observer);

// Add a binding with 'service' tag
context.bind('services.UserService')
  .toClass(UserService)
  .tag('service');
// Output: Service registered: services.UserService
```

## Context Views

Context Views allow you to track a set of bindings that match a specific filter. This is useful for dynamically tracking extensions or plugins.

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Create a view that tracks all bindings with 'controller' tag
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Get all controller instances
async function getControllers() {
  const controllers = await controllersView.values();
  return controllers;
}

// Add a controller
context.bind('controllers.UserController')
  .toClass(UserController)
  .tag('controller');

// Now getControllers() will include UserController
```

## Next Steps

Now that you understand the Context concept, you can learn about:

- [Binding](./binding) - How to register and manage dependencies
- [Dependency Injection](./dependency-injection) - How to inject dependencies into your classes
- [API Reference](../api) - View the detailed API documentation
