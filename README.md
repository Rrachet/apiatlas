# APIAtlas

> **API discovery, validation and reliability monitoring for developers.**

APIAtlas helps developers find public APIs while answering the operational questions that matter: is the API free, authenticated, maintained, reachable, HTTPS-enabled, and still working?

[![Catalog](https://img.shields.io/badge/APIs-102-blue?style=flat-square)](https://github.com/Rrachet/apiatlas) [![Categories](https://img.shields.io/badge/Categories-32-blue?style=flat-square)](https://github.com/Rrachet/apiatlas) [![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

## Why I built it

API discovery is a **data-quality and reliability problem**, not just a search problem. APIAtlas combines structured records, validation and automated health checks to make the catalog more trustworthy.

## What it demonstrates

- API discovery and structured data modelling
- Schema validation and duplicate detection
- Automated API health monitoring
- Reliability and freshness signals
- Search and filtering across public APIs
- Next.js application architecture
- Separation of source data, validation tooling and presentation

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
Search · Filter · Inspect
```

## Operations signal

The health-check layer is deliberately part of the product. When an API becomes unavailable or unreliable, the system can surface that condition rather than silently presenting stale information.

This makes APIAtlas particularly relevant to the **application support / application operations** side of my portfolio: monitoring a dependency, detecting failure, investigating reliability and exposing useful operational signals.

## Repository structure

```text
apis/                 source API records
data/apis.json        generated catalog
schema/               machine-readable schema
scripts/              validation and health tooling
web/                  Next.js discovery application
.github/workflows/    automated checks
```

## Current catalog

**102 API records · 32 categories**

Metadata includes authentication, pricing, status, tags, HTTPS, CORS, API type, formats, free tier, OpenAPI, SDKs, region and verification signals.

## Run locally

```bash
git clone https://github.com/Rrachet/apiatlas.git
cd apiatlas
```

Install the web application's dependencies according to the `web/` package configuration, then start the Next.js development server.

## Roadmap

- [x] Structured API catalog
- [x] Automated health monitoring
- [x] Discovery website
- [ ] API quality scoring and freshness ranking
- [ ] Community submissions and review workflow
- [ ] API playground and generated code snippets
- [ ] Usage analytics

## Portfolio role

**Integrate + Monitor project**

APIAtlas complements [ThriiLocal](https://github.com/Rrachet/ThriiLocal) and [SupportHub](https://github.com/Rrachet/SupportHub): build an application, integrate services, monitor dependencies, support users, troubleshoot failures, and document what happened.

## License

MIT
