export type FaqItem = { q: string; a: string };
export type ServiceConfig = {
  slug: 'roofing' | 'siding' | 'gutters' | 'exterior-repairs';
  title: string;
  hero: { headline: string; sub: string; image?: string };
  sections: {
    intro: { heading: string; body: string };
    benefits: { heading: string; bullets: string[] };
    process: { heading: string; steps: { title: string; desc: string }[] };
    cta: { heading: string; body: string; buttonText: string };
  };
  faqs: FaqItem[];
  samplePosts: { slug: string; title: string }[]; // for the per-service blog stubs
};

export const SERVICES: Record<ServiceConfig['slug'], ServiceConfig> = {
  roofing: {
    slug: 'roofing',
    title: 'Roofing',
    hero: { headline: 'Roofing done right.', sub: 'Repair, replacement, and inspections by pros.' },
    sections: {
      intro: {
        heading: 'Roofing in Your Area',
        body: 'We handle leaks, missing shingles, storm damage, and full replacements.'
      },
      benefits: {
        heading: 'Why homeowners choose us',
        bullets: ['Licensed & insured', 'Insurance claim help', 'Premium materials', 'Clean job sites']
      },
      process: {
        heading: 'Our 4-step process',
        steps: [
          { title: 'Inspection', desc: 'We document issues with photos and a written estimate.' },
          { title: 'Proposal', desc: 'Clear scope, materials, timeline, and warranty.' },
          { title: 'Build Day', desc: 'Crew arrives on time; we protect landscaping and clean up.' },
          { title: 'Final QA', desc: 'Walkthrough + warranty paperwork.' }
        ]
      },
      cta: { heading: 'Ready for a free inspection?', body: 'Get a same-week slot.', buttonText: 'Book Consultation' }
    },
    faqs: [
      { q: 'My roof is leaking—how do I fix it?', a: 'Schedule an inspection. Small leaks can often be repaired the same day.' },
      { q: 'Repair vs. replacement—how do I decide?', a: 'If damage is localized and roof age < 10 years, repair may be best. Otherwise replacement may be more cost-effective.' },
    ],
    samplePosts: [
      { slug: 'roof-replacement-vs-repair', title: 'Roof Replacement vs Repair' },
      { slug: 'roof-lifespan-in-virginia', title: 'Roof Lifespan in Virginia' },
    ],
  },

  siding: {
    slug: 'siding',
    title: 'Siding',
    hero: { headline: 'Beautiful, durable siding.', sub: 'Boost curb appeal and energy efficiency.' },
    sections: {
      intro: { heading: 'Siding Services', body: 'Vinyl, fiber cement, and repair—installed to manufacturer spec.' },
      benefits: { heading: 'Benefits', bullets: ['Weather resistant', 'Colorfast options', 'Low maintenance'] },
      process: {
        heading: 'How it works',
        steps: [
          { title: 'Consult', desc: 'Style options and measurement.' },
          { title: 'Proposal', desc: 'Transparent pricing + timeline.' },
          { title: 'Install', desc: 'Pro crew, proper flashing and details.' },
          { title: 'Final Check', desc: 'Punchlist + warranty.' },
        ]
      },
      cta: { heading: 'Considering new siding?', body: 'Let’s compare materials for your budget.', buttonText: 'Get a Quote' }
    },
    faqs: [
      { q: 'What siding lasts the longest?', a: 'Fiber cement and premium vinyl have excellent lifespans with proper install.' },
      { q: 'Can you match my existing siding color?', a: 'Often yes—bring a sample or we’ll match on site.' },
    ],
    samplePosts: [
      { slug: 'siding-materials-guide', title: 'Siding Materials Guide' },
      { slug: 'siding-color-trends-2025', title: 'Siding Color Trends 2025' },
    ],
  },

  gutters: {
    slug: 'gutters',
    title: 'Gutters',
    hero: { headline: 'Seamless gutters that flow.', sub: 'Custom on-site fabrication and guards.' },
    sections: {
      intro: { heading: 'Gutter Services', body: 'Seamless aluminum, downspouts, repairs, and guards.' },
      benefits: { heading: 'Why upgrade', bullets: ['Prevent foundation washout', 'Protect fascia', 'Reduce clogs with guards'] },
      process: {
        heading: 'Install flow',
        steps: [
          { title: 'Measure & Pitch', desc: 'Correct slopes to channel water.' },
          { title: 'Custom Form', desc: 'Seamless runs made on site.' },
          { title: 'Hang & Seal', desc: 'Hidden hangers, tight corners.' },
          { title: 'Test & Clean', desc: 'Water test + site cleanup.' },
        ]
      },
      cta: { heading: 'Overflow or sagging?', body: 'We can fix or replace fast.', buttonText: 'Fix My Gutters' }
    },
    faqs: [
      { q: 'When should I replace gutters?', a: 'If they’re pulling away, leaking at seams, or repeatedly clogging.' },
      { q: 'Do gutter guards work?', a: 'Quality guards reduce debris, but annual checkups are still smart.' },
    ],
    samplePosts: [
      { slug: 'when-to-replace-gutters', title: 'When to Replace Gutters' },
    ],
  },

  'exterior-repairs': {
    slug: 'exterior-repairs',
    title: 'Exterior Repairs',
    hero: { headline: 'Exterior repairs—fast & professional.', sub: 'Soffit, fascia, trim, flashing, and more.' },
    sections: {
      intro: { heading: 'Repair Services', body: 'From storm damage to wear and tear, we restore curb appeal and performance.' },
      benefits: { heading: 'What you get', bullets: ['Quick turnaround', 'Long-lasting fixes', 'Transparent pricing'] },
      process: {
        heading: 'Repair steps',
        steps: [
          { title: 'Assess', desc: 'Identify root cause, not just symptoms.' },
          { title: 'Plan', desc: 'Materials, scope, and estimate.' },
          { title: 'Repair', desc: 'Detail-oriented workmanship.' },
          { title: 'Verify', desc: 'Photo proof + care tips.' },
        ]
      },
      cta: { heading: 'Need a small fix?', body: 'We handle minor repairs without the runaround.', buttonText: 'Request Repair' }
    },
    faqs: [
      { q: 'Can you fix wood rot?', a: 'Yes—replace damaged sections and seal to prevent recurrence.' },
      { q: 'Do you handle insurance repairs?', a: 'We provide documentation and can coordinate with your adjuster.' },
    ],
    samplePosts: [],
  },
};
