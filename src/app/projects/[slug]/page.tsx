import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { featuredProjects } from "@/data/featured-projects";
import { SITE_ORIGIN } from "@/lib/site";
import { ImageCredit } from "@/components/media/image-credit";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/data/get-project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import { GalleryCarousel } from "@/components/media/gallery-carousel";
import { TocNav } from "@/components/projects/toc-nav";
import { EngineeringCaseStudy } from "@/components/projects/engineering-case-study";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const title = `${project.cardTitle ?? project.title} — ${project.engineeringStory ? "Engineering Case Study" : "Project Case Study"} | Muhammad Usama`;
  const description = project.seoDescription ?? project.descriptionDetail[0];
  const url = `${SITE_ORIGIN}/projects/${project.slug}`;
  const presentation = featuredProjects.find(item => item.slug === project.slug);
  const image = presentation?.image ?? project.images[0];
  return {
    title, description, alternates: { canonical: url },
    openGraph: {
      title, description, url, type: "article",
      images: image ? [{ url: `${SITE_ORIGIN}${image.src}`, alt: image.title }] : [],
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [`${SITE_ORIGIN}${image.src}`] : [] },
  };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-shell scroll-mt-24 space-y-4">
      <h2 tabIndex={-1} className="text-xl md:text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="text-sm md:text-base text-foreground/85 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) notFound();
  if (project.engineeringStory) return <EngineeringCaseStudy project={project} story={project.engineeringStory} />;

  const links = project.links;
  const flagship = featuredProjects.find(item => item.slug === slug && item.flagship);
  const hasLoom = !!links?.videoUrl && links?.videoType === "loom";
  const hasDrive = !!links?.videoUrl && links?.videoType === "googleDrive";

  const bullets = project.descriptionDetail ?? [];
  const mediaImages = project.mediaImages?.length
    ? project.mediaImages
    : project.images;

  const toc = [
    { id: "overview", label: "Overview" },
    ...(flagship?.secondaryImage ? [
      { id: "archwalk-360", label: "ArchWalk 360" },
      { id: "architects-3d", label: "Architects 3D" },
    ] : []),
    ...(project.caseStudy?.problem?.length ? [{ id: "problem", label: "Problem" }] : []),
    ...(project.caseStudy?.approach?.length ? [{ id: "approach", label: "Approach" }] : []),
    ...(project.caseStudy?.architecture?.length ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(project.caseStudy?.challenges?.length ? [{ id: "challenges", label: "Challenges" }] : []),
    ...(project.caseStudy?.outcome?.length ? [{ id: "outcome", label: "Outcome" }] : []),
    { id: "tech", label: "Tech stack" },
    { id: "media", label: "Demo / Media" },
  ];

  const cs = project.caseStudy;

  return (
    <div className="space-y-8 pt-10 md:pt-16">
      {/* Back */}
      <div>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/projects">← Back to projects</Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          {project.title}
        </h1>

        {project.role && <p className="text-primary text-sm font-medium">{project.role}</p>}
        {(project.company || project.timePeriod) && (
          <p className="text-sm md:text-base text-muted-foreground">
            {project.company ?? ""}
            {project.company && project.timePeriod ? " • " : ""}
            {project.timePeriod ?? ""}
          </p>
        )}

        {!!project.technologies?.length && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-full border-border/60 bg-secondary/50"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}

        {/* External links */}
        {(links?.webLink?.length || links?.github?.length) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {links?.webLink?.map((l) => (
              <Button
                asChild
                key={l.id}
                variant="secondary"
                className="rounded-xl"
              >
                <a href={l.link} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </Button>
            ))}
            {links?.github?.map((l) => (
              <Button
                asChild
                key={l.id}
                variant="outline"
                className="rounded-xl"
              >
                <a href={l.link} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>

      {flagship?.secondaryImage && <div className="grid gap-4 lg:grid-cols-2">
        <section id="archwalk-360" className="glass scroll-mt-24 rounded-2xl p-3 sm:p-5">
          <h2 tabIndex={-1} className="mb-3 text-lg font-semibold">ArchWalk 360 <span className="ml-2 text-xs font-normal text-muted-foreground">Public product</span></h2>
          <figure>
            <Image src={flagship.image.src} alt={flagship.image.title} width={flagship.image.width} height={flagship.image.height} sizes="(max-width: 1023px) 100vw, 50vw" preload className="w-full h-auto rounded-xl" />
            <figcaption className="pt-3 space-y-1 text-xs text-muted-foreground"><p>{flagship.caption} · Reference navigation, not connected rooms.</p><ImageCredit credit={project.mediaImages?.[0]?.credit} /></figcaption>
          </figure>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">A panorama runtime maps yaw and pitch to view direction, then projects scene links, Info Points, and floor-plan context into the visitor’s view. Creator drafts publish to a separate read-only Viewer and embed surface.</p>
        </section>
        <section id="architects-3d" className="glass scroll-mt-24 rounded-2xl p-3 sm:p-5">
          <h2 tabIndex={-1} className="mb-3 text-lg font-semibold">ArchWalk for Architects <span className="ml-2 text-xs font-normal text-muted-foreground">Publicly Coming Soon</span></h2>
          <figure>
            <Image src={flagship.secondaryImage.src} alt={flagship.secondaryImage.title} width={flagship.secondaryImage.width} height={flagship.secondaryImage.height} sizes="(max-width: 1023px) 100vw, 50vw" className="w-full h-auto rounded-xl" />
            <figcaption className="pt-3 space-y-1 text-xs text-muted-foreground"><p>{flagship.secondaryCaption}. Actual ArchWalk runtime, Orbit mode, CC0 Modern House reference GLB. Walk mode is not demonstrated by this still.</p><ImageCredit credit={project.mediaImages?.[1]?.credit} /></figcaption>
          </figure>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">SketchUp-exported GLBs enter a multipart upload and preparation pipeline. GLTFLoader renders real meshes for browser review; orbit and camera controls work on model geometry. Walk navigation is gated by collision preparation and a starting point. Review flows carry spatial comments and saved viewpoints.</p>
        </section>
      </div>}

      {flagship && !flagship.secondaryImage && <figure className="glass rounded-2xl p-3 sm:p-5">
        <Image src={flagship.image.src} alt={flagship.image.title} width={1440} height={900} sizes="(max-width: 1248px) 100vw, 1152px" preload className="w-full h-auto rounded-xl" />
        <figcaption className="pt-3 space-y-1 text-muted-foreground">
          <p className="text-xs">{flagship.caption} · Reference navigation, not connected rooms.</p>
          <ImageCredit credit={project.mediaImages?.[0]?.credit} />
        </figcaption>
      </figure>}

      {/* Layout: sticky TOC + content */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
        {/* TOC */}
        <aside className="lg:sticky lg:top-24 space-y-3">
          <div className="glass rounded-2xl p-4">
            <div className="text-sm font-semibold mb-2">On this page</div>
            <TocNav items={toc} className="flex gap-1 overflow-x-auto whitespace-nowrap pb-1 lg:block lg:overflow-visible lg:whitespace-normal" />
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 space-y-10">
          <Section id="overview" title="Overview">
            <p>{bullets[0] ?? "Case study overview coming soon."}</p>
          </Section>

          {cs?.problem?.length ? (
            <Section id="problem" title="Problem">
              <ul className="list-disc pl-5 space-y-2">
                {cs.problem.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.approach?.length ? (
            <Section id="approach" title="Approach">
              <ul className="list-disc pl-5 space-y-2">
                {cs.approach.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.architecture?.length ? (
            <Section id="architecture" title="Architecture">
              <ul className="list-disc pl-5 space-y-2">
                {cs.architecture.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.challenges?.length ? (
            <Section id="challenges" title="Challenges">
              <ul className="list-disc pl-5 space-y-2">
                {cs.challenges.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.outcome?.length ? (
            <Section id="outcome" title="Outcome">
              <ul className="list-disc pl-5 space-y-2">
                {cs.outcome.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section
            id="highlights"
            title={project.highlightsTitle ?? "Highlights"}
          >
            <ul className="list-disc pl-5 space-y-2">
              {bullets.slice(1).map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section id="tech" title="Tech stack">
            <p>
              {project.technologies?.length
                ? project.technologies.join(" • ")
                : "Tech stack not added yet."}
            </p>
          </Section>

          <Section id="media" title="Demo / Media">
            <div className="space-y-4">
              {(hasLoom || hasDrive) && (
                <div className="glass rounded-2xl p-3">
                  {hasLoom ? (
                    <LoomVideo
                      videoUrl={links!.videoUrl!}
                      title={`${project.title} demo walkthrough`}
                    />
                  ) : null}
                  {hasDrive ? (
                    <GoogleDriveVideo
                      fileId={links!.videoUrl!}
                      title={`${project.title} demo walkthrough`}
                    />
                  ) : null}
                </div>
              )}

              {mediaImages?.length ? (
                <GalleryCarousel images={mediaImages} />
              ) : null}

              {!hasLoom && !hasDrive && !mediaImages?.length ? (
                <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">
                  No media attached for this project yet.
                </div>
              ) : null}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
