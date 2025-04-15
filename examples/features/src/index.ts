import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function main() {
  let files = await fs.promises.readdir(__dirname);

  // Sort the files by name for consistency
  files = files.filter(f => f.endsWith('.js') && f !== 'index.js').sort();

  for (const name of files) {
    console.log('> %s', name);
    try {
      const example = await import(`./${name}`);
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
  process.env.FOO = JSON.stringify({bar: 'xyz'});

  main().catch(err => {
    console.error('Failed to run examples:', err);
    process.exit(1);
  });
}
