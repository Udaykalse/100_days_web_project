const ASCII = `
 ██████╗ ████████╗ █████╗  ██████╗  ██████╗  █████╗ ██████╗ ████████╗
 ██╔══██╗╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝
 ██║  ██║   ██║   ███████║██║  ███╗██║  ███╗███████║██████╔╝   ██║   
 ██║  ██║   ██║   ██╔══██║██║   ██║██║   ██║██╔══██║██╔══██╗   ██║   
 ██████╔╝   ██║   ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║   ██║   
 ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  
`.trim();

document.getElementById("asciiArt").textContent = ASCII;

function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("terminalTime").textContent = `${h}:${m}:${s}`;
}
updateTime();
setInterval(updateTime, 1000);

const startTime = Date.now();
function updateUptime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  document.getElementById("uptime").textContent = m > 0 ? `${m}m ${s}s` : `${s}s`;
}
setInterval(updateUptime, 1000);

function typeText(el, text, speed = 40) {
  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

const typedCmd = document.getElementById("typedCmd");
const miniTyped = document.getElementById("miniTyped");

setTimeout(() => {
  typeText(typedCmd, "whoami --verbose", 55);
}, 1400);

const windows = {};

const winConfigs = {
  about: {
    title: "about.txt",
    contentId: "about-content",
    cmd: "cat about.txt",
    width: "420px",
    height: "380px",
    x: 60,
    y: 60,
  },
  contact: {
    title: "contact.txt",
    contentId: "contact-content",
    cmd: "cat contact.txt",
    width: "380px",
    height: "340px",
    x: 120,
    y: 100,
  },
  projects: {
    title: "projects/",
    contentId: "projects-content",
    cmd: "ls projects/",
    width: "440px",
    height: "420px",
    x: 160,
    y: 80,
  },
};

async function openWindow(id) {
  const cfg = winConfigs[id];
  if (!cfg) return;

  await typeText(miniTyped, cfg.cmd, 35);

  if (windows[id] && !windows[id].closed) {
    windows[id].focus();
    return;
  }

  const content = document.getElementById(cfg.contentId);

  windows[id] = new WinBox({
    title: cfg.title,
    width: cfg.width,
    height: cfg.height,
    x: cfg.x,
    y: cfg.y,
    mount: content,
    class: ["no-full"],
    onfocus: function () {
      this.setBackground("var(--green-dim)");
    },
    onblur: function () {
      this.setBackground("#1e2e1e");
    },
    onclose: function () {
      windows[id] = null;
      miniTyped.textContent = "";
      return false;
    },
  });
}

document.getElementById("about").addEventListener("click", () => openWindow("about"));
document.getElementById("contact").addEventListener("click", () => openWindow("contact"));
document.getElementById("projects").addEventListener("click", () => openWindow("projects"));

document.querySelectorAll(".cmd-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    typeText(miniTyped, btn.dataset.cmd, 30);
  });
  btn.addEventListener("mouseleave", () => {
    miniTyped.textContent = "";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "1") openWindow("about");
  if (e.key === "2") openWindow("contact");
  if (e.key === "3") openWindow("projects");
});