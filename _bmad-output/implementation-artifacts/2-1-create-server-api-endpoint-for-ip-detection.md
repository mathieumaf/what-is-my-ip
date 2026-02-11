# Story 2.1: Create Server API Endpoint for IP Detection

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the server to detect my IP address automatically,
so that I can see my public IP instantly upon page load.

## Acceptance Criteria

1. A new file `server/api/ip.get.ts` is created following Nuxt 4 conventions
2. The endpoint uses `getRequestIP(event)` to extract the visitor's IP address
3. The endpoint returns a JSON response with `{ ip: "x.x.x.x" }` format
4. Response uses camelCase field naming (as per architecture patterns)
5. The endpoint handles missing IP gracefully and returns a clear error
6. Error responses use `createError()` with appropriate status codes
7. The endpoint is accessible at `GET /api/ip`
8. SSR rendering can call this endpoint during page generation
9. Unit tests validate IP extraction logic
10. Unit tests validate error handling for missing IP
11. E2E tests validate the endpoint returns valid IP format
12. The endpoint responds within 100ms under normal conditions

## Tasks / Subtasks

- [ ] Task 1: Create `server/api/ip.get.ts` endpoint (AC: 1, 2, 3, 4, 7, 8, 12)
  - [ ] Create `server/api/ip.get.ts` using `defineEventHandler()`
  - [ ] Extract visitor IP using `getRequestIP(event, { xForwardedFor: true })`
  - [ ] Implement fallback header chain: `x-forwarded-for` (first IP) > `x-real-ip` > `cf-connecting-ip` > `getRequestIP(event)`
  - [ ] Normalize IP using existing `normalizeIP()` from `app/utils/ipValidation.ts` (REUSE - DO NOT RECREATE)
  - [ ] Return direct JSON response `{ ip: normalizedIp }` (no wrapper object)
  - [ ] Ensure endpoint is accessible at `GET /api/ip`

- [ ] Task 2: Create server-side IP extraction utility (AC: 2, 5, 6)
  - [ ] Create `server/utils/ipExtraction.ts` for server-specific IP logic
  - [ ] Implement `extractClientIp(event)` function with header priority chain
  - [ ] Handle `x-forwarded-for` with multiple IPs (take first, trim whitespace)
  - [ ] Handle missing IP: return `null` (let endpoint decide error behavior)
  - [ ] Import and use `normalizeIP()` and `isPrivateIP()` from shared utils

- [ ] Task 3: Implement error handling (AC: 5, 6)
  - [ ] If no IP detected, throw `createError({ statusCode: 400, message: 'Unable to detect IP address' })`
  - [ ] If IP extraction throws, throw `createError({ statusCode: 500, message: 'Internal server error' })`
  - [ ] Log errors server-side for debugging (console.error)

- [ ] Task 4: Write unit tests (AC: 9, 10)
  - [ ] Create `tests/unit/server/api/ip.get.test.ts`
  - [ ] Test: extracts IP from `x-forwarded-for` header (first IP)
  - [ ] Test: extracts IP from `x-real-ip` header
  - [ ] Test: extracts IP from `cf-connecting-ip` header
  - [ ] Test: handles multiple IPs in `x-forwarded-for` (takes first)
  - [ ] Test: normalizes `::ffff:` prefixed IPs
  - [ ] Test: returns `{ ip: "x.x.x.x" }` format
  - [ ] Test: returns 400 error when no IP detected
  - [ ] Test: returns 500 error on internal failure
  - [ ] Create `tests/unit/server/utils/ipExtraction.test.ts`
  - [ ] Test: header priority chain works correctly
  - [ ] Test: private IP detection works with server context

- [ ] Task 5: Write E2E tests (AC: 11, 12)
  - [ ] Create `tests/e2e/api/ip-endpoint.spec.ts`
  - [ ] Test: `GET /api/ip` returns 200 with valid JSON
  - [ ] Test: response contains `ip` field with string value
  - [ ] Test: IP format matches IPv4 or IPv6 pattern
  - [ ] Test: response time is under 100ms
  - [ ] Test: response Content-Type is application/json

## Dev Notes

### Business Context

Story 2.1 is the **first story in Epic 2** (Core IP Detection & Responsive UI). It creates the foundational server API endpoint that all subsequent stories depend on. This is the core backend for the entire application.

**Story Sequence (Epic 2):**
- **Story 2.1 (current)**: Create Server API Endpoint for IP Detection
- Story 2.2 (next): Create IP Display Component with SSR (depends on 2.1)
- Story 2.3: Implement Responsive Layout
- Story 2.4: Implement Dark Mode with Auto OS Detection
- Story 2.5: Add Manual Dark/Light Mode Toggle
- Story 2.6: Implement Basic Accessibility

**Why This Matters:**
- FR1: Visitors can view their public IP address automatically upon page load
- NFR-P13: IP detection API endpoint must respond within 500ms
- This endpoint is consumed by Story 2.2 (IpDisplay component + useIpDetection composable)

### Technical Requirements

