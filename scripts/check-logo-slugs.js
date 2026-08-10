const https = require('https');
const slugs = [
  'solidworks',
  'fusion360',
  'fusion',
  'autodeskfusion',
  'autodesk-fusion-360',
  'fusion-360',
  'keyshot',
  'rhino',
  'rhinoceros',
  'substancepainter',
  'substance-painter',
  'substance',
  'adobesubstancepainter',
  'adobe-substance-painter'
];
const prefix = 'https://cdn.simpleicons.org/';
const check = (slug) => new Promise((resolve) => {
  const url = prefix + slug;
  https.get(url, (res) => {
    res.resume();
    resolve({slug, status: res.statusCode});
  }).on('error', (err) => resolve({slug, status: err.message}));
});
(async ()=>{
  for (const slug of slugs) {
    const result = await check(slug);
    console.log(`${result.status} ${result.slug}`);
  }
})();
