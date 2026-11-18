# Owner: Search Console und Bing Webmaster Tools

Status: ready-for-human
Blocked by: –

## Ziel

Suchdaten für `athaeck.de` laufen ab dem ersten Tag; nach dem Launch kennen Google und Bing die Sitemap.

## Spec-Abschnitte

- [§ 15.6 Search Console and Bing](../../nuxt-portfolio/spec.md#156-search-console-and-bing), [§ 23](../../nuxt-portfolio/spec.md#23-owner-tasks-before-launch)

## Akzeptanzkriterien

- [ ] **Vor dem Cutover:** Domain-Property `athaeck.de` im eigenen Google-Konto (2FA), verifiziert per DNS-TXT in der Cloudflare-Zone (Kommentar-Vorschlag an infra-05).
- [ ] **Nach dem Launch:** `https://athaeck.de/sitemap.xml` im Bericht „Sitemaps“ eingereicht; Bing Webmaster Tools per Import aus der Search Console.
- [ ] Keine Property für `athaeck.github.io`; kein Code, kein Skript, kein Cookie auf der Seite.
