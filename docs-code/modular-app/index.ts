import { ModularApplication } from './application.js';

/**
 * This is the entry point for the modular application example.
 * It creates and starts the application.
 */

async function main() {
  // Create the application
  const app = new ModularApplication();

  // Setup the application
  await app.setup();

  // Start the application
  await app.start();

  console.log('Application is running');

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await app.stop();
    process.exit(0);
  });
}

// Export the main function for testing
export { main };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  main().catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
  });
}
