---
project_name: 'what-is-my-ip'
user_name: 'Mathieu'
date: '2026-01-23'
sections_completed:
  [
    'technology_stack',
    'language_rules',
    'framework_rules',
    'testing_rules',
    'code_quality_rules',
    'workflow_rules',
    'critical_rules',
  ]
status: 'complete'
rule_count: 150+
optimized_for_llm: true
existing_patterns_found: 8
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Framework Core:**

- Nuxt: 4.3 (target version, currently 4.2.2)
- Vue: 3.5.27
- Vue Router: 4.6.4
- Node.js: >=18.0.0
- Package Manager: Bun (latest stable)

**UI & Styling:**

- NuxtUI (official design system - replaces standalone Tailwind)
- @nuxtjs/color-mode (dark mode with SSR support)
- Tailwind CSS (via NuxtUI integration)

**Testing:**

- Vitest (unit tests with Nuxt auto-imports)
- Playwright (E2E tests)
- @vue/test-utils (Vue component testing)

**SEO & Analytics:**

- @nuxtjs/seo (all-in-one SEO module)
- Vercel Analytics (Web Vitals tracking)

**Error Monitoring:**

- @sentry/nuxt (error tracking and monitoring)

**External APIs:**

- ip-api.com (geolocation data)
- Google Maps (location links)

**Deployment:**

- Vercel (SSR Node.js hosting + Edge CDN)

**Critical Version Constraints:**

- Use Nuxt 4.3 specifically (not 4.2) for SSR features required by architecture
- TypeScript strict mode enabled (via Nuxt config)
- Nitro 2+ included with Nuxt 4 (native caching support)

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

**TypeScript Configuration:**

