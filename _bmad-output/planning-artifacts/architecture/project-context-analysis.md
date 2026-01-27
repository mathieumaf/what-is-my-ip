# Project Context Analysis

## Requirements Overview

**Functional Requirements:**

what-is-my-ip implements 69 functional requirements across 7 major categories:

1. **IP Detection & Geolocation Display (FR1-FR9):**
   - Automatic IP detection on page load via SSR
   - Geolocation data display (country, region, city, timezone, ISP, coordinates, AS number)
   - Manual refresh capability
   - Interactive map integration (Google Maps)
   - Copy-to-clipboard functionality
   - Graceful API failure handling

2. **User Interface & Accessibility (FR10-FR20):**
   - Automatic dark/light mode based on OS preference
   - Manual theme toggle capability
   - Full keyboard navigation support
   - Screen reader optimization
   - Responsive design (320px mobile → 1280px+ desktop)
   - Text resizable to 200% without functionality loss
   - Minimum 44x44px touch targets
   - WCAG AA color contrast ratios

3. **Repository Discovery & Navigation (FR21-FR29):**
   - Prominent GitHub repository links
   - Visual quality badges (build, tests, coverage, Lighthouse)
   - Screenshots/GIF demonstrations
   - Live demo access button
   - Technology stack visualization
   - Recent commit activity visibility
   - Clear installation instructions
   - Relevant topics and tags for discoverability

4. **Contribution & Collaboration (FR30-FR39):**
   - Comprehensive CONTRIBUTING.md guide
   - Code style and commit conventions documentation
   - "Good first issues" labeling system
   - Issue templates with acceptance criteria
   - Pull request templates
   - Automated CI/CD test validation
   - Code review automation (Code Rabbit)
   - Bug and feature request templates

5. **Testing & Quality Assurance (FR40-FR48):**
   - Unit test execution (Vitest)
   - End-to-end test execution (Playwright/Cypress)
   - 100% test coverage requirement (deployment gate)
   - Automated accessibility testing (axe-core/pa11y)
   - Lighthouse audit automation
   - Code quality enforcement (ESLint, Prettier, TypeScript)
   - Local test execution capability
   - CI/CD pipeline test visibility

6. **Performance & SEO (FR49-FR58):**
   - Lighthouse Performance > 90
   - Lighthouse Accessibility = 100
   - Core Web Vitals targets (LCP < 1.5s, FID < 100ms, CLS < 0.1)
   - Optimized JavaScript bundles (< 150KB gzipped)
   - Optimized CSS (< 30KB gzipped)
   - Search engine discoverability
   - Social media rich preview cards (Open Graph, Twitter Cards)
   - Sitemap for crawlers
   - < 1s load time on modern connections
   - API response caching (5 minutes)

7. **Analytics & Monitoring (FR59-FR64):**
   - Privacy-friendly site visit tracking
   - GitHub repository link click tracking
   - Personal profile link click tracking
   - GitHub stars and forks monitoring
   - Pull request activity monitoring
   - Issue activity monitoring

8. **Build & Deployment (FR65-FR69):**
   - Automated build pipeline
   - Automated deployment on successful build/tests
   - HTTPS with valid SSL certificate
   - Zero runtime errors
   - High availability (no planned downtime)

**Architectural Implications:**

- SSR-first architecture required for instant IP visibility and SEO
- Client-side hydration for interactive features (copy, refresh, animations)
- External API integration with caching and error handling
- Component-based architecture (NuxtUI design system)
- Comprehensive testing infrastructure as first-class concern
- CI/CD pipeline as architectural component (quality gates)
- Analytics integration without compromising privacy

**Non-Functional Requirements:**

Critical NFRs that will drive architectural decisions:

1. **Performance (14 NFRs - NFR-P1 to NFR-P14):**
   - **Hard Constraints:**
     - Initial page load: < 1.5s on 4G mobile
     - LCP < 1.5s, FID < 100ms, CLS < 0.1
     - Lighthouse Performance > 90 (target: 95+)
     - JS bundle < 150KB gzipped, CSS < 30KB gzipped
     - Total page weight < 500KB initial load
     - API response < 500ms with 5-minute caching
   - **Architectural Impact:**
     - Bundle optimization strategies required
     - SSR for instant first paint
     - Code splitting and lazy loading
     - Image optimization (WebP with fallbacks)
     - Aggressive caching strategy

