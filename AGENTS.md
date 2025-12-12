# Repository Guidelines

This Nuxt 4 + TailwindCSS app surfaces client IP intelligence through `server/api/ip.get.ts`; use the practices below to keep contributions predictable.

## Project Structure & Module Organization

UI assets live in `app/` (layouts, pages, root `app.vue`), while Nuxt server handlers sit in `server/api/`. Static icons belong in `public/`, and global configuration is centralized in `nuxt.config.ts` plus `tsconfig.json`. Place new server utilities beside their API endpoints, and prefer composables within `app/composables/` for reusable client logic.

## Build, Test, and Development Commands

- `bun install` — install dependencies and run the Nuxt `postinstall` prepare step (writes `bun.lock`).
- `bun run dev` — start the local server at `http://localhost:3000` with hot reload.
- `bun run build` — create the production bundle for deployments or Docker builds.
- `bun run preview` — serve the built output exactly as it will run in production.
- `bun run generate` — emit a static build when targeting edge/CDN environments.
- `docker build -t what-is-my-ip .` / `docker run -p 3000:3000 what-is-my-ip` — containerized workflow used in CI.

## Coding Style & Naming Conventions

TypeScript is required for `.vue` files (use `<script setup lang="ts">`), with 2-space indentation and trailing commas. Name Vue components in PascalCase (`IpDetailsCard.vue`) and directories in lowercase-kebab. Tailwind utility classes should follow semantic grouping: layout → spacing → color. Keep server modules ESM-only and avoid CommonJS imports.

## Testing Guidelines

The project currently relies on targeted manual checks: hit `/api/ip` to validate server logic, and verify UI states (loading, loaded, error) via `bun run dev`. When adding automated tests, scaffold Vitest suites inside `tests/` mirroring the `app/` hierarchy, and focus on header parsing plus private-IP filtering.

## Commit & Pull Request Guidelines

Git history shows Conventional Commit prefixes (`fix:`, `chore:`). Continue using meaningful types (`feat`, `refactor`, `docs`) plus concise scopes when useful. Pull requests should include: summary, screenshots for UI-facing updates, reproduction steps for bug fixes, and references to tracked issues. Ensure the branch is rebased onto `main`, CI (build + preview) passes locally, and review feedback is addressed via follow-up commits rather than force-pushes when collaboration is active.

## Security & Configuration Tips

Avoid storing API secrets; `ip-api.com` is public, but future keys belong in environment variables loaded through Nuxt runtime config. Preserve the existing IP-sanitization list inside `server/api/ip.get.ts` to block private ranges, and document any new proxy headers so operators can update infrastructure accordingly.
