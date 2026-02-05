/* Portfolio interactions: nav toggle, footer year, and IntersectionObserver-powered reveals */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list, .nav-menu');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });

    navList.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealTargets = Array.from(
    new Set([
      ...document.querySelectorAll('.reveal-item'),
      ...document.querySelectorAll('.project-card'),
      ...document.querySelectorAll('img'),
    ])
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Ensure targets participate in reveal animations.
  revealTargets.forEach((el) => el.classList.add('reveal-item'));

  // Stagger project card entrance timings.
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.setProperty('--stagger-delay', `${120 + index * 90}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((el, index) => {
      if (!el.style.getPropertyValue('--stagger-delay')) {
        el.style.setProperty('--stagger-delay', `${(index % 8) * 50}ms`);
      }
      observer.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();
