# Inhalte: Profile, Skills und CV entries

Status: needs-info
Blocked by: 03, 16

## Ziel

Profile, alle Skills und alle CV entries liegen als Content im Repo, in DE und EN, aus dem freigegebenen Inventar übernommen und mit `unreviewed: true` markiert.

## Spec-Abschnitte

- [§ 5.5 CV entry](../../nuxt-portfolio/spec.md#55-cv-entry-strapi-collection-type-with-i18n), [§ 5.6 Skill](../../nuxt-portfolio/spec.md#56-skill-strapi-collection-type-without-i18n), [§ 5.7 Profile](../../nuxt-portfolio/spec.md#57-profile-strapi-single-type-with-i18n)
- [§ 5.1 Rules](../../nuxt-portfolio/spec.md#51-rules), [§ 21 Translation workflow](../../nuxt-portfolio/spec.md#21-translation-workflow)
- [content-inventory.md](../../nuxt-portfolio/content-inventory.md) §§ 1–3, 5, 6 (Faktenbasis, vom Owner freigegeben)

## Akzeptanzkriterien

- [ ] Profile (`content/profile.yml`, `de/profile.md`, `en/profile.md`): `name`, `email` (`nick.athaeck@gmail.com`, nur hier), `profiles` (GitHub, LinkedIn, itch.io), `portrait`, `featured` (die 7 Featured projects in der Reihenfolge des Inventars), `featuredAchievements` (Medienpreis, Gamescom 2023, GiG xLab), `headline`, `location`, `portraitAlt`, `now` (Ready Prepper One), `services` (die 4 aus dem Inventar), `languages`, `interests`, Bio als Body (aktualisiert: Jr. Full-Stack Developer seit Sept 2025). `timeline` und `next` als Entwurf; der Owner schreibt sie in 50.
- [ ] `legalAddress` bekommt bis Ticket 40 einen auffälligen Platzhalter, nie die Wohnadresse; 39 prüft, dass er ersetzt ist.
- [ ] Porträt: `assets/images/portrait/portrait.jpg` → `public/images/profile/`, Metadaten (EXIF) entfernt.
- [ ] CV entries nach § 5.5 und Inventar: 4 × asellerate (`work`); FSJ, ERD, 2 × HFU-Gremien (`volunteering`); Master, Bachelor, Abitur (`education`); Medienpreis (Jury-Zitat als Body), Gamescom 2023, GiG xLab, Zertifikat DIGITAL GAMES, MFG-Seminar (2026-10-15), Cybersicherheitstag (`achievement`). `project` gesetzt (Medienpreis → AUREA, Master → Connecting-Minds, Bachelor → A Fraction of Time, Gamescom → ElevEntures-Mayhem). Keine Grundschule.
- [ ] Die ✗-Fehler des Inventars sind korrigiert (Tippfehler, Zeiträume). Keine Noten, keine Orte (auch nicht in Klammern im Namen der Organisation), keine Namen Dritter.
- [ ] Skills (`content/skills/*.yml`, `name`, `group`): die Skills aus Inventar § 6 und die Plattformen (AR, VR, Mobile, Web, Desktop). **Offen (Lücke G2):** Skills ohne Beleg im Inventar und die vier, die Projects belegen.
- [ ] Texte entstehen über den Skill `translate-content` (16); DE ist Quelle, EN kommt aus dem alten Site-Text bzw. als Übersetzung des CV. Jede Sprachdatei trägt `unreviewed: true`. **Offen (Lücke G3):** Review der KI-geschriebenen YAML-Fakten.
- [ ] Checks 1 und 3 melden nichts, Check 2 meldet genau die Marker. Check 7 wird mit 18 grün.
- [ ] `grep` über das Repo findet weder Wohnadresse, Telefon noch Geburtsdatum.

## Hinweise

- Die Slugs in `featured` und `project` hängen an Lücke G4 (18).
- Seiten dürfen die Profile nie vollständig in den Payload laden: `email` gehört nur in Server-Code (10) und in die kodierte Fassung (21, 33).
