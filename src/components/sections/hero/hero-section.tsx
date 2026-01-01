import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />

        <div className="relative space-y-5">
          <Badge variant="secondary" className="rounded-full">
            PSEB Registered Freelancer • 2025–2026
          </Badge>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            I build{" "}
            <span className="text-primary">multi-tenant SaaS</span>,{" "}
            AI voice agents, and high-performance web platforms.
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            6+ years shipping real products. Strong on architecture, clean UX,
            integrations, and scaling systems end-to-end (Next.js, TypeScript,
            FastAPI, PostgreSQL).
          </p>

          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Voice AI"].map(
              (t) => (
                <Badge key={t} variant="outline" className="rounded-full border-border/60 bg-black/10">
                  {t}
                </Badge>
              )
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button className="rounded-xl" asChild>
              <a href="#projects">View projects</a>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <a href="mailto:muhammad.usama4@gmail.com">Contact</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
