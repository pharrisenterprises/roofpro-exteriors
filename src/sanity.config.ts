// /src/sanity.config.ts
import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./sanity/schemaTypes"; // <-- path now relative to /src

export default defineConfig({
  name: "default",
  title: "RoofPro Exteriors CMS",
  projectId: "jvwz09do",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
