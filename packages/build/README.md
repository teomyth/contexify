# @contexify/build

Build tools and utilities for Contexify projects.

> **Note**: This package is written in pure JavaScript and can be used without compilation.

## Installation

```bash
npm install --save-dev @contexify/build
# or
yarn add --dev @contexify/build
# or
pnpm add --save-dev @contexify/build
```

## Features

- Version synchronization tools
- Build utilities
- Test helpers
- CLI tools for common tasks

## Usage

### Version Synchronization

```javascript
import { syncVersions } from '@contexify/build/version';

// Synchronize versions in all packages
await syncVersions();
```

### CLI Usage

```bash
# 方式 1: 使用主命令和子命令
npx contexify-build sync-versions
npx cx-build sync-versions
npx cx-build check-versions

# 方式 2: 使用直接命令（更简洁）
npx cx-sync-versions
npx cx-check-versions
```

## API Documentation

### Version Module

- `syncVersions()`: Synchronizes version constants in source files with package.json versions
- `checkVersions()`: Checks if version constants are in sync with package.json versions

### Test Module

- `setupTestFixtures()`: Sets up test fixtures for testing
- `cleanupTestFixtures()`: Cleans up test fixtures

## License

MIT
