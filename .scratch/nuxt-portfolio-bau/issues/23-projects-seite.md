# Projects-Seite mit Featured-Raster und Archive

Status: ready-for-agent
Blocked by: 18, 22

## Ziel

`/projekte` und `/en/projects` zeigen die 7 Featured projects als Karten und das Archive als Zeitleiste. Karte, Projektreihenfolge und Datumsanzeige entstehen hier und dienen Home und Project page.

## Spec-Abschnitte

- [§ 7.4 Projects page](../../nuxt-portfolio/spec.md#74-projects-page)
- [§ 5.3 Project](../../nuxt-portfolio/spec.md#53-project-strapi-collection-type-with-i18n) (Kartenzeile, abgeleitete Achievements), [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules) (Datumsgenauigkeit)
- [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld) (CollectionPage, ItemList)

## Akzeptanzkriterien

- [ ] Screen „Featured“ (ink): die 7 Karten in der Reihenfolge von Profile `featured` als Raster 4 + 3; die freie achte Kachel führt zum Screen „Archiv“.
- [ ] Projektkarte als Komponente: Cover per `<NuxtImg>` (Alt = `coverAlt`), Titel, Zeile *Kind · Platforms · Genre* (Kind-Label aus UI-Texten, Platforms = Skills der Gruppe `platforms`), Badge, wenn ein `achievement`-CV-entry per `project` auf das Project zeigt. Keine `summary`.
- [ ] Screen „Archiv“ (paper): links große Jahreszahl, rechts Zeilen mit Titel und Kartenzeile; sortiert nach dem Ende der letzten Phase, neueste zuerst, als Text; leeres `end` zählt als neueste. Jede Zeile verlinkt ihre Project page. Keine Filter.
- [ ] Ein Helfer liefert alle Projects in Seitenreihenfolge (Featured in Profile-Reihenfolge, dann Archive wie oben); 24 (nächstes Project) und das JSON-LD nutzen ihn.
- [ ] Ein Helfer zeigt Daten in genau der gegebenen Genauigkeit, lokalisiert (z. B. `2017`, `Okt. 2023` / `Oct 2023`, `30.01.2026` / `Jan 30, 2026`).
- [ ] Die Route `/projekte/[slug]` (EN `/en/projects/[slug]`) existiert mindestens schlicht (Titel, Pfad), damit der Prerender keine toten Links findet; ein unbekannter Slug antwortet 404. 24 baut sie aus.
- [ ] SEO: Titel und Description als UI-Text; JSON-LD `CollectionPage` mit `ItemList` aller Projects in Seitenreihenfolge (`ListItem` mit `position` und `url`).
- [ ] Ohne JavaScript vollständig lesbar und bedienbar; alle 14 Projects in beiden Sprachen vorgerendert.
