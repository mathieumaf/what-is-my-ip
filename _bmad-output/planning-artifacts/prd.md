---
stepsCompleted:
  [
    'step-01-init',
    'step-02-discovery',
    'step-03-success',
    'step-04-journeys',
    'step-05-domain',
    'step-06-innovation',
    'step-07-project-type',
    'step-08-scoping',
    'step-09-functional',
    'step-10-nonfunctional',
    'step-11-polish',
  ]
inputDocuments:
  - 'README.md'
  - 'AGENTS.md'
workflowType: 'prd'
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 2
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'medium'
  projectContext: 'brownfield'
  scopeType: 'architectural_refactor'
  keyObjectives:
    - 'Modern UI/UX refactor with NuxtUI'
    - 'Dark mode auto-switch + WCAG AA compliance'
    - 'Modern architecture and scalability'
    - 'Comprehensive testing (Unit + E2E)'
    - 'Showcase Nuxt 4 ecosystem expertise'
---

# Product Requirements Document - what-is-my-ip

**Author:** Mathieu
**Date:** 2026-01-21
**Project Type:** Architectural Refactor (Brownfield)

## Executive Summary

This PRD defines the complete architectural refactor of "what-is-my-ip" - a portfolio-first project designed to demonstrate professional mastery of Nuxt 4 and modern web development practices to recruiters and technical leads. The refactor transforms an existing IP detection application into a showcase of 2026 best practices, featuring comprehensive testing, accessibility compliance, and modern architecture patterns.

**Core Objective:** Prove technical competence in 5 minutes of code/site review, generating career opportunities through GitHub visibility and professional recognition.

**Success Metric:** When a Lead Developer reviews the project and thinks "I want to interview this developer," the project succeeds.

## Success Criteria

### User Success

**For Recruiters & Developers visiting the project:**

The product succeeds when visitors immediately perceive: "This developer knows their domain and applies 2026 best practices."

**The "WOW" Moment:**

1. **Site Experience:** Fast, modern, functional interface showcasing technical excellence
2. **Code Quality:** Well-structured, documented, clear architecture demonstrating professional standards

**Bi-directional Journey:** Visitors impressed by the UI explore the implementation (Site → Code), while developers reviewing the repository want to see the live result (Code → Site).

### Business Success

**Portfolio Impact Metrics (3-6 months):**

- GitHub Stars: 5-10 = clear success signal
- Engagement: Issues, PRs, or feedback from external developers
- Visibility: Regular site visitors who click through to source code
- Professional Recognition: Project mentioned in interviews/discussions

**Required Elements:**

- Visible links to GitHub repository and personal profile
- Analytics tracking repository clicks

### Technical Success

**Quality Gates (Non-negotiable):**

- Test Coverage: 100% (deployment gate)
- Test Status: ALL tests pass before production deployment
- Lighthouse Performance Score > 90
- WCAG AA compliance
- Modern, scalable architecture following 2026 best practices

**Measurable Outcomes:**

- ✅ Lighthouse Performance > 90, Accessibility = 100
- ✅ 100% test coverage, all tests passing (CI/CD gate)
- ✅ 5-10 GitHub stars within 3-6 months
- ✅ At least 1 external interaction (issue/PR/feedback)
- ✅ Analytics tracking repository clicks

## Product Scope Overview

This refactor follows a phased approach prioritizing quality over speed:

**Phase 1 (MVP):** Complete excellence package - modern UI with NuxtUI, dark mode, WCAG AA, 100% test coverage, optimized performance, comprehensive documentation, and contribution infrastructure. All MVP features are non-negotiable.

**Phase 2 (Growth):** Advanced animations, i18n (English + French priority), data export, analytics dashboard.

**Phase 3 (Vision):** Public API, embeddable widget, browser extension, community ecosystem.

_Detailed scope breakdown in Project Scoping & Phased Development section below._

## User Journeys

The following user journeys reveal the distinct capabilities required to serve each audience effectively.

### Journey 1: Marc Dubois - The Perfectionist Lead Developer

**Persona:**
Marc is a Lead Developer at a 50-person Paris scale-up hiring 2 Nuxt/Vue developers within 3 months. He receives 40+ CVs weekly and is tired of portfolio projects with poor structure and no substance.

