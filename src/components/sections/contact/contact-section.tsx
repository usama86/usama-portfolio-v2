"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "./contact-section.module.css";

export function ContactSection() {
  return (
    <section
      id="contact"
      className={`section-shell scroll-mt-24 ${styles.contactSection}`}
    >
      <Reveal>
        <SectionHeader
          eyebrow="Let’s build"
          title="Contact"
          subtitle="Hiring for your engineering team or have a product in mind? Let’s talk."
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4 items-start">
        {/* Form -> mailto (simple, no backend) */}
        <Reveal className={`glass rounded-2xl p-6 md:p-7 ${styles.formCard}`}>
          <form
            className="space-y-3"
            action="mailto:usama.amjad32@gmail.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                name="name"
                aria-label="Your name"
                placeholder="Your name"
                className={styles.contactField}
              />
              <Input
                name="email"
                aria-label="Email"
                placeholder="Email"
                type="email"
                className={styles.contactField}
              />
            </div>
            <Input
              name="subject"
              aria-label="Subject"
              placeholder="Subject (e.g. SaaS dashboard, AI voice agent…)"
              className={styles.contactField}
            />
            <Textarea
              name="message"
              aria-label="Message"
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
        </Reveal>

        {/* CTA card */}
        <Reveal
          className={`glass rounded-2xl p-6 md:p-7 space-y-3 ${styles.infoCard}`}
        >
          <h3 className="text-xl font-medium tracking-tight">
            Let’s talk engineering
          </h3>
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
        </Reveal>
      </div>
    </section>
  );
}
