# Inhalte: die 14 Projects mit Covern, Galerie und Videos

Status: needs-info
Blocked by: 16, 17

## Ziel

Alle 14 Projects (7 Featured, 7 im Archive) liegen als Content mit Cover, Galerie und den Free3D-Clips im Repo, in DE und EN, markiert mit `unreviewed: true`. Danach sind alle sieben Content checks bis auf *Unreviewed* grün.

## Spec-Abschnitte

- [§ 5.3 Project](../../nuxt-portfolio/spec.md#53-project-strapi-collection-type-with-i18n), [§ 5.4 Gallery entries](../../nuxt-portfolio/spec.md#54-gallery-entries)
- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules), [§ 10.2 Videos](../../nuxt-portfolio/spec.md#102-videos)
- [§ 22 Legacy sites and cutover](../../nuxt-portfolio/spec.md#22-legacy-sites-and-cutover) (alte Web builds sind offline)
- [content-inventory.md](../../nuxt-portfolio/content-inventory.md) § 4 (Faktenbasis)

## Akzeptanzkriterien

- [ ] Je Project `content/projects/<slug>.yml` plus `de/` und `en/`: `kind`, `skills`, `links`, `cover`, `title`, `genre`, `summary`, `coverAlt`, `phases` (`context`, `teamSize`, `role`), `contributions`, `learnings`, `gallery`; für die Featured projects `question`, `approach`, `result` als Entwurf (der Owner schreibt sie in 50). Kein Markdown-Body, kein `embed`.
- [ ] **Offen (Lücke G4):** die eingefrorenen Slugs.
- [ ] `kind` je Project als Vorschlag, z. B. game (A Fraction of Time, AUREA, ElevEntures-Mayhem, AUREA Novel, Chess Game, ONA TECH), research (Free3D, Human Factors in VR, Connecting-Minds?), tool (Three.LS, Allocation Algorithm, Terrain Generator), film (FSJ Film), asset (Workbench). Zweifelsfälle im Ticket nennen.
- [ ] Jeder externe Link ist per HTTP geprüft; tote Links (z. B. `athaeck.github.io/A-fraction-of-time/…`, `…/VisualNovel/…`) fehlen. Ergebnisliste im Ticket.
- [ ] Cover: die Thumbnails aus `assets/images/thumbnails/` nach `public/images/<slug>/`. **Offen (Lücke G5):** fehlende Cover (Allocation Algorithm, ONA TECH) und zu kleine (ElevEntures-Mayhem 638 × 877, FSJ Film 720 × 576, Workbench 1019 × 987).
- [ ] Galerie: höchstens 3 Einträge je Project, ausgewählt aus den Kandidaten des Inventars in den lokalen Repos (angesehen, nicht nur nach Dateinamen); `alt` und `caption` je Sprache. **Offen (Lücke G8):** Bilder mit erkennbaren Dritten.
- [ ] Free3D: bis zu 3 Clips aus dem Repo der Projektseite, neu kodiert mit dem ffmpeg-Befehl aus § 10.2, unter `media/free3d…/` (Slug nach G4); je Clip `poster` (Standbild per ffmpeg) und `date`. Check 6 meldet nichts.
- [ ] Alle Bilddateien ohne Metadaten (EXIF). Keine Noten (höchstens ein Highlight im Fließtext), keine Namen von Teammitgliedern oder Betreuern.
- [ ] Texte über den Skill `translate-content` (16); jede Sprachdatei trägt `unreviewed: true`.
- [ ] Checks 1, 3, 4, 5, 6, 7 melden nichts; Check 2 meldet genau die Marker.
- [ ] `assets/images/thumbnails/` wird nicht mehr gebraucht (gelöscht wird in 38).