**Goal:** Find a developer who truly masters Nuxt 4, applies best practices, tests code, and thinks about architecture.

**Obstacle:** 90% of GitHub portfolios show demo projects without tests, messy architecture, and spaghetti code.

**The Journey:**

**Opening (LinkedIn, 3:37 PM):** Marc receives a job application, clicks the GitHub profile, sees "what-is-my-ip." He's skeptical but has 5 minutes before his next meeting.

**Exploration (5 minutes):**

1. **First Glance (10s):** Clean folder structure (`app/`, `server/`, `tests/`). Nuxt 4. TypeScript. _"Organized."_
2. **README (30s):** Clear architecture, mentions NuxtUI, WCAG, E2E tests. _"Interesting."_
3. **Code Deep Dive (2-3 min):** Opens `app/pages/index.vue` - clean Composition API. Checks `server/api/ip.get.ts` - proper error handling. Views `tests/` - Vitest + Playwright, 100% coverage. _"Consistent patterns throughout."_
4. **Live Site (30s):** Dark mode auto-switches. Clean interface. DevTools Lighthouse: Score 98. _"This dev knows what they're doing."_

**Decision:** Marc stars the repo, copies link to Notion: _"Must interview - real Nuxt 4 mastery, solid tests, attention to detail."_ Messages recruiter: "This one, I want to talk to them."

**Critical Success Factors:** Organization respecting standards, performance/accessibility/design executed properly, fully responsive, clean documented code, no downtime/SSL errors, no spelling errors in documentation.

---

### Journey 2: Julie Lemoine - The Open Source Contributor

**Persona:**
Julie is a junior developer (1 year experience, primarily React) wanting to learn Nuxt/Vue through real code contribution.

**Goal:** Make her first open source contribution to a well-structured project, gaining something concrete for interviews.

**Obstacles:** Large projects intimidate; small projects are abandoned/poorly documented; fear of criticism.

**The Journey:**

**Discovery (GitHub Explore, Sunday 2 PM):** Julie filters for "Nuxt," "TypeScript," "good first issue." Finds the repo with clear description, "Contributions welcome" badge, well-organized issues. _"This looks clean."_

**Preparation (15-20 minutes):**

1. **README (2 min):** Clear installation (`bun install`, `bun run dev`), points to `CONTRIBUTING.md`.
2. **CONTRIBUTING.md (3-4 min):** Clear fork/branch/test guide, commit conventions, welcoming tone. _"Super clear. I can do this."_
3. **Code Exploration (10 min):** Clones repo, runs dev - works first try. Browses `app/components/` - readable, well-commented. Runs tests - all passing ✅.
4. **Issue Selection (5 min):** Finds "Add copy-to-clipboard button for IP address" (`good first issue`, `help wanted`). Detailed description with acceptance criteria. _"Perfect for me."_

**Contribution (2-3 hours):** Creates `feat/copy-ip-button` branch, implements with NuxtUI `<UButton>`, adds tests following existing patterns, all tests pass ✅. Opens PR with template guidance, CI/CD validates automatically.

**Code Review (24-48h):** Mathieu responds quickly with constructive feedback. Julie adjusts, PR merged! 🎉

**Outcome:** Julie gains her first merged open source contribution, learns Nuxt 4/NuxtUI practically, understands professional GitHub workflows. Stars ⭐ the repo.

**Critical Success Factors:** Detailed welcoming CONTRIBUTING.md, well-labeled "good first issues," PR template, automated CI/CD validation, kind quick code review (Code Rabbit + Claude Code), documented code with clear patterns.

---

### Journey 3: Sarah Martinez - The Technical Recruiter

**Persona:**
Sarah is a senior tech recruiter at a 100+ person IT services company, screening 47 applications this week for 3 Fullstack JS/TS positions.

**Problem:** Sarah isn't a developer. She relies on visible quality signals, GitHub activity, professional presentation, general portfolio impression.

**Goal:** Quickly identify (3-5 minutes max) serious candidates for technical leads, avoiding time waste on junior profiles overselling themselves.

**Obstacle:** 99% of CVs claim "Vue/Nuxt Mastery" but verification is impossible. GitHub profiles are often empty or filled with inactive forks.

**The Journey:**

