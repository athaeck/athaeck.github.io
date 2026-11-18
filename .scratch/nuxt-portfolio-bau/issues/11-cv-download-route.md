# Route `/downloads/cv` (CV-PDF per POST)

Status: ready-for-agent
Blocked by: 01

## Ziel

Das CV-PDF ist nur per Formular-POST erhältlich, je Sprache, aus den Server-Assets und ohne GET-URL.

## Spec-Abschnitte

- [§ 9.3 CV PDF download](../../nuxt-portfolio/spec.md#93-cv-pdf-download)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface), [§ 17.3 Caching](../../nuxt-portfolio/spec.md#173-caching)

## Akzeptanzkriterien

- [ ] `server/routes/downloads/cv.ts`: POST mit `lang=de|en` (Formular-Body) → `200`, `Content-Type: application/pdf`, `Content-Disposition: attachment; filename="nick-haecker-lebenslauf.pdf"` (EN `nick-haecker-cv.pdf`), `X-Robots-Tag: noindex`, `Cache-Control: no-store`.
- [ ] GET → `303` nach `/lebenslauf`; unbekanntes `lang` → 400; andere Methoden → 405.
- [ ] Die PDFs kommen aus `server/assets/cv/de.pdf` und `server/assets/cv/en.pdf` über `useStorage('assets:server')`; nichts davon liegt unter `public/` oder `.output/public`.
- [ ] Belegt per `curl` im Produktions-Build mit einem Test-PDF, das nicht committet wird: POST de, POST en, GET, `lang=fr`, PUT.
- [ ] Die Dateinamen `de.pdf` und `en.pdf` stehen in 47, damit der Owner die echten PDFs dorthin legt.

## Hinweise

- Das Formular baut die CV-Seite (30). Kein Unit-Test (§ 20.1).
