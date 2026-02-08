/* Portfolio interactions: nav toggle, footer year, and IntersectionObserver-powered reveals */
(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    root.classList.add('theme-light');
  }

  const syncThemeToggle = () => {
    if (!themeToggle) return;
    const isLight = root.classList.contains('theme-light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode';
  };

  syncThemeToggle();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('theme-light');
      const isLight = root.classList.contains('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      syncThemeToggle();
    });
  }

  const navPairs = [];

  document.querySelectorAll('.nav-toggle').forEach((toggle) => {
    const targetId = toggle.getAttribute('aria-controls');
    const navList = targetId
      ? document.getElementById(targetId)
      : toggle.closest('nav')?.querySelector('.nav-list, .nav-menu');

    if (!navList) return;
    navPairs.push({ toggle, navList });

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
        if (!navList.classList.contains('open')) return;
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const ratingGroup = document.querySelector('[data-rating-group]');
  const ratingOutput = document.querySelector('[data-rating-output]');

  if (ratingGroup && ratingOutput) {
    const updateRatingOutput = (value) => {
      ratingOutput.textContent = value ? `Selected: ${value} / 5` : 'Select a rating';
    };

    const initial = ratingGroup.querySelector('input[type="radio"]:checked');
    updateRatingOutput(initial ? initial.value : '');

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
      const safeRating = Math.min(5, Math.max(1, Math.round(rating)));
      return {
        name: name || 'Anonymous',
        comment,
        rating: safeRating,
      };
    };

    const renderStars = (rating) => {
      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.setAttribute('aria-label', `${rating} out of 5 stars`);
      for (let i = 1; i <= 5; i += 1) {
        const star = document.createElement('span');
        star.className = 'review-star';
        if (i <= rating) star.classList.add('is-filled');
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

        header.appendChild(nameEl);
        header.appendChild(renderStars(review.rating));

        const commentEl = document.createElement('p');
        commentEl.className = 'review-comment';
        commentEl.textContent = review.comment;

        card.appendChild(header);
        card.appendChild(commentEl);
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
        if (emptyState) emptyState.remove();
        renderReviews(reviews);
      })
      .catch(() => {
        if (emptyState) {
          emptyState.textContent = 'Reviews are unavailable at the moment. Please check back soon.';
        }
      });
  }

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
