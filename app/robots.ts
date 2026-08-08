const BASE_URL = 'https://www.redshadowdesigns.com';

export default function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow:
Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}
