# Story 2.2: Create IP Display Component with SSR

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see my IP address displayed prominently on the page immediately upon load,
so that I get instant value without waiting for client-side JavaScript.

## Acceptance Criteria

1. A new component `app/components/IpDisplay.vue` is created using NuxtUI `UCard`
2. A composable `app/composables/useIpDetection.ts` is created for business logic
3. The composable fetches IP from `/api/ip` endpoint using `useFetch` with `server: false`
4. The composable returns `ipAddress`, `loading`, and `error` refs (readonly)
5. The composable implements try/catch/finally error handling pattern (architecture pattern)
6. The index page (`app/pages/index.vue`) is updated to use the IpDisplay component
7. IP is displayed with large, prominent typography (text-4xl on mobile, text-6xl on desktop)
8. Loading state shows skeleton screen (`USkeleton`) while fetching
9. Error state displays friendly message with "Try Again" button using `UAlert`
10. Component uses semantic HTML (`<main>`, `<section>`)
11. Unit tests validate the composable logic (state management, error handling, loading states)
12. E2E tests validate IP is visible in rendered HTML after client-side hydration
13. **SSR Note:** IP is fetched client-side only (`server: false`) because SSR would capture the server's IP, not the visitor's. SSR renders the loading skeleton, client hydrates with real IP.

## Tasks / Subtasks

- [ ] Task 1: Create `app/composables/useIpDetection.ts` composable (AC: 2, 3, 4, 5)
  - [ ] Create composable following `useFeatureName` pattern
  - [ ] Use `useFetch('/api/ip', { server: false })` to fetch visitor IP (NOT server IP)
  - [ ] Expose `ipAddress` (readonly ref), `loading` (readonly ref), `error` (readonly ref)
  - [ ] Expose `refresh()` method for manual re-fetch
  - [ ] Implement three-layer error handling: catch errors → set error ref → let component display
  - [ ] Use `try/finally` pattern for loading state cleanup
  - [ ] TypeScript strict: explicit types, no `any`, explicit return type

- [ ] Task 2: Create `app/components/IpDisplay.vue` component (AC: 1, 7, 8, 9, 10)
  - [ ] Use `<script setup lang="ts">` (Composition API only)
  - [ ] Consume `useIpDetection()` composable
  - [ ] Wrap in NuxtUI `UCard` component (no raw Tailwind card markup)
  - [ ] Display IP with prominent typography: `text-4xl` mobile → `text-6xl` desktop (via responsive Tailwind classes)
  - [ ] Use monospace font for IP address (`font-mono`)
  - [ ] Show `USkeleton` when loading (matches final IP dimensions)
  - [ ] Show `UAlert` with color="red", variant="soft", "Try Again" button when error
  - [ ] Semantic HTML: wrap in `<section>` with appropriate ARIA attributes
  - [ ] NuxtUI handles dark mode automatically (no manual `dark:` classes)

- [ ] Task 3: Update `app/pages/index.vue` (AC: 6, 10)
  - [ ] Replace placeholder content with IpDisplay component
  - [ ] Use `<main>` semantic wrapper
  - [ ] Maintain clean page structure (component does the heavy lifting)

- [ ] Task 4: Write unit tests for `useIpDetection` composable (AC: 11)
  - [ ] Create `tests/unit/composables/useIpDetection.test.ts`
  - [ ] Test: initial state (empty ipAddress, loading true, error null)
  - [ ] Test: successful IP fetch → ipAddress populated, loading false, error null
  - [ ] Test: failed fetch → error set, loading false, ipAddress empty
  - [ ] Test: refresh triggers new fetch
  - [ ] Test: loading state properly managed with try/finally
  - [ ] Mock `useFetch` using Nuxt test utilities
  - [ ] Follow test naming: "should [action] [expected result] [context]"

- [ ] Task 5: Write E2E tests for IP display (AC: 12)
  - [ ] Create `tests/e2e/ip-display.spec.ts`
  - [ ] Test: page loads and displays IP address (wait for client-side fetch)
  - [ ] Test: IP format matches IPv4 or IPv6 pattern
  - [ ] Test: loading skeleton is shown initially (before JS hydration)
  - [ ] Test: error state shows retry button when API fails
  - [ ] Use `data-testid` attributes for stable selectors

## Dev Notes

### Business Context

Story 2.2 is the **second story in Epic 2** (Core IP Detection & Responsive UI). It creates the frontend display for the IP address, consuming the server API endpoint created in Story 2.1. This is the first user-facing feature of the application.

