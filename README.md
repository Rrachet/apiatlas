# APIAtlas

> **A searchable, quality-aware directory of public APIs for developers.**

APIAtlas helps developers find the right public API without spending hours searching through scattered lists and outdated documentation.

[![Catalog](https://img.shields.io/badge/APIs-102-blue?style=flat-square)](https://github.com/Rrachet/apiatlas) [![Categories](https://img.shields.io/badge/Categories-32-blue?style=flat-square)](https://github.com/Rrachet/apiatlas) [![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

## Why I built it

API discovery is deceptively difficult. Developers need to know whether an API is free, authenticated, maintained, available in their region, supports HTTPS/CORS, and still works — not just whether it appears in a directory.

APIAtlas treats API discovery as a **data-quality and reliability problem**, not just a search page.

## What it does

- 🔎 Search and filter public APIs
- 🧩 Organise APIs across **32 categories**
- 🏷️ Store structured metadata for auth, pricing, HTTPS, CORS, API type, formats, free tier, OpenAPI, SDKs and region
- ❤️ Run automated health checks
- ✅ Validate records and prevent duplicate IDs
- 📊 Provide a foundation for API quality and freshness scoring
- 🌐 Serve a Next.js discovery experience from structured source data

## Architecture

```text
API Sources
    ↓
Structured Records
    ↓
Schema Validation ──→ Duplicate Detection
    ↓
Generated Catalog
    ↓
Health Checks ──→ Reliability Signals
    ↓
Next.js Discovery UI
    ↓
Search · Filter · Inspect · Discover
```

## Repository structure

```text
apis/                 source API records
data/apis.json        generated catalog
schema/               machine-readable schema
scripts/              validation, indexing, health tooling
web/                  Next.js discovery application
.github/workflows/    automated checks
```

## Engineering decisions

### Structured data over hard-coded UI

API records live as structured source data and the website consumes a generated catalog. This keeps content separate from presentation and makes validation/automation possible.

### Automated health checks

A directory becomes less useful when its APIs silently stop working. Health checks are therefore part of the product rather than an afterthought.

### Validation before publication

Records are validated for schema correctness and duplicate identifiers before entering the generated catalog.

## Current catalog

**102 API records · 32 categories**

Metadata includes authentication, pricing, status, tags, HTTPS, CORS, API type, formats, free tier, OpenAPI, SDKs, region and verification signals.

## Run locally

```bash
git clone https://github.com/Rrachet/apiatlas.git
cd apiatlas
```

Install the web application's dependencies according to the `web/` package configuration, then start the Next.js development server.

The repository is intentionally organised so the data/validation tooling can be worked on independently from the discovery UI.

## Roadmap

- [x] Structured API catalog
- [x] Automated health monitoring
- [x] Discovery website
- [ ] API quality scoring and freshness ranking
- [ ] Community submissions and review workflow
- [ ] API playground and generated code snippets
- [ ] Usage analytics for discovery/search behaviour

## Product + engineering signal

APIAtlas is representative of how I like to build: start with a real developer problem, model the underlying data carefully, automate repetitive validation, then put a usable product interface on top.

## License

MIT
