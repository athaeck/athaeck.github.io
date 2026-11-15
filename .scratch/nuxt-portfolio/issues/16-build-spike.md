# Build-Spike: offene Laufzeitfragen per Test klären

Type: task
Status: resolved
Blocked by: –

## Question

Was passiert wirklich, wenn man ein Wegwerf-Nuxt-Projekt (Nuxt 4.6, i18n, Content, Image) als Nitro `node-server` mit vollständigem Prerender baut und im Docker-Container startet? Konkret:

1. Braucht der Server-Bundle zur Laufzeit einen SQLite-Treiber für Nuxt Content (Container startet ohne `better-sqlite3` und mit `sqliteConnector: 'native'`)?
2. Schreibt das Prerendering die `/_ipx/...`-Varianten von `<NuxtImg>` nach `.output/public`, oder bleibt IPX/sharp zur Laufzeit nötig? Läuft sharp auf `node:<v>-alpine` (musl ≥ 1.2.5)?
3. Unity-Embed Fix B: Werden unkomprimierte `.wasm`/`.data`/`.js` unter `public/` von `compressPublicAssets` mit korrektem `Content-Encoding` und `Content-Type` (`application/wasm`) ausgeliefert? Gibt es Größenlimits? Fix A: Können `routeRules`-Patterns nach Dateiendung matchen?
4. Routen aus [Seitenstruktur und Navigation](10-seitenstruktur.md): Prerendert `customRoutes: 'config'` die Seiten `/projekte/[slug]` ↔ `/en/projects/[slug]` mit gemeinsamem Slug? Zeigt der Sprachumschalter (`switchLocalePath`) im vorgerenderten HTML auf das richtige Gegenstück? Wie verhält sich der `node-server` bei Trailing Slash (`/projekte/` → 301 auf `/projekte`, oder doppelter Inhalt)?
5. Kontakt-Weiterleitung aus [Seitenstruktur und Navigation](10-seitenstruktur.md): Liefert eine Route `/mail` am `node-server` ein 302 mit `Location: mailto:…`? Geht das per `routeRules` (`redirect`), oder braucht es eine Server-Route mit `sendRedirect`? Was macht der Prerender daraus (die Route darf nicht als statische Seite mit Meta-Refresh enden, sonst steht die Adresse wieder im HTML)? Header per `curl -I` festhalten. Dasselbe für den PDF-Download per `POST /downloads/cv` (Antwort, Header, 303 bei GET; das PDF aus den Server-Assets, nicht aus `public/`). Ob Chrome, Firefox und Safari (Desktop und Handy) danach den Mail-Client öffnen bzw. das PDF speichern oder anzeigen, prüft der Owner kurz von Hand.

Agent (AFK) baut den Spike in einem Wegwerf-Verzeichnis außerhalb des Repos und hält nur die Ergebnisse fest (Befehle, Header-Ausgaben, Image-Größen). Grundlage: [Nuxt-Stack-Fakten](03-nuxt-stack-fakten.md), [Unity-WebGL-Embed-Fakten](04-unity-webgl-embed-fakten.md).

## Answer

Spike am 2026-11-15 in einem Wegwerf-Verzeichnis außerhalb des Repos: Nuxt 4.6.4, nitropack 2.13.6, @nuxtjs/i18n 10.6.0, @nuxt/content 3.16.2, @nuxt/image 2.2.1 (ipx 4.1.0, sharp 0.35.5). Preset `node-server`, `compressPublicAssets: true`, `prerender.crawlLinks: true`. Das Image ist zweistufig auf `node:24-alpine` (Node 24.22.3, Alpine 3.24.4, musl 1.2.6) und wird im Container gebaut. Es läuft als `USER node` mit `docker run --read-only`. Testadresse: `spike@example.invalid`. Alle Header unten kommen aus dem fertigen Container.

