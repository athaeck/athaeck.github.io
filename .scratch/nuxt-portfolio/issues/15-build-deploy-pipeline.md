# Build- und Deploy-Pipeline

Type: grilling
Status: resolved
Blocked by: 06, 12, 20

## Question

Wie genau wird das Image auf beiden Wegen gebaut und deployt?

- Dockerfile-Stages, Basis-Image, Node-Version.
- Wie gelangt der Commit-SHA zu `/health`?
- Welches `HEALTHCHECK`-Kommando?
- Coolify-Konfiguration: Build Pack, Domain, TLS, Healthcheck.
- Registry-Name und Tagging für den lokalen Weg.
- Wie bricht das Qualitäts-Gate den Build ab?

Grundlage: [Deploy-Fakten](06-deploy-fakten.md) und [Tech-Stack festlegen](12-tech-stack.md).

## Answer

Entschieden vom Owner am 2026-11-15 in drei Runden. Die Fakten kommen aus dem Quelltext von Coolify v4.7.5 (Release vom 2026-11-10, nur gelesen), aus den Tarballs von `nitropack` 2.13.6 und `@nuxt/nitro-server` 4.6.4 (nur gelesen) und aus einem lokalen Containertest.

**Fakten** (Coolify-Pfade im Repo `coollabsio/coolify`, Tag `v4.7.5`)
- **Build:** `docker compose build --pull`, bei „Force rebuild“ zusätzlich `--no-cache` (`app/Jobs/ApplicationDeploymentJob.php:1084–1086`). Ein fester Tag wird bei jedem Build neu gezogen. Neu gebaute Images desselben Tags (Alpine-Patches) kommen also ohne PR.
- **Start:** danach `up -d`, ohne auf den Healthcheck zu warten. `deploy_docker_compose_buildpack()` (`:877–1025`) ruft `rolling_update()` nicht auf. Bei Compose hält ein Healthcheck kein Deployment auf, er zeigt nur den Status.
- **`SOURCE_COMMIT`:** Jeder Dienst bekommt `env_file: .env` (`bootstrap/helpers/parsers.php:2326–2331`). Darin steht zur Laufzeit `SOURCE_COMMIT` (`ApplicationDeploymentJob.php:2084`, `:4626–4631`), im Build nur mit „Include source commit in build“.
- **Compose-Keys:** Coolify übernimmt den Dienst per `collect($service)->merge(...)` und setzt nur `container_name`, `restart`, `labels`, `networks`, `env_file` und den Image-Tag neu (`parsers.php:2298–2348`). `read_only`, `cap_drop`, `security_opt`, `mem_limit` und `healthcheck` bleiben stehen.
- **`www`:** Die Umleitung gibt es pro Compose-Dienst (`parsers.php:2190–2194`). Traefik bekommt `redirectregex` `^(http|https)://www\.(.+)` → `${1}://${2}` (`bootstrap/helpers/docker.php:1140–1145`), Pfad und Query bleiben also erhalten. Dauerhaft ist sie nur mit `is_permanent_redirect_enabled` (`app/Models/Application.php:764–766`, `docker.php:1062`), Standard aus. Ob 301 oder 308 kommt, hält die README-Prüfung fest.
- **Prerender:** Nuxt setzt `prerender.failOnError: true` (`@nuxt/nitro-server` 4.6.4, `dist/index.mjs:1190`). Nitro wertet jede Route ohne 200 oder Redirect als Fehler (`nitropack` 2.13.6, `dist/core/index.mjs:2169–2191`) und bricht ab (`:2236`). Ein toter interner Link bricht also den Build ab.
- **Basis-Image:** `node:26-alpine` ist Node 26.13.1 mit npm 11.20.0 auf Alpine 3.24.4. Es bringt busybox-`wget` mit (`/usr/bin/wget -> /bin/busybox`), aber kein curl; `node` hat uid 1000. Lokal mit `--read-only --cap-drop ALL --security-opt no-new-privileges --user node`: Der Healthcheck per `wget` meldet `healthy`, eine 404 ergibt Exit 1.

**Coolify**
- **Build Pack Docker Compose**, wie infra-22 es für alle Dienste festlegt. Die kurze Unterbrechung beim Tausch der Container nach dem Build wird hingenommen. `docker-compose.yaml` im Repo-Root mit einem Dienst, dessen `build:` auf das Dockerfile zeigt.
- **Domains** am Dienst: `https://athaeck.de:3000,https://www.athaeck.de:3000`. „Redirect to non-www“ und **„Permanent redirect“ an**, damit `www` → Apex und `http` → `https` dauerhaft umleiten. TLS per Let's Encrypt mit HTTP-Challenge (infra-18).
- „Include source commit in build“ bleibt aus (Runtime only). Keine Watch Paths: Commits, die nur die Planung ändern, bauen dank `.dockerignore` aus dem Cache.