**LinkedIn Screening (Monday 9:23 AM):** Sarah has 3 minutes before her next call. Sees: _"Mathieu Mafille - Fullstack Developer - Nuxt | TypeScript | Modern Web"_. Clean profile, clicks GitHub link.

**Rapid Evaluation (3 minutes 15 seconds):**

1. **GitHub Profile (15s):** Photo consistent with LinkedIn ✅. Sees "what-is-my-ip" pinned: ⭐ 8 stars, 🍴 2 forks. _"There's activity."_
2. **Repository Landing (30s):** Visual badges (Build: Passing, Tests: 100% Coverage, Lighthouse: 98, License: MIT). Description: "Modern IP detection app built with Nuxt 4 + NuxtUI." _"Green badges everywhere. Professional."_
3. **README Scan (1 min):** Features with emojis (🔍 IP Detection, 📍 Geolocation, ⚡ Fast, ✅ 100% Tests, ♿ WCAG AA), screenshot/GIF, tech stack logos, prominent "Live Demo" button. _"Clear, visual, professional."_
4. **Live Site (1 min):** Loads instantly. Modern clean interface. Dark mode (her OS setting). Resizes window - perfect responsive. Maps link works. Footer shows "View on GitHub" + "Contact." _"Really good. Fast, beautiful."_
5. **GitHub Check (30s):** Recent commits ✅, "good first issue" labels, merged PR, relevant topics. _"Real active project."_

**Decision:** Sarah tags profile "⭐ Strong Portfolio," notes: _"Nuxt 4 project, 100% test coverage, professional presentation, active GitHub. Pass to Marc for technical review."_ Messages Marc: _"Worth digging deeper?"_

**Outcome:** Profile passes first filter. Sarah identified serious candidate. Portfolio did its job: provide quality signals visible to non-technical recruiter.

**Critical Success Factors:** Visual badges (Build/Tests/Coverage/Lighthouse), screenshots/GIF, scannable features with emojis, prominent "Live Demo" button, tech stack logos, instant loading, modern design, responsive, no errors, GitHub/Contact footer links, pinned project, visible activity, social proof, relevant topics.

---

### Journey Requirements Summary

**From Marc (Technical Deep Dive):**

- Clean folder structure, consistent patterns, well-documented code, modern TypeScript, Composition API
- Comprehensive test suite (Unit + E2E), 100% coverage, clear test patterns
- Lighthouse > 90, WCAG AA, fully responsive, dark mode auto-switch, zero errors, proper SSL

**From Julie (Contributor Experience):**

- Comprehensive CONTRIBUTING.md, well-labeled issues with acceptance criteria, PR template
- Automated CI/CD validation, code review process (Code Rabbit + Claude Code), welcoming feedback culture, documented commit/code style conventions

**From Sarah (First Impression):**

- Visual badges, screenshots/GIFs, scannable features, prominent "Live Demo" button, tech stack logos, professional writing
- Pinned project, clear description, relevant topics/tags, active commits, social proof
- Instant loading, modern design, GitHub/Contact footer links, click analytics

**Cross-Cutting:** Active maintenance, professional presentation at every touchpoint, seamless bi-directional journey (site ↔ code), immediately visible quality signals.

## Web App Specific Requirements

### Project-Type Overview

**Application Type:** Modern Web Application (Nuxt 4 Universal/Hybrid)

Server-side rendered (SSR) web application with client-side hydration, leveraging Nuxt 4's universal rendering mode for optimal SEO, performance, and user experience.

**Target Platform:** Modern web browsers (latest 2 versions of Chrome, Firefox, Safari, Edge). No legacy browser support.

### Technical Architecture

**Rendering Strategy:**

- Mode: Universal/Hybrid (SSR + Client Hydration)
- Implementation: Server-side rendering on initial load, client-side navigation thereafter
- Static Generation: Not required for dynamic content

**Browser Feature Assumptions:** ES2022+, CSS Grid/Flexbox, CSS Custom Properties, modern JavaScript APIs (Fetch, Promises, async/await), `prefers-color-scheme` media query.

**Responsive Design:**

- Breakpoints: Mobile (320-639px), Tablet (640-1023px), Desktop (1024-1279px), Large Desktop (1280px+)
- Approach: Mobile-first, touch-friendly targets (44x44px min), fluid spacing/typography
- Critical Elements: IP cards stack on mobile/grid on desktop, tappable map links, adaptive nav/footer, accessible dark mode toggle

