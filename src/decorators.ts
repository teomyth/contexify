/**
 * Contexify Decorators - TypeScript decorators for dependency injection
 *
 * This module provides TypeScript decorators for dependency injection.
 * It depends on metarize for metadata reflection.
 *
 * @packageDocumentation
 */

// Export decorator modules
export * from './binding/binding-decorator.js';
export * from './inject/inject.js';
export * from './inject/inject-config.js';

// Export version
export { VERSION } from './index.js';
