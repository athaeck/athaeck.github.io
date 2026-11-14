# Build-Spike: offene Laufzeitfragen per Test klären

Type: task
Status: open
Blocked by: –

## Question

Was passiert wirklich, wenn man ein Wegwerf-Nuxt-Projekt (Nuxt 4.6, i18n, Content, Image) als Nitro `node-server` mit vollständigem Prerender baut und im Docker-Container startet? Konkret:

1. Braucht der Server-Bundle zur Laufzeit einen SQLite-Treiber für Nuxt Content (Container startet ohne `better-sqlite3` und mit `sqliteConnector: 'native'`)?
2. Schreibt das Prerendering die `/_ipx/...`-Varianten von `<NuxtImg>` nach `.output/public`, oder bleibt IPX/sharp zur Laufzeit nötig? Läuft sharp auf `node:<v>-alpine` (musl ≥ 1.2.5)?
3. Unity-Embed Fix B: Werden unkomprimierte `.wasm`/`.data`/`.js` unter `public/` von `compressPublicAssets` mit korrektem `Content-Encoding` und `Content-Type` (`application/wasm`) ausgeliefert? Gibt es Größenlimits? Fix A: Können `routeRules`-Patterns nach Dateiendung matchen?

Agent (AFK) baut den Spike in einem Wegwerf-Verzeichnis außerhalb des Repos und hält nur die Ergebnisse fest (Befehle, Header-Ausgaben, Image-Größen). Grundlage: [Nuxt-Stack-Fakten](03-nuxt-stack-fakten.md), [Unity-WebGL-Embed-Fakten](04-unity-webgl-embed-fakten.md).
