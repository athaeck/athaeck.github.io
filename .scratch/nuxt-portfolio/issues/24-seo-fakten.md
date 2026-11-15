# SEO-Fakten

Type: research
Status: resolved
Blocked by: –

## Question

Welche Bausteine gibt es für SEO zum Start, und wie passen sie zu Nuxt 4.6 mit `@nuxtjs/i18n` (`prefix_except_default`, lokalisierte Abschnitte), Prerender und `node-server`? Gesucht sind Fakten mit Quellen, Stand November 2026.

- **Sitemap:**
  - Stand von `@nuxtjs/sitemap` (Nuxt SEO) mit i18n: hreflang in der Sitemap, lokalisierte Pfade, vorgerenderte Seiten.
  - Lassen sich `noindex`-Seiten ausschließen?
  - Ist die Sitemap zur Laufzeit oder statisch?
- **robots.txt:** `@nuxtjs/robots` oder eine Datei in `public/`?
- **JSON-LD:**
  - Welche schema.org-Typen passen zu einem Portfolio, etwa `Person`, `ProfilePage`, `WebSite`, `CreativeWork`, `VideoGame` oder `SoftwareApplication`?
  - Was davon nutzt Google tatsächlich, etwa für Rich Results oder Profilseiten?
  - `nuxt-schema-org` oder von Hand mit `useHead`?
- **Search Console:**
  - Domain-Property per DNS-TXT oder URL-Property per HTML-Datei bzw. Meta-Tag?
  - Wie reicht man die Sitemap ein?
- **OG-Bilder:**
  - Generiert beim Build (`nuxt-og-image`: Renderer, RAM im Build-Container auf dem CAX11) oder von Hand?
  - Größen, Twitter Cards.
- **Folgen:** Was davon braucht Code zur Laufzeit, was Änderungen am CSP aus dem [Tech-Stack](12-tech-stack.md)?

Anlass: [Impressum-Lösung](14-impressum-loesung.md). Der Owner holt den SEO-Ausbau aus Phase 2 in den Start.

## Answer

Details mit Quellen: Branch `research/seo-fakten`, Datei `.scratch/nuxt-portfolio/research/24-seo-fakten.md` (lokal, nicht gepusht). Zwei Durchgänge; der zweite war eskaliert und hat den Quelltext der Module gelesen.

- **Module:** Alle passen zu Nuxt 4.6. `@nuxtjs/sitemap` 9.1.0, `nuxt-schema-org` 7.0.1 und `nuxt-og-image` 7.0.7 setzen Nuxt ab 4.6 voraus. `@nuxtjs/robots` 7.0.2 setzt Meta-Tag und `X-Robots-Tag` aus Route Rules.
- **Sitemap und i18n:**
  - Für alle Strategien außer `no_prefix` gibt es eine Sitemap pro Sprache, laut Doku. Mit eigenen Pfaden über `i18n.pages`, wie hier, soll es dagegen eine einzige sein.
  - **Offen und entscheidend:** welcher Modus hier greift und ob die Alternates die lokalisierten Pfade tragen. Das klärt nur ein Build-Test.
  - Ohne Eintrag in `nitro.prerender.routes` ist die Sitemap eine Route zur Laufzeit.
- **noindex:** Die Sitemap lässt URLs weg, deren robots-Regel `false` oder `noindex` ist, deren Route Rule `sitemap: false` trägt oder deren `X-Robots-Tag` `noindex` sagt. Die Rechtsseiten dürfen nicht per `Disallow` gesperrt werden, sonst liest Google ihr `noindex` nie.
- **hreflang:** Eine Methode reicht laut Google. Geplant ist sie schon im HTML-Kopf (`useLocaleHead`).
- **JSON-LD:**
  - Google nutzt ProfilePage (Pflicht: `mainEntity`, eine Person mit `name`) und SoftwareApplication. Für die zweite braucht ein Rich Result Bewertungen.
  - Person, VideoGame, WebSite, CreativeWork und ScholarlyArticle stehen nicht in Googles Galerie.
  - Ausgezeichnet werden darf nur, was sichtbar auf der Seite steht.
  - JSON-LD ist ein Datenblock, kein ausgeführtes Skript. Laut HTML-Spec berührt es den CSP nicht.
- **Search Console:** Eine Domain-Property lässt sich nur per DNS-TXT bestätigen. Auf der Seite braucht es dafür weder Skript noch Cookie.
- **OG-Bilder:**
  - `nuxt-og-image` mit Takumi oder Satori kann mit `zeroRuntime` alles beim Build rendern, auf dem ARM-Build-Host. Für Takumi und resvg gibt es Binaries für `linux-arm64-musl`. Ob sie unter Alpine laufen und wie viel RAM sie brauchen, ist nicht geprüft.
  - Meta empfiehlt mindestens 1200 × 630 px (1,91:1). Die Vorgaben von X sind nicht geprüft.
  - Statische Bilder von Hand brauchen nichts davon.
