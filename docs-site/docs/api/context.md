---
sidebar_position: 1
---

# Context

The `Context` class is the core of the Contexify framework. It serves as a registry for bindings and provides methods for managing dependencies.

## Constructor

### constructor

Creates a new Context instance.

**Signature:**
```typescript
constructor(parent?: Context, name?: string)
```

**Parameters:**
- `parent` (optional): A parent Context. If provided, this Context will inherit bindings from the parent.
- `name` (optional): A name for this Context. Useful for debugging.

**Returns:** A new Context instance.

**Example:**
```typescript
// Create a root context
const rootContext = new Context('root');

// Create a child context
const childContext = new Context(rootContext, 'child');
```

## Binding Methods

### bind

Creates a new Binding with the given key and adds it to the Context.

**Signature:**
```typescript
bind(key: string): Binding
```

**Parameters:**
- `key`: The binding key. This is a string that uniquely identifies the binding within the Context.

**Returns:** A new Binding instance.

**Example:**
```typescript
// Create a binding for a simple value
const binding = context.bind('greeting');
binding.to('Hello, world!');

// Create a binding for a class
context.bind('services.UserService').toClass(UserService);
```

### add

Adds an existing Binding to the Context.

**Signature:**
```typescript
add(binding: Binding): this
```

**Parameters:**
- `binding`: The Binding to add.

**Returns:** The Context instance (for method chaining).

**Example:**
```typescript
// Create a binding
const binding = Binding.create('greeting');
binding.to('Hello, world!');

// Add the binding to the context
context.add(binding);
```

### unbind

Removes a Binding from the Context.

**Signature:**
```typescript
unbind(key: string): boolean
```

**Parameters:**
- `key`: The binding key to remove.

**Returns:** `true` if the binding was found and removed, `false` otherwise.

**Example:**
```typescript
// Remove a binding
const wasRemoved = context.unbind('greeting');
console.log(wasRemoved); // true or false
```

### contains

Checks if the Context contains a Binding with the given key.

**Signature:**
```typescript
contains(key: string): boolean
```

**Parameters:**
- `key`: The binding key to check.

**Returns:** `true` if the binding exists, `false` otherwise.

**Example:**
```typescript
// Check if a binding exists
const exists = context.contains('greeting');
console.log(exists); // true or false
```

## Resolution Methods

### get

Resolves a value from the Context asynchronously.

**Signature:**
```typescript
get<T>(key: string, options?: ResolutionOptions): Promise<T>
```

**Parameters:**
- `key`: The binding key to resolve.
- `options` (optional): Options for the resolution process.

**Returns:** A Promise that resolves to the value.

**Example:**
```typescript
// Resolve a value asynchronously
const greeting = await context.get<string>('greeting');
console.log(greeting); // Hello, world!

// Resolve a service
const userService = await context.get<UserService>('services.UserService');
```

### getSync

Resolves a value from the Context synchronously.

**Signature:**
```typescript
getSync<T>(key: string, options?: ResolutionOptions): T
```

**Parameters:**
- `key`: The binding key to resolve.
- `options` (optional): Options for the resolution process.

**Returns:** The resolved value.

**Throws:** If the value cannot be resolved synchronously (e.g., if it involves async operations).

**Example:**
```typescript
// Resolve a value synchronously
const greeting = context.getSync<string>('greeting');
console.log(greeting); // Hello, world!
```

### getBinding

Gets a Binding from the Context.

**Signature:**
```typescript
getBinding(key: string): Binding | undefined
```

**Parameters:**
- `key`: The binding key to get.

**Returns:** The Binding if found, `undefined` otherwise.

**Example:**
```typescript
// Get a binding
const binding = context.getBinding('greeting');
if (binding) {
  console.log('Binding found!');
}
```

### find

Finds all Bindings that match the given pattern.

**Signature:**
```typescript
find(pattern: string | RegExp): Promise<Binding[]>
```

**Parameters:**
- `pattern`: A string or RegExp pattern to match against binding keys.

**Returns:** A Promise that resolves to an array of matching Bindings.

**Example:**
```typescript
// Find all bindings that match a pattern
const serviceBindings = await context.find(/^services\./);
console.log(`Found ${serviceBindings.length} service bindings`);
```

### findByTag

Finds all Bindings that have the given tag.

**Signature:**
```typescript
findByTag(tag: string): Promise<Binding[]>
```

**Parameters:**
- `tag`: The tag to search for.

**Returns:** A Promise that resolves to an array of matching Bindings.

**Example:**
```typescript
// Find all bindings with a specific tag
const serviceBindings = await context.findByTag('service');
console.log(`Found ${serviceBindings.length} service bindings`);
```

## Configuration Methods

### configure

Creates a configuration binding for the given key.

**Signature:**
```typescript
configure(key: string): Binding
```

