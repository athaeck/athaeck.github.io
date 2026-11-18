# CV-Seite

Status: ready-for-agent
Blocked by: 11, 23

## Ziel

`/lebenslauf` und `/en/cv` zeigen den CV in sechs Screens, mit PDF-Download per Formular und Skills mit Belegen statt Balken.

## Spec-Abschnitte

- [§ 7.6 CV page](../../nuxt-portfolio/spec.md#76-cv-page) (ohne Druckstil, siehe 31)
- [§ 5.5 CV entry](../../nuxt-portfolio/spec.md#55-cv-entry-strapi-collection-type-with-i18n), [§ 5.6 Skill](../../nuxt-portfolio/spec.md#56-skill-strapi-collection-type-without-i18n)
- [§ 9.3 CV PDF download](../../nuxt-portfolio/spec.md#93-cv-pdf-download)
- [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld) (WebPage)

## Akzeptanzkriterien

- [ ] Kopf (ink): Titel, aktuelle Rolle (der `work`-Eintrag mit dem spätesten `start`), `headline`; die PDF-Buttons, je Sprache ein `<form method="post" action="/downloads/cv">` mit verstecktem `lang`, eigene Sprache zuerst („PDF herunterladen“, „English PDF“; EN entsprechend); Sprunglinks zu den Abschnitten; `languages`.
- [ ] Erfahrung (paper): `work`-Einträge nach `organisation` gruppiert (die vier asellerate-Einträge unter einem Arbeitgeber), neueste zuerst.
- [ ] Engagement (ink): alle `volunteering`-Einträge, das FSJ eingeschlossen.
- [ ] Ausbildung (paper): Master und Bachelor mit Link zur Thesis (`project`) und den Kursen (`contributions`), dann das Abitur.
- [ ] Auszeichnungen (ink): alle `achievement`-Einträge, Featured achievements mit ★.
- [ ] Skills (paper): nach `group` gruppiert (Labels aus UI-Texten, `languages` = „Programmiersprachen“ / „Programming languages“); je Skill die Zahl der Belege aus Projects und CV entries („Unity · 6 Belege“) und der Anker `skill-<slug>`. Antippen öffnet die belegenden Projects und CV entries als Links in einem HTML-Popover (`popovertarget`, ohne JavaScript); der Screen wächst nicht.
- [ ] Jeder CV entry trägt einen Anker aus seiner id; Home und Popover verlinken darauf.
- [ ] Der Formular-POST lädt im Produktions-Build das PDF (mit Test-PDF aus 11); `cv_download` ist über GTMs Formular-Trigger messbar, ohne eigenes JavaScript.
- [ ] SEO: JSON-LD `WebPage` mit `about` → `#person`. Ohne JavaScript vollständig, Popover eingeschlossen.
