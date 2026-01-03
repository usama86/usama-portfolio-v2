import type { Project } from "@/components/projects/types";

export const projects: Project[] = [
  /* =========================
     FEATURED PROJECTS
  ========================== */

  {
    slug: "cleon-ai-voice-ordering",
    title: "Cleon – AI Voice Ordering Platform",
    company: "Personal / SaaS Product",
    timePeriod: "12/2025 — Present",
    descriptionDetail: [
      "Designed and developed a multi-tenant AI voice ordering SaaS enabling restaurants to accept phone orders via conversational voice agents.",
      "Built a FastAPI backend with strict tenant isolation, restaurant ↔ voice-agent mapping, and scoped request validation.",
      "Implemented real-time AI voice agents using Vapi, Deepgram (STT), and ElevenLabs (TTS).",
      "Developed menu ingestion, cart management, and checkout workflows optimized for voice-driven conversations.",
      "Integrated OrderOut APIs for menu sync, merchant configuration, and order creation foundation.",
      "Created a Next.js admin dashboard to manage restaurants, voice agents, and integrations.",
      "Architected the system to be provider-agnostic so voice vendors can be swapped without breaking core business logic.",
      "Implemented SQLAlchemy + Alembic migrations for scalable schema evolution and data integrity.",
      "Kept clean domain separation (Tenants, Restaurants, Agents, Orders) for long-term scalability.",
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
    images: [
      {
        src: "/images/projects/CleonLogo.png",
        title: "Cleon Admin Dashboard",
        description:
          "Multi-tenant admin to manage restaurants, voice agents, and integrations.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/3aa0db1fee7c4f41af572b317b33660c",
    },
    caseStudy: {
      problem: [
        "Restaurants lose revenue when calls are missed or staff are busy; phone ordering is slow, inconsistent, and error-prone.",
        "Integrations are fragmented (menus, merchants, voice providers), making it hard to scale across multiple restaurants.",
      ],
      approach: [
        "Designed multi-tenant architecture with strict scoping (tenant → restaurant → agent) and safe request validation.",
        "Implemented deterministic voice tools: menu ingestion → cart state → checkout, with fallbacks for partial failures.",
        "Built an integration-first admin UI so configuration lives in one place (restaurants, agents, OrderOut fields).",
      ],
      architecture: [
        "Next.js (TS) admin dashboard + FastAPI backend + PostgreSQL (SQLAlchemy/Alembic).",
        "Voice layer: Vapi + Deepgram (STT) + ElevenLabs (TTS) with tool-call based flows.",
        "OrderOut integration: restaurant/menu/merchant IDs stored per restaurant; foundation for create-quote/create-order.",
      ],
      challenges: [
        "Maintaining tenant isolation and preventing cross-restaurant data leaks.",
        "Handling unreliable external APIs during live calls (timeouts, partial data, retries).",
        "Keeping conversation flow stable while still allowing flexible integrations/providers.",
      ],
      outcome: [
        "Working admin + integrations foundation; restaurants can be configured with agents and provider IDs.",
        "Clear domain boundaries enabling future provider swaps and scaling to more restaurants/tenants.",
      ],
    },
  },

  {
    slug: "query-builder",
    title: "Query Builder (Drag & Drop + Expert Mode)",
    company: "Zones",
    timePeriod: "2023 — 2024",
    descriptionDetail: [
      "Developed a user-friendly Query Builder with drag-and-drop design mode for business analysts.",
      "Added an expert mode for manual query writing and advanced usage.",
      "Integrated validation and error feedback to prevent invalid query builds.",
      "Reduced dependency on engineers for routine reporting and data retrieval.",
    ],
    technologies: ["React", "TypeScript", "Material UI", "GraphQL", "NestJS"],
    images: [
      {
        src: "/images/projects/QueryBuilder.png",
        title: "Query Builder Canvas",
        description:
          "Drag-and-drop interface with validation and real-time query preview.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/bcec05bdb4cc4561b1cde5c74a83d6ba?sid=93cea8b3-6f9b-449b-af21-c9306253b38b",
    },
    caseStudy: {
      problem: [
        "Business analysts needed complex queries but were blocked by engineering dependency and slow turnaround.",
        "Manual query writing is error-prone and intimidating for non-technical users.",
      ],
      approach: [
        "Designed a dual-mode experience: visual builder for most users + expert mode for power users.",
        "Introduced guided validation and clear error states to reduce invalid configurations.",
        "Optimized UX for speed: reusable blocks, quick edits, and predictable interactions.",
      ],
      architecture: [
        "React + TypeScript UI with a block-based canvas model.",
        "GraphQL-backed execution layer with validation + safe query submission.",
        "Composable widgets and schema-aware constraints for reliable output.",
      ],
      challenges: [
        "Maintaining flexibility without allowing invalid query structures.",
        "Keeping UI responsive with complex nested conditions and large schemas.",
      ],
      outcome: [
        "Analysts could build queries independently, reducing engineering load and speeding up reporting cycles.",
        "Improved consistency and reduced query-related mistakes through validation UX.",
      ],
    },
  },

  /* =========================
     PROFESSIONAL PROJECTS
  ========================== */

  {
    slug: "graana-real-estate-platform",
    title: "Graana – Real Estate Platform",
    company: "Graana",
    timePeriod: "05/2022 — 05/2023",
    descriptionDetail: [
      "Increased organic traffic from ~400K to ~1M by leading technical SEO improvements and performance work.",
      "Redesigned the website to align with new Figma designs.",
      "Developed APIs and automation scripts using Node.js (including sitemaps).",
      "Enhanced website + mobile view performance and shipped key UI improvements.",
      "Implemented Cloudflare redirect rules and worker scripts.",
      "Led the SEO Technical team and improved SEO ranking and technical health.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "React Native",
      "HTML/CSS",
      "Cloudflare",
      "Technical SEO",
      "Performance",
    ],
    images: [
      {
        src: "/images/projects/GraanaLogo.png",
        title: "Graana Web Platform",
        description:
          "SEO-focused property discovery with improved UX and performance.",
      },
      {
        src: "/images/projects/GraanaApp.png",
        title: "Mobile Experience",
        description:
          "Mobile-first browsing, filtering, and listing view improvements.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/8102115876f2471fb1fcf41763aeee23?sid=d3d23830-bace-4af0-abf2-69948edd9041",
      webLink: [
        { id: 5550, title: "Website", link: "https://www.graana.com/" },
      ],
    },
    caseStudy: {
      problem: [
        "SEO growth was limited by technical issues (performance bottlenecks, indexing problems, redirects).",
        "UI needed alignment with new designs while keeping pages fast and crawlable.",
      ],
      approach: [
        "Led technical SEO roadmap: performance wins, sitemap automation, crawl/index fixes.",
        "Delivered redesign implementation from Figma with a performance-first mindset.",
        "Used Cloudflare rules/workers to handle redirects and edge logic cleanly.",
      ],
      architecture: [
        "Next.js web app + Node.js scripts/APIs for automation.",
        "Cloudflare workers + redirect rules for edge routing and SEO hygiene.",
      ],
      challenges: [
        "Balancing design changes with SEO stability (avoiding ranking drops).",
        "Reducing page weight and improving load/interaction metrics across many pages.",
      ],
      outcome: [
        "Scaled organic traffic significantly (~400K → ~1M).",
        "Improved performance and technical health, enabling sustainable SEO growth.",
      ],
    },
  },

  {
    slug: "zdp-ui-components-library",
    title: "ZDP Components Library",
    company: "Zones",
    timePeriod: "2022 — 2024",
    descriptionDetail: [
      "Created and maintained 40+ base components using Material UI.",
      "Managed multi-package architecture using Lerna.",
      "Built Storybook documentation for previews and developer onboarding.",
      "Components were reused across 5+ internal apps for consistency and speed.",
    ],
    technologies: ["React", "TypeScript", "MUI", "Lerna", "Storybook"],
    images: [
      {
        src: "/images/projects/ZdpUILogo.png",
        title: "UI Library + Storybook",
        description:
          "Reusable components with documented variants and usage guidelines.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/2ae08c108cf34075b6237d111f1a709d?sid=df122629-51c1-49c6-900e-a56b967afc2b",
    },
    caseStudy: {
      problem: [
        "Multiple apps had inconsistent UI patterns, duplicated components, and slow delivery due to rework.",
      ],
      approach: [
        "Built a shared component library with strict variants, conventions, and documentation.",
        "Used Lerna to manage packages and versioning across internal products.",
        "Added Storybook to make adoption easy and reduce misuse/misalignment.",
      ],
      architecture: [
        "React + MUI component system with reusable primitives and composable patterns.",
        "Monorepo multi-package tooling (Lerna) + Storybook docs.",
      ],
      challenges: [
        "Maintaining backward compatibility while shipping improvements.",
        "Driving adoption across teams and ensuring consistent usage.",
      ],
      outcome: [
        "Faster feature delivery across apps and consistent design language.",
        "Reduced duplication and improved developer experience via docs and shared primitives.",
      ],
    },
  },

  /* =========================
     FREELANCE / PRODUCT WORK
  ========================== */

  {
    slug: "aqers-property-search",
    title: "Aqers – Property Search Platform",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Developed a property search website with filters and fast browsing.",
      "Included portals for buyers and sellers.",
      "Built with Next.js for a clean, responsive experience.",
    ],
    technologies: ["Next.js"],
    images: [
      {
        src: "/images/projects/AqersLogo.png",
        title: "Aqers",
        description: "Property search with filters and buyer/seller flows.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/f4283465c1cc472787f775fb98222654",
      webLink: [{ id: 3701, title: "Live", link: "https://aqers.vercel.app/" }],
      github: [
        { id: 3702, title: "GitHub", link: "https://github.com/usama86/aqers" },
      ],
    },
    caseStudy: {
      problem: [
        "Users needed a simple, fast way to search and filter property listings without a heavy interface.",
      ],
      approach: [
        "Built a responsive Next.js site with clean filtering UX and optimized listing rendering.",
        "Structured the UI for quick scanning: cards, filters, and consistent navigation.",
      ],
      architecture: [
        "Next.js frontend focused on performance and readability.",
      ],
      challenges: [
        "Keeping the UI quick and usable while supporting multiple listing scenarios.",
      ],
      outcome: [
        "Delivered a straightforward property browsing experience with buyer/seller portals.",
      ],
    },
  },

  {
    slug: "yamar-company-spa",
    title: "Yamar – Company Info Single Page App",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: ["Single-page app providing company information."],
    technologies: ["React", "Next.js"],
    images: [
      {
        src: "/images/projects/YamarLogo.png",
        title: "Yamar",
        description: "Minimal SPA for company info and branding content.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/e6e59d5143694459820c390d7b58e83c",
      webLink: [{ id: 3901, title: "Live", link: "https://yamar.vercel.app/" }],
      github: [
        {
          id: 3902,
          title: "GitHub",
          link: "https://github.com/usama86/Yamar-Web-App",
        },
      ],
    },
    caseStudy: {
      problem: ["Client needed a simple, fast, brand-focused web presence."],
      approach: [
        "Delivered a clean SPA with responsive layout and straightforward navigation.",
      ],
      outcome: [
        "Launched a lightweight, easy-to-maintain single page experience.",
      ],
    },
  },

  {
    slug: "bulky-delivery-platform",
    title: "Bulky – Delivery Service Platform",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Delivery service platform for TVs, furniture, appliances, etc.",
      "Developed in Next.js with a responsive UI.",
    ],
    technologies: ["Next.js"],
    images: [
      {
        src: "/images/projects/BulkyLogo.png",
        title: "Bulky",
        description: "Delivery flows and admin-style management UI.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/9929153d65c14a0684446e0978f0f60e",
      webLink: [
        { id: 3801, title: "Live", link: "https://bulky-peach.vercel.app/" },
      ],
      github: [
        { id: 3802, title: "GitHub", link: "https://github.com/usama86/Bulky" },
      ],
    },
    caseStudy: {
      problem: [
        "Needed a simple delivery service UI to manage requests and status.",
      ],
      approach: [
        "Built a responsive Next.js interface with clear user flows and a clean layout.",
      ],
      outcome: ["Delivered a working platform base for delivery operations."],
    },
  },

  {
    slug: "sentratainment",
    title: "Sentrataiment – Streaming + Food Ordering",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Entertainment platform for streaming movies and music with integrated food ordering.",
      "Developed using React Native (mobile), React (admin panel), and Node Express (backend).",
    ],
    technologies: ["React Native", "React", "Node Express"],
    images: [
      {
        src: "/images/projects/SentraLogo.png",
        title: "Sentrataiment",
        description: "Streaming catalog + integrated ordering experience.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/d4927d3fc9214f38bcebdf327604ac3e?sid=1deb6c6e-a07c-4454-8c70-cd977edf3d0f",
      webLink: [
        {
          id: 3601,
          title: "Admin",
          link: "https://sentratainment.vercel.app/",
        },
      ],
      github: [
        {
          id: 3501,
          title: "GitHub (Admin)",
          link: "https://github.com/usama86/sentratainment",
        },
        {
          id: 3502,
          title: "GitHub (Mobile)",
          link: "https://github.com/usama86/Sentratainment-Travel-App",
        },
        {
          id: 3503,
          title: "GitHub (Backend)",
          link: "https://github.com/usama86/Sentertainment-backend",
        },
      ],
    },
    caseStudy: {
      problem: [
        "Users wanted a single experience for entertainment + ordering without switching apps.",
      ],
      approach: [
        "Built mobile app + admin panel + backend as a cohesive full-stack system.",
        "Focused on clean UX across browsing, selection, and ordering flows.",
      ],
      architecture: ["React Native app + React admin + Node Express backend."],
      challenges: [
        "Keeping feature parity across mobile/admin and coordinating data flows.",
      ],
      outcome: [
        "Delivered a complete platform with streaming + ordering capabilities.",
      ],
    },
  },

  {
    slug: "elixir-tango-plus",
    title: "Elixir Tango+",
    company: "Elixir Technologies",
    timePeriod: "—",
    descriptionDetail: [
      "SaaS platform for designing, generating, and managing data-driven documents and workflows.",
      "End-to-end document generation solution used for print workflows and real-time communication output.",
    ],
    technologies: [
      "React",
      "Canvas",
      "Storybook",
      "Puppeteer",
      "Java",
      "HTML/CSS",
    ],
    images: [
      {
        src: "/images/projects/ElixirLogo.png",
        title: "Tango+",
        description: "Document design and generation platform.",
      },
    ],
    links: {
      videoType: "googleDrive",
      videoUrl: "1_EhyjcX0WAGXSA07xCyCFzzS_VfudBv1",
      webLink: [
        { id: 5555, title: "Product", link: "https://elixir.com/product" },
      ],
    },
    caseStudy: {
      problem: [
        "Non-technical users needed to design complex, data-driven documents without engineering support.",
      ],
      approach: [
        "Built a designer experience and supporting component library/documentation.",
        "Automated testing and ensured stable output across complex templates.",
      ],
      architecture: [
        "React + Canvas UI with supporting backend services (Java).",
      ],
      challenges: [
        "Complex rendering, template edge cases, and print/workflow reliability.",
      ],
      outcome: [
        "Enabled scalable document creation with consistent output and workflows.",
      ],
    },
  },

  {
    slug: "artbot-youtube-like-platform",
    title: "Artbot – Video Streaming Platform",
    company: "Artbot LLC",
    timePeriod: "08/2019 — 12/2019",
    descriptionDetail: [
      "Developed a platform similar to YouTube enabling uploads, streaming, and creator earnings.",
      "Built backend APIs using Node Express.",
      "Implemented IPFS for cost-effective video storage.",
      "Deployed on DigitalOcean and managed logs/ops using Rancher.",
    ],
    technologies: [
      "React",
      "Node",
      "Express",
      "IPFS",
      "HTML/CSS",
      "DigitalOcean",
      "Rancher",
    ],
    images: [
      {
        src: "/images/projects/ArtbotLogo.png",
        title: "Artbot",
        description: "Video uploads + streaming with decentralized storage.",
      },
    ],
    caseStudy: {
      problem: [
        "High video storage/bandwidth costs and complex upload/streaming workflows.",
      ],
      approach: [
        "Built a MERN platform and explored IPFS to reduce storage cost and improve distribution.",
      ],
      architecture: [
        "React frontend + Node/Express backend + IPFS storage; deployed on DigitalOcean.",
      ],
      challenges: [
        "Large file handling, streaming reliability, deployment/log visibility.",
      ],
      outcome: [
        "Shipped a working streaming platform with scalable storage approach.",
      ],
    },
  },

  {
    slug: "jobtask-service-platform",
    title: "JobTask – Service Ordering Platform",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Service ordering platform where users can order various services.",
      "Frontend in Next.js, mobile app in React Native, backend in Node Express.",
    ],
    technologies: ["Next.js", "React Native", "Node Express"],
    images: [
      {
        src: "/images/projects/JobTaskLogo.png",
        title: "JobTask",
        description: "Marketplace-style service ordering with web + mobile.",
      },
      {
        src: "/images/projects/JobTaskApp.png",
        title: "Mobile App",
        description: "React Native app for browsing and ordering services.",
      },
    ],
    links: {
      videoType: "googleDrive",
      videoUrl: "1jNTe1czXnS2xZpKDQoAzWaYydrLWtxhR",
    },
    caseStudy: {
      problem: [
        "Users needed an easy way to request and manage services across web and mobile.",
      ],
      approach: [
        "Built full-stack platform with shared flows and consistent data handling across clients.",
      ],
      architecture: ["Next.js web + React Native + Node Express API."],
      challenges: [
        "Keeping UX consistent across platforms and managing shared business rules.",
      ],
      outcome: ["Delivered a multi-platform service ordering experience."],
    },
  },

  {
    slug: "dmv-ez",
    title: "dmv-ez",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "A platform that streamlines the driver's license application process across US states.",
      "Developed using React with a user-friendly flow.",
    ],
    technologies: ["React"],
    images: [
      {
        src: "/images/projects/DMVlogo.png",
        title: "dmv-ez",
        description: "Simplified flows for multi-state DMV-style applications.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl:
        "https://www.loom.com/share/7c9711683ad64ae2aa2ce41a04703410?sid=5b586b2e-8397-449e-be0c-d779478155be",
    },
    caseStudy: {
      problem: [
        "Complex multi-step applications cause user drop-off and confusion.",
      ],
      approach: [
        "Built a guided, step-by-step React UI with clear progress and validation.",
      ],
      challenges: [
        "Edge cases across different state requirements and form complexity.",
      ],
      outcome: [
        "Improved clarity and usability for multi-step application flows.",
      ],
    },
  },

  {
    slug: "atomic-vault-admin",
    title: "Atomic Vault UI – Admin Panel",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Developed stock admin panel with CRUD functionality.",
      "Implemented API integration using MERN stack.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    images: [
      {
        src: "/images/projects/AtomicLogo.png",
        title: "Atomic Vault Admin",
        description: "CRUD dashboards and admin workflows.",
      },
    ],
    links: {
      videoType: "loom",
      videoUrl: "https://www.loom.com/share/053e8a6b2f0c48b3927d62ea57230963",
      github: [
        {
          id: 3804,
          title: "GitHub",
          link: "https://github.com/usama86/atomic-mine",
        },
      ],
    },
    caseStudy: {
      problem: [
        "Client needed an admin panel to manage inventory/records efficiently.",
      ],
      approach: [
        "Built CRUD-first UI with clear forms, tables, and API integration.",
      ],
      outcome: [
        "Delivered an admin dashboard foundation for ongoing operations.",
      ],
    },
  },

  {
    slug: "store-walk-pwa",
    title: "Store Walk (Progressive Web App)",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "MERN stack app with Material UI.",
      "Replicated Google Form logic and emailed responses as PDFs.",
    ],
    technologies: ["MERN", "Material UI"],
    images: [
      {
        src: "/images/projects/StoreWalkLogo.png",
        title: "Store Walk PWA",
        description: "Form-like workflow + PDF email reporting.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed field-data collection with a familiar form experience + printable reports.",
      ],
      approach: [
        "Replicated Google Form style logic, generated PDFs, and automated email delivery.",
      ],
      architecture: ["MERN app + PDF generation + email workflow."],
      challenges: ["PDF layout consistency and reliable submission handling."],
      outcome: [
        "Delivered a PWA that captures responses and emails PDF reports automatically.",
      ],
    },
  },

  {
    slug: "tyft-food-truck",
    title: "TYFT (Find Food Truck Application)",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Cross-platform app to find food trucks, order food, and manage registrations.",
      "Developed using MERN and React Native.",
    ],
    technologies: ["MERN", "React Native"],
    images: [
      {
        src: "/images/projects/TyftLogo.png",
        title: "TYFT",
        description: "Food truck discovery + ordering on mobile.",
      },
    ],
    links: {
      videoType: "googleDrive",
      videoUrl: "1qaVeI9WgAUh9X_EY26OyFfPbmAwB6dV4",
      webLink: [
        {
          id: 3901,
          title: "App Store",
          link: "https://apps.apple.com/pk/app/tyft/id6739187254",
        },
      ],
      github: [
        {
          id: 3699,
          title: "GitHub (Mobile)",
          link: "https://github.com/usama86/tyft",
        },
        {
          id: 3698,
          title: "GitHub (Admin)",
          link: "https://github.com/usama86/tyft-website",
        },
        {
          id: 3697,
          title: "GitHub (Backend)",
          link: "https://github.com/usama86/Tyft_backend",
        },
      ],
    },
    caseStudy: {
      problem: [
        "Users needed location-based discovery of food trucks and simple ordering on the go.",
      ],
      approach: [
        "Built mobile-first flows with backend support and supporting admin surface.",
      ],
      challenges: [
        "Location accuracy, vendor listing consistency, and ordering UX.",
      ],
      outcome: [
        "Shipped a cross-platform app for food truck discovery and ordering.",
      ],
    },
  },

  {
    slug: "nomadiq-resident-operations",
    title: "NOMADIQ – Resident Operations Platform",
    company: "Client Project",
    timePeriod: "2024",
    descriptionDetail: [
      "A platform centralizing resident operations like rent payments and maintenance requests.",
      "Developed using React Native, React (admin panel), and Node Express.",
    ],
    technologies: ["React Native", "React", "Node Express"],
    images: [
      {
        src: "/images/projects/NomadiqLogo.png",
        title: "NOMADIQ",
        description: "Rent payments + maintenance + admin workflows.",
      },
    ],
    links: {
      videoType: "googleDrive",
      videoUrl: "1zVA-jtxaXmz7v1rM996F0MFZmm7JTSQ1",
    },
    caseStudy: {
      problem: [
        "Residents needed one place for payments, requests, and communication with management.",
      ],
      approach: [
        "Built mobile experience plus admin management flows and backend services.",
      ],
      architecture: ["React Native + React admin + Node Express backend."],
      challenges: [
        "Coordinating workflows (payments, tickets) with reliable status updates.",
      ],
      outcome: [
        "Delivered a platform that centralizes resident operations end-to-end.",
      ],
    },
  },

  {
    slug: "fitness-block-app",
    title: "Fitness App (Block App)",
    company: "Freelance",
    timePeriod: "—",
    descriptionDetail: [
      "Developed for athletes to create custom diet and workout plans tailored to events they register for.",
      "Built using React Native with supporting web/admin and Node Express backend services.",
    ],
    technologies: ["React Native", "React", "Node Express"],
    images: [
      {
        src: "/images/projects/FitnessAppLogo.png",
        title: "Block App",
        description: "Custom workouts + diet plans aligned to athlete goals.",
      },
    ],
    caseStudy: {
      problem: [
        "Athletes needed goal-based training and diet planning tied to events and timelines.",
      ],
      approach: [
        "Built planning flows that generate structured routines and track progress.",
      ],
      challenges: [
        "Modeling flexible plans and keeping UX simple for daily usage.",
      ],
      outcome: [
        "Delivered a tailored fitness planning experience for athletes.",
      ],
    },
  },
];
