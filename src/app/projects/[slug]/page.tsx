import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/data/get-project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import { GalleryCarousel } from "@/components/media/gallery-carousel";
import { TocNav } from "@/components/projects/toc-nav";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
    <section id={id} className="scroll-mt-24 space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
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

  const links = project.links;
  const hasLoom = !!links?.videoUrl && links?.videoType === "loom";
  const hasDrive = !!links?.videoUrl && links?.videoType === "googleDrive";

  const bullets = project.descriptionDetail ?? [];

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "outcome", label: "Outcome" },
    { id: "tech", label: "Tech stack" },
    { id: "media", label: "Demo / Media" },
  ];

  const cs = project.caseStudy;

  return (
    <div className="space-y-8">
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
                className="rounded-full border-border/60 bg-black/10"
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

      {/* Layout: sticky TOC + content */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
        {/* TOC */}
        <aside className="lg:sticky lg:top-24 space-y-3">
          <div className="glass rounded-2xl p-4">
            <div className="text-sm font-semibold mb-2">On this page</div>
            <TocNav items={toc} />
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

          <Section id="highlights" title="Highlights">
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

              {project.images?.length ? (
                <GalleryCarousel images={project.images} />
              ) : null}

              {!hasLoom && !hasDrive && !project.images?.length ? (
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
