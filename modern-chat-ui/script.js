const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatBody = document.getElementById("chatBody");
const typing = document.getElementById("typing");
const themeToggle = document.getElementById("themeToggle");

const starterMessages = [
  {
    text: "Hello, I've found your friend's phone.",
    type: "received"
  },
  {
    text: "Which friend are you talking about? 🙂",
    type: "sent"
  },
  {
    text: "The one whose name is at the top of your screen.",
    type: "received"
  }
];

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function createMessage(text, type) {
  const li = document.createElement("li");
  li.className = `message ${type}`;

  li.innerHTML = `
    ${text}
    <span class="time">${getTime()}</span>
  `;

  chatList.appendChild(li);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function saveMessages() {
  localStorage.setItem(
    "chatMessages",
    chatList.innerHTML
  );
}

function loadMessages() {
  const saved = localStorage.getItem("chatMessages");

  if (saved) {
    chatList.innerHTML = saved;
  } else {
    starterMessages.forEach(msg =>
      createMessage(msg.text, msg.type)
    );
    saveMessages();
  }
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  const text = messageInput.value.trim();

  if (!text) return;

  createMessage(text, "sent");
  saveMessages();

  messageInput.value = "";

  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";

    createMessage(
      "Thanks! I'll get back to you shortly.",
      "received"
    );

    saveMessages();
  }, 1500);
});

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");

  themeToggle.textContent =
    document.documentElement.classList.contains("light")
      ? "☀️"
      : "🌙";
});

loadMessages();