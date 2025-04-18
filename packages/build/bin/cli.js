#!/usr/bin/env node

/**
 * CLI entry point for @contexify/build
 */

import { cli } from '../dist/cli/index.js';

// Run the CLI
cli(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
