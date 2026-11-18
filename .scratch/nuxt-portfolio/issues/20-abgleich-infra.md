# Abgleich mit athaeck-infra

Type: grilling
Status: resolved
Blocked by: 13

## Question

Passen Portfolio-Plan und Infra-Plan (`E:/Projekte/athaeck/athaeck-infra`) zusammen, und wer gibt wo nach?

Was der Infra-Plan festlegt (Stand 2026-11-15, noch nichts davon läuft, `spec.md:14`):
- **Server:** öffentlicher Hetzner CAX11 (Arm64, 2 vCPU, 4 GB RAM, 40 GB), geteilt mit NetBird (`spec.md:22`, `:210`). Swap gibt es nur auf dem internen Server (`spec.md:45`).
- **Build:** Coolify baut bei Merge auf `main` direkt auf dem CAX11, `concurrent_builds` = 1, kein Runner, keine Tests (`spec.md:248`, `:315`). Geklont wird über das VPN auf TCP 8443 mit dem Konto `deploy` über die Gitea-Quelle (`spec.md:318`, infra-Ticket 12).
- **Registry:** Sie bleibt in Ausbaustufe 1 leer, das Upload-Konto kommt erst mit dem Runner (`spec.md:310`).
- **DNS:** Cloudflare nur als DNS, kein Proxy, kein CDN (infra-ADR 0005).
- **Webseiten-Repo:** `FROM nginx` mit eigener nginx-Config: Umleitung von `www`, 301-Regeln, `absolute_redirect off` (`spec.md:394–399`, infra-Ticket 18).
- **Übernommene Seiten:** Pages-Seiten und Browser-Spiele kommen als Ordner unter `athaeck.de/<alter-name>/`, große Builds per LFS (`spec.md:395–396`, infra-Ticket 19).
- **Ausweg, falls kein CAX21 bestellbar ist:** u. a. „ein CAX11 mit Build auf dem PC“ (`spec.md:175`).

Zu klären:
- **Webserver:** Nitro `node-server` ([ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md)) oder statischer Export mit nginx, wie der Infra-Plan es vorsieht? Was am Server hängt, steht in [Seitenstruktur](10-seitenstruktur.md), im [Build-Spike](16-build-spike.md), im [Tech-Stack](12-tech-stack.md) und in der [Embed-Architektur](13-embed-architektur.md):
  - `/mail` als 302 ohne Adresse im HTML;
  - CV-Download per POST mit `lang`;
  - `/health` mit Commit-SHA;
  - eine 404 pro Sprache;
  - Trailing Slash per 301;
  - Security-Header und CSP;
  - die Web builds als wörtliche `.br`.

  Mit nginx würden ADR-0001 und Teile von 12/16 neu bewertet. Mit Nitro passen sich die infra-Tickets 18/19 an.
- **RAM auf 4 GB ohne Swap:** `nuxt build` mit Prerender auf dem CAX11. Dazu kommt, dass Nitro jede Datei pro Anfrage ganz in den RAM liest; das betrifft das Budget aus 13.
- **LFS:** Infra-Ticket 19 will große Builds per LFS, Ticket 13 hat LFS verworfen, weil unbelegt ist, ob Coolify LFS-Dateien holt.
- **Zweiter Deploy-Weg:** Ohne Registry in Ausbaustufe 1 entfällt „lokal bauen → Registry“ aus den [Grundsatzentscheidungen](01-grundsatzentscheidungen.md). Wird der Build auf dem PC nötig, braucht es einen Cross-Build für `linux/arm64`.
- **Umleitung von `www`:** Wer macht sie, nginx, Traefik/Coolify oder ein Nitro-Plugin?
- **Quelle:** In den [Deploy-Fakten](06-deploy-fakten.md) steht ein Deploy Key, im Infra-Plan das Konto `deploy` über die Gitea-Quelle.
- **Übernommene Seiten:** Wie stehen `athaeck.de/<alter-name>/` und `/builds/<slug>/` zueinander? Das umfasst den Nebel *Cutover*. Das Trailing-Slash-Plugin muss solche Ordner auslassen (Kommentar in 13).
- **Repo-Name:** Der Infra-Plan nennt als Beispiel `athaeck-de`. Lokal gibt es `E:/Projekte/athaeck/athaeck-de` schon, ein altes Nuxt-2-Projekt.

