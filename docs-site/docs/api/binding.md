---
sidebar_position: 2
---

# Binding

The `Binding` class represents a connection between a key and a value in the Context. It provides methods for configuring how values are resolved.

## Static Methods

### create

Creates a new Binding with the given key.

**Parameters:**
- `key`: The binding key. This is a string that uniquely identifies the binding within a Context.

**Returns:** A new Binding instance.

**Example:**
```typescript
// Create a binding
const binding = Binding.create<string>('greeting');
binding.to('Hello, world!');
```

## Properties

### key

The key of the binding.

**Example:**
```typescript
const binding = Binding.create('greeting');
console.log(binding.key); // greeting
```

### scope

The scope of the binding.

**Example:**
```typescript
const binding = Binding.create('greeting');
binding.inScope(BindingScope.SINGLETON);
console.log(binding.scope); // singleton
```

### tags

The tags associated with the binding.

**Example:**
```typescript
const binding = Binding.create('greeting');
binding.tag('message');
console.log(binding.tags.has('message')); // true
```

### tagMap

The tag map associated with the binding.

**Example:**
```typescript
const binding = Binding.create('greeting');
binding.tag({ type: 'message', priority: 1 });
console.log(binding.tagMap.type); // message
console.log(binding.tagMap.priority); // 1
```

## Binding Methods

### to

Binds the key to a specific value.

**Parameters:**
- `value`: The value to bind.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Bind to a simple value
context.bind('greeting').to('Hello, world!');

// Bind to an object
context.bind('config').to({
  host: 'localhost',
  port: 3000
});
```

### toClass

Binds the key to a class constructor. When resolved, a new instance of the class will be created.

**Parameters:**
- `ctor`: The class constructor.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Bind to a class
context.bind('services.UserService').toClass(UserService);

// Resolve the class
const userService = await context.get<UserService>('services.UserService');
```

### toDynamicValue

Binds the key to a factory function that creates the value dynamically.

**Parameters:**
- `factory`: A function that creates the value. It receives the Context as an argument.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Bind to a dynamic value
context.bind('currentTime').toDynamicValue(() => new Date().toISOString());

// Bind to a dynamic value that depends on other bindings
context.bind('greeting').toDynamicValue(async (ctx) => {
  const name = await ctx.get<string>('name');
  return `Hello, ${name}!`;
});
```

### toProvider

Binds the key to a provider class. When resolved, an instance of the provider will be created, and its `value()` method will be called.

**Parameters:**
- `providerClass`: The provider class constructor.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Define a provider
@injectable()
class TimeProvider implements Provider<string> {
  value() {
    return new Date().toISOString();
  }
}

// Bind to the provider
context.bind('currentTime').toProvider(TimeProvider);

// Resolve the value
const time = await context.get<string>('currentTime');
```

### toAlias

Binds the key to another binding key. When resolved, the target binding will be resolved instead.

**Parameters:**
- `key`: The target binding key.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Bind a value
context.bind('config.apiUrl').to('https://api.example.com');

// Create an alias
context.bind('apiUrl').toAlias('config.apiUrl');

// Resolve through the alias
const apiUrl = await context.get<string>('apiUrl');
console.log(apiUrl); // https://api.example.com
```

## Scope Methods

### inScope

Sets the scope of the binding.

**Parameters:**
- `scope`: The scope to use.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Singleton scope (default)
context.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);

// Transient scope (new instance for each resolution)
context.bind('transient').toDynamicValue(() => new Date()).inScope(BindingScope.TRANSIENT);

// Context scope (instance shared within the same context)
context.bind('contextScoped').toDynamicValue(() => new Date()).inScope(BindingScope.CONTEXT);
```

## Tag Methods

### tag

Adds a tag or tag map to the binding.

**Parameters:**
- `tag`: A tag string or tag map.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Add a simple tag
context.bind('service.user').toClass(UserService).tag('service');

// Add multiple tags
context.bind('service.user')
  .toClass(UserService)
  .tag('service')
  .tag('core');

// Add a tag map
context.bind('service.user')
  .toClass(UserService)
  .tag({ type: 'service', priority: 1 });
```

### tagMap

Adds a tag map to the binding.

**Parameters:**
- `tagMap`: The tag map to add.

**Returns:** The Binding instance (for method chaining).

**Example:**
```typescript
// Add a tag map
context.bind('service.user')
  .toClass(UserService)
  .tagMap({ type: 'service', priority: 1 });
```

## Configuration Methods

### configure

Creates a configuration binding for this binding.

**Parameters:**
- `key`: The configuration key.

**Returns:** A new Binding instance for the configuration.

**Example:**
```typescript
// Configure a service
context.bind('services.EmailService').toClass(EmailService);
context.bind('services.EmailService').configure('options').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});

// In the service, use @config() to inject the configuration
@injectable()
class EmailService {
  constructor(@config() private options: EmailOptions) {}

  sendEmail(to: string, subject: string, body: string) {
    console.log(`Sending email using ${this.options.host}:${this.options.port}`);
  }
}
```

## Complete Example

Here's a complete example showing how to use the Binding class:

```typescript
import { Context, Binding, BindingScope, injectable } from 'contexify';

// Create a context
const context = new Context('application');

// Bind a simple value
context.bind('greeting').to('Hello, world!');

// Bind a class
@injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}
context.bind('services.UserService')
  .toClass(UserService)
  .inScope(BindingScope.SINGLETON)
  .tag('service');

// Bind a dynamic value
context.bind('currentTime')
  .toDynamicValue(() => new Date().toISOString())
  .inScope(BindingScope.TRANSIENT);

// Bind a provider
@injectable()
class ConfigProvider implements Provider<any> {
  value() {
    return {
      apiUrl: 'https://api.example.com',
      timeout: 5000
    };
  }
}
context.bind('config')
  .toProvider(ConfigProvider)
  .inScope(BindingScope.SINGLETON);

// Create an alias
context.bind('apiConfig').toAlias('config');

// Use the bindings
async function run() {
  // Resolve values
  const greeting = await context.get<string>('greeting');
  console.log(greeting); // Hello, world!

  const userService = await context.get<UserService>('services.UserService');
  console.log(userService.getUsers()); // ['user1', 'user2', 'user3']

  const time1 = await context.get<string>('currentTime');
  const time2 = await context.get<string>('currentTime');
  console.log(time1 !== time2); // true (transient scope)

  const config = await context.get<any>('config');
  console.log(config.apiUrl); // https://api.example.com

  const apiConfig = await context.get<any>('apiConfig');
  console.log(apiConfig === config); // true (alias)
}

run().catch(err => console.error(err));
```
