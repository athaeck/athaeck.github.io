# Route `/media/**` mit Range und Streaming

Status: ready-for-agent
Blocked by: 01

## Ziel

Videos unter `media/` spielen in allen Browsern, Safari eingeschlossen: Die Route streamt mit Byte-Ranges und hält nie eine ganze Datei im Speicher.

## Spec-Abschnitte

- [§ 10.2 Videos](../../nuxt-portfolio/spec.md#102-videos)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface), [§ 17.3 Caching](../../nuxt-portfolio/spec.md#173-caching)
- [§ 20.1 Unit tests in the gate](../../nuxt-portfolio/spec.md#20-testing) (Range-Parser und Pfadmuster)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkte 13 und 14

## Akzeptanzkriterien

- [ ] `server/routes/media/[...path].ts` beantwortet GET und HEAD; andere Methoden → 405.
- [ ] Nur Pfade nach `^[a-z0-9-]+/[a-z0-9-]+\.mp4$` werden bedient, alles andere → 404. Die Dateien liegen unter `media/` relativ zum Arbeitsverzeichnis (`/app/media` im Image).
- [ ] Ohne `Range` → 200 mit ganzer Datei; ein Bereich (`a-b`, `a-`, `-n`) → 206 mit `Content-Range`; nicht erfüllbar → 416; mehrere Bereiche → ignoriert, 200.
- [ ] Header: `Accept-Ranges: bytes`, `Content-Type: video/mp4`, `Cache-Control: public, max-age=31536000, immutable`, korrektes `Content-Length`.
- [ ] Ausgeliefert wird per `createReadStream` mit Start und Ende.
- [ ] Range-Parser und Pfadmuster sind reine Funktionen mit Vitest: alle Bereichsformen, 416-Fälle, Mehrfachbereiche, `..`, `%2f`, Großbuchstaben, fremde Endung.
- [ ] Belegt im Produktions-Build mit einem Testclip (nicht committet): `curl --range 0-99` → 206 mit 100 Bytes; ohne Range → 200; `/media/..%2f…` und `/media/x/../y.mp4` → 404; HEAD liefert die Header ohne Body.
- [ ] Prüfpunkt 14: 20 parallele Downloads desselben Clips lassen den RAM des Containers flach (Messung im Ticket). Läuft der Container noch nicht mit Inhalten (Lücke G1), holt 38 die Messung nach.
