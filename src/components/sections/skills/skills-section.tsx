"use client";

import { motion, useReducedMotion } from "motion/react";
import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import styles from "./skills-section.module.css";

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className={`scroll-mt-24 space-y-8 ${styles.skillsSection}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: "easeOut" }}
      >
        <SectionHeader
          eyebrow="What I’m strong at"
          title="Skills"
          subtitle="Senior-friendly grouping across AI training systems, product simulation, enterprise SaaS, integrations, and clean UI engineering."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((c, index) => (
          <motion.div
            key={c.title}
            className={`glass rounded-3xl p-6 ${styles.skillCard}`}
            style={{ "--skill-delay": `${index * 0.35}s` } as React.CSSProperties}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.4,
              delay: shouldReduceMotion ? 0 : index * 0.08,
              ease: "easeOut",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-2xl bg-primary/15 border border-primary/20 grid place-items-center ${styles.skillIcon}`}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-tight">
                {c.title}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.items.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className={`rounded-full border-border/60 bg-black/10 ${styles.skillChip}`}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
