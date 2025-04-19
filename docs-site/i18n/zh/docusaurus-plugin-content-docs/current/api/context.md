---
sidebar_position: 2
---

# Context 类

> 注意：此文档是占位符，需要进一步翻译。请参考英文版获取完整信息。

`Context` 类是 Contexify 框架的核心。它作为绑定的注册表，并提供管理依赖项的方法。

## 构造函数

### constructor

创建一个新的 Context 实例。

**签名：**
```typescript
constructor(parent?: Context, name?: string)
```

**参数：**
- `parent`（可选）：父 Context。如果提供，此 Context 将继承父 Context 的绑定。
- `name`（可选）：此 Context 的名称。对调试有用。

**返回：** 一个新的 Context 实例。

## 绑定方法

### bind

创建一个具有给定键的新 Binding 并将其添加到 Context 中。

**签名：**
```typescript
bind(key: string): Binding
```

**参数：**
- `key`：绑定键。这是一个在 Context 中唯一标识绑定的字符串。

**返回：** 一个新的 Binding 实例。

## 更多方法

有关更多方法的详细信息，请参考英文版文档。
