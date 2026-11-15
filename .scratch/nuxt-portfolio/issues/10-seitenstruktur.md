# Seitenstruktur und Navigation

Type: grilling
Status: resolved
Blocked by: 09, 18

## Question

Welche Seiten und Routen gibt es, und wie führt die Navigation?

- Home, Projects-Übersicht und Archiv, Project page, CV, About (eigene Seite oder Sektion?), Kontakt (Sektion oder Seite?), Impressum, Datenschutz, 404.
- Lokalisierte Slugs: `/projekte` vs. `/en/projects`?
- Wie erreicht ein Recruiter das Wichtigste in 10 s?
- Wo erscheinen Auszeichnungen?
- Was macht der Sprachumschalter auf einer Seite, die es in der anderen Sprache nicht gibt?

Aus dem [Inhaltsmodell](09-inhaltsmodell.md) brauchen außerdem einen Platz: die Services, die „Aktuell“-Zeile (Ready Prepper One), die Skills mit ihren Belegen und das Archiv. Das Inhaltsmodell kennt dafür kein Filterfeld außer `kind` und den Plattform-Skills.

Aus [Spielmodus und Mobil-Modus](18-spielmodus-und-mobil-modus.md) brauchen einen Platz: der Einstieg in den Spielmodus auf der Home und in der Navigation (sichtbar erst, wenn das Spiel live ist), der Hinweis am Handy und eine Spiel-Route pro Sprache. Das Spiel verlinkt auf Project pages, CV und Kontakt. Deren URLs müssen deshalb stabil bleiben.

## Answer

Geklärt im Grilling am 2026-11-15 (zwei Runden mit dem Owner). Neuer Glossar-Begriff: *Featured achievement*.

**Seiten und URLs**

| Seite | DE | EN | Inhalt |
|---|---|---|---|
| Home | `/` | `/en` | s. u. |
| Projects | `/projekte` | `/en/projects` | Featured in Profile-Reihenfolge, darunter das Archiv |
| Project page | `/projekte/<slug>` | `/en/projects/<slug>` | für **jedes** Project, auch im Archiv; dieselbe Vorlage, sie zeigt, was da ist |
| CV | `/lebenslauf` | `/en/cv` | CV entries, Skills mit Belegen, `languages`, PDF-Downloads |
| About | `/ueber-mich` | `/en/about` | Bio, Porträt, `services`, `interests` |
| Impressum | `/impressum` | `/en/legal-notice` | Page |
| Datenschutz | `/datenschutz` | `/en/privacy` | Page |
| 404 | pro Sprache | pro Sprache | s. u. |
| Spiel-Route | Name offen | Name offen | erst mit dem Spiel (s. u.) |

- **Kontakt ist keine Seite**, sondern ein Block im Footer jeder Seite mit Anker `#kontakt` (EN: `#contact`). Das Formular aus Phase 2 darf später eine eigene Seite bekommen.
- **Bewusst nicht:** eigene Archiv-Seite, Seiten pro Skill, Kind oder Auszeichnung, Tag-Seiten.
- Die Abschnitte sind lokalisiert (`customRoutes: 'config'`, laut [Nuxt-Stack-Fakten](03-nuxt-stack-fakten.md)). Der Slug eines Projects ist der Dateiname aus dem [Inhaltsmodell](09-inhaltsmodell.md), in allen Sprachen gleich, klein, kebab-case, ASCII.
- Kanonisch ohne Trailing Slash.
- **Slugs sind ab dem ersten Release eingefroren**, weil das Spiel darauf verlinkt. Umbenennen geht nur mit 301 über `routeRules`.
- **CV-PDFs:** `/downloads/nick-haecker-lebenslauf.pdf` (DE) und `/downloads/nick-haecker-cv.pdf` (EN), stabile URLs. Angeboten werden sie nur oben auf der CV-Seite, beide Sprachen auf beiden Sprachseiten: die eigene zuerst.

**Sprachen**
- Jede Seite gibt es in beiden Sprachen, auch Impressum und Datenschutz. **Fehlt eine Sprachdatei, bricht der Build ab.** Halb übersetzt geht nichts live.
- Der Umschalter ist deshalb immer ein `<a href>` auf dieselbe Seite in der anderen Sprache. Er wird beim Prerender berechnet und funktioniert ohne JavaScript. Einen Fallback gibt es nicht.

**Home und der 10-s-Weg** (die Anordnung entscheidet die [Design-Richtung](11-design-richtung.md))
1. **Erster Screen:** Name bzw. Wortmarke, `headline`, Stadt, die `now`-Zeile, die CTAs „Lebenslauf“ (→ CV-Seite) und „Kontakt“ (→ `#kontakt`), der Streifen der Featured achievements und der Signature-Moment.
2. Alle 7 Featured projects als Karten in Profile-Reihenfolge, mit Cover, Titel, *Kind · Plattformen · Genre* und Badge.
3. Ein Link „Alle Projects“ führt zur Projects-Seite.
4. Footer.
- **Nicht auf der Home:** Bio, Services, Interessen, Skills, CV entries.

**Navigation und Footer**
- **Kopfzeile:** Logo (→ Home) · Projects · Lebenslauf · Über mich · Kontakt · DE/EN.
- Auch am Handy sind alle Punkte immer sichtbar, **ohne Hamburger**. Ob Kopfleiste oder Tab-Leiste unten, entscheidet die Design-Richtung.
- Der aktive Punkt bekommt `aria-current="page"`. Ganz oben steht ein Skip-Link „Zum Inhalt“.
- **Footer** auf jeder Seite gleich:
  - der Kontaktblock: E-Mail als sichtbarer, kopierbarer Text mit `mailto:`, dazu GitHub, LinkedIn, itch.io und Stuttgart;
  - Links auf Impressum und Datenschutz;
  - der Sprachumschalter.

