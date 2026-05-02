(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      navList.classList.toggle("open", open);
    });

    navList.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) return;
      navToggle.setAttribute("aria-expanded", "false");
      navList.classList.remove("open");
    });
  }

  const revealTargets = document.querySelectorAll(
    ".section-heading, .page-title, .hero-copy, .hero-actions, .hero-visual, .project-media, .card, .project-card, .detail-card, .contact-card, .media-frame"
  );

  revealTargets.forEach((target) => target.classList.add("reveal-item"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
})();
