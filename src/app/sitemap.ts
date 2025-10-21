// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

const SERVICES_Q = groq`*[_type=="service" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const BLOG_Q = groq`*[_type=="blog" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt,
  service->{ "slug": slug.current }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://roofproexteriors.com";

  const [services, posts] = await Promise.all([
    client.fetch(SERVICES_Q),
    client.fetch(BLOG_Q),
  ]);

  const nowIso = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: nowIso, priority: 1.0 },
    { url: `${base}/privacy`, lastModified: nowIso, priority: 0.3 },
    { url: `${base}/terms`, lastModified: nowIso, priority: 0.3 },
  ];

  // Service landing pages
  const servicePages: MetadataRoute.Sitemap = (services as any[]).map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: s._updatedAt ?? nowIso,
    priority: 0.9,
  }));

  // Service FAQ pages
  const faqPages: MetadataRoute.Sitemap = (services as any[]).map((s) => ({
    url: `${base}/${s.slug}/faq`,
    lastModified: s._updatedAt ?? nowIso,
    priority: 0.6,
  }));

  // Blog posts under their service
  const blogPages: MetadataRoute.Sitemap = (posts as any[]).map((p) => ({
    url: `${base}/${p.service?.slug ?? "roofing"}/blog/${p.slug}`,
    lastModified: p._updatedAt ?? nowIso,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...faqPages,
    ...blogPages,
  ];
}
