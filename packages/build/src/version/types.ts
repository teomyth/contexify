/**
 * Types for version synchronization
 */

/**
 * Configuration for a file to synchronize
 */
export interface VersionSyncFileConfig {
  /**
   * Path to the file, relative to the package directory
   */
  path: string;

  /**
   * Regular expression pattern to match the version string
   */
  pattern: string;

  /**
   * Replacement string, with ${version} placeholder
   */
  replacement: string;
}

/**
 * Configuration for version synchronization
 */
export interface VersionSyncConfig {
  /**
   * Files to synchronize
   */
  files: VersionSyncFileConfig[];
}

/**
 * Result of a version synchronization operation
 */
export interface VersionSyncResult {
  /**
   * Package name
   */
  packageName: string;

  /**
   * Package version
   */
  version: string;

  /**
   * Files that were updated
   */
  updatedFiles: string[];

  /**
   * Files that were already up to date
   */
  upToDateFiles: string[];

  /**
   * Files that had errors
   */
  errorFiles: Record<string, string>;
}

/**
 * Options for version synchronization
 */
export interface VersionSyncOptions {
  /**
   * Root directory of the project
   * Default: process.cwd()
   */
  rootDir?: string;

  /**
   * Pattern to match package directories
   * Default: 'packages/*'
   */
  packagesPattern?: string;

  /**
   * Name of the version sync configuration file
   * Default: '.version-sync.json'
   */
  configFileName?: string;

  /**
   * Whether to log progress
   * Default: true
   */
  verbose?: boolean;
}

/**
 * Options for version checking
 */
export interface VersionCheckOptions extends VersionSyncOptions {
  /**
   * Whether to throw an error if versions are not in sync
   * Default: false
   */
  throwOnError?: boolean;
}