Vor Runde 1 sind Fakten zu prüfen, ohne Rückfrage an den Owner: Wie gehen in nginx `/mail`, CV-POST mit `lang`, `/health` mit SHA (z. B. `envsubst`-Templates des offiziellen Images), wörtliche `.br` mit richtigem Typ, 404 pro Sprache und die Form ohne Slash? Und holt Coolify LFS-Dateien?

Ergebnis: eine Entscheidung zum Webserver und zu den übrigen Punkten. Änderungen an den infra-Tickets 18/19 kommen dort nur als Kommentar-Vorschlag. Die [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md) baut darauf auf.

## Answer

Entschieden vom Owner am 2026-11-15 in vier Runden. Die Fakten kamen vorher ohne Rückfrage zusammen: aus dem Quelltext und der Doku von Coolify, aus einem nginx-Spike und aus einem Nuxt-Static-Spike, beide in Wegwerf-Verzeichnissen außerhalb des Repos.

**Fakten, die neu dazukamen**
- **Coolify holt LFS-Dateien.**
  - Mit `is_git_lfs_enabled` hängt Coolify `git lfs ls-files -n | grep -q . && git lfs pull` an den Klon (`app/Models/Application.php:1808–1809`, Branch v4.x). Die Einstellung ist standardmäßig an (`database/migrations/2023_03_27_081717_create_application_settings_table.php:18`).
  - Laut einem Kommentar im Quelltext (`Application.php:2067`) installiert das Helper-Image den LFS-Filter systemweit. Das ist nicht selbst geprüft.
  - Geklont wird standardmäßig flach (`is_git_shallow_clone_enabled`, Migration `2025_08_21_080234_…:15`).
  - Der Grund, aus dem die [Embed-Architektur](13-embed-architektur.md) LFS verwarf („unbelegt“), ist damit überholt.
- **Wo Coolify baut:** Die Doku sagt: „By default, Coolify builds an application on the same server where the application will be deployed.“ Ein Build-Server braucht eine Registry und „a fresh remote server that is not running applications, databases, or services“ (coolify.io/docs/knowledge-base/server/build-server). Der CAX21 scheidet als Build-Server also aus. Das deckt sich mit infra-22 (`.scratch/infrastruktur/decisions/22-commit-bis-deployment.md:15–19`, `:53`).
- **`www`:** Coolify hat pro Domain die Einstellung „www redirect“ mit den Werten „No redirect“, „Redirect to www“ und „Redirect to non-www“. Beide Hostnamen müssen in den Domains stehen (coolify.io/docs/core/networking/domains).
- **nginx-Spike** mit `nginx:mainline-alpine` 1.31.8: 137 von 137 Prüfungen bestanden.
  - `/mail` geht per `return 302`.
  - Der CV-POST geht nur, wenn `lang` in der Query der Form-Action steht. Den Body kann nginx nur mit njs lesen.
  - `/health` kommt aus einem envsubst-Template. Mit `--read-only` braucht der Container tmpfs für `/etc/nginx/conf.d`, `/var/cache/nginx` und `/run`.
  - Wörtliche `.br` gehen mit richtigem Typ und mit `Range`.
  - 404 pro Sprache und der Trailing Slash mit Ausnahmen gehen per `map`.
  - Die Header kommen per `add_header_inherit merge` (ab 1.29.3) durch.
  - RAM bei 20 parallelen Downloads einer 40-MB-Datei: 14 → 41 MiB. Nitro brauchte im [Build-Spike](16-build-spike.md) 72 → 508 MB.
  - Basis-Image 63 MB, mit curl und wget.
- **Nuxt-Static-Spike** (Nuxt 4.6.4 auf `node:26-alpine`, 12 Seiten in 2 Sprachen):
  - Beim Navigieren lädt der Browser nur `_payload.json`, nie die Content-DB. Gemessen mit Chromium.
  - Eine 404 pro Sprache als statische Datei geht nur über eine echte Seite: Der Nitro-Hook `prerender:generate` benennt ihre Ausgabe um, und `routeRules` `noScripts: true` verhindert, dass der Client die URL umschreibt.
  - `/en/404.html` als Prerender-Route bricht den Build ab.
