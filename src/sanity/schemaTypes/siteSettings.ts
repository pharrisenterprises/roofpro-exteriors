import {defineField, defineType} from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string" }),
    defineField({ name: "email", title: "Sales Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "serviceArea", title: "Service Area", type: "string" }),
    defineField({ name: "about", title: "About (short)", type: "text" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
  ],
});
