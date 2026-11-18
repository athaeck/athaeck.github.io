# About-Seite

Status: ready-for-agent
Blocked by: 17, 22

## Ziel

`/ueber-mich` und `/en/about` zeigen Porträt und Bio, die Services und die Interessen.

## Spec-Abschnitte

- [§ 7.7 About page](../../nuxt-portfolio/spec.md#77-about-page)
- [§ 5.7 Profile](../../nuxt-portfolio/spec.md#57-profile-strapi-single-type-with-i18n)
- [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld) (ProfilePage)

## Akzeptanzkriterien

- [ ] Screens: Porträt mit Bio (paper), „Was ich mache“ mit den Services (ink), `interests` als große Liste (paper).
- [ ] Porträt per `<NuxtImg>` mit `portraitAlt`.
- [ ] SEO: Titel und Description als UI-Text; JSON-LD `ProfilePage` mit `mainEntity` → `#person`; Person zusätzlich mit `alternateName`, `description` (= `headline`) und `image` (Porträt). Keine Adresse, keine E-Mail.
- [ ] Ohne JavaScript vollständig.