**Performance Targets:** See detailed metrics in Non-Functional Requirements (Performance section).

**SEO Strategy:**

- Meta tags: Descriptive titles (<60 chars), compelling descriptions (<160 chars), Open Graph, Twitter Cards, canonical URLs
- Structure: Semantic HTML5, proper heading hierarchy, meaningful alt text
- Technical: Sitemap.xml, robots.txt, SSR via Nuxt, mobile-friendly, HTTPS, optimized page speed

**Accessibility:** WCAG 2.1 Level AA Compliance (Non-negotiable). See detailed requirements in Non-Functional Requirements (Accessibility section).

**Implementation Stack:**

- Core: Nuxt 4 (latest stable), NuxtUI design system, Tailwind CSS, TypeScript strict mode
- Testing: Vitest (unit) + Playwright/Cypress (E2E)
- Environment: Bun (package manager), Node 18+ (LTS), Vite dev server
- Build/Deploy: Nuxt build (Vite-based), Universal output, Docker containerization, Node.js SSR hosting

**API Integration:**

- External: ip-api.com (existing)
- Server Route: `/api/ip` (Nuxt server route)
- Error Handling: Graceful degradation, user-friendly messages
- Caching: 5-minute API response cache to reduce external calls

**State Management:** Minimal - Vue 3 Composition API with composables. No Pinia/Vuex needed (simple ephemeral state).

**Repository Requirements:**

- README: Badges (build/tests/coverage/Lighthouse/license), screenshots/GIF, features, demo button, tech logos, installation instructions
- Contributing: CONTRIBUTING.md, PR template, issue templates (bug/feature/good-first-issue)
- CI/CD: GitHub Actions (testing/coverage/Lighthouse/deployment)
- Code Quality: ESLint, Prettier, TypeScript strict, Code Rabbit integration, pre-commit hooks
- Analytics: Privacy-friendly site visit tracking, GitHub click tracking

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Excellence Showcase MVP

This is not a traditional "Minimum Viable Product" for rapid market validation. This is a **portfolio-first project** where MVP represents **"Minimum Impressive Product"** - the baseline quality needed to demonstrate professional mastery of Nuxt 4 and modern web development to recruiters and technical leads.

**Philosophy: Quality Over Speed**

Timeline is flexible to ensure every aspect meets professional standards. Cutting features to meet arbitrary deadlines would undermine the core objective. With Claude Code as development accelerator, velocity is maintained without compromising quality.

**Primary Success Criterion:** When Marc (Lead Dev) reviews the project and thinks _"I want to interview this developer"_, the MVP succeeds.

**Resource Approach:**

- Developer: Solo (Mathieu)
- AI Assistance: Claude Code (architecture, patterns, testing, documentation)
- Timeline: Flexible - "done when it's excellent"
- Code Review: Code Rabbit + Claude Code for quality assurance

### MVP Feature Set (Phase 1) - Complete Excellence Package

**All MVP features are non-negotiable and will be implemented.**

**Core User Journeys Supported:**

1. Marc's Journey: Clean codebase exploration, 100% test coverage visibility, Lighthouse verification, live site validation
2. Julie's Journey: Contributing infrastructure, labeled good-first-issues, PR workflow, welcoming code review
3. Sarah's Journey: Visual quality signals (badges/screenshots), professional README, instant site performance, active project indicators

**Must-Have Capabilities:**

**UI/UX Excellence:**

- Complete UI refactor with NuxtUI design system
- Dark mode with automatic OS-based switching (`prefers-color-scheme`)
- WCAG 2.1 Level AA accessibility compliance (non-negotiable)
- Modern, clean interface design
- Fully responsive (320px mobile → 1280px+ desktop)
- English language only

**Architecture Modernization:**

- Complete codebase reorganization following 2026 best practices
- Clean separation of concerns (frontend/backend/utilities)
- Vue 3 Composition API patterns throughout
- Scalable folder architecture
- TypeScript strict mode
- Well-documented code with clear comments

**Testing Infrastructure (100% Coverage - Deployment Gate):**

