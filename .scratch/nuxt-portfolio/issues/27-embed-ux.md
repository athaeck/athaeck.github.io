# Embed-UX

Type: prototype
Status: resolved
Blocked by: –

## Question

Wie sieht ein Embed auf der Project page aus, und wie verhält er sich vom Poster bis zum Verlassen? Der Prototyp läuft in Design D mit A Fraction of Time (Ordner [prototype-design-richtung/](../prototype-design-richtung/index.html)).

- **Ort und Start:**
  - Sitzt die Fläche im Screen „Im Spiel“ oder im Teaser?
  - Scrollt „Im Browser spielen“ dorthin, oder startet der Button den Build direkt?
- **Vor dem Klick:**
  - Was steht auf dem Poster (`cover`, Fläche mit `aspect`) außer dem Start-Button?
  - Gehören die Downloadgröße in MB und die Steuerung (Tastatur, Maus) dazu?
- **Laden:**
  - Es gibt kein `postMessage` (Vertrag 4 der [Embed-Architektur](13-embed-architektur.md)). Die Ladeanzeige muss also im minimalen `index.html`-Template des Builds sitzen. Wie sieht sie aus, und was teilt sie mit der Seite (Farben, Schrift)?
- **Fehler:**
  - Was sieht der Besucher, wenn das Laden scheitert oder der WebGL-Kontext verloren geht?
- **Spielen:**
  - Vollbild (`allow="fullscreen"`): ein eigener Button außerhalb des iframes oder der des Builds?
  - Fokus und Tastatur: Eingaben gehen erst nach einem Klick ins iframe. Wie zeigt die Seite, wer die Tastatur hat?
  - Scrollrad und Wischen über der Fläche gegen das Einrasten der Screens auf 100 vh: Wer gewinnt?
- **Verlassen:**
  - Gibt es „Beenden“, und kommt danach das Poster zurück (iframe entfernt, Speicher frei)?
  - Was passiert beim Seitenwechsel? Laut Embed-Architektur unmountet Vue das iframe.

Schon entschieden:
- In der [Embed-Architektur](13-embed-architektur.md): Das Poster ist das `cover`, die Fläche hat `aspect`, der Build lädt erst nach dem Klick, und den Button gibt es nur mit `embed` und passendem Gerät.
- In [Videos auf der Project page](26-videos-project-page.md): der Fallback ohne passendes Gerät (Trailer, dann erster Link) und die Reihenfolge des Haupt-Buttons.

Anlass: Nebel „Embed-UX“, graduiert über [Videos auf der Project page](26-videos-project-page.md).

## Answer

Entschieden vom Owner am 2026-11-17 nach fünf Runden im Prototyp, gewählt ist **C2-2d**. Der Prototyp liegt auf dem lokalen Wegwerf-Branch `prototype/embed-ux` (Commit `39394fc2`, nicht gepusht).
- Start: `.scratch/nuxt-portfolio/prototype-design-richtung/embed-ux.html?ux=C2-2d`.
- Der Fake-Build unter `builds/a-fraction-of-time/` spielt das minimale Template nach.

**Ort und Start: das Theater**
- „Im Browser spielen“ im Teaser öffnet das *Theater* (neu im Glossar). Es ist ein modaler `<dialog>` über der ganzen Project page. Die Seite darunter ist inert und scrollt nicht. Damit gibt es keinen Streit mehr zwischen Mausrad und dem Einrasten der Screens. Wischen gibt es nicht, denn Embeds laufen nur am Desktop.
- Das iframe entsteht erst beim Öffnen, wie in der [Embed-Architektur](13-embed-architektur.md).
- Einen eigenen Poster-Bereich gibt es nicht: Der Teaser ist das Poster. Unter dem Button steht nur „<Größe> · lädt erst nach dem Klick“.
- Verworfen:
  - A „Bühne im Teaser“: Der Teaser wird zur Spielfläche.
  - B „Fläche in ‚Im Spiel‘“: ein eigenes Poster im Screen. Der Screen sähe mit und ohne Embed verschieden aus und verlöre seine Bilder.