**Story Sequence (Epic 2):**
- Story 2.1 (done): Create Server API Endpoint for IP Detection
- **Story 2.2 (current)**: Create IP Display Component with SSR
- Story 2.3 (next): Implement Responsive Layout (depends on 2.2)
- Story 2.4: Implement Dark Mode with Auto OS Detection
- Story 2.5: Add Manual Dark/Light Mode Toggle
- Story 2.6: Implement Basic Accessibility

**Why This Matters:**
- FR1: Visitors can view their public IP address automatically upon page load
- NFR-U6: All user actions must provide immediate visual feedback
- NFR-U7: Loading states must be clearly indicated during data fetching
- NFR-U8: Error states must provide clear, actionable guidance to users
- This component is the hero element of the entire application

**CRITICAL SSR DECISION:**
The AC in the epics file states "IP address is rendered server-side (visible in view-source without JavaScript)." However, this is **impossible** because:
- During SSR, `useFetch('/api/ip')` calls the endpoint internally on the server
- The server-side call does NOT have the visitor's real IP headers in all deployment scenarios
- This would display the SERVER's IP, not the visitor's IP
- Project context explicitly mandates: `server: false` for IP detection

**Resolution:** IP is fetched **client-side only** (`server: false`). SSR renders a loading skeleton. Client hydrates and displays the real visitor IP. This is the architecturally correct behavior documented in `project-context.md`.

### Technical Requirements

**Composable Pattern (from architecture):**

```typescript
// app/composables/useIpDetection.ts
export const useIpDetection = () => {
  const { data, status, error: fetchError, refresh } = useFetch('/api/ip', {
    server: false,  // CRITICAL: Fetch client-side to get VISITOR IP, not server IP
  })

  const ipAddress = computed(() => data.value?.ip ?? '')
  const loading = computed(() => status.value === 'pending')
  const error = computed(() => fetchError.value)

  return {
    ipAddress: readonly(ipAddress),
    loading: readonly(loading),
    error: readonly(error),
    refresh,
  }
}
```

**Component Pattern (from architecture):**

```vue
<!-- app/components/IpDisplay.vue -->
<template>
  <section aria-label="IP address display">
    <UCard>
      <USkeleton v-if="loading" class="h-12 w-48 mx-auto" />
      <UAlert
        v-else-if="error"
        color="red"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        title="Unable to detect IP"
        description="We couldn't determine your IP address."
        :actions="[{ label: 'Try Again', click: () => refresh() }]"
      />
      <p v-else class="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center">
        {{ ipAddress }}
      </p>
    </UCard>
  </section>
</template>
```

**CRITICAL: IP Detection via `server: false`**
- `useFetch('/api/ip', { server: false })` ensures the browser makes the request
- The browser's request includes proper `x-forwarded-for` headers from Vercel edge
- This captures the VISITOR's real IP, not the Vercel server IP
- Trade-off: No SSR for IP value, but this is the only correct approach

**Nuxt 4 `useFetch` with `server: false` behavior:**
- During SSR: Returns `null` data, `status: 'idle'`
- On client hydration: Automatically triggers the fetch
- Data becomes available after client-side fetch completes
- `status` transitions: `'idle'` → `'pending'` → `'success'` / `'error'`

### Architecture Compliance

**Naming Conventions:**
- Composable: `useIpDetection.ts` (`useFeatureName` pattern)
- Component: `IpDisplay.vue` (PascalCase, no prefix)
- File location: `app/composables/` and `app/components/` (flat structure)

**Error Handling (Three-Layer Pattern):**
- Layer 1 (Story 2.1 - done): Server API uses `createError()` for HTTP errors
- **Layer 2 (this story):** Composable exposes error ref, component displays friendly UI
- Layer 3 (future): Global error handler logs to Sentry

**API Response Format (consumed from Story 2.1):**
- Direct response: `{ ip: "203.0.113.42" }` (no wrapper)
- Error: `{ statusCode: 400, message: "Unable to detect IP address" }`

**State Management:**
- Use `useFetch` reactive return values (`data`, `status`, `error`, `refresh`)
- Expose via computed refs with `readonly()` wrapper
- No Pinia (architecture: composables sufficient)

