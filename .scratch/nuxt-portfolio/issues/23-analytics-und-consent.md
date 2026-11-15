# Analytics und Consent

Type: grilling
Status: resolved
Blocked by: 22

## Question

Wie kommt Analytics zum Start auf die Seite?

- **Ziel:** Was soll gemessen werden, und welche Frage beantwortet es dem Owner?
- **Tools:** GA4 über GTM mit Cookiebot, wie der Owner es wünscht, oder eine schlankere Variante?
- **Banner:**
  - Aussehen in der [Design-Richtung](11-design-richtung.md), DE und EN, Ablehnen gleichwertig.
  - Verhalten ohne JavaScript.
  - Ein Link im Footer, um die Wahl zu ändern.
- **Sicherheit:** CSP und Security-Header aus dem [Tech-Stack](12-tech-stack.md) neu bewerten.
- **Leistung:** das Gewicht der Skripte gegen das Ziel aus den [Grundsatzentscheidungen](01-grundsatzentscheidungen.md) (Lighthouse ≥ 95 mobil).
- **Datenschutzerklärung:** Bausteine für die Erklärung aus der [Impressum-Lösung](14-impressum-loesung.md): Cookies, Empfänger, Drittland, Speicherdauer, Widerruf.

Grundlage: [Analytics-Fakten](22-analytics-fakten.md).

## Answer

Geklärt im Grilling am 2026-11-15, drei Runden mit dem Owner. Fakten aus [Analytics-Fakten](22-analytics-fakten.md), dazu zwei Scouts und eigene Gegenprüfungen: den DSK-Text selbst gelesen, das VG Hannover nachgesucht. Keine Rechtsberatung. Glossar: *Consent banner* und *Privacy settings* sind neu.

**Ziel**
- Analytics beantwortet fünf Fragen, nur als Summen, ohne Besucherprofile:
  - welche Seiten und Projects ziehen,
  - woher die Besucher kommen,
  - DE oder EN,
  - ob CV-PDF und Kontakt genutzt werden,
  - Handy oder Desktop.
- **Suche:** Die Google-Suche (Begriffe, Impressionen, Klicks) deckt die Search Console ab ([SEO zum Start](25-seo-zum-start.md)), nicht Analytics.
- **Markierte Links:** nur pro Kanal per `utm_source`, z. B. `?utm_source=bewerbung&utm_medium=email`, nie pro Empfänger. GA4 wertet `?ref=` nicht aus.

**Stack** (Wunsch des Owners; er kennt ihn)
- GA4 über den Google Tag Manager, das Banner von Cookiebot Premium Lite (7 € im Monat). Cookiebot Free kann nur eine Sprache.
- **Laden:**
  - Cookiebot (`uc.js`) steht direkt im `<head>`, lädt `async` und blockiert manuell, ohne `data-blockingmode="auto"`. Es kommt nicht über das GTM-Template.
  - Das GTM-Snippet ist als Statistik-Skript markiert. Cookiebot startet es erst nach Zustimmung zur Kategorie Statistik.
  - Vor der Wahl geht nichts an Google. Consent Mode *advanced* mit seinen Pings vor der Zustimmung entfällt damit.
- **Grund:**
  - Das VG Hannover (19.03.2025, 10 A 5385/22) hält GTM selbst für einwilligungspflichtig; das Banner lasse sich ohne GTM laden. Das stützt sich auf Kanzlei-Zusammenfassungen, die sich im Kern decken; den Urteilstext habe ich nicht gelesen.
  - Die DSK verlangt die Einwilligung vor dem Zugriff (OH Telemedien 1.1, Z. 328–332).
- **Verworfen:**
  - **GTM vor der Zustimmung, Cookiebot über das GTM-Template:** der ursprüngliche Aufbau des Owners. Er ist der Fall des VG Hannover, schickt jede IP an Google und belastet Lighthouse.
  - **Ein eigenes Banner statt Cookiebot** und **GA4 ohne GTM:** Der Owner bleibt beim Stack.
  - **Zähler ohne Cookies:** Umami, Plausible oder eine Zählung auf dem Server.

