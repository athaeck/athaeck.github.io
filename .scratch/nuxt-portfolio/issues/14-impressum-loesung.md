# Impressum-Lösung

Type: grilling
Status: resolved
Blocked by: 05

## Question

- Welche Anschrift und welche Kontaktdaten kommen ins Impressum, ohne die Wohnadresse zu veröffentlichen?
- Was muss die Datenschutzerklärung für genau dieses Setup abdecken?
- Muss die E-Mail-Adresse ins Impressum (falls § 5 DDG greift)? Wenn ja: Reicht dort der Link auf die Weiterleitung `/mail` oder eine Adresse, die erst per Klick erscheint? Vorgabe aus [Seitenstruktur und Navigation](10-seitenstruktur.md) (Revision 2026-11-15): Die Adresse steht nirgends im Klartext.

Grundlage: die Optionen aus [Impressum und Datenschutz für ein privates Portfolio](05-impressum-datenschutz-fakten.md).

Vorgabe aus [Seitenstruktur und Navigation](10-seitenstruktur.md): Beide Seiten gibt es auch auf Englisch, unter `/en/legal-notice` und `/en/privacy`. Jede Seite muss in beiden Sprachen existieren.

## Answer

Geklärt im Grilling am 2026-11-15, zwei Runden mit dem Owner. Fakten aus [Impressum und Datenschutz für ein privates Portfolio](05-impressum-datenschutz-fakten.md), dazu zwei Scouts und eine Messung am Spike-Image. Keine Rechtsberatung. Glossar: *Legal notice* und *Privacy policy* sind neu, *Service* ist geschärft (die Seite verkauft keine Aufträge).

**Einordnung**
- Der Owner nimmt über die Seite keine bezahlten Aufträge an. Man kann ihn aber ansprechen, ob er Interesse an etwas hat.
- § 18 Abs. 1 MStV gilt sicher. Ob § 5 DDG greift, bleibt strittig. Das Impressum erfüllt beide, damit nichts an der Einordnung hängt.

**Impressum** (`/impressum`, `/en/legal-notice`)
- **Name:** Nick Philipp Häcker.
- **Anschrift:** die eines Impressum-Service mit schriftlicher Zustellungsbevollmächtigung, auch für amtliche und gerichtliche Zustellungen.
  - **Ausgeschlossen:** die Wohnadresse und ein Postfach (NLM-Leitfaden 2024). Zuständig wäre die LFK Baden-Württemberg; deren Haltung ist nicht geprüft.
  - **Weiterleitung:** Der Service darf die Post an ein Postfach des Owners weiterleiten.
  - **Preise:** Händlerbund 4,90–5,90 € im Monat, laut Seite derzeit nicht buchbar. Autorenglück ab 4,50 € im Monat, nicht geprüft.
  - **Aufgabe des Owners vor dem Launch:** den Service buchen und bevollmächtigen.
- **E-Mail:** lesbar, aber geschützt. Ein Störtext mit CSS `display:none` steht mitten in der Adresse; daneben der Link „E-Mail schreiben“ auf `/mail`.
  - **Rechtsgrundlage:** § 18 MStV verlangt keine E-Mail. § 5 Abs. 1 Nr. 2 DDG verlangt sie, „einschließlich der Adresse für die elektronische Post“. Ein Formular ersetzt sie nicht (KG Berlin 5 U 32/12, Sekundärquelle). Ein Urteil zu verschleierten Adressen gibt es nicht.
  - **Schutz:** In der Messung von Mortensen (spencermortensen.com/articles/email-obfuscation, 1.042 Spammer) blockte `display:none` 100 %, `[at]` 97 % und Klartext 0 %.
- **Zweiter Kontaktweg: LinkedIn.**
  - **Vorgabe:** Laut EuGH C-298/07 braucht es neben der E-Mail einen weiteren schnellen Weg. Ein Telefon ist nicht Pflicht, ein Formular reicht.
  - **Offen:** Ob LinkedIn diese Vorgabe erfüllt, ist nicht geprüft.
  - **Telefon:** Es bleibt draußen.
  - **Formular:** Das Formular aus Phase 2 kommt als weiterer Weg dazu.

**Datenschutzerklärung** (`/datenschutz`, `/en/privacy`)

