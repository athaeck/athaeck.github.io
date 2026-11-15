# Übersetzungs-Workflow

Type: grilling
Status: resolved
Blocked by: 09

## Question

Wie läuft die Übersetzung konkret ab? Feststeht: KI-Vorübersetzung, der Owner reviewt ([Grundsatzentscheidungen aus dem Charting](01-grundsatzentscheidungen.md)).

- **Ausgangssprache je Inhalt:** Die Texte der Live-Seite gibt es heute nur auf Englisch, die des CV nur auf Deutsch ([Inhaltsinventar](07-inhaltsinventar.md)). Gibt es eine feste Ausgangssprache pro Typ oder pro Eintrag?
- **Ablauf:** Wann und womit wird vorübersetzt: einmalig in der Bauphase, danach bei jeder Änderung?
- **Review:** Wie wird festgehalten, dass der Owner eine Übersetzung geprüft hat?
- **Veraltete Übersetzungen:** Wie fällt auf, dass eine Übersetzung nach einer Änderung nicht mehr stimmt? Braucht das ein Feld im Modell?

Grundlage: das [Inhaltsmodell](09-inhaltsmodell.md). Übersetzt werden genau die Felder der Markdown-Dateien pro Sprache. Listen mit Text wie `phases` tragen ihre Fakten in jeder Sprache mit.

Vorgabe aus [Seitenstruktur und Navigation](10-seitenstruktur.md): Fehlt zu einem Eintrag eine Sprachdatei, bricht der Build ab. Ein neuer Eintrag geht also erst live, wenn beide Sprachen da sind. Einen Fallback auf die andere Sprache gibt es nicht.

## Answer

Geklärt im Grilling am 2026-11-15 (eine Runde mit dem Owner, alle Empfehlungen angenommen). Die Begriffe *Source language* und *Unreviewed text* stehen in `GLOSSARY.md`. Ein ADR gibt es nicht, denn der Ablauf lässt sich jederzeit ändern.

**Ausgangssprache**
- **Deutsch ist die Quelle.** Das Modell speichert keine Ausgangssprache.
- Den Bestand übersetzt die Bauphase einmalig aus seiner Sprache: die Texte der Live-Seite von EN nach DE, das CV von DE nach EN.
- Danach geht jede inhaltliche Änderung zuerst ins Deutsche, das Englische zieht nach. Am Englischen darf der Owner den Ausdruck schleifen, ohne dass das Deutsche nachzieht.
- Gründe: Deutsch ist die Muttersprache des Owners und schon die Standard-Locale. Strapis KI-Übersetzung arbeitet später ebenfalls aus der Standard-Locale. Sie „enables automatic translations for all the locales in a project when the content in the default locale is updated“ und läuft im Growth-Plan über AI-Credits (Quelle: [Strapi Docs, Internationalization](https://docs.strapi.io/cms/features/internationalization), abgerufen am 2026-11-15).
- Auf den Rechtsseiten ist die deutsche Fassung maßgeblich. Das steht schon in der [Impressum-Lösung](14-impressum-loesung.md).

**Werkzeug und Zeitpunkt**
- Übersetzt wird mit Claude Code im Repo, über einen Projekt-Skill (Arbeitsname `translate-content`). Den Skill schreibt der Bau-Effort. Er enthält:
  - die Stilregeln (s. u.);
  - eine Begriffsliste aus den UI-Texten;
  - die Regel, Fakten nicht anzufassen und Listen 1:1 zu übersetzen (gleiche Einträge, gleiche Reihenfolge);
  - Eigennamen bleiben, außer es gibt eine offizielle Fassung (Hochschule Furtwangen → Furtwangen University);
  - die Pflicht, an jeder Datei, die er schreibt, `unreviewed: true` zu setzen.
- Er läuft einmalig für den Bestand in der Bauphase und danach bei jeder Änderung. Die Übersetzung landet im selben Commit wie die Änderung der Quelle.
- Es gibt keinen Übersetzungsdienst (DeepL-API o. ä.) und keinen Übersetzungsschritt im Build. So bleibt der Build reproduzierbar und braucht keinen API-Schlüssel.

**Review**
- Der Marker `unreviewed: true` steht im Front-Matter einer Sprachdatei. Er gilt pro Datei, nicht pro Feld.
- Die KI setzt ihn bei jedem Text, den sie schreibt, auch bei Entwürfen: In der Bauphase entwirft der Agent etwa `learnings` aus dem Inventar. Der Owner löscht die Zeile, sobald er den Text gelesen hat. Was neu ist, zeigt `git diff`.
- **Steht irgendwo ein Marker, bricht der Build ab**, wie bei einer fehlenden Sprache. Die Regel aus der [Seitenstruktur](10-seitenstruktur.md) lautet damit: beide Sprachen, geprüft, oder kein Release.
- Folge: Auf `main` steht nie ein Marker, also braucht Strapi kein Feld dafür. Dort übernimmt Draft & Publish die Rolle, denn Strapi veröffentlicht pro Locale: „Clicking on the Publish button will only publish the content for the locale you are currently working on“ (gleiche Quelle).
- Bewusste Kosten: In der Bauphase schlägt `npm run build` fehl, solange Prüfungen offen sind. Der Bau-Effort legt Übersetzen und Prüfen deshalb ans Ende eines Arbeitsschritts.
- Verworfen:
  - Kein Marker, der Commit des Owners gilt als Prüfung. Das verliert in der Bauphase über viele Sitzungen den Überblick.
  - Der Marker löst nur eine Warnung aus. Die liest niemand.

**Veraltete Übersetzungen**
- Es gibt kein Feld im Modell. Geschützt wird über den Ablauf: Jede inhaltliche Änderung an der Quelle zieht die Übersetzung im selben Commit nach, mit Marker. Eine Lücke bleibt bewusst offen: Wer ohne Skill nur eine Sprache ändert, wird nicht ermahnt.
- Neue Build-Prüfung **Listenabgleich**: Die Listen mit Text (`phases`, `gallery`, `contributions`, `learnings`, `services`, `languages`) haben in beiden Sprachen gleich viele Einträge. Ihre Fakten (`start`, `end`, `teamSize`, `file`) sind gleich. Das fängt die Drift ab, die [ADR-0002](../../../docs/adr/0002-shared-facts-and-per-language-text-files.md) in Kauf nimmt.
- Verworfen:
  - Ein Hash der Quelle in der Übersetzung. Jeder Tippfehler im Deutschen bräche den Build, und in Strapi gibt es kein Gegenstück.
  - Git-Zeitstempel vergleichen. Formatierungs-Commits lösen falsch aus, und der Image-Build bräuchte die Historie.

**Stil**
- Auf Deutsch werden die Leser überall geduzt, auch auf den Rechtsseiten. Der Prototyp nutzt schon „Dein Team?“.
- Englisch steht in US-Schreibweise. Die Locale bleibt `en`.

**UI-Texte** (i18n-Sprachdateien)
- Es gelten dieselbe Quelle und derselbe Skill, aber ohne Marker, weil die Sprachdateien kein Front-Matter haben. Der Owner prüft sie einmal im Bau-Effort per Diff.

**Für die Spec**
- Die Inhaltsprüfungen in `npm run build` sind: fehlende Sprache, `unreviewed`-Marker und Listenabgleich, dazu Budget und Konsistenz der Web builds.
- Das Front-Matter-Feld `unreviewed` ist optional und nur `true`. Es gibt es in allen Sprachdateien: Project, CV entry, Profile, Page.
