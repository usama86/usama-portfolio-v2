"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { useMotionLevel } from "@/hooks/use-motion-level";
import styles from "./navbar.module.css";

const GITHUB_REPO_URL = "https://github.com/usama86";

const HOME_NAV = [
  { label: "Projects", href: "#projects", type: "hash" as const },
  { label: "Experience", href: "#experience", type: "hash" as const },
  { label: "Skills", href: "#skills", type: "hash" as const },
  { label: "Certificates", href: "#certificates", type: "hash" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const INNER_NAV = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "All projects", href: "/projects", type: "route" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const motionLevel = useMotionLevel();
  const isLiteMotion = motionLevel === "lite";
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isHome = pathname === "/";
  const nav = isHome ? HOME_NAV : INNER_NAV;

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    for (const item of HOME_NAV) {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    }
    const resetAtTop = () => {
      if (window.scrollY < 120) setActiveSection("");
    };
    window.addEventListener("scroll", resetAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resetAtTop);
    };
  }, [isHome]);

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isLiteMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      <div
        className={`border-b border-border ${styles.headerSurface} ${
          isScrolled ? styles.scrolled : ""
        }`}
      >
        <div className="mx-auto max-w-[1248px] px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div
              className={`hidden min-[390px]:grid h-9 w-9 rounded-xl bg-primary/10 text-primary border border-primary/20 place-items-center ${styles.avatar}`}
            >
              <span className="text-sm font-semibold">MU</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight sm:text-base">
                Muhammad Usama
              </div>
              <div className="text-[11px] text-muted-foreground sm:text-xs">
                Senior Software Engineer
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className={`hidden lg:flex items-center gap-5 text-sm text-muted-foreground ${styles.desktopNav}`}
          >
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                aria-current={
                  isHome && activeSection === i.href.slice(1)
                    ? "location"
                    : undefined
                }
                className={`hover:text-foreground ${styles.navLink}`}
              >
                {i.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className={styles.iconControls}>
              <ThemeToggle />

              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-xl hidden lg:inline-flex"
                aria-label="View source on GitHub"
              >
                <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Desktop resume */}
            <Button
              asChild
              className={`rounded-xl hidden lg:inline-flex ${styles.resumeButton}`}
            >
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </Button>

            {/* Mobile menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
