# Changelog

## [1.0.5](https://github.com/teomyth/contexify/compare/v1.0.1...v1.0.5) (2025-04-17)


### Bug Fixes

* add --no-git-checks option to pnpm publish command ([2865ad4](https://github.com/teomyth/contexify/commit/2865ad49badeca263acdcc3a8dd3c7af98ea6c60))
* add debug.enabled checks before logging messages ([fd459ab](https://github.com/teomyth/contexify/commit/fd459ab8b9a55b6f3b132e8b28029904816cb8dd))
* add process global declaration to fix ESLint errors ([7f2f6da](https://github.com/teomyth/contexify/commit/7f2f6dad231e0b47eee20a9d62be79de92792670))
* ensure dry run mode does not actually publish packages ([140eda2](https://github.com/teomyth/contexify/commit/140eda2e12b08a684299ab5efd6fae271885c745))
* ensure version synchronization works in dry run mode ([9cb6b3a](https://github.com/teomyth/contexify/commit/9cb6b3ae31045e00e9e064c73a5d950a5138d14d))
* handle ignored changeset files in release script ([12f17da](https://github.com/teomyth/contexify/commit/12f17da58fdef9480b43b4c84976b4ca6971d4c2))
* improve NPM authentication in release workflow ([01a8e29](https://github.com/teomyth/contexify/commit/01a8e29ba9a0010f60aabcc5ef10c6d49d50d04d))
* update documentation check command to include organization prefix ([8bc2a82](https://github.com/teomyth/contexify/commit/8bc2a82f6383ac9d7ce3bd6c92865a37088c84db))
* update documentation script filters to include namespace ([1870f7a](https://github.com/teomyth/contexify/commit/1870f7a2333e28f23a8bd439ebaad3b829258c6c))
* update NPM authentication in release workflow ([5081f14](https://github.com/teomyth/contexify/commit/5081f1427f6eeef9fe6fdf2b1b338ebeceb61604))
* update package names in changeset config ([a30b7c1](https://github.com/teomyth/contexify/commit/a30b7c159cfc9fcbda38a82032676bd1c041a088))
* update prepub script to avoid circular dependency ([c16b95c](https://github.com/teomyth/contexify/commit/c16b95c44a57411ec60a4c5b49cef36e62b0333e))
* update version script to fix ESLint errors ([8fa662f](https://github.com/teomyth/contexify/commit/8fa662fd703c251cdd4fdc7e6e04ebfd13fc4da0))
* use direct npm publish for packages ([6f2dfb7](https://github.com/teomyth/contexify/commit/6f2dfb705c1cc530ebbc645bfdc5fbfdc498cf49))


### Features

* add automated and scheduled release workflows ([fc9d36b](https://github.com/teomyth/contexify/commit/fc9d36b1806b2d2a374ceca49944b3ae7a73eedd))
* add changeset release workflow ([a728516](https://github.com/teomyth/contexify/commit/a7285162b947de59ec64fe7c728b5ad0cc2b08eb))
* add official Changesets Action workflow ([9ac42f6](https://github.com/teomyth/contexify/commit/9ac42f696be6125e562bcbd6762e26029c619e00))
* add simplified release commands ([033cef6](https://github.com/teomyth/contexify/commit/033cef65202783b4dde677b6b0a2f523fb6157aa))
* add simplified release workflow with CI checks and npm publishing ([7156805](https://github.com/teomyth/contexify/commit/7156805ccfdd5793b76847783cdac8136a57f8f0))
* enhance changelog generation with detailed commit information ([3f6a22f](https://github.com/teomyth/contexify/commit/3f6a22ffa2354cb2ebe7e2016e1d002a0ee51231))
* implement streamlined release process with Changesets ([31362c1](https://github.com/teomyth/contexify/commit/31362c119ada378e6ff736bbd975808d0bc0bf6b))
* update version numbers and changelogs for @contexify/build and contexify packages ([19f7d14](https://github.com/teomyth/contexify/commit/19f7d14b292e9481786bcbd27bd86fad98ee59c2))

## 1.1.0 (2025-04-17)

* chore: add test:coverage script to monorepo ([ef4030d](https://github.com/teomyth/contexify/commit/ef4030d))
* chore: clean up scripts directory and update package.json references ([650b24f](https://github.com/teomyth/contexify/commit/650b24f))
* chore: exclude examples from test coverage ([f2a9e30](https://github.com/teomyth/contexify/commit/f2a9e30))
* chore: optimize project structure and fix warnings ([7d112d1](https://github.com/teomyth/contexify/commit/7d112d1))
* chore: remove redundant prepub-all-with-colors.js script ([c573bc1](https://github.com/teomyth/contexify/commit/c573bc1))
* chore: remove redundant prepub:all task from turbo.json ([9ff2ebe](https://github.com/teomyth/contexify/commit/9ff2ebe))
* chore: replace ESLint and Prettier with Biome ([d3bd042](https://github.com/teomyth/contexify/commit/d3bd042))
* chore: restore release scripts and update configuration for monorepo structure ([43a549d](https://github.com/teomyth/contexify/commit/43a549d))
* chore: setup monorepo structure with pnpm workspaces and turborepo ([8c921d6](https://github.com/teomyth/contexify/commit/8c921d6))
* style: format documentation code examples for better readability ([755ef8e](https://github.com/teomyth/contexify/commit/755ef8e))
* feat: add prepub and docs:check commands for pre-publish validation ([e0daf41](https://github.com/teomyth/contexify/commit/e0daf41))
* feat: add prepub scripts to all packages for pre-publish validation ([d07aa4e](https://github.com/teomyth/contexify/commit/d07aa4e))
* feat: add prepub-all-with-colors.js script for better output consistency and color preservation ([62b40c0](https://github.com/teomyth/contexify/commit/62b40c0))
* feat: add prepub-all.js script for better error handling and reporting ([bef6dd4](https://github.com/teomyth/contexify/commit/bef6dd4))
* feat: create debug.ts file to replace logger.ts ([1e01ea2](https://github.com/teomyth/contexify/commit/1e01ea2))
* feat: improve prepub-all.js script output consistency ([0a8293c](https://github.com/teomyth/contexify/commit/0a8293c))
* fix: add debug.enabled checks before logging messages ([fd459ab](https://github.com/teomyth/contexify/commit/fd459ab))
* fix: add process global declaration to fix ESLint errors ([7f2f6da](https://github.com/teomyth/contexify/commit/7f2f6da))
* fix: restore color output in prepub-all.js script ([434bc22](https://github.com/teomyth/contexify/commit/434bc22))
* fix: update version script to fix ESLint errors ([8fa662f](https://github.com/teomyth/contexify/commit/8fa662f))
* refactor: migrate documentation to Docusaurus and add docs-code for executable examples ([9a1b81d](https://github.com/teomyth/contexify/commit/9a1b81d))
* refactor: move source code and tests to packages/contexify directory ([cbd7af7](https://github.com/teomyth/contexify/commit/cbd7af7))
* refactor: optimize dependencies and modularize structure ([8989b59](https://github.com/teomyth/contexify/commit/8989b59))
* refactor: remove old logger.ts and logger.test.ts files ([7e3c086](https://github.com/teomyth/contexify/commit/7e3c086))
* refactor: rename example directories for better clarity ([4e26eeb](https://github.com/teomyth/contexify/commit/4e26eeb))
* refactor: replace debug package with custom logger implementation ([3c91122](https://github.com/teomyth/contexify/commit/3c91122))
* refactor: replace execSync with spawnSync to enhance security in validate-docs.js ([4040903](https://github.com/teomyth/contexify/commit/4040903))
* refactor: update core files to use debug.ts instead of logger.ts ([2ff33b5](https://github.com/teomyth/contexify/commit/2ff33b5))
* refactor: update examples and scripts for monorepo structure ([e2a4945](https://github.com/teomyth/contexify/commit/e2a4945))
* test: update test files to use debug.ts instead of logger.ts ([5e70dee](https://github.com/teomyth/contexify/commit/5e70dee))

## <small>1.0.2 (2025-04-15)</small>

* fix: update version script to fix ESLint errors ([8fa662f](https://github.com/teomyth/contexify/commit/8fa662f))

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - YYYY-MM-DD

### Added

- Initial release