2. **Accessibility (12 NFRs - NFR-A1 to NFR-A12):**
   - **Hard Constraints:**
     - WCAG 2.1 Level AA compliance (non-negotiable)
     - Lighthouse Accessibility = 100
     - 4.5:1 contrast for normal text, 3:1 for large text
     - Full keyboard accessibility
     - Screen reader support
     - 44x44px minimum touch targets
   - **Architectural Impact:**
     - Semantic HTML structure mandatory
     - ARIA attributes throughout
     - Focus management system
     - Automated accessibility testing in CI/CD
     - NuxtUI components selected for built-in accessibility

3. **Reliability & Availability (10 NFRs - NFR-R1 to NFR-R10):**
   - **Hard Constraints:**
     - 99.9% uptime (< 8.76 hours downtime/year)
     - Zero planned maintenance downtime
     - Graceful API failure handling
     - Build failures prevent deployment
     - Test failures prevent deployment
   - **Architectural Impact:**
     - Progressive enhancement for resilience
     - Graceful degradation patterns
     - Error boundaries and fallback states
     - Health monitoring and alerting
     - Zero-downtime deployment strategies

4. **Maintainability & Code Quality (14 NFRs - NFR-M1 to NFR-M14):**
   - **Hard Constraints:**
     - 100% test coverage (unit + E2E combined)
     - All tests pass before merge (CI/CD gate)
     - ESLint validation (zero errors)
     - Prettier formatting enforcement
     - TypeScript strict mode (no `any` types)
     - Comprehensive documentation (README, CONTRIBUTING)
   - **Architectural Impact:**
     - TDD/test-first approach
     - Code quality tools in pre-commit hooks
     - Consistent code patterns enforced
     - Documentation as code requirement
     - Claude Code pattern adherence

5. **Usability (12 NFRs - NFR-U1 to NFR-U12):**
   - **Hard Constraints:**
     - Fully functional 320px → 1280px+
     - No horizontal scrolling at any breakpoint
     - Immediate visual feedback for all actions
     - Clear loading and error states
     - Smooth dark/light mode transitions
   - **Architectural Impact:**
     - Mobile-first CSS architecture
     - Responsive component library (NuxtUI)
     - State management for UI feedback
     - Theme system with smooth transitions
     - Toast notification system

6. **SEO (12 NFRs - NFR-S1 to NFR-S12):**
   - **Hard Constraints:**
     - Unique title tags < 60 chars
     - Meta descriptions < 160 chars
     - Open Graph and Twitter Card tags
     - Sitemap.xml generation
     - Semantic HTML5 structure
     - Mobile-friendly (Google standards)
   - **Architectural Impact:**
     - SSR for crawler-friendly HTML
     - Meta tag management system
     - Sitemap generation automation
     - Structured data implementation

7. **Security (7 NFRs - NFR-SE1 to NFR-SE7):**
   - **Hard Constraints:**
     - HTTPS only with valid SSL
     - No sensitive data exposure (client-side)
     - No API keys in client code
     - Up-to-date dependencies
     - Clean npm audit
     - Appropriate security headers
   - **Architectural Impact:**
     - Environment variable management
     - Dependency update automation
     - Security header configuration
     - Server-side API key handling

**Scale & Complexity:**

- **Primary Domain:** Full-Stack Web Application (Nuxt 4 Universal SSR)
- **Complexity Level:** Medium-High
  - **Functional Complexity:** Low (simple IP detection utility)
  - **Non-Functional Complexity:** High (portfolio-grade quality requirements)
  - **Overall:** Medium-High due to strict quality gates and multi-audience optimization

- **Estimated Architectural Components:**
  - **Frontend Layer:** 8-12 components (IP display, geolocation cards, buttons, toast system, footer)
  - **Server Layer:** 3-5 server routes (IP detection API, geolocation API proxy, health checks)
  - **Testing Layer:** 20-30 test files (unit tests per component, E2E tests per journey)
  - **Build/Deploy Layer:** CI/CD pipeline with quality gates, Lighthouse automation, deployment scripts
  - **Infrastructure Layer:** Hosting configuration, SSL management, monitoring/alerting

