# Inhaltsmodell

Type: grilling
Status: resolved
Blocked by: 07

## Question

Welche Inhaltstypen und Felder hat die Seite, und welche Felder sind pro Sprache übersetzt, welche geteilt?

- **Project:** Felder, Featured-Flag. Kategorie oder Tags? Die alten 8 Kategorien waren Film, 3D Game, 2D Game, VR Game, AR Game, Modelling, Paper, Free.
- **CV-Eintrag:** Arten (Beruf, Ausbildung, Ehrenamt, Auszeichnung/Zertifikat).
- **About.**
- **Skills:** Wie werden sie dargestellt, ohne Prozentbalken?

Randbedingung: Das Modell muss später 1:1 auf Strapi-Collection-Types passen, ohne vorgezogene Abstraktionsschicht.

Faktenbasis: [Inhaltsinventar](07-inhaltsinventar.md) mit [content-inventory.md](../content-inventory.md). Daraus folgt: Ein Project kann mehrere Phasen haben (Teamkurs, dann Solo-Thesis) und mehrere Ausspielwege (Repo, Paper, Build, Live-Demo, Sketchfab). Ready Prepper One ist Work in Progress.

## Answer

Geklärt im Grilling am 2026-11-14 (drei Runden mit dem Owner). Begriffe stehen in `GLOSSARY.md` (Featured project, Archive, Kind, Genre, Phase, Skill, CV entry, Achievement, Profile, Service). Die Aufteilung der Dateien hält [ADR-0002](../../../docs/adr/0002-shared-facts-and-per-language-text-files.md) fest.

