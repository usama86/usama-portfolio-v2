import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { EngineeringStory, Project, ProjectImage } from "./types";
import { GalleryCarousel } from "@/components/media/gallery-carousel";
import { ImageCredit } from "@/components/media/image-credit";
import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import { Reveal } from "@/components/motion/reveal";
import { TocNav } from "./toc-nav";
import styles from "./engineering-case-study.module.css";

function StorySection({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return <Reveal><section id={id} className={styles.section}>
    <div className={styles.sectionHeading}><p className={styles.kicker}>{kicker}</p><h2>{title}</h2></div>
    {children}
  </section></Reveal>;
}

function MediaFigure({ image, width, height, caption, priority = false }: { image: ProjectImage; width: number; height: number; caption: string; priority?: boolean }) {
  return <figure className={styles.figure}>
    <div className={styles.imageFrame}><Image src={image.src} alt={image.title} width={width} height={height} sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 1100px) 90vw, 1000px" priority={priority} className={styles.image} /></div>
    <figcaption className={styles.figcaption}><p>{caption}</p><ImageCredit credit={image.credit} /></figcaption>
  </figure>;
}

function Architecture({ architecture }: { architecture: EngineeringStory["architecture"] }) {
  return <div className={styles.architecture} aria-label={architecture.title}>
    <div className={styles.diagramIntro}><h3>{architecture.title}</h3><p>{architecture.description}</p></div>
    {architecture.lanes?.map(lane => <div key={lane.title} className={styles.lane}>
      <h4>{lane.title}</h4>
      <ol className={styles.flow} aria-label={`${lane.title} logical path`}>
        {lane.nodes.map((node, index) => <li key={node.name} className={styles.flowNode}>
          <span className={styles.nodeIndex}>{String(index + 1).padStart(2, "0")}</span>
          <strong>{node.name}</strong><span>{node.detail}</span>
        </li>)}
      </ol>
    </div>)}
    {architecture.hub && <div className={styles.hubDiagram}>
      <div className={styles.hubCore}><span className={styles.diagramLabel}>Shared relationship</span><h4>{architecture.hub.name}</h4><p>{architecture.hub.detail}</p></div>
      <ul className={styles.hubConnections}>{architecture.hub.connections.map(connection => <li key={connection.name}><strong>{connection.name}</strong><span>{connection.detail}</span></li>)}</ul>
    </div>}
    <p className={styles.diagramFootnote}>{architecture.footnote}</p>
  </div>;
}

const deliveryLabel = { public: "Public", implemented: "Implemented", foundation: "Foundation / boundary" } as const;

