/**
 * Contexify Core - Minimal dependency injection container
 *
 * This module provides the core functionality of Contexify without any
 * dependencies on decorators or metadata reflection.
 *
 * @packageDocumentation
 */

// Export core modules
export * from './binding/binding.js';
export * from './binding/binding-filter.js';
export * from './binding/binding-key.js';
export * from './binding/binding-sorter.js';
export * from './context/context.js';
export * from './context/context-event.js';
export * from './context/context-observer.js';
export * from './context/context-subscription.js';
export * from './context/context-view.js';
export * from './provider/provider.js';
export * from './resolution/resolution-session.js';
export * from './utils/json-types.js';
export * from './utils/keys.js';
export * from './utils/value-promise.js';
// Export specific items from unique-id.js to avoid naming conflicts
export {
  createIdGenerator,
  generateUniqueId,
  generateUUID,
  UNIQUE_ID_PATTERN,
} from './utils/unique-id.js';

// Export version
export { VERSION } from './version.js';
