import FaqAccordion from "@/components/FaqAccordion";
import { getService } from "@/components/ServicePage";

export const metadata = { title: "Exterior Repairs FAQs | Roof Pro Exteriors" };

export default function Page() {
  const { faqs } = getService('exterior-repairs');
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Exterior Repairs – FAQs</h1>
      <p className="mt-3 text-neutral-700">Common questions homeowners ask (written in natural language).</p>
      <div className="mt-6">
        <FaqAccordion items={faqs} />
      </div>
    </main>
  );
}
