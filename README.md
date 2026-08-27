# apiatlas

A structured, searchable directory of public APIs.

**Goal:** find the right API without spending hours searching.

## Current catalog

**23 APIs across 13 categories**, with metadata for authentication, pricing, documentation, status, and tags.

## Phase 2

Phase 2 expands the catalog and introduces automated health monitoring.

- 23 curated API records
- Category-based source files
- Generated aggregate catalog in `data/apis.json`
- URL health checks for API websites and documentation
- Scheduled GitHub Actions health report
- Validation CI for every push and pull request

## Repository layout

```text
apis/                 # Source API records by category
data/apis.json        # Generated aggregate catalog
data/health.json      # Latest automated health report
schema/api.schema.json
scripts/              # Validation, indexing, and health checks
.github/workflows/    # Validation and scheduled health monitoring
```

## Data sources

Records are curated from publicly available API documentation and developer resources. The project does not claim affiliation with listed providers.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- Phase 3: 100+ APIs and richer metadata
- Phase 4: searchable web directory
- Phase 5: API playground, SDK snippets, ratings, and community submissions

## License

MIT
