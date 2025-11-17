import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ServiceFromSanity from "@/components/ServiceFromSanity";
import Link from "next/link";
import { groq } from "next-sanity";

export const revalidate = 60;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

interface Faq {
  _id: string;
  question: string;
  slug: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: "roofing" });
  const title = data?.seo?.title ?? "Roofing | RoofPro Exteriors";
  const description =
    data?.seo?.description ?? "Roof repair, replacement, and inspections in Greater Richmond, VA.";
  const ogSrc = data?.seo?.ogImage ?? data?.heroImage;
  const images = ogSrc ? [{ url: urlFor(ogSrc).width(1200).height(630).url() }] : undefined;
  const canonical = `${SITE_URL}/roofing`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function Page() {
  const slug = "roofing";

  const [data, blogs, faqs] = await Promise.all([
    client.fetch(SERVICE_BY_SLUG_QUERY, { slug }),
    client.fetch(groq`*[_type=="blog" && service->slug.current==$slug]{ _id, title, "slug":slug.current, excerpt }`, { slug }),
    client.fetch(groq`*[_type=="faq" && service->slug.current==$slug]{ _id, question, "slug":slug.current }`, { slug }),
  ]);

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Roofing</h1>
        <p className="mt-2 text-neutral-700">Content coming soon.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      <ServiceFromSanity {...data} />

      {/* Blogs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        {blogs?.length ? (
          <ul className="space-y-4">
            {blogs.map((p: Blog) => (
              <li key={p._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.excerpt}</p>
                <Link href={`/${slug}/blog/${p.slug}`} className="text-blue-700 underline mt-2 inline-block">
                  Read More
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blog posts yet.</p>
        )}
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs?.length ? (
          <ul className="space-y-4">
            {faqs.map((f: Faq) => (
              <li key={f._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{f.question}</h3>
                <Link href={`/${slug}/faq#${f.slug}`} className="text-blue-700 underline mt-2 inline-block">
                  View Answer
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No FAQs yet.</p>
        )}
      </section>
    </main>
  );
}
