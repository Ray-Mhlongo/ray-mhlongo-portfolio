/* Portfolio interactions: theme, nav, reveal animations, ratings, and reviews */
(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeCookieName = "theme";

  const readThemeCookie = () => {
    const match = document.cookie.match(/(?:^|; )theme=([^;]+)/);
    if (!match) return null;
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return match[1];
    }
  };

  const writeThemeCookie = (value) => {
    try {
      document.cookie = `${themeCookieName}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore cookie write failures in restricted contexts.
    }
  };

  const safeGetTheme = () => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    } catch {
      // Fall back to cookie.
    }
    const cookieTheme = readThemeCookie();
    return cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : null;
  };

  const safeSetTheme = (value) => {
    if (value !== "dark" && value !== "light") return;
    try {
      localStorage.setItem("theme", value);
    } catch {
      // Ignore storage errors in private/sandboxed contexts.
    }
    writeThemeCookie(value);
  };

  const applySavedTheme = () => {
    const savedTheme = safeGetTheme();
    if (savedTheme === "dark") {
      root.classList.remove("theme-light");
      return;
    }
    if (savedTheme === "light") {
      root.classList.add("theme-light");
      return;
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.remove("theme-light");
    } else {
      root.classList.add("theme-light");
    }
  };

  const syncThemeToggle = () => {
    if (!themeToggle) return;
    const isLight = root.classList.contains("theme-light");
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
  };

  applySavedTheme();
  syncThemeToggle();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      root.classList.toggle("theme-light");
      const isLight = root.classList.contains("theme-light");
      safeSetTheme(isLight ? "light" : "dark");
      syncThemeToggle();
    });
  }

  const navPairs = [];

  document.querySelectorAll(".nav-toggle").forEach((toggle) => {
    const controlledId = toggle.getAttribute("aria-controls");
    const nav = controlledId
      ? document.getElementById(controlledId)
      : toggle.closest("nav")?.querySelector(".nav-list, .nav-menu");

    if (!nav) return;

    navPairs.push({ toggle, nav });

    toggle.addEventListener("click", () => {
      const nextExpanded = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(nextExpanded));
      nav.classList.toggle("open", nextExpanded);
    });

    nav.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const closeAllNav = () => {
    navPairs.forEach(({ toggle, nav }) => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  if (navPairs.length) {
    document.addEventListener("click", (event) => {
      navPairs.forEach(({ toggle, nav }) => {
        if (!nav.classList.contains("open")) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (nav.contains(target) || toggle.contains(target)) return;
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAllNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 760) closeAllNav();
    });
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const ratingGroup = document.querySelector("[data-rating-group]");
  const ratingOutput = document.querySelector("[data-rating-output]");

  if (ratingGroup && ratingOutput) {
    const updateRatingOutput = (value) => {
      ratingOutput.textContent = value ? `Selected: ${value} / 5` : "Select a rating";
    };

    const checked = ratingGroup.querySelector("input[type='radio']:checked");
    updateRatingOutput(checked instanceof HTMLInputElement ? checked.value : "");

    ratingGroup.addEventListener("change", (event) => {
      if (!(event.target instanceof HTMLInputElement)) return;
      updateRatingOutput(event.target.value);
    });
  }

  const reviewsList = document.querySelector("[data-review-list]");
  if (reviewsList) {
    const emptyState = document.querySelector("[data-review-empty]");

    const normalizeReview = (review) => {
      if (!review || typeof review !== "object") return null;
      const name = typeof review.name === "string" ? review.name.trim() : "";
      const comment = typeof review.comment === "string" ? review.comment.trim() : "";
      const rating = Number(review.rating);
      if (!comment || !Number.isFinite(rating)) return null;
      return {
        name: name || "Anonymous",
        comment,
        rating: Math.min(5, Math.max(1, Math.round(rating)))
      };
    };

    const renderStars = (rating) => {
      const stars = document.createElement("div");
      stars.className = "review-stars";
      stars.setAttribute("aria-label", `${rating} out of 5 stars`);

      for (let index = 1; index <= 5; index += 1) {
        const star = document.createElement("span");
        star.className = "review-star";
        if (index <= rating) star.classList.add("is-filled");
        star.textContent = "\u2605";
        star.setAttribute("aria-hidden", "true");
        stars.appendChild(star);
      }

      return stars;
    };

    const renderReviews = (reviews) => {
      reviewsList.innerHTML = "";

      reviews.forEach((review) => {
        const card = document.createElement("article");
        card.className = "review-card reveal-item is-visible";

        const header = document.createElement("div");
        header.className = "review-header";

        const nameEl = document.createElement("h3");
        nameEl.className = "review-name";
        nameEl.textContent = review.name;

        const commentEl = document.createElement("p");
        commentEl.className = "review-comment";
        commentEl.textContent = review.comment;

        header.appendChild(nameEl);
        header.appendChild(renderStars(review.rating));
        card.appendChild(header);
        card.appendChild(commentEl);
        reviewsList.appendChild(card);
      });
    };

    fetch("reviews.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load reviews");
        return response.json();
      })
      .then((data) => {
        const reviews = Array.isArray(data) ? data.map(normalizeReview).filter(Boolean) : [];
        if (!reviews.length) {
          if (emptyState) emptyState.textContent = "No reviews have been published yet.";
          return;
        }
        if (emptyState) emptyState.remove();
        renderReviews(reviews);
      })
      .catch(() => {
        if (emptyState) {
          emptyState.textContent = "Reviews are unavailable at the moment. Please check back soon.";
        }
      });
  }

  const revealTargets = Array.from(
    new Set([
      ...document.querySelectorAll(".reveal-item"),
      ...document.querySelectorAll(".project-card"),
      ...document.querySelectorAll(".fade-in")
    ])
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((element) => {
    if (!element.classList.contains("reveal-item")) {
      element.classList.add("reveal-item");
    }
  });

  document.querySelectorAll(".project-card").forEach((card, index) => {
    if (!card.style.getPropertyValue("--stagger-delay")) {
      card.style.setProperty("--stagger-delay", `${120 + index * 90}ms`);
    }
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealTargets.forEach((element, index) => {
    if (!element.style.getPropertyValue("--stagger-delay")) {
      element.style.setProperty("--stagger-delay", `${(index % 8) * 50}ms`);
    }
    observer.observe(element);
  });
})();
