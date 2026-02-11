# Story 2.3: Implement Responsive Layout (Mobile, Tablet, Desktop)

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the application to work seamlessly on any device,
so that I have a great experience whether on mobile, tablet, or desktop.

## Acceptance Criteria

1. Layout is mobile-first (320px minimum width)
2. `UContainer` component provides consistent padding and max-width
3. Mobile (320-639px): Single-column layout, 16px padding, full-width card
4. Tablet (640-1023px): Centered layout, 24px padding, max-width 640px
5. Desktop (1024px+): Centered layout, 32px padding, max-width 1280px
6. IP typography scales: 32px mobile (text-3xl) → 48px tablet (text-5xl) → 64px desktop (text-6xl)
7. Spacing scales: 16px mobile (space-y-4) → 24px tablet (space-y-6) → 32px desktop (space-y-8)
8. No horizontal scrolling occurs at any breakpoint
9. Content is readable at all breakpoints
10. Touch targets are minimum 48px on mobile, 44px on desktop
11. Layout transitions smoothly between breakpoints without jarring shifts
12. E2E tests validate layout at 375px (mobile), 768px (tablet), 1280px (desktop)
13. Lighthouse scores "mobile-friendly" on mobile viewport
14. CLS (Cumulative Layout Shift) is < 0.1 during breakpoint transitions

## Tasks / Subtasks

- [x] Task 1: Update `app/layouts/default.vue` with `UContainer` (AC: 2, 3, 4, 5)
  - [x] Wrap `<slot />` in `UContainer` for consistent padding and max-width
  - [x] Configure responsive padding: `px-4` mobile → `sm:px-6` tablet → `lg:px-8` desktop
  - [x] UContainer provides max-width and `mx-auto` centering automatically
  - [x] Ensure `min-h-screen` for full viewport height

- [x] Task 2: Update `app/pages/index.vue` with responsive layout structure (AC: 1, 7, 8, 11)
  - [x] Maintain `<main>` semantic wrapper with flexbox centering
  - [x] Add responsive spacing: `space-y-4 sm:space-y-6 lg:space-y-8`
  - [x] Add responsive vertical padding: `py-8 sm:py-12 lg:py-16`
  - [x] Ensure no horizontal overflow with `overflow-x-hidden` if needed
  - [x] Ensure smooth layout transitions (no jarring shifts between breakpoints)

- [x] Task 3: Update `app/components/IpDisplay.vue` responsive typography (AC: 6, 9, 10, 11)
  - [x] Change IP typography to: `text-3xl sm:text-5xl lg:text-6xl` (was `text-4xl md:text-5xl lg:text-6xl`)
  - [x] Ensure skeleton dimensions scale with typography at each breakpoint
  - [x] Ensure UCard is full-width on mobile, properly sized on tablet/desktop
  - [x] Verify "Try Again" button meets touch target requirements (48px mobile, 44px desktop)
  - [x] Maintain `font-mono font-bold text-center` across all breakpoints

- [x] Task 4: Write E2E tests for responsive layout (AC: 12, 13, 14)
  - [x] Create `tests/e2e/responsive-layout.spec.ts`
  - [x] Test at 375px viewport: single-column layout, full-width card, readable text
  - [x] Test at 768px viewport: centered layout, proper padding, scaled typography
  - [x] Test at 1280px viewport: centered layout, max-width respected, large typography
  - [x] Test no horizontal scrollbar at each viewport size
  - [x] Test content readability (IP address visible at each breakpoint)
  - [x] Test CLS < 0.1 (no layout shift on load)
  - [x] Use `data-testid` attributes for stable selectors

## Dev Notes

### Business Context

Story 2.3 is the **third story in Epic 2** (Core IP Detection & Responsive UI). It transforms the current basic centered layout into a fully responsive, mobile-first design that adapts across all device sizes. This is critical for the portfolio showcase — Marc (Lead Dev) and Sarah (Recruiter) will evaluate the app on multiple devices.

**Story Sequence (Epic 2):**
- Story 2.1 (done): Create Server API Endpoint for IP Detection
- Story 2.2 (done): Create IP Display Component with SSR
- **Story 2.3 (current)**: Implement Responsive Layout (Mobile, Tablet, Desktop)
- Story 2.4 (next): Implement Dark Mode with Auto OS Detection
- Story 2.5: Add Manual Dark/Light Mode Toggle
- Story 2.6: Implement Basic Accessibility

