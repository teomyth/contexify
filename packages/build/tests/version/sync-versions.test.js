/**
 * Tests for version synchronization
 */

import fs from 'fs';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { syncVersions } from '../../src/version/sync-versions.js';

// Mock dependencies
vi.mock('fs');
vi.mock('path');
vi.mock('fast-glob', () => ({
  default: vi.fn(),
}));
vi.mock('replace-in-file', () => ({
  replaceInFile: vi.fn(),
}));
vi.mock('../../src/utils/logger.js', () => ({
  logger: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    group: vi.fn(),
    nestedGroup: vi.fn(),
    fileStatus: vi.fn(),
  },
}));

describe('syncVersions', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock path.resolve
    path.resolve.mockImplementation((...args) => args.join('/'));
    path.dirname.mockImplementation((p) => p.split('/').slice(0, -1).join('/'));
    path.join.mockImplementation((...args) => args.join('/'));

    // Mock process.cwd
    vi.spyOn(process, 'cwd').mockReturnValue('/test');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return empty array when no config files are found', async () => {
    // Mock fast-glob to return empty array
    const fg = await import('fast-glob');
    fg.default.mockResolvedValueOnce([]);

    const result = await syncVersions();

    expect(result).toEqual([]);
  });

  it('should process config files and update versions', async () => {
    // Mock fast-glob to return config files
    const fg = await import('fast-glob');
    fg.default.mockResolvedValueOnce(['packages/test/.version-sync.json']);

    // Mock fs.existsSync to return true
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync
    fs.readFileSync.mockImplementation((file) => {
      if (file === '/test/packages/test/package.json') {
        return JSON.stringify({
          name: 'test-package',
          version: '1.0.0',
        });
      }
      if (file === '/test/packages/test/.version-sync.json') {
        return JSON.stringify({
          files: [
            {
              path: 'src/index.js',
              pattern: 'export const VERSION = [\'"](.+?)[\'"]',
              replacement: "export const VERSION = '${version}'",
            },
          ],
        });
      }
      return '';
    });

    // Mock replaceInFile
    const { replaceInFile } = await import('replace-in-file');
    replaceInFile.mockResolvedValueOnce([{ hasChanged: true }]);

    const result = await syncVersions();

    expect(result).toHaveLength(1);
    expect(result[0].packageName).toBe('test-package');
    expect(result[0].version).toBe('1.0.0');
    expect(result[0].updatedFiles).toContain('src/index.js');
  });

  it('should handle errors when processing files', async () => {
    // Mock fast-glob to return config files
    const fg = await import('fast-glob');
    fg.default.mockResolvedValueOnce(['packages/test/.version-sync.json']);

    // Mock fs.existsSync to return true
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync
    fs.readFileSync.mockImplementation((file) => {
      if (file === '/test/packages/test/package.json') {
        return JSON.stringify({
          name: 'test-package',
          version: '1.0.0',
        });
      }
      if (file === '/test/packages/test/.version-sync.json') {
        return JSON.stringify({
          files: [
            {
              path: 'src/index.js',
              pattern: 'export const VERSION = [\'"](.+?)[\'"]',
              replacement: "export const VERSION = '${version}'",
            },
          ],
        });
      }
      return '';
    });

    // Mock replaceInFile to throw an error
    const { replaceInFile } = await import('replace-in-file');
    replaceInFile.mockRejectedValueOnce(new Error('Test error'));

    const result = await syncVersions();

    expect(result).toHaveLength(1);
    expect(result[0].errorFiles['src/index.js']).toBe('Test error');
  });
});
