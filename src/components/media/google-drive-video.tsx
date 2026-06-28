import { ProjectVideoEmbed } from "@/components/media/project-video-embed";

type GoogleDriveVideoProps = {
  fileId: string; // google drive file id
  title?: string;
  className?: string;
};

export function GoogleDriveVideo({
  fileId,
  title = "Project Google Drive video",
  className,
}: GoogleDriveVideoProps) {
  const src = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <ProjectVideoEmbed
      src={src}
      title={title}
      provider="google-drive"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      className={className}
    />
  );
}
