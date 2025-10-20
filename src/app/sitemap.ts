import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap() {
  const posts = await client.fetch(groq`*[_type=="blog"]{ "url": slug.current, "service": service->slug.current }`);
  const services = ["roofing", "siding", "gutters", "exterior-repairs"];

  const blogUrls = posts.map((p: any) => ({
    url: `https://www.roofproexteriors.com/${p.service}/blog/${p.url}`,
    lastModified: new Date().toISOString(),
  }));

  const serviceUrls = services.map((s) => ({
    url: `https://www.roofproexteriors.com/${s}`,
    lastModified: new Date().toISOString(),
  }));

  return [...serviceUrls, ...blogUrls];
}
