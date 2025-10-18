import FaqAccordion from "@/components/FaqAccordion";
import { getService } from "@/components/ServicePage";

export const metadata = { title: "Siding – FAQs | Roof Pro Exteriors" };

export default function Page() {
  const { faqs } = getService('siding');
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Siding – FAQs</h1>
      <p className="mt-3 text-neutral-700">Answers to common siding questions.</p>
      <div className="mt-6">
        <FaqAccordion items={faqs} />
      </div>
    </main>
  );
}
