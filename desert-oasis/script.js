(() => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = duration / target;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / 60);
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, step);
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll(".stat-num")
    .forEach((el) => statsObserver.observe(el));

  const filterBtns = document.querySelectorAll(".filter-btn");
  const retreatCards = document.querySelectorAll(".cards .card[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      retreatCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !matches);

        if (matches) {
          card.style.animation = "none";
          card.offsetHeight;
          card.style.animation = "fadeUp 0.4s ease forwards";
        }
      });
    });
  });

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".card:not(.featured-card)").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    scrollObserver.observe(card);
  });

  const header = document.querySelector(".site-header");
  window.addEventListener(
    "scroll",
    () => {
      header.style.background =
        window.scrollY > 40 ? "rgba(13, 11, 6, 0.92)" : "rgba(13, 11, 6, 0.7)";
    },
    { passive: true },
  );
})();
