"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./intro-video-dialog.module.css";
import { ExternalLink, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YouTubeEmbed } from "./youtube-embed";

const INTRO_URL = "https://www.youtube.com/shorts/CtqX_YgKrF4";

export function IntroVideoDialog() {
  const [open, setOpen] = useState(false);
  const [posterAvailable, setPosterAvailable] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={styles.preview}
          aria-label="Watch my 73-second intro"
        >
          <span className={styles.poster}>
            <span className={styles.fallback} aria-hidden="true">
              MU
            </span>
            {posterAvailable ? (
              <Image
                src="/images/intro-youtube.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 640px, 384px"
                preload
                className={styles.posterImage}
                onError={() => setPosterAvailable(false)}
              />
            ) : null}
            <span className={styles.duration}>01:13</span>
            <span className={styles.play} aria-hidden="true">
              <Play className="size-5 fill-current" />
            </span>
          </span>
          <span className={styles.caption}>
            <span className={styles.captionTitle}>Muhammad Usama</span>
            <span className={styles.captionAction}>
              Watch my 73-second intro <span aria-hidden="true">↗</span>
            </span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          titleRef.current?.focus({ preventScroll: true });
        }}
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-card p-5 sm:max-w-[420px]"
      >
        <DialogHeader className="pr-8 text-left">
          <DialogTitle ref={titleRef} tabIndex={-1}>
            A quick introduction
          </DialogTitle>
          <DialogDescription>
            73 seconds on what I build and how I work.
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <div className="mx-auto w-full max-w-[min(100%,calc((100dvh-13rem)*0.5625))]">
            <YouTubeEmbed
              urlOrId={INTRO_URL}
              aspect="9/16"
              title="Muhammad Usama — Intro"
            />
          </div>
        ) : null}
        <a
          href={INTRO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm text-primary underline underline-offset-4"
        >
          Open on YouTube{" "}
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </DialogContent>
    </Dialog>
  );
}
