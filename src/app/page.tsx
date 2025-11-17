import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roofproexteriors.com";
const title = "RoofPro Exteriors - Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA";
const description = "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/`,
    siteName: "RoofPro Exteriors",
    type: "website",
    images: [{ url: `${SITE_URL}/RoofPro-Exteriors New Logo.jpg` }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/RoofPro-Exteriors New Logo.jpg`] },
};

export default function Page() {
  return <HomePage />;
}
