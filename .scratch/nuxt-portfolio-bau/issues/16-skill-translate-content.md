# Projekt-Skill `translate-content`

Status: ready-for-agent
Blocked by: 03

## Ziel

Claude Code übersetzt und entwirft Inhalte im Repo über einen Projekt-Skill mit festen Regeln. Jede Datei, die er schreibt, trägt `unreviewed: true`.

## Spec-Abschnitte

- [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow)
- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules) („Never in content“, `unreviewed`)
- [§ 4.1 Locales](../../nuxt-portfolio/spec.md#41-locales) (du, US-Englisch)
- [GLOSSARY.md](../../../GLOSSARY.md) (Source language, Unreviewed text)

## Akzeptanzkriterien

- [ ] Skill unter `.claude/skills/translate-content/SKILL.md`, geschrieben mit dem Skill `writing-for-agents`.
- [ ] Er enthält: Deutsch ist die Source language; Stilregeln (du überall, auch in Rechtstexten; US-Englisch, Locale-Code `en`); eine Begriffsliste aus den UI-Texten (z. B. Projekte/Projects, Lebenslauf/CV, Über mich/About); Fakten bleiben unberührt; Listen werden 1:1 übersetzt (gleiche Einträge, gleiche Reihenfolge); Eigennamen bleiben, außer es gibt eine offizielle Fassung (Hochschule Furtwangen → Furtwangen University).
- [ ] Pflicht: `unreviewed: true` in jede geschriebene Sprachdatei, Entwürfe eingeschlossen; die Übersetzung landet im selben Commit wie die Quelländerung; UI-Texte folgen denselben Regeln, aber ohne Marker.
- [ ] Er wiederholt die Verbote aus § 5.1 und die Privatsphäre-Regel: keine Noten (höchstens ein Highlight im Fließtext), keine Namen von Teammitgliedern oder Betreuern, keine Orte von CV entries, keine UI-Texte im Content, nie Wohnadresse, Telefon oder Geburtsdatum.
- [ ] **Offen (Lücke G3):** die Review-Regel für Fakten im geteilten YAML, die die KI schreibt.
- [ ] Probelauf: eine DE-Testdatei → EN-Datei mit Marker; der Check *List match* (05) meldet nichts. Probedateien nicht committen.
