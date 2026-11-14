# Vorlagen-Sichtung: Checkliste und Funde

Asset zu [Vorlagen-Sichtung](issues/08-vorlagen-sichtung.md). Die Galerien stammen aus [Portfolio-Landschaft und Vorlagen-Galerien](issues/02-portfolio-landschaft.md).
Die Galerie-URLs wurden am 2026-11-14 geprüft: ✓ = abgerufen, ? = Bot-Sperre, also selbst prüfen.
Die „Startpunkte“ sind Leads aus der Recherche und wurden nicht live geöffnet.

## Vorgehen

- Pro Aspekt **3–5 Links**, je **ein Satz**: was gefällt oder was nicht. Negativbeispiele zählen auch („so nicht, weil …“).
- Auf die **Live-Seite** verlinken, nicht auf die Galerie-Kachel. Die Kachel nur, wenn die Seite offline ist.
- Eine Seite darf bei mehreren Aspekten auftauchen, jeweils mit eigenem Satz.
- Zeitbox: etwa 20 Minuten pro Aspekt. Aufhören, sobald 3–5 Funde stehen.
- Funde unten in die Tabellen eintragen. Danach `/wayfinder .scratch/nuxt-portfolio/map.md Vorlagen-Sichtung` erneut aufrufen. Dann wird das Ticket geschlossen.

## Linse für alle Aspekte

Abgeleitet aus den bisherigen Entscheidungen. Kurz prüfen, nicht messen.

1. **10-Sekunden-Test:** Nach 10 s ist klar, wer das ist, was die Person macht, was der beste Beleg ist und wo CV und Kontakt liegen.
2. **Ein** Signature-Moment, keine Spielwelt, die man erst durchspielen muss.
3. **Auf dem Handy öffnen:** Läuft es flüssig, lädt es schnell? Das Ziel ist Lighthouse ≥ 95 mobil, WCAG 2.2 AA und Inhalt ohne JavaScript lesbar. Schwere Seiten dürfen trotzdem inspirieren; dann im Satz vermerken: „Idee gut, aber zu schwer“.
4. **Abheben:** keine vCard-Sidebar, kein generisches Hero mit Kartengrid, keine Skill-Balken.

## 1. Home und Gesamtlayout

