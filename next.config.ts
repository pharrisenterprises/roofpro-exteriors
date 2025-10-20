import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};



export default {
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
};