**Dockerfile** (Skizze, Namen und Details legt der Bau fest)

```dockerfile
FROM --platform=$BUILDPLATFORM node:26.13.1-alpine3.24 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run lint
RUN npm run typecheck
RUN npm run build

FROM node:26.13.1-alpine3.24
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/health || exit 1
CMD ["node", ".output/server/index.mjs"]
```

- Zwei Stages, ins Image kommt nur `.output`. Die Dateien gehören root, der Prozess läuft als `node` und kann sie nicht ändern. Es gibt keine eigene Stage für die Abhängigkeiten und keinen npm-Cache-Mount: Die Schicht `npm ci` bleibt gecacht, solange sich der Lockfile nicht ändert.
- **Basis-Image** als exakter Tag ohne Digest, passend zur Infra-Regel „Fremde Images in fester Version“. Der Tag steht zweimal da, ohne `ARG`. Renovate ändert beide Zeilen in einem PR.
- **`.dockerignore`:** `.git`, `node_modules`, `.nuxt`, `.output`, `.scratch`, `docs`.
- **`HEALTHCHECK`** steht im Dockerfile, nicht in der Compose-Datei. Er geht mit dem Image mit und dient beim späteren Weg über die Registry als Dashboard-Check, der wget braucht. Ausfälle meldet Gatus von außen.

**Compose** (Skizze)

```yaml
services:
  web:
    build: .
    read_only: true
    cap_drop: [ALL]
    security_opt: ["no-new-privileges:true"]
    mem_limit: 512m
```

- Kein `tmpfs`, denn die Content-DB ist `:memory:` ([Build-Spike](16-build-spike.md)). Kein `environment:`, denn `.env` von Coolify reicht.
- **`mem_limit: 512m`:** Der CAX11 teilt sich den Speicher mit NetBird. Läuft der Server über, trifft der OOM-Killer nur diesen Container, und er startet neu. Mit dem ersten Embed wird der Wert neu bewertet, weil Nitro jeden laufenden Download ganz im RAM hält.

**Qualitäts-Gate**
- Im Build-Stage laufen `npm run lint`, `npm run typecheck` und `npm run build` nacheinander als eigene `RUN`-Schritte. Die günstigen Prüfungen kommen zuerst. Nicht parallel, weil sich sonst der RAM addiert.
- Bricht ein Schritt ab, schlägt `docker build` fehl, die alte Version läuft weiter, und Coolify meldet es (Infra-Spec, „Vom Commit zum Deployment“).
- `npm run build` ist lokal und im Container das Gate. Es umfasst den Prerender (ein toter Link bricht ab) und die Inhaltsprüfungen: fehlende Sprache ([Seitenstruktur](10-seitenstruktur.md)) sowie Budget und Konsistenz der Web builds (Kommentar unten). Wie sie eingehängt werden (`prebuild`-Skript oder lokales Modul), entscheidet der Bau.
- Keine Git-Hooks. `main` ist geschützt, der Development-Branch deployt nicht, und ein gescheiterter Build kostet nur eine Meldung.
- Lighthouse und axe brauchen einen Browser und sind nicht Teil des Gates. Sie gehören zur [Teststrategie](21-teststrategie.md).

**`/health`**
- `server/routes/health.ts` liest `process.env.SOURCE_COMMIT` und setzt ohne Wert `"unknown"`, z. B. bei `docker run` lokal. Die Antwort bleibt `200 {"status":"ok","version":"<commit>"}` ([Grundsatzentscheidungen](01-grundsatzentscheidungen.md)) mit `Cache-Control: no-store`.

**Registry und Tagging:** entfällt bis zum Runner-Server ([Abgleich mit athaeck-infra](20-abgleich-infra.md)). Das Dockerfile ist schon cross-build-fähig. Ein `ARG` für den Commit wird nicht vorab eingebaut; Name und Tag-Schema legt dann die Infra fest.

**README-Prüfung** (der Teil, der die Pipeline betrifft)
1. `curl https://athaeck.de/health` zeigt den gerade deployten Commit.
2. `curl -I 'http://www.athaeck.de/projekte?x=1'` leitet dauerhaft auf `https://athaeck.de/projekte?x=1` um. Den Statuscode (301 oder 308) einmal festhalten.
3. Coolify zeigt den Container als `healthy`.
4. Stichprobe: je eine DE- und eine EN-Seite, eine 404, `/mail` → 302 und der CV-POST → PDF.

