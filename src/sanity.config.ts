// /src/sanity.config.ts
import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./sanity/schemaTypes"; // <-- path now relative to /src

export default defineConfig({
  name: "default",
  title: "RoofPro Exteriors CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
