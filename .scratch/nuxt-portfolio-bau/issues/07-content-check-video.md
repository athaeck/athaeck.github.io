# Content check „Video“ mit eigenem MP4-Box-Leser

Status: ready-for-agent
Blocked by: 04

## Ziel

Der Build stoppt bei einem Galerie-Video, das zu groß ist, nicht H.264 ist, kein `faststart` hat oder eine Tonspur trägt. Die MP4-Boxen liest eigener Code ohne Dependency.

## Spec-Abschnitte

- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks), Check 6
- [§ 10.2 Videos](../../nuxt-portfolio/spec.md#102-videos) (Format, Budget)

## Akzeptanzkriterien

- [ ] Geprüft wird jedes Galerie-Video (`file` endet auf `.mp4`) unter `media/<project-slug>/`.
- [ ] Fehler bei: Datei > 20 MB; Codec im `stsd` der Videospur nicht `avc1`; `moov` liegt auf oberster Ebene hinter `mdat`; irgendein `trak` mit `hdlr` vom Typ `soun`.
- [ ] Der Leser liest nur Box-Header und die nötigen Boxen (Dateideskriptor mit Offsets), nie die ganze Datei; 64-Bit-`largesize` und `size = 0` werden korrekt behandelt.
- [ ] Vitest mit synthetischen Byte-Folgen, im Test erzeugt (keine Binärdateien im Repo): gut; `mdat` vor `moov`; Tonspur; Codec `hvc1`; Größe über 20 MB (als Datenangabe).
- [ ] Gegenprobe von Hand: ein Clip mit dem ffmpeg-Befehl aus § 10.2 besteht; derselbe Clip mit Ton (ohne `-an`) fällt durch. Befehle im Ticket.
