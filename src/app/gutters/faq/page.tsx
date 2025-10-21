import type { Metadata } from "next";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Faq } from "@/types/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: "gutters" });

  const title = data?.seo?.title
    ? `${data.seo.title} – FAQs`
    : "Gutters FAQs | RoofPro Exteriors";
  const description =
    data?.seo?.description ?? "Common gutters questions answered by our Richmond, VA team.";
  const ogSrc = data?.seo?.ogImage ?? data?.heroImage;
  const images = ogSrc ? [{ url: urlFor(ogSrc).width(1200).height(630).url() }] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: "https://roofproexteriors.com/gutters/faq" },
  };
}

const QUERY = groq`*[_type=="faq" && service->slug.current==$serviceSlug]
|order(question asc){ _id, question, answer }`;

export default async function Page() {
  const faqs: Faq[] = await client.fetch(QUERY, { serviceSlug: "gutters" });

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Gutters FAQs</h1>
      <ul className="space-y-6">
        {faqs.map((f) => (
          <li key={f._id} className="border rounded-xl p-4">
            <h2 className="text-lg font-semibold">{f.question}</h2>
            <div className="mt-2 prose prose-neutral">
              <PortableText value={f.answer} />
            </div>
          </li>
        ))}
        {faqs.length === 0 && <p>No FAQs yet.</p>}
      </ul>
    </main>
  ); 
}
