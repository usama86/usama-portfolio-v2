"use client";

import * as React from "react";
import { useMotionLevel } from "@/hooks/use-motion-level";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

type Props = {
  items: TocItem[];
  className?: string;
};

export function TocNav({ items, className }: Props) {
  const motionLevel = useMotionLevel();
  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (!el) return;

    // update hash without instant jump
    history.replaceState(null, "", `#${id}`);

    // smooth animated scroll
    el.scrollIntoView({
      behavior: motionLevel === "lite" ? "instant" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Case study contents"
      className={cn("space-y-1", className)}
    >
      {items.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          onClick={onClick(t.id)}
          className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1 hover:bg-muted"
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}
