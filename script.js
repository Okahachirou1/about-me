const experience = [
  {
    date: "2025 — PRESENT",
    company: "IG Tech",
    role: "Senior QA Lead",
    tag: "TEAM LEADERSHIP",
    description:
      "Lead an 8+ member QA team across 10+ connected projects. Set testing strategy, review test assets and defect reports, guide functional and integration testing, and partner with product and engineering to surface release risks early.",
  },
  {
    date: "2024 — 2025",
    company: "Healthcare technology",
    role: "Manual QA Engineer",
    tag: "HEALTHTECH",
    description:
      "Translated requirements into test scenarios, carried out UAT and regression testing, checked UI behavior and backend data, and managed defects through verification and release follow-up.",
  },
  {
    date: "2019 — 2024",
    company: "Earlier QA experience",
    role: "Quality Assurance / Manual Testing",
    tag: "QUALITY DELIVERY",
    description:
      "Built a broad foundation in functional, regression, integration, and system testing, with hands-on API checks, SQL validation, test documentation, and close collaboration with delivery teams.",
  },
  {
    date: "EARLIER EXPERIENCE",
    company: "Operations Leadership",
    role: "Operation Lead",
    tag: "OPERATIONS",
    description:
      "An operations leadership background that complements QA work, connecting delivery priorities with practical team execution.",
  },
];

const projects = [
  {
    title: "End-to-end automation framework",
    description:
      "Built maintainable browser test coverage from the ground up, using page objects and reusable test utilities to support reliable regression and smoke testing.",
    tags: ["Selenium", "Java", "Playwright", "TypeScript"],
  },
  {
    title: "API & delivery pipeline quality",
    description:
      "Connected API validation and automated test runs to the team’s delivery workflow, making feedback more useful before changes reach production.",
    tags: ["REST API", "Postman", "CI/CD", "GitHub Actions"],
  },
  {
    title: "Healthcare platform testing",
    description:
      "Supported UAT and regression for healthcare applications, pairing UI verification with database checks and structured defect follow-through.",
    tags: ["Healthcare", "UAT", "SQL", "Jira"],
  },
];

const skills = [
  { title: "AUTOMATION", items: ["Selenium", "Java", "Playwright", "TypeScript", "TestNG", "Maven"] },
  { title: "API & DATA", items: ["REST API", "Postman", "SQL", "PostgreSQL", "MySQL"] },
  { title: "DELIVERY", items: ["CI/CD", "GitHub Actions", "Jira", "Defect lifecycle"] },
  { title: "QUALITY PRACTICE", items: ["Test strategy", "Functional testing", "Regression", "Integration", "UAT", "Team mentoring"] },
];

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character],
  );

document.querySelector("#experience-list").innerHTML = experience
  .map(
    (item) => `
      <article class="timeline-item reveal">
        <span class="timeline-date">${escapeHtml(item.date)}</span>
        <div>
          <h3 class="timeline-company">${escapeHtml(item.company)}</h3>
          <p class="timeline-role">${escapeHtml(item.role)}</p>
          <p class="timeline-description">${escapeHtml(item.description)}</p>
        </div>
        <span class="timeline-tag">${escapeHtml(item.tag)}</span>
      </article>`,
  )
  .join("");

document.querySelector("#project-list").innerHTML = projects
  .map(
    (project, index) => `
      <article class="work-card reveal">
        <span class="work-number">0${index + 1} / SELECTED WORK</span>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </article>`,
  )
  .join("");

document.querySelector("#skill-list").innerHTML = skills
  .map(
    (group) => `
      <section class="skill-group">
        <h3>${escapeHtml(group.title)}</h3>
        <div class="skill-items">${group.items.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
      </section>`,
  )
  .join("");

document.querySelector("#current-year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));