const modal = document.getElementById("modal");
const loginBtn = document.getElementById("loginBtn");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const modalClose = document.getElementById("modalClose");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
const togglePass = document.getElementById("togglePass");
const passwordInput = document.getElementById("password");
const loginSubmit = document.getElementById("loginSubmit");
const toast = document.getElementById("toast");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let dotX = 0,
  dotY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";
});

function animateRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverables = "a, button, .cover, .plan-card, .sport-logo-wrap";
document.querySelectorAll(hoverables).forEach((el) => {
  el.addEventListener("mouseenter", () =>
    document.body.classList.add("cursor-hover"),
  );
  el.addEventListener("mouseleave", () =>
    document.body.classList.remove("cursor-hover"),
  );
});

const openModal = () => {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("open");
  document.body.style.overflow = "";
};

loginBtn.addEventListener("click", openModal);
if (mobileLoginBtn)
  mobileLoginBtn.addEventListener("click", () => {
    closeMenu();
    openModal();
  });
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

const openMenu = () => {
  hamburger.classList.add("active");
  mobileMenu.classList.add("open");
};

const closeMenu = () => {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
};

hamburger.addEventListener("click", () => {
  hamburger.classList.contains("active") ? closeMenu() : openMenu();
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

togglePass.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePass.querySelector("svg").style.opacity = isPassword ? "0.5" : "1";
});

let toastTimeout;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
};

loginSubmit.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showToast("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address.");
    return;
  }

  loginSubmit.textContent = "Logging In...";
  loginSubmit.disabled = true;

  setTimeout(() => {
    loginSubmit.textContent = "Log In";
    loginSubmit.disabled = false;
    showToast("Login successful! Welcome back.");
    closeModal();
  }, 1200);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(
    ".sub-header, .categories, .live, .live-sports, .plans, .cover, .plan-card",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

document.querySelectorAll(".cover").forEach((cover) => {
  cover.addEventListener("mouseenter", () => {
    cover.style.zIndex = "2";
  });
  cover.addEventListener("mouseleave", () => {
    cover.style.zIndex = "1";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
