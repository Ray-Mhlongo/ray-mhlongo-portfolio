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
  sr.reveal(".raydar-copy", { delay: 120 });
  sr.reveal(".raydar-panel", { delay: 220 });
}

const raydarKnowledge = [
  {
    title: "Ray Mhlongo",
    type: "Profile",
    url: "about.html",
    tags: ["ray", "about", "data analyst", "junior", "profile", "summary", "hire"],
    text: "Ray Mhlongo is a junior data analyst focused on SQL, Excel, Power BI, data cleaning, business analysis, and turning raw information into clear decisions. He majors in Information Science and Organizational and Industrial Psychology, giving him a mix of systems thinking and people-focused analysis."
  },
  {
    title: "Core analytical approach",
    type: "Workflow",
    url: "index.html#skills",
    tags: ["workflow", "clean", "compare", "explain", "analysis", "business questions"],
    text: "Ray's workflow is simple and practical: clean messy data, structure it, check quality, find patterns, compare options, and explain the result in plain language for decision makers."
  },
  {
    title: "SQL",
    type: "Skill",
    url: "skill-sql.html",
    tags: ["sql", "mysql", "database", "query", "joins", "data modeling"],
    text: "Ray uses SQL and MySQL for querying, filtering, joins, aggregations, cleaning, structured analysis, and building data models that support dashboards and reports."
  },
  {
    title: "Excel",
    type: "Skill",
    url: "skill-excel.html",
    tags: ["excel", "spreadsheet", "pivot", "formulas", "cleaning"],
    text: "Ray uses Excel for data cleaning, formulas, pivot tables, budget tracking, spreadsheet analysis, and turning operational records into useful tables."
  },
  {
    title: "Power BI",
    type: "Skill",
    url: "skill-power-bi.html",
    tags: ["power bi", "dashboard", "visualization", "report", "bi"],
    text: "Ray uses Power BI to build interactive dashboards, compare performance, show trends, and make business insights easy to scan."
  },
  {
    title: "Python",
    type: "Skill",
    url: "skill-python.html",
    tags: ["python", "automation", "analysis", "cleaning"],
    text: "Ray is building Python ability for data analysis, automation, and practical analysis workflows alongside SQL, Excel, and Power BI."
  },
  {
    title: "Networking and IT foundations",
    type: "Skill",
    url: "skill-networking.html",
    tags: ["networking", "it", "cisco", "support", "security"],
    text: "Ray has IT foundations including networking concepts, Cisco learning, Google IT Support, Microsoft 365 fundamentals, and security basics."
  },
  {
    title: "PC Price Analysis",
    type: "Project",
    url: "pc-price-analysis.html",
    tags: ["pc", "price", "hardware", "sql", "power bi", "flagship", "shop", "province"],
    text: "PC Price Analysis is a flagship project where Ray cleaned and modeled PC hardware pricing data to compare products across shops, provinces, categories, and manufacturers. Tools included SQL, MySQL, Power BI, and GitHub. The outcome made it easier to identify lower cost products and spot price differences."
  },
  {
    title: "ISP Price Comparison",
    type: "Project",
    url: "isp-price-comparison.html",
    tags: ["isp", "internet", "price", "mbps", "power bi", "excel", "value", "comparison"],
    text: "ISP Price Comparison compares local internet packages using cost per Mbps. Ray collected public package data, cleaned prices, speeds, plan names, and connection types, then built a Power BI dashboard to show value clearly."
  },
  {
    title: "Cathdel Creamy",
    type: "Project",
    url: "cathdel-creamy.html",
    tags: ["cathdel", "creamy", "sales", "customers", "loyalty", "small business"],
    text: "Cathdel Creamy is a small business analytics concept for tracking sales, customer activity, loyalty behavior, products, and daily performance. It shows how daily transactions can become views of revenue, popular products, and customer activity."
  },
  {
    title: "Insight Rides",
    type: "Project",
    url: "insight-rides.html",
    tags: ["insight rides", "transport", "react", "vite", "tailwind", "chart", "leaflet", "google drive", "offline", "operations"],
    text: "Insight Rides is a school transport management app for trips, students, payments, vehicles, routes, income, expenses, and reports. It uses React, Vite, Tailwind CSS, Chart.js, Leaflet maps, Google Drive API, local storage, and structured JSON data. It adds Drive sync and offline saving."
  },
  {
    title: "Questions Ray solves",
    type: "Analysis",
    url: "index.html",
    tags: ["questions", "products", "revenue", "trends", "customers", "sales", "reporting"],
    text: "Ray uses data to answer questions such as which products generate the most revenue, what periods are busiest, how prices vary across providers, which trends show growth or decline, and how raw data can be cleaned for reporting."
  },
  {
    title: "Contact Ray",
    type: "Contact",
    url: "contact.html",
    tags: ["contact", "email", "linkedin", "github", "whatsapp", "recruiter"],
    text: "Recruiters can contact Ray by email at rodgersmhlongo@gmail.com, LinkedIn at linkedin.com/in/raymhlongo, GitHub at github.com/Ray-Mhlongo, or WhatsApp through the contact page."
  }
];

