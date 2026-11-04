"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import styles from "./certificates-section.module.css";

const certs = [
  {
    title: "PSEB Registered Freelancer",
    meta: "2025 — 2026",
    note: "Government-registered freelancer status (Pakistan).",
  },
  {
    title: "React / Frontend Certification",
    meta: "Credential",
    note: "Frontend Developer (React, CSS, and JavaScript)",
    href: "https://www.hackerrank.com/certificates/34855d16681c",
  },
];

export function CertificatesSection() {
  return (
    <section
      id="certificates"
      className={`section-shell scroll-mt-24 ${styles.certificateSection}`}
    >
      <Reveal>
        <SectionHeader
          eyebrow="Proof"
          title="Certificates"
          subtitle="Professional registration and verified technical credentials."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c, index) => (
          <Reveal
            key={c.title}
            delay={index * 0.045}
            className={`glass rounded-2xl p-6 space-y-3 ${styles.certificateCard}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-medium tracking-tight">
                  {c.title}
                </h3>
                <div className="text-sm text-muted-foreground">{c.note}</div>
              </div>
              <Badge
                variant="secondary"
                className={`rounded-full ${styles.credentialPill}`}
              >
                {c.meta}
              </Badge>
            </div>

            {c.href && <div>
              <Button
                asChild
                variant="outline"
                className={`rounded-xl ${styles.credentialButton}`}
              >
                <a href={c.href} target="_blank" rel="noreferrer">
                  View credential
                </a>
              </Button>
            </div>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
