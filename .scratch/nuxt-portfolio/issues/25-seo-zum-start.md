# SEO zum Start

Type: grilling
Status: resolved
Blocked by: 24

## Question

Welche SEO-Bausteine kommen zum Start, und wie?

- **Sitemap und robots.txt:** ohne die `noindex`-Rechtsseiten aus der [Impressum-Lösung](14-impressum-loesung.md).
- **JSON-LD:** welche Typen auf welcher Seite, welche Felder aus dem [Inhaltsmodell](09-inhaltsmodell.md).
- **Search Console:** Art der Property und Weg der Bestätigung. Ein DNS-Eintrag geht als Kommentar-Vorschlag an die Infra (Cloudflare-Zone).
- **OG-Bilder:** ja oder nein, generiert oder von Hand.
- **Title und Description pro Seite:** Muster und Quelle im Inhaltsmodell. Das ist die Basis, die schon zum Rebuild gehört.

Grundlage: [SEO-Fakten](24-seo-fakten.md).

## Answer

Entschieden vom Owner am 2026-11-16 in drei Runden. Grundlage sind die [SEO-Fakten](24-seo-fakten.md). In dieser Sitzung zusätzlich geprüft, jeweils aus der Primärquelle:

- Googles Doku zu Site Names, Redirects, ProfilePage, Software App, Article, Movie, Carousel, Breadcrumb, Video, AI Features und Google-Extended;
- Apples Doku zu Applebot;
- die Crawler-Doku von Slack und Meta;
- die Typen von nitropack 2.13.6 (`dist/shared/nitro.TNvtAJEc.d.mts`);
- Lighthouse `core/audits/seo/is-crawlable.js`.

**Keine neuen Module.** Die Modulliste aus dem [Tech-Stack](12-tech-stack.md) bleibt, ebenso CSP und Datenschutzerklärung.

**Sitemap: eigener Nitro-Hook statt `@nuxtjs/sitemap`**
- **Ablauf:** `prerender:route` sammelt jede Route mit `contentType` `text/html`, deren HTML kein `noindex` trägt. `prerender:done` schreibt daraus `.output/public/sitemap.xml`. Die Signaturen sind in nitropack 2.13.6 belegt: `PrerenderRoute` hat `route`, `contents` und `contentType`.
- **Inhalt:** eine Sitemap für beide Sprachen, nur `<loc>`.
  - Kein hreflang. Google sagt, eine Methode reicht, und `useLocaleHead` setzt sie schon im Kopf (belegt im [Build-Spike](16-build-spike.md)). Damit erledigt sich der offene Punkt aus den SEO-Fakten, die Alternates bei `i18n.pages`.
  - Kein `lastmod`, weil Coolify flach klont und Git-Daten im Build deshalb falsch wären. Kein `priority` und kein `changefreq`.
- **Was von selbst draußen bleibt:**
  - die 404, denn sie läuft zur Laufzeit;
  - `/mail` und `/downloads/cv`;
  - `/builds/` und die Legacy sites, denn sie werden nicht vorgerendert;
  - `/_ipx` und `_payload.json`, denn sie sind kein HTML.
- Die Datei ist statisch, zur Laufzeit läuft dafür nichts.

**robots.txt: statisch in `public/`, als Allowlist**
- Zugelassen sind nur Suchmaschinen fürs Ranking, das Internet Archive und Vorschau-Bots. KI-Crawler bleiben draußen, auch künftige.

```
User-agent: *
Disallow: /

User-agent: Googlebot
User-agent: bingbot
User-agent: DuckDuckBot
User-agent: Applebot
User-agent: archive.org_bot
User-agent: LinkedInBot
User-agent: Twitterbot
User-agent: facebookexternalhit
User-agent: Discordbot
User-agent: TelegramBot
Allow: /

User-agent: Google-Extended
User-agent: Applebot-Extended
Disallow: /

Sitemap: https://athaeck.de/sitemap.xml
```

