import { BindingKey } from 'contexify';

import type { ConfigService } from './services/config-service.js';
import type { Logger } from './services/logger.js';

/**
 * Binding keys for the core component
 */
export namespace CoreKeys {
  /**
   * Binding key for the logger service
   */
  export const LOGGER = BindingKey.create<Logger>('services.Logger');

  /**
   * Binding key for the configuration service
   */
  export const CONFIG_SERVICE = BindingKey.create<ConfigService>(
    'services.ConfigService'
  );
}
