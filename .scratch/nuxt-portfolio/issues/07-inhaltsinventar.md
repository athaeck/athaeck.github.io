# Inhaltsinventar

Type: task
Status: resolved
Blocked by: –

## Question

Welche Inhalte gibt es, welche stimmen und sind aktuell, und was fehlt? Die Antwort ist die Faktenbasis für [Inhaltsmodell](09-inhaltsmodell.md).

**Agent (AFK):** Erstellt `.scratch/nuxt-portfolio/content-inventory.md` aus `index.html` und dem CV-PDF in `docs/about-me/`. Inhalt:
- Bio
- CV-Einträge (Beruf, Ausbildung, Ehrenamt) mit korrigierten Daten
- Projects (Titel, Zeitraum, Rolle, Beiträge, Links, Thumbnail, Auszeichnung, alte Kategorie)
- Auszeichnungen und Zertifikate
- Skills, Sprachen, Hobbys

Widersprüche zwischen den Quellen werden markiert. **Wohnadresse, Telefon und Geburtstag werden nicht übernommen.**

**Owner (HITL):** Prüft und korrigiert. Ergänzt das MFG-Seminar „Aktuelle KI-Tools strategisch nutzen“ (15.10.202?, Jahr bestätigen) und neue Projects seit 2025. Legt die Featured-Liste fest.

Erledigt, wenn der Owner das Inventar freigegeben hat.

## Answer

Freigegeben vom Owner am 2026-11-14 nach drei Runden. Asset: [content-inventory.md](../content-inventory.md). Quellen: `index.html`, CV-PDF, Antworten des Owners, die lokalen Project-Repos, itch.io.

**Was die nächsten Tickets daraus mitnehmen:**
- **Featured: 7.** Connecting-Minds, A Fraction of Time, AUREA, ElevEntures-Mayhem, Free3D, Three.LS und neu ONA TECH (Global Game Jam 2026, Unreal). Damit weicht der Owner bewusst von „4–6“ aus den Grundsatzentscheidungen ab.
- **Archiv: 7** (Human Factors in VR, Allocation Algorithm, FSJ Film, Dying Light Workbench, AUREA Novel, Chess Game, Terrain Generator). Dazu kommt **Ready Prepper One** als Work in Progress ohne Details. Wie die Seite das zeigt, klären Inhaltsmodell und Seitenstruktur.
- **Projects haben oft mehrere Phasen und Quellen:** Connecting-Minds und A Fraction of Time begannen als Teamkurs und wurden als Solo-Thesis fortgeführt. Pro Project gibt es Repo, Thesis/Paper, Builds, Live-Demo oder Sketchfab, Note, Auszeichnung und Team mit eigener Rolle. Das ist Input für das Inhaltsmodell.
- **Alte Kategorien:** 8, nicht 9. Three.LS ist darin als „AR Game“ falsch einsortiert.
- **Bereits im Web:** A Fraction of Time (Unity WebGL) und AUREA Novel auf athaeck.github.io, Three.LS (Account bassadin), Chess Game (Account nickhaecker), Workbench auf Sketchfab. Das betrifft Embed-Architektur und Cutover.
- **Sprachen:** Die Inhalte der Live-Seite gibt es nur auf Englisch, die des CV nur auf Deutsch. Jede Seite braucht also mindestens eine Übersetzung.
- **Öffentliche CV-Fassung (Bauphase)** korrigieren: AUREA-Rolle „Entwicklung und Projektmanagement“ statt „Leitung“; Aufgaben als Jr. Full-Stack ergänzen (inkl. LLM-Arbeit seit März 2026); Tippfehler beheben; Skills ergänzen (C++, Unreal, PostgreSQL, Supabase).
- **Kontakt:** `nick.athaeck@gmail.com`, LinkedIn, GitHub `athaeck`, itch.io `athaeck-studios`; Porträt wie auf der Live-Seite. MFG-Seminar: 15.10.2026.

**Bewusst nicht im Inventar:** Wohnadresse, Telefon, Geburtstag, Matrikelnummern. Weitere lokale Projects bleiben auf Wunsch des Owners unerwähnt.
**Nicht ausgewertet:** Live-URLs wurden nicht abgerufen. Die GGJ-Spieleseite antwortete auf automatische Abrufe mit 403. Nachgetragen wurde sie aus Screenshots des Owners (`docs/ona-tech/`).
