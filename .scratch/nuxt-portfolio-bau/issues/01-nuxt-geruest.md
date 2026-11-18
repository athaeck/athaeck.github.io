# Nuxt-Gerüst mit Modulen, Locales und Gate-Skripten

Status: resolved
Blocked by: –

## Ziel

Ein konfiguriertes, noch inhaltsleeres Nuxt-4.6-Projekt ersetzt die alte vCard-Seite. `npm run lint`, `typecheck`, `test` und `build` laufen grün; der Prerender erzeugt `/` und `/en`.

## Spec-Abschnitte

- [§ 16 Tech stack](../../nuxt-portfolio/spec.md#16-tech-stack) (ohne Renovate, siehe 02)
- [§ 4.1 Locales](../../nuxt-portfolio/spec.md#41-locales), [§ 4.2 Pages](../../nuxt-portfolio/spec.md#42-pages) (Pfadtabelle, reservierte Pfade)
- [§ 10.1 Images](../../nuxt-portfolio/spec.md#101-images)
- [§ 19.1 Repo](../../nuxt-portfolio/spec.md#191-repo)
- [ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md), [ADR-0003](../../../docs/adr/0003-hand-written-css-no-utility-framework.md)

## Akzeptanzkriterien

- [x] `package.json`: `engines.node: "^26.13.0"`, kein `packageManager`, Caret-Ranges, `package-lock.json` eingecheckt. Nuxt `^4.6.4` ohne `future.compatibilityVersion`.
- [x] Genau diese Nuxt-Module: `@nuxtjs/i18n` 10.6, `@nuxt/content` 3.16, `@nuxt/image` 2.2, `@nuxt/fonts` 1.2, `@nuxt/eslint` 1.17. Dazu `typescript ~6.0.3` (gepinnt), `vue-tsc`, `vitest`.
- [x] Scripts `lint`, `typecheck` (`nuxt typecheck`), `test` (`vitest run`, bis 04 mit `--passWithNoTests`), `build`. `audit` kommt mit 36.
- [x] i18n: `strategy: 'prefix_except_default'`, `defaultLocale: 'de'`, `detectBrowserLanguage: false`, `customRoutes: 'config'` mit allen Pfaden aus § 4.2 (DE und EN), `baseUrl: 'https://athaeck.de'`. UI-Texte liegen in i18n-Sprachdateien für DE und EN.
- [x] Content: `database: { type: 'sqlite', filename: ':memory:' }`, `experimental.sqliteConnector: 'native'`. Weder `better-sqlite3` noch `sqlite3` liegen in `node_modules`.
- [x] Image: `provider: 'ipxStatic'`.
- [x] Fonts: `@fontsource-variable/exo` mit `families: [{ name: 'Exo', provider: 'npm', weights: ['100 900'] }]`, Metrik-Fallbacks an. Der Build macht keinen Request an Google (Prüfpunkt [§ 24.2](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build): findet der Provider Exo nicht, zeigt `families[].src` auf die woff2 im Paket). Abweichung: statt `src` nennt `providerOptions.npm` das Paket, siehe Comments.
- [x] Nitro: Preset `node-server`, `compressPublicAssets: true`, `prerender.crawlLinks: true`, `prerender.ignore` für `/builds/`, `/media/`, `/mail`, `/downloads/`.
- [x] ESLint 10 über `@nuxt/eslint` mit `features.stylistic: true`. Kein Prettier, kein Stylelint, kein CSS-Präprozessor.
- [x] `.gitattributes` mit `public/builds/** binary`. `.gitignore` ergänzt um `node_modules`, `.nuxt`, `.output`; `docs/about-me/` bleibt ignoriert.
- [x] Die alte vCard-Seite ist entfernt: `index.html`, `index.txt`, `assets/css/`, `assets/js/`. `assets/images/` bleibt, bis 17, 18 und 20 die genutzten Bilder übernommen haben (38 räumt den Rest).
- [x] `npm run build` schreibt `.output/public/index.html` und `.output/public/en/index.html`; `node .output/server/index.mjs` liefert beide mit 200.

## Hinweise

- `allowScripts` bleibt leer. Läuft `nuxt prepare` beim `npm ci` nicht (nötig für `.nuxt/eslint.config.mjs` und die Typen), gehört es in die Scripts `lint` und `typecheck`, nicht ins Dockerfile.
- `bash.exe.stackdump` im Repo-Root ist untracked Müll eines Shell-Absturzes: nicht committen.

## Comments

- 2026-11-18 (Agent, Umsetzung): Gerüst steht. Gesperrt sind die Spike-Versionen: nuxt 4.6.4, nitropack 2.13.6, @nuxtjs/i18n 10.6.0, @nuxt/content 3.16.2, @nuxt/image 2.2.1, @nuxt/fonts 1.2.0, @nuxt/eslint 1.17.0, eslint 10.15.0, typescript 6.0.3, vue-tsc 3.3.14, vitest 5.1.1, @fontsource-variable/exo 5.3.0. Node 26.13.0, npm 11.20.0.
  - **Belege:** `npm ci`, dann `lint`, `typecheck`, `test` und `build` mit Exit 0. Gegenprobe: ein absichtlicher Typfehler bricht `typecheck` mit TS2322 ab. `node .output/server/index.mjs`: `/` → 200 `<h1>Startseite</h1>`, `/en` → 200 `<h1>Home</h1>`, beide aus dem Static-Handler (ETag, `Content-Encoding: br`). Unter `.output/server/node_modules` liegen weder sharp noch ipx noch sqlite (Vorbeleg für Prüfpunkt 3).
  - **Prüfpunkt § 24.2 negativ:** Der npm-Provider findet „Exo“ nicht. Der Build bricht ab mit „Could not produce font face declaration from npm for font family Exo“, denn das Paket nennt seine Schrift „Exo Variable“. Statt `families[].src` steht in der Family `providerOptions: { npm: { package: '@fontsource-variable/exo', file: 'index.css' } }`. Laut unifont nimmt der Provider mit `file` die einzige Family der Datei unter jedem Namen. So bleiben die drei Subsets (latin, latin-ext, vietnamese) mit `unicode-range` erhalten, und die Metrik-Fallbacks (Arial, Helvetica Neue, Segoe UI, Noto Sans, Liberation Sans) entstehen. Die woff2 kommen per `file://` aus `node_modules` und landen unter `/_nuxt/fonts/`.
  - **Kein Netz im Build:** Ein per `NODE_OPTIONS=--require` geladener Hook auf `dns.lookup` protokolliert während `npm run build` keine einzige Anfrage. Gegenprobe: Ein `fetch` auf example.com taucht im Protokoll auf.
  - **`customRoutes` belegt:** Die Schlüssel in `pages` sind Route-Namen; i18n sucht erst den Namen, dann den Pfad (`getConfigValue` in `@nuxtjs/i18n/dist/module.mjs`). Mit temporären Stubs (`projekte/index.vue`, `projekte/[slug].vue`, `lebenslauf.vue`, `ueber-mich.vue`, `impressum.vue`, `datenschutz.vue`) antworten alle zwölf Pfade aus § 4.2 mit 200 und der richtigen Seite. `/en/projekte`, `/projects`, `/cv` und `/en/lebenslauf` liefern 404. Die Stubs sind wieder entfernt; 20 legt sie unter genau diesen Dateinamen an. Beobachtung: Statische Seiten prerendert Nitro auch ohne Link (mit Stubs 27 statt 7 Routen), dynamische nur über Links.
  - **Prüfpunkt 6 vorbelegt:** Mit temporären Links auf `/mail`, `/downloads/cv`, `/builds/probe/` und `/media/probe/clip.mp4` besucht der Crawler keinen davon (0 Treffer im Prerender-Log). Ein Link auf `/gibtsnicht` stoppt den Build mit „Exiting due to prerender errors“. Die Probe ist wieder entfernt.
  - **Zusätzlich zum Ticket:**
    - `nitro.prerender.routes: ['/', '/en']`. i18n ergänzt `/en` nur bei `nuxt generate` mit `strategy: 'prefix'`, und Nitro setzt `/` nur bei leerer Liste. Ohne Link auf `/en` (Sprachumschalter kommt mit 20) fehlte sonst `/en`.
    - `.gitignore` auch um `.data`: Content schreibt beim Build seine lokale DB nach `.data/content/contents.sqlite`.
    - ESLint ignoriert `.scratch/`, `.agents/`, `.claude/`. Die Prototypen und das Agent-Tooling brachten 1315 Fehler und gehören nicht zur Seite.
    - `app/app.vue` setzt `html { font-family: Exo, sans-serif }`, sonst erzeugt @nuxt/fonts kein `@font-face` und der Prüfpunkt wäre nicht belegbar. 20 zieht das in die Tokens. `app/pages/index.vue` ist ein Home-Stub mit dem UI-Text `pages.home` (DE „Startseite“, EN „Home“) aus `i18n/locales/{de,en}.json`.
    - `compatibilityDate: '2026-11-18'`. Dazu kommen die Scripts `dev` und `preview` sowie `postinstall: nuxt prepare` aus dem Nuxt-Starter.
  - **`nuxt prepare` beim `npm ci`:** Das läuft über das `postinstall` des Root-Pakets, `allowScripts` blockiert nur Install-Skripte von Abhängigkeiten. `.nuxt/eslint.config.mjs` liegt danach vor, `lint` und `typecheck` brauchen kein eigenes `prepare`. npm meldet die nicht ausgeführten `postinstall` von esbuild 0.28.2 und 0.25.12. Harmlos, die Plattform-Binaries kommen als optionale Abhängigkeit.
  - **Falle beim Neuauflösen:** Ein `npm install` aller Pakete auf einmal ohne Lockfile scheitert mit ERESOLVE. `@intlify/bundle-utils` 11.2.8 (über i18n) braucht esbuild `^0.25.4` und landet im Root, vite 8.3.8 hat esbuild `^0.27 || ^0.28` als optionalen Peer. Erst nuxt, dann die Module zu installieren, geht. Das Lockfile hält das Ergebnis, `npm ci` läuft. Ein späteres `npx nuxt upgrade`, das neu auflöst, kann wieder darauf stoßen.
  - **Offen und nicht von hier:**
    - Content warnt „No content configuration found“; `content.config.ts` kommt mit 03.
    - `<html>` hat noch kein `lang`, `useLocaleHead` kommt mit 20/22.
    - `/en/` liefert 200, das Trailing-Slash-Plugin kommt mit 09.
    - Nur unter Windows warnt der Build „cache-driver.mjs … treating it as an external dependency“. `@nuxt/nitro-server` 4.6.4 übergibt dort eine `file://`-URL als Storage-Driver des Prerenderers (`index.mjs:1445`). Im `.output` steht davon nichts, und im Linux-Container fällt der Zweig weg.
    - `@nuxt/content` 3.17.0 erschien am 2026-11-17; `^3.16.2` lässt es beim nächsten Update zu.