- Kein `Disallow` auf einzelne Pfade. Die Rechtsseiten und `/builds/` müssen crawlbar bleiben, sonst wird ihr `noindex` nie gelesen.
- **Belege:**
  - Google-Extended „does not impact a site's inclusion in Google Search nor is it used as a ranking signal“ (developers.google.com/search/docs/crawling-indexing/google-extended).
  - Applebot-Extended „does not crawl webpages“, und seine Regeln „are not considered in ranking for Search“ (support.apple.com/en-us/119829).
  - DuckDuckBot hält sich an robots.txt.
  - Slack: „We do not currently honor robots.txt“.
  - Meta-ExternalFetcher umgeht robots.txt, wenn ein Nutzer den Abruf auslöst.
- **UNVERIFIED:**
  - das Token `bingbot`; es ist nur aus dem Lighthouse-Quelltext belegt;
  - ob LinkedInBot, Twitterbot, Discordbot und TelegramBot robots.txt beachten; sie stehen vorsorglich auf der Liste;
  - ob `*` auch für Produkt-Tokens gilt; deshalb sind Google-Extended und Applebot-Extended ausdrücklich gesperrt.
- **Grenzen:**
  - robots.txt ist freiwillig.
  - Die AI Overviews und der AI Mode von Google laufen über Googlebot. Begrenzen lassen sie sich nur mit `nosnippet` oder `noindex`, und beides kostet Sichtbarkeit in der Suche (developers.google.com/search/docs/appearance/ai-features).
  - Abrufe, die ein Nutzer auslöst, ignorieren robots.txt.
- **Lighthouse:** `is-crawlable` schlägt nur fehl, wenn `*`, Googlebot, bingbot, DuckDuckBot und archive.org_bot alle gesperrt sind. Sonst gibt es nur eine Warnung, SEO = 100 bleibt erreichbar.
- **Legacy sites:** Sie bleiben indexierbar, weil es alte Links auf sie gibt. Sie stehen aber nicht in der Sitemap und bekommen keinen eigenen Header.

**`noindex`**
- Die vier Rechtsseiten setzen `useSeoMeta({ robots: 'noindex' })`, ohne `X-Robots-Tag` per `routeRules`. Der Sitemap-Hook liest dasselbe Tag. Die 404 braucht keins.
- `/builds/**` behält sein `X-Robots-Tag: noindex` aus der [Embed-Architektur](13-embed-architektur.md).

**JSON-LD: von Hand, ohne `nuxt-schema-org`**
- **Umsetzung:** Ein Composable `useJsonLd(nodes)` schreibt per `useHead` ein `<script type="application/ld+json">`, mit `<` als `<` maskiert. Dazu kommt je Seitentyp eine kleine Builder-Funktion. Es ist ein Datenblock und berührt den CSP nicht.
- **Wo:** auf jeder indexierbaren Seite. Nicht auf den Rechtsseiten, die `noindex` tragen, und nicht auf der 404.
- **Graph:** Jede Seite trägt einen eigenständigen `@graph`, weil Google jede Seite einzeln auswertet. Er enthält:
  - einen Seitenknoten: `@id` und `url` = canonical, `name` = Titel, `description`, `inLanguage`, `isPartOf` → `#website`;
  - `WebSite` mit `@id` `https://athaeck.de/#website`: `name` „Nick Philipp Häcker“, `alternateName` „athaeck“, `url`. Für den Site-Namen nutzt Google ihn nur auf `/`: „Structured data must be on the home page“;
  - `Person` mit `@id` `https://athaeck.de/#person`: `name`, `url`, `sameAs` (= `profiles`). **Nie** `email`, wegen der Regel „nirgends im Klartext“, und nie eine Anschrift.

| Seite | Seitenknoten | Zusatz |
|---|---|---|
| Home | `WebPage`, `about` → `#person` | `ItemList` der Featured projects |
| About | `ProfilePage`, `mainEntity` → `#person` | Person zusätzlich mit `alternateName`, `description` (= `headline`) und `image` (Porträt) |
| CV | `WebPage`, `about` → `#person` | keiner |
| Projects | `CollectionPage` | `ItemList` aller Projects in der Reihenfolge der Seite |
| Project page | `ItemPage`, `mainEntity` → Project | `BreadcrumbList`, `VideoObject` pro Galerie-Video |

