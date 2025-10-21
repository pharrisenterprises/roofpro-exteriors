import type { Metadata } from "next";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ServiceFromSanity from "@/components/ServiceFromSanity";

export const revalidate = 60;

// You named the service "Gutters" in Sanity.
// We'll resolve that service (case-insensitive) and then filter by its _id.
const SERVICE_MATCH = "Gutters";
const ROUTE_SLUG = "gutters";

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

// Case-insensitive service lookup (by slug OR title).
const SERVICE_QUERY = groq`
*[_type == "service" && (
  lower(slug.current) == lower($slug) || lower(title) == lower($slug)
)][0]{
  _id, title, "slug": slug.current, heroImage, intro, sections, seo
}
`;

// Only PUBLISHED docs; order newest first.
// We filter by the service reference _id, not slug.
const BLOGS_BY_SERVICE_ID = groq`
*[
  _type == "blog" &&
  !(_id in path("drafts.**")) &&
  defined(service._ref) &&
  service._ref == $sid
] | order(coalesce(publishedAt, _updatedAt) desc) {
  _id, title, "slug": slug.current, excerpt
}
`;

const FAQS_BY_SERVICE_ID = groq`
*[
  _type == "faq" &&
  !(_id in path("drafts.**")) &&
  defined(service._ref) &&
  service._ref == $sid
] | order(question asc) {
  _id, question, "slug": slug.current
}
`;

export async function generateMetadata(): Promise<Metadata> {
  const service = await client.fetch(SERVICE_QUERY, { slug: SERVICE_MATCH });

  const title = service?.seo?.title ?? "Gutters | RoofPro Exteriors";
  const description =
    service?.seo?.description ?? "Gutter installation, repair, and protection in Greater Richmond, VA.";
  const ogSrc = service?.seo?.ogImage ?? service?.heroImage;
  const images = ogSrc ? [{ url: urlFor(ogSrc).width(1200).height(630).url() }] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page() {
  const service = await client.fetch(SERVICE_QUERY, { slug: SERVICE_MATCH });

  // If the service itself is missing, show the minimal fallback.
  if (!service) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Gutters</h1>
        <p className="mt-2 text-neutral-700">Content coming soon.</p>
      </main>
    );
  }

  const [blogs, faqs] = await Promise.all([
    client.fetch(BLOGS_BY_SERVICE_ID, { sid: service._id }),
    client.fetch(FAQS_BY_SERVICE_ID, { sid: service._id }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      {/* Hero + intro + sections (e.g., uses your hero-gutters.JPG) */}
      <ServiceFromSanity {...service} />

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        {blogs?.length ? (
          <ul className="space-y-4">
            {blogs.map((p: Blog) => (
              <li key={p._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-gray-600">{p.excerpt}</p>}
                <Link
                  href={`/${ROUTE_SLUG}/blog/${p.slug}`}
                  className="text-blue-700 underline mt-2 inline-block"
                >
                  Read More
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-700">No blog posts yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs?.length ? (
          <ul className="space-y-4">
            {faqs.map((f: Faq) => (
              <li key={f._id} className="border rounded-xl p-4">
                <h3 className="text-lg font-semibold">{f.question}</h3>
                <Link
                  href={`/${ROUTE_SLUG}/faq#${f.slug}`}
                  className="text-blue-700 underline mt-2 inline-block"
                >
                  View Answer
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-700">No FAQs yet.</p>
        )}
      </section>
    </main>
  );
}
