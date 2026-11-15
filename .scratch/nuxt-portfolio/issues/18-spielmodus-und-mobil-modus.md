# Spielmodus und Mobil-Modus

Type: grilling
Status: resolved
Blocked by: 08

## Question

Bekommt die Seite einen Spielmodus am Desktop, und wie verträgt er sich mit Variante (b)?

In der [Vorlagen-Sichtung](08-vorlagen-sichtung.md) wünscht der Owner zwei Modi. Am PC eine Spielwelt mit kleinen Missionen, als Third-Person-RPG oder Point-and-Click wie in Connecting-Minds. Am Handy eine „sinnvolle App“. Die [Grundsatzentscheidungen aus dem Charting](01-grundsatzentscheidungen.md) sagen dagegen: Variante (b) mit **einem** Signature-Moment, Recruiter erfassen das Wichtigste in 10 s, Lighthouse ≥ 95 mobil, Inhalte ohne JavaScript lesbar.

- **Verhältnis zu (b):** Ersetzt die Spielwelt die Inhaltsseite, oder liegt sie als zusätzlicher Modus darauf? Bleibt (b) gültig, oder wird es revidiert?
- **Einstieg:** Was sieht ein Besucher am Desktop zuerst, die Inhaltsseite oder das Spiel? Wie kommt ein Recruiter in 10 s zu CV und Kontakt, wenn das Spiel zuerst kommt?
- **Mobil:** Was heißt „sinnvolle App“? Eine mobile-first Inhaltsseite, oder eine installierbare PWA?
- **Spielinhalt:** Was sind die Missionen? Führen sie zu den Projects, zum CV, zu den Auszeichnungen? Passt der Buch-Rahmen mit Kapiteln (library.jjangik.kr) dazu oder ist er eine Alternative?
- **Scope:** Legt die Spec nur Rahmen und Einstieg des Spielmodus fest, und das Spiel selbst kommt in Phase 2? Das entspräche dem Umgang mit Unity-Embeds: Die Architektur ist in scope, der Einbau eines konkreten Spiels nicht.
- **Technik, grob:** Unity-WebGL-Build (dann greift die [Embed-Architektur](13-embed-architektur.md)) oder web-nativ im Nuxt-Projekt? Die genaue Wahl bleibt Fog, bis die Richtung steht.

Ergebnis: eine Entscheidung zu Modus, Einstieg und Scope. Die [Seitenstruktur und Navigation](10-seitenstruktur.md) und die [Design-Richtung und Signature-Moment](11-design-richtung.md) bauen darauf auf.

## Answer

Geklärt im Grilling am 2026-11-15 (drei Runden mit dem Owner).

**Zwei Modi**
- **Inhaltsseite** auf allen Geräten: kanonisch, vorgerendert, ohne JavaScript lesbar. Variante (b) aus den [Grundsatzentscheidungen aus dem Charting](01-grundsatzentscheidungen.md) bleibt gültig und wird nur ergänzt.
- **Spielmodus** (Glossar: *Game mode*): optional, nur am Desktop. Er liegt über der Inhaltsseite und ersetzt sie nie. Technik: Unity WebGL. Basis ist der Point-and-Click-Player aus dem Masterarbeits-Repo von Connecting-Minds. Im Team-Repo stammt der Player etwa zur Hälfte von einer weiteren Person.
- **Mobil:** kein eigener Modus. Die Inhaltsseite wird mobile-first gebaut und fühlt sich wie eine App an; das gestaltet die Design-Richtung. Keine PWA.

**Einstieg und Ausstieg**
- Am Desktop kommt zuerst die Inhaltsseite. Der Spielmodus startet über einen Einstieg auf der Home und in der Navigation.
- Angeboten wird er nur bei feinem Zeiger, breitem Viewport und WebGL 2. Geprüft wird nach Fähigkeit, nicht nach User-Agent. Am Handy steht statt des Start-Buttons ein Hinweis, dass es am Desktop einen Spielmodus gibt.
- Im Spiel sind CV, Kontakt und „Zur Seite“ immer einen Klick entfernt.
- Die Spiel-Route zeigt zuerst einen leichten Startbildschirm. Der Unity-Build lädt erst nach einem Klick. Für den Startbildschirm gelten Lighthouse ≥ 95, WCAG 2.2 AA und „ohne JavaScript lesbar“: Ohne JavaScript, ohne WebGL oder am Handy zeigt er einen Hinweis und Links zur Seite. Das Spiel selbst muss WCAG nicht erfüllen, weil die Inhaltsseite die gleichwertige Alternative ist.

