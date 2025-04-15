# Contexify Features Examples

This project contains a list of standalone examples to illustrate various features and capabilities of Contexify, including Inversion of Control (IoC) and Dependency Injection (DI) provided by [`contexify`](https://github.com/teomyth/contexify).

## Examples

| Example                                                                    | Description                                                        |
| :------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [binding-types.ts](./src/binding-types.ts)                                 | Various ways to provide values for a binding                       |
| [configuration-injection.ts](./src/configuration-injection.ts)             | Configuration for bindings and injection of configurations         |
| [context-chain.ts](./src/context-chain.ts)                                 | Contexts are chained to create a hierarchy of registries           |
| [context-observation.ts](./src/context-observation.ts)                     | Observe context (bind/unbind) and context view (refresh) events    |
| [custom-configuration-resolver.ts](./src/custom-configuration-resolver.ts) | Override how configuration is resolved from a given binding        |
| [custom-inject-decorator.ts](./src/custom-inject-decorator.ts)             | How to create a new decorator for custom injections                |
| [custom-inject-resolve.ts](./src/custom-inject-resolve.ts)                 | How to specify a custom resolve function for bindings              |
| [dependency-injection.ts](./src/dependency-injection.ts)                   | Different styles of dependency injection                           |
| [find-bindings.ts](./src/find-bindings.ts)                                 | Different flavors of finding bindings in a context                 |
| [injection-without-binding.ts](./src/injection-without-binding.ts)         | Perform dependency injection without binding a class               |
| [interceptor-proxy.ts](./src/interceptor-proxy.ts)                         | Get proxies to intercept method invocations                        |
| [parameterized-decoration.ts](./src/parameterized-decoration.ts)           | Apply decorators that require parameters as arguments              |
| [sync-async.ts](./src/sync-async.ts)                                       | Resolve bindings with dependencies synchronously or asynchronously |
| [value-promise.ts](./src/value-promise.ts)                                 | Handle synchronous or asynchronous results (ValueOrPromise)        |

## Use

Start all examples:

```sh
npm start
```

To run individual examples:

```sh
npm run build
node dist/<an-example>
```

## License

MIT
