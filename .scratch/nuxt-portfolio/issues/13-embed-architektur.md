# Embed-Architektur

Type: grilling
Status: resolved
Blocked by: 04, 16

## Question

- **Wo liegen Unity-WebGL-Builds?** Im Repo, per Git LFS, als eigenes Artefakt in der Registry, oder in einem eigenen Container bzw. auf einer Subdomain?
- **Wie werden sie ausgeliefert?** Header, Kompression.
- **Wie bindet eine Project page ein Embed ein?** iframe oder Canvas-Komponente, Lazy Loading, Aufräumen.
- **Grenzen:** Größenbudget, und was passiert ohne WebGL?

Grundlage: [Unity-WebGL-Embed-Fakten](04-unity-webgl-embed-fakten.md). Dazu die vorhandenen Web-Builds aus dem [Inhaltsinventar](../content-inventory.md), §4: A Fraction of Time als Unity WebGL auf GitHub Pages, die Workbench als Sketchfab-Viewer. Embed-UX im Detail (Poster, Click-to-play) bleibt Fog.

Später soll die Architektur auch den [Spielmodus](18-spielmodus-und-mobil-modus.md) tragen: einen größeren Unity-Build auf eigener Route, nicht in einer Project page, mit Startbildschirm und Laden erst nach einem Klick.

## Answer

Entschieden vom Owner am 2026-11-15 in drei Runden. Grundsatzentscheidung als [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md).

**Fakten, die neu dazukamen**
- Lokaler Build `E:/Projekte/athaeck/athaeck-about-me-urp-build` (Unity 2021.3.39f1, URP, unkomprimiert): 42,0 MB roh, 16,2 MB mit Brotli 11, 19,6 MB mit gzip 9 (gemessen mit Node `zlib`). `.data` hat 20,0 → 11,4 MB br, `.wasm` 21,6 → 4,7 MB br.
- Der Loader von 2021.3 lädt `framework.js` per `<script src>` ohne `blob:` (`createObjectURL` kommt 0-mal vor) und nutzt IndexedDB. Ein neuerer Loader unbekannter Version erzeugt Script und Worker aus `blob:` (Scout, sekundär: huggingface.co/spaces/hunghd20012003/Huggy, `Build/HuggyCorrectUnity.loader.js`). Was Unity 6 braucht, ist UNVERIFIED.
- Ein leeres Unity-6-Projekt hat mit URP etwa 8–11 MB, mit Built-in etwa 3–4 MB (Forum und Gist, Kompression unklar).
- Firefox schickt `br` nur an sichere Origins, auch nicht an `http://localhost` (Mozilla-Bug 1222541, offen). Chromium dekodiert auch Encodings, die es nicht angekündigt hat. Der Vite-Dev-Server setzt für `.br` kein `Content-Encoding` (`packages/vite/src/node/server/middlewares/static.ts`).
- Ob Coolify Git-LFS-Objekte holt: UNVERIFIED, weder Doku noch Issue gefunden.
- Die AFoT-Demo „delta“ für Windows hat 244 MB Spieldaten, davon 72 MB `sharedassets1.resource` und 40 MB `resources.assets.resS`. Einen WebGL-Build von AFoT gibt es lokal nicht, nur den Ur-Prototyp als Unity-2020.3.22f1-Projekt (`E:/Projekte/a-fraction-of-time/A-fraction-of-time/VirtuelPrototype`).
- Chess Game liegt fertig gebaut unter `E:/Projekte/HFU/PrimaSS21Endabgabe` (`ChessGame.html`); FUDGE ist dort unter `./references/` eingecheckt, ohne CDN. AUREA Novel gibt es nur im GitHub-Repo.
- Der frühere Ansatz in `athaeck-de` (Nuxt 2) war eine Canvas-Komponente `AhUnityWebPlayer.vue` mit `createUnityInstance` (Zeile 100), ohne `Quit()` oder sonstiges Aufräumen.