**1. SQLite zur Laufzeit**
- Ein natives Modul ist nicht nötig. Mit `sqliteConnector: 'native'` lädt das Server-Bundle `node:sqlite` über `process.getBuiltinModule`. `better-sqlite3` und `sqlite3` sind nicht installiert, trotzdem laufen Build und Container.
- **Aber:** Das Bundle braucht die DB trotz Vollprerender, sobald eine Seite zur Laufzeit gerendert wird und Content abfragt, z. B. die 404 auf `/projekte/gibtsnicht`. Standardmäßig legt Content dann `server/contents.sqlite` neben dem Bundle an. Das Image bräuchte also Schreibrecht.
- **Getestet:** Mit `content.database: { type: 'sqlite', filename: ':memory:' }` wird nichts geschrieben. Der Container läuft mit `--read-only` als `node`, und die 404 kommt korrekt.

**2. Nuxt Image**
- Der Prerender schreibt die `<NuxtImg>`-Varianten der vorgerenderten Seiten als Dateien nach `.output/public/_ipx/…`, z. B. `w_400&f_webp` und automatisch dazu `w_800&f_webp` für 2x. Sie werden statisch ausgeliefert.
- IPX bleibt trotzdem als Route `/_ipx/**` im Server und rechnet jede andere Variante zur Laufzeit (`w_321&f_avif` → 200 `image/avif`). sharp muss also ins Image (18,4 MB für `@img/sharp-linuxmusl-x64` samt libvips).
- sharp läuft auf `node:24-alpine` mit musl 1.2.6. WebP, AVIF und PNG wurden zur Laufzeit erzeugt.
- Die sharp-Binaries sind an die Plattform gebunden. Ein Build unter Windows meldet „sharp binaries have been included in your build for win32-x64“. Gebaut wird deshalb im Container.
- **Nicht getestet:** ob man IPX zur Laufzeit auf die vorgerenderten Varianten beschränken kann. Heute rechnet der Server jede angefragte Größe (CPU).

**3. Unity-Embed**
- **Fix B bestätigt (auf HTTP-Ebene):** unkomprimierte Dateien unter `public/unity/Build/`. Die wasm ist eine echte (865 KB), die `.data` hat 40 MB (halb Text, halb Zufall).

| Datei | `Accept-Encoding: br` | nur `gzip, deflate` | `Content-Type` |
|---|---|---|---|
| `.wasm` 865 KB | br, 347 KB | gzip, 402 KB | `application/wasm` |
| `.data` 40 MB | br, 22,5 MB | gzip, 23,8 MB | `text/plain; charset=utf-8` |
| `.framework.js` 609 KB | br, 111 KB | gzip, 136 KB | `text/javascript; charset=utf-8` |

- Dazu kommen `Vary: Accept-Encoding` und ein ETag. Ohne `Accept-Encoding` geht die Datei unkomprimiert raus. Für `.data` kennt Nitro keinen Typ und nimmt `text/plain`. Ob der Unity-Loader das hinnimmt, ist ohne echten Build nicht geprüft.
- **Größenlimits:** Ein hartes Limit gibt es nicht. Komprimiert wird ab 1 KB, `.map` bleibt aus (`nitropack/dist/core/index.mjs:1773`). Die Kosten sind:
  - **Build:** Brotli Stufe 11 braucht etwa 1 s pro MB (40 MB `.data`: 41 s; gzip Stufe 9: 1 s). Nitro komprimiert 10 Dateien parallel.
  - **Image:** Jede Datei liegt dreifach im Image (roh, `.br`, `.gz`). Aus 41,5 MB Build werden 85 MB.
  - **RAM:** Nitro liest jede Datei pro Anfrage ganz in den Speicher (`fsp.readFile`, `rollup/index.mjs:1305`), ohne Streaming und ohne `Range`. Bei 20 parallelen Downloads der 22,5-MB-`.data.br` stieg der Server von 72 auf 508 MB.
