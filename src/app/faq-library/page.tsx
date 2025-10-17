import Link from 'next/link';

export const metadata = { title: 'FAQ Library | Roof Pro Exteriors' };

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">FAQ Library</h1>

      <section>
        <h2 className="text-xl font-semibold">Roofing FAQs</h2>
        <p className="text-neutral-700">Top questions homeowners ask.</p>
        <Link href="/roofing#faq" className="underline">See Roofing FAQs →</Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Siding FAQs</h2>
        <p className="text-neutral-700">Materials, colors, and durability.</p>
        <Link href="/siding#faq" className="underline">See Siding FAQs →</Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Gutter FAQs</h2>
        <p className="text-neutral-700">Leaks, guards, and flow issues.</p>
        <Link href="/gutters#faq" className="underline">See Gutter FAQs →</Link>
      </section>
    </main>
  );
}
