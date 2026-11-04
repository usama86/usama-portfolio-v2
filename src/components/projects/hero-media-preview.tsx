"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import styles from "./hero-media-preview.module.css";

type Preview = { aspectRatio: "3 / 2" | "4 / 3"; objectPosition: string; alt: string };

export function HeroMediaPreview({ src, title, width, height, preview }: { src: string; title: string; width: number; height: number; preview: Preview }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return <>
    <button ref={triggerRef} type="button" className={styles.trigger} onClick={() => setOpen(true)}>
      <span className={styles.topline}><span>Application preview</span><span className={styles.action}>View full screenshot <ArrowUpRight size={14} aria-hidden="true" /></span></span>
      <span className={styles.viewport} style={{ aspectRatio: preview.aspectRatio }}>
        <Image src={src} alt={preview.alt} fill priority sizes="(max-width: 899px) calc(100vw - 64px), (max-width: 1440px) 44vw, 590px" className={styles.crop} style={{ objectPosition: preview.objectPosition }} />
      </span>
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent fullscreen showCloseButton={false} className={styles.dialog} onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }}>
        <DialogTitle className="sr-only">Full screenshot: {title}</DialogTitle>
        <DialogDescription className="sr-only">The complete original application screenshot. Press Escape or use Close to return to the case study.</DialogDescription>
        <div className={styles.dialogBar}><span>Full original screenshot</span><DialogClose asChild><button type="button" className={styles.close} aria-label="Close full screenshot"><X size={20} aria-hidden="true" /></button></DialogClose></div>
        <div className={styles.fullImage}><Image src={src} alt={title} width={width} height={height} sizes="100vw" className={styles.contain} style={{ maxWidth: width }} /></div>
      </DialogContent>
    </Dialog>
  </>;
}
