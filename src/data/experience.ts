export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Zones",
    role: "Senior Software Engineer / Frontend Engineer",
    location: "Remote",
    period: "2023 — Present",
    bullets: [
      "Built complex internal platforms with modern UI patterns, scalable component architecture, and clean UX.",
      "Worked with GraphQL/REST integrations and performance-focused rendering strategies.",
      "Owned features end-to-end: design → implementation → QA → iteration.",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack / Frontend Engineer",
    location: "Pakistan",
    period: "2019 — Present",
    bullets: [
      "Delivered production apps for multiple clients: dashboards, marketplaces, admin panels, mobile apps.",
      "Handled deployments, CI/CD workflows, and performance improvements where needed.",
    ],
  },
];
