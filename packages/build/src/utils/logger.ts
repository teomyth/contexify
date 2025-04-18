/**
 * Logger utility
 */

import chalk from 'chalk';

/**
 * Logger for build tools
 */
export const logger = {
  /**
   * Log an info message
   * @param message Message to log
   */
  info(message: string): void {
    console.log(chalk.blue(`[INFO] ${message}`));
  },

  /**
   * Log a success message
   * @param message Message to log
   */
  success(message: string): void {
    console.log(chalk.green(`[SUCCESS] ${message}`));
  },

  /**
   * Log a warning message
   * @param message Message to log
   */
  warn(message: string): void {
    console.log(chalk.yellow(`[WARNING] ${message}`));
  },

  /**
   * Log an error message
   * @param message Message to log
   */
  error(message: string): void {
    console.error(chalk.red(`[ERROR] ${message}`));
  },

  /**
   * Log a debug message
   * @param message Message to log
   */
  debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
    }
  },
};
