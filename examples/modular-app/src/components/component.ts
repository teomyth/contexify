import { Binding } from 'contexify';

/**
 * Component interface
 *
 * This interface defines the structure of a component in the application.
 * Components are used to group related functionality and contribute
 * various artifacts to the application.
 */
export interface Component {
  /**
   * Bindings to be added to the application context
   */
  bindings?: Binding[];

  /**
   * Providers to be bound to the application context
   */
  providers?: Record<string, Function>;

  /**
   * Classes to be bound to the application context
   */
  classes?: Record<string, Function>;

  /**
   * Life cycle observers to be registered with the application
   */
  lifeCycleObservers?: Function[];
}
