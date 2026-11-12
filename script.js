document.querySelector("#current-year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add("is-visible");

        if (element.matches(".bento-card")) {
          const metric = element.querySelector("[data-count]");
          const target = Number(metric.dataset.count);
          const suffix = metric.dataset.suffix || "";
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          const renderValue = (value) => {
            metric.replaceChildren(document.createTextNode(String(value)));
            if (suffix) {
              const suffixElement = document.createElement("span");
              suffixElement.textContent = suffix;
              metric.append(suffixElement);
            }
          };

          if (reducedMotion) {
            renderValue(target);
          } else {
            const startTime = performance.now();
            const duration = 950;
            const animateCount = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              renderValue(Math.round(target * easedProgress));
              if (progress < 1) requestAnimationFrame(animateCount);
            };
            requestAnimationFrame(animateCount);
          }
        }

        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal, .bento-card").forEach((element) => revealObserver.observe(element));

const copyEmailButton = document.querySelector(".copy-email-button");
const copyEmailStatus = document.querySelector("#copy-email-status");

if (copyEmailButton && copyEmailStatus) {
  let copyStatusTimer;

  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.copyEmail;
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      const emailInput = document.createElement("textarea");
      emailInput.value = email;
      emailInput.setAttribute("readonly", "");
      emailInput.style.position = "fixed";
      emailInput.style.opacity = "0";
      document.body.append(emailInput);
      emailInput.select();
      copied = document.execCommand("copy");
      emailInput.remove();
    }

    window.clearTimeout(copyStatusTimer);
    copyEmailStatus.classList.add("is-visible");

    if (copied) {
      copyEmailButton.querySelector(".copy-email-label").textContent = "Copied!";
      copyEmailStatus.textContent = "Copied!";
      copyStatusTimer = window.setTimeout(() => {
        copyEmailButton.querySelector(".copy-email-label").textContent = "Copy Email";
        copyEmailStatus.textContent = "";
        copyEmailStatus.classList.remove("is-visible");
      }, 1800);
    } else {
      copyEmailStatus.textContent = "Copy failed. Please try again.";
    }
  });
}