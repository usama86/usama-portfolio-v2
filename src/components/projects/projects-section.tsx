"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";

import { featuredProjects, getFeaturedProjects, isFeaturedProject } from "@/data/featured-projects";
import { FeaturedProjectCard } from "./featured-project-card";

import { projects } from "@/data/projects";
import type { Project } from "@/components/projects/types";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import styles from "./projects-section.module.css";

const HOME_SELECTED_LIMIT = 8;

export function ProjectsSection() {
  const router = useRouter();
  const openerRef = React.useRef<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Project | null>(null);

  const featured = React.useMemo(
    () => getFeaturedProjects(),
    [],
  );

  const selected = React.useMemo(
    () =>
      projects
        .filter((p) => !isFeaturedProject(p))
        .slice(0, HOME_SELECTED_LIMIT),
    [],
  );

  function openProject(p: Project) {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActive(p);
    setOpen(true);
  }

  function closeProject() {
    setOpen(false);
    setTimeout(() => setActive(null), 120);
  }

  return (
    <section
      className={`${styles.projectsSection} section-shell scroll-mt-24`}
      id="projects"
    >
      {/* Header */}
      <Reveal className="space-y-2">
        <SectionHeader
          eyebrow="Selected engineering work"
          title="Projects"
          right={
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:max-w-[30rem] md:pb-1">
              AI training environments, enterprise SaaS platforms, product
              simulations, and real production systems built across web, AI, and
              automation.
            </p>
          }
        />
      </Reveal>

      {/* Featured Case Studies */}
      <div className={styles.projectGroup}>
        <div className={styles.groupHeading}>
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

        <div className={styles.featuredGrid}>
          {featured.map((p) => (
            <FeaturedProjectCard key={p.slug} project={p}
              presentation={featuredProjects.find(item => item.slug === p.slug)!}
              onOpen={() => openProject(p)} />
          ))}
        </div>
      </div>

      {/* Selected Work */}
      <div className={styles.projectGroup}>
        <div className={styles.groupHeading}>
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
        onRestoreFocus={() => openerRef.current?.focus({ preventScroll: true })}
        onViewCaseStudy={(slug) => {
          closeProject();
          router.push(`/projects/${slug}`);
        }}
      />
    </section>
  );
}
