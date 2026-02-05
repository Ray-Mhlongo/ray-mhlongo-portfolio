/* Portfolio interactions: nav toggle, footer year, and performant staggered reveal animations */
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
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const animatedElements = document.querySelectorAll(
    'main h1, main h2, main h3, main p, main li, main .card, main .detail-card, main .project-card, main img, main .btn, main .text-link, main .tag, main pre, main figure'
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  animatedElements.forEach((el, index) => {
    el.classList.add('reveal-item');
    el.style.setProperty('--stagger-delay', `${(index % 10) * 65}ms`);
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
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }
})();