**CRITICAL: REUSE EXISTING CODE - DO NOT RECREATE**

The following utilities ALREADY EXIST in `app/utils/ipValidation.ts`:
- `normalizeIP(ip)` - Strips `::ffff:` prefix from IPv4-mapped IPv6 addresses
- `isPrivateIP(ip)` - Detects all private IP ranges (10.x, 172.16-31.x, 192.168.x, 127.x, 169.254.x, fc00::/7, fe80::/10, ::1)
- `isValidIPv4(ip)` - Validates IPv4 format

These are already unit-tested in `tests/unit/utils/ipValidation.test.ts`. Import and reuse them.

**Server API Route Pattern (Nuxt 4 / Nitro):**

```typescript
// server/api/ip.get.ts
export default defineEventHandler(async (event) => {
  // Extract and return IP
})
```

**IP Extraction Header Priority (from project-context.md):**
1. `x-forwarded-for` header (take FIRST IP only, split by comma)
2. `x-real-ip` header
3. `cf-connecting-ip` header (Cloudflare)
4. `getRequestIP(event, { xForwardedFor: true })` fallback

**Response Format (Architecture: direct response, no wrapper):**
```json
{ "ip": "203.0.113.42" }
```

**Error Format (Architecture: createError):**
```typescript
throw createError({
  statusCode: 400,
  message: 'Unable to detect IP address'
})
```

**Nuxt 4.3 Specifics:**
- `defineEventHandler()` is the standard (NOT `defineCachedEventHandler` - no caching needed for IP endpoint, caching is for geolocation in Story 3.1)
- `getRequestIP(event, { xForwardedFor: true })` enables proxy header support
- `getHeader(event, 'header-name')` to read specific headers
- TypeScript `noUncheckedIndexedAccess` is enabled by default in server code - use explicit null checks
- Use `setResponseStatus(event, code)` for status codes (Web API naming)

**CRITICAL: IPv6 Normalization**
- Vercel and other proxies may send `::ffff:192.168.1.1` format
- MUST strip `::ffff:` prefix using existing `normalizeIP()` before returning
- This is already handled - just import and call it

