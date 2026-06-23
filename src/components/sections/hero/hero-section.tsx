"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialChips } from "@/components/shared/social-chips";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { motion, useReducedMotion } from "motion/react";
import styles from "./hero-section.module.css";

const CALENDLY_URL = "https://calendly.com/usama-amjad32/30min";
const UPWORK_URL = "https://www.upwork.com/freelancers/~01798f1c775f13992c";
const PSEB_URL =
  "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0";

const INTRO_SHORT_URL =
  "https://youtube.com/shorts/8iUjJhpUKEE?si=nIhtEEkv6_GUHC3u";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroWords =
    "Co-Leading AI Training Programs and Building Enterprise Software".split(" ");
  const revealEase = [0.22, 1, 0.36, 1] as const;
  const lift = shouldReduceMotion ? 0 : 10;

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      boxShadow: shouldReduceMotion
        ? "0 24px 80px rgba(0, 0, 0, 0.05)"
        : [
            "0 24px 80px rgba(0, 0, 0, 0.05)",
            "0 30px 100px rgba(0, 0, 0, 0.09)",
            "0 24px 80px rgba(0, 0, 0, 0.05)",
          ],
      transition: {
        opacity: { duration: 0.7, ease: revealEase },
        y: { duration: 0.7, ease: revealEase },
        boxShadow: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : lift },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: revealEase },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: revealEase },
    },
  };

  return (
    <section className="py-10 md:py-6">
      <motion.div
        className={`${styles.heroCard} glass rounded-3xl p-6 md:p-10 relative overflow-hidden`}
        variants={cardVariants}
        initial="hidden"
        animate="show"
      >
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />
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
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.04 }
              : {
                  opacity: [0.035, 0.06, 0.035],
                  backgroundPosition: ["0px 0px", "36px 28px", "0px 0px"],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <motion.div
          className={`${styles.heroContent} relative grid gap-6 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_280px] md:items-start`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Row 1: Turing role (left) + Quick Intro header (right) */}
          <motion.div
            className="flex items-center justify-between md:col-span-2"
            variants={itemVariants}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/60
       bg-muted/40 px-3 py-1 text-sm text-muted-foreground
       w-fit"
            >
              <span>Co-Lead @ </span>
              <span className="font-medium text-primary">Turing</span>
              <span> · AI Training &amp; Product Simulation</span>
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
              className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl"
              variants={containerVariants}
            >
              {heroWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="inline-block mr-[0.24em]"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
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
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
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
              className="flex flex-wrap items-center gap-3 pt-2"
              variants={itemVariants}
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Button asChild variant="outline" className="rounded-xl">
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Book a 30-min Call
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Button asChild variant="secondary" className="rounded-xl">
                  <a href={UPWORK_URL} target="_blank" rel="noreferrer">
                    Hire me on Upwork
                  </a>
                </Button>
              </motion.div>

              <Badge
                variant="outline"
                className="rounded-full border-border/60 bg-black/10"
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
              whileHover={shouldReduceMotion ? undefined : { y: -1, opacity: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              ✓ PSEB Registered Freelancer
            </motion.a>
          </motion.div>

          {/* Row 2: Video (right) */}
          <motion.div
            className="md:justify-self-end w-full max-w-[260px] lg:max-w-[280px]"
            variants={itemVariants}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -5, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -2, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)" }
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
