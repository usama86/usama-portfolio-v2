import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { WorkExperienceSection } from "@/components/sections/experience/work-experience-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import { CertificatesSection } from "@/components/sections/certificates/certificates-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Muhammad Usama — Senior Software Engineer",
    description: "Senior Software Engineer with 7+ years of experience. React, Next.js, TypeScript, and full-stack product engineering, from architecture to production.",
    url: SITE_ORIGIN,
    type: "website",
    siteName: "Muhammad Usama — Portfolio",
  },
};

export default function Page() {
  return (
    <div className="homepage">
      <HeroSection />

      <div className="scroll-mt-24">
        <ProjectsSection />
      </div>

      <WorkExperienceSection />
      <SkillsSection />
      <CertificatesSection />
      <ContactSection />
    </div>
  );
}
