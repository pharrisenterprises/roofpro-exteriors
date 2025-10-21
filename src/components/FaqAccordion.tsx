// src/components/FaqAccordion.tsx
'use client';
import { useState } from 'react';

// Local type (compatible with Sanity results: { _id, question, answer })
export type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  /** which panel is open initially; set to null for all closed */
  initialOpen?: number | null;
};

export default function FaqAccordion({ items, initialOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(initialOpen);

  const toggle = (i: number) => setOpen((curr) => (curr === i ? null : i));

  if (!items?.length) {
    return (
      <div className="rounded-lg border p-4 text-sm text-neutral-600">
        FAQs coming soon.
      </div>
    );
  }

  return (
    <div className="divide-y rounded-xl border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item._id ?? i} className="p-4">
            <button
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-base font-medium">{item.question}</span>
              <span className="select-none text-xl">{isOpen ? '−' : '+'}</span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                isOpen ? 'max-h-96 mt-2' : 'max-h-0'
              }`}
            >
              <p className="text-neutral-700">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
