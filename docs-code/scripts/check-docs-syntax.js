import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Temporary directory for extracted code
const TEMP_DIR = path.resolve(__dirname, '../temp');

// Check if the temporary directory exists
if (!fs.existsSync(TEMP_DIR)) {
  console.error(
    'Temporary directory does not exist. Run extract-docs.js first.'
  );
  process.exit(1);
}

// Get all TypeScript files in the temporary directory
const files = fs.readdirSync(TEMP_DIR).filter((file) => file.endsWith('.ts'));

if (files.length === 0) {
  console.error('No TypeScript files found in the temporary directory.');
  process.exit(1);
}

console.log(`Found ${files.length} TypeScript files to check.`);

// Check for basic syntax errors using TypeScript's parser
// We're not doing full type checking, just syntax validation
const result = spawnSync(
  'npx',
  [
    'tsc',
    '--allowJs',
    '--checkJs',
    '--noEmit',
    '--target',
    'es2022',
    '--moduleResolution',
    'node',
    '--skipLibCheck',
    '--noImplicitAny',
    'false',
    path.join(TEMP_DIR, '*.ts'),
  ],
  {
    stdio: 'pipe',
    shell: true,
    encoding: 'utf-8',
  }
);

// Parse the output to find syntax errors
const output = result.stdout + result.stderr;

// We're only looking for critical syntax errors, not type errors or missing references
// These are the most basic syntax errors that would indicate a problem in the documentation
const criticalSyntaxErrors = [
  'error TS1002', // Unterminated string literal
  'error TS1003', // Identifier expected
  'error TS1005', // ';' expected
  'error TS1009', // Trailing comma not allowed
  'error TS1110', // Type expected
  'error TS1111', // Statement expected
  'error TS1128', // Declaration or statement expected
  'error TS1131', // Property or signature expected
  'error TS1136', // Property assignment expected
];

// Check for critical syntax errors only
let hasCriticalErrors = false;
for (const errorType of criticalSyntaxErrors) {
  if (output.includes(errorType)) {
    hasCriticalErrors = true;
    break;
  }
}

if (hasCriticalErrors) {
  console.error('Found critical syntax errors in documentation code:');
  // Extract and show only the critical errors
  const lines = output.split('\n');
  for (const line of lines) {
    if (criticalSyntaxErrors.some((error) => line.includes(error))) {
      console.error(line);
    }
  }
  process.exit(1);
} else {
  console.log('No critical syntax errors found in documentation code.');
}

// Check for common issues in the code
let hasIssues = false;
for (const file of files) {
  const filePath = path.join(TEMP_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // We don't check for console.log statements in documentation code anymore
  // as they are often part of examples and are expected

  // Check for TODO comments
  if (content.includes('TODO')) {
    console.warn(`Warning: ${file} contains TODO comments.`);
    hasIssues = true;
  }

  // Check for FIXME comments
  if (content.includes('FIXME')) {
    console.warn(`Warning: ${file} contains FIXME comments.`);
    hasIssues = true;
  }
}

if (hasIssues) {
  console.warn(
    'Some documentation code has minor issues that should be addressed.'
  );
} else {
  console.log('Documentation code looks good!');
}

// Success
process.exit(0);
