import Image from "next/image";
import { Building2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/shared/section-header";

export function WorkExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="6+ years shipping production software"
        title="Work experience"
        subtitle="Impact-focused timeline — highlights that signal senior ownership, architecture, and execution."
      />

      <div className="space-y-4">
        {experience.map((e) => {
          const initials = e.company
            .replace(/\(.*?\)/g, "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("");

          return (
            <div
              key={`${e.company}-${e.timePeriod}`}
              className="glass rounded-3xl p-6 md:p-7"
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
                          className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-black/10 transition hover:border-primary/50 hover:bg-black/15"
                        >
                          <Image
                            src={e.logo.src}
                            alt={e.logo.alt}
                            width={48}
                            height={48}
                            className="h-8 w-8 object-contain transition group-hover:scale-[1.03]"
                          />
                        </a>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-black/10">
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-black/10 text-xs font-semibold text-muted-foreground">
                        {initials || <Building2 className="h-5 w-5" />}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg font-semibold tracking-tight">
                      {e.title}
                    </div>
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
                  {e.credentialUrl ? (
                    <Badge
                      asChild
                      variant="outline"
                      className="rounded-full border-border/60 bg-black/10"
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
                      className="rounded-full border-border/60 bg-black/10"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
