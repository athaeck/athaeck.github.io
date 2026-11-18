# Trailing-Slash-Plugin

Status: ready-for-agent
Blocked by: 01

## Ziel

Jede URL hat genau eine kanonische Form: ohne Schrägstrich am Ende, unter `/builds/` mit. Ein Nitro-Plugin auf dem `request`-Hook antwortet mit 301, bevor der Static Handler greift.

## Spec-Abschnitte

- [§ 4.2 Pages](../../nuxt-portfolio/spec.md#42-pages) (Canonical form)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface)
- [§ 20.1 Unit tests in the gate](../../nuxt-portfolio/spec.md#20-testing)

## Akzeptanzkriterien

- [ ] Die Regel ist eine reine Funktion (Pfad und Query rein, Ziel oder nichts raus); das Plugin ruft sie nur auf.
- [ ] `/x/` → 301 `/x`; die Query bleibt (`/projekte/aurea/?x=1` → `/projekte/aurea?x=1`).
- [ ] `/` bleibt unberührt; `/en/` → 301 `/en`.
- [ ] Unter `/builds/`: `/builds/<slug>` → 301 `/builds/<slug>/`. Pfade, deren letztes Segment eine Datei ist (`/builds/<slug>/index.html`, `/builds/<slug>/Build/x.wasm.br`), bleiben unberührt.
- [ ] Vitest deckt alle Fälle oben ab, dazu eine Query unter `/builds/`.
- [ ] Im Produktions-Build (`node .output/server/index.mjs`) per `curl -I` belegt: `/en/` und eine Unterseite mit Slash liefern 301 mit richtigem `Location`, ohne Slash 200.
