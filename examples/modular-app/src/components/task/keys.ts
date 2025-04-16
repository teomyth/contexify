import { BindingKey } from 'contexify';

import { TaskRepository } from './services/task-repository.js';
import { TaskService } from './services/task-service.js';

/**
 * Binding keys for the task component
 */
export namespace TaskKeys {
  /**
   * Binding key for the task service
   */
  export const TASK_SERVICE = BindingKey.create<TaskService>(
    'services.TaskService'
  );

  /**
   * Binding key for the task repository
   */
  export const TASK_REPOSITORY = BindingKey.create<TaskRepository>(
    'repositories.TaskRepository'
  );
}
