# Erster Build: Prüfpunkte im Produktionscontainer und erstes Audit

Status: needs-info
Blocked by: 05, 06, 07, 08, 09, 14, 21, 25, 27, 30, 31, 32, 33, 34, 36, 48

## Ziel

Das vollständige Image baut mit grünem Gate und besteht im lokalen Produktionscontainer die offenen Prüfpunkte aus § 24 und das erste `npm run audit`. Befunde sind behoben oder als eigene Tickets angelegt.

## Spec-Abschnitte

- [§ 24 Check points for the first build](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build)
- [§ 20.2 Browser audit](../../nuxt-portfolio/spec.md#202-browser-audit-npm-run-audit----base-url-by-hand)
- [§ 9.1 Rule](../../nuxt-portfolio/spec.md#91-rule)

## Akzeptanzkriterien

- [ ] `docker build .` läuft mit allen Inhalten durch; kein `unreviewed` mehr offen (48). **Offen (Lücke G1):** ob das so bleibt.
- [ ] Prüfpunkt 1: Container `--read-only` als `node` auf `node:26-alpine`; die 404 kommt mit Inhalt; die vorgerenderten `/_ipx`-Varianten werden statisch ausgeliefert.
- [ ] Prüfpunkt 3: `curl '/_ipx/w_321&f_avif/…'` → 404; unter `.output/server/node_modules` liegt kein `sharp`.
- [ ] Prüfpunkte 6, 11, 12, 13, 14 und 16 im Container wiederholt (Belege aus 01, 14, 24, 25, 12, 13); Sitemap enthält genau die erwarteten URLs.
- [ ] Prüfpunkt 17 vor dem Consent: der eigene Code schreibt kein Cookie und nichts in den Browser-Speicher (DevTools → Application), auf allen Seitentypen.
- [ ] `grep` über `.output/public` findet die E-Mail-Adresse und `mailto:` nirgends; Wohnadresse, Telefon und Geburtsdatum sind nirgends im Image.
- [ ] `npm run audit -- http://localhost:3000` läuft durch (axe, ohne JavaScript, Sitemap, CSP vor der Wahl; Lighthouse als Vorabwert, die zählenden Werte misst 39). Bericht im Ticket.
- [ ] Der Rest der alten Seite (`assets/`) ist gelöscht; nichts verweist mehr darauf.
- [ ] Image-Größe und RAM im Leerlauf notiert (Vorlage für infra-18, Prüfpunkt 7).
