"use client";

import * as React from "react";

export type MotionLevel = "full" | "balanced" | "lite";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    addEventListener?: (type: "change", listener: () => void) => void;
    removeEventListener?: (type: "change", listener: () => void) => void;
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
    try {
      window.localStorage.setItem(MOTION_OVERRIDE_KEY, urlOverride);
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
    return urlOverride;
  }

  try {
    const storedOverride = window.localStorage.getItem(MOTION_OVERRIDE_KEY);
    return isMotionLevel(storedOverride) ? storedOverride : null;
  } catch {
    return null;
  }
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

let currentLevel: MotionLevel = "lite";
const listeners = new Set<() => void>();
let stopListening: (() => void) | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    const update = () => {
      const next = getMotionLevel();
      if (next === currentLevel) return;
      currentLevel = next;
      listeners.forEach((notify) => notify());
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const nav = window.navigator as NavigatorWithHints;
    const cleanups = [
      subscribeMediaQuery(reduced, update),
      subscribeMediaQuery(mobile, update),
    ];
    nav.connection?.addEventListener?.("change", update);
    window.addEventListener("storage", update);
    window.addEventListener("popstate", update);
    stopListening = () => {
      cleanups.forEach((cleanup) => cleanup());
      nav.connection?.removeEventListener?.("change", update);
      window.removeEventListener("storage", update);
      window.removeEventListener("popstate", update);
    };
    update();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      stopListening?.();
      stopListening = undefined;
    }
  };
}

const getSnapshot = () => currentLevel;
const getServerSnapshot = (): MotionLevel => "lite";

export function useMotionLevel(): MotionLevel {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
