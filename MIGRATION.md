# Migration Guide

## Node.js Version Update (v1.x to v2.x)

### Breaking Change: Node.js Version Requirement

Starting from version 2.0.0, Contexify requires Node.js 20, 22, or 24. Node.js 18 is no longer supported.

### Why This Change?

This change aligns Contexify with the upstream LoopBack Next project and provides several benefits:

- **Better Performance**: Node.js 20+ includes significant performance improvements
- **Enhanced Security**: Latest Node.js versions include important security updates
- **Modern Features**: Access to the latest JavaScript and Node.js features
- **Upstream Alignment**: Maintains compatibility with LoopBack Next project updates

### Migration Steps

#### 1. Check Your Current Node.js Version

```bash
node --version
```

#### 2. Upgrade Node.js

**Using Node Version Manager (nvm):**

```bash
# Install and use Node.js 20 (recommended)
nvm install 20
nvm use 20

# Or install Node.js 22
nvm install 22
nvm use 22

# Or install Node.js 24
nvm install 24
nvm use 24
```

**Using Official Installer:**

Download and install from [nodejs.org](https://nodejs.org/)

#### 3. Update Your Project

If you have a `.nvmrc` file in your project, update it:

```bash
echo "20" > .nvmrc
```

#### 4. Update CI/CD Pipelines

Update your GitHub Actions, GitLab CI, or other CI/CD configurations to use Node.js 20+:

```yaml
# GitHub Actions example
strategy:
  matrix:
    node-version: [20.x, 22.x, 24.x]
```

#### 5. Update Documentation

Update any documentation that references Node.js version requirements.

### Compatibility Notes

- **No API Changes**: This is purely a runtime requirement change
- **Dependencies**: All dependencies remain compatible
- **TypeScript**: No TypeScript version changes required

### Troubleshooting

If you encounter issues after upgrading:

1. **Clear node_modules and reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check for Node.js-specific dependencies:**
   Some dependencies might need updates for newer Node.js versions

3. **Verify your package manager:**
   Ensure you're using a compatible version of npm, yarn, or pnpm

### Support

If you need help with migration:

- Check our [GitHub Issues](https://github.com/teomyth/contexify/issues)
- Review the [documentation](https://teomyth.github.io/contexify/)
- Create a new issue if you encounter problems