- **ProfilePage auf About:** Google nennt „An "About Me" page on a blog site“ als Beispiel und die Startseite eines Shops als Gegenbeispiel. Zu einer Portfolio-Home sagt die Doku nichts, eine zweite ProfilePage für den CV ist nicht dokumentiert.
- **Project-Typ nach `kind`:**

  | kind | Typ |
  |---|---|
  | game | `VideoGame` |
  | research | `ScholarlyArticle` |
  | film | `Movie` |
  | tool, asset | `CreativeWork` |

  - Kein `SoftwareApplication`: Ein Rich Result verlangt `aggregateRating` oder `review`. `VideoGame` allein bekommt laut Google kein Rich Result. Dass es dann auch nicht als Software-App geprüft wird, ist gefolgert, nicht wörtlich belegt.
  - **Felder:** `name`, `description` (`summary`), `image` (`cover`), `url`, `inLanguage`, `genre`, `dateCreated` (Start der ersten Phase), `keywords` (die Namen der Skills), `award` (die Titel der Auszeichnungen aus dem Badge), `video` (die VideoObjects).
  - **Owner:** `author`, wenn alle Phasen `teamSize` 1 haben, sonst `contributor`. Teamnamen stehen weiter nicht im Content.
- **`ItemList`** in Kurzform: `ListItem` mit `position` und `url`. Ein Rich Result gibt es nicht, Karussells gibt es nur für Course, Movie, Recipe und Restaurant, mit Einträgen eines Typs.
- **`BreadcrumbList`** `Projekte › <Titel>`: zwei Glieder, das letzte ohne `item`. Google zeigt Breadcrumbs nur am Desktop.
- **`VideoObject`** pro Video in `gallery`: `name` (= `caption`), `description` (= `alt`), `thumbnailUrl` (= `poster`), `uploadDate` (= `date`) und `contentUrl` (die Datei, absolut). Kein `duration`. Links vom Typ `video` bekommen kein Markup.
- Ausgezeichnet wird nur, was sichtbar ist: „Don't mark up content that is not visible to readers of the page“.

**Nachtrag zum [Inhaltsmodell](09-inhaltsmodell.md)**
- Ein Video-Eintrag in `gallery` bekommt zwei Felder: `poster`, eine Bilddatei, die auch als `<video poster>` dient, und `date` (ISO 8601, Veröffentlichung).
- `caption` ist bei Videos Pflicht. Fehlt eins der drei, bricht das Schema den Build ab.

**Sichtbarer Pfad (Nachtrag zur [Design-Richtung](11-design-richtung.md))**
- Die Project page zeigt oben links im Teaser `Projekte / <Titel>` statt „← Projects“. Markup: `<nav aria-label="Pfad"><ol>`, das letzte Glied mit `aria-current="page"`, Exo in Versalien in der Größe der Kicker.
- Am Handy blendet CSS das letzte Glied aus. Dort steht dann `← Projekte`, und der Titel folgt groß darunter.
- EN: `Projects / <Title>` mit `aria-label="Breadcrumb"`.

**OG und Twitter**
- **Project page:** `og:image` ist das `cover`, per `$img` (ipxStatic) beim Prerender auf 1200 × 630 zugeschnitten, mit `fit: cover`. `og:image:alt` ist `coverAlt`.
- **Alle anderen Seiten:** `public/og.png` mit 1200 × 630. Der Owner baut es von Hand aus Prototyp D: Name, Joystick-Logo und Zeitlinien-Motiv, ohne Sprachtext. `og:image:alt` kommt aus einem UI-Text.
- **Tags:**
  - `og:title` und `og:description`, gleich Titel und Description;
  - `og:url` = canonical;
  - `og:image` absolut, mit `og:image:width` und `og:image:height`;
  - `og:type website` und `og:site_name`;
  - `og:locale` (`de_DE` bzw. `en_US`) mit `og:locale:alternate`;
  - `twitter:card summary_large_image`.
