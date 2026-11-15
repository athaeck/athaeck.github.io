// PROTOTYP, Wegwerf-Code. Variante C „Missionen“: HUD-Sprache, Dock unten, freischaltbare Erfolge.
(() => {
const css = `
:root{--bg:#0d1217;--panel:#141b23;--panel2:#1a232e;--line:#26323f;--text:#e6ecf2;--muted:#8d99a6;--xp:#c3ef3e;--cy:#56cff0;--maxw:1200px}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:radial-gradient(1100px 560px at 85% -10%,#16222e,transparent 70%),var(--bg);color:var(--text);font:400 16px/1.55 Exo,system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-bottom:110px;min-height:100vh}
a{color:inherit}
:focus-visible{outline:2px solid var(--xp);outline-offset:3px}
.cut{clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:12px;z-index:99;background:var(--xp);color:#000;padding:8px 12px}
.hudtop{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 28px;max-width:calc(var(--maxw) + 0px);margin:0 auto}
.hudtop .logo img{height:20px;display:block;filter:invert(1)}
.gm-slot{border:1px dashed rgba(195,239,62,.5);color:var(--xp);font-size:12px;font-weight:600;padding:8px 12px;letter-spacing:.04em}
.tag{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
.mono{font-family:ui-monospace,Consolas,"Cascadia Mono",monospace}

/* Hero: Spielerkarte + Quest */
.hero{display:grid;grid-template-columns:330px minmax(0,1fr);gap:18px;margin-top:10px}
.player{background:var(--panel);border:1px solid var(--line);display:flex;flex-direction:column}
.portrait{aspect-ratio:1/1;overflow:hidden;position:relative;background:#0f151b}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:50% 25%;display:block}
.portrait::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(20,27,35,.95))}
.plate{padding:0 22px 22px;margin-top:-46px;position:relative}
.plate h1{font-size:30px;line-height:1.02;margin:0;font-weight:800;letter-spacing:-.01em}
.plate .cls{color:var(--xp);font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin-top:10px}
.plate .loc{color:var(--muted);font-size:14px;margin-top:4px}
.quest{background:var(--panel);border:1px solid var(--line);padding:30px 32px;display:flex;flex-direction:column;gap:20px}
.quest h2{font-size:clamp(24px,2.6vw,34px);line-height:1.15;margin:4px 0 0;font-weight:700;letter-spacing:-.01em;max-width:28ch}
.xpbar{display:flex;align-items:center;gap:12px;font-size:12px;color:var(--muted)}
.xpbar .b{flex:0 1 260px;height:6px;background:#0d1217;border:1px solid var(--line);position:relative}
.xpbar .b::after{content:"";position:absolute;left:0;top:0;bottom:0;width:22%;background:var(--xp);box-shadow:0 0 12px rgba(195,239,62,.5)}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;padding:13px 20px;font-weight:700;font-size:15px;text-decoration:none;border:1px solid var(--line);background:var(--panel2);transition:border-color .2s,transform .15s}
.btn:hover{border-color:var(--xp);transform:translateY(-1px)}
.btn.primary{background:var(--xp);color:#0d1217;border-color:var(--xp)}
.btn kbd{font:600 11px ui-monospace,Consolas,monospace;border:1px solid currentColor;padding:1px 5px;opacity:.6}
.ach-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:4px}
.ach{display:flex;gap:12px;align-items:center;padding:10px 12px;background:#10161d;border:1px solid var(--line);text-decoration:none;transition:border-color .2s}
.ach:hover{border-color:var(--xp)}
.hex{width:40px;height:44px;flex:none;display:grid;place-items:center;background:linear-gradient(160deg,#d8ff5c,#8db51b);color:#0d1217;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}
.hex .ic{width:20px;height:20px}
.ach b{display:block;font-size:14px;line-height:1.2}
.ach small{color:var(--muted);font-size:12px}

/* Missionen */
.missions{margin-top:64px}
.mhead{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:18px}
.mhead h2{font-size:clamp(28px,3.4vw,42px);margin:6px 0 0;font-weight:800;letter-spacing:-.01em}
.arrows{display:flex;gap:8px;align-items:center}
.arrows button{all:unset;cursor:pointer;width:42px;height:42px;display:grid;place-items:center;border:1px solid var(--line);background:var(--panel);font-size:18px}
.arrows button:hover{border-color:var(--xp);color:var(--xp)}
.arrows a{color:var(--muted);text-decoration:none;font-weight:600;margin-right:10px}
.arrows a:hover{color:var(--xp)}
.track{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 48px) / 3.4);gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 2px 20px;scrollbar-width:thin;scrollbar-color:var(--line) transparent;overscroll-behavior-x:contain}
.mcard{scroll-snap-align:start;background:var(--panel);border:1px solid var(--line);text-decoration:none;display:flex;flex-direction:column;transition:transform .2s,border-color .2s}
.mcard:hover{transform:translateY(-4px);border-color:var(--xp)}
.mcard .img{aspect-ratio:4/3;overflow:hidden;position:relative;background:#0f151b}
.mcard img{width:100%;height:100%;object-fit:cover;display:block}
.mcard .ph{width:100%;height:100%;display:grid;place-items:center;font-weight:800;letter-spacing:.18em;color:#33404d;background:repeating-linear-gradient(45deg,#121920 0 10px,#151d25 10px 20px)}
.mno{position:absolute;top:10px;left:10px;background:rgba(13,18,23,.85);color:var(--xp);font:700 11px ui-monospace,Consolas,monospace;letter-spacing:.12em;padding:4px 8px}
.mcard .body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:6px;flex:1}
.mcard h3{margin:0;font-size:22px;line-height:1.15}
.mmeta{font-size:12px;letter-spacing:.06em;color:var(--cy);font-weight:600}
.mcard p{margin:4px 0 0;color:var(--muted);font-size:14px}
.mfoot{margin-top:auto;padding-top:12px;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted)}
.mfoot span:last-child{color:var(--xp);font-weight:700}
.badge{align-self:flex-start;display:inline-flex;gap:6px;align-items:center;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:rgba(195,239,62,.12);color:var(--xp);padding:3px 8px;border:1px solid rgba(195,239,62,.35)}

/* Footer */
footer{margin-top:80px}
.radio{background:var(--panel);border:1px solid var(--line);padding:30px 32px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px 40px;align-items:end}
.radio h2{font-size:clamp(26px,3vw,38px);margin:6px 0 14px;font-weight:800}
.mailrow{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.mail{font-size:clamp(18px,2.4vw,28px);font-weight:700;text-decoration:none;word-break:break-all}
.mail:hover{color:var(--xp)}
.copy{all:unset;cursor:pointer;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line);padding:6px 10px}
.copy:hover{border-color:var(--xp);color:var(--xp)}
.profiles{display:flex;gap:18px;flex-wrap:wrap;color:var(--muted)}
.profiles a{text-decoration:none;font-weight:600}
.profiles a:hover{color:var(--xp)}
.legal{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:22px 0 0;color:var(--muted);font-size:13px}
.legal a{text-decoration:none;margin-right:18px}

/* Dock */
.dock{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:40;display:flex;align-items:stretch;gap:2px;background:rgba(20,27,35,.94);backdrop-filter:blur(12px);border:1px solid var(--line);padding:5px;box-shadow:0 18px 50px rgba(0,0,0,.5)}
.dock a,.dock button{all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 14px;min-width:78px;color:var(--muted);font-size:12px;font-weight:600;position:relative;text-align:center}
.dock .ic{width:20px;height:20px}
.dock kbd{position:absolute;top:3px;left:6px;font:600 9px ui-monospace,Consolas,monospace;color:#5a6876}
.dock a:hover,.dock button:hover{color:var(--text);background:var(--panel2)}
.dock [aria-current]{color:var(--text);background:var(--panel2);box-shadow:inset 0 -2px var(--xp)}
.dock .sep{width:1px;background:var(--line);margin:6px 4px}
.dock .count{color:var(--xp)}
.dock .count b{font-variant-numeric:tabular-nums}
.dock :focus-visible{outline:2px solid var(--xp);outline-offset:-2px}

/* Toasts + Erfolge-Dialog */
.toasts{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:min(380px,calc(100vw - 24px))}
.toast{display:flex;gap:12px;align-items:center;background:rgba(10,14,18,.96);border:1px solid var(--xp);padding:10px 16px 10px 10px;box-shadow:0 10px 40px rgba(0,0,0,.5),0 0 24px rgba(195,239,62,.15);animation:tin .45s cubic-bezier(.2,.9,.3,1.25),tout .35s ease-in 4.2s forwards}
@keyframes tin{from{opacity:0;transform:translateY(-16px) scale(.96)}}
@keyframes tout{to{opacity:0;transform:translateY(-10px)}}
.toast b{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--xp)}
.toast span{font-weight:700;font-size:15px}
.toast small{display:block;color:var(--muted);font-size:12px}
dialog{background:var(--panel);color:var(--text);border:1px solid var(--line);padding:0;width:min(460px,calc(100vw - 24px))}
dialog::backdrop{background:rgba(5,8,11,.7);backdrop-filter:blur(3px)}
.dlg-h{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;border-bottom:1px solid var(--line)}
.dlg-h h2{margin:0;font-size:20px}
.dlg-h button{all:unset;cursor:pointer;font-size:22px;color:var(--muted);padding:0 6px}
dialog ul{list-style:none;margin:0;padding:10px 22px}
dialog li{display:flex;gap:14px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
dialog li.locked{opacity:.45}
dialog li.locked .hex{background:#2a3542;color:#5a6876}
dialog li b{display:block}
dialog li small{color:var(--muted)}
.dlg-f{display:flex;justify-content:space-between;gap:10px;padding:14px 22px 18px;font-size:13px}
.dlg-f button{all:unset;cursor:pointer;color:var(--muted);text-decoration:underline}
.dlg-f p{margin:0;color:var(--xp)}

/* Project page: Missionsbriefing */
.back{display:inline-block;margin:6px 0 16px;color:var(--muted);text-decoration:none;font-weight:600}
.back:hover{color:var(--xp)}
.titlebar{background:var(--panel);border:1px solid var(--line);padding:22px 28px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 22px}
.titlebar .mno{position:static;background:none;padding:0;font-size:12px}
.titlebar h1{font-size:clamp(32px,4.4vw,56px);margin:0;font-weight:800;letter-spacing:-.015em;line-height:1;flex-basis:100%}
.titlebar .mmeta{font-size:14px}
.titlebar p{margin:0;color:var(--muted);flex-basis:100%;max-width:60ch}
.bgrid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:18px;margin-top:18px;align-items:start}
.screen{position:relative;margin:0;border:1px solid var(--line);aspect-ratio:16/9;overflow:hidden;background:#000}
.screen img{width:100%;height:100%;object-fit:cover;display:block;opacity:.55}
.screen .play{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:12px;text-align:center}
.screen .play a{display:inline-flex;align-items:center;gap:12px;background:var(--xp);color:#0d1217;font-weight:800;font-size:17px;padding:15px 24px;text-decoration:none}
.screen .play a .ic{width:18px;height:18px}
.screen .play small{color:#c8d1da;font-size:13px}
.chapters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}
.chap{background:var(--panel);border:1px solid var(--line);padding:16px 18px;position:relative}
.chap .tag{color:var(--cy)}
.chap h3{margin:6px 0 4px;font-size:18px}
.chap p{margin:0;color:var(--muted);font-size:14px}
.chap+.chap::before{content:"▶";position:absolute;left:-14px;top:50%;transform:translateY(-50%);color:var(--xp);font-size:12px}
.panel{background:var(--panel);border:1px solid var(--line);padding:22px 26px;margin-top:18px}
.panel h2{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:0 0 14px;font-weight:700}
.obj{display:grid;grid-template-columns:28px 1fr;gap:14px;padding:12px 0;border-top:1px solid var(--line)}
.obj:first-of-type{border-top:0}
.obj .chk{width:22px;height:22px;border:1.5px solid var(--xp);display:grid;place-items:center;color:var(--xp);font-size:14px;font-weight:800;margin-top:2px}
.obj h3{margin:0 0 4px;font-size:18px}
.obj p{margin:0;color:#c3ccd5}
.plist{margin:0;padding:0;list-style:none}
.plist li{padding:8px 0 8px 26px;position:relative;border-top:1px solid var(--line);color:#c3ccd5}
.plist li:first-child{border-top:0}
.plist li::before{content:"›";position:absolute;left:6px;color:var(--cy);font-weight:800}
.plist.loot li::before{content:"+";color:var(--xp)}
.tag-ex{font-size:10px;letter-spacing:.08em;background:#8d99a6;color:#000;padding:2px 6px;margin-left:8px;vertical-align:middle}
.brief{position:sticky;top:16px;background:var(--panel);border:1px solid var(--line);padding:22px 24px}
.brief dl{margin:0}
.brief dl div{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid var(--line)}
.brief dt{color:var(--muted);font-size:13px}
.brief dd{margin:0;font-weight:700;font-size:14px;text-align:right}
.brief h3{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:20px 0 10px}
.chips{display:flex;gap:6px;flex-wrap:wrap;list-style:none;margin:0;padding:0}
.chips a{display:inline-block;font-size:13px;font-weight:600;padding:4px 10px;background:var(--panel2);border:1px solid var(--line);text-decoration:none}
.chips a:hover{border-color:var(--cy);color:var(--cy)}
.blinks{display:flex;flex-direction:column;gap:8px}
.blinks a{display:flex;justify-content:space-between;padding:11px 14px;border:1px solid var(--line);background:var(--panel2);font-weight:700;text-decoration:none;font-size:14px}
.blinks a:first-child{background:var(--xp);color:#0d1217;border-color:var(--xp)}
.blinks a:hover{border-color:var(--xp)}
.nextm{display:flex;justify-content:space-between;align-items:center;margin-top:18px;background:var(--panel);border:1px solid var(--line);padding:24px 28px;text-decoration:none;transition:border-color .2s}
.nextm:hover{border-color:var(--xp)}
.nextm strong{display:block;font-size:clamp(24px,3vw,36px);font-weight:800}
.nextm .go{color:var(--xp);font-weight:800}

/* 404 */
.over{min-height:calc(100vh - 200px);display:grid;place-items:center;text-align:center}
.over .box{background:var(--panel);border:1px solid var(--line);padding:40px 44px;max-width:560px}
.over h1{font-size:clamp(34px,5vw,56px);margin:10px 0 8px;line-height:1}
.over p{color:var(--muted);margin:0 0 24px}
.cont{font:700 14px ui-monospace,Consolas,monospace;letter-spacing:.3em;color:var(--xp);margin-bottom:22px}
.cont b{font-size:36px;display:block;letter-spacing:0;margin-top:4px}
.over .ctas{justify-content:center}

@media (max-width:860px){
  body{padding-bottom:84px}
  .wrap{padding:0 16px}
  .hudtop{padding:14px 16px}
  .gm-slot{font-size:10.5px;padding:6px 8px}
  .hero{grid-template-columns:1fr;gap:12px}
  .player{flex-direction:row;align-items:center}
  .portrait{width:112px;flex:none}
  .portrait::after{display:none}
  .plate{margin:0;padding:14px 16px}
  .plate h1{font-size:24px}
  .quest{padding:20px 18px;gap:16px}
  .quest h2{font-size:21px}
  .ach-row{grid-template-columns:1fr;gap:6px}
  .ach{padding:8px 10px}
  .hex{width:32px;height:36px}
  .btn kbd,.dock kbd{display:none}
  .track{grid-auto-columns:82%}
  .arrows button{display:none}
  .missions{margin-top:44px}
  .radio{grid-template-columns:1fr;padding:22px 18px}
  .dock{left:0;right:0;bottom:0;transform:none;border-width:1px 0 0;justify-content:space-around;padding:4px 2px calc(4px + env(safe-area-inset-bottom));box-shadow:none}
  .dock a,.dock button{min-width:0;flex:1;padding:6px 2px;font-size:10.5px}
  .dock .sep{display:none}
  .bgrid{grid-template-columns:1fr}
  .brief{position:static;order:-1}
  .chapters{grid-template-columns:1fr}
  .chap+.chap::before{content:"▼";left:50%;top:-13px;transform:translateX(-50%)}
  .titlebar{padding:18px}
  .over .box{padding:28px 20px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const ACH = [
  { id: 'hello', t: 'Erster Eindruck', d: 'Die Seite geöffnet' },
  { id: 'curator', t: 'Kurator', d: 'Alle 7 Missionen gesichtet' },
  { id: 'traveler', t: 'Zeitreisender', d: 'A Fraction of Time geöffnet' },
  { id: 'recruiter', t: 'Headhunter', d: 'Den Lebenslauf aufgerufen' },
  { id: 'radio', t: 'Funkkontakt', d: 'Den Kontakt gesucht' },
  { id: 'polyglot', t: 'Polyglott', d: 'Die Sprache gewechselt' },
];

const dock = (cur) => `
  <nav class="dock cut" aria-label="Hauptnavigation">
    <a href="${link('home', '#projects')}"${cur === 'projects' ? ' aria-current="page"' : ''}><kbd>1</kbd>${D.icon('projects')}Projects</a>
    <a href="#" data-ach="recruiter"><kbd>2</kbd>${D.icon('cv')}Lebenslauf</a>
    <a href="#"><kbd>3</kbd>${D.icon('about')}Über mich</a>
    <a href="#kontakt" data-ach="radio"><kbd>4</kbd>${D.icon('contact')}Kontakt</a>
    <span class="sep"></span>
    <a href="#" hreflang="en" data-ach="polyglot">${D.icon('globe')}EN</a>
    <button type="button" class="count" data-open-ach aria-label="Erfolge anzeigen">${D.icon('trophy')}<span><b id="c-n">0</b>/${ACH.length}</span></button>
  </nav>
  <div class="toasts" aria-live="polite"></div>
  <dialog id="c-dlg" aria-labelledby="c-dlg-h">
    <div class="dlg-h"><h2 id="c-dlg-h">Erfolge</h2><button type="button" data-close aria-label="Schließen">×</button></div>
    <ul id="c-list"></ul>
    <div class="dlg-f"><p id="c-final"></p><button type="button" data-reset>Zurücksetzen</button></div>
  </dialog>`;

const top = () => `
  <a class="skip" href="#main">Zum Inhalt</a>
  <div class="hudtop">
    <a class="logo" href="${link('home')}" aria-label="athaeck – Startseite"><img src="${D.logo}" alt="athaeck"></a>
    <span class="gm-slot" title="Erscheint erst mit dem Spiel (Phase 2)">▶ Spielmodus · Phase 2</span>
  </div>`;

const footer = () => `
  <footer id="kontakt"><div class="wrap">
    <div class="radio cut">
      <div>
        <span class="tag">Kontakt · ${D.location}</span>
        <h2>Funkkanal offen.</h2>
        <div class="mailrow"><a class="mail" href="mailto:${D.email}" data-ach="radio">${D.email}</a><button type="button" class="copy" data-copy="${D.email}">Kopieren</button></div>
      </div>
      <div class="profiles">${D.profiles.map(p => `<a href="${p.url}">${p.type} ↗</a>`).join('')}</div>
    </div>
    <div class="legal"><div><a href="#">Impressum</a><a href="#">Datenschutz</a></div><a href="#" hreflang="en" data-ach="polyglot">DE / EN</a></div>
  </div></footer>`;

const mcard = (p, i) => `
  <a class="mcard cut" href="${link('project')}">
    <div class="img">${D.cover(p) ? `<img src="${D.cover(p)}" alt="" loading="lazy">` : `<div class="ph">${p.title}</div>`}<span class="mno">MISSION ${D.pad(i + 1)}</span></div>
    <div class="body">
      ${p.badge ? `<span class="badge">★ ${p.badge}</span>` : ''}
      <h3>${p.title}</h3>
      <div class="mmeta">${D.meta(p)} · ${p.genre}</div>
      <p>${p.summary}</p>
      <div class="mfoot"><span class="mono">${p.years}</span><span>Ansehen →</span></div>
    </div>
  </a>`;

const home = () => `
  ${top()}
  <main id="main" class="wrap">
    <section class="hero">
      <div class="player cut">
        <div class="portrait"><img src="${D.portrait}" alt="Porträt von ${D.first} ${D.last}"></div>
        <div class="plate">
          <h1>${D.first}<br>${D.last}</h1>
          <div class="cls">${D.headline}</div>
          <div class="loc">◉ ${D.location}</div>
        </div>
      </div>
      <div class="quest cut">
        <div>
          <span class="tag">Aktuelle Quest</span>
          <h2>${D.now}</h2>
        </div>
        <div class="xpbar"><span class="b" aria-hidden="true"></span><span>Proof of Concept · in Arbeit</span></div>
        <div class="ctas">
          <a class="btn primary" href="#" data-ach="recruiter">${D.icon('cv')}Lebenslauf <kbd>2</kbd></a>
          <a class="btn" href="#kontakt" data-ach="radio">${D.icon('contact')}Kontakt <kbd>4</kbd></a>
        </div>
        <div>
          <span class="tag">Freigeschaltet</span>
          <div class="ach-row" style="margin-top:10px">
            ${D.achievements.map(a => `<a class="ach" href="${a.project ? link('project') : '#'}"><span class="hex">${D.icon('trophy')}</span><span><b>${a.title}</b><small>${a.year} · ${a.detail}</small></span></a>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="missions" id="projects">
      <div class="mhead">
        <div><span class="tag">Featured projects</span><h2>Missionen</h2></div>
        <div class="arrows"><a href="#">Alle Projects →</a><button type="button" data-dir="-1" aria-label="Zurück">←</button><button type="button" data-dir="1" aria-label="Weiter">→</button></div>
      </div>
      <div class="track" tabindex="0" aria-label="Featured projects, seitlich scrollen">
        ${D.featured.map(mcard).join('')}
      </div>
    </section>
  </main>
  ${footer()}
  ${dock('')}`;

const project = () => {
  const p = D.project;
  return `
  ${top()}
  <main id="main" class="wrap">
    <a class="back" href="${link('home', '#projects')}">← Missionen</a>
    <div class="titlebar cut">
      <span class="mno">MISSION ${D.pad(p.index)}</span>
      <span class="mmeta">${D.meta(p)} · ${p.genre}</span>
      <h1>${p.title}</h1>
      <p>${p.summary}</p>
    </div>
    <div class="bgrid">
      <div>
        <figure class="screen cut">
          <img src="${D.cover(p)}" alt="${p.coverAlt}">
          <div class="play"><a href="${p.links[0].url}">${D.icon('play')}Im Browser spielen</a><small>Unity WebGL · lädt erst nach dem Klick · nur Desktop</small></div>
        </figure>
        <div class="chapters">
          ${p.phases.map((ph, i) => `<div class="chap cut"><span class="tag">Kapitel ${i + 1} · ${ph.when}</span><h3>${ph.context}</h3><p>${ph.team} · ${ph.role}</p></div>`).join('')}
        </div>
        <div class="panel cut"><h2>Missionsziele</h2>
          <div class="obj"><span class="chk">✓</span><div><h3>Die Frage</h3><p>${p.question}</p></div></div>
          <div class="obj"><span class="chk">✓</span><div><h3>Der Ansatz</h3><p>${p.approach}</p></div></div>
          <div class="obj"><span class="chk">✓</span><div><h3>Das Ergebnis</h3><p>${p.result}</p></div></div>
        </div>
        <div class="panel cut"><h2>Mein Beitrag</h2><ul class="plist">${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul></div>
        <div class="panel cut"><h2>Was ich mitgenommen habe <span class="tag-ex">Beispiel</span></h2><ul class="plist loot">${p.learnings.map(c => `<li>${c}</li>`).join('')}</ul></div>
      </div>
      <aside class="brief cut" aria-label="Fakten">
        <dl>
          <div><dt>Rolle</dt><dd>${p.role}</dd></div>
          <div><dt>Zeitraum</dt><dd>${p.years}</dd></div>
          <div><dt>Team</dt><dd>${p.team}</dd></div>
          <div><dt>Engine</dt><dd>${p.engine}</dd></div>
          <div><dt>Plattform</dt><dd>${p.platforms.join(' · ')}</dd></div>
        </dl>
        <h3>Skills</h3><ul class="chips">${p.skills.map(s => `<li><a href="#">${s}</a></li>`).join('')}</ul>
        <h3>Links</h3><div class="blinks">${p.links.map(l => `<a href="${l.url}">${l.type}<span>↗</span></a>`).join('')}</div>
      </aside>
    </div>
    <a class="nextm cut" href="${link('project')}"><div><span class="tag">Nächste Mission · ${D.pad(p.next.index)}</span><strong>${p.next.title}</strong></div><span class="go">▶</span></a>
  </main>
  ${footer()}
  ${dock('projects')}`;
};

const notFound = () => `
  ${top()}
  <main id="main" class="wrap over">
    <div class="box cut">
      <span class="tag">Fehler 404</span>
      <h1>Mission nicht gefunden</h1>
      <p>Diese Seite gibt es nicht. Kein Game Over: Von hier geht es weiter.</p>
      <div class="cont" aria-hidden="true">CONTINUE?<b id="c-cd">9</b></div>
      <div class="ctas">
        <a class="btn primary" href="${link('home')}">Startseite</a>
        <a class="btn" href="${link('home', '#projects')}">Projects</a>
        <a class="btn" href="#" data-ach="recruiter">Lebenslauf</a>
      </div>
      <p style="margin:18px 0 0;font-size:14px"><a href="#" hreflang="en" data-ach="polyglot">Home auf EN</a></p>
    </div>
  </main>
  ${dock('')}`;

function mount(page, root) {
  // Prototyp: sessionStorage nur, damit Erfolge den Seitenwechsel überleben. Kein echtes Speichern.
  const KEY = 'proto-c-ach';
  let got = [];
  try { got = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) {}
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(got)); } catch (e) {} };
  const n = root.querySelector('#c-n'), toasts = root.querySelector('.toasts');
  const dlg = root.querySelector('#c-dlg'), list = root.querySelector('#c-list'), fin = root.querySelector('#c-final');
  const FINAL = 'Alle gefunden. Echte Missionen gibt es im Spielmodus am Desktop (Phase 2).';
  const paint = () => {
    n.textContent = got.length;
    list.innerHTML = ACH.map(a => `<li class="${got.includes(a.id) ? '' : 'locked'}"><span class="hex">${D.icon('trophy')}</span><span><b>${a.t}</b><small>${got.includes(a.id) ? a.d : 'Noch verborgen'}</small></span></li>`).join('');
    fin.textContent = got.length === ACH.length ? FINAL : '';
  };
  const toast = (head, title, sub) => {
    const t = document.createElement('div');
    t.className = 'toast cut';
    t.innerHTML = `<span class="hex">${D.icon('trophy')}</span><div><b>${head}</b><span>${title}</span><small>${sub}</small></div>`;
    toasts.appendChild(t); setTimeout(() => t.remove(), 4700);
  };
  const unlock = id => {
    if (got.includes(id)) return;
    const a = ACH.find(x => x.id === id);
    got.push(id); save(); paint();
    toast('Erfolg freigeschaltet', a.t, a.d);
    if (got.length === ACH.length) setTimeout(() => toast('Alle Erfolge', 'Lust auf mehr?', FINAL), 900);
  };
  paint();

  root.addEventListener('click', e => {
    const a = e.target.closest('[data-ach]');
    if (a) { unlock(a.dataset.ach); if (a.getAttribute('href') === '#') e.preventDefault(); }
    const c = e.target.closest('[data-copy]');
    if (c) { navigator.clipboard && navigator.clipboard.writeText(c.dataset.copy); c.textContent = 'Kopiert'; unlock('radio'); }
    if (e.target.closest('[data-open-ach]')) dlg.showModal();
    if (e.target.closest('[data-close]')) dlg.close();
    if (e.target.closest('[data-reset]')) { got = []; save(); paint(); }
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  // Tasten 1–4 wie eine Hotbar
  addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const dockLinks = root.querySelectorAll('.dock a');
    const i = ['1', '2', '3', '4'].indexOf(e.key);
    if (i >= 0) dockLinks[i].click();
  });

  if (page === 'home') {
    setTimeout(() => unlock('hello'), 1200);
    const track = root.querySelector('.track');
    root.querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => track.scrollBy({ left: +b.dataset.dir * track.clientWidth * .8, behavior: 'smooth' })));
    const last = track.lastElementChild;
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { unlock('curator'); o.disconnect(); } }, { root: track, threshold: .6 }).observe(last);
  }
  if (page === 'project') setTimeout(() => unlock('traveler'), 700);
  if (page === '404') {
    const cd = root.querySelector('#c-cd');
    let k = 9;
    const iv = setInterval(() => { k--; cd.textContent = k > 0 ? k : '▶'; if (k <= 0) clearInterval(iv); }, 1000);
  }
}

