import type { Metadata } from "next";

// This signature accepts either a Promise-like `params` or a plain object.
// Using `await` makes it compatible with both.
export async function generateMetadata(
  { params }: { params: unknown }
): Promise<Metadata> {
  const p = (await (params as any)) ?? {};
  const slug: string = String(p.slug ?? "").trim();
  const title = slug ? slug.replace(/-/g, " ") : "Article";
  return { title: `${title} | RoofPro Exteriors Blog` };
}

export default async function Page(
  { params }: { params: unknown }
) {
  const p = (await (params as any)) ?? {};
  const slug: string = String(p.slug ?? "").trim();
  const title = slug ? slug.replace(/-/g, " ") : "Article";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{title}</h1>
      <p className="mt-3 text-neutral-700">
        Placeholder article. Connect this route to your CMS when ready.
      </p>
      <a href="/" className="underline mt-6 inline-block">← Back to Home</a>
    </main>
  );
}
