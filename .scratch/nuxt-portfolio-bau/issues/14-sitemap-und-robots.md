# Sitemap-Hook und robots.txt

Status: ready-for-agent
Blocked by: 01

## Ziel

Der Prerender schreibt eine statische `sitemap.xml` mit genau den indexierbaren Seiten beider Sprachen; `robots.txt` lässt nur die gewünschten Bots zu.

## Spec-Abschnitte

- [§ 15.2 Sitemap](../../nuxt-portfolio/spec.md#152-sitemap), [§ 15.3 robots.txt](../../nuxt-portfolio/spec.md#153-robotstxt)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 11

## Akzeptanzkriterien

- [ ] Ein Nitro-Hook `prerender:route` sammelt jede Route mit `contentType` `text/html`, deren HTML kein `noindex` trägt; `prerender:done` schreibt `.output/public/sitemap.xml`. Zur Laufzeit läuft nichts.
- [ ] Eine Sitemap für beide Sprachen, nur `<loc>` mit absoluter URL `https://athaeck.de/…` in kanonischer Form (ohne Slash am Ende). Kein hreflang, kein `lastmod`, keine `priority`, keine `changefreq`.
- [ ] Prüfpunkt 11: Der Hook bekommt die Inhalte (`contents`) der Routen; die Sitemap enthält genau die erwarteten URLs der bis dahin vorhandenen Seiten. Die volle Liste prüft 38 mit allen Seiten.
- [ ] `public/robots.txt` wörtlich wie § 15.3, ohne `Disallow` auf einzelne Pfade.
- [ ] Kein SEO-Modul; kein Vitest für den Hook (§ 15.2).
