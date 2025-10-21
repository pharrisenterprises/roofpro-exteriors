// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type BlogDoc = {
  url: string;                 // post slug
  service?: string | null;     // related service slug
  _updatedAt?: string;
  _createdAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.roofproexteriors.com";

  // Core service pages
  const services = ["roofing", "siding", "gutters", "exterior-repairs"];
  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/${s}`,
    lastModified: new Date(),
  }));

  // Blog posts nested under each service: /{service}/blog/{post}
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<BlogDoc[]>(
      groq`*[_type=="blog" && defined(slug.current) && defined(service->slug.current)]{
        "url": slug.current,
        "service": service->slug.current,
        _updatedAt,
        _createdAt
      }`
    );

    blogEntries = posts
      .filter((p): p is Required<Pick<BlogDoc, "url" | "service">> & BlogDoc => !!p.url && !!p.service)
      .map((p) => {
        const last = p._updatedAt ?? p._createdAt ?? new Date().toISOString();
        return {
          url: `${base}/${p.service}/blog/${p.url}`,
          lastModified: new Date(last),
        };
      });
  } catch {
    // If Sanity is unreachable during build, return only static URLs
    blogEntries = [];
  }

  return [...serviceUrls, ...blogEntries];
}
