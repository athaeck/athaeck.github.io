// PROTOTYP, Wegwerf-Code. Variante B „Zeitlinien“: hell/dunkel-Kontrast, Zeit-Scrubber, Zeitsprung-Übergang.
(() => {
const css = `
:root{--paper:#f2f0eb;--ink:#0b0b0c;--muted:#66666c;--line:#d6d2c9;--chrono:#2b50ff;--g1:#00c2d8;--g2:#ff3d81;--maxw:1240px}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font:400 17px/1.55 Exo,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}
:focus-visible{outline:3px solid var(--chrono);outline-offset:3px}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 40px}
.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:12px;z-index:99;background:var(--ink);color:var(--paper);padding:8px 12px}
.top{position:sticky;top:0;z-index:20;background:var(--paper);border-bottom:1.5px solid var(--ink)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;height:60px}
.logo img{height:20px;display:block}
.nav{display:flex;gap:30px;align-items:center}
.nav a{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:6px 0}
.nav a:hover{color:var(--chrono)}
.nav a[aria-current]{box-shadow:inset 0 -2px var(--ink)}
.lang{font-size:13px;font-weight:700;letter-spacing:.1em;text-decoration:none;color:var(--muted)}
.lang b{color:var(--ink)}

/* Hero */
.hero{padding:40px 0 0}
.hero h1{font-size:clamp(54px,8.4vw,132px);line-height:.84;font-weight:800;letter-spacing:-.04em;margin:0}
.hero h1 span{display:block}
.hero h1 span:last-child{padding-left:.9em}
.sub{display:flex;justify-content:space-between;align-items:flex-end;gap:24px 40px;margin-top:30px;flex-wrap:wrap}
.headline{font-size:clamp(20px,2.1vw,28px);font-weight:700;margin:0;line-height:1.2}
.headline small{display:block;font-size:15px;font-weight:500;color:var(--muted);margin-top:6px;letter-spacing:.02em}
.ctas{display:flex;gap:28px}
.ctas a{font-size:19px;font-weight:800;text-decoration:none;border-bottom:3px solid var(--ink);padding-bottom:2px;transition:color .2s,border-color .2s}
.ctas a:hover{color:var(--chrono);border-color:var(--chrono)}
.awards{display:flex;flex-wrap:wrap;margin-top:28px;border-top:1.5px solid var(--ink);border-bottom:1px solid var(--line)}
.awards a{flex:1 1 220px;display:flex;gap:14px;align-items:baseline;padding:14px 20px 14px 0;text-decoration:none;font-weight:700;font-size:15px}
.awards a+a{padding-left:20px;border-left:1px solid var(--line)}
.awards small{font-weight:800;color:var(--chrono);font-variant-numeric:tabular-nums}
.awards em{font-style:normal;font-weight:500;color:var(--muted)}
.awards a:hover{color:var(--chrono)}

/* Zeit-Scrubber */
.chrono{margin:30px 0 0;display:grid;grid-template-columns:230px minmax(0,1fr);gap:20px 40px;padding:28px 32px 18px;transition:background .45s,color .45s;border:1.5px solid var(--ink)}
.chrono[data-past="true"]{background:var(--ink);color:var(--paper)}
.stamp .lbl{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--chrono);font-weight:800}
.chrono[data-past="true"] .stamp .lbl{color:var(--g1)}
.stamp .yr{font-size:76px;font-weight:800;line-height:.95;font-variant-numeric:tabular-nums;letter-spacing:-.04em}
.moment{position:relative;min-height:84px;align-self:center}
.moment p{font-size:clamp(18px,1.8vw,24px);font-weight:600;margin:0;max-width:44ch;line-height:1.35}
.ghost{position:absolute;inset:0;pointer-events:none;color:transparent!important;text-shadow:-3px 0 var(--g1),3px 0 var(--g2);animation:ghost 1.3s ease-out forwards}
@keyframes ghost{0%{opacity:.7;transform:translateX(0);filter:blur(0)}100%{opacity:0;transform:translateX(-56px);filter:blur(4px)}}
.mat{animation:mat .55s ease-out}
@keyframes mat{0%{opacity:0;filter:blur(8px);transform:translateX(24px)}60%{opacity:1;text-shadow:2px 0 var(--g1),-2px 0 var(--g2)}100%{text-shadow:none}}
.scrub{grid-column:1/-1;position:relative;padding-top:6px}
.scrub input{-webkit-appearance:none;appearance:none;width:100%;height:40px;background:transparent;margin:0;cursor:ew-resize}
.scrub input::-webkit-slider-runnable-track{height:2px;background:currentColor}
.scrub input::-moz-range-track{height:2px;background:currentColor}
.scrub input::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:34px;margin-top:-16px;background:var(--chrono);border:0;border-radius:1px;box-shadow:0 0 0 4px rgba(43,80,255,.18)}
.scrub input::-moz-range-thumb{width:14px;height:34px;background:var(--chrono);border:0;border-radius:1px}
.ticks{display:flex;justify-content:space-between;margin:0 -2px;padding:0;list-style:none}
.ticks button{all:unset;cursor:pointer;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums;opacity:.55;text-align:center;min-width:34px}
.ticks button:hover,.ticks button[aria-current]{opacity:1}
.ticks button[aria-current]{color:var(--chrono)}
.chrono[data-past="true"] .ticks button[aria-current]{color:var(--g1)}
.ticks .star::after{content:" ★";color:var(--chrono)}
.scrub-hint{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:8px}
.chrono[data-past="true"] .scrub-hint{color:#8d8d93}
.scrub-hint button{all:unset;cursor:pointer;color:var(--g1);font-weight:800;visibility:hidden}
.chrono[data-past="true"] .scrub-hint button{visibility:visible}
.gm-slot{display:inline-block;margin-top:14px;border:1.5px dashed var(--muted);color:var(--muted);font-size:13px;font-weight:600;padding:8px 12px}

/* Projects (dunkles Band) */
.band{background:var(--ink);color:var(--paper);padding:110px 0 120px;margin-top:96px}
.band .kick{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#8d8d93;margin:0 0 18px}
.band h2{font-size:clamp(44px,7.4vw,120px);font-weight:800;line-height:.86;margin:0 0 72px;letter-spacing:-.04em}
.band h2 em{font-style:normal;color:transparent;-webkit-text-stroke:1.5px var(--paper)}
.pcard{display:block;text-decoration:none;color:inherit}
.pcard .img{overflow:hidden;background:#19191b;aspect-ratio:4/3}
.pcard img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.pcard:hover img{transform:scale(1.045)}
.pcard .ph{width:100%;height:100%;display:grid;place-items:center;font-size:clamp(28px,4vw,56px);font-weight:800;letter-spacing:-.02em;color:#2a2a2e;background:repeating-linear-gradient(90deg,#141416 0 2px,transparent 2px 22px),#19191b}
.idx{display:flex;justify-content:space-between;font-size:13px;font-weight:700;letter-spacing:.14em;color:#8d8d93;margin:18px 0 8px;font-variant-numeric:tabular-nums}
.pcard h3{font-size:clamp(28px,3.2vw,46px);margin:0;font-weight:800;letter-spacing:-.025em;line-height:1}
.pcard:hover h3{color:var(--g1)}
.pmeta{font-size:14px;color:#b3b3b8;margin-top:8px;font-weight:600}
.pcard p{color:#9d9da3;margin:10px 0 0;max-width:48ch}
.badge{display:inline-block;margin-top:14px;background:var(--paper);color:var(--ink);font-weight:800;font-size:12px;padding:4px 9px;letter-spacing:.08em;text-transform:uppercase}
.lead-p{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:48px;align-items:end;margin-bottom:110px}
.lead-p .img{aspect-ratio:16/10}
.lead-p .idx{margin-top:0}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:110px 64px}
.pgrid>:nth-child(even){transform:translateY(140px)}
.all{display:inline-block;margin-top:220px;font-size:clamp(28px,4vw,60px);font-weight:800;letter-spacing:-.02em;text-decoration:none;border-bottom:4px solid var(--paper);line-height:1.1}
.all:hover{color:var(--g1);border-color:var(--g1)}

/* Footer */
footer{padding:110px 0 40px}
.f-kick{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:0 0 16px}
.mail{font-size:clamp(30px,6vw,88px);font-weight:800;letter-spacing:-.035em;text-decoration:none;line-height:1;word-break:break-all}
.mail:hover{color:var(--chrono)}
.f-row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-top:40px;font-weight:700}
.f-row a{text-decoration:none;margin-right:24px}
.f-row a:hover{color:var(--chrono)}
.legal{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-top:80px;padding-top:18px;border-top:1.5px solid var(--ink);font-size:14px;color:var(--muted)}
.legal a{text-decoration:none;margin-right:20px}

/* Zeitsprung */
.jump{position:fixed;inset:0;z-index:100;background:var(--ink);color:var(--paper);display:grid;place-content:center;text-align:center;opacity:0;pointer-events:none;transition:opacity .18s}
.jump.on{opacity:1}
.jump .jy{font-size:clamp(90px,22vw,320px);font-weight:800;line-height:.9;letter-spacing:-.05em;font-variant-numeric:tabular-nums;text-shadow:-6px 0 var(--g1),6px 0 var(--g2)}
.jump .jl{font-size:14px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:#8d8d93;margin-top:12px}
.jump::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0 1px,transparent 1px 3px)}

/* Project page */
.back{display:inline-block;margin:40px 0 26px;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;text-decoration:none}
.back:hover{color:var(--chrono)}
.p-kick{font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--chrono);margin:0 0 14px}
.p-h1{font-size:clamp(48px,8.6vw,136px);line-height:.86;font-weight:800;letter-spacing:-.04em;margin:0}
.p-lead{font-size:clamp(19px,1.8vw,24px);font-weight:600;max-width:46ch;margin:24px 0 0;line-height:1.35}
.p-lead span{color:var(--muted);font-weight:500}
.facts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin:40px 0 0;border-top:1.5px solid var(--ink)}
.facts div{padding:14px 18px 14px 0}
.facts div+div{padding-left:18px;border-left:1px solid var(--line)}
.facts dt{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.facts dd{margin:4px 0 0;font-weight:700;font-size:15px;line-height:1.35}
.phases{margin-top:56px}
.phases h2,.story h2,.tail h2{font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0 0 16px}
.pbar{display:flex;gap:4px}
.pseg{border-top:6px solid var(--ink);padding-top:12px}
.pseg:first-child{border-top-color:#9a9aa1}
.pseg .w{font-size:13px;font-weight:800;letter-spacing:.06em;font-variant-numeric:tabular-nums}
.pseg h3{margin:4px 0 2px;font-size:19px}
.pseg p{margin:0;color:var(--muted);font-size:15px}
.p-embed{background:var(--ink);margin-top:72px;padding:56px 0}
.p-embed figure{margin:0;position:relative;aspect-ratio:16/8;overflow:hidden}
.p-embed img{width:100%;height:100%;object-fit:cover;display:block;opacity:.6}
.p-embed .play{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:14px;color:var(--paper);text-align:center}
.p-embed .play a{display:inline-flex;align-items:center;gap:14px;font-size:clamp(22px,3vw,40px);font-weight:800;text-decoration:none;letter-spacing:-.02em;border-bottom:4px solid var(--paper)}
.p-embed .play a .ic{width:.9em;height:.9em}
.p-embed .play small{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#bdbdc3}
.story{padding-top:90px}
.blk{display:grid;grid-template-columns:120px minmax(0,1fr);gap:24px;padding:28px 0;border-top:1px solid var(--line)}
.blk .n{font-size:64px;font-weight:800;line-height:.9;letter-spacing:-.04em;color:#c9c5bb}
.blk h3{font-size:clamp(24px,2.4vw,32px);margin:0 0 10px;letter-spacing:-.015em}
.blk p{margin:0;max-width:62ch;font-size:18px}
.blk ul{margin:0;padding-left:20px;max-width:62ch;font-size:18px}
.learn{background:var(--ink);color:var(--paper);padding:90px 0;margin-top:80px}
.learn h2{font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8d8d93;margin:0 0 30px}
.learn ol{margin:0;padding:0;list-style:none;counter-reset:l}
.learn li{counter-increment:l;font-size:clamp(24px,3vw,40px);font-weight:700;letter-spacing:-.02em;line-height:1.15;padding:18px 0;border-top:1px solid #2a2a2e;display:grid;grid-template-columns:80px 1fr}
.learn li::before{content:counter(l,decimal-leading-zero);font-size:14px;font-weight:800;color:var(--g1);padding-top:.5em}
.tag-ex{font-size:11px;letter-spacing:.08em;background:#8d8d93;color:#000;padding:2px 6px;margin-left:8px}
.tail{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:72px 0 0}
.tail ul{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}
.tail li a{display:inline-block;border:1.5px solid var(--ink);padding:5px 12px;font-weight:700;font-size:14px;text-decoration:none}
.tail li a:hover{background:var(--ink);color:var(--paper)}
.tail .links a{display:block;font-size:24px;font-weight:800;text-decoration:none;border-bottom:1px solid var(--line);padding:8px 0}
.tail .links a:hover{color:var(--chrono)}
.nextband{display:grid;grid-template-columns:minmax(0,1fr) 40%;align-items:center;gap:40px;background:var(--ink);color:var(--paper);margin-top:110px;padding:64px max(40px,calc((100vw - var(--maxw))/2 + 40px));text-decoration:none}
.nextband .k{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#8d8d93}
.nextband strong{display:block;font-size:clamp(44px,7vw,110px);font-weight:800;letter-spacing:-.04em;line-height:.9;margin-top:10px}
.nextband img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;opacity:.7;transition:opacity .3s}
.nextband:hover img{opacity:1}
.nextband:hover strong{color:var(--g1)}

/* 404 */
.nf{padding:80px 0 40px}
.nf h1{font-size:clamp(120px,26vw,380px);line-height:.8;font-weight:800;letter-spacing:-.06em;margin:0;animation:glitch 2.6s infinite steps(1)}
@keyframes glitch{0%,86%,100%{text-shadow:none;transform:none}88%{text-shadow:-8px 0 var(--g1),8px 0 var(--g2);transform:translateX(6px)}92%{text-shadow:6px 0 var(--g1),-6px 0 var(--g2);transform:translateX(-4px)}}
.nf p{font-size:clamp(22px,2.6vw,34px);font-weight:700;max-width:30ch;letter-spacing:-.015em;margin:28px 0 0;line-height:1.2}
.nf p span{color:var(--muted);font-weight:500}
.nf .ctas{margin-top:36px;flex-wrap:wrap}

@media (max-width:860px){
  .wrap{padding:0 16px}
  .top{border-bottom-width:1px}
  .top .wrap{flex-wrap:wrap;height:auto;padding-top:12px;gap:0}
  .nav{order:3;width:100%;justify-content:space-between;gap:0;border-top:1px solid var(--line);margin-top:10px}
  .nav a{font-size:11px;letter-spacing:.08em;padding:11px 0}
  .lang-top{order:2}
  .hero{padding-top:34px}
  .hero h1 span:last-child{padding-left:0}
  .ctas{gap:22px}
  .awards a,.awards a+a{flex-basis:100%;border-left:0;padding:11px 0;border-top:1px solid var(--line)}
  .awards a:first-child{border-top:0}
  .chrono{grid-template-columns:1fr;padding:20px 16px 14px;gap:10px}
  .stamp{display:flex;align-items:baseline;gap:14px}
  .stamp .yr{font-size:48px}
  .moment{min-height:96px}
  .ticks button{font-size:11px;min-width:0}
  .ticks .star::after{content:"★"}
  .band{padding:72px 0 80px;margin-top:64px}
  .lead-p,.pgrid,.tail{grid-template-columns:1fr;gap:56px}
  .lead-p{margin-bottom:56px}
  .pgrid>:nth-child(even){transform:none}
  .all{margin-top:64px}
  .facts{grid-template-columns:1fr 1fr}
  .facts div,.facts div+div{padding:12px 12px 12px 0;border-left:0;border-bottom:1px solid var(--line)}
  .pbar{flex-direction:column;gap:18px}
  .pseg{flex:none!important}
  .p-embed{padding:0}
  .p-embed figure{aspect-ratio:4/3}
  .blk{grid-template-columns:1fr;gap:4px}
  .blk .n{font-size:36px}
  .learn li{grid-template-columns:44px 1fr}
  .nextband{grid-template-columns:1fr;padding:48px 16px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const nav = (cur) => `
  <a class="skip" href="#main">Zum Inhalt</a>
  <header class="top"><div class="wrap">
    <a class="logo" href="${link('home')}" aria-label="athaeck – Startseite"><img src="${D.logo}" alt="athaeck"></a>
    <nav class="nav" aria-label="Hauptnavigation">
      <a href="${link('home', '#projects')}"${cur === 'projects' ? ' aria-current="page"' : ''}>Projekte</a>
      <a href="#">Lebenslauf</a>
      <a href="#">Über mich</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <a class="lang lang-top" href="#" hreflang="en"><b>DE</b> / EN</a>
  </div></header>`;

const footer = () => `
  <footer id="kontakt"><div class="wrap">
    <p class="f-kick">Kontakt · ${D.location}</p>
    <a class="mail" href="mailto:${D.email}">${D.email}</a>
    <div class="f-row"><div>${D.profiles.map(p => `<a href="${p.url}">${p.type} ↗</a>`).join('')}</div></div>
    <div class="legal"><div><a href="#">Impressum</a><a href="#">Datenschutz</a></div><a class="lang" href="#" hreflang="en"><b>DE</b> / EN</a></div>
  </div></footer>
  <div class="jump" aria-hidden="true"><div class="jy">2026</div><div class="jl">Zeitsprung</div></div>`;

const card = (p, i, lead) => `
  <a class="pcard${lead ? ' lead-p' : ''}" href="${link('project')}" data-jump="${p.start}">
    <div class="img">${D.cover(p) ? `<img src="${D.cover(p)}" alt="" loading="lazy">` : `<div class="ph">${p.title}</div>`}</div>
    <div>
      <div class="idx"><span>${D.pad(i + 1)} / ${D.pad(D.featured.length)}</span><span>${p.years}</span></div>
      <h3>${p.title}</h3>
      <div class="pmeta">${D.meta(p)} · ${p.genre}</div>
      <p>${p.summary}</p>
      ${p.badge ? `<span class="badge">★ ${p.badge}</span>` : ''}
    </div>
  </a>`;

const home = () => {
  const T = D.timeline, last = T.length - 1;
  return `
  ${nav('')}
  <main id="main">
    <section class="hero"><div class="wrap">
      <h1><span>${D.first}</span><span>${D.last}</span></h1>
      <div class="sub">
        <p class="headline">${D.headline}<small>${D.location}</small></p>
        <div class="ctas"><a href="#">Lebenslauf →</a><a href="#kontakt">Kontakt →</a></div>
      </div>
      <div class="awards" aria-label="Auszeichnungen">
        ${D.achievements.map(a => `<a href="${a.project ? link('project') : '#'}"><small>${a.year}</small><span>${a.title} <em>${a.detail}</em></span></a>`).join('')}
      </div>
      <div class="chrono" data-past="false">
        <div class="stamp"><div class="lbl" id="b-lbl">Jetzt</div><div class="yr" id="b-yr">${T[last].year}</div></div>
        <div class="moment" aria-live="polite"><p id="b-text">${T[last].text}</p></div>
        <div class="scrub">
          <label for="b-range" class="sr" style="position:absolute;left:-9999px">Zeit zurückdrehen</label>
          <input id="b-range" type="range" min="0" max="${last}" step="1" value="${last}" aria-valuetext="${T[last].year}: ${T[last].label}">
          <ol class="ticks">${T.map((t, i) => `<li><button type="button" data-i="${i}" class="${t.star ? 'star' : ''}"${i === last ? ' aria-current="true"' : ''}>${t.year}</button></li>`).join('')}</ol>
          <div class="scrub-hint"><span>◀ Zeit zurückdrehen</span><button type="button" id="b-now">Zurück ins Jetzt ▶</button></div>
        </div>
      </div>
      <span class="gm-slot" title="Erscheint erst mit dem Spiel (Phase 2)">▶ Spielmodus · Platz für den Einstieg, Phase 2</span>
    </div></section>

    <section class="band" id="projects"><div class="wrap">
      <p class="kick">Featured projects</p>
      <h2>Sieben Arbeiten,<br><em>sieben Zeitlinien.</em></h2>
      ${card(D.featured[0], 0, true)}
      <div class="pgrid">${D.featured.slice(1).map((p, i) => card(p, i + 1)).join('')}</div>
      <a class="all" href="#">Alle Projects →</a>
    </div></section>
  </main>
  ${footer()}`;
};

const project = () => {
  const p = D.project;
  return `
  ${nav('projects')}
  <main id="main">
    <section class="wrap">
      <a class="back" href="${link('home', '#projects')}">← Projects</a>
      <p class="p-kick">${D.pad(p.index)} / ${D.pad(D.featured.length)} · ${D.meta(p)}</p>
      <h1 class="p-h1">${p.title}</h1>
      <p class="p-lead">${p.genre}. <span>${p.summary}</span></p>
      <dl class="facts">
        <div><dt>Rolle</dt><dd>${p.role}</dd></div>
        <div><dt>Zeitraum</dt><dd>${p.years}</dd></div>
        <div><dt>Team</dt><dd>${p.team}</dd></div>
        <div><dt>Engine</dt><dd>${p.engine}</dd></div>
        <div><dt>Plattform</dt><dd>${p.platforms.join(' · ')}</dd></div>
      </dl>
      <div class="phases"><h2>Phasen</h2><div class="pbar">
        ${p.phases.map(ph => `<div class="pseg" style="flex:${ph.share}"><div class="w">${ph.when}</div><h3>${ph.context}</h3><p>${ph.team} · ${ph.role}</p></div>`).join('')}
      </div></div>
    </section>
    <section class="p-embed"><div class="wrap"><figure>
      <img src="${D.cover(p)}" alt="${p.coverAlt}">
      <div class="play"><a href="${p.links[0].url}">${D.icon('play')}Im Browser spielen</a><small>Unity WebGL · lädt erst nach dem Klick · nur Desktop</small></div>
    </figure></div></section>
    <section class="wrap story">
      <div class="blk"><span class="n">01</span><div><h3>Die Frage</h3><p>${p.question}</p></div></div>
      <div class="blk"><span class="n">02</span><div><h3>Der Ansatz</h3><p>${p.approach}</p></div></div>
      <div class="blk"><span class="n">03</span><div><h3>Das Ergebnis</h3><p>${p.result}</p></div></div>
      <div class="blk"><span class="n">04</span><div><h3>Mein Beitrag</h3><ul>${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul></div></div>
    </section>
    <section class="learn"><div class="wrap">
      <h2>Was ich gelernt habe <span class="tag-ex">Beispiel</span></h2>
      <ol>${p.learnings.map(l => `<li>${l}</li>`).join('')}</ol>
    </div></section>
    <section class="wrap tail">
      <div><h2>Skills</h2><ul>${p.skills.map(s => `<li><a href="#">${s}</a></li>`).join('')}</ul></div>
      <div class="links"><h2>Links</h2>${p.links.map(l => `<a href="${l.url}">${l.type} ↗</a>`).join('')}</div>
    </section>
    <a class="nextband" href="${link('project')}" data-jump="${p.next.start}">
      <div><span class="k">Nächstes Project · ${D.pad(p.next.index)}</span><strong>${p.next.title} →</strong></div>
      <img src="${D.img}thumbnails/${p.next.cover}" alt="">
    </a>
  </main>
  ${footer()}`;
};

const notFound = () => `
  ${nav('')}
  <main id="main" class="wrap nf">
    <h1>404</h1>
    <p>Diese Zeitlinie existiert nicht. <span>Vielleicht gab es die Seite nie, vielleicht wurde sie überschrieben.</span></p>
    <div class="ctas"><a href="${link('home')}">Zurück ins Jetzt →</a><a href="${link('home', '#projects')}">Projects →</a><a href="#">Lebenslauf →</a></div>
    <p style="font-size:15px;margin-top:40px"><a class="lang" href="#" hreflang="en">Home auf <b>EN</b></a></p>
  </main>
  ${footer()}`;

function mount(page, root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Zeit-Scrubber
  const range = root.querySelector('#b-range');
  if (range) {
    const T = D.timeline;
    const chrono = root.querySelector('.chrono');
    const yr = root.querySelector('#b-yr'), lbl = root.querySelector('#b-lbl'), text = root.querySelector('#b-text');
    const ticks = [...root.querySelectorAll('.ticks button')];
    let cur = T.length - 1, shown = +T[cur].year, raf = 0;
    const tween = to => {
      cancelAnimationFrame(raf);
      const from = shown, t0 = performance.now(), dur = reduce ? 1 : 420;
      const f = t => { const k = Math.min(1, (t - t0) / dur); shown = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); yr.textContent = shown; if (k < 1) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    };
    const set = i => {
      if (i === cur) return;
      if (!reduce) {
        const g = document.createElement('p');
        g.className = 'ghost'; g.textContent = text.textContent; g.setAttribute('aria-hidden', 'true');
        text.parentNode.appendChild(g); setTimeout(() => g.remove(), 1400);
      }
      cur = i;
      text.textContent = T[i].text;
      text.classList.remove('mat'); void text.offsetWidth; text.classList.add('mat');
      lbl.textContent = T[i].now ? 'Jetzt' : T[i].label;
      tween(+T[i].year);
      ticks.forEach((b, k) => k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'));
      chrono.dataset.past = String(!T[i].now);
      range.value = i;
      range.setAttribute('aria-valuetext', T[i].year + ': ' + T[i].label);
    };
    range.addEventListener('input', () => set(+range.value));
    ticks.forEach(b => b.addEventListener('click', () => set(+b.dataset.i)));
    root.querySelector('#b-now').addEventListener('click', () => set(T.length - 1));
  }

  // Zeitsprung beim Wechsel auf eine Project page
  const jump = root.querySelector('.jump'), jy = jump.querySelector('.jy');
  root.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', e => {
    if (reduce || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const from = page === 'project' ? D.project.start : 2026, to = +a.dataset.jump, t0 = performance.now(), dur = 620;
    jy.textContent = from; jump.classList.add('on');
    const f = t => {
      const k = Math.min(1, (t - t0) / dur);
      jy.textContent = Math.round(from + (to - from) * k * k);
      if (k < 1) requestAnimationFrame(f); else setTimeout(() => { location.href = a.href; }, 160);
    };
    requestAnimationFrame(f);
  }));
  addEventListener('pageshow', () => jump.classList.remove('on'));
}

VARIANTS.B = {
  name: 'Zeitlinien',
  notes: [
    '<b>Look:</b> hell wie Papier, harte schwarze Bänder (Kontrast wie watson.la), riesige Exo-Typo, ein elektrisches Blau. Editorial statt App.',
    '<b>Signature-Moment:</b> Zeit-Scrubber in der Hero. Zurückdrehen zeigt, was ich im jeweiligen Jahr gemacht habe; der alte Text zerfällt als Geister-Echo wie die Aufnahmen in A Fraction of Time, die Vergangenheit ist dunkel. Dazu ein Zeitsprung-Übergang mit Jahreszähler beim Öffnen einer Project page.',
    '<b>Technik:</b> natives <code>&lt;input type=range&gt;</code> (Tastatur und Screenreader gratis) + CSS-Animationen, ~50 Zeilen JS. Ohne JS steht „Jetzt“ da. Der Übergang ließe sich in Nuxt mit der View Transitions API bauen.',
    '<b>Navigation:</b> immer oben; am Handy als zweite Zeile mit 4 Punkten, ohne Hamburger.',
    '<b>Porträt in der Hero:</b> nein, die Typo trägt.',
    '<b>Featured:</b> ein großes Lead-Project, darunter versetzte Zwei-Spalten-Strecke auf Schwarz. Kein gleichförmiges Grid.',
    '<b>Project page:</b> Faktenzeile über der Falz, Phasen als Zeitstrahl mit echten Proportionen, nummerierte Erzählung, Learnings als große Sätze auf Schwarz.',
    '<b>404:</b> „Diese Zeitlinie existiert nicht“, glitchende 404.',
    '<b>Gestrichelter Kasten:</b> Platz für den Spielmodus-Einstieg, erscheint erst mit dem Spiel.',
  ],
  css,
  render: page => page === 'project' ? project() : page === '404' ? notFound() : home(),
  mount,
};
})();
