import {defineType, defineField} from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, group: "content" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({ name: "intro", type: "string", group: "content" }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "heading", type: "string" },
        { name: "body", type: "array", of: [{ type: "block" }] },
      ]}],
      group: "content",
    }),

    // 👇 add this line to attach the SEO object
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
});
