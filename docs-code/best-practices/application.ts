import { Context, injectable, inject } from 'contexify';

/**
 * This example demonstrates the recommended pattern for creating an application
 * by extending the Context class.
 */

// Define a logger service
@injectable()
class Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

// Define an authentication component
@injectable()
class AuthComponent {
  constructor(@inject('services.Logger') private logger: Logger) {}

  authenticate(token: string) {
    this.logger.log(`Authenticating token: ${token}`);
    return token === 'valid-token';
  }
}

// Define an API component
@injectable()
class ApiComponent {
  constructor(@inject('services.Logger') private logger: Logger) {}

  handleRequest(path: string) {
    this.logger.log(`Handling request: ${path}`);
    return { path, success: true };
  }
}

// Application class extending Context
export class MyApplication extends Context {
  constructor() {
    super('application');
  }

  // Setup method to configure the application
  async setup() {
    // Register core services
    this.bind('services.Logger').toClass(Logger);

    // Add components
    this.bind('components.Auth').toClass(AuthComponent);
    this.bind('components.Api').toClass(ApiComponent);

    // You could perform async initialization here
    // For example, connecting to databases, loading configurations, etc.
    await Promise.resolve(); // Placeholder for actual async operations

    console.log('Application setup completed');
    return this;
  }

  async start() {
    // Start the application
    console.log('Application starting...');

    // Get components
    const auth = await this.get<AuthComponent>('components.Auth');
    const api = await this.get<ApiComponent>('components.Api');

    // Use components
    const isAuthenticated = auth.authenticate('valid-token');
    console.log('Authentication result:', isAuthenticated);

    const response = api.handleRequest('/users');
    console.log('API response:', response);
  }

  async stop() {
    // Stop the application
    console.log('Application stopping...');
    // Cleanup logic...
    this.close(); // Close the Context
  }
}

async function run() {
  // Create the application
  const app = new MyApplication();

  // Setup the application
  await app.setup();

  // Start the application
  await app.start();

  // Stop the application
  await app.stop();
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch(err => console.error(err));
}
