// PROTOTYP, Wegwerf-Code. Geteilte Inhalte (DE) fuer alle Varianten.
// Quelle: content-inventory.md. Mit "Beispiel" markierte Texte sind erfunden und gehoeren dem Owner.
window.VARIANTS = {};
window.D = {
  img: '../../../assets/images/',
  first: 'Nick Philipp',
  last: 'Häcker',
  headline: 'Game Developer · Full-Stack Developer',
  location: 'Stuttgart',
  now: 'Baut gerade an Ready Prepper One, zuerst ein Proof of Concept.',
  email: 'nick.athaeck@gmail.com',
  profiles: [
    { type: 'GitHub', url: 'https://github.com/athaeck' },
    { type: 'LinkedIn', url: 'https://www.linkedin.com/in/nick-haecker/' },
    { type: 'itch.io', url: 'https://athaeck-studios.itch.io' },
  ],
  achievements: [
    { title: 'Medienpreis der Fakultät', detail: 'für AUREA', year: '2021', project: 'aurea' },
    { title: 'Gamescom 2023', detail: 'ElevEntures-Mayhem am HFU-Stand', year: '2023', project: 'eleventures-mayhem' },
    { title: 'GiG xLab', detail: 'MFG Baden-Württemberg', year: '2025' },
  ],
  featured: [
    { slug: 'connecting-minds', title: 'Connecting-Minds', kind: 'Game', platforms: ['AR', 'Mobile'], genre: 'Asymmetrisches Koop-Rätselspiel', years: '2023–2025', start: 2023, cover: 'connecting-minds-thumbnail.png',
      summary: 'Zwei Rollen, Player und Watcher, lösen Rätsel nur gemeinsam. Masterarbeit: Kann ein Spiel Kommunikation untersuchen und verbessern?' },
    { slug: 'a-fraction-of-time', title: 'A Fraction of Time', kind: 'Game', platforms: ['Desktop', 'Web'], genre: 'Zeitreise-Puzzle-Adventure', years: '2021–2023', start: 2021, cover: 'a-fraction-of-time-thumbnail.png',
      summary: 'Der Spieler erzeugt parallele Zeitlinien seiner selbst und löst damit Rätsel. Erst Team-Prototyp, dann allein als Bachelorarbeit neu gebaut.' },
    { slug: 'aurea', title: 'AUREA', kind: 'Game', platforms: ['AR', 'Mobile'], genre: 'Rundenbasiertes AR-Arena-Spiel', years: '2020–2021', start: 2020, cover: 'aurea-thumbnail.png', badge: 'Medienpreis 2021',
      summary: 'Multiplayer-Kampfspiel für Android in einer mystischen Fantasywelt, platziert per Augmented Reality.' },
    { slug: 'eleventures-mayhem', title: 'ElevEntures-Mayhem', kind: 'Game', platforms: ['VR'], genre: 'Minispiel-Sammlung im Aufzug', years: '2023', start: 2023, cover: 'eleventures-mayhem-thumbnail.png', badge: 'Gamescom 2023',
      summary: 'Ein Aufzug als Portal: Jedes Level ist ein VR-Minispiel in einer anderen Welt, kommentiert vom Aufzugslautsprecher.' },
    { slug: 'free3d', title: 'Free3D', kind: 'Research', platforms: ['Desktop'], genre: 'Free-Viewpoint-3D-Video', years: '2023–2024', start: 2023, cover: 'free-3d-thumbnail.png',
      summary: 'Hochwertige 3D-Szenen mit nur drei Azure Kinect. Eigener Teil: die Recorder-Middleware, die alle Aufnahmen steuert.' },
    { slug: 'three-ls', title: 'Three.LS', kind: 'Tool', platforms: ['AR', 'Web'], genre: 'L-System-Pflanzengenerator', years: '2021–2022', start: 2021, cover: 'three-ls-thumbnail.png',
      summary: 'Bäume und Pflanzen per L-System in three.js erzeugen, exportieren und in AR ansehen.' },
    { slug: 'ona-tech', title: 'ONA TECH', kind: 'Game', platforms: ['Desktop'], genre: 'Sci-Fi-Puzzle-Adventure', years: '2026', start: 2026, cover: null,
      summary: 'Ein Rätsel-Adventure über KI und Menschsein, gebaut in Unreal beim Global Game Jam 2026.' },
  ],
  // Fuer Variante B: Stationen des Zeit-Scrubbers (aus dem CV verdichtet).
  timeline: [
    { year: '2017', label: 'FSJ', text: 'Freiwilliges Soziales Jahr in Jugendhilfe und Tagespflege. Nebenbei entsteht ein erster Kurzfilm.' },
    { year: '2019', label: 'Studium', text: 'Beginnt Medieninformatik an der Hochschule Furtwangen.' },
    { year: '2020', label: 'Erster Job', text: 'Praxissemester bei asellerate: ein Vue-Shop, der erste eigene Code in Produktion.' },
    { year: '2021', label: 'Medienpreis', text: 'AUREA, ein AR-Multiplayer-Spiel im Team, gewinnt den Medienpreis der Fakultät.', star: true },
    { year: '2023', label: 'Gamescom', text: 'Bachelorarbeit A Fraction of Time. ElevEntures-Mayhem steht auf der Gamescom.', star: true },
    { year: '2025', label: 'Master', text: 'Masterarbeit Connecting-Minds. Jr. Full-Stack Developer bei asellerate. GiG xLab der MFG.', star: true },
    { year: '2026', label: 'Jetzt', text: 'ONA TECH beim Global Game Jam. Baut gerade an Ready Prepper One, zuerst ein Proof of Concept.', now: true },
  ],
  // Beispiel-Project-page: fuer alle Varianten dieselbe, damit der Vergleich fair ist.
  project: {
    slug: 'a-fraction-of-time', index: 2,
    title: 'A Fraction of Time', kind: 'Game', platforms: ['Desktop', 'Web'], genre: 'Zeitreise-Puzzle-Adventure', years: '2021–2023', start: 2021,
    summary: 'Der Spieler erzeugt parallele Zeitlinien seiner selbst und löst damit Rätsel.',
    cover: 'a-fraction-of-time-thumbnail.png', coverAlt: 'Spielfigur in einer Schlucht, oben rechts die Zeitlinien-Anzeige',
    engine: 'Unity (URP)',
    role: 'Konzept & Prototyp im Team, dann Neuentwicklung allein',
    team: '6, dann solo',
    phases: [
      { when: 'WS 2021/22', context: 'Gamedesign-Workshop, HFU', team: 'Team · 6', role: 'Konzept und erster Prototyp', share: 0.3 },
      { when: '2022 – Feb 2023', context: 'Bachelorarbeit, HFU', team: 'Solo', role: 'Technische Neuentwicklung, Tutorial, zweites Szenario', share: 0.7 },
    ],
    question: 'Wie vermittelt man ein Spiel mit parallelen Zeitlinien als leicht verständliches Tutorial? Und wie komplex dürfen Rätsel sein, damit sie maximal fordern?',
    approach: 'Zeitreisemechaniken in Vergleichsspielen analysiert. Den Team-Prototyp technisch neu gebaut: Aktionen werden zur Laufzeit aufgezeichnet und als „Aufnahmen des Chronologen“ wieder abgespielt.',
    result: 'Ein erweiterbares System mit Tutorial und zweitem Szenario, evaluiert per Thinking Aloud und eigenem Fragebogen. Bachelorarbeit mit 1,1; der WebGL-Prototyp läuft im Browser.',
    contributions: [
      'Zeitreisemechaniken in Vergleichsspielen analysiert',
      'Zeitreisemechanik zur Laufzeit entwickelt',
      'Level überarbeitet und um ein zweites Szenario erweitert',
      'Evaluation per Thinking Aloud und eigenem Fragebogen',
    ],
    learnings: [ // Beispieltext
      'Eine neue Mechanik braucht ein Tutorial, das sie Schritt für Schritt aufbaut.',
      'Rätsel-Schwierigkeit ist eine Kurve, kein fester Wert.',
      'Prototyp-Code trägt keine Thesis: Erst die Neuentwicklung machte das System erweiterbar.',
    ],
    // Fuer Variante D: was im Spiel steckt. Verdichtet aus content-inventory.md (Beispieltext);
    // die passenden Bilder liegen im Thesis-Repo unter content/pictures/, bis dahin Ausschnitte des Covers.
    features: [
      { title: 'Aufnehmen', text: 'Jede Aktion wird zur Laufzeit aufgezeichnet: eine Aufnahme des Chronologen.', media: 'Chronologe.jpg', crop: '82% 14%', zoom: 2.1 },
      { title: 'Mit dir selbst spielen', text: 'Die Aufnahmen laufen parallel zu dir weiter. Rätsel löst du nur gemeinsam mit deinen früheren Ichs.', media: 'Ghost.jpg', crop: '50% 52%', zoom: 1.5, echo: true },
      { title: 'Steigern', text: 'Ein Tutorial baut die Mechanik Schritt für Schritt auf. Das zweite Szenario fordert danach maximal.', media: 'Labor - A Fraction of Time.jpg', crop: '86% 88%', zoom: 2.2 },
    ],
    video: '#', // Beispiel: Ein Trailer fehlt noch; am Handy ersetzt er „Im Browser spielen“.
    skills: ['Unity', 'C#', 'URP', 'Cinemachine', 'Desktop', 'Web'],
    links: [
      { type: 'Im Browser spielen', url: 'https://athaeck.github.io/A-fraction-of-time/Release/index.html' },
      { type: 'Repository', url: 'https://github.com/athaeck/a-fraction-of-time-bachelorarbeit' },
    ],
    next: { title: 'AUREA', index: 3, start: 2020, cover: 'aurea-thumbnail.png' },
  },
};

