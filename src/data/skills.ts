import type { LucideIcon } from "lucide-react";
import { Code2, Server, Database, Wrench, Sparkles } from "lucide-react";

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Accessibility",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      "FastAPI",
      "Node.js",
      "REST APIs",
      "Multi-tenant patterns",
      "Auth/Scopes",
    ],
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "Migrations", "Query optimization", "Caching basics"],
  },
  {
    title: "Dev / Tooling",
    icon: Wrench,
    items: [
      "CI/CD",
      "Vercel",
      "Docker basics",
      "Testing mindset",
      "Monitoring basics",
    ],
  },
  {
    title: "AI / Integrations",
    icon: Sparkles,
    items: [
      "Voice AI pipelines",
      "3rd-party integrations",
      "Webhooks",
      "STT/TTS concepts",
    ],
  },
];