**Begriffe** (Glossar)
- *Web build* ist neu: ein interaktiver Build, den die Seite selbst hostet, egal welche Engine (Unity, FUDGE, three.js). Er läuft als *Embed* in einer Project page oder als *Game mode* auf eigener Route.
- *Embed* heißt jetzt „A Web build running inside a Project page“. Er ist also nicht mehr auf Unity beschränkt.
- Fremde Viewer und Live-Demos (Sketchfab, `bassadin.github.io`) sind keine Web builds. Sie bleiben Links vom Typ `viewer` oder `play`. Ein fremdes iframe blockt das CSP, und es wären Anfragen an Dritte.

**Ablage**
- Ein Web build liegt als normale Git-Datei unter `public/builds/<slug>/` im Site-Repo und landet so im Image. Nitro liefert ihn aus, same origin. Das CSP der Seite bleibt, ADR-0001 trägt.
- Eingecheckt werden nur Release-Builds, keine Test-Builds, denn jeder Build bleibt für immer in der Git-Historie. `.gitattributes` setzt `public/builds/** binary`.
- Verworfen: Git LFS (Coolify unbelegt, sonst landen still Pointer-Dateien im Image), ein Registry-Artefakt per `COPY --from` (Push-Schritt und Registry-Zugang im Build), Subdomain oder eigener Static-Container (zweites Deploy, `frame-src`-Ausnahme, Widerspruch zu ADR-0001). Der Spiel-Effort prüft für den Game mode die Registry-Variante neu, weil der oft neue Releases bekommt.

**Kompression: Variante C aus dem [Build-Spike](16-build-spike.md)**
- Unity-Kompression „Brotli“, ohne Decompression Fallback. Nitro liefert die wörtliche `.br` mit `Content-Encoding: br` und dem Typ der Originaldatei aus. Das braucht keine Konfiguration und keine Rechenzeit im Build, und die Datei liegt nur einmal im Image.
- Preis: Es gibt keinen gzip-Fallback. In Produktion zählt das nicht, die Seite ist nur HTTPS (HSTS). Lokal startet ein Build nicht in `nuxt dev` und nicht über http in Zen/Firefox. Getestet wird das Spiel deshalb mit Unitys „Build and Run“, die Einbindung im Produktions-Container mit Chromium.
- Verworfen wurde B (Unity unkomprimiert plus `compressPublicAssets`): Jeder Site-Build würde neu komprimieren (etwa 1 s pro MB), und das Image enthielte drei Kopien, beim lokalen Build 77,8 statt 16,2 MB.

**Einbindung**
- Die Seite zeigt den Web build in einem same-origin `<iframe>` auf `/builds/<slug>/`. Er bringt seine eigene `index.html` aus einem minimalen Template mit: Das Canvas füllt das Fenster, es gibt keine Unity-Chrome.
- Das iframe entsteht erst beim Klick. Vorher lädt kein Byte des Builds.
- Aufgeräumt wird, indem das iframe entfernt wird: Vue unmountet es beim Seitenwechsel. Die Seite ruft kein `Quit()` auf und kennt keine Unity-API.
- Für das iframe gilt `allow="fullscreen"`. Tastatureingaben bekommt es erst nach einem Klick hinein.

**Geräte und Grenzen**
- „Spielen“ wird nur bei feinem Zeiger, breitem Viewport und WebGL 2 angeboten. Das ist dieselbe Fähigkeitsprüfung wie beim Game mode und passt zu Design D („Im Browser spielen“, sonst „Trailer ansehen“).
- Ein Embed trägt nie allein Inhalt. Ohne JavaScript, ohne WebGL 2 oder am Handy ist die Project page trotzdem vollständig: Cover, Galerie, Trailer.
- Vorgaben an jeden Unity-Web-build: WebGL 2, kein Native Multithreading (also keine COOP/COEP-Header), kein WebGPU, kein Decompression Fallback, „Name Files As Hashes“ an.
- **Budget**, gemessen in übertragenen Bytes (bei C die Summe der Dateien im Verzeichnis): **≤ 50 MB pro Embed, ≤ 100 MB für den Game mode.** Zur Einordnung: 50 MB brauchen bei 50 Mbit/s etwa 8 s, 100 MB etwa 16 s. Ab dem zweiten Besuch kommt alles aus dem Cache. Der Grund für die Obergrenze ist der RAM: Nitro hält jede Datei bis zum Senden ganz im Speicher, ein Besucher, der gerade lädt, kostet also etwa die Build-Größe.
- Ein Embed ist ein spielbarer Ausschnitt, nicht das ganze Spiel. Die volle Demo bleibt ein `download`-Link. Ein Build über dem Budget verlässt das Image (Registry-Artefakt oder streamender Static-Server), das Budget steigt nicht.

