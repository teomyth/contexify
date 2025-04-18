#!/usr/bin/env node

/**
 * Direct command entry point for cx-check-versions
 */

import { cli } from '../src/cli/index.js';

// Run the CLI with check-versions command
cli(['node', 'contexify-build', 'check-versions', ...process.argv.slice(2)])
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
