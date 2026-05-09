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
  sr.reveal(".ray-ai-copy", { delay: 120 });
  sr.reveal(".ray-ai-panel", { delay: 220 });
}

const rayAiPrompts = [
  "Summarize this portfolio for a data analyst recruiter",
  "Which project best shows SQL and Power BI skills?",
  "What business problems can Ray solve with data?",
  "Write a short hiring pitch for Ray"
];

const rayAiFallbackApiKey = "AIzaSyBZvUQrNJCPs2BAgviLYQhxrnuH1H1-ihg";
const rayAiDefaultModel = "gemini-2.5-flash";
const rayAiPortfolioContext = `
You are Ray AI, the built-in assistant for Ray Mhlongo's portfolio website. You can answer general questions, but when a user asks about "this portfolio", "the site", "Ray", "your projects", "skills", or "contact", use the portfolio facts below as your source of truth. Do not say you cannot see the portfolio.

Portfolio owner: Ray Mhlongo. Ray is an aspiring/junior data analyst focused on SQL, Excel, Power BI, Python foundations, data cleaning, dashboards, and practical business analysis. He studies Information Science and Organizational and Industrial Psychology, which gives him a mix of systems thinking and people-focused analysis.

Core workflow: clean messy data, structure it, check quality, find patterns, compare options, and explain the results in plain business language.

Skills shown: SQL/MySQL querying, filtering, joins, aggregations, data modeling; Excel formulas, pivot tables, data cleaning, budget and operational tracking; Power BI dashboards, trend visuals, comparison reports; Python for data analysis and automation foundations; networking and IT foundations from Google IT Support, Cisco networking/data analytics, Microsoft 365 fundamentals, and security basics.

Projects:
1. PC Price Analysis: flagship project cleaning and structuring PC hardware pricing data to compare products across shops, provinces, categories, and manufacturers. Uses SQL, MySQL, Power BI, and GitHub.
2. ISP Price Comparison: compares internet packages using cost per Mbps to identify better-value options. Uses collected public package data, cleaned prices/speeds/plan details, and a Power BI dashboard.
3. Cathdel Creamy: small business analytics concept for sales tracking, customer activity, loyalty behavior, product performance, and daily revenue insights.
4. Insight Rides: school transport management app for trips, students, payments, vehicles, routes, income, expenses, and reports. Uses React, Vite, Tailwind CSS, Chart.js, Leaflet maps, Google Drive API, local storage, and structured JSON data.

Ray answers business questions like: which products generate the most revenue, what periods are busiest, how prices vary across providers, where value is strongest, which trends show growth or decline, and how raw data can be cleaned for reporting.

Contact: email rodgersmhlongo@gmail.com, LinkedIn linkedin.com/in/raymhlongo, GitHub github.com/Ray-Mhlongo, WhatsApp via the portfolio contact links.

Answer clearly and confidently. Keep portfolio answers concise unless the user asks for detail.`;

function rayAiEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function rayAiFormatResponse(value) {
  const safe = rayAiEscape(value);
  return safe
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

function rayAiAddMessage(container, role, html) {
  const message = document.createElement("div");
  message.className = `ray-ai-message ${role}`;
  message.innerHTML = role === "user" ? `<p>${rayAiEscape(html)}</p>` : `<p>${html}</p>`;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

function rayAiAddLoader(container) {
  const message = document.createElement("div");
  message.className = "ray-ai-message assistant ray-ai-loading";
  message.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

function rayAiConfig() {
  const config = window.RAY_AI_CONFIG || {};
  const apiKey = String(config.apiKey || rayAiFallbackApiKey).trim();
  const model = String(config.model || rayAiDefaultModel).trim();
  return { apiKey, model };
}

async function rayAiGenerate(prompt, history) {
  const { apiKey, model } = rayAiConfig();

  if (!apiKey || apiKey.includes("PASTE_YOUR")) {
    throw new Error("Ray AI could not find a Gemini API key. Refresh the page and try again.");
  }

  const contents = [
    ...history.slice(-8),
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ];

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: rayAiPortfolioContext }]
      },
      contents,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        maxOutputTokens: 2048,
        responseMimeType: "text/plain"
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || "Gemini could not answer right now. Check the API key, model name, and browser console.";
    throw new Error(message);
  }

  const answer = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!answer) {
    throw new Error("Gemini returned an empty response. Try a different prompt.");
  }

  return answer;
}

function rayAiAttachPanel(panel) {
  const messages = panel.querySelector("[data-ray-ai-messages]");
  const prompts = panel.querySelector("[data-ray-ai-prompts]");
  const form = panel.querySelector("[data-ray-ai-form]");
  const input = panel.querySelector("[data-ray-ai-input]");

  if (!messages || !prompts || !form || !input) return;

  const history = [];

  prompts.innerHTML = "";
  rayAiPrompts.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ray-ai-chip";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      input.value = prompt;
      form.requestSubmit();
    });
    prompts.appendChild(button);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    prompts.classList.add("is-hidden");
    rayAiAddMessage(messages, "user", question);
    input.value = "";

    const loader = rayAiAddLoader(messages);
    form.classList.add("is-loading");

    try {
      const answer = await rayAiGenerate(question, history);
      loader.remove();
      rayAiAddMessage(messages, "assistant", rayAiFormatResponse(answer));
      history.push(
        { role: "user", parts: [{ text: question }] },
        { role: "model", parts: [{ text: answer }] }
      );
    } catch (error) {
      loader.remove();
      rayAiAddMessage(messages, "assistant", rayAiFormatResponse(error.message));
    } finally {
      form.classList.remove("is-loading");
      input.focus();
    }
  });
}

function rayAiCreateDock() {
  const dock = document.createElement("div");
  dock.className = "ray-ai-dock";
  dock.innerHTML = `
    <div class="ray-ai-panel">
      <div class="ray-ai-panel-header">
        <div>
          <p>Ray AI</p>
          <span>Gemini assistant</span>
        </div>
        <button class="ray-ai-close" type="button" aria-label="Close Ray AI"><i class="bx bx-x"></i></button>
      </div>
      <div class="ray-ai-greeting">
        <p><span>Hello, Dev</span></p>
        <p>How can I help you today?</p>
      </div>
      <div class="ray-ai-messages" data-ray-ai-messages aria-live="polite"></div>
      <div class="ray-ai-prompts" data-ray-ai-prompts></div>
      <form class="ray-ai-form" data-ray-ai-form>
        <label class="sr-only" for="ray-ai-dock-input">Ask Ray AI</label>
        <input id="ray-ai-dock-input" data-ray-ai-input type="text" placeholder="Enter a prompt here" autocomplete="off" />
        <button type="submit" aria-label="Ask Ray AI"><i class="bx bx-send"></i></button>
      </form>
    </div>
  `;

  const launcher = document.createElement("button");
  launcher.className = "ray-ai-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = '<i class="bx bx-message-rounded-dots" aria-hidden="true"></i><span>Ray AI</span>';

  const close = dock.querySelector(".ray-ai-close");
  launcher.addEventListener("click", () => {
    const open = dock.classList.toggle("open");
    launcher.setAttribute("aria-expanded", String(open));
    if (open) dock.querySelector("[data-ray-ai-input]")?.focus();
  });
  close.addEventListener("click", () => {
    dock.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  });

  document.body.append(dock, launcher);
  rayAiAttachPanel(dock);
}

document.querySelectorAll("[data-ray-ai-inline]").forEach(rayAiAttachPanel);
rayAiCreateDock();
