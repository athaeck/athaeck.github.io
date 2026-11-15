# Tech-Stack festlegen

Type: grilling
Status: resolved
Blocked by: 03, 16

## Question

Womit genau wird gebaut?

- Nuxt-Version und Module (i18n, Content, Image, Fonts, Icons).
- Styling: Tailwind, UnoCSS, plain CSS oder Nuxt UI? Der Ansatz muss jede Richtung aus [Design-Richtung und Signature-Moment](11-design-richtung.md) tragen. 3D- und Motion-Libraries sind noch Fog.
- Node-Version, Package-Manager, Lint- und Typecheck-Tooling.

Grundlage: [Nuxt-Stack-Fakten](03-nuxt-stack-fakten.md). Entscheidungen mit Lock-in kommen als ADR, wenn die ADR-Kriterien greifen.

## Answer

Entschieden vom Owner am 2026-11-15 in drei Runden. Die Fakten kommen aus der npm-Registry, von nodejs.org und aus dem Quelltext der Modul-Tarballs. Die Tarballs wurden nur gelesen, nichts davon wurde ausgeführt.

**Runtime und Pakete**
- **Node 26** (Active LTS seit 2026-10-28, EOL 2029-04-30; 26.13.1 bringt npm 11.20.0 mit). Node 24 ist seit 2026-10-20 nur noch Maintenance LTS (EOL 2028-04-30). In `package.json` steht `engines.node: "^26.13.0"`. Nuxt 4.6.4 verlangt `^24.15.0 || >=26`. `node:sqlite` hat in 24 und 26 den Status „Release candidate“ und braucht kein Flag. Es gibt `node:26-alpine` mit den Tags alpine3.23 und alpine3.24.
- **npm** in der Version, die bei Node mitkommt. Corepack liefert Node seit 25.0.0 nicht mehr mit (Changelog, TSC-Beschluss nodejs/TSC#1697). Deshalb gibt es weder pnpm noch ein `packageManager`-Feld. `package-lock.json` liegt im Repo, im Container läuft `npm ci`, die Ranges sind Caret, Updates kommen von Hand per `npx nuxt upgrade`. Install-Skripte von Abhängigkeiten blockt npm (ab 11.16 mit Warnung, in npm 12 standardmäßig). Der Stack braucht keine, deshalb bleibt `allowScripts` leer. sharp und esbuild kommen als plattformgebundene optionale Abhängigkeiten.
- **Nuxt `^4.6.4` mit den Standard-Defaults**, ohne `future.compatibilityVersion: 5`. Version 5 schaltet rund 20 Nuxt-5-Defaults ein, darunter die Vite Environment API, aber nicht Nitro v3. Die Module sind auf den 4er-Defaults erprobt, der Spike ebenso. Die Umstellung auf Nuxt 5 bekommt ein eigenes Ticket, sobald es stabil ist und die Module es unterstützen. TypeScript strict (Nuxt-Default).
- **Module:** `@nuxtjs/i18n` 10.6, `@nuxt/content` 3.16, `@nuxt/image` 2.2, `@nuxt/fonts` 1.2 und `@nuxt/eslint` 1.17. Sonst keine. UI-Texte liegen in den i18n-Sprachdateien ([Inhaltsmodell](09-inhaltsmodell.md)).

**Konfiguration (aus dem [Build-Spike](16-build-spike.md) übernommen)**
- Content: `database: { type: 'sqlite', filename: ':memory:' }` und `experimental.sqliteConnector: 'native'`. Content 3.16.2 bringt `zod ^3.25.76` für die Schemas mit und liest `.yml` und `.yaml`.
- Build im Container, Nitro-Plugin für den Trailing Slash (301), `/mail` als `server/routes/mail.ts` mit `routeRules: { '/mail': { prerender: false } }` und leerem Body.

**Bilder: IPX nur beim Prerender**
- `image.provider: 'ipxStatic'` auf `node-server`. Belegt im Quelltext von `@nuxt/image` 2.2.1 (`dist/module.js:375`): Ein explizites `ipxStatic` wird auch dann gewählt, wenn Nitro auf `node` läuft. In dem Fall hängt `ipxSetup({ isStatic: true })` den `/_ipx/**`-Handler nur in die Prerender-Konfiguration (`nitro.options._config.handlers`), nicht in die Laufzeit-Handler (`module.js:49-57`).
- Grund: IPX erlaubt per Default jeden Modifier bis 8192 px (`allowedModifiers`, `maxOutputDimension`), und es gibt keinen Cache für Varianten. Jeder könnte also für jedes Bild beliebig viele Größen rechnen lassen. Ohne Laufzeit-IPX fällt sharp vermutlich aus dem Server-Bundle (−18,4 MB laut Spike).
- Preis: Die 404 ist die einzige Seite, die zur Laufzeit gerendert wird. Sie bekommt nur Bild-Varianten, die es schon gibt. Ihr Chronoskop ist SVG. Mit Strapi in Phase 2 stellt man in einer Zeile zurück auf `ipx`.

**Schrift**
- `@nuxt/fonts` mit `@fontsource-variable/exo` und `families: [{ name: 'Exo', provider: 'npm', weights: ['100 900'] }]`.
- Ohne diese Zeile käme Exo beim Build von Google. Die Provider werden in der Reihenfolge local, adobe, google, …, npm gefragt, und die Voreinstellung ist `npm: { remote: false }` (`fontless` `dist/index.mjs:291-309`, `@nuxt/fonts` `dist/module.mjs:1017`). Über npm ist die Datei per Lockfile gepinnt, und der Build braucht kein Netz.
- Die Metrik-Fallbacks sind standardmäßig an (`experimental.disableLocalFallbacks: false`), das senkt den Layout-Shift.

**Styling: plain CSS** ([ADR-0003](../../../docs/adr/0003-hand-written-css-no-utility-framework.md))
- Design-Tokens (Papier, Tinte, Chrono-Blau, Cyan, Pink, Messing, Schriftgrößen per `clamp()`) liegen als Custom Properties in einer Datei, z. B. `app/assets/css/tokens.css`. Alles andere steht in `<style scoped>` mit nativem Nesting. Das Print-Stylesheet ist eine eigene Datei.
- Kein Tailwind, kein UnoCSS, kein Nuxt UI, kein Präprozessor. SCSS wurde geprüft und verworfen: Prototyp D hat praktisch nur einen Breakpoint (860 px) plus `pointer: fine`, also 4 Varianten von `@media`, und sonst 51× `clamp()`. Mixins lohnen sich dafür nicht, und Sass-Variablen würden die Tokens verdoppeln. Die Farben müssen Custom Properties bleiben, weil die dunklen Bänder sie zur Laufzeit umschalten.

**Icons ohne Modul**
- Etwa 15 SVGs (GitHub, LinkedIn, itch.io, die 9 Link-Typen, Mail, Kopieren, Pfeil) aus Lucide (ISC) und Simple Icons (CC0) liegen in `app/assets/icons/`. Eine Komponente `<AppIcon name>` lädt sie per `import.meta.glob('…/*.svg', { query: '?raw', import: 'default', eager: true })` und gibt Inline-SVG mit `currentColor` aus.
- `@nuxt/icon` scheidet aus. Mit den Defaults legt es den Server-Endpoint `/api/_nuxt_icon` an (`provider: 'server'`, `dist/module.mjs:600`) und fällt auf `api.iconify.design` zurück (`fallbackToApi`), das sind Drittanfragen. Mit `provider: 'none'` bräuchte es zwei JSON-Collections und eine Runtime-Komponente, und dynamische Namen müsste man von Hand eintragen.

**Motion und 3D**
- Keine 3D- und keine Motion-Library (three.js, GSAP, Motion One, Lottie). Der Signature-Moment braucht laut [Design-Richtung](11-design-richtung.md) nur SVG, CSS und wenig JS. Der Spielmodus ist Unity in Phase 2, und Embeds bringen ihren eigenen Loader mit.
- Der Zeitsprung-Übergang wird ein Overlay im Layout (Vue-`<Transition>`), das ein Router-Hook vor dem Seitenwechsel abspielt. Bei `prefers-reduced-motion` entfällt er. `experimental.viewTransition` bleibt aus. Der Prototyp nutzt auch kein `startViewTransition`, und Morphing zwischen Elementen ist nicht vorgesehen.

**Lint, Format, Typecheck**
- `@nuxt/eslint` 1.17 mit ESLint 10 und `features.stylistic: true`. Das bringt `@stylistic/eslint-plugin` mit (`@nuxt/eslint-config` `dist/chunks/stylistic.mjs`). Kein Prettier, kein Stylelint.
- `nuxt typecheck` mit `vue-tsc` und **`typescript ~6.0.3`, gepinnt**. `typescript@latest` ist 7.0.2, der native Go-Port ohne die klassische JS-API. `vue-tsc` 3.3.14 hängt an `@volar/typescript` 2.4.30, und das verlangt `typescript <7`. Nuxt 4.6.4 entwickelt selbst gegen 6.0.3.
- Skripte `lint` und `typecheck` in `package.json`. Wo sie laufen, entscheidet die [Pipeline](15-build-deploy-pipeline.md).

**Security ohne `nuxt-security`**
- Die Header stehen per `routeRules` auf `/**` und gelten nur unter `$production`, weil Vite im Dev WebSocket und eval braucht:
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - eine restriktive `Permissions-Policy`
  - dazu ein CSP, das alles auf die eigene Origin zwingt:

```
default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';
connect-src 'self'; frame-ancestors 'self'; base-uri 'self';
form-action 'self'; object-src 'none'
```

- Das CSP setzt die Regel „keine Anfragen an Dritte“ im Browser durch. Ein versehentlich eingebauter Fremd-Font oder ein fremdes iframe wird blockiert.
- `'unsafe-inline'` bei `script-src` ist bewusst so: Es gibt keine Einschleusestelle. Die Inhalte kommen aus dem Repo, die einzigen Eingaben sind `lang` am CV-POST (geprüft) und `/mail` ohne Parameter. Hashes müsste man pro vorgerenderter Seite errechnen, Nonces bräuchte die 404. `'wasm-unsafe-eval'` ist für Unity.
- Einen Rate Limiter in der App gibt es nicht. Seit `ipxStatic` rechnet die Laufzeit kaum noch; falls doch nötig, gehört er an den Proxy.
- Kommen in Phase 2 Strapi oder ein Formular, wird `script-src` mit Hashes und Nonces neu bewertet.

**Prüfpunkte für den ersten Build** (noch nicht belegt)
1. Container-Check des Spikes auf `node:26-alpine` wiederholen: `--read-only`, 404 mit Content, Prerender der `/_ipx`-Varianten.
2. Der `npm`-Provider findet `@fontsource-variable/exo` für „Exo“. Sonst zeigt `families[].src` direkt auf die woff2 im Paket.
3. `curl /_ipx/w_321&f_avif/…` → 404, und unter `.output/server/node_modules` liegt kein `sharp`.
4. Das CSP blockiert nichts Eigenes (Konsole auf allen Seitentypen). Den Unity-Loader prüft die [Embed-Architektur](13-embed-architektur.md).

**Folgen für die Map**
- [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md) ist entblockt. Basis-Image ist `node:26-alpine`, Lint und Typecheck müssen eingehängt werden.
- [Embed-Architektur](13-embed-architektur.md): Das CSP erlaubt `'wasm-unsafe-eval'`, aber keine Fremd-Origins. Ein Embed von einer Subdomain bräuchte eine Ausnahme bei `script-src` und `connect-src`. Header gehen nur per Verzeichnis.
- Nebel **Teststrategie:** Der Tech-Stack steht. Die Strategie kann jetzt ein Ticket werden.
- Das Glossar bleibt unverändert, es kamen keine neuen Fachbegriffe dazu.

## Comments

- 2026-11-15 (Agent, über [Embed-Architektur](13-embed-architektur.md)): Drei Nachträge.
  - Die restriktive Permissions-Policy muss `fullscreen=(self)` stehen lassen, weil Embeds im iframe mit `allow="fullscreen"` laufen.
  - `/builds/**` bekommt per `routeRules` ein eigenes CSP: das der Seite plus genau das, was der Unity-Loader nachweislich braucht. Dazu kommen `X-Robots-Tag: noindex`, `immutable` auf `/builds/*/Build/**` und `no-cache` für den Rest.
  - Prüfpunkt 4 („Den Unity-Loader prüft die Embed-Architektur“) verweist jetzt auf die Prüfpunkte in [Embed-Architektur](13-embed-architektur.md). Sie laufen beim ersten Unity-Web-build, nicht beim ersten Build der Seite, denn die Seite startet ohne Embed.
- 2026-11-15 (Agent, über [Abgleich mit athaeck-infra](20-abgleich-infra.md)): Zwei Nachträge.
  - Das Trailing-Slash-Plugin hat eine feste Präfixliste: `/builds/` und die Pfadnamen der Legacy sites unter `public/<alter-name>/`. Für diese Präfixe erzwingt es die Form **mit** Slash, z. B. `/Chess-Game` → 301 `/Chess-Game/`. Ohne Slash liefert Nitro die `index.html` zwar aus, aber die relativen Pfade darin brechen. Überall sonst entfernt das Plugin den Slash wie bisher. Umbenannte Altpfade sind `routeRules`-Redirects.
  - Die Umleitung von `www` macht Coolify („Redirect to non-www“), nicht die App.
