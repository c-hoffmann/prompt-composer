# Contributing to Prompt Composer

## Creating prompt packages (no coding required)

The easiest way to contribute is by creating and sharing prompt packages:

1. Open Prompt Composer → click 🧩 in the top bar → "Create New Project Type"
2. Fill in: name (DE + EN), icon, description, phases with prompt templates
3. Click Save → your type appears in the project list
4. Export it via 🧩 → ↓ on your package → share the `.json` file

### Prompt template tips

- Use XML tags: `<role>`, `<task>`, `<rules>`, `<output_format>`
- Use `**Label:** (hint text)` for fillable fields (auto-detected as form inputs)
- Use `{{variable}}` for global variables (system, target, etc.)
- Keep prompts in English (output language is controlled separately)

## Development

```bash
# Clone
git clone https://github.com/thekryz/prompt-composer.git
cd prompt-composer

# Build (requires Python 3.8+)
python3 build.py

# The build script:
# 1. Runs pre_build_validate.py (JS syntax, route integrity, i18n)
# 2. Assembles dist/prompt-composer.html from src/ + lib/
# 3. Generates SHA-256 checksum

# Dev server
python3 -m http.server 3000 --directory dist
# Open http://localhost:3000/prompt-composer.html

# Tests (requires Node.js 18+)
npm install
npx playwright install chromium
npx playwright test
```

### Source files

| File | What it does |
|---|---|
| `src/template.html` | HTML shell with `/* __MARKER__ */` placeholders |
| `src/style.css` | CSS: 4 themes (22 tokens each), layout, components |
| `src/data.js` | Data: project types, phases, prompts, i18n (96 keys × 2 langs), routes |
| `src/app.js` | Logic: Alpine.js stores (8), composer component, plugin system |
| `build.py` | Build: replaces markers with file contents, normalizes encoding |
| `pre_build_validate.py` | Validation: JS syntax, route→block refs, i18n symmetry |

### Adding a new built-in project type

1. Add the type to `TYPES` array in `src/data.js`
2. Add phases to `PHASES` object
3. Add prompt blocks to `P` object
4. Add route mappings to `ROUTES` object
5. Run `python3 build.py` — the validator will catch missing references

### Coding conventions

- All prompt text in English (localized via output language block)
- i18n keys must exist in both DE and EN
- Comments describe the *problem* that was solved, not the version it was solved in
- No external network requests in the app (fully offline)
