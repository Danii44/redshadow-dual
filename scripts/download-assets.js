/*
Script: download-assets.js
Downloads external images referenced in lib/projects.ts and saves them under public/assets/external/projects

Usage:
  node scripts/download-assets.js

This script is intentionally simple and uses native https/http modules.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectFile = path.resolve(__dirname, '../lib/projects.ts');
const outDir = path.resolve(__dirname, '../public/assets/external/projects');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const content = fs.readFileSync(projectFile, 'utf8');
const urlRegex = /https?:\/\/[^'\"\n]+/g;
const urls = new Set(content.match(urlRegex) || []);

if (urls.size === 0) {
  console.log('No external URLs found in lib/projects.ts');
  process.exit(0);
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) return reject(new Error('HTTP ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      const baseName = path.basename(parsed.pathname).replace(/\s+/g, '-');
      const dest = path.join(outDir, baseName);
      if (fs.existsSync(dest)) {
        console.log('Already exists:', baseName);
        continue;
      }
      console.log('Downloading', url, '->', dest);
      await download(url, dest);
      console.log('Saved', baseName);
    } catch (err) {
      console.error('Failed to download', url, err.message || err);
    }
  }
  console.log('Done.');
})();
