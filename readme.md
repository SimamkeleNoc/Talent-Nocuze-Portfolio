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

## 1. Before you deploy — personalize it

Open `index.html` and update:

- **Email**: search for `your.email@example.com` (in the Contact section)
  and replace it with your real email address.
- **GitHub / LinkedIn links**: already set to
  `github.com/SimamkeleNoc` and your LinkedIn profile — double check they're
  correct.
- **References**: the CV lists two references available "on request." Add a
  references section or a downloadable CV link if you'd like recruiters to
  access this directly.
- Optional: add a real headshot/photo, a downloadable PDF of your CV, and
  live demo links for each project once they're hosted.

## 2. Run it locally

No build step needed. Either:

- Double-click `index.html` to open it in your browser, **or**
- Serve it locally (recommended, avoids any file:// quirks):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000

# or, with Node installed
npx serve .
```

## 3. Initialize Git and push to a new GitHub repository

```bash
# From inside the project folder
git init
git add .
git commit -m "Initial commit: personal portfolio site"

# Create the repo on GitHub first (via github.com or GitHub CLI), then:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

**Using GitHub CLI instead** (creates the repo for you):

```bash
gh repo create <your-repo-name> --public --source=. --remote=origin --push
```

## 4. Deploy to Netlify

### Option A — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init          # follow the prompts to link/create a site
netlify deploy --prod --dir=.
```

### Option B — Drag-and-drop (no CLI, fastest)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole project folder (containing `index.html`, `styles.css`,
   `script.js`) onto the page
3. Netlify instantly deploys and gives you a live URL
   (e.g. `https://your-site-name.netlify.app`)
4. Optional: in **Site settings → Change site name** to pick a custom
   subdomain, or connect a custom domain under **Domain management**

### Option C — Netlify + GitHub (auto-deploys on every push)

1. Push the repo to GitHub (see step 3 above)
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Select your repository
4. Build command: leave blank · Publish directory: `.`
5. Click **Deploy site** — future `git push` commits auto-deploy

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
