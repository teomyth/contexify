"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[716],{991:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>c});var s=t(4700);const r={},o=s.createContext(r);function i(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(o.Provider,{value:n},e.children)}},7175:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"guides/testing","title":"\u6d4b\u8bd5\u6307\u5357","description":"\u672c\u6307\u5357\u63d0\u4f9b\u4e86\u4f7f\u7528 Contexify \u6784\u5efa\u7684\u5e94\u7528\u7a0b\u5e8f\u7684\u6d4b\u8bd5\u8bf4\u660e\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/guides/testing.md","sourceDirName":"guides","slug":"/guides/testing","permalink":"/contexify/zh/docs/guides/testing","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/guides/testing.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"\u7ec4\u4ef6\u521b\u5efa\u6307\u5357","permalink":"/contexify/zh/docs/guides/component-creation"},"next":{"title":"\u6587\u6863\u5f00\u53d1\u6307\u5357","permalink":"/contexify/zh/docs/guides/documentation"}}');var r=t(7968),o=t(991);const i={sidebar_position:3},c="\u6d4b\u8bd5\u6307\u5357",a={},l=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",level:2},{value:"\u6d4b\u8bd5\u7c7b\u578b",id:"\u6d4b\u8bd5\u7c7b\u578b",level:2},{value:"\u5355\u5143\u6d4b\u8bd5",id:"\u5355\u5143\u6d4b\u8bd5",level:2},{value:"\u6d4b\u8bd5\u670d\u52a1",id:"\u6d4b\u8bd5\u670d\u52a1",level:3},{value:"\u6d4b\u8bd5\u63a7\u5236\u5668",id:"\u6d4b\u8bd5\u63a7\u5236\u5668",level:3},{value:"\u96c6\u6210\u6d4b\u8bd5",id:"\u96c6\u6210\u6d4b\u8bd5",level:2},{value:"\u7aef\u5230\u7aef\u6d4b\u8bd5",id:"\u7aef\u5230\u7aef\u6d4b\u8bd5",level:2},{value:"\u6d4b\u8bd5\u7ec4\u4ef6",id:"\u6d4b\u8bd5\u7ec4\u4ef6",level:2},{value:"\u6d4b\u8bd5\u62e6\u622a\u5668",id:"\u6d4b\u8bd5\u62e6\u622a\u5668",level:2},{value:"\u6700\u4f73\u5b9e\u8df5",id:"\u6700\u4f73\u5b9e\u8df5",level:2},{value:"\u4e0b\u4e00\u6b65",id:"\u4e0b\u4e00\u6b65",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"\u6d4b\u8bd5\u6307\u5357",children:"\u6d4b\u8bd5\u6307\u5357"})}),"\n",(0,r.jsx)(n.p,{children:"\u672c\u6307\u5357\u63d0\u4f9b\u4e86\u4f7f\u7528 Contexify \u6784\u5efa\u7684\u5e94\u7528\u7a0b\u5e8f\u7684\u6d4b\u8bd5\u8bf4\u660e\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u6982\u8ff0",children:"\u6982\u8ff0"}),"\n",(0,r.jsx)(n.p,{children:"\u6d4b\u8bd5\u662f\u8f6f\u4ef6\u5f00\u53d1\u7684\u91cd\u8981\u7ec4\u6210\u90e8\u5206\u3002Contexify \u7684\u4f9d\u8d56\u6ce8\u5165\u7cfb\u7edf\u901a\u8fc7\u5141\u8bb8\u60a8\u6a21\u62df\u4f9d\u8d56\u9879\uff0c\u4f7f\u6d4b\u8bd5\u5e94\u7528\u7a0b\u5e8f\u53d8\u5f97\u5bb9\u6613\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u6d4b\u8bd5\u7c7b\u578b",children:"\u6d4b\u8bd5\u7c7b\u578b"}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u6d4b\u8bd5 Contexify \u5e94\u7528\u7a0b\u5e8f\u65f6\uff0c\u60a8\u901a\u5e38\u4f1a\u7f16\u5199\u4ee5\u4e0b\u7c7b\u578b\u7684\u6d4b\u8bd5\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u5355\u5143\u6d4b\u8bd5"}),"\uff1a\u9694\u79bb\u6d4b\u8bd5\u5355\u4e2a\u7c7b\u6216\u51fd\u6570"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u96c6\u6210\u6d4b\u8bd5"}),"\uff1a\u6d4b\u8bd5\u591a\u4e2a\u7ec4\u4ef6\u5982\u4f55\u4e00\u8d77\u5de5\u4f5c"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u7aef\u5230\u7aef\u6d4b\u8bd5"}),"\uff1a\u4ece\u7528\u6237\u89d2\u5ea6\u6d4b\u8bd5\u6574\u4e2a\u5e94\u7528\u7a0b\u5e8f"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u5355\u5143\u6d4b\u8bd5",children:"\u5355\u5143\u6d4b\u8bd5"}),"\n",(0,r.jsx)(n.p,{children:"\u5355\u5143\u6d4b\u8bd5\u4e13\u6ce8\u4e8e\u9694\u79bb\u6d4b\u8bd5\u5355\u4e2a\u4ee3\u7801\u5355\u5143\u3002\u5728 Contexify \u5e94\u7528\u7a0b\u5e8f\u4e2d\uff0c\u8fd9\u901a\u5e38\u610f\u5473\u7740\u6d4b\u8bd5\u5355\u4e2a\u7c7b\u6216\u51fd\u6570\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"\u6d4b\u8bd5\u670d\u52a1",children:"\u6d4b\u8bd5\u670d\u52a1"}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u4e0b\u662f\u6d4b\u8bd5\u670d\u52a1\u7684\u793a\u4f8b\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\nimport { UserService } from '../services/user.service';\nimport { UserRepository } from '../repositories/user.repository';\n\ndescribe('UserService', () => {\n  let context: Context;\n  let userService: UserService;\n  let mockUserRepository: jest.Mocked<UserRepository>;\n\n  beforeEach(() => {\n    // Create a mock repository\n    mockUserRepository = {\n      findById: jest.fn(),\n      create: jest.fn(),\n    } as unknown as jest.Mocked<UserRepository>;\n\n    // Create a context\n    context = new Context('test');\n\n    // Bind the mock repository\n    context.bind('repositories.UserRepository').to(mockUserRepository);\n\n    // Bind the service\n    context.bind('services.UserService').toClass(UserService);\n  });\n\n  it('should get a user by id', async () => {\n    // Arrange\n    const userId = '123';\n    const expectedUser = { id: userId, name: 'John Doe' };\n    mockUserRepository.findById.mockResolvedValue(expectedUser);\n\n    // Act\n    userService = await context.get('services.UserService');\n    const user = await userService.getUser(userId);\n\n    // Assert\n    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);\n    expect(user).toEqual(expectedUser);\n  });\n\n  it('should create a user', async () => {\n    // Arrange\n    const userData = { name: 'John Doe' };\n    const expectedUser = { id: '123', ...userData };\n    mockUserRepository.create.mockResolvedValue(expectedUser);\n\n    // Act\n    userService = await context.get('services.UserService');\n    const user = await userService.createUser(userData);\n\n    // Assert\n    expect(mockUserRepository.create).toHaveBeenCalledWith(userData);\n    expect(user).toEqual(expectedUser);\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u6d4b\u8bd5\u63a7\u5236\u5668",children:"\u6d4b\u8bd5\u63a7\u5236\u5668"}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u4e0b\u662f\u6d4b\u8bd5\u63a7\u5236\u5668\u7684\u793a\u4f8b\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\nimport { UserController } from '../controllers/user.controller';\nimport { UserService } from '../services/user.service';\n\ndescribe('UserController', () => {\n  let context: Context;\n  let userController: UserController;\n  let mockUserService: jest.Mocked<UserService>;\n\n  beforeEach(() => {\n    // Create a mock service\n    mockUserService = {\n      getUser: jest.fn(),\n      createUser: jest.fn(),\n    } as unknown as jest.Mocked<UserService>;\n\n    // Create a context\n    context = new Context('test');\n\n    // Bind the mock service\n    context.bind('services.UserService').to(mockUserService);\n\n    // Bind the controller\n    context.bind('controllers.UserController').toClass(UserController);\n  });\n\n  it('should get a user by id', async () => {\n    // Arrange\n    const userId = '123';\n    const expectedUser = { id: userId, name: 'John Doe' };\n    mockUserService.getUser.mockResolvedValue(expectedUser);\n\n    // Act\n    userController = await context.get('controllers.UserController');\n    const user = await userController.getUser(userId);\n\n    // Assert\n    expect(mockUserService.getUser).toHaveBeenCalledWith(userId);\n    expect(user).toEqual(expectedUser);\n  });\n\n  it('should create a user', async () => {\n    // Arrange\n    const userData = { name: 'John Doe' };\n    const expectedUser = { id: '123', ...userData };\n    mockUserService.createUser.mockResolvedValue(expectedUser);\n\n    // Act\n    userController = await context.get('controllers.UserController');\n    const user = await userController.createUser(userData);\n\n    // Assert\n    expect(mockUserService.createUser).toHaveBeenCalledWith(userData);\n    expect(user).toEqual(expectedUser);\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u96c6\u6210\u6d4b\u8bd5",children:"\u96c6\u6210\u6d4b\u8bd5"}),"\n",(0,r.jsx)(n.p,{children:"\u96c6\u6210\u6d4b\u8bd5\u4e13\u6ce8\u4e8e\u6d4b\u8bd5\u591a\u4e2a\u7ec4\u4ef6\u5982\u4f55\u4e00\u8d77\u5de5\u4f5c\u3002\u5728 Contexify \u5e94\u7528\u7a0b\u5e8f\u4e2d\uff0c\u8fd9\u901a\u5e38\u610f\u5473\u7740\u6d4b\u8bd5\u670d\u52a1\u3001\u4ed3\u5e93\u548c\u5176\u4ed6\u7ec4\u4ef6\u5982\u4f55\u4ea4\u4e92\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\nimport { UserService } from '../services/user.service';\nimport { UserRepository } from '../repositories/user.repository';\nimport { DatabaseService } from '../services/database.service';\n\ndescribe('User Integration', () => {\n  let context: Context;\n  let userService: UserService;\n  let databaseService: DatabaseService;\n\n  beforeEach(async () => {\n    // Create a context\n    context = new Context('test');\n\n    // Bind the database service\n    context.bind('services.DatabaseService').toClass(DatabaseService);\n\n    // Bind the repository\n    context.bind('repositories.UserRepository').toClass(UserRepository);\n\n    // Bind the service\n    context.bind('services.UserService').toClass(UserService);\n\n    // Get the database service\n    databaseService = await context.get('services.DatabaseService');\n\n    // Initialize the database\n    await databaseService.initialize();\n\n    // Get the user service\n    userService = await context.get('services.UserService');\n  });\n\n  afterEach(async () => {\n    // Clean up the database\n    await databaseService.cleanup();\n  });\n\n  it('should create and retrieve a user', async () => {\n    // Create a user\n    const userData = { name: 'John Doe' };\n    const createdUser = await userService.createUser(userData);\n\n    // Retrieve the user\n    const retrievedUser = await userService.getUser(createdUser.id);\n\n    // Assert\n    expect(retrievedUser).toEqual(createdUser);\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u7aef\u5230\u7aef\u6d4b\u8bd5",children:"\u7aef\u5230\u7aef\u6d4b\u8bd5"}),"\n",(0,r.jsx)(n.p,{children:"\u7aef\u5230\u7aef\u6d4b\u8bd5\u4e13\u6ce8\u4e8e\u4ece\u7528\u6237\u89d2\u5ea6\u6d4b\u8bd5\u6574\u4e2a\u5e94\u7528\u7a0b\u5e8f\u3002\u5728 Contexify \u5e94\u7528\u7a0b\u5e8f\u4e2d\uff0c\u8fd9\u901a\u5e38\u610f\u5473\u7740\u6d4b\u8bd5 API \u7aef\u70b9\u6216\u7528\u6237\u754c\u9762\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Application } from '../application';\nimport axios from 'axios';\n\ndescribe('User API', () => {\n  let app: Application;\n  let baseUrl: string;\n\n  beforeAll(async () => {\n    // Create and start the application\n    app = new Application();\n    await app.start();\n\n    // Get the base URL\n    const port = app.getSync('config.port');\n    baseUrl = `http://localhost:${port}`;\n  });\n\n  afterAll(async () => {\n    // Stop the application\n    await app.stop();\n  });\n\n  it('should create a user', async () => {\n    // Create a user\n    const userData = { name: 'John Doe' };\n    const response = await axios.post(`${baseUrl}/users`, userData);\n\n    // Assert\n    expect(response.status).toBe(201);\n    expect(response.data).toHaveProperty('id');\n    expect(response.data.name).toBe(userData.name);\n  });\n\n  it('should get a user by id', async () => {\n    // Create a user\n    const userData = { name: 'Jane Doe' };\n    const createResponse = await axios.post(`${baseUrl}/users`, userData);\n    const userId = createResponse.data.id;\n\n    // Get the user\n    const getResponse = await axios.get(`${baseUrl}/users/${userId}`);\n\n    // Assert\n    expect(getResponse.status).toBe(200);\n    expect(getResponse.data).toEqual(createResponse.data);\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u6d4b\u8bd5\u7ec4\u4ef6",children:"\u6d4b\u8bd5\u7ec4\u4ef6"}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u6d4b\u8bd5\u7ec4\u4ef6\u65f6\uff0c\u60a8\u901a\u5e38\u4f1a\u6d4b\u8bd5\u7ec4\u4ef6\u5982\u4f55\u4e0e\u5e94\u7528\u7a0b\u5e8f\u96c6\u6210\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\nimport { LoggerComponent, LoggerBindings, Logger } from '../components/logger';\n\ndescribe('LoggerComponent', () => {\n  let context: Context;\n  let logger: Logger;\n\n  beforeEach(async () => {\n    // Create a context\n    context = new Context('test');\n\n    // Add the logger component\n    const loggerComponent = new LoggerComponent({ level: 'debug', prefix: 'Test' });\n    for (const binding of loggerComponent.bindings) {\n      context.add(binding);\n    }\n\n    // Get the logger\n    logger = await context.get(LoggerBindings.SERVICE);\n  });\n\n  it('should log messages', () => {\n    // Mock console methods\n    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();\n\n    // Log a message\n    logger.info('Test message');\n\n    // Assert\n    expect(consoleSpy).toHaveBeenCalledWith('[Test] Test message');\n\n    // Restore console methods\n    consoleSpy.mockRestore();\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u6d4b\u8bd5\u62e6\u622a\u5668",children:"\u6d4b\u8bd5\u62e6\u622a\u5668"}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u6d4b\u8bd5\u62e6\u622a\u5668\u65f6\uff0c\u60a8\u901a\u5e38\u4f1a\u6d4b\u8bd5\u5b83\u4eec\u5982\u4f55\u4fee\u6539\u65b9\u6cd5\u884c\u4e3a\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { Context, intercept, injectable } from 'contexify';\nimport { LogInterceptor } from '../interceptors/log.interceptor';\n\n// Create a test class with an intercepted method\n@injectable()\nclass TestService {\n  @intercept(LogInterceptor)\n  async testMethod(arg1: string, arg2: number): Promise<string> {\n    return `${arg1}-${arg2}`;\n  }\n}\n\ndescribe('LogInterceptor', () => {\n  let context: Context;\n  let testService: TestService;\n\n  beforeEach(async () => {\n    // Create a context\n    context = new Context('test');\n\n    // Bind the test service\n    context.bind('services.TestService').toClass(TestService);\n\n    // Get the test service\n    testService = await context.get('services.TestService');\n  });\n\n  it('should log method calls', async () => {\n    // Mock console methods\n    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();\n\n    // Call the intercepted method\n    const result = await testService.testMethod('hello', 123);\n\n    // Assert\n    expect(result).toBe('hello-123');\n    expect(consoleSpy).toHaveBeenCalledWith('Calling method: testMethod');\n    expect(consoleSpy).toHaveBeenCalledWith(\n      'Method testMethod returned:',\n      'hello-123'\n    );\n\n    // Restore console methods\n    consoleSpy.mockRestore();\n  });\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u6700\u4f73\u5b9e\u8df5",children:"\u6700\u4f73\u5b9e\u8df5"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u9694\u79bb\u6d4b\u8bd5"}),"\uff1a\u6bcf\u4e2a\u6d4b\u8bd5\u5e94\u8be5\u72ec\u7acb\u4e8e\u5176\u4ed6\u6d4b\u8bd5"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u6a21\u62df\u4f9d\u8d56\u9879"}),"\uff1a\u4f7f\u7528\u6a21\u62df\u6765\u9694\u79bb\u88ab\u6d4b\u8bd5\u7684\u4ee3\u7801"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u6d4b\u8bd5\u8fb9\u7f18\u60c5\u51b5"}),"\uff1a\u6d4b\u8bd5\u9519\u8bef\u6761\u4ef6\u548c\u8fb9\u7f18\u60c5\u51b5"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u4f7f\u7528\u6d4b\u8bd5\u66ff\u8eab"}),"\uff1a\u6839\u636e\u9700\u8981\u4f7f\u7528\u95f4\u8c0d\u3001\u5b58\u6839\u548c\u6a21\u62df"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u6e05\u7406"}),"\uff1a\u6d4b\u8bd5\u540e\u6e05\u7406\u8d44\u6e90"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u4f7f\u7528\u6d4b\u8bd5\u5939\u5177"}),"\uff1a\u4f7f\u7528\u5939\u5177\u8bbe\u7f6e\u6d4b\u8bd5\u6570\u636e"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u6d4b\u8bd5\u8986\u76d6\u7387"}),"\uff1a\u4e89\u53d6\u9ad8\u6d4b\u8bd5\u8986\u76d6\u7387"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u6301\u7eed\u96c6\u6210"}),"\uff1a\u5728\u4ee3\u7801\u66f4\u6539\u65f6\u81ea\u52a8\u8fd0\u884c\u6d4b\u8bd5"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u4e0b\u4e00\u6b65",children:"\u4e0b\u4e00\u6b65"}),"\n",(0,r.jsx)(n.p,{children:"\u73b0\u5728\u60a8\u5df2\u7ecf\u4e86\u89e3\u4e86\u5982\u4f55\u6d4b\u8bd5\u5e94\u7528\u7a0b\u5e8f\uff0c\u53ef\u4ee5\u4e86\u89e3\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./application-structure",children:"\u5e94\u7528\u7a0b\u5e8f\u7ed3\u6784"})," - \u5982\u4f55\u6784\u5efa\u5e94\u7528\u7a0b\u5e8f"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./component-creation",children:"\u7ec4\u4ef6\u521b\u5efa"})," - \u5982\u4f55\u521b\u5efa\u53ef\u91cd\u7528\u7ec4\u4ef6"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"../category/core-concepts",children:"\u6838\u5fc3\u6982\u5ff5"})," - \u4e86\u89e3 Contexify \u7684\u6838\u5fc3\u6982\u5ff5"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);