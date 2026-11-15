# Unity-WebGL-Embed-Fakten

Type: research
Status: resolved
Blocked by: –

## Question

Was muss eine Webseite leisten, um einen aktuellen Unity-Web-Build (Unity 6.x) als Embed auszuliefern?

- Struktur der Build-Ausgabe.
- Kompression: Brotli, Gzip, keine, Decompression Fallback.
- Nötige Response-Header: `Content-Encoding`, `Content-Type` für `.wasm`/`.data`/`.js`. COOP/COEP nur bei Multithreading?
- Typische Build- und Speichergrößen.
- Support in mobilen Browsern.
- Einbindung per iframe oder direkt per Canvas in eine Vue/Nuxt-Seite, inklusive Aufräumen beim Verlassen der Seite.
- Liefert ein Nitro `node-server` vorkomprimierte `.br`/`.gz`-Dateien mit korrektem `Content-Encoding` aus, oder kollidiert das mit `compressPublicAssets`?

## Answer

Details mit Quellen: Branch `research/unity-webgl-embed-fakten`, Datei `.scratch/nuxt-portfolio/research/04-unity-webgl-embed-fakten.md`.

- **Build-Ausgabe:** `loader.js`, `framework.js`, `.wasm`, `.data`, optional mit Hash-Namen. Gestartet wird über `createUnityInstance(canvas, config)`.
- **Header:** Vorkomprimierte Dateien brauchen `Content-Encoding: br|gzip`, `.wasm` braucht `application/wasm` (sonst kein Streaming). **COOP/COEP/CORP nur bei Multithreading.** Für `.data` gibt es keinen offiziellen Content-Type.
- **Mobil:** offiziell unterstützt ab iOS Safari 15 und Android Chrome 58 (WebGL 2). WebGPU ist laut Unity-Doku nicht der Standard.
- **Aufräumen:** `unityInstance.Quit()` + DOM entfernen (nur Forum-Quellen). Mit Decompression Fallback wird Speicher nachweislich nicht freigegeben. Ein iframe würde die Unity-Laufzeit isolieren (Schlussfolgerung, nicht belegt).
- **Nitro:** Eine wörtliche `.wasm.br`-Datei liefert Nitro **ohne** `Content-Encoding` aus. Zwei Lösungen:
  - **A:** `routeRules`-Header. Das funktioniert nachweislich, weil Route Rules zuerst laufen. Offen ist, ob Patterns nach Dateiendung matchen.
  - **B (einfachster Weg):** Unity-Kompression **Disabled** + Nitro `compressPublicAssets`. Nitro erzeugt die `.br/.gz`-Varianten selbst und liefert sie mit korrektem Header aus, so wie Unity es für „static compression on the hosting server“ empfiehlt. Das muss ein Test mit einem echten Build bestätigen.
- **Offen:** typische Build-Größen, offizielle Doku zu Embedding und Quit, Header-Bedarf für WebGPU.

## Comments

- 2026-11-15 (Agent, über [Build-Spike](16-build-spike.md)): Korrektur zu „Nitro“. nitropack 2.13.6 liefert eine wörtliche `.wasm.br`-Datei **mit** `Content-Encoding: br` und `Content-Type: application/wasm` aus (gemessen; Quelltext `rollup/index.mjs:1249,1263`, `runtime/internal/static.mjs:80`). Fix B ist auf HTTP-Ebene bestätigt. Fix A matcht nicht nach Dateiendung, nur per Verzeichnis.
