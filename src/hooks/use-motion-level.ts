"use client";

import * as React from "react";

export type MotionLevel = "full" | "balanced" | "lite";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    addEventListener?: (
      type: "change",
      listener: () => void,
    ) => void;
    removeEventListener?: (
      type: "change",
      listener: () => void,
    ) => void;
  };
};

const MOTION_LEVELS = new Set<MotionLevel>(["full", "balanced", "lite"]);
const MOTION_OVERRIDE_KEY = "portfolioMotionLevel";

function isMotionLevel(value: string | null): value is MotionLevel {
  return value !== null && MOTION_LEVELS.has(value as MotionLevel);
}

function getManualOverride(): MotionLevel | null {
  const params = new URLSearchParams(window.location.search);
  const urlOverride = params.get("motion");

  if (isMotionLevel(urlOverride)) {
    window.localStorage.setItem(MOTION_OVERRIDE_KEY, urlOverride);
    return urlOverride;
  }

  const storedOverride = window.localStorage.getItem(MOTION_OVERRIDE_KEY);
  return isMotionLevel(storedOverride) ? storedOverride : null;
}

function getMotionLevel(): MotionLevel {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion) return "lite";

  const nav = window.navigator as NavigatorWithHints;
  if (nav.connection?.saveData === true) return "lite";

  const deviceMemory = nav.deviceMemory;
  if (typeof deviceMemory === "number" && deviceMemory <= 2) return "lite";

  const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
  const isAndroid = /Android/i.test(window.navigator.userAgent);
  const hardwareConcurrency = window.navigator.hardwareConcurrency;

  const lowEndAndroidMobile =
    isMobileViewport &&
    isAndroid &&
    ((typeof deviceMemory === "number" && deviceMemory <= 4) ||
      (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4));

  if (lowEndAndroidMobile) return "lite";

  const override = getManualOverride();
  if (override) return override;

  return isMobileViewport ? "balanced" : "full";
}

function subscribeMediaQuery(query: MediaQueryList, listener: () => void) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

export function useMotionLevel(): MotionLevel {
  const [motionLevel, setMotionLevel] = React.useState<MotionLevel>("full");

  React.useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const nav = window.navigator as NavigatorWithHints;

    const updateMotionLevel = () => setMotionLevel(getMotionLevel());

    updateMotionLevel();

    const cleanups = [
      subscribeMediaQuery(reducedMotionQuery, updateMotionLevel),
      subscribeMediaQuery(mobileQuery, updateMotionLevel),
    ];

    nav.connection?.addEventListener?.("change", updateMotionLevel);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      nav.connection?.removeEventListener?.("change", updateMotionLevel);
    };
  }, []);

  return motionLevel;
}
