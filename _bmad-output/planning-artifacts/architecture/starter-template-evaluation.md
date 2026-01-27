# Starter Template Evaluation

## Primary Technology Domain

**Full-Stack Web Application** (Nuxt 4 Universal SSR) based on project requirements analysis.

The project is a server-side rendered web application with client-side hydration, requiring SSR for instant IP detection, SEO optimization, and progressive enhancement capabilities.

## Technical Preferences (From PRD)

**Pre-Specified Technology Stack:**

The PRD already establishes clear technical preferences:

- **Core Framework:** Nuxt 4 (latest stable - currently 4.3 as of January 2026)
- **UI Library:** NuxtUI (official Nuxt ecosystem design system)
- **Styling:** Tailwind CSS (integrated via NuxtUI)
- **Language:** TypeScript (strict mode, no `any` types)
- **Testing:**
  - Unit: Vitest (specified)
  - E2E: Playwright or Cypress (decision needed)
- **Package Manager:** Bun
- **Runtime:** Node.js 18+ LTS
- **Build Tool:** Vite (via Nuxt)
- **Rendering:** Universal/Hybrid (SSR + client hydration)

## Starter Options Considered

**Option 1: Official Nuxt 4 CLI (`bunx nuxi init`)**

**What it provides:**

- Fresh Nuxt 4.3 project with latest best practices
- TypeScript configuration out-of-the-box
- Vite build tooling integrated
- Universal rendering mode configured
- Minimal dependencies (clean slate)
- Official Nuxt project structure

**What requires manual setup:**

- NuxtUI installation (`npx nuxi module add ui`)
- Tailwind CSS configuration (auto-configured by NuxtUI)
- Testing infrastructure (Vitest + Playwright)
- Linting and formatting (ESLint, Prettier)
- CI/CD pipeline configuration
- Pre-commit hooks
- Environment configuration

**Pros:**

- Latest Nuxt 4.3 features and optimizations
- Clean starting point with no unnecessary dependencies
- Official support and documentation
- Follows current 2026 best practices
- Full control over architectural decisions

**Cons:**

- Requires manual configuration of testing, linting, CI/CD
- More initial setup work
- No pre-configured quality gates

---

**Option 2: NuxtUI Starter Template (`nuxt-ui-templates/starter`)**

**What it provides:**

- Nuxt 4 with NuxtUI pre-installed
- Tailwind CSS configured
- Basic component structure
- Dark mode setup
- Minimal example components

**What requires manual setup:**

- Testing infrastructure (Vitest + Playwright)
- Linting and formatting configuration
- CI/CD pipeline
- Pre-commit hooks
- Accessibility testing automation
- Performance monitoring

**Pros:**

- NuxtUI already configured
- Dark mode setup included
- Faster initial start
- Example components for reference

**Cons:**

- Still requires significant testing/CI/CD setup
- May include example code to remove
- Less control over initial configuration decisions

---

**Option 3: Custom Setup (Manual Configuration)**

Starting from scratch with manual installation of each piece.

**Pros:**

- Complete architectural control
- Learn every decision deeply
- No unnecessary boilerplate

**Cons:**

- Significant setup time
- Risk of missing best practices
- More room for configuration errors
- Not recommended for portfolio-first project with tight quality requirements

## Selected Starter: Official Nuxt 4 CLI with Incremental Setup

**Rationale for Selection:**

Given the strict quality requirements (100% test coverage, Lighthouse > 90, WCAG AA compliance), we need a clean, official starting point that allows full control over quality infrastructure. The official Nuxt 4 CLI provides this foundation.

**Why this approach wins:**

1. **Latest Features:** Nuxt 4.3 (January 2026) with all current optimizations
2. **Clean Slate:** No example code to remove, no unnecessary dependencies
3. **Quality Control:** Full control over testing, linting, CI/CD setup from start
4. **Official Support:** Direct alignment with Nuxt team best practices
5. **Bun Compatible:** Works with specified Bun package manager
6. **TypeScript First:** TypeScript configuration optimized for Nuxt 4

**Why NOT NuxtUI starter template:**

- Testing infrastructure is a first-class concern (100% coverage requirement)
- CI/CD quality gates are architectural components, not afterthoughts
- Clean slate allows TDD approach from day one
- PRD specifies architectural patterns that may differ from template

**Initialization Commands:**

