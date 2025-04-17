---
sidebar_position: 3
---

# Observers Example

This example demonstrates how to use the observer functionality in Contexify.

```typescript
import { Context, ContextObserver } from 'contexify';

// Create a context
const context = new Context('application');

// Create an observer
const serviceObserver: ContextObserver = {
  // Only interested in bindings with 'service' tag
  filter: binding => binding.tagMap.service != null,

  observe(event, binding, ctx) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
    }
  }
};

// Register the observer
context.subscribe(serviceObserver);

// Add bindings
context.bind('services.UserService')
  .to({ name: 'UserService' })
  .tag('service');

context.bind('services.OrderService')
  .to({ name: 'OrderService' })
  .tag('service');

context.bind('repositories.UserRepository')
  .to({ name: 'UserRepository' })
  .tag('repository');

// Remove a binding
context.unbind('services.OrderService');

// Output:
// Service registered: services.UserService
// Service registered: services.OrderService
// Service unregistered: services.OrderService
```

## Using Context Views

Context views are a higher-level abstraction built on top of observers. They allow you to track a set of bindings that match a specific filter and get their resolved values.

```typescript
import { Context } from 'contexify';

// Create a context
const context = new Context('application');

// Create a view that tracks all bindings with 'controller' tag
const controllersView = context.createView(
  binding => binding.tagMap.controller != null
);

// Listen for view events
controllersView.on('refresh', () => {
  console.log('Controllers view refreshed');
});

// Add controllers
context.bind('controllers.UserController')
  .to({ name: 'UserController' })
  .tag('controller');

context.bind('controllers.OrderController')
  .to({ name: 'OrderController' })
  .tag('controller');

// Get all controllers
async function getControllers() {
  const controllers = await controllersView.values();
  console.log('Controllers:', controllers.map(c => c.name));
}

// Remove a controller
function removeOrderController() {
  context.unbind('controllers.OrderController');
}

// Run the example
async function run() {
  await getControllers();
  // Output: Controllers: ['UserController', 'OrderController']
  
  removeOrderController();
  
  await getControllers();
  // Output: Controllers: ['UserController']
}

run().catch(err => console.error(err));
```

## Learn More

To learn more about observers and events, see the [Observers and Events](../core-concepts/observers) documentation.
