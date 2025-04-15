import { injectable, inject, BindingScope } from 'contexify';
import { CoreKeys } from '../keys.js';
import { Logger } from './logger.js';

/**
 * Configuration service interface
 */
export interface ConfigService {
  /**
   * Get configuration value
   */
  get<T>(key: string, defaultValue?: T): T;

  /**
   * Set configuration value
   */
  set<T>(key: string, value: T): void;

  /**
   * Initialize configuration service
   */
  initialize(): Promise<void>;
}

/**
 * In-memory configuration service implementation
 */
@injectable({
  scope: BindingScope.SINGLETON,
  tags: ['service', 'initializer', 'cleaner'],
})
export class MemoryConfigService implements ConfigService {
  private config: Map<string, any> = new Map();

  private logger: Logger;

  constructor(@inject(CoreKeys.LOGGER) logger: Logger) {
    this.logger = logger;
  }

  /**
   * Get configuration value
   */
  get<T>(key: string, defaultValue?: T): T {
    if (this.config.has(key)) {
      return this.config.get(key) as T;
    }
    return defaultValue as T;
  }

  /**
   * Set configuration value
   */
  set<T>(key: string, value: T): void {
    this.config.set(key, value);
    this.logger.debug(`Config set: ${key} = ${JSON.stringify(value)}`);
  }

  /**
   * Initialize configuration service
   */
  async initialize(): Promise<void> {
    this.logger.info('Initializing config service');

    // Set default configurations
    this.set('app.name', 'Context Example App');
    this.set('app.version', '1.0.0');

    // Load configurations from environment variables
    this.loadFromEnvironment();

    this.logger.info('Config service initialized');
  }

  /**
   * Load configurations from environment variables
   */
  private loadFromEnvironment(): void {
    // Example: load log level from environment variable
    const logLevel = process.env.LOG_LEVEL;
    if (logLevel) {
      this.set('logger.level', logLevel);
    }
  }

  /**
   * Clean up configuration service
   */
  async cleanup(): Promise<void> {
    this.logger.info('Cleaning up config service');
    this.config.clear();
  }
}
