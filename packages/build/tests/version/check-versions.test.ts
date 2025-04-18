/**
 * Tests for version checking
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkVersions } from '../../src/version/check-versions.js';

// Setup test directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, '../../temp-test');

// Mock dependencies
vi.mock('fast-glob', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve(['packages/test-package/.version-sync.json'])
    ),
}));

describe.skip('checkVersions', () => {
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
      'export const VERSION = "1.0.0";'
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

  it('should pass when versions are in sync', async () => {
    // Run checkVersions
    const results = await checkVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].packageName).toBe('test-package');
    expect(results[0].version).toBe('1.0.0');
    expect(results[0].upToDateFiles).toContain('src/version.ts');
    expect(results[0].errorFiles).toEqual({});
  });

  it('should detect version mismatches', async () => {
    // Update version.ts with a different version
    fs.writeFileSync(
      path.join(tempDir, 'packages/test-package/src/version.ts'),
      'export const VERSION = "0.9.0";'
    );

    // Run checkVersions
    const results = await checkVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].errorFiles['src/version.ts']).toBe(
      'Version mismatch: expected 1.0.0, found 0.9.0'
    );
  });

  it('should throw an error when throwOnError is true and versions are not in sync', async () => {
    // Update version.ts with a different version
    fs.writeFileSync(
      path.join(tempDir, 'packages/test-package/src/version.ts'),
      'export const VERSION = "0.9.0";'
    );

    // Run checkVersions with throwOnError
    await expect(
      checkVersions({
        rootDir: tempDir,
        verbose: false,
        throwOnError: true,
      })
    ).rejects.toThrow('Version check failed');
  });

  it('should handle files that do not match the pattern', async () => {
    // Update version.ts with a different format
    fs.writeFileSync(
      path.join(tempDir, 'packages/test-package/src/version.ts'),
      'const VERSION = "1.0.0";'
    );

    // Run checkVersions
    const results = await checkVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].errorFiles['src/version.ts']).toBe('Pattern not found');
  });

  it('should handle files that do not exist', async () => {
    // Remove version.ts
    fs.unlinkSync(path.join(tempDir, 'packages/test-package/src/version.ts'));

    // Run checkVersions
    const results = await checkVersions({
      rootDir: tempDir,
      verbose: false,
    });

    // Check results
    expect(results).toHaveLength(1);
    expect(results[0].errorFiles['src/version.ts']).toBe('File not found');
  });
});
