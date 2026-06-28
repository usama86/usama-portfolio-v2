"use client";

import {
  AudioWaveform,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Car,
  Clapperboard,
  ClipboardCheck,
  Component,
  Dumbbell,
  Globe,
  Home,
  Layers,
  Package,
  Search,
  ShieldCheck,
  Store,
  Truck,
  Utensils,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProjectIconConfig = {
  Icon: LucideIcon;
  tint?: string;
};

const projectIconMap: Record<string, ProjectIconConfig> = {
  "talentflow-enterprise-recruiting-platform": {
    Icon: BriefcaseBusiness,
    tint: "bg-emerald-500/[0.07] text-slate-800 dark:text-slate-100",
  },
  "cleon-ai-voice-ordering": {
    Icon: AudioWaveform,
    tint: "bg-cyan-500/[0.06]",
  },
  "query-builder": {
    Icon: Blocks,
    tint: "bg-violet-500/[0.06]",
  },
  "graana-real-estate-platform": {
    Icon: Building2,
    tint: "bg-sky-500/[0.06]",
  },
  "zdp-ui-components-library": {
    Icon: Component,
    tint: "bg-indigo-500/[0.06]",
  },
  "aqers-property-search": {
    Icon: Search,
    tint: "bg-teal-500/[0.06]",
  },
  "yamar-company-spa": {
    Icon: Globe,
    tint: "bg-blue-500/[0.06]",
  },
  "bulky-delivery-platform": {
    Icon: Truck,
    tint: "bg-amber-500/[0.06]",
  },
  sentratainment: {
    Icon: Clapperboard,
    tint: "bg-rose-500/[0.06]",
  },
  "elixir-tango-plus": {
    Icon: Layers,
    tint: "bg-fuchsia-500/[0.06]",
  },
  "artbot-youtube-like-platform": {
    Icon: Video,
    tint: "bg-red-500/[0.06]",
  },
  "jobtask-service-platform": {
    Icon: ClipboardCheck,
    tint: "bg-lime-500/[0.06]",
  },
  "dmv-ez": {
    Icon: Car,
    tint: "bg-blue-500/[0.06]",
  },
  "atomic-vault-admin": {
    Icon: ShieldCheck,
    tint: "bg-zinc-500/[0.08]",
  },
  "store-walk-pwa": {
    Icon: Store,
    tint: "bg-orange-500/[0.06]",
  },
  "tyft-food-truck": {
    Icon: Utensils,
    tint: "bg-yellow-500/[0.07]",
  },
  "nomadiq-resident-operations": {
    Icon: Home,
    tint: "bg-green-500/[0.06]",
  },
  "fitness-block-app": {
    Icon: Dumbbell,
    tint: "bg-pink-500/[0.06]",
  },
};

type ProjectIconProps = {
  slug: string;
  title: string;
  className?: string;
};

export function ProjectIcon({ slug, title, className }: ProjectIconProps) {
  const { Icon, tint } = projectIconMap[slug] ?? {
    Icon: Package,
    tint: "bg-muted",
  };

  return (
    <div
      className={[
        "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-black/10 bg-white/75 text-foreground/75 shadow-sm",
        "dark:border-white/10 dark:bg-white/[0.055] dark:text-white/80",
        tint ?? "",
        className ?? "",
      ].join(" ")}
      aria-hidden="true"
      title={title}
    >
      <Icon className="h-5 w-5 stroke-[1.8]" />
    </div>
  );
}