**Aussehen**
- **Kopfzeile:** Papier wie die der Seite (60 px, 1,5-px-Tintenlinie), mit „← Zurück zur Seite“, Joystick-Logo und Titel des Project.
- **Bühne:** Tinte. Das Spiel sitzt mittig mit dem Seitenverhältnis aus `embed.aspect` und füllt die übrige Fläche, die Ränder bleiben Tinte.
- **Overlay:** in der rechten oberen Ecke des Spiels, in Tinte, mit zwei Knöpfen: Tastatur-Symbol und Vollbild. Es gibt kein ✕, Zurück steht oben.
- **Zustände wie überall in D**, ohne eigene Farblogik:
  - Auf Papier färbt der Hover die Schrift Chrono-Blau, wie `.nav`, `.back` und die CTAs. Der Fokus ist ein 3-px-Rahmen in Chrono-Blau.
  - Auf Tinte ist die Schrift grau (`#a9a9ae`) und beim Hover Papier, ohne Hintergrund. Aktiv zeigt eine Cyan-Linie wie bei `.rail-links`, der Fokus ist ein 2-px-Rahmen in Cyan.
  - Einen Hintergrund beim Hover hat weiterhin nur der Haupt-Button.
- Verworfen: die Leiste oben mit allem (C1), die Seitenleiste (C3) und „nur ✕, der Rest im Build“ (C4). Ebenfalls verworfen sind eigene Farbschemata: Papier-Bühne, Tinte mit Echo sowie Zustände in Cyan, Schwarz-Weiß oder Echo.

**Tastatur und Fokus**
- Die Tastatur bekommt das Spiel erst mit dem Klick hinein, die Seite fokussiert das iframe nicht selbst.
- Ob das Spiel die Tastatur hat, erkennt die Seite daran, dass `document.activeElement` das iframe ist. Dann:
  - wird das Tastatur-Symbol Papier mit Cyan-Linie;
  - liegt um das Spiel ein 2-px-Rahmen in Cyan;
  - verblasst das Overlay auf 35 %. Beim Darüberfahren und per Tab ist es wieder voll da.
- „Tastatur im Spiel“ und „Tastatur bei der Seite“ stehen nur beim Darüberfahren als Text und per `aria-live` für Screenreader. Die Texte sind lokalisiert.
- Ohne Fokus zeigt das Template unten „Klicken zum Spielen“.
- Auf der Seite stehen keine Infos zur Steuerung (Owner). Sie zeigt das Template beim Laden.

**Vollbild**
- Der Knopf im Overlay ruft `requestFullscreen()` auf der Hülle des iframes samt Overlay auf. Das Spiel füllt den Bildschirm, die Kopfzeile verschwindet. ⛶ oder Esc beenden das Vollbild. Der Owner hat das in Chrome bestätigt.
- Chrome lehnt den modalen `<dialog>` selbst als Vollbild-Element ab („Dialog elements are invalid“, gemessen). Die Hülle darin funktioniert.
- Das iframe braucht kein `allow="fullscreen"` mehr, und die Builds bringen keinen eigenen Vollbild-Knopf mit. Die Permissions-Policy `fullscreen=(self)` bleibt, weil jetzt die Seite selbst das Vollbild anfordert.

**Verlassen**
- „← Zurück zur Seite“, Browser-Zurück und Esc schließen das Theater. Esc greift nur, solange die Tastatur bei der Seite ist. Im Vollbild beendet Esc zuerst das Vollbild.
- Das Öffnen legt einen History-Eintrag an, damit Browser-Zurück schließt. In Nuxt läuft das über den Router, nicht per rohem `pushState`. Wer die Seite mit diesem Eintrag aufruft, sieht das Theater nicht von selbst offen: Geladen wird erst nach dem Klick.
- Schließen entfernt das iframe (Prüfpunkt 5 der Embed-Architektur). Der Fokus kehrt zu „Im Browser spielen“ zurück. Ein Link aus dem Spiel auf die eigene Seite (Vertrag 2) räumt per Seitenwechsel genauso auf.
- Ein erneutes Öffnen lädt den Build neu, die Dateien kommen dann aus dem Cache (`immutable`).

**Laden und Fehler im Template des Builds**
- Die Seite erfährt nichts aus dem Build (kein `postMessage`, Vertrag 4). Ladeanzeige, Steuerung und Fehler gehören deshalb in das minimale `index.html`-Template, das jeder Web build mitbringt.
- **Ladeanzeige:**
  - Tinte, der Titel als Kicker in Cyan;
  - ein 3-px-Balken in Cyan mit Pink-Echo, darunter große Prozentziffern;
  - ab 90 % „Startet …“, denn Unity meldet über `onProgress` nur 0 bis 0,9 für den Download und kompiliert danach;
  - darunter die Steuerung als Liste von Tasten.
