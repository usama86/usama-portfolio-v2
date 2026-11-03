import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_ORIGIN}/` },
    { url: `${SITE_ORIGIN}/projects` },
    ...projects.map(({ slug }) => ({ url: `${SITE_ORIGIN}/projects/${slug}` })),
  ];
}
