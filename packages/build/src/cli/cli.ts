/**
 * CLI implementation
 */

import { Command } from 'commander';
import { syncVersions } from '../version/sync-versions.js';
import { checkVersions } from '../version/check-versions.js';
import { logger } from '../utils/logger.js';

/**
 * Create and configure the CLI
 * @returns The configured CLI
 */
function createCli(): Command {
  const program = new Command();

  program
    .name('contexify-build')
    .description('Build tools for Contexify projects')
    .version('0.1.0');

  // Version synchronization command
  program
    .command('sync-versions')
    .description(
      'Synchronize version constants in source files with package.json versions'
    )
    .option('-r, --root-dir <dir>', 'Root directory of the project')
    .option(
      '-p, --packages-pattern <pattern>',
      'Pattern to match package directories'
    )
    .option(
      '-c, --config-file <file>',
      'Name of the version sync configuration file'
    )
    .option('-q, --quiet', 'Suppress output')
    .action(async (options) => {
      try {
        await syncVersions({
          rootDir: options.rootDir,
          packagesPattern: options.packagesPattern,
          configFileName: options.configFile,
          verbose: !options.quiet,
        });
      } catch (error) {
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });

  // Version check command
  program
    .command('check-versions')
    .description(
      'Check if version constants in source files are in sync with package.json versions'
    )
    .option('-r, --root-dir <dir>', 'Root directory of the project')
    .option(
      '-p, --packages-pattern <pattern>',
      'Pattern to match package directories'
    )
    .option(
      '-c, --config-file <file>',
      'Name of the version sync configuration file'
    )
    .option('-q, --quiet', 'Suppress output')
    .option('--throw-on-error', 'Throw an error if versions are not in sync')
    .action(async (options) => {
      try {
        await checkVersions({
          rootDir: options.rootDir,
          packagesPattern: options.packagesPattern,
          configFileName: options.configFile,
          verbose: !options.quiet,
          throwOnError: options.throwOnError,
        });
      } catch (error) {
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });

  return program;
}

/**
 * Run the CLI with the given arguments
 * @param args Command-line arguments
 * @returns A promise that resolves when the CLI is done
 */
export async function cli(args: string[]): Promise<void> {
  const program = createCli();
  await program.parseAsync(args);
}
