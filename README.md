# 💭 Thought of the Day

A beautiful, minimal website that shows a new inspiring thought every day.
Built as a demo project for the **SimpleCI** self-hosted CI/CD platform.

## Features
- 🌌 Animated starfield background
- 💡 50 handpicked thoughts & quotes
- 🔀 "New Thought" button (random, with smooth animation)
- 📋 Copy to clipboard
- ⌨️ Keyboard shortcuts: `Space` / `→` for new thought, `C` to copy
- 📅 Same thought all day (seed by date), new thought every day

## CI/CD
This project uses **SimpleCI** for continuous integration.
Every push to `main` triggers the pipeline which:
1. Validates all required files exist
2. Counts thoughts (must be ≥ 10)
3. Validates HTML structure
4. Checks CSS file size
5. Runs Node.js syntax check on `app.js`
6. Prints a project summary

## Run Locally
Just open `index.html` in your browser — no build step needed!

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` or `→` | Next thought |
| `C` | Copy to clipboard |
