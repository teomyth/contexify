#!/usr/bin/env node

/**
 * This script synchronizes version constants in source files with package.json versions.
 * It scans all packages for .version-sync.json files and updates the specified files accordingly.
 */

import { replaceInFile } from 'replace-in-file';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function syncVersions() {
  // Find all packages with .version-sync.json files
  const configFiles = await fg('packages/*/.version-sync.json', { cwd: rootDir });
  
  if (configFiles.length === 0) {
    console.log('No .version-sync.json files found in packages.');
    return;
  }
  
  console.log(`Found ${configFiles.length} packages with version sync configuration.`);
  
  for (const configFile of configFiles) {
    const packageDir = path.dirname(path.resolve(rootDir, configFile));
    const packageJsonPath = path.join(packageDir, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      console.error(`Package.json not found for config ${configFile}`);
      continue;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;
    const packageName = packageJson.name;
    
    console.log(`Processing ${packageName} (${version})...`);
    
    // Read the sync configuration
    const syncConfig = JSON.parse(fs.readFileSync(path.resolve(rootDir, configFile), 'utf8'));
    
    // Update each file specified in the config
    for (const fileConfig of syncConfig.files) {
      const filePath = path.join(packageDir, fileConfig.path);
      
      if (!fs.existsSync(filePath)) {
        console.error(`File ${fileConfig.path} not found in package ${packageName}`);
        continue;
      }
      
      try {
        const pattern = new RegExp(fileConfig.pattern);
        const replacement = fileConfig.replacement.replace('${version}', version);
        
        const results = await replaceInFile({
          files: filePath,
          from: pattern,
          to: replacement,
        });
        
        if (results[0].hasChanged) {
          console.log(`  Updated ${fileConfig.path}`);
        } else {
          console.log(`  ${fileConfig.path} is already up to date`);
        }
      } catch (error) {
        console.error(`  Error updating ${fileConfig.path}:`, error);
      }
    }
  }
  
  console.log('Version synchronization completed successfully.');
}

// Run the script
syncVersions().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
