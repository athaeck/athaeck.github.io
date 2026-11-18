# Weiterleitungen: Legacy sites und Free3D

Status: ready-for-agent
Blocked by: 18, 49

## Ziel

Alte Pfade aus der GitHub-Pages-Zeit funktionieren auf athaeck.de weiter: Die Namen der Legacy sites leiten auf den Legacy host um, Free3Ds alter Pfad auf seine Project page.

## Spec-Abschnitte

- [§ 22 Legacy sites and cutover](../../nuxt-portfolio/spec.md#22-legacy-sites-and-cutover)
- [§ 4.2 Pages](../../nuxt-portfolio/spec.md#42-pages) (reservierte Pfade)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface) (Redirects)
- [§ 25](../../nuxt-portfolio/spec.md#25-decisions-taken-while-merging-2026-11-17) Punkte 5 und 10

## Akzeptanzkriterien

- [ ] Für jeden alten Namen aus der finalen Liste von infra-19 (Ticket 49): `/<alter-name>/**` → 301 auf denselben Pfad beim Legacy host, Pfad und Query bleiben. Den Hostnamen liefert die Infra (Arbeitsbeispiel `alt.athaeck.de`).
- [ ] `/free3d.github.io` und alles darunter → 301 auf Free3Ds Project page (`/projekte/<slug>`).
- [ ] Die Regeln stehen in `routeRules` und enthalten keine Adresse und kein Geheimnis (sie landen im Client-Bundle).
- [ ] Keine Route der Seite nimmt einen reservierten Pfad ein (§ 4.2); die Liste der alten Namen steht in der README (37).
- [ ] Belegt per `curl -I` im Produktions-Build für jeden alten Namen, mit Unterpfad und Query, und für `/free3d.github.io/`.
- [ ] Prüfpunkt 6: Der Prerender stoppt nicht an `play`-Links auf den Legacy host.