D.meta = p => [p.kind, ...p.platforms].join(' · ');
D.cover = p => p.cover ? D.img + 'thumbnails/' + p.cover : null;
D.logo = D.img + 'logo/Logo.png';
D.portrait = D.img + 'portrait/portrait.webp';
D.pad = n => String(n).padStart(2, '0');

const ICONS = {
  projects: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>',
  cv: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>',
  about: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9.5 17h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
};
D.icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;

// Runde 5 (Ticket 19): Inhalte fuer Projects, Lebenslauf und Ueber mich. Quelle: content-inventory.md.
// Erfunden und als "Beispiel" markiert: Genres im Archiv, deutsche Bio und Services, die Belege der Skills.
Object.assign(D, {
  // Archiv: sortiert nach dem Ende der letzten Phase, das neueste zuerst.
  archive: [
    { title: 'Human Factors in VR', kind: 'Research', platforms: ['VR'], genre: 'Paper als Erstautor', year: 2023 },
    { title: 'Terrain Generator', kind: 'Tool', platforms: [], genre: 'Prozedurale Landschaften', year: 2022 },
    { title: 'AUREA Novel', kind: 'Game', platforms: ['Web'], genre: 'Visual Novel', year: 2022 },
    { title: 'Dying Light Workbench', kind: 'Asset', platforms: [], genre: '3D-Modell mit Texturen', year: 2021 },
    { title: 'Chess Game', kind: 'Game', platforms: ['Web'], genre: '3D-Schach im Browser', year: 2021 },
    { title: 'Allocation Algorithm', kind: 'Tool', platforms: [], genre: 'Zuordnung ins Projektstudium', year: 2021 },
    { title: 'FSJ Film', kind: 'Film', platforms: [], genre: 'Kurzfilm', year: 2018 },
  ],
  work: { org: 'asellerate GmbH', span: 'Seit 2020: vom Praxissemester zum Full-Stack Developer', roles: [
    { title: 'Jr. Full-Stack Developer', when: '09/2025 – heute', items: ['Shop-Administration, Erweiterungen bauen und deployen', 'Preisberechnung angepasst', 'Elasticsearch-Indexer für genauere Fahrzeug-Auswahl erweitert', 'Neues PIM mit Anbindung an die TecDoc Data Receiver API', 'Seit 03/2026: System-Prompts und Context-Layer für einen LLM-Chat'] },
    { title: 'Werkstudent Webentwicklung', when: '04/2022 – 08/2025', items: ['Kategorie- und Fahrzeugbühnen im neuen Design', 'Mapping eines Kategoriebaums', 'Warenkorb-Übertragung zu HubSpot', 'OEM-Landingpage', 'Facebook Pixel über Google Tag Manager', 'Mapping für interne CMS-Verlinkungen'] },
    { title: 'Werkstudent Frontend-Entwickler', when: '09/2020 – 03/2022', items: ['Erweiterungen und Bugfixes im Webshop', 'Ladezeit-Optimierung', 'Cookiebot-Consent', 'Google Tag Manager'] },
    { title: 'Praxissemester Webentwicklung', when: '03/2020 – 08/2020', items: ['Vue-basierter E-Commerce-Shop', 'Headless-CMS für Landingpages', 'SEO-Optimierungen'] },
  ] },
  volunteering: [
    { title: 'Ehrenamtlicher Freizeitbetreuer', org: 'Evangelischer Reisedienst e. V.', when: '05/2016 – heute', text: 'Sommer- und Winterfreizeiten vorbereiten, begleiten und betreuen.' },
    { title: 'Studienkommission Medieninformatik Master', org: 'HFU, Fakultät Digitale Medien', when: '09/2023 – 08/2024', text: 'Den Studiengang weiterentwickelt.' },
    { title: 'Fakultätsrat und Studienkommissionen', org: 'HFU, Fakultät Digitale Medien', when: '09/2019 – 08/2021', text: 'Veranstaltungen der Fachschaft, Schlichtung zwischen Studierenden und Dozierenden, Studiengänge weiterentwickelt.' },
    { title: 'Freiwilliges Soziales Jahr', org: 'Jugendhilfe Korntal und Emma-Reichle-Heim', when: '09/2017 – 08/2018', text: 'Hausaufgabenhilfe und Freizeitbetreuung; Tagespflege und Alltagsbegleitung für Menschen mit Demenz.' },
  ],
  education: [
    { title: 'M.Sc. Medieninformatik', org: 'Hochschule Furtwangen', when: '03/2023 – 08/2025', thesis: 'Connecting-Minds', items: ['Machine Learning', 'Deep Learning', 'Algorithmen', 'Datenanalyse', 'Game Studies', 'AR', 'VR', 'Computer Vision'] },
    { title: 'B.Sc. Medieninformatik', org: 'Hochschule Furtwangen', when: '03/2019 – 02/2023', thesis: 'A Fraction of Time', items: ['Mathe', 'Physik', 'BWL', 'Java', 'Webentwicklung', 'Computergrafik', 'Computer Vision', 'Game Development', '3D-Modellierung', 'Game Analysis', 'Game Narration'] },
    { title: 'Allgemeine Hochschulreife', org: 'Evangelisches Mörike-Gymnasium Stuttgart', when: '2009 – 2017' },
  ],
  // Alle achievement-CV-entries, das neueste zuerst; featured = Streifen auf der Home.
  awards: [
    { title: 'Seminar „Aktuelle KI-Tools strategisch nutzen“', org: 'MFG-Akademie', when: '10/2026' },
    { title: 'GiG xLab', org: 'MFG Baden-Württemberg', when: '10/2025', text: 'Gamification-Ansatz für die Demenz-App Idememory erarbeitet und gepitcht.', featured: true },
    { title: 'Gamescom 2023', org: 'HFU-Stand', when: '08/2023', text: 'ElevEntures-Mayhem vorgestellt.', project: 'ElevEntures-Mayhem', featured: true },
    { title: 'Zertifikat DIGITAL GAMES', org: 'Fakultät Digitale Medien, HFU', when: '12/2022', text: 'Kompetenzfeld aus sechs Game-Modulen, von Narration bis Echtzeit-Computergrafik.' },
    { title: 'Cybersicherheitstag', org: 'Landtag Baden-Württemberg', when: '10/2022', text: 'Das Awareness-Lernspiel zu Phishing-Mails betreut.' },
    { title: 'Medienpreis der Fakultät', org: 'Fakultät Digitale Medien, HFU', when: '07/2021', text: 'Jury: „… ein rundenbasiertes mobiles Multiplayer AR-Spiel von A bis Z entworfen und umgesetzt.“', project: 'AUREA', featured: true },
  ],
  // Skill-Gruppen aus dem Inhaltsmodell. Belege: Beispiel (im Build abgeleitet aus den Verweisen von Projects und CV-Einträgen).
  // Die Gruppe Plattformen leitet die Seite echt aus den Projects ab.
  skills: [
    ['Programmier­sprachen', [['C#', ['Connecting-Minds', 'A Fraction of Time', 'AUREA', 'ElevEntures-Mayhem']], ['TypeScript / JavaScript', ['Three.LS', 'Chess Game', 'Jr. Full-Stack Developer', 'Werkstudent Webentwicklung']], ['Python', ['Free3D', 'M.Sc. Medieninformatik']], ['Java', ['Allocation Algorithm', 'B.Sc. Medieninformatik']], ['C++', ['ONA TECH']]]],
    ['Engines', [['Unity', ['Connecting-Minds', 'A Fraction of Time', 'AUREA', 'ElevEntures-Mayhem', 'Human Factors in VR']], ['Unreal', ['ONA TECH']]]],
    ['Frameworks', [['Vue.js', ['Jr. Full-Stack Developer', 'Werkstudent Webentwicklung', 'Praxissemester Webentwicklung']], ['React', ['Werkstudent Webentwicklung']], ['Node.js', ['Free3D', 'Jr. Full-Stack Developer']], ['Express.js', ['Free3D']]]],
    ['Datenbanken', [['Elasticsearch', ['Jr. Full-Stack Developer']], ['PostgreSQL', ['Jr. Full-Stack Developer']], ['MongoDB', ['AUREA']], ['Redis', ['Jr. Full-Stack Developer']], ['CouchDB', ['Werkstudent Webentwicklung']], ['Supabase', ['Connecting-Minds']]]],
    ['Protokolle', [['REST', ['Jr. Full-Stack Developer', 'Free3D']], ['WebSockets', ['AUREA', 'Connecting-Minds']]]],
    ['Tools', [['Docker', ['Free3D', 'Jr. Full-Stack Developer']]]],
    ['Methoden', [['Scrum', ['AUREA', 'Werkstudent Webentwicklung']], ['Kanban', ['Free3D']]]],
  ],
  languages: [['Deutsch', 'Muttersprache'], ['Englisch', 'B2']],
  bio: [ // Beispiel: deutsche Fassung der Kernaussagen der EN-Bio
    'Ich entwickle Spiele und Web-Anwendungen. Am liebsten baue ich Prototypen für neue Spielideen und ungewohnte Mechaniken, etwa eine Zeitreise, bei der das Spiel deine Aktionen aufzeichnet und später wieder abspielt.',
    'Mich interessiert, wie Spiele Menschen zusammenbringen. In meiner Masterarbeit habe ich untersucht, wie ein asymmetrischer Multiplayer die Kommunikation beim gemeinsamen Rätseln verbessert.',
    'Bachelor und Master in Medieninformatik habe ich an der Hochschule Furtwangen gemacht. Ich arbeite am liebsten mit Unity, kenne Unreal und Godot und baue bei asellerate Web-Apps mit Vue und Nuxt.',
  ],
  services: [ // Beispiel: deutsche Fassung der Services der Live-Seite
    { title: 'Game Programming', text: 'Sauberer, strukturierter Code, der sich leicht pflegen und erweitern lässt.' },
    { title: 'Narrative Design', text: 'Welt, Figuren und Geschichte, in die Spieler eintauchen.' },
    { title: 'Game Design', text: 'Spielmechaniken, Leveldesign und Benutzeroberfläche.' },
    { title: 'Webentwicklung', text: 'Websites und Web-Apps auf professionellem Niveau.' },
  ],
  interests: ['Eigene Spielprototypen', 'Outdoor und Wandern', 'Fußball und Sport', 'Musik, Konzerte, Festivals'],
});
