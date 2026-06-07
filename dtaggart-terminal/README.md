# dtaggart — Terminal Portfolio

A hacker-aesthetic developer portfolio styled as an interactive terminal. Features CRT scanlines, WinBox floating windows, typewriter animations, live clock, and keyboard shortcuts — built with zero frameworks using pure HTML, CSS, and vanilla JavaScript.

---

## Preview

> **Boot sequence** → staggered system-init lines animate on load  
> **Hero** → ASCII name art + live typewriter command effect  
> **Commands** → `./about`, `./contact`, `./projects` open draggable WinBox windows  
> **Footer** → live clock, uptime counter, and process stats  

---

## Folder Structure

```
dtaggart-terminal/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, keyframes) |
| Animation | Vanilla JS + CSS animations |
| Windows | WinBox.js 0.2.0 |
| Fonts | Google Fonts — JetBrains Mono + Fira Code |
| No build step | Runs directly in the browser |

---

## Features

- **CRT scanlines + noise overlay** — fixed pseudo-layers for authentic terminal atmosphere
- **ASCII name banner** — large pixel-font header rendered with Fira Code monospace
- **Boot sequence** — staggered `[OK]` system-init lines animate on page load
- **Typewriter engine** — Promise-based character-by-character typing for commands
- **Live clock** — real-time `HH:MM:SS` display updated every second
- **Uptime counter** — tracks and displays seconds/minutes since page was opened
- **WinBox floating windows** — draggable, resizable terminal windows for About, Contact, Projects
- **Singleton window guard** — re-focuses an open window instead of spawning duplicates
- **Keyboard shortcuts** — press `1`, `2`, `3` to open windows without clicking
- **Command hover preview** — hovering a button types its command into the mini-terminal prompt
- **Link ghost hover** — link text swaps to the platform name on hover via CSS `content` trick
- **Skill tags** — pill badges with green glow on hover
- **Availability pulse** — animated green dot in the Contact window
- **Fully responsive** — stacked layout and scaled ASCII art on mobile

---

## Getting Started

No dependencies to install. All scripts load from CDN.

**Option 1 — Direct open**
```
Double-click index.html
```

**Option 2 — Local dev server (recommended)**
```bash
# VS Code Live Server
Right-click index.html → Open with Live Server

# Python
python -m http.server 8000
# Visit http://localhost:8000

# Node (npx)
npx serve .
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `1` | Open About window |
| `2` | Open Contact window |
| `3` | Open Projects window |

---

## Customisation

### Colours
All colours are defined as CSS variables at the top of `style.css`:

```css
:root {
  --green:     #00ff88;   /* primary accent / glow   */
  --green-dim: #00aa55;   /* buttons, secondary text  */
  --amber:     #ffb347;   /* hostname, language tags  */
  --bg:        #0a0e0a;   /* page background          */
  --bg-panel:  #0d120d;   /* terminal body            */
  --text:      #b8d4b8;   /* body text                */
  --text-dim:  #5a7a5a;   /* muted / secondary text   */
}
```

### Replacing Personal Info
Update the following directly in `index.html`:

- **Name** — edit the `ASCII` string at the top of `script.js`
- **Tagline** — `.tagline` paragraph in `index.html`
- **Skills** — `.skill-tags` span elements
- **Social links** — `<a>` tags inside `.link-list`
- **About / Contact / Projects** — content inside `#about-content`, `#contact-content`, `#projects-content`

### Adding a Project Card
Copy a `.project-item` block inside `#projects-content` and update the name, language, and description:

```html
<li class="project-item">
  <span class="project-name">your-project</span>
  <span class="project-lang">Language</span>
  <p>Short description of what it does.</p>
</li>
```

### Adding a New Window
1. Add a button in `.cmd-nav` with a `data-cmd` attribute
2. Add a hidden content `div` with a unique `id`
3. Register it in the `winConfigs` object in `script.js`:

```javascript
newpage: {
  title: "newpage.txt",
  contentId: "newpage-content",
  cmd: "cat newpage.txt",
  width: "400px",
  height: "360px",
  x: 80,
  y: 80,
}
```

4. Add an event listener:
```javascript
document.getElementById("newpage").addEventListener("click", () => openWindow("newpage"));
```

### Typewriter Speed
Adjust the `speed` parameter (milliseconds per character) in any `typeText()` call inside `script.js`:

```javascript
typeText(typedCmd, "whoami --verbose", 55); // slower
typeText(miniTyped, cfg.cmd, 20);           // faster
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari 14+ | ✅ Full |
| Mobile (iOS / Android) | ✅ Responsive |

---

## Credits

- Floating windows — [WinBox.js by nextapps-de](https://github.com/nextapps-de/winbox)
- Fonts — [Google Fonts](https://fonts.google.com) (JetBrains Mono, Fira Code)

---

## License

MIT — free to use, modify, and distribute.