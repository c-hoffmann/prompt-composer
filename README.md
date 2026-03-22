# ✨ Prompt Composer

**A guided tool for building structured AI prompts.** No server, no login, no tracking — runs entirely in your browser.

[**→ Try it now**](https://YOUR_USERNAME.github.io/prompt-composer/) · [Download HTML](https://github.com/YOUR_USERNAME/prompt-composer/releases/latest)

<p align="center">
  <img src="docs/screenshot-neon.png" alt="Prompt Composer in Neon theme" width="800">
</p>

---

## What it does

Prompt Composer guides you through building well-structured prompts for AI models (Claude, GPT-4, Gemini, etc.) using a step-by-step funnel:

1. **Pick a project type** — Script, Repository, Text, Email, Data, DevOps, API, Learning, Planning, Prompt Engineering, or create your own
2. **Choose a phase** — New, Optimize, Review, Debug, Research, etc.
3. **Answer quick questions** — Optional context refinement
4. **Configure & copy** — Toggle sections, fill in details, copy the assembled prompt

Every prompt uses XML-tag structure (`<role>`, `<task>`, `<rules>`, `<output_format>`) that works across all major AI models.

## Features

| Feature | Description |
|---|---|
| 🎯 **11 project types** | Script, Repo, Text, Mail, Data, DevOps, API, Learn, Plan, Prompt, Other |
| 🧩 **Plugin system** | Create & share custom project types as JSON packages |
| 🌍 **15 output languages** | German, English, French, Spanish, Japanese, and more |
| 🎨 **4 themes** | Neon (default), Light, Dark, High Contrast (WCAG AAA) |
| 📋 **One-click copy** | Structured prompt ready for your AI chat |
| ⭐ **Favorites & history** | Save and reload your prompt configurations |
| ✏️ **Edit mode** | Customize any built-in prompt template |
| ♿ **Accessible** | Focus trapping, screen reader support, keyboard navigation |
| 🔒 **Private** | All data stays in your browser. Nothing is sent anywhere. |
| 📴 **Works offline** | Download the HTML file and use it without internet |

## Quick start

### Online (recommended)
Visit [**YOUR_USERNAME.github.io/prompt-composer/**](https://YOUR_USERNAME.github.io/prompt-composer/) — that's it.

### Offline
1. Download `prompt-composer.html` from the [latest release](https://github.com/YOUR_USERNAME/prompt-composer/releases/latest)
2. Double-click to open in your browser
3. Start building prompts

### Requirements
- Any modern browser (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
- No server, no installation, no account needed

## Creating & sharing prompt packages

You can create custom project types via the 🧩 button in the top bar:

```json
{
  "schemaVersion": 1,
  "meta": {
    "id": "a1b2c3d4-...",
    "slug": "@yourname/ml-prompts",
    "author": "Your Name",
    "version": "1.0.0"
  },
  "projectTypes": [{
    "id": "ml-pipeline",
    "icon": "🤖",
    "name": { "de": "ML-Pipeline", "en": "ML Pipeline" },
    "description": { "de": "Machine Learning Workflows", "en": "ML Workflows" },
    "phases": [{
      "id": "data-prep",
      "icon": "🔬",
      "name": { "de": "Daten vorbereiten", "en": "Prepare Data" },
      "promptTemplate": "<role>You are a data engineer...</role>\n<task>...</task>"
    }]
  }]
}
```

Export → share the JSON file → others import via 🧩 → Install.

## Data & privacy

- All data stored in browser `localStorage` — nothing leaves your machine
- Export/import your settings as JSON (Settings → Export, or press `Ctrl+S`)
- Safari on `file://` uses in-memory fallback (data lost on reload — use Export)
- The hosted GitHub Pages version has stable localStorage (recommended)

## Development

```bash
git clone https://github.com/YOUR_USERNAME/prompt-composer.git
cd prompt-composer

# Build
python3 build.py          # Validates sources, assembles HTML, generates SHA-256

# Test
npm install
npx playwright install chromium
npx playwright test        # E2E tests
npx playwright test --headed  # Watch tests in browser

# Dev server
python3 -m http.server 3000 --directory dist
# Then open http://localhost:3000/prompt-composer.html
```

### Project structure

```
prompt-composer/
├── src/
│   ├── template.html     ← HTML shell with /* __MARKER__ */ placeholders
│   ├── style.css          ← CSS (4 themes, layout, components)
│   ├── data.js            ← Data (types, phases, prompts, i18n, routes)
│   └── app.js             ← Alpine.js stores & component logic
├── lib/
│   ├── alpine.min.js      ← Alpine.js v3.15.8 (inlined)
│   └── marked.min.js      ← marked.js v17.0.5 (inlined)
├── tests/
│   ├── funnel.spec.ts     ← Playwright E2E: funnel flow, clipboard, persistence
│   └── themes.spec.ts     ← Visual regression: 4 themes screenshot comparison
├── build.py               ← Build script (marker-replacement, SHA-256)
├── pre_build_validate.py  ← Pre-build checks (JS syntax, routes, i18n)
├── playwright.config.ts   ← Playwright config (local HTTP server, permissions)
├── lighthouserc.js        ← Lighthouse CI (accessibility ≥90%)
└── .github/workflows/
    └── ci.yml             ← GitHub Actions: validate → build → test → release
```

### Tech stack

- **Alpine.js v3.15.8** — Reactive UI (~46 KB, inlined)
- **marked.js v17.0.5** — Markdown preview (~42 KB, inlined)
- **Python 3** — Build script (no npm required for building)
- **Zero runtime dependencies** — everything is inlined in one HTML file

## License

MIT
