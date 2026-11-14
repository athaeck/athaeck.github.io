# Map: Nuxt-Portfolio athaeck.de

Label: wayfinder:map

## Destination

Eine übergabefähige Spec (`.scratch/nuxt-portfolio/spec.md` + ADRs in `docs/adr/` + `GLOSSARY.md`) für das mehrsprachige (DE/EN) Nuxt-Portfolio auf **athaeck.de**: ein Docker-Image mit `/health`, deploybar über Forgejo → Coolify oder lokalen Build → eigene Registry. Die Map ist am Ziel, wenn vor dem Bauen nichts mehr zu entscheiden ist.

## Notes

- **Domäne:** persönliches Portfolio (Game Dev als Profil, Full-Stack als Beleg). Vokabular steht in `GLOSSARY.md` (Project, Project page, Embed, CV); Entscheidungen mit Lock-in in `docs/adr/`.
- **Inhaltsquellen:** `index.html` (echte Inhalte) und das CV-PDF in `docs/about-me/` (gitignored). `index.txt`, Blog, Testimonials und Clients sind Template-Lorem und werden ignoriert.
- **Privatsphäre:** Wohnadresse, Telefonnummer und Geburtstag des Owners gelangen **nie** in Tickets, Spec, Repo oder Anfragen an externe Dienste.
- **Skills:** Grilling-Tickets → `grilling` + `domain-modeling`; Prototype → `prototype`; Research → `research`.
- **Vorlagen-Schleife (Wunsch des Owners):** Neues wird recherchiert; der Owner wird per Task-Ticket aufgefordert, in konkreten Vorlagen-Galerien nach konkreten Vorlagen zu suchen; seine Funde fließen in die Prototypen.
- **Abheben ist Pflicht:** das alte vCard-Template nicht nachbauen; nur das Logo bleibt als Marke.
- **Planen, nicht bauen:** Tickets treffen Entscheidungen und liefern nichts aus. Der Bau ist ein eigener Effort nach der Spec.
- **Research-Ablage:** lokale `research/<name>`-Branches, **nicht pushen** (`origin` ist noch das öffentliche GitHub; das private Forgejo folgt).
- **Sprache:** Map und Tickets auf Deutsch; Glossar, ADRs und Spec auf Englisch.

## Decisions so far

<!-- the index: one line per closed ticket, enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [Grundsatzentscheidungen aus dem Charting](issues/01-grundsatzentscheidungen.md): Spec als Ziel; DE unter `/`, EN unter `/en/`; Nitro node-server mit Prerender in Docker; `/health`; Featured + Archiv; mailto statt Formular; öffentliches CV-PDF bereinigt.
- [Portfolio-Landschaft und Vorlagen-Galerien](issues/02-portfolio-landschaft.md): Klischees benannt; ein spielbarer Mikro-Moment auf der Home passt zu (b); Galerien Awwwards, Siteinspire, Recent (ex-Godly), Codrops samt Filtern.
- [Deploy-Fakten: Coolify, Forgejo, Registry, Dockerfile](issues/06-deploy-fakten.md): Forgejo per Deploy Key + Webhook; `SOURCE_COMMIT` nur zur Laufzeit; Dashboard-Check ersetzt `HEALTHCHECK` und braucht curl/wget; Forgejo-OCI-Registry nutzbar.
- [Impressum und Datenschutz für ein privates Portfolio](issues/05-impressum-datenschutz-fakten.md): Impressum (mind. § 18 Abs. 1 MStV) und Datenschutzerklärung nötig; Wohnadresse vermeidbar über eine Drittanschrift mit Zustellungsbevollmächtigung; Postfach reicht nicht.
- [Nuxt-Stack-Fakten (Stand Nov 2026)](issues/03-nuxt-stack-fakten.md): Nuxt 4.6.4 / nitropack 2.13.6; i18n `prefix_except_default` mit DE-Default bestätigt; Content mit Collection pro Sprache und `native`-SQLite; IPX zur Laufzeit (sharp im Image); `routeRules`-Header greifen auf `public/`, ADR-0001 hält.
- [Unity-WebGL-Embed-Fakten](issues/04-unity-webgl-embed-fakten.md): Header-Anforderungen und Mobil-Support geklärt; COOP/COEP nur bei Threads; einfachster Weg: Unity unkomprimiert + Nitro `compressPublicAssets` (Build-Test steht aus).
- [Inhaltsinventar](issues/07-inhaltsinventar.md): Inventar freigegeben ([content-inventory.md](content-inventory.md)); 7 Featured inkl. ONA TECH, 7 im Archiv, dazu Ready Prepper One als WIP; Rollen in Teamprojekten geklärt; 5 Projects schon im Web.

## Not yet specified

- **Visuelle Identität:** Farben, Typografie (Exo/Orbitron sind nicht gesetzt), Dark/Light, Motion. Wird schärfer nach dem Design-Prototyp.
- **Technik für den Signature-Moment:** three.js/TresJS, GSAP oder nur CSS? Hängt am Prototyp.
- **Layout von Project page und CV-Seite** inkl. Print-Stylesheet. Hängt an Seitenstruktur und Design-Richtung.
- **Embed-UX:** Poster, Click-to-play, Fallback auf Mobil, Ladeanzeige. Hängt an der Embed-Architektur.
- **Teststrategie** über Lint und Typecheck hinaus. Hängt am Tech-Stack.
- **Übersetzungs-Workflow im Detail:** Ausgangssprache je Inhalt, Review-Schritt. Hängt am Inhaltsmodell.
- **Cutover:** DNS für athaeck.de, GitHub Pages abschalten, Weiterleitung von athaeck.github.io, Repo-Umzug und Umbenennung in Forgejo. Die Web-Builds unter `athaeck.github.io/A-fraction-of-time/` und `athaeck.github.io/VisualNovel/` dürfen dabei nicht brechen, oder sie ziehen mit um. Hängt an der Pipeline.
- **Spec zusammenführen:** letzter Schritt, sobald keine Tickets mehr offen sind.

## Out of scope

**Phase 2: wird nach dem ersten Rebuild und Deployment angegangen, nicht verworfen.**

- **Unreal-Embeds:** seit UE 4.24 kein offizieller Web-Export; Pixel Streaming bräuchte einen GPU-Server.
- **Self-hosted Strapi** als Headless-CMS. Das Inhaltsmodell wird so strukturiert, dass es später 1:1 passt.
- **Kontaktformular.** Zum Start reichen mailto und Profil-Links.
- **SEO-Ausbau:** Sitemap, OG-Bilder, JSON-LD. Die Basics (lang, hreflang, Title, Description) sind Teil des Rebuilds.
- **Tracking und Analytics** (z. B. Umami auf eigener Infra).
- **Blog, Testimonials und Clients** als Sektionen.
- **Einbau eines konkreten Unity-Spiels.** Die Embed-Architektur ist in scope.
- **CV-PDF aus den Seiteninhalten generieren.**

**Nicht Teil dieses Projekts:** Aufbau der Infrastruktur selbst (Forgejo, Coolify, Registry). Das ist ein eigenes Vorhaben des Owners.
