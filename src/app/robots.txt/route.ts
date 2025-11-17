const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";

export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
