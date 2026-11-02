"use client";

import { motion } from "motion/react";
import { useMotionLevel } from "@/hooks/use-motion-level";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "./contact-section.module.css";

export function ContactSection() {
  const motionLevel = useMotionLevel();
  const isFullMotion = motionLevel === "full";
  const isBalancedMotion = motionLevel === "balanced";
  const isLiteMotion = motionLevel === "lite";
  const revealEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="contact"
      className={`scroll-mt-24 space-y-8 ${styles.contactSection}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: isLiteMotion ? 0 : isBalancedMotion ? 0.25 : 0.5,
          ease: revealEase,
        }}
      >
        <SectionHeader
          eyebrow="Let’s build"
          title="Contact"
          subtitle="Hiring for your engineering team or have a product in mind? Let’s talk."
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4 items-start">
        {/* Form -> mailto (simple, no backend) */}
        <motion.div
          className={`glass rounded-3xl p-6 md:p-7 ${styles.formCard}`}
          initial={{ opacity: isLiteMotion ? 1 : 0, y: isFullMotion ? 18 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: isLiteMotion ? 0 : isBalancedMotion ? 0.25 : 0.65,
            ease: revealEase,
          }}
        >
          <form
            className="space-y-3"
            action="mailto:usama.amjad32@gmail.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                name="name"
                placeholder="Your name"
                className={styles.contactField}
              />
              <Input
                name="email"
                placeholder="Email"
                type="email"
                className={styles.contactField}
              />
            </div>
            <Input
              name="subject"
              placeholder="Subject (e.g. SaaS dashboard, AI voice agent…)"
              className={styles.contactField}
            />
            <Textarea
              name="message"
              placeholder="Message"
              className={styles.contactField}
            />

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                className={`rounded-xl ${styles.sendButton}`}
                type="submit"
              >
                Send
              </Button>
              <Button
                asChild
                variant="outline"
                className={`rounded-xl ${styles.emailButton}`}
              >
                <a href="mailto:usama.amjad32@gmail.com">Email directly</a>
              </Button>
            </div>
          </form>
        </motion.div>

        {/* CTA card */}
        <motion.div
          className={`glass rounded-3xl p-6 md:p-7 space-y-3 ${styles.infoCard}`}
          initial={{ opacity: isLiteMotion ? 1 : 0, y: isFullMotion ? 18 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: isLiteMotion ? 0 : isBalancedMotion ? 0.25 : 0.65,
            delay: isFullMotion ? 0.1 : 0,
            ease: revealEase,
          }}
        >
          <div className="text-lg font-semibold tracking-tight">
            Let’s talk engineering
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I’m open to senior frontend, software, full-stack, and product
            engineering roles, including global remote and relocation
            opportunities. My work spans enterprise platforms, SaaS products,
            integrations, and performance.
          </p>

          <Button asChild variant="outline" className="rounded-xl">
            <a
              href="https://calendly.com/usama-amjad32/30min"
              target="_blank"
              rel="noreferrer"
            >
              Book a 30-min Call
            </a>
          </Button>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Email:</span>{" "}
              <a
                className={`underline underline-offset-4 ${styles.emailLink}`}
                href="mailto:usama.amjad32@gmail.com"
              >
                usama.amjad32@gmail.com
              </a>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span> Pakistan
              (Remote)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
