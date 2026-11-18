# Theater und „Im Browser spielen“

Status: needs-info
Blocked by: 06, 13, 24, 26

## Ziel

Hat ein Project `embed` und passt das Gerät, öffnet „Im Browser spielen“ das Theater mit dem Web build im same-origin iframe. Die Seite startet ohne Embed; danach ist das erste Embed eine reine Inhaltsänderung.

## Spec-Abschnitte

- [§ 11.4 The Theater](../../nuxt-portfolio/spec.md#114-the-theater), [§ 11.1 Storage and delivery](../../nuxt-portfolio/spec.md#111-storage-and-delivery), [§ 11.3 Contract](../../nuxt-portfolio/spec.md#113-contract-between-site-and-web-build)
- [§ 7.5 Project page](../../nuxt-portfolio/spec.md#75-project-page) (Haupt-Button Fall 1, Größenzeile)
- [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md)
- Prototyp: `git show 39394fc2:.scratch/nuxt-portfolio/prototype-design-richtung/embed-ux.js` (Branch `prototype/embed-ux`, `?ux=C2-2d`)

## Akzeptanzkriterien

- [ ] Haupt-Button Fall 1: Das Basis-Markup enthält den Kandidaten ohne Embed (25/24); JavaScript tauscht „Im Browser spielen“ ein, wenn feiner Zeiger, breiter Viewport und WebGL 2 vorhanden sind, erkannt per Fähigkeit, nie per User-Agent. **Offen (Lücke G10):** Schwelle für „breit“.
- [ ] Darunter nur „<Größe> · lädt erst nach dem Klick“, Größe in ganzen MB aus 06. Keine Steuerung auf der Seite.
- [ ] Theater als modaler `<dialog>`: Seite darunter inert und ohne Scrollen. Erst beim Öffnen entsteht das iframe mit `/builds/<slug>/index.html?lang=de|en`; vorher lädt kein Byte des Builds.
- [ ] Aussehen wie § 11.4: helle Kopfzeile (60 px, 1,5 px Ink-Linie) mit „← Zurück zur Seite“, Joystick-Logo und Titel; Bühne in Ink, Spiel zentriert im Seitenverhältnis `embed.aspect`; Overlay oben rechts mit Tastatur-Symbol und Vollbild; kein ✕.
- [ ] Tastatur: Die Seite fokussiert das iframe nie selbst. Ist `document.activeElement` das iframe: Symbol paper mit cyan Linie, 2 px cyan Rahmen, Overlay auf 35 % (voll bei Hover und Tab); „Tastatur im Spiel“ / „Tastatur bei der Seite“ nur bei Hover sichtbar und per `aria-live`, lokalisiert.
- [ ] Vollbild per `requestFullscreen()` auf dem Wrapper von iframe und Overlay; Kopfzeile verschwindet; ⛶ oder Esc beendet es. Kein `allow="fullscreen"` am iframe.
- [ ] Verlassen: „← Zurück zur Seite“, Browser-Zurück und Esc (nur bei Tastatur auf der Seite; im Vollbild beendet Esc zuerst das Vollbild). Öffnen legt einen History-Eintrag über den Nuxt-Router an; ein Besuch mit diesem Eintrag öffnet das Theater nicht neu. Schließen entfernt das iframe, Fokus zurück auf „Im Browser spielen“.
- [ ] Öffnen und Schließen lösen weder den Time-jump (26) noch einen eigenen Seitenwechsel aus; die URL bleibt nötigenfalls gleich (Vorbereitung für § 11.5 Punkt 9, GA4-`page_view`).
- [ ] Belegt mit einem lokalen Fake-Build (aus dem Prototyp-Branch) und einem temporären `embed`-Eintrag, beides nicht committet: Öffnen per Tastatur, Tab erreicht Kopfzeile und Vollbild, Esc vor dem Klick ins Spiel schließt, Fokus kehrt zurück, Vollbild füllt den Schirm, nach dem Schließen ist kein iframe mehr im DOM.
- [ ] Ohne JavaScript, ohne WebGL 2 oder am Handy bleibt die Project page vollständig, ohne Hinweis auf das Embed.
- [ ] **Offen (Lücke G6):** ob das Template des Web builds (§ 11.2: Laden, Fehler, „Klicken zum Spielen“, Exo, DE/EN) hierher gehört.
