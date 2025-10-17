import Link from 'next/link';
const posts = [
  { slug: 'roof-replacement-vs-repair', title: 'Roof Replacement vs Repair' },
  { slug: 'roof-lifespan-in-virginia', title: 'Roof Lifespan in Virginia' },
];
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Roofing Blog</h1>
      <ul className="list-disc ml-5 space-y-2">
        {posts.map(p => (
          <li key={p.slug}>
            <Link href={`/roofing/blog/${p.slug}`} className="underline">{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
