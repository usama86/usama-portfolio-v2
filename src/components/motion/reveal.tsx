"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useMotionLevel } from "@/hooks/use-motion-level";

export const revealEase = [0.22, 1, 0.36, 1] as const;

/** Content stays readable before hydration and even when outside the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const level = useMotionLevel();
  const staticMode = level === "lite";
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: inView || staticMode ? 1 : 0.9,
        y: inView || staticMode ? 0 : level === "full" ? 22 : 5,
      }}
      transition={{
        duration: staticMode ? 0 : level === "balanced" ? 0.28 : 0.64,
        delay: inView && level === "full" ? Math.min(delay, 0.24) : 0,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}
