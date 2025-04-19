---
sidebar_position: 2
---

# Binding 类

> 注意：此文档是占位符，需要进一步翻译。请参考英文版获取完整信息。

`Binding` 类表示 Context 中键和值之间的连接。

## 构造函数

### constructor

创建一个新的 Binding 实例。

**签名：**
```typescript
constructor(key: string)
```

**参数：**
- `key`：绑定的键。这是一个在 Context 中唯一标识绑定的字符串。

**返回：** 一个新的 Binding 实例。

## 静态方法

### create

创建一个新的 Binding 实例。

**签名：**
```typescript
static create<T>(key: string): Binding<T>
```

**参数：**
- `key`：绑定的键。

**返回：** 一个新的 Binding 实例。

## 更多方法

有关更多方法的详细信息，请参考英文版文档。
