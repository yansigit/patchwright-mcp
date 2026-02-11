#!/usr/bin/env node
/**
 * Postinstall verification script.
 * Checks that all critical internal patchright paths exist on disk.
 */

const path = require('path');
const fs = require('fs');

const nodeModulesDir = path.join(__dirname, 'node_modules');

// Fallback to parent node_modules if local doesn't exist (npm workspaces hoisting)
const resolveBase = fs.existsSync(nodeModulesDir)
  ? nodeModulesDir
  : path.join(__dirname, '..', '..', 'node_modules');

const paths = [
  'patchright/lib/mcp/index.js',
  'patchright/lib/mcp/program.js',
  'patchright/lib/mcp/browser/tools.js',
  'patchright-core/lib/utilsBundle.js',
];

let ok = true;
for (const p of paths) {
  const fullPath = path.join(resolveBase, p);
  if (!fs.existsSync(fullPath)) {
    console.warn(`WARNING: Expected patchright internal path not found: ${p}`);
    ok = false;
  }
}

if (ok)
  console.log('Patchright internal paths verified successfully.');
else
  console.warn('Some patchright internal paths are missing. The MCP server may not work correctly.');
