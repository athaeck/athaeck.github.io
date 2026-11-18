# Docker-Image, Compose und `/health`

Status: ready-for-agent
Blocked by: 01

## Ziel

Das Site-Image baut zweistufig mit dem Gate im Build-Stage, läuft read-only als `node` und meldet sich über `/health` mit dem deployten Commit.

## Spec-Abschnitte

- [§ 19.2 Dockerfile](../../nuxt-portfolio/spec.md#192-dockerfile), [§ 19.3 Compose](../../nuxt-portfolio/spec.md#193-compose)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface) (`/health`), [§ 17.3 Caching](../../nuxt-portfolio/spec.md#173-caching)
- [§ 16 Tech stack](../../nuxt-portfolio/spec.md#16-tech-stack) (Renovate)
- [§ 20.1](../../nuxt-portfolio/spec.md#20-testing) (Reihenfolge im Build-Stage)

## Akzeptanzkriterien

- [ ] `Dockerfile` wie in § 19.2: zwei Stages, `node:26.13.1-alpine3.24` zweimal ohne `ARG`, `FROM --platform=$BUILDPLATFORM` im Build-Stage, `lint`, `typecheck`, `test`, `build` als einzelne `RUN`, Runtime-Stage nur mit `.output` und `media/`, `USER node`, `HEALTHCHECK` per busybox-`wget`.
- [ ] `.dockerignore`: `.git`, `node_modules`, `.nuxt`, `.output`, `.scratch`, `docs`.
- [ ] `docker-compose.yaml` wie in § 19.3 (`read_only`, `cap_drop: [ALL]`, `no-new-privileges`, `mem_limit: 512m`, kein `tmpfs`, kein `environment:`).
- [ ] `media/` existiert im Repo (z. B. `media/.gitkeep`), sonst scheitert `COPY --from=build /app/media`.
- [ ] `server/routes/health.ts`: `200 {"status":"ok","version":"<SOURCE_COMMIT>"}`, ohne Variable `"version":"unknown"`, `Cache-Control: no-store`. Kein Unit-Test (§ 20.1).
- [ ] `renovate.json` aktiviert nur den Dockerfile-Manager; beide `FROM`-Zeilen kommen in einem PR.
- [ ] `docker build .` läuft durch. Einmal geprüft und nicht committet: ein Lint-Fehler lässt `docker build` scheitern.
- [ ] Container mit den Compose-Optionen und `SOURCE_COMMIT=abc`: `/` und `/en` liefern 200, `/health` zeigt `abc` und `Cache-Control: no-store`, `docker inspect` meldet `healthy`.
- [ ] Der Prozess läuft als uid 1000; die Dateien unter `/app` gehören root. Image-Größe im Ticket notiert.

## Hinweise

- BuildKit in Coolifys Compose-Build ([§ 24.5](../../nuxt-portfolio/spec.md#24-check-points-for-the-first-build)) prüft erst die Launch-Prüfung (39).
