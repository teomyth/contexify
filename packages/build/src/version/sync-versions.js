/**
 * Version synchronization
 *
 * This module synchronizes version constants in source files with package.json versions.
 */

import * as fgPkg from 'fast-glob';
import { replaceInFile } from 'replace-in-file';

const fg = fgPkg.default || fgPkg;

import fs from 'fs';
import path from 'path';
// No types needed in JavaScript
import { logger } from '../utils/logger.js';

/**
 * Synchronize version constants in source files with package.json versions
 *
 * @param options Options for version synchronization
 * @returns Results of the synchronization
 */
export async function syncVersions(options = {}) {
  const {
    rootDir = process.cwd(),
    packagesPattern = 'packages/*',
    configFileName = '.version-sync.json',
    verbose = true,
  } = options;

  // Find all packages with version sync configuration files
  const configFiles = await fg(`${packagesPattern}/${configFileName}`, {
    cwd: rootDir,
  });

  if (configFiles.length === 0) {
    if (verbose) {
      logger.info('No version sync configuration files found.');
    }
    return [];
  }

  if (verbose) {
    logger.group(`Version Synchronization (${configFiles.length} packages)`);
  }

  const results = [];

  for (const configFile of configFiles) {
    const packageDir = path.dirname(path.resolve(rootDir, configFile));
    const packageJsonPath = path.join(packageDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      if (verbose) {
        logger.error(`Package.json not found for config ${configFile}`);
      }
      continue;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;
    const packageName = packageJson.name;

    if (verbose) {
      logger.nestedGroup(
        `[${results.length + 1}/${configFiles.length}] ${packageName} (${version})`
      );
    }

    // Read the sync configuration
    const syncConfig = JSON.parse(
      fs.readFileSync(path.resolve(rootDir, configFile), 'utf8')
    );

    const result = {
      packageName,
      version,
      updatedFiles: [],
      upToDateFiles: [],
      errorFiles: {},
    };

    // Update each file specified in the config
    for (const fileConfig of syncConfig.files) {
      const filePath = path.join(packageDir, fileConfig.path);

      if (!fs.existsSync(filePath)) {
        if (verbose) {
          logger.fileStatus(
            `${fileConfig.path} not found in package ${packageName}`,
            'error'
          );
        }
        result.errorFiles[fileConfig.path] = 'File not found';
        continue;
      }

      try {
        const pattern = new RegExp(fileConfig.pattern);
        const replacement = fileConfig.replacement.replace(
          '${version}',
          version
        );

        const results = await replaceInFile({
          files: filePath,
          from: pattern,
          to: replacement,
        });

        if (results[0].hasChanged) {
          if (verbose) {
            logger.fileStatus(
              `${fileConfig.path} updated to version ${version}`,
              'success'
            );
          }
          result.updatedFiles.push(fileConfig.path);
        } else {
          if (verbose) {
            logger.fileStatus(
              `${fileConfig.path} is already up to date`,
              'success'
            );
          }
          result.upToDateFiles.push(fileConfig.path);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (verbose) {
          logger.fileStatus(`${fileConfig.path}: ${errorMessage}`, 'error');
        }
        result.errorFiles[fileConfig.path] = errorMessage;
      }
    }

    results.push(result);
  }

  if (verbose) {
    logger.success('Version synchronization completed successfully.');
  }

  return results;
}
