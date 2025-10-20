import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

const QUERY = groq`*[_type=="faq" && service->slug.current==$serviceSlug]
|order(question asc){
  _id, question, answer
}`;

export const metadata = {
  title: "Roofing FAQs | RoofPro Exteriors",
  description: "Common roofing questions answered by our Richmond, VA team.",
};

export default async function Page() {
  const faqs = await client.fetch(QUERY, { serviceSlug: "roofing" });

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Roofing FAQs</h1>
      <ul className="space-y-6">
        {faqs?.map((f: any) => (
          <li key={f._id} className="border rounded-xl p-4">
            <h2 className="text-lg font-semibold">{f.question}</h2>
            <div className="mt-2 prose prose-neutral">
              <PortableText value={f.answer} />
            </div>
          </li>
        ))}
        {(!faqs || faqs.length === 0) && <p>No FAQs yet.</p>}
      </ul>
    </main>
  );
}