**Consent banner** (eingestellt in Cookiebot, im Stil der Variante D aus der [Design-Richtung](11-design-richtung.md), also mit ihren Farben und Exo)
- **Form:** eine Leiste unten, nicht modal. Die Inhalte bleiben lesbar und bedienbar, der Fokus wird nicht gefangen. Wer die Leiste ignoriert, lädt nichts.
- **Eine Ebene:**
  - ein Satz zum Zweck („Statistik mit Google Analytics, Daten gehen an Google in die USA“),
  - ein Link zur Datenschutzerklärung,
  - zwei gleich große, gleich gestaltete Buttons „Ablehnen“ und „Zulassen“,
  - in DE und EN.
- **Ohne JavaScript:** kein Banner und kein Tracking, die Inhalte bleiben lesbar.
- **Wo:** auf jeder Seite, bis eine Wahl getroffen ist, auch auf den Rechtsseiten.
- **Die Wahl:** Sie liegt in `CookieConsent`, 12 Monate lang, mit dem Consent-Schlüssel (`stamp`) von Cookiebot.
  - Auch die Ablehnung wird gemerkt.
  - Ändern sich das Banner oder die Cookie-Liste, fragt Cookiebot neu.

**Privacy settings**
- **Der Link:** „Datenschutz-Einstellungen“ (EN „Privacy settings“) steht im Footer jeder Seite und in der Datenschutzerklärung. Er ruft `Cookiebot.renew()` auf.
- **Grund für den Footer:** Nach Art. 7 Abs. 3 DSGVO muss der Widerruf so einfach sein wie die Zustimmung.
- **Die Cookie-Liste** in der Datenschutzerklärung ist eigener Text. Die Cookie-Erklärung von Cookiebot (`cd.js`) wird nicht eingebunden.

**GA4-Einstellungen**
- **Aufbewahrung 2 Monate.** Laut Fachartikeln betrifft das nur die Explorations.
- **Ohne Werbung und Verknüpfungen:** Google Signals aus, Personalisierung von Werbung aus, keine Verknüpfung mit Google Ads, keine User-ID.
- **Keine granularen Standort- und Gerätedaten.** Stadt und Gerätemodell fallen weg; Land und Gerätekategorie bleiben laut Sekundärquellen erhalten.
- **`cookie_expires`:** 12 Monate statt 2 Jahre.
- **Messung:**
  - **Seitenaufrufe:** über die erweiterte Messung, samt „Seitenänderungen anhand von Browserverlauf-Ereignissen“. Ausgehende Links misst sie selbst.
  - **Drei eigene Ereignisse:**
    - `cv_download`: Das CV-Formular wurde abgeschickt.
    - `contact_mail`: Klick auf `/mail`.
    - `contact_copy`: der Kopier-Button.
  - **Umsetzung:** mit den eingebauten Klick- und Formular-Triggern in GTM. Wo die nicht greifen, hilft ein `dataLayer.push` im eigenen Code.
- **Sprache:** Sie ergibt sich aus dem Pfad (`/en/…`); ein eigenes Feld gibt es nicht.
- **Eigene Besuche:** Der Owner klickt auf seinen Geräten „Ablehnen“. Einen IP-Filter gibt es nicht.

**Sicherheit**
- **GTM ist mit Absicht eine Einschleusestelle.** Nur unter diesen Regeln hält die Begründung für `'unsafe-inline'` aus dem [Tech-Stack](12-tech-stack.md):
  - Nur der Owner hat Zugang zum Container, mit 2FA.
  - Nur Template-Tags.
  - Kein Custom HTML und keine Custom-JS-Variablen, also kein `'unsafe-eval'`.
- **CSP:** Nonces gibt es keine, denn die Seiten sind vorgerendert. Zusätzlich erlaubt der CSP:
  - `script-src`: `https://www.googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com`
  - `connect-src`: `https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com`
  - `img-src`: `https://www.googletagmanager.com https://*.google-analytics.com https://imgsct.cookiebot.com`
  - `frame-src`: `https://consentcdn.cookiebot.com`
  - `*.google.<TLD>` kommt erst dazu, wenn die Konsole es verlangt.
