# Route `/mail`

Status: ready-for-agent
Blocked by: 17

## Ziel

„E-Mail schreiben →“ öffnet den Mail-Client über eine serverseitige 302-Weiterleitung, ohne dass die Adresse je im HTML oder JS der Seite steht.

## Spec-Abschnitte

- [§ 9.1 Rule](../../nuxt-portfolio/spec.md#91-rule), [§ 9.2 Footer contact](../../nuxt-portfolio/spec.md#92-footer-contact)
- [§ 18 Server surface](../../nuxt-portfolio/spec.md#18-server-surface)

## Akzeptanzkriterien

- [ ] `server/routes/mail.ts` (nicht `mail.get.ts`): GET und HEAD → `302`, `Location: mailto:<Profile.email>`, leerer Body; jede andere Methode → 405.
- [ ] Die Adresse liest die Route zur Laufzeit aus der Profile-Collection. Kein `sendRedirect()`, kein Eintrag in `routeRules` außer `'/mail': { prerender: false }`.
- [ ] Belegt per `curl -i` im Produktions-Build: GET und HEAD (302, `Content-Length: 0`), POST (405).
- [ ] Unter `.output/public` gibt es keine Datei `mail` oder `mail/index.html`; `grep` nach der Adresse und nach `mailto:` über `.output/public` findet nichts.
- [ ] **Prüfpunkt (Lücke G11):** feststellen, welche Laufzeit-Endpunkte Nuxt Content anlegt (z. B. unter `/__nuxt_content/`) und ob darüber Profile-Felder wie `email` abfragbar sind. Befund mit `curl`-Ausgabe ins Ticket; keine Abhilfe ohne Klärung.

## Hinweise

- Die README-Stichprobe (`/mail` → 302) deckt die Route ab; kein Unit-Test (§ 20.1).
- `contact_mail` misst GTM per Klick-Trigger auf den Link zu `/mail` (44); die Route selbst zählt nichts.
