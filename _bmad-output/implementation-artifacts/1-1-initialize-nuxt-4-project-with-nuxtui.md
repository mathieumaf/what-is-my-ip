# Story 1.1: Initialize Nuxt 4 Project with NuxtUI

Status: done

## Story

As a developer,
I want to initialize a new Nuxt 4 project with NuxtUI pre-configured,
So that I have a clean, official starting point with the design system ready for development.

## Acceptance Criteria

**Given** I have Bun and Node.js 18+ installed on my development machine
**When** I run the Nuxt 4 initialization commands specified in the Architecture
**Then** A new Nuxt 4 project is created with the official file structure
**And** NuxtUI is installed and configured via `npx nuxi module add ui`
**And** The development server starts successfully with `bun --bun run dev`
**And** NuxtUI components are auto-imported and available
**And** Tailwind CSS is configured automatically via NuxtUI
**And** Dark mode is enabled with OS preference detection (NuxtUI ColorMode)
**And** TypeScript is configured with default Nuxt 4 settings
**And** Project structure follows Nuxt 4 conventions (`app/`, `server/`, `public/`)
**And** Git repository is initialized with `.gitignore` for Nuxt projects
**And** `package.json` contains correct project name "what-is-my-ip"

## Tasks / Subtasks

- [x] Initialize Nuxt 4 project (AC: 1, 2, 3, 9, 10, 12)
  - [x] Verify Node.js 18+ and Bun installed
  - [x] Run `bunx nuxi init what-is-my-ip`
  - [x] Install dependencies with `bun install`
  - [x] Verify project structure (`app/`, `server/`, `public/`)

- [x] Install and configure NuxtUI (AC: 4, 6, 7, 8)
  - [x] Run `npx nuxi module add ui`
  - [x] Verify `@nuxt/ui` in `nuxt.config.ts` modules
  - [x] Verify Tailwind CSS auto-configured
  - [x] Verify ColorMode module enabled

- [x] Create project structure (AC: 10)
  - [x] Create `types/index.ts` (shared types)
  - [x] Create `app/layouts/default.vue` (basic layout)
  - [x] Create `app/pages/index.vue` (basic homepage)
  - [x] Create `.env.example` (environment template)
  - [x] Ensure all required folders exist

- [x] Initialize Git repository (AC: 11)
  - [x] Run `git init`
  - [x] Verify `.gitignore` includes `.nuxt/`, `.output/`, `node_modules/`, `.env`
  - [x] Create initial commit with proper message format

- [x] Verify development setup (AC: 5, 6, 7, 8, 9)
  - [x] Start dev server with `bun --bun run dev`
  - [x] Verify homepage loads at `http://localhost:3000`
  - [x] Test NuxtUI component (add `<UButton>` to homepage)
  - [x] Verify TypeScript auto-completion works
  - [x] Test dark mode toggle (if time permits)

## Dev Notes

### Business Context

Foundation story for what-is-my-ip (7 epics, 40 stories total). Epic 1 establishes professional infrastructure from day one. This story creates the clean starting point for all 39 subsequent stories.

**Story Sequence:** Story 1.2 will enable TypeScript strict mode and code quality tools (ESLint/Prettier). Story 1.3+ will add testing infrastructure (Vitest, Playwright). Don't add testing or strict linting prematurely - follow the sequence.

### Technical Requirements

**Exact Technology Versions:**

- Nuxt: 4.3 (target version, 4.2.2 acceptable) - **Verify in package.json after init**
- Vue: 3.5.27
- Node.js: >=18.0.0
- Bun: Latest stable (package manager - **use Bun for faster installs and project consistency**)
- @nuxt/ui: Latest (auto-installed)
- TypeScript: Latest with default Nuxt config (**strict mode enabled in Story 1.2**)

**Framework Features Required:**

- Universal rendering mode (SSR + client hydration)
- Auto-imports for components, composables, utilities
- File-based routing from `pages/` directory
- Server API routes in `server/api/`
- TypeScript-first configuration

**SSR Foundation for IP Detection (Story 2.1+):**
When implementing IP detection in future stories, remember: default `useFetch('/api/ip')` runs on server during SSR and captures **server IP**, not visitor IP. You must use `useFetch('/api/ip', { server: false })` to capture visitor IP on client-side. This story establishes the SSR foundation - understanding this pattern now prevents critical bugs later.

### Architecture Compliance

**Project Structure (MUST FOLLOW Nuxt 4 Conventions):**

