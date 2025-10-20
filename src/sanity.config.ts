import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

// TEMP: fallbacks so Studio won't crash if envs are missing in prod
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID /* || "YOUR_PROJECT_ID" */; // you can put your ID here as a last resort
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  // Surface a clear error in dev consoles rather than a blank page
  // (won't block build but helps diagnose)
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export default defineConfig({
  name: "default",
  title: "RoofPro Exteriors CMS",
  projectId: projectId!,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
