import { Context } from 'contexify';

/**
 * This example demonstrates the basic usage of Context.
 * It shows how to create a context, bind a value, and retrieve it.
 */

// Create a context
const context = new Context('my-context');

// Bind a value to a key
context.bind('greeting').to('Hello, world!');

// Retrieve the value
async function run() {
  const greeting = await context.get('greeting');
  console.log(greeting); // Output: Hello, world!
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch((err) => console.error(err));
}