- **RAM beim Build** (GNU time, Max RSS):

  | Schritt | Spitze |
  |---|---|
  | `nuxt generate` | 1,19–1,26 GB |
  | `nuxt build` (node-server) | 1,41 GB |
  | `npm ci` | 0,69 GB |
  | typecheck | 0,44 GB |
  | eslint | 0,30 GB |

  Unter einem cgroup-Limit von 1 GB läuft `generate` durch, bei 768 MB wird es per OOM beendet. Die echte Seite hat mehr Bilder und liegt darüber; wie weit, ist nicht gemessen.
- **Kandidaten für Legacy sites** (GitHub-API, Summe des aktuellen Stands):

  | Repo | Größe | Bemerkung |
  |---|---|---|
  | Chess-Game | 93 MB | darin `zip/PrimaSS21Endabgabe.rar` mit 34 MB |
  | PRIMASS21 | 17 MB | |
  | free3d.github.io | 136 MB | |
  | a-fraction-of-time-demo-releases | 2,3 GB | keine `index.html`; ausgepackte Mac- und Windows-Builds alpha bis delta, die Pages-Seite ist das README |

**Entscheidungen**
- **Repo:** Dieses Repo ist das Webseiten-Repo der Infra.
  - Es zieht mit der vollen Historie als **`athaeck.de`** nach Forgejo, denn `athaeck-de` ist das alte Nuxt-2-Projekt. `multi-language-nuxt` wird dort `main`.
  - `athaeck.github.io` auf GitHub wird beim Cutover auf die Weiterleitungsseiten reduziert, nicht archiviert.
- **Klonen:** Das entscheidet die Infra: Gitea-Quelle als `deploy` auf `git.int.athaeck.de:8443`, Ausweg nach U6. Die Spec verweist auf infra-12 und infra-18. Die [Deploy-Fakten](06-deploy-fakten.md) bleiben unverändert.
- **Webserver: Nitro `node-server` bleibt** ([ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md)). Ein statischer Export mit nginx kann alles Nötige (s. Spike), scheidet aber aus zwei Gründen aus:
  - In Phase 2 sollen CMS-Inhalte ohne Neubau erscheinen (Vorschau, sofort veröffentlichen).
  - Phase 2 braucht Server-Endpunkte wie das Kontaktformular.

  Angepasst werden deshalb die Infra-Tickets 18 und 19.
- **Build:** auf dem CAX11, wie infra-22 es festlegt.
  - Auf dem CAX21 bauen und das Image auf den CAX11 schicken ginge nur über einen Runner auf dem internen Server, den infra-22 aus Sicherheitsgründen verworfen hat, oder über einen eigenen Runner-Server (CX23).
  - Liegt die Messung in infra-18 über etwa 2,5 GB, kommt der Runner-Server aus infra-22.
  - Den Ausweg „Build auf dem PC“ (Infra-Spec `:175`) braucht es nicht, weil der Owner auf den CAX21 wartet.
- **Zweiter Deploy-Weg:** Zum Start gibt es nur Forgejo → Coolify-Build. Der Weg „Image aus der eigenen Registry“ kommt mit dem Runner-Server der Infra. Das Dockerfile bleibt cross-build-fähig (`FROM --platform=$BUILDPLATFORM` im Build-Stage), weil ein CX23 x86 ist.
- **`www`:** Coolifys „Redirect to non-www“ an der Domain, ohne Code. Ob 301 oder 308 kommt und ob Pfad und Query mitkommen, ist UNVERIFIED und gehört in die README-Prüfung.
- **Kein LFS im Webseiten-Repo.**
  - LFS spart nur bei Dateien, die oft neu eingecheckt werden. Legacy sites ändern sich nie, Web builds selten, und Coolify klont flach.
  - Dafür brächte LFS einen weiteren Weg, der scheitern kann: `lfs pull` über VPN, Port 8443 und OAuth, und U6 ist noch offen.
  - Web builds und Legacy sites sind normale Git-Dateien mit `binary` in `.gitattributes`.
