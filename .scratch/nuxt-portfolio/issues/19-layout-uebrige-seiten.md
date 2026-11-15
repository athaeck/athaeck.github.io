# Layout der übrigen Seiten: Projects, Lebenslauf, Über mich

Type: prototype
Status: resolved
Blocked by: 11

## Question

Wie sehen Projects, Lebenslauf und Über mich in Variante D aus? Gebaut als Runde im selben Prototyp wie die [Design-Richtung](11-design-richtung.md).

Vorgaben des Owners (2026-11-15):
- Jede Seite besteht aus Screens: **eine Inhaltskategorie pro Screen**, 100 vh, wie auf der Project page. Am Handy wischt man die Teile einer Kategorie seitlich.
- **Projects:** Screen „Featured“ mit den 7 Karten als kompaktes Raster (4 + 3), Screen „Archiv“ als Zeitleiste nach Jahren. Keine Chronoskop-Karte, damit es bei einem Signature-Moment bleibt.
- **Lebenslauf:** Kopf mit den PDF-Buttons und Sprachen, dann Erfahrung, Engagement, Ausbildung, Auszeichnungen, Skills mit Belegen. Dazu ein Print-Stylesheet.
- **Über mich:** Porträt mit Bio, Services, Interessen.

Vorgaben aus den Tickets:
- Plätze der Inhalte, Auszeichnungen, Archiv und Skills: [Seitenstruktur und Navigation](10-seitenstruktur.md). Die PDF-Buttons schicken ein Formular ab (Revision 2026-11-15).
- Felder: [Inhaltsmodell](09-inhaltsmodell.md). Keine Noten, keine Orte bei CV-Einträgen. Die vier asellerate-Einträge bleiben getrennt; ob sie gruppiert angezeigt werden, entscheidet dieses Layout.
- Impressum und Datenschutz brauchen keine eigene Gestaltung: eine Textspalte im Stil der Seite. Den Inhalt klärt die [Impressum-Lösung](14-impressum-loesung.md).

## Answer

Freigegeben vom Owner am 2026-11-15. Prototyp: [prototype-design-richtung/](../prototype-design-richtung/index.html), Variante D. Alle Seiten folgen der Regel der [Design-Richtung](11-design-richtung.md): **eine Inhaltskategorie pro Screen** (100 vh, der erste abzüglich Kopfzeile), im Wechsel dunkel und hell, am Handy wischt man die Teile einer Kategorie seitlich.

- **Projects:** „Featured“ (dunkel) mit den 7 Karten kompakt im Raster 4 + 3; die achte Kachel führt zum Archiv. „Archiv“ (hell) als Zeitleiste: große Jahreszahl links, Zeilen mit Titel und *Kind · Plattformen · Genre* rechts, das neueste zuerst.
- **Lebenslauf**, Reihenfolge der Screens:
  1. Kopf (dunkel): Titel, aktuelle Rolle, Headline; PDF-Buttons als Formular (eigene Sprache zuerst); Sprungmarken zu den Abschnitten; `languages`.
  2. Erfahrung (hell): die vier asellerate-Einträge gruppiert unter einem Arbeitgeber, das neueste zuerst.
  3. Engagement (dunkel): alle volunteering-Einträge inkl. FSJ.
  4. Ausbildung (hell): Master und Bachelor mit Link zur Abschlussarbeit (`project`) und den Kursen (`contributions`), dazu das Abitur. **Die Grundschule entfällt** (kein CV entry).
  5. Auszeichnungen (dunkel): alle achievements, die Featured achievements mit ★.
  6. Skills (hell): nach Gruppe, je Skill die Zahl der Belege; Antippen öffnet die Belege als Popover (Revision in [Seitenstruktur und Navigation](10-seitenstruktur.md)).
