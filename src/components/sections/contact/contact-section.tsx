"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "./contact-section.module.css";

const siteKey = process.env.NEXT_PUBLIC_CONTACT_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const submissionId = useRef<string | null>(null);
  const sending = useRef(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!scriptReady || !siteKey || !widgetRef.current || !window.turnstile || widgetId.current) return;
    const turnstile = window.turnstile;
    const compact = window.matchMedia("(max-width: 389px)");
    const renderWidget = () => {
      if (widgetId.current) turnstile.remove(widgetId.current);
      setToken("");
      widgetId.current = turnstile.render(widgetRef.current!, {
        sitekey: siteKey,
        action: "portfolio_contact",
        theme: "auto",
        size: compact.matches ? "compact" : "flexible",
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => { setToken(""); setStatus({ kind: "error", text: "Verification could not load. Please try again or email me directly." }); },
      });
    };
    const onModeChange = () => {
      try { renderWidget(); }
      catch { setStatus({ kind: "error", text: "Verification could not load. Please email me directly." }); }
    };
    onModeChange();
    compact.addEventListener("change", onModeChange);
    return () => {
      compact.removeEventListener("change", onModeChange);
      if (widgetId.current) turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [scriptReady]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || !token) return;
    sending.current = true;
    setLoading(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), subject: form.get("subject"),
          message: form.get("message"), website: form.get("website") || "",
          turnstileToken: token, submissionId: submissionId.current,
        }),
      });
      const result: { ok?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "The message could not be sent. Please try again or email me directly.");
      setStatus({ kind: "success", text: result.message || "Message sent. Thank you for reaching out." });
      formRef.current?.reset();
      submissionId.current = null;
    } catch (error) {
      setStatus({ kind: "error", text: error instanceof Error ? error.message : "The message could not be sent. Please email me directly." });
    } finally {
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      sending.current = false;
      setLoading(false);
    }
  }

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
        <Reveal className={`glass rounded-2xl p-6 md:p-7 ${styles.formCard}`}>
          <form ref={formRef} className="space-y-3" onSubmit={submit} onInput={() => { submissionId.current = null; if (status) setStatus(null); }} aria-busy={loading}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                name="name"
                aria-label="Your name" required minLength={2} maxLength={80} autoComplete="name"
                placeholder="Your name"
                className={styles.contactField}
              />
              <Input
                name="email"
                aria-label="Email" required maxLength={254} autoComplete="email"
                placeholder="Email"
                type="email"
                className={styles.contactField}
              />
            </div>
            <Input
              name="subject"
                aria-label="Subject" required minLength={3} maxLength={120}
              placeholder="Subject (e.g. SaaS dashboard, AI voice agent…)"
              className={styles.contactField}
            />
            <Textarea
              name="message"
                aria-label="Message" required minLength={10} maxLength={3000}
              placeholder="Message"
                className={`${styles.contactField} ${styles.messageField}`}
            />

            <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            {siteKey ? <><div ref={widgetRef} className={styles.verification} aria-label="Spam verification" />
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => setStatus({ kind: "error", text: "Verification could not load. Please email me directly." })} /></> :
              <p className={styles.formNotice}>The contact form is temporarily unavailable. Please use “Email directly”.</p>}
            {status && <p className={status.kind === "error" ? styles.errorStatus : styles.successStatus} role={status.kind === "error" ? "alert" : "status"}>{status.text}</p>}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                className={`rounded-xl ${styles.sendButton}`}
                type="submit"
                disabled={!siteKey || !token || loading}
              >
                {loading ? "Sending…" : "Send"}
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