- **Fehler:** zwei Screens.
  - „Das Spiel ließ sich nicht laden.“ mit „Erneut versuchen“, wenn der Loader einen Fehler wirft.
  - „Die Grafik ist ausgestiegen.“ mit „Neu starten“, wenn `webglcontextlost` kommt.
  - „← Zurück zur Seite“ bleibt immer erreichbar, auch wenn der Build hängt.
- Die Texte gibt es in DE und EN, gewählt per `?lang=` (Vertrag 1).
- Die Schrift ist immer Exo (Owner). Sie liegt als eigene Datei im Build-Verzeichnis, denn das Template kennt die gehashten Pfade von `@nuxt/fonts` nicht und soll nicht an Pfade der Seite gekoppelt sein. Die Datei zählt zum Budget.

**Neue Vorgaben an jeden Web build** (ergänzen die Embed-Architektur)
- Tab muss das Spiel verlassen können, sonst erreicht man „← Zurück zur Seite“ nicht per Tastatur (WCAG 2.1.2). Der Build fängt also nicht alle Tasten ab; in Unity etwa per `WebGLInput.captureAllKeyboardInput = false`. Ob das reicht, ist Prüfpunkt 6.
- Das Template folgt dem Aussehen oben und zeigt „Klicken zum Spielen“, solange es keinen Fokus hat. Es hat keinen Vollbild-Knopf und keine Unity-Chrome.

**Größe**
- Die Zahl im Teaser kommt aus derselben Summe wie die Budget-Prüfung, also den übertragenen Bytes in `public/builds/<slug>/`. Sie wird beim Build berechnet und auf ganze MB gerundet.
- Es gibt kein Feld von Hand: `embed` bleibt `{ aspect: "16/9" }`. Das Seitenverhältnis bestimmt die Form des Spiels im Theater.

**Prüfpunkte beim ersten Unity-Web-build** (nach den fünf der Embed-Architektur)
6. Tab verlässt das Spiel, mit der Einstellung oben.
7. Der Ton startet erst mit dem ersten Klick ins Spiel. Vermutet wird das, weil der Klick auf der Seite das neue iframe nicht aktiviert (UNVERIFIED). Passt das, gehört nichts weiter dazu, denn die Tastatur kommt ohnehin erst mit diesem Klick.

**Hand-Checkliste** (Nachtrag zur [Teststrategie](21-teststrategie.md)), sobald es den ersten Embed gibt:
- das Theater per Tastatur öffnen;
- Tab erreicht „← Zurück zur Seite“ und Vollbild;
- Esc schließt vor dem Klick ins Spiel, danach kehrt der Fokus zum Button zurück;
- Vollbild füllt den Bildschirm;
- in Chrome, Firefox und Safari.

**Folgen**
- Glossar: neuer Begriff *Theater*. *Embed* nennt es jetzt.
- Kommentare in [Embed-Architektur](13-embed-architektur.md), [Design-Richtung](11-design-richtung.md), [Tech-Stack](12-tech-stack.md) und [Teststrategie](21-teststrategie.md).
- Keine ADR: Alles hier lässt sich ohne Umbau ändern.
- Der Nebel „Embed-UX“ ist geklärt. Offen ist kein Ticket mehr.

## Comments

- 2026-11-16 (Agent): Prototyp gebaut, wartet auf die Reaktion des Owners. Start per Doppelklick auf [embed-ux.html](../prototype-design-richtung/embed-ux.html) im Ordner des Design-Prototyps. Er zeigt die Project page D von A Fraction of Time, nur am Desktop. Der Build ist ein Fake ([builds/a-fraction-of-time/index.html](../prototype-design-richtung/builds/a-fraction-of-time/index.html)), der ein minimales Unity-Template nachspielt: Ladebalken, „Startet …“ ab 90 %, Steuerung, zwei Fehler-Screens. Drei Varianten, Umschalter unten mittig:
  - **A „Bühne im Teaser“:** Der Teaser wird zur Spielfläche.
  - **B „Fläche in ‚Im Spiel‘“:** Poster mit Steuerung und Größe. Der Button im Teaser scrollt dorthin und startet.
  - **C „Theater“:** ein modaler Dialog über der Seite mit einer Leiste wie im Game mode. Browser-Zurück schließt ihn.
  - Für alle gilt: Die Leiste außerhalb des iframes zeigt, wer die Tastatur hat, und bietet Vollbild und Beenden. Beenden entfernt das iframe. In A und B erscheint beim Wegscrollen eine Pille „läuft · Zum Spiel · Beenden“.
  - Im Panel „Simulation“ lassen sich umschalten: Netz, Ladefehler, Kontextverlust, Fokus nach dem Start, Mausrad und Tab-Falle. Das Panel „Zustand“ oben rechts zeigt, was die Seite weiß und was nur im Build steckt.
  - Geprüft in Headless-Chrome bei 1440 × 900 und 1280 × 720: kein Overflow, keine Konsolenfehler. Tasten erreichen das Spiel, Beenden entfernt das iframe, „Im Spiel“ in B bleibt genau ein Screen.
  - Neu aufgefallen: Fängt der Build alle Tasten (Unity `captureAllKeyboardInput`), kommt man per Tastatur nicht mehr zu „Beenden“ (WCAG 2.1.2).
  - UNVERIFIED und als Prüfpunkt gedacht: Ton erst nach einem Klick ins Spiel; Unity fängt das Mausrad.
