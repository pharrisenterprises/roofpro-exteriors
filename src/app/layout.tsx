// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "RoofPro Exteriors – Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
  description: "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
  icons: { icon: "/favicon.ico" },
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
};

// Inline GROQ for site settings
const SITE_SETTINGS_QUERY = groq`*[_type=="siteSettings"][0]{ brandName, email, phone, serviceArea, logo }`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: { brandName?: string; email?: string; phone?: string; serviceArea?: string } | null = null;
  try {
    settings = await client.fetch(SITE_SETTINGS_QUERY);
  } catch {
    /* noop: fallbacks below */
  }

  const brand = settings?.brandName || "RoofPro Exteriors";
  const phone = settings?.phone || "(804) 877-8616";
  const serviceArea = settings?.serviceArea || "Greater Richmond, VA";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: brand,
    url: "https://www.roofproexteriors.com",
    telephone: `+1-${phone.replace(/[^0-9]/g, "")}`,
    image: "https://www.roofproexteriors.com/logo-roofpro.PNG",
    areaServed: ["Richmond VA", "Henrico VA", "Chesterfield VA", "Central Virginia"],
    sameAs: [],
    address: { "@type": "PostalAddress", addressRegion: "VA", addressLocality: "Richmond", addressCountry: "US" },
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Structured Data */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* GA4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
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

        {/* No top header here – your main navbar component on pages remains the only one */}
        <main className="flex-1 w-full">{children}</main>

        <footer className="w-full border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
            © {new Date().getFullYear()} {brand} · Serving {serviceArea}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
