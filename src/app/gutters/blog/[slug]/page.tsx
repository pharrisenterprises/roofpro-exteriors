import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return { title: `${title} | Gutter Blog` };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{title}</h1>
      <p className="mt-3 text-neutral-700">
        Placeholder article for Gutters. Hook to CMS when ready.
      </p>
      <a href="/gutters" className="underline mt-6 inline-block">
        ← Back to Gutters
      </a>
    </main>
  );
}
