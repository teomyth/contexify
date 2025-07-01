# contexify

## 1.2.2

### Patch Changes

- 07d8ddb: Dependency updates and tooling improvements:

  ## Dependency Updates

  - Update metarize from ^1.0.2 to ^1.0.6 for improved metadata handling
  - Bump @swc/core from 1.11.29 to 1.12.9 for better TypeScript compilation
  - Update @types/node from 22.15.24 to 24.0.8 for latest Node.js type definitions
  - Upgrade @vitest/coverage-v8 and vitest from 3.1.4 to 3.2.4 for enhanced testing
  - Update tsup from 8.4.0 to 8.5.0 for improved build performance

  ## Development Tooling

  - Upgrade @changesets/cli from 2.29.2 to 2.29.5 for better release management
  - Update @commitlint packages from 19.8.0 to 19.8.1 for commit validation
  - Bump turbo from 2.5.1 to 2.5.4 for faster monorepo builds
  - Update lint-staged from 15.5.1 to 16.1.2 for improved pre-commit hooks

  ## Documentation

  - Upgrade Docusaurus from 3.7.0 to 3.8.0 for better documentation experience
  - Update typedoc from 0.28.3 to 0.28.5 for improved API documentation generation

## 1.2.1

### Patch Changes

- c7364e8: Optimize build process for faster publishing:

  - Separate code and documentation builds
  - Improve build scripts to focus on essential packages during publishing
  - Update package configuration for better npm compatibility

## 1.2.0

### Minor Changes

- 0f88d27: ## Build and Version Process Enhancements

  ### Build Improvements

  - Replace tsc with tsup for faster compilation
  - Add @swc/core for improved performance with decorators and metadata
  - Maintain same output structure as tsc while gaining speed benefits

  ### Version Management

  - Simplify version update process with integrated script
  - Streamline the release workflow with proper testing and validation
  - Improve GitHub Actions integration for automated releases

  ### Developer Experience

  - Enhance build speed for better development workflow
  - Provide clearer output during version updates
  - Ensure proper synchronization of version numbers across the codebase

## 1.1.0

### Minor Changes

- 6a308a7: Improve performance, modularity and documentation:

  ## Performance and Size Optimization

  - Replace debug package with custom logger implementation for better performance
  - Add debug.enabled checks before logging to improve performance
  - Remove hexoid dependency by inlining ID generation, reducing bundle size

  ## Modularity Improvements

  - Restructure project into modular architecture with conditional exports
  - Add core.ts, decorators.ts, and interceptors.ts entry points for granular imports
  - Update package.json exports configuration for better module resolution

  ## Documentation

  - Migrate documentation to Docusaurus with improved organization
  - Add executable code examples in docs-code directory
  - Support both English and Chinese documentation
  - Add comprehensive guides for application structure and component creation

## 1.0.5

### Patch Changes

- Bug fixes and minor updates

## 1.0.4

### Patch Changes

- Bug fixes and minor updates

## 1.0.3

### Patch Changes

- Migrate from release-it to changesets for better monorepo version management
