import { projects } from "@/data/projects";
import type { Project, ProjectImage } from "@/components/projects/types";

export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  context: string;
  summary: string;
  technologies: string[];
  image: ProjectImage & { width: number; height: number };
  caption: string;
  secondaryImage?: ProjectImage & { width: number; height: number };
  secondaryCaption?: string;
  flagship?: boolean;
};

/** Editorial order, media, and presentation shared by home and the project index. */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "archwalk-immersive-experience-platform", title: "ArchWalk",
    category: "Immersive 3D & 360° Experience Platform", context: "Founder & Lead Engineer", flagship: true,
    summary: "Architected substantial systems across two surfaces: published 360° experiences with spatial navigation and an architectural review workspace with GLB model processing and browser-based 3D rendering. The Architects product is publicly Coming Soon.",
    technologies: ["Next.js", "TypeScript", "Three.js", "FastAPI", "PostgreSQL", "Cloudflare R2"],
    image: { width: 1440, height: 900, src: "/images/projects/archwalk/viewer-solitude.jpg", title: "Actual ArchWalk Viewer showing the Solitude reference interior, Step navigation, and view controls" },
    caption: "ArchWalk 360 · Actual Viewer UI · Solitude reference interior",
    secondaryImage: { width: 1190, height: 504, src: "/images/projects/archwalk/architects-3d-reference.png", title: "Actual ArchWalk 3D walkthrough runtime showing a CC0 Modern House GLB in Orbit review mode" },
    secondaryCaption: "Architects 3D · Actual runtime with CC0 reference GLB · Public product Coming Soon",
  },
  {
    slug: "talentflow-enterprise-recruiting-platform", title: "TalentFlow",
    category: "Enterprise AI / Product Simulation", context: "Turing · Co-Lead",
    summary: "Co-led development of a high-fidelity enterprise recruiting platform for AI training and evaluation, spanning interconnected hiring, CRM, reporting, and workflow systems.",
    technologies: ["React", "Next.js", "TypeScript", "AI Product Simulation"],
    image: { width: 2874, height: 1408, src: "/images/projects/turing-screenshot/Dashboard-1.png", title: "TalentFlow dashboard showing recruiting workflow goals, tasks, and approvals" },
    caption: "Actual dashboard · AI training environment",
  },
  {
    slug: "cleon-ai-voice-ordering", title: "Cleon",
    category: "Voice AI / Multi-tenant SaaS", context: "Full-Stack Product Engineering",
    summary: "Designed and developed a multi-tenant AI voice ordering platform with voice-agent integrations, restaurant configuration, and tenant-scoped backend services.",
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "Vapi"],
    image: { width: 1366, height: 584, src: "/images/projects/cleon/integrations-walkthrough.webp", title: "Cleon integrations screen with provider connection and management controls, captured from the real walkthrough" },
    caption: "Actual product walkthrough · Integrations · 00:17",
  },
];

export function isFeaturedProject(project: Project) {
  return featuredProjects.some(({ slug }) => slug === project.slug);
}

export function getFeaturedProjects(): Project[] {
  return featuredProjects.flatMap(({ slug }) => {
    const project = projects.find((entry) => entry.slug === slug);
    return project ? [project] : [];
  });
}
