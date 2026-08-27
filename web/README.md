# apiatlas web

Phase 4 discovery website for apiatlas.

## Run locally

```bash
cd web
npm install
npm run dev
```

Then open the local Next.js development server.

## Routes

- `/` — searchable API directory with category/authentication filters
- `/api/[id]` — static API detail pages generated from `data/apis.json`

The website reads the repository's canonical generated catalog directly, so catalog additions automatically become discoverable after the data file is regenerated.