**Why This Matters:**
- FR15: Visitors can view the application on mobile devices (320px width minimum)
- FR16: Visitors can view the application on tablet devices
- FR17: Visitors can view the application on desktop devices (up to 1280px+ width)
- FR19: Touch targets meet minimum size requirements (44x44px)
- NFR-U1: Application fully functional on mobile (320px minimum)
- NFR-U2: Application adapts layout for tablet (640px-1024px)
- NFR-U3: Application optimizes layout for desktop (1024px+)
- NFR-U4: No horizontal scrolling at any breakpoint
- NFR-P4: CLS < 0.1

**Portfolio Impact:** Sarah (Recruiter) explicitly resizes the browser window to check responsive — a broken mobile layout means instant disqualification. Marc uses DevTools to verify responsive behavior.

### Technical Requirements

**Current State (from Story 2.2):**

```vue
<!-- app/pages/index.vue (current) -->
<template>
  <main class="flex min-h-screen items-center justify-center">
    <IpDisplay />
  </main>
</template>
```

```vue
<!-- app/layouts/default.vue (current) -->
<template>
  <div>
    <slot />
  </div>
</template>
```

```vue
<!-- app/components/IpDisplay.vue (current typography) -->
<p class="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center">
```

**Target State:**

The layout needs `UContainer` for responsive width/padding management, with scaled typography and spacing.

**Breakpoints (Tailwind defaults aligned with AC):**
- Mobile: `< 640px` (default, no prefix)
- Tablet: `sm:` (640px+) — note: AC says 640-1023px
- Desktop: `lg:` (1024px+) — note: AC says 1024px+

**UContainer (NuxtUI v4.4.0):**

```vue
<UContainer>
  <!-- Content is centered, max-width constrained, responsive padding applied -->
</UContainer>
```

- Default: `mx-auto w-full`, responsive padding via `--ui-container` CSS variable
- Built-in responsive padding: `px-4 sm:px-6 lg:px-8`
- Customizable via `ui` prop: `<UContainer :ui="{ base: 'max-w-5xl' }" />`

**Typography Scale (from AC):**

| Breakpoint | IP Font Size | Tailwind Class | Computed |
|---|---|---|---|
| Mobile (320-639px) | 32px | `text-3xl` | 1.875rem |
| Tablet (640-1023px) | 48px | `sm:text-5xl` | 3rem |
| Desktop (1024px+) | 64px | `lg:text-6xl` | 3.75rem |

**Spacing Scale (from AC):**

| Breakpoint | Spacing | Tailwind Class |
|---|---|---|
| Mobile | 16px | `space-y-4` / `gap-4` |
| Tablet | 24px | `sm:space-y-6` / `sm:gap-6` |
| Desktop | 32px | `lg:space-y-8` / `lg:gap-8` |

**CRITICAL: Typography Change from Story 2.2**
- Story 2.2 implemented `text-4xl md:text-5xl lg:text-6xl`
- AC for Story 2.3 requires `text-3xl sm:text-5xl lg:text-6xl`
- This is a **deliberate change** — mobile gets 32px (not 36px), tablet breakpoint shifts from `md:` (768px) to `sm:` (640px)

### Architecture Compliance

**Responsive Design (from PRD/Architecture):**
- Mobile-first approach (build for smallest screen, enhance upward)
- Breakpoints: Mobile (320-639px), Tablet (640-1023px), Desktop (1024-1279px), Large Desktop (1280px+)
- Single-column centered layout across all devices
- Touch targets: 48px mobile, 44px desktop
- Fluid spacing/typography

**NuxtUI Usage:**
- `UContainer` for layout wrapping (handles padding/centering)
- `UCard` already handles dark mode automatically
- NO raw container implementations — use NuxtUI component
- NuxtUI responsive padding is default behavior

**Component Modification Rules:**
- Only modify layout/styling — do NOT change business logic
- Keep `useIpDetection()` composable untouched
- Keep error/loading/success state logic untouched
- Only adjust Tailwind responsive classes

**Semantic HTML:**
- `<main>` wrapper on page (Story 2.2 — keep)
- `<section>` wrapper on IpDisplay (Story 2.2 — keep)
- ARIA attributes remain unchanged

### Library & Framework Requirements

| Technology | Version | Usage |
|---|---|---|
| Nuxt | 4.3 | Framework, SSR |
| NuxtUI | 4.4.0 | `UContainer`, `UCard` components |
| Tailwind CSS | (via NuxtUI) | Responsive utility classes |

**NO additional dependencies needed.** All required is built into Nuxt/NuxtUI/Tailwind.

**DO NOT install:** Any CSS framework, grid library, or responsive utility package. Tailwind handles everything.

### File Structure Requirements

**Files to MODIFY:**

```text
app/
├── layouts/
│   └── default.vue              # MODIFY - Add UContainer wrapper
├── pages/
│   └── index.vue                # MODIFY - Add responsive spacing/padding
└── components/
    └── IpDisplay.vue            # MODIFY - Adjust typography scale per AC
tests/
└── e2e/
    └── responsive-layout.spec.ts  # NEW - Responsive E2E tests
```

