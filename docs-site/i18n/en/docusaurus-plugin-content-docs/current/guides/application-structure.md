---
sidebar_position: 1
---

# Application Structure Guide

This guide provides recommendations for structuring your application using Contexify.

## Overview

A well-structured application is easier to maintain, test, and extend. Contexify provides the tools to create a modular and flexible application structure.

## Recommended Application Structure

Here's a recommended structure for a typical application using Contexify:

```
src/
├── application.ts              # Main application class
├── index.ts                    # Entry point
├── components/                 # Reusable components
│   ├── authentication/         # Authentication component
│   │   ├── index.ts            # Component exports
│   │   ├── keys.ts             # Binding keys
│   │   ├── types.ts            # Type definitions
│   │   ├── services/           # Services
│   │   └── providers/          # Providers
│   └── ...                     # Other components
├── controllers/                # Controllers
│   ├── index.ts                # Controller exports
│   ├── user-controller.ts      # User controller
│   └── ...                     # Other controllers
├── models/                     # Domain models
│   ├── index.ts                # Model exports
│   ├── user.model.ts           # User model
│   └── ...                     # Other models
├── repositories/               # Data access repositories
│   ├── index.ts                # Repository exports
│   ├── user.repository.ts      # User repository
│   └── ...                     # Other repositories
├── services/                   # Business logic services
│   ├── index.ts                # Service exports
│   ├── user.service.ts         # User service
│   └── ...                     # Other services
└── config/                     # Configuration
    ├── index.ts                # Configuration exports
    ├── keys.ts                 # Binding keys
    └── types.ts                # Type definitions
```

## Application Class

The application class is the core of your application. It extends the `Context` class and serves as the root context for your application.

```typescript
import { Context, createBindingFromClass } from 'contexify';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserRepository } from './repositories';
import { AuthComponent } from './components/authentication';

export class MyApplication extends Context {
  constructor() {
    super('application');
    
    // Configure the application
    this.configure();
  }
  
  private configure() {
    // Register components
    this.component(new AuthComponent());
    
    // Register services
    this.bind('services.UserService').toClass(UserService);
    
    // Register repositories
    this.bind('repositories.UserRepository').toClass(UserRepository);
    
    // Register controllers
    this.bind('controllers.UserController').toClass(UserController);
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
    // Application startup logic
  }
  
  // Stop the application
  async stop() {
    console.log('Application stopping...');
    // Application cleanup logic
    this.close();
  }
}
```

## Components

Components are collections of related bindings that can be reused across applications. They are a great way to organize your code and promote modularity.

```typescript
import { createBindingFromClass } from 'contexify';
import { AuthService } from './services';
import { TokenProvider } from './providers';

export class AuthComponent {
  bindings = [
    createBindingFromClass(AuthService),
    createBindingFromClass(TokenProvider),
  ];
}
```

## Controllers

Controllers handle incoming requests and return responses. They typically depend on services to perform business logic.

```typescript
import { injectable, inject } from 'contexify';
import { UserService } from '../services';
import { User } from '../models';

@injectable()
export class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService
  ) {}
  
  async getUser(id: string): Promise<User> {
    return this.userService.getUser(id);
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }
}
```

## Services

Services contain the business logic of your application. They typically depend on repositories to access data.

```typescript
import { injectable, inject } from 'contexify';
import { UserRepository } from '../repositories';
import { User } from '../models';

@injectable()
export class UserService {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository
  ) {}
  
  async getUser(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    // Business logic
    return this.userRepo.create(userData);
  }
}
```

## Repositories

Repositories handle data access. They typically depend on a data source to connect to a database.

```typescript
import { injectable, inject } from 'contexify';
import { DataSource } from '../config';
import { User } from '../models';

@injectable()
export class UserRepository {
  constructor(
    @inject('datasources.default') private dataSource: DataSource
  ) {}
  
  async findById(id: string): Promise<User> {
    // Data access logic
    return this.dataSource.findById('users', id);
  }
  
  async create(userData: Partial<User>): Promise<User> {
    // Data access logic
    return this.dataSource.create('users', userData);
  }
}
```

## Configuration

Configuration is stored in the context and can be accessed by services and other components.

```typescript
import { Context } from 'contexify';

// Configuration keys
export namespace ConfigKeys {
  export const DATABASE = 'config.database';
  export const SERVER = 'config.server';
}

// Configuration types
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ServerConfig {
  port: number;
  host: string;
}

// Configure the application
export function configureApplication(app: Context) {
  // Database configuration
  app.bind(ConfigKeys.DATABASE).to({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp',
  });
  
  // Server configuration
  app.bind(ConfigKeys.SERVER).to({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
  });
}
```

## Entry Point

The entry point of your application creates and starts the application.

```typescript
import { MyApplication } from './application';
import { configureApplication } from './config';

async function main() {
  // Create the application
  const app = new MyApplication();
  
  // Configure the application
  configureApplication(app);
  
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

## Best Practices

- **Separation of Concerns**: Keep different parts of your application separate (controllers, services, repositories)
- **Dependency Injection**: Use dependency injection to make your code more testable and maintainable
- **Component-Based Architecture**: Organize related functionality into components
- **Configuration Management**: Use the context to manage configuration
- **Binding Naming Conventions**: Use consistent naming conventions for binding keys
- **Error Handling**: Implement proper error handling throughout your application
- **Lifecycle Management**: Properly manage the lifecycle of your application and its components

## Next Steps

Now that you understand how to structure your application, you can learn about:

- [Component Creation](./component-creation) - How to create reusable components
- [Testing](./testing) - How to test your application
- [Core Concepts](../category/core-concepts) - Learn about the core concepts of Contexify
