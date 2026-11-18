# Content-Check-Runner mit „Missing language“ und „Unreviewed“

Status: needs-info
Blocked by: 03

## Ziel

Content checks laufen als reine Funktionen in `npm run build` und stoppen ihn bei jedem Fehler. Die Checks 1 und 2 sind fertig und je mit gutem und kaputtem Vitest-Fixture belegt.

## Spec-Abschnitte

- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks) (Einbindung, Checks 1 und 2)
- [§ 20.1 Unit tests in the gate](../../nuxt-portfolio/spec.md#20-testing)
- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules) (`unreviewed`), [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow)

## Akzeptanzkriterien

- [ ] Jeder Check ist eine reine Funktion: Daten rein, Liste von Fehlern (Datei, Grund) raus. Nur ein Loader berührt das Dateisystem (`content/`, später `public/builds/`, `media/`, `public/images/`).
- [ ] `npm run build` führt alle Checks vor `nuxt build` aus, meldet alle Fehler auf einmal und endet mit Exit-Code ≠ 0. **Offen (Lücke G1):** Vorschlag ist ein `prebuild`-Script; `npx nuxt build` liefe dann ohne Gate.
- [ ] Check 1 *Missing language*: Project, CV entry, Profile oder Page ohne DE- oder EN-Datei ist ein Fehler. **Offen (Lücke G9):** ob auch eine Sprachdatei ohne geteilte Datei ein Fehler ist.
- [ ] Check 2 *Unreviewed*: jede Sprachdatei mit `unreviewed: true` ist ein Fehler, mit Pfad.
- [ ] Vitest: je Check ein gutes Fixture (keine Fehler) und ein kaputtes (genau der erwartete Fehler). `--passWithNoTests` aus 01 entfällt.
- [ ] Nachweis: eine Sprachdatei mit `unreviewed: true` lässt `npm run build` scheitern; ohne Marker läuft er durch.

## Hinweise

- Node 26 führt `.ts` direkt aus (Type Stripping). Ein YAML-Parser als devDependency (z. B. `yaml`) ist zulässig: § 16 begrenzt Nuxt-Module, nicht Pakete. Front matter mit demselben Parser lesen.
- Die Checks 3–7 (05–08) hängen sich an diesen Runner.
