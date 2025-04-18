/**
 * Tests for version synchronization
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncVersions } from '../../src/version/sync-versions.js';

// Setup test directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, '../../temp-test');

// Mock dependencies
vi.mock('replace-in-file', () => ({
  default: {
    replaceInFile: vi.fn().mockImplementation(async ({ files, from, to }) => {
      // Mock implementation that simulates replacing content in files
      const filePath = files;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newContent = fileContent.replace(from, to);
      fs.writeFileSync(filePath, newContent);

      return [{ file: filePath, hasChanged: fileContent !== newContent }];
    }),
  },
}));

// Mock fast-glob
vi.mock('fast-glob', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve(['packages/test-package/.version-sync.json'])
    ),
}));

describe.skip('syncVersions', () => {
  beforeEach(() => {
    // Create temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });

    // Create test package directory
    const packageDir = path.join(tempDir, 'packages/test-package');
    const srcDir = path.join(packageDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // Create package.json
    fs.writeFileSync(
      path.join(packageDir, 'package.json'),
      JSON.stringify({
        name: 'test-package',
        version: '1.0.0',
      })
    );

    // Create version.ts
    fs.writeFileSync(
      path.join(srcDir, 'version.ts'),
      'export const VERSION = "0.9.0";'
    );

    // Create .version-sync.json
    fs.writeFileSync(
      path.join(packageDir, '.version-sync.json'),
      JSON.stringify({
        files: [
          {
            path: 'src/version.ts',
            pattern: 'export const VERSION = ["\'](.*?)["\']',
            replacement: 'export const VERSION = "${version}"',
          },
        ],
      })
    );
  });

  afterEach(() => {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    // Reset mocks
    vi.resetAllMocks();
  });

  it('should synchronize versions in source files', async () => {
    // Run syncVersions
    const results = await syncVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].packageName).toBe('test-package');
    expect(results[0].version).toBe('1.0.0');
    expect(results[0].updatedFiles).toContain('src/version.ts');

    // Check file content
    const versionFileContent = fs.readFileSync(
      path.join(tempDir, 'packages/test-package/src/version.ts'),
      'utf8'
    );
    expect(versionFileContent).toBe('export const VERSION = "1.0.0";');
  });

  it('should handle files that are already up to date', async () => {
    // Update version.ts to match package.json
    fs.writeFileSync(
      path.join(tempDir, 'packages/test-package/src/version.ts'),
      'export const VERSION = "1.0.0";'
    );

    // Run syncVersions
    const results = await syncVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].upToDateFiles).toContain('src/version.ts');
    expect(results[0].updatedFiles).toHaveLength(0);
  });

  it('should handle errors when files are not found', async () => {
    // Remove version.ts
    fs.unlinkSync(path.join(tempDir, 'packages/test-package/src/version.ts'));

    // Run syncVersions
    const results = await syncVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].errorFiles['src/version.ts']).toBe('File not found');
  });
});
