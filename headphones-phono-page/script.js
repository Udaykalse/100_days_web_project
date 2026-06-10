const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const backToTop = document.getElementById("backToTop");
const cursorGlow = document.getElementById("cursorGlow");
const emailInput = document.getElementById("emailInput");
const submitBtn = document.getElementById("submitBtn");
const formFeedback = document.getElementById("formFeedback");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + "s";
  revealObserver.observe(el);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

submitBtn.addEventListener("click", () => {
  const val = emailInput.value.trim();
  formFeedback.className = "form-feedback";

  if (!val) {
    formFeedback.textContent = "Please enter your email address.";
    formFeedback.classList.add("error");
    emailInput.focus();
    return;
  }

  if (!isValidEmail(val)) {
    formFeedback.textContent = "That doesn't look like a valid email.";
    formFeedback.classList.add("error");
    emailInput.focus();
    return;
  }

  submitBtn.innerHTML = '<i class="fas fa-check"></i>';
  submitBtn.style.background = "#22c55e";
  emailInput.value = "";
  formFeedback.textContent = "You're on the list. We'll be in touch.";

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    submitBtn.style.background = "";
    formFeedback.textContent = "";
  }, 4000);
});

emailInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitBtn.click();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  });
});