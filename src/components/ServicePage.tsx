import Link from 'next/link';
import FaqAccordion, { type FaqItem } from './FaqAccordion';

// Local types replacing the old '@/content/services' dependency
type ServiceHero = {
  headline: string;
  sub: string;
  image?: string | null;
};

type ServiceSections = {
  intro: { heading: string; body: string };
  benefits: { heading: string; bullets: string[] };
  process: { heading: string; steps: { title: string; desc: string }[] };
  cta: { heading: string; body: string; buttonText: string };
};

export type ServiceConfig = {
  slug: string;
  hero: ServiceHero;
  sections: ServiceSections;
  faqs: FaqItem[];
  samplePosts: { slug: string; title: string }[];
};

export default function ServicePage({ service }: { service: ServiceConfig }) {
  const { hero, sections, faqs, slug, samplePosts } = service;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
      {/* HERO */}
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold">{hero.headline}</h1>
          <p className="mt-3 text-neutral-700">{hero.sub}</p>
          <div className="mt-6">
            <a href="#cta" className="inline-block rounded-xl px-5 py-3 bg-black text-white">
              Get Started
            </a>
          </div>
        </div>
        {hero.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.image} alt="" className="rounded-2xl w-full h-auto" />
        ) : null}
      </section>

      {/* SECTION 1: INTRO */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{sections.intro.heading}</h2>
        <p className="text-neutral-700">{sections.intro.body}</p>
      </section>

      {/* SECTION 2: BENEFITS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{sections.benefits.heading}</h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {sections.benefits.bullets.map((b, i) => (
            <li key={i} className="p-4 rounded-xl border">{b}</li>
          ))}
        </ul>
      </section>

      {/* SECTION 3: PROCESS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{sections.process.heading}</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {sections.process.steps.map((s, i) => (
            <li key={i} className="p-4 rounded-xl border">
              <div className="text-sm text-neutral-500 mb-1">Step {i + 1}</div>
              <div className="font-medium">{s.title}</div>
              <div className="text-neutral-700">{s.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* SECTION 4: FAQ (on-page accordion) */}
      <section id="faq" className="space-y-4">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <FaqAccordion items={faqs} />
        {/* Per-service blog teasers */}
        {samplePosts.length > 0 && (
          <div className="pt-6">
            <h3 className="font-semibold mb-2">From the blog</h3>
            <ul className="list-disc ml-5">
              {samplePosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${slug}/blog`} className="underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* CTA */}
      <section id="cta" className="space-y-3">
        <h2 className="text-2xl font-semibold">{sections.cta.heading}</h2>
        <p className="text-neutral-700">{sections.cta.body}</p>
        <Link href="/#contact" className="inline-block rounded-xl px-5 py-3 bg-black text-white">
          {sections.cta.buttonText}
        </Link>
      </section>
    </main>
  );
}

// Deprecated helper kept only to avoid breaking old imports during refactor.
// Remove after confirming no files call this.
export function getService(): never {
  throw new Error("Deprecated: getService() was removed. Fetch service content from Sanity instead.");
}