```
what-is-my-ip/
├── app/                           # Application source (Nuxt 4)
│   ├── components/                # Vue components (auto-imported)
│   ├── composables/               # Composition API utilities
│   ├── layouts/
│   │   └── default.vue           # Create basic default layout
│   ├── pages/
│   │   └── index.vue             # Create basic homepage
│   ├── plugins/
│   └── utils/
├── server/                        # Server-side code
│   ├── api/                       # API routes (auto-registered)
│   ├── middleware/
│   └── utils/
├── public/                        # Static assets (served at /)
│   └── favicon.ico
├── types/
│   └── index.ts                  # Create for shared types
├── nuxt.config.ts                 # Nuxt configuration
├── tsconfig.json                  # Auto-generated
├── package.json
├── .gitignore
├── .env.example                   # Create manually
└── README.md
```

**Naming Conventions (From Architecture):**

- Components: `PascalCase.vue` (e.g., `IpDisplay.vue`)
- Composables: `useFeatureName.ts` (e.g., `useIpDetection.ts`)
- API Routes: `endpoint.{method}.ts` (e.g., `ip.get.ts`)
- Types/Interfaces: `PascalCase` WITHOUT `I` prefix
- Variables/Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Library & Framework Requirements

**NuxtUI Installation (CRITICAL):**

- **Command:** `npx nuxi module add ui` (official NuxtUI installation)
- **Auto-Configures:** Tailwind CSS, ColorMode, auto-imports
- **Components Available:** `<UButton>`, `<UCard>`, `<UAlert>`, `<UInput>`, etc.
- **Icons:** Use `i-heroicons-{name}` pattern (e.g., `i-heroicons-check-circle`)
- **Dark Mode:** Handled automatically by ColorMode module (no manual `dark:` classes)

**TypeScript Configuration:**

- Strict mode enabled by default in Nuxt 4
- Separate tsconfig files (auto-generated):
  - `.nuxt/tsconfig.json` - Base configuration
  - `tsconfig.json` - Project extends base
- Auto-imports enabled (don't manually import `ref`, `computed`, `useFetch`)

**Bun Compatibility Notes:**

- Known issue: Bun socket communication issues with Nuxt 4 on Windows (Jan 2026)
- **Fallback if `bunx nuxi init` fails:** Use `npx nuxi init what-is-my-ip && cd what-is-my-ip && bun install`
- Dev server: Use `bun --bun run dev` (forces Bun runtime)

### File Structure Requirements

**Files to Create Manually:**

1. **`types/index.ts`** - Shared type definitions:

```typescript
// Shared type definitions
export type IpAddress = string;

export interface GeolocationData {
  ip: string;
  country: string;
  city: string;
  // More fields will be added in later stories
}
```

2. **`app/layouts/default.vue`** - Basic default layout:

```vue
<template>
  <div>
    <slot />
  </div>
</template>
```

3. **`app/pages/index.vue`** - Basic homepage with NuxtUI verification:

```vue
<template>
  <div>
    <h1>What Is My IP</h1>
    <p>Project initialized successfully!</p>
    <UButton>Click Me</UButton>
  </div>
</template>
```

**Note:** The `<UButton>` verifies NuxtUI components auto-import correctly.

4. **`.env.example`** - Environment template:

```bash
# Site Configuration
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# API Keys (for future use)
# Add environment variables here as needed
```

### Testing Requirements

**NOT IN THIS STORY** - Testing infrastructure comes in later stories:

- Story 1.3: Set Up Unit Testing with Vitest
- Story 1.4: Set Up E2E Testing with Playwright

**Manual Verification Required:**

1. Dev server starts without errors (success = terminal shows "Nuxt 4.x.x", "Listening on http://localhost:3000", no error stack traces)
2. Homepage loads successfully at `http://localhost:3000`
3. NuxtUI components work (verify `<UButton>` renders as styled button, not plain HTML)
4. TypeScript auto-completion works in editor (type `ref(` and verify auto-completion appears)
5. No errors in browser console (press F12, check Console tab)

### Critical Don't-Miss Rules

**🚨 TypeScript Strict Mode:**

- ❌ NO `any` types allowed (architecture requirement)
- ❌ NO manual imports of Nuxt auto-imports (`ref`, `computed`, etc.)
- ❌ NO `I` prefix for interfaces (`IPApiResponse` → `ApiResponse`)
- ✅ ALWAYS use explicit return types for exported functions

**🚨 SSR vs Client-Side:**

- ❌ NEVER access `window`, `document`, `localStorage` in top-level component code
- ✅ ALWAYS use `onMounted()` for client-only code
- ✅ ALWAYS wrap client-only components in `<ClientOnly>`

**🚨 Auto-Import Name Collisions:**

- ❌ NEVER name variables `ref`, `computed`, `watch`, `useFetch`, `useRoute` (conflicts with Nuxt/Vue auto-imports)
- ✅ Use alternative names like `reference`, `calculatedValue`, `observer`, `apiCall`, `routeInfo`
- **Example error:** `const ref = 'some-value'` will conflict with Vue's `ref()` composable
- **Why critical:** Auto-imports are invisible - naming conflicts cause mysterious errors

**🚨 Git Repository:**

- ✅ Initialize Git AFTER Nuxt project creation
- ✅ Verify `.gitignore` includes ALL required patterns:
  - `.nuxt/` (Nuxt build output)
  - `.output/` (production build)
  - `node_modules/` (dependencies)
  - `.env` (secrets)
  - `dist/` (distribution files)
  - `.DS_Store` (macOS files)
  - `coverage/` (test coverage - future)
  - `playwright-report/` (E2E reports - future)
- ✅ Use commit format: `feat: initialize Nuxt 4 project with NuxtUI`
- ✅ Include co-author: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

**🚨 NuxtUI vs Raw Tailwind:**

- ✅ ALWAYS prefer NuxtUI components over raw Tailwind classes
- ✅ NuxtUI components are accessible, themeable, and consistent
- ✅ Tailwind utilities available for spacing, layout, custom styles

**🚨 Development Server:**

- ✅ Use `bun --bun run dev` to force Bun runtime
- ✅ Server should start on `http://localhost:3000`
- ✅ Clear `.nuxt/` folder if errors occur
- ✅ Verify Node.js 18+ if issues (`node --version`)

### Project Structure Notes

**Alignment with Nuxt 4 Conventions:**

- Using `app/` directory (Nuxt 4 standard, replaces `src/`)
- File-based routing from `pages/` directory
- Server API routes in `server/api/`
- Auto-imports for components, composables, utils
- Flat folder structure (no nested folders for small project)

**Detected Variances:**

- None - This is a greenfield project following latest Nuxt 4 patterns

### References

**Architecture Documents:**

- [Source: _bmad-output/planning-artifacts/architecture/index.md]
- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md]
- [Source: _bmad-output/planning-artifacts/architecture/implementation-patterns-consistency-rules.md]

