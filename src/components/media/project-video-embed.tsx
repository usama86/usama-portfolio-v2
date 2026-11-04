"use client";

import * as React from "react";
import { LoaderCircle, Play } from "lucide-react";

type ProjectVideoEmbedProps = {
  src: string;
  title: string;
  provider?: "loom" | "google-drive" | "external";
  allow?: string;
  className?: string;
};

const providerLabel: Record<
  NonNullable<ProjectVideoEmbedProps["provider"]>,
  string
> = {
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
  const [activated, setActivated] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
    setActivated(false);
  }, [src]);

  return (
    <div
      className={[
        "relative aspect-video w-full min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      {!activated ? (
        <button
          type="button"
          className="absolute inset-0 grid h-full w-full place-items-center bg-muted text-foreground transition-colors hover:bg-muted/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary"
          onClick={() => setActivated(true)}
          aria-label={`Play ${title}`}
        >
          <span className="flex flex-col items-center gap-3 text-sm font-medium">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-border bg-background/85 shadow-sm"><Play className="h-6 w-6 fill-current" aria-hidden="true" /></span>
            Play video walkthrough
          </span>
        </button>
      ) : !loaded ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-muted">
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

      {activated && <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow={allow}
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />}
    </div>
  );
}
