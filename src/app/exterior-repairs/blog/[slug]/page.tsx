import type { Metadata } from "next";
import Link from "next/link";

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const pretty = decodeURIComponent(params.slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${pretty} | Exterior Repairs Blog – RoofPro Exteriors`,
    description: `Article about ${pretty} from RoofPro Exteriors.`,
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const pretty = decodeURIComponent(params.slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/exterior-repairs" className="hover:underline">Exterior Repairs</Link>
        <span className="px-2">/</span>
        <Link href="/exterior-repairs/blog" className="hover:underline">Blog</Link>
        <span className="px-2">/</span>
        <span className="text-slate-700">{pretty}</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-4">{pretty}</h1>

      <p className="text-slate-600 mb-6">
        Placeholder content for <strong>{pretty}</strong>. Replace this with CMS data or MDX when ready.
      </p>

      <article className="prose prose-slate max-w-none">
        <p>
          Add the article body here. This route will render for any
          <code className="ml-1 font-mono">/exterior-repairs/blog/[slug]</code>.
        </p>
      </article>

      <div className="mt-10">
        <Link href="/exterior-repairs/blog" className="text-blue-700 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
