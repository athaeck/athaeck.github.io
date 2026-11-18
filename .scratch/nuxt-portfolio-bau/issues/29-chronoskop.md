# Signature moment: das Chronoscope

Status: ready-for-agent
Blocked by: 28

## Ziel

Am Halt „Was kommt“ auf der Home steht das Chronoscope: Wer die vier Ringe auf **BALD** (EN **SOON**) dreht, stellt die Linse scharf und sieht die `next`-Einträge als Marken auf der Karte. Die Komponente ist mit Codewort und Inhalt wiederverwendbar (404, 34).

## Spec-Abschnitte

- [§ 8 Signature moment: the Chronoscope](../../nuxt-portfolio/spec.md#8-signature-moment-the-chronoscope)
- [§ 7.1 Visual identity](../../nuxt-portfolio/spec.md#71-visual-identity) (Brass nur hier)
- [§ 3 Quality targets](../../nuxt-portfolio/spec.md#3-quality-targets), [§ 20.3](../../nuxt-portfolio/spec.md#20-testing) (Hand-Checkliste)
- Referenz: Variante D in [prototype-design-richtung/](../../nuxt-portfolio/prototype-design-richtung/index.html); Vorlage `docs/about-me/Asoue.png` (lokal, gitignored)

## Akzeptanzkriterien

- [ ] Ein Messing-Fernrohr nach den fünf markierten Segmenten der Vorlage, aber verändert: vier statt sechs Buchstabenringe, Sanduhr statt Lippen, Joystick-Medaille statt Münze, ein Schlitz als Fokusanzeige, eigene Gravur. Kein V.F.D.-Auge.
- [ ] Nur SVG, CSS und wenig JavaScript; kein three.js, GSAP oder Canvas.
- [ ] Die Ringe reagieren auf Ziehen, Tippen ober- und unterhalb, Mausrad, Pfeiltasten und das Tippen des Buchstabens. Das Codewort und die gezeigten Einträge sind Props.
- [ ] Tastatur: jeder Ring einzeln fokussierbar mit sichtbarem Fokus und zugänglichem Namen und Wert; das Scharfstellen wird per `aria-live` angesagt.
- [ ] Ohne JavaScript stehen die `next`-Einträge lesbar im HTML; die Ringe ergänzen nur die Enthüllung.
- [ ] Das Chronoscope funktioniert ohne Game mode und verweist auf ihn (über `next`).
- [ ] Belegt: Bedienung nur per Tastatur in Chromium und Firefox; Lighthouse-Performance der Home sinkt nicht unter 95 (lokal gemessen).
