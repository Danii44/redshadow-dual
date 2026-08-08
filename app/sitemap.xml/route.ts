import { serviceSlugs } from '@/app/services/seoServices';

const BASE_URL = 'https://www.redshadowdesigns.com';

const staticRoutes = ['', 'about', 'contact', 'portfolio', 'services'];

function buildUrl(path: string) {
  return `${BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, '$1');
}

export async function GET() {
  const urls = [
    ...staticRoutes.map((route) => ({ loc: buildUrl(route), priority: '1.00' })),
    ...serviceSlugs.map((slug) => ({ loc: buildUrl(`services/${slug}`), priority: '0.90' })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls
    .map((url) => `<url><loc>${url.loc}</loc><priority>${url.priority}</priority></url>`)
    .join('\n  ')}\n</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
