import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="What I’m strong at"
        title="Skills"
        subtitle="Senior-friendly grouping: systems, product delivery, integrations, and clean UI engineering."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((c) => (
          <div key={c.title} className="glass rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/15 border border-primary/20 grid place-items-center">
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
                  className="rounded-full border-border/60 bg-black/10"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
