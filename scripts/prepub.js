#!/usr/bin/env node

/**
 * Pre-publish validation script
 *
 * This script runs all the necessary checks before publishing:
 * 1. Runs prepub for the main package (clean, fix, build, test)
 * 2. Checks documentation code syntax
 *
 * If any step fails, the script will exit with an error code and display a summary of errors.
 */

import { execSync } from 'child_process';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
};

// Store errors for summary
const errors = [];

/**
 * Run a command and handle errors
 * @param {string} command - The command to run
 * @param {string} description - Description of the command
 * @param {boolean} [critical=true] - Whether the command is critical (should stop execution on failure)
 * @returns {boolean} - Whether the command succeeded
 */
function runCommand(command, description, critical = true) {
  console.log(
    `\n${colors.cyan}${colors.bold}Running: ${description}${colors.reset}`
  );
  console.log(`${colors.blue}$ ${command}${colors.reset}\n`);

  try {
    // Pass the output directly to the console
    execSync(command, { stdio: 'inherit' });

    console.log(
      `\n${colors.green}✓ ${description} completed successfully${colors.reset}`
    );
    return true;
  } catch (error) {
    const errorMessage = `${colors.red}✗ ${description} failed${colors.reset}`;
    console.error(`\n${errorMessage}`);
    errors.push({ description, command, error: error.message });

    if (critical) {
      showErrorSummary();
      process.exit(1);
    }

    return false;
  }
}

/**
 * Display a summary of all errors
 */
function showErrorSummary() {
  if (errors.length === 0) {
    console.log(
      `\n${colors.green}${colors.bold}All checks passed successfully!${colors.reset}`
    );
    return;
  }

  console.error(`\n${colors.red}${colors.bold}Error Summary:${colors.reset}`);
  console.error(`${colors.red}${colors.bold}===============${colors.reset}`);

  errors.forEach((error, index) => {
    console.error(
      `\n${colors.red}${colors.bold}Error ${index + 1}: ${error.description}${colors.reset}`
    );
    console.error(`${colors.blue}Command: ${error.command}${colors.reset}`);
    console.error(`${colors.red}${error.error}${colors.reset}`);
  });

  console.error(
    `\n${colors.red}${colors.bold}${errors.length} error(s) occurred during pre-publish validation.${colors.reset}`
  );
  console.error(
    `${colors.yellow}Please fix these errors before publishing.${colors.reset}`
  );
}

// Main execution
console.log(
  `${colors.magenta}${colors.bold}Starting pre-publish validation...${colors.reset}`
);

// Step 1: Run prepub for all packages (excluding docs)
runCommand(
  'pnpm turbo run prepub --filter=!@contexify/docs-site --filter=!@contexify/docs-code',
  'All packages validation (clean, fix, build, test)'
);

// Step 2: Check documentation code syntax
// We'll run a modified command that forces color output and filters out the build logs
runCommand(
  'FORCE_COLOR=true pnpm turbo run docs:check --filter=@contexify/docs-code | FORCE_COLOR=true grep --color=always -v "contexify:build:"',
  'Documentation code syntax check'
);

// If we got here, all commands succeeded
console.log(
  `\n${colors.green}${colors.bold}All pre-publish checks passed!${colors.reset}`
);
console.log(
  `${colors.green}The package is ready to be published.${colors.reset}`
);
