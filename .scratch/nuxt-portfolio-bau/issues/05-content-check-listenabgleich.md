# Content check „List match“

Status: ready-for-agent
Blocked by: 04

## Ziel

Der Build stoppt, wenn eine Textliste in DE und EN verschieden viele Einträge hat oder ihre Fakten auseinanderlaufen.

## Spec-Abschnitte

- [§ 6 Content checks](../../nuxt-portfolio/spec.md#6-content-checks), Check 3
- [ADR-0002](../../../docs/adr/0002-shared-facts-and-per-language-text-files.md), Consequences
- [§ 25](../../nuxt-portfolio/spec.md#25-decisions-taken-while-merging-2026-11-17) Punkte 9 und 11 (Fakten `poster`, `date`, `year`, `href`; `interests`)

## Akzeptanzkriterien

- [ ] Geprüfte Listen: `phases`, `gallery`, `contributions`, `learnings`, `services`, `languages`, `interests`, `timeline`, `next`, in Project, CV entry und Profile, wo sie vorkommen.
- [ ] Fehler bei abweichender Anzahl und bei abweichenden Fakten je Eintrag an gleicher Position: `start`, `end`, `teamSize` (`phases`), `file`, `poster`, `date` (`gallery`), `year` (`timeline`), `href` (`next`). Ein optionales Faktum, das nur eine Sprache hat, zählt als Abweichung.
- [ ] Die Meldung nennt Datei, Liste, Position und Feld.
- [ ] Vitest: gutes Fixture; kaputte Fixtures für falsche Anzahl und für ein abweichendes Faktum, mindestens bei `phases`, `gallery` und `next`.
