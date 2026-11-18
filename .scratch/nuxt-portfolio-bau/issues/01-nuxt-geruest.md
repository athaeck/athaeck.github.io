# Nuxt-Gerüst mit Modulen, Locales und Gate-Skripten

Status: ready-for-agent
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

- [ ] `package.json`: `engines.node: "^26.13.0"`, kein `packageManager`, Caret-Ranges, `package-lock.json` eingecheckt. Nuxt `^4.6.4` ohne `future.compatibilityVersion`.
- [ ] Genau diese Nuxt-Module: `@nuxtjs/i18n` 10.6, `@nuxt/content` 3.16, `@nuxt/image` 2.2, `@nuxt/fonts` 1.2, `@nuxt/eslint` 1.17. Dazu `typescript ~6.0.3` (gepinnt), `vue-tsc`, `vitest`.
- [ ] Scripts `lint`, `typecheck` (`nuxt typecheck`), `test` (`vitest run`, bis 04 mit `--passWithNoTests`), `build`. `audit` kommt mit 36.
- [ ] i18n: `strategy: 'prefix_except_default'`, `defaultLocale: 'de'`, `detectBrowserLanguage: false`, `customRoutes: 'config'` mit allen Pfaden aus § 4.2 (DE und EN), `baseUrl: 'https://athaeck.de'`. UI-Texte liegen in i18n-Sprachdateien für DE und EN.
- [ ] Content: `database: { type: 'sqlite', filename: ':memory:' }`, `experimental.sqliteConnector: 'native'`. Weder `better-sqlite3` noch `sqlite3` liegen in `node_modules`.
- [ ] Image: `provider: 'ipxStatic'`.
- [ ] Fonts: `@fontsource-variable/exo` mit `families: [{ name: 'Exo', provider: 'npm', weights: ['100 900'] }]`, Metrik-Fallbacks an. Der Build macht keinen Request an Google (Prüfpunkt [§ 24.2](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build): findet der Provider Exo nicht, zeigt `families[].src` auf die woff2 im Paket).
- [ ] Nitro: Preset `node-server`, `compressPublicAssets: true`, `prerender.crawlLinks: true`, `prerender.ignore` für `/builds/`, `/media/`, `/mail`, `/downloads/`.
- [ ] ESLint 10 über `@nuxt/eslint` mit `features.stylistic: true`. Kein Prettier, kein Stylelint, kein CSS-Präprozessor.
- [ ] `.gitattributes` mit `public/builds/** binary`. `.gitignore` ergänzt um `node_modules`, `.nuxt`, `.output`; `docs/about-me/` bleibt ignoriert.
- [ ] Die alte vCard-Seite ist entfernt: `index.html`, `index.txt`, `assets/css/`, `assets/js/`. `assets/images/` bleibt, bis 17, 18 und 20 die genutzten Bilder übernommen haben (38 räumt den Rest).
- [ ] `npm run build` schreibt `.output/public/index.html` und `.output/public/en/index.html`; `node .output/server/index.mjs` liefert beide mit 200.

## Hinweise

- `allowScripts` bleibt leer. Läuft `nuxt prepare` beim `npm ci` nicht (nötig für `.nuxt/eslint.config.mjs` und die Typen), gehört es in die Scripts `lint` und `typecheck`, nicht ins Dockerfile.
- `bash.exe.stackdump` im Repo-Root ist untracked Müll eines Shell-Absturzes: nicht committen.
