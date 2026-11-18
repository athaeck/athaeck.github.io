# Spec: athaeck.de portfolio (Nuxt, German and English)

Status: ready for the build effort · merged 2026-11-17 from the [map](map.md) and its 27 closed tickets.

This spec is the hand-off for building the site. It states **what** to build. The **why** of every decision lives in the ticket linked from its section. Where this spec and a ticket disagree, this spec wins: it applies every later comment over an earlier answer, plus the decisions taken while merging ([§ 25](#25-decisions-taken-while-merging-2026-11-17)).

- Vocabulary: [GLOSSARY.md](../../GLOSSARY.md). Capitalised terms (Project, Screen, Theater …) are used as defined there.
- Decisions with lock-in: [ADR-0001](../../docs/adr/0001-nitro-node-server-with-full-prerender.md) (Nitro node-server), [ADR-0002](../../docs/adr/0002-shared-facts-and-per-language-text-files.md) (shared facts, per-language text), [ADR-0003](../../docs/adr/0003-hand-written-css-no-utility-framework.md) (plain CSS), [ADR-0004](../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md) (Web builds as pre-Brotli files in same-origin iframes).
- Infrastructure (servers, Forgejo, Coolify, DNS, cutover) is planned in `E:/Projekte/athaeck/athaeck-infra`. This spec only states what the site needs from it. Changes to that plan go there as comment proposals.
- **Privacy rule for the whole effort:** the owner's home address, phone number and date of birth never appear in the repo, the content, the site, the public CV PDF or a request to an external service.

---

## 1. Goal and audience

A bilingual (German default, English) personal portfolio for Nick Philipp Häcker on **athaeck.de**. It shows game development as the profile and full-stack work as the proof; the Nuxt site itself is part of that proof. The audience is game studios, recruiters and web employers. A recruiter should grasp the essentials (who, what, CV, contact) within 10 seconds. One Signature moment with game character sets the site apart (direction "(b)" in [Grundsatzentscheidungen](issues/01-grundsatzentscheidungen.md)).

Only the logo of the old vCard site stays, as the brand. Nothing else is rebuilt from the old template.

## 2. Scope

**In scope (first release):**
- Pages: Home, Projects (with Archive), a Project page per Project, CV, About, Legal notice, Privacy policy, 404, each in German and English.
- The content model in the repo (Nuxt Content), shaped to map 1:1 onto Strapi later.
- The Signature moment (Chronoscope), the time-jump transition, the print stylesheet of the CV page.
- Videos on Project pages via the site's own Range route.
- The Embed architecture and the Theater, ready for the first Embed (no Embed ships at launch).
- Analytics (GA4 via GTM behind a Cookiebot Consent banner) and SEO (sitemap, robots.txt, JSON-LD, OG, Search Console).
- One Docker image with `/health`, deployed Forgejo → Coolify, built on the public server.
- Tests in the build gate plus a manual browser audit.
- The site's side of the cutover: 301s from the old Legacy site names to the Legacy host, Free3D's old path to its Project page.

**Phase 2: after the first rebuild and deployment, deferred, not discarded:**
- The game of the Game mode (world, mechanics, content, build), including the name of its route and nav label. This spec fixes only its frame ([§ 12](#12-game-mode-frame-for-phase-2)). Concept note: [Spielmodus und Mobil-Modus](issues/18-spielmodus-und-mobil-modus.md).
- Building concrete Embeds. A Fraction of Time comes first after launch; Chess Game and AUREA Novel may follow as content changes.
- Unreal Embeds: no official web export since UE 4.24; Pixel Streaming would need a GPU server.
- Self-hosted Strapi as headless CMS.
- Contact form.
- Blog, testimonials, clients.
- Generating the CV PDF from the site's content.

**Later, not tied to a phase:** moving to Nuxt 5, as its own ticket once it is stable and the modules support it.

**Not part of this project:** building the infrastructure itself (Forgejo, Coolify, registry, NetBird, Renovate), including the static nginx service that serves the Legacy sites ([§ 22](#22-legacy-sites-and-cutover)). That is the owner's separate effort.

## 3. Quality targets

- Lighthouse mobile ≥ 95 in all four categories, and SEO = 100, measured **before** any choice in the Consent banner.
- WCAG 2.2 AA.
- All content readable without JavaScript. JavaScript only adds things: the copy button, the Theater, the Game mode entry, Privacy settings, the Chronoscope's interaction.
- No requests to third parties except Cookiebot (always) and Google (only after consent to statistics). The CSP enforces this ([§ 17](#17-security-headers-and-csp)).
- The site's own code stores nothing in the browser ([§ 14](#14-analytics-and-consent)).

---

## 4. Languages, routes and URLs

Sources: [Seitenstruktur und Navigation](issues/10-seitenstruktur.md), [Nuxt-Stack-Fakten](issues/03-nuxt-stack-fakten.md), [Build-Spike](issues/16-build-spike.md).

### 4.1 Locales

- `@nuxtjs/i18n` with `strategy: 'prefix_except_default'`, `defaultLocale: 'de'`: German under `/`, English under `/en`.
- `detectBrowserLanguage: false`. No redirect by browser language; detection would also set the cookie `i18n_redirected`.
- `customRoutes: 'config'` with localized section paths. Slugs are shared across languages.
- `useLocaleHead` provides `lang`, `hreflang` (`de`, `en`, `x-default`) and `canonical`. These head tags are the only hreflang method (none in the sitemap).
- German uses the informal "du" everywhere, the legal pages included. English uses US spelling; the locale code stays `en` (`og:locale` `en_US`).

### 4.2 Pages

| Page | DE | EN | Content |
|---|---|---|---|
| Home | `/` | `/en` | [§ 7.3](#73-home) |
| Projects | `/projekte` | `/en/projects` | Featured projects in Profile order, then the Archive |
| Project page | `/projekte/<slug>` | `/en/projects/<slug>` | one per Project, Featured or Archive, same template |
| CV | `/lebenslauf` | `/en/cv` | CV entries, Skills with evidence, `languages`, PDF download |
| About | `/ueber-mich` | `/en/about` | bio, portrait, Services, interests |
| Legal notice | `/impressum` | `/en/legal-notice` | Page |
| Privacy policy | `/datenschutz` | `/en/privacy` | Page |
| 404 | by path language | by path language | [§ 7.9](#79-404) |
| Game mode | name open | name open | Phase 2 only, nothing exists before |

- **Contact is not a page.** It is a footer block on every page with the anchor `#kontakt` (EN `#contact`). The CTA "Kontakt" points to it.
- **Deliberately absent:** an Archive page, pages per Skill, Kind or Achievement, tag pages, filters.
- **Slugs:** a Project's slug is its content file name: lowercase, kebab-case, ASCII, identical in both languages. **Slugs are frozen from the first release on**, because the Game mode will link to them. Renaming is only possible with a 301 via `routeRules`.
- **Canonical form has no trailing slash.** A Nitro plugin on the `request` hook (it runs before the static handler) answers `/x/` → 301 `/x`, keeping the query (`/projekte/aurea/?x=1` → `/projekte/aurea?x=1`). **Exception:** under the prefix `/builds/` the plugin enforces the slash instead (`/builds/<slug>` → 301 `/builds/<slug>/`), because a Web build's relative paths break without it. It only touches directory paths, never a path whose last segment is a file (e.g. `/builds/<slug>/index.html`). Edge cases `/`, `/en/` and queries are covered by unit tests.
- **Reserved paths:** the old Legacy site names (e.g. `Chess-Game`, `PRIMASS21`, `free3d.github.io`; final list from infra-19), which only redirect ([§ 22](#22-legacy-sites-and-cutover)), `builds`, `media`, `images`, `mail`, `downloads`, `health`, `_ipx`, `_nuxt`, `_fonts`. No route may take one of them, the Game mode route included.

### 4.3 Language rules

- Every page exists in both languages, the legal pages included. **A missing language file stops the build** ([§ 6](#6-content-checks)). There is no fallback to the other language.
- The language switcher is always a plain `<a href>` to the same page in the other language, computed at prerender (verified in the spike: `/projekte/aurea` ↔ `/en/projects/aurea`). It works without JavaScript.

---

## 5. Content model

Sources: [Inhaltsmodell](issues/09-inhaltsmodell.md) with its comments, [ADR-0002](../../docs/adr/0002-shared-facts-and-per-language-text-files.md), [Seitenstruktur](issues/10-seitenstruktur.md), [Übersetzungs-Workflow](issues/17-uebersetzungs-workflow.md), [SEO zum Start](issues/25-seo-zum-start.md), [Videos auf der Project page](issues/26-videos-project-page.md), merge decisions [§ 25](#25-decisions-taken-while-merging-2026-11-17). Fact basis: [content-inventory.md](content-inventory.md) (approved by the owner; it fixes the Featured order and the Archive).

### 5.1 Rules

- **Storage:** content lives in the repo (Nuxt Content). There is no CMS at launch. Each entry is one shared YAML file for facts plus one Markdown file per language for text (front matter + body), joined by the identical file name.
- **Lists with text** (Strapi components) live entirely in the language files, so their facts are duplicated per language. The Content check *list match* keeps them equal.
- **Single image:** the file is shared; its alt text is a separate translated field.
- **Dates:** ISO 8601 with variable precision (`2017`, `2023-10`, `2026-01-30`). The site shows exactly the given precision and sorts dates as text. `start` is required. An empty `end` means "a point in time" for an achievement and "ongoing" otherwise. Semesters are not modelled. In Strapi a date becomes a text field with a pattern.
- **Never in content:** grades (one highlight may appear in running text), names of team members (credits go via links; third parties would have to consent), places of CV entries, UI texts. UI texts (labels of Kinds, link types, Skill groups, Screen titles, navigation) live in the i18n language files and do not move to Strapi.
- **`unreviewed: true`:** an optional front-matter field in every language file (Project, CV entry, Profile, Page). Only the value `true` exists. AI sets it, the owner deletes it after reading. Any marker stops the build ([§ 6](#6-content-checks)), so it never reaches `main` and never moves to Strapi (where Draft & Publish per locale takes its role).
- **Media files:** `cover`, `portrait`, gallery `file` and `poster` hold bare file names. Images resolve to `public/images/<slug>/` (the Profile's to `public/images/profile/`) and are served through Nuxt Image (`ipxStatic`). A video `file` must match `[a-z0-9-]+\.mp4` (schema), because the video route serves nothing else, and resolves to `media/<project-slug>/`, outside `public/` ([§ 10](#10-images-and-videos)).

### 5.2 Layout

```
content/
  profile.yml          de/profile.md          en/profile.md
  projects/<slug>.yml  de/projects/<slug>.md  en/projects/<slug>.md
  cv/<id>.yml          de/cv/<id>.md          en/cv/<id>.md
  skills/<slug>.yml    (shared only)
                       de/pages/<slug>.md     en/pages/<slug>.md   (translated only)
```

Collections: one per type for the shared YAML and one per type and language for the Markdown (`source: { include: 'de/projects/*.md', prefix: '' }` gives `stem` = slug, verified in the spike). Schemas are zod (bundled with Content 3.16).

### 5.3 Project (Strapi: collection type with i18n)

| Field | | Type | Req. |
|---|---|---|---|
| `kind` | shared | `game` · `research` · `tool` · `film` · `asset` | ✓ |
| `skills` | shared | Skill slugs, platforms included (AR, VR, Mobile, Web, Desktop) | ✓ |
| `links` | shared | list `{type, url}`; types `repo` · `paper` · `play` · `website` · `viewer` · `video` · `devlog` · `store` · `download`; labels come from UI texts | |
| `cover` | shared | image | ✓ |
| `embed` | shared | `{ aspect: "16/9" }`; marks that an Embed exists and gives its area its shape; at most one per Project (two scenes become one build with a scene menu) | |
| `title` | translated | text | ✓ |
| `genre` | translated | one line of free text, e.g. "Blender add-on" | ✓ |
| `summary` | translated | 1–2 sentences, for the Teaser and the meta description | ✓ |
| `coverAlt` | translated | text | ✓ |
| `phases` | translated | list ≥ 1 `{start, end, context, teamSize, role}`; the Project's period runs from the first to the last Phase | ✓ |
| `question` | translated | text: the question the Project set out to answer | |
| `approach` | translated | text: the way taken | |
| `result` | translated | text: the outcome | |
| `contributions` | translated | list of sentences: the owner's contribution | |
| `learnings` | translated | list of sentences: what the owner learned from it | |
| `gallery` | translated | list ≤ 3 `{file, alt, caption, text}`, image or video ([§ 5.4](#54-gallery-entries)) | |

- A Project has **no Markdown body**; `question`, `approach` and `result` replace it.
- The card line is *Kind · Platforms · Genre*, e.g. *Tool · AR · Web · L-System plant generator* (Three.LS).
- The Achievements of a Project are derived from the achievement CV entries whose `project` points to it (badge on card and Teaser).
- Featured and Archive use the same fields. Whether a Project is Featured is decided only by Profile `featured`.
- Ready Prepper One is **not** a Project; it appears in Profile `now` and `next` until it has content.
- The Embed's directory is by convention `public/builds/<project-slug>/`; there is no path field and no manual size. The Embed's poster is the Teaser.
- Third-party viewers and demos hosted elsewhere (Sketchfab, `bassadin.github.io`) are not Web builds; they stay `viewer` or `play` links (the CSP blocks foreign iframes, and they would be third-party requests).

### 5.4 Gallery entries

- An entry is a **video** when `file` ends in `.mp4`; otherwise it is an image.
- `alt` is required (it is the text alternative, WCAG 1.2.1 for silent video). `caption` is the part's heading in the "Im Spiel" Screen; it is optional for images and **required for videos**. `text` is an optional sentence or two below the heading.
- Videos also require `poster` (an image file; also used as `<video poster>` and as `thumbnailUrl`) and `date` (ISO 8601, publication date). A missing one fails the schema.
- **Trailer:** the first video in `gallery`; there is no extra field. A `video` link is never a Trailer.
- At most **3** entries per Project (schema), so "Im Spiel" stays one Screen.

### 5.5 CV entry (Strapi: collection type with i18n)

| Field | | Type | Req. |
|---|---|---|---|
| `kind` | shared | `work` · `education` · `volunteering` · `achievement` | ✓ |
| `start` / `end` | shared | date | `start` ✓ |
| `skills` | shared | Skill slugs | |
| `project` | shared | Project slug (e.g. Medienpreis → AUREA, Master → Connecting-Minds) | |
| `link` | shared | URL (pitch video, certificate) | |
| `title` | translated | role, degree or award | ✓ |
| `organisation` | translated | e.g. "Hochschule Furtwangen" / "Furtwangen University" | ✓ |
| `contributions` | translated | list (tasks, courses) | |
| body | translated | Markdown (e.g. a jury quote) | |

- The FSJ counts as `volunteering`. The four asellerate entries stay separate entries; the CV page groups them under one employer.
- `achievement` covers Medienpreis, Gamescom 2023, GiG xLab, Zertifikat DIGITAL GAMES, the MFG seminar (2026-10-15) and Cybersicherheitstag.
- Primary school is not a CV entry.
- Each CV entry gets an anchor from its id on the CV page.

### 5.6 Skill (Strapi: collection type without i18n)

- Fields: `name` ✓ and `group` ✓, with group keys `languages` · `engines` · `frameworks` · `databases` · `protocols` · `tools` · `methods` · `platforms`. The labels are UI texts. The group `languages` is labelled "Programmiersprachen" / "Programming languages" so it does not clash with the spoken `languages`.
- No percentage bars. A Skill shows its **evidence**, derived from the references of Projects and CV entries.
- Every Skill needs at least one reference ([§ 6](#6-content-checks), *references*). The gaps from the inventory (Nuxt, Godot, Blender, three.js, FUDGE, Gaussian Splatting) are added once they are backed.

### 5.7 Profile (Strapi: single type with i18n)

| Field | | Type |
|---|---|---|
| `name` | shared | text |
| `email` | shared | the one source of the e-mail address ([§ 9](#9-contact-e-mail-protection-and-cv-pdf)) |
| `profiles` | shared | list `{type: github · linkedin · itch, url}` |
| `portrait` | shared | image |
| `featured` | shared | ordered list of Project slugs (in it = Featured, otherwise Archive) |
| `featuredAchievements` | shared | ordered list of CV entry ids of kind `achievement`; at launch Medienpreis, Gamescom 2023, GiG xLab |
| `legalAddress` | shared | name and the c/o address of the Legal notice service, never the home address |
| `headline` | translated | text |
| `location` | translated | "Stuttgart" |
| `portraitAlt` | translated | text |
| `now` | translated | optional line: what the owner works on now (Ready Prepper One) |
| `services` | translated | list `{title, text}`, no references |
| `languages` | translated | list `{language, level}` |
| `interests` | translated | list of texts |
| `timeline` | translated | list `{year, label, text}`: the hand-condensed stations of the Home timeline, oldest first; the last one is the current station ("Jetzt") |
| `next` | translated | list `{label, text, href?}`: what the Chronoscope reveals at "Was kommt"; `href` is a path of the site or an anchor (e.g. `#kontakt`) |
| body | translated | bio |

- A `timeline` station gets a ★ when a Featured achievement starts in the same year (derived, no field).
- Until the game is live, `next` may announce the Game mode as plain text without a link. That is an announcement, not an entry ([§ 12](#12-game-mode-frame-for-phase-2)). With the game, the item gets its `href`.

### 5.8 Page (Strapi: collection type with i18n, translated only)

- Fields: `title` ✓ and body. Used for the Legal notice and Privacy policy ([§ 13](#13-legal-notice-and-privacy-policy)). They read `legalAddress` and `email` from the Profile.

### 5.9 Strapi mapping (Phase 2)

- Lists with text become localized repeatable components. `links` becomes a shared repeatable component, `embed` a shared component with one field.
- References become shared relations.
- UNVERIFIED: whether relations keep an order (for `featured`, `featuredAchievements`); the fallback is a position number on the entry. Also UNVERIFIED: whether alt text in Strapi's media library is localizable.
- AI translation in Strapi works from the default locale (German), which matches the Source language rule.

---

## 6. Content checks

Sources: [Seitenstruktur](issues/10-seitenstruktur.md), [Embed-Architektur](issues/13-embed-architektur.md), [Übersetzungs-Workflow](issues/17-uebersetzungs-workflow.md), [Teststrategie](issues/21-teststrategie.md), [Videos](issues/26-videos-project-page.md), merge decision [§ 25](#25-decisions-taken-while-merging-2026-11-17).

Each Content check is a pure function (data in, list of errors out) that runs inside `npm run build` and stops it on any error. How they are wired in (a `prebuild` script or a local Nuxt module) is up to the build. Each has a good and a broken Vitest fixture ([§ 20](#20-testing)).

| # | Check | Stops the build when |
|---|---|---|
| 1 | **Missing language** | an entry with language files (Project, CV entry, Profile, Page) lacks the DE or EN file |
| 2 | **Unreviewed** | any language file carries `unreviewed: true`; the rule is "both languages, reviewed, or no release" |
| 3 | **List match** | a text list (`phases`, `gallery`, `contributions`, `learnings`, `services`, `languages`, `interests`, `timeline`, `next`) has a different number of entries in DE and EN, or its facts differ (`start`, `end`, `teamSize`, `file`, `poster`, `date`, `year`, `href`) |
| 4 | **Web build budget** | a directory under `public/builds/` exceeds 50 MB (Embed) or 100 MB (Game mode), counted as the sum of its files (= transferred bytes for literal `.br`) |
| 5 | **Web build consistency** | a Project has `embed` but `public/builds/<slug>/index.html` is missing, or a directory under `public/builds/` belongs neither to a Project with `embed` nor to the Game mode |
| 6 | **Video** | a gallery video exceeds 20 MB, its codec is not `avc1`, `moov` lies after `mdat` (no faststart), or it has an audio track (`hdlr` `soun`); the MP4 boxes are read without a dependency |
| 7 | **References** | a slug in `skills`, `project`, `featured` or `featuredAchievements` resolves to nothing; an entry in `featuredAchievements` is not of kind `achievement`; a referenced file (`cover`, `portrait`, gallery `file` or `poster`) is missing; a Skill has no reference |

Until the game effort names the Game mode's directory, check 5 lets every directory under `public/builds/` belong only to a Project with `embed`.

In addition, the zod schemas reject missing required fields, unknown enum values, malformed dates and slugs, more than 3 gallery entries, video entries without `caption`, `poster` or `date`, and video file names outside `[a-z0-9-]+\.mp4`. The prerender stops on any dead internal link (Nuxt sets `prerender.failOnError: true`; Nitro treats every non-200, non-redirect route as an error).

---

## 7. Design and pages

Sources: [Design-Richtung und Signature-Moment](issues/11-design-richtung.md), [Layout der übrigen Seiten](issues/19-layout-uebrige-seiten.md), [Seitenstruktur](issues/10-seitenstruktur.md), [Embed-UX](issues/27-embed-ux.md). Reference: variant **D "Zeitlinien · Split"** in [prototype-design-richtung/](prototype-design-richtung/index.html) (open `index.html`, choose D). Texts marked "Beispiel" there are invented. Owner references: [vorlagen-sichtung.md](vorlagen-sichtung.md).

### 7.1 Visual identity

| Token | Value | Use |
|---|---|---|
| Paper | `#f2f0eb` | light Screens, header |
| Ink | `#0b0b0c` | dark Screens (bands) |
| Chrono blue | `#2b50ff` | accent on paper |
| Cyan | `#00c2d8` | accent on ink; echo effect |
| Pink | `#ff3d81` | echo effect of the time lines |
| Brass | `#d6a448` | the Chronoscope only |
| Grey on ink | `#a9a9ae` | secondary text and controls on ink |

- Typeface **Exo** (variable, `wght` 100–900, OFL), self-hosted. The type scale uses `clamp()`.
- The logo is the joystick mark (`android-chrome-192x192.png` of the old site), not the word "athaeck".
- Essentially one breakpoint (860 px) plus `pointer: fine`.
- **Interaction states, everywhere the same:** on paper, hover turns text chrono blue and focus is a 3 px chrono-blue outline. On ink, text is grey, turns paper on hover and shows a cyan underline when active; focus is a 2 px cyan outline. Only the main button has a hover background.
- Tokens are CSS custom properties in one file; the dark bands switch them at runtime ([ADR-0003](../../docs/adr/0003-hand-written-css-no-utility-framework.md)).

### 7.2 Page frame

- **Screens:** every page consists of Screens, one content category each, at least one viewport high (the first minus the header), alternating ink and paper. Snapping between Screens is gentle. On a phone the parts of a category swipe sideways with the next one peeking in, so each category stays one Screen. Known limit: at 375 × 667 the Teaser, "Entstehung" and the learnings are taller than the viewport.
- **Header:** logo (→ Home) · Projekte · Lebenslauf · Über mich · Kontakt · DE/EN (EN: Projects · CV · About · Contact). On desktop it turns into a narrow left rail with vertical labels after about 90 px of scrolling. On a phone it stays on top with every item visible: no hamburger, no tab bar. The active item carries `aria-current="page"`. A skip link "Zum Inhalt" / "Skip to content" comes first.
- **Footer**, the same on every page:
  - the contact block with the anchor `#kontakt` / `#contact`: "E-Mail schreiben →" to `/mail`, the "Adresse kopieren" button, GitHub, LinkedIn, itch.io and "Stuttgart" ([§ 9](#9-contact-e-mail-protection-and-cv-pdf));
  - links to the Legal notice and Privacy policy, and the Privacy settings button ([§ 14](#14-analytics-and-consent));
  - the language switcher.
- **Time-jump transition** when moving to a Project page: an overlay in the layout (Vue `<Transition>`) that a router hook plays before the page change. It is dropped under `prefers-reduced-motion`. No `experimental.viewTransition`, no element morphing. Opening the Theater ([§ 11.4](#114-the-theater)) must not trigger it.

### 7.3 Home

The 10-second path:
1. **First Screen, split in two.** On the left: portrait (black and white), name, `headline`, `location`, the `now` line, the CTAs "Lebenslauf →" (→ CV page) and "Kontakt →" (→ `#kontakt`), and the strip of Featured achievements. On the right, over the full height: the **timeline** with a scrubber, made of the Profile `timeline` stations (★ as defined in [§ 5.7](#57-profile-strapi-single-type-with-i18n)). After the last station comes the stop "Was kommt" with the **Chronoscope** ([§ 8](#8-signature-moment-the-chronoscope)).
2. All 7 **Featured projects** as cards in Profile order: cover, title, *Kind · Platforms · Genre*, badge.
3. A link "Alle Projekte" to the Projects page.
4. Footer.

- Featured achievement links: to the Project page if the entry has a `project`, otherwise to its anchor on the CV page.
- **Not on the Home:** bio, Services, interests, Skills, CV entries (other than the Featured achievements and the condensed `timeline`).
- The Game mode entry (Phase 2) sits near the Signature moment.

### 7.4 Projects page

- Screen "Featured" (ink): the 7 cards as a compact 4 + 3 grid; the free eighth tile leads to the Archive. Same cards as on the Home.
- Screen "Archiv" (paper): a timeline with a large year on the left and rows on the right (title, *Kind · Platforms · Genre*), sorted by the end of the last Phase, newest first. An ongoing Project (empty `end`) counts as newest. Each row links to its Project page. No filters (14 Projects; filters would need JavaScript or filter routes).

### 7.5 Project page

Screens in this order. A Screen without content is left out ("one template, it shows what is there").

1. **Teaser** (full Screen, the cover as background):
   - top left the visible path `Projekte / <Titel>` as `<nav aria-label="Pfad"><ol>` (EN `Projects / <Title>`, `aria-label="Breadcrumb"`), the last item with `aria-current="page"`, Exo in capitals at kicker size. On a phone CSS hides the last item and it reads `← Projekte`, with the title large below;
   - title, `summary`, the badge(s) of its Achievements;
   - the **main button**, then the facts: role and team (from `phases`), period, engine (Skills of group `engines`), platforms.
2. **"Im Spiel"** (Screen title for `kind: game`; "Einblicke" for every other Kind; proposed EN UI texts "In the game" / "A closer look"): the `gallery` entries side by side, each with its medium, `caption` as heading and `text` below. On a phone they swipe sideways. Videos play as `<video controls playsinline preload="none" poster="…">`: no autoplay, no loop, no byte loads before the click.
3. **"Entstehung"**: the Phases as a timeline over the full width; below it up to four parts, "Die Frage" (`question`), "Der Weg" (`approach`), "Das Ergebnis" (`result` plus the `links`) and "Mein Beitrag" (`contributions` plus the Project's Skills, each linking to its anchor on the CV page, `/lebenslauf#skill-<slug>` / `/en/cv#skill-<slug>`). A part without content is left out.
4. **"Was ich gelernt habe"**: `learnings`.
5. **Next Project:** in the order of the Projects page (Featured, then Archive); after the last one comes a link to the Projects page, no loop.

**Main button** in the Teaser: the first match wins.
1. An Embed, when the device fits (fine pointer, wide viewport, WebGL 2): "Im Browser spielen" opens the Theater.
2. The Trailer: "Trailer ansehen", an anchor to the video in "Im Spiel"; with JavaScript the video also starts playing there (no overlay, no own fullscreen).
3. The first entry in `links`, labelled by its type.
4. Otherwise no button.

The base markup holds the candidate without the Embed; JavaScript swaps in "Im Browser spielen" when the device fits (the same pattern as the Game mode). With an Embed, the line below the button reads only "<size> · lädt erst nach dem Klick" (size in whole MB, computed at build from the sum the budget check uses). No controls are listed on the page. Examples: A Fraction of Time on a phone without a Trailer shows its first link; ONA TECH shows its itch.io link everywhere.

### 7.6 CV page

Six Screens, alternating:
1. **Head** (ink): title, current role (the latest `work` entry), `headline`; the PDF buttons as a form ([§ 9.3](#93-cv-pdf-download)), own language first ("PDF herunterladen", "English PDF"); jump links to the sections; `languages`.
2. **Erfahrung** (paper): `work` entries, grouped by `organisation` (the four asellerate entries under one employer), newest first.
3. **Engagement** (ink): every `volunteering` entry, the FSJ included.
4. **Ausbildung** (paper): Master and Bachelor with the link to the thesis (`project`) and the courses (`contributions`), then the Abitur.
5. **Auszeichnungen** (ink): every `achievement`, the Featured achievements marked ★.
6. **Skills** (paper): grouped by `group`; each Skill with its number of references ("Unity · 6 Belege", counting Projects and CV entries) and the anchor `skill-<slug>`. Tapping opens the evidencing Projects and CV entries as links in an HTML popover (`popovertarget`, works without JavaScript; the Screen does not grow).

**Print stylesheet** (a separate file): a plain two-column list without navigation, footer, buttons, jump links and colours. Headings stay with their section. The prototype data prints on 3 A4 pages.

### 7.7 About page

Screens: portrait with bio (paper), "Was ich mache" with the Services (ink), `interests` as a large list (paper).

### 7.8 Legal pages

One text column in the site's style, no special design. Content: [§ 13](#13-legal-notice-and-privacy-policy).

### 7.9 404

- One per language, chosen by the path's language. It is the only page rendered at runtime, so it only gets image variants that already exist; its Chronoscope is SVG.
- It contains a short sentence ("Dieser Ort ist auf keiner Karte verzeichnet"), the usual navigation, links to Home, Projects and CV, and a switch to the other language's Home.
- Its playful turn is the same Chronoscope with the code word **ORTE** (EN **LOST**). In focus it shows the 7 Featured projects as places to go.

---

## 8. Signature moment: the Chronoscope

Sources: [Design-Richtung](issues/11-design-richtung.md), [Spielmodus und Mobil-Modus](issues/18-spielmodus-und-mobil-modus.md).

- The one Signature moment: the **Chronoscope** at the stop "Was kommt" behind the last `timeline` station on the Home. It is a brass telescope modelled closely on the five marked segments of `docs/about-me/Asoue.png` but changed: four instead of six letter rings, an hourglass instead of lips, a joystick medal instead of a coin, a slit as a focus gauge, its own engraving. It does not use the protected V.F.D. eye.
- Turning the four rings to the code word **BALD** (EN **SOON**) brings the lens into focus; it then shows the Profile `next` items as marks on the map (prototype: Ready Prepper One, the Game mode, "Dein Team?" → `#kontakt`). The rings respond to dragging, tapping above or below, the mouse wheel, the arrow keys and typing the letter.
- Built with SVG, CSS and a little JavaScript; no three.js, GSAP or canvas.
- It works without the Game mode and points towards it.
- **Without JavaScript** the `next` items stand readable in the HTML (quality target, [§ 3](#3-quality-targets)); the rings only add the reveal. The Chronoscope is keyboard-operable and part of the WCAG hand checklist.

---

## 9. Contact, e-mail protection and CV PDF

Sources: [Seitenstruktur](issues/10-seitenstruktur.md) (revisions 2026-11-15), [Build-Spike](issues/16-build-spike.md), [Impressum-Lösung](issues/14-impressum-loesung.md).

### 9.1 Rule

The e-mail address appears **nowhere in plain text** in the site's HTML or JS: no `mailto:` in the markup, not in the JSON-LD, not in `routeRules` (they end up in the client bundle). Profile `email` is the one source. The owner keeps the existing address (no alias). The rule covers only the site itself: the old site and the CV PDF still contain the address. Basis: Spencer Mortensen's long-term measurement (all 979 spammers found an unprotected `mailto:`; an HTTP redirect, click-to-reveal and a `display:none` decoy blocked 100 %).

### 9.2 Footer contact

- "E-Mail schreiben →" links to `/mail`, one route for both languages. `server/routes/mail.ts` (not `mail.get.ts`, which serves no HEAD) answers GET and HEAD with `302`, `Location: mailto:<Profile.email>` and an **empty body**, and any other method with 405. It reads the address on the server. `routeRules: { '/mail': { prerender: false } }`, or the crawler would write a static meta-refresh page containing the address. Do not use `sendRedirect()`, which writes the address into a meta-refresh body.
- "Adresse kopieren": a button that appears only with JavaScript. The address sits encoded in the markup (derived from Profile `email` at prerender) and is decoded only on click, then copied and shown. Before the click neither the address nor `mailto:` is in the DOM (verified in the prototype). The encoding scheme is up to the build.

### 9.3 CV PDF download

- No GET URL and nothing under `public/`. At the top of the CV page, each language has a button in a `<form method="post" action="/downloads/cv">` with a hidden field `lang`. Both languages are offered on both language pages, the page's own language first.
- `server/routes/downloads/cv.ts`: POST with `lang=de|en` → `200`, `Content-Type: application/pdf`, `Content-Disposition: attachment; filename="nick-haecker-lebenslauf.pdf"` (EN `nick-haecker-cv.pdf`), `X-Robots-Tag: noindex`, `Cache-Control: no-store`. GET → `303` to `/lebenslauf`. An unknown `lang` → 400, other methods → 405. The PDFs come from `server/assets/cv/` via `useStorage('assets:server')`; Nitro embeds them in the server bundle. The crawler does not follow forms.
- Accepted limits: the assumption that harvesters do not submit forms is unmeasured, and a bot built for this site gets through. There is no direct PDF link to paste into an application. A self-hosted proof of work (e.g. ALTCHA) would need JavaScript and stays out. Third-party captchas are excluded.
- **Public CV PDF (owner, build phase):** made from the owner's LaTeX CV. Remove the home address and phone; keep the e-mail. Fix the text layer (umlauts currently break apart, "Häcker" → "Hacker ¨", probably a missing `fontenc`/`cmap`). Compress it (it is 4.7 MB today, almost all photo). Apply the corrections from the inventory (AUREA role, Jr. Full-Stack tasks incl. LLM work since March 2026, typos, Skills C++, Unreal, PostgreSQL, Supabase). The raw CV never enters the repo (`docs/about-me/` is gitignored).

---

## 10. Images and videos

Sources: [Tech-Stack](issues/12-tech-stack.md), [Videos auf der Project page](issues/26-videos-project-page.md).

### 10.1 Images

- `@nuxt/image` with `provider: 'ipxStatic'` on `node-server`. The prerender writes each `<NuxtImg>` variant to `.output/public/_ipx/…`. There is no IPX at runtime (`ipxSetup({ isStatic: true })` registers the handler for the prerender only), so nobody can make the server compute arbitrary sizes, and sharp is expected to leave the server bundle. Phase 2 with Strapi switches back to `ipx` in one line.
- Images that are not `<NuxtImg>` (the OG image, video posters) are created via `$img` during the prerender; their `/_ipx` variant must be prerendered (check point).

### 10.2 Videos

- Short, silent clips only. They live in Git, without LFS, under `media/<project-slug>/<name>.mp4`, outside `public/` (otherwise Nitro's static handler serves them first, without Range). The URL is `/media/<project-slug>/<name>.mp4`. The runtime stage copies `media/`.
- Why a route: Safari on iPhone and Mac plays `<video>` only from servers with byte ranges (Apple: "HTTP servers hosting media files for iOS must support byte-range requests"; WebKit bug 229413), and Nitro's static handler has neither streaming nor Range.
- `server/routes/media/[...path].ts`:
  - answers GET and HEAD; other methods 405;
  - accepts only paths matching `^[a-z0-9-]+/[a-z0-9-]+\.mp4$`, everything else 404 (path traversal);
  - streams with `createReadStream` and never holds a whole file in memory;
  - no `Range` → 200 with the whole file; one range (`a-b`, `a-`, `-n`) → 206 with `Content-Range`; an unsatisfiable range → 416; several ranges → ignored, 200 (RFC 9110);
  - sets `Accept-Ranges: bytes`, `Content-Type: video/mp4`, `Cache-Control: public, max-age=31536000, immutable`.
- **A video file is never overwritten**; a new version gets a new name. The build cannot check this; breaking the rule shows returning visitors the old version for up to a year.
- **Format:** MP4, H.264, `yuv420p`, at most 1080p, **no audio track**, `+faststart`; one source, no WebM or AV1. One file for both languages; text in the picture stays as is, `alt` and `caption` describe it per language. The README holds the encoding command, e.g. `ffmpeg -i in -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -vf "scale='min(1920,iw)':-2" -movflags +faststart out.mp4`.
- **Budget:** ≤ 20 MB per video (Content check 6), for the Git history, the image size and mobile data; there is no limit per Project.
- **Long videos and videos with sound** (e.g. the FSJ film) stay `video` links to YouTube and open there, not embedded. `youtube-nocookie` was rejected: it writes `localStorage`/IndexedDB on load and would need consent, a two-click facade, a Privacy policy section and a CSP hole.
- Accessibility: silent video needs only a text alternative (`alt`, WCAG 1.2.1). Video with sound would need captions (1.2.2) and audio description (1.2.5), which is why there is none at launch.
- Inventory: only Free3D has its own clips (9 MP4s of 7–10 MB in its project site repo); pick up to 3 for its gallery.

---

## 11. Web builds, Embeds and the Theater

Sources: [Embed-Architektur](issues/13-embed-architektur.md), [Embed-UX](issues/27-embed-ux.md), [ADR-0004](../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md), [Unity-WebGL-Embed-Fakten](issues/04-unity-webgl-embed-fakten.md), [Build-Spike](issues/16-build-spike.md). Prototype of the Theater: local throwaway branch `prototype/embed-ux` (commit `39394fc2`), `.scratch/nuxt-portfolio/prototype-design-richtung/embed-ux.html?ux=C2-2d`, fake build under `builds/a-fraction-of-time/`.

**The site launches without any Embed.** No Project has `embed`, and "Im Browser spielen" only appears where `embed` is set. An Embed never carries content alone: without JavaScript, without WebGL 2 or on a phone the Project page is still complete (cover, gallery, Trailer). Everything below has to be in place so the first Embed (A Fraction of Time, rebuilt from its Unity project) is a content change.

### 11.1 Storage and delivery

- A Web build is committed as ordinary Git files under `public/builds/<slug>/` (no LFS; `.gitattributes`: `public/builds/** binary`) and so lands in the image. Release builds only; each stays in the Git history for good.
- Unity compression **"Brotli"** without Decompression Fallback. Nitro serves the literal `.br` with `Content-Encoding: br` and the original type (e.g. `application/wasm`), without config and without build time. There is no gzip fallback: `nuxt dev` (Vite sets no `Content-Encoding`) and plain-HTTP Firefox cannot run a build. The game is tested with Unity's "Build and Run", the integration in the production container with Chromium. Production is HTTPS-only (HSTS).
- `routeRules` for `/builds/**` (headers go per directory only; patterns by file extension do not match):
  - `/builds/*/Build/**`: `Cache-Control: public, max-age=31536000, immutable` (hashed names);
  - the rest of `/builds/**`: `no-cache`;
  - `X-Robots-Tag: noindex` (the Project page is canonical);
  - its own CSP ([§ 17](#17-security-headers-and-csp)).
- The iframe loads `/builds/<slug>/index.html?lang=de|en`. The trailing-slash plugin enforces `/builds/<slug>/` for the directory form.
- **Budget:** ≤ 50 MB per Embed, ≤ 100 MB for the Game mode (Content check 4). Reason: Nitro reads each static file fully into memory per request, so a visitor who is loading costs about the build's size in RAM. An Embed is a playable slice, not the whole game; the full demo stays a `download` link. A build over budget leaves the image (registry artefact or streaming server); the budget does not grow. Observation, not decided: a streaming route like `/media/**` could serve `/builds/**` too, if it sends `.br` with `Content-Encoding` itself.

### 11.2 Requirements for Web builds

**Unity builds:** WebGL 2; no native multithreading (so no COOP/COEP); no WebGPU; no Decompression Fallback; "Name Files As Hashes" on (it gives the hashed files under `Build/` that `/builds/*/Build/**` caches as immutable); `WebGLInput.captureAllKeyboardInput = false` for the Tab rule below; a small `.jslib` for links, because `Application.OpenURL` opens a new tab.

**Every Web build, whatever engine:**
- A minimal `index.html` template: the canvas fills the window, no engine chrome, **no fullscreen button**.
- **Tab must leave the game** (WCAG 2.1.2), so the build does not capture every key.
- Links from a build go only to paths of the site and open in the top window (`window.top.location.assign`), never in a new tab.
- The template owns loading, controls and errors, because the page learns nothing from the build:
  - **Loading:** ink; the title as a kicker in cyan; a 3 px cyan bar with a pink echo, large percent digits below; from 90 % "Startet …" (for Unity: `onProgress` covers only the download, 0–0.9, then it compiles); below that the controls as a list of keys.
  - **Errors:** "Das Spiel ließ sich nicht laden." with "Erneut versuchen" when the loader throws; "Die Grafik ist ausgestiegen." with "Neu starten" on `webglcontextlost`.
  - Without focus it shows "Klicken zum Spielen" at the bottom.
  - Texts in DE and EN, chosen by `?lang=`. The typeface is always Exo, as its own font file in the build directory (the template must not depend on the site's hashed font paths); it counts towards the budget.

### 11.3 Contract between site and Web build

1. The site always appends `?lang=de|en`. A build may ignore it.
2. Links from the build: own paths only, top window (above).
3. In the Game mode the site renders a fixed exit bar outside the iframe ([§ 12](#12-game-mode-frame-for-phase-2)).
4. No other coupling: no `postMessage`, no data.

### 11.4 The Theater

- "Im Browser spielen" in the Teaser opens the **Theater**: a modal `<dialog>` over the whole Project page. The page underneath is inert and does not scroll (no fight between mouse wheel and Screen snapping). Embeds run on desktop only, so there is no swiping. The iframe is created only on opening; before that no byte of the build loads.
- **Look:** a header in paper like the site's (60 px, 1.5 px ink line) with "← Zurück zur Seite", the joystick logo and the Project's title. Below it the stage in ink: the game sits centred with the aspect ratio from `embed.aspect` and fills the remaining space; the margins stay ink. An overlay in ink sits in the game's top right corner with two controls, the keyboard symbol and fullscreen. There is no ✕; back is in the header. States as in [§ 7.1](#71-visual-identity).
- **Keyboard and focus:** the game receives the keyboard only with the visitor's click into it; the page never focuses the iframe itself. The page knows the game has the keyboard when `document.activeElement` is the iframe. Then the keyboard symbol turns paper with a cyan line, a 2 px cyan frame surrounds the game, and the overlay fades to 35 % (back to full on hover and on Tab). "Tastatur im Spiel" / "Tastatur bei der Seite" appear as text only on hover, and via `aria-live` for screen readers; localized.
- **Fullscreen:** the overlay button calls `requestFullscreen()` on the wrapper of iframe and overlay (Chrome rejects the modal `<dialog>` itself: "Dialog elements are invalid"). The game fills the screen and the header disappears; ⛶ or Esc ends fullscreen. The iframe needs no `allow="fullscreen"`; Permissions-Policy `fullscreen=(self)` stays because the page itself requests it.
- **Leaving:** "← Zurück zur Seite", browser Back and Esc close the Theater. Esc only works while the keyboard is with the page; in fullscreen Esc ends fullscreen first. Opening pushes a history entry through the Nuxt router (not raw `pushState`) so Back closes it. A visit with that entry does not reopen the Theater; loading still needs the click. Closing removes the iframe, which frees the build; focus returns to "Im Browser spielen". A link from the game to the site cleans up through the page change. Reopening reloads the build, from cache (`immutable`).

### 11.5 Check points for the first Unity Web build

The owner exports a Unity 6 build to the requirements above. Checked in the production container, in Chromium and Firefox:
1. The loader starts in the iframe with literal `.br`. Exactly the CSP rights it needs (e.g. `blob:` in `script-src` or `worker-src`) go into the CSP of `/builds/**`.
2. It accepts `.data` served as `text/plain` (Nitro knows no type for it).
3. `compressPublicAssets` does not compress the `.br` files a second time.
4. The pattern `/builds/*/Build/**` matches; otherwise one rule per slug, generated from the content.
5. Removing the iframe frees the memory (browser task manager).
6. Tab leaves the game with `captureAllKeyboardInput = false`.
7. Sound starts only with the first click into the game (UNVERIFIED; assumed because the click on the page does not activate the new iframe).
8. Privacy: does Unity store anything in the browser (IndexedDB cache with "Data Caching", PlayerPrefs)? If so, extend the Privacy policy in the same change (likely basis § 25 Abs. 2 Nr. 2 TDDDG, because the build loads only after a click; unchecked reading).
9. The Theater's history entry triggers neither the time-jump transition nor a GA4 `page_view`; keep the URL unchanged if needed.
10. Re-evaluate `mem_limit: 512m` ([§ 19.3](#193-compose)).

---

## 12. Game mode frame for Phase 2

Sources: [Spielmodus und Mobil-Modus](issues/18-spielmodus-und-mobil-modus.md), [Seitenstruktur](issues/10-seitenstruktur.md), [Embed-Architektur](issues/13-embed-architektur.md), [Impressum-Lösung](issues/14-impressum-loesung.md).

The site goes live **without** the Game mode. This section fixes only the frame the game effort has to fit.

- **Two modes:** the content site on every device is canonical, prerendered and readable without JavaScript. The Game mode is optional, desktop-only, a Unity WebGL build on top of the site that never replaces it. On a phone there is no own mode and no PWA; the content site is built mobile-first and feels like an app.
- **No feature flag:** the route, the Home entry and the nav item arrive in the same release as the game. Until then none of them exist, not even as a placeholder. Profile `next` may announce the Game mode as text without a link.
- **Offered** only with a fine pointer, a wide viewport and WebGL 2, detected by capability, never by user agent. The base markup shows on the Home only the hint "Am Desktop gibt es einen Spielmodus" and no nav item; this holds without JavaScript, on a phone and without the capabilities. JavaScript replaces the hint with the start button and shows the nav item when the device fits. The hint stands only on the Home.
- **Route:** one per language, named by the game effort under these rules: short, ASCII, fitting the motif, not "Spiel", frozen from its first release, not one of the reserved paths ([§ 4.2](#42-pages)). The nav label follows the name. The glossary term stays *Game mode*.
- **Start screen:** light, loads the Unity build only after a click. It must meet Lighthouse ≥ 95, WCAG 2.2 AA and readability without JavaScript; without JavaScript, without WebGL or on a phone it shows a hint and links to the site. The game itself is exempt from WCAG, because the content site is the equivalent alternative.
- **Exit bar** outside the iframe, with the site's own i18n texts: "Zur Seite", CV, contact, Legal notice and Privacy policy (they must be "constantly available"). It works while the build loads or hangs. The game may link in addition.
- **Coupling:** only fixed URLs and the language. The game starts in the language of its route and links to Project pages, `/lebenslauf` / `/en/cv` and `/#kontakt` / `/en#contact`. The game has its own content; the site provides no data. The owner translates the game's texts.
- **Delivery:** a Web build under `public/builds/<game-dir>/` with a 100 MB budget. The game effort re-evaluates the registry variant, because the game will get new releases often.

---

## 13. Legal notice and Privacy policy

Sources: [Impressum und Datenschutz für ein privates Portfolio](issues/05-impressum-datenschutz-fakten.md), [Impressum-Lösung](issues/14-impressum-loesung.md), [Analytics und Consent](issues/23-analytics-und-consent.md). Facts with sources, no legal advice.

### 13.1 Classification

The owner takes no paid work through the site, but visitors may ask whether the owner is interested in something. § 18 Abs. 1 MStV applies for sure; § 5 DDG is disputed. The Legal notice meets both, so nothing hangs on the classification.

### 13.2 Legal notice (`/impressum`, `/en/legal-notice`)

- **Name:** Nick Philipp Häcker.
- **Address:** that of a Legal notice service holding a written authorization to accept service (Zustellungsbevollmächtigung), official and court service included. Excluded: the home address and a PO box (NLM guideline 2024). The service may forward mail to a PO box of the owner. The competent authority would be the LFK Baden-Württemberg; its position is unchecked. Options: Händlerbund 4.90–5.90 € / month (currently not bookable), Autorenglück from 4.50 € / month (unchecked).
- **E-mail:** readable for people without JavaScript, but not plain text in the markup: a decoy span hidden with CSS `display:none` sits in the middle of the address, with the link "E-Mail schreiben" to `/mail` next to it. § 5 Abs. 1 Nr. 2 DDG requires the address itself; a form does not replace it (KG Berlin 5 U 32/12, secondary source). In Mortensen's measurement `display:none` blocked 100 %.
- **Second fast contact path:** LinkedIn (EuGH C-298/07 asks for a further fast path; phone not required). UNVERIFIED whether LinkedIn qualifies. No phone. The Phase 2 form will add a path.

### 13.3 Privacy policy (`/datenschutz`, `/en/privacy`)

A short text of the owner's own, no generator (a generator may be used to cross-read; only what applies is taken over). Sections:
1. **Controller:** name, address and e-mail as in the Legal notice.
2. **Hosting:** Hetzner Online GmbH, servers in Nuremberg, as processor (Art. 28). Owner: sign the DPA with Hetzner (proposal to infra-18). Cloudflare is not named: it does DNS only, without proxy, and sees no visitors.
3. **Server:** no access log. The IP address is processed only to deliver the site (Art. 6 Abs. 1 lit. f). Error output of the services is rotated by size. Evidence: Nitro logs no requests (measured on the spike image); Coolify's Traefik has no access log without "Traffic analytics", which is off by default and needs Sentinel, which the infra plan switches off on the public server; Docker `json-file` with `max-size` 10m and `max-file` 3.
4. **Fonts and icons:** self-hosted, no requests to third parties. Videos are self-hosted too.
5. **E-mail contact:** messages lie with the mailbox provider Google (USA, Data Privacy Framework); purpose, legal basis and retention.
6. **External links** (GitHub, LinkedIn, itch.io, YouTube): data flows only on click; then the provider's policy applies.
7. **Consent and statistics** (blocks a–d):
   - The site's own code sets no cookie and writes nothing to browser storage; the only entries are those of a) and c).
   - a) **Cookiebot** (Usercentrics A/S), processor. Data: consent key, choice, time, URL, language, user agent, IP and geolocation. Sub-processors: Microsoft Azure (Ireland, fallback Amsterdam) and Akamai (USA). Cookie `CookieConsent`, 12 months. Basis: Art. 6 Abs. 1 lit. c in conjunction with Art. 7 Abs. 1 GDPR; § 25 Abs. 2 Nr. 2 TDDDG.
   - b) **Google Tag Manager:** loads only after consent. Basis: Art. 6 Abs. 1 lit. a GDPR, § 25 Abs. 1 TDDDG.
   - c) **Google Analytics 4** (Google Ireland Limited; Google LLC, USA): only after consent. Cookies `_ga` and `_ga_<id>`, 12 months. Data: pages viewed, the three events, outbound links, referrer, country, device category, browser language. Google stores no IP of EU visitors (per Google); Signals and advertising features are off. Raw data 2 months. Basis: Art. 6 Abs. 1 lit. a GDPR, § 25 Abs. 1 TDDDG. Third country: USA on the basis of the DPF (Art. 45 GDPR).
   - d) **Withdrawal:** at any time, effective for the future, via the Privacy settings button "Datenschutz-Einstellungen" (the same button appears here, with JavaScript).
   - The cookie list is own text; Cookiebot's cookie declaration (`cd.js`) is not embedded.
8. **Rights and complaint:** data subject rights (Art. 15–21) and the right to complain (Art. 77). Authority: "Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg", baden-wuerttemberg.datenschutz.de. Check the postal address when writing (the site names both Heilbronner Straße 35, 70191 Stuttgart, and Postfach 10 29 32, 70025 Stuttgart).

Web builds get no section at launch (§ 11.5, check point 8).

### 13.4 Rules

- **Both legal pages, both languages:** full English translations, opening with "The German version is authoritative." The German version is authoritative.
- **`noindex`:** the four legal pages set `useSeoMeta({ robots: 'noindex' })`, as a meta tag only (no `X-Robots-Tag`). They are not in the sitemap, but robots.txt does not block them, so the tag can be read. They are reachable from the footer of every page.
- **Statement in the same change:** whoever adds a third party, a cookie, a GTM tag or an access log changes the Privacy policy (and the cookie list) in the same change.
- **Check point at the first build:** copying the address from either legal page does not carry the decoy along, and a screen reader reads the address correctly.

---

## 14. Analytics and consent

Sources: [Analytics-Fakten](issues/22-analytics-fakten.md), [Analytics und Consent](issues/23-analytics-und-consent.md). No legal advice.

### 14.1 Goal

Analytics answers five questions, as totals only, without visitor profiles: which pages and Projects attract; where visitors come from; DE or EN; whether the CV PDF and contact are used; phone or desktop. Google Search (terms, impressions, clicks) is covered by the Search Console, not by Analytics. Tagged links only per channel via `utm_source` (e.g. `?utm_source=bewerbung&utm_medium=email`), never per recipient. GA4 does not evaluate `?ref=`.

### 14.2 Stack and loading order

- GA4 via Google Tag Manager; the Consent banner by **Cookiebot Premium Lite** (7 € / month; Free allows only one banner language and one-month consent).
- Cookiebot's `uc.js` sits directly in `<head>`, `async`, with **manual** blocking (no `data-blockingmode="auto"`), not via the GTM template.
- The GTM snippet is marked as a statistics script (presumably `type="text/plain"` with `data-cookieconsent="statistics"`, check point). Cookiebot starts it only after consent to the category statistics.
- **Before a choice nothing goes to Google.** Consent Mode *advanced* with its cookieless pings is therefore out. Reason: VG Hannover (2025-03-19, 10 A 5385/22, from matching law-firm summaries) holds GTM itself to require consent, and the DSK requires consent before access (OH Telemedien 1.1, lines 328–332).
- `@nuxt/scripts` is not used; the two snippets are plain head entries.
- Rejected: GTM before consent with Cookiebot via the GTM template (the VG Hannover case), an own banner, GA4 without GTM, cookieless counters (Umami, Plausible, server counting). Their facts are recorded in the ticket for a later revisit.

### 14.3 Consent banner

- Configured in Cookiebot in the style of D (its colours and Exo).
- A bar at the bottom, not modal: content stays readable and operable, focus is not trapped; ignoring it loads nothing.
- One layer: one sentence on the purpose ("Statistik mit Google Analytics, Daten gehen an Google in die USA"), a link to the Privacy policy, two equally sized, equally styled buttons "Ablehnen" and "Zulassen", in DE and EN.
- Without JavaScript: no banner and no tracking; content stays readable.
- On every page until a choice is made, the legal pages included.
- The choice lives in `CookieConsent` for 12 months with Cookiebot's consent key (`stamp`). Rejection is remembered too. If the banner or the cookie list changes, Cookiebot asks again.
- **Privacy settings:** "Datenschutz-Einstellungen" (EN "Privacy settings") in the footer of every page and in the Privacy policy calls `Cookiebot.renew()`. It is a `<button>` that appears only with JavaScript (without JavaScript there is no banner and nothing to withdraw). Reason for the footer: Art. 7 Abs. 3 GDPR, withdrawal as easy as consent.

### 14.4 GA4 settings

- Data retention 2 months (per articles it affects only explorations; check in Google's help).
- Google Signals off, ad personalization off, no Google Ads link, no User-ID.
- No granular location and device data (city and device model drop; country and device category stay, per secondary sources; check).
- `cookie_expires` 12 months instead of 2 years.
- Page views via enhanced measurement, including "page changes based on browser history events"; it also measures outbound links.
- Three custom events, via GTM's built-in click and form triggers, with a `dataLayer.push` in own code only where those do not work:
  - `cv_download`: the CV form was submitted;
  - `contact_mail`: click on `/mail`;
  - `contact_copy`: the copy button.
- Language follows from the path (`/en/…`); no own dimension.
- Own visits: the owner clicks "Ablehnen" on their own devices; no IP filter.

### 14.5 Browser storage

The site's own code sets no cookie and writes nothing to browser storage. The only exceptions: Cookiebot stores the choice in `CookieConsent`; GA4 sets `_ga` and `_ga_<id>` only after consent.

### 14.6 Security of GTM

GTM is a deliberate injection point. The `'unsafe-inline'` reasoning ([§ 17](#17-security-headers-and-csp)) holds only under these rules: only the owner has access to the container, with 2FA; template tags only; no Custom HTML and no custom JavaScript variables (hence no `'unsafe-eval'`).

### 14.7 Performance

Lighthouse measures the state before the choice, i.e. only Cookiebot (38 KB loader plus the banner data). GTM (89 KB) and gtag (154 KB) load only after consent.

---

## 15. SEO

Sources: [SEO-Fakten](issues/24-seo-fakten.md), [SEO zum Start](issues/25-seo-zum-start.md), [Seitenstruktur](issues/10-seitenstruktur.md). **No SEO modules** (`@nuxtjs/sitemap`, `nuxt-schema-org`, `nuxt-og-image`, `@nuxtjs/robots` all rejected).

### 15.1 Title and description

- Title: `<page title> · Nick Philipp Häcker`; the Home: `Nick Philipp Häcker · <headline>`.
- Description: Project page `summary`; Home `headline` + city; other pages one UI text per language. No length check.

### 15.2 Sitemap

- Written by an own Nitro hook: `prerender:route` collects every route with `contentType` `text/html` whose HTML carries no `noindex`; `prerender:done` writes `.output/public/sitemap.xml`. Static; nothing runs at runtime.
- One sitemap for both languages, `<loc>` only (absolute `https://athaeck.de/…`). No hreflang (the head tags are enough), no `lastmod` (Coolify clones shallow, Git dates would be wrong), no `priority`, no `changefreq`.
- Left out by themselves: the 404 (runtime), `/mail`, `/downloads/cv`, `/builds/`, `/media/` (not prerendered), `/_ipx` and `_payload.json` (not HTML), and the `noindex` legal pages. Legacy sites live on their own host.
- No Vitest for the hook.

### 15.3 robots.txt

Static in `public/`, an allowlist: search engines for ranking, the Internet Archive and preview bots. AI crawlers stay out, future ones included.

```
User-agent: *
Disallow: /

User-agent: Googlebot
User-agent: bingbot
User-agent: DuckDuckBot
User-agent: Applebot
User-agent: archive.org_bot
User-agent: LinkedInBot
User-agent: Twitterbot
User-agent: facebookexternalhit
User-agent: Discordbot
User-agent: TelegramBot
Allow: /

User-agent: Google-Extended
User-agent: Applebot-Extended
Disallow: /

Sitemap: https://athaeck.de/sitemap.xml
```

- No `Disallow` on single paths: the legal pages and `/builds/` must stay crawlable or their `noindex` is never read.
- Legacy sites stay indexable on their own host (old links point to them); this sitemap and robots.txt do not cover them.
- Limits: robots.txt is voluntary; user-triggered fetches ignore it (Slack, Meta-ExternalFetcher); Google's AI Overviews run on Googlebot and could only be limited with `nosnippet`/`noindex`. UNVERIFIED: the token `bingbot` (only from Lighthouse source), whether the preview bots honour robots.txt, whether `*` also covers product tokens (hence the explicit Google-Extended / Applebot-Extended block). Lighthouse `is-crawlable` only fails when `*`, Googlebot, bingbot, DuckDuckBot and archive.org_bot are all blocked, so SEO = 100 stays reachable.

### 15.4 JSON-LD

- Hand-written: a composable `useJsonLd(nodes)` writes one `<script type="application/ld+json">` via `useHead`, with `<` escaped as `\u003c`, plus a small builder per page type. It is a data block and does not touch the CSP.
- On every indexable page; not on the legal pages and not on the 404.
- Each page carries a self-contained `@graph`:
  - the page node: `@id` and `url` = canonical, `name` = title, `description`, `inLanguage`, `isPartOf` → `#website`;
  - `WebSite`, `@id` `https://athaeck.de/#website`: `name` "Nick Philipp Häcker", `alternateName` "athaeck", `url` (Google uses it for the site name only on `/`);
  - `Person`, `@id` `https://athaeck.de/#person`: `name`, `url`, `sameAs` (= `profiles`). **Never** `email`, never an address.

| Page | Page node | Extra |
|---|---|---|
| Home | `WebPage`, `about` → `#person` | `ItemList` of the Featured projects |
| About | `ProfilePage`, `mainEntity` → `#person` | Person also with `alternateName`, `description` (= `headline`), `image` (portrait) |
| CV | `WebPage`, `about` → `#person` | none |
| Projects | `CollectionPage` | `ItemList` of all Projects in page order |
| Project page | `ItemPage`, `mainEntity` → the Project | `BreadcrumbList`, one `VideoObject` per gallery video |

- **Project type by Kind:** `game` → `VideoGame`; `research` → `ScholarlyArticle`; `film` → `Movie`; `tool`, `asset` → `CreativeWork`. No `SoftwareApplication` (its rich result needs ratings). Fields: `name`, `description` (`summary`), `image` (`cover`), `url`, `inLanguage`, `genre`, `dateCreated` (start of the first Phase), `keywords` (Skill names), `award` (titles of its Achievements), `video`. The owner is `author` when every Phase has `teamSize` 1, otherwise `contributor`.
- `ItemList` in short form: `ListItem` with `position` and `url`.
- `BreadcrumbList` `Projekte › <Titel>`: two items, the last without `item`.
- `VideoObject`: `name` (= `caption`), `description` (= `alt`), `thumbnailUrl` (= `poster`), `uploadDate` (= `date`), `contentUrl` (absolute file URL). No `duration`. `video` links get no markup.
- Mark up only what is visible on the page.

### 15.5 OG and Twitter

- Project page: `og:image` is the `cover`, cut to 1200 × 630 via `$img` (ipxStatic) with `fit: cover` during the prerender; `og:image:alt` = `coverAlt`.
- Every other page: `public/og.png` (1200 × 630), made by hand by the owner from D (name, joystick logo, time-line motif, no language text); `og:image:alt` from a UI text.
- Tags: `og:title`, `og:description` (= title, description), `og:url` (= canonical), `og:image` absolute with `og:image:width`/`height`, `og:type website`, `og:site_name`, `og:locale` (`de_DE` / `en_US`) with `og:locale:alternate`, `twitter:card summary_large_image`.

### 15.6 Search Console and Bing

- A domain property `athaeck.de` on the owner's Google account (2FA), verified by DNS TXT in the Cloudflare zone (comment proposal to infra-05). Created **before** the cutover so data starts on day one. After launch the sitemap is submitted in the "Sitemaps" report; robots.txt names it too.
- Bing Webmaster Tools by import from the Search Console.
- No code, script or cookie on the site; the Privacy policy is unaffected. No property for `athaeck.github.io`.

---

## 16. Tech stack

Source: [Tech-Stack](issues/12-tech-stack.md) with its comments.

- **Node 26** (Active LTS, EOL 2029-04-30); `package.json` `engines.node: "^26.13.0"`.
- **npm** as shipped with Node; no Corepack, no pnpm, no `packageManager` field. `package-lock.json` in the repo, `npm ci` in the container, caret ranges. Dependency updates by hand with `npx nuxt upgrade`. `allowScripts` stays empty (npm blocks install scripts; sharp and esbuild come as platform-bound optional dependencies).
- **Nuxt `^4.6.4`** with the standard defaults, without `future.compatibilityVersion: 5`. TypeScript strict (default).
- **Modules, and no others:** `@nuxtjs/i18n` 10.6, `@nuxt/content` 3.16, `@nuxt/image` 2.2, `@nuxt/fonts` 1.2, `@nuxt/eslint` 1.17.
- **Content:** `database: { type: 'sqlite', filename: ':memory:' }` and `experimental.sqliteConnector: 'native'` (`node:sqlite`, no native module; nothing is written, so the container runs read-only).
- **Images:** `image.provider: 'ipxStatic'` ([§ 10.1](#101-images)).
- **Fonts:** `@nuxt/fonts` with `@fontsource-variable/exo` and `families: [{ name: 'Exo', provider: 'npm', weights: ['100 900'] }]`. Without that line Exo would come from Google at build time. Via npm the file is pinned by the lockfile and the build needs no network. Metric fallbacks stay on.
- **Styling:** plain CSS ([ADR-0003](../../docs/adr/0003-hand-written-css-no-utility-framework.md)): tokens as custom properties in one file (e.g. `app/assets/css/tokens.css`), everything else in `<style scoped>` with native nesting, the print stylesheet separate. No Tailwind, UnoCSS, Nuxt UI or preprocessor.
- **Icons without a module:** about 15 SVGs (GitHub, LinkedIn, itch.io, the 9 link types, mail, copy, arrow) from Lucide (ISC) and Simple Icons (CC0) in `app/assets/icons/`. A component `<AppIcon name>` loads them via `import.meta.glob('…/*.svg', { query: '?raw', import: 'default', eager: true })` and outputs inline SVG with `currentColor`. `@nuxt/icon` is out (server endpoint and fallback to `api.iconify.design`).
- **No 3D or motion library** (three.js, GSAP, Motion One, Lottie).
- **Lint and format:** `@nuxt/eslint` with ESLint 10 and `features.stylistic: true`. No Prettier, no Stylelint.
- **Typecheck:** `nuxt typecheck` with `vue-tsc` and **`typescript ~6.0.3`, pinned** (TypeScript 7 is the Go port without the classic JS API; `vue-tsc` 3.3 via `@volar/typescript` requires `typescript <7`).
- **Scripts:** `lint`, `typecheck`, `test`, `build`, `audit`.
- **Nitro:** preset `node-server`; `compressPublicAssets: true` (HTML, JS, CSS); prerender with `crawlLinks: true` and `prerender.ignore` for `/builds/`, `/media/`, `/mail` and `/downloads/`, so the crawler never fetches them.
- **i18n:** [§ 4.1](#41-locales). UI texts in the i18n language files.
- **Renovate:** the infrastructure's Renovate gets this repo with a `renovate.json` that enables only the Dockerfile manager (the base image tag in both `FROM` lines, one PR). npm updates stay manual.
- **No rate limiter** in the app; since `ipxStatic` the runtime computes almost nothing. If ever needed, it belongs at the proxy.

---

## 17. Security headers and CSP

Sources: [Tech-Stack](issues/12-tech-stack.md), [Analytics und Consent](issues/23-analytics-und-consent.md), [Embed-Architektur](issues/13-embed-architektur.md), merge decisions [§ 25](#25-decisions-taken-while-merging-2026-11-17). No `nuxt-security`. All headers come from `routeRules` under `$production` only (Vite's dev server needs WebSocket and eval).

### 17.1 Site, `/**`

- `Strict-Transport-Security: max-age=31536000`, without `includeSubDomains` and `preload` (the subdomains belong to the infrastructure).
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self)`
- `Content-Security-Policy`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://imgsct.cookiebot.com;
font-src 'self';
connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com;
frame-src 'self' https://consentcdn.cookiebot.com;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none'
```

- `frame-src` must keep `'self'`, or the same-origin Embed iframe would be blocked once the directive exists. `media-src` falls back to `default-src 'self'`, which covers `/media/`.
- `*.google.<TLD>` is added only if the console asks for it (check point). The Cookiebot hosts are so far backed only by search excerpts (check point).
- `'unsafe-inline'` in `script-src` is deliberate: the content comes from the repo; the only inputs are `lang` on the CV POST (validated) and `/mail` without parameters; hashes would have to be computed per prerendered page and nonces would need runtime rendering. GTM is the one intended injection point and is fenced by [§ 14.6](#146-security-of-gtm). With Strapi or a form in Phase 2, `script-src` is re-evaluated with hashes and nonces.
- `'wasm-unsafe-eval'` is not in the site CSP; only Web builds need it.

### 17.2 Web builds, `/builds/**`

Its own CSP, without analytics hosts. Until the first Unity build proves what more it needs (§ 11.5, check point 1):

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none'
```

Plus `X-Robots-Tag: noindex` and the caching of [§ 11.1](#111-storage-and-delivery).

### 17.3 Caching

| Path | `Cache-Control` |
|---|---|
| `/_nuxt/**`, `/_fonts/**` | `public, max-age=31536000, immutable` (content-hashed; Nuxt's default for `/_nuxt/`, verify) |
| `/builds/*/Build/**` | `public, max-age=31536000, immutable` |
| `/media/**` | `public, max-age=31536000, immutable` (set by the route) |
| `/health`, `/downloads/cv` | `no-store` |
| everything else (HTML, `/_ipx/**`, `og.png`, `robots.txt`, `sitemap.xml`, the rest of `/builds/**`) | `no-cache` (revalidate by ETag) |

---

## 18. Server surface

Everything that runs at runtime, in one place:

| Path | Implementation | Behaviour |
|---|---|---|
| `/health` | `server/routes/health.ts` | `200 {"status":"ok","version":"<SOURCE_COMMIT>"}`, `"unknown"` without the variable; liveness only; `no-store` |
| `/mail` | `server/routes/mail.ts`, `prerender: false` | GET/HEAD → 302 `mailto:` with an empty body; else 405 ([§ 9.2](#92-footer-contact)) |
| `/downloads/cv` | `server/routes/downloads/cv.ts` | POST → PDF; GET → 303; bad `lang` → 400; else 405 ([§ 9.3](#93-cv-pdf-download)) |
| `/media/**` | `server/routes/media/[...path].ts` | Range streaming ([§ 10.2](#102-videos)) |
| 404 | Nuxt error page, rendered at runtime | per language ([§ 7.9](#79-404)) |
| every request | Nitro plugin on `request` | trailing-slash 301 ([§ 4.2](#42-pages)) |
| prerender | Nitro hooks `prerender:route`, `prerender:done` | sitemap ([§ 15.2](#152-sitemap)) |
| static | Nitro static handler | `.output/public` incl. `/_ipx` variants and `/builds/**` (literal `.br`) |
| redirects | `routeRules` | renamed slugs; `/<old-name>/**` → 301 to the Legacy host; `/free3d.github.io/**` → 301 Free3D's Project page |

---

## 19. Build, deploy and operations

Sources: [Deploy-Fakten](issues/06-deploy-fakten.md), [Build- und Deploy-Pipeline](issues/15-build-deploy-pipeline.md), [Abgleich mit athaeck-infra](issues/20-abgleich-infra.md), [Build-Spike](issues/16-build-spike.md).

### 19.1 Repo

- This repo becomes the website repo of the infrastructure. It moves with its full history to Forgejo as **`athaeck.de`** (`athaeck-de` is the old Nuxt 2 project); `multi-language-nuxt` becomes `main` there. `main` is protected; the development branch does not deploy. No Git hooks.
- On GitHub, `athaeck.github.io` is reduced to the redirect pages at the cutover, not archived.
- The old static vCard site on this branch (`index.html`, `assets/` …) is replaced by the Nuxt app; its content has been taken over into the inventory. `index.txt`, blog, testimonials and clients are template lorem and are dropped.
- Research branches (`research/*`) and prototype branches stay local and are never pushed or merged.
- `.gitattributes`: `public/builds/** binary`; no LFS anywhere in the repo. Legacy sites are not in this repo.

### 19.2 Dockerfile

```dockerfile
FROM --platform=$BUILDPLATFORM node:26.13.1-alpine3.24 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run lint
RUN npm run typecheck
RUN npm test
RUN npm run build

FROM node:26.13.1-alpine3.24
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
COPY --from=build /app/media ./media
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/health || exit 1
CMD ["node", ".output/server/index.mjs"]
```

- Two stages; the image holds only `.output` and `media/`. Files belong to root; the process runs as `node` (uid 1000) and cannot change them. No separate dependency stage, no npm cache mount: the `npm ci` layer stays cached while the lockfile is unchanged.
- The base image is an exact tag without digest (infra rule "foreign images at fixed versions"), written twice without an `ARG`; Renovate changes both lines in one PR. Coolify builds with `--pull`, so rebuilt images of the same tag (Alpine patches) arrive without a PR.
- `FROM --platform=$BUILDPLATFORM` keeps it cross-build-capable (a later x86 runner can build for `linux/arm64` without emulation; with `ipxStatic` no `*.node` and no sharp end up in `.output/server`, per the spike).
- The build always runs in the container (sharp binaries are platform-bound; a Windows build also warns about `cache-driver.mjs`).
- `.dockerignore`: `.git`, `node_modules`, `.nuxt`, `.output`, `.scratch`, `docs`.
- `HEALTHCHECK` lives in the Dockerfile (busybox `wget`; the image has no curl). Under Compose it does not hold up a deployment; it shows the status, and later serves as the dashboard check of the registry path. Gatus reports outages from outside.

### 19.3 Compose

`docker-compose.yaml` in the repo root:

```yaml
services:
  web:
    build: .
    read_only: true
    cap_drop: [ALL]
    security_opt: ["no-new-privileges:true"]
    mem_limit: 512m
```

- No `tmpfs` (the content DB is `:memory:`), no `environment:` (Coolify's `.env` carries `SOURCE_COMMIT`). Coolify keeps these keys (it only sets `container_name`, `restart`, `labels`, `networks`, `env_file` and the image tag).
- `mem_limit: 512m`: the CAX11 shares its memory with NetBird; an overrun hits only this container, which restarts. Re-evaluate with the first Embed, because Nitro holds every running static download fully in RAM. Videos stream and do not count.

### 19.4 Coolify

- Build pack **Docker Compose**, as infra-22 sets for every service. The short interruption when the containers swap after the build is accepted.
- Coolify builds on deployment on the public CAX11 (infra-22). It clones through the Gitea source as `deploy` on `git.int.athaeck.de:8443` (infra-12, infra-18), not with a deploy key.
- Domains on the service: `https://athaeck.de:3000,https://www.athaeck.de:3000`. "Redirect to non-www" and **"Permanent redirect" on**, so `www` → apex and `http` → `https` redirect permanently (path and query are kept). TLS via Let's Encrypt with the HTTP challenge (infra-18).
- "Include source commit in build" off: `SOURCE_COMMIT` exists only at runtime, which keeps the build cache.
- No watch paths: commits that touch only planning files build from the cache thanks to `.dockerignore`.
- Only one deploy path at launch. "Image from the own registry" comes with the infrastructure's runner server; its name and tag scheme are set then, and a commit `ARG` is not added in advance.
- Build memory: the spike peaked at 1.41 GB for `nuxt build` (steps run one after another, so the maximum counts). infra-18 measures the real build on the CAX11 and adds swap (proposal); above about 2.5 GB the runner server from infra-22 comes.
- A failing gate step fails `docker build`, the old version keeps running and Coolify reports it.

### 19.5 README check (pipeline part)

1. `curl https://athaeck.de/health` shows the commit just deployed.
2. `curl -I 'http://www.athaeck.de/projekte?x=1'` redirects permanently to `https://athaeck.de/projekte?x=1`; record the status code (301 or 308) once.
3. Coolify shows the container as `healthy`.
4. Spot check: one DE and one EN page, a 404, `/mail` → 302, the CV POST → PDF.

---

## 20. Testing

Source: [Teststrategie](issues/21-teststrategie.md) with its comments. Principle: what needs no browser runs automatically in the gate; what needs a browser runs by hand through one command, and the README says when.

### 20.1 Unit tests in the gate (`npm test`, Vitest)

- The seven Content checks ([§ 6](#6-content-checks)), each with a good and a broken fixture, so it is proven that every check fires (the real build only ever shows the good case).
- The trailing-slash rule: slash enforced under `/builds/`, removed elsewhere; edge cases `/`, `/en/`, a query, a file path under `/builds/`.
- The `/media/**` route: Range parsing and the path pattern (a trust boundary, hence the exception to "no unit tests for server routes").
- No unit tests for `/health`, `/mail`, the CV POST and the sitemap hook; the README spot check covers them.
- Order in the build stage: `lint`, `typecheck`, `test`, `build`, sequentially, so the RAM peak stays that of the build.

### 20.2 Browser audit (`npm run audit -- <base-url>`, by hand)

- Not in the gate: it would need Chromium and a running server in the build stage on the shared CAX11; Lighthouse fluctuates on shared vCPUs; Cookiebot and GTM behave for real only on `athaeck.de`; a GTM change can break the CSP without any build.
- Tools: Playwright with `@axe-core/playwright`, plus Lighthouse. They stay out of the Docker build; whether in their own folder or via `npx` with fixed versions is up to the build. It runs from the owner's PC: against `http://localhost:3000` (production container) for feedback while building, against `https://athaeck.de` for the numbers that count.
- Page types: Home, Projects, one Project page, CV, About, Legal notice, Privacy policy, 404; in DE and EN, 16 pages.
- **axe** with the tags up to WCAG 2.2 AA, and the **no-JavaScript check** (the main content is in the HTML, no empty `<ClientOnly>`): all 16 pages.
- **Lighthouse** mobile on one DE page per type, median of three runs, always before the consent choice. Fails if any category is below 0.95 or SEO below 1.0.
- **Sitemap check:** every URL in `sitemap.xml` returns 200, carries no `noindex`, and its canonical is itself.
- **CSP:** Playwright collects `securitypolicyviolation` on all 16 pages before the choice, plus one page each with consent and with rejection (against `athaeck.de` only). The GTM preview is checked by hand (Tag Assistant).
- **When** (rules in the README next to the README check; no schedule): at the first build; at launch against `athaeck.de` as the condition for the cutover (after the deploy in infra-18, before the redirects in infra-19); after any change to layout, components, CSS, `routeRules` or CSP; after every publish in the GTM container (then only the CSP part against `athaeck.de`). Content-only changes need no audit; the gate and the schemas cover them.

### 20.3 Hand checklist (README section; at launch and after larger layout changes)

- axe finds only part of the WCAG 2.2 AA violations.
- Keyboard only through every page type: visible focus, sensible order, skip link, Skill popover, Consent banner, Chronoscope.
- Zoom 200 % and reflow at 320 px.
- `prefers-reduced-motion`: the time-jump overlay is gone.
- A short pass with NVDA.
- Print preview of the CV page.
- A real phone; Firefox and Safari too (the audit runs only in Chromium).
- The Trailer plays on a real iPhone, in Safari on the Mac and in Firefox.
- Once the first Embed exists, the Theater: open it by keyboard; Tab reaches "← Zurück zur Seite" and fullscreen; Esc closes it before the click into the game and focus returns to the button; fullscreen fills the screen; in Chrome, Firefox and Safari.
- At launch, once: the Rich Results Test on `/`, `/projekte` and one Project page without errors (if it cannot fetch, robots.txt blocks Googlebot); the Search Console robots.txt report; LinkedIn Post Inspector and a preview on X for one Project page.

---

## 21. Translation workflow

Source: [Übersetzungs-Workflow](issues/17-uebersetzungs-workflow.md).

- **German is the Source language.** The model stores no source language. In the build phase the existing content is translated once from its own language: texts of the old site EN → DE, the CV DE → EN. After that, every change in meaning goes into German first, and English follows. The owner may polish English wording without German following.
- **Tool:** Claude Code in the repo via a project skill (working name `translate-content`), written by the build effort. It contains the style rules (du; US English), a term list from the UI texts, the rule to leave facts untouched and to translate lists 1:1 (same entries, same order), the rule that proper names stay unless an official version exists (Hochschule Furtwangen → Furtwangen University), and the duty to set `unreviewed: true` on every file it writes, drafts included (e.g. `learnings` drafted from the inventory).
- The translation lands in the **same commit** as the source change. No translation service, no translation step in the build (reproducible, no API key).
- **Review:** the owner deletes the `unreviewed` line after reading; `git diff` shows what is new. Any remaining marker stops the build. Deliberate cost: during the build phase `npm run build` fails while reviews are open, so translating and reviewing go at the end of a work step.
- **Stale translations:** no field. Protection is the process (translation follows in the same commit) plus the Content check *list match*. Accepted gap: whoever changes only one language without the skill is not warned.
- **UI texts** (i18n language files): same source and skill, but no marker (no front matter); the owner reviews them once by diff in the build effort.

---

## 22. Legacy sites and cutover

Sources: [Abgleich mit athaeck-infra](issues/20-abgleich-infra.md), [Teststrategie](issues/21-teststrategie.md), [SEO zum Start](issues/25-seo-zum-start.md), merge decisions on Free3D and the Legacy host ([§ 25](#25-decisions-taken-while-merging-2026-11-17)).

- **Legacy site:** a page from the GitHub Pages era, not content of the site, no Project page of its own, not a Web build. A Project may point to it with a `play` link.
- **Legacy host:** the Legacy sites are **not in this repo and not in the site image.** A separate static nginx service serves them unchanged under their old path names on their own subdomain (working example `alt.athaeck.de/<old-name>/`; the name is set by the infrastructure). It has its own origin and its own headers, and it brings what Nitro lacks: Range, streaming and low memory per download (nginx spike in [Abgleich mit athaeck-infra](issues/20-abgleich-infra.md): 137 of 137 checks, 14 → 41 MiB at 20 parallel 40 MB downloads). Service, DNS, TLS, headers and README check belong to the infrastructure (comment proposal in infra-19). The site's strict CSP never has to accommodate old code.
- **On athaeck.de**, the old names stay reserved and each `/<old-name>/**` redirects 301 to the same path on the Legacy host, so old paths work whichever way GitHub forwards them. When a Legacy site's Project gets an Embed, the build is committed anew under `/builds/<slug>/`, and the old page redirects 301 to the Project page.
- Which sites come along, the owner chooses in infra-19 (candidates: `Chess-Game`, `PRIMASS21`).
- **Free3D is not a Legacy site.** Its Project page carries up to 3 clips in `media/`, and `/free3d.github.io` with everything below it redirects 301 to Free3D's Project page. The name stays reserved.
- **`a-fraction-of-time-demo-releases` is not a Legacy site.** The demo download of A Fraction of Time is a `download` link to a place outside the repo (e.g. the own itch.io page; the owner decides with the content).
- The old Web builds are already offline (`athaeck.github.io/A-fraction-of-time/` ends in a 404, `athaeck.github.io/VisualNovel/` is 404).
- **Import check** (done by infra-19 for each Legacy site): `grep` for `="/` (root-relative paths not starting with the own name break) and for `athaeck.github.io` (absolute links work only while the GitHub redirects stand); click through once on the Legacy host, watching the console for errors; repair findings or note them as known gaps. No recurring test.
- **Cutover** is run by the infrastructure (infra spec "Reihenfolge" step 2, infra-05, infra-18, infra-19). The site only has to answer: the redirect page for `athaeck.github.io/` points to `athaeck.de/`, the old Legacy paths point to the Legacy host (directly from GitHub or via the 301s above), and Free3D's old path points to its Project page. Proposal to infra-19: the GitHub redirect pages use an instant meta refresh (`content="0; url=…"`, which Google treats as permanent) plus `<link rel="canonical">` to the target. UNVERIFIED whether a `CNAME` file with `athaeck.de` would give a real 301 with path while DNS points to Hetzner.
- The launch audit against `athaeck.de` is the condition for the cutover ([§ 20.2](#202-browser-audit-npm-run-audit----base-url-by-hand)).

---

## 23. Owner tasks before launch

- Book the Legal notice service and grant the authorization to accept service.
- Sign the DPA with Hetzner (proposal to infra-18).
- Book Cookiebot Premium Lite, sign its DPA, and check whether Lite allows a freely styled banner with own CSS (if not, decide how close to D the configurable design gets; the equal "Ablehnen"/"Zulassen" buttons are not negotiable).
- Create the GA4 property, accept Google's data processing terms, apply [§ 14.4](#144-ga4-settings).
- Create the GTM container with 2FA and the owner as the only user.
- Create the Search Console domain property (DNS TXT via infra-05) before the cutover; import into Bing after launch; submit the sitemap.
- Build `public/og.png` from D.
- Produce the public CV PDFs ([§ 9.3](#93-cv-pdf-download)) and place them in `server/assets/cv/`.
- Review every Unreviewed text and the UI texts.
- Choose the Legacy sites in infra-19.
- Write `timeline`, `next`, and the `question`/`approach`/`result` texts and gallery picks of the Featured projects (AI drafts carry `unreviewed`).
- Click "Ablehnen" on own devices.

## 24. Check points for the first build

Not yet proven; the build effort verifies them, most through the first `npm run audit`:

1. The spike's container check on `node:26-alpine`: `--read-only`, the 404 with content, the prerendered `/_ipx` variants.
2. The `npm` font provider finds `@fontsource-variable/exo` for "Exo"; otherwise `families[].src` points at the woff2 in the package.
3. `curl /_ipx/w_321&f_avif/…` → 404, and there is no `sharp` under `.output/server/node_modules`.
4. The CSP blocks nothing of the site's own, on every page type; no CSP errors with consent, with rejection and in the GTM preview; whether `*.google.<TLD>` is needed; whether the Cookiebot hosts are complete.
5. `FROM --platform=$BUILDPLATFORM` works in Coolify's Compose build (BuildKit seen only in research).
6. The prerender crawler does not stop at `/mail`, `/downloads/`, `/builds/` or `/media/` (`prerender.ignore`), nor at `play` links to the Legacy host.
7. RAM and duration of the build on the CAX11 (infra-18).
8. Cookiebot: the attribute that marks the GTM snippet, the setting "ask again on change", and whether withdrawal deletes `_ga`/`_ga_<id>` (otherwise own code deletes them and reloads).
9. Lighthouse mobile without consent on the Home and a Project page.
10. When writing the Privacy policy: the transfer basis for Akamai, Google's DPF entry, Usercentrics' seat and log retention, whether Cookiebot keeps old banner texts as proof (DSK lines 882–889); GA4 help on retention and on country/device category without granular data.
11. The sitemap hook receives `contents`, and the sitemap holds exactly the expected URLs.
12. The `/_ipx` variant of the OG image and of every video `poster` is prerendered although it appears only in a meta tag or `<video poster>`; otherwise add it via the `x-nitro-prerender` header.
13. `curl --range 0-99 …/media/<slug>/<name>.mp4` → 206 with 100 bytes; without `--range` → 200 with the whole file; `/media/..%2f…` and `/media/x/../y.mp4` → 404; HEAD works.
14. With 20 parallel downloads of one video the container's RAM stays flat.
15. Copying the e-mail from a legal page excludes the decoy; a screen reader reads it right.
16. `/_nuxt/**` gets `immutable` (Nuxt default) and the other `Cache-Control` rules apply as in [§ 17.3](#173-caching).
17. The site's own code writes no cookie and no storage (DevTools → Application) before and after consent, apart from `CookieConsent`, `_ga`, `_ga_<id>`.
18. The `www` redirect: record 301 or 308 (README check).

For the first Unity Web build: [§ 11.5](#115-check-points-for-the-first-unity-web-build).

---

## 25. Decisions taken while merging (2026-11-17)

Gaps and contradictions found while merging, settled with the owner:

1. **Project text fields:** `question`, `approach` and `result` are new translated, optional fields for the "Entstehung" Screen. The Project's Markdown body is dropped.
2. **Gallery:** an entry gets an optional translated `text`; `caption` is the part's heading in "Im Spiel"; at most 3 entries per Project.
3. **Home timeline:** a new translated Profile list `timeline` `{year, label, text}`; ★ is derived from Featured achievements of the same year.
4. **Chronoscope content:** a new translated Profile list `next` `{label, text, href?}`. The Game mode may be announced there as text without a link before the game exists; that is not an entry and does not break "no placeholder".
5. **Free3D** is not a Legacy site (its 9 MP4s would not play in Safari without Range); `/free3d.github.io/**` redirects 301 to its Project page.
6. **Content check 7 "References"**, the full version ([§ 6](#6-content-checks)).
7. **Glossary:** new terms *Chronoscope*, *Screen*, *Teaser*, *Content check*. Sharpened: *Project* (Kind values), *Trailer* ("unless an Embed can run"), *Game mode* (own content), *Profile* (timeline, next).
8. **Accepted proposals:**
   - CSP `frame-src 'self' https://consentcdn.cookiebot.com`; `'wasm-unsafe-eval'` only in `/builds/**`.
   - HSTS `max-age=31536000` without `includeSubDomains`/`preload`.
   - Permissions-Policy as in [§ 17.1](#171-site-).
   - Cache-Control as in [§ 17.3](#173-caching).
   - `compressPublicAssets: true` stated explicitly.
   - `prerender.ignore` for `/builds/`, `/media/`, `/mail` and `/downloads/` (since item 10 there are no Legacy prefixes left to ignore).
   - The video route is `[...path].ts` with GET + HEAD (the spike showed `.get.ts` serves no HEAD).
   - The Video check owns all four limits (size, codec, faststart, no audio).
   - The Skill count covers Projects and CV entries ("6 Belege").
   - An ongoing Project sorts as newest in the Archive.
   - The Screen title is "Im Spiel" for `game`, "Einblicke" otherwise.
   - The DE label is "Projekte" everywhere (nav, path, links).
   - The EN code words are SOON (Home) and LOST (404).
   - Privacy settings is a JS-only button.
   - Renovate is limited to the Dockerfile.
   - Image sources live under `public/images/<slug>/`.
   - The Theater's history entry triggers neither the transition nor a page view (check point).
   - Profile `email` is the single source of the address.
   - ADR-0001 is updated to the current server duties; ADR-0002 gets the list-match consequence and the new lists.
9. **Derived while merging:**
   - The list-match facts include `poster`, `date`, `year` and `href`.
   - Skill group keys are English (`languages`, `engines` …), with labels from UI texts.
   - The trailing-slash plugin touches directory paths only.
   - The reserved paths are extended by the site's own top-level paths.
   - The current role on the CV page is the latest `work` entry.
   - The EN Screen titles are proposed UI texts.
10. **Legacy host:** Legacy sites leave this repo and the site image for a separate static nginx service on its own subdomain (the owner's question during the cross-check). This replaces `public/<old-name>/` from [Abgleich mit athaeck-infra](issues/20-abgleich-infra.md). The trailing-slash plugin keeps only `/builds/`, and athaeck.de redirects the old names. Free3D stays out all the same.
11. **Corrections after an independent cross-check** against the tickets (accepted by the owner):
    - The `next` items are readable in the HTML without JavaScript.
    - Media fields hold bare file names, and video names match the route's pattern.
    - List match also covers `interests`.
    - Privacy settings is a button, in the glossary too.
    - The Privacy policy states the own-code rule and also names self-hosted videos and YouTube links.
    - The Web build requirements are split into Unity-specific and general ones.
    - Ticket 13's rules are back: an Embed never carries content alone; two scenes make one build; third-party viewers stay links.
    - `summary` serves the Teaser and the meta description; cards show none.
    - The Skill links name both languages.
    - Until the game effort names its directory, `public/builds/` holds Embeds only.

## 26. Open risks and UNVERIFIED points

- LinkedIn as the second fast contact path (EuGH C-298/07) is unchecked; the LFK Baden-Württemberg's position on Legal notice addresses is unchecked.
- Cookiebot Premium Lite may not allow own CSS for the banner.
- Strapi: ordered relations and localizable alt text are UNVERIFIED (Phase 2).
- Unity 6 loader needs (`blob:`, workers), sound only after the click, and `.data` as `text/plain` are unproven until the first Unity build.
- The arm64 build on the real server and BuildKit in Coolify's Compose build are untested.
- robots.txt tokens and preview-bot behaviour are partly unverified.
- Whether a `CNAME` file on GitHub Pages yields a real 301 with path is unverified.
- The bot protection of the CV PDF rests on an unmeasured assumption; the address remains in the PDF and on the old site.
- At 375 × 667 three Project page Screens exceed one viewport height.
- Only one language changed without the skill goes unnoticed.
- The Legacy host is a proposal to the infrastructure (infra-19); until it accepts, the Legacy sites have no home. The site does not depend on it except for the 301 targets.

## 27. References

- Map and tickets: [map.md](map.md), [issues/](issues/).
- Assets: [content-inventory.md](content-inventory.md), [vorlagen-sichtung.md](vorlagen-sichtung.md).
- Prototypes: design D in [prototype-design-richtung/](prototype-design-richtung/index.html) (this branch); the Theater on the local branch `prototype/embed-ux` (`39394fc2`).
- Research with sources, on local branches (never pushed), each under `.scratch/nuxt-portfolio/research/`: `research/portfolio-landschaft`, `research/nuxt-stack-fakten`, `research/unity-webgl-embed-fakten`, `research/impressum-datenschutz`, `research/deploy-fakten`, `research/analytics-fakten`, `research/seo-fakten` (read with `git show <branch>:<path>`).
- Infrastructure: `E:/Projekte/athaeck/athaeck-infra` (`.scratch/ausbaustufe-1/spec.md`, tickets infra-05, -12, -18, -19, -22).