- **User Journey Complexity:**
  - 4 primary user journeys (General Visitor, Marc Technical Eval, Julie Contributor, Sarah Recruiter)
  - 2 error recovery flows (API failure, network timeout)
  - Multiple decision points and optional actions per journey
  - Cross-cutting journey patterns (bi-directional site ↔ code exploration)

## Technical Constraints & Dependencies

**Technology Stack (Specified):**

- **Core Framework:** Nuxt 4 (latest stable) - Universal/Hybrid rendering mode
- **UI Library:** NuxtUI (official Nuxt ecosystem design system)
- **Styling:** Tailwind CSS (integrated via NuxtUI)
- **Language:** TypeScript (strict mode, no `any` types)
- **Testing:**
  - Unit: Vitest
  - E2E: Playwright or Cypress (decision needed)
- **Package Manager:** Bun
- **Runtime:** Node.js 18+ LTS
- **Build Tool:** Vite (via Nuxt)

**External Dependencies:**

- **Geolocation API:** ip-api.com (existing integration)
  - Rate limits and caching strategy required
  - Fallback/error handling mandatory
- **Maps Integration:** Google Maps (external link, no embedded map)
- **Code Review:** Code Rabbit integration
- **Analytics:** Privacy-friendly solution (Plausible, Fathom, or similar)

**Deployment Constraints:**

- **Hosting:** Node.js SSR hosting required (not static)
- **SSL/HTTPS:** Mandatory with auto-renewal
- **CI/CD:** GitHub Actions (specified)
- **Monitoring:** Health checks and uptime monitoring
- **Zero-downtime:** Deployment strategy must support this

**Browser Support:**

- Modern browsers only (latest 2 versions)
- Chrome, Firefox, Safari, Edge
- No legacy browser support (IE11, etc.)
- ES2022+, modern CSS (Grid, Flexbox, Custom Properties)

**Development Constraints:**

- Solo developer (Mathieu) with Claude Code assistance
- Quality over speed (timeline flexible for excellence)
- TDD approach for 100% coverage
- All changes via PR with automated validation
- Code review by Code Rabbit + Claude Code

## Cross-Cutting Concerns Identified

