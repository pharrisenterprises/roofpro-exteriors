import FaqAccordion from "@/components/FaqAccordion";
import { getService } from "@/components/ServicePage";

export const metadata = { title: "Gutters – FAQs | Roof Pro Exteriors" };

export default function Page() {
  const { faqs } = getService('gutters');
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Gutters – FAQs</h1>
      <p className="mt-3 text-neutral-700">Answers to common gutter questions.</p>
      <div className="mt-6">
        <FaqAccordion items={faqs} />
      </div>
    </main>
  );
}