- Comprehensive unit testing with Vitest
- End-to-end testing with Playwright or Cypress
- 100% test coverage (no exceptions)
- CI/CD integration with GitHub Actions
- Automated test gates preventing deployment if tests fail
- Tests following clear, reusable patterns

**Technical Excellence:**

- Lighthouse Performance Score > 90 (target: 95+)
- Lighthouse Accessibility Score: 100
- Core Web Vitals optimization (LCP < 1.5s, FID < 100ms, CLS < 0.1)
- Optimized bundle sizes (JS < 150KB gzipped, CSS < 30KB gzipped)
- Modern TypeScript patterns throughout
- SEO optimization (meta tags, Open Graph, Twitter Cards, sitemap.xml)
- Proper SSL/HTTPS configuration
- Zero runtime errors

**User-Facing Features:**

- Core IP detection functionality (maintained from existing)
- Geolocation data display (country, region, city, ISP, coordinates)
- Clean, card-based information layout
- Interactive Google Maps link
- Manual refresh functionality
- Copy-to-clipboard for IP address (potential good first issue for contributors)

**GitHub & Repository Optimization:**

- README Excellence: Visual badges, screenshots/GIF, scannable features (emojis), prominent "Live Demo" button, tech logos, clear installation instructions, zero spelling errors
- Contributing Infrastructure: Comprehensive CONTRIBUTING.md, PR template, issue templates (bug/feature/good-first-issue), well-labeled issues with acceptance criteria, commit/code style documentation
- CI/CD Pipeline: GitHub Actions (testing, build verification, coverage reporting, Lighthouse monitoring, automated deployment)
- Code Quality Tools: ESLint, Prettier, TypeScript strict checks, Code Rabbit integration, pre-commit hooks
- Analytics & Tracking: Privacy-friendly site visit tracking, GitHub link click tracking, repository star/fork monitoring

### Post-MVP Features

**Phase 2: Growth & Enhancement (Post-Launch)**

Implemented after MVP launch based on user feedback and engagement metrics:

- Enhanced Interactions: Advanced animations/micro-interactions, polished transitions/loading states, hover effects, smooth scrolling/navigation
- **i18n Implementation (Priority Feature):** Multi-language support starting English + French, expandable, language switcher, SEO optimization for multiple languages
- Extended Functionality: Data export (JSON/CSV), advanced analytics dashboard, IP history tracking, comparison features, additional geolocation data sources
- Developer Experience: More comprehensive documentation, Architecture Decision Records (ADRs), API documentation if public API added, video tutorials/demo walkthroughs

**Phase 3: Expansion & Vision (Long-term)**

Long-term vision features transforming the project into a platform:

- **Public API:** RESTful API with authentication/API keys, rate limiting, usage analytics, Swagger/OpenAPI docs, client SDKs (JavaScript, Python)
- **Embeddable Widget:** Lightweight JavaScript widget with customizable styling, minimal dependencies, easy integration (copy-paste snippet)
- **Browser Extension:** Chrome/Firefox extension with one-click IP detection, popup with full data, browser action integration
- **Community & Scale:** Community plugins/themes, extended geolocation integrations, advanced visualizations (maps/charts/trends), user accounts, API marketplace

### Risk Mitigation Strategy

**Technical Risks:**

- Over-engineering MVP: Strict adherence to defined scope, document new ideas as Phase 2/3 GitHub issues
- 100% test coverage: TDD approach, write tests alongside features, coverage reports for gap identification, Claude Code test generation, CI/CD gate from day one
- WCAG AA compliance gaps: Leverage NuxtUI (accessible by default), automated testing (axe-core/pa11y), manual keyboard/screen reader testing, frequent Lighthouse audits

**Market/Portfolio Risks:**

- Low visibility/discoverability: SEO optimization, Nuxt.com showcase submission, LinkedIn/Twitter promotion, Dev.to/Medium article, GitHub topics/tags, Nuxt/Vue community engagement
- Limited contributor engagement: Genuinely useful "good first issues," beginner-friendly community promotion, quick encouraging reviews, public contribution celebration, low barrier (documentation counts)

**Resource/Execution Risks:**

- Project abandonment before MVP completion: Commit to completing MVP regardless of timeline, milestone tracking with progress celebration, public commitment (LinkedIn announcement), Claude Code for velocity, weekly milestones for momentum, no feature creep
- Scope creep during development: Documented MVP scope as contract, new ideas → Phase 2/3 GitHub issues, weekly scope review ("essential for MVP?"), Claude Code maintains implementation focus

