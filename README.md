# Portfolio — Vinay Chandra Karthik Uppanapalli

Personal portfolio site for a Full Stack Software Engineer based in Buffalo, NY.

**Live:** https://vckarthik.github.io/MyProfile/

## Stack

Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.
The whole site is three files and loads in a single request each.

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | Styling, light/dark themes, responsive layout, print stylesheet |
| `script.js` | Scroll reveals, sticky nav, scrollspy, theme toggle |

## Features

- Light and dark themes, persisted to `localStorage`, defaulting to the OS preference
- Scroll-triggered reveal animations via `IntersectionObserver`
- Sticky navigation with active-section highlighting
- Responsive down to mobile, with a collapsible menu
- Respects `prefers-reduced-motion`
- Print stylesheet that renders the page as a clean one-page resume

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

Pushes to `main` are published automatically by GitHub Pages.
