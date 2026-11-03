import type { EngineeringStory } from "@/components/projects/types";

export const engineeringStories = {
  archwalk: {
    eyebrow: "Founder-built platform · two rendering systems",
    summary: "I built a published 360° experience product and a separate geometry-based architectural review workspace. They share product infrastructure, but solve different spatial problems and have different public release status.",
    atAGlance: [
      { label: "Built", value: "360° Creator and Viewer; GLB-based architectural review" },
      { label: "Problem", value: "Turn spatial media and building models into navigable, reviewable experiences" },
      { label: "Ownership", value: "Founder & Lead Engineer across frontend, rendering, API, data, and media" },
      { label: "Delivery", value: "ArchWalk 360 public; Architects implementation present, public page Coming Soon" },
    ],
    problem: [
      "A panorama is a fixed capture. Visitors still need scene links, orientation, and a floor-plan reference to understand where they are. Authors need to edit those relationships without changing a published experience in place.",
      "Architectural review has a different constraint: reviewers need to inspect actual geometry, navigate a 3D model, and attach feedback to spatial locations. A panorama viewer cannot supply arbitrary camera positions or mesh-aware comments.",
    ],
    architecture: {
      title: "Two paths through one product platform",
      description: "The flows below show verified client, API, processing, storage, and presentation boundaries. They are logical paths, not a claim that every request traverses every node.",
      lanes: [
        { title: "ArchWalk 360 · public", nodes: [
          { name: "Creator", detail: "Draft scenes, navigation, and media" },
          { name: "FastAPI services", detail: "Validate edits and publish revisions" },
          { name: "PostgreSQL + R2", detail: "Experience records and panorama objects" },
          { name: "Viewer + embed", detail: "Read published snapshots" },
        ] },
        { title: "Architects · Coming Soon", nodes: [
          { name: "Review workspace", detail: "SketchUp-exported GLB upload" },
          { name: "Model API + R2", detail: "Resumable transfer and source storage" },
          { name: "Background worker", detail: "Optimize visual and collision GLBs" },
          { name: "3D runtime", detail: "GLTFLoader, orbit/walk, spatial review" },
        ] },
      ],
      footnote: "The 3D screenshot uses the real runtime with a public reference GLB in Orbit mode. Walk requires a processed collision asset and starting point; the public Architects page remains Coming Soon.",
    },
    decisions: [
      { title: "Keep panorama and geometry runtimes distinct", problem: "A 360° photo and a GLB mesh have different camera and navigation models.", implementation: "The panorama renderer projects yaw/pitch markers onto a captured sphere; the 3D runtime loads meshes with GLTFLoader and offers Orbit and gated Walk controls.", implication: "Photographic capture is efficient at authored viewpoints. Free geometry inspection adds model preparation, collision, and device rendering costs.", evidence: "Code: panorama runtime; three-d-walkthrough-runtime.ts" },
      { title: "Publish snapshots from editable drafts", problem: "Authors need to keep working without immediately changing a visitor's view.", implementation: "Creator edits a draft graph; publish validates it and records a revision that the read-only Viewer consumes.", implication: "The public boundary stays stable while edits continue; publish and revision validation add lifecycle complexity.", evidence: "Code: 360 publishing and Viewer services" },
      { title: "Transfer media outside the request body", problem: "Panoramas and GLBs are large assets with different upload lifecycles.", implementation: "Managed uploads use presigned R2 transfers; the 3D path supports resumable multipart upload and server-side completion checks.", implication: "Uploads can recover without restarting the whole file, while object ownership and cleanup must be validated explicitly.", evidence: "Code: three-d-multipart-upload.ts; media services" },
      { title: "Prepare visual and collision artifacts separately", problem: "A raw architectural GLB can be expensive to render and unsuitable for safe Walk navigation.", implementation: "The worker validates and optimizes GLBs using glTF Transform, Meshopt, and KTX2, and prepares a separate collision artifact. The runtime caps pixel ratio and disposes GPU resources.", implication: "Orbit inspection can use the visual model; Walk remains gated until collision and entry-pose data are ready. Processing adds latency and failure states.", evidence: "Code: three_d_models.py worker; 3D runtime" },
      { title: "Separate embed access from authoring access", problem: "A public or partner-hosted Viewer must not inherit Creator permissions.", implementation: "Scoped Creator sessions, Partner API credentials, origin policy, and read-only published Viewer routes use separate access boundaries.", implication: "Embedding becomes possible without exposing draft mutation, but each host boundary needs validation.", evidence: "Code: embed policy, partner auth, Creator bridge" },
    ],
    challenges: [
      { title: "Spatial state in two coordinate systems", challenge: "Panorama markers track camera yaw/pitch; 3D review pins and viewpoints attach to geometry and camera pose.", response: "The implementations keep their own projection and navigation math instead of sharing a screen-pixel representation." },
      { title: "Browser budgets for architectural models", challenge: "Large meshes and textures compete for memory and frame time across devices.", response: "The processing path compresses geometry and textures; the runtime uses a performance profile, bounded pixel ratio, and explicit disposal." },
    ],
    delivery: [
      { status: "public", title: "ArchWalk 360", detail: "Creator and Viewer workflows, draft/publish revisions, spatial navigation, sharing, and embeddable delivery. The Hallwyl demonstration is independent reference content." },
      { status: "implemented", title: "Architectural review system", detail: "GLB upload and preparation, real 3D rendering, camera modes, model review and spatial comments are present in the code. The reference still shows Orbit only." },
      { status: "foundation", title: "Public Architects launch", detail: "The public product page says Coming Soon. This case study makes no launch, customer, checkout, or adoption claim." },
    ],
    technology: [
      { responsibility: "Experience UI and rendering", tools: ["Next.js", "React", "TypeScript", "Three.js", "GLTFLoader"] },
      { responsibility: "Domain services and data", tools: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic"] },
      { responsibility: "Media and model processing", tools: ["Cloudflare R2", "glTF Transform", "Meshopt", "KTX2"] },
    ],
    visualMoments: [
      { id: "archwalk-360", title: "ArchWalk 360", status: "Public product", mediaIndex: 0, width: 1440, height: 900, explanation: "Actual Viewer UI with reference panorama photography. Scene markers and view controls belong to the running application; the depicted rooms are reference fixtures." },
      { id: "architects-3d", title: "ArchWalk for Architects", status: "Publicly Coming Soon", mediaIndex: 1, width: 1190, height: 504, explanation: "Actual ArchWalk 3D runtime rendering a CC0 Modern House GLB in Orbit review mode. This is a local reference capture, not a public product screenshot or a Walk session." },
    ],
    evidenceIntro: "The media below includes real application captures, a public reference demonstration, and source credits. Reference fixtures demonstrate implementation, not customer adoption.",
  },
  talentflow: {
    eyebrow: "Enterprise workflow simulation · AI evaluation",
    summary: "I co-led a high-fidelity recruiting product simulation for AI agent training and evaluation. The engineering challenge was keeping connected hiring workflows and their observable state coherent across a broad enterprise interface.",
    atAGlance: [
      { label: "Built", value: "Recruiting workflow simulation spanning 20+ interconnected modules" },
      { label: "Problem", value: "Agent tasks need realistic, stateful enterprise behavior to evaluate" },
      { label: "Ownership", value: "Co-lead: module delivery, canonical models, parity, RCA, contributor review" },
      { label: "Delivery", value: "Training and evaluation environment; no commercial ATS customer claim" },
    ],
    problem: [
      "An agent can complete one screen and still leave the product in an impossible state. Jobs, candidates, interviews, scorecards, approvals, offers, CRM, and reports have to tell a consistent story after each action.",
      "The environment also needs observable before/after state for evaluation. The existing State Diff screen compares a fixture-derived baseline with current local state, making task effects inspectable in the captured build.",
    ],
    architecture: {
      title: "Connected workflow model",
      description: "A logical map of the modules and consistency work described in the project record and visible in the product captures. It does not assert an unverified backend topology.",
      hub: { name: "Shared workflow state", detail: "Canonical models and parity checks keep entities aligned across modules", connections: [
        { name: "Jobs + candidates", detail: "Roles, applications, and pipeline stages" },
        { name: "Interviews + scorecards", detail: "Scheduling and structured evaluation" },
        { name: "Approvals + offers", detail: "Decision steps and downstream outcomes" },
        { name: "CRM + sourcing", detail: "Prospect and talent relationships" },
        { name: "Dashboards + reports", detail: "Views over connected workflow data" },
        { name: "Evaluation", detail: "Scenarios, state diff, and RCA" },
      ] },
      footnote: "The diagram describes product relationships. Screenshots confirm the visible modules and State Diff UI; the broader canonical-model and RCA work comes from the owner's project record.",
    },
    decisions: [
      { title: "Model workflows as connected state", problem: "Isolated screens cannot support end-to-end agent tasks reliably.", implementation: "The project record describes canonical data models and parity frameworks across hiring, CRM, approvals, and reporting modules.", implication: "A change in one workflow must stay coherent in related views; this increases the cost of fixture design and validation.", evidence: "Owner project record; visible pipeline, CRM, and dashboard screens" },
      { title: "Make task effects inspectable", problem: "A plausible UI alone cannot show whether an agent changed the intended entities.", implementation: "Evaluation scenarios and RCA methods are documented in the project record; the captured State Diff view compares fixture baseline with current local state.", implication: "Inspectability helps diagnose behavior, while the screenshot alone does not establish the full evaluator implementation.", evidence: "State Diff screenshot; owner project record" },
      { title: "Build for product parity across modules", problem: "A simulation loses training value when related workflows disagree or omit expected states.", implementation: "The team delivered 20+ connected modules and used parity frameworks, implementation review, and contributor guidance to keep behavior aligned.", implication: "Breadth required coordination and review; the record does not quantify agent performance gains.", evidence: "Owner project record; walkthrough and product screenshots" },
    ],
    challenges: [
      { title: "Cross-module consistency", challenge: "A candidate can move through pipeline, interview, approval, and offer views that depend on shared state.", response: "Canonical modeling and parity review provide a common contract for those surfaces, according to the project record." },
      { title: "Evaluation fidelity", challenge: "A task needs realistic starting conditions and a visible state change, not just a clickable path.", response: "Scenarios and RCA methods were built for agent evaluation; the captured State Diff view exposes fixture-to-current changes." },
    ],
    delivery: [
      { status: "implemented", title: "AI training environment", detail: "A high-fidelity recruiting simulation covering jobs, candidates, interviews, scorecards, approvals, offers, CRM, sourcing, dashboards, reports, and related workflows." },
      { status: "implemented", title: "Evaluation and collaboration", detail: "The project record attributes canonical models, parity frameworks, evaluation scenarios, RCA, contributor guidance, and implementation reviews to the co-lead work." },
      { status: "foundation", title: "Commercial recruiting use", detail: "This was a product simulation for AI training and evaluation. The case study does not claim real hiring customers or production ATS adoption." },
    ],
    technology: [
      { responsibility: "Application", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { responsibility: "Product and evaluation", tools: ["Workflow modeling", "Product parity", "AI agent evaluation", "RCA"] },
    ],
    leadMedia: { mediaIndex: 0, width: 2874, height: 1408, caption: "Actual dashboard from the AI training environment; shown as a simulation, not a live recruiting customer system.", preview: { aspectRatio: "3 / 2", objectPosition: "left center", alt: "TalentFlow dashboard close-up showing navigation and company goals" } },
    evidenceIntro: "The gallery shows the dashboard, fixture State Diff, jobs, candidate pipeline, CRM, and reporting surfaces. The owner walkthrough is preserved. Screens prove visible UI; deeper architecture claims are limited to the project record.",
  },
  cleon: {
    eyebrow: "Multi-tenant SaaS · voice ordering",
    summary: "I built a restaurant and voice-agent administration platform with tenant-scoped backend operations, ordering tools, and provider integration foundations. The case study separates the implemented configuration and domain work from unverified live-order outcomes.",
    atAGlance: [
      { label: "Built", value: "Restaurant, agent, and integration management with voice-ordering foundations" },
      { label: "Problem", value: "Keep conversations, menus, carts, and provider state scoped to a restaurant" },
      { label: "Ownership", value: "Full-stack product engineering across dashboard, API, data, and integrations" },
      { label: "Delivery", value: "Working admin and integration foundation; live customer orders not evidenced" },
    ],
    problem: [
      "A phone-ordering assistant has to turn conversational input into a deterministic menu and cart state. A wrong restaurant or tenant context would make even a fluent conversation unsafe for ordering.",
      "External voice and ordering providers add configuration and failure boundaries. The public walkthrough shows the integrations management surface, but it does not prove every listed connection processed real orders.",
    ],
    architecture: {
      title: "Restaurant-scoped ordering path",
      description: "A logical map based on the owner's project notes and visible integration UI. The diagram does not claim a particular deployment topology or that every provider tile is operational.",
      hub: { name: "Tenant-scoped FastAPI domain", detail: "Validates tenant → restaurant → agent context for business operations", connections: [
        { name: "Next.js admin", detail: "Restaurant, agent, and integration configuration" },
        { name: "Voice layer", detail: "Vapi agent with Deepgram STT and ElevenLabs TTS in project notes" },
        { name: "Ordering tools", detail: "Menu ingestion, cart state, and checkout workflow" },
        { name: "PostgreSQL models", detail: "Tenants, restaurants, agents, orders; SQLAlchemy + Alembic" },
        { name: "OrderOut foundation", detail: "Merchant/menu identifiers and create-order groundwork" },
      ] },
      footnote: "Provider relationships and backend details are owner-described; the screenshot confirms the integration configuration UI. OrderOut remains an integration foundation.",
    },
    decisions: [
      { title: "Scope operations by tenant and restaurant", problem: "Shared SaaS APIs must not cross restaurant data boundaries.", implementation: "The project notes describe tenant → restaurant → agent mapping and scoped backend request validation.", implication: "The API needs context checks at each business operation; a screenshot cannot verify isolation tests or production enforcement.", evidence: "Owner project record" },
      { title: "Keep ordering state deterministic", problem: "A conversation may be flexible, but menu selection, cart state, and checkout need explicit transitions.", implementation: "The recorded implementation uses voice tools for menu ingestion, cart management, and checkout rather than treating chat text as the order record.", implication: "Business state can be validated independently of a voice response; the record does not establish live-order volume or completion rates.", evidence: "Owner project record" },
      { title: "Keep provider boundaries replaceable", problem: "Voice and merchant services have separate credentials, data shapes, and failure modes.", implementation: "The project record describes provider-agnostic domain boundaries and an integration management UI; the walkthrough shows provider tiles and statuses.", implication: "This supports future swaps, but a visible tile is not evidence that every provider is fully integrated. OrderOut is a foundation.", evidence: "Owner project record; public Loom integration view" },
    ],
    challenges: [
      { title: "Context during a live conversation", challenge: "The assistant needs the correct restaurant menu and cart while interacting with a voice service.", response: "The described backend maps each voice agent to a restaurant and scopes tool calls to that context." },
      { title: "External API uncertainty", challenge: "Provider calls can time out or return partial data while an ordering flow is in progress.", response: "The project notes describe fallbacks and integration boundaries; no specific uptime, retry guarantee, or incident result is claimed." },
    ],
    delivery: [
      { status: "implemented", title: "Admin and domain foundation", detail: "Restaurant, agent, and integration management, tenant-scoped FastAPI operations, and PostgreSQL domain models are documented in the project record. The walkthrough shows the integrations UI." },
      { status: "foundation", title: "OrderOut and provider expansion", detail: "OrderOut merchant/menu configuration and create-quote/create-order groundwork are described as a foundation. The visible provider tiles are configuration surfaces, not proof of full production operation." },
      { status: "foundation", title: "Live commercial ordering", detail: "No verified customer order volume, revenue, or production processing outcome is presented." },
    ],
    technology: [
      { responsibility: "Admin application", tools: ["Next.js", "TypeScript"] },
      { responsibility: "API and data", tools: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic"] },
      { responsibility: "Voice and providers", tools: ["Vapi", "Deepgram", "ElevenLabs", "OrderOut foundation"] },
    ],
    leadMedia: { mediaIndex: 0, width: 1366, height: 584, caption: "Actual integrations screen from the public Loom walkthrough at about 00:17. Provider tiles show configuration UI, not verified operation for every provider.", preview: { aspectRatio: "4 / 3", objectPosition: "30% center", alt: "Cleon integrations close-up showing provider configuration cards" } },
    evidenceIntro: "The screenshot is an authentic walkthrough frame of the integrations page. The public Loom video remains linked; architecture details beyond the visible UI are identified as owner-provided project facts.",
  },
} satisfies Record<string, EngineeringStory>;
