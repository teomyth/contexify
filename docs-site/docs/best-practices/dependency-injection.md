---
sidebar_position: 3
---

# Dependency Injection Best Practices

This document provides best practices for using dependency injection with Contexify.

## Use Decorators for Dependency Injection

It's recommended to use decorators for dependency injection instead of directly retrieving dependencies from the Context:

```typescript
import { inject, injectable } from 'contexify';

@injectable()
export class UserController {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository,
    @inject('services.EmailService') private emailService: EmailService
  ) {}

  async createUser(userData: UserData) {
    const user = await this.userRepo.create(userData);
    await this.emailService.sendWelcomeEmail(user);
    return user;
  }
}
```

Benefits:

- Dependencies are explicit and visible
- Easy to test, as dependencies can be mocked
- Code is cleaner and more maintainable

## Binding Key Naming Conventions

Use consistent naming conventions to organize binding keys:

```typescript
// Services
app.bind('services.EmailService').toClass(EmailService);

// Repositories
app.bind('repositories.UserRepository').toClass(UserRepository);

// Controllers
app.bind('controllers.UserController').toClass(UserController);

// Configuration
app.bind('config.api').to({
  port: 3000,
  host: 'localhost',
});
```

Recommended naming patterns:

- `{namespace}.{name}`: Use namespace and name
- Use plural forms for namespaces (services, repositories, controllers)
- For configurations, use `config.{component}`

## Scope Management

Choose appropriate scopes based on the nature of the component:

```typescript
import { BindingScope } from 'contexify';

// Singleton service
app
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

// One instance per request
app
  .bind('controllers.RequestController')
  .toClass(RequestController)
  .inScope(BindingScope.TRANSIENT);

// Singleton in the current context
app
  .bind('services.CacheService')
  .toClass(CacheService)
  .inScope(BindingScope.CONTEXT);
```

Scope guidelines:

- **SINGLETON**: For services with shared state (configurations, database connections)
- **TRANSIENT**: For components that need a new instance each time they're used
- **CONTEXT**: For components shared within a specific context
