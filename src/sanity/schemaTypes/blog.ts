import {defineType, defineField} from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, group: "content" }),
    defineField({ name: "excerpt", type: "text", group: "content" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({ name: "publishedAt", type: "datetime", group: "content" }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
      group: "content",
    }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }], group: "content" }),

    // 👇 attach SEO object
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
});
