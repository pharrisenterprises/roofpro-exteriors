// src/components/ServiceFromSanity.tsx
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

type Section = { heading?: string; body?: any[] };

export default function ServiceFromSanity({
  title, heroImage, intro, sections,
}: {
  title: string;
  heroImage?: any;
  intro?: string;
  sections?: Section[];
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          {intro && <p className="mt-3 text-neutral-700">{intro}</p>}
          <div className="mt-6">
            <a href="#cta" className="inline-block rounded-xl px-5 py-3 bg-black text-white">Book Consultation</a>
          </div>
        </div>
        {heroImage && (
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border">
            <Image
              src={urlFor(heroImage).width(1200).height(900).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </section>

      {sections?.map((s, i) => (
        <section key={i} className="space-y-3">
          {s.heading && <h2 className="text-2xl font-semibold">{s.heading}</h2>}
          {s.body && (
            <div className="prose prose-neutral max-w-none">
              <PortableText value={s.body} />
            </div>
          )}
        </section>
      ))}

      <section id="cta" className="rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">Ready for a free inspection?</h2>
        <p className="text-neutral-700 mt-1">Get a same-week slot.</p>
        <a href="mailto:sales@roofproexteriors.com" className="mt-4 inline-block underline">Email us</a>
      </section>
    </main>
  );
}
