---
sidebar_position: 3
---

# 装饰器

> 注意：此文档是占位符，需要进一步翻译。请参考英文版获取完整信息。

Contexify 提供了一组装饰器，使在 TypeScript 中使用依赖注入变得容易。

## @injectable()

将类标记为可注入，允许 Contexify 创建其实例。

**语法：**
```typescript
function injectable(): ClassDecorator;
```

**示例：**
```typescript
@injectable()
class UserService {
  constructor() {
    console.log('UserService created');
  }
  
  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}

// 现在 UserService 可以通过 Context 创建
context.bind('services.UserService').toClass(UserService);
const userService = await context.get<UserService>('services.UserService');
```

## @inject()

通过绑定键注入依赖项。

**语法：**
```typescript
function inject(
  bindingKey: string,
  options?: InjectionOptions
): ParameterDecorator & PropertyDecorator;
```

**参数：**
- `bindingKey`：要注入的绑定的键。
- `options`（可选）：注入选项。

**示例：**
```typescript
@injectable()
class UserRepository {
  findAll() {
    return ['user1', 'user2', 'user3'];
  }
}

@injectable()
class UserService {
  constructor(@inject('repositories.UserRepository') private userRepo: UserRepository) {}
  
  getUsers() {
    return this.userRepo.findAll();
  }
}

// 绑定依赖项
context.bind('repositories.UserRepository').toClass(UserRepository);
context.bind('services.UserService').toClass(UserService);

// 解析 UserService（UserRepository 自动注入）
const userService = await context.get<UserService>('services.UserService');
console.log(userService.getUsers()); // 输出: ['user1', 'user2', 'user3']
```

## 更多装饰器

有关更多装饰器的详细信息，请参考英文版文档。
