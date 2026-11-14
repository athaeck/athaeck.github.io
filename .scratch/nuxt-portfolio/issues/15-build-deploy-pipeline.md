# Build- und Deploy-Pipeline

Type: grilling
Status: open
Blocked by: 06, 12

## Question

Wie genau wird das Image auf beiden Wegen gebaut und deployt?

- Dockerfile-Stages, Basis-Image, Node-Version.
- Wie gelangt der Commit-SHA zu `/health`?
- Welches `HEALTHCHECK`-Kommando?
- Coolify-Konfiguration: Build Pack, Domain, TLS, Healthcheck.
- Registry-Name und Tagging für den lokalen Weg.
- Wie bricht das Qualitäts-Gate den Build ab?

Grundlage: [Deploy-Fakten](06-deploy-fakten.md) und [Tech-Stack festlegen](12-tech-stack.md).
