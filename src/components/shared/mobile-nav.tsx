"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

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

const PSEB_URL =
  "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0";
const GITHUB_REPO_URL = "https://github.com/usama86/usama-portfolio-v2";

type Props = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const nav = isHome ? HOME_NAV : INNER_NAV;

  function handleNavClick(href: string) {
    setOpen(false);
    if (!href.startsWith("#")) {
      router.push(href);
      onNavigate?.();
      return;
    }
    // Let the sheet release its scroll lock before moving to the section.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector(href);
        const lite =
          document.documentElement.dataset.motionLevel === "lite" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el?.scrollIntoView({
          behavior: lite ? "instant" : "smooth",
          block: "start",
        });
        onNavigate?.();
      });
    });
  }

  // Radix's generated dialog ID can differ between streamed server markup and
  // the first client render. Keep an identical trigger placeholder until mount.
  if (!mounted) {
    return <Button variant="outline" size="icon" className="rounded-xl lg:hidden" aria-label="Open menu" disabled>
      <Menu className="h-5 w-5" />
    </Button>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(360px,100vw)] max-w-full overflow-y-auto p-5"
      >
        <SheetHeader>
          <SheetTitle className="text-left">
            Muhammad Usama
            <span className="block text-xs text-muted-foreground font-normal mt-1">
              Senior Software Engineer
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Portfolio navigation and professional links.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-3 space-y-2">
          {nav.map((i) => (
            <button
              key={i.href}
              type="button"
              onClick={() => handleNavClick(i.href)}
              className="min-h-11 w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-muted transition-colors"
            >
              {i.label}
            </button>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <Button asChild className="w-full rounded-xl">
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full rounded-xl">
            <a href="mailto:usama.amjad32@gmail.com">Email</a>
          </Button>
          <Button asChild variant="outline" className="w-full rounded-xl">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <Github className="h-4 w-4" />
                View source (GitHub)
              </span>
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full rounded-xl">
            <Link href="/projects">All projects</Link>
          </Button>
        </div>

        <a
          href={PSEB_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>PSEB Registered Freelancer • 2025–2026</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </SheetContent>
    </Sheet>
  );
}