- **`/builds/**`** behält seinen eigenen CSP, ohne Analytics-Hosts.

**Leistung**
- Das Ziel Lighthouse ≥ 95 mobil bleibt.
- Lighthouse misst den Zustand vor der Wahl, also nur Cookiebot: 38 KB Loader plus die Banner-Daten.
- GTM (89 KB) und gtag (154 KB) laden nur nach der Zustimmung.

**Bausteine für die Datenschutzerklärung.** Abschnitt 7 der [Impressum-Lösung](14-impressum-loesung.md) heißt künftig „Einwilligung und Statistik“:
- **a) Cookiebot (Usercentrics A/S):**
  - **Rolle:** Auftragsverarbeiter.
  - **Daten:** Consent-Schlüssel, Wahl, Zeitpunkt, URL, Sprache, User-Agent, IP und Geo-Standort.
  - **Unterauftragsverarbeiter:** Microsoft Azure (Irland, Ausweichstandort Amsterdam) und Akamai (USA).
  - **Cookie:** `CookieConsent`, 12 Monate.
  - **Grundlage:** Art. 6 Abs. 1 lit. c i. V. m. Art. 7 Abs. 1 DSGVO; § 25 Abs. 2 Nr. 2 TDDDG.
- **b) Google Tag Manager:** lädt nur nach der Zustimmung. Grundlage sind Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
- **c) Google Analytics 4 (Google Ireland Limited; Google LLC, USA):**
  - **Wann:** nur nach der Zustimmung.
  - **Cookies:** `_ga` und `_ga_<id>`, 12 Monate.
  - **Daten:** aufgerufene Seiten, die drei Ereignisse, ausgehende Links, Referrer, Land, Gerätekategorie und Browsersprache.
  - **Was Google nicht tut:** Die IP von EU-Besuchern wird laut Google nicht gespeichert. Signals und Werbefunktionen sind aus.
  - **Rohdaten:** 2 Monate.
  - **Grundlage:** Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
  - **Drittland:** die USA, auf Grundlage des DPF (Art. 45 DSGVO).
- **d) Widerruf:** jederzeit und mit Wirkung für die Zukunft, über „Datenschutz-Einstellungen“.

**Regeln für die Spec**
- **Browser-Speicher:** Die Regel „Der eigene Code setzt nichts im Browser“ wird ergänzt.
  - Der eigene Code setzt weiterhin nichts.
  - Cookiebot speichert die Wahl in `CookieConsent`.
  - GA4 setzt `_ga` und `_ga_<id>` erst nach der Zustimmung.
- **Erklärung im selben Zug:** Das gilt auch für GTM. Wer einen Tag oder ein Cookie hinzufügt, ändert im selben Zug die Datenschutzerklärung und die Cookie-Liste.

**Aufgaben des Owners vor dem Launch**
- **Cookiebot:** Premium Lite buchen und die DPA abschließen. Dabei prüfen, ob Lite ein frei gestaltbares Banner mit eigenem CSS erlaubt.
- **GA4:** die Property anlegen, die Datenverarbeitungsbedingungen von Google annehmen und die Einstellungen von oben setzen.
- **GTM:** den Container anlegen, mit 2FA und dem Owner als einzigem Nutzer.

**Prüfpunkte beim ersten Build**
- **Konsole:** keine CSP-Fehler bei Zustimmung, bei Ablehnung und im GTM-Preview. Dabei zeigt sich auch, ob `*.google.<TLD>` nötig ist. Die Cookiebot-Hosts sind bisher nur aus Suchauszügen belegt.
- **Namen bei Cookiebot:**
  - das Attribut zum Markieren des GTM-Snippets (vermutlich `type="text/plain"` mit `data-cookieconsent="statistics"`),
  - die Einstellung „neu fragen bei Änderung“.
