# Owner: Timeline, „Was kommt“ und Texte der Featured projects

Status: ready-for-human
Blocked by: 17, 18

## Ziel

Die Texte, die nur der Owner schreiben kann, stehen: die Stationen der Home-Zeitleiste, was das Chronoscope enthüllt, und für jedes Featured project Frage, Weg, Ergebnis und die Galerie-Auswahl.

## Spec-Abschnitte

- [§ 5.7 Profile](../../nuxt-portfolio/spec.md#57-profile-strapi-single-type-with-i18n) (`timeline`, `next`), [§ 5.3 Project](../../nuxt-portfolio/spec.md#53-project-strapi-collection-type-with-i18n), [§ 5.4 Gallery entries](../../nuxt-portfolio/spec.md#54-gallery-entries)
- [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow), [§ 23](../../nuxt-portfolio/spec.md#23-owner-tasks-before-launch)

## Akzeptanzkriterien

- [ ] Profile `timeline` (`year`, `label`, `text`, älteste zuerst, letzte Station „Jetzt“) und `next` (`label`, `text`, `href?`; der Game mode höchstens als Text ohne Link) auf Deutsch geschrieben oder die KI-Entwürfe aus 17 überarbeitet.
- [ ] Für die 7 Featured projects `question`, `approach`, `result` geschrieben oder die Entwürfe aus 18 überarbeitet.
- [ ] Galerie der Featured projects gewählt (je höchstens 3, Free3D mit bis zu 3 Clips); die KI übernimmt Dateien, Kodierung und Poster.
- [ ] Die EN-Fassungen kommen über den Skill `translate-content` (16) im selben Commit; die Marker bleiben bis 48.
