---
sidebar_position: 1
---

# Best Practices Overview

This document provides best practices for using the Context system in the Contexify framework, referencing design concepts and practical experience from the LoopBack framework.

## Context Usage Patterns

When using Context, there are several common patterns. Below is an analysis of these patterns and recommended best practices.

### Not Recommended: Global Context Object

```typescript
// Not recommended pattern
const globalContext = new Context();
globalContext.bind('service').toClass(MyService);

// Anywhere in the application
const service = globalContext.getSync('service');
service.doSomething();
```

**Problems**:

- Creates global state, making it difficult to test and manage
- Hides dependencies, making code harder to understand and maintain
- Cannot easily replace or mock dependencies for testing

### Not Recommended: Context as a Parameter

```typescript
// Not recommended pattern
function doSomething(context: Context) {
  const service = context.getSync('service');
  service.doSomething();
}
```

**Problems**:

- Still hides the actual dependencies
- Makes the function dependent on the Context API rather than the services it actually needs
- Difficult to test because you need to create and configure a Context

### Recommended: Extending Context to Create a Domain-Specific Application Core

```typescript
// Recommended pattern
export class MyApplication extends Context {
  constructor() {
    super('application');
    this.bind('service').toClass(MyService);
  }
}

// Using the application class
const app = new MyApplication();
app.start();
```

**Benefits**:

- The application itself is a Context, providing clear architectural boundaries
- Components can get their dependencies through dependency injection
- Easy to test because dependencies can be mocked or replaced
- Supports modular design and extensibility

For more detailed best practices, see the following sections:
- [Application Architecture](./application-architecture.md)
- [Dependency Injection Best Practices](./dependency-injection.md)
- [Advanced Patterns](./advanced-patterns.md)
