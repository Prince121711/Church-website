# Elshaddai Ministries — React Website

A React + Three.js rebuild of the church site: a rotating 3D cross with radiating light in the
hero, scroll-triggered reveal animations throughout, hover/transition micro-interactions, a
scroll-progress bar, and a "back to top" button.

## Project structure

```
church-site/
├── dist/               ← pre-built, ready-to-host site (use this to deploy as-is)
├── public/assets/       ← logo.jpg
├── src/
│   ├── components/      ← one file per section (Hero, About, Services, Sermons, Events, ...)
│   ├── hooks/useReveal.js
│   ├── App.jsx / App.css
│   └── index.css        ← design tokens (colors, fonts) live here
└── vite.config.js
```

## Editing the site (recommended)

You'll need [Node.js](https://nodejs.org) installed (v18+).

```bash
cd church-site
npm install
npm run dev
```

This opens a local dev server (usually `http://localhost:5173`) with hot-reload — edit any file
in `src/` and see changes instantly.

All placeholder content (service times, address, sermon titles, event dates, phone/email, UPI
ID) lives directly in the relevant component file in `src/components/`, as plain text — easy to
find and replace.

Colors and fonts are defined once as CSS variables in `src/index.css` (`--sacred-red`, `--gold`,
etc.) — change them there and they update everywhere.

## Building for deployment

```bash
npm run build
```

This regenerates the `dist/` folder — a plain HTML/CSS/JS bundle you can upload anywhere
(GitHub Pages, Netlify, Vercel, any static host). No Node or React knowledge needed to host it,
only to edit the source.

## Deploying `dist/` to GitHub Pages

1. Create a new GitHub repository.
2. Copy everything **inside** the `dist/` folder (not the whole project) into that repo.
3. In **Settings → Pages**, set Source to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Your site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## Notes

- The 3D hero uses raw **Three.js** (not a heavier wrapper library), so it's a single dependency.
- Respects `prefers-reduced-motion` — animations are disabled for users who've turned that on.
- No backend: the contact form currently just shows a "message sent" confirmation locally. Wire
  it up to a service like Formspree, EmailJS, or your own backend when you're ready to receive
  real submissions.
