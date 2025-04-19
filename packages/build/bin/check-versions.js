#!/usr/bin/env node

/**
 * Direct command entry point for cx-check-versions
 */

import { checkVersions } from '../src/version/check-versions.js';
import { Command } from 'commander';

// Create a simple command-line interface
const program = new Command();
program
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
  .parse(process.argv);

const options = program.opts();

// Run the check versions function
checkVersions({
  rootDir: options.rootDir,
  packagesPattern: options.packagesPattern,
  configFileName: options.configFile,
  verbose: !options.quiet,
  throwOnError: options.throwOnError,
})
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
