"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialChips } from "@/components/shared/social-chips";
import { IntroVideoDialog } from "@/components/media/intro-video-dialog";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <div
        className={`${styles.part} ${styles.eyebrow}`}
        style={{ "--entrance-order": 0 } as React.CSSProperties}
      >
        <span className={styles.status} aria-hidden="true" />
        Senior Software Engineer{" "}
        <span className="text-muted-foreground">· 7+ Years</span>
      </div>
      <h1
        id="hero-title"
        className={`${styles.headline} ${styles.part}`}
        style={{ "--entrance-order": 1 } as React.CSSProperties}
      >
        Engineering complex systems,{" "}
        <span>from architecture to production.</span>
      </h1>
      <div
        className={`${styles.introduction} ${styles.part}`}
        style={{ "--entrance-order": 2 } as React.CSSProperties}
      >
        <p>
          I&apos;m a Senior Software Engineer specializing in React, Next.js,
          TypeScript, and full-stack product development. I design, architect,
          and deliver production software—from complex frontend applications to
          backend services, databases, and cloud infrastructure.
        </p>
        <p>
          I also founded{" "}
          <a
            href="https://archwalk.app"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary"
          >
            ArchWalk
          </a>
          , an immersive 360° experience platform that I architected and built
          end to end. Previously, I co-led AI product simulation initiatives at
          Turing.
        </p>
      </div>
      <div
        className={`${styles.actions} ${styles.part}`}
        style={{ "--entrance-order": 3 } as React.CSSProperties}
      >
        <Button asChild size="lg" className="rounded-xl">
          <a href="#projects">
            View Projects <ArrowDown aria-hidden="true" />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-xl">
          <a href="#contact">
            Get in Touch <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
        <IntroVideoDialog />
      </div>
      <div
        className={`${styles.bottom} ${styles.part}`}
        style={{ "--entrance-order": 4 } as React.CSSProperties}
      >
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Based in Pakistan · Open to global remote roles and relocation
          opportunities.
        </p>
        <SocialChips compact variant="primary" showTooltipValue />
      </div>
    </section>
  );
}
