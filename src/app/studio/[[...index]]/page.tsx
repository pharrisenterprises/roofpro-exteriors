"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // or "@/sanity.config" if your @ alias → src

export default function StudioPage() {
  return <NextStudio config={config} />;
}
