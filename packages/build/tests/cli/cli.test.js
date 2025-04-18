/**
 * Tests for CLI
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cli } from '../../src/cli/cli.js';

// Mock dependencies
vi.mock('../../src/version/sync-versions.js', () => ({
  syncVersions: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../src/version/check-versions.js', () => ({
  checkVersions: vi.fn().mockResolvedValue([]),
}));

// Mock process.exit
const originalExit = process.exit;
const mockExit = vi.fn();

describe('cli', () => {
  beforeEach(() => {
    // Mock process.exit
    process.exit = mockExit;

    // Mock console.error
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore process.exit
    process.exit = originalExit;

    // Reset mocks
    vi.resetAllMocks();
  });

  it('should call syncVersions when sync-versions command is used', async () => {
    const syncVersions = vi.mocked(
      await import('../../src/version/sync-versions.js')
    ).syncVersions;

    await cli(['node', 'contexify-build', 'sync-versions']);

    expect(syncVersions).toHaveBeenCalledWith({
      rootDir: undefined,
      packagesPattern: undefined,
      configFileName: undefined,
      verbose: true,
    });
  });

  it('should call checkVersions when check-versions command is used', async () => {
    const checkVersions = vi.mocked(
      await import('../../src/version/check-versions.js')
    ).checkVersions;

    await cli(['node', 'contexify-build', 'check-versions']);

    expect(checkVersions).toHaveBeenCalledWith({
      rootDir: undefined,
      packagesPattern: undefined,
      configFileName: undefined,
      verbose: true,
      throwOnError: undefined,
    });
  });

  it('should pass options to syncVersions', async () => {
    const syncVersions = vi.mocked(
      await import('../../src/version/sync-versions.js')
    ).syncVersions;

    await cli([
      'node',
      'contexify-build',
      'sync-versions',
      '--root-dir',
      '/test',
      '--packages-pattern',
      'test-packages/*',
      '--config-file',
      'test-config.json',
      '--quiet',
    ]);

    expect(syncVersions).toHaveBeenCalledWith({
      rootDir: '/test',
      packagesPattern: 'test-packages/*',
      configFileName: 'test-config.json',
      verbose: false,
    });
  });

  it('should pass options to checkVersions', async () => {
    const checkVersions = vi.mocked(
      await import('../../src/version/check-versions.js')
    ).checkVersions;

    await cli([
      'node',
      'contexify-build',
      'check-versions',
      '--root-dir',
      '/test',
      '--packages-pattern',
      'test-packages/*',
      '--config-file',
      'test-config.json',
      '--quiet',
      '--throw-on-error',
    ]);

    expect(checkVersions).toHaveBeenCalledWith({
      rootDir: '/test',
      packagesPattern: 'test-packages/*',
      configFileName: 'test-config.json',
      verbose: false,
      throwOnError: true,
    });
  });

  it('should exit with code 1 when syncVersions throws an error', async () => {
    const syncVersions = vi.mocked(
      await import('../../src/version/sync-versions.js')
    ).syncVersions;
    syncVersions.mockRejectedValueOnce(new Error('Test error'));

    await cli(['node', 'contexify-build', 'sync-versions']);

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should exit with code 1 when checkVersions throws an error', async () => {
    const checkVersions = vi.mocked(
      await import('../../src/version/check-versions.js')
    ).checkVersions;
    checkVersions.mockRejectedValueOnce(new Error('Test error'));

    await cli(['node', 'contexify-build', 'check-versions']);

    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
