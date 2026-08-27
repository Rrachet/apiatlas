# apiatlas

A structured, searchable directory of public APIs.

**Goal:** find the right API without spending hours searching.

## Live discovery site

The Next.js discovery interface lives in `web/` and is designed for fast browsing, search, filtering, and direct access to API documentation.

## Current catalog

- **102 API records** across **32 categories**
- Structured metadata for authentication, pricing, status, tags, HTTPS, CORS, API type, formats, free tier, OpenAPI, SDKs, region, and verification
- Source records live under `apis/`
- Automated health checks run from GitHub Actions
- Validation prevents malformed records and duplicate IDs

## Project structure

- `apis/` — source API records
- `data/apis.json` — generated catalog consumed by the website
- `schema/` — machine-readable API schema
- `scripts/` — validation, indexing, and health tooling
- `web/` — Next.js discovery application

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Never commit API keys, tokens, passwords, or other secrets.

## Roadmap

1. Structured catalog — complete
2. Automated health monitoring — complete
3. Discovery website — complete
4. API quality scoring and freshness ranking
5. Community submissions and review workflow
6. API playground and generated code snippets

## License

MIT