**Step 1: Create Nuxt 4 Project**

```bash
bunx nuxi init what-is-my-ip
cd what-is-my-ip
```

**Note about Bun + Nuxt 4 Compatibility:**

- Bun has known socket communication issues with Nuxt 4 on Windows (as of January 2026)
- Alternative: Use `npx nuxi init` if Bun issues encountered
- Development server with Bun: `bun --bun run dev` (forces Bun runtime)

**Step 2: Install NuxtUI**

```bash
npx nuxi module add ui
```

This command automatically:

- Installs `@nuxt/ui` package
- Adds module to `nuxt.config.ts`
- Configures Tailwind CSS integration
- Sets up NuxtUI Color Mode for dark/light themes

**Step 3: Install Development Dependencies**

```bash
bun add -D @nuxt/test-utils vitest @playwright/test eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**Step 4: Configure Testing Infrastructure**

(Detailed testing configuration will be documented in subsequent architecture decisions)

## Architectural Decisions Provided by Starter

**Language & Runtime:**

- **TypeScript:** Strict mode enabled by default in Nuxt 4
- **tsconfig.json:** Separate configs for app, server, shared, and builder code (Nuxt 4 feature)
- **Type Inference:** Improved auto-completion and fewer confusing errors
- **Runtime:** Node.js 18+ LTS (Nuxt 4 requirement)
- **Bun Support:** Can use `--bun` flag for Bun runtime in development

**Framework Architecture:**

- **Rendering Mode:** Universal (SSR + client hydration)
- **Auto-imports:** Components, composables, utilities (Nuxt convention)
- **File-based Routing:** `pages/` directory for automatic route generation
- **API Routes:** `server/api/` for server-side API endpoints
- **Middleware:** `middleware/` for navigation guards
- **Plugins:** `plugins/` for Vue plugins and app-level initialization

**Styling Solution:**

- **Tailwind CSS:** Auto-configured via NuxtUI
- **NuxtUI Components:** Production-ready, accessible UI primitives
- **Color Mode:** Automatic dark/light mode with OS preference detection
- **System Fonts:** Default (optimized for zero load time)
- **Responsive:** Mobile-first with Tailwind breakpoints (320px, 640px, 768px, 1024px, 1280px)

**Build Tooling:**

- **Vite:** Fast HMR and optimized production builds
- **Auto-optimization:** Code splitting, tree-shaking, minification
- **Asset Handling:** Automatic optimization for images, fonts, CSS
- **Bundle Analysis:** Built-in tools for monitoring bundle size
- **Environment Variables:** `.env` file support with `runtimeConfig`

**Testing Framework:**

**Unit Testing (Pre-configured):**

- **Vitest:** Fast, Vite-native unit testing
- **@nuxt/test-utils:** Nuxt-specific testing utilities
- **Vue Test Utils:** Component testing support

**E2E Testing (Requires Configuration):**

- **Recommendation:** Playwright
- **Rationale:**
  - Native parallelization (15 workers vs Cypress 5 paid parallels)
  - Cross-browser support (Chrome, Firefox, Safari/WebKit)
  - Mobile emulation capabilities
  - Faster CI execution (14min vs 90min for same compute budget)
  - No external paid services required
  - Better for portfolio showcase (demonstrates modern tooling mastery)
- **Alternative:** Cypress (better debugging UI, but slower parallel execution)

**Decision:** Playwright for E2E testing based on 2026 benchmarks showing superior CI performance and cross-browser capabilities without additional costs.

**Code Organization:**

**Nuxt 4 Default Structure:**

```
what-is-my-ip/
├── app/                    # Application source (Nuxt 4 convention)
│   ├── components/         # Vue components (auto-imported)
│   ├── composables/        # Composition API utilities (auto-imported)
│   ├── layouts/            # Layout components
│   ├── pages/              # File-based routing
│   ├── plugins/            # Vue plugins
│   └── utils/              # Utility functions (auto-imported)
├── server/                 # Server-side code
│   ├── api/                # API routes
│   ├── middleware/         # Server middleware
│   └── utils/              # Server utilities
├── public/                 # Static assets (served at /)
├── tests/                  # Test files (to be created)
│   ├── unit/               # Vitest unit tests
│   └── e2e/                # Playwright E2E tests
├── nuxt.config.ts          # Nuxt configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

**Conventions:**

