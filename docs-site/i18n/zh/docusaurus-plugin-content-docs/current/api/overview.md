---
sidebar_position: 1
---

# API 概述

本节提供 Contexify API 的参考，每个类、方法和接口都有详细的文档和示例，帮助您了解如何有效地使用它们。

## 核心类

Contexify 围绕几个核心类构建，这些类为依赖注入提供了基础：

- [Context](./context) - 绑定和依赖项的中央注册表
- [Binding](./binding) - 表示键和值之间的连接
- [ContextView](./context-view) - 跟踪匹配特定过滤器的一组绑定

## 装饰器

Contexify 提供了一组装饰器，使在 TypeScript 中使用依赖注入变得容易：

- [@injectable()](./decorators) - 将类标记为可注入
- [@inject()](./decorators) - 通过绑定键注入依赖项
- [@inject.tag()](./decorators) - 注入匹配特定标签的所有依赖项
- [@inject.getter()](./decorators) - 注入一个可以稍后用于获取依赖项的函数
- [@inject.view()](./decorators) - 注入一个跟踪匹配过滤器的绑定的 ContextView
- [@config()](./decorators) - 为当前绑定注入配置
- [@intercept()](./decorators) - 将拦截器应用于方法或类

## 接口和类型

Contexify 定义了几个在整个框架中使用的接口和类型：

- [Provider](./interfaces) - 定义一个可以动态创建值的类
- [Interceptor](./interfaces) - 定义一个可以拦截方法调用的类
- [ContextObserver](./interfaces) - 定义一个可以观察上下文事件的类
- [InvocationContext](./interfaces) - 提供有关方法调用的信息
- [BindingScope](./interfaces) - 定义绑定的作用域
- [Constructor](./interfaces) - 表示类构造函数
- [ValueOrPromise](./interfaces) - 表示值或值的 Promise
- [Getter](./interfaces) - 表示返回值或值的 Promise 的函数
- [BindingFilter](./interfaces) - 表示过滤绑定的函数
- [BindingComparator](./interfaces) - 表示比较绑定的函数

## 用法示例

有关使用 Contexify API 的实用示例，请参阅 [API 用法示例](./usage-examples) 页面。该页面提供了各种示例，演示如何在实际场景中使用 API。

## 相关资源

要了解如何在应用程序中有效地使用 Contexify，请参阅[最佳实践](/docs/best-practices)部分。该部分提供了关于应用程序架构、依赖注入和高级模式的指导。

## 更多信息

有关 API 的更详细信息，请参阅源代码中的 TypeScript 定义或查看 [GitHub 仓库](https://github.com/teomyth/contexify) 中的示例代码。
