# Stratum — Analytics Website

A multi-page business analytics website. No installs needed — just open the files in a browser.

---

## How to open it

Double-click any file inside the `html/` folder, or run this in your terminal:

```bash
open html/index.html
```

---

## Folder structure

```
WebsiteFinal/
├── html/        → All the web pages (open these in a browser)
├── css/         → Controls how everything looks (colors, fonts, layout)
├── js/          → Controls how things behave (animations, buttons, forms)
└── README.md    → This file
```

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Home / landing page |
| `login.html` | Log in or create an account |
| `dashboard.html` | The main analytics app with charts and data |
| `about.html` | Company info, team, and timeline |
| `pricing.html` | Pricing plans with a monthly/annual toggle |
| `contact.html` | Contact form and office locations |
| `404.html` | "Page not found" error page |

---

## How it works (simply put)

- **HTML files** = the content (text, buttons, images)
- **`css/main.css`** = the stylesheet — imported by every page. Change a color here and it updates everywhere
- **`js/main.js`** = shared logic — imported by every page. Handles the mobile menu, animated numbers, FAQ open/close, etc.
- **Chart.js** = a free charting library loaded from the internet (used only on the dashboard for bar charts)

> All pages link to each other. If you move a file, update its path references accordingly.

---

## Design

The site uses the **Swiss International Typographic Style** — thick black borders, uppercase text, and a single red accent color (`#FF3000`). All design decisions (colors, fonts, sizes) are defined as variables at the top of `css/main.css`, making them easy to change in one place.

