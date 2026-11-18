# Design-Tokens und Seitenrahmen

Status: ready-for-agent
Blocked by: 01

## Ziel

Jede Seite steht in einem gemeinsamen Rahmen aus Tokens, Exo, Header, Screens und Footer. Alle Seiten aus § 4.2 existieren als Stub in beiden Sprachen, die Navigation funktioniert ohne JavaScript, und der Prerender findet keinen toten Link.

## Spec-Abschnitte

- [§ 7.1 Visual identity](../../nuxt-portfolio/spec.md#71-visual-identity), [§ 7.2 Page frame](../../nuxt-portfolio/spec.md#72-page-frame) (ohne Time-jump, siehe 26)
- [§ 4.2 Pages](../../nuxt-portfolio/spec.md#42-pages), [§ 4.3 Language rules](../../nuxt-portfolio/spec.md#43-language-rules)
- [§ 16 Tech stack](../../nuxt-portfolio/spec.md#16-tech-stack) (Styling, Icons), [ADR-0003](../../../docs/adr/0003-hand-written-css-no-utility-framework.md)
- Referenz: Variante D in [prototype-design-richtung/](../../nuxt-portfolio/prototype-design-richtung/index.html)

## Akzeptanzkriterien

- [ ] `app/assets/css/tokens.css`: die 7 Farb-Tokens aus § 7.1, Typo-Skala mit `clamp()`, Abstände; nur Custom Properties. Ein Ink-Screen definiert die Tokens um (Laufzeitwechsel in den dunklen Bändern).
- [ ] Ein Breakpoint (860 px) plus `pointer: fine`; Styles in `<style scoped>` mit nativem Nesting; kein Tailwind, UnoCSS, Nuxt UI oder Präprozessor.
- [ ] Logo: das Joystick-Zeichen (`assets/images/android-chrome-192x192.png`) und die Favicons aus `assets/images/` liegen unter `public/`; das Logo im Header führt zur Home.
- [ ] Header: Logo · Projekte · Lebenslauf · Über mich · Kontakt · DE/EN (EN: Projects · CV · About · Contact); aktiver Punkt mit `aria-current="page"`; zuerst der Skip-Link „Zum Inhalt“ / „Skip to content“. Desktop: nach etwa 90 px Scrollen eine schmale Leiste links mit senkrechten Labels. Handy: bleibt oben, alle Punkte sichtbar, kein Hamburger, keine Tab-Bar. Ohne JavaScript bleibt der Header oben und vollständig.
- [ ] Screen-Komponente (ink oder paper): mindestens eine Viewport-Höhe (die erste minus Header), sanftes Snapping; am Handy wischen die Teile einer Kategorie seitwärts, der nächste lugt herein (CSS Scroll Snap, kein JavaScript).
- [ ] Interaktionszustände exakt wie § 7.1 (paper: Hover chrono blue, Fokus 3 px chrono blue; ink: grau, Hover paper, aktiv cyan unterstrichen, Fokus 2 px cyan; nur der Haupt-Button hat einen Hover-Hintergrund). Kontraste der Token-Paare auf AA nachgerechnet, Werte im Ticket.
- [ ] Footer auf jeder Seite: Platz für den Kontaktblock mit Anker `#kontakt` / `#contact` (21), Links zu Legal notice und Privacy policy, Platz für den Privacy-settings-Button (35), Sprachumschalter.
- [ ] Sprachumschalter in Header und Footer: schlichtes `<a href>` auf dieselbe Seite in der anderen Sprache (`switchLocalePath`), im vorgerenderten HTML; belegt für `/` ↔ `/en` und je eine Stub-Seite.
- [ ] Stub-Seiten mit Titel (UI-Text) für Home, Projects, CV, About, Legal notice, Privacy policy in DE und EN; die Seiten-Tickets füllen sie.
- [ ] `<AppIcon name>`: die etwa 15 SVGs (GitHub, LinkedIn, itch.io, die 9 Link-Typen, Mail, Kopieren, Pfeil) aus Lucide (ISC) und Simple Icons (CC0) in `app/assets/icons/`, geladen per `import.meta.glob(…, { query: '?raw', import: 'default', eager: true })`, inline mit `currentColor`. Herkunft und Lizenz je Icon im Ticket (für die README, 37).
- [ ] Mit abgeschaltetem JavaScript sind Header, Footer und alle Links bedienbar; der Browser lädt nichts von Dritten (Netzwerk-Tab).
