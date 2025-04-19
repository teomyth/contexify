# @contexify/build

Version management utilities for Contexify projects.

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
- Version checking tools

## Usage

### Version Synchronization

```javascript
import { syncVersions } from '@contexify/build/version';

// Synchronize versions in all packages
await syncVersions();
```

### CLI Usage

```bash
# Use the direct commands
npx cx-sync-versions
npx cx-check-versions
```

## API Documentation

### Version Module

- `syncVersions()`: Synchronizes version constants in source files with package.json versions
- `checkVersions()`: Checks if version constants are in sync with package.json versions

## License

MIT
