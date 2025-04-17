import { Context, BindingScope, injectable } from 'contexify';

/**
 * This example demonstrates different types of bindings in Contexify.
 * It shows value binding, class binding, and binding scopes.
 */

// Create a context
const context = new Context();

// Value binding
context.bind('greeting').to('Hello, world!');

// Class binding
@injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2'];
  }
}
context.bind('services.UserService').toClass(UserService);

// Factory function binding
context.bind('services.DbConnection').toDynamicValue(() => {
  return { connect: () => console.log('Connected to database') };
});

// Binding scopes
@injectable()
class ConfigService {
  getConfig() {
    return { apiKey: 'abc123' };
  }
}

context
  .bind('services.ConfigService')
  .toClass(ConfigService)
  .inScope(BindingScope.SINGLETON);

async function run() {
  // Get value binding
  const greeting = await context.get('greeting');
  console.log('Greeting:', greeting);

  // Get class binding
  const userService = await context.get<UserService>('services.UserService');
  console.log('Users:', userService.getUsers());

  // Get factory function binding
  const dbConnection = await context.get('services.DbConnection');
  dbConnection.connect();

  // Get singleton binding
  const configService = await context.get<ConfigService>(
    'services.ConfigService'
  );
  console.log('Config:', configService.getConfig());
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch((err) => console.error(err));
}
