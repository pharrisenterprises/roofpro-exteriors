// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";

// ✅ Sanity (safe, self-contained)
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

// Pull IDs from env (set these in Vercel → Project → Settings → Environment Variables)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. "G-XXXXXXX"
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; // e.g. "abcdefg..."

export const revalidate = 60;

export const metadata: Metadata = {
  title: "RoofPro Exteriors – Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
  description:
    "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
  icons: { icon: "/favicon.ico" },
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
};

// GROQ for site settings (kept inline so you don't rely on another file)
const SITE_SETTINGS_QUERY = groq`*[_type=="siteSettings"][0]{
  brandName, email, phone, serviceArea, logo
}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch Sanity settings with safe fallbacks so build never fails
  let settings: { brandName?: string; email?: string; phone?: string; serviceArea?: string } | null = null;
  try {
    settings = await client.fetch(SITE_SETTINGS_QUERY);
  } catch {
    // ignore — fall back below
  }

  const brand = settings?.brandName || "RoofPro Exteriors";
  const email = settings?.email || "sales@roofproexteriors.com";
  const phone = settings?.phone || "(804) 877-8616";
  const serviceArea = settings?.serviceArea || "Greater Richmond, VA";

  // Structured data (uses Sanity values when available)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: brand,
    url: "https://www.roofproexteriors.com",
    telephone: `+1-${phone.replace(/[^0-9]/g, "")}`,
    image: "https://www.roofproexteriors.com/logo-roofpro.PNG",
    areaServed: ["Richmond VA", "Henrico VA", "Chesterfield VA", "Central Virginia"],
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressRegion: "VA",
      addressLocality: "Richmond",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* JSON-LD (Structured Data) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics (GA4) – only inject if ID is present */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {/* Simple global header powered by Sanity settings */}
        <header className="w-full border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-sm">
            <div className="font-semibold">{brand}</div>
            <div className="flex items-center gap-4">
              <a href={`tel:${phone.replace(/[^+\\d]/g, "")}`} className="underline">{phone}</a>
              <a href={`mailto:${email}`} className="underline">{email}</a>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 w-full">{children}</main>

        {/* FOOTER */}
        <footer className="w-full border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
            © {new Date().getFullYear()} {brand} · Serving {serviceArea}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
