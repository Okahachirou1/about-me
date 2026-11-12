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

const downloadPdfButton = document.querySelector("#download-pdf");
const pdfExportStatus = document.querySelector("#pdf-export-status");

if (downloadPdfButton && pdfExportStatus) {
  downloadPdfButton.addEventListener("click", async () => {
    if (typeof window.html2pdf !== "function") {
      pdfExportStatus.textContent = "PDF export is unavailable. Check your connection and try again.";
      return;
    }

    const buttonLabel = downloadPdfButton.querySelector(".download-pdf-label");
    downloadPdfButton.disabled = true;
    buttonLabel.textContent = "Preparing PDF…";
    pdfExportStatus.textContent = "Preparing your portfolio PDF…";
    document.body.classList.add("pdf-exporting");

    try {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((image) =>
          image.complete ? Promise.resolve() : new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }),
        ),
      );

      await window.html2pdf()
        .set({
          margin: [10, 10, 12, 10],
          filename: "Vince-Le-Portfolio.pdf",
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 1.5, useCORS: true, backgroundColor: "#090D16", scrollY: 0 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: [".timeline-item", ".work-card", ".skill-group", ".education-entry"] },
        })
        .from(document.body)
        .save();

      pdfExportStatus.textContent = "Your PDF has been downloaded.";
    } catch (error) {
      console.error("PDF export failed", error);
      pdfExportStatus.textContent = "Could not create the PDF. Please try again.";
    } finally {
      document.body.classList.remove("pdf-exporting");
      downloadPdfButton.disabled = false;
      buttonLabel.textContent = "Download PDF";
    }
  });
}