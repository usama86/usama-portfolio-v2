"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "./contact-section.module.css";

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
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
          duration: shouldReduceMotion ? 0.01 : 0.5,
          ease: revealEase,
        }}
      >
        <SectionHeader
          eyebrow="Let’s build"
          title="Contact"
          subtitle="Tell me what you’re building — I’ll reply with clear next steps, timeline, and approach."
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4 items-start">
        {/* Form -> mailto (simple, no backend) */}
        <motion.div
          className={`glass rounded-3xl p-6 md:p-7 ${styles.formCard}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.65,
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
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.65,
            delay: shouldReduceMotion ? 0 : 0.1,
            ease: revealEase,
          }}
        >
          <div className="text-lg font-semibold tracking-tight">
            Fast response, zero fluff
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I can help with: system design + clean UI, multi-tenant SaaS,
            integrations, performance, and shipping production-ready features.
          </p>

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
