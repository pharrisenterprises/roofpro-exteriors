import ServicePage, { getService } from '@/components/ServicePage';
export const metadata = { title: 'Siding | Roof Pro Exteriors' };
export default function Page() { return <ServicePage service={getService('siding')} />; }

import type { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SERVICE_SEO_QUERY = groq`*[_type=="service" && slug.current==$slug][0]{
  title,
  seo { title, description, ogImage }
}`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SERVICE_SEO_QUERY, { slug: "siding" }); // change per page

  const title =
    data?.seo?.title ??
    `${data?.title ?? "Roofing"} | RoofPro Exteriors`;
  const description =
    data?.seo?.description ?? "Professional roofing services in Greater Richmond, VA.";

  const images = data?.seo?.ogImage
    ? [{ url: urlFor(data.seo.ogImage).width(1200).height(630).url() }]
    : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image" },
  };
}
