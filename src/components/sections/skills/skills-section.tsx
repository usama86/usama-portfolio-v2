"use client";

import { Reveal } from "@/components/motion/reveal";
import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import styles from "./skills-section.module.css";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className={`section-shell scroll-mt-24 space-y-8 ${styles.skillsSection}`}
    >
      <Reveal>
        <SectionHeader
          eyebrow="What I’m strong at"
          title="Skills"
          subtitle="Tools and disciplines I use to build, test, and operate production software."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((c, index) => (
          <Reveal
            key={c.title}
            delay={index * 0.045}
            className={`glass rounded-2xl p-6 ${styles.skillCard}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-2xl bg-primary/15 border border-primary/20 grid place-items-center ${styles.skillIcon}`}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium tracking-tight">
                {c.title}
              </h3>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.items.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className={`rounded-full border-border/60 bg-secondary/50 ${styles.skillChip}`}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
