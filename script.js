(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  /* ============================================================
     NAVBAR — scroll state
     ============================================================ */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ============================================================
     MOBILE DRAWER
     ============================================================ */
  const navToggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  const drawerClose = document.getElementById("drawerClose");

  const openDrawer = () => {
    drawer.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    drawerClose.focus();
  };
  const closeDrawer = () => {
    drawer.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    navToggle.focus();
  };

  navToggle.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  drawerClose.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });

  /* ============================================================
     SMOOTH SCROLL WITH HEADER OFFSET + ACTIVE LINK
     ============================================================ */
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-drawer a, a.back-to-top');
  const getNavHeight = () => navbar.getBoundingClientRect().height;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - getNavHeight() + 1;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      history.pushState(null, "", id);
    });
  });

  const sections = ["home", "about", "projects", "services", "education", "achievement", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-links a").forEach((l) => l.classList.remove("active"));
          const link = navLinkFor(entry.target.id);
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ============================================================
     STAT COUNTERS
     ============================================================ */
  const statGrid = document.getElementById("statGrid");
  const animateCount = (el) => {
    const final = el.getAttribute("data-final");
    if (!final) return;
    const numMatch = final.match(/\d+/)[0];
    const suffix = final.replace(numMatch, "");
    const targetNum = parseInt(numMatch, 10);
    const pad = numMatch.length;
    if (reduceMotion) {
      el.textContent = final;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(progress * targetNum);
      el.textContent = String(current).padStart(pad, "0") + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    requestAnimationFrame(step);
  };

  if (statGrid) {
    const statObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-final]").forEach(animateCount);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statObserver.observe(statGrid);
  }

  /* ============================================================
     SERVICES DATA + RENDER
     ============================================================ */
  const services = [
    { num: "01", title: "1-Page Landing Page", desc: "Hero, About, Services, Contact", price: "₹2,999 – ₹4,999", icon: "fa-globe" },
    { num: "02", title: "Personal Portfolio", desc: "About, Skills, Projects, Contact", price: "₹3,999 – ₹6,999", icon: "fa-user" },
    { num: "03", title: "Student Portfolio", desc: "Portfolio + Resume + Projects", price: "₹2,999 – ₹5,999", icon: "fa-graduation-cap" },
    { num: "04", title: "Business Website", desc: "4–6 Pages + Responsive Design", price: "₹6,999 – ₹12,999", icon: "fa-briefcase" },
    { num: "05", title: "Restaurant Website", desc: "Menu, Gallery, Location, Contact", price: "₹5,999 – ₹10,999", icon: "fa-utensils" },
    { num: "06", title: "Event Website", desc: "Event Details, Schedule, Registration", price: "₹5,999 – ₹10,999", icon: "fa-calendar-days" },
    { num: "07", title: "College / Institution Website", desc: "Pages, Departments, Notices, Contact", price: "₹10,999 – ₹24,999", icon: "fa-building-columns" },
    { num: "08", title: "Booking Website", desc: "Services + Booking Form + Database", price: "₹12,999 – ₹24,999", icon: "fa-calendar-check" },
    { num: "09", title: "E-Commerce Website", desc: "Products, Cart, Checkout, Admin", price: "₹15,999 – ₹34,999", icon: "fa-cart-shopping" },
    { num: "10", title: "Advanced E-Commerce", desc: "Payments + Orders + Dashboard + Database", price: "₹29,999 – ₹59,999+", icon: "fa-credit-card" },
    { num: "11", title: "Web App / SaaS", desc: "Login, Dashboard, Database, APIs", price: "₹24,999 – ₹74,999+", icon: "fa-code" },
    { num: "12", title: "Website to App", desc: "Website → Android App + APK + App Icon + Splash Screen + Responsive WebView", price: "₹4,999 – ₹9,999", icon: "fa-mobile-screen" },
  ];

  const servicesGrid = document.getElementById("servicesGrid");
  services.forEach((s, i) => {
    const card = document.createElement("button");
    card.className = "service-card reveal" + (i % 2 ? " reveal-delay-1" : "");
    card.setAttribute("data-index", i);
    card.innerHTML = `
      <span class="service-icon"><i class="fa-solid ${s.icon}" aria-hidden="true"></i></span>
      <span class="service-num">${s.num} —</span>
      <span class="service-title">${s.title}</span>
      <span class="service-desc">${s.desc}</span>
      <span class="service-price">${s.price}</span>
      <span class="service-explore">Explore Service <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>`;
    servicesGrid.appendChild(card);
  });

  // re-observe newly created reveal cards
  if (!reduceMotion) {
    const lateObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    servicesGrid.querySelectorAll(".reveal").forEach((el) => lateObserver.observe(el));
  } else {
    servicesGrid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ============================================================
     SERVICE DIALOG
     ============================================================ */
  const serviceDialog = document.getElementById("serviceDialog");
  const dlgNum = document.getElementById("dlgNum");
  const dlgTitle = document.getElementById("dlgTitle");
  const dlgDesc = document.getElementById("dlgDesc");
  const dlgPrice = document.getElementById("dlgPrice");
  const dlgStart = document.getElementById("dlgStart");
  const serviceDialogClose = document.getElementById("serviceDialogClose");

  let selectedService = null;

  servicesGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-index]");
    if (!card) return;
    const s = services[Number(card.getAttribute("data-index"))];
    selectedService = s;
    dlgNum.textContent = s.num + " —";
    dlgTitle.textContent = s.title;
    dlgDesc.textContent = s.desc;
    dlgPrice.textContent = s.price;
    serviceDialog.showModal();
  });

  serviceDialogClose.addEventListener("click", () => serviceDialog.close());
  serviceDialog.addEventListener("click", (e) => {
    if (e.target === serviceDialog) serviceDialog.close();
  });

  const updateMailto = () => {
    const emailRow = document.getElementById("emailRow");
    const letsTalkBtn = document.getElementById("letsTalkBtn");
    const base = "mailto:rajeshraju130608@gmail.com";
    if (selectedService) {
      const subject = encodeURIComponent(`Project Inquiry — ${selectedService.title}`);
      const href = `${base}?subject=${subject}`;
      if (letsTalkBtn) letsTalkBtn.href = href;
      if (emailRow) emailRow.href = href;
    } else {
      if (letsTalkBtn) letsTalkBtn.href = base;
      if (emailRow) emailRow.href = base;
    }
  };

  const goToContact = () => {
    const target = document.getElementById("contact");
    const top = target.getBoundingClientRect().top + window.scrollY - getNavHeight() + 1;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    history.pushState(null, "", "#contact");
  };

  dlgStart.addEventListener("click", () => {
    updateMailto();
    serviceDialog.close();
    goToContact();
  });

  document.querySelector(".services-cta .btn-primary").addEventListener("click", () => {
    selectedService = null;
    updateMailto();
  });

  /* ============================================================
     CERTIFICATE LIGHTBOX
     ============================================================ */
  const certLightbox = document.getElementById("certLightbox");
  const certOpen = document.getElementById("certOpen");
  const certOpenBtn = document.getElementById("certOpenBtn");
  const certClose = document.getElementById("certClose");

  const openLightbox = () => certLightbox.showModal();
  const closeLightbox = () => certLightbox.close();

  if (certOpen) certOpen.addEventListener("click", openLightbox);
  if (certOpenBtn) certOpenBtn.addEventListener("click", openLightbox);
  certClose.addEventListener("click", closeLightbox);
  certLightbox.addEventListener("click", (e) => {
    if (e.target === certLightbox) closeLightbox();
  });

  /* ============================================================
     CUSTOM CURSOR (fine pointer, motion allowed)
     ============================================================ */
  if (isFinePointer && !reduceMotion) {
    const cursor = document.getElementById("cursorDot");
    let mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
      cursor.classList.add("is-active");
    });
    window.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        cursor.classList.add("is-view");
        cursor.textContent = "VIEW";
      });
      card.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-view");
        cursor.textContent = "";
      });
    });
  } else {
    const cursor = document.getElementById("cursorDot");
    if (cursor) cursor.style.display = "none";
  }
})();
