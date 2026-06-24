"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Project | null>(null);

  const featured = React.useMemo(
    () => projects.filter((p) => FEATURED_SLUGS.has(p.slug)),
    []
  );

  const selected = React.useMemo(
    () =>
      projects
        .filter((p) => !FEATURED_SLUGS.has(p.slug))
        .slice(0, HOME_SELECTED_LIMIT),
    []
  );

  function openProject(p: Project) {
    setActive(p);
    setOpen(true);
  }

  function closeProject() {
    setOpen(false);
    setTimeout(() => setActive(null), 120);
  }

  const revealEase = [0.22, 1, 0.36, 1] as const;
  const headerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: revealEase },
    },
  };
  const cardContainerVariants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion ? { duration: 0 } : { staggerChildren: 0.08 },
    },
  };
  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: revealEase },
    },
  };

  return (
    <section className={`${styles.projectsSection} space-y-10`} id="projects">
      {/* Header */}
      <motion.div
        className="space-y-2"
        variants={headerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Real products & real systems — from multi-tenant SaaS to AI voice
          agents and large-scale UI platforms.
        </p>
      </motion.div>

      {/* Featured Case Studies */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            Featured case studies
          </h3>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {featured.map((p) => (
            <motion.div
              key={p.slug}
              className={styles.featuredCard}
              variants={cardVariants}
            >
              <ProjectCard
                project={p}
                featured
                onOpen={() => openProject(p)}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Selected Work */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            Selected work
          </h3>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {selected.map((p) => (
            <motion.div
              key={p.slug}
              className={styles.selectedCard}
              variants={cardVariants}
            >
              <ProjectCard project={p} onOpen={() => openProject(p)} />
            </motion.div>
          ))}
        </motion.div>
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
