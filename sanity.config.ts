import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes"; // <- note the path

export default defineConfig({
  name: "default",
  title: "RoofPro Exteriors CMS",
  projectId: "jvwz09do",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
