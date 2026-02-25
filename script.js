/* Portfolio interactions: theme, mobile nav, ratings, reviews, and reveal animations */
(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const year = document.getElementById('year');

  const applyThemeState = () => {
    if (!themeToggle) return;
    const isLight = root.classList.contains('theme-light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode';
  };

  if (localStorage.getItem('theme') === 'light') {
    root.classList.add('theme-light');
  }
  applyThemeState();

  themeToggle?.addEventListener('click', () => {
    root.classList.toggle('theme-light');
    const isLight = root.classList.contains('theme-light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    applyThemeState();
  });

  if (year) year.textContent = String(new Date().getFullYear());

  const navPairs = Array.from(document.querySelectorAll('.nav-toggle'))
    .map((toggle) => {
      const id = toggle.getAttribute('aria-controls');
      const navList = id
        ? document.getElementById(id)
        : toggle.closest('nav')?.querySelector('.nav-list, .nav-menu');
      return navList ? { toggle, navList } : null;
    })
    .filter(Boolean);

  navPairs.forEach(({ toggle, navList }) => {
    const closeNav = () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });

    navList.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) closeNav();
    });
  });

  if (navPairs.length) {
    document.addEventListener('click', (event) => {
      navPairs.forEach(({ toggle, navList }) => {
        if (!navList.classList.contains('open')) return;
        if (navList.contains(event.target) || toggle.contains(event.target)) return;
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      navPairs.forEach(({ toggle, navList }) => {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const ratingGroup = document.querySelector('[data-rating-group]');
  const ratingOutput = document.querySelector('[data-rating-output]');

  if (ratingGroup && ratingOutput) {
    const updateRatingOutput = (value) => {
      ratingOutput.textContent = value ? `Selected: ${value} / 5` : 'Select a rating';
    };

    const initial = ratingGroup.querySelector('input[type="radio"]:checked');
    updateRatingOutput(initial?.value || '');

    ratingGroup.addEventListener('change', (event) => {
      if (event.target instanceof HTMLInputElement) {
        updateRatingOutput(event.target.value);
      }
    });
  }

  const reviewsList = document.querySelector('[data-review-list]');
  if (reviewsList) {
    const emptyState = document.querySelector('[data-review-empty]');

    const normalizeReview = (review) => {
      if (!review || typeof review !== 'object') return null;
      const name = typeof review.name === 'string' ? review.name.trim() : '';
      const comment = typeof review.comment === 'string' ? review.comment.trim() : '';
      const rating = Number(review.rating);

      if (!comment || !Number.isFinite(rating)) return null;

      return {
        name: name || 'Anonymous',
        comment,
        rating: Math.min(5, Math.max(1, Math.round(rating))),
      };
    };

    const renderStars = (rating) => {
      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.setAttribute('aria-label', `${rating} out of 5 stars`);

      for (let i = 1; i <= 5; i += 1) {
        const star = document.createElement('span');
        star.className = `review-star${i <= rating ? ' is-filled' : ''}`;
        star.textContent = '★';
        star.setAttribute('aria-hidden', 'true');
        stars.appendChild(star);
      }

      return stars;
    };

    const renderReviews = (reviews) => {
      reviewsList.innerHTML = '';
      reviews.forEach((review) => {
        const card = document.createElement('article');
        card.className = 'review-card reveal-item is-visible';

        const header = document.createElement('div');
        header.className = 'review-header';

        const nameEl = document.createElement('h3');
        nameEl.className = 'review-name';
        nameEl.textContent = review.name;

        const commentEl = document.createElement('p');
        commentEl.className = 'review-comment';
        commentEl.textContent = review.comment;

        header.append(nameEl, renderStars(review.rating));
        card.append(header, commentEl);
        reviewsList.appendChild(card);
      });
    };

    fetch('reviews.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load reviews');
        return response.json();
      })
      .then((data) => {
        const reviews = Array.isArray(data) ? data.map(normalizeReview).filter(Boolean) : [];
        if (!reviews.length) {
          if (emptyState) emptyState.textContent = 'No reviews have been published yet.';
          return;
        }

        emptyState?.remove();
        renderReviews(reviews);
      })
      .catch(() => {
        if (emptyState) {
          emptyState.textContent = 'Reviews are unavailable at the moment. Please check back soon.';
        }
      });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = Array.from(
    new Set([
      ...document.querySelectorAll('.reveal-item'),
      ...document.querySelectorAll('.project-card'),
      ...document.querySelectorAll('.section .card img, .hero img, .video-wrapper'),
    ])
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal-item');
    if (!el.style.getPropertyValue('--stagger-delay')) {
      el.style.setProperty('--stagger-delay', `${(index % 10) * 45}ms`);
    }
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
})();
