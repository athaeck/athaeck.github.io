# Home

Status: ready-for-agent
Blocked by: 23

## Ziel

Die Home erfüllt den 10-Sekunden-Pfad: wer, was, CV, Kontakt auf dem ersten Screen, daneben die Zeitleiste bis „Was kommt“, darunter die Featured projects.

## Spec-Abschnitte

- [§ 7.3 Home](../../nuxt-portfolio/spec.md#73-home)
- [§ 5.7 Profile](../../nuxt-portfolio/spec.md#57-profile-strapi-single-type-with-i18n) (`timeline`, `next`, ★)
- [§ 15.1](../../nuxt-portfolio/spec.md#151-title-and-description), [§ 15.4 JSON-LD](../../nuxt-portfolio/spec.md#154-json-ld) (WebPage, ItemList)
- Referenz: Variante D in [prototype-design-richtung/](../../nuxt-portfolio/prototype-design-richtung/index.html)

## Akzeptanzkriterien

- [ ] Erster Screen geteilt. Links: Porträt (schwarz-weiß), Name, `headline`, `location`, die `now`-Zeile, CTAs „Lebenslauf →“ (CV-Seite) und „Kontakt →“ (`#kontakt` / `#contact`), Leiste der Featured achievements. Rechts über die volle Höhe: Zeitleiste mit Scrubber aus Profile `timeline`, ★ bei einer Station, in deren Jahr ein Featured achievement beginnt; die letzte Station ist „Jetzt“.
- [ ] Nach der letzten Station der Halt „Was kommt“ mit den `next`-Einträgen als lesbare Liste (mit `href` als Link). Das Chronoscope (29) legt sich darüber.
- [ ] Featured achievements verlinken auf die Project page, wenn `project` gesetzt ist, sonst auf ihren Anker auf der CV-Seite.
- [ ] Screen mit allen 7 Featured projects als Karten (Komponente aus 23) in Profile-Reihenfolge; danach „Alle Projekte“ zur Projects-Seite.
- [ ] Nicht auf der Home: Bio, Services, Interessen, Skills, CV entries außer den Featured achievements und der verdichteten `timeline`. Kein Game-mode-Hinweis (§ 12).
- [ ] SEO: Titel `Nick Philipp Häcker · <headline>`, Description `headline` und Stadt; JSON-LD `WebPage` mit `about` → `#person` und `ItemList` der Featured projects.
- [ ] Ohne JavaScript vollständig, inklusive der `next`-Einträge; der Scrubber ergänzt nur.