- **Legacy site** (Glossar): eine Seite aus der GitHub-Pages-Zeit, unverändert unter ihrem alten Pfadnamen, ohne eigene Project page. Sie ist kein Web build.
  - Bekommt ihr Project einen Embed, wird der Build neu unter `/builds/<slug>/` eingecheckt, und der alte Pfad leitet per 301 auf die Project page. Bis dahin darf das Project auf die Legacy site als `play`-Link zeigen.
  - Altnamen sind reserviert. Keine Route darf einen davon belegen, auch die Spiel-Route nicht.
- **Ablage der Legacy sites:** unter `public/<alter-name>/`.
  - Das Trailing-Slash-Plugin hat eine feste Präfixliste: `/builds/` und die Altnamen. Dort erzwingt es die Form **mit** Slash (`/Chess-Game` → 301 `/Chess-Game/`), sonst entfernt es den Slash wie bisher.
  - Umbenannte Altpfade werden `routeRules`-Redirects.
  - Nitro hält jede Datei pro Anfrage ganz im RAM. Deshalb kommen Download-Archive wie die `.rar` nicht mit.
- **a-fraction-of-time-demo-releases** wird keine Legacy site. Der Demo-Download von A Fraction of Time ist ein `download`-Link an einen Ort außerhalb des Repos. Wohin genau, entscheidet der Owner beim Inhalt, z. B. die eigene itch.io-Seite.
- **Cutover:** Die Durchführung liegt bei der Infra (Spec „Reihenfolge“ Schritt 2, infra-05, infra-18, infra-19). Die Spec legt nur fest, was `athaeck.de` beantworten muss: Die Weiterleitungsseite für `athaeck.github.io/` zeigt auf `athaeck.de/`, und Legacy sites behalten ihre Altnamen.

**Folgen**
- Map:
  - neue Zeile in den Decisions;
  - der Nebel Cutover entfällt;
  - die Destination ist angepasst;
  - Notes verweisen auf den Infra-Plan.
- Glossar: *Legacy site* ist neu, *Web build* ist geschärft („made for the site“).
- ADRs:
  - [ADR-0001](../../../docs/adr/0001-nitro-node-server-with-full-prerender.md) bekommt einen Satz zur verworfenen nginx-Alternative.
  - In [ADR-0004](../../../docs/adr/0004-web-builds-as-prebrotli-files-in-same-origin-iframes.md) ist die LFS-Begründung ersetzt.
- Kommentare in diesen Tickets:
  - [Grundsatzentscheidungen](01-grundsatzentscheidungen.md)
  - [Seitenstruktur und Navigation](10-seitenstruktur.md)
  - [Tech-Stack](12-tech-stack.md)
  - [Embed-Architektur](13-embed-architektur.md)
  - [Build- und Deploy-Pipeline](15-build-deploy-pipeline.md)
- Kommentar-Vorschläge in `athaeck-infra`: infra-18 (Portfolio) und infra-19 (Übernommene Seiten).

## Comments

- 2026-11-17 (Owner und Agent, beim Zusammenführen der [Spec](../spec.md)): Die Ablage der Legacy sites ist revidiert.
  - **Neu:** Legacy sites liegen **nicht** mehr im Webseiten-Repo unter `public/<alter-name>/`. Ein eigener statischer nginx-Dienst liefert sie unverändert unter ihren alten Pfadnamen auf einer eigenen Subdomain aus (Arbeitsname `alt.athaeck.de`; den Namen legt die Infra fest). Das Portfolio verlinkt sie nur per `play`.
  - **Gründe:** Sie sind kein Inhalt der Seite. nginx kann Range und Streaming (Spike oben: 137 von 137 Prüfungen, 14 → 41 MiB bei 20 parallelen Downloads), Nitro nicht. Die eigene Origin hält altes JavaScript von den Cookies der Seite fern, und der strenge CSP braucht keine Ausnahme.
  - **Folgen fürs Portfolio:** Das Trailing-Slash-Plugin behält nur `/builds/`. Die Altnamen bleiben reserviert, und `athaeck.de/<alter-name>/**` leitet per 301 auf denselben Pfad der Subdomain. Free3D bleibt trotzdem draußen; `/free3d.github.io/**` leitet auf seine Project page.
  - **Infra:** Der Dienst gehört zur Infra. Der Kommentar-Vorschlag steht in infra-19.
