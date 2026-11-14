# Spielmodus und Mobil-Modus

Type: grilling
Status: open
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
