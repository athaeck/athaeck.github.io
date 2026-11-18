# Inhalte: Legal notice und Privacy policy

Status: ready-for-agent
Blocked by: 16, 17

## Ziel

Legal notice und Privacy policy liegen als Pages in DE und EN vor, als eigener kurzer Text ohne Generator, mit `unreviewed: true` markiert.

## Spec-Abschnitte

- [§ 13 Legal notice and Privacy policy](../../nuxt-portfolio/spec.md#13-legal-notice-and-privacy-policy) (13.1–13.4)
- [§ 14 Analytics and consent](../../nuxt-portfolio/spec.md#14-analytics-and-consent) (Bausteine a–d)
- [§ 5.8 Page](../../nuxt-portfolio/spec.md#58-page-strapi-collection-type-with-i18n-translated-only)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 10

## Akzeptanzkriterien

- [ ] Je Page `de/pages/<slug>.md` und `en/pages/<slug>.md` mit `title` und Body; die Pfade `/impressum`, `/en/legal-notice`, `/datenschutz`, `/en/privacy` kommen aus `customRoutes`.
- [ ] Legal notice nach § 13.2: Name; Anschrift aus Profile `legalAddress` und E-Mail mit Störtext, beide über MDC-Komponenten im Body (`:legal-address`, `:legal-email`; gebaut in 33), daneben „E-Mail schreiben“ → `/mail`; LinkedIn als zweiter schneller Kontaktweg; kein Telefon.
- [ ] Privacy policy mit den Abschnitten 1–8 aus § 13.3, inklusive der Regel zum eigenen Code, selbst gehosteter Videos, der YouTube-Links und der Blöcke a–d; der Privacy-settings-Button steht als MDC-Komponente `:privacy-settings` im Body (gebaut in 35). Keine Cookiebot-Erklärung (`cd.js`).
- [ ] Prüfpunkt 10 recherchiert, mit Quellen im Ticket: Übermittlungsgrundlage für Akamai, DPF-Eintrag von Google, Sitz und Log-Aufbewahrung von Usercentrics, ob Cookiebot alte Bannertexte als Nachweis aufbewahrt, GA4-Hilfe zu Aufbewahrung und zu Land und Gerätekategorie. Die Postanschrift der Aufsichtsbehörde ist geprüft.
- [ ] Die EN-Fassungen sind vollständig und beginnen mit „The German version is authoritative.“
- [ ] Du-Form auch hier (§ 4.1). Keine Rechtsberatung behaupten; was ungeklärt bleibt, steht als offene Frage im Ticket.
- [ ] Alle vier Dateien tragen `unreviewed: true`; Checks 1 und 3 melden nichts.