- **Fix A:** Muster nach Dateiendung matchen **nicht**. `/unity-br/Build/*.wasm.br` und `/**/*.data.br` setzen keinen Header, `/unity-br/**` schon. Header gehen nur per Verzeichnis.
- **Fix C, neu, widerlegt [Unity-WebGL-Embed-Fakten](04-unity-webgl-embed-fakten.md):** Eine wörtliche `.br`-Datei liefert nitropack 2.13.6 **mit** `Content-Encoding: br` und dem Typ der Originaldatei aus (`spike.wasm.br` → `application/wasm`). Das gilt auch, wenn der Client kein `br` anbietet. Belege: Das Manifest leitet Typ und Encoding aus dem Dateinamen ab (`rollup/index.mjs:1249,1263`), `runtime/internal/static.mjs:80` setzt den Header. Ein Unity-Build mit Kompression „Brotli“ ohne Decompression Fallback läuft damit ohne jede Konfiguration. Nitro hat dabei keinen Kompressionsaufwand, und die Datei liegt nur einmal im Image. Einen gzip-Fallback gibt es dann nicht.

**4. Routen**
- `customRoutes: 'config'` mit `'projekte/[slug]': { de: '/projekte/[slug]', en: '/projects/[slug]' }` prerendert `/projekte/aurea` und `/en/projects/aurea` mit gemeinsamem Slug. Die Content-Collection pro Sprache mit `source: { include: 'de/projects/*.md', prefix: '' }` ergibt `path` `/aurea` und `stem` `aurea`.
- Dynamische Seiten prerendert der Crawler nur, wenn sie verlinkt sind. Laut Seitenstruktur verlinkt die Projects-Seite jedes Project, das reicht. Eine nicht verlinkte Seite würde zur Laufzeit gerendert (geht dank 1.).
- **Umschalter:** Im vorgerenderten HTML von `/projekte/aurea` steht `<a href="/en/projects/aurea">`, auf der EN-Seite umgekehrt. `useLocaleHead` liefert `lang="de-DE"`, hreflang für `de`, `en` und `x-default` sowie canonical `https://athaeck.de/projekte/aurea`.
- **Trailing Slash:** Ohne Zutun liefern `/projekte/` und `/projekte/index.html` den gleichen Inhalt mit 200, ohne Redirect. Canonical zeigt auf die Form ohne Slash. **Getestet:** Ein Nitro-Plugin am `request`-Hook läuft vor dem Static-Handler. Damit kommt `/projekte/` → 301 `/projekte` und `/projekte/aurea/?x=1` → 301 `/projekte/aurea?x=1`.

**5. `/mail` und CV-Download**
- **`routeRules`-`redirect` scheidet aus.** Nuxt schreibt die Route Rules ins Client-Bundle: Ein `/_nuxt/*.js` enthielt `redirect:"mailto:…"`, die Adresse stünde also öffentlich im JS. Außerdem trägt die 302-Antwort ein Meta-Refresh-HTML mit der Adresse im Body.
- **Server-Route ja**, mit drei Fallen (alle getestet):
  1. Der Crawler folgt dem Footer-Link und prerendert `/mail` als `public/mail/index.html` mit `<meta http-equiv="refresh" content="0; url=mailto:…">`. Zur Laufzeit gewinnt dann die statische Datei (200 statt 302). Abhilfe: `routeRules: { '/mail': { prerender: false } }`.
  2. `sendRedirect()` schickt immer ein Meta-Refresh-HTML mit der Adresse im Body. Abhilfe: Status und `Location` selbst setzen, Body leer.
  3. `mail.get.ts` bedient kein HEAD (`curl -I` → 404). Abhilfe: `mail.ts` mit eigener Methodenprüfung.

```ts
// server/routes/mail.ts
export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') throw createError({ statusCode: 405 })
  setResponseStatus(event, 302)
  setResponseHeader(event, 'Location', 'mailto:spike@example.invalid')
  return null
})
```

