import {defineField, defineType} from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({ name: "cities", title: "Cities Served", type: "array", of: [{ type: "reference", to: [{ type: "city" }] }] }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
        ],
      }],
    }),
  ],
});
