---
sidebar_position: 1
---

# API Reference

This section provides a comprehensive reference for the Contexify API. Each class, method, and interface is documented in detail with examples to help you understand how to use them effectively.

## Core Classes

Contextify is built around a few core classes that provide the foundation for dependency injection:

- [Context](./context.md) - The central registry for bindings and dependencies
- [Binding](./binding.md) - Represents a connection between a key and a value
- [ContextView](./context-view.md) - Tracks a set of bindings that match a specific filter

## Decorators

Contextify provides a set of decorators that make it easy to work with dependency injection in TypeScript:

- [@injectable()](./decorators.md#injectable) - Marks a class as injectable
- [@inject()](./decorators.md#inject) - Injects a dependency by its binding key
- [@inject.tag()](./decorators.md#injecttag) - Injects all dependencies that match a specific tag
- [@inject.getter()](./decorators.md#injectgetter) - Injects a function that can be used to get the dependency later
- [@inject.view()](./decorators.md#injectview) - Injects a ContextView that tracks bindings matching a filter
- [@config()](./decorators.md#config) - Injects configuration for the current binding
- [@intercept()](./decorators.md#intercept) - Applies interceptors to a method or class

## Interfaces and Types

Contextify defines several interfaces and types that are used throughout the framework:

- [Provider](./interfaces.md#provider) - Defines a class that can create values dynamically
- [Interceptor](./interfaces.md#interceptor) - Defines a class that can intercept method calls
- [ContextObserver](./interfaces.md#contextobserver) - Defines a class that can observe context events
- [InvocationContext](./interfaces.md#invocationcontext) - Provides information about a method invocation
- [BindingScope](./interfaces.md#bindingscope) - Defines the scope of a binding
- [Constructor](./interfaces.md#constructor) - Represents a class constructor
- [ValueOrPromise](./interfaces.md#valueorpromise) - Represents a value or a promise of a value
- [Getter](./interfaces.md#getter) - Represents a function that returns a value or a promise of a value
- [BindingFilter](./interfaces.md#bindingfilter) - Represents a function that filters bindings
- [BindingComparator](./interfaces.md#bindingcomparator) - Represents a function that compares bindings

## Examples

For practical examples of using the Contexify API, see the [API Usage Examples](./examples.md) page. This page provides a variety of examples that demonstrate how to use the API in real-world scenarios.

## For More Information

For more detailed information about the API, please refer to the TypeScript definitions in the source code or check out the example code in the [GitHub repository](https://github.com/teomyth/contexify).
