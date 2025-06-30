import { type Binding, createBindingFromClass } from 'contexify';

import type { Component } from '../component.js';

import { TaskKeys } from './keys.js';
import { InMemoryTaskRepository } from './services/task-repository.js';
import { DefaultTaskService } from './services/task-service.js';

/**
 * Task Component
 *
 * Provides task management functionality
 */
export class TaskComponent implements Component {
  /**
   * Component bindings
   */
  bindings: Binding[] = [
    // Register task repository
    createBindingFromClass(InMemoryTaskRepository, {
      key: TaskKeys.TASK_REPOSITORY,
    }),

    // Register task service
    createBindingFromClass(DefaultTaskService, {
      key: TaskKeys.TASK_SERVICE,
    }),
  ];

  /**
   * Constructor
   */
  constructor() {
    // Additional initialization if needed
  }
}
