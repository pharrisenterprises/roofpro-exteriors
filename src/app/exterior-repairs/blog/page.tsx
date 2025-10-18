import Link from "next/link";
import { SERVICES } from "@/content/services";

export const metadata = { title: "Exterior Repairs Blog | Roof Pro Exteriors" };

export default function Page() {
  const posts = SERVICES['exterior-repairs'].samplePosts;
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Exterior Repairs Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-3 text-neutral-700">Articles are coming soon.</p>
      ) : (
        <ul className="mt-6 list-disc ml-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/exterior-repairs/blog/${p.slug}`} className="underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
