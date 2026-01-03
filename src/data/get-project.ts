import { projects } from "./projects";
import type { Project } from "@/components/projects/types";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
