// src/app/studio/[[...index]]/page.tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config"; // works only if the file is in /src/

export default function StudioPage() {
  return <NextStudio config={config} />;
}
