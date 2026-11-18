# Content-Collections und zod-Schemas

Status: ready-for-agent
Blocked by: 01

## Ziel

Alle fünf Inhaltstypen (Project, CV entry, Skill, Profile, Page) sind als Collections mit zod-Schemas definiert und typisiert abfragbar. Eine Schema-Verletzung stoppt `npm run build`.

## Spec-Abschnitte

- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules) bis § 5.8, [§ 5.2 Layout](../../nuxt-portfolio/spec.md#52-layout)
- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks), letzter Absatz (Schema-Regeln)
- [ADR-0002](../../../docs/adr/0002-shared-facts-and-per-language-text-files.md)
- [§ 25](../../nuxt-portfolio/spec.md#25-decisions-taken-while-merging-2026-11-17) Punkte 1–4

## Akzeptanzkriterien

- [ ] Verzeichnislayout wie § 5.2. Je Typ eine Collection für das geteilte YAML und je Typ und Sprache eine für Markdown (`source: { include: 'de/projects/*.md', prefix: '' }`, `stem` = Slug bzw. id). Skill hat keine Sprachdateien, Page keine geteilte Datei.
- [ ] Felder, Pflichtfelder und Enums exakt nach § 5.3–5.8: `kind` (Project und CV entry), Link-Typen, Skill-Gruppen, `profiles[].type`, `embed.aspect` (`<zahl>/<zahl>`).
- [ ] Die Schemas lehnen ab: fehlende Pflichtfelder; unbekannte Enum-Werte; Daten außerhalb ISO 8601 mit variabler Genauigkeit (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`); Slugs und ids außerhalb kebab-case-ASCII; leere `phases`; mehr als 3 `gallery`-Einträge; Video-Einträge (`file` endet auf `.mp4`) ohne `caption`, `poster` oder `date`; Video-Dateinamen außerhalb `[a-z0-9-]+\.mp4`; Medienfelder mit Pfadanteil (nur bloße Dateinamen); `next[].href`, das weder mit `/` noch mit `#` beginnt.
- [ ] `unreviewed` ist in jeder Sprachdatei optional und erlaubt nur `true`.
- [ ] Nachweis pro Regel: eine kaputte Datei lässt `npm run build` scheitern (Fixtures nicht committet, Befehl und Ausgabe im Ticket).
- [ ] Warnt Nuxt Content bei Schemafehlern nur, statt abzubrechen: Die Schemas liegen an einer Stelle, die `content.config.ts` und der Check-Runner (04) importieren, und der Runner validiert damit zusätzlich. Befund im Ticket festhalten.
- [ ] `queryCollection` liefert in Seiten und Server-Routen die Typen aus den Schemas.

## Hinweise

- Strapi-Abbildung beachten (§ 5.9): Listen mit Text liegen nur in den Sprachdateien; ein einzelnes Bild ist geteilt, sein Alt-Text übersetzt.
- Echte Inhalte kommen mit 17–19; hier genügen temporäre Testdateien.
