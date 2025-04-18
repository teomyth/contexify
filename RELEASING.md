# Release Guide

This project uses [Changesets](https://github.com/changesets/changesets) with a custom quick-release script to manage versioning and releases in a platform-independent way.

## Release Process Options

We provide two main options for releasing packages:

1. **Standard Changesets Flow** - Manual multi-step process
2. **One-Command Release Flow** - Streamlined one-command process

## Option 1: Standard Changesets Flow

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
pnpm publish
```

This command will publish all packages with updated versions to npm.

## Option 2: One-Command Release Flow

For a more streamlined release process, we've created a custom release script that integrates with Changesets to provide a one-command release process with idempotent execution and recovery capabilities.

### Using release Commands

```bash
pnpm release         # Interactive release (prompts for version)
pnpm release:patch   # Release a patch version
pnpm release:minor   # Release a minor version
pnpm release:major   # Release a major version
pnpm release:dry     # Dry run (no actual changes)
pnpm release:yes     # Non-interactive release (skips prompts)
```

These commands will:

1. Run tests and linting checks
2. Bump the version in the root package.json
3. Create a changeset for all packages
4. Update all package versions using Changesets
5. Synchronize version constants in source files
6. Commit changes and create a Git tag
7. Push changes and tags to the remote repository
8. Publish packages to npm (if configured)

### Advanced Release Options

The release script supports additional options for more control:

```bash
# Recovery options
pnpm release --resume          # Resume from last failed step
pnpm release --clean-state     # Clean previous release state and exit

# Force options (override state checks)
pnpm release --force-changeset # Force re-creation of changeset
pnpm release --force-version   # Force version update
pnpm release --force-publish   # Force package publishing
pnpm release --force-tags      # Force tag creation

# Skip options
pnpm release --skip-changeset  # Skip changeset creation
pnpm release --skip-version    # Skip version update
pnpm release --skip-publish    # Skip package publishing
pnpm release --skip-tags       # Skip tag creation
pnpm release --skip-git-check  # Skip checking if working directory is clean
```

### Idempotent Execution and Recovery

The release script implements idempotent execution, meaning it can be safely re-run after failures without duplicating work. If the release process is interrupted, the script will:

1. Detect the incomplete state
2. Offer options to resume, restart, clean state, or exit
3. Continue from the last successful step if resuming

This ensures that you can recover from failures without leaving the repository in an inconsistent state.

#### Recovery Process

If a release fails midway (e.g., network issues during publishing):

1. Simply run `pnpm release` again
2. The script will detect the incomplete state and offer recovery options
3. Select "Resume from last step" to continue where it left off

#### Forcing Cancellation

If you need to cancel an incomplete release:

```bash
pnpm release --clean-state
```

This will remove the state file and allow you to start fresh.

## Common Commands

- `pnpm changeset` - Create a new changeset
- `pnpm version` - Update version numbers and CHANGELOG files
- `pnpm publish` - Publish packages to npm
- `pnpm release` - One-command release process
- `pnpm release:dry` - Simulate the release process without making changes

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

## Example Release Workflows

### Standard Multi-Step Workflow

Here's a complete example of the standard multi-step release workflow:

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
pnpm publish
```

6. Push to GitHub

```bash
git push --follow-tags
```

### One-Command Workflow

Here's how to use the streamlined one-command release workflow:

1. Ensure your working directory is clean (commit or stash changes)

2. Run the release command

```bash
pnpm release       # Interactive mode (recommended for first-time users)
# OR
pnpm release:minor # For a minor version bump
```

3. Follow the interactive prompts

4. The script will handle everything: creating changesets, updating versions, publishing packages, and creating Git tags

### Recovery Workflow

If a release process is interrupted:

1. Run the release command again

```bash
pnpm release
```

2. When prompted about the incomplete release, select "Resume from last step"

3. The script will continue from where it left off

### Git Tag Strategy

Our release process creates Git tags based on the main package version. For example, if the main package is released as version 1.2.3, a tag `v1.2.3` will be created.

The tag message includes version information for all released packages, making it easy to track which versions were released together.
