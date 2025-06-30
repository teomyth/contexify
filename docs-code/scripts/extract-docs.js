import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Documentation directory
const DOCS_DIR = path.resolve(__dirname, '../../docs-site/docs');
// English documentation directory
const EN_DOCS_DIR = path.resolve(
  __dirname,
  '../../docs-site/i18n/en/docusaurus-plugin-content-docs/current'
);
// Temporary directory for extracted code
const TEMP_DIR = path.resolve(__dirname, '../temp');

// Ensure temporary directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
} else {
  // Clean up existing files
  const files = fs.readdirSync(TEMP_DIR);
  for (const file of files) {
    if (file.endsWith('.ts')) {
      fs.unlinkSync(path.join(TEMP_DIR, file));
    }
  }
}

// Extract TypeScript code snippets from documentation
function extractCodeFromDocs(docPath) {
  const content = fs.readFileSync(docPath, 'utf8');
  const codeBlocks = [];

  // Match content between ```typescript and ```
  const regex = /```typescript\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    codeBlocks.push(match[1]);
  }

  return codeBlocks;
}

// Convert code snippets to executable test files
function createTestFile(code, index, docName) {
  const fileName = `${docName}_example_${index}.ts`;
  const filePath = path.join(TEMP_DIR, fileName);

  // Add necessary imports
  const testCode = `// Example #${index} extracted from ${docName} documentation
import { Context, injectable, inject } from 'contexify';

${code}
`;

  fs.writeFileSync(filePath, testCode);
  return filePath;
}

// Main function
function main() {
  // Get all markdown files from both Chinese and English docs
  const docFiles = [];

  function findMarkdownFiles(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        docFiles.push(filePath);
      }
    }
  }

  // Find markdown files in both Chinese and English docs
  findMarkdownFiles(DOCS_DIR);
  findMarkdownFiles(EN_DOCS_DIR);

  // Process each documentation file
  let totalCodeBlocks = 0;

  for (const docFile of docFiles) {
    const docName = path.basename(docFile, '.md');

    const codeBlocks = extractCodeFromDocs(docFile);
    if (codeBlocks.length === 0) continue;

    console.log(
      `Processing document: ${docName} (${codeBlocks.length} code blocks)`
    );
    totalCodeBlocks += codeBlocks.length;

    for (let i = 0; i < codeBlocks.length; i++) {
      createTestFile(codeBlocks[i], i, docName);
    }
  }

  console.log(`Extracted ${totalCodeBlocks} code blocks from documentation`);
}

main();
