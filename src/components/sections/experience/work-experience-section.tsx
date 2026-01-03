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
        {experience.map((e) => (
          <div
            key={`${e.company}-${e.timePeriod}`}
            className="glass rounded-3xl p-6 md:p-7"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="text-lg font-semibold tracking-tight">
                  {e.title}
                </div>
                <div className="text-sm text-muted-foreground">{e.company}</div>
              </div>

              <Badge variant="secondary" className="rounded-full w-fit">
                {e.timePeriod}
              </Badge>
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
        ))}
      </div>
    </section>
  );
}
