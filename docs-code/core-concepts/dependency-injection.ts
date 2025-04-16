import { Context, injectable, inject } from 'contexify';

/**
 * This example demonstrates dependency injection in Contexify.
 * It shows constructor injection, property injection, and method injection.
 */

// Define interfaces
interface Logger {
  log(message: string): void;
}

interface UserService {
  createUser(name: string): Promise<User>;
}

interface User {
  id: string;
  name: string;
}

// Implement services
@injectable()
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Constructor injection
@injectable()
class DefaultUserService implements UserService {
  constructor(@inject('services.Logger') private logger: Logger) {}

  async createUser(name: string): Promise<User> {
    this.logger.log(`Creating user: ${name}`);
    return { id: Date.now().toString(), name };
  }
}

// Property injection
@injectable()
class UserController {
  @inject('services.UserService')
  private userService: UserService;

  async createUser(name: string) {
    return this.userService.createUser(name);
  }
}

// Method injection
@injectable()
class AdminController {
  async createUser(
    name: string,
    @inject('services.UserService') userService: UserService
  ) {
    return userService.createUser(`admin:${name}`);
  }
}

async function run() {
  // Create a context
  const context = new Context('application');

  // Bind services
  context.bind('services.Logger').toClass(ConsoleLogger);
  context.bind('services.UserService').toClass(DefaultUserService);
  context.bind('controllers.UserController').toClass(UserController);
  context.bind('controllers.AdminController').toClass(AdminController);

  // Use constructor injection
  const userService = await context.get<UserService>('services.UserService');
  const user = await userService.createUser('John');
  console.log('Created user:', user);

  // Use property injection
  const userController = await context.get<UserController>('controllers.UserController');
  const user2 = await userController.createUser('Jane');
  console.log('Created user via controller:', user2);

  // Use method injection
  const adminController = await context.get<AdminController>('controllers.AdminController');
  const adminUser = await adminController.createUser('Bob');
  console.log('Created admin user:', adminUser);
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch(err => console.error(err));
}
