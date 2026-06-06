# Yayavar — Explore India

A cinematic parallax travel website for India's most sacred destinations, built with vanilla HTML, CSS, and JavaScript. Features scroll-driven animations, mouse-parallax layers, custom cursor, animated counters, and a fully responsive layout.

---

## Preview

> **Hero** → multi-layer parallax (background / figure / rocks) with scroll + mouse movement  
> **Destinations** → hover-reveal cards with zoom and saffron overlay  
> **About** → animated stat counters and fade-in text on scroll  

---

## Folder Structure

```
yayavar/
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
| Styling | CSS3 (custom properties, grid, flexbox) |
| Animation | GSAP 3.12 + ScrollTrigger |
| Fonts | Google Fonts — Cormorant Garamond + DM Sans |
| No build step | Runs directly in the browser |

---

## Features

- **Multi-layer parallax hero** — rock, figure, and background layers animate independently on scroll and mouse movement
- **GSAP ScrollTrigger** — modern replacement for the deprecated ScrollMagic library
- **Custom cursor** — dot + ring follower with scale effect on interactive elements
- **Sticky frosted-glass nav** — transparent on load, blurred backdrop on scroll
- **Mobile hamburger menu** — full-screen overlay with animated open/close
- **Destination cards** — hover zoom, overlay reveal, lift on hover
- **Animated counters** — numbers count up with cubic easing when scrolled into view
- **IntersectionObserver fade-ins** — staggered reveal for text and stat blocks
- **Responsive grid** — cards and layout adapt from desktop to mobile
- **Design system** — CSS custom properties for colour, spacing, and typography

---

## Getting Started

No dependencies to install. Just open the folder and run.

**Option 1 — Direct open**
```
Double-click index.html
```

**Option 2 — Local dev server (recommended for smooth scroll behaviour)**
```bash
# Using VS Code Live Server extension
Right-click index.html → Open with Live Server

# Or using Python
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Customisation

### Colours
All colours are defined as CSS variables at the top of `style.css`:

```css
:root {
  --ink:       #0e0d0b;   /* page background   */
  --parchment: #f5f0e8;   /* primary text       */
  --saffron:   #e8872a;   /* accent / highlight */
  --moss:      #3a4a35;   /* secondary accent   */
  --mist:      #c8c2b8;   /* muted text         */
  --card-bg:   #1a1915;   /* card background    */
}
```

### Adding a Destination Card
Copy a `.card` block in `index.html` and update the image `src`, city name, country, and description. Remove the `card--locked` class to make it interactive.

### Parallax Speed
Each hero image has a `data-speed` attribute. Higher values = more movement:

```html
<img class="layer rock" data-speed="0.7" ...>
```

### Counter Targets
Update the `data-target` attribute on any `.stat-num` element:

```html
<span class="stat-num" data-target="48">0</span>
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

- Hero images — [ibb.co](https://ibb.co) placeholders (replace with licensed photography)
- Destination images — Haridwar & Rishikesh via ibb.co
- Fonts — [Google Fonts](https://fonts.google.com)
- Animation — [GSAP by GreenSock](https://gsap.com)

---

## License

MIT — free to use, modify, and distribute.