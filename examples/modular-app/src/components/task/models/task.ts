/**
 * Task status enumeration
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

/**
 * Task model
 */
export interface Task {
  /**
   * Task ID
   */
  id: string;

  /**
   * Task title
   */
  title: string;

  /**
   * Task description
   */
  description?: string;

  /**
   * Task status
   */
  status: TaskStatus;

  /**
   * Creation time
   */
  createdAt: Date;

  /**
   * Update time
   */
  updatedAt: Date;
}

/**
 * Data for creating a task
 */
export interface TaskData {
  /**
   * Task title
   */
  title: string;

  /**
   * Task description
   */
  description?: string;
}
