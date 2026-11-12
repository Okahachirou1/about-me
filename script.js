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