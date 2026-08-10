#!/usr/bin/env node
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';

const src = path.resolve(process.cwd(), 'public/assets/logo.png');
const outDir = path.resolve(process.cwd(), 'public');

async function genPng(size, outName) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, outName));
}

async function run() {
  if (!fs.existsSync(src)) {
    console.error('Source logo not found at', src);
    process.exit(2);
  }

  await genPng(16, 'favicon-16.png');
  await genPng(32, 'favicon-32.png');
  await genPng(48, 'favicon-48.png');
  await genPng(180, 'apple-touch-icon.png');

  const buffers = await Promise.all([
    sharp(src).resize(16, 16).png().toBuffer(),
    sharp(src).resize(32, 32).png().toBuffer(),
    sharp(src).resize(48, 48).png().toBuffer(),
  ]);

  const icoBuf = await pngToIco(buffers);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf);

  console.log('Favicons generated successfully');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});