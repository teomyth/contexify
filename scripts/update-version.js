#!/usr/bin/env node

/**
 * Script to update the VERSION constant in src/index.ts
 * This script is called by release-it after bumping the version in package.json
 */

/* eslint-env node */
/* eslint no-console: 0 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read package.json to get the current version
const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`Updating VERSION constant in src/index.ts to ${version}`);

// Read the index.ts file
const indexPath = path.join(rootDir, 'src', 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace the VERSION constant
const updatedContent = indexContent.replace(
  /export const VERSION = ['"].*?['"]/,
  `export const VERSION = '${version}'`
);

// Write the updated content back to the file
fs.writeFileSync(indexPath, updatedContent);

console.log('VERSION constant updated successfully');
