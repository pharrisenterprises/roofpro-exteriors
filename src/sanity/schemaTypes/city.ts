import {defineField, defineType} from "sanity";

export default defineType({
  name: "city",
  title: "City",
  type: "document",
  fields: [
    defineField({ name: "name", title: "City Name", type: "string" }),
    defineField({ name: "state", title: "State (abbr)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } }),
  ],
});
