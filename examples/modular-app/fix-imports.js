import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all TypeScript files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  // Process file
  let content = fs.readFileSync(filePath, 'utf8');

  // Regular expression to match relative imports without extensions
  const importRegex = /from\s+['"](\.[^'"]*)['"]/g;

  // Replace imports without extensions with imports with .js extension
  content = content.replace(importRegex, (match, importPath) => {
    // Skip if the import already has an extension
    if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
      return match;
    }
    return `from '${importPath}.js'`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

// Main function
function main() {
  const srcDir = path.join(__dirname, 'src');
  const tsFiles = findTsFiles(srcDir);

  // Fix imports in all TypeScript files
  tsFiles.forEach(fixImportsInFile);
}

main();
