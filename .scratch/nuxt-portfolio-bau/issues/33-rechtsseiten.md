# Rechtsseiten: Legal notice und Privacy policy

Status: ready-for-agent
Blocked by: 19, 21, 22

## Ziel

Die vier Rechtsseiten erscheinen als eine Textspalte im Stil der Seite, `noindex`, mit Anschrift und E-Mail aus der Profile; die E-Mail ist ohne JavaScript lesbar, aber nicht im Klartext im Markup.

## Spec-Abschnitte

- [§ 7.8 Legal pages](../../nuxt-portfolio/spec.md#78-legal-pages)
- [§ 13 Legal notice and Privacy policy](../../nuxt-portfolio/spec.md#13-legal-notice-and-privacy-policy) (13.2 E-Mail, 13.4 Rules)
- [§ 5.8 Page](../../nuxt-portfolio/spec.md#58-page-strapi-collection-type-with-i18n-translated-only)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 15

## Akzeptanzkriterien

- [ ] Ein Template für Pages: `title` und Markdown-Body in einer Textspalte; `/impressum`, `/en/legal-notice`, `/datenschutz`, `/en/privacy`.
- [ ] MDC-Komponente `:legal-address` rendert Profile `legalAddress`.
- [ ] MDC-Komponente `:legal-email`: die Adresse mit einem per CSS `display:none` versteckten Störtext in der Mitte, daneben „E-Mail schreiben“ → `/mail`. Die Adresse steht weder zusammenhängend im HTML noch im Payload (`grep` über `.output/public`).
- [ ] Prüfpunkt 15: Kopieren der Adresse aus beiden Seiten nimmt den Störtext nicht mit (Chromium und Firefox); die Screenreader-Probe mit NVDA folgt in 39.
- [ ] `useSeoMeta({ robots: 'noindex' })` (Helfer aus 22) als Meta-Tag, kein `X-Robots-Tag`; kein JSON-LD; nicht in der Sitemap (14), robots.txt sperrt sie nicht.
- [ ] Beide Seiten sind aus dem Footer jeder Seite erreichbar. Ohne JavaScript vollständig lesbar.
