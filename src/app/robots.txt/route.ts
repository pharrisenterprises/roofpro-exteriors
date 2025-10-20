export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://www.roofproexteriors.com/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
