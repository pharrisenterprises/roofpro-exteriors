import type { Metadata } from "next";

export function generateMetadata(
  { params }: { params: { slug: string } }
): Metadata {
  const title = params.slug.replace(/-/g, " ");
  return { title: `${title} | Exterior Repairs Blog` };
}

export default function Page(
  { params }: { params: { slug: string } }
) {
  const title = params.slug.replace(/-/g, " ");
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{title}</h1>
      <p className="mt-3 text-neutral-700">
        Placeholder article for Exterior Repairs. Connect this route to CMS content when ready.
      </p>
      <a href="/exterior-repairs" className="underline mt-6 inline-block">
        ← Back to Exterior Repairs
      </a>
    </main>
  );
}
