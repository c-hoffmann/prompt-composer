# Creating a Prompt Package

## Quick start

1. Copy this `_template/` folder
2. Edit `package.json` with your project type and prompts
3. Generate a UUID for `meta.id`: open browser console → `crypto.randomUUID()`
4. Test locally: open Prompt Composer → 🧩 → Import Package → select your file
5. Share: upload the JSON or submit a PR to this repo

## Package format

```
{
  "schemaVersion": 1,        ← always 1 for now
  "meta": {
    "id": "uuid-v4",         ← unique ID (crypto.randomUUID())
    "slug": "@author/name",  ← human-readable identifier
    "author": "Your Name",
    "version": "1.0.0"       ← semver
  },
  "projectTypes": [{
    "id": "kebab-case-id",   ← lowercase, hyphens only
    "icon": "emoji",         ← single emoji
    "name": { "de": "...", "en": "..." },
    "description": { "de": "...", "en": "..." },
    "phases": [{
      "id": "phase-id",
      "icon": "emoji",
      "name": { "de": "...", "en": "..." },
      "promptTemplate": "..."  ← the actual prompt text
    }]
  }]
}
```

## Prompt template tips

- Use XML tags: `<role>`, `<task>`, `<rules>`, `<output_format>`
- Use `**Label:** (hint text)` for auto-detected form fields
- Use `{{variable}}` for global variables (system, target, etc.)
- Keep prompt text in English (output language is controlled by the user)
- Test each phase: does the assembled prompt produce good AI responses?

## Checklist before sharing

- [ ] `meta.id` is a fresh UUID (not the template's placeholder)
- [ ] `meta.slug` uses your username: `@yourname/package-name`
- [ ] All `name` fields have both `de` and `en` translations
- [ ] Every phase has a non-empty `promptTemplate`
- [ ] Prompt templates use `**Label:** (hint)` for fillable fields
- [ ] Tested in Prompt Composer: import → select type → copy prompt → use with AI
