"use client";
import { NextStudio } from "next-sanity/studio";
// go up 4 levels from src/app/studio/[[...index]]/page.tsx to the project root
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
