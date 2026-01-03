import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Server,
  Database,
  GitBranch,
  Network,
  ShieldCheck,
  Sparkles,
  Braces,
} from "lucide-react";

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
      "React",
      "Next.js",
      "AngularJS",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "Tailwind CSS",
      "PWA",
      "Storybook",
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    items: ["React Native (Android & iOS)"],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      "Node.js (Express, NestJS)",
      "Python (FastAPI)",
      "SQLAlchemy",
      "Alembic",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    title: "APIs & Architecture",
    icon: Network,
    items: ["REST APIs", "GraphQL", "Multi-tenant SaaS", "System Architecture"],
  },
  {
    title: "Testing & Automation",
    icon: ShieldCheck,
    items: ["Cypress", "Puppeteer"],
  },
  {
    title: "AI / Voice",
    icon: Sparkles,
    items: [
      "Voice Agents (Vapi)",
      "Speech-to-Text & TTS",
      "Deepgram",
      "ElevenLabs",
    ],
  },
  {
    title: "Dev & Tooling",
    icon: GitBranch,
    items: ["Lerna", "Monorepos", "Git", "CI/CD"],
  },
  {
    title: "Languages",
    icon: Braces,
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "C/C++",
      "HTML",
      "CSS",
      "Java",
      "C#",
    ],
  },
];
