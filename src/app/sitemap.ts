import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import fs from "fs";
import path from "path";

type ServiceDoc = {
  slug: string;
  _updatedAt?: string;
};

type BlogDoc = {
  slug: string;
  _updatedAt?: string;
  publishedAt?: string;
  service?: { slug?: string };
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";

const SERVICES_Q = groq`*[_type=="service" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const BLOG_Q = groq`*[_type=="blog" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt,
  publishedAt,
  service->{ "slug": slug.current }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([
    client.fetch<ServiceDoc[]>(SERVICES_Q),
    client.fetch<BlogDoc[]>(BLOG_Q),
  ]);

  const nowIso = new Date().toISOString();
  const staticTimestamp = getFileTimestamp([
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "src/app/faq-library/page.tsx",
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: staticTimestamp, priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: staticTimestamp, priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: staticTimestamp, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: staticTimestamp, priority: 0.3 },
    { url: `${SITE_URL}/faq-library`, lastModified: staticTimestamp, priority: 0.4 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: s._updatedAt ?? staticTimestamp,
    priority: 0.9,
  }));

  const faqPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}/faq`,
    lastModified: s._updatedAt ?? staticTimestamp,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/${p.service?.slug ?? "roofing"}/blog/${p.slug}`,
    lastModified: p._updatedAt ?? p.publishedAt ?? nowIso,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...faqPages,
    ...blogPages,
  ];
}

function getFileTimestamp(relativePaths: string[]): string {
  for (const rel of relativePaths) {
    const full = path.join(process.cwd(), rel);
    try {
      const stat = fs.statSync(full);
      return stat.mtime.toISOString();
    } catch {
      /* continue */
    }
  }
  return new Date().toISOString();
}
