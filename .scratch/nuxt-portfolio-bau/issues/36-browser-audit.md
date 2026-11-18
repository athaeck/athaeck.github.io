# Browser-Audit `npm run audit`

Status: ready-for-agent
Blocked by: 02, 20

## Ziel

Ein Befehl prüft eine laufende Seite (lokaler Produktionscontainer oder `athaeck.de`) auf WCAG 2.2 AA, Lesbarkeit ohne JavaScript, Lighthouse, Sitemap und CSP, und endet bei einem Fehler mit Exit-Code ≠ 0.

## Spec-Abschnitte

- [§ 20.2 Browser audit](../../nuxt-portfolio/spec.md#202-browser-audit-npm-run-audit----base-url-by-hand)
- [§ 3 Quality targets](../../nuxt-portfolio/spec.md#3-quality-targets)

## Akzeptanzkriterien

- [ ] `npm run audit -- <base-url>`. Playwright mit `@axe-core/playwright` und Lighthouse bleiben aus dem Docker-Build: eigener Ordner (z. B. `audit/` mit eigenem `package.json` und Lockfile, in `.dockerignore`) oder `npx` mit festen Versionen; Wahl und Grund im Ticket.
- [ ] Die 16 Seiten: Home, Projects, eine Project page, CV, About, Legal notice, Privacy policy, 404, je DE und EN, als feste Pfadliste.
- [ ] axe mit den Tags bis WCAG 2.2 AA auf allen 16 Seiten.
- [ ] Prüfung ohne JavaScript auf allen 16 Seiten: der Hauptinhalt steht im HTML, kein leeres `<ClientOnly>`.
- [ ] Lighthouse mobil auf je einer DE-Seite pro Typ, Median aus drei Läufen, immer vor der Consent-Wahl; Fehler, wenn eine Kategorie unter 0,95 oder SEO unter 1,0 liegt.
- [ ] Sitemap-Check: jede URL aus `sitemap.xml` liefert 200, trägt kein `noindex`, ihr Canonical ist sie selbst. Gegen andere Hosts als `athaeck.de` werden die URLs auf die Basis-URL umgeschrieben.
- [ ] CSP: Playwright sammelt `securitypolicyviolation` auf allen 16 Seiten vor der Wahl; mit Zustimmung und mit Ablehnung je eine Seite, nur gegen `athaeck.de`.
- [ ] Ein lesbarer Bericht je Teil; Probelauf gegen den lokalen Container mit den vorhandenen Seiten, Ausgabe im Ticket.
