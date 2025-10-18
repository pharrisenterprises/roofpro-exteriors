import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "RoofPro Exteriors – Roofing, Siding, Gutters & Exterior Repairs | Richmond, VA",
  description:
    "Roofing, siding, gutters, and exterior repair specialists serving Greater Richmond / Central Virginia.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
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
