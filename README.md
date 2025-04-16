# Contexify Monorepo

[![npm version](https://img.shields.io/npm/v/contexify.svg)](https://www.npmjs.com/package/contexify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/teomyth/contexify/actions/workflows/ci.yml/badge.svg)](https://github.com/teomyth/contexify/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)

This repository is a monorepo containing all packages and examples related to the Contexify project.

## Repository Structure

This repository uses pnpm workspaces and Turborepo to manage the following packages:

- [**packages/contexify**](./packages/contexify/): Core library providing a powerful dependency injection container and context system
- [**examples/modular-app**](./examples/modular-app/): A modular application example demonstrating best practices for using Contexify
- [**examples/features**](./examples/features/): Standalone feature examples showcasing various capabilities provided by Contexify

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Key Features

Contexify is a TypeScript library providing a powerful dependency injection container with context-based IoC capabilities, inspired by LoopBack's Context system.

- **Dependency Injection**: Inject dependencies into classes, properties, and methods
- **IoC Container**: Manage dependencies with a powerful inversion of control container
- **Binding System**: Bind values, classes, providers, and more to keys
- **Scope Control**: Control dependency lifecycle through different scopes
- **Tagging System**: Add tags to bindings for discovery and grouping
- **Interceptors**: Add cross-cutting concerns to methods
- **Context Hierarchy**: Create parent-child relationships between contexts
- **Context Events**: Subscribe to binding events for dynamic behavior
- **Context Views**: Track and observe bindings that match specific criteria

## Detailed Documentation

For detailed API documentation and usage examples, see the [core package documentation](./packages/contexify/README.md).

## Contributing

Contributions are welcome! Please check out our [contribution guidelines](./CONTRIBUTING.md) for more information.

## License

MIT

## Acknowledgements

Contexify was initially based on the Context module from [LoopBack 4](https://github.com/loopbackio/loopback-next). That project is licensed under the MIT license. We thank IBM and the LoopBack contributors for their work in creating this excellent dependency injection framework.

For more details on original copyright and license information, please see the [NOTICE.md](./NOTICE.md) file in this project.
