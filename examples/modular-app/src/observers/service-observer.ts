import type {
  BindingFilter,
  ContextObserver,
  ContextObserverFn,
} from 'contexify';

import type { Logger } from '../components/core/services/logger.js';

/**
 * Service Observer
 *
 * Monitors the addition and removal of service bindings
 */
export class ServiceObserver implements ContextObserver {
  /**
   * Constructor
   * @param logger Logger service
   */
  constructor(private logger: Logger) {}

  /**
   * Binding filter, only interested in bindings with 'service' tag
   */
  filter: BindingFilter = (binding) =>
    binding.tagMap && binding.tagMap.service != null;

  /**
   * Observe binding events
   * @param event Event type ('bind' or 'unbind')
   * @param binding Binding object
   */
  observe: ContextObserverFn = (event: string, binding: any): void => {
    if (event === 'bind') {
      this.logger.info(`Service registered: ${binding.key}`);

      // Record service tags
      if (binding.tagNames.length > 0) {
        this.logger.debug(`Service tags: ${binding.tagNames.join(', ')}`);
      }
    } else if (event === 'unbind') {
      this.logger.info(`Service unregistered: ${binding.key}`);
    }
  };
}
