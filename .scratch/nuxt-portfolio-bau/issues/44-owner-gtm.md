# Owner: GTM-Container anlegen und einrichten

Status: ready-for-human
Blocked by: 43

## Ziel

Ein abgesicherter GTM-Container liefert GA4 und die drei Events; der Build kennt die Container-ID.

## Spec-Abschnitte

- [§ 14.4 GA4 settings](../../nuxt-portfolio/spec.md#144-ga4-settings), [§ 14.6 Security of GTM](../../nuxt-portfolio/spec.md#146-security-of-gtm), [§ 23](../../nuxt-portfolio/spec.md#23-owner-tasks-before-launch)

## Akzeptanzkriterien

- [ ] Container angelegt; der Owner ist einziger Nutzer, mit 2FA.
- [ ] **Vorschlag (Lücke G7):** eingerichtet mit nur Template-Tags (kein Custom HTML, keine benutzerdefinierten JavaScript-Variablen): Google-Tag mit der Mess-ID aus 43 und `cookie_expires` 12 Monate; Events über eingebaute Trigger: `cv_download` (Formular-Submit auf `/downloads/cv`), `contact_mail` (Klick auf den Link zu `/mail`), `contact_copy` (Klick auf den Kopier-Button, Attribut aus 21). Veröffentlicht.
- [ ] Die Container-ID steht in 35.
- [ ] Merksatz in der README (37): nach jedem Veröffentlichen läuft der CSP-Teil des Audits gegen `athaeck.de`.
