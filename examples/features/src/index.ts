import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function main() {
  const examplesDir = path.join(__dirname, 'examples');
  let files = await fs.promises.readdir(examplesDir);

  // Sort the files by name for consistency
  files = files.filter((f) => f.endsWith('.js') || f.endsWith('.ts')).sort();

  for (const name of files) {
    // Remove extension for display
    const baseName = path.basename(name);
    console.log('> %s', baseName);
    try {
      // Get filename without extension
      const moduleName = path.basename(name, path.extname(name));

      // Use a switch statement instead of dynamic import with template literals
      let example;
      switch (moduleName) {
        case 'binding-types':
          example = await import('./examples/binding-types.js');
          break;
        case 'configuration-injection':
          example = await import('./examples/configuration-injection.js');
          break;
        case 'context-chain':
          example = await import('./examples/context-chain.js');
          break;
        case 'context-observation':
          example = await import('./examples/context-observation.js');
          break;
        case 'custom-configuration-resolver':
          example = await import('./examples/custom-configuration-resolver.js');
          break;
        case 'custom-inject-decorator':
          example = await import('./examples/custom-inject-decorator.js');
          break;
        case 'custom-inject-resolve':
          example = await import('./examples/custom-inject-resolve.js');
          break;
        case 'dependency-injection':
          example = await import('./examples/dependency-injection.js');
          break;
        case 'find-bindings':
          example = await import('./examples/find-bindings.js');
          break;
        case 'injection-without-binding':
          example = await import('./examples/injection-without-binding.js');
          break;
        case 'interceptor-proxy':
          example = await import('./examples/interceptor-proxy.js');
          break;
        case 'parameterized-decoration':
          example = await import('./examples/parameterized-decoration.js');
          break;
        case 'sync-async':
          example = await import('./examples/sync-async.js');
          break;
        case 'value-promise':
          example = await import('./examples/value-promise.js');
          break;
        default:
          throw new Error(`Unknown example: ${moduleName}`);
      }

      await example.main();
    } catch (err) {
      console.error(err);
    }
    console.log('');
  }
}

// Run this example directly
// Check if this file is being run directly
if (
  import.meta.url.endsWith('/index.js') ||
  import.meta.url.endsWith('/index.ts')
) {
  process.env.FOO = JSON.stringify({ bar: 'xyz' });

  main().catch((err) => {
    console.error('Failed to run examples:', err);
    process.exit(1);
  });
}