**Contingency Plans:**

- If blocked on technical challenge: Leverage Claude Code for solutions, or simplify implementation while maintaining user-facing quality
- If timeline extends beyond expectations: Quality is non-negotiable; adjust personal expectations, not MVP scope
- If motivation wanes: Review user journeys (Marc, Julie, Sarah) to reconnect with "why" - this project opens career doors

## Functional Requirements

### IP Detection & Geolocation Display

- **FR1:** Visitors can view their public IP address automatically upon page load
- **FR2:** Visitors can view geolocation data associated with their IP address (country, region, city, timezone)
- **FR3:** Visitors can view ISP (Internet Service Provider) information for their IP address
- **FR4:** Visitors can view geographic coordinates (latitude, longitude) for their IP location
- **FR5:** Visitors can view AS (Autonomous System) number for their IP address
- **FR6:** Visitors can manually refresh IP and geolocation data
- **FR7:** Visitors can access their location on an interactive map via external link (Google Maps)
- **FR8:** Visitors can copy their IP address to clipboard with a single action
- **FR9:** System can gracefully handle API failures and display appropriate error messages

### User Interface & Accessibility

- **FR10:** Visitors can view the application in light mode or dark mode
- **FR11:** System automatically switches theme based on operating system preferences
- **FR12:** Visitors can manually toggle between light and dark themes
- **FR13:** Visitors can navigate all interactive elements using keyboard only
- **FR14:** Visitors using screen readers can access all information and functionality
- **FR15:** Visitors can view the application on mobile devices (320px width minimum)
- **FR16:** Visitors can view the application on tablet devices
- **FR17:** Visitors can view the application on desktop devices (up to 1280px+ width)
- **FR18:** Visitors can resize text up to 200% without loss of functionality
- **FR19:** Visitors can interact with touch targets that meet minimum size requirements (44x44px)
- **FR20:** Visitors can view content with sufficient color contrast ratios (WCAG AA)

### Repository Discovery & Navigation

- **FR21:** Visitors can navigate from the live site to the GitHub repository via visible link
- **FR22:** Visitors can navigate from the live site to the developer's personal profile
- **FR23:** GitHub visitors can view project status via visual badges (build, tests, coverage, Lighthouse)
- **FR24:** GitHub visitors can view screenshots or animated demonstrations of the application
- **FR25:** GitHub visitors can access the live demo with a prominently displayed link
- **FR26:** GitHub visitors can view the technology stack with visual logos
- **FR27:** GitHub visitors can see recent commit activity indicating active development
- **FR28:** GitHub visitors can see clear installation and development instructions
- **FR29:** GitHub visitors can discover the project via relevant topics and tags

### Contribution & Collaboration

- **FR30:** Potential contributors can view comprehensive contribution guidelines
- **FR31:** Potential contributors can view code style standards and conventions
- **FR32:** Potential contributors can view commit message conventions
- **FR33:** Potential contributors can discover "good first issues" via labels
- **FR34:** Potential contributors can view issue descriptions with context and acceptance criteria
- **FR35:** Contributors can submit pull requests using a structured template
- **FR36:** Contributors can view automated test results for their pull requests
- **FR37:** Contributors can receive code review feedback via automated tools (Code Rabbit)
- **FR38:** Contributors can report bugs using a structured issue template
- **FR39:** Contributors can request features using a structured issue template

### Testing & Quality Assurance

- **FR40:** System can execute unit tests for all code components
- **FR41:** System can execute end-to-end tests for critical user journeys
- **FR42:** System can generate test coverage reports showing 100% coverage
- **FR43:** System can prevent deployment when tests fail
- **FR44:** System can run automated accessibility tests (axe-core/pa11y)
- **FR45:** System can run automated Lighthouse audits
- **FR46:** System can enforce code quality standards (ESLint, Prettier, TypeScript)
- **FR47:** Developers can run all tests locally before committing
- **FR48:** Developers can view test results in CI/CD pipeline

### Performance & SEO

