# Security-Header, CSP und Caching per `routeRules`

Status: ready-for-agent
Blocked by: 01

## Ziel

Jeder Pfad trägt in Produktion die Security-Header, die CSP und das `Cache-Control` aus der Spec; `/builds/**` hat eine eigene CSP. Ohne `nuxt-security`.

## Spec-Abschnitte

- [§ 17 Security headers and CSP](../../nuxt-portfolio/spec.md#17-security-headers-and-csp) (17.1–17.3)
- [§ 11.1 Storage and delivery](../../nuxt-portfolio/spec.md#111-storage-and-delivery) (Regeln für `/builds/**`)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 16

## Akzeptanzkriterien

- [ ] Alle Header stehen in `routeRules` unter `$production` (der Dev-Server braucht WebSocket und eval).
- [ ] `/**`: HSTS `max-age=31536000` ohne `includeSubDomains` und `preload`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` und die CSP wörtlich wie § 17.1.
- [ ] `/builds/**`: die eigene CSP wie § 17.2 (ohne Analytics-Hosts, mit `'wasm-unsafe-eval'`), `X-Robots-Tag: noindex`, `no-cache`; `/builds/*/Build/**`: `public, max-age=31536000, immutable`. Die Site-CSP enthält kein `'wasm-unsafe-eval'`.
- [ ] Caching wie § 17.3: `/_nuxt/**` und `/_fonts/**` immutable (Nuxt-Default für `/_nuxt/` prüfen), `/health` und `/downloads/cv` `no-store` (setzen die Routen selbst), alles andere `no-cache`.
- [ ] Belegt per `curl -I` im Produktions-Build für: eine HTML-Seite, eine Datei unter `/_nuxt/`, eine unter `/_fonts/`, eine `/_ipx/`-Variante, `robots.txt` (sobald 14 da ist), eine Testdatei unter `/builds/test/` und `/builds/test/Build/` (nicht committet; Check 5 würde sie ablehnen).
- [ ] Prüfpunkt 4 (Teil): Die Seite lädt in Chromium ohne CSP-Verletzung der eigenen Ressourcen. Mit Consent und Ablehnung prüft erst 39.
