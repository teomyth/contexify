---
sidebar_position: 2
---

# Application Architecture

This document provides best practices for structuring your application using Contexify.

## Application Class Extending Context

Create an application class that extends Context as the core of your application:

```typescript
import { Context, injectable } from 'contexify';

export class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Register core services
    this.bind('logger').toClass(Logger);

    // Add components
    this.component(AuthComponent);
    this.component(ApiComponent);

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  async start() {
    // Start the application
    console.log('Application starting...');
    // Startup logic...
  }

  async stop() {
    // Stop the application
    console.log('Application stopping...');
    // Cleanup logic...
    this.close(); // Close the Context
  }
}
```

## Components and Modular Design

Components are collections of related bindings used to extend application functionality:

```typescript
import { injectable, Binding } from 'contexify';

export interface Component {
  bindings?: Binding[];
  providers?: Constructor<Provider<unknown>>[];
}

@injectable()
export class AuthComponent implements Component {
  bindings = [
    createBindingFromClass(AuthService),
    createBindingFromClass(TokenService),
  ];
}
```

Using components allows you to:

- Group related functionality together
- Promote modular design
- Support a pluggable architecture
- Simplify dependency management

## Lifecycle Management

Your application should manage the lifecycle of components and services:

```typescript
export class MyApplication extends Context {
  // ...

  async start() {
    // Get all services that need initialization
    const initializers = await this.findByTag('initializer');

    // Initialize in sequence
    for (const initializer of initializers) {
      const service = await this.get(initializer.key);
      await service.initialize();
    }

    console.log('Application started');
  }

  async stop() {
    // Get all services that need cleanup
    const cleaners = await this.findByTag('cleaner');

    // Clean up in sequence
    for (const cleaner of cleaners) {
      const service = await this.get(cleaner.key);
      await service.cleanup();
    }

    this.close();
    console.log('Application stopped');
  }
}
```