- **FR49:** System can achieve Lighthouse Performance score > 90
- **FR50:** System can achieve Lighthouse Accessibility score of 100
- **FR51:** System can achieve Core Web Vitals targets (LCP < 1.5s, FID < 100ms, CLS < 0.1)
- **FR52:** System can serve optimized JavaScript bundles (< 150KB gzipped)
- **FR53:** System can serve optimized CSS (< 30KB gzipped)
- **FR54:** Search engines can discover and index the application
- **FR55:** Social media platforms can display rich preview cards when sharing links (Open Graph, Twitter Cards)
- **FR56:** Search engines can access a sitemap for crawling
- **FR57:** Visitors can load the application within 1 second on modern connections
- **FR58:** System can cache API responses to reduce external API calls

### Analytics & Monitoring

- **FR59:** System can track site visits in a privacy-friendly manner
- **FR60:** System can track clicks to GitHub repository link
- **FR61:** System can track clicks to personal profile link
- **FR62:** Project maintainer can monitor GitHub stars and forks
- **FR63:** Project maintainer can monitor pull request activity
- **FR64:** Project maintainer can monitor issue activity

### Build & Deployment

- **FR65:** System can build production-ready artifacts via automated pipeline
- **FR66:** System can deploy to production environment automatically upon successful build and tests
- **FR67:** System can serve the application via HTTPS with valid SSL certificate
- **FR68:** System can serve the application without runtime errors
- **FR69:** System can handle high availability requirements (no planned downtime)

## Non-Functional Requirements

### Performance

**Page Load Performance:**

- **NFR-P1:** Initial page load must complete within 1.5 seconds on 4G mobile connection
- **NFR-P2:** Largest Contentful Paint (LCP) must occur within 1.5 seconds
- **NFR-P3:** First Input Delay (FID) must be less than 100 milliseconds
- **NFR-P4:** Cumulative Layout Shift (CLS) must be less than 0.1
- **NFR-P5:** Time to Interactive (TTI) must be less than 3 seconds

**Lighthouse Scores:**

- **NFR-P6:** Lighthouse Performance score must be 90 or higher (target: 95+)
- **NFR-P7:** Lighthouse Best Practices score must be 95 or higher (target: 100)
- **NFR-P8:** Lighthouse SEO score must be 95 or higher (target: 100)

**Bundle Optimization:**

- **NFR-P9:** Initial JavaScript bundle size must not exceed 150KB (gzipped)
- **NFR-P10:** Initial CSS bundle size must not exceed 30KB (gzipped)
- **NFR-P11:** Total page weight (including all assets) must not exceed 500KB on initial load
- **NFR-P12:** Images must be optimized and served in modern formats (WebP with fallbacks)

**API Response Times:**

- **NFR-P13:** IP detection API endpoint must respond within 500 milliseconds under normal load
- **NFR-P14:** API responses must be cached for 5 minutes to reduce external API calls

### Accessibility

**WCAG 2.1 Level AA Compliance:**

- **NFR-A1:** All color contrast ratios must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- **NFR-A2:** All interactive elements must be keyboard accessible with logical tab order
- **NFR-A3:** All interactive elements must have visible focus indicators
- **NFR-A4:** All images must have appropriate alt text or be marked as decorative
- **NFR-A5:** All form inputs must have associated labels
- **NFR-A6:** Page content must remain functional when text is resized up to 200%
- **NFR-A7:** Screen readers must be able to access and announce all content and functionality
- **NFR-A8:** Touch targets must be minimum 44x44 pixels for motor accessibility
- **NFR-A9:** Information must not be conveyed by color alone
- **NFR-A10:** Dark mode must maintain WCAG AA contrast ratios

**Accessibility Testing:**

- **NFR-A11:** Automated accessibility tests (axe-core or pa11y) must report zero critical violations
- **NFR-A12:** Lighthouse Accessibility score must be 100

### Reliability & Availability

**Uptime Requirements:**

- **NFR-R1:** Application must maintain 99.9% uptime (< 8.76 hours downtime per year)
- **NFR-R2:** No planned maintenance downtime (use zero-downtime deployment strategies)
- **NFR-R3:** SSL certificate must be valid and auto-renewing
- **NFR-R4:** Application must serve content via HTTPS only (HTTP redirects to HTTPS)

**Error Handling:**