**Prüfpunkte für den ersten Build** (noch nicht belegt)
1. `FROM --platform=$BUILDPLATFORM` läuft im Compose-Build von Coolify. Dass Coolify mit BuildKit baut (`DOCKER_BUILDKIT=1`), hat nur die Recherche gesehen, nicht selbst geprüft.
2. Der Crawler des Prerenders bricht nicht an `/mail` (`prerender: false`) oder an Links auf Legacy sites ab, denn jede gescheiterte Route stoppt den Build.
3. RAM und Dauer des Builds auf dem CAX11 misst infra-18 (Kommentar-Vorschlag aus [Abgleich mit athaeck-infra](20-abgleich-infra.md)).

**Folgen**
- Map: neue Zeile in den Decisions. Der Nebel „Teststrategie“ ist jetzt das Ticket [Teststrategie](21-teststrategie.md).
- Kommentar-Vorschlag an infra-18: Rollback-Tags bei Compose-Images, „Permanent redirect“, Healthcheck ohne Wirkung auf das Deployment, README-Punkte.
- Glossar und ADRs bleiben unverändert. Es gibt keinen neuen Begriff, und Compose ist eine Vorgabe der Infra, keine eigene Abwägung mit Lock-in.

## Comments

- 2026-11-15 (Agent, über [Embed-Architektur](13-embed-architektur.md)): Ins Qualitäts-Gate im Build-Stage gehören zwei Prüfungen, die den Build abbrechen.
  - Budget: ≤ 50 MB pro Verzeichnis unter `public/builds/`, ≤ 100 MB für das Verzeichnis des Game mode.
  - Konsistenz: Jedes Project mit `embed` hat `public/builds/<slug>/index.html`, und jedes Verzeichnis dort gehört zu einem Project mit `embed` oder zum Game mode.

  Web builds liegen als normale Git-Dateien im Repo; der Build-Kontext braucht also weder LFS noch Registry-Zugang.
- 2026-11-15 (Agent, über [Abgleich mit athaeck-infra](20-abgleich-infra.md)): Vorgaben für die Pipeline.
  - **Wo und wie:** Coolify baut beim Deployment auf dem öffentlichen CAX11 (infra-22). Es klont über die Gitea-Quelle als `deploy` (infra-12/18), nicht per Deploy Key.
  - **Kein zweiter Weg zum Start:** Ohne Registry gibt es keinen Weg „lokal bauen → Registry“. Der kommt mit dem Runner-Server der Infra.
  - **Cross-Build:** Der Build-Stage baut mit `FROM --platform=$BUILDPLATFORM`. Ein späterer x86-Runner (CX23) kann so ohne Emulation für `linux/arm64` bauen. Im Spike lagen mit `ipxStatic` weder `*.node` noch sharp unter `.output/server`. Ob das auf einem echten Arm-Server läuft, ist ungeprüft.
  - **RAM:** Im Spike lag die Spitze von `nuxt build` bei 1,41 GB. Die Schritte laufen nacheinander, es zählt also das Maximum. Swap auf dem CAX11 und eine Messung mit dem echten Build gehen als Vorschlag an infra-18.
  - **`www`:** Coolifys „Redirect to non-www“ an der Domain. Dafür stehen beide Hostnamen in den Domains.
- 2026-11-15 (Agent, über [Übersetzungs-Workflow](17-uebersetzungs-workflow.md)): Zu den Inhaltsprüfungen in `npm run build` kommen zwei hinzu. Ein `unreviewed`-Marker in einer Sprachdatei bricht ab, ebenso der Listenabgleich: Listen mit Text müssen in beiden Sprachen gleich viele Einträge und gleiche Fakten haben.
- 2026-11-15 (Agent, über [Teststrategie](21-teststrategie.md)): Das Gate bekommt einen vierten Schritt. `RUN npm test` (Vitest: Unit-Tests der Inhaltsprüfungen und des Trailing-Slash-Plugins) läuft zwischen `typecheck` und `build`. Die Reihenfolge ist damit `lint`, `typecheck`, `test`, `build`. Lighthouse, axe und die CSP-Prüfung laufen nicht im Gate, sondern von Hand per `npm run audit`.
- 2026-11-16 (Agent, über [Videos auf der Project page](26-videos-project-page.md)): Der Runtime-Stage bekommt `COPY media/`. Videos streamen über eine eigene Route mit Range, deshalb wachsen sie nicht in den RAM, und `mem_limit: 512m` bleibt davon unberührt (Prüfpunkt 4 dort). Neue Inhaltsprüfung **Video** in `npm run build`: höchstens 20 MB pro Datei, Codec `avc1`, `moov` vor `mdat`, keine Tonspur.
