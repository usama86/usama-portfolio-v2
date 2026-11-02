"use client";

import { useRef, useState } from "react";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex min-h-11 items-center gap-3 rounded-xl px-1 text-sm text-foreground transition-colors hover:text-primary"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10">
            <Play className="size-3.5 fill-current" aria-hidden="true" />
          </span>
          Watch my 73-second intro
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
