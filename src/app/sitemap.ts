import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    "",
    "/acx-audition-tracker",
    "/voice-actor-crm",
    "/royalty-share-calculator",
    "/blog/acx-royalty-share-vs-flat-fee",
    "/signin",
    "/app",
    "/app/pipeline",
    "/app/account",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