- **NFR-R5:** External API failures must be handled gracefully with user-friendly error messages
- **NFR-R6:** Application must not display runtime errors to users (graceful degradation)
- **NFR-R7:** Failed API calls must be logged for monitoring without breaking user experience

**Monitoring & Recovery:**

- **NFR-R8:** Application health must be monitored with automated alerts for downtime
- **NFR-R9:** Build failures must prevent deployment to production
- **NFR-R10:** Failed tests must prevent deployment to production

### Maintainability & Code Quality

**Code Quality Standards:**

- **NFR-M1:** All code must pass ESLint validation with zero errors
- **NFR-M2:** All code must be formatted with Prettier
- **NFR-M3:** TypeScript must be used in strict mode with no `any` types except where explicitly justified
- **NFR-M4:** Code must follow consistent patterns throughout the codebase
- **NFR-M5:** Complex functions must include inline comments explaining logic

**Testing Requirements:**

- **NFR-M6:** Test coverage must be 100% (unit + E2E combined)
- **NFR-M7:** All tests must pass before code can be merged
- **NFR-M8:** Critical user journeys must have end-to-end test coverage
- **NFR-M9:** Tests must run in CI/CD pipeline on every pull request

**Documentation Standards:**

- **NFR-M10:** README must be comprehensive with clear installation instructions
- **NFR-M11:** CONTRIBUTING.md must provide clear guidelines for contributors
- **NFR-M12:** Code comments must be clear, accurate, and explain the "why" not just the "what"
- **NFR-M13:** README must have zero spelling or grammatical errors
- **NFR-M14:** All environment variables and configuration options must be documented

### Usability

**Responsive Design:**

- **NFR-U1:** Application must be fully functional on mobile devices (320px width minimum)
- **NFR-U2:** Application must adapt layout for tablet devices (640px-1024px)
- **NFR-U3:** Application must optimize layout for desktop devices (1024px+)
- **NFR-U4:** No horizontal scrolling should occur at any breakpoint
- **NFR-U5:** Touch interactions must feel natural on mobile devices

**User Experience:**

- **NFR-U6:** All user actions must provide immediate visual feedback
- **NFR-U7:** Loading states must be clearly indicated during data fetching
- **NFR-U8:** Error states must provide clear, actionable guidance to users
- **NFR-U9:** Dark/light mode transitions must be smooth without jarring flashes

**Content Clarity:**

- **NFR-U10:** All text must use clear, simple English (no jargon unless necessary)
- **NFR-U11:** Information hierarchy must be clear with proper heading structure
- **NFR-U12:** Interactive elements must be visually distinguishable from static content

### Search Engine Optimization (SEO)

**Discoverability:**

- **NFR-S1:** All pages must have unique, descriptive title tags (< 60 characters)
- **NFR-S2:** All pages must have compelling meta descriptions (< 160 characters)
- **NFR-S3:** Open Graph tags must be present for social media sharing
- **NFR-S4:** Twitter Card tags must be present for Twitter/X sharing
- **NFR-S5:** Sitemap.xml must be generated and accessible to search engines
- **NFR-S6:** Robots.txt must allow appropriate indexing

**Technical SEO:**

- **NFR-S7:** Pages must use semantic HTML5 elements
- **NFR-S8:** Heading hierarchy must be logical (single H1, properly nested H2-H6)
- **NFR-S9:** Canonical URLs must be properly configured
- **NFR-S10:** Page must be mobile-friendly per Google standards

**Social Sharing:**

- **NFR-S11:** Shared links must display rich preview cards with image, title, and description
- **NFR-S12:** Preview image must be high-quality and representative of the application

### Security (Basic)

**Basic Security Hygiene:**

- **NFR-SE1:** All communication must occur over HTTPS with valid SSL certificate
- **NFR-SE2:** No sensitive information should be exposed in client-side code or console
- **NFR-SE3:** External API keys (if any) must not be exposed in client-side code
- **NFR-SE4:** Dependencies must be kept up-to-date with security patches
- **NFR-SE5:** No known security vulnerabilities in dependencies (npm audit clean)

**HTTP Security Headers:**

- **NFR-SE6:** Application must set appropriate security headers (CSP, X-Frame-Options, etc.)
- **NFR-SE7:** Cookies (if used) must be secure and HttpOnly where appropriate
