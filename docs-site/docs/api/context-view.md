---
sidebar_position: 3
---

# ContextView

The `ContextView` class allows you to track a set of bindings that match a specific filter. It provides methods for resolving and observing these bindings.

## Constructor

### constructor

Creates a new ContextView instance.

**Parameters:**
- `context`: The Context to view.
- `filter`: A function that filters bindings.
- `comparator` (optional): A function that compares bindings for sorting.

**Returns:** A new ContextView instance.

**Example:**
```typescript
// Create a view that tracks all bindings with the 'service' tag
const serviceView = new ContextView<any>(
  context,
  binding => binding.tags.has('service'),
  (a, b) => a.key.localeCompare(b.key)
);
```

## Methods

### resolve

Resolves all bindings that match the filter.

**Returns:** A Promise that resolves to an array of resolved values.

**Example:**
```typescript
// Resolve all services
const services = await serviceView.resolve();
console.log(`Resolved ${services.length} services`);
```

### values

Alias for `resolve()`. Resolves all bindings that match the filter.

**Returns:** A Promise that resolves to an array of resolved values.

**Example:**
```typescript
// Resolve all services
const services = await serviceView.values();
console.log(`Resolved ${services.length} services`);
```

### bindings

Gets all bindings that match the filter.

**Returns:** An array of bindings.

**Example:**
```typescript
// Get all service bindings
const bindings = serviceView.bindings();
console.log(`Found ${bindings.length} service bindings`);
```

## Event Methods

### on

Adds an event listener for the given event.

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function.

**Returns:** The ContextView instance (for method chaining).

**Example:**
```typescript
// Listen for binding changes
serviceView.on('bind', (binding) => {
  console.log(`New service binding: ${binding.key}`);
});
```

### once

Adds a one-time event listener for the given event.

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function.

**Returns:** The ContextView instance (for method chaining).

**Example:**
```typescript
// Listen for the next binding change only
serviceView.once('bind', (binding) => {
  console.log(`New service binding: ${binding.key}`);
});
```

### off

Removes an event listener for the given event.

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function to remove.

**Returns:** The ContextView instance (for method chaining).

**Example:**
```typescript
// Create a listener
const listener = (binding) => {
  console.log(`New service binding: ${binding.key}`);
};

// Add the listener
serviceView.on('bind', listener);

// Later, remove the listener
serviceView.off('bind', listener);
```

## Lifecycle Methods

### close

Closes the ContextView, removing all event listeners.

**Example:**
```typescript
// Close the view when done
serviceView.close();
```

## Events

The ContextView class emits the following events:

- `bind`: Emitted when a binding that matches the filter is added to the context.
- `unbind`: Emitted when a binding that matches the filter is removed from the context.

## Complete Example

Here's a complete example showing how to use the ContextView class:

```typescript
import { Context, ContextView, injectable } from 'contexify';

// Create a context
const context = new Context('application');

// Define some services
@injectable()
class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

@injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}

@injectable()
class OrderService {
  getOrders() {
    return ['order1', 'order2'];
  }
}

// Bind the services to the context
context.bind('services.LoggerService').toClass(LoggerService).tag('service');
context.bind('services.UserService').toClass(UserService).tag('service');
context.bind('services.OrderService').toClass(OrderService).tag('service');

// Create a view of all services
const serviceView = new ContextView<any>(
  context,
  binding => binding.tags.has('service'),
  (a, b) => a.key.localeCompare(b.key)
);

// Listen for new services
serviceView.on('bind', (binding) => {
  console.log(`New service detected: ${binding.key}`);
});

// Use the view
async function run() {
  // Get all service bindings
  const bindings = serviceView.bindings();
  console.log(`Found ${bindings.length} service bindings:`);
  bindings.forEach(binding => console.log(`- ${binding.key}`));

  // Resolve all services
  const services = await serviceView.resolve();
  console.log(`Resolved ${services.length} services`);

  // Add a new service
  context.bind('services.PaymentService').toClass(PaymentService).tag('service');

  // Close the view when done
  serviceView.close();
}

run().catch(err => console.error(err));
```
