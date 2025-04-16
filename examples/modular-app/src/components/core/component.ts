import { Binding, createBindingFromClass } from 'contexify';

import { Component } from '../component.js';

import { CoreKeys } from './keys.js';
import { MemoryConfigService } from './services/config-service.js';
import { ConsoleLogger } from './services/logger.js';

/**
 * Core Component
 *
 * Provides basic services such as logging and configuration
 */
export class CoreComponent implements Component {
  /**
   * Component bindings
   */
  bindings: Binding[] = [
    // Register logger service
    createBindingFromClass(ConsoleLogger, {
      key: CoreKeys.LOGGER,
    }),

    // Register configuration service
    createBindingFromClass(MemoryConfigService, {
      key: CoreKeys.CONFIG_SERVICE,
    }),
  ];

  /**
   * Life cycle observers
   */
  // lifeCycleObservers = [ServiceObserver];

  /**
   * Constructor
   */
  constructor() {
    // Additional initialization if needed
  }
}
