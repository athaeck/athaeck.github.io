# Embed-UX

Type: prototype
Status: open
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
