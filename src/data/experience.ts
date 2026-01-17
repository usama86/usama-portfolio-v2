export type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  companyUrl?: string;
  timePeriod: string;
  description: string;
  descriptionDetail: string[];
  technologies: string[];
  logo?: {
    src: string;
    alt: string;
  };
};

export const experience: ExperienceItem[] = [
  {
    id: 1111,
    title: "Senior Frontend Developer",
    company: "Allshore Talent (ECCO Select / Walsworth Yearbooks)",
    companyUrl: "https://www.allshoretalent.com/",
    timePeriod: "06/2025 — Present",
    description:
      "Driving a frontend revamp from AngularJS to Next.js + TypeScript, shipping critical UI features, and improving performance/accessibility across internal publishing platforms.",
    descriptionDetail: [
      "Working on a key digital transformation initiative for Walsworth (major US printing & publishing company), delivering and maintaining core internal platform UI features.",
      "Initiated and contributed to an AngularJS → Next.js (TypeScript) migration to improve scalability, maintainability, and performance.",
      "Shipped bug fixes and new features in a large-scale legacy AngularJS codebase, improving stability and reducing regressions.",
      "Built and optimized reusable UI components using React + TypeScript and integrated data flows via GraphQL.",
      "Implemented performance improvements (rendering, UI responsiveness) and accessibility enhancements across key modules.",
      "Contributed to a modular UI/design-system approach to keep patterns consistent across multiple products.",
    ],
    technologies: [
      "AngularJS",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "GraphQL",
      "HTML/CSS",
      "Accessibility",
      "Performance",
    ],
    logo: {
      src: "/images/allshorelogo.png",
      alt: "Allshore Talent logo",
    },
  },

  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Zones IT",
    companyUrl: "https://www.zones.com/site/home/index.html",
    timePeriod: "05/2023 — Present",
    description:
      "Built drag-and-drop productivity tools, reusable UI packages, and full-stack features with React + TypeScript, NestJS, and Keycloak-based authentication.",
    descriptionDetail: [
      "Developed a user-friendly Query Builder with drag-and-drop design mode and an expert mode for business analysts.",
      "Built an intuitive Drag & Drop Page Builder to create customizable, data-driven templates.",
      "Used Lerna to structure and publish multiple npm packages for scalable frontend development.",
      "Introduced a centralized UI package (ZDP-UI) with reusable components, ensuring design consistency across 6+ apps.",
      "Created Storybook documentation to streamline component adoption and usage for developers.",
      "Developed CRUD APIs in NestJS and implemented email templates (HBS) with SendGrid, including setup and styling.",
      "Redesigned core UI dataflow and delivered multiple modules in React + TypeScript.",
      "Implemented unified authentication across apps using Keycloak.",
      "Automated regression coverage and user-story testing using Cypress, reducing manual QA and catching issues earlier.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "NestJS",
      "Lerna",
      "Storybook",
      "Keycloak",
      "HTML/CSS",
      "SQL",
      "Cypress",
    ],
    logo: {
      src: "/images/zones_logo.png",
      alt: "Zones logo",
    },
  },

  {
    id: 2,
    title: "SEO Technical Lead",
    company: "Graana",
    companyUrl: "https://www.graana.com/",
    timePeriod: "05/2022 — 05/2023",
    description:
      "Led technical SEO and performance initiatives, redesigning key experiences and scaling automation to grow organic traffic significantly.",
    descriptionDetail: [
      "Increased organic traffic from ~400K to ~1M by leading technical SEO and performance improvements.",
      "Redesigned the website to align with updated Figma designs and shipped UI changes with a focus on UX and speed.",
      "Built APIs and automation scripts in Node.js to improve workflow efficiency and site performance.",
      "Improved website + mobile performance, achieving key milestones around speed and user experience.",
      "Developed sitemaps and automation scripts using Node.js to support SEO visibility and indexing.",
      "Led the SEO Technical team to improve rankings, resolve technical blockers, and maintain performance standards.",
      "Implemented Cloudflare redirect rules and worker scripts to handle routing/redirect optimization.",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "React",
      "React Native",
      "HTML/CSS",
      "Cloudflare",
      "Technical SEO",
    ],
    logo: {
      src: "/images/graana_logo.png",
      alt: "Graana logo",
    },
  },

  {
    id: 3,
    title: "Software Engineer",
    company: "Elixir Technology",
    companyUrl: "https://elixir.com/",
    timePeriod: "12/2019 — 04/2022",
    description:
      "Built a complex designer tool using React + Canvas, improved developer experience with Storybook, automated testing, and delivered backend APIs in Java.",
    descriptionDetail: [
      "Developed Tango Designer to create advanced bill designs using React and Canvas.",
      "Built Storybook documentation and a component library to improve developer velocity and consistency.",
      "Automated test cases using Puppeteer to reduce repetitive manual verification.",
      "Fixed bugs and implemented backend APIs in Java using factory-pattern based architecture.",
      "Served as Scrum Master and acted as Shift Lead for the Customer Migration Support team.",
    ],
    technologies: [
      "React",
      "Canvas",
      "Storybook",
      "Puppeteer",
      "Java",
      "HTML/CSS",
    ],
    logo: {
      src: "/images/elixir_technologies_logo.png",
      alt: "Elixir Technology logo",
    },
  },

  {
    id: 4,
    title: "MERN Stack Developer",
    company: "Artbot LLC",
    timePeriod: "08/2019 — 12/2019",
    description:
      "Built a YouTube-like streaming platform, implemented IPFS-based video storage, and handled deployments on DigitalOcean with Rancher.",
    descriptionDetail: [
      "Developed a platform similar to YouTube enabling video uploads, streaming, and creator earnings.",
      "Built and maintained backend APIs using Node.js + Express.",
      "Implemented IPFS for efficient and cost-effective video storage leveraging decentralized infrastructure.",
      "Deployed on DigitalOcean and managed logs/ops using Rancher.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "IPFS",
      "DigitalOcean",
      "Rancher",
      "HTML/CSS",
    ],
  },
];