**CRITICAL: x-forwarded-for Handling**
- Header may contain multiple IPs: `"203.0.113.42, 70.41.3.18, 150.172.238.178"`
- MUST take the FIRST IP only (client's real IP)
- Split by comma, take index 0, trim whitespace

### Architecture Compliance

**Naming Conventions:**
- File: `server/api/ip.get.ts` (lowercase, HTTP method suffix)
- Server utility: `server/utils/ipExtraction.ts` (camelCase)
- Function: `extractClientIp()` (camelCase, verb-first)
- Response fields: camelCase (`ip`, not `IP` or `ip_address`)

**Error Handling Pattern (Three-Layer):**
- Layer 1 (this story): Server API uses `createError()` for HTTP errors
- Layer 2 (Story 2.2): Composable catches errors, sets error ref
- Layer 3 (later): Global error handler logs to Sentry

**API Response Format:**
- Direct response (NO wrapper like `{ success: true, data: {...} }`)
- HTTP status codes indicate success/failure
- Error format: `{ statusCode: number, message: string }`

**TypeScript Strict Mode:**
- NO `any` types
- Explicit return types for exported functions
- Null checks required (`getRequestIP` may return `undefined`)
- Use existing `IpAddress` type from `types/index.ts`

### Library & Framework Requirements

| Technology | Version | Usage |
|---|---|---|
| Nuxt | 4.3 | Framework (Nitro server engine) |
| H3 | (bundled with Nitro) | `defineEventHandler`, `getRequestIP`, `getHeader`, `createError` |
| TypeScript | Strict mode | Type safety, no `any` |

**NO additional dependencies needed.** All required utilities are built into Nuxt/Nitro/H3.

**DO NOT install:** Express, Fastify, or any external HTTP framework. Nuxt Nitro handles everything.

### File Structure Requirements

**Files to CREATE:**

```
server/
├── api/
│   └── ip.get.ts              # NEW - IP detection endpoint
└── utils/
    └── ipExtraction.ts        # NEW - Server-side IP extraction utility
tests/
├── unit/
│   └── server/
│       ├── api/
│       │   └── ip.get.test.ts      # NEW - Endpoint unit tests
│       └── utils/
│           └── ipExtraction.test.ts # NEW - IP extraction unit tests
└── e2e/
    └── api/
        └── ip-endpoint.spec.ts      # NEW - E2E endpoint tests
```

**Files to MODIFY:**
- None. This story only creates new files.

**Files to REUSE (DO NOT MODIFY):**
- `app/utils/ipValidation.ts` - Import `normalizeIP()`, `isPrivateIP()`, `isValidIPv4()`
- `types/index.ts` - Import `IpAddress` type (extend if needed for API response type)

**Files that ALREADY EXIST (do not recreate):**
- `server/api/.gitkeep` - Will be replaced by actual files
- `server/utils/.gitkeep` - Will be replaced by actual files
- `server/middleware/.gitkeep` - Not touched in this story

### Testing Requirements

**Unit Tests (`tests/unit/server/`):**
- Environment: `nuxt` with `happy-dom`
- Mock `getRequestIP`, `getHeader` from H3
- Test file naming: `*.test.ts`
- Coverage: All branches of IP extraction logic
- Follow existing test patterns from `tests/unit/utils/ipValidation.test.ts`

**E2E Tests (`tests/e2e/api/`):**
- Framework: Playwright
- Test file naming: `*.spec.ts`
- Test against running dev server (`http://localhost:3000`)
- Validate HTTP response codes, headers, and body format

**Test Naming Convention:**
- Pattern: `should [action] [expected result] [context]`
- Example: `should extract first IP from x-forwarded-for header`

**Mock Guidelines:**
- Mock H3 utilities (`getRequestIP`, `getHeader`, `createError`)
- DO NOT mock `normalizeIP`/`isPrivateIP` - test with real implementations
- Use `vi.fn()` for function mocks, clear in `beforeEach()`

### Previous Story Intelligence

**From Epic 1 (completed):**
- All 7 stories completed successfully
- Node.js upgraded to >= 24.0.0 (critical - was 18.x before)
- Bun 1.3.8 is the package manager
- CI/CD pipeline fully operational (lint, typecheck, unit, e2e, build)
- Vercel deployment working (auto-deploy on push to main)
- `app/utils/ipValidation.ts` created in Story 1.1 with comprehensive IP utilities
- Test patterns established in `tests/unit/utils/ipValidation.test.ts`

**Commit Convention (from git history):**
- `feat:` for new features
- `fix:` for corrections
- `docs:` for documentation
- Co-author: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

**Expected Commit:**
```bash
git commit -m "feat: create server API endpoint for IP detection

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Git Intelligence Summary

**Recent Commits (last 5):**
```
cecdeec fix: update Live Demo URL to production domain
a3821db fix: correct Live Demo URL to actual Vercel deployment
dd4c23c fix: address code review findings for story 1-7 README
b1ff8a9 Merge pull request #14 from mathieumaf/docs/create-readme-and-license
f8e257f docs: create comprehensive README with installation instructions
```

**Branch Pattern:** `feat/<description>` for new features
**Expected Branch:** `feat/server-api-ip-detection`

### Latest Technical Information

**Nuxt 4.3 Server Route Updates (February 2026):**
- `defineEventHandler()` remains the standard approach
- `getRequestIP(event, { xForwardedFor: true })` enables proxy header support
- Web API naming migration: use `setResponseStatus(event, code)` instead of `event.node.res.statusCode`
- `noUncheckedIndexedAccess` enabled by default in server TypeScript config - requires explicit null/undefined checks
- New `#server` alias available for clean server-side imports
- H3 utilities auto-imported in server directory (no manual imports needed for `defineEventHandler`, `getRequestIP`, `getHeader`, `createError`)

**Security Note:**
- `xForwardedFor: true` is safe for Vercel deployment (trusted proxy)
- Always validate/normalize IP before returning to client

### Project Structure Notes

- Aligns with architecture: flat `server/api/` and `server/utils/` structure
- Tests follow established pattern: `tests/unit/` mirrors source, `tests/e2e/` for integration
- No conflicts with existing files detected
- `.gitkeep` files in server directories will be superseded by real files

### Critical Don't-Miss Rules

- **DO NOT** recreate IP validation utilities - REUSE from `app/utils/ipValidation.ts`
- **DO NOT** use `defineCachedEventHandler()` for this endpoint (caching is for geolocation, Story 3.1)
- **DO NOT** use `any` type - TypeScript strict mode is enforced
- **DO NOT** manually import Nuxt/H3 auto-imports in server directory
- **DO NOT** return wrapped response `{ success: true, data: { ip: "..." } }` - use direct format
- **DO** use `getRequestIP(event, { xForwardedFor: true })` for Vercel proxy support
- **DO** normalize IPv6 addresses with `normalizeIP()` before returning
- **DO** handle `x-forwarded-for` with multiple IPs (take first only)
- **DO** use `createError()` for error responses (not manual status codes)
- **DO** follow existing test patterns from `tests/unit/utils/ipValidation.test.ts`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#story-2.1] - Acceptance criteria and user story
- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md#api-communication-patterns] - API caching, rate limiting, response format
- [Source: _bmad-output/planning-artifacts/architecture/implementation-patterns-consistency-rules.md] - Naming conventions, structure patterns, error handling
- [Source: _bmad-output/project-context.md] - IP detection gotchas, header priority, critical rules
- [Source: app/utils/ipValidation.ts] - Existing IP utilities to reuse (normalizeIP, isPrivateIP, isValidIPv4)
- [Source: tests/unit/utils/ipValidation.test.ts] - Established test patterns to follow
- [Source: types/index.ts] - Existing IpAddress type and GeolocationData interface
- [Source: nuxt.config.ts] - Current Nuxt configuration (modules, runtimeConfig)

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
