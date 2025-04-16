# Contexify Documentation Code

This project contains executable code examples for the Contexify documentation. These examples serve as the source of truth for the code snippets in the documentation, ensuring that all code examples are valid and up-to-date.

## Project Structure

- `core-concepts/`: Examples for core concepts (Context, Binding, Dependency Injection, etc.)
- `best-practices/`: Examples for best practices (Application, Component, etc.)
- `modular-app/`: A complete modular application example
- `interceptors/`: Examples for using interceptors
- `observers/`: Examples for using observers
- `scripts/`: Scripts for validating and updating documentation

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Running Examples

You can run individual examples using:

```bash
# Run a specific example
npm run start:basic

# Run the modular application example
npm run start:modular
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Documentation Integration

### Validating Documentation Code

You can validate that all code snippets in the documentation are executable:

```bash
npm run validate
```

This script extracts code snippets from the documentation, converts them to executable test files, and runs them to ensure they work correctly.

### Updating Documentation with Code Examples

You can update the documentation with validated code examples:

```bash
npm run update
```

This script updates the code snippets in the documentation with the validated examples from this project.

## Adding New Examples

When adding new examples, please follow these guidelines:

1. Place the example in the appropriate directory based on its purpose
2. Include a clear description of what the example demonstrates
3. Make sure the example is executable
4. Add a test file to ensure the example runs without errors
5. Export a `run` function that can be called by tests
6. Use async `setup` methods in application classes and call them explicitly

### Async Setup Pattern

When creating application classes that extend `Context`, use the async `setup` pattern:

```typescript
class MyApplication extends Context {
  constructor() {
    super('application');
  }

  async setup() {
    // Configure the application
    // ...

    // You can perform async operations here
    await someAsyncOperation();

    return this;
  }
}

async function main() {
  // Create the application
  const app = new MyApplication();

  // Setup the application (explicitly await)
  await app.setup();

  // Start the application
  await app.start();
}
```

This pattern allows for async initialization in the `setup` method and makes the initialization flow more explicit.

### Example Structure

```typescript
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
  run().catch(err => console.error(err));
}
```

## Documentation Markers

To mark a section in the documentation for automatic updating, use the following format:

```markdown
<!-- CODE:example-name:START -->
```typescript
// Example code will be inserted here
```
<!-- CODE:example-name:END -->
```

Replace `example-name` with the name of the example file (without the `.ts` extension).
