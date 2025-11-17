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
const SITE_URL_RAW = process.env.NEXT_PUBLIC_SITE_URL;
// Normalize SITE_URL to a valid absolute URL; fall back to https with host when needed.
const SITE_URL = SITE_URL_RAW
  ? SITE_URL_RAW.startsWith("http")
    ? SITE_URL_RAW
    : `https://${SITE_URL_RAW}`
  : "https://roofproexteriors.com";
const metadataBaseSafe = (() => {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL("https://roofproexteriors.com");
  }
})();
const DEFAULT_BRAND = "RoofPro Exteriors";
const SAME_AS_RAW = (process.env.NEXT_PUBLIC_SAME_AS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const SAME_AS = SAME_AS_RAW.length > 0 ? SAME_AS_RAW : [SITE_URL];

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: metadataBaseSafe,
  title: "RoofPro Exteriors - Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
  description: "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "RoofPro Exteriors - Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
    description: "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
    url: SITE_URL,
    siteName: DEFAULT_BRAND,
    type: "website",
    images: [{ url: `${SITE_URL}/RoofPro-Exteriors New Logo.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoofPro Exteriors - Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
    description: "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
    images: [`${SITE_URL}/RoofPro-Exteriors New Logo.jpg`],
  },
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

  const brand = settings?.brandName || DEFAULT_BRAND;
  const phone = settings?.phone || "(804) 657-4546";
  const serviceArea = settings?.serviceArea || "Greater Richmond, VA";
  const phoneE164 = `+1-${phone.replace(/[^0-9]/g, "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: brand,
    "@id": `${SITE_URL}#organization`,
    url: SITE_URL,
    telephone: phoneE164,
    image: `${SITE_URL}/RoofPro-Exteriors New Logo.jpg`,
    areaServed: ["Richmond VA", "Henrico VA", "Chesterfield VA", "Central Virginia"],
    sameAs: SAME_AS,
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
            (c) {new Date().getFullYear()} {brand} - Serving {serviceArea}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}



