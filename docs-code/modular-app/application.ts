import { Context } from 'contexify';
import { ApiComponent } from './components/api.js';
import { AuthComponent } from './components/authentication.js';
import { ConfigKeys, ServerConfig, configureApplication } from './config.js';

/**
 * This is the main application class for the modular application example.
 * It extends the Context class and serves as the root context for the application.
 */

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
    const serverConfig = await this.get<ServerConfig>(ConfigKeys.SERVER);

    console.log(`Server listening on port ${serverConfig.port}`);
  }

  // Stop the application
  async stop() {
    console.log('Application stopping...');

    // Application cleanup logic
    this.close();
  }
}
