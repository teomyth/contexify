import { BindingScope, injectable } from 'contexify';

/**
 * Log level
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Logger service interface
 */
export interface Logger {
  /**
   * Set log level
   */
  setLevel(level: LogLevel): void;

  /**
   * Log debug information
   */
  debug(message: string, ...args: any[]): void;

  /**
   * Log general information
   */
  info(message: string, ...args: any[]): void;

  /**
   * Log warning information
   */
  warn(message: string, ...args: any[]): void;

  /**
   * Log error information
   */
  error(message: string, error?: Error, ...args: any[]): void;
}

/**
 * Console logger service implementation
 */
@injectable({ scope: BindingScope.SINGLETON })
export class ConsoleLogger implements Logger {
  private level: LogLevel = LogLevel.INFO;

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Log debug information
   */
  debug(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log general information
   */
  info(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warning information
   */
  warn(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log error information
   */
  error(message: string, error?: Error, ...args: any[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }
  }
}
