"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./toc-nav.module.css";

type TocItem = { id: string; label: string };

type Props = {
  items: TocItem[];
  className?: string;
};

export function TocNav({ items, className }: Props) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");
  const pendingClick = React.useRef<{ id: string; until: number } | null>(null);
  const ids = items.map((item) => item.id).join("|");

  React.useEffect(() => {
    const sectionIds = ids.split("|").filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const headerHeight = document.querySelector("header.sticky")?.getBoundingClientRect().height ?? 76;
      const readingLine = headerHeight + Math.min(110, window.innerHeight * 0.14);
      let current = sectionIds[0] ?? "";

      // The last section reached by the reading line remains active through tall sections.
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sectionIds.at(-1) ?? current;
      }
      const pending = pendingClick.current;
      if (pending) {
        const target = document.getElementById(pending.id);
        const targetTop = target?.getBoundingClientRect().top ?? 0;
        const anchorTop = target ? Number.parseFloat(getComputedStyle(target).scrollMarginTop) || headerHeight + 20 : 0;
        if (performance.now() < pending.until && target && Math.abs(targetTop - anchorTop) > 20) {
          current = pending.id;
        } else {
          pendingClick.current = null;
        }
      }
      setActiveId((previous) => previous === current ? previous : current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const onHistoryChange = () => {
      pendingClick.current = null;
      schedule();
    };
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("pageshow", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("popstate", onHistoryChange);
      window.removeEventListener("pageshow", schedule);
    };
  }, [ids]);

  return <nav aria-label="Case study contents" className={cn("space-y-1", className)}>
    {items.map((item) => <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={activeId === item.id ? "location" : undefined}
      onClick={() => {
        pendingClick.current = { id: item.id, until: performance.now() + 1400 };
        setActiveId(item.id);
        document.getElementById(item.id)?.querySelector<HTMLElement>("h2, h3")?.focus({ preventScroll: true });
      }}
      className={cn("flex min-h-11 shrink-0 items-center text-sm transition-colors rounded-lg px-2 py-1", styles.link)}
    >{item.label}</a>)}
  </nav>;
}
