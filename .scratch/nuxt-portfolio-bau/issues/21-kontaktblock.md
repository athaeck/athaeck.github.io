# Kontaktblock im Footer

Status: ready-for-agent
Blocked by: 10, 17, 20

## Ziel

Jede Seite endet mit dem Kontaktblock: „E-Mail schreiben →“ über `/mail`, „Adresse kopieren“ mit JavaScript, die Profile-Links und „Stuttgart“. Die Adresse steht nie im Klartext im HTML, Payload oder JS.

## Spec-Abschnitte

- [§ 7.2 Page frame](../../nuxt-portfolio/spec.md#72-page-frame) (Footer)
- [§ 9.1 Rule](../../nuxt-portfolio/spec.md#91-rule), [§ 9.2 Footer contact](../../nuxt-portfolio/spec.md#92-footer-contact)
- [§ 14.4 GA4 settings](../../nuxt-portfolio/spec.md#144-ga4-settings) (`contact_mail`, `contact_copy`)

## Akzeptanzkriterien

- [ ] Der Block trägt den Anker `#kontakt` (EN `#contact`); „Kontakt“ im Header führt dorthin.
- [ ] „E-Mail schreiben →“ ist ein `<a href="/mail">`, eine Route für beide Sprachen.
- [ ] „Adresse kopieren“ ist ein `<button>`, der nur mit JavaScript erscheint. Die Adresse steht kodiert im Markup, beim Prerender aus Profile `email` abgeleitet (Schema frei wählbar), und wird erst beim Klick dekodiert, kopiert und angezeigt. Vor dem Klick sind weder Adresse noch `mailto:` im DOM (per Playwright oder DevTools belegt).
- [ ] Die Kodierung passiert vor dem Payload: In `useAsyncData` kommt nur der kodierte Wert zurück, nie das Profile-Objekt mit `email`. `grep` über `.output/public` (HTML, `_payload.json`, `_nuxt/*.js`) findet weder die Adresse noch `mailto:`.
- [ ] GitHub, LinkedIn und itch.io aus Profile `profiles` mit `<AppIcon>`, dazu `location`.
- [ ] Der Kopier-Button hat ein stabiles Attribut (z. B. `id`), damit GTMs Klick-Trigger `contact_copy` ohne eigenen Code erkennt (44).
- [ ] Der eigene Code schreibt dabei nichts in Cookies oder Browser-Speicher.
- [ ] Ohne JavaScript: Link „E-Mail schreiben →“ und Profile-Links funktionieren, kein leerer Platzhalter für den Button.
