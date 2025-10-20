import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

// Pull IDs from env (set these in Vercel → Project → Settings → Environment Variables)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. "G-XXXXXXX"
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; // e.g. "abcdefg..."

export const metadata: Metadata = {
  title: "RoofPro Exteriors – Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
  description:
    "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
  icons: { icon: "/favicon.ico" },

  // Step 6: Google Search Console verification meta
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Step 2: JSON-LD structured data (RoofingContractor)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "RoofPro Exteriors",
    url: "https://www.roofproexteriors.com",
    telephone: "+1-804-657-4546",
    image: "https://www.roofproexteriors.com/logo-roofpro.PNG",
    areaServed: ["Richmond VA", "Henrico VA", "Chesterfield VA", "Central Virginia"],
    sameAs: [
      // Add your profiles if you have them:
      // "https://www.facebook.com/yourpage",
      // "https://www.instagram.com/yourhandle",
      // "https://www.linkedin.com/company/yourcompany",
      // "https://g.page/your-google-business-profile"
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "VA",
      addressLocality: "Richmond",
      addressCountry: "US",
    },
    // Optional: openingHoursSpecification if you want hours in search
    // openingHoursSpecification: [
    //   { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" }
    // ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Step 2: JSON-LD (Structured Data) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Step 6: Google Analytics (GA4) – only inject if ID is present */}
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

        {/* PAGE CONTENT (no global header) */}
        <main className="flex-1 w-full">{children}</main>

        {/* FOOTER */}
        <footer className="w-full border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
            © {new Date().getFullYear()} RoofPro Exteriors · All rights reserved
          </div>
        </footer>
      </body>
    </html>
  );
}
