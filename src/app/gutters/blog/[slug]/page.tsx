type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params) {
  const title = params.slug.replace(/-/g, ' ');
  return { title: `${title} | Gutter Blog` };
}

export default function Page({ params }: Params) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <p className="mt-3 text-neutral-700">Placeholder article for Gutters. Hook to CMS when ready.</p>
      <a href="/gutters" className="underline mt-6 inline-block">← Back to Gutters</a>
    </main>
  );
}
