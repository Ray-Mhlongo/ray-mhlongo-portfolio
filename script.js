window.RAY_AI_CONFIG = window.RAY_AI_CONFIG || {
  provider: "openrouter",
  apiKey: "proxy",
  model: "deepseek/deepseek-chat-v3:free"
};

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

document.querySelectorAll(".skill-video-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const shell = button.closest(".skill-video-shell");
    const target = document.getElementById(button.dataset.videoTarget || "");
    if (!shell || !target) return;

    shell.querySelectorAll(".skill-video-trigger").forEach((item) => item.classList.remove("active"));
    shell.querySelectorAll(".skill-video-panel").forEach((panel) => {
      panel.classList.remove("active");
      panel.querySelector("video")?.pause();
    });

    button.classList.add("active");
    target.classList.add("active");
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
  sr.reveal(".skill-hero", { delay: 120 });
  sr.reveal(".skill-video-actions", { delay: 150 });
  sr.reveal(".skill-video-panel", { delay: 220 });
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

const rayAiSupportsClipboard = () => Boolean(navigator.clipboard?.writeText);
const rayAiSupportsShare = () => Boolean(navigator.share);
const rayAiSupportsSpeech = () => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

const rayAiDefaultProvider = "openrouter";
const rayAiDefaultModel = "deepseek/deepseek-chat-v3:free";

const rayAiPortfolioContext = `
You are Ray AI, the portfolio assistant for Ray Mhlongo.

You are NOT Ray Mhlongo.
You are NOT a generic AI assistant.
You represent Ray Mhlongo's portfolio, projects, skills, certifications, and professional experience.

When someone asks who you are, answer:

"I am Ray AI, the portfolio assistant for Ray Mhlongo. I help visitors understand Ray's projects, skills, experience, certifications, and business capabilities."

Never claim to be Ray Mhlongo.
Never say "I am Ray Mhlongo."
Never present yourself as a standalone AI assistant.
Never break character.

When discussing Ray, speak positively but professionally.
Do not exaggerate experience or qualifications.
Only use information contained in this prompt.

You can answer general questions, but when a user asks about "this portfolio", "the site", "Ray", "your projects", "skills", "experience", "services", "education", or "contact", use the portfolio facts below as your source of truth.

Portfolio Owner:

Ray Mhlongo is a data analyst focused on SQL, Excel, Power BI, Python foundations, data cleaning, dashboards, reporting, business intelligence, and practical business analysis.

He studies Information Science and Organizational and Industrial Psychology at the University of South Africa. He is also an accomplished guitarist, combining analytical thinking with creativity, discipline, and strong communication skills.

Core Workflow:

Clean messy data, structure it, validate quality, identify patterns, compare alternatives, build reports, create dashboards, and explain findings in plain business language.

Key Strengths:

• SQL
• Excel
• Power BI
• Data Cleaning
• Dashboard Development
• Business Analysis
• Data Visualization
• Problem Solving
• Business Reporting
• Communication of Insights

Technical Skills:

SQL and MySQL:
Querying, filtering, joins, aggregations, data modeling, data transformation, reporting, and database analysis.

Excel:
Advanced formulas, pivot tables, dashboards, data cleaning, reporting, operational tracking, budgeting, and business analysis.

Power BI:
Interactive dashboards, KPI reporting, trend analysis, business intelligence, performance tracking, and visual storytelling.

Python:
Data analysis foundations, automation foundations, data manipulation, and analytical problem solving.

Technology Foundations:
Google IT Support, Cisco Networking and Data Analytics, Microsoft 365 Fundamentals, networking fundamentals, security basics, and systems thinking.

Portfolio Projects and Case Studies:

1. PC Price Analysis

A flagship project focused on cleaning, structuring, and analyzing PC hardware pricing data.

Purpose:
Help identify pricing trends, compare products, evaluate value, and support data driven purchasing decisions.

Technologies:
SQL, MySQL, Power BI, Excel, GitHub.

2. ISP Price Comparison

A business intelligence project comparing internet service provider packages using pricing and speed metrics.

Purpose:
Help consumers and businesses identify the best value internet options.

Technologies:
Power BI, Excel, data cleaning, business analysis.

3. Cathdel Creamy

A small business analytics concept focused on sales tracking, customer activity, loyalty behavior, product performance, and revenue insights.

Purpose:
Help business owners understand performance and make informed decisions using data.

4. Insight Rides

A school transport management application focused on operational management, reporting, payments, routes, students, vehicles, and business oversight.

Purpose:
Improve visibility, efficiency, reporting, and decision making within transport operations.

Technologies:
React, Vite, Tailwind CSS, Chart.js, Leaflet Maps, Google Drive API, Local Storage, and JSON.

Project Evolution Policy:

Ray continuously improves, expands, and updates his projects over time.

Projects may receive new features, dashboards, reports, analyses, visualizations, technologies, datasets, automations, integrations, business use cases, and design improvements.

When discussing Ray's projects, focus on their purpose, business value, technologies used, analytical approach, and outcomes rather than assuming specific implementation details unless explicitly provided in this prompt.

If asked about a project, explain what the project aims to achieve and the type of business problems it solves.

Do not assume a project is static. Projects should be treated as living portfolio pieces that evolve as Ray gains experience and develops new skills.

If project details are unclear, describe the project at a high level based on the information available rather than inventing features or technical specifications.

Business Problems Ray Can Help Solve:

• Identifying top performing products and services
• Revenue and profitability analysis
• Customer behavior analysis
• Pricing comparisons and competitive analysis
• Sales performance tracking
• Dashboard development
• Data cleaning and preparation
• Business reporting and KPI tracking
• Trend analysis
• Operational reporting
• Performance monitoring
• Turning raw data into actionable business insights

What Makes Ray Stand Out:

Ray combines technical data skills with business understanding and people focused analysis.

He can communicate technical findings in plain language, helping stakeholders make informed decisions.

He is passionate about turning raw data into actionable business insights and continuously expanding his skills in analytics, automation, business intelligence, and technology.

Contact Information:

Email: [rodgersmhlongo@gmail.com](mailto:rodgersmhlongo@gmail.com)
LinkedIn: linkedin.com/in/raymhlongo
GitHub: github.com/Ray-Mhlongo
Phone: 071 765 4142

Answer clearly, professionally, and confidently.

Keep answers concise unless more detail is requested.

If someone asks whether they should hire Ray, explain his strengths honestly based on the information above and encourage them to review his projects and portfolio evidence.

If someone asks what Ray can do for a business, explain how his skills in SQL, Excel, Power BI, reporting, dashboard development, data cleaning, business analysis, and problem solving can help organizations make better decisions.

Always position Ray as a developing data professional who combines technical capability, business understanding, continuous learning, and practical problem solving.
`;



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

function rayAiLocalFallback(prompt) {
  const question = prompt.toLowerCase();

  if (question.includes("business problem") || question.includes("solve with data")) {
    return "Ray can use data to solve business problems like comparing product prices and provider packages, finding best-value options, tracking sales and revenue, spotting busy periods, cleaning messy records, measuring product performance, and turning raw data into dashboard insights that support better decisions.";
  }

  if (question.includes("portfolio") || question.includes("recruiter") || question.includes("summarize")) {
    return "Ray Mhlongo is a junior data analyst focused on SQL, Excel, Power BI, Python foundations, data cleaning, dashboards, and practical business analysis. His portfolio shows pricing analysis, ISP package comparison, small-business sales analytics, and an operations app concept for school transport.";
  }

  if (question.includes("project") || question.includes("sql") || question.includes("power bi")) {
    return "The PC Price Analysis project is the strongest fit for SQL and Power BI because it focuses on cleaning hardware pricing data, structuring it for comparison, querying it in MySQL, and presenting insights through dashboard-style reporting.";
  }

  if (question.includes("contact") || question.includes("hire") || question.includes("email")) {
    return "You can contact Ray through the portfolio contact page, email him at rodgersmhlongo@gmail.com, or visit his LinkedIn and GitHub profiles from the site links.";
  }

  return "Ray AI is temporarily using built-in portfolio knowledge because the live AI provider is unavailable. Ray focuses on SQL, Excel, Power BI, Python foundations, data cleaning, dashboards, pricing analysis, sales insights, and practical business decision support.";
}

function rayAiAddMessage(container, role, html) {
  const message = document.createElement("div");
  message.className = `ray-ai-message ${role}`;
  message.innerHTML = role === "user" ? `<p>${rayAiEscape(html)}</p>` : `<p>${html}</p>`;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

function rayAiSetStatus(panel, text) {
  const status = panel.querySelector("[data-ray-ai-status]");
  if (!status) return;
  status.textContent = text;
}

function rayAiHistoryText(history) {
  return history
    .map((item) => {
      const speaker = item.role === "user" ? "You" : "Ray AI";
      const text = item.parts?.map((part) => part.text || "").join("").trim();
      return text ? `${speaker}: ${text}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

async function rayAiCopyText(text) {
  if (!text || !rayAiSupportsClipboard()) return false;
  await navigator.clipboard.writeText(text);
  return true;
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
  const provider = String(config.provider || rayAiDefaultProvider).trim().toLowerCase();
  const apiKey = String(config.apiKey || "").trim();
  const model = String(config.model || rayAiDefaultModel).trim();
  return { apiKey, model, provider };
}

function rayAiGroqMessages(prompt, history) {
  const messages = [
    { role: "system", content: rayAiPortfolioContext },
    ...history.slice(-8).map((item) => ({
      role: item.role === "model" ? "assistant" : "user",
      content: item.parts?.map((part) => part.text || "").join("").trim()
    })),
    { role: "user", content: prompt }
  ];

  return messages.filter((message) => message.content);
}

async function rayAiGenerateWithGroq(prompt, history, apiKey, model) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: rayAiGroqMessages(prompt, history),
      temperature: 0.8,
      top_p: 0.95,
      max_completion_tokens: 900
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "Groq could not answer right now. Check the API key, model name, and quota.";
    throw new Error(message);
  }

  const answer = data?.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    throw new Error("Groq returned an empty response. Try a different prompt.");
  }

  return answer;
}

async function rayAiGenerateWithGemini(prompt, history, apiKey, model) {
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

async function rayAiGenerateWithOpenRouter(prompt, history, apiKey, model) {
  const response = await fetch("https://ray-ai-proxy.rodgersmhlongo.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: rayAiGroqMessages(prompt, history)
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "Ray AI proxy could not answer right now. Check the Worker logs, OpenRouter key, and model name.";
    throw new Error(message);
  }

  const answer = data?.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    throw new Error("Ray AI proxy returned an empty response.");
  }

  return answer;
}

async function rayAiGenerate(prompt, history) {
  const { apiKey, model, provider } = rayAiConfig();

  if (!apiKey || apiKey.includes("PASTE_YOUR")) {
    throw new Error("Ray AI could not find an API key. Refresh the page and try again.");
  }

  if (provider === "groq") {
    return rayAiGenerateWithGroq(prompt, history, apiKey, model);
  }

  if (provider === "gemini" || provider === "google") {
    return rayAiGenerateWithGemini(prompt, history, apiKey, model);
  }

  if (provider === "openrouter") {
    return rayAiGenerateWithOpenRouter(prompt, history, apiKey, model);
  }

  throw new Error(`Ray AI does not support the "${provider}" provider yet.`);
}

function rayAiAttachPanel(panel) {
  const messages = panel.querySelector("[data-ray-ai-messages]");
  const prompts = panel.querySelector("[data-ray-ai-prompts]");
  const form = panel.querySelector("[data-ray-ai-form]");
  const input = panel.querySelector("[data-ray-ai-input]");

  if (!messages || !prompts || !form || !input) return;

  const history = [];
  const actions = panel.querySelector("[data-ray-ai-actions]");
  const clearButton = panel.querySelector("[data-ray-ai-clear]");
  const copyButton = panel.querySelector("[data-ray-ai-copy]");
  const shareButton = panel.querySelector("[data-ray-ai-share]");
  const voiceButton = panel.querySelector("[data-ray-ai-voice]");
  const count = panel.querySelector("[data-ray-ai-count]");
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  const updatePremiumControls = () => {
    const hasHistory = history.length > 0;
    actions?.classList.toggle("is-active", hasHistory);
    if (copyButton) copyButton.disabled = !hasHistory || !rayAiSupportsClipboard();
    if (shareButton) shareButton.disabled = !hasHistory || !rayAiSupportsShare();
    if (clearButton) clearButton.disabled = !hasHistory;
  };

  const updateCount = () => {
    if (!count) return;
    count.textContent = `${input.value.length}/500`;
  };

  input.setAttribute("maxlength", "500");
  input.addEventListener("input", updateCount);
  updateCount();
  updatePremiumControls();

  if (voiceButton && speechRecognition) {
    recognition = new speechRecognition();
    recognition.lang = "en-ZA";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("start", () => {
      voiceButton.classList.add("is-listening");
      voiceButton.setAttribute("aria-label", "Listening");
      rayAiSetStatus(panel, "Listening...");
    });

    recognition.addEventListener("result", (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      input.value = transcript.trim();
      updateCount();
      rayAiSetStatus(panel, transcript ? "Voice captured. Tap send when ready." : "No speech captured.");
    });

    recognition.addEventListener("end", () => {
      voiceButton.classList.remove("is-listening");
      voiceButton.setAttribute("aria-label", "Voice prompt");
    });

    recognition.addEventListener("error", () => {
      voiceButton.classList.remove("is-listening");
      rayAiSetStatus(panel, "Voice input is not available right now.");
    });

    voiceButton.addEventListener("click", () => {
      try {
        recognition.start();
      } catch (error) {
        rayAiSetStatus(panel, "Voice input is already listening.");
      }
    });
  } else if (voiceButton) {
    voiceButton.disabled = true;
    voiceButton.title = "Voice input is not supported in this browser";
  }

  clearButton?.addEventListener("click", () => {
    history.length = 0;
    messages.innerHTML = "";
    prompts.classList.remove("is-hidden");
    rayAiSetStatus(panel, "Chat cleared.");
    updatePremiumControls();
  });

  copyButton?.addEventListener("click", async () => {
    const copied = await rayAiCopyText(rayAiHistoryText(history)).catch(() => false);
    rayAiSetStatus(panel, copied ? "Transcript copied." : "Copy is not available in this browser.");
  });

  shareButton?.addEventListener("click", async () => {
    const text = rayAiHistoryText(history);
    if (!text || !rayAiSupportsShare()) return;
    await navigator.share({ title: "Ray AI chat", text }).catch(() => {});
  });

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
    updateCount();

    const loader = rayAiAddLoader(messages);
    form.classList.add("is-loading");
    rayAiSetStatus(panel, "Ray AI is thinking...");

    try {
      const answer = await rayAiGenerate(question, history);
      loader.remove();

      const answerMessage = rayAiAddMessage(messages, "assistant", rayAiFormatResponse(answer));

      const copyAnswer = document.createElement("button");
      copyAnswer.type = "button";
      copyAnswer.className = "ray-ai-message-action";
      copyAnswer.textContent = "Copy";

      copyAnswer.addEventListener("click", async () => {
        const copied = await rayAiCopyText(answer).catch(() => false);
        copyAnswer.textContent = copied ? "Copied" : "Copy";
        rayAiSetStatus(panel, copied ? "Answer copied." : "Copy is not available in this browser.");
      });

      answerMessage.appendChild(copyAnswer);

      history.push(
        { role: "user", parts: [{ text: question }] },
        { role: "model", parts: [{ text: answer }] }
      );

      rayAiSetStatus(panel, "Ready.");
    } catch (error) {
      loader.remove();

      const fallback = rayAiLocalFallback(question);
      console.warn("Ray AI live provider failed:", error);

      rayAiAddMessage(messages, "assistant", rayAiFormatResponse(fallback));

      history.push(
        { role: "user", parts: [{ text: question }] },
        { role: "model", parts: [{ text: fallback }] }
      );

      rayAiSetStatus(panel, "Answered from portfolio fallback.");
    } finally {
      form.classList.remove("is-loading");
      updatePremiumControls();
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
          <span>Cloudflare proxy assistant</span>
        </div>
        <button class="ray-ai-close" type="button" aria-label="Close Ray AI"><i class="bx bx-x"></i></button>
      </div>
      <div class="ray-ai-greeting">
        <p><span>Hello, Dev</span></p>
        <p>How can I help you today?</p>
      </div>
      <div class="ray-ai-actions" data-ray-ai-actions>
        <button type="button" data-ray-ai-clear disabled><i class="bx bx-trash"></i><span>Clear</span></button>
        <button type="button" data-ray-ai-copy disabled><i class="bx bx-copy"></i><span>Copy</span></button>
        <button type="button" data-ray-ai-share disabled><i class="bx bx-share-alt"></i><span>Share</span></button>
      </div>
      <div class="ray-ai-messages" data-ray-ai-messages aria-live="polite"></div>
      <div class="ray-ai-prompts" data-ray-ai-prompts></div>
      <form class="ray-ai-form" data-ray-ai-form>
        <label class="sr-only" for="ray-ai-dock-input">Ask Ray AI</label>
        <input id="ray-ai-dock-input" data-ray-ai-input type="text" placeholder="Enter a prompt here" autocomplete="off" />
        <span class="ray-ai-count" data-ray-ai-count>0/500</span>
        <button class="ray-ai-voice" type="button" data-ray-ai-voice aria-label="Voice prompt"><i class="bx bx-microphone"></i></button>
        <button type="submit" aria-label="Ask Ray AI"><i class="bx bx-send"></i></button>
      </form>
      <p class="ray-ai-status" data-ray-ai-status aria-live="polite">Tap the prompt field to type.</p>
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
    if (open) rayAiSetStatus(dock, "Tap the prompt field to type.");
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