**Plätze der Profile-Felder**

| Feld | Platz |
|---|---|
| `now` | nur in der Home-Hero |
| Bio, `interests`, `services` | About-Seite |
| `languages` | CV-Seite |
| `portrait` | About-Seite; ob es auch in der Hero steht, entscheidet die Design-Richtung |
| `name`, `email`, `profiles` | Footer |

**Auszeichnungen** (abgeleitet aus den achievement-CV-entries)
1. **Home-Streifen** mit den Featured achievements. Neues geteiltes Profile-Feld `featuredAchievements`: eine geordnete Liste von CV-entry-IDs, nach demselben Muster wie `featured`. Zum Start: Medienpreis, Gamescom 2023, GiG xLab. Das ist ein Nachtrag zum [Inhaltsmodell](09-inhaltsmodell.md); die Spec führt ihn zusammen. Ein Eintrag verlinkt auf die Project page, wenn er ein `project` hat, sonst auf seinen Anker auf der CV-Seite. Jeder CV entry bekommt dafür einen Anker aus seiner ID.
2. **Badge** an Project-Karte und im Kopf der Project page, abgeleitet aus dem `project`-Verweis (AUREA, ElevEntures-Mayhem).
3. **CV-Seite:** alle Auszeichnungen als eigene Gruppe.
- Ein Flag am CV entry wurde verworfen, weil es keine Reihenfolge hat. „Alle zeigen“ wurde verworfen, weil Teilnahmebestätigungen den Streifen verwässern.

**Projects und Archiv**
- Die Featured auf der Projects-Seite nutzen dieselben Karten wie die Home.
- Das Archiv ist eine kompakte Liste: eine Zeile pro Project mit Titel, *Kind · Plattformen · Genre* und Jahr. Sortiert nach dem Ende der letzten Phase, das neueste zuerst. Jede Zeile verlinkt auf die Project page.
- **Keine Filter:** Bei 14 Projects lohnen sie nicht, und sie bräuchten JavaScript oder Filter-Routen.
- **Project page:** Oben steht „← Projects“, unten „Nächstes Project“ in der Reihenfolge der Projects-Seite. Nach dem letzten kommt der Link zur Projects-Seite, ohne Rundlauf. Den Aufbau der Seite selbst klärt das Layout.

**Skills**
- Sie stehen auf der CV-Seite, gruppiert nach `group`, jeder mit seiner Zahl („Unity · 6 Projects“).
- Ein `<details>` klappt die belegenden Projects und CV entries als Links auf. Das geht ohne JavaScript.
- Jede Project page listet ihre Skills mit Links auf `/lebenslauf#skill-<slug>`.
- Keine Skill-Seiten, keine Filter.

**Spielmodus** (Rahmen aus [Spielmodus und Mobil-Modus](18-spielmodus-und-mobil-modus.md))
- **Kein Feature-Flag.** Route, Home-Einstieg und Nav-Punkt kommen im selben Release wie das Spiel. Bis dahin gibt es nichts davon, auch keinen Platzhalter.
- Der Home-Einstieg liegt nahe dem Signature-Moment.
- Das Basis-Markup zeigt auf der Home nur den Hinweis „Am Desktop gibt es einen Spielmodus“ und keinen Nav-Punkt. Das gilt ohne JavaScript, am Handy und ohne passende Fähigkeit. JavaScript ersetzt den Hinweis durch den Start-Button und blendet den Nav-Punkt ein, wenn Zeiger, Viewport und WebGL 2 passen.
- Der Hinweis steht nur auf der Home.
- **Name der Spiel-Route:** Der Owner will nicht „Spiel“. Der Name wird im Spiel-Effort gewählt. Regeln: ein Paar pro Sprache, kurz, ASCII, passend zum Motiv, ab dem ersten Release eingefroren. Die Beschriftung des Nav-Punkts folgt dem Namen. Der Glossar-Begriff *Game mode* bleibt.
- Link-Ziele des Spiels:
  - die Project page;
  - `/lebenslauf` bzw. `/en/cv`;
  - `/#kontakt` bzw. `/en#contact`.

**SEO-Basics und 404**
- **Titel:** `<Seitentitel> · Nick Philipp Häcker`. Die Home hat `Nick Philipp Häcker · <headline>`.
- **Description:**

| Seite | Quelle |
|---|---|
| Project page | `summary` |
| Home | `headline` + Stadt |
| übrige Seiten | je ein UI-Text pro Sprache |

- `hreflang` und `canonical` kommen aus `useLocaleHead`.
- **404:** pro Sprache, nach der Sprache des Pfads. Sie enthält:
  - einen kurzen Satz;
  - die Navigation wie überall;
  - Links zu Home, Projects und Lebenslauf;
  - den Umschalter auf die Home der anderen Sprache.
- Ob die 404 einen spielerischen Dreh bekommt, entscheidet die Design-Richtung.

**Folgen für die Map**
- [Design-Richtung und Signature-Moment](11-design-richtung.md): bekommt die Vorgaben zu erstem Screen, Navigation ohne Hamburger, Porträt in der Hero und 404.
- [Übersetzungs-Workflow](17-uebersetzungs-workflow.md): Es gilt die Build-Regel „beide Sprachen oder kein Release“.
- [Impressum-Lösung](14-impressum-loesung.md): Es gibt eine EN-Fassung unter `/en/legal-notice` und `/en/privacy`.
- Nebel: Das Layout von Project page und CV-Seite, also auch die Reihenfolge der Sektionen auf der CV-Seite, hängt nur noch an der Design-Richtung.
- Out of scope (Phase 2): Der Name der Spiel-Route gehört zum Spiel-Effort.
