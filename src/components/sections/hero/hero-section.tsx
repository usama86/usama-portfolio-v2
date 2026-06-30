"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialChips } from "@/components/shared/social-chips";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { useMotionLevel } from "@/hooks/use-motion-level";
import { motion } from "motion/react";
import styles from "./hero-section.module.css";

const CALENDLY_URL = "https://calendly.com/usama-amjad32/30min";
const UPWORK_URL = "https://www.upwork.com/freelancers/~01798f1c775f13992c";
const PSEB_URL =
  "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0";

// const INTRO_SHORT_URL =. (OLD ONE)
//   "https://youtube.com/shorts/8iUjJhpUKEE?si=nIhtEEkv6_GUHC3u";

const INTRO_SHORT_URL =
  "https://www.youtube.com/shorts/CtqX_YgKrF4?feature=shared";


  

export function HeroSection() {
  const motionLevel = useMotionLevel();
  const isFullMotion = motionLevel === "full";
  const isBalancedMotion = motionLevel === "balanced";
  const isLiteMotion = motionLevel === "lite";
  const heroWords =
    "Co-Leading AI Training Programs and Building Enterprise Software".split(" ");
  const heroHeadline =
    "Co-Leading AI Training Programs and Building Enterprise Software";
  const revealEase = [0.22, 1, 0.36, 1] as const;
  const lift = isFullMotion ? 10 : 0;

  const cardVariants = {
    hidden: { opacity: isLiteMotion ? 1 : 0, y: isFullMotion ? 16 : 0 },
    show: {
      opacity: 1,
      y: 0,
      boxShadow: isFullMotion
        ? [
            "0 24px 80px rgba(0, 0, 0, 0.05)",
            "0 30px 100px rgba(0, 0, 0, 0.09)",
            "0 24px 80px rgba(0, 0, 0, 0.05)",
          ]
        : "0 24px 80px rgba(0, 0, 0, 0.05)",
      transition: {
        opacity: {
          duration: isLiteMotion ? 0 : isBalancedMotion ? 0.3 : 0.7,
          ease: revealEase,
        },
        y: { duration: isFullMotion ? 0.7 : 0, ease: revealEase },
        boxShadow: isFullMotion
          ? { duration: 12, repeat: Infinity, ease: "easeInOut" as const }
          : { duration: 0 },
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: isFullMotion
        ? { staggerChildren: 0.07, delayChildren: 0.08 }
        : { duration: 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: isLiteMotion ? 1 : 0, y: lift },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLiteMotion ? 0 : isBalancedMotion ? 0.25 : 0.45,
        ease: revealEase,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 8,
      filter: "blur(2px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: revealEase },
    },
  };

  return (
    <section className="py-6 sm:py-8 md:py-6">
      <motion.div
        className={`${styles.heroCard} glass rounded-[1.75rem] p-5 sm:p-6 md:p-10 relative overflow-hidden`}
        variants={cardVariants}
        initial="hidden"
        animate="show"
      >
        {/* glow blobs */}
        {isFullMotion ? (
          <>
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />
          </>
        ) : null}
        {!isLiteMotion ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(113, 113, 122, 0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(113, 113, 122, 0.32) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "linear-gradient(to right, transparent 0%, transparent 34%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, transparent 34%, black 100%)",
              opacity: isBalancedMotion ? 0.035 : undefined,
            }}
            animate={
              isFullMotion
                ? {
                    opacity: [0.035, 0.06, 0.035],
                    backgroundPosition: ["0px 0px", "36px 28px", "0px 0px"],
                  }
                : undefined
            }
            transition={
              isFullMotion
                ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
        ) : null}

        <motion.div
          className={`${styles.heroContent} relative grid gap-7 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_280px] md:items-start`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Row 1: Turing role (left) + Quick Intro header (right) */}
          <motion.div
            className="flex min-w-0 items-start justify-between gap-4 md:col-span-2 md:items-center"
            variants={itemVariants}
          >
            <div
              className="flex w-full min-w-0 flex-col items-start gap-0.5 rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground sm:inline-flex sm:w-fit sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:px-3 sm:py-1"
            >
              <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2">
                <span>Co-Lead @</span>
                <span className="font-medium text-primary">Turing</span>
              </span>
              <span className="hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="max-w-full leading-snug">
                AI Training &amp; Product Simulation
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm font-medium">Quick intro</div>
              <a
                href={INTRO_SHORT_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Open on YouTube
              </a>
            </div>
          </motion.div>

          {/* Row 2: Main content (left) */}
          <motion.div className="space-y-5" variants={containerVariants}>
            <motion.h1
              className="max-w-3xl text-[2.15rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl md:leading-tight"
              variants={isFullMotion ? containerVariants : itemVariants}
            >
              {isFullMotion
                ? heroWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      className="inline-block mr-[0.24em]"
                      variants={wordVariants}
                    >
                      {word}
                    </motion.span>
                  ))
                : heroHeadline}
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              At <span className="font-medium text-foreground/90">Turing</span>,
              {" "}I co-lead AI product simulation initiatives and contribute to
              {" "}
              <span className="font-medium text-foreground/90">
                Microsoft Research (MSR)
              </span>{" "}
              training programs while building enterprise SaaS platforms, complex
              workflows, and modern web applications.
            </motion.p>

            <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
              {[
                "React",
                "Next.js",
                "TypeScript",
                "AI Training",
                "Product Simulation",
                "Enterprise SaaS",
              ].map((t) => (
                <motion.div
                key={t}
                  whileHover={isFullMotion ? { y: -1 } : undefined}
                  transition={isFullMotion ? { duration: 0.18, ease: "easeOut" } : undefined}
                >
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/60 bg-black/10 transition-colors hover:bg-black/15"
                  >
                    {t}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 items-center gap-3 pt-2 min-[420px]:grid-cols-[auto_auto] sm:flex sm:flex-wrap"
              variants={itemVariants}
            >
              <motion.div
                whileHover={isFullMotion ? { y: -2 } : undefined}
                transition={isFullMotion ? { duration: 0.18, ease: "easeOut" } : undefined}
              >
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl min-[420px]:w-auto"
                >
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Book a 30-min Call
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={isFullMotion ? { y: -2 } : undefined}
                transition={isFullMotion ? { duration: 0.18, ease: "easeOut" } : undefined}
              >
                <Button
                  asChild
                  variant="secondary"
                  className="w-full rounded-xl min-[420px]:w-auto"
                >
                  <a href={UPWORK_URL} target="_blank" rel="noreferrer">
                    Hire me on Upwork
                  </a>
                </Button>
              </motion.div>

              <Badge
                variant="outline"
                className="w-fit rounded-full border-border/60 bg-black/10 min-[420px]:col-span-2 sm:col-span-1"
              >
                Available for freelance & long-term
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialChips
                className="pt-2"
                compact
                variant="primary"
                showTooltipValue
              />
            </motion.div>

            <motion.a
              href={PSEB_URL}
              target="_blank"
              rel="noreferrer"
              className="block w-fit text-xs text-muted-foreground transition-colors hover:text-foreground"
              variants={itemVariants}
              whileHover={isFullMotion ? { y: -1, opacity: 1 } : undefined}
              transition={isFullMotion ? { duration: 0.18, ease: "easeOut" } : undefined}
            >
              ✓ PSEB Registered Freelancer
            </motion.a>
          </motion.div>

          {/* Row 2: Video (right) */}
          <motion.div
            className="mx-auto w-full max-w-[min(280px,100%)] md:mx-0 md:max-w-[260px] md:justify-self-end lg:max-w-[280px]"
            variants={itemVariants}
            animate={
              isFullMotion
                ? {
                    y: [0, -5, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : undefined
            }
            whileHover={
              isFullMotion
                ? { y: -2, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)" }
                : undefined
            }
          >
            {/* Mobile header for intro */}
            <div className="flex items-center justify-between md:hidden mb-3">
              <div className="text-sm font-medium">Quick intro</div>
              <a
                href={INTRO_SHORT_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Open on YouTube
              </a>
            </div>

            <YouTubeEmbed
              urlOrId={INTRO_SHORT_URL}
              aspect="9/16"
              title="Muhammad Usama — Intro"
            />

            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              73s overview of what I build + how I work.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
