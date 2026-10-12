(() => {
  "use strict";
  const root = document.documentElement;
  root.classList.remove("no-js");

  const EMAIL = "homericcode@gmail.com";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ── i18n ─────────────────────────────────────────── */
  const en = {
    "skip": "Skip to content", "sound": "Lyre sound",
    "nav.services": "Services", "nav.process": "Process", "nav.work": "Work", "nav.contact": "Contact",
    "hero.chios": "Chios", "hero.l1": "Websites", "hero.l2": "& applications,", "hero.l3": "made with measure.",
    "hero.lead": "We design, develop and modernize websites and web applications, delivering reliable digital solutions tailored to the needs of every business.",
    "hero.cta": "Start a project",
    "hero.hint": "↔ move your cursor across the strings",
    "hero.hintTouch": "↔ swipe across the strings",
    "services.label": "Services", "services.title": "Seven areas of expertise. One goal: quality.",
    "s1.t": "Website Design & Development", "s1.d": "We design and build modern business websites and e-shops, with a focus on aesthetics, functionality and user experience.",
    "s2.t": "Web Application Development", "s2.d": "We build custom applications, information systems and API integrations, tailored to your business needs.",
    "s3.t": "Technical Support & Maintenance", "s3.d": "We keep your digital infrastructure running smoothly and securely, with regular updates, backups and ongoing technical support.",
    "s4.t": "SEO & Digital Presence", "s4.d": "We strengthen your business’s organic visibility through technical SEO and effective management of your presence on Google.",
    "s5.t": "Hosting & Digital Infrastructure", "s5.d": "We provide complete domain registration, web hosting and professional email solutions, with a focus on security and reliability.",
    "s6.t": "Performance & Accessibility", "s6.d": "We optimise the speed, performance and accessibility of digital solutions, using modern standards and development best practices.",
    "s7.t": "Website Upgrades & Modernization", "s7.d": "We upgrade existing websites with modern technologies and development practices, improving their look, functionality, speed and security — often without the need to rebuild them from scratch.",
    "process.label": "Process", "process.title": "From the first conversation to going live.",
    "p1.t": "Discovery & Needs Analysis", "p1.d": "We start by understanding your business, your goals and your users’ needs. Together we define the project’s requirements and priorities.",
    "p2.t": "Proposal & Planning", "p2.d": "We put together a complete technical and financial proposal, with a clear scope, a fixed cost and a realistic delivery timeline.",
    "p3.t": "Design & Development", "p3.d": "We design the architecture and user experience and move on to building the solution. At every stage we run quality checks and review progress together with you.",
    "p4.t": "Delivery & Support", "p4.d": "We take the solution into production, provide the training you need and stay by your side with technical support and room for future growth.",
    "work.label": "Work", "work.tag": "WordPress · Health & wellness",
    "work.d": "Website for a dietitian: programme presentation, blog and contact form. Domain, hosting and professional email set up from scratch, with guidance at every step.",
    "work.link": "Visit the site",
    "about.label": "Epic code",
    "about.big": "Epic code, inspired by Chios.",
    "about.p1": "Chios, the island tradition links to Homer, is our source of inspiration. Just as the Homeric epics stand out for their structure, rhythm and timelessness, we build software with a focus on clean architecture, consistency and long-term reliability.",
    "about.p3": "Our collaboration is built on direct communication, transparency and personal accountability.",
    "about.p2": "With experience in designing and delivering complex information systems, we bring the same technical rigour and commitment to quality to every project, regardless of size or complexity.",
    "contact.label": "Contact", "contact.t1": "Every project has", "contact.t2": "a beginning.",
    "contact.lead": "Tell us a little about your project. We reply within 1–2 business days with first thoughts and a cost range.",
    "contact.copy": "copy address", "contact.copied": "copied ✓",
    "f.name": "Name", "f.email": "Email", "f.type": "What do you need?", "f.msg": "A few words about the project", "f.send": "Send",
    "f.o1": "Website", "f.o2": "Application", "f.o3": "Maintenance", "f.o5": "Something else",
    "footer.loc": "Chios, Greece", "footer.top": "back to top ↑",
    "form.err": "Please add your name, a valid email and a message.",
    "form.ok": "Your email app is opening with the message ready to send."
  };
  const el = {
    "hero.hintTouch": "↔ σύρετε το δάχτυλο πάνω από τις χορδές",
    "contact.copied": "αντιγράφηκε ✓",
    "form.err": "Συμπληρώστε όνομα, έγκυρο email και μήνυμα.",
    "form.ok": "Ανοίγει η εφαρμογή email σας με το μήνυμα έτοιμο."
  };
  $$("[data-i18n]").forEach(n => { el[n.dataset.i18n] = n.textContent; });
  const dict = { el, en };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* noop */ } }
  };
  let lang = store.get("hc-lang") || ((navigator.language || "el").startsWith("el") ? "el" : "en");
  const t = k => dict[lang][k] ?? dict.el[k] ?? k;

  function applyLang() {
    root.lang = lang;
    $$("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    $("#langToggle").textContent = lang === "el" ? "EN" : "ΕΛ";
    document.title = lang === "el" ? "Homeric Code — Ιστοσελίδες & Εφαρμογές" : "Homeric Code — Websites & Applications";
  }
  $("#langToggle").addEventListener("click", () => {
    lang = lang === "el" ? "en" : "el"; store.set("hc-lang", lang); applyLang();
  });
  applyLang();

  /* ── Clock (Chios time) ───────────────────────────── */
  const clock = $("#clock");
  const fmt = new Intl.DateTimeFormat("el-GR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Athens", hour12: false });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  /* ── Pointer state ────────────────────────────────── */
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };
  addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });

  /* ── Custom cursor ────────────────────────────────── */
  const cursor = $(".cursor");
  if (finePointer && !reduced) {
    root.classList.add("has-cursor");
    const ring = $(".cursor__ring"), dot = $(".cursor__dot"), label = $(".cursor__label");
    let rx = mouse.x, ry = mouse.y;
    const loop = () => {
      rx += (mouse.x - rx) * 0.2; ry += (mouse.y - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("pointerover", e => {
      const target = e.target.closest("a, button, label, [data-cursor]");
      cursor.classList.toggle("is-hover", !!target);
      label.textContent = target ? (target.dataset.cursor || "") : "";
      cursor.classList.toggle("on-dark", !!e.target.closest(".sec--ink, .marquee"));
    });
    document.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    document.addEventListener("pointerup", () => cursor.classList.remove("is-down"));
    document.addEventListener("pointerleave", () => cursor.classList.add("is-hidden"));
    document.addEventListener("pointerenter", () => cursor.classList.remove("is-hidden"));
  }

  /* ── Lyre sound (Karplus–Strong) ──────────────────── */
  const sound = { on: false, ctx: null, cache: new Map(), last: 0 };
  // D Dorian across ~3 octaves — an old Greek mode for a Greek lyre
  const DORIAN = [0, 2, 3, 5, 7, 9, 10];
  const noteFreq = i => {
    const oct = Math.floor(i / DORIAN.length), step = DORIAN[i % DORIAN.length];
    return 146.83 * Math.pow(2, (oct * 12 + step) / 12); // D3 base
  };
  function ksBuffer(freq) {
    const key = Math.round(freq);
    if (sound.cache.has(key)) return sound.cache.get(key);
    const sr = sound.ctx.sampleRate, len = Math.floor(sr * 1.8), N = Math.round(sr / freq);
    const buf = sound.ctx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    for (let i = 0; i < N; i++) d[i] = Math.random() * 2 - 1;
    for (let i = N; i < len; i++) d[i] = 0.4985 * (d[i - N] + d[i - N + 1]);
    sound.cache.set(key, buf);
    return buf;
  }
  function pluckSound(index, strength) {
    if (!sound.on || !sound.ctx) return;
    const now = sound.ctx.currentTime;
    if (now - sound.last < 0.025) return;
    sound.last = now;
    const src = sound.ctx.createBufferSource(); src.buffer = ksBuffer(noteFreq(index));
    const g = sound.ctx.createGain(); g.gain.value = 0.12 + 0.25 * strength;
    const f = sound.ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 2600;
    src.connect(f).connect(g).connect(sound.ctx.destination); src.start();
  }
  const soundBtn = $("#soundToggle");
  function ensureAudio() {
    if (!sound.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { sound.ctx = new AC(); } catch { /* noop */ } }
    }
    if (sound.ctx && sound.ctx.state === "suspended") sound.ctx.resume().catch(() => {});
  }
  // Sound is on by default (unless the visitor turned it off before).
  // Browsers only allow audio after a first click / tap / key press, so we unlock it then.
  sound.on = store.get("hc-sound") !== "off";
  soundBtn.setAttribute("aria-pressed", sound.on);
  if (sound.on) ensureAudio();
  const unlock = () => {
    if (sound.on) ensureAudio();
    if (sound.ctx && sound.ctx.state === "running") {
      ["pointerdown", "keydown", "touchstart"].forEach(ev => removeEventListener(ev, unlock, true));
    }
  };
  ["pointerdown", "keydown", "touchstart"].forEach(ev => addEventListener(ev, unlock, true));
  soundBtn.addEventListener("click", () => {
    sound.on = !sound.on;
    store.set("hc-sound", sound.on ? "on" : "off");
    soundBtn.setAttribute("aria-pressed", sound.on);
    if (sound.on) { ensureAudio(); pluckSound(7, .6); }
  });

  /* ── Strings (hero canvas) ────────────────────────── */
  const hero = $(".hero");
  const cvs = $("#strings");
  const ctx = cvs.getContext("2d");
  let W = 0, H = 0, DPR = 1, strings = [];
  const css = getComputedStyle(root);
  const INK = css.getPropertyValue("--ink").trim() || "#141311";
  const CLAY = css.getPropertyValue("--clay").trim() || "#c4612f";
  const PAPER = css.getPropertyValue("--paper").trim() || "#efeae0";

  // deterministic pseudo-random so the layout is stable
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function buildStrings() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height; DPR = Math.min(devicePixelRatio || 1, 2);
    cvs.width = W * DPR; cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed = 7;
    const gap = W < 700 ? 30 : 38;
    const count = Math.floor(W / gap);
    const cx = W / 2;
    strings = [];
    for (let i = 0; i < count; i++) {
      const xt = (i + 0.5) * (W / count);
      const xb = cx + (xt - cx) * 0.72;            // strings converge like the lyre
      const nodes = [];
      const n = rnd() < 0.55 ? 1 : 2;
      for (let k = 0; k < n; k++) nodes.push(0.12 + rnd() * 0.72);
      strings.push({ xt, xb, nodes, amp: 0, py: 0.5, t0: 0, w: 22 + rnd() * 10, glow: 0, last: 0, note: i % 21 });
    }
  }
  const xAt = (s, y) => s.xt + (s.xb - s.xt) * (y / H);

  function pluck(s, y, strength) {
    const now = performance.now();
    if (now - s.last < 70) return;
    s.last = now; s.t0 = now; s.py = clamp(y / H, 0.05, 0.95);
    s.amp = clamp(strength, 0.15, 1) * (W < 700 ? 12 : 18);
    s.glow = 1;
    pluckSound(s.note, strength);
  }

  // detect crossings between successive pointer positions inside the hero
  let prev = null;
  function onHeroMove(e) {
    const r = cvs.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() };
    if (prev && p.t - prev.t < 120) {
      const dt = Math.max(1, p.t - prev.t);
      const speed = Math.hypot(p.x - prev.x, p.y - prev.y) / dt; // px per ms
      for (const s of strings) {
        const a = prev.x - xAt(s, prev.y), b = p.x - xAt(s, p.y);
        if ((a <= 0 && b > 0) || (a >= 0 && b < 0)) pluck(s, p.y, speed / 1.6);
      }
    }
    prev = p;
  }
  hero.addEventListener("pointermove", onHeroMove, { passive: true });
  hero.addEventListener("pointerleave", () => { prev = null; });
  hero.addEventListener("pointerdown", e => { prev = null; onHeroMove(e); });

  let heroVisible = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);

  let nextAmbient = 0;
  function draw(now) {
    requestAnimationFrame(draw);
    if (!heroVisible) return;
    // occasional soft ambient pluck so the field never feels dead
    if (!reduced && now > nextAmbient && strings.length) {
      const s = strings[Math.floor(Math.random() * strings.length)];
      if (now - s.last > 1500) {
        const keepSound = sound.on; sound.on = false;
        pluck(s, H * (0.25 + Math.random() * 0.5), 0.18); s.glow = 0.4;
        sound.on = keepSound;
      }
      nextAmbient = now + 1800 + Math.random() * 2600;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    for (const s of strings) {
      const tt = (now - s.t0) / 1000;
      const env = s.amp ? s.amp * Math.exp(-tt * 3.2) : 0;
      const d = env * Math.sin(tt * s.w);
      if (env < 0.05) s.amp = 0;
      s.glow *= 0.96;
      const py = s.py * H;
      const off = y => d * (y < py ? y / py : (H - y) / (H - py));

      ctx.strokeStyle = s.glow > 0.05 ? mix(s.glow) : "rgba(20,19,17,.13)";
      ctx.lineWidth = 1 + s.glow * 0.8;
      ctx.beginPath();
      ctx.moveTo(s.xt, 0);
      ctx.lineTo(xAt(s, py) + d, py);
      ctx.lineTo(s.xb, H);
      ctx.stroke();

      for (const ny of s.nodes) {
        const y = ny * H, x = xAt(s, y) + off(y);
        ctx.beginPath();
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = s.glow > 0.2 ? CLAY : PAPER;
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = s.glow > 0.05 ? mix(s.glow) : "rgba(20,19,17,.32)";
        ctx.stroke();
      }
    }
  }
  function mix(g) { // ink → clay as a string glows
    const a = 0.13 + g * 0.87;
    return `rgba(196,97,47,${a.toFixed(3)})`;
  }
  buildStrings();
  let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(buildStrings, 120); });
  requestAnimationFrame(draw);

  /* ── Bar: shadow + hide on scroll down ────────────── */
  const bar = $(".bar");
  let lastY = scrollY, scrollV = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    scrollV = y - lastY;
    bar.classList.toggle("is-scrolled", y > 8);
    if (!menuOpen) bar.classList.toggle("is-away", y > 500 && scrollV > 4);
    if (scrollV < -4) bar.classList.remove("is-away");
    lastY = y;
  }, { passive: true });

  /* ── Mobile menu ──────────────────────────────────── */
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  let menuOpen = false;
  const setMenu = o => { menuOpen = o; menuBtn.setAttribute("aria-expanded", o); nav.classList.toggle("is-open", o); };
  menuBtn.addEventListener("click", () => setMenu(!menuOpen));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });

  /* ── Active nav link ──────────────────────────────── */
  const links = $$(".bar__nav a");
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle("is-active", a.hash === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["services", "process", "work", "contact"].forEach(id => secObs.observe(document.getElementById(id)));

  /* ── Marquee driven by scroll velocity ────────────── */
  const track = $("#marquee");
  let mx = 0, dir = 1;
  (function marquee() {
    if (!reduced) {
      if (Math.abs(scrollV) > 1) dir = Math.sign(scrollV);
      mx -= (0.6 + Math.min(Math.abs(scrollV), 40) * 0.25) * dir;
      scrollV *= 0.9;
      const half = track.scrollWidth / 2;
      if (half) { if (mx <= -half) mx += half; if (mx > 0) mx -= half; }
      track.style.transform = `translate3d(${mx}px,0,0)`;
    }
    requestAnimationFrame(marquee);
  })();

  /* ── Services: fill enters from the side you came in ─ */
  $$(".rhap").forEach(row => {
    row.addEventListener("pointerenter", e => {
      const r = row.getBoundingClientRect();
      row.style.setProperty("--origin", e.clientY - r.top < r.height / 2 ? "top" : "bottom");
    });
    row.addEventListener("pointerleave", e => {
      const r = row.getBoundingClientRect();
      row.style.setProperty("--origin", e.clientY - r.top < r.height / 2 ? "top" : "bottom");
    });
  });

  /* ── Process trace fills as you scroll ────────────── */
  const route = $("#route"), fill = $("#routeFill"), steps = $$(".route__steps li");
  function updateRoute() {
    const r = route.getBoundingClientRect();
    const mid = innerHeight * 0.6;
    const p = clamp((mid - r.top) / r.height, 0, 1);
    fill.style.height = (p * 100).toFixed(2) + "%";
    steps.forEach(li => li.classList.toggle("on", li.getBoundingClientRect().top + 18 < mid));
  }
  addEventListener("scroll", updateRoute, { passive: true });
  updateRoute();

  /* ── Tilt on the case study, gaze on the about mark ─ */
  if (finePointer && !reduced) {
    const tilt = $("#tilt"), browser = $(".browser", tilt);
    tilt.addEventListener("pointermove", e => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      browser.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
      browser.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
    });
    tilt.addEventListener("pointerleave", () => { browser.style.setProperty("--ry", "0deg"); browser.style.setProperty("--rx", "0deg"); });

    const about = $("#about"), mark = $(".about__mark");
    about.addEventListener("pointermove", e => {
      const r = mark.getBoundingClientRect();
      const x = clamp((e.clientX - (r.left + r.width / 2)) / innerWidth, -0.5, 0.5);
      const y = clamp((e.clientY - (r.top + r.height / 2)) / innerHeight, -0.5, 0.5);
      mark.style.setProperty("--ry", (x * 40).toFixed(2) + "deg");
      mark.style.setProperty("--rx", (-y * 30).toFixed(2) + "deg");
    });
    about.addEventListener("pointerleave", () => { mark.style.setProperty("--ry", "0deg"); mark.style.setProperty("--rx", "0deg"); });

    /* magnetic buttons */
    $$(".magnetic").forEach(m => {
      m.addEventListener("pointermove", e => {
        const r = m.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        m.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      m.addEventListener("pointerleave", () => { m.style.transition = "transform .5s cubic-bezier(.2,.7,.1,1), background .3s, color .3s"; m.style.transform = ""; });
      m.addEventListener("pointerenter", () => { m.style.transition = "transform .1s linear, background .3s, color .3s"; });
    });
  }

  /* ── Reveal on scroll ─────────────────────────────── */
  const rvTargets = $$(".sec__label, .sec__title, .rhap, .case__visual, .case__text, .about__markwrap, .about__text, .contact__title, .contact__grid > *");
  if (!reduced && "IntersectionObserver" in window) {
    rvTargets.forEach(n => n.classList.add("rv"));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rvTargets.forEach(n => io.observe(n));
  }
  requestAnimationFrame(() => root.classList.add("is-ready"));

  /* ── Copy email ───────────────────────────────────── */
  const copyBtn = $("#copyMail");
  copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* ignore */ }
    copyBtn.textContent = t("contact.copied");
    setTimeout(() => { copyBtn.textContent = t("contact.copy"); }, 1800);
  });

  /* ── Contact form → mailto (no backend on GitHub Pages) ─ */
  const form = $("#contactForm"), note = $("#formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const msg = String(d.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
      note.textContent = t("form.err"); note.classList.add("is-error"); return;
    }
    note.classList.remove("is-error");
    const subject = `[Homeric Code] ${d.get("type")} — ${name}`;
    const body = `${msg}\n\n— ${name}\n${email}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = t("form.ok");
  });
})();
