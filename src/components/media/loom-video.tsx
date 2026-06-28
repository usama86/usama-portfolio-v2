"use client";

import { ProjectVideoEmbed } from "@/components/media/project-video-embed";

type LoomVideoProps = {
  videoUrl: string;
  title?: string;
  className?: string;
};

function getLoomEmbedUrl(videoUrl: string) {
  const match = videoUrl.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  const id = match?.[1];

  if (!id) return videoUrl;

  return `https://www.loom.com/embed/${id}`;
}

export function LoomVideo({
  videoUrl,
  title = "Project Loom walkthrough",
  className,
}: LoomVideoProps) {
  return (
    <ProjectVideoEmbed
      src={getLoomEmbedUrl(videoUrl)}
      title={title}
      provider="loom"
      className={className}
    />
  );
}
