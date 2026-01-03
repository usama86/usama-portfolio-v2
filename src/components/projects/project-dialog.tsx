"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import type { Project } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  project: Project | null;
  onViewCaseStudy?: (slug: string) => void; // we’ll wire this in Step 4
};

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onViewCaseStudy,
}: Props) {
  if (!project) return null;

  const links = project.links;
  const hasLoom = !!links?.videoUrl && links?.videoType === "loom";
  const hasDrive = !!links?.videoUrl && links?.videoType === "googleDrive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            {project.title}
          </DialogTitle>

          {(project.company || project.timePeriod) && (
            <div className="text-sm text-muted-foreground">
              {project.company ? <span>{project.company}</span> : null}
              {project.timePeriod ? (
                <span>
                  {project.company ? " • " : ""}
                  {project.timePeriod}
                </span>
              ) : null}
            </div>
          )}
        </DialogHeader>

        <div className="space-y-5">
          {/* Description */}
          <div className="space-y-2">
            {project.descriptionDetail.map((t, idx) => (
              <p
                key={`${t}-${idx}`}
                className="text-sm md:text-base text-foreground/90"
              >
                • {t}
              </p>
            ))}
          </div>

          {/* Tech */}
          {!!project.technologies?.length && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {/* Media */}
          <div className="space-y-4">
            {(hasLoom || hasDrive) && (
              <div className="glass rounded-2xl p-3">
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  {hasLoom ? (
                    <LoomVideo
                      videoUrl={links!.videoUrl!}
                      className="h-full w-full"
                    />
                  ) : null}
                  {hasDrive ? (
                    <GoogleDriveVideo
                      fileId={links!.videoUrl!}
                      height={420}
                      className="h-full w-full"
                    />
                  ) : null}
                </div>
              </div>
            )}

            {!!project.images?.length && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.images.map((src, idx) => (
                  <img
                    key={`${src}-${idx}`}
                    src={src.src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full rounded-xl border border-border/60 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          {(links?.webLink?.length ||
            links?.github?.length ||
            onViewCaseStudy) && (
            <div className="flex flex-wrap items-center gap-2">
              {onViewCaseStudy ? (
                <Button size="sm" onClick={() => onViewCaseStudy(project.slug)}>
                  View case study
                </Button>
              ) : null}

              {links?.webLink?.map((l) => (
                <Button asChild key={l.id} variant="outline" size="sm">
                  <a href={l.link} target="_blank" rel="noreferrer">
                    {l.title}
                  </a>
                </Button>
              ))}

              {links?.github?.map((l) => (
                <Button asChild key={l.id} variant="outline" size="sm">
                  <a href={l.link} target="_blank" rel="noreferrer">
                    {l.title}
                  </a>
                </Button>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
