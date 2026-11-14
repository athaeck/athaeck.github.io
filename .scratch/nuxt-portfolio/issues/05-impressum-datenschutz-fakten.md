# Impressum und Datenschutz für ein privates Portfolio

Type: research
Status: resolved
Blocked by: –

## Question

Was verlangt deutsches Recht von einer privaten Portfolio-/Bewerbungsseite?

- Impressumspflicht nach § 5 DDG bzw. § 18 MStV: Greift sie, und ab wann?
- Muss es die Wohnadresse sein (ladungsfähige Anschrift), oder sind c/o-Adressen, Impressum-Services oder virtuelle Büros zulässig? Was sagt die aktuelle Rechtsprechung?
- Was muss die Datenschutzerklärung für dieses Setup abdecken: kein Tracking, selbst gehostete Fonts, Server-Logs des Reverse-Proxys (Coolify), selbst gehostete Unity-Embeds, `mailto:`-Kontakt?

Ergebnis: Fakten mit Quellen, keine Rechtsberatung.

## Answer

Details mit Quellen: Branch `research/impressum-datenschutz`, Datei `.scratch/nuxt-portfolio/research/05-impressum-datenschutz-fakten.md`. Recherche in zwei Durchgängen, der zweite eskaliert. Keine Rechtsberatung.

- **Impressum ist nötig.** Laut § 18 Abs. 1 MStV sind nur Angebote „ausschließlich persönlichen oder familiären Zwecken“ befreit. Den Wortlaut habe ich am 2026-11-14 auf gesetze-bayern.de selbst geprüft. Die NLM (Leitfaden 2024) legt diese Ausnahme „sehr eng“ aus und empfiehlt im Zweifel ein einfaches Impressum. Eine öffentliche Bewerbungsseite fällt kaum unter die Ausnahme. Ob § 5 DDG greift, ist strittig. Ein Urteil speziell zu privaten CV-Seiten gibt es nicht.
- **Adresse ohne Wohnanschrift:** Laut NLM ist die Anschrift einer Agentur, eines Büroservices, eines Anwalts oder eines Familienangehörigen zulässig, **wenn dort eine Zustellungsbevollmächtigung besteht**. Nicht ausreichend sind ein Postfach, eine reine Weiterleitungsadresse oder eine „bloße Drittanschrift“. Die Urteile dazu (OLG Frankfurt, OLG München, BGH V ZR 210/22) sind nur sekundär belegt, betreffen teils gar kein Impressum und widersprechen sich teilweise.
- **Datenschutzerklärung ist nötig.** Laut Erwägungsgrund 18 DSGVO und EuGH Ryneš ist die Haushaltsausnahme eng, und sie gilt nicht bei beruflichem Bezug. Server-Logs mit IP-Adressen sind deshalb abzudecken. Inhalt:
  - Verantwortlicher und Kontakt
  - Logs (Zweck, Art. 6 Abs. 1 lit. f, Speicherdauer)
  - Fonts und Embeds selbst gehostet
  - mailto-Kontakt
  - Betroffenenrechte und Beschwerderecht
- **Kontakt in der Datenschutzerklärung:** Art. 13 verlangt „Kontaktdaten“, nicht ausdrücklich eine Postanschrift. Ob es dieselbe Adresse wie im Impressum sein muss, ist ungeklärt.
