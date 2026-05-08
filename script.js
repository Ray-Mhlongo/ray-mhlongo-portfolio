const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

function linkAction() {
  navLinks.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");

  const navMenu = document.getElementById("nav-menu");
  if (navMenu) navMenu.classList.remove("show");
}

navLinks.forEach((link) => link.addEventListener("click", linkAction));

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const counters = document.querySelectorAll(".counter");
if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count || 0);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(target * eased).toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const queryCards = document.querySelectorAll(".query-card[data-query]");
if (queryCards.length) {
  const queryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const code = card.querySelector("code");
        const query = card.dataset.query || "";
        let index = 0;

        const type = () => {
          if (!code) return;
          code.textContent = query.slice(0, index);
          index += 2;
          if (index <= query.length + 2) {
            setTimeout(type, 18);
          }
        };

        type();
        queryObserver.unobserve(card);
      });
    },
    { threshold: 0.28 }
  );

  queryCards.forEach((card) => queryObserver.observe(card));
}

document.querySelectorAll(".slicer").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.closest(".dashboard-panel");
    if (!panel) return;

    panel.querySelectorAll(".slicer").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    panel.querySelectorAll(".bar-chart span").forEach((bar, index) => {
      bar.style.animation = "none";
      bar.offsetHeight;
      bar.style.animation = `chartLoad 0.8s ease ${index * 60}ms both`;
    });
  });
});

if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "70px",
    duration: 1400,
    reset: false,
  });

  sr.reveal(".home-title", {});
  sr.reveal(".home-text", { delay: 150 });
  sr.reveal(".button", { delay: 220 });
  sr.reveal(".home-img", { delay: 320 });
  sr.reveal(".home-social", { delay: 380 });
  sr.reveal(".about-img", {});
  sr.reveal(".about-subtitle", { delay: 150 });
  sr.reveal(".about-text", { delay: 260 });
  sr.reveal(".skills-subtitle", { delay: 100 });
  sr.reveal(".skills-text", { delay: 160 });
  sr.reveal(".skills-data", { interval: 140 });
  sr.reveal(".skills-img", { delay: 260 });
  sr.reveal(".insight-card", { interval: 160 });
  sr.reveal(".project-card", { interval: 160 });
  sr.reveal(".case-card", { interval: 160 });
  sr.reveal(".skill-showcase", { interval: 180 });
  sr.reveal(".showcase-kpi", { interval: 120 });
  sr.reveal(".query-card", { interval: 160 });
  sr.reveal(".schema-card, .spreadsheet-card, .dashboard-panel, .terminal-card, .topology-card", { interval: 160 });
  sr.reveal(".project-visual", { delay: 200 });
  sr.reveal(".media-frame", { delay: 200 });
  sr.reveal(".contact-card", { interval: 160 });
  sr.reveal(".contact-input", { interval: 130 });
}
