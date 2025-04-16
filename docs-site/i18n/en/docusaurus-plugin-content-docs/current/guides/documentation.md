---
sidebar_position: 4
---

# Documentation Development Guide

This guide provides detailed instructions on how to maintain and update Contexify documentation.

## Documentation Structure

Contexify's documentation system consists of the following parts:

- **docs-site**: Documentation website built with Docusaurus
- **docs-code**: Contains executable code examples used to validate code snippets in the documentation

## Documentation Code Examples

To ensure that code examples in the documentation are accurate and runnable, we use the `docs-code` directory to store and validate these examples.

### Writing Code Examples

When adding new code examples to the documentation, follow these steps:

1. Create a new TypeScript file in the `docs-code` directory, with a filename that reflects the purpose of the example
2. Implement a complete, runnable code example
3. Ensure the code example can run independently and includes all necessary imports
4. Add appropriate comments explaining key parts of the code

Example:

```typescript
// docs-code/core-concepts/binding-example.ts
import { Context, injectable, inject } from 'contexify';

// Create a service class
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

// Create a class that uses GreetingService
@injectable()
class Greeter {
  constructor(@inject('services.GreetingService') private greetingService: GreetingService) {}

  greet(name: string) {
    return this.greetingService.sayHello(name);
  }
}

// Run the example
async function main() {
  // Create a context
  const context = new Context('example');
  
  // Bind services
  context.bind('services.GreetingService').toClass(GreetingService);
  context.bind('services.Greeter').toClass(Greeter);
  
  // Get Greeter instance
  const greeter = await context.get<Greeter>('services.Greeter');
  
  // Use Greeter
  console.log(greeter.greet('World'));
}

// If this file is run directly, execute the main function
if (typeof require !== 'undefined' && require.main === module) {
  main().catch(console.error);
}

// Export functions for testing
export { main };
```

### Testing Code Examples

All code examples should have corresponding tests to ensure they work correctly:

1. Create a test file in the `docs-code/tests` directory
2. Write tests using Vitest to verify the functionality of the code example
3. Ensure tests cover the main functionality of the code example

Example:

```typescript
// docs-code/tests/binding-example.test.ts
import { describe, it, expect } from 'vitest';
import { main } from '../core-concepts/binding-example';

describe('Binding Example', () => {
  it('should run without errors', async () => {
    // Capture console output
    const originalConsoleLog = console.log;
    let output = '';
    
    console.log = (message) => {
      output = message;
    };
    
    // Run the example
    await main();
    
    // Restore console
    console.log = originalConsoleLog;
    
    // Verify output
    expect(output).toBe('Hello, World!');
  });
});
```

## Integrating Code Examples into Documentation

To integrate code examples into the documentation, use special markers to indicate where the code example should be placed:

```markdown
<!-- CODE:binding-example:START -->
```typescript
// Content here will be automatically updated
```
<!-- CODE:binding-example:END -->
```

These markers tell the documentation update system where to insert the code example.

## Documentation Update Process

When code structure changes, follow this process to update the documentation:

1. Update code examples in `docs-code` to match the new code structure
2. Run tests to ensure code examples work correctly
3. Use the documentation update scripts to synchronize changes to the documentation

### Automated Documentation Updates

Contexify provides several scripts to automate the documentation update process:

#### Validating Documentation Code

Run the following command to validate all code examples in the documentation:

```bash
npm run docs:validate
```

This command will:
- Extract all code examples from the documentation
- Convert them to executable TypeScript files
- Run these files to ensure they have no errors

#### Updating Documentation Code

Run the following command to update code examples in the documentation:

```bash
npm run docs:update
```

This command will:
- Read all TypeScript files in the `docs-code` directory
- Extract code content (removing import and export statements)
- Update corresponding code examples in the documentation

#### Testing Documentation Code

Run the following command to test the documentation code:

```bash
npm run docs:test
```

This command will run all tests in the `docs-code` directory to ensure code examples work correctly.

## Previewing Documentation Locally

To preview the documentation website locally, run:

```bash
npm run docs:start
```

This command will start the Docusaurus development server and open the documentation website in your browser. You can see changes in real-time.

## Building Documentation

To build the documentation website, run:

```bash
npm run docs:build
```

This command will generate static HTML files that can be deployed to any static website hosting service.

## Serving Documentation Locally

To serve the built documentation locally, run:

```bash
npm run docs:serve
```

This command will start a local server serving the built documentation website.

## Best Practices

- **Keep in Sync**: Ensure code examples in `docs-code` stay in sync with the actual codebase
- **Complete Examples**: Provide complete, runnable code examples rather than fragments
- **Test Coverage**: Write tests for all code examples
- **Regular Validation**: Regularly run the `docs:validate` command to ensure code examples in the documentation are still valid
- **Update Documentation**: Update documentation immediately after code structure changes

## Documentation Release Process

When preparing to release a new version of the documentation, follow these steps:

1. Ensure all code examples are updated and pass tests
2. Run `npm run docs:validate` to ensure code examples in the documentation are valid
3. Run `npm run docs:build` to build the documentation website
4. Check that the built documentation website is correct
5. Deploy the documentation website

## Troubleshooting

### Documentation Validation Fails

If the `docs:validate` command fails, it may be because:

- Code examples in the documentation contain errors
- Code examples depend on packages that are not installed
- Code examples use incompatible APIs

Solution:
1. Check the error message to determine the issue
2. Update the code examples to fix the errors
3. Run the `docs:validate` command again

### Documentation Update Fails

If the `docs:update` command fails, it may be because:

- The documentation is missing necessary markers
- The `docs-code` directory is missing corresponding code files
- File permission issues

Solution:
1. Ensure the documentation contains the correct markers
2. Ensure the `docs-code` directory contains the corresponding code files
3. Check file permissions