**NuxtUI Usage:**
- `UCard` for container (handles dark mode automatically)
- `USkeleton` for loading placeholder
- `UAlert` for error state with action button
- Icons: `i-heroicons-exclamation-triangle` for error
- NO raw Tailwind card markup - use NuxtUI components

**TypeScript Strict Mode:**
- NO `any` types
- Explicit return types for exported composable
- Type the API response: `{ ip: string }`
- Use computed + readonly for reactive refs

### Library & Framework Requirements

| Technology | Version | Usage |
|---|---|---|
| Nuxt | 4.3 | Framework (`useFetch`, auto-imports) |
| NuxtUI | 4.4.0 | `UCard`, `USkeleton`, `UAlert` components |
| Vue | 3.5.27 | Composition API, `<script setup>` |
| TypeScript | Strict | Type safety, no `any` |

**NO additional dependencies needed.** All required is built into Nuxt/NuxtUI.

**DO NOT install:** Any state management library (Pinia, Vuex). Composables are sufficient.

**NuxtUI v4 Component Notes:**
- `UCard`: Has `header`, `default`, `footer` slots. Variants: `solid`, `outline` (default), `soft`, `subtle`
- `USkeleton`: Simple pulsing placeholder. Props: `as` (element type), `ui` (styling)
- `UAlert`: Props: `color`, `variant`, `icon`, `title`, `description`, `actions[]`

### File Structure Requirements

**Files to CREATE:**

```text
app/
├── components/
│   └── IpDisplay.vue                 # NEW - IP display component
└── composables/
    └── useIpDetection.ts             # NEW - IP detection composable
tests/
├── unit/
│   └── composables/
│       └── useIpDetection.test.ts    # NEW - Composable unit tests
└── e2e/
    └── ip-display.spec.ts            # NEW - E2E display tests
```

**Files to MODIFY:**
- `app/pages/index.vue` - Replace placeholder with IpDisplay component

**Files to REUSE (DO NOT MODIFY):**
- `server/api/ip.get.ts` - Consumes this endpoint (Story 2.1)
- `server/utils/ipExtraction.ts` - Used by the API endpoint
- `app/utils/ipValidation.ts` - May be useful for client-side IP format validation
- `types/index.ts` - `IpAddress` type available for use

**Files that ALREADY EXIST (do not recreate):**
- `app/components/.gitkeep` - Will be superseded by real component files
- `app/composables/.gitkeep` - Will be superseded by real composable files

### Testing Requirements

**Unit Tests (`tests/unit/composables/useIpDetection.test.ts`):**
- Environment: `nuxt` with `happy-dom`
- Mock `useFetch` composable from Nuxt
- Test initial state (loading: pending on client, no data)
- Test successful response handling
- Test error response handling
- Test refresh triggers re-fetch
- Follow existing patterns from `tests/unit/server/api/ip.get.test.ts`
- Coverage: All branches (success, error, loading states)

**E2E Tests (`tests/e2e/ip-display.spec.ts`):**
- Framework: Playwright
- Test against running dev server (`http://localhost:3000`)
- Wait for client-side hydration before checking IP
- Validate IP format (IPv4/IPv6) using regex or `net.isIP`
- Test that skeleton/loading is shown briefly
- Test error state (mock API failure if possible)
- Use `data-testid` for stable selectors

**Test Naming Convention:**
- Pattern: `should [action] [expected result] [context]`
- Example: `should display IP address after client-side fetch`

**Mock Guidelines:**
- Mock `useFetch` for unit tests (return controlled data/status/error)
- DO NOT mock in E2E tests - test real server behavior
- Use `vi.fn()` for function mocks, clear in `beforeEach()`

### Previous Story Intelligence

**From Story 2.1 (done):**
- `server/api/ip.get.ts` endpoint returns `{ ip: string }` format
- `server/utils/ipExtraction.ts` handles header priority chain
- All 84 unit tests passing, all 9 E2E tests passing
- **Debug learnings:**
  - `~` alias resolves to `app/` directory, not project root
  - H3 auto-imports not available in Vitest Nuxt environment
  - Used `vi.hoisted()` to define globals before module load
  - Mocking dependencies (like `extractClientIp`) is cleaner than mocking H3 globals
- Response time: < 500ms (NFR-P13 compliant)
- Error responses: 400 (missing IP), 500 (internal error) using `createError()`

**From Epic 1 (completed):**
- Node.js >= 24.0.0, Bun 1.3.8
- CI/CD pipeline operational (lint, typecheck, unit, e2e, build)
- Vercel deployment auto-deploys on push to main
- Test patterns established in `tests/unit/`

