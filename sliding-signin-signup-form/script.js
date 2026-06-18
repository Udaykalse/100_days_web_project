const container = document.getElementById("container");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const signUpSection = document.querySelector(".sign-up-container");
const signInSection = document.querySelector(".sign-in-container");
const themeToggle = document.getElementById("themeToggle");
const toastContainer = document.getElementById("toastContainer");

function showPanel(panel) {
  const showingSignUp = panel === "signUp";
  container.classList.toggle("right-panel-active", showingSignUp);
  signUpSection.setAttribute("aria-hidden", String(!showingSignUp));
  signInSection.setAttribute("aria-hidden", String(showingSignUp));
  signUpSection.inert = !showingSignUp;
  signInSection.inert = showingSignUp;
}

signUpButton.addEventListener("click", () => showPanel("signUp"));
signInButton.addEventListener("click", () => showPanel("signIn"));

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = themeToggle.querySelector("i");
  const isDark = theme === "dark";
  icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) {
    applyTheme(stored);
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, 3800);
}

function setFieldError(input, message) {
  const errorEl = document.getElementById(`${input.id}Error`);
  if (errorEl) {
    errorEl.textContent = message || "";
  }
  input.classList.toggle("invalid", Boolean(message));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

document.querySelectorAll(".toggle-visibility").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    const willShow = target.type === "password";
    target.type = willShow ? "text" : "password";
    button.querySelector("i").className = willShow
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
    button.setAttribute(
      "aria-label",
      willShow ? "Hide password" : "Show password",
    );
  });
});

function getPasswordStrength(value) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

const strengthMeter = document.getElementById("strengthMeter");
const strengthLabel = document.getElementById("strengthLabel");
const strengthBars = strengthMeter
  ? Array.from(strengthMeter.querySelectorAll("span"))
  : [];
const strengthLabels = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
const strengthColors = [
  "var(--danger)",
  "var(--danger)",
  "var(--warning)",
  "var(--success)",
  "var(--success)",
];

function renderStrength(value) {
  const score = getPasswordStrength(value);
  strengthBars.forEach((bar, index) => {
    bar.style.background =
      index < score ? strengthColors[score] : "var(--border)";
  });
  strengthLabel.textContent = value.length ? strengthLabels[score] : "";
  return score;
}

const suPassword = document.getElementById("suPassword");
if (suPassword) {
  suPassword.addEventListener("input", () => renderStrength(suPassword.value));
}

function setLoading(button, isLoading) {
  button.classList.toggle("loading", isLoading);
  button.disabled = isLoading;
}

const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("suName");
  const email = document.getElementById("suEmail");
  const password = document.getElementById("suPassword");
  const confirm = document.getElementById("suConfirm");
  const terms = document.getElementById("suTerms");

  let valid = true;

  if (!name.value.trim()) {
    setFieldError(name, "Enter your full name");
    valid = false;
  } else {
    setFieldError(name, "");
  }

  if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid email address");
    valid = false;
  } else {
    setFieldError(email, "");
  }

  if (password.value.length < 8) {
    setFieldError(password, "Use at least 8 characters");
    valid = false;
  } else {
    setFieldError(password, "");
  }

  if (confirm.value !== password.value || !confirm.value) {
    setFieldError(confirm, "Passwords do not match");
    valid = false;
  } else {
    setFieldError(confirm, "");
  }

  const termsError = document.getElementById("suTermsError");
  if (!terms.checked) {
    termsError.textContent = "You must accept the terms to continue";
    valid = false;
  } else {
    termsError.textContent = "";
  }

  if (!valid) return;

  const submitBtn = signUpForm.querySelector(".submit-btn");
  setLoading(submitBtn, true);

  setTimeout(() => {
    setLoading(submitBtn, false);
    showToast(
      `Welcome, ${name.value.trim().split(" ")[0]}! Your account is ready.`,
      "success",
    );
    signUpForm.reset();
    renderStrength("");
    showPanel("signIn");
  }, 1100);
});

const signInForm = document.getElementById("signInForm");
const siEmail = document.getElementById("siEmail");
const siRemember = document.getElementById("siRemember");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("siEmail");
  const password = document.getElementById("siPassword");

  let valid = true;

  if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid email address");
    valid = false;
  } else {
    setFieldError(email, "");
  }

  if (!password.value) {
    setFieldError(password, "Enter your password");
    valid = false;
  } else {
    setFieldError(password, "");
  }

  if (!valid) return;

  const submitBtn = signInForm.querySelector(".submit-btn");
  setLoading(submitBtn, true);

  setTimeout(() => {
    setLoading(submitBtn, false);
    if (siRemember.checked) {
      localStorage.setItem("rememberedEmail", email.value.trim());
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    showToast("Signed in successfully. Good to see you!", "success");
  }, 1100);
});

function prefillRememberedEmail() {
  const remembered = localStorage.getItem("rememberedEmail");
  if (remembered) {
    siEmail.value = remembered;
    siRemember.checked = true;
  }
}

initTheme();
prefillRememberedEmail();
