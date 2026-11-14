# Nuxt-Stack-Fakten (Stand Nov 2026)

Type: research
Status: resolved
Blocked by: –

## Question

Was ist der aktuelle Stand des Nuxt-Ökosystems für dieses Setup?

- Nitro `node-server` mit allen Seiten über `routeRules` vorgerendert.
- `@nuxtjs/i18n` mit `prefix_except_default`, DE als Standard, ohne Weiterleitung nach Browsersprache, mit lokalisierten Routen und hreflang/lang/canonical.
- Nuxt Content mit Inhalten pro Sprache.
- Nuxt Image unter Prerender.

Konkret: aktuelle stabile Versionen und ihre Kompatibilität. Was braucht Nuxt Content zur Laufzeit (Datenbank?), wenn alles vorgerendert ist? Wie liefert der `node-server` vorgerenderte Seiten und `public/`-Assets aus? Wie setzt man per `routeRules` Header für einzelne Pfade?

## Answer

Details mit Quellen: Branch `research/nuxt-stack-fakten`, Datei `.scratch/nuxt-portfolio/research/03-nuxt-stack-fakten.md`. Recherche in zwei Durchgängen, der zweite eskaliert.

- **Versionen** (per npm selbst geprüft): Nuxt 4.6.4 (Node `^22.22.3 || ^24.15.0 || >=26`), nitropack 2.13.6, @nuxtjs/i18n 10.6.0, @nuxt/content 3.16.2, @nuxt/image 2.2.1. Nuxt 5 ist noch nicht stabil (es bringt Nitro v3); `compatibilityVersion: 5` schaltet die Nuxt-5-Defaults heute schon ein.
- **i18n:** `prefix_except_default` + `defaultLocale: 'de'` ergibt DE unter `/` und EN unter `/en/`. Mit `detectBrowserLanguage: false` gibt es keine Weiterleitung. Lokalisierte Slugs über `customRoutes: 'config'` + `pages`. `useLocaleHead` liefert hreflang, canonical und lang.
- **Nuxt Content:** eine Collection pro Sprache (`de/**`, `en/**`). SQLite zur Laufzeit im Server, im Browser WASM mit vorgerendertem Dump. `sqliteConnector: 'native'` nutzt `node:sqlite`, das spart ein natives Modul im Image.
- **Nuxt Image:** Auf `node-server` läuft IPX zur Laufzeit. `sharp` muss also für die Ziel-Architektur ins Image (Alpine nur mit musl ≥ 1.2.5).
- **`routeRules`-Header gelten auch für Dateien aus `public/`** (selbst im Nitro-Quelltext v2.13.6 geprüft, `app.ts:162`, `static.ts:94,106`). Damit hält [ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md). `Cache-Control` für `public/` muss man selbst setzen.
- **Offen** (nur per Build-Test klärbar): Braucht der Server-Bundle den SQLite-Treiber trotz Vollprerender? Schreibt das Prerendering `/_ipx`-Varianten? Können Route-Patterns nach Dateiendung matchen?