**Auslieferung: `routeRules` für `/builds/**`**
- `/builds/*/Build/**`: `Cache-Control: public, max-age=31536000, immutable`, möglich wegen der gehashten Namen. Der Rest von `/builds/**` bekommt `no-cache`, damit ein neuer Build sofort greift.
- `X-Robots-Tag: noindex`. Kanonisch ist die Project page.
- Ein eigenes CSP für `/builds/**`: das CSP der Seite plus genau das, was der Loader nachweislich braucht. `frame-ancestors 'self'` bleibt.
- Die Permissions-Policy der Seite lässt `fullscreen=(self)` stehen.

**Vertrag zwischen Seite und Web build**
1. Die Seite hängt immer `?lang=de|en` an die iframe-URL. Ein Build darf das ignorieren.
2. Links aus einem Build gehen nur auf Pfade der eigenen Seite und öffnen sie im Top-Fenster (`window.top.location.assign`), nie als neuen Tab. In Unity braucht das eine kleine `.jslib`, weil `Application.OpenURL` einen neuen Tab öffnet.
3. Im Game mode rendert die Seite außerhalb des iframes eine feste Leiste mit „Zur Seite“, CV und Kontakt, mit ihren eigenen i18n-Texten. Sie funktioniert auch, wenn der Build hängt oder noch lädt. Das Spiel darf zusätzlich selbst verlinken.
4. Sonst gibt es keine Kopplung: kein `postMessage`, keine Daten (s. [Spielmodus und Mobil-Modus](18-spielmodus-und-mobil-modus.md)).

**Inhaltsmodell** (Nachtrag zum [Inhaltsmodell](09-inhaltsmodell.md))
- Das geteilte Feld `embed` ist `{ aspect: "16/9" }`. Es sagt, dass es einen Embed gibt, und gibt der Fläche vor dem Laden ihre Form (kein CLS). Pro Project gibt es höchstens einen Embed. Zwei Szenen werden ein Build mit Szenen-Menü.
- Das Verzeichnis ist per Konvention `public/builds/<project-slug>/`; die Slugs sind ohnehin eingefroren. Es gibt kein Pfad-Feld und keine Größe von Hand. Das Poster ist das `cover`.
- Steuerungshinweis, Größenanzeige und Ladeanzeige gehören zur Embed-UX (Nebel).

**Prüfungen im Build** (brechen den Build ab)
- Ein Verzeichnis unter `public/builds/` reißt sein Budget.
- Ein Project hat `embed`, aber `public/builds/<slug>/index.html` fehlt, oder ein Verzeichnis gehört weder zu einem Project mit `embed` noch zum Game mode.

**Prüfpunkte für den ersten Unity-Web-build** (noch nicht belegt)
Der Owner exportiert dafür einen Build mit Unity 6 nach den Vorgaben oben. Geprüft wird im Container, in Chromium und Firefox.
1. Der Loader startet im iframe mit C. Welche CSP-Rechte er braucht (z. B. `blob:` in `script-src` oder `worker-src`), geht genau so ins CSP von `/builds/**`.
2. Er nimmt `.data` mit `Content-Type: text/plain` an (so liefert Nitro es aus, s. Build-Spike).
3. `compressPublicAssets` komprimiert die `.br`-Dateien nicht ein zweites Mal.
4. Das Muster `/builds/*/Build/**` greift. Sonst gibt es eine Regel pro Slug, erzeugt aus dem Content.
5. Wird das iframe entfernt, gibt der Browser den Speicher frei (Task-Manager des Browsers).

