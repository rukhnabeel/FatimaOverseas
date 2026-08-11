import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const STANDALONE_DIR = path.join(ROOT_DIR, '.next', 'standalone');
const CPANEL_BUILD_DIR = path.join(ROOT_DIR, 'cpanel_build');

console.log('🚀 Starting cPanel packaging process...\n');

// 1. Build the project
console.log('📦 1/4 Building the Next.js standalone application...');
try {
  execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed. Please check the errors above.');
  process.exit(1);
}

// 2. Prepare cPanel wrapper directory
console.log('\n📂 2/4 Preparing CloudLinux compatible wrapper...');
if (fs.existsSync(CPANEL_BUILD_DIR)) {
  fs.rmSync(CPANEL_BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(CPANEL_BUILD_DIR);

// Copy standalone inside the wrapper
const STANDALONE_DEST = path.join(CPANEL_BUILD_DIR, 'standalone');
fs.cpSync(STANDALONE_DIR, STANDALONE_DEST, { recursive: true });

// 3. Copy necessary static files and database into the nested standalone dir
console.log('🗄️ 3/4 Copying SQLite database and static assets...');
const publicSrc = path.join(ROOT_DIR, 'public');
const publicDest = path.join(STANDALONE_DEST, 'public');
const staticSrc = path.join(ROOT_DIR, '.next', 'static');
const staticDest = path.join(STANDALONE_DEST, '.next', 'static');
const dbSrc = path.join(ROOT_DIR, 'dev.db');
const dbDest = path.join(STANDALONE_DEST, 'dev.db');
const envSrc = path.join(ROOT_DIR, '.env.local');
const envDest = path.join(STANDALONE_DEST, '.env.local');
const prismaSrc = path.join(ROOT_DIR, 'prisma');
const prismaDest = path.join(STANDALONE_DEST, 'prisma');

if (fs.existsSync(publicSrc)) fs.cpSync(publicSrc, publicDest, { recursive: true });
if (fs.existsSync(staticSrc)) fs.cpSync(staticSrc, staticDest, { recursive: true });
if (fs.existsSync(dbSrc)) fs.cpSync(dbSrc, dbDest);
if (fs.existsSync(envSrc)) fs.cpSync(envSrc, envDest);
if (fs.existsSync(prismaSrc)) fs.cpSync(prismaSrc, prismaDest, { recursive: true });

// 4. Create CloudLinux wrapper files
// CloudLinux doesn't allow node_modules in the root. By wrapping it, the root has no node_modules.
const wrapperServerJs = `
// CloudLinux/cPanel Wrapper
// This file acts as the entry point for Passenger to avoid the node_modules symlink conflict.
const path = require('path');

// Change working directory to the standalone Next.js folder
const standaloneDir = path.join(__dirname, 'standalone');
process.chdir(standaloneDir);

// Run the actual Next.js server
require('./standalone/server.js');
`;
fs.writeFileSync(path.join(CPANEL_BUILD_DIR, 'server.js'), wrapperServerJs.trim());

// Create a package.json for cPanel's NodeJS Selector
// We MUST include the actual dependencies here so CloudLinux NodeJS Selector installs them into its virtual environment.
// Passenger often blocks local node_modules resolving, forcing reliance on the virtualenv.
const rootPackageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));

const cpanelPackageJson = {
  name: "fatima-overseas-cpanel",
  version: "1.0.0",
  description: "Next.js standalone wrapper for CloudLinux",
  main: "server.js",
  scripts: {
    start: "node server.js"
  },
  dependencies: rootPackageJson.dependencies
};
fs.writeFileSync(path.join(CPANEL_BUILD_DIR, 'package.json'), JSON.stringify(cpanelPackageJson, null, 2));

// Create an empty .htaccess file to prevent CloudLinux Passenger from crashing
// (cPanel tries to modify .htaccess to route traffic, and crashes if it doesn't exist)
fs.writeFileSync(path.join(CPANEL_BUILD_DIR, '.htaccess'), '# Passenger Configuration\n');

// 5. Create the ZIP file using PowerShell
console.log('\n🗜️ 4/4 Compressing into cpanel-deploy.zip...');
const zipFile = path.join(ROOT_DIR, 'cpanel-deploy.zip');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

try {
  // Use Windows native tar utility to create the zip file. It handles deep paths much better than Compress-Archive.
  execSync(`tar.exe -a -c -f "${zipFile}" -C "${CPANEL_BUILD_DIR}" .`, { stdio: 'inherit' });
  console.log('\n✅ SUCCESS! Your deployment file is ready: cpanel-deploy.zip');
} catch (error) {
  console.error('\n❌ Compression failed:', error.message);
} finally {
  // Cleanup the temporary build directory
  if (fs.existsSync(CPANEL_BUILD_DIR)) {
    fs.rmSync(CPANEL_BUILD_DIR, { recursive: true, force: true });
  }
}
