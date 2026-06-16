# MediTwin AI — Marketing Website

A vibrant, industry-level single-page marketing site for **MediTwin AI**, the Multi-Agent Clinical Intelligence Platform.

## What's inside
- `index.html` — all sections (hero, problem, agents, live debate, platform capabilities, MVP, user journey, tech stack, users + business, YC pitch, CTA, footer)
- `styles.css` — vibrant modern dark theme, fully responsive, animated background, reveal-on-scroll
- `main.js` — navbar behavior, scroll reveals, count-up metrics, live vitals, animated agent "debate" sequence, contact form
- `assets/favicon.svg` — logo / favicon

No build step, no dependencies. Pure HTML/CSS/JS.

## How to view
Just open `index.html` in any modern browser.

Optionally, serve it locally:
```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

## Highlights
- **Live agent debate** — six specialized agents (Diagnostic, Lab, Radiology, Drug Interaction, Risk, Coordinator) animate through a real clinical case, ending in a confidence-scored verdict (Congestive Heart Failure, 87%).
- **Patient Digital Twin card** — live vitals + ECG + early-warning sepsis alert in the hero.
- **Animated count-up metrics**, gradient aurora background, glassmorphism cards.
- **Fully responsive** down to mobile, with a working hamburger menu and reduced-motion support.

## Customize
- Colors live in the `:root` block of `styles.css` (`--sky`, `--teal`, `--violet`, `--grad`, ...).
- Debate content is the `script` array in `main.js`.
- All copy is plain text in `index.html`.
