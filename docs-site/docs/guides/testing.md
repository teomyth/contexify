---
sidebar_position: 3
---

# Testing Guide

This guide provides instructions for testing applications built with Contexify.

## Overview

Testing is an essential part of software development. Contexify's dependency injection system makes it easy to test your application by allowing you to mock dependencies.

## Types of Tests

When testing a Contexify application, you'll typically write the following types of tests:

- **Unit Tests**: Test individual classes or functions in isolation
- **Integration Tests**: Test how multiple components work together
- **End-to-End Tests**: Test the entire application from the user's perspective

## Unit Testing

Unit tests focus on testing a single unit of code in isolation. In Contexify applications, this typically means testing a single class or function.

### Testing Services

Here's an example of testing a service:

```typescript
import { Context } from 'contexify';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

describe('UserService', () => {
  let context: Context;
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Create a mock repository
    mockUserRepository = {
      findById: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    // Create a context
    context = new Context('test');

    // Bind the mock repository
    context.bind('repositories.UserRepository').to(mockUserRepository);

    // Bind the service
    context.bind('services.UserService').toClass(UserService);
  });

  it('should get a user by id', async () => {
    // Arrange
    const userId = '123';
    const expectedUser = { id: userId, name: 'John Doe' };
    mockUserRepository.findById.mockResolvedValue(expectedUser);

    // Act
    userService = await context.get('services.UserService');
    const user = await userService.getUser(userId);

    // Assert
    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    expect(user).toEqual(expectedUser);
  });

  it('should create a user', async () => {
    // Arrange
    const userData = { name: 'John Doe' };
    const expectedUser = { id: '123', ...userData };
    mockUserRepository.create.mockResolvedValue(expectedUser);

    // Act
    userService = await context.get('services.UserService');
    const user = await userService.createUser(userData);

    // Assert
    expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
    expect(user).toEqual(expectedUser);
  });
});
```

### Testing Controllers

Here's an example of testing a controller:

```typescript
import { Context } from 'contexify';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let context: Context;
  let userController: UserController;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    // Create a mock service
    mockUserService = {
      getUser: jest.fn(),
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    // Create a context
    context = new Context('test');

    // Bind the mock service
    context.bind('services.UserService').to(mockUserService);

    // Bind the controller
    context.bind('controllers.UserController').toClass(UserController);
  });

  it('should get a user by id', async () => {
    // Arrange
    const userId = '123';
    const expectedUser = { id: userId, name: 'John Doe' };
    mockUserService.getUser.mockResolvedValue(expectedUser);

    // Act
    userController = await context.get('controllers.UserController');
    const user = await userController.getUser(userId);

    // Assert
    expect(mockUserService.getUser).toHaveBeenCalledWith(userId);
    expect(user).toEqual(expectedUser);
  });

  it('should create a user', async () => {
    // Arrange
    const userData = { name: 'John Doe' };
    const expectedUser = { id: '123', ...userData };
    mockUserService.createUser.mockResolvedValue(expectedUser);

    // Act
    userController = await context.get('controllers.UserController');
    const user = await userController.createUser(userData);

    // Assert
    expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
    expect(user).toEqual(expectedUser);
  });
});
```

## Integration Testing

Integration tests focus on testing how multiple components work together. In Contexify applications, this typically means testing how services, repositories, and other components interact.

```typescript
import { Context } from 'contexify';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { DatabaseService } from '../services/database.service';

describe('User Integration', () => {
  let context: Context;
  let userService: UserService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    // Create a context
    context = new Context('test');

    // Bind the database service
    context.bind('services.DatabaseService').toClass(DatabaseService);

    // Bind the repository
    context.bind('repositories.UserRepository').toClass(UserRepository);

    // Bind the service
    context.bind('services.UserService').toClass(UserService);

    // Get the database service
    databaseService = await context.get('services.DatabaseService');

    // Initialize the database
    await databaseService.initialize();

    // Get the user service
    userService = await context.get('services.UserService');
  });

  afterEach(async () => {
    // Clean up the database
    await databaseService.cleanup();
  });

  it('should create and retrieve a user', async () => {
    // Create a user
    const userData = { name: 'John Doe' };
    const createdUser = await userService.createUser(userData);

    // Retrieve the user
    const retrievedUser = await userService.getUser(createdUser.id);

    // Assert
    expect(retrievedUser).toEqual(createdUser);
  });
});
```

