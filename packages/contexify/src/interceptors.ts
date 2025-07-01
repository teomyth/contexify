/**
 * Contexify Interceptors - Method interception for dependency injection
 *
 * This module provides method interception capabilities.
 *
 * @packageDocumentation
 */

export * from './interceptor/interception-proxy.js';
// Export interceptor modules
export * from './interceptor/interceptor.js';
export * from './interceptor/interceptor-chain.js';
export * from './interceptor/invocation.js';

// Export version
export { VERSION } from './version.js';
