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
};
