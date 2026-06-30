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

const GITHUB_REPO_URL = "https://github.com/usama86/usama-portfolio-v2";

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
  const isHome = pathname === "/";
  const nav = isHome ? HOME_NAV : INNER_NAV;

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ opacity: isLiteMotion ? 1 : 0, y: isLiteMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isLiteMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      <div
        className={`glass border-b border-border/60 ${styles.headerSurface} ${
          isScrolled ? styles.scrolled : ""
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-xl bg-primary/15 border border-primary/20 grid place-items-center ${styles.avatar}`}
            >
              <span className="text-sm font-semibold">MU</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">Muhammad Usama</div>
              <div className="text-xs text-muted-foreground">
                Senior Software Engineer
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden md:flex items-center gap-6 text-sm text-muted-foreground ${styles.desktopNav}`}
          >
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
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
                className="rounded-xl hidden md:inline-flex"
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
              className={`rounded-xl hidden md:inline-flex ${styles.resumeButton}`}
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
