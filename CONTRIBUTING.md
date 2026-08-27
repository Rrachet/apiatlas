# Contributing to apiatlas

Thanks for helping build the API discovery layer for developers.

## Add an API

1. Create a JSON file under the most appropriate `apis/<category>/` directory.
2. Follow `schema/api.schema.json`.
3. Use official website and documentation URLs whenever possible.
4. Keep descriptions factual and concise.
5. Never commit API keys, tokens, passwords, or other secrets.
6. Run `node scripts/validate.js`.
7. Run `node scripts/generate-index.js` and commit the updated `data/apis.json`.

## Record guidelines

Use a stable lowercase kebab-case `id`. Prefer explicit authentication and pricing values over vague prose. Put important caveats in `notes`.
