'use client';
import { useState } from 'react';
import type { FaqItem } from '@/content/services';

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((f, i) => (
        <div key={i} className="border rounded-xl">
          <button
            className="w-full text-left p-4 font-medium"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {f.q}
          </button>
          {open === i && (
            <div className="p-4 pt-0 text-sm text-neutral-700">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
