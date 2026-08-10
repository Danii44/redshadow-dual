/*
downloads project images referenced originally from fiverr into public/assets/external/projects
usage: node scripts/download-projects.js
*/
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/assets/external/projects');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const items = [
  { id: 'orbai-spherical-drone', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png' },
  { id: 'f1-car-keychain', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d233936dc12e8c10bfcbc01df04f8ee-1778085149990/F1%20Car%20keychain.png' },
  { id: 'tkr-implant', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ba554de2ad029f269a870a21a79b4de-1778103959841/Knee%20Implant.png' },
  { id: 'ketchup-cap', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/993a073adc2457995e50715d5027db806a51-1778104554118/Ketchup%20dispensing%20Cap.png' },
  { id: 'bull-lock', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e64564c7b2c31a31a0c29a3ef409b3c4-1778085712334/Bull%20Lock.png' },
  { id: 'taupe-urn', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/435df2ac457fbaccafb89af9ae9b9a63-1778071894834/Taupe%20Urn.4.jpg' },
  { id: 'compressor-chamber', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png' },
  { id: 'hero-render', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/03ebb2fc4976ec19df71727c22a38472-1778084709761/Render.png' },
  { id: 'makeup-stick', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2d12f0c4410cc1fa7519db8c93eb1996-1783230425150/Makeup%20stick.png' },
  { id: 'camera-housing', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89a8e01d1172396211415fc354ca854e-1783201809117/Camera%20Black.1.jpg' },
  { id: 'bamboo-toothbrush', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8fdeb965bb29fb18f301edcca595ee79-1783229718869/Bamboo%20Toothbrush.2.png' },
  { id: 'open-assembly', url: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4d784892d35280098ce5474d75bae7a2-1783231400688/Open.png' },
];

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
  for (const it of items) {
    try {
      const parsed = new URL(it.url);
      const ext = path.extname(parsed.pathname) || '.jpg';
      const safeName = `${it.id}${ext}`.replace(/\s+/g, '-');
      const dest = path.join(outDir, safeName);
      if (fs.existsSync(dest)) {
        console.log('Already exists:', safeName);
        continue;
      }
      console.log('Downloading', it.url, '->', dest);
      await download(it.url, dest);
      console.log('Saved', safeName);
    } catch (err) {
      console.error('Failed to download', it.url, err.message || err);
    }
  }
  console.log('Done.');
})();