| Galerie | Filter | |
|---|---|---|
| Awwwards | [Portfolio Honors](https://www.awwwards.com/websites/winner_category_portfolio/), [Portfolio](https://www.awwwards.com/websites/portfolio/) | ✓ |
| Siteinspire | [Portfolio](https://www.siteinspire.com/websites/category/portfolio), [Grid Layout](https://www.siteinspire.com/websites/category/grid-layout) | ✓ |
| Recent | [Websites](https://recent.design/websites), dort Filter „Portfolio“ oder „Personal“ anklicken (die Filter haben keine eigene URL) | ✓ |
| One Page Love | [Portfolio](https://onepagelove.com/portfolio) | ✓ |
| Land-book, Lapa Ninja | Kategorie „Portfolio“ selbst suchen: [land-book.com](https://land-book.com/), [lapa.ninja](https://www.lapa.ninja/) | ? |

**Suchbegriffe:** `game developer portfolio`, `creative developer portfolio`, `technical artist portfolio`

**Startpunkte:**
- [yoann-pierkot.netlify.app](https://yoann-pierkot.netlify.app/): CV-Button schon auf dem ersten Screen
- [noelberry.ca](https://noelberry.ca/): Gameplay-GIFs in den Projektkacheln
- [dukope.com](https://dukope.com/), [increpare.com](https://www.increpare.com/): spielbare Builds neben den Projekten

**Worauf achten:**
- Was steht auf dem ersten Screen: Name, Rolle, bester Beleg, CV-Button, Kontakt?
- Wie trennt die Seite kuratierte Projekte vom Rest? Eigener Fall: 7 Featured, 7 im Archiv.
- Wo und wie prominent stehen Auszeichnungen? Eigener Fall: Medienpreis, Gamescom 2023, GiG xLab.
- Wo sitzen die kleinen Bausteine: eine „Aktuell“-Zeile, Services, der Sprachumschalter DE/EN?

## 2. Signature-Moment

| Galerie | Filter | |
|---|---|---|
| Awwwards | [Games](https://www.awwwards.com/websites/games/), [Experimental](https://www.awwwards.com/websites/experimental/) | ✓ |
| Siteinspire | [Unusual Layout](https://www.siteinspire.com/websites/category/unusual-layout) | ✓ |
| Codrops | [Demos](https://tympanus.net/codrops/demos/), dort Tags wie `webgl` oder `r3f`; dazu das Interview [From Gaming Culture to High-End Interactive Experiences](https://tympanus.net/codrops/?p=107970) | ? |

**Suchbegriffe:** `portfolio mini game`, `playable portfolio`, `interactive hero webgl`

**Startpunkte:**
- [Mialyk: Mini-Game auf der Home](https://www.awwwards.com/inspiration/homepage-mini-game-mialyk-portfolio): am nächsten an der gewählten Richtung (b)
- [Matteo Courquin](https://www.awwwards.com/sites/matteo-courquin): Playground auf einem einzigen Screen
- [iryoku.com](https://www.iryoku.com/): Auszeichnungen als Achievements
- Gegenpol, ganze Spielwelt: [Peter Oravec, Portfolio als Pixel-Art-Spiel](https://www.awwwards.com/sites/peteroravec-com-portfolio) und [Bruno Simon, 3D-Welt als Navigation](https://www.awwwards.com/inspiration/3d-game-project-navigation-bruno-simon)

**Worauf achten:**
- Blockiert der Moment den Inhalt, oder lässt er sich ignorieren?
- Wie viele Sekunden bis zur ersten Interaktion? Muss man erst etwas lernen?
- Funktioniert er mit Touch? Was passiert auf dem Handy?
- Ist es eine echte Mechanik (Steuerung, Physik, Regel) oder nur eine Deko-Animation?
- Die Technik grob notieren, falls erkennbar: CSS, Canvas 2D, WebGL/three.js. Das klärt später die Technikfrage im Nebel der Map.

## 3. Project page

| Galerie | Filter | |
|---|---|---|
| Awwwards | [Portfolio Honors](https://www.awwwards.com/websites/winner_category_portfolio/), dort in eine Seite und ein einzelnes Projekt klicken | ✓ |
| Siteinspire | [Portfolio](https://www.siteinspire.com/websites/category/portfolio) | ✓ |

**Suchbegriffe:** `game developer portfolio case study`, `game designer portfolio project page`, `technical designer portfolio`

**Startpunkte:**
- [maxpears.com](https://www.maxpears.com/): Rolle, Zeitraum und Engine oben auf jedem Project
- [jaikarpothula.com](https://jaikarpothula.com/): Problem → Entscheidung → Ergebnis, dazu ein „Recruiter-Modus“
- [noelberry.ca](https://noelberry.ca/), [dukope.com](https://dukope.com/): Video und spielbare Builds am Project

**Worauf achten:**
- Steht ohne Scrollen da: Rolle, Zeitraum, Team, Engine und Plattform?
- Wie zeigt die Seite ein Project mit **mehreren Phasen**? Eigener Fall: Connecting-Minds und A Fraction of Time liefen erst im Team, dann allein als Abschlussarbeit.
- Trägt dieselbe Vorlage ein Spiel **und** ein Forschungsprojekt mit Paper? Eigener Fall: Free3D, dazu Three.LS als Tool.
- Wie sitzt ein spielbarer Build oder ein Video in der Seite: Poster, Click-to-play, Vollbild?
- Wie sehen die Linkleiste (Repo, Paper, Play, Store) und der Weg zum nächsten Project aus?
- Wie wirkt die Seite mit wenig Bildmaterial? Manche Projects haben nur ein Thumbnail.

## 4. CV-Seite

Galerien führen kaum CV-Seiten. Siteinspire hat keine CV-Kategorie.

| Galerie | Filter | |
|---|---|---|
| JSON Resume | [Themes](https://jsonresume.org/themes/): 227 Vorlagen, filterbar nach Layout, Farbe und Stil | ✓ |
| Awwwards | [Portfolio](https://www.awwwards.com/websites/portfolio/), dort die About- oder Resume-Seiten ansehen | ✓ |

**Suchbegriffe:** `developer resume website`, `html resume print stylesheet`, `portfolio about page timeline`

**Startpunkt:** [iryoku.com](https://www.iryoku.com/): Auszeichnungen als Achievements

**Worauf achten:**
- **Drucktest:** Strg+P auf der Seite. Sieht die Vorschau aus wie ein ordentlicher CV? Die CV-Seite bekommt ein Print-Stylesheet.
- Timeline oder Gruppen? Eigener Fall: Arbeit, Ausbildung, Ehrenamt, Auszeichnungen; allein asellerate hat 4 Einträge.
- Wie zeigt die Seite Skills ohne Balken? Eigener Fall: Belege wie „Unity: 6 Projects“.
- Wo steht der PDF-Download (DE und EN)?

## 5. Typografie und Farbe

| Galerie | Filter | |
|---|---|---|
| Awwwards | [Typography](https://www.awwwards.com/websites/typography/) | ✓ |
| Siteinspire | [Typographic](https://www.siteinspire.com/websites/category/typographic), [Minimal](https://www.siteinspire.com/websites/category/minimal) | ✓ |
| Fonts In Use | [Web](https://fontsinuse.com/in/2/formats/3/web): Websites samt den verwendeten Schriften | ✓ |
| Typewolf | [Site of the Day](https://www.typewolf.com/site-of-the-day): nennt die Schriften jeder Seite | ✓ |

**Suchbegriffe:** auf Fonts In Use und Typewolf nach Schriften suchen, die zur Wortmarke passen: eckige, technische Sans (`squared sans`, `techno sans`, `geometric sans`).

**Worauf achten:**
- Passt es neben die Wortmarke? Sie ist eine schwarze, eckige, technische Sans. Farbe ist frei, denn das Logo ist einfarbig.
- Dark, Light oder beides? Was gefällt bei Game-Dev-Seiten?
- Display-Schriften mit engem Lauf brechen bei langen deutschen Wörtern schnell um, etwa bei „Medienpreis der Fakultät“.
- Wenige Schriftschnitte halten die Ladezeit klein. Den Schriftnamen notieren; ob die Lizenz Selbst-Hosting erlaubt, klären wir später.

## Funde

Pro Aspekt 3–5 Zeilen. Eine Zeile: Link + ein Satz.

### 1. Home und Gesamtlayout

| # | Link | Was gefällt oder nicht |
|---|---|---|
| 1 |https://bruno-simon.com/ - https://www.awwwards.com/websites/winner_category_portfolio/ | wie wärs es auf zwei arten zu machen, ne game art will ich jedoch wie ein rpg machen|
| 2 |https://library.jjangik.kr/ |die art und weise find ich cool, quasi das leben als buch mit einzelnen kapiteln und es ist interaktiv |
| 3 |https://yoann-pierkot.netlify.app/?Page=Home |das ist noch ziemlich normal, nicht zu viel gewicht |

### 2. Signature-Moment

| # | Link | Was gefällt oder nicht |
|---|---|---|
| 1 |https://www.awwwards.com/sites/peteroravec-com-portfolio | signature wäre schon gaming, vielleicht ne zeitreise sequenz aus nem game wie ich es in a fraction of time gemacht habe, weil ich zeitreisen ina games cool finde|
| 2 | https://www.awwwards.com/inspiration/3d-game-project-navigation-bruno-simon|ja in dem fall bei mir keine autos sondern entweder thrid person rpg oder ein point and click wie ich es in connecting minds gebaut habe beim player |
| 3 | | |

### 3. Project page

| # | Link | Was gefällt oder nicht |
|---|---|---|
| 1 | https://jaikarpothula.com/| er zeigt einzelne schritte, zwar zu futuristisch, aber so in der art|
| 2 |https://dukope.com/ |hier wird ein dev log verlinkt, sowas in die richtung ist auch möglich |
| 3 | https://www.maxpears.com/|er zeigt bspw auch videos, auch möglich das einzubauen |

### 4. CV-Seite

| # | Link | Was gefällt oder nicht |
|---|---|---|
| 1 | https://www.iryoku.com/|ist drucken kaputt, muss dann für mich repariert sein |
| 2 | https://www.iryoku.com/| zeigt auch learnings, das muss ich bei meinen projekten auch mit einbauen was ich daraus gelernt habe jeweils|
| 3 | | |

### 5. Typografie und Farbe

| # | Link | Was gefällt oder nicht |
|---|---|---|
| 1 | https://fontsinuse.com/uses/59595/neon-team-agency-website|ich würd gerne den font exo nehmen, find den cool |
| 2 |https://watson.la/?ref=siteinspire |die kontraste zwischen hell und dunkel sind cool, wie man es mit spielen integriert weiß ich noch nicht, ich brauche aufjednefall zwei arten von pages, am handy muss es ne sinnvolle moppbile app sein, am pc kann es n spiel sein, kleines minispiel mit kleinen missionen |
| 3 | | |