Ein eigener, kurzer Text, kein Generator. Ein Generator darf zum Gegenlesen dienen; übernommen wird nur, was zutrifft. Abschnitte:
1. **Verantwortlicher:** Name, Anschrift und E-Mail wie im Impressum.
2. **Hosting:** Hetzner Online GmbH, Server in Nürnberg, als Auftragsverarbeiter (Art. 28).
   - **Aufgabe des Owners:** einen AV-Vertrag mit Hetzner abschließen (Vorschlag an infra-18).
   - **Nicht genannt:** Cloudflare, denn es macht nur DNS ohne Proxy und sieht keine Besucher.
3. **Server:** kein Zugriffsprotokoll. Die IP-Adresse wird nur verarbeitet, um die Seite auszuliefern (Art. 6 Abs. 1 lit. f). Fehlermeldungen der Dienste werden nach Größe rotiert.
4. **Schriften und Icons:** selbst gehostet, ohne Anfragen an Dritte.
5. **E-Mail-Kontakt:** Wer schreibt, dessen Nachricht liegt beim Postfach-Anbieter Google (USA, Data Privacy Framework). Dazu Zweck, Rechtsgrundlage und Speicherdauer.
6. **Externe Links** (GitHub, LinkedIn, itch.io): Daten fließen erst beim Klick; danach gilt die Erklärung des Anbieters.
7. **Cookies und Browser-Speicher:** Der eigene Code setzt nichts. Die Bausteine für Analytics und Banner liefert [Analytics und Consent](23-analytics-und-consent.md).
8. **Rechte und Beschwerde:** die Betroffenenrechte (Art. 15–21) und das Beschwerderecht (Art. 77).
   - **Behörde:** „Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg“, baden-wuerttemberg.datenschutz.de.
   - **Postanschrift:** beim Bau prüfen. Die Seite nennt sowohl Heilbronner Straße 35, 70191 Stuttgart, als auch Postfach 10 29 32, 70025 Stuttgart.

Web builds bekommen zum Start keinen Abschnitt; die Seite startet ohne Embed.
- **Prüfpunkt beim ersten Web build:** Speichert Unity etwas im Browser, etwa den IndexedDB-Cache bei „Data Caching“ oder PlayerPrefs? Dann wird die Erklärung ergänzt. Ob „Data Caching“ standardmäßig an ist, ist nicht geprüft.
- **Rechtsgrundlage:** Nach meiner Lesart, nicht geprüft, gilt § 25 Abs. 2 Nr. 2 TDDDG, weil ein Web build erst nach Klick lädt.

**Regeln für die Spec**
- **Kein Browser-Speicher:** Der eigene Code setzt keine Cookies und schreibt nichts in den Browser-Speicher.
  - **Folge für i18n:** Es läuft mit `detectBrowserLanguage: false`.
  - **Grund:** Die Spracherkennung setzt das Cookie `i18n_redirected` (i18n.nuxtjs.org, Seite „Browser language detection“).
- **Erklärung im selben Zug:** Wer einen Dritten einbindet oder ein Zugriffsprotokoll einschaltet, ändert im selben Zug die Datenschutzerklärung.
- **Geteilter Fakt:** Name und Anschrift kommen in ein neues Profile-Feld (Arbeitsname `legalAddress`) in der geteilten YAML ([ADR-0002](../../../docs/adr/0002-shared-facts-and-per-language-text-files.md)). Die vier Rechtsseiten lesen es.
- **EN-Fassungen:** volle Übersetzungen, oben mit dem Satz „The German version is authoritative.“
- **Sichtbarkeit:** Alle vier Rechtsseiten bekommen `noindex` und stehen nicht in der Sitemap. Erreichbar sind sie über den Footer auf jeder Seite.
- **Game mode (Rahmen für Phase 2):** Die Ausstiegsleiste außerhalb des iframes verlinkt Impressum und Datenschutz, denn die Angaben müssen „ständig verfügbar“ sein.

**Prüfpunkt beim ersten Build**
- Wer die Adresse aus Impressum oder Datenschutz kopiert, darf den Störtext nicht mitnehmen. Ein Screenreader muss die Adresse richtig vorlesen.

