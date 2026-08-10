const https = require('https');
const fs = require('fs');
const logos = {
  blender: 'https://cdn.simpleicons.org/blender',
  cinema4d: 'https://cdn.simpleicons.org/cinema4d',
  autocad: 'https://cdn.simpleicons.org/autocad',
  rhinoceros: 'https://cdn.simpleicons.org/rhinoceros'
};
for (const [name, url] of Object.entries(logos)) {
  const path = `public/assets/icons/${name}.svg`;
  const file = fs.createWriteStream(path);
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error('SKIP', name, res.statusCode);
      res.resume();
      return;
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('WROTE', path);
    });
  }).on('error', (err) => {
    console.error('ERR', name, err.message);
  });
}
