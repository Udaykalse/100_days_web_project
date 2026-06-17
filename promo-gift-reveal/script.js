const gift = document.getElementById("gift");
const reveal = document.getElementById("reveal");
const hint = document.getElementById("hint");
const copyBtn = document.getElementById("copyBtn");
const expiryEl = document.getElementById("expiry");
const announce = document.getElementById("announce");
const revealCode = document.getElementById("revealCode");
const revealDiscount = document.getElementById("revealDiscount");

const code = gift.dataset.code || "SAVE10";
const discount = gift.dataset.discount || "10% off your order";
const expiryHours = Number(gift.dataset.expiryHours) || 24;
const expiryTarget = Date.now() + expiryHours * 60 * 60 * 1000;

revealCode.textContent = code;
revealDiscount.textContent = discount;

const confettiPalette = ["#D6483F", "#E8B86D", "#F8EFE0", "#4CC38A", "#2EC4B6"];
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function burst(originY) {
  if (reducedMotion || typeof confetti !== "function") return;
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 35,
    origin: { y: originY },
    colors: confettiPalette,
  });
}

let isOpen = false;

function openGift() {
  if (isOpen) return;
  isOpen = true;
  gift.classList.add("is-open", "has-opened");
  gift.setAttribute("aria-pressed", "true");
  copyBtn.tabIndex = 0;
  hint.textContent = "Click again to wrap it back up";
  burst(0.45);
  announce.textContent = `Promo code revealed: ${code}. ${discount}.`;
}

function closeGift() {
  if (!isOpen) return;
  isOpen = false;
  gift.classList.remove("is-open");
  gift.setAttribute("aria-pressed", "false");
  copyBtn.tabIndex = -1;
  hint.textContent = "Tap or click the gift to open it";
}

function toggleGift() {
  isOpen ? closeGift() : openGift();
}

gift.addEventListener("click", toggleGift);
gift.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleGift();
  }
});

async function copyCode() {
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const tempInput = document.createElement("textarea");
    tempInput.value = code;
    tempInput.style.position = "fixed";
    tempInput.style.opacity = "0";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
  copyBtn.textContent = "Copied!";
  copyBtn.classList.add("is-copied");
  announce.textContent = `Code ${code} copied to clipboard.`;
  burst(0.3);
  setTimeout(() => {
    copyBtn.textContent = "Copy code";
    copyBtn.classList.remove("is-copied");
  }, 1800);
}

copyBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  copyCode();
});

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

let countdownTimer;

function tickCountdown() {
  const remaining = expiryTarget - Date.now();
  if (remaining <= 0) {
    expiryEl.textContent = "This code has expired";
    clearInterval(countdownTimer);
    return;
  }
  expiryEl.textContent = `Expires in ${formatTime(remaining)}`;
}

tickCountdown();
countdownTimer = setInterval(tickCountdown, 1000);
