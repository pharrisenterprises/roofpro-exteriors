import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";
const title = "FAQ Library | RoofPro Exteriors";
const description = "Common roofing, siding, and gutter questions answered by RoofPro Exteriors for Richmond, VA homeowners.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/faq-library` },
  openGraph: { title, description, url: `${SITE_URL}/faq-library` },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">FAQ Library</h1>

      <section>
        <h2 className="text-xl font-semibold">Roofing FAQs</h2>
        <p className="text-neutral-700">Top questions homeowners ask.</p>
        <Link href="/roofing#faq" className="underline">
          See Roofing FAQs &rarr;
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Siding FAQs</h2>
        <p className="text-neutral-700">Materials, colors, and durability.</p>
        <Link href="/siding#faq" className="underline">
          See Siding FAQs &rarr;
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Gutter FAQs</h2>
        <p className="text-neutral-700">Leaks, guards, and flow issues.</p>
        <Link href="/gutters#faq" className="underline">
          See Gutter FAQs &rarr;
        </Link>
      </section>
    </main>
  );
}