**Grundregeln**
- **Ablage:** Pro Eintrag gibt es eine geteilte YAML-Datei für Fakten und je Sprache eine Markdown-Datei für Texte. Der Dateiname ist in allen Sprachen gleich und verknüpft sie. Lokalisierte URLs regelt das Routing. Das bildet Strapis Schalter „Enable localization for this field“ 1:1 ab (Quelle: [Strapi Docs, Internationalization](https://docs.strapi.io/cms/features/internationalization.md)).
- **Listen mit Text** (Komponenten) liegen komplett auf der Sprachseite, denn Strapi lokalisiert Komponenten nur als Ganzes. Ihre Fakten (Daten, Bilddateien) stehen dadurch pro Sprache doppelt.
- **Einzelbild:** Die Datei ist geteilt, der Alt-Text ein eigenes übersetztes Feld (WCAG). Ob der Alt-Text der Strapi Media Library lokalisierbar ist, ist UNVERIFIED.
- **Datum:** ISO 8601 mit variabler Genauigkeit (`2017`, `2023-10`, `2026-01-30`). Angezeigt wird genau die angegebene Genauigkeit, sortiert wird als Text. `start` ist Pflicht. Ein leeres `end` heißt beim achievement „Zeitpunkt“, sonst „läuft noch“. Semester werden nicht eigens modelliert. In Strapi wird das Datum ein Textfeld mit Muster.
- **Nicht im Content:** Noten (ein Highlight steht im Fließtext); Namen von Teammitgliedern (Credits über die Links; der Grund ist die Zustimmung Dritter); Orte bei CV-Einträgen; UI-Texte (Bezeichnungen von Kinds, Link-Typen und Skill-Gruppen sowie die Navigation liegen in den i18n-Sprachdateien und ziehen nicht nach Strapi um).

**Layout**
```
content/
  profile.yml          de/profile.md          en/profile.md
  projects/<slug>.yml  de/projects/<slug>.md  en/projects/<slug>.md
  cv/<id>.yml          de/cv/<id>.md          en/cv/<id>.md
  skills/<slug>.yml    (nur geteilt)
                       de/pages/<slug>.md     en/pages/<slug>.md   (nur übersetzt)
```

**Project** (Strapi: Collection Type mit i18n)
| Feld | | Typ | Pflicht |
|---|---|---|---|
| `kind` | geteilt | game · research · tool · film · asset (ersetzt die 8 alten Kategorien) | ✓ |
| `skills` | geteilt | Skill-Slugs, inkl. Plattformen (AR, VR, Mobile, Web, Desktop) | ✓ |
| `links` | geteilt | Liste `{type, url}`, Typen repo · paper · play · website · viewer · video · devlog · store · download; Beschriftung aus UI-Texten | |
| `cover` | geteilt | Bild | ✓ |
| `embed` | geteilt | Form klärt die [Embed-Architektur](13-embed-architektur.md) | |
| `title` | übersetzt | Text | ✓ |
| `genre` | übersetzt | eine Zeile Freitext, ersetzt Untertitel wie „Visual Novel“ | ✓ |
| `summary` | übersetzt | 1–2 Sätze, für Karte und Meta-Description | ✓ |
| `coverAlt` | übersetzt | Text | ✓ |
| `phases` | übersetzt | Liste ≥1 `{start, end, context, teamSize, role}`; der Zeitraum des Projects ergibt sich aus erster und letzter Phase | ✓ |
| `contributions` | übersetzt | Liste von Sätzen | |
| `learnings` | übersetzt | Liste von Sätzen: was aus dem Project gelernt wurde | |
| `gallery` | übersetzt | Liste `{file, alt, caption}`, Bild oder Video | |
| Body | übersetzt | Markdown | |

- Eine Karte zeigt Kind, Plattformen und Genre, z. B. *Tool · AR · Web · L-System-Pflanzengenerator* (Three.LS).
- Auszeichnungen eines Projects werden aus den achievements abgeleitet, die auf das Project verweisen.
- Featured und Archiv nutzen dieselben Felder.
- Nachtrag vom 2026-11-14 aus der [Vorlagen-Sichtung](08-vorlagen-sichtung.md): `learnings` und der Link-Typ `devlog` sind neu. An jedem Project soll stehen, was daraus gelernt wurde. `learnings` ist wie `contributions` aufgebaut.
- Ready Prepper One ist **kein** Project, sondern die Zeile `now` im Profile, bis es Inhalt hat.

**CV entry** (Strapi: Collection Type mit i18n)
| Feld | | Typ | Pflicht |
|---|---|---|---|
| `kind` | geteilt | work · education · volunteering · achievement | ✓ |
| `start` / `end` | geteilt | Datum (s. o.) | `start` ✓ |
| `skills` | geteilt | Skill-Slugs | |
| `project` | geteilt | Project-Slug (Medienpreis → AUREA, Master → Connecting-Minds) | |
| `link` | geteilt | URL (Pitch-Video, Zertifikat) | |
| `title` | übersetzt | Rolle, Abschluss oder Auszeichnung | ✓ |
| `organisation` | übersetzt | z. B. „Hochschule Furtwangen“ / „Furtwangen University“ | ✓ |
| `contributions` | übersetzt | Liste (Aufgaben, Kurse) | |
| Body | übersetzt | Markdown (z. B. Jury-Zitat) | |

- Das FSJ zählt als volunteering.
- Die 4 asellerate-Einträge bleiben getrennt. Ob sie gruppiert angezeigt werden, entscheidet das Layout.
- achievement umfasst Medienpreis, Gamescom 2023, GiG xLab, Zertifikat DIGITAL GAMES, MFG-Seminar und Cybersicherheitstag.

**Skill** (Strapi: Collection Type **ohne** i18n; nur geteilt)
- Felder: `name` ✓ und `group` ✓. Gruppen: Sprachen · Engines · Frameworks · Datenbanken · Protokolle · Tools · Methoden · Plattformen.
- Statt Prozentbalken zeigt die Seite die Belege. Sie werden aus den Verweisen von Projects und CV-Einträgen abgeleitet („Unity: 6 Projects“).
- Jeder Skill braucht mindestens einen Verweis. Skills ohne Beleg bekommen in der Bauphase einen oder fallen weg.
- Die Lücken aus dem Inventar (Nuxt, Godot, Blender, three.js, FUDGE, Gaussian Splatting) kommen dazu, wenn sie belegt sind.

**Profile** (Strapi: Single Type mit i18n)
- **Geteilt:** `name`, `email`, `profiles` (`{type: github · linkedin · itch, url}`), `portrait`, `featured`. `featured` ist die geordnete Liste der Project-Slugs: Was darin steht, ist Featured, alles andere Archiv.
- **Übersetzt:** `headline`, `location`, `portraitAlt`, `now` (optional), `services` (`{title, text}`, ohne Verweise; die Services bleiben auf Wunsch des Owners), `languages` (`{language, level}`), `interests`, Body = Bio.

**Page** (Strapi: Collection Type mit i18n; nur übersetzt)
- Felder: `title` ✓ und Body. Gedacht für Impressum und Datenschutz. Den Inhalt klärt die [Impressum-Lösung](14-impressum-loesung.md).

**Strapi-Abbildung insgesamt**
- Listen mit Text werden lokalisierte Repeatable Components.
- `links` wird eine geteilte Repeatable Component.
- Verweise werden geteilte Relations. Ob sich Relations sortieren lassen (für `featured`), ist UNVERIFIED. Die Ausweichlösung wäre eine Positionszahl am Project.

## Comments

- 2026-11-15 (Agent, über [Embed-Architektur](13-embed-architektur.md)): Das Feld `embed` ist geteilt und hat die Form `{ aspect: "16/9" }`. Pro Project gibt es höchstens einen Embed. Das Verzeichnis ist per Konvention `public/builds/<project-slug>/`, ein Pfad-Feld gibt es nicht. Das Poster ist das `cover`. Fehlt zu einem `embed` das Verzeichnis, bricht der Build ab. In Strapi wird `embed` eine geteilte Component mit einem Feld.
