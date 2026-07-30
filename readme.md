# Talent Simamkele Nocuze — Portfolio Website

A clean, responsive, single-page portfolio built with plain HTML, CSS, and
JavaScript (no build tools or frameworks required). Content is pulled
directly from the uploaded CV and certificates: About, Experience,
Education, Certifications, Skills, and Projects.

## Features

- **Light / dark mode toggle** (sun/moon icon in the nav). Dark mode is the
  original design palette (black/navy backgrounds, white headings, `#97ae8c`
  sage-green text). Light mode swaps to white/black backgrounds while
  keeping sage green as the accent color, for a professional look in either
  setting.
- **Talent AI Assistant** — a floating chatbot (bottom-right) that answers
  visitor questions about skills, projects, education, certifications, and
  contact info, and can jump visitors straight to the relevant section. It's
  a lightweight, fully client-side keyword-matching assistant — no API key,
  backend, or external service required, so it works the moment the site is
  deployed.
- **7 verified certifications** from IBM, DeepLearning.AI, Google Cloud,
  AWS, and Stanford Online (via Coursera), each linking to its live
  verification page.
- Terminal-style animated hero, scroll-reveal animations, and a status pill
  signaling availability for opportunities.

## File structure

```
.
├── index.html      # Page structure and content
├── styles.css      # Styling, theming system, chatbot UI
├── script.js       # Nav toggle, theming, typing effect, Talent AI Assistant
└── README.md        # This file
```



## Notes

- The site is fully static, so it also deploys as-is to GitHub Pages,
  Vercel, or Cloudflare Pages if you'd prefer an alternative host.
- Fonts (`JetBrains Mono`, `Inter`) load from Google Fonts via CDN — no
  local font files needed.
- Colors: dark mode is the original palette (black/dark-navy backgrounds,
  white headings, `#97ae8c` sage-green body text). Light mode is defined
  right below it in `styles.css` under `html[data-theme="light"] { ... }`.
  Adjust either block to tweak the theme.
- The theme choice currently resets to dark on page reload (by design, to
  keep the file safe to preview anywhere). If you'd like it to remember the
  visitor's choice after deploying, open `script.js`, find the `Theme
  toggle` section, and swap the in-memory `currentTheme` variable for
  `localStorage.getItem('theme')` / `localStorage.setItem('theme', ...)`.
- **Talent AI Assistant**: its answers live in the `intents` array inside
  `script.js` (search for `Talent AI Assistant chatbot`). Add, remove, or
  edit entries there — each has `keywords` to match and a `reply` (HTML
  allowed) — to keep it in sync as you update your CV content.
