import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPost } from "@/types/cms";

export const revalidate = 60;

export const metadata = {
  title: "gutters Blog | RoofPro Exteriors",
  description: "Tips and guides on gutters repair and replacement in Greater Richmond, VA.",
};

const QUERY = groq`*[_type=="blog" && service->slug.current==$serviceSlug]
|order(publishedAt desc)[0...20]{
  _id, title, slug, excerpt, coverImage, publishedAt,
  service->{title, slug}
}`;

export default async function GuttersBlogIndex() {
  const posts: BlogPost[] = await client.fetch(QUERY, { serviceSlug: "gutters" });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Gutters Blog</h1>
      {posts.length === 0 && <p className="text-neutral-600">No posts yet for Gutters.</p>}
      <ul className="space-y-8">
        {posts.map((p) => (
          <li key={p._id} className="border rounded-xl p-4">
            {p.coverImage && (
              <Image
                src={urlFor(p.coverImage).width(1200).height(630).url()}
                alt={p.title}
                width={1200}
                height={630}
                className="rounded-lg mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">
              <Link href={`/gutters/blog/${p.slug.current}`}>{p.title}</Link>
            </h2>
            {p.publishedAt && (
              <p className="text-sm text-neutral-500 mt-1">
                {new Date(p.publishedAt).toLocaleDateString()}
              </p>
            )}
            {p.excerpt && <p className="text-neutral-700 mt-2">{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
