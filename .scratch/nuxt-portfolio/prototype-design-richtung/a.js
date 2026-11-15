// PROTOTYP, Wegwerf-Code. Variante A „Fernrohr“: dunkel, Karte, Linse entschlüsselt.
(() => {
const css = `
:root{--bg:#0c0e11;--bg2:#12151a;--line:#252a31;--text:#ece7dc;--muted:#959ba4;--brass:#d6a448;--brass2:#f2c873;--maxw:1200px;--r:112px}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font:400 17px/1.55 Exo,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}
:focus-visible{outline:2px solid var(--brass2);outline-offset:3px}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 32px}
.mono{font-family:ui-monospace,Consolas,"Cascadia Mono",monospace}
.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:12px;z-index:99;background:var(--brass);color:#000;padding:8px 12px}
.top{position:sticky;top:0;z-index:20;background:rgba(12,14,17,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo img{height:21px;display:block;filter:invert(1)}
.nav{display:flex;align-items:center;gap:30px}
.nav a{text-decoration:none;color:var(--muted);font-weight:500;font-size:15px}
.nav a:hover,.nav a[aria-current]{color:var(--text)}
.lang{font-size:13px;font-weight:600;letter-spacing:.06em;border:1px solid var(--line);border-radius:999px;padding:5px 11px;text-decoration:none;color:var(--muted)}
.lang b{color:var(--brass2);font-weight:700}
.tabbar{display:none}

/* Hero */
.hero{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);min-height:min(calc(100vh - 64px),800px);border-bottom:1px solid var(--line)}
.hero-text{padding:64px 48px 56px max(32px,calc((100vw - var(--maxw))/2 + 32px));display:flex;flex-direction:column;justify-content:center;gap:20px}
.coords{font-size:12px;letter-spacing:.16em;color:var(--brass);text-transform:uppercase}
h1{font-size:clamp(44px,5.6vw,80px);line-height:.95;font-weight:800;letter-spacing:-.02em;margin:0}
h1 span{display:block;color:var(--muted);font-weight:300}
.headline{font-size:clamp(18px,1.7vw,22px);font-weight:600;margin:0}
.now{display:flex;gap:12px;align-items:baseline;color:var(--muted);font-size:15px;margin:0}
.now i{width:8px;height:8px;border-radius:50%;background:var(--brass);flex:none;animation:pulse 2.2s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(214,164,72,.55)}70%{box-shadow:0 0 0 9px rgba(214,164,72,0)}100%{box-shadow:0 0 0 0 rgba(214,164,72,0)}}
.ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:4px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:13px 20px;border-radius:3px;font-weight:700;text-decoration:none;font-size:15px;letter-spacing:.01em}
.btn.primary{background:var(--brass);color:#16110a}
.btn.primary:hover{background:var(--brass2)}
.btn.ghost{border:1px solid #3a3f47}
.btn.ghost:hover{border-color:var(--brass)}
.finds{display:flex;flex-direction:column;gap:2px;margin-top:22px;border-top:1px solid var(--line);padding-top:16px}
.finds .lbl{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.find{display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:baseline;padding:7px 0;text-decoration:none;font-size:14px;border-bottom:1px dashed #22262c}
.find small{color:var(--brass)}
.find span em{font-style:normal;color:var(--muted)}
.find:hover span{color:var(--brass2)}

/* Karte + Linse */
.map{position:relative;overflow:hidden;border-left:1px solid var(--line);background:radial-gradient(ellipse at 55% 45%,#151920,#0b0d10 72%);cursor:crosshair;--x:38%;--y:46%;user-select:none;-webkit-user-select:none}
.layer{position:absolute;inset:0}
.layer svg{position:absolute;inset:0;width:100%;height:100%}
.coded svg{stroke:rgba(236,231,220,.09);fill:none}
.coded svg .grid{stroke:rgba(236,231,220,.04)}
.clear{clip-path:circle(var(--r) at var(--x) var(--y));background:radial-gradient(ellipse at 55% 45%,#20262f,#12161b 72%)}
.clear svg{stroke:rgba(242,200,115,.35);fill:none}
.clear svg .grid{stroke:rgba(242,200,115,.12)}
.cipher{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:min(82%,440px);text-align:center;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:clamp(14px,1.35vw,18px);line-height:1.7;margin:0}
.coded .cipher{color:rgba(236,231,220,.26)}
.clear .cipher{color:var(--brass2);text-shadow:0 0 18px rgba(242,200,115,.35)}
.mk{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:8px;white-space:nowrap}
.coded .mk i{width:12px;height:12px;border:1px dashed rgba(236,231,220,.3);border-radius:50%}
.coded .mk em{display:none}
.clear .mk i{width:12px;height:12px;border-radius:50%;background:var(--brass2);box-shadow:0 0 0 4px rgba(242,200,115,.2)}
.clear .mk em{font-style:normal;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--brass2)}
.rim{position:absolute;left:var(--x);top:var(--y);width:calc(var(--r)*2);height:calc(var(--r)*2);transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;box-shadow:0 0 0 6px #2b2215,0 0 0 8px var(--brass),0 0 0 9px #000,inset 0 0 50px rgba(0,0,0,.55),0 24px 60px rgba(0,0,0,.6)}
.rim::before,.rim::after{content:"";position:absolute;background:rgba(242,200,115,.35)}
.rim::before{left:50%;top:10%;bottom:10%;width:1px}
.rim::after{top:50%;left:10%;right:10%;height:1px}
.handle{position:absolute;left:calc(50% + var(--r)*.62);top:calc(50% + var(--r)*.62);width:86px;height:26px;transform-origin:0 50%;transform:rotate(45deg);border-radius:3px;background:linear-gradient(#5a4320,#d6a448 45%,#7a5a26);box-shadow:0 6px 18px rgba(0,0,0,.5);pointer-events:auto;touch-action:none;cursor:grab}
.handle::after{content:"";position:absolute;left:30px;top:-3px;bottom:-3px;width:6px;background:#3a2c14;border-radius:2px}
.map-hint{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);white-space:nowrap;pointer-events:none}
.gm-slot{position:absolute;top:18px;right:18px;border:1px dashed rgba(214,164,72,.55);color:var(--brass);font-size:12px;padding:8px 12px;border-radius:3px;background:rgba(12,14,17,.6)}

/* Logbuch */
.section{padding:96px 0}
.sec-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px}
.kicker{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--brass);margin:0 0 10px}
.sec-head h2{font-size:clamp(32px,4vw,52px);margin:0;font-weight:800;letter-spacing:-.015em;line-height:1}
.more{color:var(--muted);text-decoration:none;font-weight:600}
.more:hover{color:var(--brass2)}
.log{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.log a{display:grid;grid-template-columns:84px minmax(0,1fr) 300px;gap:32px;padding:28px 12px;border-bottom:1px solid var(--line);text-decoration:none;align-items:center;transition:background .25s}
.log a:hover{background:linear-gradient(90deg,rgba(214,164,72,.06),transparent 70%)}
.num{font-size:40px;font-weight:300;color:var(--brass);line-height:1}
.log h3{font-size:clamp(22px,2.3vw,30px);margin:0;font-weight:700;letter-spacing:-.01em}
.row1{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap}
.yr{font-size:13px;color:var(--muted)}
.meta{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--brass);margin-top:6px}
.meta span{color:var(--muted);text-transform:none;letter-spacing:0;font-size:14px}
.sum{color:var(--muted);margin:10px 0 0;max-width:58ch;font-size:16px}
.badge{display:inline-flex;gap:6px;align-items:center;margin-top:12px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--brass2);border:1px solid rgba(242,200,115,.4);padding:4px 9px;border-radius:2px}
.cov{aspect-ratio:16/10;overflow:hidden;border-radius:2px;border:1px solid var(--line);background:#14171c}
.cov img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(1) brightness(.75) contrast(1.05);transition:filter .35s,transform .6s}
.log a:hover .cov img{filter:none;transform:scale(1.03)}
.cov.ph{display:grid;place-items:center;font-weight:800;letter-spacing:.2em;color:#3a3f47;background:repeating-linear-gradient(135deg,#12151a 0 12px,#15191f 12px 24px)}

/* Footer */
footer{border-top:1px solid var(--line);background:var(--bg2);padding:88px 0 40px}
.contact{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end}
.contact h2{font-size:clamp(32px,4vw,52px);margin:0 0 18px;font-weight:800}
.mail{font-size:clamp(22px,3.2vw,40px);font-weight:700;text-decoration:none;border-bottom:2px solid var(--brass);word-break:break-all}
.mail:hover{color:var(--brass2)}
.profiles{display:flex;gap:22px;flex-wrap:wrap;justify-content:flex-end;color:var(--muted)}
.profiles a{text-decoration:none;font-weight:600}
.profiles a:hover{color:var(--brass2)}
.legal{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:72px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}
.legal a{text-decoration:none;margin-right:20px}

/* Project page */
.back{display:inline-block;margin:36px 0 28px;color:var(--muted);text-decoration:none;font-weight:600}
.back:hover{color:var(--brass2)}
.p-head{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:48px;align-items:start;padding-bottom:40px}
.p-head h1{font-size:clamp(40px,5.4vw,76px)}
.lead{font-size:clamp(18px,1.6vw,21px);color:var(--muted);max-width:52ch;margin:18px 0 0}
.lead b{color:var(--text);font-weight:600}
.dossier{margin:0;border:1px solid var(--line);background:var(--bg2);padding:6px 22px;position:relative}
.dossier::before{content:"Dossier";position:absolute;top:-9px;left:16px;background:var(--bg);padding:0 8px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--brass)}
.dossier div{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-bottom:1px dashed var(--line)}
.dossier div:last-child{border:0}
.dossier dt{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding-top:3px}
.dossier dd{margin:0;font-weight:600;font-size:15px}
.embed{position:relative;margin:0;border:1px solid var(--line);aspect-ratio:16/8;overflow:hidden}
.embed img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.55)}
.embed .play{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:14px;text-align:center}
.embed .play a{display:inline-flex;align-items:center;gap:12px;background:var(--brass);color:#16110a;font-weight:800;padding:16px 26px;border-radius:3px;text-decoration:none;font-size:17px}
.embed .play a .ic{width:20px;height:20px}
.embed .play small{color:#d8d2c4;font-size:13px}
.route{display:grid;grid-template-columns:repeat(2,1fr);gap:0;margin:72px 0 0;position:relative}
.route::before{content:"";position:absolute;left:8px;right:8px;top:8px;border-top:2px dashed rgba(214,164,72,.45)}
.wp{position:relative;padding:34px 32px 0 0}
.wp::before{content:"";position:absolute;left:0;top:0;width:18px;height:18px;border-radius:50%;background:var(--bg);border:2px solid var(--brass)}
.wp:last-child::before{background:var(--brass)}
.wp .when{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--brass)}
.wp h3{margin:6px 0 4px;font-size:22px}
.wp p{margin:0;color:var(--muted)}
.stages{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:88px}
.stage{border-top:2px solid var(--brass);padding-top:18px}
.stage .n{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--brass)}
.stage h3{margin:6px 0 10px;font-size:24px}
.stage p{margin:0;color:var(--muted)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:88px}
.two h2,.chips h2{font-size:22px;margin:0 0 14px}
.two ul{margin:0;padding:0;list-style:none}
.two li{padding:10px 0 10px 28px;border-bottom:1px solid var(--line);position:relative;color:#d6d1c6}
.two li::before{content:"";position:absolute;left:4px;top:19px;width:10px;height:2px;background:var(--brass)}
.two .learn li::before{width:8px;height:8px;top:17px;border-radius:50%}
.tag-ex{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#000;background:#8a8f98;padding:2px 6px;border-radius:2px;vertical-align:middle;margin-left:8px}
.chips{margin-top:72px;display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap}
.chips ul{display:flex;gap:8px;flex-wrap:wrap;list-style:none;margin:0;padding:0}
.chips li a{display:inline-block;padding:6px 12px;border:1px solid var(--line);border-radius:2px;text-decoration:none;font-size:14px;font-weight:600}
.chips li a:hover{border-color:var(--brass);color:var(--brass2)}
.links a{display:inline-flex;align-items:center;gap:8px;margin-right:18px;font-weight:700;text-decoration:none;border-bottom:1px solid var(--brass);padding-bottom:2px}
.next{display:flex;justify-content:space-between;align-items:center;margin:96px 0 0;padding:36px 0;border-top:1px solid var(--line);text-decoration:none}
.next .lbl{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.next strong{display:block;font-size:clamp(28px,4vw,48px);font-weight:800}
.next .arrow{font-size:40px;color:var(--brass);transition:transform .3s}
.next:hover .arrow{transform:translateX(8px)}

/* 404 */
.nf{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);min-height:calc(100vh - 64px)}
.nf .hero-text h1{font-size:clamp(40px,4.6vw,64px)}
.nf ul{list-style:none;padding:0;margin:8px 0 0;display:flex;gap:10px;flex-wrap:wrap}

@media (max-width:860px){
  .wrap{padding:0 16px}
  .nav .nl{display:none}
  .tabbar{display:grid;grid-template-columns:repeat(4,1fr);position:fixed;left:0;right:0;bottom:0;z-index:30;background:rgba(18,21,26,.94);backdrop-filter:blur(14px);border-top:1px solid var(--line);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
  .tabbar a{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;font-weight:600;color:var(--muted);text-decoration:none;padding:5px 0}
  .tabbar a[aria-current]{color:var(--brass2)}
  .tabbar .ic{width:22px;height:22px}
  body{padding-bottom:70px}
  .top .wrap{height:56px}
  .hero,.nf{grid-template-columns:1fr;min-height:0}
  .hero-text{padding:32px 16px 28px;gap:16px}
  .map{height:330px;border-left:0;border-top:1px solid var(--line);--r:86px;--x:50%;--y:42%}
  .handle{width:64px;height:24px}
  .section{padding:64px 0}
  .log a{grid-template-columns:40px minmax(0,1fr);gap:14px 14px;padding:22px 0}
  .log .cov{grid-column:1/-1;order:-1}
  .log .cov img{filter:none}
  .num{font-size:24px}
  .contact,.p-head,.two{grid-template-columns:1fr}
  .profiles{justify-content:flex-start}
  .stages{grid-template-columns:1fr;gap:32px;margin-top:56px}
  .route{grid-template-columns:1fr;gap:28px}
  .route::before{left:8px;right:auto;top:8px;bottom:8px;border-top:0;border-left:2px dashed rgba(214,164,72,.45)}
  .wp{padding:0 0 0 36px}
  .embed{aspect-ratio:4/3}
  .gm-slot{font-size:11px;top:12px;right:12px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const nav = (cur) => {
  const items = [['projects', 'Projects', 'projects'], ['cv', 'Lebenslauf', 'cv'], ['about', 'Über mich', 'about'], ['contact', 'Kontakt', 'contact']];
  const href = k => k === 'projects' ? link('home', '#projects') : k === 'contact' ? '#kontakt' : '#';
  return `
  <a class="skip" href="#main">Zum Inhalt</a>
  <header class="top"><div class="wrap">
    <a class="logo" href="${link('home')}" aria-label="athaeck – Startseite"><img src="${D.logo}" alt="athaeck"></a>
    <nav class="nav" aria-label="Hauptnavigation">
      ${items.map(([k, l]) => `<a class="nl" href="${href(k)}"${cur === k ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
      <a class="lang" href="#" hreflang="en"><b>DE</b> / EN</a>
    </nav>
  </div></header>
  <nav class="tabbar" aria-label="Hauptnavigation (mobil)">
    ${items.map(([k, l, ic]) => `<a href="${href(k)}"${cur === k ? ' aria-current="page"' : ''}>${D.icon(ic)}${l}</a>`).join('')}
  </nav>`;
};

const footer = () => `
  <footer id="kontakt"><div class="wrap">
    <div class="contact">
      <div><p class="kicker">Kontakt</p><h2>Schreib mir.</h2><a class="mail" href="mailto:${D.email}">${D.email}</a></div>
      <div class="profiles">${D.profiles.map(p => `<a href="${p.url}">${p.type}</a>`).join('')}<span>${D.location}</span></div>
    </div>
    <div class="legal"><div><a href="#">Impressum</a><a href="#">Datenschutz</a></div><a class="lang" href="#" hreflang="en"><b>DE</b> / EN</a></div>
  </div></footer>`;

// Caesar +7 als „Geheimschrift“: liest sich wie Code, bleibt in Exo setzbar.
const encode = s => s.replace(/[A-Za-zÄÖÜäöüß]/g, ch => {
  const u = ch.toUpperCase().replace('Ä', 'A').replace('Ö', 'O').replace('Ü', 'U').replace('SS', 'S').replace('ß', 'S');
  return String.fromCharCode((u.charCodeAt(0) - 65 + 7) % 26 + 65);
});

function contours() {
  const hills = [{ x: 330, y: 300, s: 1 }, { x: 720, y: 540, s: .85 }, { x: 830, y: 170, s: .55 }, { x: 170, y: 650, s: .5 }];
  let d = '';
  hills.forEach((h, hi) => {
    for (let k = 1; k <= 7; k++) {
      const r = k * 36 * h.s + 8;
      let p = '';
      for (let i = 0; i <= 80; i++) {
        const a = i / 80 * Math.PI * 2;
        const n = 1 + .17 * Math.sin(a * 3 + hi * 2 + k * .45) + .08 * Math.sin(a * 5 + k) + .05 * Math.cos(a * 7 - hi);
        p += (i ? 'L' : 'M') + (h.x + Math.cos(a) * r * n * 1.25).toFixed(1) + ' ' + (h.y + Math.sin(a) * r * n).toFixed(1);
      }
      d += `<path d="${p}Z"/>`;
    }
  });
  let g = '';
  for (let i = 100; i < 1000; i += 100) g += `M${i} 0V800`;
  for (let i = 100; i < 800; i += 100) g += `M0 ${i}H1000`;
  return `<svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path class="grid" d="${g}"/>${d}</svg>`;
}

const MK = [[20, 24], [42, 74], [66, 18], [82, 66], [22, 86], [62, 88], [86, 32]];

function map(message, markers, hint) {
  const svg = contours();
  const mk = clear => markers.map((m, i) => `<span class="mk" style="left:${MK[i][0]}%;top:${MK[i][1]}%"><i></i><em>${m}</em></span>`).join('');
  return `
  <div class="map" aria-hidden="true">
    <div class="layer coded">${svg}${mk(false)}<p class="cipher">${encode(message)}</p></div>
    <div class="layer clear">${svg}${mk(true)}<p class="cipher">${message}</p></div>
    <div class="rim"><span class="handle"></span></div>
    <span class="map-hint">${hint}</span>
  </div>`;
}

const home = () => `
  ${nav('')}
  <main id="main">
    <section class="hero">
      <div class="hero-text">
        <div class="coords mono">${D.location} · 48.78° N · 9.18° E</div>
        <h1>${D.first}<br>${D.last}</h1>
        <p class="headline">${D.headline}</p>
        <p class="now"><i></i><span><b style="color:var(--text);font-weight:600">Aktuell:</b> ${D.now}</span></p>
        <div class="ctas">
          <a class="btn primary" href="#">${D.icon('cv')}Lebenslauf</a>
          <a class="btn ghost" href="#kontakt">${D.icon('contact')}Kontakt</a>
        </div>
        <div class="finds">
          <span class="lbl">Auszeichnungen</span>
          ${D.achievements.map(a => `<a class="find" href="${a.project ? link('project') : '#'}"><small class="mono">${a.year}</small><span>${a.title} <em>· ${a.detail}</em></span><span>→</span></a>`).join('')}
        </div>
      </div>
      <div style="position:relative;display:grid">
        ${map('Am Desktop wartet ein Spielmodus: eine Karte, ein Fernrohr, sieben Orte.', D.featured.map((p, i) => D.pad(i + 1) + ' ' + p.title), '<span class="h-fine">Fernrohr bewegen</span><span class="h-touch">Am Griff ziehen</span> · Karte entschlüsseln')}
        <span class="gm-slot" title="Erscheint erst mit dem Spiel (Phase 2)">◎ Spielmodus starten · Phase 2</span>
      </div>
    </section>

    <section class="section" id="projects"><div class="wrap">
      <div class="sec-head">
        <div><p class="kicker">Logbuch</p><h2>Sieben Orte, an denen ich gearbeitet habe</h2></div>
        <a class="more" href="#">Alle Projects →</a>
      </div>
      <ol class="log">
        ${D.featured.map((p, i) => `<li><a href="${link('project')}">
          <span class="num">${D.pad(i + 1)}</span>
          <div>
            <div class="row1"><h3>${p.title}</h3><span class="yr mono">${p.years}</span></div>
            <div class="meta">${D.meta(p)} <span>· ${p.genre}</span></div>
            <p class="sum">${p.summary}</p>
            ${p.badge ? `<span class="badge">★ ${p.badge}</span>` : ''}
          </div>
          ${D.cover(p) ? `<div class="cov"><img src="${D.cover(p)}" alt="" loading="lazy"></div>` : `<div class="cov ph">${p.title}</div>`}
        </a></li>`).join('')}
      </ol>
    </div></section>
  </main>
  ${footer()}`;

const project = () => {
  const p = D.project;
  return `
  ${nav('projects')}
  <main id="main" class="wrap">
    <a class="back" href="${link('home', '#projects')}">← Projects</a>
    <div class="p-head">
      <div>
        <p class="kicker">Ort ${D.pad(p.index)} · ${D.meta(p)}</p>
        <h1>${p.title}</h1>
        <p class="lead"><b>${p.genre}.</b> ${p.summary}</p>
      </div>
      <dl class="dossier">
        <div><dt>Rolle</dt><dd>${p.role}</dd></div>
        <div><dt>Zeitraum</dt><dd>${p.years}</dd></div>
        <div><dt>Team</dt><dd>${p.team}</dd></div>
        <div><dt>Engine</dt><dd>${p.engine}</dd></div>
        <div><dt>Plattform</dt><dd>${p.platforms.join(' · ')}</dd></div>
      </dl>
    </div>
    <figure class="embed">
      <img src="${D.cover(p)}" alt="${p.coverAlt}">
      <div class="play"><a href="${p.links[0].url}">${D.icon('play')}Im Browser spielen</a><small>Unity WebGL · lädt erst nach dem Klick · nur Desktop</small></div>
    </figure>
    <div class="route">
      ${p.phases.map((ph, i) => `<div class="wp"><div class="when mono">Etappe ${i + 1} · ${ph.when}</div><h3>${ph.context}</h3><p>${ph.team} · ${ph.role}</p></div>`).join('')}
    </div>
    <div class="stages">
      <div class="stage"><div class="n mono">01</div><h3>Die Frage</h3><p>${p.question}</p></div>
      <div class="stage"><div class="n mono">02</div><h3>Der Ansatz</h3><p>${p.approach}</p></div>
      <div class="stage"><div class="n mono">03</div><h3>Das Ergebnis</h3><p>${p.result}</p></div>
    </div>
    <div class="two">
      <div><h2>Mein Beitrag</h2><ul>${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul></div>
      <div class="learn"><h2>Was ich gelernt habe <span class="tag-ex">Beispiel</span></h2><ul>${p.learnings.map(c => `<li>${c}</li>`).join('')}</ul></div>
    </div>
    <div class="chips">
      <div><h2>Skills</h2><ul>${p.skills.map(s => `<li><a href="#">${s}</a></li>`).join('')}</ul></div>
      <div class="links"><h2>Links</h2>${p.links.map(l => `<a href="${l.url}">${l.type} ↗</a>`).join('')}</div>
    </div>
    <a class="next" href="${link('project')}"><div><span class="lbl">Nächster Ort · ${D.pad(p.next.index)}</span><strong>${p.next.title}</strong></div><span class="arrow">→</span></a>
  </main>
  ${footer()}`;
};

const notFound = () => `
  ${nav('')}
  <main id="main" class="nf">
    <div class="hero-text">
      <div class="coords mono">Fehler 404 · Koordinaten unbekannt</div>
      <h1>Dieser Ort ist auf keiner Karte verzeichnet.</h1>
      <p class="now" style="font-size:17px">Die Seite gibt es nicht oder nicht mehr. Von hier aus geht es weiter:</p>
      <ul>
        <li><a class="btn primary" href="${link('home')}">Startseite</a></li>
        <li><a class="btn ghost" href="${link('home', '#projects')}">Projects</a></li>
        <li><a class="btn ghost" href="#">Lebenslauf</a></li>
      </ul>
      <a class="lang" href="#" hreflang="en" style="align-self:flex-start;margin-top:12px">Home auf <b>EN</b></a>
    </div>
    <div style="position:relative;display:grid">${map('404 · Hier ist nichts. Nicht einmal ein Hinweis.', ['?', '?', '?', '?', '?', '?', '?'], 'Suchen hilft auch nicht')}</div>
  </main>
  ${footer()}`;

function mount(page, root) {
  const mapEl = root.querySelector('.map');
  if (!mapEl) return;
  const fine = matchMedia('(pointer:fine)').matches;
  root.querySelectorAll(fine ? '.h-touch' : '.h-fine').forEach(e => e.remove());
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const s = { x: 0, y: 0, tx: 0, ty: 0, raf: 0 };
  const rest = () => {
    const r = mapEl.getBoundingClientRect();
    return innerWidth <= 860 ? { x: r.width * .5, y: r.height * .42 } : { x: r.width * .38, y: r.height * .46 };
  };
  const apply = () => { mapEl.style.setProperty('--x', s.x + 'px'); mapEl.style.setProperty('--y', s.y + 'px'); };
  const tick = () => {
    const k = reduce ? 1 : .16;
    s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
    apply();
    s.raf = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > .3 ? requestAnimationFrame(tick) : 0;
  };
  const target = (x, y) => { s.tx = x; s.ty = y; if (!s.raf) s.raf = requestAnimationFrame(tick); };
  const local = e => { const r = mapEl.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const p0 = rest(); s.x = s.tx = p0.x; s.y = s.ty = p0.y; apply();

  mapEl.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') target(...local(e)); });
  mapEl.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { const p = rest(); target(p.x, p.y); } });
  mapEl.addEventListener('click', e => { if (e.pointerType && e.pointerType !== 'mouse') target(...local(e)); });

  const handle = mapEl.querySelector('.handle');
  let off = null;
  handle.addEventListener('pointerdown', e => {
    const [x, y] = local(e); off = [x - s.x, y - s.y];
    handle.setPointerCapture(e.pointerId); e.preventDefault();
  });
  handle.addEventListener('pointermove', e => { if (off) { const [x, y] = local(e); target(x - off[0], y - off[1]); } });
  handle.addEventListener('pointerup', () => { off = null; });
  addEventListener('resize', () => { const p = rest(); s.x = s.tx = p.x; s.y = s.ty = p.y; apply(); });
}

VARIANTS.A = {
  name: 'Fernrohr',
  notes: [
    '<b>Look:</b> dunkel, Messing als Akzent, Exo in allen Schnitten. Ruhig, viel Luft.',
    '<b>Signature-Moment:</b> Fernrohr-Linse über einer Höhenkarte. Sie entschlüsselt eine Geheimschrift („Am Desktop wartet ein Spielmodus …“) und deckt die 7 Orte auf. Am Desktop folgt sie dem Zeiger, am Handy zieht man am Griff oder tippt auf die Karte.',
    '<b>Technik:</b> CSS <code>clip-path</code> + ~40 Zeilen JS, kein Canvas, keine Bibliothek. Ohne JS steht die Linse fest und zeigt einen Teil der Botschaft.',
    '<b>Navigation:</b> oben; am Handy Tab-Leiste unten mit Icons (App-Gefühl).',
    '<b>Porträt in der Hero:</b> nein.',
    '<b>Featured:</b> „Logbuch“-Liste 01–07 mit Cover rechts, kein Kachel-Grid. Cover grau, bei Hover farbig.',
    '<b>Project page:</b> Dossier-Kasten mit Rolle, Zeitraum, Team, Engine, Plattform ohne Scrollen; Phasen als „Route“ mit Etappen; Frage → Ansatz → Ergebnis.',
    '<b>404:</b> „Dieser Ort ist auf keiner Karte verzeichnet“, mit Linse.',
    '<b>Gestrichelter Kasten:</b> Platz für den Spielmodus-Einstieg, erscheint erst mit dem Spiel.',
  ],
  css,
  render: page => page === 'project' ? project() : page === '404' ? notFound() : home(),
  mount,
};
})();
