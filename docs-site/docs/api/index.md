---
sidebar_position: 1
---

# API Reference

This section provides a reference for the Contexify API.

## Core Classes

### Context

The `Context` class is the core of the Contexify framework. It serves as a registry for bindings and provides methods for managing dependencies.

```typescript
class Context {
  // Constructor
  constructor(parent?: Context, name?: string);

  // Binding methods
  bind(key: string): Binding;
  add(binding: Binding): this;
  unbind(key: string): boolean;
  contains(key: string): boolean;
  
  // Resolution methods
  get<T>(key: string, options?: ResolutionOptions): Promise<T>;
  getSync<T>(key: string, options?: ResolutionOptions): T;
  getBinding(key: string): Binding | undefined;
  find(pattern: string | RegExp): Promise<Binding[]>;
  findByTag(tag: string): Promise<Binding[]>;
  
  // Configuration methods
  configure(key: string): Binding;
  getConfig<T>(key: string, options?: ResolutionOptions): Promise<T>;
  
  // Context view methods
  createView<T>(filter: BindingFilter, comparator?: BindingComparator): ContextView<T>;
  
  // Observer methods
  subscribe(observer: ContextEventObserver): this;
  unsubscribe(observer: ContextEventObserver): boolean;
  
  // Event methods
  on(event: string, listener: ContextEventListener): this;
  once(event: string, listener: ContextEventListener): this;
  off(event: string, listener: ContextEventListener): this;
  
  // Lifecycle methods
  close(): void;
}
```

### Binding

The `Binding` class represents a connection between a key and a value in the Context.

```typescript
class Binding<T = unknown> {
  // Static methods
  static create<T>(key: string): Binding<T>;
  
  // Properties
  readonly key: string;
  readonly scope: BindingScope;
  readonly tags: Set<string>;
  readonly tagMap: { [tag: string]: unknown };
  
  // Binding methods
  to(value: T): this;
  toClass(ctor: Constructor<T>): this;
  toDynamicValue(factory: (context: Context) => ValueOrPromise<T>): this;
  toProvider(providerClass: Constructor<Provider<T>>): this;
  toAlias(key: string): this;
  
  // Scope methods
  inScope(scope: BindingScope): this;
  
  // Tag methods
  tag(tag: string | { [tag: string]: unknown }): this;
  tagMap(tagMap: { [tag: string]: unknown }): this;
  
  // Configuration methods
  configure(key: string): Binding;
}
```

### ContextView

The `ContextView` class allows you to track a set of bindings that match a specific filter.

```typescript
class ContextView<T> {
  // Constructor
  constructor(
    context: Context,
    filter: BindingFilter,
    comparator?: BindingComparator
  );
  
  // Methods
  resolve(): Promise<T[]>;
  values(): Promise<T[]>;
  bindings(): Readonly<Binding>[];
  
  // Event methods
  on(event: string, listener: Function): this;
  once(event: string, listener: Function): this;
  off(event: string, listener: Function): this;
  
  // Lifecycle methods
  close(): void;
}
```

## Decorators

### @injectable()

Marks a class as injectable, allowing Contexify to create instances of it.

```typescript
function injectable(): ClassDecorator;
```

### @inject()

Injects a dependency by its binding key.

```typescript
function inject(
  bindingKey: string,
  options?: InjectionOptions
): ParameterDecorator & PropertyDecorator;
```

### @inject.tag()

Injects all dependencies that match a specific tag.

```typescript
namespace inject {
  function tag(
    tag: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @inject.getter()

Injects a function that can be used to get the dependency later.

```typescript
namespace inject {
  function getter(
    bindingKey: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @inject.view()

Injects a ContextView that tracks bindings matching a filter.

```typescript
namespace inject {
  function view(
    filter: BindingFilter,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @config()

Injects configuration for the current binding.

```typescript
function config(
  propertyPath?: string | ConfigurationOptions
): ParameterDecorator & PropertyDecorator;
```

### @intercept()

Applies interceptors to a method or class.

```typescript
function intercept(
  ...interceptors: (Interceptor | Constructor<Interceptor>)[]
): MethodDecorator & ClassDecorator;
```

## Interfaces

### Provider

The `Provider` interface defines a class that can create values dynamically.

```typescript
interface Provider<T> {
  value(): ValueOrPromise<T>;
}
```

### Interceptor

The `Interceptor` interface defines a class that can intercept method calls.

```typescript
interface Interceptor {
  intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ): ValueOrPromise<any>;
}
```

### ContextObserver

The `ContextObserver` interface defines a class that can observe context events.

```typescript
interface ContextObserver {
  filter?: BindingFilter;
  observe(
    eventType: string,
    binding: Readonly<Binding<unknown>>,
    context: Context
  ): ValueOrPromise<void>;
}
```

## Enums

### BindingScope

The `BindingScope` enum defines the scope of a binding.

```typescript
enum BindingScope {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
  CONTEXT = 'context',
}
```

## Types

### Constructor

The `Constructor` type represents a class constructor.

```typescript
type Constructor<T> = new (...args: any[]) => T;
```

### ValueOrPromise

The `ValueOrPromise` type represents a value or a promise of a value.

```typescript
type ValueOrPromise<T> = T | Promise<T>;
```

### Getter

The `Getter` type represents a function that returns a value or a promise of a value.

```typescript
type Getter<T> = () => ValueOrPromise<T>;
```

### BindingFilter

The `BindingFilter` type represents a function that filters bindings.

```typescript
type BindingFilter = (binding: Readonly<Binding<unknown>>) => boolean;
```

### BindingComparator

The `BindingComparator` type represents a function that compares bindings.

```typescript
type BindingComparator = (a: Readonly<Binding<unknown>>, b: Readonly<Binding<unknown>>) => number;
```

## For More Information

For more detailed information about the API, please refer to the TypeScript definitions in the source code or the generated API documentation.
