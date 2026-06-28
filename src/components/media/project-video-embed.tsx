"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";

type ProjectVideoEmbedProps = {
  src: string;
  title: string;
  provider?: "loom" | "google-drive" | "external";
  allow?: string;
  className?: string;
};

const providerLabel: Record<NonNullable<ProjectVideoEmbedProps["provider"]>, string> = {
  loom: "Loom walkthrough",
  "google-drive": "Video walkthrough",
  external: "Project video",
};

export function ProjectVideoEmbed({
  src,
  title,
  provider = "external",
  allow = "fullscreen; picture-in-picture; clipboard-write; encrypted-media",
  className,
}: ProjectVideoEmbedProps) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div
      className={[
        "relative aspect-video w-full min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      {!loaded ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[linear-gradient(110deg,hsl(var(--muted)),hsl(var(--background)),hsl(var(--muted)))] bg-[length:220%_100%] animate-pulse motion-reduce:animate-none">
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" />
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                Loading video...
              </p>
              <p className="text-xs">{providerLabel[provider]}</p>
            </div>
          </div>
        </div>
      ) : null}

      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow={allow}
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
