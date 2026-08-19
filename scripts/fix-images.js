const fs = require('fs');
const path = require('path');
const https = require('https');

const srcDir = path.join(__dirname, '../src');
const bgDir = path.join(__dirname, '../public/bg');

if (!fs.existsSync(bgDir)) {
  fs.mkdirSync(bgDir, { recursive: true });
}

// Helper to get all tsx files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllFiles(srcDir);
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?[\w=&]+)?/g;

async function downloadImage(url, dest) {
  if (fs.existsSync(dest)) return;
  console.log(`Downloading ${url} to ${dest}`);
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
}

async function processFiles() {
  const uniqueUrls = new Map();

  // Find all URLs
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(urlRegex);
    if (matches) {
      for (const match of matches) {
        const urlObj = new URL(match);
        const photoId = urlObj.pathname.split('/').pop();
        const filename = `${photoId}.jpg`;
        uniqueUrls.set(match, filename);
      }
    }
  }

  // Download all
  for (const [url, filename] of uniqueUrls.entries()) {
    const dest = path.join(bgDir, filename);
    await downloadImage(url, dest);
  }

  // Replace in files
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [url, filename] of uniqueUrls.entries()) {
      if (content.includes(url)) {
        content = content.replaceAll(url, `/bg/${filename}`);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
  console.log("Done!");
}

processFiles().catch(console.error);
