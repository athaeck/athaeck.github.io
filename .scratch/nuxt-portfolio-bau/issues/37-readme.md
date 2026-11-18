# README

Status: ready-for-agent
Blocked by: 15, 36

## Ziel

Die README ersetzt die alte und sagt, wie man die Seite baut, Inhalte pflegt, Videos und Web builds liefert, und wann welche Prüfung läuft.

## Spec-Abschnitte

- [§ 19.5 README check](../../nuxt-portfolio/spec.md#195-readme-check-pipeline-part)
- [§ 20.2](../../nuxt-portfolio/spec.md#202-browser-audit-npm-run-audit----base-url-by-hand), [§ 20.3 Hand checklist](../../nuxt-portfolio/spec.md#20-testing)
- [§ 10.2 Videos](../../nuxt-portfolio/spec.md#102-videos), [§ 11 Web builds](../../nuxt-portfolio/spec.md#11-web-builds-embeds-and-the-theater), [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow), [§ 13.4 Rules](../../nuxt-portfolio/spec.md#134-rules)

## Akzeptanzkriterien

- [ ] Start: Node 26, `npm ci`, die Scripts; der Build läuft für Releases im Container (sharp ist plattformgebunden).
- [ ] Inhalte: Layout aus § 5.2, Deutsch zuerst, Skill `translate-content`, Review durch Löschen von `unreviewed`; die sieben Content checks in einem Satz je Check; Slugs sind eingefroren (Umbenennen nur mit 301).
- [ ] Videos: Format, Budget, der ffmpeg-Befehl aus § 10.2, die Regel „nie überschreiben, neuer Name“.
- [ ] Web builds: Ablage `public/builds/<slug>/`, nur Release-Builds, Unity „Brotli“ ohne Decompression Fallback, Budget, die Anforderungen aus § 11.2 und der Vertrag aus § 11.3.
- [ ] Regel „Erklärung im selben Change“: wer eine dritte Partei, ein Cookie, einen GTM-Tag oder ein Zugriffsprotokoll ergänzt, ändert die Privacy policy mit.
- [ ] README-Check (§ 19.5), Anlässe des Audits (§ 20.2) und die Hand-Checkliste (§ 20.3) wörtlich übernommen.
- [ ] Die reservierten Pfade samt alter Namen (15) und die Herkunft und Lizenz der Icons (20).
