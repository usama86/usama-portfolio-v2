"use client";

import * as React from "react";
import { useMotionLevel } from "@/hooks/use-motion-level";

export function MotionLevelAttribute() {
  const motionLevel = useMotionLevel();

  React.useEffect(() => {
    document.documentElement.dataset.motionLevel = motionLevel;
    return () => {
      delete document.documentElement.dataset.motionLevel;
    };
  }, [motionLevel]);

  return null;
}
