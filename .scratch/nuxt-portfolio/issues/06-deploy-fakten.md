# Deploy-Fakten: Coolify, Forgejo, Registry, Dockerfile

Type: research
Status: resolved
Blocked by: –

## Question

Wie funktionieren die beiden Deploy-Wege mit aktuellem Coolify (v4)?

1. **Privates Forgejo-Repo → Coolify-Build** (Dockerfile Build Pack): Wie verbindet sich Coolify mit dem Repo (Deploy Key, Webhook)? Wie kommen Build-Args und Env-Vars ins Image (z. B. `SOURCE_COMMIT`)? Wie nutzt Coolify den Healthcheck (Dockerfile `HEALTHCHECK` oder eigene Einstellung)? Wie laufen Domain und TLS?
2. **Lokal gebautes Image → eigene Registry → Coolify** (Docker Image Build Pack). Kann die eingebaute OCI-Registry von Forgejo diese Registry sein?

Dazu: Wie sieht ein Best-Practice-Dockerfile für Nuxt/Nitro `node-server` aus? Multi-Stage, Basis-Image, nur `.output` ausliefern, non-root, `HEALTHCHECK` ohne curl.

## Answer

Details mit Quellen: Branch `research/deploy-fakten`, Datei `.scratch/nuxt-portfolio/research/06-deploy-fakten.md`.

- **Weg A (Forgejo → Coolify):** Die Coolify-Doku zu Gitea gilt auch für Forgejo. Zwei Varianten: Deploy Key („Private Repository (with deploy key)“, Clone-URL per SSH) oder Gitea/Forgejo-App (ab Coolify v4.7.0). Push-to-deploy läuft über einen Webhook mit Secret.
- **Commit-SHA:** Coolify stellt `SOURCE_COMMIT` standardmäßig **nur zur Laufzeit** bereit, damit der Build-Cache erhalten bleibt. `/health` kann ihn also zur Laufzeit lesen. Steht er auch beim Build zur Verfügung, wird der Cache bei jedem Commit ungültig. Auf Weg B muss der SHA per Build-Arg ins Image.
- **Healthcheck:** Der Healthcheck im Coolify-Dashboard **ersetzt** den Dockerfile-`HEALTHCHECK` und braucht `curl` oder `wget` im Image. Der Dockerfile-Check greift nur, wenn der Dashboard-Check aus ist. Beim Rolling Update bleibt der alte Container stehen, bis der neue healthy ist.
- **Weg B (lokal → Registry):** Ressource „Docker Image“ mit Registry-Login auf dem Server. Die **eingebaute OCI-Registry von Forgejo** taugt dafür: Image `{host}/{owner}/{image}:{tag}`, PAT mit `write:package` bzw. `read:package`.
- **Dockerfile:** `node .output/server/index.mjs`, `PORT`/`HOST` (Standard 3000 / 0.0.0.0). Das Node-Image bringt den non-root User `node` mit (selbst geprüft). Für Multi-Stage und `HEALTHCHECK` per `node -e fetch` gibt es nur gängige Praxis, keine Doku.
- **Offen für die Pipeline-Entscheidung:** Dashboard-Check (mit curl/wget) oder Dockerfile-Check (mit node)? Alpine oder slim (hängt an sharp)?