- Kein `nuxt-og-image`.

**Titel und Description**
- Es bleibt beim Muster aus der [Seitenstruktur](10-seitenstruktur.md). `og:*` übernimmt dieselben Werte. Es gibt keine Längenprüfung.

**Search Console und Bing**
- **Search Console:** eine Domain-Property `athaeck.de` auf dem Google-Konto des Owners (mit 2FA), bestätigt per DNS-TXT in der Cloudflare-Zone. Dafür geht ein Kommentar-Vorschlag an infra-05. Angelegt wird sie vor dem Cutover, damit es Daten ab dem ersten Tag gibt.
- **Sitemap:** Nach dem Launch wird sie im Bericht „Sitemaps“ eingereicht. Zusätzlich steht sie in robots.txt.
- **Bing Webmaster Tools:** per Import aus der Search Console.
- Auf der Seite braucht es dafür weder Code noch Skript noch Cookie. Die Datenschutzerklärung ändert sich nicht.
- Für `athaeck.github.io` gibt es keine Property.

**Alte URLs (Kommentar-Vorschlag an infra-19)**
- Die Weiterleitungsseiten auf `athaeck.github.io` nutzen einen sofortigen Meta-Refresh (`content="0; url=…"`) und dazu `<link rel="canonical">` auf das Ziel. Google: „interprets instant meta refresh redirects as permanent redirects“. Verzögerte gelten als temporär.
- **Prüfauftrag:** ob eine `CNAME`-Datei mit `athaeck.de` einen echten 301 samt Pfad liefert, obwohl der DNS auf Hetzner zeigt (UNVERIFIED).

**Prüfung**
- **`npm run audit`** aus der [Teststrategie](21-teststrategie.md) bekommt zwei Punkte dazu:
  - Lighthouse SEO = 100;
  - einen Sitemap-Check: Jede URL aus `sitemap.xml` liefert 200, hat kein `noindex`, und ihr canonical ist sie selbst.
- **Einmal zum Launch, von Hand:**
  - der Rich Results Test auf `/`, `/projekte` und einer Project page, ohne Fehler. Läuft er nicht durch, sperrt robots.txt Googlebot;
  - der robots.txt-Bericht der Search Console;
  - LinkedIn Post Inspector und eine Vorschau bei X auf einer Project page.
- **Prüfpunkte beim ersten Build:**
  - Im Hook liegt `contents` vor, und die Sitemap enthält genau die erwarteten URLs.
  - Die `/_ipx`-Variante des OG-Bilds wird vorgerendert, obwohl sie nur im Meta-Tag steht. Sonst wird sie über den Header `x-nitro-prerender` nachgetragen.
- Für den Hook gibt es keinen Vitest.

**Folgen**
- **Neues Ticket:** [Videos auf der Project page](26-videos-project-page.md). Laut Build-Spike liefert Nitro statische Dateien ganz aus dem RAM, ohne `Range`. Safari auf iOS spielt `<video>` aber nur mit Byte-Ranges (UNVERIFIED).
- **Kommentare** in [Inhaltsmodell](09-inhaltsmodell.md), [Seitenstruktur](10-seitenstruktur.md), [Design-Richtung](11-design-richtung.md), [Tech-Stack](12-tech-stack.md), [Impressum-Lösung](14-impressum-loesung.md) und [Teststrategie](21-teststrategie.md). Dazu Kommentar-Vorschläge an infra-05 und infra-19.
- **Glossar** unverändert. **Keine ADR,** denn alles lässt sich leicht umkehren.

## Comments

- 2026-11-15 (Agent, über [Analytics und Consent](23-analytics-und-consent.md)): Analytics misst die Google-Suche nicht. Suchbegriffe, Impressionen und Klicks aus der Suche deckt die Search Console ab. Markierte Links laufen nur pro Kanal, per `utm_source`.
