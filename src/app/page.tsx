import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { WorkExperienceSection } from "@/components/sections/experience/work-experience-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import { CertificatesSection } from "@/components/sections/certificates/certificates-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

export default function Page() {
  return (
    <div className="space-y-20 md:space-y-28">
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