- **Widerruf:** ob Cookiebot dabei `_ga` und `_ga_<id>` löscht. Sonst löscht der eigene Code sie und lädt die Seite neu.
- **Lighthouse:** mobil, ohne Zustimmung, auf der Home und einer Project page.
- **Beim Schreiben der Erklärung zu prüfen:**
  - die Übermittlungsgrundlage für Akamai,
  - Googles Eintrag im DPF,
  - Sitz von Usercentrics und Speicherdauer des Protokolls,
  - ob Cookiebot alte Banner-Texte als Nachweis aufbewahrt (DSK Z. 882–889).
- **GA4 (Google-Hilfe):** dass die Aufbewahrung nur die Explorations betrifft und dass Land und Gerätekategorie ohne granulare Daten erhalten bleiben.

**Fakten aus dieser Sitzung**
- **DSK OH Telemedien 1.1**, selbst gelesen (https://datenschutzkonferenz-online.de/media/oh/20221130_OH_Telemedien_2021_Version_1_1.pdf). Die „Rn.“ in den [Analytics-Fakten](22-analytics-fakten.md) sind Zeilennummern dieses PDF.
  - Z. 209–218: Informationen, die beim Aufruf ohnehin übermittelt werden (IP, URL, User-Agent, Sprache), sind kein „Zugriff“.
  - Z. 219–222: Liest JavaScript aktiv Eigenschaften des Geräts für einen Fingerprint aus, ist das ein Zugriff.
  - Z. 875–889: Der Nachweis braucht „keine langlebigen UID-Cookies“. Es genügen dokumentierte Abläufe, ein Cookie ohne UID und aufbewahrte, auch überholte Banner-Texte.
  - Z. 968–978: Eine eindeutige Kennung im CMP-Cookie ist für den Einwilligungsstatus nicht nötig.
- **VG Hannover, 10 A 5385/22:** tcilaw.de, it-recht-kanzlei.de, dr-datenschutz.de, ihk.de/hannover. Das sind Sekundärquellen, die sich im Kern decken.
- **Cookiebot:**
  - **Cookie:** `CookieConsent` enthält `stamp`, vier Kategorien, `method`, `ver`, `utc` und `region` (Parser sesamy-go; cookiebot.com/en/cookie-solution).
  - **EU-CDN:** `consent.cookiebot.eu` läuft laut Support-Auszug weiter über Akamai in den USA.
  - **Urteile:** Das VG Wiesbaden untersagte Cookiebot Ende 2021 im Eilverfahren wegen Akamai; der VGH Kassel hob das Anfang 2022 auf. Aktenzeichen und Daten sind nicht am Original geprüft.
- **Verworfene Alternativen**, festgehalten für eine spätere Wiederaufnahme:
  - **Umami:** braucht PostgreSQL. Besucher erkennt es über einen Hash aus IP, User-Agent und einem Salt, der monatlich wechselt (docs.umami.is).
  - **Plausible Cloud:** in der EU (Deutschland), ab etwa 9 $ im Monat; den Preis gibt es nur aus Vergleichsseiten, nicht von der Anbieterseite.
  - **Plausible CE:** braucht mindestens 2 GB RAM.

**Folgen für andere Tickets**, jeweils als Kommentar dort:
- [Grundsatzentscheidungen](01-grundsatzentscheidungen.md)
- [Seitenstruktur und Navigation](10-seitenstruktur.md)
- [Design-Richtung](11-design-richtung.md)
- [Tech-Stack](12-tech-stack.md)
- [Impressum-Lösung](14-impressum-loesung.md)
- [SEO zum Start](25-seo-zum-start.md)

## Comments

- 2026-11-15 (Agent, über [Teststrategie](21-teststrategie.md)): Die Prüfpunkte zu Konsole und Lighthouse laufen über `npm run audit` gegen `athaeck.de`.
  - **CSP:** vor der Wahl auf allen 16 Seiten, dazu auf einer Seite je ein Lauf mit Zustimmung und einer mit Ablehnung.
  - **Lighthouse:** mobil vor der Wahl, auf einem DE-Exemplar pro Seitentyp, als Median aus drei Läufen.
  - **GTM-Preview:** bleibt Handarbeit.
  - **GTM-Änderungen:** Jedes Veröffentlichen im GTM-Container löst den CSP-Teil erneut aus.
