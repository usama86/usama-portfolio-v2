import type { Project } from "@/components/projects/types";

export const projects: Project[] = [
  /* =========================
     FEATURED PROJECTS
  ========================== */

  {
    slug: "cleon-ai-voice-ordering",
    title: "Cleon – AI Voice Ordering Platform",
    company: "Personal / SaaS Product",
    timePeriod: "2025 – Present",
    descriptionDetail: [
      "Designed and developed a multi-tenant AI voice ordering SaaS enabling restaurants to accept phone orders via conversational voice agents.",
      "Built a FastAPI backend with strict tenant isolation, restaurant ↔ voice-agent mapping, and scoped request validation.",
      "Implemented real-time AI voice agents using Vapi, Deepgram (STT), and ElevenLabs (TTS).",
      "Developed menu ingestion, cart management, and checkout workflows optimized for voice-driven conversations.",
      "Integrated OrderOut APIs for menu sync, merchant configuration, and order creation.",
      "Created a Next.js admin dashboard to manage restaurants, voice agents, and third-party integrations.",
      "Architected the system to be provider-agnostic, allowing future replacement of voice vendors without breaking core logic.",
    ],
    technologies: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "TypeScript",
      "Voice AI",
      "Vapi",
      "Deepgram",
      "ElevenLabs",
      "OrderOut",
      "Multi-tenant SaaS",
    ],
    images: ["/images/projects/CleonLogo.png"],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/3aa0db1fee7c4f41af572b317b33660c",
    },
  },

  {
    slug: "query-builder",
    title: "Visual Query Builder",
    company: "Zones",
    timePeriod: "2023 – 2024",
    descriptionDetail: [
      "Built a drag-and-drop query builder enabling non-technical business analysts to construct complex queries visually.",
      "Provided dual modes: design mode for ease-of-use and expert mode for manual query writing.",
      "Implemented GraphQL-backed query execution with validation and error handling.",
      "Improved data accessibility and reduced dependency on engineering teams.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Material UI",
      "GraphQL",
      "NestJS",
    ],
    images: ["/images/projects/QueryBuilder.png"],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/bcec05bdb4cc4561b1cde5c74a83d6ba",
    },
  },

  /* =========================
     PROFESSIONAL PROJECTS
  ========================== */

  {
    slug: "graana-real-estate-platform",
    title: "Graana – Real Estate Platform",
    company: "Graana",
    timePeriod: "2022 – 2023",
    descriptionDetail: [
      "Led frontend improvements and technical SEO optimizations, increasing organic traffic from ~400K to over 1M monthly users.",
      "Rebuilt major parts of the UI based on new Figma designs.",
      "Developed backend automation and APIs using Node.js.",
      "Improved performance across web and mobile views.",
      "Implemented Cloudflare workers and redirect rules.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "React Native",
      "Cloudflare",
    ],
    images: [
      "/images/projects/GraanaLogo.png",
      "/images/projects/GraanaApp.png",
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/8102115876f2471fb1fcf41763aeee23",
      webLink: [
        {
          id: 1,
          title: "Website",
          link: "https://www.graana.com/",
        },
      ],
    },
  },

  {
    slug: "zdp-ui-components-library",
    title: "ZDP UI Components Library",
    company: "Zones",
    timePeriod: "2022 – 2024",
    descriptionDetail: [
      "Designed and maintained a reusable UI component library with over 40 base components.",
      "Managed a multi-package architecture using Lerna.",
      "Integrated Storybook for live documentation and previews.",
      "Components were reused across 5+ internal applications.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Material UI",
      "Lerna",
      "Storybook",
    ],
    images: ["/images/projects/ZdpUILogo.png"],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/2ae08c108cf34075b6237d111f1a709d",
    },
  },

  /* =========================
     FREELANCE / PRODUCT WORK
  ========================== */

  {
    slug: "aqers-property-search",
    title: "Aqers – Property Search Platform",
    company: "Freelance",
    timePeriod: "2021",
    descriptionDetail: [
      "Built a responsive property search platform with advanced filters.",
      "Implemented map-based listings and optimized search performance.",
    ],
    technologies: ["React", "Node.js", "MongoDB"],
    images: ["/images/projects/AqersLogo.png"],
  },

  {
    slug: "bulky-delivery-platform",
    title: "Bulky – Delivery Service Platform",
    company: "Freelance",
    timePeriod: "2021",
    descriptionDetail: [
      "Developed a delivery management platform with admin and customer flows.",
      "Implemented real-time order tracking and status updates.",
    ],
    technologies: ["React", "Node.js", "Express"],
    images: ["/images/projects/BulkyLogo.png"],
  },

  {
    slug: "sentertainment-streaming",
    title: "Sentertainment – Streaming Platform",
    company: "Freelance",
    timePeriod: "2020",
    descriptionDetail: [
      "Built an entertainment platform for streaming movies and music.",
      "Integrated food ordering functionality within the platform.",
    ],
    technologies: ["React", "Node.js", "Stripe"],
    images: ["/images/projects/SentraLogo.png"],
  },

  {
    slug: "tyft-food-truck-app",
    title: "TYFT – Food Truck Finder",
    company: "Freelance",
    timePeriod: "2020",
    descriptionDetail: [
      "Developed a mobile app to locate nearby food trucks.",
      "Implemented live location tracking and vendor listings.",
    ],
    technologies: ["React Native", "Firebase"],
    images: ["/images/projects/TyftLogo.png"],
  },

  {
    slug: "nomadiq-resident-platform",
    title: "NOMADIQ – Resident Operations Platform",
    company: "Client Project",
    timePeriod: "2024",
    descriptionDetail: [
      "Built a resident-focused platform for rent payments and maintenance requests.",
      "Developed admin panel and backend services.",
    ],
    technologies: ["React Native", "Node.js", "Firebase"],
    images: ["/images/projects/NomadiqLogo.png"],
  },
];
