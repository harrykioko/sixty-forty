import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../src/components');

function toPascalCase(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function dialogToModal(str) {
  return str.replace('Dialog', 'Modal');
}

function updateFileContent(filePath, oldName, newName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(new RegExp(oldName, 'g'), newName);
  fs.writeFileSync(filePath, updatedContent);
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
      return;
    }

    // Skip non-TypeScript/JavaScript files
    if (!['.tsx', '.ts', '.jsx', '.js'].some(ext => item.endsWith(ext))) {
      return;
    }

    // Remove backup files
    if (item.endsWith('.backup')) {
      console.log(`Removing backup file: ${fullPath}`);
      fs.unlinkSync(fullPath);
      return;
    }

    // Get the file name without extension
    const ext = path.extname(item);
    const baseName = path.basename(item, ext);

    // Convert Dialog to Modal
    if (baseName.includes('Dialog')) {
      const newBaseName = dialogToModal(baseName);
      const newName = newBaseName + ext;
      const newPath = path.join(dirPath, newName);

      if (newName !== item) {
        // Create backup
        fs.copyFileSync(fullPath, fullPath + '.backup');
        
        console.log(`Renaming ${item} to ${newName}`);
        fs.renameSync(fullPath, newPath);

        // Update references in all TypeScript/JavaScript files
        processReferences(componentsDir, baseName, newBaseName);
      }
      return;
    }

    // Handle regular PascalCase conversion
    if (baseName[0] !== baseName[0].toUpperCase() || baseName.includes('-')) {
      const newBaseName = toPascalCase(baseName);
      const newName = newBaseName + ext;
      const newPath = path.join(dirPath, newName);

      if (newName !== item) {
        console.log(`Renaming ${item} to ${newName}`);
        fs.renameSync(fullPath, newPath);
      }
    }
  });
}

function processReferences(dirPath, oldName, newName) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processReferences(fullPath, oldName, newName);
      return;
    }

    if (['.tsx', '.ts', '.jsx', '.js'].some(ext => item.endsWith(ext))) {
      updateFileContent(fullPath, oldName, newName);
    }
  });
}

console.log('Starting component renaming process...');
processDirectory(componentsDir);
console.log('Component renaming process completed successfully!');
console.log('Please review the changes and commit them.'); 