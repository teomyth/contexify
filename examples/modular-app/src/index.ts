import { Application } from './application.js';
import { TaskKeys } from './components/task/keys.js';
import { TaskStatus } from './components/task/models/task.js';
import { TaskService } from './components/task/services/task-service.js';

/**
 * Run the example application
 */
async function runExample() {
  // Create application instance
  const app = new Application();

  try {
    // Start the application
    await app.start();

    // Get the task service
    const taskService = await app.get<TaskService>(TaskKeys.TASK_SERVICE);

    // Create a new task
    const newTask = await taskService.createTask({
      title: 'Learn Context best practices',
      description: 'Understand and apply best practice patterns for Context',
    });
    console.log('\nNewly created task:');
    console.log(newTask);

    // Get all tasks
    const allTasks = await taskService.getAllTasks();
    console.log('\nAll tasks:');
    console.log(allTasks);

    // Update task status
    if (allTasks.length > 0) {
      const firstTask = allTasks[0];
      const updatedTask = await taskService.updateTaskStatus(
        firstTask.id,
        TaskStatus.DONE
      );
      console.log('\nUpdated task:');
      console.log(updatedTask);
    }

    // Stop the application
    await app.stop();
  } catch (error) {
    console.error('Application error:', error);
    process.exit(1);
  }
}

// Run the example
runExample().catch((err) => {
  console.error('Uncaught error:', err);
  process.exit(1);
});
