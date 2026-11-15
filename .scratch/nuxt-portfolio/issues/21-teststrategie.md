# Teststrategie

Type: grilling
Status: resolved
Blocked by: –

## Question

Welche Prüfungen kommen über Lint, Typecheck und den Prerender (bricht bei totem Link ab) hinaus dazu, und wo laufen sie?

- Unit-Tests der eigenen Inhaltsprüfungen: fehlende Sprache, Budget und Konsistenz der Web builds.
- Link-Check der Legacy sites: Sind die relativen Pfade darin heil?
- Lighthouse (≥ 95 mobil) und axe (WCAG 2.2 AA) für die Qualitätsziele aus den [Grundsatzentscheidungen](01-grundsatzentscheidungen.md). Beide brauchen einen Browser.
- Oder bewusst nichts davon.
- Ort: im Gate des Build-Stages (ohne Browser, RAM des CAX11), lokal oder als Teil der README-Prüfung.

Grundlage: [Tech-Stack](12-tech-stack.md) und [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md).

## Answer

Geklärt im Grilling am 2026-11-15 (eine Runde mit dem Owner, alle Empfehlungen angenommen). Glossar und ADRs bleiben unverändert: Es gibt keinen neuen Begriff, und jede Wahl lässt sich ohne Lock-in umkehren.

**Grundsatz:** Was ohne Browser geht, läuft automatisch im Gate. Was einen Browser braucht, läuft von Hand über einen Befehl, und die README legt fest, wann.

**Unit-Tests im Gate**
- Vitest. Die fünf Inhaltsprüfungen (fehlende Sprache, `unreviewed`-Marker, Listenabgleich, Budget und Konsistenz der Web builds) sind reine Funktionen: Daten rein, Fehlerliste raus. Die Einbindung in den Build ist davon getrennt.
- Pro Regel gibt es eine gute und eine kaputte Fixture. So ist belegt, dass jede Prüfung auch anschlägt. Der echte Build zeigt immer nur den Gutfall.
- Dazu kommt die Regel des Trailing-Slash-Plugins: mit Slash für die Präfixliste (`/builds/` und die Altnamen), sonst ohne. Getestet werden auch die Randfälle `/`, `/en/` und eine Query.
- `/health`, `/mail` und der CV-POST bekommen keine Unit-Tests. Sie deckt die Stichprobe der README-Prüfung ab.
- `npm test` läuft als eigener `RUN`-Schritt im Build-Stage. Die Reihenfolge ist `lint`, `typecheck`, `test`, `build`. Weil die Schritte nacheinander laufen, bleibt die RAM-Spitze die des Builds (1,41 GB im Spike).
- Verworfen:
  - Tests nur lokal: Ohne Hooks und CI würde sie bald niemand mehr ausführen.
  - Keine Tests: Ein stiller Fehler in einer Prüfung fiele nie auf.

**Legacy sites: einmal beim Import**
- Es gibt keinen wiederkehrenden Test, denn Legacy sites ändern sich nie. Relative Pfade bleiben heil, weil Altname und Slash erhalten bleiben (`/<alter-name>/`, wie auf GitHub Pages).
- Brechen können zwei Arten von Links:
  - Root-relative Pfade, die nicht mit dem eigenen Altnamen beginnen. Auf GitHub Pages zeigten sie auf die alte Hauptseite, unter `athaeck.de` auf die neue.
  - Absolute Links auf `athaeck.github.io`. Sie funktionieren nur, solange die Weiterleitungen auf GitHub stehen.
- Beim Import jeder Legacy site wird deshalb per `grep` nach `="/` und nach `athaeck.github.io` gesucht, und die Seite wird einmal im lokalen Container durchgeklickt. Funde werden repariert oder als bekannte Lücke notiert.
- Den Import führt infra-19 durch. Das ist dort die Erstprüfung „Jede übernommene Seite läuft unter ihrem neuen Pfad“.

**Browser-Prüfungen: `npm run audit -- <base-url>`, von Hand**
- Nicht im Gate, aus vier Gründen:
  1. Chromium und ein laufender Server im Build-Stage, auf dem CAX11, den sich die Seite mit NetBird teilt.
  2. Lighthouse schwankt auf geteilten vCPUs, ein Deploy schlüge also zufällig fehl.
  3. Cookiebot und GTM verhalten sich nur auf `athaeck.de` echt.
  4. Eine Änderung im GTM-Container kann das CSP brechen, ganz ohne Build.
- Werkzeuge sind Playwright mit `@axe-core/playwright` und dazu Lighthouse. Sie kommen nicht in den Docker-Build. Ob sie in einen eigenen Ordner kommen oder per `npx` mit fester Version laufen, entscheidet der Bau.
- Der Befehl läuft vom PC des Owners. Gegen `http://localhost:3000` (Produktions-Container lokal) gibt er Feedback im Bau, gegen `https://athaeck.de` liefert er die Zahlen, die zählen.

