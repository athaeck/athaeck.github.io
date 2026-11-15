# Videos auf der Project page

Type: grilling
Status: resolved
Blocked by: –

## Question

Wie kommen die Videos aus `gallery` auf die Project page? Sie sollen überall laufen, auch auf dem iPhone, ohne den Server zu überlasten.

- **Auslieferung:**
  - Laut [Build-Spike](16-build-spike.md) liest Nitro jede statische Datei pro Anfrage ganz in den RAM, ohne Streaming und ohne `Range`.
  - Laut Apple spielt Safari auf iOS `<video>` nur von Servern mit Byte-Range-Unterstützung (UNVERIFIED, prüfen).
  - Optionen:
    - eine Nitro-Route mit Streaming und `Range` (etwa 30 Zeilen);
    - ein anderer Weg im selben Container;
    - ein Drittanbieter. Das berührt CSP und Consent, und es wären Anfragen an Dritte.
- **Budget:**
  - Größe pro Video.
  - RAM unter `mem_limit: 512m` ([Build- und Deploy-Pipeline](15-build-deploy-pipeline.md)).
  - Ablage in Git wie die Web builds?
- **Formate:** Container und Codec, eine oder zwei Quellen, `preload`.
- **Handy-Button:** In Design D führt der Haupt-Button am Handy zum Video statt ins Spiel ([Design-Richtung](11-design-richtung.md)). Welches Video ist das, und was passiert ohne Video? Das berührt auch den Nebel „Embed-UX“ (Fallback am Handy).
- Vorher eventuell ein kurzer Spike mit Safari.

Schon entschieden in [SEO zum Start](25-seo-zum-start.md):
- die Felder `poster` und `date`;
- `caption` als Pflichtfeld bei Videos;
- das `VideoObject`.

Anlass: [SEO zum Start](25-seo-zum-start.md).

## Answer

Entschieden vom Owner am 2026-11-16 in drei Runden. In dieser Sitzung geprüft:

