import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";

export default function Page() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <div id="projects">
        <ProjectsSection />
      </div>
    </div>
  );
}