- Auto-imports for components, composables, utils (no explicit imports needed)
- File-based routing from `pages/` directory
- Server API routes in `server/api/` (e.g., `server/api/ip.get.ts` → `/api/ip`)
- Layouts in `layouts/` (e.g., `layouts/default.vue`)
- TypeScript strict mode enforced

**Development Experience:**

**Out-of-the-Box:**

- Hot Module Replacement (HMR) via Vite
- TypeScript auto-completion and error checking
- Vue DevTools integration
- Automatic component discovery
- Server route hot-reload
- Error overlay with source maps

**Requires Configuration:**

- ESLint rules and pre-commit hooks
- Prettier formatting automation
- Husky for Git hooks
- CI/CD pipeline (GitHub Actions)
- Lighthouse automation
- Accessibility testing automation

**Performance Features:**

- Automatic code splitting by page
- Tree-shaking for unused code elimination
- CSS extraction and minification
- Image optimization (Nuxt Image module - optional)
- Lazy loading for off-screen components
- Prefetching for faster navigation
- Built-in caching strategies

**SEO & Meta Management:**

- `useHead()` composable for meta tags
- `useSeoMeta()` for SEO-specific tags
- Automatic Open Graph and Twitter Card generation
- Server-side rendering for crawler-friendly HTML
- Sitemap generation (requires `@nuxtjs/sitemap` module)

## Implementation Approach

**Phase 1: Project Initialization (First Story)**

1. Create Nuxt 4 project: `bunx nuxi init what-is-my-ip`
2. Install NuxtUI: `npx nuxi module add ui`
3. Configure TypeScript strict mode
4. Set up Git repository
5. Verify development server runs

**Phase 2: Quality Infrastructure Setup (Early Stories)**

1. Configure Vitest for unit testing
2. Configure Playwright for E2E testing
3. Set up ESLint with TypeScript rules
4. Configure Prettier
5. Install Husky for pre-commit hooks
6. Create initial CI/CD pipeline (GitHub Actions)

**Phase 3: Application Development (Remaining Stories)**

1. Implement features following TDD approach
2. Maintain 100% test coverage gate
3. Validate Lighthouse scores continuously
4. Ensure WCAG AA compliance at each step

## Testing Framework Decision: Playwright

**Final Decision:** Playwright for E2E testing

**Rationale:**

**Performance:**

- Native parallelization: 15 workers vs Cypress 5 paid parallels
- Faster CI execution: 14 minutes vs 90 minutes for equivalent coverage
- Lower CI costs: No external parallelization services required

**Capabilities:**

- Cross-browser: Chrome, Firefox, Safari/WebKit (Cypress lacks Safari)
- Mobile emulation: iOS and Android device simulation
- Network conditions: Throttling, offline mode testing
- Multiple tabs/contexts: Test complex user flows

**Portfolio Value:**

- Demonstrates mastery of modern testing tools (2026 standard)
- Showcases understanding of CI/CD optimization
- Aligns with performance-first architecture philosophy

**Accessibility:**

- Playwright Test integrates with axe-core for automated accessibility testing
- Can validate WCAG AA compliance in E2E tests
- Supports screen reader simulation

**Developer Experience:**

- Codegen tool for generating tests from browser interactions
- Trace viewer for debugging failed tests
- Built-in retry and timeout handling
- TypeScript first-class support

**Sources:**

- [Cypress vs Playwright: I Ran 500 E2E Tests in Both](https://medium.com/lets-code-future/cypress-vs-playwright-i-ran-500-e2e-tests-in-both-heres-what-broke-2afc448470ee)
- [Playwright vs Cypress: The 2026 Enterprise Testing Guide](https://devin-rosario.medium.com/playwright-vs-cypress-the-2026-enterprise-testing-guide-ade8b56d3478)
- [Playwright vs Cypress: The Definitive Comparison](https://betterstack.com/community/guides/scaling-nodejs/playwright-vs-cypress/)

**Alternative Considered:** Cypress offers better debugging UI but lacks Safari support and requires paid services for parallel execution at scale. Given portfolio showcase objective and CI optimization goals, Playwright is the superior choice for this project.

## Notes

- Project initialization using these commands should be the first implementation story
- All configuration decisions align with PRD requirements
- Quality infrastructure is treated as first-class architectural concern
- TDD approach enabled from project inception
