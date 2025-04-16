---
sidebar_position: 1
---

# API 参考

本节提供 Contexify API 的参考。

## 核心类

### Context

`Context` 类是 Contexify 框架的核心。它作为绑定的注册表，并提供管理依赖项的方法。

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

`Binding` 类表示 Context 中键和值之间的连接。

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

`ContextView` 类允许您跟踪匹配特定过滤器的一组绑定。

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

## 装饰器

### @injectable()

将类标记为可注入，允许 Contexify 创建其实例。

```typescript
function injectable(): ClassDecorator;
```

### @inject()

通过绑定键注入依赖项。

```typescript
function inject(
  bindingKey: string,
  options?: InjectionOptions
): ParameterDecorator & PropertyDecorator;
```

### @inject.tag()

注入匹配特定标签的所有依赖项。

```typescript
namespace inject {
  function tag(
    tag: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @inject.getter()

注入一个可以稍后用于获取依赖项的函数。

```typescript
namespace inject {
  function getter(
    bindingKey: string,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @inject.view()

注入一个跟踪匹配过滤器的绑定的 ContextView。

```typescript
namespace inject {
  function view(
    filter: BindingFilter,
    options?: InjectionOptions
  ): ParameterDecorator & PropertyDecorator;
}
```

### @config()

为当前绑定注入配置。

```typescript
function config(
  propertyPath?: string | ConfigurationOptions
): ParameterDecorator & PropertyDecorator;
```

### @intercept()

将拦截器应用于方法或类。

```typescript
function intercept(
  ...interceptors: (Interceptor | Constructor<Interceptor>)[]
): MethodDecorator & ClassDecorator;
```

## 接口

### Provider

`Provider` 接口定义了一个可以动态创建值的类。

```typescript
interface Provider<T> {
  value(): ValueOrPromise<T>;
}
```

### Interceptor

`Interceptor` 接口定义了一个可以拦截方法调用的类。

```typescript
interface Interceptor {
  intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ): ValueOrPromise<any>;
}
```

### ContextObserver

`ContextObserver` 接口定义了一个可以观察上下文事件的类。

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

## 枚举

### BindingScope

`BindingScope` 枚举定义了绑定的作用域。

```typescript
enum BindingScope {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
  CONTEXT = 'context',
}
```

## 类型

### Constructor

`Constructor` 类型表示类构造函数。

```typescript
type Constructor<T> = new (...args: any[]) => T;
```

### ValueOrPromise

`ValueOrPromise` 类型表示值或值的 Promise。

```typescript
type ValueOrPromise<T> = T | Promise<T>;
```

### Getter

`Getter` 类型表示返回值或值的 Promise 的函数。

```typescript
type Getter<T> = () => ValueOrPromise<T>;
```

### BindingFilter

`BindingFilter` 类型表示过滤绑定的函数。

```typescript
type BindingFilter = (binding: Readonly<Binding<unknown>>) => boolean;
```

### BindingComparator

`BindingComparator` 类型表示比较绑定的函数。

```typescript
type BindingComparator = (a: Readonly<Binding<unknown>>, b: Readonly<Binding<unknown>>) => number;
```

## 更多信息

有关 API 的更详细信息，请参阅源代码中的 TypeScript 定义或生成的 API 文档。
