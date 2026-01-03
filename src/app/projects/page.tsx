import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          All Projects
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          A selection of product work across SaaS, AI voice, dashboards, and
          performance-focused web platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="glass rounded-2xl p-5 border border-border/60 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="space-y-3">
              <div>
                <h2 className="text-base md:text-lg font-semibold tracking-tight">
                  {p.title}
                </h2>
                {(p.company || p.timePeriod) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.company ?? ""}
                    {p.company && p.timePeriod ? " • " : ""}
                    {p.timePeriod ?? ""}
                  </p>
                )}
              </div>

              {!!p.technologies?.length && (
                <div className="flex flex-wrap gap-2">
                  {p.technologies.slice(0, 6).map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full border-border/60 bg-black/10"
                    >
                      {t}
                    </Badge>
                  ))}
                  {p.technologies.length > 6 ? (
                    <Badge variant="secondary" className="rounded-full">
                      +{p.technologies.length - 6}
                    </Badge>
                  ) : null}
                </div>
              )}

              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                {p.descriptionDetail?.[0] ?? ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
