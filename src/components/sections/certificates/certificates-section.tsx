"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import styles from "./certificates-section.module.css";

const certs = [
  {
    title: "PSEB Registered Freelancer",
    meta: "2025 — 2026",
    note: "Government-registered freelancer status (Pakistan).",
    href: "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0",
  },
  {
    title: "React / Frontend Certification",
    meta: "Credential",
    note: "Frontend Developer (React, CSS, and JavaScript)",
    href: "https://www.hackerrank.com/certificates/34855d16681c",
  },
];

export function CertificatesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="certificates"
      className={`scroll-mt-24 space-y-8 ${styles.certificateSection}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: "easeOut" }}
      >
        <SectionHeader
          eyebrow="Proof"
          title="Certificates"
          subtitle="Verified proof of credibility, certifications, and professional registration."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c, index) => (
          <motion.div
            key={c.title}
            className={`glass rounded-3xl p-6 space-y-3 ${styles.certificateCard}`}
            style={
              { "--certificate-delay": `${index}s` } as React.CSSProperties
            }
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.4,
              delay: shouldReduceMotion ? 0 : index * 0.08,
              ease: "easeOut",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-tight">
                  {c.title}
                </div>
                <div className="text-sm text-muted-foreground">{c.note}</div>
              </div>
              <Badge
                variant="secondary"
                className={`rounded-full ${styles.credentialPill}`}
              >
                {c.meta}
              </Badge>
            </div>

            <div>
              <Button
                asChild
                variant="outline"
                className={`rounded-xl ${styles.credentialButton}`}
              >
                <a href={c.href} target="_blank" rel="noreferrer">
                  View credential
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
