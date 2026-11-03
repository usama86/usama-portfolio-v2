# Phase 2B — media and engineering provenance

Audited 2026-11-03. Portfolio baseline: cbcb7e203fa8ea2dae20814780aad2b3efa0690a.
ArchWalk repositories were read locally, without modification or production writes:

- Frontend: https://github.com/Archwalk-app/ArchWalk at 4a3b56b3caa85d30176cef2292d4985ed25f3659.
- Backend: https://github.com/Archwalk-app/archwalk-be-fastapi at 097937e95bfa575f107161a3299dcd4c7e0d1342.

## ArchWalk inventory and selection

Source paths below are relative to the frontend `public/` directory. Selected files are copied byte-for-byte; Next Image supplies responsive derivatives. No UI, controls, metrics, or rooms were fabricated.

| Source | Dimensions | Classification / decision |
| --- | --- | --- |
| landing/archwalk-360-viewer-solitude.jpg | 1440×900 | Actual Viewer with local reference fixture, CC0 panorama. Flagship and case-study lead; full frame retained. |
| landing/archwalk-360-viewer-hotel-room-walkway.jpg | 1440×900 | Actual Viewer with local Hotel Room fixture, CC0. Audited; not shipped to avoid redundant gallery views. |
| landing/archwalk-360-viewer-scene-switching.jpg | 1440×900 | Actual Viewer, second orientation of same Hotel Room reference panorama. Gallery; not a claim of connected rooms. |
| landing/archwalk-360-creator-reference-door.jpg | 1280×680 | Actual embedded Creator, local reference workspace, CC0 Hotel Room. Gallery; real Draft/Publish controls, not proof of completed publishing in this still. |
| landing/archwalk-360-creator.jpg | 1440×787 | Older hand-built HTML composition, per public-marketing.md. Rejected as an authentic screenshot. |
| landing/archwalk-360-floor-plan.jpg | 1440×900 | Actual Viewer UI with explicitly illustrative layout. Audited; not shipped. Never describe as a surveyed floor plan. |
| landing/hallwyl-viewer-desktop.webp | 1640×1200 | Actual published Viewer capture, independent reference demo, licensed photography. Gallery with visible attribution. |
| brand/archwalk-mark-dark.png | 384×192 | Genuine branding; inspected, not shipped. |
| brand/archwalk-mark-light.png | 384×192 | Genuine branding; inspected, not shipped. |

Reference documentation: `docs/public-marketing.md`, `docs/aw360-042.md`, `public/landing/hallwyl-credit.json`, and their named fixture capture scripts. Existing captures have adequate resolution; no new ArchWalk instance or production data was needed. The older unselected Viewer/Creator compositions were also visually compared.

### Photography and attribution

