# Analytics-Fakten

Type: research
Status: resolved
Blocked by: –

## Question

Was bedeutet es für dieses Setup, Google Analytics 4 über den Google Tag Manager mit Cookiebot als Consent-Banner einzubinden? Gesucht sind Fakten mit Quellen, Stand November 2026, keine Rechtsberatung.

- **Cookiebot:**
  - Tarife und ihre Grenzen für etwa 44 Seiten in zwei Sprachen auf einer Domain, mit Kosten.
  - Wo verarbeitet Usercentrics die Daten (Ort, Drittland)?
  - Einbindung: automatisches oder manuelles Blockieren.
  - Gewicht des Skripts.
- **GA4 und GTM:**
  - Consent Mode v2, Basic und Advanced: Was geht ohne Zustimmung an Google?
  - Cookies und ihre Speicherdauer, Umgang mit der IP-Adresse, Übermittlung in die USA.
  - Gewicht der Skripte.
- **CSP:**
  - Welche Domains brauchen GTM, GA4 und Cookiebot in `script-src`, `connect-src`, `img-src` und `frame-src`?
  - Braucht GTM `'unsafe-eval'`?
  - Wie verträgt sich das mit vorgerenderten Seiten und dem CSP aus dem [Tech-Stack](12-tech-stack.md)?
- **Nuxt:** Stand von `@nuxt/scripts` für GTM, GA4 und Consent unter Nuxt 4.6.
- **Recht:**
  - Was verlangen § 25 TDDDG und die DSGVO vom Banner, etwa Ablehnen auf der ersten Ebene und Blockieren vor der Zustimmung?
  - Aktuelle Aussagen der DSK oder von Gerichten zu GA4.
- **Gegenprobe, kurz:** Was leistet ein selbst gehostetes Zählen ohne Cookies, für das keine Einwilligung nötig ist?

Anlass: [Impressum-Lösung](14-impressum-loesung.md). Der Owner holt Analytics aus Phase 2 in den Start.

## Answer

Details mit Quellen: Branch `research/analytics-fakten`, Datei `.scratch/nuxt-portfolio/research/22-analytics-fakten.md` (lokal, nicht gepusht). Zwei Durchgänge, der zweite eskaliert, dazu eine eigene Messung. Keine Rechtsberatung.

- **Cookiebot:**
  - Free reicht nicht: Der Plan erlaubt nur eine Banner-Sprache, und die Einwilligung gilt höchstens einen Monat. Für DE und EN braucht es **Premium Lite für 7 € im Monat** (unter 50 Unterseiten, eine Domain).
  - Unterauftragsverarbeiter sind Azure (Irland, Ausweichstandort Amsterdam) und Akamai (USA). Laut Usercentrics enthält das Einwilligungsprotokoll keine personenbezogenen Daten.
- **Consent Mode:**
  - *Basic* blockiert die Google-Tags bis zur Zustimmung.
  - *Advanced* lädt sie sofort und sendet vorher Pings ohne Cookies.
  - Die DSK (OH Telemedien 1.1, Rn. 328–332 und 577–607) verlangt die Einwilligung vor jedem Zugriff, der sie braucht, und ein gleichwertiges Ablehnen auf der ersten Ebene.
- **GA4:**
  - Cookies: `_ga` und `_ga_<id>`, je 2 Jahre.
  - IP-Adressen aus der EU speichert GA4 laut Google nicht.
  - Daten gehen in die USA, auf Grundlage des DPF. Das EuG hat es bestätigt, eine Berufung läuft.
- **CSP:**
  - Er muss für `www.googletagmanager.com`, `*.google-analytics.com`, `*.google.com` (jede TLD einzeln) und die Cookiebot-Hosts aufgehen.
  - Google empfiehlt Nonces, die vorgerenderte Seiten nicht haben.
  - Custom-JavaScript-Variablen in GTM brauchen `'unsafe-eval'`.
- **Gewicht (gemessen, komprimiert übertragen):** `gtag.js` 154 KB, `gtm.js` 89 KB, Cookiebot-Loader 38 KB ohne die Banner-Daten.
- **Nuxt:** `@nuxt/scripts` 2 (Beta, ab Nuxt 4.6) lädt Skripte erst nach Zustimmung (`useScriptTriggerConsent`) und kennt `defaultConsent` für GA und GTM. Ein Widerruf entlädt die Skripte nicht.
- **Offen (nicht geprüft):** der Wortlaut der Cookiebot-Support-Seiten (HTTP 403), also CSP-Liste und Ladereihenfolge ohne GTM-Template; die Grundlage für die Übermittlung an Akamai in die USA; ob die stabile v1 von `@nuxt/scripts` Nuxt 4 unterstützt.
