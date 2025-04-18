#!/usr/bin/env node

/**
 * Direct command entry point for cx-sync-versions
 */

import { cli } from '../src/cli/index.js';

// Run the CLI with sync-versions command
cli(['node', 'contexify-build', 'sync-versions', ...process.argv.slice(2)])
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
