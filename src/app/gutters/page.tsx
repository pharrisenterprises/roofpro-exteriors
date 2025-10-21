import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ServiceFromSanity from "@/components/ServiceFromSanity";
import Link from "next/link";
import { groq } from "next-sanity";

export const revalidate = 60;

// You want it linked to the Sanity doc named/slugged "Gutters"
const SANITY_MATCH = "Gutters"; // matches either "Gutters" or "gutters" after query update
const ROUTE_SLUG = "gutters";   // keep site route lowercase

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
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: SANITY_MATCH });
  const title = data?.seo?.title ?? "Gutters | RoofPro Exteriors";
  const description =
    data?.seo?.description ?? "Gutter installation, repair, and protection in Greater Richmond, VA.";
  const ogSrc = data?.seo?.ogImage ?? data?.heroImage;
  const images = ogSrc ? [{ url: urlFor(ogSrc).width(1200).height(630).url() }] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page() {
  const [data, blogs, faqs] = await Promise.all([
    client.fetch(SERVICE_BY_SLUG_QUERY, { slug: SANITY_MATCH }),
    client.fetch(
      groq`*[_type=="blog"
          && defined(service->slug.current)
          && lower(service->slug.current) == lower($slug)]
        | order(publishedAt desc){
          _id, title, "slug": slug.current, excerpt
        }`,
      { slug: SANITY_MATCH }
    ),
    client.fetch(
      groq`*[_type=="faq"
          && defined(service->slug.current)
          && lower(service->slug.current) == lower($slug)]
        | order(question asc){
          _id, question, "slug": slug.current
        }`,
      { slug: SANITY_MATCH }
    ),
  ]);

  if (!data) {
    // this should no longer trigger once the query is case-insensitive,
    // but keep the fallback just in case.
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Gutters</h1>
        <p className="mt-2 text-neutral-700">Content coming soon.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      {/* Renders hero (e.g., hero-gutters.JPG), intro, sections */}
      <ServiceFromSanity {...data} />

      {/* Latest Blog Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        {blogs?.length ? (
          <ul className="space-y-4">
            {blogs.map((p: Blog) => (
              <li key={p._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-gray-600">{p.excerpt}</p>}
                <Link href={`/${ROUTE_SLUG}/blog/${p.slug}`} className="text-blue-700 underline mt-2 inline-block">
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
                <Link href={`/${ROUTE_SLUG}/faq#${f.slug}`} className="text-blue-700 underline mt-2 inline-block">
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
