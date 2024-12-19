// pre-build.js
const fs = require('fs');
const path = require('path');

function replaceRouter() {
    // You can adjust these paths based on where your router is defined
    const possibleFiles = ['./src/index.js', './src/App.js'];
    
    possibleFiles.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Replace the import statement
            let updatedContent = content.replace(
                /import\s*?{\s*?BrowserRouter(\s+as\s+Router)?[\s,]*?}.*?from\s*?['"]react-router-dom['"]/g,
                `import { HashRouter as Router } from 'react-router-dom'`
            );
            
            // Replace the router components
            updatedContent = updatedContent
                .replace(/<BrowserRouter>/g, '<HashRouter>')
                .replace(/<\/BrowserRouter>/g, '</HashRouter>')
                .replace(/<BrowserRouter\s/g, '<HashRouter ')
                
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated router in ${filePath}`);
        }
    });
}

console.log('Starting pre-build modifications...');
replaceRouter();
console.log('Pre-build modifications completed');

// ----------


// post-build.js
// post-build.js
// post-build.js
const fs = require('fs');
const path = require('path');

function updateIndexHtml() {
    const indexPath = './build/m365-pages/index.html';
    
    // Check if the directory exists, if not create it
    const dir = path.dirname(indexPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Check if the original build index.html exists
    const originalIndexPath = './build/index.html';
    if (!fs.existsSync(originalIndexPath)) {
        console.error('Error: build/index.html not found');
        return;
    }
    
    // Read the original index.html
    const content = fs.readFileSync(originalIndexPath, 'utf8');
    
    // Split the content into lines for more precise handling
    const lines = content.split('\n');
    const updatedLines = lines.map(line => {
        // Skip the line containing base href
        if (line.includes('<base href=')) {
            return line;
        }
        // Update other paths
        return line.replace(
            /(src|href)="\/(?!m365-pages|http|https)/g,
            '$1="/m365-pages/'
        );
    });
    
    const updatedContent = updatedLines.join('\n');
    
    // Write the updated content to the new location
    fs.writeFileSync(indexPath, updatedContent, 'utf8');
    console.log('Successfully updated and moved index.html to m365-pages directory');
}

// Function to revert HashRouter back to BrowserRouter
function revertRouterChanges() {
    const possibleFiles = ['./src/index.js', './src/App.js'];
    
    possibleFiles.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Revert the import statement
            let updatedContent = content.replace(
                /import\s*?{\s*?HashRouter(\s+as\s+Router)?[\s,]*?}.*?from\s*?['"]react-router-dom['"]/g,
                `import { BrowserRouter as Router } from 'react-router-dom'`
            );
            
            // Revert the router components
            updatedContent = updatedContent
                .replace(/<HashRouter>/g, '<BrowserRouter>')
                .replace(/<\/HashRouter>/g, '</BrowserRouter>')
                .replace(/<HashRouter\s/g, '<BrowserRouter ');
                
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Reverted router changes in ${filePath}`);
        }
    });
}

console.log('Starting post-build modifications...');
updateIndexHtml();
revertRouterChanges();
console.log('Post-build modifications completed');
