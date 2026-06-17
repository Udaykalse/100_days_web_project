# Promo Gift Reveal

An interactive gift box that pops open, bursts into confetti, and reveals a discount code — built as a drop-in promo widget for landing pages and checkout flows.

## Folder structure

```
promo-gift-reveal/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Running it

No build step required. Open `index.html` directly in a browser, or serve the folder with any static server, for example:

```
npx serve promo-gift-reveal
```

## Customization

The code, discount text, and expiry window are set as data attributes on the `.gift` element in `index.html`, so you can reuse this widget for any promo without touching the JavaScript:

```html
<div
  class="gift"
  data-code="ILOVEYOU"
  data-discount="20% off your order"
  data-expiry-hours="24"
></div>
```

- `data-code` — the promo code shown and copied to the clipboard
- `data-discount` — the line of text shown under the code
- `data-expiry-hours` — how many hours the live countdown runs for

Colors and sizing live as CSS variables at the top of `style.css` (`--box-red`, `--gold`, `--cream`, `--gift-w`, `--box-h`, etc.) for quick re-theming.

## Features added in this revision

- Click and tap both open the box, with a matching close-to-rewrap interaction, instead of relying on hover alone.
- Full keyboard support (`Tab` to focus, `Enter`/`Space` to open) and an `aria-live` announcement when the code is revealed.
- One-click copy-to-clipboard button with a "Copied!" confirmation state and a clipboard fallback for older browsers.
- A live countdown showing how long the code is valid for, configurable via `data-expiry-hours`.
- A gentle idle animation invites the first interaction, then stops automatically once the box has been opened.
- Configurable code, discount text, and expiry purely through HTML data attributes — no JavaScript edits needed.
- Fully responsive sizing with `clamp()`, and `prefers-reduced-motion` support that disables animation and transitions for users who request it.

## Credits

- [canvas-confetti](https://github.com/catdad/canvas-confetti) for the confetti burst
- [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
