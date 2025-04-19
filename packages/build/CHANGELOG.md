# @contexify/build

## 0.3.0

### Minor Changes

- c7364e8: Simplify the build package to focus on version management utilities:

  - Remove CLI implementation and main command
  - Keep only check-version and sync-version scripts
  - Update documentation to reflect simplified structure
  - Reduce dependencies and improve maintainability
  - Add publishConfig with public access for proper npm publishing

## 0.2.0

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

## 0.1.2

### Patch Changes

- Bug fixes and minor updates

## 0.1.1

### Patch Changes

- Bug fixes and minor updates
