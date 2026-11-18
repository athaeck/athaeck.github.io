# SEO-Basis: Head-Tags, OG und `useJsonLd`

Status: ready-for-agent
Blocked by: 17, 20

## Ziel

Jede Seite bekommt aus einem Ort `lang`, hreflang, Canonical, Titel, Description, OG- und Twitter-Tags. Ein Composable schreibt JSON-LD mit den Knoten WebSite und Person; die Seiten-Tickets ergänzen ihre eigenen Knoten.

## Spec-Abschnitte

- [§ 15.1 Title and description](../../nuxt-portfolio/spec.md#151-title-and-description), [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld), [§ 15.5 OG and Twitter](../../nuxt-portfolio/spec.md#155-og-and-twitter)
- [§ 4.1 Locales](../../nuxt-portfolio/spec.md#41-locales) (`useLocaleHead`), [§ 13.4 Rules](../../nuxt-portfolio/spec.md#134-rules) (`noindex`)
- [§ 9.1 Rule](../../nuxt-portfolio/spec.md#91-rule) (keine Adresse im JSON-LD)

## Akzeptanzkriterien

- [ ] `useLocaleHead` im Layout liefert `lang`, hreflang `de`, `en`, `x-default` und das Canonical, absolut auf `https://athaeck.de` und ohne Slash am Ende. Das ist die einzige hreflang-Quelle.
- [ ] Titel `<Seitentitel> · Nick Philipp Häcker`; die Home setzt ihren eigenen (28). Description je Seite aus Content oder UI-Text.
- [ ] OG und Twitter: `og:title`, `og:description`, `og:url` (= Canonical), `og:image` absolut mit `og:image:width`/`height`, `og:image:alt` (UI-Text), `og:type website`, `og:site_name`, `og:locale` (`de_DE` / `en_US`) mit `og:locale:alternate`, `twitter:card summary_large_image`. Standardbild `public/og.png` (kommt mit 46; bis dahin fehlt die Datei, ohne Build-Fehler).
- [ ] `useJsonLd(nodes)` schreibt ein `<script type="application/ld+json">` per `useHead` mit `<` als `<`. Bausteine: Seitenknoten (`@id` und `url` = Canonical, `name`, `description`, `inLanguage`, `isPartOf` → `#website`), `WebSite` (`https://athaeck.de/#website`, `name` „Nick Philipp Häcker“, `alternateName` „athaeck“, `url`), `Person` (`https://athaeck.de/#person`, `name`, `url`, `sameAs` = `profiles`; nie `email`, nie eine Anschrift).
- [ ] Ein Helfer setzt `useSeoMeta({ robots: 'noindex' })` als Meta-Tag (kein `X-Robots-Tag`) für die Rechtsseiten (33).
- [ ] Belegt im vorgerenderten HTML von `/` und `/en`: alle Tags vorhanden, JSON-LD parst als JSON, keine Adresse.
- [ ] Kein SEO-Modul.
