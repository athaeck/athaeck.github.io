# Launch-Prüfung gegen athaeck.de

Status: ready-for-human
Blocked by: 15, 35, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 50

## Ziel

Die deployte Seite auf `athaeck.de` besteht Audit, README-Check und Hand-Checkliste. Das ist die Bedingung für den Cutover (nach dem Deploy in infra-18, vor den Weiterleitungen in infra-19).

## Spec-Abschnitte

- [§ 20.2](../../nuxt-portfolio/spec.md#202-browser-audit-npm-run-audit----base-url-by-hand), [§ 20.3 Hand checklist](../../nuxt-portfolio/spec.md#20-testing)
- [§ 19.5 README check](../../nuxt-portfolio/spec.md#195-readme-check-pipeline-part)
- [§ 22 Legacy sites and cutover](../../nuxt-portfolio/spec.md#22-legacy-sites-and-cutover)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkte 4, 5, 7, 8, 9, 15, 17, 18

## Akzeptanzkriterien

- [ ] Die Seite läuft über Coolify auf `athaeck.de` (Infra); Prüfpunkt 5 (`FROM --platform=$BUILDPLATFORM` im Compose-Build) und Prüfpunkt 7 (RAM und Dauer des Builds auf dem CAX11) sind notiert.
- [ ] `npm run audit -- https://athaeck.de` besteht vollständig, CSP mit Zustimmung und Ablehnung eingeschlossen; GTM-Vorschau per Tag Assistant ohne CSP-Fehler; ob `*.google.<TLD>` nötig ist und ob die Cookiebot-Hosts reichen, ist notiert (Prüfpunkt 4).
- [ ] Prüfpunkt 8 (Cookiebot-Attribut, „erneut fragen“, Widerruf löscht `_ga`) und 17 nach Zustimmung belegt.
- [ ] README-Check aus § 19.5: `/health` zeigt den Commit; `http://www.athaeck.de/projekte?x=1` leitet dauerhaft auf `https://athaeck.de/projekte?x=1`, Statuscode notiert (Prüfpunkt 18); Coolify zeigt `healthy`; Stichprobe DE- und EN-Seite, 404, `/mail` → 302, CV-POST → PDF in beiden Sprachen.
- [ ] `legalAddress` ist die Anschrift des Impressum-Service (kein Platzhalter mehr).
- [ ] Hand-Checkliste § 20.3 vollständig: Tastatur, Zoom 200 %, Reflow 320 px, `prefers-reduced-motion`, NVDA (auch Prüfpunkt 15), Druckvorschau, echtes Handy, Firefox und Safari, Trailer auf iPhone, Mac-Safari und Firefox, Rich Results Test auf `/`, `/projekte` und einer Project page, robots.txt-Bericht der Search Console, LinkedIn Post Inspector und X-Vorschau.
- [ ] Ergebnis im Ticket: Freigabe für den Cutover oder die Liste der Blocker.
