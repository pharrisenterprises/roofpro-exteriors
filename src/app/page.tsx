"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex flex-col items-center bg-white text-slate-800 font-sans">
      {/* === HEADER === */}
      <header className="w-full bg-white py-2 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap">
          {/* Logo */}
          <div className="flex items-center -mt-2 scale-125 origin-left">
            <Image
              src="/RoofPro-Exteriors New Logo.jpg"
              alt="RoofPro Exteriors Logo"
              width={180}
              height={50}
              priority
              className="object-contain drop-shadow-sm w-[160px] md:w-[180px] lg:w-[200px] h-auto"
            />
          </div>

          {/* Nav */}
          <nav className="sc-topnav flex justify-end items-center flex-wrap gap-x-6 gap-y-2 text-base md:text-lg font-semibold tracking-wide">
            {["Home", "About", "Solutions", "Reviews", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-800 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* === HERO SECTION === */}
      <section className="relative w-full bg-white overflow-hidden">
        <div
          className="w-full h-[60vh] md:h-[68vh] bg-cover bg-center flex flex-col items-center justify-center relative"
          style={{ backgroundImage: "url('/hero.JPG')" }}
        >
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute bottom-10 flex flex-wrap justify-center gap-6 z-20">
            <button
              onClick={() =>
                window.open(
                  "https://api.leadconnectorhq.com/widget/bookings/roundappointments",
                  "_blank"
                )
              }
              className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all"
            >
              Book Consultation
            </button>
            <button
              onClick={() => (window.location.href = "tel:8046574546")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all"
            >
              Call Us: (804) 657-4546
            </button>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mt-6 px-6 mb-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-3"
          >
            Expert Roofing, Siding, Gutters & Exterior Repairs
          </motion.h1>
          <p className="text-slate-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Locally owned &amp; operated in Central Virginia — durable materials, clean installs, and dependable service.
          </p>
        </div>
      </section>

      {/* === ABOUT SECTION === */}
      <section id="about" className="w-full max-w-5xl text-center py-14 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Built Right. Guaranteed.
        </h2>
        <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto">
          Every <strong>RoofPro Exteriors</strong> project is measured, specified, and installed by pros using manufacturer-approved methods.
          We protect your home’s value with premium roofing systems, sealed siding, properly pitched gutters, and
          smart exterior repairs that withstand Virginia weather.
        </p>
      </section>

      {/* === SOLUTIONS SECTION === */}
      <section id="solutions" className="w-full py-16 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12">
          Exterior Services
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              title: "Roofing",
              desc: "Architectural shingles, metal roofing, and leak-free flashing — installed to spec.",
              image: "/hero-roofing.JPG",
              slug: "roofing",
            },
            {
              title: "Siding",
              desc: "Fiber cement, vinyl, and trim solutions with airtight detailing and clean lines.",
              image: "/hero-siding.JPG",
              slug: "siding",
            },
            {
              title: "Gutters",
              desc: "Seamless gutters, guards, and proper downspout placement to move water away fast.",
              image: "/hero-gutters.JPG",
              slug: "gutters",
            },
            {
              title: "Exterior Repairs",
              desc: "Storm damage, fascia/soffit, flashing, and carpentry fixes that last.",
              image: "/hero-repairs.JPG",
              slug: "exterior-repairs",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={`/${item.slug}`}
              prefetch
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded-lg"
            >
              <article className="flex flex-col items-center w-[230px] bg-white border border-slate-300 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="w-full h-[130px] overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={230}
                    height={130}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="bg-slate-50 border-t border-slate-200 w-full text-center">
                  <div className="m-3 p-4 bg-white border border-slate-200 rounded-md shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-snug px-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* === REVIEWS SECTION === */}
      <section id="reviews" className="w-full max-w-6xl py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
          Customer Reviews
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "James P.",
              text: "Roof looks amazing and no more leaks. Crew was fast and professional!",
            },
            {
              name: "Angela R.",
              text: "They fixed our siding and added gutters — house looks brand new.",
            },
            {
              name: "Tom H.",
              text: "On time, fair price, quality work. Highly recommend RoofPro Exteriors.",
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-slate-700 italic mb-3">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="font-semibold text-slate-800">
                ⭐️⭐️⭐️⭐️⭐️ — {review.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* === FAQ SECTION === */}
      <section id="faq" className="w-full max-w-5xl py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            {
              q: "Do you offer free inspections?",
              a: "Yes — we’ll evaluate your roof, siding, and gutters at no cost and provide a clear estimate.",
            },
            {
              q: "Which roofing materials do you install?",
              a: "Architectural shingles, metal panels, and flat-roof systems depending on your home and budget.",
            },
            {
              q: "Do you handle insurance claims?",
              a: "We can help document damage and coordinate with your insurer to streamline the process.",
            },
          ].map((faq) => (
            <details key={faq.q} className="bg-white rounded-md p-4 shadow-sm">
              <summary className="font-semibold text-slate-800 cursor-pointer text-center">
                {faq.q}
              </summary>
              <p className="text-slate-600 mt-2 text-center">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="w-full bg-slate-50 py-24 flex items-center justify-center">
        <div className="text-center space-y-5">
          <h3 className="text-xl md:text-2xl text-slate-600">
            — Protect your home with a free, no-pressure consultation —
          </h3>
          <button
            onClick={() =>
              window.open(
                "https://api.leadconnectorhq.com/widget/bookings/roundappointments",
                "_blank"
              )
            }
            className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
          >
            Book Your Free Consultation
          </button>
        </div>
      </section>

      {/* === CONTACT SECTION === */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        {/* your form or contact info here */}
      </section>

      {/* === FOOTER === */}
      <footer className="w-full bg-slate-900 text-slate-200 text-center py-10 mt-8 border-t border-slate-800">
        <div className="space-y-6">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => (window.location.href = "/terms")}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-semibold shadow-md transition-all"
            >
              Terms of Service
            </button>
            <button
              onClick={() => (window.location.href = "/privacy")}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-semibold shadow-md transition-all"
            >
              Privacy Policy
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} RoofPro Exteriors. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
