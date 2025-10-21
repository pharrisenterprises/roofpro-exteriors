import type { Metadata } from "next";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ServiceFromSanity from "@/components/ServiceFromSanity";

export const revalidate = 60;

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

const SLUG = "Gutters";

// Case-insensitive service query (works even if slug is “Gutters” in Sanity)
const SERVICE_QUERY = groq`
*[_type == "service" && lower(slug.current) == lower($slug)][0]{
  _id, title, "slug": slug.current, heroImage, intro, sections, seo
}
`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SERVICE_QUERY, { slug: SLUG });

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
  const [service, blogs, faqs] = await Promise.all([
    client.fetch(SERVICE_QUERY, { slug: SLUG }),
    client.fetch(
      groq`*[_type=="blog" && defined(service->slug.current) && lower(service->slug.current) == lower($slug)]
          | order(publishedAt desc){
            _id, title, "slug": slug.current, excerpt
          }`,
      { slug: SLUG }
    ),
    client.fetch(
      groq`*[_type=="faq" && defined(service->slug.current) && lower(service->slug.current) == lower($slug)]
          | order(question asc){
            _id, question, "slug": slug.current
          }`,
      { slug: SLUG }
    ),
  ]);

  if (!service) {
    // Fallback so the page isn't empty while you fix the slug in Studio.
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Gutters</h1>
        <p className="mt-2 text-neutral-700">Content coming soon.</p>

        {/* Helpful dev hint (remove later): */}
        <div className="mt-8 text-sm text-neutral-600">
          <p><strong>Heads up:</strong> We couldn’t find a “service” with slug matching “Gutters”.</p>
          <p>Open Studio → Service → Gutters and make sure the slug is exactly <code>Gutters</code> (lowercase), then Publish.</p>
        </div>

        {/* Still show related content if it exists */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
          {blogs?.length ? (
            <ul className="space-y-4">
              {blogs.map((p: Blog) => (
                <li key={p._id} className="border rounded-xl p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  {p.excerpt && <p className="text-sm text-gray-600">{p.excerpt}</p>}
                  <Link href={`/gutters/blog/${p.slug}`} className="text-blue-700 underline mt-2 inline-block">
                    Read More
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-600">No blog posts yet.</p>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      <ServiceFromSanity {...service} />

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        {blogs?.length ? (
          <ul className="space-y-4">
            {blogs.map((p: Blog) => (
              <li key={p._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-gray-600">{p.excerpt}</p>}
                <Link href={`/gutters/blog/${p.slug}`} className="text-blue-700 underline mt-2 inline-block">
                  Read More
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blog posts yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs?.length ? (
          <ul className="space-y-4">
            {faqs.map((f: Faq) => (
              <li key={f._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{f.question}</h3>
                <Link href={`/gutters/faq#${f.slug}`} className="text-blue-700 underline mt-2 inline-block">
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
