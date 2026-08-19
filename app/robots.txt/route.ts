const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.redshadowdesigns.com';

export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow:\nSitemap: ${BASE_URL}/sitemap.xml\nHost: ${BASE_URL}`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}