- **Solitude Interior:** Andreas Mischok, [Poly Haven](https://polyhaven.com/a/solitude_interior), [CC0](https://polyhaven.com/license). Actual panorama perspective and Viewer UI; source JPEG preserved. The detailed public-marketing provenance names Andreas Mischok; a later summary document incorrectly groups both panoramas under Greg Zaal, so the detailed source is used.
- **Hotel Room:** Greg Zaal, [Poly Haven](https://polyhaven.com/a/hotel_room), [CC0](https://polyhaven.com/license). Actual reference Creator/Viewer with local fixture data. Each pair of views uses the same panorama at different orientations.
- **Hallwyl Museum:** Jan Ainali, [source photograph](https://commons.wikimedia.org/wiki/File:Interior_of_Hallwylska_360_degree_11.JPG), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The local file `public/images/projects/archwalk/hallwyl-viewer.webp` retains this attribution and applicable CC BY-SA 4.0 terms for the photographic adaptation. Original transformation: photography rendered in the published Viewer, browser screenshot encoded as WebP; portfolio displays responsive resized/encoded derivatives. No crop or retouch. Gallery captions and fullscreen gallery retain source and license links for panorama files 11, 23, 26, and 13.
- Hallwyl floor plan: Hallwyl Museum / Jenny Bergensten, public domain, [source](https://commons.wikimedia.org/wiki/File:Ritning._plan_-_Hallwylska_museet_-_10438.tif). The screenshot displays the mini-map as part of real Viewer UI. Independent demonstration; no customer or museum partnership asserted.

## TalentFlow inventory

All eight existing source PNGs in `public/images/projects/turing-screenshot/` were visually inspected:

| File | Dimensions | Decision |
| --- | --- | --- |
| Dashboard-1.png | 2874×1408 | Featured image: goals, tasks, approvals, navigation; full frame, no new metrics. |
| State-diff-2.png | 2866×1414 | Existing evaluation screenshot retained in case study. |
| Jobs-page-3.png | 2866×1396 | Hiring analytics; retained. |
| Jobs-Candidate-pipeline-4.png | 2866×1394 | Pipeline; retained. |
| Candidate-page-5.png | 2880×1406 | Candidate list; retained, not promoted to homepage. |
| Candidate-profile-6.png | 2874×1408 | Contains contact-like sample fields; existing asset retained, not newly copied or promoted. |
| CRM-7.png | 2878×1396 | Recruiting CRM; retained. |
| Reports-8.png | 2862×1404 | Reporting; retained. |

These are owner-supplied simulation screens already in the portfolio. The homepage dashboard avoids personal candidate/contact details and is explicitly labeled an AI training environment. No raw files were changed; responsive image optimization uses Next Image. Existing links, video, technical claims, and gallery preserved.

## Cleon inventory and capture

- Existing `public/images/projects/CleonLogo.png`: genuine branding. Its inaccurate “Admin Dashboard” image title was corrected to “brand mark”.
- Public owner walkthrough: https://www.loom.com/share/2d9104b7478f40e29c58bf606b8ceeb5 — “Multi-Tenant AI Voice Ordering SaaS”, Muhammad Usama, approximately 2:20. Accessible without sign-in. The official Download action asks for signup, so no download gate was bypassed and no account was created.
- Captured public playback at approximately **00:17.35**, showing the real integrations overview. Source screenshot 1920×1041; crop x=78..1444, y=174..758, producing **1366×584**, WebP quality 92. Stored as `public/images/projects/cleon/integrations-walkthrough.webp`.
- Crop removes Loom page/playback chrome, webcam bubble, and unused lower area. It preserves the application navigation and all overview connection controls. No retouching, compositing, replacement values, or invented controls.
- Frame shows a test tenant label and provider configuration tiles, without phone numbers, contact details, credential values, or customer records. Later voice-agent details and restaurant screens were not selected. The frame does not establish that every displayed provider is operational; case-study claims remain those in the existing project data.
- Original Loom link preserved. The still is accurately captioned as a walkthrough frame. No Cleon repository was assumed or modified.

## Engineering claim evidence

| Case-study topic | Read-only evidence |
| --- | --- |
| Next.js / React / TypeScript / Three.js | Frontend package.json; components/viewer/panorama-runtime.tsx |
| Texture lifecycle / render budgets / disposal | panorama-runtime.tsx; lib/panorama-texture-cache.ts; lib/panorama-render-budget.ts; lib/panorama-frame-scheduler.ts |
| Spatial navigation | Backend app/services/archwalk_360_navigation.py; frontend camera math / projected markers |
| FastAPI / PostgreSQL / SQLAlchemy / Alembic | Backend requirements.txt, models, migrations, and domain services |
| R2 uploads and media lifecycle | Backend README.md; app/services/archwalk_360_media.py; archwalk_360_media_lifecycle.py |
| Scoped access and draft/public boundary | archwalk_360_partner_auth.py; archwalk_360_access.py; archwalk_360_partner_publish.py; published revision models |
| Embedded Viewer / Creator and origin boundaries | Backend archwalk_360_embed_policy.py; frontend lib/archwalk-360-creator-bridge.ts, archwalk-360-embed-policy.ts, archwalk-360-agent-docs.ts |
| Product boundary and public demo | https://archwalk.app, https://archwalk.app/360, https://demo.archwalk.app/viewer; public-marketing.md |

No commercial adoption, revenue, user count, measured performance gain, live checkout, or payment-provider approval is asserted. Architects remains Coming Soon. No credentials, environment files, protected capability links, or private customer data were copied into the portfolio.
