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
  sr.reveal(".project-visual", { delay: 200 });
  sr.reveal(".media-frame", { delay: 200 });
  sr.reveal(".contact-card", { interval: 160 });
  sr.reveal(".contact-input", { interval: 130 });
}
