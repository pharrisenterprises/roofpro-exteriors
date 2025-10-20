// src/types/cms.ts
import type { Image, PortableTextBlock } from "sanity";

export type SanitySlug = { current: string };

export interface ServiceRef {
  title: string;
  slug: SanitySlug;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: Image;
  publishedAt?: string;
  service?: ServiceRef;
}

export interface Faq {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
}
