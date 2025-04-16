import { injectable, BindingScope, inject } from 'contexify';

import { CoreKeys } from '../../core/keys.js';
import { Logger } from '../../core/services/logger.js';
import { TaskKeys } from '../keys.js';
import { Task, TaskData, TaskStatus } from '../models/task.js';

import { TaskRepository } from './task-repository.js';
// import { LoggingInterceptor } from '../../../interceptors/logging-interceptor.js';

/**
 * Task service interface
 */
export interface TaskService {
  /**
   * Get all tasks
   */
  getAllTasks(): Promise<Task[]>;

  /**
   * Get task details
   */
  getTaskById(id: string): Promise<Task | undefined>;

  /**
   * Create new task
   */
  createTask(data: TaskData): Promise<Task>;

  /**
   * Update task status
   */
  updateTaskStatus(id: string, status: TaskStatus): Promise<Task | undefined>;

  /**
   * Delete task
   */
  deleteTask(id: string): Promise<boolean>;
}

/**
 * Task service implementation
 */
@injectable({
  scope: BindingScope.SINGLETON,
  tags: ['service'],
})
export class DefaultTaskService implements TaskService {
  constructor(
    @inject(CoreKeys.LOGGER) private logger: Logger,
    @inject(TaskKeys.TASK_REPOSITORY) private taskRepository: TaskRepository
  ) {}

  /**
   * Get all tasks
   */
  // @intercept(LoggingInterceptor) - Commented out due to TypeScript issues
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  /**
   * Get task details
   */
  // @intercept(LoggingInterceptor) - Commented out due to TypeScript issues
  async getTaskById(id: string): Promise<Task | undefined> {
    return this.taskRepository.findById(id);
  }

  /**
   * Create new task
   */
  // @intercept(LoggingInterceptor) - Commented out due to TypeScript issues
  async createTask(data: TaskData): Promise<Task> {
    // Validate task data
    if (!data.title || data.title.trim() === '') {
      throw new Error('Task title is required');
    }

    // Create task
    return this.taskRepository.create({
      title: data.title,
      description: data.description,
      status: TaskStatus.TODO,
    });
  }

  /**
   * Update task status
   */
  // @intercept(LoggingInterceptor) - Commented out due to TypeScript issues
  async updateTaskStatus(
    id: string,
    status: TaskStatus
  ): Promise<Task | undefined> {
    // Check if task exists
    const task = await this.taskRepository.findById(id);
    if (!task) {
      this.logger.warn(`Task not found: ${id}`);
      return undefined;
    }

    // Update task status
    return this.taskRepository.update(id, { status });
  }

  /**
   * Delete task
   */
  // @intercept(LoggingInterceptor) - Commented out due to TypeScript issues
  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}
