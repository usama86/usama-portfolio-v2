import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SocialChips } from "@/components/shared/social-chips";

const CALENDLY_URL = "https://calendly.com/usama-amjad32/30min";
const UPWORK_URL = "https://www.upwork.com/freelancers/~01798f1c775f13992c";
const PSEB_URL =
  "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0";

export function HeroSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />

        <div className="relative space-y-5">
          <a
            href={PSEB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/40
             bg-muted/40 px-3 py-1 text-sm text-muted-foreground
             hover:bg-muted/60 hover:text-foreground hover:-translate-y-[1px]
             transition-all w-fit"
          >
            <span>PSEB Registered Freelancer • 2025–2026</span>
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            I build <span className="text-primary">multi-tenant SaaS</span>, AI
            voice agents, and high-performance web platforms.
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            6+ years shipping real products. Strong on architecture, clean UX,
            integrations, and scaling systems end-to-end (Next.js, TypeScript,
            FastAPI, PostgreSQL).
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "FastAPI",
              "Python",
              "PostgreSQL",
              "Voice AI",
            ].map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-full border-border/60 bg-black/10"
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild className="rounded-xl">
              <a href={CALENDLY_URL} target="_blank">
                Book a 30-min Call
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-xl">
              <a href={UPWORK_URL} target="_blank">
                Hire me on Upwork
              </a>
            </Button>

            <Badge
              variant="outline"
              className="rounded-full border-border/60 bg-black/10"
            >
              Available for freelance & long-term
            </Badge>
          </div>
          <SocialChips
            className="pt-2"
            compact
            variant="primary"
            showTooltipValue
          />
        </div>
      </div>
    </section>
  );
}
