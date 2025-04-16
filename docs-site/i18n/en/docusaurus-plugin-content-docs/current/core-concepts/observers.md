---
sidebar_position: 5
---

# Observers and Events

## What are Context Events?

Context events are notifications emitted by a Context when bindings are added or removed. These events allow you to react to changes in the Context, such as when a new service is registered or when a configuration is updated.

The Context emits the following events:

- `bind`: Emitted when a new binding is added to the context
- `unbind`: Emitted when an existing binding is removed from the context
- `error`: Emitted when an observer throws an error during the notification process

## Context Event Listeners

You can listen to context events using the standard event emitter pattern.

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

## What are Context Observers?

Context observers provide a more structured way to react to context events. Unlike event listeners, observers:

- Can filter which bindings they are interested in
- Can perform asynchronous operations
- Are notified in a controlled manner

A context observer is an object that implements the `ContextObserver` interface:

```typescript
interface ContextObserver {
  // An optional filter function to match bindings
  filter?: BindingFilter;

  // Listen on 'bind', 'unbind', or other events
  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context): ValueOrPromise<void>;
}
```

## Creating and Using Context Observers

Here's an example of creating and using a context observer:

```typescript
import { Context, ContextObserver } from 'contexify';

const context = new Context('my-context');

// Create an observer
const serviceObserver: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // You can perform async operations here
      return registerServiceWithRegistry(binding.key);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      return unregisterServiceFromRegistry(binding.key);
    }
  }
};

// Register the observer
context.subscribe(serviceObserver);

// Add a binding with 'service' tag
context.bind('services.UserService')
  .toClass(UserService)
  .tag('service');
// Output: Service registered: services.UserService
```

## Observer Function

If you don't need the filtering capability, you can use a simple function as an observer:

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');

// Create an observer function
const observerFn = (event, binding, ctx) => {
  console.log(`Event: ${event}, Binding: ${binding.key}`);
};

// Register the observer function
context.subscribe(observerFn);
```

## Context Views

Context views are a higher-level abstraction built on top of observers. They allow you to track a set of bindings that match a specific filter and get their resolved values.

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

### Context View Events

A Context View emits events when bindings are added or removed from the view:

```typescript
import { Context } from 'contexify';

const context = new Context('my-context');
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Listen for 'refresh' events
controllersView.on('refresh', () => {
  console.log('Controllers view refreshed');
});

// Listen for 'resolve' events
controllersView.on('resolve', () => {
  console.log('Controllers view resolved');
});
```

## Observer Error Handling

Errors thrown by context observers are reported through the context chain:

1. If any context in the chain has `error` listeners, an `error` event is emitted on that context
2. If no context has `error` listeners, an `error` event is emitted on the current context, which may cause the process to exit

It's recommended to handle errors in your observers:

```typescript
const observer: ContextObserver = {
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    try {
      // Your observer logic
    } catch (error) {
      console.error('Error in observer:', error);
      // Handle the error
    }
  }
};
```

## Best Practices

- Use observers for dynamic discovery of components
- Keep observers focused on a single concern
- Handle errors properly in observers
- Use context views for tracking related bindings
- Be mindful of the performance impact of observers, especially for frequently changing bindings
- Close context views when they are no longer needed to avoid memory leaks

## Next Steps

Now that you understand Observers and Events, you can learn about:

- [Context](./context) - The container for bindings
- [Binding](./binding) - How to register dependencies
- [Dependency Injection](./dependency-injection) - How to inject dependencies into your classes
