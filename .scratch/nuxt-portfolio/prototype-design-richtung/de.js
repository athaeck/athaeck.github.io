// PROTOTYP, Wegwerf-Code. Runde 2: Variante B weiterentwickelt nach dem Feedback des Owners (2026-11-15).
// D „Split“ und E „Bühne“ teilen Zeitstrahl, Chronoskop und Seitenleiste; sie unterscheiden sich im Hero-Layout.
// Runde 3 (Owner wählt D): D bekommt eine eigene Project page (Teaser, dann Steps über volle Höhe); E behält die von B.
// Runde 4: Project page D bündelt jede Kategorie auf einen Screen (Im Spiel: 3 Teile, Entstehung: 4 Teile).
(() => {
const B = VARIANTS.B;
const T = [...D.timeline, { year: '20??', label: 'Was kommt', future: true }];
const NOW = D.timeline.length - 1;
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MARK = D.img + 'android-chrome-192x192.png'; // Logo-Joystick statt Schriftzug
const VMK = [[30, 24], [56, 18], [78, 34], [80, 64], [56, 82], [30, 76], [18, 50]];

const encode = s => s.replace(/[A-Za-zÄÖÜäöüß]/g, ch => {
  const u = ch.toUpperCase().normalize('NFD')[0];
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
  return `<svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${d}</svg>`;
}

const css = B.css + `
:root{--brass:#d6a448;--rail:64px}
.top{transition:transform .35s ease}
body.railed .top{transform:translateY(-100%)}
.rail{position:fixed;left:0;top:0;bottom:0;width:var(--rail);z-index:25;background:var(--ink);color:var(--paper);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0 18px;transform:translateX(-100%);transition:transform .35s ease .06s}
body.railed .rail{transform:none}
.logo img{height:36px;width:36px}
.rail-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:var(--paper)}
.rail-logo img{width:34px;height:34px;display:block}
.rail-links{display:flex;flex-direction:column;gap:30px;align-items:center}
.rail-links a{writing-mode:vertical-rl;transform:rotate(180deg);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;color:#a9a9ae;padding:4px 6px}
.rail-links a:hover{color:var(--paper)}
.rail-links a[aria-current]{color:var(--paper);box-shadow:inset -2px 0 var(--g1)}
.rail-lang{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-decoration:none;color:#8d8d93}
.rail-lang b{color:var(--paper)}
@media (min-width:861px) and (max-width:1400px){.wrap{padding-left:96px}}

/* Name + Porträt */
.pt{overflow:hidden;background:#d9d5cc}
.pt img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(1) contrast(1.12)}
.name{margin:0;font-weight:800;letter-spacing:-.035em;line-height:.86}
.name span{display:block}

/* D: Split */
.split{display:grid;grid-template-columns:minmax(340px,5fr) minmax(0,7fr);min-height:calc(100vh - 61px);border-bottom:1.5px solid var(--ink)}
.id{display:flex;flex-direction:column;justify-content:center;gap:18px;padding:28px 44px 28px max(96px,calc((100vw - var(--maxw))/2 + 40px));border-right:1.5px solid var(--ink)}
.id .pt{height:min(31vh,300px)}
.id .pt img{object-position:50% 20%}
.id .name{font-size:clamp(44px,4.3vw,70px)}
.id .headline{font-size:clamp(18px,1.5vw,22px)}
.awards.v{flex-direction:column;margin-top:2px}
.awards.v a,.awards.v a+a{flex:none;padding:9px 0;border-left:0;font-size:14px}
.awards.v a+a{border-top:1px solid var(--line)}

/* Bühne des Zeitstrahls */
.stage{position:relative;overflow:hidden;display:grid;transition:background .5s,color .5s}
.stage>*{position:relative}
.stage[data-mode="past"],.stage[data-mode="future"]{background:var(--ink);color:var(--paper)}
.stage-bg{position:absolute!important;inset:0;opacity:0;transition:opacity .6s;pointer-events:none}
.stage[data-mode="past"] .stage-bg{opacity:.6}
.stage[data-mode="future"] .stage-bg{opacity:1}
.stage-bg svg{width:100%;height:100%;stroke:rgba(242,240,235,.07);fill:none}
.st-top .lbl{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--chrono);font-weight:800}
.stage:not([data-mode="now"]) .st-top .lbl{color:var(--g1)}
.st-top .yr{font-size:clamp(110px,22vh,250px);font-weight:800;line-height:.8;letter-spacing:-.055em;font-variant-numeric:tabular-nums;margin-top:10px;transition:font-size .4s}
.stage[data-mode="future"] .st-top .yr{font-size:clamp(60px,9vh,110px)}
.st-mid{display:flex;align-items:center;min-height:0}
.stage .moment{min-height:0;width:100%}
.stage .moment p{font-size:clamp(22px,2.4vw,36px);line-height:1.22;max-width:24ch;font-weight:600}
.future{width:100%;display:flex;justify-content:center;animation:rise .6s ease-out}
.future[hidden],.moment[hidden]{display:none}
@keyframes rise{from{opacity:0;transform:translateY(18px)}}
.stage:not([data-mode="now"]) .ticks button[aria-current]{color:var(--g1)}
.stage:not([data-mode="now"]) .scrub-hint{color:#8d8d93}
.stage:not([data-mode="now"]) .scrub-hint button{visibility:visible}
.ticks .fut{font-weight:800}
.stage-split{grid-template-rows:auto 1fr auto;padding:34px 48px 22px}

/* E: Bühne */
.hero2{padding:34px 0 0}
.h2-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end}
.name.big{font-size:clamp(54px,8vw,124px)}
.hero2 .pt{width:clamp(180px,17vw,250px);aspect-ratio:4/5}
.hero2 .pt img{object-position:50% 18%}
.hero2 .awards{margin-top:28px;border-bottom:0}
.stage-buehne{grid-template-columns:minmax(0,5fr) minmax(0,7fr);grid-template-rows:auto 1fr;gap:18px 48px;min-height:max(560px,74vh);padding:22px max(40px,calc((100vw - var(--maxw))/2 + 40px)) 48px;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink)}
.stage-buehne .scrub{grid-column:1/-1;padding-top:0}
.stage-buehne .st-top,.stage-buehne .st-mid{align-self:center}
.stage-buehne .st-top .yr{font-size:clamp(120px,15vw,260px)}
.stage-buehne~.band,.split~.band{margin-top:0}

/* Chronoskop: Aufbau nach docs/about-me/Asoue.png, Details abgewandelt.
   1 Code-Ringe mit Buchstaben, 2 Holzschaft mit Emblemen, 3 Auszug mit Gravurband, 4 Auszug mit Schlitz, 5 Auszug mit Schrift und Okular. */
.sgw{width:100%;container-type:inline-size;display:flex;flex-direction:column;align-items:center;gap:20px}
.view{--blur:12px;width:clamp(200px,30vh,380px);aspect-ratio:1;border-radius:50%;overflow:hidden;position:relative;flex:none;background:radial-gradient(circle at 50% 45%,#232a33,#0d0f12 75%);box-shadow:0 0 0 6px #2b2215,0 0 0 8px var(--brass),0 0 0 9px #000,0 30px 70px rgba(0,0,0,.5)}
.view::after{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,transparent 56%,rgba(0,0,0,.6) 72%);pointer-events:none}
.view-in{position:absolute;inset:0;filter:blur(var(--blur))}
.view-in svg{position:absolute;inset:0;width:100%;height:100%;stroke:rgba(242,200,115,.38);fill:none}
.vmk{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;width:30px;height:30px;text-decoration:none;pointer-events:none;color:#f2c873}
.vmk i{width:11px;height:11px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px rgba(242,200,115,.22)}
.vmk em{position:absolute;top:82%;left:50%;transform:translateX(-50%);font-style:normal;font-size:11px;font-weight:800;letter-spacing:.06em;line-height:1.25;white-space:nowrap;text-align:center}
.vmk small{display:block;font-size:9.5px;font-weight:600;letter-spacing:.03em;opacity:.75}
.sgw[data-focused="true"] .vmk{pointer-events:auto}
.vmk:hover,.vmk:focus-visible{color:#fff}
.v-msg{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58%;margin:0;text-align:center;font-weight:800;font-size:clamp(11px,1.5vh,14px);letter-spacing:.16em;text-transform:uppercase;line-height:1.6;color:rgba(242,240,235,.5)}
.v-msg.hi{top:25%}
.sgw[data-focused="true"] .v-msg{color:#f2c873;text-shadow:0 0 16px rgba(242,200,115,.4)}
.sg{--br:linear-gradient(180deg,#3a2a10 0%,#8a6524 16%,#e3bd62 42%,#f7e0a0 50%,#c09040 66%,#5a4219 88%,#2e210c 100%);display:flex;align-items:center;font-size:clamp(8px,2.68cqi,16px);filter:drop-shadow(0 14px 20px rgba(0,0,0,.45));user-select:none;-webkit-user-select:none}
.sg>span,.s1>span{display:block;position:relative;flex:none}
.s1{display:flex!important;align-items:center}
.cap{width:.7em;height:5.9em;border-radius:.3em 0 0 .3em;background:var(--br)}
.cap::after,.s2::before{content:"";position:absolute;top:50%;margin-top:-.3em;border:.3em solid transparent}
.cap::after{right:.06em;border-left:.36em solid #2a1c08;border-right:0}
.rope{width:.5em;height:5.6em;background:linear-gradient(180deg,rgba(0,0,0,.6),transparent 28%,rgba(255,240,200,.25) 48%,transparent 62%,rgba(0,0,0,.65)),repeating-linear-gradient(-55deg,#5a4219 0 .12em,#e7c879 .12em .26em,#9c7330 .26em .38em)}
.ring{width:2.6em;height:5.2em;overflow:hidden;cursor:ns-resize;touch-action:none;background:linear-gradient(90deg,rgba(0,0,0,.28),transparent 14%,transparent 86%,rgba(0,0,0,.28)),var(--br)}
.ring::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(20,12,2,.85),rgba(20,12,2,.25) 30%,transparent 42%,transparent 58%,rgba(20,12,2,.25) 70%,rgba(20,12,2,.85))}
.strip{position:absolute;left:0;right:0;top:50%;margin-top:-3.75em;font-size:1.15em;transition:transform .16s ease-out}
.strip b{display:block;height:1.5em;line-height:1.5em;text-align:center;font-weight:800;color:#2a1a06;text-shadow:0 1px 0 rgba(255,236,180,.5)}
.strip b.t{color:#8f1d10;text-decoration:underline;text-decoration-thickness:.12em;text-underline-offset:.1em}
.ring.ok b.c{color:#fff6dc;text-shadow:0 0 .35em #ffc85a,0 0 .1em #fff;background:radial-gradient(closest-side,rgba(255,196,80,.75),transparent)}
.ring:focus-visible{outline:2px solid var(--g1);outline-offset:2px}
.s2{width:8.4em;height:5.2em;border-radius:.15em;background:linear-gradient(180deg,rgba(0,0,0,.7),rgba(0,0,0,.1) 28%,rgba(255,215,170,.22) 46%,rgba(0,0,0,.05) 60%,rgba(0,0,0,.72)),repeating-linear-gradient(91deg,#5c2a14 0 .35em,#6f351a .35em .55em,#4d2311 .55em 1em,#62301a 1em 1.3em)}
.s2::before{left:.06em;border-right:.36em solid #d6ad5a;border-left:0}
.s2 svg{position:absolute;display:block;filter:drop-shadow(0 .08em .06em rgba(0,0,0,.6))}
.em-a{left:.9em;top:.55em;width:2.4em;height:1.2em}
.em-b{left:4.8em;top:.4em;width:1.6em;height:1.6em}
.em-c{left:1.3em;top:2.4em;width:2.3em;height:2.3em}
.em-d{left:5.5em;top:3.05em;width:.7em;height:.7em}
.s3{width:3.4em;height:3.5em;background:var(--br)}
.s3::before{content:"";position:absolute;left:1em;width:1.3em;top:0;bottom:0;background:repeating-linear-gradient(90deg,rgba(60,40,10,.55) 0 .06em,transparent .06em .26em)}
.collar{width:.45em;height:3.95em;border-radius:.12em;background:var(--br);filter:brightness(.9)}
.collar.sm{height:3.4em}
.s4{width:4.8em;height:2.95em;background:var(--br)}
.slot,.gauge{display:block;position:absolute}
.slot{left:50%;top:50%;width:2.8em;height:.62em;transform:translate(-50%,-50%);background:#1a1206;border-radius:.31em;overflow:hidden;box-shadow:inset 0 .06em .12em #000,0 .06em 0 rgba(255,240,200,.45)}
.gauge{left:0;top:0;bottom:0;width:calc(var(--p,0) * 100%);background:linear-gradient(90deg,#6b4e1c,#f2c873);transition:width .3s}
.sgw[data-focused="true"] .gauge{background:var(--g1);box-shadow:0 0 .4em var(--g1)}
.sg>.s5{display:flex;align-items:center;justify-content:center;overflow:hidden;width:4.6em;height:2.35em;background:var(--br)}
.s5 i{font-style:normal;font-size:.36em;font-weight:800;letter-spacing:.14em;white-space:nowrap;color:rgba(50,32,8,.7);text-shadow:0 1px 0 rgba(255,240,200,.4)}
.neck{width:.7em;height:1.7em;background:var(--br);filter:brightness(.8)}
.flange{width:.55em;height:3.3em;border-radius:.28em;background:var(--br)}
.sg-hint{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8d8d93;margin:0;text-align:center;max-width:36ch}
.sg-done{min-height:1.3em;margin:-8px 0 0;font-weight:700;color:var(--g1);font-size:14px;text-align:center}

/* 404 */
.nf2-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:48px;align-items:center}
.nf.nf2 h1{font-size:clamp(100px,12vw,190px)}
.nf-sg{background:var(--ink);color:var(--paper);padding:40px 32px;display:flex;justify-content:center}
.nf2 .sgw p{max-width:36ch;line-height:1.6;margin:0}
.nf2 .sgw .sg-hint{font-size:12px;font-weight:400;letter-spacing:.14em}
.nf2 .sgw .sg-done{font-size:14px;font-weight:700;letter-spacing:0;margin:-8px 0 0}
.nf2 .sgw .v-msg{font-size:clamp(11px,1.5vh,14px);font-weight:800;letter-spacing:.16em;max-width:none;width:58%}

/* Project page D: Teaser, dann je Kategorie ein Step über die volle Höhe */
html:has(.steps){scroll-snap-type:y proximity}
.step{position:relative;display:grid;align-items:center;min-height:100vh;min-height:100svh;scroll-snap-align:start}
.step>.wrap{width:100%;min-width:0;padding-top:clamp(32px,6.2vh,56px);padding-bottom:clamp(32px,6.2vh,56px)}
.teaser{min-height:calc(100svh - var(--hdr,61px));background:var(--ink);color:var(--paper);overflow:hidden;scroll-snap-align:none}
.teaser>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5;transform:scale(1.04)}
.teaser::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.7),transparent 26%,rgba(11,11,12,.3) 52%,var(--ink) 96%)}
.teaser>.wrap{position:relative;z-index:1;align-self:stretch;display:flex;flex-direction:column;justify-content:space-between;gap:40px;padding-top:0;padding-bottom:28px}
.t-bar{display:flex;justify-content:space-between}
.teaser .p-kick,.feat .f-kick{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--g1);margin:0 0 14px}
.t-h1{font-size:clamp(56px,10vw,170px);line-height:.84;font-weight:800;letter-spacing:-.045em;margin:0}
.t-lead{font-size:clamp(19px,1.9vw,26px);font-weight:600;max-width:40ch;margin:22px 0 0;line-height:1.3}
.t-lead span{color:#b3b3b8;font-weight:500}
.t-cta{display:flex;flex-wrap:wrap;gap:16px 28px;align-items:center;margin-top:32px}
.go{display:inline-flex;align-items:center;gap:12px;background:var(--paper);color:var(--ink);font-weight:800;font-size:clamp(18px,1.6vw,22px);padding:14px 22px;text-decoration:none;transition:background .2s}
.go:hover{background:var(--g1)}
.go .ic{width:.9em;height:.9em}
.sec{font-weight:800;font-size:18px;text-decoration:none;border-bottom:3px solid currentColor}
.sec:hover{color:var(--g1)}
.t-note{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a9a9ae;margin:12px 0 0}
@media (min-width:861px) and (pointer:fine){.touch-only{display:none!important}}
@media not all and (min-width:861px) and (pointer:fine){.desk-only{display:none!important}}
.teaser .facts{margin-top:36px;border-top-color:var(--paper)}
.teaser .facts div+div{border-left-color:#3a3a3e}
.teaser .facts dt{color:#8d8d93}
/* Eine Kategorie = ein Screen: alle Teile stehen zusammen (Desktop nebeneinander, Handy zum Wischen) */
.cat{font-size:clamp(40px,4.4vw,72px);font-weight:800;letter-spacing:-.04em;line-height:.9;margin:0 0 clamp(24px,4.5vh,48px)}
.parts{list-style:none;margin:0;padding:0;display:grid}
.feat{background:var(--ink);color:var(--paper);border-top:1px solid #222225}
.feat .parts{grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
.f-media{margin:0 0 22px;position:relative;aspect-ratio:16/10;overflow:hidden;background:#19191b}
.f-media img{width:100%;height:100%;object-fit:cover;display:block}
.f-media figcaption{position:absolute;left:12px;bottom:12px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;background:rgba(11,11,12,.82);color:#bdbdc3;padding:5px 9px;border:1px dashed #8d8d93}
.feat h3{font-size:clamp(30px,2.8vw,46px);font-weight:800;letter-spacing:-.035em;line-height:.95;margin:0}
.feat h3.echo{text-shadow:-3px 0 var(--g1),3px 0 var(--g2)}
.feat h3+p{font-size:clamp(17px,1.3vw,20px);line-height:1.45;color:#c9c9ce;margin:14px 0 0;max-width:34ch}
.cs{border-top:1.5px solid var(--ink)}
.cs .cat{margin-bottom:clamp(14px,2.5vh,24px)}
.cs .pbar{margin-bottom:clamp(24px,4.5vh,48px)}
.cs .parts{grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(20px,3.5vh,36px) 56px}
.cs .part{border-top:1.5px solid var(--ink);padding-top:16px}
.cs .part>h3{display:flex;align-items:baseline;gap:16px;font-size:clamp(24px,2.2vw,34px);font-weight:800;letter-spacing:-.025em;line-height:1;margin:0 0 12px}
.cs-n{font-size:clamp(44px,4.4vw,64px);line-height:.8;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1.5px var(--ink)}
.cs .part>p,.cs .part>ul:not(.tags){font-size:clamp(16px,1.25vw,19px);line-height:1.45;margin:0;max-width:56ch}
.cs .part>ul:not(.tags){padding-left:20px}
.cs .part>ul li+li{margin-top:4px}
.cs-links{display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:18px}
.tags{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:16px 0 0;padding:0}
.tags li{border:1.5px solid var(--ink);padding:3px 10px;font-weight:700;font-size:13px}
.step.learn{margin-top:0}
.nextstep{background:var(--ink);color:var(--paper);text-decoration:none;overflow:hidden;align-items:end}
.nextstep img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.38;transition:opacity .4s,transform 1.2s cubic-bezier(.2,.7,.2,1)}
.nextstep:hover img{opacity:.6;transform:scale(1.03)}
.nextstep::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,rgba(11,11,12,.85))}
.nextstep .wrap{position:relative;z-index:1}
.nextstep .k{display:block;font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#bdbdc3}
.nextstep strong{display:block;font-size:clamp(64px,12vw,200px);font-weight:800;letter-spacing:-.05em;line-height:.86;margin:14px 0 18px}
.nextstep:hover strong{color:var(--g1)}
.m-alt{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 20px;margin:22px 0 0;min-height:28px}
.m-copy{background:none;border:0;border-bottom:3px solid currentColor;padding:0;font:inherit;font-weight:800;font-size:18px;color:inherit;cursor:pointer}
.m-copy:hover{color:var(--chrono)}
.m-copy:focus-visible{outline:2px solid var(--chrono);outline-offset:4px}
.m-out{font-weight:600}

/* Runde 5: Projects, Lebenslauf, Über mich (je Kategorie ein Screen, im Wechsel dunkel/hell) */
.step.lead{min-height:calc(100svh - var(--hdr,61px))}
.step.dark{background:var(--ink);color:var(--paper)}
.step.light{border-top:1.5px solid var(--ink)}
.pk{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--chrono);margin:0 0 14px}
.dark .pk{color:var(--g1)}
.dark .cs-n{-webkit-text-stroke-color:var(--paper)}
.dark .tags li{border-color:var(--paper)}
.pj-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(20px,3.5vh,36px) 28px}
.pj-grid .pcard{position:relative}
.pj-grid .pcard .img{aspect-ratio:auto;height:clamp(100px,15vh,170px)}
.pj-more a{display:flex;flex-direction:column;justify-content:flex-end;height:100%;min-height:160px;padding:20px;border:1.5px solid #2a2a2e;text-decoration:none;transition:border-color .2s}
.pj-more strong{font-size:clamp(22px,2vw,30px);font-weight:800;letter-spacing:-.02em;line-height:1.05;margin:4px 0 6px}
.pj-more span:last-child{color:#8d8d93;font-weight:700;font-size:14px}
.pj-more a:hover{border-color:var(--g1)}
.pj-more a:hover strong{color:var(--g1)}
.pj-grid .pcard h3{font-size:clamp(20px,1.7vw,26px)}
.pj-grid .pcard p{display:none}
.pj-grid .idx{margin:12px 0 4px}
.pj-grid .pmeta{margin-top:6px;font-size:13px}
.pj-grid .badge{position:absolute;top:10px;left:10px;margin:0}
.arch-y{display:grid;grid-template-columns:clamp(110px,12vw,180px) minmax(0,1fr);gap:32px;border-top:1.5px solid var(--ink);padding:14px 0}
.arch h3.cs-n{margin:0}
.arch ul{list-style:none;margin:0;padding:0}
.arch a{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:8px 0;text-decoration:none}
.arch li+li a{border-top:1px solid var(--line)}
.arch strong{font-size:clamp(20px,1.8vw,28px);font-weight:800;letter-spacing:-.02em}
.arch span{color:var(--muted);font-weight:600;font-size:15px;text-align:right}
.arch a:hover strong{color:var(--chrono)}
.cvh{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:56px;align-items:end}
.cv-head .t-h1{font-size:clamp(52px,7vw,120px)}
button.go{border:0;font-family:inherit;cursor:pointer}
button.sec{background:none;border:0;border-bottom:3px solid currentColor;padding:0 0 2px;font-family:inherit;color:inherit;cursor:pointer}
button.sec:hover{color:var(--g1)}
.t-cta form{margin:0}
.toc{display:grid;border-top:1.5px solid var(--paper)}
.toc a{display:flex;gap:16px;align-items:baseline;padding:10px 0;border-bottom:1px solid #2a2a2e;text-decoration:none;font-weight:800;font-size:clamp(18px,1.5vw,22px)}
.toc a span{font-size:13px;color:var(--g1);letter-spacing:.1em}
.toc a:hover{color:var(--g1)}
.langs{display:flex;gap:32px;margin:28px 0 0}
.langs dt{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8d8d93}
.langs dd{margin:4px 0 0;font-weight:700}
.org{font-size:clamp(17px,1.4vw,21px);margin:0 0 clamp(20px,3.5vh,36px);color:var(--muted)}
.org strong{color:var(--ink);font-weight:800}
.tl{grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(20px,3.5vh,36px) 32px}
.tl .part{border-top:1.5px solid currentColor;padding-top:14px}
.when{font-size:13px;font-weight:800;letter-spacing:.06em;font-variant-numeric:tabular-nums;margin:0 0 8px}
.tl h3{font-size:clamp(20px,1.7vw,26px);font-weight:800;letter-spacing:-.02em;line-height:1.05;margin:0 0 6px;hyphens:auto;overflow-wrap:break-word}
.tl p{margin:0;font-size:15px;line-height:1.5}
.tl p+p{margin-top:8px}
.tl .o{color:var(--muted);font-weight:600}
.dark .tl .o{color:#a9a9ae}
.edu{grid-template-columns:repeat(2,minmax(0,1fr))}
.aw{grid-template-columns:repeat(3,minmax(0,1fr))}
.thesis{display:inline-block;margin-top:10px;font-weight:800;text-decoration:none;border-bottom:2px solid currentColor}
.thesis:hover{color:var(--chrono)}
.dark .thesis:hover{color:var(--g1)}
.tl .tags{margin-top:12px}
.tl .tags li{font-size:12px;padding:2px 8px;border-width:1px}
.sk-hint{margin:0 0 clamp(20px,3.5vh,32px);color:var(--muted);font-size:15px}
.sk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(20px,3.5vh,32px) 32px}
.sk-g{border-top:1.5px solid var(--ink);padding-top:12px}
.sk-g .pk{margin-bottom:10px}
.sk ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.chip{display:inline-flex;align-items:baseline;gap:8px;border:1.5px solid var(--ink);background:none;padding:4px 10px;font:inherit;font-weight:700;font-size:14px;color:inherit;cursor:pointer;white-space:nowrap}
.chip b{font-size:12px;color:var(--chrono);font-variant-numeric:tabular-nums}
.chip:hover{background:var(--ink);color:var(--paper)}
.chip:hover b{color:var(--g1)}
.belege{border:0;padding:24px 26px;background:var(--ink);color:var(--paper);width:min(380px,calc(100vw - 32px));box-shadow:0 20px 60px rgba(0,0,0,.35)}
.belege::backdrop{background:rgba(11,11,12,.35)}
.belege .pk{color:var(--g1)}
.belege ul{display:block;margin:0 0 18px}
.belege li a{display:block;padding:8px 0;border-top:1px solid #2a2a2e;font-weight:700;text-decoration:none}
.belege li a:hover{color:var(--g1)}
.abh{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:56px;align-items:center}
.ab-pt{aspect-ratio:4/5;max-height:70vh}
.ab-name{font-size:clamp(48px,6vw,100px);margin-bottom:24px}
.bio p{font-size:clamp(17px,1.35vw,20px);line-height:1.55;margin:0 0 14px;max-width:56ch}
.sv{grid-template-columns:repeat(4,minmax(0,1fr));gap:40px}
.sv .part{border-top:1.5px solid var(--paper);padding-top:18px}
.sv h3{font-size:clamp(24px,2.2vw,34px);font-weight:800;letter-spacing:-.025em;line-height:1;margin:18px 0 12px}
.sv p{margin:0;color:#c9c9ce;font-size:clamp(16px,1.25vw,19px);line-height:1.45}
.intr{list-style:none;margin:0;padding:0}
.intr li{display:flex;align-items:baseline;gap:clamp(16px,3vw,40px);font-size:clamp(36px,5.4vw,88px);font-weight:800;letter-spacing:-.04em;line-height:1;padding:clamp(10px,2vh,20px) 0;border-top:1.5px solid var(--ink)}
.intr span{font-size:14px;letter-spacing:.1em;color:var(--chrono);font-weight:800}

/* Druck (vor allem Lebenslauf): schlichte Liste ohne Navigation, Screens und Farben */
@page{margin:16mm}
@media print{
  html{scroll-snap-type:none!important}
  body{background:#fff!important;color:#000!important;font-size:10.5pt}
  .top,.rail,footer,.jump,.proto-bar,.proto-info,.skip,.toc,.t-cta,.t-note,.tag-ex,.sk-hint,[popover]{display:none!important}
  .step,.step.lead{min-height:0!important;display:block!important;background:none!important;color:#000!important;border:0!important}
  .step>.wrap{padding:8pt 0!important;max-width:none}
  .wrap{padding-left:0!important;padding-right:0!important}
  .cat{font-size:17pt;margin:0 0 8pt;border-bottom:1.5pt solid #000;padding-bottom:3pt}
  .cv-head .t-h1{font-size:26pt}
  .t-lead span,.tl .o,.dark .tl .o,.org,.pk,.dark .pk,.chip b{color:#000!important}
  .parts{display:grid!important;overflow:visible!important;margin:0!important;padding:0!important;gap:8pt 16pt}
  .tl{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .cat{break-after:avoid}
  .parts>li,.sk-g{break-inside:avoid}
  .tl .tags li,.chip{border:1px solid #000!important;padding:1pt 5pt;font-size:8.5pt}
  .cs-n{-webkit-text-stroke-color:#000!important}
}

@media (max-width:860px){
  .rail{display:none}
  .split{grid-template-columns:1fr;min-height:0}
  .id{padding:24px 16px;border-right:0;border-bottom:1.5px solid var(--ink);display:grid;grid-template-columns:96px 1fr;gap:14px 16px;align-items:center}
  .id .pt{height:auto;aspect-ratio:1;grid-row:span 2}
  .id .name{font-size:34px}
  .id .ctas,.id .awards{grid-column:1/-1}
  .stage-split{padding:22px 16px 16px;min-height:0;gap:16px}
  .st-mid{min-height:120px}
  .st-top .yr,.stage-buehne .st-top .yr{font-size:76px}
  .stage .moment p{font-size:22px}
  .h2-grid{grid-template-columns:1fr auto;gap:16px;align-items:start}
  .hero2 .pt{width:92px}
  .name.big{font-size:42px}
  .stage-buehne{grid-template-columns:1fr;padding:18px 16px 28px;min-height:0}
  .view{width:min(66vw,270px)}
  .nf2-grid{grid-template-columns:1fr}
  .nf-sg{padding:28px 12px}
  html:has(.steps){scroll-padding-top:var(--hdr,88px)}
  .step{min-height:calc(100svh - var(--hdr,88px))}
  .step>.wrap{padding-top:32px;padding-bottom:32px}
  .teaser>.wrap{padding-top:0;padding-bottom:20px;gap:24px}
  .teaser .back{margin:22px 0 0}
  .t-h1{font-size:clamp(48px,14vw,64px)}
  .t-lead{font-size:18px;margin-top:16px}
  .t-cta{margin-top:24px}
  .teaser .facts{margin-top:24px}
  .teaser .facts div,.teaser .facts div+div{border-bottom-color:#2a2a2e;padding:9px 12px 9px 0}
  .teaser .facts dd{font-size:14px}
  .cat{font-size:40px;margin-bottom:20px}
  .parts{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -16px;padding:0 16px;scroll-padding:0 16px;scrollbar-width:none}
  .pj-grid .pcard .img{height:auto;aspect-ratio:16/9}
  .arch-y{grid-template-columns:64px minmax(0,1fr);gap:12px;padding:10px 0}
  .arch .cs-n{font-size:26px}
  .arch a{flex-direction:column;gap:2px;padding:6px 0}
  .arch strong{font-size:19px}
  .arch span{text-align:left;font-size:13px}
  .cvh,.abh{grid-template-columns:1fr;gap:24px}
  .cv-head .t-h1{font-size:48px}
  .toc a{font-size:17px;padding:7px 0}
  .langs{margin-top:16px}
  .ab-pt{width:96px;aspect-ratio:1;max-height:none}
  .ab-name{font-size:40px}
  .bio p{font-size:16px;margin-bottom:10px}
  .sk{grid-template-columns:1fr;gap:0}
  .sk-g{display:grid;grid-template-columns:100px minmax(0,1fr);gap:10px;padding:8px 0;border-top-width:1px}
  .sk-g .pk{margin:7px 0 0;font-size:10px;letter-spacing:.1em}
  .sk ul{gap:5px}
  .sk-hint{font-size:14px;margin-bottom:14px}
  .chip{font-size:13px;padding:3px 8px}
  .intr li{font-size:30px}
  .parts>li{flex:0 0 84%;scroll-snap-align:start}
  .feat h3{font-size:32px}
  .cs-n{font-size:44px}
  .cs .part>h3{font-size:26px}
  .logo img{width:28px;height:28px}
  .scrub-hint{gap:16px}
  .scrub-hint button{flex:none}
  .nextstep strong{font-size:64px}
}
`;

const links = cur => [['Projekte', link('projects'), 'projects'], ['Lebenslauf', link('cv'), 'cv'], ['Über mich', link('about'), 'about'], ['Kontakt', '#kontakt', 'contact']]
  .map(([l, h, k]) => `<a href="${h}"${cur === k ? ' aria-current="page"' : ''}>${l}</a>`).join('');

const nav = cur => `
  <a class="skip" href="#main">Zum Inhalt</a>
  <header class="top"><div class="wrap">
    <a class="logo" href="${link('home')}" aria-label="athaeck – Startseite"><img src="${MARK}" alt=""></a>
    <nav class="nav" aria-label="Hauptnavigation">${links(cur)}</nav>
    <a class="lang lang-top" href="#" hreflang="en"><b>DE</b> / EN</a>
  </div></header>
  <nav class="rail" aria-label="Hauptnavigation" inert>
    <a class="rail-logo" href="${link('home')}" aria-label="athaeck – Startseite"><img src="${MARK}" alt=""></a>
    <div class="rail-links">${links(cur)}</div>
    <a class="rail-lang" href="#" hreflang="en"><b>DE</b><span>EN</span></a>
  </nav>`;

const withNav = (html, cur) => html.replace(/<a class="skip"[\s\S]*?<\/header>/, nav(cur));

// Kontakt ohne Klartext-Adresse: Der Link geht im Build auf die Server-Route /mail (302 auf mailto:),
// der Kopier-Button erscheint nur mit JavaScript und entschlüsselt die Adresse erst beim Klick.
const encMail = s => [...s].reverse().map(c => c.charCodeAt(0) + 1).join('.');
const decMail = t => t.split('.').map(n => String.fromCharCode(n - 1)).reverse().join('');

function mountMail(root) {
  const btn = root.querySelector('.m-copy');
  if (!btn) return;
  const out = root.querySelector('.m-out');
  btn.hidden = false;
  btn.addEventListener('click', async () => {
    const a = decMail(btn.dataset.m);
    try { await navigator.clipboard.writeText(a); out.textContent = a + ' · kopiert ✓'; }
    catch { out.textContent = a; } // Zwischenablage gesperrt: Adresse zum Markieren zeigen
  });
  // Nur im Prototyp: file:// hat keinen Server, also spielt der Klick die Weiterleitung nach.
  root.querySelector('.mail').addEventListener('click', e => { e.preventDefault(); location.href = 'mailto:' + decMail(btn.dataset.m); });
}

const footer = () => `
  <footer id="kontakt"><div class="wrap">
    <p class="f-kick">Kontakt · ${D.location}</p>
    <a class="mail" href="/mail">E-Mail schreiben →</a>
    <p class="m-alt"><button type="button" class="m-copy" data-m="${encMail(D.email)}" hidden>Adresse kopieren</button><span class="m-out" aria-live="polite"></span></p>
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

const band = () => `
  <section class="band" id="projects"><div class="wrap">
    <p class="kick">Featured projects</p>
    <h2>Sieben Arbeiten,<br><em>sieben Zeitlinien.</em></h2>
    ${card(D.featured[0], 0, true)}
    <div class="pgrid">${D.featured.slice(1).map((p, i) => card(p, i + 1)).join('')}</div>
    <a class="all" href="${link('projects')}">Alle Projects →</a>
  </div></section>`;

const awards = () => D.achievements.map(a => `<a href="${a.project ? link('project') : link('cv', '#auszeichnungen')}"><small>${a.year}</small><span>${a.title} <em>${a.detail}</em></span></a>`).join('');
const ctas = () => `<div class="ctas"><a href="${link('cv')}">Lebenslauf →</a><a href="#kontakt">Kontakt →</a></div>`;
const places = () => D.featured.map((p, i) => ({ x: VMK[i][0], y: VMK[i][1], href: link('project'), label: D.pad(i + 1), title: p.title }));

// Was durch das Chronoskop am Halt „?“ zu sehen ist. Texte: Beispiel.
const FUTURE = {
  word: 'BALD', offsets: [1, -2, 2, -1], msg: 'Fortsetzung folgt', hi: true, done: 'Scharf gestellt: Das kommt als Nächstes.',
  marks: [
    { x: 29, y: 47, label: 'Ready Prepper One', sub: 'Proof of Concept' },
    { x: 71, y: 57, label: 'Spielmodus', sub: 'die Karte wird begehbar' },
    { x: 45, y: 73, label: 'Dein Team?', sub: 'Kontakt aufnehmen', href: '#kontakt' },
  ],
};
const LOST = { word: 'ORTE', offsets: [-1, 2, -2, 1], msg: 'Diesen Ort gibt es nicht. Diese sieben schon.', done: 'Scharf gestellt. Die sieben Orte führen zu den Projects.' };

const EMBLEMS = `
  <svg class="em-a" viewBox="0 0 48 24" aria-hidden="true"><path d="M2 12Q24-7 46 12Q24 31 2 12Z" fill="#d6ad5a" stroke="#4a3512"/><path d="M19 5h10l-5 7 5 7H19l5-7z" fill="#3a2508"/></svg>
  <svg class="em-b" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#d6ad5a" stroke="#4a3512"/><path d="M16 3l2.6 10.4L29 16l-10.4 2.6L16 29l-2.6-10.4L3 16l10.4-2.6z" fill="#3a2508"/></svg>
  <svg class="em-c" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#d6ad5a" stroke="#4a3512"/><circle cx="20" cy="20" r="15.5" fill="none" stroke="#7a5a22"/><path d="M11 29h18l-2.5-4h-13z" fill="#3a2508"/><path d="M19 15h2v10h-2z" fill="#3a2508"/><circle cx="20" cy="13" r="4.2" fill="#3a2508"/></svg>
  <svg class="em-d" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5.5" fill="#d6ad5a"/><circle cx="6" cy="6" r="3.4" fill="#120a03"/></svg>`;

const ring = (i, v) => `<span class="ring" role="slider" tabindex="0" aria-label="Chronoskop, Ring ${i + 1} von 4" aria-valuemin="0" aria-valuemax="25" aria-valuenow="${v}"><span class="strip"></span></span>`;

const spyglass = ({ word, offsets, msg, hi, marks, done }) => `
  <div class="sgw" data-focused="false" data-word="${word}" data-done="${done}">
    <div class="view" aria-hidden="true"><div class="view-in">${contours()}
      ${marks.map(m => `<${m.href ? `a href="${m.href}" tabindex="-1"` : 'span'} class="vmk"${m.title ? ` title="${m.title}"` : ''} style="left:${m.x}%;top:${m.y}%"><i></i><em><span data-plain="${m.label}">${encode(m.label)}</span>${m.sub ? `<small data-plain="${m.sub}">${encode(m.sub)}</small>` : ''}</em></${m.href ? 'a' : 'span'}>`).join('')}
      <p class="v-msg${hi ? ' hi' : ''}" data-plain="${msg}">${encode(msg)}</p>
    </div></div>
    <div class="sg">
      <span class="s1"><span class="cap"></span><span class="rope"></span>${[...word].map((ch, i) => ring(i, (AZ.indexOf(ch) + offsets[i] + 26) % 26)).join('<span class="rope"></span>')}<span class="rope"></span></span>
      <span class="s2">${EMBLEMS}</span>
      <span class="s3"></span><span class="collar"></span>
      <span class="s4"><i class="slot"><i class="gauge"></i></i></span><span class="collar sm"></span>
      <span class="s5"><i>CHRONOSKOP</i></span><span class="neck"></span><span class="flange"></span>
    </div>
    <p class="sg-hint">Dreh jeden Ring auf seinen roten, unterstrichenen Buchstaben</p>
    <p class="sg-done" aria-live="polite"></p>
  </div>`;

const stage = layout => {
  const scrub = `
    <div class="scrub">
      <label for="t-range" style="position:absolute;left:-9999px">Durch die Zeit reisen</label>
      <input id="t-range" type="range" min="0" max="${T.length - 1}" step="1" value="${NOW}" aria-valuetext="${T[NOW].year}: Jetzt">
      <ol class="ticks">${T.map((t, i) => `<li><button type="button" data-i="${i}" class="${t.star ? 'star' : ''}${t.future ? ' fut' : ''}"${i === NOW ? ' aria-current="true"' : ''}>${t.future ? '?' : t.year}</button></li>`).join('')}</ol>
      <div class="scrub-hint"><span>◀ Zeit zurückdrehen · ? = Was kommt</span><button type="button" id="t-now">Zurück ins Jetzt ▶</button></div>
    </div>`;
  return `
    <div class="stage stage-${layout}" data-mode="now">
      <div class="stage-bg" aria-hidden="true">${contours()}</div>
      ${layout === 'buehne' ? scrub : ''}
      <div class="st-top"><div class="lbl" id="t-lbl">Jetzt</div><div class="yr" id="t-yr">${T[NOW].year}</div></div>
      <div class="st-mid">
        <div class="moment" aria-live="polite"><p id="t-text">${T[NOW].text}</p></div>
        <div class="future" hidden>${spyglass(FUTURE)}</div>
      </div>
      ${layout === 'split' ? scrub : ''}
    </div>`;
};

const homeSplit = () => `
  ${nav('')}
  <main id="main">
    <section class="split">
      <div class="id">
        <div class="pt"><img src="${D.portrait}" alt="Porträt von ${D.first} ${D.last}"></div>
        <h1 class="name"><span>${D.first}</span><span>${D.last}</span></h1>
        <p class="headline">${D.headline}<small>${D.location}</small></p>
        ${ctas()}
        <div class="awards v" aria-label="Auszeichnungen">${awards()}</div>
      </div>
      ${stage('split')}
    </section>
    ${band()}
  </main>
  ${footer()}`;

const homeBuehne = () => `
  ${nav('')}
  <main id="main">
    <section class="hero2"><div class="wrap">
      <div class="h2-grid">
        <div>
          <h1 class="name big"><span>${D.first}</span><span>${D.last}</span></h1>
          <div class="sub"><p class="headline">${D.headline}<small>${D.location}</small></p>${ctas()}</div>
        </div>
        <div class="pt"><img src="${D.portrait}" alt="Porträt von ${D.first} ${D.last}"></div>
      </div>
      <div class="awards" aria-label="Auszeichnungen">${awards()}</div>
    </div></section>
    ${stage('buehne')}
    ${band()}
  </main>
  ${footer()}`;

const notFound = () => `
  ${nav('')}
  <main id="main" class="nf nf2"><div class="wrap nf2-grid">
    <div>
      <h1>404</h1>
      <p>Dieser Ort ist auf keiner Karte verzeichnet. <span>Stell das Chronoskop scharf, dann siehst du, wo es weitergeht.</span></p>
      <div class="ctas"><a href="${link('home')}">Zurück ins Jetzt →</a><a href="${link('projects')}">Projects →</a><a href="${link('cv')}">Lebenslauf →</a></div>
      <p style="font-size:15px;margin-top:40px"><a class="lang" href="#" hreflang="en">Home auf <b>EN</b></a></p>
    </div>
    <div class="nf-sg">${spyglass({ ...LOST, marks: places() })}</div>
  </div></main>
  ${footer()}`;

// Project page D: wie die Home erst ein Teaser, dann was im Spiel steckt, dann die Entstehung. Jede Kategorie ist ein Step und füllt den Screen.
// Am Desktop mit feinem Zeiger führt der Haupt-Button ins Spiel, sonst zum Video (CSS-Klassen desk-only / touch-only).
const project = () => {
  const p = D.project, [play, repo] = p.links, n = D.featured.length;
  const cs = (i, title, body) => `
        <li class="part"><h3><span class="cs-n" aria-hidden="true">${D.pad(i)}</span>${title}</h3>${body}</li>`;
  return `
  ${nav('projects')}
  <main id="main" class="steps">
    <section class="step teaser">
      <img src="${D.cover(p)}" alt="${p.coverAlt}">
      <div class="wrap">
        <div class="t-bar"><a class="back" href="${link('projects')}">← Projects</a><a class="back" href="#im-spiel">Was drin ist ↓</a></div>
        <div>
          <p class="p-kick">${D.pad(p.index)} / ${D.pad(n)} · ${D.meta(p)}</p>
          <h1 class="t-h1">${p.title}</h1>
          <p class="t-lead">${p.genre}. <span>${p.summary}</span></p>
          <div class="t-cta">
            <a class="go desk-only" href="${play.url}">${D.icon('play')}Im Browser spielen</a>
            <a class="go touch-only" href="${p.video}">${D.icon('play')}Trailer ansehen</a>
            <a class="sec" href="${repo.url}">Repository ↗</a>
          </div>
          <p class="t-note"><span class="desk-only">Unity WebGL · lädt erst nach dem Klick</span><span class="touch-only">Das Spiel läuft nur am Desktop <span class="tag-ex">Beispiel: Video fehlt</span></span></p>
          <dl class="facts">
            <div><dt>Rolle</dt><dd>${p.role}</dd></div>
            <div><dt>Zeitraum</dt><dd>${p.years}</dd></div>
            <div><dt>Team</dt><dd>${p.team}</dd></div>
            <div><dt>Engine</dt><dd>${p.engine}</dd></div>
            <div><dt>Plattform</dt><dd>${p.platforms.join(' · ')}</dd></div>
          </dl>
        </div>
      </div>
    </section>
    <section class="step feat" id="im-spiel"><div class="wrap">
      <h2 class="cat">Im Spiel <span class="tag-ex">Beispieltext</span></h2>
      <ol class="parts">${p.features.map((f, i) => `
        <li class="part">
          <figure class="f-media"><img src="${D.cover(p)}" alt="" loading="lazy" style="transform:scale(${f.zoom});transform-origin:${f.crop}"><figcaption>Bild folgt · ${f.media}</figcaption></figure>
          <p class="f-kick">${D.pad(i + 1)} / ${D.pad(p.features.length)}</p><h3${f.echo ? ' class="echo"' : ''}>${f.title}</h3><p>${f.text}</p>
        </li>`).join('')}
      </ol>
    </div></section>
    <section class="step cs"><div class="wrap">
      <h2 class="cat">Entstehung</h2>
      <div class="pbar">${p.phases.map(ph => `<div class="pseg" style="flex:${ph.share}"><div class="w">${ph.when}</div><h3>${ph.context}</h3><p>${ph.team} · ${ph.role}</p></div>`).join('')}</div>
      <ol class="parts">
        ${cs(1, 'Die Frage', `<p>${p.question}</p>`)}
        ${cs(2, 'Der Weg', `<p>${p.approach}</p>`)}
        ${cs(3, 'Das Ergebnis', `<p>${p.result}</p><div class="cs-links"><a class="sec desk-only" href="${play.url}">${play.type} ↗</a><a class="sec touch-only" href="${p.video}">Trailer ansehen ↗</a><a class="sec" href="${repo.url}">${repo.type} ↗</a></div>`)}
        ${cs(4, 'Mein Beitrag', `<ul>${p.contributions.map(c => `<li>${c}</li>`).join('')}</ul><ul class="tags" aria-label="Skills">${p.skills.map(s => `<li>${s}</li>`).join('')}</ul>`)}
      </ol>
    </div></section>
    <section class="step learn"><div class="wrap">
      <h2>Was ich gelernt habe <span class="tag-ex">Beispiel</span></h2>
      <ol>${p.learnings.map(l => `<li>${l}</li>`).join('')}</ol>
    </div></section>
    <a class="step nextstep" href="${link('project')}" data-jump="${p.next.start}">
      <img src="${D.img}thumbnails/${p.next.cover}" alt="" loading="lazy">
      <div class="wrap"><span class="k">Nächstes Project · ${D.pad(p.next.index)} / ${D.pad(n)}</span><strong>${p.next.title} →</strong><span class="k">Zeitsprung nach ${p.next.start}</span></div>
    </a>
  </main>
  ${footer()}`;
};

// Runde 5 (Ticket 19): Projects, Lebenslauf und Über mich. Jede Seite besteht aus Screens, eine Inhaltskategorie pro Screen.
const screens = (cur, body) => `${nav(cur)}<main id="main" class="steps">${body}</main>${footer()}`;
const kick = t => `<p class="pk">${t}</p>`;
const PROJ = new Set([...D.featured, ...D.archive].map(p => p.title));
const ref = t => PROJ.has(t) ? link('project') : D.education.some(e => e.title === t) ? '#ausbildung' : '#erfahrung';
const entry = (e, extra = '') => `<li class="part"><p class="when">${e.when}</p><h3>${e.title}</h3>${e.org ? `<p class="o">${e.org}</p>` : ''}${extra}</li>`;

const projectsPage = () => {
  const years = [...new Set(D.archive.map(p => p.year))];
  return screens('projects', `
    <section class="step dark lead"><div class="wrap">
      ${kick(`Projects · ${D.featured.length + D.archive.length} Arbeiten`)}
      <h1 class="cat">Featured</h1>
      <ol class="parts pj-grid">${D.featured.map((p, i) => `<li>${card(p, i)}</li>`).join('')}
        <li class="pj-more"><a href="#archiv"><span class="pk">Archiv</span><strong>${D.archive.length} weitere Projects</strong><span>${years.at(-1)} – ${years[0]} ↓</span></a></li></ol>
    </div></section>
    <section class="step light" id="archiv"><div class="wrap">
      <h2 class="cat">Archiv <span class="tag-ex">Genres: Beispiel</span></h2>
      <div class="arch">${years.map(y => `
        <div class="arch-y"><h3 class="cs-n">${y}</h3><ul>${D.archive.filter(p => p.year === y).map(p => `
          <li><a href="${link('project')}"><strong>${p.title}</strong><span>${D.meta(p)} · ${p.genre}</span></a></li>`).join('')}</ul></div>`).join('')}
      </div>
    </div></section>`);
};

const cvPage = () => {
  // Plattformen sind echte Belege: aus den Plattformen der Projects abgeleitet.
  const plat = {};
  [...D.featured, ...D.archive].forEach(p => p.platforms.forEach(pl => (plat[pl] = plat[pl] || []).push(p.title)));
  const groups = [...D.skills, ['Plattformen', Object.entries(plat)]];
  let k = 0;
  const skill = ([name, refs]) => { const id = 'sk' + k++; return `
    <li><button type="button" class="chip" popovertarget="${id}">${name} <b>${refs.length}</b></button>
      <div class="belege" id="${id}" popover><p class="pk">${name} · ${refs.length} ${refs.length === 1 ? 'Beleg' : 'Belege'}</p>
        <ul>${refs.map(r => `<li><a href="${ref(r)}">${r}</a></li>`).join('')}</ul>
        <button type="button" class="sec" popovertarget="${id}" popovertargetaction="hide">Schließen</button></div></li>`; };
  const pdf = (lang, label, main) => `<form method="post" action="/downloads/cv"><input type="hidden" name="lang" value="${lang}"><button class="${main ? 'go' : 'sec'}">${main ? D.icon('cv') : ''}${label}</button></form>`;
  const toc = [['erfahrung', 'Erfahrung'], ['engagement', 'Engagement'], ['ausbildung', 'Ausbildung'], ['auszeichnungen', 'Auszeichnungen'], ['skills', 'Skills']];
  return screens('cv', `
    <section class="step dark lead cv-head"><div class="wrap cvh">
      <div>
        ${kick(`${D.first} ${D.last} · ${D.location}`)}
        <h1 class="t-h1">Lebenslauf</h1>
        <p class="t-lead">${D.work.roles[0].title} bei ${D.work.org}. <span>${D.headline}.</span></p>
        <div class="t-cta">${pdf('de', 'PDF herunterladen', true)}${pdf('en', 'English PDF')}</div>
        <p class="t-note">PDF, Stand 10/2025 <span class="tag-ex">Beispiel</span></p>
      </div>
      <div>
        <nav class="toc" aria-label="Abschnitte">${toc.map(([id, l], i) => `<a href="#${id}"><span>${D.pad(i + 1)}</span>${l}</a>`).join('')}</nav>
        <dl class="langs">${D.languages.map(([l, v]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join('')}</dl>
      </div>
    </div></section>
    <section class="step light" id="erfahrung"><div class="wrap">
      <h2 class="cat">Erfahrung</h2>
      <p class="org"><strong>${D.work.org}</strong> · ${D.work.span}</p>
      <ol class="parts tl">${D.work.roles.map(r => entry(r, `<p>${r.items.join(' · ')}</p>`)).join('')}</ol>
    </div></section>
    <section class="step dark" id="engagement"><div class="wrap">
      <h2 class="cat">Engagement</h2>
      <ol class="parts tl">${D.volunteering.map(v => entry(v, `<p>${v.text}</p>`)).join('')}</ol>
    </div></section>
    <section class="step light" id="ausbildung"><div class="wrap">
      <h2 class="cat">Ausbildung</h2>
      <ol class="parts tl edu">${D.education.map(e => entry(e, (e.thesis ? `<a class="thesis" href="${link('project')}">Abschlussarbeit: ${e.thesis} →</a>` : '') + (e.items ? `<ul class="tags" aria-label="Kurse">${e.items.map(c => `<li>${c}</li>`).join('')}</ul>` : ''))).join('')}</ol>
    </div></section>
    <section class="step dark" id="auszeichnungen"><div class="wrap">
      <h2 class="cat">Auszeichnungen</h2>
      <ol class="parts tl aw">${D.awards.map(a => entry({ ...a, when: a.when + (a.featured ? ' · ★ Featured' : '') }, (a.text ? `<p>${a.text}</p>` : '') + (a.project ? `<a class="thesis" href="${link('project')}">${a.project} →</a>` : ''))).join('')}</ol>
    </div></section>
    <section class="step light" id="skills"><div class="wrap">
      <h2 class="cat">Skills <span class="tag-ex">Belege: Beispiel</span></h2>
      <p class="sk-hint">Die Zahl zählt die Belege. Antippen zeigt die Projects und Stationen dahinter.</p>
      <div class="sk">${groups.map(([g, list]) => `<div class="sk-g"><h3 class="pk">${g}</h3><ul>${list.map(skill).join('')}</ul></div>`).join('')}</div>
    </div></section>`);
};

const aboutPage = () => screens('about', `
  <section class="step light lead"><div class="wrap abh">
    <div class="pt ab-pt"><img src="${D.portrait}" alt="Porträt von ${D.first} ${D.last}"></div>
    <div>
      ${kick('Über mich')}
      <h1 class="cat ab-name">${D.first}<br>${D.last}</h1>
      <div class="bio">${D.bio.map(b => `<p>${b}</p>`).join('')}<span class="tag-ex">Beispieltext</span></div>
    </div>
  </div></section>
  <section class="step dark"><div class="wrap">
    <h2 class="cat">Was ich mache <span class="tag-ex">Beispieltext</span></h2>
    <ol class="parts sv">${D.services.map((s, i) => `<li class="part"><span class="cs-n" aria-hidden="true">${D.pad(i + 1)}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>
  </div></section>
  <section class="step light"><div class="wrap">
    <h2 class="cat">Interessen</h2>
    <ol class="intr">${D.interests.map((t, i) => `<li><span>${D.pad(i + 1)}</span>${t}</li>`).join('')}</ol>
  </div></section>`);

function mountRail() {
  const top = document.querySelector('.top'), rail = document.querySelector('.rail');
  const upd = () => {
    const on = scrollY > 90 && innerWidth > 860;
    document.body.classList.toggle('railed', on);
    top.inert = on; rail.inert = !on;
  };
  // Steps der Project page ziehen die Kopfzeile ab (am Handy bleibt sie stehen).
  const hdr = () => document.documentElement.style.setProperty('--hdr', top.offsetHeight + 'px');
  addEventListener('scroll', upd, { passive: true });
  addEventListener('resize', () => { upd(); hdr(); });
  upd(); hdr();
}

function mountStage(root) {
  const range = root.querySelector('#t-range');
  if (!range) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stg = root.querySelector('.stage'), yr = root.querySelector('#t-yr'), lbl = root.querySelector('#t-lbl');
  const text = root.querySelector('#t-text'), mom = root.querySelector('.moment'), fut = root.querySelector('.future');
  const ticks = [...root.querySelectorAll('.ticks button')];
  let cur = NOW, shown = +T[NOW].year, raf = 0;
  const tween = to => {
    cancelAnimationFrame(raf);
    const from = isNaN(shown) ? 2026 : shown, t0 = performance.now(), dur = reduce ? 1 : 420;
    const f = t => { const k = Math.min(1, (t - t0) / dur); shown = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); yr.textContent = shown; if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
  };
  const set = i => {
    if (i === cur) return;
    const t = T[i];
    if (!reduce && !T[cur].future) {
      const g = document.createElement('p');
      g.className = 'ghost'; g.textContent = text.textContent; g.setAttribute('aria-hidden', 'true');
      mom.appendChild(g); setTimeout(() => g.remove(), 1400);
    }
    cur = i;
    if (t.future) {
      cancelAnimationFrame(raf); shown = NaN; yr.textContent = t.year;
      mom.hidden = true; fut.hidden = false;
    } else {
      mom.hidden = false; fut.hidden = true;
      text.textContent = t.text;
      text.classList.remove('mat'); void text.offsetWidth; text.classList.add('mat');
      tween(+t.year);
    }
    lbl.textContent = t.now ? 'Jetzt' : t.label;
    stg.dataset.mode = t.future ? 'future' : t.now ? 'now' : 'past';
    ticks.forEach((b, k) => k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'));
    range.value = i;
    range.setAttribute('aria-valuetext', t.year + ': ' + t.label);
  };
  range.addEventListener('input', () => set(+range.value));
  ticks.forEach(b => b.addEventListener('click', () => set(+b.dataset.i)));
  root.querySelector('#t-now').addEventListener('click', () => set(NOW));
}

// Chronoskop: vier Buchstabenringe. Jeder Ring steht scharf, wenn sein markierter Buchstabe im Fenster steht;
// die Unschärfe der Linse und der Pegel im Schlitz (Segment 4) folgen dem Abstand aller Ringe zum Codewort.
function mountSpyglass(sgw) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const view = sgw.querySelector('.view'), done = sgw.querySelector('.sg-done');
  const plain = [...sgw.querySelectorAll('[data-plain]')], links = [...sgw.querySelectorAll('a.vmk')];
  const rings = [...sgw.querySelectorAll('.ring')].map((el, i) => ({ el, strip: el.firstChild, v: +el.getAttribute('aria-valuenow'), t: AZ.indexOf(sgw.dataset.word[i]) }));
  const dist = r => { const d = Math.abs(r.v - r.t); return Math.min(d, 26 - d); };
  let focused = false;

  const draw = (r, dir) => {
    r.strip.innerHTML = [-2, -1, 0, 1, 2].map(k => { const j = (r.v + k + 26) % 26; return `<b class="${k ? '' : 'c'}${j === r.t ? ' t' : ''}">${AZ[j]}</b>`; }).join('');
    if (dir && !reduce) { r.strip.style.transition = 'none'; r.strip.style.transform = `translateY(${dir * 1.5}em)`; void r.strip.offsetWidth; r.strip.style.transition = r.strip.style.transform = ''; }
    r.el.classList.toggle('ok', !dist(r));
    r.el.setAttribute('aria-valuenow', r.v);
    r.el.setAttribute('aria-valuetext', AZ[r.v] + (dist(r) ? '' : ', richtig'));
  };
  const update = () => {
    const sum = rings.reduce((s, r) => s + dist(r), 0), all = !sum;
    view.style.setProperty('--blur', all ? '0px' : (2.5 + sum * 1.3).toFixed(1) + 'px');
    sgw.style.setProperty('--p', (1 - Math.min(sum, 13) / 13).toFixed(3));
    if (all === focused) return;
    focused = all;
    sgw.dataset.focused = String(all);
    plain.forEach(el => { el.textContent = all ? el.dataset.plain : encode(el.dataset.plain); });
    if (all) { const m = sgw.querySelector('.v-msg'); m.classList.remove('mat'); void m.offsetWidth; m.classList.add('mat'); view.removeAttribute('aria-hidden'); }
    else view.setAttribute('aria-hidden', 'true');
    links.forEach(a => { a.tabIndex = all ? 0 : -1; });
    done.textContent = all ? sgw.dataset.done : '';
  };
  const step = (r, d) => { if (!d) return; r.v = ((r.v + d) % 26 + 26) % 26; draw(r, Math.sign(d)); update(); };

  rings.forEach(r => {
    const el = r.el, row = () => el.clientHeight / 5.2 * 1.5 * 1.15; // Höhe einer Buchstabenzeile in px
    let drag = null, wheel = 0;
    el.addEventListener('pointerdown', e => { drag = { y: e.clientY, acc: 0, moved: false }; el.setPointerCapture(e.pointerId); e.preventDefault(); el.focus({ preventScroll: true }); });
    el.addEventListener('pointermove', e => {
      if (!drag) return;
      drag.acc += e.clientY - drag.y; drag.y = e.clientY;
      if (Math.abs(drag.acc) > 3) drag.moved = true;
      // Ziehen nach oben holt den nächsten Buchstaben von unten ins Fenster.
      while (Math.abs(drag.acc) >= row()) { const s = Math.sign(drag.acc); step(r, -s); drag.acc -= s * row(); }
    });
    el.addEventListener('pointerup', e => {
      if (drag && !drag.moved) { const b = el.getBoundingClientRect(); step(r, e.clientY < b.top + b.height / 2 ? -1 : 1); }
      drag = null;
    });
    el.addEventListener('pointercancel', () => { drag = null; });
    el.addEventListener('wheel', e => {
      e.preventDefault(); wheel += e.deltaY;
      while (Math.abs(wheel) >= 60) { const s = Math.sign(wheel); step(r, s); wheel -= s * 60; }
    }, { passive: false });
    el.addEventListener('keydown', e => {
      const k = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
      const j = e.key.length === 1 ? AZ.indexOf(e.key.toUpperCase()) : -1;
      if (k) step(r, k);
      else if (j >= 0) { const d = (j - r.v + 26) % 26; step(r, d > 13 ? d - 26 : d); }
      else return;
      e.preventDefault();
    });
    draw(r, 0);
  });
  update();
}

const mount = (page, root) => {
  B.mount(page, root); // Zeitsprung-Übergang auf [data-jump]
  mountRail();
  mountStage(root);
  root.querySelectorAll('.sgw').forEach(mountSpyglass);
  mountMail(root);
  // Nur im Prototyp: file:// hat keinen Server für den PDF-Download per POST.
  root.querySelectorAll('form[action="/downloads/cv"]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.querySelector('button').textContent = 'Im Build kommt hier das PDF';
  }));
};

const shared = [
  '<b>Basis:</b> Variante B (Feedback des Owners vom 15.11.).',
  '<b>Navigation:</b> oben im Header, Logo ist der Joystick statt des Schriftzugs; ab etwa 90 px Scrollen fährt der Header weg und links fährt eine schmale Leiste mit senkrechter Schrift ein. Am Handy bleibt die Navigation oben (zwei Zeilen, immer sichtbar), weil eine Seitenleiste dort Breite frisst.',
  '<b>Signature-Moment:</b> weiterhin der Zeitstrahl, jetzt groß. Hinter „Jetzt“ liegt ein Halt <b>„?“ (Was kommt)</b>: Dort erscheint das <b>Chronoskop</b>. Dreht man seine vier Buchstabenringe auf das Codewort, wird die Linse scharf, die Geheimschrift entschlüsselt sich und darüber steht, was kommt: Ready Prepper One, der Spielmodus, „Dein Team?“ mit Link zum Kontakt (Texte: Beispiel). So bleibt es <b>ein</b> Moment, und Karte und Chronoskop kündigen den Spielmodus an.',
  '<b>Chronoskop</b> (Name statt „Fernrohr“): Aufbau eng nach <code>docs/about-me/Asoue.png</code> mit fünf Segmenten: 1 Code-Ringe mit Seilringen, 2 Holzschaft mit Emblemen, 3 Auszug mit Gravurband, 4 Auszug mit Schlitz, 5 Auszug mit Schrift und Okular. Abgewandelt: vier statt sechs Ringe, Sanduhr statt Lippen, Joystick-Medaille statt Münze, der Schlitz ist ein Pegel, der beim Scharfstellen voll läuft, eigene Gravur. Bedienung: Ring ziehen, oben oder unten antippen, Mausrad, Pfeiltasten oder Buchstabe tippen; der richtige Buchstabe ist rot und unterstrichen und leuchtet, sobald er im Fenster steht.',
  '<b>404:</b> „Dieser Ort ist auf keiner Karte verzeichnet“ mit demselben Chronoskop (Codewort ORTE); scharf gestellt zeigt es die 7 Orte als Ausweg.',
  '<b>Kontakt im Footer:</b> keine Adresse im Klartext. „E-Mail schreiben“ geht im Build auf <code>/mail</code>, der Server leitet per 302 auf <code>mailto:</code> weiter (klappt ohne JavaScript; im Prototyp spielt ein Klick-Handler das nach). „Adresse kopieren“ erscheint nur mit JavaScript, entschlüsselt die Adresse erst beim Klick und zeigt sie dann an.',
];

VARIANTS.D = {
  name: 'Zeitlinien · Split',
  notes: [
    '<b>Layout:</b> Der erste Screen ist zweigeteilt. Links Porträt (schwarz-weiß), Name, Headline, CTAs, Auszeichnungen; rechts der Zeitstrahl über die volle Bildschirmhöhe. Alles Wichtige ohne Scrollen.',
    ...shared,
    '<b>Project page:</b> wie die Home zuerst ein Teaser über den ganzen Screen (Cover, Titel, Kurztext, Haupt-Button, Fakten). Danach je Kategorie ein Screen mit allen Teilen zusammen: „Im Spiel“ (drei Teile nebeneinander), „Entstehung“ (oben die Phasen als Zeitleiste, darunter Frage, Weg, Ergebnis, Beitrag mit Skills als 2 × 2), die Learnings und das nächste Project. Am Handy wischt man die Teile einer Kategorie seitlich durch, der nächste lugt rechts hervor. Sanftes Einrasten beim Scrollen.',
    '<b>Haupt-Button:</b> am Desktop mit Maus „Im Browser spielen“, am Handy oder Tablet „Trailer ansehen“ (Video fehlt noch). Im Prototyp per CSS-Media-Query; die Spec prüft zusätzlich WebGL 2.',
    '<b>Bilder in „Im Spiel“:</b> Ausschnitte des Covers als Platzhalter; die Beschriftung nennt das Bild aus dem Thesis-Repo, das dort hingehört.',
    '<b>Projects:</b> zwei Screens. „Featured“ zeigt die 7 Karten kompakt (4 + 3), „Archiv“ die übrigen als Zeitleiste nach Jahren, das neueste zuerst.',
    '<b>Lebenslauf:</b> sechs Screens im Wechsel dunkel/hell: Kopf (PDF-Buttons als Formular, Sprungmarken, Sprachen), Erfahrung (die vier asellerate-Stationen unter einem Arbeitgeber), Engagement, Ausbildung (mit Abschlussarbeit und Kursen), Auszeichnungen (★ = Featured achievement), Skills. Die Belege eines Skills öffnen sich per Antippen in einer Ebene darüber (HTML-Popover, geht ohne JavaScript), damit der Screen nicht wächst. Drucken ergibt eine schlichte Liste ohne Navigation.',
    '<b>Über mich:</b> drei Screens: Porträt mit Bio, „Was ich mache“ (Services), Interessen als große Liste.',
  ],
  css,
  render: page => ({ project, projects: projectsPage, cv: cvPage, about: aboutPage, 404: notFound }[page] || homeSplit)(),
  mount,
};
VARIANTS.E = {
  name: 'Zeitlinien · Bühne',
  notes: ['<b>Layout:</b> oben Name groß mit Porträt rechts daneben, darunter die Auszeichnungen; dann der Zeitstrahl als breite Bühne über etwa drei Viertel der Bildschirmhöhe. Der Scrubber liegt oben auf der Bühne, damit er im ersten Screen bleibt.', ...shared, '<b>Project page:</b> aus B, nur mit neuer Navigation. Die überarbeitete Project page gibt es nur in D.'],
  css,
  render: page => page === 'project' ? withNav(B.render('project', D), 'projects') : page === '404' ? notFound() : homeBuehne(),
  mount,
};
})();