**Umfang**
- Die Seitentypen sind Home, Projects, eine Project page, CV, About, Impressum, Datenschutz und 404.
- **axe** mit den Tags bis WCAG 2.2 AA, dazu die Prüfung **ohne JavaScript**: Der Hauptinhalt steht im HTML, und es gibt keine leere `<ClientOnly>`-Stelle. Beides läuft auf allen Typen in DE und EN, also auf 16 Seiten.
- **Lighthouse** mobil auf einem DE-Exemplar pro Typ, als Median aus drei Läufen. Gemessen wird immer vor der Wahl im Consent banner. Liegt eine der vier Kategorien unter 0,95, schlägt der Befehl fehl.
- **CSP:** Playwright sammelt `securitypolicyviolation` auf allen 16 Seiten vor der Wahl. Dazu kommt auf einer Seite je ein Lauf mit Zustimmung und einer mit Ablehnung, nur gegen `athaeck.de`. Das GTM-Preview prüft der Owner von Hand (Tag Assistant).

**Wann der Audit läuft** (die Regeln stehen in der README neben der README-Prüfung, einen Zeitplan gibt es nicht)
1. Beim ersten Build. Er belegt die CSP-Prüfpunkte aus dem [Tech-Stack](12-tech-stack.md) (Punkt 4) und aus [Analytics und Consent](23-analytics-und-consent.md).
2. Beim Launch gegen `athaeck.de`, als Bedingung für den Cutover: nach dem Deploy in infra-18, vor den Weiterleitungen in infra-19.
3. Nach jeder Änderung an Layout, Komponenten, CSS, `routeRules` oder CSP.
4. Nach jedem Veröffentlichen im GTM-Container, dann nur der CSP-Teil gegen `athaeck.de`.
- Reine Inhaltsänderungen wie ein neues Project brauchen keinen Audit. Sie decken das Gate und die Schemas ab.

**Hand-Checkliste für WCAG** (ein Abschnitt in der README; beim Launch und nach größeren Layout-Änderungen)
- axe findet nur einen Teil der Verstöße gegen WCAG 2.2 AA.
- Nur mit der Tastatur durch alle Seitentypen: Fokus sichtbar, sinnvolle Reihenfolge, Skip-Link, Skill-Popover, Consent banner, Chronoskop.
- Zoom auf 200 % und Reflow bei 320 px.
- `prefers-reduced-motion`: Das Zeitsprung-Overlay entfällt.
- Ein kurzer Durchgang mit NVDA.
- Die Druckvorschau der CV-Seite.
- Ein echtes Handy. Der Audit läuft nur in Chromium, deshalb gehören Firefox und Safari auch in diese Checkliste.

**Folgen**
- [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md): Das Gate bekommt `RUN npm test` zwischen `typecheck` und `build` (Kommentar dort).
- [Analytics und Consent](23-analytics-und-consent.md): Die Prüfpunkte zu Konsole und Lighthouse laufen über den Audit (Kommentar dort).
- Kommentar-Vorschläge an infra-18 (Audit und Checkliste als Abnahme vor infra-19) und an infra-19 (Prüfung der Links beim Import).

## Comments

- 2026-11-15 (Agent, über [Übersetzungs-Workflow](17-uebersetzungs-workflow.md)): Es gibt zwei neue Inhaltsprüfungen, die Unit-Tests brauchen könnten: den `unreviewed`-Marker und den Listenabgleich (gleich viele Einträge und gleiche Fakten in `phases`, `gallery`, `contributions`, `learnings`, `services` und `languages`).
- 2026-11-15 (Agent, über [Analytics und Consent](23-analytics-und-consent.md)): Zwei neue Prüfungen kommen hinzu.
  - **Lighthouse ohne Zustimmung:** Lighthouse misst immer den Zustand vor der Wahl, also nur mit dem Cookiebot-Loader und dem Banner.
  - **CSP in der Konsole:** keine CSP-Fehler bei Zustimmung, bei Ablehnung und im GTM-Preview.
  - **Ort:** Die Teststrategie entscheidet, ob diese Prüfungen automatisch oder von Hand laufen und wo.
- 2026-11-16 (Agent, über [SEO zum Start](25-seo-zum-start.md)): Drei Nachträge.
  - **Audit:** `npm run audit` prüft zusätzlich Lighthouse SEO = 100 und die Sitemap: Jede URL liefert 200, trägt kein `noindex`, und ihr canonical ist sie selbst.
  - **Von Hand zum Launch:**
    - der Rich Results Test auf `/`, `/projekte` und einer Project page;
    - der robots.txt-Bericht der Search Console;
    - LinkedIn Post Inspector und die Vorschau bei X.
  - **Schema:** Bei Videos in `gallery` sind `poster`, `date` und `caption` Pflicht. Für den Sitemap-Hook gibt es keinen Vitest.
- 2026-11-16 (Agent, über [Videos auf der Project page](26-videos-project-page.md)): Zwei Nachträge.
  - **Vitest:** Die neue Inhaltsprüfung **Video** (Größe, Codec, `faststart`, keine Tonspur) bekommt eine gute und eine kaputte Fixture. Abweichend von „Server-Routen ohne Unit-Test“ bekommt die Route `/media/**` Unit-Tests für das Parsen von Range und das Pfad-Muster, denn sie ist eine Vertrauensgrenze.
  - **Hand-Checkliste:** Der Trailer läuft auf einem echten iPhone, in Safari am Mac und in Firefox.
