# Content checks „Web build budget“ und „Web build consistency“

Status: ready-for-agent
Blocked by: 04

## Ziel

Der Build stoppt bei einem zu großen oder verwaisten Web build. Dieselbe Summe liefert die Größe, die der Teaser neben „Im Browser spielen“ zeigt.

## Spec-Abschnitte

- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks), Checks 4 und 5 und der Absatz zum Game mode
- [§ 11.1 Storage and delivery](../../nuxt-portfolio/spec.md#111-storage-and-delivery)
- [§ 7.5 Project page](../../nuxt-portfolio/spec.md#75-project-page) (Größe in ganzen MB)
- [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md)

## Akzeptanzkriterien

- [ ] Check 4: ein Verzeichnis unter `public/builds/` über 50 MB (Summe aller Dateien, rekursiv) ist ein Fehler. Die Grenze von 100 MB für den Game mode gilt erst, wenn der Spiel-Effort dessen Verzeichnis benennt; bis dahin gibt es keinen Game-mode-Fall.
- [ ] Check 5: ein Project mit `embed` ohne `public/builds/<slug>/index.html` ist ein Fehler; ein Verzeichnis unter `public/builds/`, das zu keinem Project mit `embed` gehört, ebenfalls.
- [ ] Eine exportierte Funktion liefert pro Embed die Größe in ganzen MB aus derselben Summe; 27 nutzt sie für die Zeile „<Größe> · lädt erst nach dem Klick“.
- [ ] Fehlt `public/builds/` ganz (Start ohne Embed), gibt es keinen Fehler.
- [ ] Vitest mit Dateilisten als Daten (keine echten 50-MB-Dateien): gut, zu groß, `embed` ohne `index.html`, verwaistes Verzeichnis.
