---
sidebar_position: 4
---

# 接口和类型

> 注意：此文档是占位符，需要进一步翻译。请参考英文版获取完整信息。

Contexify 定义了几个在整个框架中使用的接口和类型。

## 接口

### Provider

`Provider` 接口定义了一个可以动态创建值的类。

**定义：**
```typescript
interface Provider<T> {
  value(): ValueOrPromise<T>;
}
```

**方法：**
- `value()`：返回一个值或值的 Promise。

**示例：**
```typescript
@injectable()
class RandomNumberProvider implements Provider<number> {
  value() {
    return Math.random();
  }
}

// 绑定提供者
context.bind('random').toProvider(RandomNumberProvider);

// 解析值
const random1 = await context.get<number>('random');
const random2 = await context.get<number>('random');
console.log(random1 !== random2); // 输出: true
```

### Interceptor

`Interceptor` 接口定义了一个可以拦截方法调用的类。

**定义：**
```typescript
interface Interceptor {
  intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ): ValueOrPromise<any>;
}
```

**方法：**
- `intercept(invocationCtx, next)`：拦截方法调用。`invocationCtx` 包含有关被调用方法的信息，`next` 是继续方法执行的函数。

## 更多接口和类型

有关更多接口和类型的详细信息，请参考英文版文档。
