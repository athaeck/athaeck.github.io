# Inhaltsinventar

Asset von [Inhaltsinventar](issues/07-inhaltsinventar.md). Faktenbasis für [Inhaltsmodell](issues/09-inhaltsmodell.md).

**Quellen:** `index.html` (Live-Seite, nur EN), das CV-PDF in `docs/about-me/` (Stand Okt 2025, nur DE), Angaben des Owners und, für §4, die lokalen Project-Repos.
**Bewusst nicht übernommen:** Wohnadresse, Telefon, Geburtstag. Template-Lorem (Blog, Testimonials, Clients, `index.txt`) ist ignoriert.

Markierungen: **⚠ Widerspruch** zwischen den Quellen · **✗ Fehler** in einer Quelle · **? fehlt/offen** · **UNVERIFIED** (Vermutung, nicht geprüft)

---

## 0. Stand und Entscheidungen

**Vom Owner entschieden** (Runde 1, 2026-11-14; Details stehen in den Abschnitten):
- Featured: **sieben**, nämlich die sechs aus dem Charting-Vorschlag plus ONA TECH (Runde 3; ★ in §4). Die Grundsatzentscheidung nannte 4–6.
- MFG-Seminar: 15.10.2026. Neues Project: „Ready Prepper One“ (§4, #14). E-Mail: `nick.athaeck@gmail.com`. itch.io: athaeck-studios.itch.io.
- Jr.-Full-Stack-Aufgaben, fehlende Zeiträume, Links und Allocation-Algorithm-Kontext: geliefert und eingearbeitet.
- Geburtstag: erscheint auf der neuen Seite nicht.
- Skills: um C++, Unreal, PostgreSQL und Supabase ergänzt.
- LLM-Arbeit: bei asellerate, seit März 2026.
- Porträt: das der heutigen Live-Seite (`portrait.*`).
- Runde 3: AUREA-Rolle „Entwicklung und Projektmanagement“; Three.LS-Anteil; ElevEntures-Mayhem mit 5 Personen und den Beiträgen des Owners (inkl. Weltall); weitere lokale Projects werden nicht erwähnt (ONA TECH ist das GGJ-Repo).

**Runde 2 (Repo-Auswertung, 2026-11-14):** §4 neu mit Details pro Project aus den lokalen Repos. Auf Wunsch des Owners ergänzt: ONA TECH (GGJ 2026), Quellen sind die itch-Seite, das lokale Repo und die GGJ-Spieleseite (Screenshots des Owners in `docs/ona-tech/`).

**Noch offen:** nichts. **Vom Owner freigegeben am 2026-11-14.** Spätere Korrekturen gehen direkt in diese Datei.

---

## 1. Person und Kontakt

| Feld | Wert | Quelle | Anmerkung |
|---|---|---|---|
| Name | Nick Philipp Häcker | beide | ✗ CV-Textlayer zerlegt Umlaute („Ha¨cker“), bekannt aus Grundsatzentscheidungen |
| Titel | „Full Stack Developer, Game Developer“ | index | Reihenfolge widerspricht dem Profil „Game Dev zuerst, Full-Stack als Beleg“ |
| Ort | Stuttgart, Germany | index | |
| E-Mail | nick.athaeck@gmail.com | Owner | Quellen uneinheitlich (`googlemail.com` im CV und im `mailto:`); Owner hat `gmail.com` gewählt |
| LinkedIn | linkedin.com/in/nick-haecker/ | beide | |
| GitHub | github.com/athaeck | beide | Ein zweiter Account `NickHaecker` hostet ältere Repos und die Chess-Live-Version |
| itch.io | athaeck-studios.itch.io | Owner | in keiner Quelle |
| Porträt | `assets/images/portrait/portrait.{jpg,png,webp}` | Repo | Owner: das der Live-Seite; `portrait_old.*` entfällt |
| Logo | `assets/images/logo/Logo.png`, `Logo.psd` | Repo | bleibt als Marke |

## 2. Bio und Profil

**About-Text (nur EN, index):** sechs Absätze. Kernaussagen:
- Leidenschaftlicher Game- und Full-Stack-Developer, Schwerpunkt Game Design und Programming.
- Mag neue Spielideen, Prototypen und unbekannte Mechaniken. Beispiel Bachelorarbeit: Zeitreise-Mechanik (Aktionen werden zur Laufzeit aufgezeichnet und später abgespielt).
- Soziale Aspekte in Spielen; Masterarbeit: asymmetrischer Multiplayer verbessert Kommunikation beim gemeinsamen Rätseln.
- Master an der HFU abgeschlossen, Bachelor dort auch.
- Unity bevorzugt, Erfahrung mit Unreal und Godot; C#, Java, Python, JS, TS; Web-Apps mit Vue und Nuxt.

✗ **Veraltet:** „through my work as a student trainee at asellerate“: seit Sept 2025 Jr. Full-Stack Developer.
? **Fehlt:** deutsche Bio.

**Services „What I'm doing“ (index, EN):**
| Service | Text |
|---|---|
| Game Programming | Writing clean and structured code that is easy to maintain and extend. |
| Narrative Design | Creating the world, characters and story to immerse the player. |
| Game Design | Designing the game mechanics, level design and user interface. |
| Web development | High-quality development of sites at the professional level. |

## 3. CV-Einträge

### Beruf

| Arbeitgeber | Rolle | Zeitraum | Beiträge | Anmerkung |
|---|---|---|---|---|
| asellerate GmbH | Jr. Full-Stack Developer | Sept 2025 – heute | Shop-Administration; Erweiterungen und Anpassungen einbauen und deployen; Anpassungen in der Preisberechnung; Elasticsearch-Indexer erweitert, damit Fahrzeug-Auswahloptionen genauer aggregiert werden; Produktentwicklung eines neuen PIM mit Anbindung an die TecDoc Data Receiver API; seit März 2026: System-Prompts erweitert, Context-Layer für einen LLM-Chat integriert | Quelle: Owner. „Preisberechnung“ gelesen aus „PReosberechnung“ |
| asellerate GmbH | Werkstudent Webentwicklung | Apr 2022 – Aug 2025 | Erweiterungen und Bugfixes Webshop; Kategorie- und Fahrzeugbühnen auf neues Design mit neuen Funktionen; Mapping eines Kategoriebaums für neue Kategorien; Warenkorb-Übertragung zu HubSpot; OEM-Landingpage; Facebook Pixel über Google Tag Manager; Mapping-Mechanismus für interne CMS-Verlinkungen | ⚠ index: Zeitraum „2013 — 2015“ (Template-Rest, falsch) |
| asellerate GmbH | Werkstudent Frontend-Entwickler | Sept 2020 – Mär 2022 | Erweiterungen und Bugfixes Webshop; Ladezeit-Optimierung; Cookiebot-Consent; Google Tag Manager | ✗ CV: „Google Tage Manager“ |
| asellerate GmbH | Praxissemester Webentwicklung | Mär 2020 – Aug 2020 | Vue-basierter E-Commerce-Shop; Headless-CMS für Landingpages; SEO-Optimierungen | |

### FSJ

| Träger | Rolle | Zeitraum | Beiträge | Anmerkung |
|---|---|---|---|---|
| Jugendhilfe Korntal (Bietigheim-Bissingen) und Emma-Reichle-Heim (Stuttgart-Hedelfingen) | Freiwilliges Soziales Jahr | Sept 2017 – Aug 2018 | Jugendhilfe: Hausaufgabenhilfe, Unterstützung der Kolleg:innen, Freizeitbetreuung. Emma-Reichle-Heim: Tagespflege für Menschen mit Demenz, Hauswirtschaft, Alltagsbegleitung, Aktivierungsprogramme | Beide Quellen führen es unter Berufserfahrung. Art (Beruf oder Ehrenamt) klärt das Inhaltsmodell |

### Ehrenamt (nur CV)

| Organisation | Rolle | Zeitraum | Beiträge |
|---|---|---|---|
| Evangelischer Reisedienst e. V. Stuttgart (ERD) | Ehrenamtlicher Freizeitbetreuer | Mai 2016 – heute | Vorbereitung, Begleitung und Betreuung von Sommer- und Winterfreizeiten |
| HFU, Fakultät Digitale Medien | Mitglied der Studienkommission Medieninformatik Master | Sept 2023 – Aug 2024 | Weiterentwicklung des Studiengangs |
| HFU, Fakultät Digitale Medien | Mitglied des Fakultätsrats und der Studienkommissionen MI Bachelor/Master und Musikdesign Master | Sept 2019 – Aug 2021 | Veranstaltungen der Fachschaft organisieren und unterstützen; Schlichtungsgespräche zwischen Studierenden und Dozierenden; Fakultätsprozesse und Studiengänge weiterentwickeln |

### Ausbildung

| Einrichtung | Abschluss | Zeitraum | Note | Anmerkung |
|---|---|---|---|---|
| HFU | M.Sc. Medieninformatik (EN: Computer Science in Media) | Mär 2023 – Aug 2025 | 1,6 | Kurse: ML, Deep Learning, Algorithmen, Datenanalyse, Game Studies, AR, VR, Computer Vision; ⚠ „Netzwerke“ steht im CV beim Master, auf der Live-Seite beim Bachelor |
| HFU | B.Sc. Medieninformatik | Mär 2019 – Feb 2023 | 1,5 | Kurse: Mathe, Physik, BWL, Java, Webentwicklung, Computergrafik, Computer Vision, Game Development, 3D-Modellierung, Game Analysis, Game Narration |
| Evangelisches Mörike-Gymnasium Stuttgart | Allgemeine Hochschulreife | 2009 – 2017 | 3,4 | ✗ beide Quellen: „Evenagelisches Mörike Gymansium“ |
| August-Lämmle-Schule Leonberg | Grundschule | 2005 – 2009 | – | entfällt, kein CV entry (Owner, 2026-11-15) |

Noten erscheinen laut Grundsatzentscheidung nur im CV-PDF (Highlight wie Bachelorarbeit 1,1 optional auf der Seite).

## 4. Projects

Alte Kategorien der Live-Seite: Film, 3D Game, 2D Game, VR Game, AR Game, Modelling, Paper, Free (**8** plus „All“).
Thumbnails liegen unter `assets/images/thumbnails/`. ★ = Featured (vom Owner bestätigt); alle anderen gehen ins Archiv.
Quellen ab Runde 2: lokale Repo-Klone unter `E:/Projekte/` (Git-Historie, READMEs, Abgaben, Thesis-LaTeX) sowie GitHub für Three.LS und AUREA Novel. Live-URLs sind **nicht** abgerufen (UNVERIFIED, ob sie laden). Das letzte Commit-Datum vieler Repos ist Sept 2025, weil sie da migriert wurden. Es taugt also nicht als Projektende.

### Übersicht

| # | Project | Zeitraum | Kontext | Team | Links / Live | Thumbnail | Auszeichnung / Note | Alte Kat. |
|---|---|---|---|---|---|---|---|---|
| 1 ★ | **Connecting-Minds** | WS 2023/24 – Jul 2025 (Thesis-Abgabe 30.07.2025) | Kurs Interaktionsdesign (Team), dann Masterarbeit (allein) | Team, dann solo | github.com/athaeck/connecting-minds-masterarbeit | `connecting-minds-thumbnail.png` | Note 2,0 | 3D Game |
| 2 ★ | **A Fraction of Time** | WS 2021/22 – Feb 2023 (Thesis-Abgabe 28.02.2023) | Gamedesign-Workshop (Team), dann Bachelorarbeit (allein) | Team, dann solo | github.com/athaeck/a-fraction-of-time-bachelorarbeit · **WebGL:** athaeck.github.io/A-fraction-of-time/Release/index.html | `a-fraction-of-time-thumbnail.png` | Note 1,1 | 3D Game |
| 3 ★ | **AUREA**: Augmented Reality Arena | Okt 2020 – Jul 2021 | Projektstudium (WS 20/21 + SS 21) | 6 | github.com/athaeck/AUREA | `aurea-thumbnail.png` | **Medienpreis der Fakultät DM** (Jul 2021, Jury-Zitat §5); Note 1,4 | AR Game |
| 4 ★ | **ElevEntures-Mayhem** | SS 2023 (Jul 2023) | GameDesign-Modul MIM/DIM, 2. Mastersemester, wohl als Gamejam | 5 | github.com/athaeck/ElevEntures-Mayhem | `eleventures-mayhem-thumbnail.png` | **Gamescom 2023** am HFU-Stand (nur CV); Note 1,3 | VR Game |
| 5 ★ | **Free3D**: Free-viewpoint 3D video creation | Sept 2023 – Jul 2024 | Studentisches Forschungsprojekt | 6 + Betreuer | Repo: github.com/HFU-DM-free3D/free3d.github.io · Seite: hfu-dm-free3d.github.io/free3d.github.io/ | `free-3d-thumbnail.png` | Note 1,3; Paper 2024 | Paper |
| 6 ★ | **Three.LS** | Okt 2021 – Feb 2022 | Studienprojekt | 5 | github.com/athaeck/Three.LS · **Live:** bassadin.github.io/Three.LS/ (+ `ar.html`) | `three-ls-thumbnail.png` | Note 1,3 | ✗ AR Game |
| 7 | **Human Factors in VR** | Mai – Jul 2023 | Paper | 5, **Owner Erstautor** | github.com/athaeck/AccoVergKonfPaper (Owner) · Testszene: github.com/athaeck/HuFacinExpertenTest | `acc-verg-conflict-thumbnail.jpg` | Note 2,0 | Paper |
| 8 | **Allocation Algorithm** | Dez 2019 – Jan 2021 | Abgabe im fachdidaktischen Praktikum Mathe 2 (Wahlpflicht); Zweck: Zuordnung ins Projektstudium | solo | github.com/athaeck/Allocation-Algorithm | ? keins; Kandidat `Konzeption.svg` | Note 1,3 | Free |
| 9 | **FSJ Film**: Kurzfilm | Sept 2017 – 2018 (während des FSJ) | FSJ-Seminar | ? | youtu.be/tfsjTtj1E9U | `fsj.png` | – | Film |
| 10 | **Dying Light Workbench Asset** | SS 2021 (Abgabe Jul 2021) | Modul DACG | solo | github.com/athaeck/WorkingStation-Dying-Light · **3D-Viewer:** Sketchfab | `workbench-thumbnail.png` | – | Modelling |
| 11 | **AUREA Novel**: Visual Novel | Abgabe Feb 2022 | Kurs Visual Novel (Zertifikat DIGITAL GAMES, UNVERIFIED) | solo | github.com/athaeck/VisualNovel · **Live:** athaeck.github.io/VisualNovel/AUREA_NOVEL/ | `aurea-novel-thumbnail.png` | – | 2D Game |
| 12 | **Chess Game** | SS 2021 (Abgabe Jul 2021) | Modul PRIMA | solo | github.com/athaeck/Chess-Game · **Live:** nickhaecker.github.io/PrimaSS21Endabgabe/ChessGame.html | `chess-game-thumbnail.PNG` | – | 3D Game |
| 13 | **Terrain Generator** (DVMP) | Abgabe Jul 2022 | Modul DVMP | 4 | github.com/athaeck/DVMP | `dvmp-thumbnail.png` | – | Free |
| 14 | **Ready Prepper One** (Arbeitstitel) | laufend | Work in Progress; zuerst entsteht ein Proof of Concept | – | – | – | – | – |
| 15 ★ | **ONA TECH** | 30.01. – 01.02.2026 (GGJ-Wochenende), Polishing bis Anfang März 2026 | Global Game Jam 2026, Jam Site „GGJ26 @ Stadtbibliothek Stuttgart“, Thema „Mask“ | 7 | **itch.io:** draser-game.itch.io/ona-tech (Windows-Download) · GGJ: globalgamejam.org/games/2026/invisibletest-9 | ? keins; itch-Galerie hat 4 Bilder | – | (neu) |

### Details pro Project

**1 ★ Connecting-Minds**
- *Konzept:* asymmetrisches AR-/3D-Adventure für zwei Rollen, Player und Watcher, die Rätsel gemeinsam lösen. Forschungsfrage: „Kann eine spielbasierte Umgebung für die Untersuchung und Verbesserung von Kommunikation zwischen zwei oder mehreren Personen realisiert werden?“
- *Entstehung:* erstes Konzept im Kurs Interaktionsdesign, 1. Mastersemester WS 2023/24, im Team. In den Team-Repos (Okt 2023 – Sept 2024) stammt der Unity-Player etwa zur Hälfte von einer weiteren Person. Die Masterarbeit führt das Projekt allein in einem eigenen Repo weiter (Aug 2024 – Sept 2025). Betreuer: Prof. Dr.-Ing. Thomas Schlegel und Prof. Dipl.-Ing. Jirka Dell'Oro-Friedl.
- *Beiträge laut CV:* Vergleichsspiele analysiert; WebSocket-Schnittstelle auf Express.js; zwei Multitouch-Anwendungen für die Spielerrollen; Evaluation (Usability, Spielerfahrung, Motivation, Belastung) und Kommunikationsanalyse.
- *Tech:* Unity 2022.3 LTS (URP, Input System, Cinemachine); der Watcher nutzt ARCore und das XR Interaction Toolkit. Node 20, Express 5 und ws/socket.io bilden das Relay. Im Team-Repo gibt es außerdem einen Mobile-Player in Vue 3 (ob er in der Thesis eine Rolle spielt, ist UNVERIFIED).
- *Builds:* Watcher als Android-APK, Player als RAR (Plattform UNVERIFIED). Ein Web-Build existiert nicht.
- *Medien:* Thesis-Repo, Ordner `content/pictures/`: `MazeScape.jpg`, `MazeScape_Level02.jpg`, `Abschnitt_01 - Player.png`, `Abschnitt_01 - Watcher.png`, `CM-Archticture.png` (Architekturdiagramm), Rätseldesign-Grafiken.
- ⚠ Der CV-Zeitraum „Sept 2024 – Aug 2025“ deckt nur die Thesis ab, das Project beginnt im WS 2023/24. Die alte Kategorie „3D Game“ verschweigt den AR-Anteil.

**2 ★ A Fraction of Time**
- *Konzept:* Der Spieler erzeugt mehrere parallele Zeitlinien seiner selbst und löst damit Rätsel („Aufnahmen des Chronologen“). Leitfragen der Thesis: Wie lässt sich das Spielkonzept als leicht verständliches Tutorial vermitteln? Wie komplex dürfen Rätsel sein, damit der Spieler maximal gefordert wird?
- *Entstehung:* Konzept und erster Prototyp entstanden im Gamedesign-Workshop WS 2021/22 im Team (Repo ab Okt 2021 mit fünf weiteren Committern). In der Bachelorarbeit hat der Owner den Prototyp technisch neu entwickelt, erweiterbar gemacht und um ein Tutorial ergänzt. Betreuer: Prof. Jirka Dell'Oro-Friedl und Prof. Dr. Gabriel Rausch.
- *Beiträge laut CV:* Zeitreisemechaniken in Vergleichsspielen analysiert; Zeitreisemechanik zur Laufzeit; Level überarbeitet und um ein zweites Szenario erweitert; Evaluation per Thinking Aloud und eigenem Fragebogen.
- *Tech:* Unity mit URP, Localization, Animation Rigging, Sequences und Cinemachine; Singleplayer ohne Server. ⚠ Die Unity-Version weicht je Quelle ab: Thesis 2021.3.16f1, Demo-Repo 2022.3.45f1, Ur-Prototyp 2020.3.22f1.
- *Builds:* Windows- und Mac-Demos (Releases alpha bis delta, delta ist der aktuelle Stand). Laut README gibt es einen **spielbaren WebGL-Prototyp** auf GitHub Pages.
- *Medien:* Thesis-Repo, Ordner `content/pictures/`: `Overview.jpg`, `Labor - A Fraction of Time.jpg`, `Game_Atmo.jpg`, `Ghost.jpg`, `Chronologe.jpg`, `Merge.jpg`. Dazu `A-fraction-of-time/one-pager.png`.

**3 ★ AUREA**
- *Konzept (Abgabe WS 20/21):* rundenbasiertes Team-Kampfspiel für Android in einer mystischen Fantasywelt mit AR-Platzierung. Ziel des Teams: Game Design und Development lernen, dazu AR und Machine Learning.
- *Team laut beiden Abgaben (26.01.2021 und 09.07.2021):* Dennis Hawran (Entwicklung/Projektmanagement); Nick Häcker und Jonathan Schnee (Entwicklung); Leonie Schwall, Sebastian Pfeiffer und Lukas Blea (Modeling/Konzeption). Der Owner hat die Kapitel Shopsystem, Inventarsystem und Aktueller Stand geschrieben.
- **Rolle (Owner):** Entwicklung und Projektmanagement. Die Abgaben nennen Dennis Hawran für „Entwicklung/Projektmanagement“ und den Owner für „Entwicklung“. Das CV sagt „Leitung des Projekts“ und sollte in der öffentlichen Fassung an die Owner-Formulierung angepasst werden.
- *Beiträge laut CV:* Konzeption der Aureas und ihrer Fähigkeiten pro Stufe; Hub-Insel (Gestaltung, Partikelsysteme, Shop, Inventar).
- *Tech:* Unity mit AR Foundation/ARCore, Photon PUN (rundenbasiert über PunTurnManager) und URP. Ein ML-Agents-Ordner liegt im Projekt, ob er genutzt wird, ist UNVERIFIED. Das Repo wurde später auf Unity 2022.3 gehoben.
- *Remake `athaeck-aurea`* (Apr 2024 – Sept 2025, nur der Owner): Player und Watcher in Unity 2022.3 mit AR Foundation, ARKit und XRI, dazu ein eigener Node/ws-Server statt Photon. Dass es ein Remake ist, ist UNVERIFIED, weil kein README existiert. Es gibt einen Commit „add medienpreis“.
- *Builds:* keine gefunden.
- *Medien:* Team-Repo: `Startbildschirm.png`, `Inseln/SkyIsland.png`, `Inseln/templeIsland2.png`, `AureaImages/Dragon.png`, `AureaImages/Steingolem.png`, `Charactersheets/*.png`.

**4 ★ ElevEntures-Mayhem**
- *Konzept (Releases-README):* ein Aufzug dient als Portal. Jedes Level ist ein Minispiel in einer anderen Welt, das ein Aufzugslautsprecher kommentiert.
- *Kontext:* GameDesign-Modul der Studiengänge MIM und DIM im 2. Mastersemester. ⚠ Die Live-Seite spricht von einem „Gamejam“, im Code heißt ein Objekt „ElevatorControllerGameJam“. Das Modul lief also wohl als Jam (UNVERIFIED). Team: 5 Personen (Owner), Teamname „Ferdi, Nick and the Js“.
- *Minispiele im Code:* Bowling, Bogenschießen, Party und Weltall, dazu die Szenen Zug, Aufzug und Tutorial.
- *Beiträge des Owners (Owner, Runde 3):* Bowling-, Party- und Weltall-Level, Kernmechanik des Aufzugs, Core-Gameloop. Laut CV außerdem Projektvorgaben und Feature-Branch-Merges.
- *Tech:* Unity 2021.3, OpenXR, XR Interaction Toolkit, HTC Wave (Android-VR-Headset, UNVERIFIED welches Modell), URP.
- *Builds:* Windows als RAR. ⚠ Das README nennt auch einen Android-Build, lokal fehlt er.
- *Gamescom 2023:* steht nur im CV, in keinem Repo.
- *Medien:* ? keine im Repo, nur das Thumbnail der Live-Seite.

**5 ★ Free3D**
- *Ziel (Abstract der Projektseite):* Wie weit kommt man mit minimaler Ausrüstung (drei Azure Kinect) zu hochwertigen 3D-Szenen? Gedacht ist das für die Online-Lehre.
- *Team:* Felix Brunn, Jan Christmeier, Nick Philipp Häcker, Laura Christin Stempfle, Lukas Willmann, Simon Zakowski. Betreuung: Prof. Dr. Uwe Hahne.
- *Owner-Anteil:* vor allem die **Recorder-/Operator-Middleware** (75 von 88 Commits): ein Node/TypeScript-WebSocket-Server und ein Operator-Client in Vue 3/Vuetify, die die Aufnahmen steuern. Dazu etwa ein Drittel der Kalibrierungs-Commits und Arbeit an der Projektseite.
- *Tech:* Azure Kinect mit Sync-Kabeln, ArUco/ChArUco-Kalibrierung, Open3D, Gaussian Splatting (Unity-Visualisierung auf Basis von UnityGaussianSplatting), dynamische NeRFs.
- *Live:* die Projektseite; das Paper (2024) liegt als PDF im Repo.
- *Medien:* Projektseite `static/videos/free3d-website-teaser-video.mp4`, `000.mp4` bis `005.mp4`, `Zeitraffer_cut.mp4`; Paper-Repo `Pictures/ResPic1.png` bis `ResPic4.png`, `Pointcloud_Kinects.png`, `dgs_3Cams.jpg`.

**6 ★ Three.LS**
- *Ziel:* Bäume und pflanzenartige Strukturen per L-System in three.js erzeugen (three.js bestätigt).
- *Team:* 5 GitHub-Contributors (athaeck, bymarcx, Bassadin, LukasBrauschHFU, manuel-pross).
- *Live-Demo:* deutsches UI mit Ausgangssatz, Iterationen, Drehwinkel, Schrittlänge, Export als JSON/OBJ und Upload, dazu eine **AR-Version** (`ar.html`). Die Demo liegt unter Bassadins Account; ob die Szene rendert, ist UNVERIFIED.
- Die alte Kategorie „AR Game“ erklärt sich durch die AR-Version, bleibt aber schief: Three.LS ist ein Werkzeug, kein Spiel.
- *Beitrag des Owners (Owner):* die Erzeugung der 3D-Cubes in den bestehenden L-System-Algorithmus programmiert.

**7 Human Factors in VR**
- *Studie:* Ist der Akkommodations-Vergenz-Konflikt in einer VR-Entspannungsszene im EEG messbar? Ein sich nähernder Würfel löst ihn aus. Vorläufiges Ergebnis: Alpha- und Betawellen nehmen zu.
- *Team:* Paper im IEEE-Format mit 5 Autor:innen, der Owner ist **Erstautor**: Nick Philipp Häcker, Suzan Johannes, Patrick Kaserer, Johann Schulenburg, Lukas Willmann.
- *Beiträge laut CV:* VR-Szene um das Referenzobjekt erweitert; EEG-Aufnahme und Objektbewegung koordiniert; EEG-Daten gesammelt und visualisiert.
- *Tech:* Unity 2020.3, OpenXR, XR Interaction Toolkit, Mixed Reality OpenXR, URP; Analyse in Python (ICA).
- *Medien:* Paper-Repo `assets/00.jpg` bis `02.jpg`, `probandentest_00.jpg`, `probandentest_01.jpg`, `Collection3DMapping.jpg`, `ThetaT8.png`, `Signifikanzen.png`.

**8 Allocation Algorithm**
- Das README bestätigt den Owner: Der Algorithmus ordnet Studierende nach Job-Wunsch, Studiengang und Priorität dem Projektstudium zu. Bis dahin haben Semestersprecher das von Hand gemacht. Entstanden ist er als Abgabe im fachdidaktischen Praktikum Mathe 2 (Wahlpflicht).
- *Tech:* C#-Konsolenanwendung, .NET Core 3.1, Newtonsoft.Json. Das Konzeptdiagramm ist vom 20.01.2021 datiert.

**10 Dying Light Workbench Asset**
- Game-Look-Analyse von Dying Light, daraus ein eigenes Asset im Stil des Spiels (SS 2021).
- Interaktiver **3D-Viewer auf Sketchfab** (sketchfab.com/3d-models/workingstation-dying-light-bcdee0989ab440cc939a3a475c36760f).
- Blender und Substance Painter nennt das README nicht. Die Texturnamen deuten auf einen Substance-Export (UNVERIFIED).
- *Medien:* `Werkbank00.PNG` bis `Werkbank03.PNG`, `Visualitaet_und_Technik_00.jpg` bis `_03.jpg`, `Konzept_00.jpg`.

**11 AUREA Novel**
- Visual Novel in FUDGE Story. Steuerung: F8 speichern, F9 laden, M öffnet das Menü, Linksklick führt weiter. Bezug zur Welt von AUREA: UNVERIFIED.

**12 Chess Game**
- Schach für zwei Spieler an einem Rechner, gesteuert per Tastatur, Sound zuschaltbar. Gebaut mit FUDGE, TypeScript und OimoPhysics. Designdokument und Manual liegen im Repo, Bilder gibt es keine.
- ⚠ Die Live-Version liegt unter dem Account **NickHaecker** (Repo PrimaSS21Endabgabe), die Live-Seite verlinkt dagegen github.com/athaeck/Chess-Game.

**13 Terrain Generator (DVMP)**
- Blender-Add-on, das aus einem farbcodierten PNG ein Terrain erzeugt (1 Pixel entspricht 20 × 20 m) und es mit Bäumen, Büschen, Gras und Steinen bestückt. Läuft ab Blender 3.0 mit Python und OpenCV; README und Script erwähnen Geometry Nodes.
- *Team (Add-on-Header):* Nick Philipp Häcker, Jasmin Meyer, Laura Moser, Violetta Pyralov.
- *Medien:* `Pattern/HFU_render.png`, `Pattern/result.png`, `Pattern/pattern_20x20.png`, `Abschlusspräsentation.pdf`.

**15 ★ ONA TECH**
- *Konzept (itch.io):* „The science fiction puzzle adventure reflects on the use of AI and being human.“ Die Figur Miru hat einen weltweiten Blackout verursacht und muss ins Programm ONA TECH, das Testpersonen mit Masken koppelt. Die Maske lässt sich mit M aktivieren, darf aber nur kurz getragen werden, sonst übernimmt sie den Körper. Fünf Rätsel-Level, Spielzeit ein paar Minuten, First/Third Person, Steuerung mit Tastatur und Maus.
- *Kontext:* Global Game Jam 2026 in der Stadtbibliothek Stuttgart, Thema „Mask“. Im Repo stammen 128 von 143 Commits vom 31.01. und 01.02.2026, der Rest ist Polishing bis 04.03.2026. Auf itch.io ist das Spiel seit 01.02.2026 als „Prototype“ veröffentlicht, mit dem Tag „No generative AI was used“.
- *Team (itch-Credits, 7):* Elena Marouli (Writing), Nadine Winkle (UI), Marie Wrodnigg (Environment Art), Programming: **Nick Philipp Häcker**, Mario Kromer, Julius Dorsel, Gerhard Draser. Vom Owner stammen 36 von 143 Commits.
- *Tech:* Unreal Engine 5.6 (C++-Modul `CreepyMaskedGame`) und Blender. Das lokale Repo `E:/Projekte/GGJ/CreepyMaskedGame` gehört laut Startdatum, Teammitgliedern und dem Exe-Namen auf itch.io zu diesem Spiel.
- *Builds:* nur Windows (`OnaTech.zip`, 712 MB, startet über `CreepyMaskedGame.exe`). Einen Web-Build gibt es nicht.
- *Medien:* GGJ-Seite: Titel-Artwork (ONA-TECH-Logo), Screenshot „First contact with mask ONA“, zwei weitere Spielbilder, Teamfoto mit 7 Personen (auf der Seite nur mit Einverständnis aller Abgebildeten). itch-Galerie: 4 Bilder plus 3 in der Beschreibung. Heruntergeladen ist noch nichts.
- *GGJ-Spieleseite (Screenshots des Owners):* Jam Site „GGJ26 @ Stadtbibliothek Stuttgart“, Thema „Mask“; Tags 3D, Adventure, First-Person, Puzzle, Third Person; Englisch; MS Windows; Unreal Engine; keine Diversifier angegeben. Die Story ist dort ausführlicher: Der Alltag besteht aus Gesprächen mit dem Assistenten SuAI. Miru will ein echtes Gespräch mit Menschen führen, macht sich dafür sichtbar, löst so den weltweiten Blackout aus und wird verhaftet. 7 Jammer-Accounts, einer davon athaeck.
- **Featured** (Owner, Runde 3): das einzige Unreal-Project und das jüngste abgeschlossene.

### Was für Project pages noch fehlt

- **Bereits spielbar oder interaktiv im Web:** A Fraction of Time (Unity WebGL), Three.LS, AUREA Novel, Chess Game; Workbench über Sketchfab. A Fraction of Time und AUREA Novel liegen auf athaeck.github.io und hängen damit am Cutover. Three.LS (bassadin) und Chess Game (nickhaecker) liegen auf anderen Accounts.
- **Eigene Rolle in Teamprojekten:** für alle Teamprojekte geklärt. Three.LS bleibt Featured, obwohl der eigene Anteil schmal ist (Owner-Entscheidung).
- **Medien:** Bei ElevEntures-Mayhem und Chess Game gibt es außer dem Thumbnail nichts. Die Kandidaten oben hat noch niemand gesichtet, sie sind nur nach Dateinamen ausgewählt.

## 5. Auszeichnungen, Zertifikate, Teilnahmen

| Titel | Vergeben von | Datum | Inhalt | Anmerkung |
|---|---|---|---|---|
| **Medienpreis** für AUREA | Fakultät Digitale Medien, HFU | Jul 2021 | Jury: „Die Gruppe hat ein rundenbasiertes mobiles Multiplayer AR-Spiel von A bis Z entworfen und umgesetzt. Das Projekt ist deshalb attraktiv, da sich die Studierenden zum einen mit der Gestaltung auseinandergesetzt und zum anderen die Spielmechanik ausgefeilt haben. Auch technische Hürden, die bei Netzwerkspielen auftreten, sind gelöst worden, sodass am Ende des Projektes ein funktionsfähiges mobiles AR-Spiel im Netz gespielt werden konnte.“ | ? EN-Fassung des Zitats fehlt |
| **ElevEntures-Mayhem auf der Gamescom 2023** | HFU-Stand | Aug 2023 (UNVERIFIED, Gamescom-Termin) | Projekt wurde dort vorgestellt | Im CV nur als Projekt-Hinweis, nicht in dieser Sektion |
| **Teilnahme GiG xLab** | MFG Baden-Württemberg | 10./11. Okt 2025 | Gamification-Ansatz zur Steigerung des Nutzerengagements in der App **Idememory** (Biografiearbeit mit Menschen mit Demenz) erarbeitet und präsentiert | Pitch-Video laut Owner: `GiG xLab_Idememory_Pitchvideo.mp4` im MFG-Share (mfg-bw.unternehmens.cloud). Share-Links können ablaufen, deshalb das Video für die Seite selbst hosten (UNVERIFIED, ob die Rechte das erlauben). Der YouTube-Link im CV ist im Textlayer zerrissen (`youtu.be/QwA4igG5 yA`) |
| **MFG-Akademie-Seminar** „Aktuelle KI-Tools strategisch nutzen“ | MFG | 15.10.2026 | – | nur vom Owner; in keiner Quelle |
| **Zertifikat Kompetenzfeld DIGITAL GAMES** | Fakultät Digitale Medien, HFU | Dez 2022 | Computerspielanalyse / Narration in Games; Prototyping interaktiver Medien-Apps und Games; Gamedesign Workshop; Digital Asset Creation for Games; Echtzeit-Computergrafik; Visual Novel | |
| **Cybersicherheitstag** des Landtags BW (Teilnahmebestätigung) | Landtag Baden-Württemberg | 6. Okt 2022 | Betreuung des Awareness-Lernspiels zu Phishing-Mails | ✗ CV: „Phising“ |

## 6. Skills, Sprachen, Hobbys

**Skills laut CV, vom Owner ergänzt um C++, Unreal, PostgreSQL, Supabase (Kategorien wie im CV):**
| Kategorie | Einträge |
|---|---|
| Sprachen | Python, Java, TS/JS, C#, C++ |
| Game Engines | Unity, Unreal |
| Frameworks | Vue.js, React, Node.js, Express.js |
| Tools | Docker |
| Protokolle | REST, WebSockets |
| Datenbanken | MongoDB, CouchDB, Elasticsearch, Redis, PostgreSQL, Supabase |
| Agile Methoden | Scrum, Kanban |

**Skills laut Live-Seite:** Prozentbalken (entfallen laut Grundsatzentscheidung): Programming & Game Engines, Web Development, Game Design, Narrative Design, 3D Modelling/Rigging/Animation.

⚠ **Lücken im CV gegenüber Bio und Projects:** Nuxt, Godot (Bio); Blender, Substance Painter (Workbench, Terrain Generator); WebGL/three.js (Three.LS, UNVERIFIED); FUDGE (AUREA Novel, Chess Game); Gaussian Splatting/NeRF (Free3D). Die Live-Seite listet keine konkreten Technologien außer in der Bio.

**Sprachen:** Deutsch (Muttersprache), Englisch (B2). Nur CV.

**Hobbys und Interessen** (nur CV): eigene Spielprototypen; Outdoor und Wandern; Fußball und Sport allgemein; Musik, Konzerte, Festivals.



## 7. Sprachabdeckung

| Inhalt | DE | EN |
|---|---|---|
| Bio, Services, Project-Kurztexte | – | index |
| CV-Einträge (Beruf, Ausbildung, FSJ) | CV | index (ohne Ehrenamt) |
| Ehrenamt, Auszeichnungen, Skills, Sprachen, Hobbys | CV | – |
| Project-Details (Beiträge) | CV | – |

Jede Seite der neuen Website braucht also mindestens eine Übersetzung, die es heute nicht gibt.
