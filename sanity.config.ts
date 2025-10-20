import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes"; // adjust if you moved files

export default defineConfig({
  name: "default",
  title: "RoofPro Exteriors CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // uses NEXT_PUBLIC_*
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