export function EngineeringCaseStudy({ project, story }: { project: Project; story: EngineeringStory }) {
  const media = project.mediaImages?.length ? project.mediaImages : project.images;
  const lead = story.leadMedia ? media[story.leadMedia.mediaIndex] : undefined;
  const hasLoom = project.links?.videoType === "loom" && !!project.links.videoUrl;
  const hasDrive = project.links?.videoType === "googleDrive" && !!project.links.videoUrl;
  const toc = [
    ...(story.visualMoments?.slice(0, 1).map(moment => ({ id: moment.id, label: moment.title })) ?? []),
    { id: "at-a-glance", label: "At a glance" },
    ...(story.visualMoments?.slice(1).map(moment => ({ id: moment.id, label: moment.title })) ?? []),
    { id: "problem", label: "The problem" },
    { id: "architecture", label: "Architecture" },
    { id: "decisions", label: "Decisions" },
    { id: "challenges", label: "Hard problems" },
    { id: "delivery", label: "Delivery" },
    { id: "evidence", label: "Evidence" },
    { id: "technology", label: "Technology" },
  ];

  return <article className={styles.page} data-case-study="engineering">
    <Link href="/projects" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
    <header className={`${styles.hero} ${lead ? styles.heroWithLead : ""}`}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{story.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className={styles.dek}>{story.summary}</p>
        <div className={styles.meta}><span>{project.role ?? "Engineering project"}</span><span aria-hidden="true">·</span><span>{project.company}</span><span aria-hidden="true">·</span><span>{project.timePeriod}</span></div>
        {(project.links?.webLink?.length || hasLoom || hasDrive) ? <div className={styles.heroLinks}>
          {project.links?.webLink?.map(link => <a key={link.id} href={link.link} target="_blank" rel="noreferrer">{link.title}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
          {(hasLoom || hasDrive) && <a href={hasLoom ? project.links!.videoUrl! : `https://drive.google.com/file/d/${project.links!.videoUrl!}/view`} target="_blank" rel="noreferrer">Watch walkthrough<ArrowUpRight size={15} aria-hidden="true" /></a>}
        </div> : null}
      </div>
      {lead && story.leadMedia && <MediaFigure image={lead} width={story.leadMedia.width} height={story.leadMedia.height} caption={story.leadMedia.caption} priority />}
      {story.visualMoments?.length ? <div className={styles.heroMediaStack}>{story.visualMoments.slice(0, 1).map((moment, index) => {
        const image = media[moment.mediaIndex];
        if (!image) return null;
        return <section key={moment.id} id={moment.id} className={`${styles.visualMoment} ${styles.section}`}>
          <div className={styles.visualHeading}><div><p className={styles.kicker}>Product surface {index + 1}</p><h2>{moment.title}</h2></div><span>{moment.status}</span></div>
          <MediaFigure image={image} width={moment.width} height={moment.height} caption={moment.explanation} priority={index === 0} />
        </section>;
      })}</div> : null}
    </header>

    <div className={styles.bodyGrid}>
      <aside className={styles.toc}><div className={styles.tocInner}><p>In this case study</p><TocNav items={toc} className={styles.tocNav} /></div></aside>
      <div className={styles.storyBody}>
        <StorySection id="at-a-glance" kicker="01 / Snapshot" title="At a glance">
          <dl className={styles.glance}>{story.atAGlance.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        </StorySection>

        {story.visualMoments?.slice(1).map((moment, index) => {
          const image = media[moment.mediaIndex];
          if (!image) return null;
          return <Reveal key={moment.id}><section id={moment.id} className={`${styles.visualMoment} ${styles.section}`}>
            <div className={styles.visualHeading}><div><p className={styles.kicker}>Product surface {index + 2}</p><h2>{moment.title}</h2></div><span>{moment.status}</span></div>
            <MediaFigure image={image} width={moment.width} height={moment.height} caption={moment.explanation} />
          </section></Reveal>;
        })}

        <StorySection id="problem" kicker="02 / Context" title="The engineering problem">
          <div className={styles.prose}>{story.problem.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </StorySection>

        <StorySection id="architecture" kicker="03 / System" title="System architecture"><Architecture architecture={story.architecture} /></StorySection>

        <StorySection id="decisions" kicker="04 / Judgment" title="Engineering choices & trade-offs">
          <div className={styles.decisionGrid}>{story.decisions.map((decision, index) => <article key={decision.title} className={styles.decision}>
            <span className={styles.decisionNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{decision.title}</h3>
            <dl><div><dt>Problem</dt><dd>{decision.problem}</dd></div><div><dt>Implementation</dt><dd>{decision.implementation}</dd></div><div><dt>Implication / limit</dt><dd>{decision.implication}</dd></div></dl>
            <p className={styles.evidenceBasis}>{decision.evidence}</p>
          </article>)}</div>
        </StorySection>

        <StorySection id="challenges" kicker="05 / Execution" title="Hard problems, concrete responses">
          <div className={styles.challengeGrid}>{story.challenges.map(challenge => <article key={challenge.title}><h3>{challenge.title}</h3><p>{challenge.challenge}</p><p><strong>Response.</strong> {challenge.response}</p></article>)}</div>
        </StorySection>

        <StorySection id="delivery" kicker="06 / Status" title="Delivery & outcome">
          <div className={styles.deliveryList}>{story.delivery.map(item => <div key={item.title} className={styles.deliveryItem}><span data-status={item.status}>{deliveryLabel[item.status]}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></div>)}</div>
        </StorySection>

        <StorySection id="evidence" kicker="07 / Proof" title="Real product evidence">
          <p className={styles.evidenceIntro}>{story.evidenceIntro}</p>
          {(hasLoom || hasDrive) && <div className={styles.video}>{hasLoom ? <LoomVideo videoUrl={project.links!.videoUrl!} title={`${project.title} walkthrough`} /> : <GoogleDriveVideo fileId={project.links!.videoUrl!} title={`${project.title} walkthrough`} />}</div>}
          <GalleryCarousel images={media} sectionTitle="Product captures" sectionDescription="Actual interfaces, reference demonstrations, and their source details." />
        </StorySection>

        <StorySection id="technology" kicker="08 / Stack" title="Technology by responsibility">
          <dl className={styles.stack}>{story.technology.map(group => <div key={group.responsibility}><dt>{group.responsibility}</dt><dd>{group.tools.join(" · ")}</dd></div>)}</dl>
        </StorySection>
      </div>
    </div>
  </article>;
}
