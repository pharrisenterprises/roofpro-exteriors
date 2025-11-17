import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";
const title = "Blog | RoofPro Exteriors";
const description = "Roofing, siding, gutters, and exterior repair guides from the RoofPro Exteriors team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title, description, url: `${SITE_URL}/blog` },
  twitter: { card: "summary_large_image", title, description },
};

const blogSections = [
  { name: "Roofing Blog", href: "/roofing/blog", summary: "Repairs, replacements, and maintenance tips." },
  { name: "Siding Blog", href: "/siding/blog", summary: "Materials, detailing, and curb appeal guidance." },
  { name: "Gutters Blog", href: "/gutters/blog", summary: "Flow, guards, and drainage best practices." },
  { name: "Exterior Repairs Blog", href: "/exterior-repairs/blog", summary: "Fascia, soffit, and exterior fix guides." },
];

export default function BlogHubPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 space-y-10">
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">Blog</h1>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Insights, how-tos, and maintenance tips for roofing, siding, gutters, and exterior repairs in Central Virginia.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {blogSections.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
            <p className="text-slate-700 mt-2">{item.summary}</p>
            <span className="mt-4 inline-block text-blue-800 font-semibold">Read posts →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
