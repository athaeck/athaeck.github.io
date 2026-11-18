# Project page: Teaser, Entstehung, Learnings, nächstes Project

Status: ready-for-agent
Blocked by: 23

## Ziel

Jedes Project hat eine vollständige Project page in DE und EN aus einem Template, das nur zeigt, was da ist. Galerie und Trailer (25) und das Theater (27) kommen danach dazu.

## Spec-Abschnitte

- [§ 7.5 Project page](../../nuxt-portfolio/spec.md#75-project-page) (Screens 1, 3, 4, 5; Haupt-Button Fälle 3 und 4)
- [§ 4.2 Pages](../../nuxt-portfolio/spec.md#42-pages), [§ 4.3 Language rules](../../nuxt-portfolio/spec.md#43-language-rules)
- [§ 15.1](../../nuxt-portfolio/spec.md#151-title-and-description), [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld), [§ 15.5 OG and Twitter](../../nuxt-portfolio/spec.md#155-og-and-twitter)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 12 (OG-Variante)

## Akzeptanzkriterien

- [ ] Teaser (ganzer Screen, Cover als Hintergrund): oben links `<nav aria-label="Pfad"><ol>` mit `Projekte / <Titel>` (EN `Projects / <Title>`, `aria-label="Breadcrumb"`), letzter Punkt `aria-current="page"`, Exo in Versalien in Kicker-Größe; am Handy blendet CSS den letzten Punkt aus, es steht `← Projekte` und darunter groß der Titel. Dazu Titel, `summary`, Badges der Achievements, Haupt-Button, Fakten: Rolle und Team (aus `phases`), Zeitraum (erste bis letzte Phase), Engine (Skills der Gruppe `engines`), Plattformen.
- [ ] Haupt-Button hier: erster Eintrag in `links`, beschriftet nach Typ (UI-Text); sonst kein Button. Trailer (25) und Embed (27) setzen sich davor.
- [ ] „Entstehung“: die Phasen als Zeitleiste über die volle Breite; darunter bis zu vier Teile „Die Frage“ (`question`), „Der Weg“ (`approach`), „Das Ergebnis“ (`result` und `links` mit `<AppIcon>`), „Mein Beitrag“ (`contributions` und die Skills, je verlinkt auf `/lebenslauf#skill-<slug>` bzw. `/en/cv#skill-<slug>`). Ein Teil ohne Inhalt fehlt.
- [ ] „Was ich gelernt habe“: `learnings`.
- [ ] Nächstes Project in Seitenreihenfolge (Helfer aus 23); nach dem letzten ein Link zur Projects-Seite, keine Schleife.
- [ ] Ein Screen ohne Inhalt fehlt. Featured und Archive nutzen dasselbe Template.
- [ ] Sprachumschalter im vorgerenderten HTML: `/projekte/<slug>` ↔ `/en/projects/<slug>`.
- [ ] SEO: Description = `summary`; `og:image` = `cover` per `$img` beim Prerender auf 1200 × 630 mit `fit: cover`, `og:image:alt` = `coverAlt`. Prüfpunkt 12: die `/_ipx`-Variante liegt in `.output/public` (sonst per `x-nitro-prerender` nachziehen).
- [ ] JSON-LD: `ItemPage` mit `mainEntity` → Project, Typ nach Kind (`VideoGame`, `ScholarlyArticle`, `Movie`, sonst `CreativeWork`), Felder wie § 15.4 (`dateCreated` = Start der ersten Phase, `keywords` = Skill-Namen, `award` = Titel der Achievements); Owner als `author`, wenn jede Phase `teamSize` 1 hat, sonst `contributor`; `BreadcrumbList` mit zwei Einträgen, der letzte ohne `item`.
- [ ] Unbekannter Slug → 404 (die eigene 404 kommt mit 34). Alle 28 Project pages ohne toten Link vorgerendert; ohne JavaScript vollständig.
