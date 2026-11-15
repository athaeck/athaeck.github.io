# Grundsatzentscheidungen aus dem Charting

Type: grilling
Status: resolved
Blocked by: –

## Question

Was ist das Ziel dieses Efforts, wie weit reicht der Scope, und welche Grundsatzentscheidungen stehen schon fest, bevor die Map geteilt wird?

## Answer

Geklärt im Charting-Grilling am 2026-11-14 (drei Runden mit dem Owner).

**Ziel und Scope**
- Ziel ist eine übergabefähige Spec. Der Bau ist ein eigener Effort danach.
- Zielgruppe: Game-Studios und Recruiter **und** Web-Arbeitgeber. Game Dev ist das Profil, Full-Stack der Beleg (die Nuxt-Seite selbst beweist es).
- Inhalte: About, CV, Projects, Kontakt. Jedes Project bekommt eine Project page.
- Projects: **4–6 Featured** mit voller Project page (Vorschlag: Connecting-Minds, A Fraction of Time, AUREA, ElevEntures-Mayhem, Free3D, Three.LS), der Rest kompakter im **Archiv**. Die Liste wird im Inhaltsinventar finalisiert.
- Vom Alten bleibt nur das **Logo** als Marke. Alles andere ist frei; keine Skill-Prozentbalken.
- Wie stark sich die Seite abhebt: Variante **(b)**. Recruiter erfassen in 10 s das Wichtigste, dazu gibt es **einen Signature-Moment mit Game-Charakter**.

**Sprachen**
- DE + EN. **DE ist Standard unter `/`, EN liegt unter `/en/`** (`prefix_except_default`).
- Keine automatische Weiterleitung nach Browsersprache, stattdessen Sprachumschalter + `hreflang`.
- Übersetzung: KI-Vorübersetzung, der Owner reviewt.

**Inhalte und Daten**
- Inhalte liegen im Repo (Nuxt Content, Markdown/YAML pro Sprache), kein CMS. Das Modell ist so strukturiert, dass es später 1:1 auf Strapi-Collection-Types passt, ohne Abstraktionsschicht vorab.
- Persönliche Daten auf der Seite: nur Stadt (Stuttgart), E-Mail, LinkedIn, GitHub. **Kein** Geburtstag, keine Adresse, kein Telefon.
- Noten stehen nur im CV-PDF; ein Highlight (z. B. Bachelorarbeit 1,1) darf auf die Seite, wenn es ins Storytelling passt.
- Auszeichnungen prominent: Medienpreis AUREA (mit Jury-Zitat), ElevEntures-Mayhem auf der Gamescom 2023, GiG xLab (MFG, Okt 2025). Dazu das MFG-Akademie-Seminar „Aktuelle KI-Tools strategisch nutzen“ am 15.10.202? (Jahr klärt [Inhaltsinventar](07-inhaltsinventar.md)).
- Kontakt: `mailto:` + Profil-Links (GitHub, LinkedIn, ggf. itch.io). Ein Formular kommt in Phase 2.
- Impressum + Datenschutzerklärung sind Pflicht. Kein Tracking zum Start, also kein Consent-Banner.

**CV**
- CV-Seite mit Print-Stylesheet, dazu **Download maschinenlesbarer PDFs (DE + EN)**. Quelle bleibt der LaTeX-CV des Owners.
- Die öffentliche Fassung muss: Adresse und Telefon entfernen, den Textlayer reparieren (Umlaute werden heute zerlegt: „Häcker“ → „Hacker ¨“; Ursache vermutlich fehlendes `fontenc`/`cmap`) und komprimiert sein (heute 4,7 MB, fast nur das Foto). Erstellt wird sie in der Bauphase.
- Das rohe CV kommt **nie** ins Repo: `docs/about-me/` ist gitignored.

**Embeds**
- Die Spec legt die **Embed-Architektur für Unity WebGL** fest. Unreal und der Einbau eines konkreten Spiels sind Phase 2.

**Technik und Betrieb**
- Rendering: Nitro `node-server`, alle Seiten vorgerendert über `routeRules` → [ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md).
- Health: `GET /health` → `200 {"status":"ok","version":"<commit>"}`, nur Liveness. Wird von Docker `HEALTHCHECK` und Coolify genutzt.
- Deploy: **ein Dockerfile** für beide Wege (Forgejo → Coolify-Build; lokal bauen → eigene Registry → Server). Kein GitHub-Build; der GitHub-Pages-Workflow wird beim Cutover abgelöst.
- Qualitäts-Gate (Lint, Typecheck, Prerender) läuft im Build-Stage des Dockerfiles, kein separates CI.
- Qualitätsziele: Lighthouse ≥ 95 mobil in allen 4 Kategorien, WCAG 2.2 AA, Inhalte ohne JavaScript lesbar.
- Repo: dieses Repo, Branch `multi-language-nuxt`. Es zieht nach **Forgejo (privat)** und wird dort umbenannt; die statische Seite wird beim Cutover ersetzt.
- Domain: **athaeck.de**.

## Comments

- 2026-11-15 (Agent, über [Abgleich mit athaeck-infra](20-abgleich-infra.md)): Zwei Punkte sind nachgeschärft.
  - **Repo:** Es zieht mit der vollen Historie als `athaeck.de` nach Forgejo, und `multi-language-nuxt` wird dort `main`. Auf GitHub bleibt `athaeck.github.io` nur mit den Weiterleitungsseiten.
  - **Deploy:** Zum Start gibt es nur einen Weg: Forgejo → Coolify, gebaut auf dem öffentlichen Server. „Lokal bauen → eigene Registry“ kommt erst mit dem Runner-Server der Infra, denn in Ausbaustufe 1 bleibt die Registry leer. Das eine Dockerfile bleibt so gebaut, dass es auch für eine andere Plattform bauen kann.