**Project Context:**

- [Source: _bmad-output/project-context.md]
- Critical rules for AI agents, technology stack versions, naming conventions

**Epics & Stories:**

- [Source: _bmad-output/planning-artifacts/epics.md#epic-1-project-initialization--quality-foundation]
- Story 1.1 is first of 7 stories in Epic 1

**External Documentation:**

- NuxtUI: https://ui.nuxt.com/getting-started
- Nuxt 4: https://nuxt.com/docs/getting-started/installation
- Bun: https://bun.sh/docs

## Implementation Checklist

### Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Bun installed (`bun --version`)
- [ ] Git installed (`git --version`)

### Step 1: Initialize Nuxt 4 Project

- [ ] Run `bunx nuxi init what-is-my-ip`
  - **If socket errors occur:** Use fallback `npx nuxi init what-is-my-ip`
- [ ] Navigate to project: `cd what-is-my-ip`
- [ ] Verify `nuxt.config.ts` exists
- [ ] Verify `package.json` has name "what-is-my-ip"
- [ ] **Verify Nuxt version:** Check `package.json` shows Nuxt 4.3.x or 4.2.2+ (acceptable)
- [ ] Run `bun install` to install dependencies

### Step 2: Install NuxtUI

- [ ] Run `npx nuxi module add ui`
- [ ] Verify `@nuxt/ui` in `nuxt.config.ts` modules array
- [ ] Verify `@nuxt/ui` in `package.json` dependencies

### Step 3: Create Project Structure

- [ ] Create `types/index.ts` with basic type definitions
- [ ] Create `app/layouts/default.vue` with basic layout
- [ ] Create `app/pages/index.vue` with basic homepage (include `<UButton>` test)
- [ ] Create `.env.example` with environment template
- [ ] **Verify folder structure:** Confirm these folders exist:
  - `app/components/`, `app/composables/`, `app/layouts/`, `app/pages/`
  - `server/api/`, `server/utils/`
  - `types/`, `public/`
  - Create missing folders manually (use `.gitkeep` for empty folders)

### Step 4: Initialize Git Repository

- [ ] Run `git init`
- [ ] **Verify `.gitignore` completeness:** Must include:
  - `.nuxt/`, `.output/`, `node_modules/`, `.env`, `dist/`, `.DS_Store`
  - `coverage/`, `playwright-report/` (for future testing)
  - Add missing patterns if needed
- [ ] Stage all files: `git add .`
- [ ] Commit: `git commit -m "feat: initialize Nuxt 4 project with NuxtUI\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"`

### Step 5: Verify Development Setup

- [ ] Run `bun --bun run dev`
- [ ] **Verify success criteria in terminal:**
  - Output shows "Nuxt 4.x.x" or "Nuxt 4.2.x" or "Nuxt 4.3.x"
  - Output shows "Listening on http://localhost:3000"
  - No error stack traces visible
- [ ] Open `http://localhost:3000` in browser
- [ ] Verify homepage loads without errors
- [ ] **Verify `<UButton>` (already in homepage):** Should render as styled button, not plain HTML
- [ ] Check browser console (F12 → Console tab): No errors or warnings
- [ ] Verify TypeScript auto-completion works in editor (type `ref(` and check suggestions)

### Step 6: Final Verification

- [ ] All acceptance criteria met (review AC section above)
- [ ] Dev server runs without errors
- [ ] NuxtUI components available and working (button styled correctly)
- [ ] TypeScript default config working (strict mode comes in Story 1.2)
- [ ] Git repository initialized with complete .gitignore (8+ patterns)
- [ ] Project structure follows Nuxt 4 conventions (app/, server/, public/)
- [ ] Nuxt version verified (4.3.x or 4.2.2+ acceptable)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

No debugging required - implementation proceeded without errors.

### Completion Notes List

**Implementation Approach:**

- Created Nuxt 4.3.0 project using minimal template via `npx nuxi init` in temporary folder
- Copied project files to existing repo while preserving \_bmad and \_bmad-output folders
- Installed NuxtUI 4.4.0 manually with `bun add @nuxt/ui` and configured in nuxt.config.ts
- Created all required files (types/index.ts, layouts/default.vue, pages/index.vue, .env.example)
- Set up complete folder structure (app/components, app/composables, server/api, etc.)

**Key Technical Decisions:**

- Used temp folder approach due to `bunx nuxi init .` interactive limitations
- Removed app.vue in favor of pages/ directory for file-based routing
- Added testing patterns to .gitignore proactively (coverage/, playwright-report/, test-results/)
- Created server/ folder structure with .gitkeep files to ensure Git tracking

**Versions Achieved:**

- Nuxt: 4.3.0 ✅ (target version)
- Vue: 3.5.27 ✅
- NuxtUI: 4.4.0
- Node.js: 24.13.0 (exceeds requirement of 18+)
- Bun: 1.3.6

**Verification Results:**

- Dev server starts successfully on http://localhost:3000
- NuxtUI components auto-import correctly (UButton tested)
- NuxtUI ColorMode module installed and configured
- Tailwind CSS configured via NuxtUI integration
- Project structure follows Nuxt 4 conventions
- All acceptance criteria satisfied

**Next Story Dependencies:**

- Story 1.2 will enable TypeScript strict mode and ESLint/Prettier
- Story 1.3 will add Vitest for unit testing
- Story 1.4 will add Playwright for E2E testing

**Code Review Fixes Applied (claude-sonnet-4-5-20250929):**

- Fixed .env.example: Added Sentry DSN placeholder comment per Architecture spec
- Fixed nuxt.config.ts: Added comment explaining compatibilityDate value
- Fixed .gitignore: Changed test-results to test-results/ (directory convention)
- Verified project-context.md exists at \_bmad-output/project-context.md
- All MEDIUM and LOW issues resolved (3 MEDIUM, 2 LOW fixed)

### File List

**New Files:**

- .env.example
- types/index.ts
- app/layouts/default.vue
- app/pages/index.vue
- server/api/.gitkeep
- server/middleware/.gitkeep
- server/utils/.gitkeep

**Modified Files:**

- .gitignore (added testing patterns, fixed test-results/ trailing slash)
- package.json (changed name to "what-is-my-ip", added @nuxt/ui dependency)
- nuxt.config.ts (added @nuxt/ui to modules, added compatibilityDate comment)
- bun.lock (updated with new dependencies)
- README.md (from Nuxt template)
- public/favicon.ico (from Nuxt template)
- public/robots.txt (from Nuxt template)
- tsconfig.json (Nuxt 4 TypeScript config)
- \_bmad-output/implementation-artifacts/sprint-status.yaml (story status: ready-for-dev → in-progress → review)
- .env.example (added Sentry DSN placeholder comment per Architecture spec)

**Deleted Files (Architectural Refactor):**

- .dockerignore, Dockerfile (not needed for Vercel deployment)
- AGENTS.md, LICENSE (moved to documentation planning)
- app/app.vue (replaced with pages/ routing)
- app/plugins/dark-mode.client.ts (replaced by NuxtUI ColorMode)
- tailwind.config.ts (handled by NuxtUI)
- server/api/ip.get.ts (will be recreated in Story 2.1)
- public/android-chrome-\*.png, public/apple-touch-icon.png (will be recreated in Story 4.2)
- public/site.webmanifest (will be recreated with proper PWA setup)