- Strict mode REQUIRED (no `any` types allowed)
- Nuxt auto-imports enabled (don't manually import `ref`, `computed`, `useFetch`, etc.)
- Project references config via `.nuxt/tsconfig.*.json`

**Naming Conventions:**

- Variables/Functions: `camelCase` (e.g., `clientIP`, `normalizeIP`)
- Types/Interfaces: `PascalCase` WITHOUT `I` prefix (e.g., `IPApiResponse`, not `IIPApiResponse`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `CACHE_TTL`)
- Composables: `useFeatureName` pattern (e.g., `useIpDetection`)
- Components: `PascalCase` no prefix (e.g., `IpDisplay.vue`)

**Error Handling Patterns:**

- Server API: Use `createError()` from Nuxt
- Composables: Expose `error` ref, catch and assign errors
- Three-layer pattern (architecture): server → composable → component

**Async/Await:**

- Prefer `async/await` over `.then()` chains
- Use `useFetch()` for client-side API calls
- Use `$fetch()` in composables for manual calls
- Server handlers: `$fetch()` or native fetch

**Critical Edge Cases:**

- **IPv6 Normalization:** Strip `::ffff:` prefix for IPv4-mapped addresses
- **Private IP Detection:** Full ranges (192.168.x, 10.x, 172.16-31.x, IPv6 fc00::/7, fe80::/10)
- **Header Priority:** `x-forwarded-for` (first IP) > `x-real-ip` > `cf-connecting-ip`
- **Server Context:** Use `server: false` in `useFetch()` to capture visitor IP (not server IP)

**Anti-Patterns to Avoid:**

- ❌ Using `any` type (always type explicitly)
- ❌ Interface names with `I` prefix (`IUserData` → `UserData`)
- ❌ Manually importing Nuxt auto-imports (`import { ref } from 'vue'`)
- ❌ Using `snake_case` for variables (use `camelCase`)

### Framework-Specific Rules (Nuxt 4 / Vue 3)

**Composition API:**

- ALWAYS use `<script setup lang="ts">` (never Options API)
- Nuxt composables auto-imported (don't manually import `ref`, `useFetch`, etc.)
- Use `readonly()` for exposed reactive state in composables

**Composables Pattern (Architecture):**

- Extract reusable logic to `app/composables/useFeatureName.ts`
- Expose readonly state + methods
- Pattern: `const { data, loading, error, action } = useFeature()`
- Use try/finally for loading states, try/catch for errors

**Server API Routes (Nitro):**

- Use `defineEventHandler()` for API routes
- Use `defineCachedEventHandler()` for cacheable endpoints (5min TTL per architecture)
- File naming: `server/api/endpoint.{get|post|put|delete}.ts`
- Access headers: `getHeader(event, 'header-name')`
- Get client IP: `getRequestIP(event)`

**NuxtUI Components (Architecture):**

- Replace Tailwind inline classes with NuxtUI components
- Use `<UButton>`, `<UCard>`, `<UAlert>`, `<UNotification>`, `<USkeleton>`
- NuxtUI handles dark mode automatically (no manual dark: classes needed)
- Icons: Use `i-heroicons-icon-name` pattern

**Dark Mode:**

- Use `@nuxtjs/color-mode` module
- Access with `const colorMode = useColorMode()`
- Preferences: `'system'` | `'light'` | `'dark'`
- NuxtUI components adapt automatically

**File-Based Routing:**

- Pages in `app/pages/` auto-generate routes
- Dynamic routes: `[id].vue` → `/user/:id`
- Nested routes: folder structure determines route hierarchy

**SSR vs Client-Side:**

- SSR by default for SEO and performance
- Use `server: false` in `useFetch()` when client-specific data needed (e.g., visitor IP)
- Wrap client-only components in `<ClientOnly>`

**State Management:**

- Use composables with global reactive state (no Pinia needed for this project)
- Pattern: `const globalState = ref({})` in composable
- Expose readonly state + update methods

**Anti-Patterns:**

- ❌ Options API (`data()`, `methods`, etc.)
- ❌ Manual imports of Nuxt auto-imports
- ❌ Tailwind inline classes (migrate to NuxtUI)
- ❌ Using Pinia (composables sufficient per architecture)

### Testing Rules

**Test Organization:**

- Unit tests: `tests/unit/` (composables, utils, components, server)
- E2E tests: `tests/e2e/` (user flows, integrations)
- File naming: `*.test.ts` (unit), `*.spec.ts` (E2E)

**Vitest (Unit Tests):**

- Environment: `nuxt` with `happy-dom` for DOM operations
- Globals enabled (no need to import `describe`, `it`, `expect`)
- Coverage threshold: 80% minimum enforced (lines, functions, branches, statements)
- Coverage provider: V8 (recommended for accuracy and performance)
- Mock $fetch and Nuxt composables as needed

**Playwright (E2E Tests):**

- Test browsers: Chromium, Firefox, WebKit
- Parallel execution in CI (15 workers per architecture)
- Retries: 2 on CI, 0 locally
- Base URL: `http://localhost:3000`
- Use `data-testid` attributes for stable selectors

**Test Patterns:**

- Composables: Test state management, async operations, error handling
- Components: Test rendering, props, events, slots
- Server APIs: Test header detection, IP normalization, caching, error responses
- E2E: Test complete user flows (FR1-FR27 critical paths)

**Coverage Requirements:**

- Unit: >80% coverage required
- E2E: 100% critical path coverage (IP detection, geolocation, copy, refresh)
- All components must have basic render tests

**Mock Guidelines:**

- Mock `$fetch` globally for API calls
- Mock external APIs (ip-api.com)
- Use `vi.fn()` for function mocks
- Clear mocks in `beforeEach()`

**Test Naming:**

- Descriptive names: "should handle IPv6 with ::ffff: prefix"
- Follow pattern: "should [action] [expected result] [context]"

**TDD Workflow:**

- Write failing test first (Red)
- Write minimal code to pass (Green)
- Refactor for quality (Refactor)

**Anti-Patterns:**

- ❌ Testing implementation details (test behavior, not internals)
- ❌ Vague test names ("works", "test 1")
- ❌ Not mocking external dependencies
- ❌ Flaky tests (use stable selectors, proper waits)

### Code Quality & Style Rules

**Linting & Formatting:**

- Use `@nuxt/eslint-config` (flat config for Nuxt 4)
- Prettier for formatting (semi: false, singleQuote: true, printWidth: 100)
- Error on `any` types, multi-word component names
- Warn on `console.log` in production

**File Organization:**

- Flat folder structure (no nested folders for small project)
- Components in `app/components/`
- Composables in `app/composables/`
- Types in `types/index.ts` (single file)
- Server in `server/api/` and `server/utils/`

**File Naming:**

- Components: `PascalCase.vue`
- Composables: `useFeatureName.ts`
- API Routes: `endpoint.{method}.ts`
- Utils: `camelCase.ts`

**Documentation:**

- Components: JSDoc with @example
- Complex functions: JSDoc with @param, @returns, @example
- Comments explain WHY, not WHAT
- No redundant comments that repeat code

**Function/Component Size:**

- Functions: <50 lines preferred
- Components: <200 lines (extract sub-components if larger)
- One responsibility per function/component

**Import Organization:**

1. Types/Interfaces (import type)
2. External dependencies
3. Composables (usually auto-imported)
4. Utils

**TypeScript Quality:**

- Explicit return types for exported functions
- Use `readonly()` for exposed reactive state
- No implicit `any` types

**Performance:**

- Use `computed` for derived state (not watchers)
- Use `v-memo` for expensive renders
- Lazy load large components with `defineAsyncComponent`

**Accessibility (WCAG 2.1 AA):**

- Semantic HTML (button, not div for buttons)
- ARIA labels for screen readers
- Alt text for images
- Keyboard navigation support
- Skip to main content link

**Security:**

- Sanitize user inputs server-side
- Use HTTPS for external APIs
- Validate data before processing
- Never expose secrets in client code (use runtime config)

**Anti-Patterns:**

- ❌ Redundant comments
- ❌ Large functions/components (refactor)
- ❌ Implicit any types
- ❌ Watchers for derived state (use computed)
- ❌ Non-semantic HTML
- ❌ Hardcoded secrets in code

### Development Workflow Rules

**Branch Naming:**

- Format: `<type>/<description>`
- Types: feat, fix, chore, docs, test, refactor
- Example: `feat/nuxt4-migration`, `fix/ipv6-bug`

**Commit Messages:**

- Format: `<type>: <description>`
- Types: feat, fix, docs, chore, test, refactor, perf, style
- Always include: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`
- Examples: `feat: add IP detection composable`, `fix: handle IPv6 prefix`

**Pull Requests:**

- Include summary (1-3 bullet points)
- List changed files/areas
- Provide test plan with checklist
- Ensure all tests pass before requesting review

**Deployment:**

- Main branch → Vercel production (automatic)
- Feature branches → Preview deployments (automatic)
- Always run tests before deploying
- Required env vars: `SENTRY_DSN`, `NUXT_PUBLIC_SITE_URL`

**Development Commands:**

- `bun dev` - Start dev server
- `bun test` - Run unit tests
- `bun test:e2e` - Run E2E tests
- `bun run build` - Production build
- `bun run lint` - Run linter

**Pre-Deployment Checklist:**

1. All tests pass (unit + E2E)
2. Production build succeeds
3. Lighthouse score >95
4. No console errors/warnings
5. Environment variables configured

**CI/CD Pipeline:**

- GitHub Actions with matrix strategy
- Jobs: lint, typecheck, test-unit, test-e2e, build
- All jobs must pass before merge

**Best Practices:**

- Small, focused commits
- Pull before push
- Feature branches (never direct to main)
- Clean up branches after merge
- Self-review PRs before requesting review

### Critical Don't-Miss Rules

**CRITICAL: IP Detection Gotchas**

- ❌ NEVER use default SSR for IP detection: `useFetch('/api/ip')` captures server IP
- ✅ ALWAYS use `server: false`: `useFetch('/api/ip', { server: false })` captures visitor IP
- ❌ NEVER send private IPs to external APIs (192.168.x, 10.x, 172.16-31.x)
- ✅ ALWAYS normalize IPv6 addresses (strip `::ffff:` prefix)
- ✅ ALWAYS take first IP from `x-forwarded-for` header (may contain multiple IPs)

**CRITICAL: NuxtUI Migration**

- ❌ NEVER mix Tailwind inline classes with NuxtUI components
- ✅ ALWAYS use NuxtUI components: `<UButton>`, `<UCard>`, `<UAlert>`
- ✅ Icon pattern: `i-heroicons-{name}` (e.g., `i-heroicons-check-circle`)
- ✅ Dark mode handled automatically by NuxtUI (no manual `dark:` classes)

**CRITICAL: Caching & Performance**

- ❌ NEVER skip caching on API routes (architecture requires 5min TTL)
- ✅ ALWAYS use `defineCachedEventHandler()` with `maxAge: 60 * 5`
- ❌ NEVER use watchers for computed values (use `computed`)
- ✅ ALWAYS lazy load heavy components with `defineAsyncComponent`

**CRITICAL: Security Rules**

- ❌ NEVER expose secrets in client code (use `useRuntimeConfig()`)
- ✅ ALWAYS validate and sanitize user inputs server-side
- ✅ ALWAYS use HTTPS for external APIs (when available)
- ✅ ALWAYS check for private IP ranges before external API calls

**CRITICAL: SSR vs Client**

- ❌ NEVER access `window` or `document` in SSR context
- ✅ ALWAYS use `onMounted()` for client-only code
- ✅ ALWAYS wrap client-only components in `<ClientOnly>`
- ✅ Use `server: false` in `useFetch()` when client-specific data needed

**CRITICAL: TypeScript**

- ❌ NEVER use `any` type (architecture strict mode)
- ❌ NEVER manually import Nuxt auto-imports (`ref`, `computed`, etc.)
- ❌ NEVER prefix interfaces with `I` (`IPApiResponse` → `ApiResponse`)
- ✅ ALWAYS use explicit return types for exported functions

**Edge Cases You Must Handle:**

1. **IPv6 with ::ffff: prefix** - Must strip before using
2. **Multiple IPs in x-forwarded-for** - Take first IP only
3. **Private IP ranges** - Detect all ranges (192.168, 10, 172.16-31, 127, 169.254)
4. **Dark mode flash** - Use `@nuxtjs/color-mode` (SSR-safe)
5. **Auto-import name collision** - Don't name variables `ref`, `computed`, etc.

**Performance Gotchas:**

- Don't use watchers for derived state (use `computed`)
- Don't import heavy components synchronously (use `defineAsyncComponent`)
- Don't skip `v-memo` for expensive list renders
- Don't forget cache headers on API responses

**When in Doubt:**

- Check architecture.md for patterns
- Refer to existing code (server/api/ip.get.ts) for IP detection
- Use NuxtUI docs for component patterns
- Follow the three-layer error handling pattern

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Refer to architecture.md for high-level decisions
- Check existing code (server/api/ip.get.ts) for IP detection patterns
- Update this file if new critical patterns emerge during implementation

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes (versions, new dependencies)
- Review quarterly for outdated rules
- Remove rules that become obvious over time
- Add new rules discovered during code reviews
- Maintain focus on "unobvious" details agents might miss

**Key Reference Files:**

- `_bmad-output/planning-artifacts/architecture.md` - High-level architectural decisions
- `server/api/ip.get.ts` - Reference implementation for IP detection
- `app/pages/index.vue` - Current UI implementation (to be migrated to NuxtUI)

**Last Updated:** 2026-01-23
