# Build- und Deploy-Pipeline

Type: grilling
Status: open
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
