import { BindingScope, inject, injectable } from 'contexify';

import { CoreKeys } from '../../core/keys.js';
import type { Logger } from '../../core/services/logger.js';
import { type Task, TaskStatus } from '../models/task.js';

/**
 * Task repository interface
 */
export interface TaskRepository {
  /**
   * Find all tasks
   */
  findAll(): Promise<Task[]>;

  /**
   * Find task by ID
   */
  findById(id: string): Promise<Task | undefined>;

  /**
   * Create task
   */
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;

  /**
   * Update task
   */
  update(id: string, task: Partial<Task>): Promise<Task | undefined>;

  /**
   * Delete task
   */
  delete(id: string): Promise<boolean>;

  /**
   * Initialize repository
   */
  initialize(): Promise<void>;
}

/**
 * In-memory task repository implementation
 */
@injectable({
  scope: BindingScope.SINGLETON,
  tags: ['repository', 'initializer', 'cleaner'],
})
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map();

  constructor(@inject(CoreKeys.LOGGER) private logger: Logger) {}

  /**
   * Find all tasks
   */
  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  /**
   * Find task by ID
   */
  async findById(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  /**
   * Create task
   */
  async create(
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Task> {
    const id = Date.now().toString();
    const now = new Date();

    const task: Task = {
      id,
      ...taskData,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(id, task);
    this.logger.debug(`Task created: ${id}`);

    return task;
  }

  /**
   * Update task
   */
  async update(id: string, taskData: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);

    if (!task) {
      return undefined;
    }

    const updatedTask: Task = {
      ...task,
      ...taskData,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };

    this.tasks.set(id, updatedTask);
    this.logger.debug(`Task updated: ${id}`);

    return updatedTask;
  }

  /**
   * Delete task
   */
  async delete(id: string): Promise<boolean> {
    const result = this.tasks.delete(id);

    if (result) {
      this.logger.debug(`Task deleted: ${id}`);
    }

    return result;
  }

  /**
   * Initialize repository
   */
  async initialize(): Promise<void> {
    this.logger.info('Initializing task repository');

    // Add some sample tasks
    await this.create({
      title: 'Complete example application',
      description:
        'Create an example application that demonstrates Context best practices',
      status: TaskStatus.IN_PROGRESS,
    });

    await this.create({
      title: 'Write documentation',
      description: 'Write detailed documentation for Context best practices',
      status: TaskStatus.TODO,
    });

    this.logger.info('Task repository initialized with sample tasks');
  }

  /**
   * Clean up repository
   */
  async cleanup(): Promise<void> {
    this.logger.info('Cleaning up task repository');
    this.tasks.clear();
  }
}
