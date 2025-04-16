import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function main() {
  let files = await fs.promises.readdir(__dirname);

  // Sort the files by name for consistency
  files = files
    .filter(
      (f) => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('index.')
    )
    .sort();

  for (const name of files) {
    // Remove extension for display
    const baseName = path.basename(name);
    console.log('> %s', baseName);
    try {
      // Get filename without extension
      const moduleName = path.basename(name, path.extname(name));
      // Dynamic import, let TypeScript/JavaScript resolve based on actual situation
      const example = await import(`./${moduleName}.js`);
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
