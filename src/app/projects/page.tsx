"use client";

import * as React from "react";
import Link from "next/link";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FilterKey =
  | "all"
  | "featured"
  | "company"
  | "freelance"
  | "saas"
  | "mobile"
  | "backend";

const FEATURED_SLUGS = new Set<string>([
  "cleon-ai-voice-ordering",
  "query-builder",
]);

function hasAnyTech(p: any, keywords: string[]) {
  const tech = (p.technologies ?? []).map((t: string) => t.toLowerCase());
  return keywords.some((k) => tech.some((t: string) => t.includes(k)));
}

function isFreelance(p: any) {
  const c = (p.company ?? "").toLowerCase();
  return (
    c.includes("freelance") ||
    c.includes("client") ||
    c.includes("personal") ||
    c.includes("product")
  );
}

function isCompany(p: any) {
  const c = (p.company ?? "").toLowerCase();
  return !!c && !isFreelance(p);
}

function isMobile(p: any) {
  return hasAnyTech(p, ["react native"]);
}

function isBackend(p: any) {
  return hasAnyTech(p, [
    "fastapi",
    "node",
    "express",
    "nestjs",
    "sqlalchemy",
    "alembic",
    "postgres",
    "postgresql",
    "mongodb",
    "dynamodb",
  ]);
}

function isSaaS(p: any) {
  const text = `${p.title ?? ""} ${
    p.descriptionDetail?.join(" ") ?? ""
  }`.toLowerCase();

  return (
    text.includes("saas") ||
    text.includes("multi-tenant") ||
    hasAnyTech(p, ["multi-tenant", "postgresql", "fastapi", "next.js"])
  );
}

const FILTERS: {
  key: FilterKey;
  label: string;
  predicate: (p: any) => boolean;
}[] = [
  { key: "all", label: "All", predicate: () => true },
  {
    key: "featured",
    label: "Featured",
    predicate: (p) => FEATURED_SLUGS.has(p.slug),
  },
  { key: "company", label: "Company", predicate: isCompany },
  { key: "freelance", label: "Freelance", predicate: isFreelance },
  { key: "saas", label: "SaaS", predicate: isSaaS },
  { key: "mobile", label: "Mobile", predicate: isMobile },
  { key: "backend", label: "Backend", predicate: isBackend },
];

export default function ProjectsPage() {
  const [active, setActive] = React.useState<FilterKey>("all");
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  const [fading, setFading] = React.useState(false);

  const filtered = React.useMemo(() => {
    const f = FILTERS.find((x) => x.key === active) ?? FILTERS[0];
    const base = projects.filter(f.predicate);

    const q = deferredQuery.trim().toLowerCase();
    if (!q) return base;

    return base.filter((p) => {
      const haystack = [
        p.title ?? "",
        p.company ?? "",
        ...(p.technologies ?? []),
        ...(p.descriptionDetail ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [active, deferredQuery]);

  // Smooth fade transition on filter/search change (no remount blink)
  React.useEffect(() => {
    setFading(true);
    const t = setTimeout(() => setFading(false), 450); // slower
    return () => clearTimeout(t);
  }, [active, deferredQuery]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            All Projects
          </h1>
          <Badge variant="secondary" className="rounded-full">
            {projects.length} projects
          </Badge>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Fast-scannable selection across SaaS, AI voice, dashboards, and
          performance-focused web platforms.
        </p>

        {/* Search + Filters */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects (e.g. Next.js, FastAPI, React Native, SaaS...)"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="rounded-2xl"
              onClick={() => setQuery("")}
              disabled={!query.trim()}
            >
              Clear
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = f.key === active;
              return (
                <Button
                  key={f.key}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActive(f.key)}
                >
                  {f.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-medium">{filtered.length}</span>{" "}
          of{" "}
          <span className="text-foreground font-medium">{projects.length}</span>
        </div>
      </div>

      {/* Grid */}
      <div
        className={[
          "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
          "transition-opacity duration-500 ease-in-out",
          fading ? "opacity-40" : "opacity-100",
        ].join(" ")}
      >
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="glass rounded-3xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base md:text-lg font-semibold tracking-tight truncate">
                      {p.title}
                    </h2>

                    {FEATURED_SLUGS.has(p.slug) ? (
                      <Badge className="rounded-full" variant="secondary">
                        Featured
                      </Badge>
                    ) : null}
                  </div>

                  {(p.company || p.timePeriod) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.company ?? ""}
                      {p.company && p.timePeriod ? " • " : ""}
                      {p.timePeriod ?? ""}
                    </p>
                  )}
                </div>
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
