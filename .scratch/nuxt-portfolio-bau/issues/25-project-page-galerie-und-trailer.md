# Project page: „Im Spiel“ mit Galerie, Videos und Trailer

Status: ready-for-agent
Blocked by: 12, 24

## Ziel

Die Project page zeigt ihre Galerie als eigenen Screen; Videos laden erst beim Abspielen über die Range-Route. Der Trailer wird zum Haupt-Button, wenn es kein passendes Embed gibt.

## Spec-Abschnitte

- [§ 7.5 Project page](../../nuxt-portfolio/spec.md#75-project-page) (Screen 2, Haupt-Button Fall 2)
- [§ 5.4 Gallery entries](../../nuxt-portfolio/spec.md#54-gallery-entries), [§ 10.2 Videos](../../nuxt-portfolio/spec.md#102-videos)
- [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld) (VideoObject)
- [§ 24](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build) Prüfpunkt 12 (Poster-Variante)

## Akzeptanzkriterien

- [ ] Screen-Titel „Im Spiel“ für `kind: game`, sonst „Einblicke“ (EN „In the game“ / „A closer look“, als UI-Texte).
- [ ] Die `gallery`-Einträge nebeneinander, je Medium, `caption` als Überschrift und `text` darunter; am Handy seitwärts wischbar.
- [ ] Bilder per `<NuxtImg>` mit `alt`. Videos als `<video controls playsinline preload="none" poster="…">` mit `src` `/media/<slug>/<file>`: kein Autoplay, keine Schleife, kein Byte vor dem Klick (Netzwerk-Tab belegt).
- [ ] Der `poster` kommt per `$img` beim Prerender; Prüfpunkt 12: seine `/_ipx`-Variante liegt in `.output/public` (sonst per `x-nitro-prerender`).
- [ ] Haupt-Button Fall 2: „Trailer ansehen“, ein Anker auf das erste Video der Galerie; mit JavaScript startet es dort zusätzlich (kein Overlay, kein eigenes Vollbild).
- [ ] JSON-LD: je Galerie-Video ein `VideoObject` (`name` = `caption`, `description` = `alt`, `thumbnailUrl` = `poster`, `uploadDate` = `date`, `contentUrl` absolut), im Project über `video`. Kein `duration`; `video`-Links bekommen kein Markup.
- [ ] Free3D belegt im Produktions-Build in Chromium: Beim Abspielen gehen Range-Anfragen mit 206 an `/media/…`. Safari und iPhone prüft 39.
