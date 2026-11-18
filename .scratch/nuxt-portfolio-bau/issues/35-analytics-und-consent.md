# Analytics und Consent: Cookiebot, GTM, Privacy settings

Status: ready-for-agent
Blocked by: 13, 33, 42, 44

## Ziel

Vor einer Wahl lädt nur Cookiebot; GTM und damit GA4 laden erst nach Zustimmung zur Statistik. „Datenschutz-Einstellungen“ öffnet das Banner von jeder Seite aus erneut.

## Spec-Abschnitte

- [§ 14 Analytics and consent](../../nuxt-portfolio/spec.md#14-analytics-and-consent) (14.2–14.7)
- [§ 17.1 Site](../../nuxt-portfolio/spec.md#171-site-) (CSP-Hosts)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkte 4, 8, 17

## Akzeptanzkriterien

- [ ] Cookiebots `uc.js` direkt im `<head>`, `async`, mit der Cookiebot-ID aus 42, Banner-Sprache nach Seitensprache, **manuelles** Blocking (kein `data-blockingmode="auto"`), nicht über das GTM-Template.
- [ ] Das GTM-Snippet mit der ID aus 44 ist als Statistik-Skript markiert (vermutlich `type="text/plain"` mit `data-cookieconsent="statistics"`; Prüfpunkt 8) und startet erst nach Zustimmung. Kein `@nuxt/scripts`; beide Snippets sind schlichte Head-Einträge.
- [ ] „Datenschutz-Einstellungen“ / „Privacy settings“: ein `<button>` im Footer jeder Seite und als MDC-Komponente `:privacy-settings` in der Privacy policy; ruft `Cookiebot.renew()`; erscheint nur mit JavaScript, ohne leeren Platzhalter.
- [ ] Die drei Events laufen über GTMs eingebaute Trigger (44); ein `dataLayer.push` im eigenen Code nur, wo ein Trigger nachweislich nicht greift (Befund im Ticket).
- [ ] Banner-Gestaltung nach D, soweit 42 eigenes CSS erlaubt; „Ablehnen“ und „Zulassen“ gleich groß und gleich gestaltet.
- [ ] Prüfpunkt 8: Löscht der Widerruf `_ga` und `_ga_<id>` nicht, löscht eigener Code sie und lädt neu.
- [ ] Ohne JavaScript: kein Banner, kein Tracking, Inhalt lesbar.
- [ ] Lokal belegt: vor der Wahl kein Request an Google (Netzwerk-Tab); keine CSP-Verletzung der eigenen Ressourcen. Cookiebot läuft nur auf der registrierten Domain; die Prüfung mit Zustimmung und Ablehnung, die GTM-Vorschau und Prüfpunkt 17 nach Zustimmung macht 39 gegen `athaeck.de`.
