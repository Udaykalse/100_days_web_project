gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  gsap.set(follower, { x: followerX, y: followerY });
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll("a, button, .card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
    follower.style.transform = "translate(-50%, -50%) scale(1.5)";
    follower.style.opacity = "0.3";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    follower.style.transform = "translate(-50%, -50%) scale(1)";
    follower.style.opacity = "1";
  });
});

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

const layers = document.querySelectorAll(".layer");
document.addEventListener("mousemove", (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed);
    gsap.to(layer, {
      x: dx * speed * 18,
      y: dy * speed * 10,
      duration: 0.8,
      ease: "power2.out",
    });
  });
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  })
  .to(".rock", { y: -180, ease: "none" }, 0)
  .to(".girl", { y: -90, ease: "none" }, 0)
  .to(".background", { y: 50, ease: "none" }, 0)
  .to(".main-title", { y: -60, opacity: 0, ease: "none" }, 0)
  .to(".scroll-hint", { opacity: 0, ease: "none" }, 0);

gsap.from(".main-title", {
  opacity: 0,
  y: 30,
  duration: 1.4,
  ease: "power3.out",
  delay: 0.3,
});

gsap.from(".logo, .nav-links a, .hamburger", {
  opacity: 0,
  y: -10,
  duration: 0.8,
  stagger: 0.08,
  ease: "power2.out",
  delay: 0.6,
});

gsap.from(".section-label, .section-title", {
  scrollTrigger: {
    trigger: ".section-label",
    start: "top 85%",
  },
  opacity: 0,
  y: 30,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out",
});

gsap.from(".card", {
  scrollTrigger: {
    trigger: ".content-images",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});

const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
fadeEls.forEach((el) => observer.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  (function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  })(start);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat-num")
  .forEach((el) => statObserver.observe(el));
