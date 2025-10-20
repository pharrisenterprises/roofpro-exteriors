import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export const metadata = {
  title: "Siding Blog Post | RoofPro Exteriors",
  description: "Siding insights and how-tos from RoofPro Exteriors.",
};

const POST_QUERY = groq`*[_type=="blog" && slug.current==$slug][0]{
  _id, title, slug, excerpt, coverImage, publishedAt,
  service->{title, slug}, content
}`;

export default async function SidingPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug });

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p>Post not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
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
      <article className="prose prose-neutral max-w-none">
        <PortableText value={post.content} />
      </article>
    </main>
  );
}
