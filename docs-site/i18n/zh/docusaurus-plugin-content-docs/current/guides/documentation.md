---
sidebar_position: 4
---

# 文档开发指南

本指南提供了关于如何维护和更新 Contexify 文档的详细说明。

## 文档结构

Contexify 的文档系统由以下部分组成：

- **docs-site**: 使用 Docusaurus 构建的文档网站
- **docs-code**: 包含可执行的代码示例，用于验证文档中的代码片段

## 文档代码示例

为了确保文档中的代码示例是准确且可运行的，我们使用 `docs-code` 目录来存储和验证这些示例。

### 编写代码示例

当需要在文档中添加新的代码示例时，请遵循以下步骤：

1. 在 `docs-code` 目录中创建一个新的 TypeScript 文件，文件名应该反映示例的用途
2. 实现完整的、可运行的代码示例
3. 确保代码示例可以独立运行，并包含所有必要的导入
4. 添加适当的注释，解释代码的关键部分

示例：

```typescript
// docs-code/core-concepts/binding-example.ts
import { Context, injectable, inject } from 'contexify';

// 创建一个服务类
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

// 创建一个使用 GreetingService 的类
@injectable()
class Greeter {
  constructor(@inject('services.GreetingService') private greetingService: GreetingService) {}

  greet(name: string) {
    return this.greetingService.sayHello(name);
  }
}

// 运行示例
async function main() {
  // 创建上下文
  const context = new Context('example');
  
  // 绑定服务
  context.bind('services.GreetingService').toClass(GreetingService);
  context.bind('services.Greeter').toClass(Greeter);
  
  // 获取 Greeter 实例
  const greeter = await context.get<Greeter>('services.Greeter');
  
  // 使用 Greeter
  console.log(greeter.greet('World'));
}

// 如果直接运行此文件，则执行 main 函数
if (typeof require !== 'undefined' && require.main === module) {
  main().catch(console.error);
}

// 导出函数以便测试
export { main };
```

### 测试代码示例

所有代码示例都应该有对应的测试，以确保它们正常工作：

1. 在 `docs-code/tests` 目录中创建一个测试文件
2. 使用 Vitest 编写测试，验证代码示例的功能
3. 确保测试覆盖代码示例的主要功能

示例：

```typescript
// docs-code/tests/binding-example.test.ts
import { describe, it, expect } from 'vitest';
import { main } from '../core-concepts/binding-example';

describe('Binding Example', () => {
  it('should run without errors', async () => {
    // 捕获控制台输出
    const originalConsoleLog = console.log;
    let output = '';
    
    console.log = (message) => {
      output = message;
    };
    
    // 运行示例
    await main();
    
    // 恢复控制台
    console.log = originalConsoleLog;
    
    // 验证输出
    expect(output).toBe('Hello, World!');
  });
});
```

## 将代码示例集成到文档中

要将代码示例集成到文档中，请使用特殊的标记来指示代码示例的位置：

```markdown
<!-- CODE:binding-example:START -->
```typescript
// 这里的内容将被自动更新
```
<!-- CODE:binding-example:END -->
```

这些标记告诉文档更新系统在何处插入代码示例。

## 文档更新流程

当代码结构发生变化时，请遵循以下流程来更新文档：

1. 更新 `docs-code` 中的代码示例，使其与新的代码结构保持一致
2. 运行测试以确保代码示例正常工作
3. 使用文档更新脚本将更改同步到文档中

### 自动化文档更新

Contexify 提供了几个脚本来自动化文档更新流程：

#### 验证文档代码

运行以下命令来验证文档中的所有代码示例：

```bash
npm run docs:validate
```

这个命令会：
- 从文档中提取所有代码示例
- 将它们转换为可执行的 TypeScript 文件
- 运行这些文件以确保它们没有错误

#### 更新文档代码

运行以下命令来更新文档中的代码示例：

```bash
npm run docs:update
```

这个命令会：
- 读取 `docs-code` 目录中的所有 TypeScript 文件
- 提取代码内容（移除导入和导出语句）
- 更新文档中相应的代码示例

#### 测试文档代码

运行以下命令来测试文档代码：

```bash
npm run docs:test
```

这个命令会运行 `docs-code` 目录中的所有测试，确保代码示例正常工作。

## 本地预览文档

要在本地预览文档网站，请运行：

```bash
npm run docs:start
```

这个命令会启动 Docusaurus 开发服务器，并在浏览器中打开文档网站。您可以实时查看更改。

## 构建文档

要构建文档网站，请运行：

```bash
npm run docs:build
```

这个命令会生成静态 HTML 文件，可以部署到任何静态网站托管服务。

## 本地服务文档

要在本地服务已构建的文档，请运行：

```bash
npm run docs:serve
```

这个命令会启动一个本地服务器，提供已构建的文档网站。

## 最佳实践

- **保持同步**：确保 `docs-code` 中的代码示例与实际代码库保持同步
- **完整示例**：提供完整的、可运行的代码示例，而不是片段
- **测试覆盖**：为所有代码示例编写测试
- **定期验证**：定期运行 `docs:validate` 命令，确保文档中的代码示例仍然有效
- **更新文档**：在代码结构发生变化后，立即更新文档

## 文档发布流程

当准备发布新版本的文档时，请遵循以下步骤：

1. 确保所有代码示例都已更新并通过测试
2. 运行 `npm run docs:validate` 确保文档中的代码示例有效
3. 运行 `npm run docs:build` 构建文档网站
4. 检查构建的文档网站是否正确
5. 部署文档网站

## 故障排除

### 文档验证失败

如果 `docs:validate` 命令失败，可能是因为：

- 文档中的代码示例包含错误
- 代码示例依赖于未安装的包
- 代码示例使用了不兼容的 API

解决方法：
1. 检查错误消息以确定问题所在
2. 更新代码示例以修复错误
3. 再次运行 `docs:validate` 命令

### 文档更新失败

如果 `docs:update` 命令失败，可能是因为：

- 文档中缺少必要的标记
- `docs-code` 目录中缺少相应的代码文件
- 文件权限问题

解决方法：
1. 确保文档中包含正确的标记
2. 确保 `docs-code` 目录中存在相应的代码文件
3. 检查文件权限
