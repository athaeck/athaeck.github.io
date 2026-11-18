# Time-jump-Übergang zur Project page

Status: ready-for-agent
Blocked by: 24

## Ziel

Der Wechsel auf eine Project page spielt einen kurzen Zeitsprung als Overlay; unter `prefers-reduced-motion` entfällt er.

## Spec-Abschnitte

- [§ 7.2 Page frame](../../nuxt-portfolio/spec.md#72-page-frame) (Time-jump transition)
- [§ 11.4 The Theater](../../nuxt-portfolio/spec.md#114-the-theater) (Theater löst ihn nicht aus)
- Referenz: Variante D in [prototype-design-richtung/](../../nuxt-portfolio/prototype-design-richtung/index.html)

## Akzeptanzkriterien

- [ ] Ein Overlay im Layout (Vue `<Transition>`), das ein Router-Hook vor dem Seitenwechsel auf eine Project page abspielt; auch von Project page zu Project page.
- [ ] Unter `prefers-reduced-motion: reduce` gibt es kein Overlay.
- [ ] Kein `experimental.viewTransition`, kein Element-Morphing, keine Motion-Library.
- [ ] Der Übergang verzögert den Wechsel nur so lange wie die Animation; Fokus und Scroll-Position der neuen Seite stimmen danach (Skip-Link zuerst).
- [ ] Ein Router-Wechsel, der nur das Theater öffnet oder schließt (27), löst ihn nicht aus; die Bedingung ist so gebaut, dass 27 sie nutzen kann.
