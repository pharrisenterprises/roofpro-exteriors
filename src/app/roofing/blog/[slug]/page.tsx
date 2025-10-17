type Params = { params: { slug: string } };

export const generateStaticParams = () => ([
  { slug: 'roof-replacement-vs-repair' },
  { slug: 'roof-lifespan-in-virginia' },
]);

export const metadata = ({ params }: Params) => ({
  title: `${params.slug.replace(/-/g,' ')} | Roofing Blog`,
});

export default function Page({ params }: Params) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <p className="mt-3 text-neutral-700">This is a placeholder. Hook this to Sanity when ready.</p>
      <a href="/roofing" className="underline mt-6 inline-block">← Back to Roofing</a>
    </main>
  );
}
