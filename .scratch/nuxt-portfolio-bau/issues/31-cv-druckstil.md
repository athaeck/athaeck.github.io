# Druckstil der CV-Seite

Status: ready-for-agent
Blocked by: 30

## Ziel

Wer die CV-Seite druckt, bekommt eine schlichte, zweispaltige Liste ohne Bedienelemente.

## Spec-Abschnitte

- [§ 7.6 CV page](../../nuxt-portfolio/spec.md#76-cv-page) (Print stylesheet)
- [ADR-0003](../../../docs/adr/0003-hand-written-css-no-utility-framework.md) (eigene Druckdatei)

## Akzeptanzkriterien

- [ ] Eine eigene Datei (z. B. `app/assets/css/print.css`), nur für `media="print"` geladen.
- [ ] Zweispaltige Liste ohne Navigation, Footer, Buttons, Sprunglinks und Farben; Überschriften bleiben bei ihrem Abschnitt (`break-after: avoid`).
- [ ] Skills mit ihrer Belegzahl, ohne Popover-Inhalte.
- [ ] Belegt per Druckvorschau bzw. PDF-Export in Chromium, DE und EN, mit den echten Inhalten: Seitenzahl im Ticket (Richtwert der Prototyp-Daten: 3 A4-Seiten), kein abgeschnittener Abschnitt.
