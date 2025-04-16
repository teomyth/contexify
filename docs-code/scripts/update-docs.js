import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Code examples directory
const CODE_DIR = path.resolve(__dirname, '..');
// Documentation directories
const DOCS_DIRS = [
  path.resolve(__dirname, '../../docs-site/docs'),
  path.resolve(__dirname, '../../docs-site/i18n/en/docusaurus-plugin-content-docs/current')
];

// Read code file
function readCodeFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Extract code content from a file (removing imports and exports)
function extractCodeContent(fileContent) {
  // Remove import statements
  let code = fileContent.replace(/import\s+.*?from\s+['"].*?['"];?\n/g, '');
  
  // Remove export statements
  code = code.replace(/export\s+{.*?};?\n/g, '');
  
  // Remove if (require.main === module) { ... } block
  code = code.replace(/if\s*\(require\.main\s*===\s*module\)\s*{[\s\S]*?}/g, '');
  
  return code.trim();
}

// Update documentation with code example
function updateDocWithExample(docPath, exampleName, exampleCode) {
  let content = fs.readFileSync(docPath, 'utf8');
  
  // Create a marker pattern to find where to insert the example
  const markerStart = `<!-- CODE:${exampleName}:START -->`;
  const markerEnd = `<!-- CODE:${exampleName}:END -->`;
  
  // Check if markers exist
  if (content.includes(markerStart) && content.includes(markerEnd)) {
    // Replace content between markers
    const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'g');
    const replacement = `${markerStart}\n\`\`\`typescript\n${exampleCode}\n\`\`\`\n${markerEnd}`;
    content = content.replace(regex, replacement);
    
    // Write updated content back to file
    fs.writeFileSync(docPath, content);
    console.log(`Updated example ${exampleName} in ${docPath}`);
  }
}

// Main function
function main() {
  // Find all code files
  const codeFiles = [];
  
  function findCodeFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist' && file !== 'scripts' && file !== 'temp') {
        findCodeFiles(filePath);
      } else if (file.endsWith('.ts')) {
        codeFiles.push(filePath);
      }
    }
  }
  
  findCodeFiles(CODE_DIR);
  
  // Process each code file
  for (const codeFile of codeFiles) {
    const exampleName = path.basename(codeFile, '.ts');
    console.log(`Processing code file: ${exampleName}`);
    
    const fileContent = readCodeFile(codeFile);
    const exampleCode = extractCodeContent(fileContent);
    
    // Update all documentation directories
    for (const docsDir of DOCS_DIRS) {
      // Find all markdown files
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
      
      findMarkdownFiles(docsDir);
      
      // Update each documentation file
      for (const docFile of docFiles) {
        updateDocWithExample(docFile, exampleName, exampleCode);
      }
    }
  }
  
  console.log('Documentation examples updated successfully');
}

main();
