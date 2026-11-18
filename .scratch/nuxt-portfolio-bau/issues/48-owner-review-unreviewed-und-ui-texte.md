# Owner: Unreviewed texts und UI-Texte lesen

Status: ready-for-human
Blocked by: 17, 18, 19, 50

## Ziel

Jeder Text der Seite ist vom Owner gelesen; danach steht kein `unreviewed` mehr im Repo und `npm run build` ist grün.

## Spec-Abschnitte

- [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow) (Review), [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules), [§ 23](../../nuxt-portfolio/spec.md#23-owner-tasks-before-launch)

## Akzeptanzkriterien

- [ ] Jede Datei aus `grep -rl "unreviewed: true" content/` gelesen, DE und EN, und der Marker gelöscht. **Offen (Lücke G3):** ob dabei die YAML-Fakten des Eintrags mitgeprüft werden und wie die Skills geprüft werden.
- [ ] Die Slugs vor dem ersten Release bestätigt; danach sind sie eingefroren.
- [ ] Die UI-Texte (i18n-Sprachdateien) einmal per Diff gelesen, sobald die Seiten-Tickets durch sind.
- [ ] `npm run build` läuft ohne Fehler.
