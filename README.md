# Utopia

The world's best city, built by everyone.

Utopia is an open-source civic design platform where people collect proven urban ideas from real cities, vote on them, and watch the adopted decisions become visible in a living 3D city.

## Product principles

- The 3D city is the product, not decoration.
- Every decision must cite a real city where the idea exists.
- Every decision shows the upside, downside and trade-off.
- Layer 0 scientific foundations constrain the city before community voting starts.
- Contribution is intentionally thoughtful; voting and exploration are intentionally lightweight.

## Monorepo

```txt
apps/web                 Next.js app and 3D experience
packages/city-rules      Decision-to-city rule primitives and seed rules
packages/domain          Shared domain types and seed data
```

## Getting started

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Current slice

This initial slice implements the product shell from the brief:

- Visitor landing with persistent 3D city canvas.
- Clickable glowing city objects mapped to seeded decisions.
- Decision side panel with source city, score, argument for, argument against and trade-off.
- Signup, City Quiz, first 5 votes, member feed, vote detail and submission wizard as front-end flows.
- Seed taxonomy, decisions and city rules ready to be moved behind API/database persistence.

## Planned architecture

- Frontend: Next.js App Router, React, React Three Fiber, Tailwind.
- Backend: Fastify API.
- Database: PostgreSQL + Drizzle ORM.
- Search: Meilisearch.
- Auth: Better Auth.
- LLM services: duplicate detection, contradiction detection and source enrichment.
- City model: CityJSON plus `CITY_RULES.yaml`-style decision mappings.
