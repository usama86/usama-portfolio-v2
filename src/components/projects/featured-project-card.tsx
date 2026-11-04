"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "./types";
import type { FeaturedProject } from "@/data/featured-projects";
import styles from "./featured-project-card.module.css";

export function FeaturedProjectCard({ project, presentation, onOpen }: {
  project: Project;
  presentation: FeaturedProject;
  onOpen?: () => void;
}) {
  const { flagship, image, title, caption, secondaryImage, secondaryCaption } = presentation;
  const href = `/projects/${project.slug}`;
  return (
    <article className={`${styles.card} ${flagship ? styles.flagship : styles.supporting}`} aria-labelledby={`${project.slug}-title`}>
      <Reveal className={styles.visual} delay={flagship ? 0.12 : 0.06}>
        <figure className={styles.mediaStack}>
          <Link href={href} className={styles.imageLink} aria-label={`Explore ${title} engineering case study`}>
            <Image src={image.src} alt={image.title} width={image.width} height={image.height}
              sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1199px) 50vw, 650px"
              className={styles.image} />
          </Link>
          <figcaption className={styles.caption}><span className={styles.captionDot} aria-hidden="true" />{caption}</figcaption>
          {secondaryImage && <>
            <Link href={href} className={`${styles.imageLink} ${styles.secondaryImageLink}`} aria-label={`Explore ${title} 3D architecture case study`}>
              <Image src={secondaryImage.src} alt={secondaryImage.title} width={secondaryImage.width} height={secondaryImage.height}
                sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1199px) 50vw, 650px" className={styles.image} />
            </Link>
            <figcaption className={styles.caption}><span className={styles.captionDot} aria-hidden="true" />{secondaryCaption}</figcaption>
          </>}
        </figure>
      </Reveal>
      <Reveal className={styles.content}>
        <div className={styles.eyebrow}>{flagship ? "Flagship project · 2026—Present" : presentation.category}</div>
        <div className={styles.heading}>
          <h4 id={`${project.slug}-title`}>{title}</h4>
          {flagship && <p className={styles.subtitle}>{presentation.category}</p>}
          <p className={styles.context}>{presentation.context}</p>
        </div>
        <p className={styles.summary}>{presentation.summary}</p>
        <div className={styles.chips}>{presentation.technologies.map(tech => <Badge key={tech} variant="outline" className="rounded-full border-border bg-secondary/50 text-xs font-normal">{tech}</Badge>)}</div>
        <div className={styles.actions}>
          <Button asChild className={styles.primary}>
            <Link href={href}>{flagship ? "Explore Engineering Case Study" : "Explore case study"}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          </Button>
          <div className={styles.secondary}>
            {flagship ? project.links?.webLink?.map(link => <a key={link.id} href={link.link} target="_blank" rel="noreferrer">{link.title}<ArrowUpRight size={14} aria-hidden="true" /></a>) : <>
              {onOpen && <button type="button" onClick={onOpen} aria-label={`Quick look at ${title}`}>Quick look<ArrowUpRight size={14} aria-hidden="true" /></button>}
              {project.links?.videoType === "loom" && <a href={project.links.videoUrl} target="_blank" rel="noreferrer"><Play size={13} aria-hidden="true" />Watch walkthrough</a>}
            </>}
          </div>
        </div>
      </Reveal>
    </article>
  );
}