**Files to NOT MODIFY:**
- `app/composables/useIpDetection.ts` — Business logic untouched
- `server/api/ip.get.ts` — Backend untouched
- `nuxt.config.ts` — No config changes needed
- `tests/unit/composables/useIpDetection.test.ts` — Logic unchanged
- `tests/e2e/ip-display.spec.ts` — Existing tests remain valid

### Testing Requirements

**E2E Tests (`tests/e2e/responsive-layout.spec.ts`):**
- Framework: Playwright
- Test across 3 viewport sizes: 375x667 (mobile), 768x1024 (tablet), 1280x720 (desktop)
- Use `page.setViewportSize()` to change viewports
- Validate IP is visible at each viewport
- Validate no horizontal scrollbar (`document.documentElement.scrollWidth <= document.documentElement.clientWidth`)
- Validate content doesn't overflow
- Use `data-testid` for stable selectors

**Test Naming Convention:**
- Pattern: `should [action] [expected result] [context]`
- Example: `should display IP address without horizontal scroll on mobile viewport`

**No New Unit Tests Needed:**
- This story only changes CSS/layout, not logic
- Existing unit tests for `useIpDetection` remain valid
- Existing E2E tests for IP display remain valid (test functional behavior, not layout)

### Previous Story Intelligence

**From Story 2.2 (done):**
- `IpDisplay.vue` uses `UCard`, `USkeleton`, `UAlert` — all NuxtUI, dark mode automatic
- Typography was `text-4xl md:text-5xl lg:text-6xl` — needs adjustment to AC spec
- Skeleton dimensions scale responsively: `h-12 w-48 mx-auto md:h-16 md:w-72 lg:h-20 lg:w-96`
- `aria-busy` attribute set during loading
- `data-testid` attributes on all key elements (ip-display, ip-skeleton, ip-error, ip-address)
- All 97 unit tests pass, all E2E tests pass (no regressions)

**From Story 2.2 Code Review:**
- SSR renders skeleton (loading=true during idle+no-data state)
- `UAlert` uses `onClick` not `click` for actions
- ESLint `no-undef` disabled for `.vue` files (auto-imports)

**Debug Learnings (from previous stories):**
- E2E tests need dev server warm-up before first browser test
- `data-testid` for stable E2E selectors — continue this pattern
- Playwright `page.setViewportSize()` for responsive testing

### Git Intelligence Summary

**Recent Commits:**
```text
c025c1a feat: IP display component with useIpDetection composable (Story 2.2) (#18)
3a19f18 feat: server API endpoint for IP detection (Story 2.1) (#17)
58596c8 Merge pull request #16 from mathieumaf/fix/code-review-story-1-7
```

**Branch Convention:** `feat/<description>`
**Expected Branch:** `feat/responsive-layout`

