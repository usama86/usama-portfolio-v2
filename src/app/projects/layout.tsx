import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Muhammad Usama",
  description: "Selected software engineering work across enterprise platforms, SaaS products, 3D experiences, integrations, and performance-focused web applications.",
  alternates: { canonical: `${SITE_ORIGIN}/projects` },
  openGraph: { title: "Projects | Muhammad Usama", description: "Selected software engineering work across enterprise platforms, SaaS products, 3D experiences, integrations, and performance-focused web applications.", url: `${SITE_ORIGIN}/projects`, type: "website", siteName: "Muhammad Usama — Portfolio", images: [{ url: `${SITE_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: "Muhammad Usama — Senior Software Engineer" }] },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
