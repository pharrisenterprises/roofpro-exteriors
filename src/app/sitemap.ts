// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

type ServiceDoc = {
  slug: string;
  _updatedAt?: string;
};

type BlogDoc = {
  slug: string;
  _updatedAt?: string;
  service?: { slug?: string };
};

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
    client.fetch<ServiceDoc[]>(SERVICES_Q),
    client.fetch<BlogDoc[]>(BLOG_Q),
  ]);

  const nowIso = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: nowIso, priority: 1.0 },
    { url: `${base}/privacy`, lastModified: nowIso, priority: 0.3 },
    { url: `${base}/terms`, lastModified: nowIso, priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: s._updatedAt ?? nowIso,
    priority: 0.9,
  }));

  const faqPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/${s.slug}/faq`,
    lastModified: s._updatedAt ?? nowIso,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
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

