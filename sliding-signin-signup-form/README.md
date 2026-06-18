# Auth Sliding Form

A sliding sign-in / sign-up panel with live validation, password strength feedback, light & dark themes, and a ticket-stub seam as its visual signature.

## Folder structure

```
auth-sliding-form/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run it

No build step needed. Open `index.html` directly in a browser, or serve the folder with any static server, for example:

```
npx serve auth-sliding-form
```

## Features

- Sliding panel transition between Sign In and Sign Up, rebuilt with proper `aria-hidden` state so screen readers track which form is active
- Light and dark theme toggle, saved to `localStorage` and defaulting to the visitor's OS preference on first visit
- Live client-side validation for name, email, password, and confirm-password fields, with inline error messages instead of browser pop-ups
- Password visibility toggle and a 4-step strength meter that reacts as the user types
- "Remember me" on sign-in, which stores the email locally and prefills it on return visits
- Required terms acceptance checkbox on sign-up with its own validation message
- Toast notifications confirming a successful sign-in or account creation, including a loading spinner on the submit button while the request is "in flight"
- Fully responsive layout: stacked panels on mobile, side-by-side sliding panels from tablet width up
- Accessibility passes: visible focus rings, `sr-only` labels on every input, `role="alert"` on error messages, and `prefers-reduced-motion` support
- A dashed "ticket seam" with punch-hole notches at the panel boundary, tying the sliding mechanic to the "start your journey" copy

## Notes

Form submission is simulated with a short delay and does not call a real backend. Wire the `setTimeout` blocks in `js/script.js` to your actual authentication endpoint when ready.