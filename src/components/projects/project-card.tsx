"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "./types";
import { ProjectIcon } from "./project-icon";

type Props = {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
  className?: string;
};

export function ProjectCard({ project, onOpen, featured, className }: Props) {
  const tech = project.technologies ?? [];
  const shown = tech.slice(0, featured ? 8 : 6);
  const extra = tech.length - shown.length;
  return (
    <button
      onClick={onOpen}
      className="group h-full w-full rounded-2xl text-left"
      type="button"
      aria-label={`Explore ${project.cardTitle ?? project.title}`}
    >
      <Card
        className={`glass interactive-surface h-full overflow-hidden rounded-2xl py-0 shadow-none ${className ?? ""}`}
      >
        <CardContent className="flex h-full flex-col gap-5 p-6 md:p-7">
          <div className="flex items-center justify-between gap-3">
            <ProjectIcon slug={project.slug} title={project.title} />
            {featured ? (
              <Badge
                variant="secondary"
                className="rounded-full text-[10px] uppercase tracking-wider"
              >
                Featured
              </Badge>
            ) : null}
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-medium leading-snug tracking-[-0.025em] group-hover:text-primary">
              {project.cardTitle ?? project.title}
            </h4>
            {project.company || project.timePeriod ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {project.company}
                {project.company && project.timePeriod ? " · " : ""}
                {project.timePeriod}
              </p>
            ) : null}
          </div>
          <p
            className={`text-sm leading-relaxed text-muted-foreground ${featured ? "line-clamp-3" : "line-clamp-2"}`}
          >
            {project.descriptionDetail?.[0] ?? ""}
          </p>
          {shown.length ? (
            <div className="flex flex-wrap gap-1.5">
              {shown.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="rounded-md border-border text-[11px] font-normal text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
              {extra > 0 ? (
                <Badge variant="secondary" className="rounded-md text-[11px]">
                  +{extra}
                </Badge>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto flex min-h-11 items-end justify-between border-t border-border pt-4 text-xs text-primary">
            <span>Explore project</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