### Git Intelligence Summary

**Recent Commits:**
```text
3a19f18 feat: server API endpoint for IP detection (Story 2.1) (#17)
58596c8 Merge pull request #16 from mathieumaf/fix/code-review-story-1-7
cecdeec fix: update Live Demo URL to production domain
```

**Files created in Story 2.1 (relevant to this story):**
- `server/api/ip.get.ts` - The endpoint this story consumes
- `server/utils/ipExtraction.ts` - IP extraction utility

**Branch Convention:** `feat/<description>`
**Expected Branch:** `feat/ip-display-component`

**Commit Convention:**
```bash
git commit -m "feat: IP display component with useIpDetection composable

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Latest Technical Information

**NuxtUI v4.4.0 (February 2026):**
- `UCard`: Three slots (header, default, footer), four variants (solid, outline, soft, subtle)
- `USkeleton`: Simple pulsing placeholder with `animate-pulse rounded-md bg-elevated`
- `UAlert`: Full action support via `actions` prop array with click handlers
- Dark mode handled automatically by NuxtUI (no manual `dark:` classes needed)

**Nuxt 4.3 useFetch with `server: false`:**
- During SSR: data is `null`, status is `'idle'`
- On client mount: fetch triggers automatically
- Status transitions: `'idle'` → `'pending'` → `'success'` or `'error'`
- Returns: `{ data, status, error, refresh, clear }`
- `refresh()` re-triggers the fetch manually

**Nuxt 4.3 Auto-Imports:**
- `useFetch`, `ref`, `computed`, `readonly`, `onMounted` - all auto-imported
- Do NOT manually import these from `vue` or `nuxt`
- `$fetch` also available for manual calls (but `useFetch` preferred for component data)

### Project Structure Notes

- Aligns with architecture: flat `app/components/` and `app/composables/` structure
- Tests follow established pattern: `tests/unit/composables/` mirrors source
- No conflicts with existing files detected
- `.gitkeep` files in components/composables directories will be superseded

### Critical Don't-Miss Rules

- **DO NOT** use `server: true` (default) for IP detection - this captures the SERVER IP
- **DO NOT** use `$fetch` directly in composable - use `useFetch` for reactive data
- **DO NOT** use `any` type - TypeScript strict mode enforced
- **DO NOT** manually import Nuxt auto-imports (`ref`, `computed`, `useFetch`, etc.)
- **DO NOT** use raw Tailwind card markup - use NuxtUI `UCard` component
- **DO NOT** use `dark:` classes manually - NuxtUI handles dark mode
- **DO NOT** throw errors from composable - set error ref instead (three-layer pattern)
- **DO** use `server: false` in `useFetch()` for visitor IP detection
- **DO** use `readonly()` for exposed reactive state
- **DO** use `USkeleton` matching final content dimensions for loading state
- **DO** provide "Try Again" button on error states (UX pattern)
- **DO** use `data-testid` attributes for E2E test selectors
- **DO** use semantic HTML (`<main>`, `<section>`, proper headings)
- **DO** follow existing test patterns from Story 2.1

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.2] - Acceptance criteria and user story
- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md#frontend-architecture] - Component architecture, composable pattern, error handling
- [Source: _bmad-output/planning-artifacts/architecture/implementation-patterns-consistency-rules.md] - Naming conventions, structure patterns, error/loading patterns
- [Source: _bmad-output/project-context.md#critical-implementation-rules] - IP detection gotchas, server: false requirement, NuxtUI migration rules
- [Source: _bmad-output/planning-artifacts/ux-design-specification/ux-consistency-patterns.md] - Loading states, error states, button hierarchy, toast notifications
- [Source: _bmad-output/planning-artifacts/ux-design-specification/ux-pattern-analysis-inspiration.md] - IP as hero display, self-explanatory interface, performance-as-quality
- [Source: _bmad-output/planning-artifacts/prd.md#functional-requirements] - FR1 (IP detection), FR10-FR20 (UI/accessibility)
- [Source: _bmad-output/implementation-artifacts/2-1-create-server-api-endpoint-for-ip-detection.md] - Previous story learnings, debug notes, established patterns
- [Source: server/api/ip.get.ts] - Endpoint this story consumes
- [Source: types/index.ts] - Existing IpAddress type
- [Source: app/pages/index.vue] - Current placeholder page to update

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
