# Content check „References“

Status: ready-for-agent
Blocked by: 04

## Ziel

Der Build stoppt bei jedem Verweis, der ins Leere geht, bei einem Featured achievement der falschen Art, bei fehlenden Mediendateien und bei Skills ohne Beleg.

## Spec-Abschnitte

- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks), Check 7
- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules) (Auflösung der Medienpfade), [§ 5.6 Skill](../../nuxt-portfolio/spec.md#56-skill-strapi-collection-type-without-i18n)

## Akzeptanzkriterien

- [ ] Fehler, wenn ein Slug in `skills` (Project, CV entry), `project` (CV entry), `featured` oder `featuredAchievements` (Profile) auf nichts zeigt.
- [ ] Fehler, wenn ein Eintrag in `featuredAchievements` nicht `kind: achievement` ist.
- [ ] Fehler, wenn eine Datei fehlt: `cover`, Galerie-Bilder und Galerie-`poster` unter `public/images/<slug>/`, `portrait` unter `public/images/profile/`, Galerie-Videos unter `media/<slug>/`. Gilt für beide Sprachfassungen der Galerie.
- [ ] Fehler, wenn ein Skill von keinem Project und keinem CV entry referenziert wird.
- [ ] Vitest: gutes Fixture und je ein kaputtes pro Fehlerart.