**Belege für „kein Zugriffsprotokoll“**
- **Messung am Spike-Image** `spike-nuxt:test`: Abgefragt wurden GET `/`, ein unbekannter Pfad, `/mail` mit `X-Forwarded-For` und ein CV-POST mit falscher `lang`. Danach enthält `docker logs` nur `Listening on http://[::]:3000`; Nitro protokolliert also keine Anfragen.
- **Coolify v4.x:**
  - `bootstrap/helpers/proxy.php:14-18`: `traefikAccessLogCommands()` liefert ohne „Traffic analytics“ keine Flags.
  - Doku (coolify.io, „Traffic analytics“): „Collection is off by default and enabled per server“. Die Funktion liest die Protokolle über Sentinel; der Infra-Plan schaltet Sentinel auf dem öffentlichen Server ab (infra-Spec, Story 22).
- **Docker:** Coolifys `scripts/install.sh` (v4.x) setzt `json-file` mit `max-size` 10m und `max-file` 3.

**Umfang geändert (Owner)**
- **Analytics** kommt zum Start, nicht erst in Phase 2: GA4 über GTM mit Cookiebot. Dafür gibt es [Analytics-Fakten](22-analytics-fakten.md) und [Analytics und Consent](23-analytics-und-consent.md).
- **SEO-Ausbau** kommt zum Start: Sitemap, Search Console und JSON-LD. Dafür gibt es [SEO-Fakten](24-seo-fakten.md) und [SEO zum Start](25-seo-zum-start.md).

**Folgen für andere Tickets** (jeweils als Kommentar dort)
- [Inhaltsmodell](09-inhaltsmodell.md): ein neues Profile-Feld für Name und Anschrift.
- [Seitenstruktur und Navigation](10-seitenstruktur.md): Auf den Rechtsseiten ist die Adresse lesbar; dazu `noindex`.
- [Tech-Stack](12-tech-stack.md): `detectBrowserLanguage: false`. Den CSP bewertet Analytics neu.
- [Embed-Architektur](13-embed-architektur.md): Die Ausstiegsleiste verlinkt die Rechtsseiten.
- infra-18: ein Kommentar-Vorschlag zum AV-Vertrag mit Hetzner.

## Comments

- 2026-11-15 (Owner): „Direkt biete ich keine Aufträge an, aber man kann sich bei mir melden, ob ich Interesse an was habe.“ In die Rechtsseiten soll alles, was wichtig ist.
- 2026-11-15 (Owner): Zum Start kommen Cookiebot, der Google Tag Manager und Google Analytics. Wichtig sind außerdem Sitemap, Search Console und SEO, vermutlich mit JSON-LD.
- 2026-11-15 (Agent, über [Analytics und Consent](23-analytics-und-consent.md)): Drei Nachträge.
  - **Regel „Kein Browser-Speicher“:** Der eigene Code setzt weiter nichts. Neu kommen zwei Ausnahmen hinzu:
    - Cookiebot speichert die Wahl in `CookieConsent`, 12 Monate lang, mit Consent-Schlüssel.
    - GA4 setzt `_ga` und `_ga_<id>`, aber erst nach der Zustimmung.
  - **Abschnitt 7** heißt künftig „Einwilligung und Statistik“ und bekommt die Bausteine a bis d aus Analytics und Consent:
    - Cookiebot (Usercentrics A/S) als weiterer Auftragsverarbeiter, mit Akamai in den USA.
    - Google als Empfänger in den USA, auf Grundlage des DPF.
    - Der Widerruf über „Datenschutz-Einstellungen“.
  - **„Erklärung im selben Zug“** gilt auch für GTM: Wer einen Tag oder ein Cookie hinzufügt, ändert im selben Zug die Datenschutzerklärung und die Cookie-Liste.
- 2026-11-16 (Agent, über [SEO zum Start](25-seo-zum-start.md)): Zwei Nachträge.
  - **`noindex`:** Die Rechtsseiten setzen es nur als Meta-Tag (`useSeoMeta`), ohne `X-Robots-Tag`. Die Sitemap lässt sie anhand desselben Tags weg, und robots.txt sperrt sie nicht.
  - **Datenschutzerklärung:** Sie bleibt unverändert. Search Console und Bing Webmaster Tools brauchen keinen Code auf der Seite, die Search Console wird per DNS-TXT bestätigt.
