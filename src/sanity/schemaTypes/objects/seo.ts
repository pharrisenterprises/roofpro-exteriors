import {defineField, defineType} from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Max ~60–65 characters",
      validation: (r) => r.max(65),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Max ~155–160 characters",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Used for sharing (1200×630 recommended)",
    }),
  ],
});
