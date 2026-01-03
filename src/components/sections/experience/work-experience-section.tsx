import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/shared/section-header";

export function WorkExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="Where I’ve shipped"
        title="Work experience"
        subtitle="Impact-focused timeline — highlights that signal senior ownership, architecture, and execution."
      />

      <div className="space-y-4">
        {experience.map((e) => (
          <div
            key={`${e.company}-${e.period}`}
            className="glass rounded-3xl p-6 md:p-7"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="text-lg font-semibold tracking-tight">
                  {e.role}
                </div>
                <div className="text-sm text-muted-foreground">
                  {e.company}
                  {e.location ? ` • ${e.location}` : ""}
                </div>
              </div>

              <Badge variant="secondary" className="rounded-full w-fit">
                {e.period}
              </Badge>
            </div>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/85">
              {e.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
