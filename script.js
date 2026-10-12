(() => {
  document.documentElement.classList.remove("no-js");
  const EMAIL = "homericcode@gmail.com";

  const en = {
    "skip": "Skip to content",
    "nav.services": "Services", "nav.process": "Process", "nav.work": "Work", "nav.about": "About", "nav.contact": "Contact",
    "hero.eyebrow": "Web development · Chios, Greece",
    "hero.title": "Websites and apps<br>that <em>work</em> for your business.",
    "hero.lead": "I design, build and manage fast, secure websites and web applications — from the first idea to ongoing maintenance.",
    "hero.cta1": "Get a quote", "hero.cta2": "See services",
    "hero.f1": "websites & e-shops", "hero.f2": "custom applications", "hero.f3": "local Google visibility",
    "services.eyebrow": "Services", "services.title": "Everything you need to be online",
    "s1.t": "Website development", "s1.d": "Business sites, landing pages and e-shops on WordPress, mobile-first and tailored to your brand.",
    "s2.t": "Web applications", "s2.d": "Custom apps, admin panels, booking systems and integrations with third-party services and APIs.",
    "s3.t": "Management & maintenance", "s3.d": "Updates, backups, security and content changes — so you don't have to deal with them.",
    "s4.t": "SEO & Google Business", "s4.d": "Local SEO and Google Business Profile optimisation so nearby customers can find you.",
    "s5.t": "Domain, hosting & email", "s5.d": "Choosing and setting up your domain, hosting and a professional email on your own name.",
    "s6.t": "Performance & speed", "s6.d": "Load-time optimisation, Core Web Vitals and accessibility for a better experience and ranking.",
    "process.eyebrow": "Process", "process.title": "Simple, clear, no surprises",
    "p1.t": "Discovery", "p1.d": "We discuss your goals, your audience and what the site needs to do.",
    "p2.t": "Proposal", "p2.d": "You get a written quote with a fixed price and timeline.",
    "p3.t": "Design & build", "p3.d": "Wireframe, design and development, with check-ins along the way.",
    "p4.t": "Launch & support", "p4.d": "Going live, training on how to manage it, and ongoing support.",
    "work.eyebrow": "Work", "work.title": "Recent work",
    "work.tag": "WordPress · Health & wellness",
    "work.d": "Website for a dietitian: programme presentation, blog and contact form. Domain, hosting and professional email set up from scratch.",
    "work.c3": "Blog", "work.c4": "Professional email", "work.link": "Visit website →",
    "about.eyebrow": "About", "about.title": "One developer, direct communication",
    "about.p1": "Homeric Code is my independent web development business. I'm a Full Stack Engineer with experience in large public-sector systems (.NET, SQL Server, government service integrations), and I bring the same reliability to projects for small businesses.",
    "about.p2": "Based in Chios, I work with clients across Greece. You talk directly to the person building your site — no middlemen.",
    "contact.eyebrow": "Contact", "contact.title": "Let's build something together",
    "contact.lead": "Tell me a little about your project and I'll get back to you with a proposal within 1–2 business days.",
    "f.name": "Name", "f.email": "Email", "f.type": "What do you need?", "f.msg": "Message", "f.send": "Send",
    "f.o1": "New website", "f.o2": "Web application", "f.o3": "Management / maintenance", "f.o4": "SEO", "f.o5": "Other",
    "footer.loc": "Chios, Greece", "footer.top": "Back to top ↑",
    "form.err": "Please fill in your name, a valid email and a message.",
    "form.ok": "Your email app is opening with the message ready to send."
  };

  const elMsgs = {
    "form.err": "Συμπληρώστε όνομα, έγκυρο email και μήνυμα.",
    "form.ok": "Ανοίγει η εφαρμογή email σας με το μήνυμα έτοιμο για αποστολή."
  };

  // Capture the Greek (default) text straight from the markup.
  const el = { ...elMsgs };
  document.querySelectorAll("[data-i18n]").forEach(n => { el[n.dataset.i18n] = n.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(n => { el[n.dataset.i18nHtml] = n.innerHTML; });
  const dict = { el, en };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
  };

  let lang = store.get("hc-lang") || (navigator.language || "el").slice(0, 2);
  if (!dict[lang]) lang = "el";

  const t = k => dict[lang][k] ?? dict.el[k] ?? k;

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(n => { n.innerHTML = t(n.dataset.i18nHtml); });
    document.getElementById("langToggle").textContent = lang === "el" ? "EN" : "ΕΛ";
    document.title = lang === "el" ? "Homeric Code — Ιστοσελίδες & Εφαρμογές" : "Homeric Code — Websites & Apps";
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "el" ? "en" : "el";
    store.set("hc-lang", lang);
    applyLang();
  });
  if (lang !== "el") applyLang();

  // Mobile menu
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  const setMenu = open => { burger.setAttribute("aria-expanded", open); links.classList.toggle("is-open", open); };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });

  // Nav border on scroll
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: .15 });
    items.forEach(i => io.observe(i));
  } else {
    items.forEach(i => i.classList.add("is-visible"));
  }

  // Contact form → opens the visitor's mail client (no backend needed on GitHub Pages)
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get("name") || "").trim();
    const email = (d.get("email") || "").trim();
    const msg = (d.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
      note.textContent = t("form.err"); note.classList.add("is-error"); return;
    }
    note.classList.remove("is-error");
    const subject = `[Homeric Code] ${d.get("type")} — ${name}`;
    const body = `${msg}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = t("form.ok");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
