# Teststrategie

Type: grilling
Status: open
Blocked by: –

## Question

Welche Prüfungen kommen über Lint, Typecheck und den Prerender (bricht bei totem Link ab) hinaus dazu, und wo laufen sie?

- Unit-Tests der eigenen Inhaltsprüfungen: fehlende Sprache, Budget und Konsistenz der Web builds.
- Link-Check der Legacy sites: Sind die relativen Pfade darin heil?
- Lighthouse (≥ 95 mobil) und axe (WCAG 2.2 AA) für die Qualitätsziele aus den [Grundsatzentscheidungen](01-grundsatzentscheidungen.md). Beide brauchen einen Browser.
- Oder bewusst nichts davon.
- Ort: im Gate des Build-Stages (ohne Browser, RAM des CAX11), lokal oder als Teil der README-Prüfung.

Grundlage: [Tech-Stack](12-tech-stack.md) und [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md).

## Comments

- 2026-11-15 (Agent, über [Übersetzungs-Workflow](17-uebersetzungs-workflow.md)): Es gibt zwei neue Inhaltsprüfungen, die Unit-Tests brauchen könnten: den `unreviewed`-Marker und den Listenabgleich (gleich viele Einträge und gleiche Fakten in `phases`, `gallery`, `contributions`, `learnings`, `services` und `languages`).
