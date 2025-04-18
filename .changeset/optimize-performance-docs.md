---
"contexify": minor
"@contexify/build": minor
---

Improve performance, modularity and documentation:

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
