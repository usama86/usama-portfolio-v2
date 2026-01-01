"use client";

import * as React from "react";
import { oembed } from "@loomhq/loom-embed";
import { Skeleton } from "@/components/ui/skeleton";

type LoomVideoProps = {
  videoUrl: string;
  className?: string;
};

export function LoomVideo({ videoUrl, className }: LoomVideoProps) {
  const [html, setHtml] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      try {
        const res = await oembed(videoUrl);
        if (mounted) setHtml(res?.html ?? "");
      } catch (e) {
        if (mounted) setHtml("");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [videoUrl]);

  if (loading) {
    return (
      <div className={className}>
        <Skeleton className="h-[260px] w-full rounded-xl" />
      </div>
    );
  }

  if (!html) {
    return (
      <div
        className={[
          "rounded-xl border bg-background/40 p-4 text-sm text-muted-foreground",
          className ?? "",
        ].join(" ")}
      >
        Video unavailable.
      </div>
    );
  }

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border bg-background/40",
        // ensure embed is responsive-ish
        "[&>iframe]:w-full [&>iframe]:min-h-[260px] [&>iframe]:border-0",
        className ?? "",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
