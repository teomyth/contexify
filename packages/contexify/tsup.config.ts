import { defineConfig } from 'tsup';

// Define the entry file
const entryPoints: string[] = ['./src/**/*.ts'];

export default defineConfig({
  entry: entryPoints,
  format: ['esm'], // Use only ESM format
  target: 'es2022',
  sourcemap: true,
  dts: true, // Generate type definition file
  clean: true, // Clean the output directory before building
  outDir: 'dist',
  splitting: false, // Disable code segmentation
  treeshake: false, // Disable tree shaking
  bundle: false, // Disable packaging to maintain the same output structure as tsc
  minify: false, // No compression code
  skipNodeModulesBundle: true, // Skip node_modules package
  keepNames: true, // Keep functions and class names
  platform: 'node', // The target platform is Node.js
  esbuildOptions(options) {
    // Enable decorator support
    options.legalComments = 'none';
  },
});
