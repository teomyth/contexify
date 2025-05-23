# contexify

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
