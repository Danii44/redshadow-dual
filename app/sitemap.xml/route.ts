import { serviceSlugs } from '@/app/services/seoServices';
import { projects } from '@/lib/projects';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.redshadowdesigns.com';

const staticRoutes = [
  { path: '', priority: '1.00', changefreq: 'weekly' },
  { path: 'services', priority: '0.95', changefreq: 'weekly' },
  { path: 'portfolio', priority: '0.90', changefreq: 'weekly' },
  { path: 'about', priority: '0.85', changefreq: 'monthly' },
  { path: 'contact', priority: '0.85', changefreq: 'monthly' },
  { path: 'careers', priority: '0.70', changefreq: 'monthly' },
  { path: 'privacy', priority: '0.40', changefreq: 'yearly' },
  { path: 'terms', priority: '0.40', changefreq: 'yearly' },
];

function buildUrl(path: string) {
  return `${BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, '$1');
}

export async function GET() {
  const urls = [
    ...staticRoutes.map((r) => ({ loc: buildUrl(r.path), priority: r.priority, changefreq: r.changefreq })),
    ...serviceSlugs.map((slug) => ({ loc: buildUrl(`services/${slug}`), priority: '0.90', changefreq: 'weekly' })),
    ...projects.map((p) => ({ loc: buildUrl(`portfolio/${p.id}`), priority: '0.80', changefreq: 'monthly' })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls
    .map((url) => `<url><loc>${url.loc}</loc><priority>${url.priority}</priority><changefreq>${url.changefreq}</changefreq></url>`)
    .join('\n  ')}\n</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
