"use client";

import Image from "next/image";
import { Building2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/shared/section-header";
import styles from "./work-experience-section.module.css";

export function WorkExperienceSection() {
  return (
    <section
      id="experience"
      className={`section-shell scroll-mt-24 space-y-8 ${styles.experienceSection}`}
    >
      <Reveal>
        <SectionHeader
          eyebrow="7+ years shipping production software"
          title="Work experience"
          subtitle="Enterprise platforms, product engineering, and technical ownership across my professional work."
        />
      </Reveal>

      <div className={`space-y-4 ${styles.timeline}`}>
        {experience.map((e, index) => {
          const isCurrentRole = e.timePeriod.endsWith("Present");
          const initials = e.company
            .replace(/\(.*?\)/g, "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("");

          return (
            <Reveal
              key={`${e.company}-${e.timePeriod}`}
              delay={index * 0.035}
              className={`glass rounded-2xl p-6 md:p-7 ${styles.experienceCard} ${
                isCurrentRole ? styles.currentRole : ""
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {e.logo?.src ? (
                      e.companyUrl ? (
                        <a
                          href={e.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${e.company} website`}
                          className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-secondary/50 transition hover:border-primary/50 hover:bg-accent ${
                            isCurrentRole ? styles.currentRoleIcon : ""
                          }`}
                        >
                          <Image
                            src={e.logo.src}
                            alt={e.logo.alt}
                            width={48}
                            height={48}
                            className="h-8 w-8 object-contain"
                          />
                        </a>
                      ) : (
                        <div
                          className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-secondary/50 ${
                            isCurrentRole ? styles.currentRoleIcon : ""
                          }`}
                        >
                          <Image
                            src={e.logo.src}
                            alt={e.logo.alt}
                            width={48}
                            height={48}
                            className="h-8 w-8 object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-secondary/50 text-xs font-semibold text-muted-foreground ${
                          isCurrentRole ? styles.currentRoleIcon : ""
                        }`}
                      >
                        {initials || <Building2 className="h-5 w-5" />}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-medium tracking-tight">
                      {e.title}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {e.companyUrl ? (
                        <a
                          href={e.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 transition hover:text-foreground"
                        >
                          {e.company}
                          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                        </a>
                      ) : (
                        e.company
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full w-fit">
                    {e.timePeriod}
                  </Badge>
                  {isCurrentRole ? (
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/40 text-primary"
                    >
                      Current
                    </Badge>
                  ) : null}
                  {e.credentialUrl ? (
                    <Badge
                      asChild
                      variant="outline"
                      className="rounded-full border-border/60 bg-secondary/50"
                    >
                      <a
                        href={e.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1"
                        aria-label={`${e.company} experience letter`}
                      >
                        Experience letter
                        <ExternalLink className="h-3 w-3 opacity-70" />
                      </a>
                    </Badge>
                  ) : null}
                </div>
              </div>

              {e.description ? (
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {e.description}
                </p>
              ) : null}

              {/* Safe guard: descriptionDetail might be missing */}
              {Array.isArray(e.descriptionDetail) &&
              e.descriptionDetail.length ? (
                <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/85">
                  {e.descriptionDetail.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {/* Tech badges */}
              {Array.isArray(e.technologies) && e.technologies.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.technologies.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full border-border/60 bg-secondary/50"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
