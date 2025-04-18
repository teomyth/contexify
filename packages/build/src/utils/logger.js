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
  info(message) {
    console.log(message);
  },

  /**
   * Log a success message
   * @param message Message to log
   */
  success(message) {
    console.log(chalk.green(`✅ ${message}`));
  },

  /**
   * Log a warning message
   * @param message Message to log
   */
  warn(message) {
    console.log(chalk.yellow(`⚠ ${message}`));
  },

  /**
   * Log an error message
   * @param message Message to log
   */
  error(message) {
    console.error(chalk.red(`❌ ${message}`));
  },

  /**
   * Log a debug message
   * @param message Message to log
   */
  debug(message) {
    if (process.env.DEBUG) {
      console.log(chalk.gray(`🔍 ${message}`));
    }
  },

  /**
   * Start a group in the log
   * @param title Group title
   */
  group(title) {
    console.log(chalk.blue(`▶ ${title}`));
  },

  /**
   * Start a nested group in the log
   * @param title Group title
   */
  nestedGroup(title) {
    console.log(chalk.blue(`  ▶ ${title}`));
  },

  /**
   * Log a file status message
   * @param message Status message
   * @param status Status type (success, warning, error)
   */
  fileStatus(
    message,
    status = 'success'
  ) {
    const icon = status === 'success' ? '✓' : status === 'warning' ? '⚠' : '✗';
    const color =
      status === 'success'
        ? chalk.green
        : status === 'warning'
          ? chalk.yellow
          : chalk.red;
    console.log(`    ${color(icon)} ${message}`);
  },
};