VARIANTS.C = {
  name: 'Missionen',
  notes: [
    '<b>Look:</b> dunkles Schiefer-HUD, Ecken angeschnitten wie Spiel-UI, Lime als „XP“-Farbe, Cyan für Meta. Am nächsten an einem Spiel-Menü.',
    '<b>Signature-Moment:</b> freischaltbare Erfolge. Wer die Seite benutzt (Missionen durchsehen, Lebenslauf öffnen, Kontakt suchen, Sprache wechseln), bekommt Toasts wie auf einer Konsole; Zähler im Dock. Sind alle da, verweist der letzte auf den Spielmodus mit echten Missionen. Kein Fernrohr, kein Zeitreise-Bezug: dritter Kandidat aus dem Wunsch „Minispiel mit kleinen Missionen“.',
    '<b>Technik:</b> DOM + CSS-Animationen + IntersectionObserver, ~60 Zeilen JS, natives <code>&lt;dialog&gt;</code>. Ohne JS fehlen nur die Toasts. Merkt sich Erfolge über Seitenwechsel (hier sessionStorage).',
    '<b>Navigation:</b> Dock unten auf allen Geräten, wie eine Hotbar mit Tasten 1–4; am Handy volle Tab-Leiste. Oben nur Logo.',
    '<b>Porträt in der Hero:</b> ja, als Spielerkarte. Am Handy klein neben dem Namen.',
    '<b>Featured:</b> Level-Auswahl als seitlich scrollende Kartenreihe (Swipe am Handy). Risiko: Nur 3 von 7 sind gleichzeitig sichtbar.',
    '<b>Project page:</b> Missionsbriefing: Faktenkasten rechts (am Handy ganz oben), Phasen als Kapitel, Frage/Ansatz/Ergebnis als abgehakte Missionsziele.',
    '<b>404:</b> „Mission nicht gefunden“, CONTINUE?-Countdown ohne Weiterleitung.',
    '<b>Risiko:</b> Gamification kann Recruiter nerven. Toasts sind kurz, blockieren nichts und kämen in echt mit Stumm-Schalter.',
  ],
  css,
  render: page => page === 'project' ? project() : page === '404' ? notFound() : home(),
  mount,
};
})();
