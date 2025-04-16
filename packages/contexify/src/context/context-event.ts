import { Binding } from '../binding/binding.js';

import { Context } from './context.js';

/**
 * Events emitted by a context
 */
export type ContextEvent = {
  /**
   * Source context that emits the event
   */
  context: Context;
  /**
   * Binding that is being added/removed/updated
   */
  binding: Readonly<Binding<unknown>>;
  /**
   * Event type
   */
  type: string; // 'bind' or 'unbind'
};

/**
 * Synchronous listener for context events
 */
export type ContextEventListener = (event: ContextEvent) => void;
