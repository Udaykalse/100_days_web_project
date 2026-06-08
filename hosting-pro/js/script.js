const themeToggle = document.getElementById("themeToggle");
const topBtn = document.getElementById("topBtn");
const navMenu = document.getElementById("navMenu");
const menuBtn = document.querySelector(".menu-btn");
const range = document.getElementById("range");
const price = document.getElementById("price");
const counters = document.querySelectorAll(".counter");

themeToggle.addEventListener("click", () => {
document.body.classList.toggle("dark");
});

menuBtn.addEventListener("click", () => {
navMenu.classList.toggle("active");
});

window.addEventListener("scroll", () => {
topBtn.style.display =
window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});

range.addEventListener("input", () => {
price.textContent = range.value * 100;
});

document.querySelectorAll(".faq-btn").forEach(btn => {
btn.addEventListener("click", () => {
btn.parentElement.classList.toggle("active");
});
});

const animateCounter = counter => {
const target = +counter.dataset.target;
const update = () => {
const current = +counter.innerText;
const increment = target / 100;

if (current < target) {
counter.innerText =
Math.ceil(current + increment);
requestAnimationFrame(update);
} else {
counter.innerText =
target.toLocaleString();
}
};
update();
};

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
observer.unobserve(entry.target);
}
});
});

counters.forEach(counter => {
observer.observe(counter);
});

document
.getElementById("demoForm")
.addEventListener("submit", e => {

e.preventDefault();

document.getElementById("message").textContent =
"Demo request submitted successfully.";

e.target.reset();
});