**Commit Convention:**
```bash
git commit -m "feat: implement responsive layout for mobile, tablet, and desktop (Story 2.3)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Latest Technical Information

**NuxtUI v4.4.0 UContainer (February 2026):**
- Renders as `<div>` by default, customizable via `as` prop
- Default styling: `mx-auto w-full` with responsive padding
- Built-in responsive padding: `px-4 sm:px-6 lg:px-8`
- Max-width controlled via `--ui-container` CSS variable
- Customizable via `ui` prop for overrides: `<UContainer :ui="{ base: 'max-w-5xl' }" />`

**Tailwind CSS Breakpoints (via NuxtUI):**
- `sm:` → 640px (matches AC tablet breakpoint)
- `md:` → 768px
- `lg:` → 1024px (matches AC desktop breakpoint)
- `xl:` → 1280px
- `2xl:` → 1536px

**CLS Prevention Best Practices:**
- Use explicit dimensions on skeleton/loading states (already done in Story 2.2)
- Avoid dynamic content that shifts layout after load
- Use `min-h` to reserve space for content areas
- Font-display: swap already handled by NuxtUI defaults

### Project Structure Notes

- Aligns with architecture: single-column centered layout, mobile-first
- `UContainer` follows NuxtUI "Default Excellence" philosophy
- Layout changes are additive (no removal of existing functionality)
- Tests follow established pattern: `tests/e2e/` for integration

### Critical Don't-Miss Rules

- **DO NOT** change any business logic (composable, API, state management)
- **DO NOT** add raw container/padding implementations — use `UContainer`
- **DO NOT** use `md:` breakpoint for tablet — use `sm:` (640px matches AC)
- **DO NOT** use `dark:` classes manually — NuxtUI handles dark mode
- **DO NOT** remove existing `data-testid` attributes
- **DO NOT** remove `aria-label` or `aria-busy` from IpDisplay
- **DO** use `UContainer` in `default.vue` layout for consistent wrapping
- **DO** use mobile-first approach (smallest screen first, add `sm:` and `lg:` overrides)
- **DO** update skeleton dimensions to match new typography scale
- **DO** test at 375px, 768px, and 1280px viewports
- **DO** preserve existing E2E test selectors and unit test coverage
- **DO** ensure "Try Again" button meets 48px touch target on mobile

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.3] - Acceptance criteria and user story
- [Source: _bmad-output/planning-artifacts/prd.md#responsive-design] - Breakpoints, mobile-first approach, touch targets
- [Source: _bmad-output/planning-artifacts/architecture/implementation-patterns-consistency-rules.md] - Naming conventions, structure patterns
- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md#frontend-architecture] - Component architecture, NuxtUI design system
- [Source: _bmad-output/project-context.md#framework-specific-rules] - NuxtUI components, Tailwind responsive classes
- [Source: _bmad-output/planning-artifacts/ux-design-specification/ux-consistency-patterns.md] - Touch targets, responsive breakpoints, mobile considerations
- [Source: _bmad-output/planning-artifacts/ux-design-specification/ux-pattern-analysis-inspiration.md] - Mobile-first, performance-as-quality
- [Source: _bmad-output/implementation-artifacts/2-2-create-ip-display-component-with-ssr.md] - Previous story implementation, current component state
- [Source: app/pages/index.vue] - Current page layout
- [Source: app/layouts/default.vue] - Current layout wrapper
- [Source: app/components/IpDisplay.vue] - Current component to modify

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Discovered that NuxtUI v4 requires explicit CSS import (`@import "tailwindcss"; @import "@nuxt/ui";`) in a CSS file referenced by `nuxt.config.ts`. Without this, Tailwind CSS utility classes are never generated (entry CSS = 0 bytes). This was a pre-existing project setup issue since Story 1.1.
- NuxtUI v4 UCard renders with `data-slot="root"` attribute (not `data-slot="card"`).
- Skeleton dimensions updated from `md:` breakpoint to `sm:` to align with AC breakpoints.

### Completion Notes List

- **Task 1**: Wrapped layout slot in `UContainer` with `min-h-screen`. UContainer provides responsive padding (`px-4 sm:px-6 lg:px-8`), max-width (`--ui-container`), and `mx-auto` centering automatically.
- **Task 2**: Added responsive spacing wrapper `div` with `space-y-4 sm:space-y-6 lg:space-y-8` and vertical padding `py-8 sm:py-12 lg:py-16`. Maintained semantic `<main>` with flexbox centering. No horizontal overflow at any breakpoint.
- **Task 3**: Updated IP typography from `text-4xl md:text-5xl lg:text-6xl` to `text-3xl sm:text-5xl lg:text-6xl` per AC. Updated skeleton dimensions to match new scale (`h-10 w-48 sm:h-14 sm:w-72 lg:h-20 lg:w-96`). Added `size: 'xl'` to "Try Again" button for 48px touch target. Preserved `font-mono font-bold text-center`.
- **Task 4**: Created 11 E2E tests across mobile (375px), tablet (768px), and desktop (1280px) viewports. Tests validate: no horizontal scroll, full-width card on mobile, centered layout, typography scale, CLS < 0.1, and content readability.
- **Critical Fix**: Added missing Tailwind CSS entry point (`app/assets/css/main.css` with `@import "tailwindcss"; @import "@nuxt/ui";`) and `css: ['~/assets/css/main.css']` in `nuxt.config.ts`. This was required by NuxtUI v4 installation docs but missing from the project since initial setup. Without this, no Tailwind utility CSS was ever generated (entry CSS was 0 bytes in production build).

### Change Log

- 2026-02-11: Implemented responsive layout (Story 2.3) - all 4 tasks complete, 11 new E2E tests, critical Tailwind CSS fix applied

### File List

- `app/assets/css/main.css` (NEW) - Tailwind CSS entry point with NuxtUI import
- `app/layouts/default.vue` (MODIFIED) - Added UContainer wrapper with min-h-screen
- `app/pages/index.vue` (MODIFIED) - Added responsive spacing and vertical padding
- `app/components/IpDisplay.vue` (MODIFIED) - Updated typography scale, skeleton dimensions, button touch target
- `nuxt.config.ts` (MODIFIED) - Added `css: ['~/assets/css/main.css']` for Tailwind CSS loading
- `tests/e2e/responsive-layout.spec.ts` (NEW) - 11 E2E tests for responsive layout validation
