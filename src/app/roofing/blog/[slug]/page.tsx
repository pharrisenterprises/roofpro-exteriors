import type { Metadata } from "next";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage, PortableTextBlock } from "sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  content?: PortableTextBlock[];
  seo?: { title?: string; description?: string; ogImage?: SanityImage };
  service?: { title: string; slug: string };
};

const POST_QUERY = groq`*[_type=="blog" && slug.current==$slug][0]{
  _id, title, slug, excerpt, coverImage, publishedAt, content,
  seo { title, description, ogImage },
  service->{ title, "slug": slug.current }
}`;

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;
  const data: Post | null = await client.fetch(POST_QUERY, { slug });

  const baseTitle = data?.title ?? "Blog Post";
  const title = data?.seo?.title ?? `${baseTitle} | RoofPro Exteriors`;
  const description = data?.seo?.description ?? data?.excerpt ?? "";

  const og = data?.seo?.ogImage ?? data?.coverImage;
  const images = og ? [{ url: urlFor(og).width(1200).height(630).url() }] : undefined;
  const canonical = `${SITE_URL}/${data?.service?.slug ?? "roofing"}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function RoofingPostPage(
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const post: Post | null = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p>Post not found.</p>
      </main>
    );
  }

  const canonical = `${SITE_URL}/${post.service?.slug ?? "roofing"}/blog/${post.slug.current}`;
  const description = post.seo?.description ?? post.excerpt ?? "";
  const imageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "RoofPro Exteriors", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "RoofPro Exteriors",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/RoofPro-Exteriors New Logo.jpg` },
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {post?.service?.slug && (
        <div className="mb-3">
          <Link href={`/${post.service.slug}`} className="text-sm underline">
            <- Back to {post.service.title}
          </Link>
        </div>
      )}

      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-sm text-neutral-500 mt-1">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      {post.coverImage && (
        <Image
          src={urlFor(post.coverImage).width(1200).height(630).url()}
          alt={post.title}
          width={1200}
          height={630}
          className="rounded-lg my-4"
        />
      )}
      {post.content && (
        <article className="prose prose-neutral max-w-none">
          <PortableText value={post.content} />
        </article>
      )}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </main>
  );
}