- 2026-11-17 (Owner): Variante C (Theater) ist es. Auf der Seite gibt es keine Infos zur Tastatur, die zeigt das Spiel. Die Leiste oben im Theater wirkt falsch platziert; gibt es für Vollbild und Tastatur andere Optionen, etwa ein Overlay? Im Template immer Exo.
- 2026-11-17 (Agent): Runde 2 im selben Prototyp, nur noch C, umschaltbar per `?ux=C1|C2|C3|C4` (A und B bleiben zum Vergleich am Ende des Umschalters).
  - **C1 „Leiste oben“:** wie in Runde 1.
  - **C2 „Overlay in der Ecke“:** drei Knöpfe oben rechts in der Spielfläche (Tastatur-Symbol, Vollbild, ✕). Sie verblassen auf 35 %, solange das Spiel die Tastatur hat; der Text zur Tastatur erscheint erst beim Darüberfahren.
  - **C3 „Seitenleiste“:** links wie die Rail von Design D, mit Logo, „← Zur Seite“ und „Vollbild“ senkrecht und unten der Tastatur-Anzeige.
  - **C4 „Alles im Build“:** Die Seite legt nur ein ✕ ins Spiel. Vollbild und „Klicken zum Spielen“ bringt das Template mit.
  - Der Teaser nennt jetzt nur „16 MB · lädt erst nach dem Klick“. Die Steuerung steht allein im Ladebildschirm des Builds.
  - Vollbild gilt in C1 bis C3 für das ganze Theater, damit Zurück und Anzeige sichtbar bleiben. Chrome lehnt `requestFullscreen()` auf einem modalen `<dialog>` ab („Dialog elements are invalid“, gemessen). Deshalb geht das Vollbild an ein `div` im Dialog.
  - UNVERIFIED: Ob das `div` im modalen Dialog Vollbild bekommt, ließ sich per CDP nicht prüfen; dort scheitert jedes `requestFullscreen()` mit „not granted“, auch bei einem normalen `div`. Das bleibt ein Handtest.
  - Geprüft in Headless-Chrome bei 1440 × 900 und 1280 × 720: Das Spiel bekommt die Tastatur, ✕ entfernt das iframe und schließt das Theater. Kein Overflow, sonst keine Konsolenfehler.
- 2026-11-17 (Owner): C2, aber mit der Kopfzeile aus C1 („← Zurück zur Seite“, Logo, Name). Die Farben passen gar nicht; was passt zum Farbschema?
- 2026-11-17 (Agent): Runde 3, per `?ux=C2-1|C2-2|C2-3`. Alle drei haben dieselbe Form: oben die Kopfzeile wie C1 mit „← Zurück zur Seite“, Logo und Name, in der Ecke des Spiels ein Overlay mit Tastatur-Symbol und Vollbild. Das ✕ entfällt, weil Zurück oben steht. Die drei Farbschemata stammen aus der Palette von D:
  - **C2-1 „Papier“:** Kopfzeile und Bühne in Papier wie die Seite, mit der 1,5-px-Tintenlinie. Das Spiel ist das dunkle Band. Knöpfe in Tinte, Fokus-Rahmen in Chrono-Blau.
  - **C2-2 „Hell über Dunkel“:** wie der Teaser, Kopfzeile in Papier über einer Bühne in Tinte. Knöpfe in Papier wie „Im Browser spielen“, Hover cyan.
  - **C2-3 „Tinte mit Echo“:** alles dunkel, ohne Grau. Hat das Spiel die Tastatur, versetzt sich der Rahmen cyan nach links und pink nach rechts, der Echo-Effekt der Zeitlinien.
  - Geprüft in Headless-Chrome bei 1440 × 900, mit Fokus automatisch und erst per Klick: keine Konsolenfehler, kein Overflow, Zurück schließt das Theater und entfernt das iframe.
