// src/app/roofing/page.tsx  (repeat the same pattern for siding/gutters/exterior-repairs)
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import ServiceFromSanity from "@/components/ServiceFromSanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Roofing | RoofPro Exteriors",
  description: "Roof repair, replacement, and inspections in Greater Richmond, VA.",
};

export default async function Page() {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: "siding" });
  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Roofing</h1>
        <p className="mt-2 text-neutral-700">Content coming soon.</p>
      </main>
    );
  }
  return <ServiceFromSanity {...data} />;
}
