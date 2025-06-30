/**
 * Task Component Module
 *
 * This module exports all the public artifacts of the task component
 */

// Export the component class
export * from './component.js';

// Export keys for dependency injection
export * from './keys.js';

// Export models
export * from './models/task.js';
export * from './services/task-repository.js';
// Export service interfaces and implementations
export * from './services/task-service.js';
