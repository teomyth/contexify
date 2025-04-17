# Release Guide

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and releases.

## Release Process

### 1. Create a Changeset

After making changes, run the following command to create a changeset:

```bash
pnpm changeset
```

This command will guide you through the following steps:

1. Select which packages are affected
2. Choose the type of version change for each package (patch, minor, or major)
3. Provide a description of the changes

When completed, a Markdown file will be created in the `.changeset` directory, documenting your changes.

### 2. Commit the Changeset

Commit the generated changeset file to the Git repository:

```bash
git add .changeset
git commit -m "chore: add changeset for [brief description]"
```

### 3. Update Versions

When you're ready to release, run the following command to update all package versions:

```bash
pnpm version
```

This command will:

1. Read all changesets
2. Update the version numbers of affected packages
3. Update dependencies between packages
4. Update CHANGELOG.md files
5. Remove processed changesets

### 4. Publish Packages

Finally, run the following command to publish the packages:

```bash
pnpm release
```

This command will publish all packages with updated versions to npm.

## Common Commands

- `pnpm changeset` - Create a new changeset
- `pnpm version` - Update version numbers and CHANGELOG files
- `pnpm release` - Publish packages to npm
- `pnpm release:dry` - Simulate the publishing process without actually publishing

## Automatic VERSION Constant Update

To ensure version constants in source files stay in sync with package versions, we use a flexible version synchronization system. Each package that needs version synchronization has a `.version-sync.json` configuration file that specifies which files and patterns to update.

This is automatically handled by Changesets hooks, configured in `.changeset/config.json`:

```json
"hooks": {
  "afterVersionChange": "node scripts/sync-versions.js"
}
```

This means that whenever you run:

```bash
pnpm version
```

Changesets will update all package versions and then automatically run the script to synchronize version constants in source files.

### Adding Version Sync to a Package

To add version synchronization to a package, create a `.version-sync.json` file in the package directory with the following structure:

```json
{
  "files": [
    {
      "path": "src/index.ts",
      "pattern": "export const VERSION = ['\"](.*?)['\"]",
      "replacement": "export const VERSION = '${version}'"
    }
  ]
}
```

You can specify multiple files and patterns to update.

### Manual Version Synchronization

If you need to manually synchronize version constants, you can run:

```bash
pnpm sync:versions  # Synchronize all version constants
```

## Example Release Workflow

Here's a complete example of the release workflow:

1. Create a changeset

```bash
pnpm changeset
```

2. Commit the changeset

```bash
git add .
git commit -m "chore: add changeset for [brief description]"
```

3. Update versions

```bash
pnpm version
```

4. Commit version updates

```bash
git add .
git commit -m "chore: update versions and CHANGELOG.md files"
```

5. Publish packages

```bash
pnpm release
```

6. Push to GitHub

```bash
git push --follow-tags
```
