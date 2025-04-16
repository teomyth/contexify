---
sidebar_position: 2
---

# Modular Application Example

This example demonstrates how to build a modular application using Contexify.

## Overview

The modular application example shows how to:

- Structure a modular application
- Create and use components
- Manage dependencies between components
- Configure the application
- Handle application lifecycle

## Application Class

The application class is the core of the modular application. It extends the `Context` class and serves as the root context for the application.

```typescript
// Application class
import { Context } from 'contexify';
import { AuthComponent } from './components/authentication';
import { ApiComponent } from './components/api';
import { ConfigKeys, configureApplication } from './config';

export class ModularApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Configure the application
    configureApplication(this);

    // Add components
    this.component(new AuthComponent());
    this.component(new ApiComponent());

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  // Add a component to the application
  component(component: { bindings?: any[] }) {
    if (component.bindings) {
      for (const binding of component.bindings) {
        this.add(binding);
      }
    }
    return this;
  }

  // Start the application
  async start() {
    console.log('Application starting...');

    // Get the server configuration
    const serverConfig = await this.get(ConfigKeys.SERVER);

    console.log(`Server listening on port ${serverConfig.port}`);
  }

  // Stop the application
  async stop() {
    console.log('Application stopping...');

    // Application cleanup logic
    this.close();
  }
}
```

## Authentication Component

The authentication component provides authentication services for the application.

```typescript
// Authentication component
import { createBindingFromClass, Binding } from 'contexify';
import { DefaultAuthService } from './services';
import { DefaultAuthProvider } from './providers';
import { AuthBindings } from './keys';

export class AuthComponent {
  bindings = [
    // Bind the component itself
    Binding.create(AuthBindings.COMPONENT)
      .to(this)
      .tag('component'),

    // Bind the auth service
    createBindingFromClass(DefaultAuthService, {
      key: AuthBindings.SERVICE,
    }).tag('service'),

    // Bind the auth provider
    createBindingFromClass(DefaultAuthProvider, {
      key: AuthBindings.PROVIDER,
    }).tag('provider'),
  ];
}
```

## API Component

The API component provides controllers for the application's API.

```typescript
// API component
import { createBindingFromClass, Binding } from 'contexify';
import { UserController } from './controllers';
import { ApiBindings } from './keys';

export class ApiComponent {
  bindings = [
    // Bind the component itself
    Binding.create(ApiBindings.COMPONENT)
      .to(this)
      .tag('component'),

    // Bind the user controller
    createBindingFromClass(UserController, {
      key: ApiBindings.CONTROLLER,
    }).tag('controller'),
  ];
}
```

## Configuration

The configuration directory contains the configuration for the application.

```typescript
// Configuration
import { Context } from 'contexify';
import { ConfigKeys } from './keys';

export interface ServerConfig {
  port: number;
  host: string;
}

export function configureApplication(app: Context) {
  // Server configuration
  app.bind(ConfigKeys.SERVER).to({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
  });
}
```

## Entry Point

The entry point of the application creates and starts the application.

```typescript
// Entry point
import { ModularApplication } from './application';

async function main() {
  // Create the application
  const app = new ModularApplication();

  // Setup the application
  await app.setup();

  // Start the application
  await app.start();

  console.log('Application is running');

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await app.stop();
    process.exit(0);
  });
}

main().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
```

## Key Points

- **Modular Architecture**: The application is organized into components, each with its own responsibilities
- **Dependency Injection**: Components depend on each other through dependency injection
- **Configuration**: The application is configured through the context
- **Lifecycle Management**: The application manages the lifecycle of its components

## Complete Example

The complete example code can be found in the [examples/modular-app](https://github.com/teomyth/contexify/tree/main/examples/modular-app) directory.
