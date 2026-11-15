# Videos auf der Project page

Type: grilling
Status: open
Blocked by: –

## Question

Wie kommen die Videos aus `gallery` auf die Project page? Sie sollen überall laufen, auch auf dem iPhone, ohne den Server zu überlasten.

- **Auslieferung:**
  - Laut [Build-Spike](16-build-spike.md) liest Nitro jede statische Datei pro Anfrage ganz in den RAM, ohne Streaming und ohne `Range`.
  - Laut Apple spielt Safari auf iOS `<video>` nur von Servern mit Byte-Range-Unterstützung (UNVERIFIED, prüfen).
  - Optionen:
    - eine Nitro-Route mit Streaming und `Range` (etwa 30 Zeilen);
    - ein anderer Weg im selben Container;
    - ein Drittanbieter. Das berührt CSP und Consent, und es wären Anfragen an Dritte.
- **Budget:**
  - Größe pro Video.
  - RAM unter `mem_limit: 512m` ([Build- und Deploy-Pipeline](15-build-deploy-pipeline.md)).
  - Ablage in Git wie die Web builds?
- **Formate:** Container und Codec, eine oder zwei Quellen, `preload`.
- **Handy-Button:** In Design D führt der Haupt-Button am Handy zum Video statt ins Spiel ([Design-Richtung](11-design-richtung.md)). Welches Video ist das, und was passiert ohne Video? Das berührt auch den Nebel „Embed-UX“ (Fallback am Handy).
- Vorher eventuell ein kurzer Spike mit Safari.

Schon entschieden in [SEO zum Start](25-seo-zum-start.md):
- die Felder `poster` und `date`;
- `caption` als Pflichtfeld bei Videos;
- das `VideoObject`.

Anlass: [SEO zum Start](25-seo-zum-start.md).