```
$ curl -I http://localhost:3457/mail
HTTP/1.1 302 Found
Location: mailto:spike@example.invalid
```

- `grep -r` über `.output/public` findet die Adresse danach nicht mehr. Sie steht nur im Server-Bundle (`server/chunks/routes/mail.mjs`).
- **CV-Download:** `server/routes/downloads/cv.ts` liest die PDFs aus `server/assets/` über `useStorage('assets:server')`. Nitro bettet sie base64-kodiert ins Server-Bundle ein (`server/chunks/raw/cv-de.mjs`), unter `public/` liegt kein PDF. Der Crawler folgt den Formularen nicht.

```
$ curl -i -X POST -d lang=de http://localhost:3457/downloads/cv
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="nick-haecker-lebenslauf.pdf"
X-Robots-Tag: noindex
Cache-Control: no-store
Content-Length: 370

$ curl -i http://localhost:3457/downloads/cv
HTTP/1.1 303 See Other
location: /lebenslauf
```

- `lang=en` liefert `nick-haecker-cv.pdf`, eine unbekannte `lang` 400, `PUT` 405.

**Image-Größe**
- `node:24-alpine` hat 172 MB, das Spike-Image 294 MB. Die App macht 122 MB aus: 85,5 MB Unity-Testdateien, 32,4 MB Server (davon 18,4 MB sharp/libvips) und rund 3,5 MB übriges `public/`. Ohne Embeds sind es also rund 208 MB.
- Build im Container: `npm ci` 13 s, `nuxt build` 60 s (davon 41 s Brotli für die 40-MB-Datei).

**Nebenbefunde**
- Ein Build unter Windows warnt `cache-driver.mjs … could not be resolved – treating it as an external dependency`, im Linux-Container nicht. Das spricht ebenfalls für den Build im Container.
- npm 11 blockiert den `postinstall` von esbuild (`allowScripts`). Der Build läuft trotzdem.
- **Die Alt-Web-Builds sind schon offline** (curl, 2026-11-15): `athaeck.github.io/A-fraction-of-time/` leitet per Meta-Refresh auf `nickhaecker.github.io/A-fraction-of-time/Release/index.html`, dort kommt 404 „Site not found“. `athaeck.github.io/VisualNovel/` liefert 404. Deshalb hatte der Spike auch keinen echten Unity-Build.

**Nicht getestet:** ein echter Unity-Build mit Loader im Browser (B und C sind nur auf HTTP-Ebene geprüft).

**Hand-Test (Owner, 2026-11-15):** Am Desktop unter Windows, in Zen (Firefox-Basis) und im Browser von VS Code (Chromium-Basis), öffnet „E-Mail schreiben“ den Mail-Client, und die PDF-Buttons laden das PDF. Safari und Handy sind nicht getestet. Das Spike-Image liegt lokal: `docker run --rm -p 3457:3000 spike-nuxt:test`, dann `http://localhost:3457/lebenslauf` (Handy im selben WLAN: `http://<PC-IP>:3457`).

**Folgen für die Map**
- [Tech-Stack](12-tech-stack.md): Content-DB `:memory:`, Build im Container, Plugin für den Trailing Slash, `/mail` als `mail.ts` mit `prerender: false`. IPX und sharp laufen zur Laufzeit mit.
- [Embed-Architektur](13-embed-architektur.md): Wahl zwischen B (gzip-Fallback, dreifache Größe, Build-Zeit) und C (eine Datei, kein Aufwand, nur Brotli). In beiden Fällen kostet jeder laufende Download die volle Dateigröße an RAM. Header-Regeln gehen nur per Verzeichnis.
- [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md): Auch der „lokale Build → Registry“ baut im Container.
- Nebel **Cutover:** Die beiden Alt-Web-Builds sind schon jetzt nicht erreichbar.
