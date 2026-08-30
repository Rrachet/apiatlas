# APIAtlas

### A developer product for discovering trustworthy public APIs

APIAtlas is a **product case study + working application** built around a simple problem:

> Developers can find lists of APIs. The harder problem is knowing which APIs are actually usable, maintained, reachable and worth integrating.

[![Catalog](https://img.shields.io/badge/APIs-102-111111?style=flat-square)](https://github.com/Rrachet/apiatlas) [![Categories](https://img.shields.io/badge/Categories-32-111111?style=flat-square)](#current-product) [![License](https://img.shields.io/badge/License-MIT-111111?style=flat-square)](LICENSE)

---

## Product case study

### User problem

A developer looking for an API needs more than a name and URL. They need to know:

- Is it free or paid?
- Does it require authentication?
- Is it reachable?
- Is it HTTPS-enabled?
- Is it maintained?
- Does the documentation appear usable?
- Can I trust the metadata?

### Product hypothesis

**If API discovery combines structured metadata with validation and reliability signals, developers can evaluate integration candidates faster and with more confidence.**

### Product outcome

APIAtlas combines catalog data, schema validation, duplicate detection, health checks and a discovery UI into one workflow.

```text
DISCOVER
   ↓
FILTER
   ↓
INSPECT
   ↓
VALIDATE
   ↓
ASSESS RELIABILITY
   ↓
DECIDE WHETHER TO INTEGRATE
```

---

## Product decisions

### Trust is a feature

The health-check layer is part of the product rather than an implementation detail. A directory that silently contains dead or stale APIs creates negative value.

### Structured metadata beats a giant list

Authentication, pricing, HTTPS, CORS, formats, OpenAPI, SDKs and verification signals allow users to narrow the search based on their actual integration constraints.

### Quality can become a ranking problem

The next product layer is not simply adding more APIs. It is helping users identify the **best-fit APIs** using freshness, reliability, completeness and other quality signals.

---

## Current product

**102 API records · 32 categories**

The current catalog includes authentication, pricing, status, tags, HTTPS, CORS, API type, formats, free tier, OpenAPI, SDKs, region and verification signals.

### Architecture

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

---

## Metrics I would use

| Product goal | Metric |
|---|---|
| Discovery efficiency | Time to find a viable API |
| Search quality | Search → API inspection rate |
| Decision usefulness | Inspection → outbound/integration intent |
| Trust | % APIs passing health/freshness checks |
| Catalog quality | Duplicate/stale record rate |
| Retention | Returning developers / teams |

These are **product measurement proposals**, not production business metrics.

---

## Roadmap

### Now

- [x] Structured API catalog
- [x] Automated health monitoring
- [x] Discovery website

### Next

- [ ] API quality score and freshness ranking
- [ ] Community submissions and review workflow
- [ ] API playground and generated code snippets
- [ ] Usage analytics
- [ ] Personalized API recommendations

The roadmap deliberately moves from **catalog → trust → evaluation → action**.

---

## Technical proof

- Next.js
- Structured data modelling
- Schema validation
- Duplicate detection
- Automated health checks
- GitHub Actions
- Search and filtering
- Separation of source data, validation tooling and presentation

---

## Why this belongs in a PM portfolio

APIAtlas demonstrates the product loop I care about:

**User problem → hypothesis → product scope → technical constraints → measurable outcome → roadmap.**

It is not presented as a finished enterprise product. The repository makes the current state, proposed metrics and next product bets explicit.

## License

MIT
