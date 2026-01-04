"use client";

import * as React from "react";

type YouTubeEmbedProps = {
  urlOrId: string;
  aspect?: "9/16" | "16/9";
  className?: string;
  title?: string;
};

function extractYouTubeId(urlOrId: string): string {
  const v = urlOrId.trim();

  // already an id
  if (/^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

  try {
    const u = new URL(v);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return id;
    }

    // youtube.com/shorts/<id>
    if (u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.replace("/shorts/", "").split("/")[0];
      if (id) return id;
    }

    // youtube.com/watch?v=<id>
    const id = u.searchParams.get("v");
    if (id) return id;
  } catch {
    // ignore
  }

  const m = v.match(/[a-zA-Z0-9_-]{11}/);
  return m?.[0] ?? v;
}

export function YouTubeEmbed({
  urlOrId,
  aspect = "9/16",
  className,
  title = "YouTube video",
}: YouTubeEmbedProps) {
  const id = React.useMemo(() => extractYouTubeId(urlOrId), [urlOrId]);

  // Use standard youtube embed. (nocookie sometimes behaves odd with strict settings)
  const src = React.useMemo(() => {
    const params = new URLSearchParams({
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }, [id]);

  const aspectClass = aspect === "16/9" ? "aspect-video" : "aspect-[9/16]";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20",
        className ?? "",
      ].join(" ")}
    >
      {/* Always render iframe (no “ready gate”) */}
      <iframe
        className={["w-full", aspectClass, "border-0"].join(" ")}
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
