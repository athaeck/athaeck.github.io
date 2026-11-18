# Owner: öffentliche CV-PDFs erzeugen

Status: ready-for-human
Blocked by: –

## Ziel

Der CV-Download liefert je Sprache ein bereinigtes, korrigiertes und kleines PDF.

## Spec-Abschnitte

- [§ 9.3 CV PDF download](../../nuxt-portfolio/spec.md#93-cv-pdf-download), [§ 23](../../nuxt-portfolio/spec.md#23-owner-tasks-before-launch)
- Privatsphäre-Regel am Anfang der [Spec](../../nuxt-portfolio/spec.md)

## Akzeptanzkriterien

- [ ] Aus dem LaTeX-CV gebaut, DE und EN. Wohnadresse, Telefon und Geburtsdatum entfernt; die E-Mail bleibt.
- [ ] Textebene repariert: Kopieren von „Häcker“ ergibt „Häcker“ (vermutlich fehlt `fontenc`/`cmap`).
- [ ] Komprimiert (heute 4,7 MB, fast nur das Foto).
- [ ] Korrekturen aus dem Inventar eingearbeitet: AUREA-Rolle, Jr.-Full-Stack-Aufgaben inklusive LLM-Arbeit seit März 2026, Tippfehler, Skills C++, Unreal, PostgreSQL, Supabase.
- [ ] Abgelegt als `server/assets/cv/de.pdf` und `server/assets/cv/en.pdf` (Namen aus 11). Das Roh-CV bleibt außerhalb des Repos (`docs/about-me/` ist gitignored).
