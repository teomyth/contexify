---
sidebar_position: 3
---

# 测试指南

本指南提供了使用 Contexify 构建的应用程序的测试说明。

## 概述

测试是软件开发的重要组成部分。Contexify 的依赖注入系统通过允许您模拟依赖项，使测试应用程序变得容易。

## 测试类型

在测试 Contexify 应用程序时，您通常会编写以下类型的测试：

- **单元测试**：隔离测试单个类或函数
- **集成测试**：测试多个组件如何一起工作
- **端到端测试**：从用户角度测试整个应用程序

## 单元测试

单元测试专注于隔离测试单个代码单元。在 Contexify 应用程序中，这通常意味着测试单个类或函数。

### 测试服务

以下是测试服务的示例：

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

### 测试控制器

以下是测试控制器的示例：

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

## 集成测试

集成测试专注于测试多个组件如何一起工作。在 Contexify 应用程序中，这通常意味着测试服务、仓库和其他组件如何交互。

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

## 端到端测试

端到端测试专注于从用户角度测试整个应用程序。在 Contexify 应用程序中，这通常意味着测试 API 端点或用户界面。

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

## 测试组件

在测试组件时，您通常会测试组件如何与应用程序集成。

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

## 测试拦截器

在测试拦截器时，您通常会测试它们如何修改方法行为。

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

## 最佳实践

- **隔离测试**：每个测试应该独立于其他测试
- **模拟依赖项**：使用模拟来隔离被测试的代码
- **测试边缘情况**：测试错误条件和边缘情况
- **使用测试替身**：根据需要使用间谍、存根和模拟
- **清理**：测试后清理资源
- **使用测试夹具**：使用夹具设置测试数据
- **测试覆盖率**：争取高测试覆盖率
- **持续集成**：在代码更改时自动运行测试

## 下一步

现在您已经了解了如何测试应用程序，可以了解：

- [应用程序结构](./application-structure) - 如何构建应用程序
- [组件创建](./component-creation) - 如何创建可重用组件
- [核心概念](../category/core-concepts) - 了解 Contexify 的核心概念
