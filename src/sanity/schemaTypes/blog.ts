import {defineField, defineType} from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "service", title: "Related Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "content", title: "Content", type: "array", of: [{ type: "block" }] }),
  ],
  orderings: [
    {
      title: "Publish date, newest",
      name: "publishDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
