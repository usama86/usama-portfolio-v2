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
};

const projectIconMap: Record<string, ProjectIconConfig> = {
  "talentflow-enterprise-recruiting-platform": {
    Icon: BriefcaseBusiness,
  },
  "cleon-ai-voice-ordering": {
    Icon: AudioWaveform,
  },
  "query-builder": {
    Icon: Blocks,
  },
  "graana-real-estate-platform": {
    Icon: Building2,
  },
  "zdp-ui-components-library": {
    Icon: Component,
  },
  "aqers-property-search": {
    Icon: Search,
  },
  "yamar-company-spa": {
    Icon: Globe,
  },
  "bulky-delivery-platform": {
    Icon: Truck,
  },
  sentratainment: {
    Icon: Clapperboard,
  },
  "elixir-tango-plus": {
    Icon: Layers,
  },
  "artbot-youtube-like-platform": {
    Icon: Video,
  },
  "jobtask-service-platform": {
    Icon: ClipboardCheck,
  },
  "dmv-ez": {
    Icon: Car,
  },
  "atomic-vault-admin": {
    Icon: ShieldCheck,
  },
  "store-walk-pwa": {
    Icon: Store,
  },
  "tyft-food-truck": {
    Icon: Utensils,
  },
  "nomadiq-resident-operations": {
    Icon: Home,
  },
  "fitness-block-app": {
    Icon: Dumbbell,
  },
};

type ProjectIconProps = {
  slug: string;
  title: string;
  className?: string;
};

export function ProjectIcon({ slug, title, className }: ProjectIconProps) {
  const { Icon } = projectIconMap[slug] ?? {
    Icon: Package,
  };

  return (
    <div
      className={[
        "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-secondary text-primary",
        className ?? "",
      ].join(" ")}
      aria-hidden="true"
      title={title}
    >
      <Icon className="h-5 w-5 stroke-[1.8]" />
    </div>
  );
}