## End-to-End Testing

End-to-end tests focus on testing the entire application from the user's perspective. In Contexify applications, this typically means testing the API endpoints or user interface.

```typescript
import { Application } from '../application';
import axios from 'axios';

describe('User API', () => {
  let app: Application;
  let baseUrl: string;

  beforeAll(async () => {
    // Create and start the application
    app = new Application();
    await app.start();

    // Get the base URL
    const port = app.getSync('config.port');
    baseUrl = `http://localhost:${port}`;
  });

  afterAll(async () => {
    // Stop the application
    await app.stop();
  });

  it('should create a user', async () => {
    // Create a user
    const userData = { name: 'John Doe' };
    const response = await axios.post(`${baseUrl}/users`, userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(userData.name);
  });

  it('should get a user by id', async () => {
    // Create a user
    const userData = { name: 'Jane Doe' };
    const createResponse = await axios.post(`${baseUrl}/users`, userData);
    const userId = createResponse.data.id;

    // Get the user
    const getResponse = await axios.get(`${baseUrl}/users/${userId}`);

    // Assert
    expect(getResponse.status).toBe(200);
    expect(getResponse.data).toEqual(createResponse.data);
  });
});
```

## Testing Components

When testing components, you'll typically test how the component integrates with the application.

```typescript
import { Context } from 'contexify';
import { LoggerComponent, LoggerBindings, Logger } from '../components/logger';

describe('LoggerComponent', () => {
  let context: Context;
  let logger: Logger;

  beforeEach(async () => {
    // Create a context
    context = new Context('test');

    // Add the logger component
    const loggerComponent = new LoggerComponent({ level: 'debug', prefix: 'Test' });
    for (const binding of loggerComponent.bindings) {
      context.add(binding);
    }

    // Get the logger
    logger = await context.get(LoggerBindings.SERVICE);
  });

  it('should log messages', () => {
    // Mock console methods
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    // Log a message
    logger.info('Test message');

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('[Test] Test message');

    // Restore console methods
    consoleSpy.mockRestore();
  });
});
```

## Testing Interceptors

When testing interceptors, you'll typically test how they modify method behavior.

```typescript
import { Context, intercept, injectable } from 'contexify';
import { LogInterceptor } from '../interceptors/log.interceptor';

// Create a test class with an intercepted method
@injectable()
class TestService {
  @intercept(LogInterceptor)
  async testMethod(arg1: string, arg2: number): Promise<string> {
    return `${arg1}-${arg2}`;
  }
}

describe('LogInterceptor', () => {
  let context: Context;
  let testService: TestService;

  beforeEach(async () => {
    // Create a context
    context = new Context('test');

    // Bind the test service
    context.bind('services.TestService').toClass(TestService);

    // Get the test service
    testService = await context.get('services.TestService');
  });

  it('should log method calls', async () => {
    // Mock console methods
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Call the intercepted method
    const result = await testService.testMethod('hello', 123);

    // Assert
    expect(result).toBe('hello-123');
    expect(consoleSpy).toHaveBeenCalledWith('Calling method: testMethod');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Method testMethod returned:',
      'hello-123'
    );

    // Restore console methods
    consoleSpy.mockRestore();
  });
});
```

## Best Practices

- **Isolate Tests**: Each test should be independent of others
- **Mock Dependencies**: Use mocks to isolate the code being tested
- **Test Edge Cases**: Test error conditions and edge cases
- **Use Test Doubles**: Use spies, stubs, and mocks as needed
- **Clean Up**: Clean up resources after tests
- **Use Test Fixtures**: Use fixtures to set up test data
- **Test Coverage**: Aim for high test coverage
- **Continuous Integration**: Run tests automatically on code changes

## Next Steps

Now that you understand how to test your application, you can learn about:

- [Application Structure](./application-structure) - How to structure your application
- [Component Creation](./component-creation) - How to create reusable components
- [Core Concepts](../category/core-concepts) - Learn about the core concepts of Contexify
