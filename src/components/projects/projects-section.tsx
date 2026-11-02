"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";

import { projects } from "@/data/projects";
import type { Project } from "@/components/projects/types";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import styles from "./projects-section.module.css";

const FEATURED_SLUGS = new Set<string>([
  "talentflow-enterprise-recruiting-platform",
  "cleon-ai-voice-ordering",
  "query-builder",
]);

const HOME_SELECTED_LIMIT = 8;

export function ProjectsSection() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Project | null>(null);

  const featured = React.useMemo(
    () => projects.filter((p) => FEATURED_SLUGS.has(p.slug)),
    [],
  );

  const selected = React.useMemo(
    () =>
      projects
        .filter((p) => !FEATURED_SLUGS.has(p.slug))
        .slice(0, HOME_SELECTED_LIMIT),
    [],
  );

  function openProject(p: Project) {
    setActive(p);
    setOpen(true);
  }

  function closeProject() {
    setOpen(false);
    setTimeout(() => setActive(null), 120);
  }

  return (
    <section
      className={`${styles.projectsSection} section-shell scroll-mt-24 space-y-10`}
      id="projects"
    >
      {/* Header */}
      <Reveal className="space-y-2">
        <SectionHeader
          eyebrow="Selected engineering work"
          title="Projects"
          subtitle="AI training environments, enterprise SaaS platforms, product simulations, and real production systems built across web, AI, and automation."
        />
      </Reveal>

      {/* Featured Case Studies */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-base md:text-lg font-medium tracking-tight">
            Featured case studies
          </h3>
          <Link
            href="/projects"
            className="inline-flex min-h-11 shrink-0 items-center text-sm text-primary hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        <div className="project-grid items-stretch">
          {featured.map((p, index) => (
            <Reveal
              key={p.slug}
              delay={index * 0.045}
              className={styles.featuredCard}
            >
              <ProjectCard
                project={p}
                featured
                onOpen={() => openProject(p)}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Selected Work */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-base md:text-lg font-medium tracking-tight">
            Selected work
          </h3>
          <Link
            href="/projects"
            className="inline-flex min-h-11 shrink-0 items-center text-sm text-primary hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        <div className="project-grid items-stretch">
          {selected.map((p, index) => (
            <Reveal
              key={p.slug}
              delay={index * 0.045}
              className={styles.selectedCard}
            >
              <ProjectCard project={p} onOpen={() => openProject(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <ProjectDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) closeProject();
          else setOpen(true);
        }}
        project={active}
        onViewCaseStudy={(slug) => {
          closeProject();
          router.push(`/projects/${slug}`);
        }}
      />
    </section>
  );
}