**Scope**
- Die Seite startet ohne Embed. A Fraction of Time wird der erste nach dem Launch und muss aus dem Unity-Projekt neu gebaut werden; dabei laufen die Prüfpunkte. Chess Game und AUREA Novel können später einzeln als Content-Änderung dazukommen.
- Bis dahin hat keine Project page ein `embed`, und der Button „Im Browser spielen“ erscheint nur, wenn `embed` gesetzt ist.

**Folgen für die Map**
- Nebel **Embed-UX** ist entblockt. Feststehen: Poster ist das `cover`, die Fläche hat `aspect`, Laden erst nach Klick, Button nur mit `embed` und passender Fähigkeit.
- [Inhaltsmodell](09-inhaltsmodell.md): Form von `embed`.
- [Tech-Stack](12-tech-stack.md): Permissions-Policy mit `fullscreen=(self)`, eigenes CSP für `/builds/**`, Prüfpunkt 4 verweist hierher.
- [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md): die zwei Prüfungen im Build-Stage.
- Glossar: *Web build* ist neu, *Embed* ist neu gefasst.
- ADR: [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md).

## Comments

- 2026-11-15 (Agent): Korrektur zum Pfad des iframes. Das Trailing-Slash-Plugin aus dem [Tech-Stack](12-tech-stack.md) leitet `/builds/<slug>/` per 301 auf `/builds/<slug>` um. Nitro liefert dort zwar die `index.html` aus, aber relative Pfade wie `Build/x.loader.js` lösen dann auf `/builds/Build/…` auf, und der Build bricht. Deshalb gilt:
  - Das iframe zeigt auf `/builds/<slug>/index.html?lang=…`.
  - Das Plugin lässt `/builds/` aus; dasselbe gilt für jede andere statische Unterseite mit eigener `index.html`.
- 2026-11-15 (Agent, über [Abgleich mit athaeck-infra](20-abgleich-infra.md)): Zwei Nachträge.
  - **LFS:** Coolify holt LFS-Dateien doch, und zwar standardmäßig (`app/Models/Application.php:1808–1809` und Migration `2023_03_27_081717_create_application_settings_table.php:18`, Branch v4.x). Die Entscheidung für normale Git-Dateien bleibt trotzdem: Builds ändern sich selten, Coolify klont flach, und LFS brächte einen weiteren Weg mit, der über VPN und Port 8443 scheitern kann. [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md) nennt jetzt diesen Grund.
  - **Trailing Slash:** Für `/builds/` und die Legacy sites lässt das Plugin den Slash nicht mehr nur stehen, es erzwingt ihn: `/builds/<slug>` → 301 `/builds/<slug>/`. Das iframe auf `/builds/<slug>/index.html?lang=…` bleibt richtig.
- 2026-11-15 (Agent, über [Impressum-Lösung](14-impressum-loesung.md)): Zwei Nachträge.
  - **Ausstiegsleiste:** Sie liegt im Game mode außerhalb des iframes und verlinkt Impressum und Datenschutz, denn die Angaben müssen „ständig verfügbar“ sein.
  - **Prüfpunkt Datenschutz beim ersten Web build:** Speichert Unity etwas im Browser, etwa den IndexedDB-Cache bei „Data Caching“ oder PlayerPrefs? Dann wird die Datenschutzerklärung im selben Zug ergänzt.
- 2026-11-16 (Agent, über [Videos auf der Project page](26-videos-project-page.md)): Ohne passendes Gerät zeigt die Project page statt des Embeds den Trailer, danach den ersten Link. Für Videos streamt eine eigene Route `/media/**` mit Range aus `media/`, nicht aus `public/`. Beobachtung, nicht entschieden: Dieselbe Technik könnte auch `/builds/**` streamen. Dann fiele der RAM-Grund für das Budget der Embeds weg, aber die Route müsste `.br` samt `Content-Encoding` selbst ausliefern.
