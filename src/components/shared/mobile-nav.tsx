"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

type Props = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: Props) {
  const [open, setOpen] = React.useState(false);

  function handleNavClick(href: string) {
    setOpen(false);
    // Wait a tick so Sheet closes before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.();
    }, 50);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[360px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Muhammad Usama
            <div className="text-xs text-muted-foreground font-normal mt-1">
              Senior Software Engineer
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {nav.map((i) => (
            <button
              key={i.href}
              type="button"
              onClick={() => handleNavClick(i.href)}
              className="w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-muted transition-colors"
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
            <Link href="/projects">All projects</Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          PSEB Registered Freelancer • 2025–2026
        </p>
      </SheetContent>
    </Sheet>
  );
}