const raydarPrompts = [
  "Why should a recruiter interview Ray?",
  "Which project best proves SQL and Power BI?",
  "Summarize Ray's Insight Rides project",
  "What data questions can Ray answer?",
  "How can I contact Ray?"
];

const raydarStopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "for", "from", "how", "i",
  "in", "is", "it", "me", "my", "of", "on", "or", "ray", "should", "show", "tell",
  "the", "this", "to", "what", "when", "where", "which", "who", "why", "with", "you"
]);

function raydarEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function raydarTokens(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !raydarStopWords.has(word));
}

function raydarFindMatches(question) {
  const tokens = raydarTokens(question);
  const phrase = question.toLowerCase();

  return raydarKnowledge
    .map((item) => {
      const haystack = `${item.title} ${item.type} ${item.tags.join(" ")} ${item.text}`.toLowerCase();
      let score = 0;

      item.tags.forEach((tag) => {
        if (phrase.includes(tag)) score += 5;
      });

      tokens.forEach((token) => {
        if (haystack.includes(token)) score += 1;
        if (item.title.toLowerCase().includes(token)) score += 2;
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function raydarIntent(question) {
  const text = question.toLowerCase();
  if (/contact|email|linkedin|github|whatsapp|reach/.test(text)) return "contact";
  if (/recruit|interview|hire|why|strength|fit/.test(text)) return "hire";
  if (/project|case study|portfolio|work|built|prove/.test(text)) return "project";
  if (/skill|tool|sql|excel|power|python|dashboard|bi/.test(text)) return "skill";
  return "general";
}

function raydarAnswer(question) {
  const matches = raydarFindMatches(question);
  const intent = raydarIntent(question);
  const sources = matches.length ? matches : raydarKnowledge.slice(0, 3);
  const sourceLinks = sources
    .map((item) => `<a href="${item.url}">${raydarEscape(item.title)}</a>`)
    .join(", ");

  if (intent === "contact") {
    return `
      <p>Recruiters can reach Ray directly through <a href="contact.html">the contact page</a>.</p>
      <ul>
        <li>Email: <a href="mailto:rodgersmhlongo@gmail.com">rodgersmhlongo@gmail.com</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/raymhlongo" target="_blank" rel="noopener noreferrer">linkedin.com/in/raymhlongo</a></li>
        <li>GitHub: <a href="https://github.com/Ray-Mhlongo" target="_blank" rel="noopener noreferrer">github.com/Ray-Mhlongo</a></li>
      </ul>
    `;
  }

  if (intent === "hire") {
    return `
      <p>Ray is a strong junior data analyst candidate because his portfolio shows the full path from messy data to decision-ready insight.</p>
      <ul>
        <li>He works with SQL, Excel, Power BI, Python foundations, and practical business analysis.</li>
        <li>His projects cover pricing, ISP value comparison, sales/customer analytics, and transport operations.</li>
        <li>He explains outcomes in plain business language, which is exactly what dashboard users and recruiters need.</li>
      </ul>
      <p>Best evidence: ${sourceLinks}.</p>
    `;
  }

  if (!matches.length) {
    return `
      <p>I could not find an exact match in the portfolio, but Ray's strongest themes are data cleaning, SQL analysis, Excel reporting, Power BI dashboards, and business-focused case studies.</p>
      <p>Try asking about SQL, Power BI, PC Price Analysis, ISP Price Comparison, Insight Rides, or contact details.</p>
    `;
  }

  const lead =
    intent === "project"
      ? "Here is the most relevant portfolio evidence:"
      : intent === "skill"
        ? "Here is what Ray's portfolio says about that skill area:"
        : "I found this in Ray's portfolio:";

  return `
    <p>${lead}</p>
    <ul>
      ${matches.map((item) => `<li><strong>${raydarEscape(item.title)}:</strong> ${raydarEscape(item.text)}</li>`).join("")}
    </ul>
    <p>Sources: ${sourceLinks}.</p>
  `;
}

function raydarAddMessage(container, role, html) {
  const message = document.createElement("div");
  message.className = `raydar-message ${role}`;
  message.innerHTML = role === "user" ? `<p>${raydarEscape(html)}</p>` : html;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function raydarAttachPanel(panel) {
  const messages = panel.querySelector("[data-raydar-messages]");
  const prompts = panel.querySelector("[data-raydar-prompts]");
  const form = panel.querySelector("[data-raydar-form]");
  const input = panel.querySelector("[data-raydar-input]");

  if (!messages || !prompts || !form || !input) return;

  if (!messages.children.length) {
    raydarAddMessage(messages, "assistant", "<p>Hello, I am Raydar AI. Ask me about Ray's projects, skills, dashboards, or contact details and I will answer from this portfolio.</p>");
  }

  prompts.innerHTML = "";
  raydarPrompts.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "raydar-chip";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      input.value = prompt;
      form.requestSubmit();
    });
    prompts.appendChild(button);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    raydarAddMessage(messages, "user", question);
    input.value = "";
    window.setTimeout(() => {
      raydarAddMessage(messages, "assistant", raydarAnswer(question));
    }, 180);
  });
}

function raydarCreateDock() {
  const dock = document.createElement("div");
  dock.className = "raydar-dock";
  dock.innerHTML = `
    <div class="raydar-panel">
      <div class="raydar-panel-header">
        <div>
          <p>Raydar AI</p>
          <span>Ask this portfolio anything</span>
        </div>
        <button class="raydar-close" type="button" aria-label="Close Raydar AI"><i class="bx bx-x"></i></button>
      </div>
      <div class="raydar-messages" data-raydar-messages aria-live="polite"></div>
      <div class="raydar-prompts" data-raydar-prompts></div>
      <form class="raydar-form" data-raydar-form>
        <label class="sr-only" for="raydar-dock-input">Ask Raydar AI</label>
        <input id="raydar-dock-input" data-raydar-input type="text" placeholder="Ask about Ray's portfolio" autocomplete="off" />
        <button type="submit" aria-label="Ask Raydar AI"><i class="bx bx-send"></i></button>
      </form>
    </div>
  `;

  const launcher = document.createElement("button");
  launcher.className = "raydar-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = '<i class="bx bx-search-alt-2" aria-hidden="true"></i><span>Raydar AI</span>';

  const close = dock.querySelector(".raydar-close");
  launcher.addEventListener("click", () => {
    const open = dock.classList.toggle("open");
    launcher.setAttribute("aria-expanded", String(open));
    if (open) dock.querySelector("[data-raydar-input]")?.focus();
  });
  close.addEventListener("click", () => {
    dock.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  });

  document.body.append(dock, launcher);
  raydarAttachPanel(dock);
}

document.querySelectorAll("[data-raydar-inline]").forEach(raydarAttachPanel);
raydarCreateDock();
