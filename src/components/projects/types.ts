export type ProjectLink = {
  id: number | string;
  link: string;
  title: string;
};

export type CaseStudySection = {
  problem?: string[];
  approach?: string[];
  architecture?: string[];
  challenges?: string[];
  outcome?: string[];
};

export type EngineeringStory = {
  eyebrow: string;
  summary: string;
  atAGlance: [StoryFact, StoryFact, StoryFact, StoryFact];
  problem: string[];
  architecture: {
    title: string;
    description: string;
    lanes?: { title: string; nodes: { name: string; detail: string }[] }[];
    hub?: { name: string; detail: string; connections: { name: string; detail: string }[] };
    footnote: string;
  };
  decisions: { title: string; problem: string; implementation: string; implication: string; evidence: string }[];
  challenges: { title: string; challenge: string; response: string }[];
  delivery: { status: "public" | "implemented" | "foundation"; title: string; detail: string }[];
  technology: { responsibility: string; tools: string[] }[];
  visualMoments?: { id: string; title: string; status: string; mediaIndex: number; width: number; height: number; explanation: string }[];
  leadMedia?: { mediaIndex: number; width: number; height: number; caption: string };
  evidenceIntro: string;
};

export type StoryFact = { label: string; value: string };

export type ProjectImage = {
  src: string;
  title: string;
  description?: string;
  credit?: { label: string; source: string; license: string; licenseUrl: string; changes: string; additionalSources?: { label: string; href: string }[] };
};

export type ProjectCategory = "company" | "freelance" | "saas" | "mobile" | "backend";

export type Project = {
  categories?: ProjectCategory[];
  role?: string;
  seoDescription?: string;
  slug: string;
  title: string;
  cardTitle?: string;
  highlightsTitle?: string;
  company?: string;
  timePeriod?: string;
  descriptionDetail: string[];
  technologies?: string[];
  images: ProjectImage[];
  mediaImages?: ProjectImage[];
  links?: {
    videoType?: "loom" | "googleDrive";
    videoUrl?: string; // loom url OR google drive fileId
    webLink?: ProjectLink[];
    github?: ProjectLink[];
  };
  caseStudy?: CaseStudySection;
  engineeringStory?: EngineeringStory;
};
