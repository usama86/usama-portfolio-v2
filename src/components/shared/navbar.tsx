"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/20 grid place-items-center">
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
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="hover:text-foreground transition-colors"
              >
                {i.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop resume */}
            <Button asChild className="rounded-xl hidden md:inline-flex">
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </Button>

            {/* Mobile menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
