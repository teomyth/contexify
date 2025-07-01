#!/usr/bin/env node

/**
 * Simplified version update script
 *
 * This script integrates the following operations:
 * 1. Run changeset version to update the version number and CHANGELOG
 * 2. Run cx-sync-versions to synchronize the version in the source code
 * 3. Check if there are any changes, and if so, submit
 *
 * How to use:
 * -Run `node scripts/version.js` or `pnpm run version`
 */

import { execSync } from 'child_process';

// Define a commit message
const COMMIT_MESSAGE = 'chore: update versions and CHANGELOG.md files';

// Execute the command and return the output
function exec(command, options = {}) {
  console.log(`Executing command: ${command}`);
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
  } catch (error) {
    console.error(`Command execution failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Check for uncommitted changes
function hasChanges() {
  const status = exec('git status --porcelain', { silent: true });
  return status.trim().length > 0;
}

// Main function
async function main() {
  try {
    // Step 1: Run changeset version to update the version number and CHANGELOG
    console.log('\n📦 Updating version numbers and CHANGELOG...');
    exec('npx changeset version');

    // Step 2: Run cx-sync-versions to synchronize the version in the source code
    console.log('\n🔄 Synchronizing versions in source code...');
    exec('npx cx-sync-versions');

    // Step 3: Check if there are any changes, and if so, submit
    if (hasChanges()) {
      console.log('\n🚀 Committing version updates...');
      exec('git add .');
      exec(`git commit -m "${COMMIT_MESSAGE}" --no-verify`);
      console.log(`\n✅ Version updates committed: "${COMMIT_MESSAGE}"`);
    } else {
      console.log('\n⚠️ No changes detected, skipping commit');
    }

    console.log('\n🎉 Version update completed!');
  } catch (error) {
    console.error('\n❌ Version update failed:', error);
    process.exit(1);
  }
}

// Execute the main function
main().catch((error) => {
  console.error('Uncaught error:', error);
  process.exit(1);
});
