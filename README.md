# apiatlas

A structured, searchable directory of public APIs.

**Goal:** find the right API without spending hours searching.

## What is here

- Categorized API records
- Authentication and pricing metadata
- Official website and documentation links
- Generated aggregate API index
- Validation tooling and GitHub Actions CI

## Phase 1

The repository foundation is in place. The next phases add more APIs, automated health checks, and a searchable web experience.

## Repository layout

```text
apis/                 # Source API records by category
data/apis.json        # Generated aggregate catalog
schema/api.schema.json
scripts/              # Validation and index generation
.github/workflows/    # CI
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
