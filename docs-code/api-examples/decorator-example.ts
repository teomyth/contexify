import {
  Context,
  Interceptor,
  ValueOrPromise,
  config,
  inject,
  injectable,
  intercept,
} from 'contexify';

/**
 * This example demonstrates the usage of various decorators in Contexify.
 */

// Define a simple repository
@injectable()
class UserRepository {
  findAll() {
    return ['user1', 'user2', 'user3'];
  }
}

// Define a logging interceptor
class LoggingInterceptor implements Interceptor {
  intercept(invocationCtx: any, next: () => ValueOrPromise<any>) {
    console.log(`Calling ${invocationCtx.methodName}`);
    const start = Date.now();
    const result = next();

    if (result instanceof Promise) {
      return result.then((value) => {
        console.log(
          `${invocationCtx.methodName} completed in ${Date.now() - start}ms`
        );
        return value;
      });
    }

    console.log(
      `${invocationCtx.methodName} completed in ${Date.now() - start}ms`
    );
    return result;
  }
}

// Define a service that uses dependency injection
@injectable()
class UserService {
  constructor(
    @inject('repositories.UserRepository') private userRepo: UserRepository,
    @config('userService.prefix') private prefix: string
  ) {}

  @intercept(new LoggingInterceptor())
  getUsers() {
    const users = this.userRepo.findAll();
    return users.map((user) => `${this.prefix}:${user}`);
  }
}

export async function decoratorExample() {
  // Create a context
  const context = new Context('example');

  // Bind the repository
  context.bind('repositories.UserRepository').toClass(UserRepository);

  // Configure the service
  context.configure('services.UserService').to({
    userService: {
      prefix: 'user',
    },
  });

  // Bind the service
  context.bind('services.UserService').toClass(UserService);

  // Resolve the service
  const userService = await context.get<UserService>('services.UserService');

  // Call the method (will be intercepted)
  const users = userService.getUsers();
  console.log('Users:', users);

  return {
    users,
  };
}

// Run the example if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  decoratorExample().catch(console.error);
}
