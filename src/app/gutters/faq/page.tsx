import type { Metadata } from "next";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { Faq } from "@/types/cms";
import type { PortableTextBlock } from "sanity";

export const revalidate = 60;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";

const toPlainText = (blocks: PortableTextBlock[] = []) =>
  blocks
    .map((block) =>
      Array.isArray((block as any).children)
        ? (block as any).children.map((child: any) => child.text ?? "").join("")
        : ""
    )
    .join("\n")
    .trim();

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: "gutters" });

  const title = data?.seo?.title ? `${data.seo.title} - FAQs` : "Gutters FAQs | RoofPro Exteriors";
  const description =
    data?.seo?.description ?? "Common gutters questions answered by our Richmond, VA team.";
  const ogSrc = data?.seo?.ogImage ?? data?.heroImage;
  const images = ogSrc ? [{ url: urlFor(ogSrc).width(1200).height(630).url() }] : undefined;
  const canonical = `${SITE_URL}/gutters/faq`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

const QUERY = groq`*[_type=="faq" && service->slug.current==$serviceSlug]
|order(question asc){ _id, question, answer }`;

export default async function Page() {
  const faqs: Faq[] = await client.fetch(
    groq`*[_type=="faq"
        && defined(service->slug.current)
        && lower(service->slug.current) == lower($serviceSlug)]
      | order(question asc){
        _id, question, answer
      }`,
    { serviceSlug: "Gutters" }
  );

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: toPlainText(f.answer as PortableTextBlock[]),
            },
          })),
        }
      : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </main>
  );
}
