/**
 * Version checking
 *
 * This module checks if version constants in source files are in sync with package.json versions.
 */

import * as fgPkg from 'fast-glob';

const fg = fgPkg.default || fgPkg;

import fs from 'fs';
import path from 'path';
// No types needed in JavaScript
import { logger } from '../utils/logger.js';

/**
 * Check if version constants in source files are in sync with package.json versions
 *
 * @param options Options for version checking
 * @returns Results of the check
 */
export async function checkVersions(options = {}) {
  const {
    rootDir = process.cwd(),
    packagesPattern = 'packages/*',
    configFileName = '.version-sync.json',
    verbose = true,
    throwOnError = false,
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
    logger.group(`Version Check (${configFiles.length} packages)`);
  }

  const results = [];
  let hasErrors = false;

  for (const configFile of configFiles) {
    const packageDir = path.dirname(path.resolve(rootDir, configFile));
    const packageJsonPath = path.join(packageDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      if (verbose) {
        logger.fileStatus(
          `Package.json not found for config ${configFile}`,
          'error'
        );
      }
      hasErrors = true;
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

    // Check each file specified in the config
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
        hasErrors = true;
        continue;
      }

      try {
        // Read the file content
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Create a regex from the pattern
        const pattern = new RegExp(fileConfig.pattern);
        const match = pattern.exec(fileContent);

        if (!match) {
          if (verbose) {
            logger.fileStatus(`${fileConfig.path}: Pattern not found`, 'error');
          }
          result.errorFiles[fileConfig.path] = 'Pattern not found';
          hasErrors = true;
          continue;
        }

        const currentVersion = match[1];

        if (currentVersion !== version) {
          if (verbose) {
            logger.fileStatus(
              `${fileConfig.path}: Version mismatch - expected ${version}, found ${currentVersion}`,
              'error'
            );
          }
          result.errorFiles[fileConfig.path] =
            `Version mismatch: expected ${version}, found ${currentVersion}`;
          hasErrors = true;
        } else {
          if (verbose) {
            logger.fileStatus(
              `${fileConfig.path} has correct version ${version}`,
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
        hasErrors = true;
      }
    }

    results.push(result);
  }

  if (hasErrors) {
    if (verbose) {
      logger.error(
        'Version check failed. Some files are not in sync with package.json versions.'
      );
    }
    if (throwOnError) {
      throw new Error(
        'Version check failed. Some files are not in sync with package.json versions.'
      );
    }
  } else if (verbose) {
    logger.success(
      'Version check passed. All files are in sync with package.json versions.'
    );
  }

  return results;
}