- 2026-11-17 (Owner): Der Kontrast passt sehr gut, aber das Blau muss raus; was passt stattdessen? Vollbild vergrößert das Spiel nicht auf den ganzen Bildschirm. Fokus: erst der Klick ins Spiel.
- 2026-11-17 (Agent): Runde 4, per `?ux=C2-2a|C2-2b|C2-2c`. Annahme: Gemeint ist C2-2 (helle Kopfzeile über dunkler Bühne), das einzige mit Blau nur in den Zuständen. Aufbau und Kontrast bleiben, ersetzt wird nur Chrono-Blau:
  - **C2-2a „Cyan“:** Hat das Spiel die Tastatur, wird das Tastatur-Feld cyan mit Symbol in Tinte, dazu der Cyan-Rahmen. Beim Hover bekommt „Zurück zur Seite“ eine Linie in Cyan.
  - **C2-2b „Schwarz-Weiß“:** ohne Akzentfarbe. Aktiv heißt invertiert, der Rahmen ums Spiel ist Papier.
  - **C2-2c „Echo“:** der Versatz der Zeitlinien (cyan links, pink rechts) an Rahmen, Symbol und Hover.
  - **Vollbild:** Es geht jetzt an die Hülle des iframes samt Overlay. Das Spiel füllt den Bildschirm, die Kopfzeile verschwindet. Bisher bekam das ganze Theater das Vollbild, das Spiel wuchs dabei nur um die Höhe der Browserleiste. Lehnt der Browser ab, steht der Grund im Zustand. Ob es bei dir in Chrome greift, ist offen: Per CDP scheitert hier jedes `requestFullscreen()` mit „not granted“, auch bei einem normalen `div` in einem sichtbaren Fenster. Eine Chrome-Richtlinie ist nicht gesetzt.
  - **Fokus:** Standard ist „erst nach Klick ins Spiel“. Esc schließt das Theater, solange die Tastatur noch bei der Seite ist.
  - Geprüft in Headless-Chrome bei 1440 × 900: Vor dem Klick hat die Seite die Tastatur, nach dem Klick ins Spiel das Spiel. Zurück schließt das Theater und entfernt das iframe, keine Konsolenfehler. Ein Regex-Fehler ließ die Farbklassen zuerst nicht greifen; er ist behoben und betraf Runde 3 nicht.
- 2026-11-17 (Owner): Der Vollbild-Knopf in C2-2a soll keinen Hintergrund haben, die Verfärbungen passen nicht zusammen. Die Farben von Runde 4 sind verworfen: Hover und Aktiv sollen einheitlich sein wie überall sonst. Vollbild funktioniert jetzt.
- 2026-11-17 (Agent): Runde 5, `?ux=C2-2d`. Übernommen sind die Zustände, die D schon hat (`b.js`, `de.js`):
  - **Auf Papier:** Hover färbt die Schrift Chrono-Blau (wie `.nav a:hover`, `.back:hover`, `.ctas a:hover`), der Fokus ist ein 3-px-Rahmen in Chrono-Blau.
  - **Auf Tinte:** die Schrift grau (`#a9a9ae`), beim Hover Papier, aktiv mit einer Cyan-Linie (wie `.rail-links a`). Der Fokus ist ein 2-px-Rahmen in Cyan (wie `.ring`).
  - **Overlay:** Tinte wie die Leiste links, kein Hintergrund beim Hover. Den gibt es in D nur beim Haupt-Button `.go`.
  - **Tastatur im Spiel:** Das Symbol wird Papier und bekommt unten die Cyan-Linie, dazu der Cyan-Rahmen ums Spiel.
  - Gemessen per CDP: Vollbild-Knopf beim Hover `color` Papier, `background` transparent; „Zurück zur Seite“ beim Hover `rgb(43, 80, 255)`; Tastatur-Feld aktiv Papier mit `inset 0 -2px` Cyan. Keine Konsolenfehler.
