import { Context } from 'contexify';

import type { Component } from './components/component.js';
import { CoreComponent } from './components/core/index.js';
import { CoreKeys } from './components/core/keys.js';
import type { Logger } from './components/core/services/logger.js';
import { TaskComponent } from './components/task/index.js';
import { ServiceObserver } from './observers/service-observer.js';

/**
 * Application class, extends Context
 *
 * This is the core of the application, responsible for:
 * - Registering components and services
 * - Managing application lifecycle
 * - Providing dependency injection container
 */
export class Application extends Context {
  /**
   * Create an application instance
   */
  constructor() {
    // Call parent constructor, set context name
    super('application');

    // Set up the application
    this.setupApplication();
  }

  /**
   * Set up the application
   */
  private setupApplication(): void {
    // Add core component
    this.component(new CoreComponent());

    // Add task component
    this.component(new TaskComponent());

    // Set up observers
    this.setupObservers();
  }

  /**
   * Set up observers
   */
  private setupObservers(): void {
    // Create and register service observer
    const serviceObserver = new ServiceObserver(
      this.getSync<Logger>(CoreKeys.LOGGER)
    );
    this.subscribe(serviceObserver);
  }

  /**
   * Add component to the application
   * @param component Component to add
   */
  component(component: Component): void {
    // Add bindings
    if (component.bindings) {
      for (const binding of component.bindings) {
        this.add(binding);
      }
    }

    // Add providers
    if (component.providers) {
      for (const [key, providerClass] of Object.entries(component.providers)) {
        this.bind(key).toProvider(providerClass as any);
      }
    }

    // Add classes
    if (component.classes) {
      for (const [key, valueClass] of Object.entries(component.classes)) {
        this.bind(key).toClass(valueClass as any);
      }
    }

    // Add life cycle observers
    if (component.lifeCycleObservers) {
      for (const observerClass of component.lifeCycleObservers) {
        // Create an instance and subscribe it
        const observer = new (observerClass as any)();
        this.subscribe(observer);
      }
    }
  }

  /**
   * Start the application
   */
  async start(): Promise<void> {
    const logger = await this.get<Logger>(CoreKeys.LOGGER);
    logger.info('Application starting...');

    // Get all services that need initialization
    const initializers = this.findByTag('initializer');

    // Initialize in sequence
    for (const initializer of initializers) {
      logger.debug(`Initializing ${initializer.key}...`);
      const service = await this.get(initializer.key);
      if (service && typeof (service as any).initialize === 'function') {
        await (service as any).initialize();
      }
    }

    logger.info('Application started successfully');
  }

  /**
   * Stop the application
   */
  async stop(): Promise<void> {
    const logger = await this.get<Logger>(CoreKeys.LOGGER);
    logger.info('Application stopping...');

    // Get all services that need cleanup
    const cleaners = this.findByTag('cleaner');

    // Clean up in sequence
    for (const cleaner of cleaners) {
      logger.debug(`Cleaning up ${cleaner.key}...`);
      const service = await this.get(cleaner.key);
      if (service && typeof (service as any).cleanup === 'function') {
        await (service as any).cleanup();
      }
    }

    // Close the context
    this.close();

    logger.info('Application stopped successfully');
  }
}