- **Print-Stylesheet:** schlichte, zweispaltige Liste ohne Navigation, Footer, Buttons, Sprungmarken und Farben; Überschriften bleiben bei ihrem Abschnitt.
- **UI-Text:** Die Skill-Gruppe `Sprachen` heißt auf der Seite „Programmiersprachen“ (EN: „Programming languages“), damit sie nicht mit `languages` kollidiert.
- **Über mich:** Porträt mit Bio (hell), „Was ich mache“ mit den `services` (dunkel), `interests` als große Liste (hell).
- **Impressum und Datenschutz:** eine Textspalte im Stil der Seite, keine eigene Gestaltung.

## Comments

- 2026-11-15 (Agent): Runde 5 im Prototyp gebaut, nur in D. Im Umschalter stehen jetzt Home, Projects, Project page, Lebenslauf, Über mich und 404; die Navigation verlinkt die neuen Seiten. Neue Inhalte stehen in `data.js`, erfundene sind als „Beispiel“ markiert (Genres im Archiv, deutsche Bio und Services, Belege der Skills).
  - **Projects:** „Featured“ (dunkel) mit den 7 Karten kompakt im Raster 4 + 3. Die freie achte Kachel führt zum Archiv. „Archiv“ (hell) als Zeitleiste: große Jahreszahl links, rechts die Zeilen, das neueste zuerst.
  - **Lebenslauf:** sechs Screens im Wechsel dunkel/hell. Kopf mit „PDF herunterladen“ (Formular), „English PDF“, Sprungmarken zu den Abschnitten und den Sprachen. Erfahrung: die vier asellerate-Stationen unter einem Arbeitgeber, das neueste zuerst. Engagement: FSJ und Ehrenamt. Ausbildung: Master und Bachelor mit Link zur Abschlussarbeit und den Kursen, darunter Abitur und Grundschule. Auszeichnungen: alle sechs, die Featured achievements mit ★. Skills: acht Gruppen mit Zahl der Belege.
  - **Über mich:** Porträt mit Bio (hell), „Was ich mache“ mit den vier Services (dunkel), Interessen als große Liste (hell).
  - **Abweichung zur Prüfung:** [Seitenstruktur und Navigation](10-seitenstruktur.md) sieht für die Belege eines Skills `<details>` vor. Aufgeklappt würde der Screen wachsen. Der Prototyp öffnet die Belege deshalb per Antippen in einer Ebene darüber, mit dem HTML-Popover (`popovertarget`, geht ohne JavaScript).
  - **UI-Text:** Die Skill-Gruppe „Sprachen“ heißt auf der Seite „Programmiersprachen“, sonst kollidiert sie mit den gesprochenen Sprachen im Kopf derselben Seite. Der Gruppenname im Inhaltsmodell bleibt.
  - **Druck:** Der Lebenslauf druckt als schlichte Liste ohne Navigation, Footer, Buttons und Farben, zweispaltig; mit den Prototyp-Daten 3 Seiten A4.
  - **Nebenbei behoben:** Seit Runde 3 färbte eine zu breite Regel den Kicker „Kontakt · Stuttgart“ im Footer cyan auf hellem Grund (zu wenig Kontrast). Die Regel gilt jetzt nur noch in „Im Spiel“.
  - **Geprüft** in Headless-Chrome bei 1440 × 900, 1366 × 768, 1280 × 720 und 390 × 844: Auf allen drei Seiten ist jeder Screen genau eine Bildschirmhöhe hoch (der erste abzüglich Kopfzeile), kein horizontaler Overflow, keine Konsolenfehler. Das Popover öffnet und schließt, der PDF-Button bleibt auf der Seite (im Prototyp ohne Server), der Druck ergibt 3 Seiten ohne Überlappung.
  - **Offen (Owner):** Gefallen die drei Seiten? Passt das Popover statt `<details>`? Soll die Grundschule auf der Seite stehen oder nur im PDF?
- 2026-11-15 (Owner): Die drei Seiten passen, das Popover statt `<details>` auch. Die Grundschule bleibt komplett draußen.
