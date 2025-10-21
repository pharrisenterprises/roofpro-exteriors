// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`*[_type=="siteSettings"][0]{
  brandName, email, phone, serviceArea, about, logo
}`;

export const SERVICE_BY_SLUG_QUERY = groq`*[_type=="service" && slug.current==$slug][0]{
  title, slug, heroImage, intro,
  sections[]{ heading, body },
  seo{ title, description, ogImage }
}`;

export const BLOG_LIST_BY_SERVICE = groq`*[_type=="blog" && service->slug.current==$serviceSlug]
|order(publishedAt desc)[0...20]{ _id, title, slug, excerpt, coverImage, publishedAt, service->{title, slug} }`;

export const SINGLE_POST_BY_SLUG = groq`*[_type=="blog" && slug.current==$slug][0]{
  _id, title, slug, excerpt, coverImage, publishedAt, content, service->{title, slug}
}`;

export const FAQ_BY_SERVICE = groq`*[_type=="faq" && service->slug.current==$serviceSlug]
|order(question asc){ _id, question, answer }`;
