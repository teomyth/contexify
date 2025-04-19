#!/usr/bin/env node

/**
 * Direct command entry point for cx-sync-versions
 */

import { syncVersions } from '../src/version/sync-versions.js';
import { Command } from 'commander';

// Create a simple command-line interface
const program = new Command();
program
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
  .parse(process.argv);

const options = program.opts();

// Run the sync versions function
syncVersions({
  rootDir: options.rootDir,
  packagesPattern: options.packagesPattern,
  configFileName: options.configFile,
  verbose: !options.quiet,
})
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
