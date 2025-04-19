---
sidebar_position: 2
---

# ContextView 类

> 注意：此文档是占位符，需要进一步翻译。请参考英文版获取完整信息。

`ContextView` 类允许您跟踪匹配特定过滤器的一组绑定。它提供了解析和观察这些绑定的方法。

## 构造函数

### constructor

创建一个新的 ContextView 实例。

**签名：**
```typescript
constructor(context: Context, filter: BindingFilter, comparator?: BindingComparator)
```

**参数：**
- `context`：要查看的 Context。
- `filter`：过滤绑定的函数。
- `comparator`（可选）：比较绑定以进行排序的函数。

**返回：** 一个新的 ContextView 实例。

## 方法

### resolve

解析匹配过滤器的所有绑定。

**签名：**
```typescript
resolve(): Promise<T[]>
```

**返回：** 一个 Promise，解析为已解析值的数组。

## 更多方法

有关更多方法的详细信息，请参考英文版文档。