- **Safari braucht Byte-Ranges**, belegt durch die Primärquelle. Apple schreibt: „HTTP servers hosting media files for iOS must support byte-range requests“ ([Safari Web Content Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html)). Safari fragt zuerst `bytes=0-1` an und bricht ohne 206 ab ([WebKit Bug 229413](https://bugs.webkit.org/show_bug.cgi?id=229413)). Laut [Build-Spike](16-build-spike.md) kann Nitro das nicht. Videos in `public/` liefen deshalb in Safari auf iPhone und Mac nicht.
- **Bestand:** Eigene Videodateien hat nur Free3D, 9 MP4s mit je 7 bis 10 MB (Repo `HFU-DM-free3D/free3d.github.io`, `static/videos/`). Der FSJ Film liegt auf YouTube. Die anderen Featured projects haben kein Video.
- **`youtube-nocookie`** verhindert laut Google nur die Personalisierung, Werbung bleibt möglich ([YouTube-Hilfe](https://support.google.com/youtube/answer/171780)). Laut mehreren Tests aus zweiter Hand ([Cloud Four](https://cloudfour.com/thinks/youtube-no-cookies-adds-cookies/), [Stefan Judis](https://www.stefanjudis.com/blog/the-lie-of-youtubes-privacy-enhanced-embed-mode)) beschreibt der Player schon beim Laden `localStorage` und IndexedDB. Damit wären eine Zwei-Klick-Fassade, ein Abschnitt in der Datenschutzerklärung und eine Lücke im CSP nötig.

**Auslieferung: eigene Nitro-Route mit Range**
- Kurze, stumme Clips liegen in Git, ohne LFS, unter **`media/<project-slug>/<name>.mp4`**, außerhalb von `public/`. Sonst liefert sie Nitros Static-Handler vorher ohne Range aus. Die URL ist `/media/<project-slug>/<name>.mp4`. Das Dockerfile kopiert `media/` in den Runtime-Stage.
- Die Route `server/routes/media/[...path].get.ts`:
  - lässt nur Pfade nach `^[a-z0-9-]+/[a-z0-9-]+\.mp4$` durch, alles andere bekommt 404 (Schutz gegen Path Traversal);
  - streamt per `createReadStream` und hält nie eine ganze Datei im RAM;
  - antwortet ohne Range mit 200 und der ganzen Datei, bei einem einzelnen Bereich (`a-b`, `a-`, `-n`) mit 206 und `Content-Range`, bei einem unerfüllbaren Bereich mit 416; mehrere Bereiche ignoriert sie mit 200 (RFC 9110);
  - setzt `Accept-Ranges: bytes`, `Content-Type: video/mp4` und `Cache-Control: public, max-age=31536000, immutable`.
- **Regel:** Eine Videodatei wird nie überschrieben, eine neue Fassung bekommt einen neuen Namen. Der Build kann das nicht prüfen. Wer die Regel bricht, dem zeigen wiederkehrende Besucher bis zu einem Jahr die alte Fassung.
- **Lange Videos** und Videos mit Ton (z. B. der FSJ Film) bleiben Links vom Typ `video` auf YouTube. Sie öffnen sich dort, ohne Einbettung und ohne Einwilligung.
- Das CSP bleibt, wie es ist (`default-src 'self'` deckt `<video>` ab). Auch die Datenschutzerklärung bleibt unverändert.
- Verworfen:
  - `youtube-nocookie` mit Zwei-Klick-Fassade: Einwilligung, Google in der Datenschutzerklärung, `frame-src`, fremdes Branding und Werbung, Upload von Teammaterial;
  - Hetzner Object Storage: zweiter Dienst, Infra-Plan, `media-src`-Ausnahme.

**Budget:** ≤ 20 MB pro Video, sonst bricht der Build ab. Das erweitert die Budget-Prüfung. Die Gründe sind die Git-Historie, die Größe des Images und das Datenvolumen am Handy, nicht der RAM. Eine Grenze pro Project gibt es nicht.

**Format: eine Quelle**
- MP4 mit H.264, `yuv420p`, höchstens 1080p, **ohne Tonspur**, mit `+faststart`. Keine zweite Quelle in WebM oder AV1.
- Neue Inhaltsprüfung **Video**: Sie liest die MP4-Boxen ohne Abhängigkeit und bricht ab, wenn
  - der Codec nicht `avc1` ist (das fängt HEVC-Aufnahmen vom iPhone ab),
  - `moov` hinter `mdat` liegt,
  - oder eine Tonspur (`hdlr` `soun`) da ist.
- Der `ffmpeg`-Befehl zum Kodieren steht in der README, etwa `ffmpeg -i in -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -vf "scale='min(1920,iw)':-2" -movflags +faststart out.mp4`.
- **Eine Datei für beide Sprachen.** Text im Bild bleibt, wie er ist, `alt` und `caption` beschreiben ihn je Sprache. Das passt zum Listenabgleich, der in beiden Sprachen dasselbe `file` verlangt.

**Ton und Barrierefreiheit:** Zum Start gibt es nur stumme Videos. Für WCAG 2.2 AA genügt bei einem stummen Video eine Textalternative (1.2.1), und die ist `alt`. Ein Video mit Ton bräuchte Untertitel (1.2.2) und eine Audiodeskription (1.2.5).

**Abspielen:** `<video controls playsinline preload="none" poster="…">`, ohne Autoplay und ohne Loop. Vor dem Klick lädt kein Byte, und WCAG 2.2.2 greift nicht.

**Trailer und Haupt-Button**
- Der **Trailer** ist das erste Video in `gallery`, ohne eigenes Feld. Der Begriff steht im Glossar. Ein Link vom Typ `video` ist kein Trailer.
- Der Haupt-Button im Teaser folgt einer festen Reihenfolge, der erste Treffer gewinnt:
  1. Embed, wenn das Gerät passt (Desktop, feiner Zeiger, WebGL 2): „Im Browser spielen“;
  2. Trailer: „Trailer ansehen“;
  3. der erste Eintrag in `links`, beschriftet nach Typ;
  4. sonst kein Button.
- Das Basis-Markup zeigt den Kandidaten ohne Embed. JavaScript tauscht ihn gegen „Im Browser spielen“, wenn das Gerät passt. Das ist dasselbe Muster wie beim Game mode.
- „Trailer ansehen“ ist ein Anker auf das Video im Screen „Im Spiel“. Mit JavaScript startet die Wiedergabe dort auch. Es gibt kein Overlay und keinen eigenen Vollbildmodus.
- Damit ist der Fallback am Handy aus dem Nebel „Embed-UX“ geklärt. Beispiele: A Fraction of Time zeigt am Handy ohne Trailer den ersten Link, ONA TECH überall den itch.io-Link.

**Tests**
- Unit-Tests mit Vitest für das Parsen von Range und für das Pfad-Muster. Das ist eine Vertrauensgrenze, deshalb die Ausnahme von „Server-Routen ohne Unit-Test“ in der [Teststrategie](21-teststrategie.md).
- Die Video-Prüfung bekommt nach der bestehenden Regel eine gute und eine kaputte Fixture.

**Prüfpunkte beim ersten Build**
1. `curl --range 0-99 …/media/<slug>/<name>.mp4` liefert 206 und 100 Bytes, ohne `--range` kommt 200 mit der ganzen Datei.
2. `/media/..%2f…` und `/media/x/../y.mp4` liefern 404.
3. Der Trailer läuft auf einem echten iPhone, in Safari am Mac und in Firefox (Hand-Checkliste).
4. Bei 20 parallelen Downloads eines Videos bleibt der RAM des Containers flach (Spike mit `public/`: von 72 auf 508 MB).
5. Die `/_ipx`-Variante des `poster` wird vorgerendert. `<video poster>` ist kein `<NuxtImg>`; mit `ipxStatic` gäbe es zur Laufzeit sonst 404 (Mechanik wie beim OG-Bild in [SEO zum Start](25-seo-zum-start.md)).

**Folgen**
- **Glossar:** neuer Begriff *Trailer*.
- **Kommentare** in [Inhaltsmodell](09-inhaltsmodell.md), [Design-Richtung](11-design-richtung.md), [Embed-Architektur](13-embed-architektur.md), [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md) und [Teststrategie](21-teststrategie.md).
- **Neues Ticket:** [Embed-UX](27-embed-ux.md), Nebel graduiert.
- **Keine ADR:** Videos auf YouTube umzuziehen bliebe leicht. Der Grund für die eigene Route steht hier und in der Spec.