**Verhältnis von Spiel und Seite**
- Das Spiel hat eigene Inhalte. Die Seite liefert ihm keine Daten.
- Gekoppelt sind beide nur an zwei Stellen: Das Spiel verlinkt auf feste URLs der Seite (Project pages, CV, Kontakt), und es startet in der Sprache seiner Route (DE unter `/`, EN unter `/en/`).
- Folge: Die URLs der Project pages müssen stabil bleiben. Die Spieltexte übersetzt der Owner selbst.

**Signature-Moment**
- Es bleibt genau einer (Glossar: *Signature moment*). Er funktioniert ohne Spielmodus und weist thematisch auf ihn hin.
- Kandidaten für den Prototyp: eine Fernrohr-Linse über dem Hero (web-nativ, am Handy per Ziehen) und ein Zeitreise-Übergang wie in A Fraction of Time.
- Der Buch-Rahmen von library.jjangik.kr kommt nicht auf die Inhaltsseite.

**Scope**
- Die Spec legt nur den Rahmen fest: Einstieg, Ausstieg, Geräteregel, Sprache, Links, die Qualitätsziele des Startbildschirms und die Einbindung über die [Embed-Architektur](13-embed-architektur.md).
- Das Spiel selbst ist ein eigener Effort nach dem ersten Rebuild (Phase 2). Die Seite geht ohne Spielmodus online. Der Einstieg erscheint erst, wenn das Spiel live ist.

**Konzeptnotiz für den Spiel-Effort** (keine Spec-Entscheidung)
- Top-down-Point-and-Click. Das Motiv lehnt sich an „Eine Reihe betrüblicher Ereignisse“ an: Mit einem Fernrohr werden verschlüsselte Hinweise entschlüsselt, die Orte auf der Karte aufdecken.
- Fakt: Das Fernrohr gibt es nur in der Netflix-Serie. Es trägt das augenförmige V.F.D.-Logo und hilft, Nachrichten im Sebald-Code zu entschlüsseln; in den Büchern wird von Hand entschlüsselt. Quelle: [Bustle](https://www.bustle.com/p/the-spyglass-on-a-series-of-unfortunate-events-may-hold-clues-about-the-baudelaire-family-30168), abgerufen am 2026-11-15 (Unterhaltungsartikel, keine Primärquelle).
- Stationen: die 7 Featured projects in der Reihenfolge aus dem Profile, der Werdegang (CV und Auszeichnungen) und Kontakt als Ziel der Karte. Ready Prepper One liegt als Ort noch im Nebel. Das Archiv bleibt draußen.
- Offen, entscheidet der Owner beim Bau:
  - Wie das Fernrohr benutzt wird. Vorschlag aus dem Grilling: Blick in der Ich-Perspektive an Aussichtspunkten, scharfstellen heißt entschlüsseln. Alternative: eine Linse auf der Karte.
  - Wie viel von der Vorlage übernommen wird. Namen, Figuren, Titel, Zitate und das Emblem sind geschützt, Mechaniken in der Regel nicht.
- Der Owner wünscht Hilfe beim Schneiden der Arbeitspakete, abgeleitet aus den Inhalten, die er zeigen will.

**Folgen für die Map**
- [Seitenstruktur und Navigation](10-seitenstruktur.md): Platz für den Einstieg, den Hinweis am Handy und die Spiel-Route pro Sprache; stabile URLs der Project pages.
- [Design-Richtung und Signature-Moment](11-design-richtung.md): die Kandidaten für den Signature-Moment, das App-Gefühl am Handy, kein Buch-Rahmen.
- [Embed-Architektur](13-embed-architektur.md): soll später auch den Spielmodus tragen.
- Glossar: *Game mode* und *Signature moment* sind neu.
- Out of scope (Phase 2): das Spiel selbst.