**Parameters:**
- `key`: The binding key to configure.

**Returns:** A new Binding instance for the configuration.

**Example:**
```typescript
// Configure a service
context.configure('services.EmailService').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});
```

### getConfig

Gets the configuration for a binding.

**Signature:**
```typescript
getConfig<T>(key: string, options?: ResolutionOptions): Promise<T>
```

**Parameters:**
- `key`: The binding key to get the configuration for.
- `options` (optional): Options for the resolution process.

**Returns:** A Promise that resolves to the configuration value.

**Example:**
```typescript
// Get configuration for a service
const emailConfig = await context.getConfig<EmailConfig>('services.EmailService');
console.log(emailConfig.host); // smtp.example.com
```

## Context View Methods

### createView

Creates a ContextView that tracks bindings matching the given filter.

**Signature:**
```typescript
createView<T>(filter: BindingFilter, comparator?: BindingComparator): ContextView<T>
```

**Parameters:**
- `filter`: A function that filters bindings.
- `comparator` (optional): A function that compares bindings for sorting.

**Returns:** A new ContextView instance.

**Example:**
```typescript
// Create a view of all service bindings
const serviceView = context.createView<any>(
  binding => binding.tags.has('service'),
  (a, b) => a.key.localeCompare(b.key)
);

// Get all services
const services = await serviceView.resolve();
```

## Observer Methods

### subscribe

Subscribes an observer to context events.

**Signature:**
```typescript
subscribe(observer: ContextEventObserver): this
```

**Parameters:**
- `observer`: The observer to subscribe.

**Returns:** The Context instance (for method chaining).

**Example:**
```typescript
// Create an observer
class ServiceObserver implements ContextObserver {
  filter = binding => binding.tags.has('service');

  observe(event: string, binding: Binding) {
    console.log(`Service event: ${event}, binding: ${binding.key}`);
  }
}

// Subscribe the observer
context.subscribe(new ServiceObserver());
```

### unsubscribe

Unsubscribes an observer from context events.

**Signature:**
```typescript
unsubscribe(observer: ContextEventObserver): boolean
```

**Parameters:**
- `observer`: The observer to unsubscribe.

**Returns:** `true` if the observer was found and removed, `false` otherwise.

**Example:**
```typescript
// Create an observer
const observer = new ServiceObserver();

// Subscribe the observer
context.subscribe(observer);

// Later, unsubscribe the observer
const wasRemoved = context.unsubscribe(observer);
console.log(wasRemoved); // true or false
```

## Event Methods

### on

Adds an event listener for the given event.

**Signature:**
```typescript
on(event: string, listener: ContextEventListener): this
```

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function.

**Returns:** The Context instance (for method chaining).

**Example:**
```typescript
// Listen for bind events
context.on('bind', (binding, context) => {
  console.log(`Binding added: ${binding.key}`);
});
```

### once

Adds a one-time event listener for the given event.

**Signature:**
```typescript
once(event: string, listener: ContextEventListener): this
```

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function.

**Returns:** The Context instance (for method chaining).

**Example:**
```typescript
// Listen for the next bind event only
context.once('bind', (binding, context) => {
  console.log(`Binding added: ${binding.key}`);
});
```

### off

Removes an event listener for the given event.

**Signature:**
```typescript
off(event: string, listener: ContextEventListener): this
```

**Parameters:**
- `event`: The event name.
- `listener`: The event listener function to remove.

**Returns:** The Context instance (for method chaining).

**Example:**
```typescript
// Create a listener
const listener = (binding, context) => {
  console.log(`Binding added: ${binding.key}`);
};

// Add the listener
context.on('bind', listener);

// Later, remove the listener
context.off('bind', listener);
```

## Lifecycle Methods

### close

Closes the Context, releasing all resources and removing all bindings.

**Signature:**
```typescript
close(): void
```

**Example:**
```typescript
// Close the context when done
context.close();
```

## Events

The Context class emits the following events:

- `bind`: Emitted when a binding is added to the context.
- `unbind`: Emitted when a binding is removed from the context.
- `resolve:before`: Emitted before a binding is resolved.
- `resolve:after`: Emitted after a binding is resolved.
- `error`: Emitted when an error occurs during resolution.

## Complete Example

Here's a complete example showing how to use the Context class:

```typescript
import { Context, injectable, inject } from 'contexify';

// Create a context
const context = new Context('application');

// Define a logger service
@injectable()
class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Define a user service that depends on the logger
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

// Subscribe to events
context.on('bind', (binding) => {
  console.log(`Binding added: ${binding.key}`);
});

// Use the services
async function run() {
  // Resolve the UserService from the context
  const userService = await context.get<UserService>('services.UserService');

  // Create a user
  const user = userService.createUser('John');
  console.log('Created user:', user);

  // Close the context when done
  context.close();
}

run().catch(err => console.error(err));
```
