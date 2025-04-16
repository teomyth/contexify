import {
  injectable,
  inject,
  Interceptor,
  InvocationContext,
  Next,
  ValueOrPromise,
  NonVoid,
} from 'contexify';

import { CoreKeys } from '../components/core/keys.js';
import { Logger } from '../components/core/services/logger.js';

/**
 * Logging Interceptor
 *
 * Records the start, end, and errors of method calls
 */
@injectable()
export class LoggingInterceptorProvider {
  constructor(@inject(CoreKeys.LOGGER) private logger: Logger) {}

  /**
   * Create an interceptor function
   */
  value(): Interceptor {
    const logger = this.logger;
    return function loggingInterceptor(
      context: InvocationContext,
      next: Next
    ): ValueOrPromise<NonVoid> {
      const { targetName, methodName } = context;
      const args = context.args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
        .join(', ');

      // Log method call start
      logger.debug(`${targetName}.${methodName} called with args: ${args}`);

      const startTime = Date.now();

      try {
        // Call target method
        const resultPromise = next();

        // Handle both synchronous and asynchronous results
        if (resultPromise instanceof Promise) {
          return resultPromise
            .then((result) => {
              // Log method call completion
              const duration = Date.now() - startTime;
              logger.debug(
                `${targetName}.${methodName} completed in ${duration}ms`
              );
              return result;
            })
            .catch((error) => {
              // Log method call error
              const duration = Date.now() - startTime;
              logger.error(
                `${targetName}.${methodName} failed after ${duration}ms`,
                error instanceof Error ? error : new Error(String(error))
              );
              throw error;
            });
        } else {
          // Handle synchronous result
          const duration = Date.now() - startTime;
          logger.debug(
            `${targetName}.${methodName} completed in ${duration}ms`
          );
          return resultPromise;
        }
      } catch (error) {
        // Log method call error (for synchronous errors)
        const duration = Date.now() - startTime;
        logger.error(
          `${targetName}.${methodName} failed after ${duration}ms`,
          error instanceof Error ? error : new Error(String(error))
        );

        // Re-throw error
        throw error;
      }
    };
  }
}

/**
 * Export a function that creates a logging interceptor
 */
export function createLoggingInterceptor(logger: Logger): Interceptor {
  return function loggingInterceptor(
    context: InvocationContext,
    next: Next
  ): ValueOrPromise<NonVoid> {
    const { targetName, methodName } = context;
    const args = context.args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
      .join(', ');

    // Log method call start
    logger.debug(`${targetName}.${methodName} called with args: ${args}`);

    const startTime = Date.now();

    try {
      // Call target method
      const resultPromise = next();

      // Handle both synchronous and asynchronous results
      if (resultPromise instanceof Promise) {
        return resultPromise
          .then((result) => {
            // Log method call completion
            const duration = Date.now() - startTime;
            logger.debug(
              `${targetName}.${methodName} completed in ${duration}ms`
            );
            return result;
          })
          .catch((error) => {
            // Log method call error
            const duration = Date.now() - startTime;
            logger.error(
              `${targetName}.${methodName} failed after ${duration}ms`,
              error instanceof Error ? error : new Error(String(error))
            );
            throw error;
          });
      } else {
        // Handle synchronous result
        const duration = Date.now() - startTime;
        logger.debug(`${targetName}.${methodName} completed in ${duration}ms`);
        return resultPromise;
      }
    } catch (error) {
      // Log method call error (for synchronous errors)
      const duration = Date.now() - startTime;
      logger.error(
        `${targetName}.${methodName} failed after ${duration}ms`,
        error instanceof Error ? error : new Error(String(error))
      );

      // Re-throw error
      throw error;
    }
  };
}
