# 🟢 Hulu Clone

A polished, modern Hulu landing page clone built with pure HTML, CSS, and vanilla JavaScript. Features a dark editorial aesthetic, cinematic animations, custom cursor, and a fully responsive layout — no frameworks, no dependencies, ready to run in any browser.

---

## 📁 Project Structure

```
hulu-clone/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

---

## 🚀 Getting Started

No build tools or installs needed.

1. Clone or download the repository
2. Open `index.html` in your browser

```bash
git clone https://github.com/your-username/hulu-clone.git
cd hulu-clone
open index.html
```

Or serve it locally with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## ✨ Features

| Feature | Description |
|---|---|
| Custom Cursor | Green dot + trailing ring cursor; scales on interactive elements |
| Sticky Navbar | Transparent on load, frosted-glass blur effect on scroll |
| Mobile Menu | Animated hamburger → X toggle with full dropdown navigation |
| Hero Section | Full-viewport header with cinematic gradient overlay and scroll hint |
| Scroll Reveal | Sections animate into view via IntersectionObserver |
| Categories | 4 cover cards with lift-on-hover, shadow, and reveal CTAs |
| Live TV Section | Green-bordered feature block with radial glow background |
| Live Sports | Full-bleed background section with sport league logos |
| Pricing Plans | 3-tier plan cards with highlighted tier, features list, and CTAs |
| Login Modal | Dark-themed dialog with password toggle, email validation, loading state |
| Toast Notifications | Pill-shaped animated toasts for validation and success feedback |
| Responsive Design | Fully adapted for mobile, tablet, and desktop breakpoints |

---

## 🎨 Design System

**Fonts**
- Display: [Syne](https://fonts.google.com/specimen/Syne) — headings, labels, buttons
- Body: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — paragraphs, UI text

**Color Tokens**

```css
--green:       #1ce783   /* Primary accent */
--green-dark:  #00b360   /* Hover state */
--black:       #050505   /* Page background */
--dark:        #0d0d0d   /* Section background */
--dark-2:      #151516   /* Card background */
--gray:        #8a8a8e   /* Muted text */
--gray-light:  #c5c5c8   /* Secondary text */
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1200px` | Full 4-column covers, 3-column plans |
| `≤ 1200px` | 2-column covers, 2-column plans |
| `≤ 960px` | Mobile nav, single-column plans, stacked sub-header |
| `≤ 640px` | Single-column covers, compact hero, simplified footer |

---

## 🛠️ Built With

- **HTML5** — semantic markup, ARIA roles and labels for accessibility
- **CSS3** — custom properties, grid, flexbox, keyframe animations, backdrop-filter
- **Vanilla JavaScript** — IntersectionObserver, requestAnimationFrame, DOM API

---

## 📌 Credits

- Original project concept by [Brad Traversy](https://github.com/bradtraversy/hulu-webpage-clone)
- Images and logos sourced from the original Traversy Media repository
- Redesigned and extended with modern UI/UX patterns

---

## 📄 License

This project is for educational purposes only. Hulu, Disney+, ESPN+, and all associated trademarks belong to their respective owners.