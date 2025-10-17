import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import NavLink from "@/components/NavLink";
import Link from "next/link";

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
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased font-sans">
        {/* HEADER */}
        <header className="w-full border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            {/* Logo / Brand */}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-roofpro.PNG" alt="RoofPro Exteriors" className="h-8 w-auto" />
              <span>RoofPro Exteriors</span>
            </Link>

            {/* Primary Nav */}
            <nav className="flex items-center gap-1">
              <NavLink href="/roofing">Roofing</NavLink>
              <NavLink href="/siding">Siding</NavLink>
              <NavLink href="/gutters">Gutters</NavLink>
              <NavLink href="/exterior-repairs">Exterior Repairs</NavLink>
              <NavLink href="/faq-library">FAQ Library</NavLink>
              {/* Jumps to the contact section on the homepage */}
              <NavLink href="/#contact" exact>
                Contact
              </NavLink>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
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