**1. Performance Optimization (Architectural Priority #1)**

Affects: All components, server routes, build pipeline, deployment

**Concerns:**

- Bundle size management (< 150KB JS, < 30KB CSS gzipped)
- SSR optimization for instant first paint (< 1s load)
- Core Web Vitals compliance (LCP, FID, CLS)
- API response caching (5-minute strategy)
- Image optimization (WebP with fallbacks)
- Code splitting and lazy loading
- Font strategy (system fonts = zero load time)

**Architectural Decisions Needed:**

- Component lazy loading strategy
- API caching implementation approach
- Bundle analysis and optimization workflow
- Performance monitoring integration

---

**2. Accessibility Compliance (Architectural Priority #2)**

Affects: All UI components, navigation, interactions, content structure

**Concerns:**

- WCAG 2.1 Level AA compliance (non-negotiable)
- Semantic HTML structure throughout
- ARIA attributes and live regions
- Keyboard navigation and focus management
- Screen reader optimization
- Color contrast validation (4.5:1 normal, 3:1 large)
- Touch target sizes (44x44px minimum)
- Text resizability (200% without breaking)

**Architectural Decisions Needed:**

- Semantic HTML component structure
- Focus management system
- Skip link and landmark navigation
- Automated accessibility testing in CI/CD
- Screen reader testing protocol

---

**3. Testing Infrastructure (Architectural Priority #3)**

Affects: All code, CI/CD pipeline, deployment gates, development workflow

**Concerns:**

- 100% test coverage requirement (hard gate)
- Unit tests (Vitest) for all components and utilities
- E2E tests (Playwright/Cypress) for all critical journeys
- Accessibility tests (axe-core/pa11y) automated
- Lighthouse audits automated in CI/CD
- Code quality tests (ESLint, Prettier, TypeScript)
- Test failure = deployment prevention

**Architectural Decisions Needed:**

- E2E framework selection (Playwright vs Cypress)
- Test organization and structure
- CI/CD pipeline architecture with quality gates
- Test data management
- Coverage reporting and enforcement

---

**4. Dark Mode System (UX Signature Feature)**

Affects: All UI components, theme system, color tokens, transitions

**Concerns:**

- Automatic OS preference detection (`prefers-color-scheme`)
- Manual toggle capability (optional override)
- Smooth transitions without flash
- WCAG AA contrast in BOTH light and dark modes
- Consistent theme application across all components
- Theme persistence (if manual toggle added)

**Architectural Decisions Needed:**

- NuxtUI Color Mode configuration
- Theme token management
- Transition animation approach
- Theme state management

---

**5. Responsive Design (Mobile-First Architecture)**

Affects: All UI components, layout system, breakpoints, touch interactions

**Concerns:**

- Mobile-first CSS architecture (320px baseline)
- Three primary breakpoints (mobile, tablet, desktop)
- Perfect layout adaptation at ALL sizes (320px → 1280px+)
- Touch-friendly targets on mobile (48px minimum)
- No horizontal scrolling at any breakpoint
- Fluid typography and spacing
- Responsive images and assets

**Architectural Decisions Needed:**

- Layout component structure
- Breakpoint strategy (Tailwind defaults)
- Responsive image handling
- Touch target enforcement approach

---

**6. Error Handling & Graceful Degradation**

Affects: All API calls, external dependencies, client-side features

**Concerns:**

- API failure handling (geolocation unavailable)
- Network timeout handling
- Progressive enhancement (JS failure resilience)
- Graceful degradation (SSR ensures core value)
- User-friendly error messages (no technical jargon)
- Clear recovery paths ("Try Again" buttons)
- Error state consistency

**Architectural Decisions Needed:**

- Error boundary implementation
- Fallback state components
- API retry logic
- Error logging and monitoring strategy

---

**7. Code Quality & Developer Experience**

Affects: All code, documentation, contribution workflow, maintainability

**Concerns:**

- ESLint configuration (zero errors enforced)
- Prettier formatting (automated)
- TypeScript strict mode (no `any` types)
- Consistent code patterns documented
- Comprehensive README and CONTRIBUTING.md
- PR templates and issue templates
- Pre-commit hooks for quality gates
- Claude Code pattern adherence

**Architectural Decisions Needed:**

- Code organization and folder structure
- Naming conventions
- Component patterns and best practices
- Documentation structure
- Contribution workflow automation

---

**8. State Management**

Affects: UI components, data flow, reactivity, user interactions

**Concerns:**

- Simple ephemeral state (no complex global state)
- Vue 3 Composition API with composables
- No Pinia/Vuex needed (per requirements)
- Reactive data for IP/geolocation
- UI state for loading, errors, toasts
- Theme state (dark/light mode)

**Architectural Decisions Needed:**

- Composable structure for data fetching
- State reactivity patterns
- Component prop vs composable strategy

---

**9. SEO & Discoverability (Portfolio Showcase)**

Affects: Meta tags, social sharing, sitemap, structured data, HTML structure

**Concerns:**

- Unique meta titles and descriptions
- Open Graph tags for social sharing
- Twitter Card tags
- Sitemap.xml generation
- Semantic HTML structure
- Canonical URLs
- robots.txt configuration

**Architectural Decisions Needed:**

- Meta tag management approach (Nuxt SEO module?)
- Sitemap generation automation
- Structured data implementation

---

**10. Analytics & Monitoring (Privacy-First)**

Affects: User tracking, GitHub click tracking, performance monitoring

**Concerns:**

- Privacy-friendly analytics (no intrusive cookies)
- Site visit tracking
- GitHub link click tracking
- Repository star/fork monitoring
- Performance monitoring (Core Web Vitals)
- Error monitoring and alerting
- Uptime monitoring (99.9% target)

**Architectural Decisions Needed:**

- Analytics provider selection (Plausible/Fathom/etc)
- Event tracking implementation
- Monitoring tool integration
- Alerting configuration
