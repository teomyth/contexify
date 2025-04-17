import { describe, it, expect } from 'vitest';
import { Context, injectable, inject } from 'contexify';

describe('Documentation Examples Test', () => {
  it('should demonstrate basic dependency injection', async () => {
    // Create a context
    const context = new Context('application');

    // Define a service
    @injectable()
    class LoggerService {
      log(message: string) {
        return `[LOG] ${message}`;
      }
    }

    // Define a service that depends on logger
    @injectable()
    class UserService {
      constructor(
        @inject('services.LoggerService') private logger: LoggerService
      ) {}

      createUser(name: string) {
        const logMessage = this.logger.log(`Creating user: ${name}`);
        return { id: '123', name, log: logMessage };
      }
    }

    // Bind services to the context
    context.bind('services.LoggerService').toClass(LoggerService);
    context.bind('services.UserService').toClass(UserService);

    // Resolve UserService from the context
    const userService = await context.get<UserService>('services.UserService');

    // Create a user
    const user = userService.createUser('John Doe');

    // Assertions
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.log).toBe('[LOG] Creating user: John Doe');
  });
});
