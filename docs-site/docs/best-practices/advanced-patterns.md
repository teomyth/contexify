---
sidebar_position: 4
---

# Advanced Patterns

This document provides advanced patterns and best practices for using Contexify.

## Using Interceptors

Interceptors allow you to execute code before and after method calls:

```typescript
import { injectable, intercept } from 'contexify';
import { LogInterceptor } from './interceptors';

@injectable()
export class UserService {
  @intercept(LogInterceptor)
  async createUser(userData: UserData) {
    // Logic to create a user
  }
}
```

Interceptor use cases:

- Logging
- Performance monitoring
- Error handling
- Transaction management
- Caching

## Using the Observer Pattern

Observe binding changes in the Context:

```typescript
import { ContextObserver } from 'contexify';

export class ServiceRegistry implements ContextObserver {
  // Only interested in bindings with 'service' tag
  filter = (binding) => binding.tagMap.service != null;

  observe(event: string, binding: Binding) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // Handle new service
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      // Clean up service
    }
  }
}

// Register the observer
app.subscribe(new ServiceRegistry());
```

Observer use cases:

- Dynamic service discovery and registration
- Monitoring binding changes
- Implementing plugin systems

## Configuration Management

Use Context's configuration capabilities to manage application configuration:

```typescript
// Register configuration
app.configure('services.EmailService').to({
  host: 'smtp.example.com',
  port: 587,
  secure: true,
});

// Use configuration in services
@injectable()
export class EmailService {
  constructor(@config() private config: EmailConfig) {}

  async sendEmail(options: EmailOptions) {
    // Access configuration via this.config
  }
}
```

Configuration best practices:

- Use `configure()` and `@config()` instead of hardcoding configuration keys
- Provide default values for configuration
- Support environment-specific configuration overrides

## Summary

Advanced patterns for using Context as your application core:

1. **Use Interceptors**: Add cross-cutting concerns like logging and error handling
2. **Implement Observers**: Monitor binding changes and react to them
3. **Manage Configuration**: Use Context's configuration capabilities for flexible configuration
4. **Use Tags**: Tag bindings for easier discovery and management
5. **Create Custom Providers**: Implement custom providers for complex dependency resolution
