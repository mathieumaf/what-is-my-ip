---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture/index.md'
  - '_bmad-output/planning-artifacts/ux-design-specification/index.md'
totalEpics: 7
totalStories: 40
---

# what-is-my-ip - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for what-is-my-ip, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**IP Detection & Geolocation Display:**

- FR1: Visitors can view their public IP address automatically upon page load
- FR2: Visitors can view geolocation data associated with their IP address (country, region, city, timezone)
- FR3: Visitors can view ISP (Internet Service Provider) information for their IP address
- FR4: Visitors can view geographic coordinates (latitude, longitude) for their IP location
- FR5: Visitors can view AS (Autonomous System) number for their IP address
- FR6: Visitors can manually refresh IP and geolocation data
- FR7: Visitors can access their location on an interactive map via external link (Google Maps)
- FR8: Visitors can copy their IP address to clipboard with a single action
- FR9: System can gracefully handle API failures and display appropriate error messages

**User Interface & Accessibility:**

- FR10: Visitors can view the application in light mode or dark mode
- FR11: System automatically switches theme based on operating system preferences
- FR12: Visitors can manually toggle between light and dark themes
- FR13: Visitors can navigate all interactive elements using keyboard only
- FR14: Visitors using screen readers can access all information and functionality
- FR15: Visitors can view the application on mobile devices (320px width minimum)
- FR16: Visitors can view the application on tablet devices
- FR17: Visitors can view the application on desktop devices (up to 1280px+ width)
- FR18: Visitors can resize text up to 200% without loss of functionality
- FR19: Visitors can interact with touch targets that meet minimum size requirements (44x44px)
- FR20: Visitors can view content with sufficient color contrast ratios (WCAG AA)

**Repository Discovery & Navigation:**

- FR21: Visitors can navigate from the live site to the GitHub repository via visible link
- FR22: Visitors can navigate from the live site to the developer's personal profile
- FR23: GitHub visitors can view project status via visual badges (build, tests, coverage, Lighthouse)
- FR24: GitHub visitors can view screenshots or animated demonstrations of the application
- FR25: GitHub visitors can access the live demo with a prominently displayed link
- FR26: GitHub visitors can view the technology stack with visual logos
- FR27: GitHub visitors can see recent commit activity indicating active development
- FR28: GitHub visitors can see clear installation and development instructions
- FR29: GitHub visitors can discover the project via relevant topics and tags

**Contribution & Collaboration:**

- FR30: Potential contributors can view comprehensive contribution guidelines
- FR31: Potential contributors can view code style standards and conventions
- FR32: Potential contributors can view commit message conventions
- FR33: Potential contributors can discover "good first issues" via labels
- FR34: Potential contributors can view issue descriptions with context and acceptance criteria
- FR35: Contributors can submit pull requests using a structured template
- FR36: Contributors can view automated test results for their pull requests
- FR37: Contributors can receive code review feedback via automated tools (Code Rabbit)
- FR38: Contributors can report bugs using a structured issue template
- FR39: Contributors can request features using a structured issue template

**Testing & Quality Assurance:**

- FR40: System can execute unit tests for all code components
- FR41: System can execute end-to-end tests for critical user journeys
- FR42: System can generate test coverage reports showing 100% coverage
- FR43: System can prevent deployment when tests fail
- FR44: System can run automated accessibility tests (axe-core/pa11y)
- FR45: System can run automated Lighthouse audits
- FR46: System can enforce code quality standards (ESLint, Prettier, TypeScript)
- FR47: Developers can run all tests locally before committing
- FR48: Developers can view test results in CI/CD pipeline

**Performance & SEO:**

- FR49: System can achieve Lighthouse Performance score > 90
- FR50: System can achieve Lighthouse Accessibility score of 100
- FR51: System can achieve Core Web Vitals targets (LCP < 1.5s, FID < 100ms, CLS < 0.1)
- FR52: System can serve optimized JavaScript bundles (< 150KB gzipped)
- FR53: System can serve optimized CSS (< 30KB gzipped)
- FR54: Search engines can discover and index the application
- FR55: Social media platforms can display rich preview cards when sharing links (Open Graph, Twitter Cards)
- FR56: Search engines can access a sitemap for crawling
- FR57: Visitors can load the application within 1 second on modern connections
- FR58: System can cache API responses to reduce external API calls

**Analytics & Monitoring:**

- FR59: System can track site visits in a privacy-friendly manner
- FR60: System can track clicks to GitHub repository link
- FR61: System can track clicks to personal profile link
- FR62: Project maintainer can monitor GitHub stars and forks
- FR63: Project maintainer can monitor pull request activity
- FR64: Project maintainer can monitor issue activity

**Build & Deployment:**

- FR65: System can build production-ready artifacts via automated pipeline
- FR66: System can deploy to production environment automatically upon successful build and tests
- FR67: System can serve the application via HTTPS with valid SSL certificate
- FR68: System can serve the application without runtime errors
- FR69: System can handle high availability requirements (no planned downtime)

### NonFunctional Requirements

**Performance:**

- NFR-P1: Initial page load must complete within 1.5 seconds on 4G mobile connection
- NFR-P2: Largest Contentful Paint (LCP) must occur within 1.5 seconds
- NFR-P3: First Input Delay (FID) must be less than 100 milliseconds
- NFR-P4: Cumulative Layout Shift (CLS) must be less than 0.1
- NFR-P5: Time to Interactive (TTI) must be less than 3 seconds
- NFR-P6: Lighthouse Performance score must be 90 or higher (target: 95+)
- NFR-P7: Lighthouse Best Practices score must be 95 or higher (target: 100)
- NFR-P8: Lighthouse SEO score must be 95 or higher (target: 100)
- NFR-P9: Initial JavaScript bundle size must not exceed 150KB (gzipped)
- NFR-P10: Initial CSS bundle size must not exceed 30KB (gzipped)
- NFR-P11: Total page weight (including all assets) must not exceed 500KB on initial load
- NFR-P12: Images must be optimized and served in modern formats (WebP with fallbacks)
- NFR-P13: IP detection API endpoint must respond within 500 milliseconds under normal load
- NFR-P14: API responses must be cached for 5 minutes to reduce external API calls

**Accessibility:**

- NFR-A1: All color contrast ratios must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- NFR-A2: All interactive elements must be keyboard accessible with logical tab order
- NFR-A3: All interactive elements must have visible focus indicators
- NFR-A4: All images must have appropriate alt text or be marked as decorative
- NFR-A5: All form inputs must have associated labels
- NFR-A6: Page content must remain functional when text is resized up to 200%
- NFR-A7: Screen readers must be able to access and announce all content and functionality
- NFR-A8: Touch targets must be minimum 44x44 pixels for motor accessibility
- NFR-A9: Information must not be conveyed by color alone
- NFR-A10: Dark mode must maintain WCAG AA contrast ratios
- NFR-A11: Automated accessibility tests (axe-core or pa11y) must report zero critical violations
- NFR-A12: Lighthouse Accessibility score must be 100

**Reliability & Availability:**

- NFR-R1: Application must maintain 99.9% uptime (< 8.76 hours downtime per year)
- NFR-R2: No planned maintenance downtime (use zero-downtime deployment strategies)
- NFR-R3: SSL certificate must be valid and auto-renewing
- NFR-R4: Application must serve content via HTTPS only (HTTP redirects to HTTPS)
- NFR-R5: External API failures must be handled gracefully with user-friendly error messages
- NFR-R6: Application must not display runtime errors to users (graceful degradation)
- NFR-R7: Failed API calls must be logged for monitoring without breaking user experience
- NFR-R8: Application health must be monitored with automated alerts for downtime
- NFR-R9: Build failures must prevent deployment to production
- NFR-R10: Failed tests must prevent deployment to production

**Maintainability & Code Quality:**

- NFR-M1: All code must pass ESLint validation with zero errors
- NFR-M2: All code must be formatted with Prettier
- NFR-M3: TypeScript must be used in strict mode with no `any` types except where explicitly justified
- NFR-M4: Code must follow consistent patterns throughout the codebase
- NFR-M5: Complex functions must include inline comments explaining logic
- NFR-M6: Test coverage must be 100% (unit + E2E combined)
- NFR-M7: All tests must pass before code can be merged
- NFR-M8: Critical user journeys must have end-to-end test coverage
- NFR-M9: Tests must run in CI/CD pipeline on every pull request
- NFR-M10: README must be comprehensive with clear installation instructions
- NFR-M11: CONTRIBUTING.md must provide clear guidelines for contributors
- NFR-M12: Code comments must be clear, accurate, and explain the "why" not just the "what"
- NFR-M13: README must have zero spelling or grammatical errors
- NFR-M14: All environment variables and configuration options must be documented

**Usability:**

- NFR-U1: Application must be fully functional on mobile devices (320px width minimum)
- NFR-U2: Application must adapt layout for tablet devices (640px-1024px)
- NFR-U3: Application must optimize layout for desktop devices (1024px+)
- NFR-U4: No horizontal scrolling should occur at any breakpoint
- NFR-U5: Touch interactions must feel natural on mobile devices
- NFR-U6: All user actions must provide immediate visual feedback
- NFR-U7: Loading states must be clearly indicated during data fetching
- NFR-U8: Error states must provide clear, actionable guidance to users
- NFR-U9: Dark/light mode transitions must be smooth without jarring flashes
- NFR-U10: All text must use clear, simple English (no jargon unless necessary)
- NFR-U11: Information hierarchy must be clear with proper heading structure
- NFR-U12: Interactive elements must be visually distinguishable from static content

**Search Engine Optimization (SEO):**

- NFR-S1: All pages must have unique, descriptive title tags (< 60 characters)
- NFR-S2: All pages must have compelling meta descriptions (< 160 characters)
- NFR-S3: Open Graph tags must be present for social media sharing
- NFR-S4: Twitter Card tags must be present for Twitter/X sharing
- NFR-S5: Sitemap.xml must be generated and accessible to search engines
- NFR-S6: Robots.txt must allow appropriate indexing
- NFR-S7: Pages must use semantic HTML5 elements
- NFR-S8: Heading hierarchy must be logical (single H1, properly nested H2-H6)
- NFR-S9: Canonical URLs must be properly configured
- NFR-S10: Page must be mobile-friendly per Google standards
- NFR-S11: Shared links must display rich preview cards with image, title, and description
- NFR-S12: Preview image must be high-quality and representative of the application

**Security (Basic):**

- NFR-SE1: All communication must occur over HTTPS with valid SSL certificate
- NFR-SE2: No sensitive information should be exposed in client-side code or console
- NFR-SE3: External API keys (if any) must not be exposed in client-side code
- NFR-SE4: Dependencies must be kept up-to-date with security patches
- NFR-SE5: No known security vulnerabilities in dependencies (npm audit clean)
- NFR-SE6: Application must set appropriate security headers (CSP, X-Frame-Options, etc.)
- NFR-SE7: Cookies (if used) must be secure and HttpOnly where appropriate

### Additional Requirements

**From Architecture:**

**Starter Template & Project Initialization:**

- Architecture specifies Official Nuxt 4 CLI (`bunx nuxi init what-is-my-ip`) as the starter template
- NuxtUI installation via `npx nuxi module add ui`
- Bun as package manager with Node.js 18+ LTS runtime
- TypeScript strict mode configuration

**Testing Framework Decision:**

- Playwright selected for E2E testing over Cypress
- Vitest for unit testing
- Rationale: Superior parallel execution, cross-browser support, CI optimization

**Infrastructure & Deployment:**

- Hosting: Vercel with automatic SSL and zero-downtime deployments
- Build Command: `bun run build`
- Output Directory: `.output` (Nuxt default)
- Environment: Node.js 18.x LTS

**API & Communication Patterns:**

- Nitro Cache with 5-minute TTL for API responses (`defineCachedEventHandler()`)
- Dual-layer rate limiting (server-side: 10 req/min per IP, client-side: 10s cooldown)
- External API: ip-api.com for geolocation data
- Server route: `/api/ip` and `/api/geolocation`

**Analytics & Monitoring:**

- Vercel Analytics for Web Vitals tracking and visitor metrics
- Sentry (free tier) for error monitoring with source maps
- Custom event tracking: `github_link_click`, `profile_link_click`, `copy_ip_click`, `refresh_ip_click`

**Frontend Architecture:**

- Composable pattern for business logic: `useIpDetection`, `useGeolocation`, `useCopyToClipboard`, `useIpRefresh`
- Single-file components for UI: `IpDisplay.vue`, `GeolocationCard.vue`, `ActionButtons.vue`, `Footer.vue`
- Error handling: Three-layer strategy (composable error refs → component error UI → global Vue error handler + Sentry)

**SEO & Discoverability:**

- @nuxtjs/seo module for all-in-one SEO solution (includes sitemap, meta tags, Open Graph, Twitter Cards, robots.txt)
- Site URL configuration for canonical URLs
- Automatic Open Graph image generation

**CI/CD Pipeline:**

- GitHub Actions with matrix strategy (parallel jobs)
- Quality gates: lint, typecheck, unit tests, E2E tests, build validation, Lighthouse CI
- Deployment blocked if any job fails
- Vercel deployment only on successful pipeline completion

**Environment Configuration:**

- `.env` files for local development (git-ignored)
- `.env.example` template committed to repository
- Vercel Environment Variables for production
- Nuxt `runtimeConfig` for type-safe access

**Implementation Patterns & Consistency Rules:**

- **Naming:** camelCase for variables/functions, PascalCase for components/types, UPPER_SNAKE_CASE for constants
- **Composables:** `useFeatureName` format, always return refs with `readonly()` wrapper
- **Components:** PascalCase without prefix, flat structure in `app/components/`
- **API Routes:** Nuxt 4 `[name].[method].ts` convention (e.g., `ip.get.ts`, `geolocation.get.ts`)
- **Types:** Shared types in `types/index.ts`, feature-specific types co-located
- **API Responses:** Direct data (no wrapper), camelCase fields, ISO 8601 dates
- **Error Handling:** Try/catch in composables → set error ref → component displays friendly UI → global handler logs to Sentry
- **Loading States:** Boolean ref with try/finally pattern, disable actions during loading

**From UX Design:**

**Design System:**

- NuxtUI as the official design system (accessible by default, Tailwind CSS integration)
- "Default Excellence" philosophy: minimal customization, leverage NuxtUI defaults

**UX Consistency Patterns:**

**Toast Notifications (UNotification):**

- Position: Top-right desktop, top-center mobile
- Success: Green color, 3s auto-dismiss, checkmark icon
- Error: Red color, persistent until dismissed, exclamation icon with "Try Again" action
- Info: Blue color, 4s auto-dismiss, information icon
- ARIA live regions for screen reader announcements

**Button Hierarchy:**

- Primary: Solid, large size (48px), prominent placement (Copy IP button)
- Secondary: Outline/ghost variant, medium size (40px) (Refresh, View on Map)
- Tertiary: Links with hover underline (Footer navigation, GitHub link)
- Loading states: Spinner replaces icon, button disabled
- Minimum touch targets: 48px mobile, 44px desktop

**Loading States:**

- Skeleton screens: Rare (SSR handles initial render)
- Inline spinners: Button actions (refresh, copy)
- Optimistic UI: Copy to clipboard (instant success feedback, rollback on error)

**Error & Empty States:**

- Inline alerts (UAlert) with friendly messages, recovery actions
- Graceful degradation: Core IP value always visible (SSR), secondary features fail gracefully
- Network timeout: Warning at 5s, error at 10s with retry option
- Error tone: Friendly, actionable, no technical jargon

**Responsive Design:**

- Mobile-first approach: 320px minimum → 1280px+ maximum
- Breakpoints: Mobile (320-639px), Tablet (640-1023px), Desktop (1024px+)
- Single-column centered layout across all devices
- Touch targets: 48px mobile, 44px desktop
- Typography scaling: 32px IP on mobile → 48px tablet → 64px desktop

**Accessibility (WCAG 2.1 Level AA):**

- Semantic HTML structure with ARIA landmarks
- Color contrast: 4.5:1 normal text, 3:1 large text
- Keyboard navigation: Logical tab order, visible focus indicators
- Screen reader optimization: Skip link, descriptive ARIA labels, live regions
- Text resize: Up to 200% without loss of functionality
- Touch targets: Minimum 44x44px (exceeding 48px on mobile for AAA compliance)
- High contrast mode support
- Lighthouse Accessibility: 100/100 (non-negotiable)

### FR Coverage Map

**Epic 1: Project Initialization & Quality Foundation**

- FR40: Execute unit tests for all code components
- FR41: Execute end-to-end tests for critical user journeys
- FR42: Generate test coverage reports showing 100% coverage
- FR43: Prevent deployment when tests fail
- FR44: Run automated accessibility tests (axe-core/pa11y)
- FR45: Run automated Lighthouse audits
- FR46: Enforce code quality standards (ESLint, Prettier, TypeScript)
- FR47: Run all tests locally before committing
- FR48: View test results in CI/CD pipeline
- FR65: Build production-ready artifacts via automated pipeline
- FR66: Deploy to production automatically upon successful build and tests
- FR67: Serve application via HTTPS with valid SSL certificate
- FR68: Serve application without runtime errors
- FR69: Handle high availability requirements (no planned downtime)

**Epic 2: Core IP Detection & Responsive UI**

- FR1: View public IP address automatically upon page load
- FR10: View application in light mode or dark mode
- FR11: Automatically switch theme based on OS preferences
- FR12: Manually toggle between light and dark themes
- FR15: View application on mobile devices (320px width minimum)
- FR16: View application on tablet devices
- FR17: View application on desktop devices (up to 1280px+ width)
- FR18: Resize text up to 200% without loss of functionality
- FR19: Interact with touch targets meeting minimum size (44x44px)
- FR20: View content with sufficient color contrast ratios (WCAG AA)

**Epic 3: Geolocation & User Interactions**

- FR2: View geolocation data (country, region, city, timezone)
- FR3: View ISP information
- FR4: View geographic coordinates (latitude, longitude)
- FR5: View AS (Autonomous System) number
- FR6: Manually refresh IP and geolocation data
- FR7: Access location on interactive map via external link (Google Maps)
- FR8: Copy IP address to clipboard with single action
- FR9: Gracefully handle API failures with appropriate error messages
- FR58: Cache API responses to reduce external API calls

**Epic 4: GitHub Repository Showcase & SEO**

- FR21: Navigate from live site to GitHub repository via visible link
- FR22: Navigate from live site to developer's personal profile
- FR23: View project status via visual badges (build, tests, coverage, Lighthouse)
- FR24: View screenshots or animated demonstrations
- FR25: Access live demo with prominently displayed link
- FR26: View technology stack with visual logos
- FR27: See recent commit activity indicating active development
- FR28: See clear installation and development instructions
- FR29: Discover project via relevant topics and tags
- FR54: Search engines can discover and index the application
- FR55: Social media platforms display rich preview cards (Open Graph, Twitter Cards)
- FR56: Search engines can access sitemap for crawling

**Epic 5: Contribution Infrastructure**

- FR30: View comprehensive contribution guidelines
- FR31: View code style standards and conventions
- FR32: View commit message conventions
- FR33: Discover "good first issues" via labels
- FR34: View issue descriptions with context and acceptance criteria
- FR35: Submit pull requests using structured template
- FR36: View automated test results for pull requests
- FR37: Receive code review feedback via automated tools (Code Rabbit)
- FR38: Report bugs using structured issue template
- FR39: Request features using structured issue template

**Epic 6: Performance & Accessibility Excellence**

- FR13: Navigate all interactive elements using keyboard only
- FR14: Screen readers can access all information and functionality
- FR49: Achieve Lighthouse Performance score > 90
- FR50: Achieve Lighthouse Accessibility score of 100
- FR51: Achieve Core Web Vitals targets (LCP < 1.5s, FID < 100ms, CLS < 0.1)
- FR52: Serve optimized JavaScript bundles (< 150KB gzipped)
- FR53: Serve optimized CSS (< 30KB gzipped)
- FR57: Load application within 1 second on modern connections

**Epic 7: Production Analytics & Monitoring**

- FR59: Track site visits in privacy-friendly manner
- FR60: Track clicks to GitHub repository link
- FR61: Track clicks to personal profile link
- FR62: Monitor GitHub stars and forks
- FR63: Monitor pull request activity
- FR64: Monitor issue activity

## Epic List

### Epic 1: Project Initialization & Quality Foundation

Establish a professional development foundation with quality infrastructure from day one, enabling developers to work with automated testing (100% coverage), CI/CD validation, TypeScript strict mode, and proper deployment infrastructure. This epic creates the technical foundation that enables all future epics.

**FRs covered:** FR40-FR48 (testing), FR65-FR69 (build/deploy), FR46 (code quality)
**NFRs addressed:** NFR-M1 to NFR-M14 (code quality & maintainability), NFR-R9, NFR-R10 (deployment gates)
**Additional requirements:** Architecture starter template (Nuxt 4 CLI + NuxtUI), Playwright, Vitest, GitHub Actions, Vercel setup, TypeScript strict mode, implementation patterns

**Standalone:** ✅ Yes - Provides complete development infrastructure, enables all future epics without depending on them

**Stories:**

1. Story 1.1: Initialize Nuxt 4 Project with NuxtUI
2. Story 1.2: Configure TypeScript Strict Mode and Code Quality Tools
3. Story 1.3: Set Up Unit Testing with Vitest
4. Story 1.4: Set Up E2E Testing with Playwright
5. Story 1.5: Configure GitHub Actions CI/CD Pipeline
6. Story 1.6: Set Up Vercel Deployment with Environment Config
7. Story 1.7: Create README with Installation Instructions

---

### Epic 2: Core IP Detection & Responsive UI

Visitors can see their IP address instantly upon page load with a modern, responsive interface that works across mobile, tablet, and desktop devices. Dark mode automatically adapts to OS preferences, and the UI is fully responsive from 320px to 1280px+ displays.

**FRs covered:** FR1 (IP detection), FR10-FR12 (dark mode), FR15-FR17 (responsive), FR18-FR20 (basic accessibility)
**NFRs addressed:** NFR-U1 to NFR-U12 (usability), NFR-P1 to NFR-P5 (performance basics)
**Additional requirements:** UX patterns (button hierarchy, layout, responsive breakpoints), NuxtUI design system, single-column centered layout

**Standalone:** ✅ Yes - Core functionality works independently, provides base for Epic 3

**Stories:**

1. Story 2.1: Create Server API Endpoint for IP Detection
2. Story 2.2: Create IP Display Component with SSR
3. Story 2.3: Implement Responsive Layout (Mobile, Tablet, Desktop)
4. Story 2.4: Implement Dark Mode with Auto OS Detection
5. Story 2.5: Add Manual Dark/Light Mode Toggle
6. Story 2.6: Implement Basic Accessibility (Semantic HTML, ARIA, Keyboard)

---

### Epic 3: Geolocation & User Interactions

Visitors obtain detailed geographic information (country, city, region, ISP, coordinates) and can interact with their data by copying IP to clipboard, refreshing data, viewing location on Google Maps, with graceful error handling for API failures.

**FRs covered:** FR2-FR9 (geolocation & interactions), FR58 (API caching)
**NFRs addressed:** NFR-P13, NFR-P14 (API performance & caching), NFR-R5 to NFR-R7 (error handling), NFR-U6 to NFR-U8 (user feedback)
**Additional requirements:** Nitro Cache (5min TTL), dual-layer rate limiting, composables (useGeolocation, useCopyToClipboard, useIpRefresh), error handling patterns, loading states, toast notifications

**Standalone:** ✅ Yes - Enriches Epic 2, functions independently with complete geolocation features

**Stories:**

1. Story 3.1: Create Geolocation API Endpoint with Caching
2. Story 3.2: Display Geolocation Data (Country, City, Region, ISP, Coordinates)
3. Story 3.3: Implement Copy IP to Clipboard Feature
4. Story 3.4: Implement Manual Refresh with Rate Limiting
5. Story 3.5: Add View on Map External Link
6. Story 3.6: Implement Error Handling and Graceful Degradation

---

### Epic 4: GitHub Repository Showcase & SEO

The project is discoverable and presents a professional image on GitHub and search engines. Visitors can find the project via GitHub topics/tags, see visual badges (build, tests, coverage, Lighthouse), view screenshots/GIFs, access live demo, and see tech stack. SEO optimization ensures Google discoverability.

**FRs covered:** FR21-FR29 (repository discovery), FR54-FR56 (SEO)
**NFRs addressed:** NFR-S1 to NFR-S12 (SEO), NFR-M10, NFR-M13 (README quality)
**Additional requirements:** @nuxtjs/seo module, Open Graph, Twitter Cards, sitemap.xml, robots.txt, README badges, screenshots/GIFs, tech stack logos

**Standalone:** ✅ Yes - Visibility and discoverability features independent from core application

**Stories:**

1. Story 4.1: Create README with Badges, Screenshots, and Tech Stack
2. Story 4.2: Configure SEO Module with Meta Tags and Open Graph
3. Story 4.3: Add GitHub and Profile Links to Footer
4. Story 4.4: Create Sitemap and Robots.txt
5. Story 4.5: Add GitHub Topics and Repository Description
6. Story 4.6: Create Installation and Development Instructions

---

### Epic 5: Contribution Infrastructure

Potential contributors can easily understand how to contribute and submit PRs. Comprehensive CONTRIBUTING.md guides contributors, "good first issues" are well-labeled with acceptance criteria, PR/issue templates provide structure, and automated CI/CD validates all contributions.

**FRs covered:** FR30-FR39 (contribution & collaboration)
**NFRs addressed:** NFR-M11 (CONTRIBUTING.md), NFR-M9 (tests in CI/CD)
**Additional requirements:** CONTRIBUTING.md, PR template, issue templates (bug, feature, good-first-issue), Code Rabbit integration, commit conventions documentation

**Standalone:** ✅ Yes - Contribution infrastructure independent of application features

**Stories:**

1. Story 5.1: Create CONTRIBUTING.md Guide
2. Story 5.2: Create PR Template with Checklist
3. Story 5.3: Create Issue Templates (Bug, Feature, Good First Issue)
4. Story 5.4: Configure Code Rabbit Integration
5. Story 5.5: Document Code Style and Commit Conventions

---

### Epic 6: Performance & Accessibility Excellence

The application achieves professional standards: Lighthouse Performance > 90, Accessibility = 100, WCAG 2.1 Level AA compliance (keyboard navigation, screen reader friendly), Core Web Vitals optimized (LCP < 1.5s, FID < 100ms, CLS < 0.1), and optimized bundles (JS < 150KB, CSS < 30KB).

**FRs covered:** FR13-FR14 (keyboard/screen reader), FR49-FR53 (performance), FR57 (load time)
**NFRs addressed:** NFR-P1 to NFR-P14 (performance), NFR-A1 to NFR-A12 (accessibility)
**Additional requirements:** Lighthouse CI, axe-core/pa11y testing, WCAG 2.1 AA compliance, semantic HTML, ARIA landmarks, skip links, focus indicators, high contrast mode support

**Standalone:** ✅ Yes - Optimization and compliance improvements that enhance Epic 2 & 3

**Stories:**

1. Story 6.1: Optimize Bundle Sizes (JS < 150KB, CSS < 30KB)
2. Story 6.2: Implement Core Web Vitals Optimization (LCP, FID, CLS)
3. Story 6.3: Configure Lighthouse CI with Quality Gates
4. Story 6.4: Implement Comprehensive Keyboard Navigation
5. Story 6.5: Add Screen Reader Optimization (Skip Links, ARIA)
6. Story 6.6: Validate WCAG 2.1 AA Compliance

---

### Epic 7: Production Analytics & Monitoring

Project maintainer can track application usage, detect errors, and measure portfolio impact. Privacy-friendly analytics track site visits and GitHub link clicks, Sentry monitors errors with alerts, Vercel Analytics provides Web Vitals in real-time, and GitHub metrics track stars/forks/activity.

**FRs covered:** FR59-FR64 (analytics & monitoring)
**NFRs addressed:** NFR-R8 (health monitoring), NFR-R7 (API call logging)
**Additional requirements:** Vercel Analytics, Sentry integration (free tier), custom event tracking (github_link_click, profile_link_click, copy_ip_click, refresh_ip_click), error logging to Sentry

**Standalone:** ✅ Yes - Monitoring and analytics independent of application functionality

**Stories:**

1. Story 7.1: Configure Vercel Analytics for Web Vitals
2. Story 7.2: Set Up Sentry Error Monitoring
3. Story 7.3: Implement Custom Event Tracking
4. Story 7.4: Create Analytics Dashboard Monitoring

---

## Epic 1: Project Initialization & Quality Foundation

Establish a professional development foundation with quality infrastructure from day one, enabling developers to work with automated testing (100% coverage), CI/CD validation, TypeScript strict mode, and proper deployment infrastructure.

### Story 1.1: Initialize Nuxt 4 Project with NuxtUI

As a developer,
I want to initialize a new Nuxt 4 project with NuxtUI pre-configured,
So that I have a clean, official starting point with the design system ready for development.

**Acceptance Criteria:**

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

---

### Story 1.2: Configure TypeScript Strict Mode and Code Quality Tools

As a developer,
I want TypeScript strict mode and code quality tools configured,
So that code quality is enforced from day one and prevents common errors.

**Acceptance Criteria:**

**Given** The Nuxt 4 project is initialized
**When** I configure TypeScript strict mode and install code quality tools
**Then** `tsconfig.json` has `strict: true` enabled
**And** ESLint is installed and configured for Nuxt 4 + TypeScript
**And** Prettier is installed and configured with consistent formatting rules
**And** ESLint and Prettier work together without conflicts
**And** `bun run lint` command runs ESLint successfully with zero errors
**And** `bun run format` command runs Prettier and formats all files
**And** `bun run format:check` command validates formatting without changes
**And** `bun run typecheck` command runs TypeScript compiler in check mode
**And** Pre-commit hooks (Husky) are configured to run lint and format checks
**And** All code quality scripts are added to `package.json`
**And** `.eslintrc.js` and `.prettierrc` configuration files are committed
**And** No `any` types are allowed without explicit justification (ESLint rule)

---

### Story 1.3: Set Up Unit Testing with Vitest

As a developer,
I want Vitest configured for unit testing,
So that I can write and run unit tests for all code components.

**Acceptance Criteria:**

**Given** The project has TypeScript and code quality tools configured
**When** I install and configure Vitest with Nuxt test utilities
**Then** Vitest is installed as a dev dependency
**And** `@nuxt/test-utils` is installed for Nuxt-specific testing utilities
**And** `vitest.config.ts` is created with Nuxt integration
**And** `tests/unit/` directory structure is created
**And** `bun run test:unit` command runs all unit tests
**And** `bun run test:unit --coverage` generates coverage reports
**And** Coverage reports are generated in `coverage/` directory (git-ignored)
**And** Example unit test file exists demonstrating testing patterns
**And** Example test validates a simple utility function successfully
**And** Coverage threshold is set to 100% in Vitest config
**And** Tests run in watch mode during development with `bun run test:unit --watch`
**And** Test output shows clear pass/fail status with color-coded results

---

### Story 1.4: Set Up E2E Testing with Playwright

As a developer,
I want Playwright configured for end-to-end testing,
So that I can write and run E2E tests for critical user journeys.

**Acceptance Criteria:**

**Given** Unit testing with Vitest is configured
**When** I install and configure Playwright
**Then** Playwright is installed as a dev dependency
**And** `playwright.config.ts` is created with cross-browser configuration
**And** Browsers are installed (Chrome, Firefox, Safari/WebKit) via `bunx playwright install`
**And** `tests/e2e/` directory structure is created
**And** `bun run test:e2e` command runs all E2E tests
**And** Playwright runs tests in parallel across browsers (Chrome, Firefox, WebKit)
**And** Example E2E test file exists demonstrating user journey testing
**And** Example test validates basic page navigation successfully
**And** Test artifacts (screenshots, videos) are saved to `playwright-report/` (git-ignored)
**And** Playwright trace viewer is available for debugging failed tests
**And** Playwright can run in headed mode for debugging with `bun run test:e2e --headed`
**And** Tests run against local dev server on port 3000
**And** axe-core is integrated via `@axe-core/playwright` for accessibility testing

---

### Story 1.5: Configure GitHub Actions CI/CD Pipeline

As a developer,
I want GitHub Actions CI/CD pipeline configured with quality gates,
So that all code changes are automatically validated before deployment.

**Acceptance Criteria:**

**Given** Testing infrastructure (Vitest + Playwright) is configured
**When** I create GitHub Actions workflow configuration
**Then** `.github/workflows/ci.yml` file is created with matrix strategy
**And** Workflow triggers on push to `main` branch and all pull requests
**And** Separate jobs run in parallel: lint, typecheck, test-unit, test-e2e, build
**And** Lint job runs ESLint and Prettier checks
**And** Typecheck job runs TypeScript compiler in check mode
**And** Test-unit job runs Vitest with coverage and uploads coverage to Codecov
**And** Test-e2e job runs Playwright tests across all browsers
**And** Build job validates production build succeeds
**And** Lighthouse job runs Lighthouse CI with performance/accessibility assertions
**And** All jobs must pass before pull request can be merged
**And** Failed jobs show clear error messages in GitHub UI
**And** Job artifacts (test reports, coverage) are uploaded and accessible
**And** Workflow uses Bun setup action (`oven-sh/setup-bun@v1`)
**And** Playwright browsers are installed in E2E job
**And** Environment variables are properly configured for CI environment

---

### Story 1.6: Set Up Vercel Deployment with Environment Config

As a developer,
I want Vercel deployment configured with environment variables,
So that the application can be deployed to production automatically with proper configuration.

**Acceptance Criteria:**

**Given** CI/CD pipeline is configured and passing
**When** I configure Vercel deployment
**Then** Vercel project is created and linked to GitHub repository
**And** Vercel is configured to auto-deploy `main` branch to production
**And** Vercel creates preview deployments for all pull requests
**And** Production URL is configured (e.g., `what-is-my-ip.vercel.app`)
**And** `.env.example` file is created with template environment variables
**And** `.env` is added to `.gitignore` (never committed)
**And** `NUXT_PUBLIC_SITE_URL` environment variable is configured in Vercel
**And** Build command is set to `bun run build` in Vercel settings
**And** Output directory is set to `.output` in Vercel settings
**And** Node.js version is set to 18.x in Vercel settings
**And** `nuxt.config.ts` has `runtimeConfig` configured for environment variables
**And** Deployment succeeds and site is accessible via HTTPS
**And** SSL certificate is automatically provisioned and auto-renewing
**And** HTTP traffic is automatically redirected to HTTPS
**And** Zero-downtime deployments are enabled (Vercel default)

---

### Story 1.7: Create README with Installation Instructions

As a developer or contributor,
I want comprehensive README documentation,
So that I can quickly understand the project and get started with development.

**Acceptance Criteria:**

**Given** The project is fully configured with testing, CI/CD, and deployment
**When** I create the README.md file
**Then** README includes project title "What Is My IP"
**And** README includes compelling project description (< 160 chars)
**And** README includes visual badges: Build Status, Test Coverage, Lighthouse Score, License
**And** README includes screenshot or animated GIF of the application (placeholder for now)
**And** README includes "Features" section with bullet points and emojis
**And** README includes "Tech Stack" section with technology logos
**And** README includes "Getting Started" section with prerequisites (Bun, Node 18+)
**And** README includes installation instructions: `git clone`, `bun install`, `bun run dev`
**And** README includes available scripts: `dev`, `build`, `preview`, `lint`, `test:unit`, `test:e2e`
**And** README includes prominent "Live Demo" button/link (will be updated after deployment)
**And** README includes "Contributing" section with link to CONTRIBUTING.md (future)
**And** README includes "License" section (MIT license)
**And** README includes "Contact" section with links to GitHub profile
**And** README has zero spelling or grammatical errors
**And** README markdown formatting is valid and renders correctly on GitHub
**And** All links in README are functional and point to correct destinations

---

## Epic 2: Core IP Detection & Responsive UI

Visitors can see their IP address instantly upon page load with a modern, responsive interface that works across mobile, tablet, and desktop devices. Dark mode automatically adapts to OS preferences, and the UI is fully responsive from 320px to 1280px+ displays.

### Story 2.1: Create Server API Endpoint for IP Detection

As a visitor,
I want the server to detect my IP address automatically,
So that I can see my public IP instantly upon page load.

**Acceptance Criteria:**

**Given** The Nuxt 4 project is configured with server routes
**When** I create the `/api/ip` server endpoint
**Then** A new file `server/api/ip.get.ts` is created following Nuxt 4 conventions
**And** The endpoint uses `getRequestIP(event)` to extract the visitor's IP address
**And** The endpoint returns a JSON response with `{ ip: "x.x.x.x" }` format
**And** Response uses camelCase field naming (as per architecture patterns)
**And** The endpoint handles missing IP gracefully and returns a clear error
**And** Error responses use `createError()` with appropriate status codes
**And** The endpoint is accessible at `GET /api/ip`
**And** SSR rendering can call this endpoint during page generation
**And** Unit tests validate IP extraction logic
**And** Unit tests validate error handling for missing IP
**And** E2E tests validate the endpoint returns valid IP format
**And** The endpoint responds within 100ms under normal conditions

---

### Story 2.2: Create IP Display Component with SSR

As a visitor,
I want to see my IP address displayed prominently on the page immediately upon load,
So that I get instant value without waiting for client-side JavaScript.

**Acceptance Criteria:**

**Given** The `/api/ip` endpoint exists and returns visitor IP
**When** I create the IP display component with SSR support
**Then** A new component `app/components/IpDisplay.vue` is created
**And** A composable `app/composables/useIpDetection.ts` is created for business logic
**And** The composable fetches IP from `/api/ip` endpoint
**And** The composable returns `ipAddress`, `loading`, and `error` refs
**And** The composable implements try/catch/finally error handling pattern
**And** The index page (`app/pages/index.vue`) uses the IP display component
**And** IP address is rendered server-side (visible in view-source without JavaScript)
**And** IP is displayed with large, prominent typography (text-4xl on mobile, text-6xl on desktop)
**And** NuxtUI `UCard` component wraps the IP display for consistent styling
**And** Loading state shows skeleton screen while fetching (rare, SSR handles most cases)
**And** Error state displays friendly message if IP detection fails
**And** Component uses semantic HTML (`<main>`, `<section>`)
**And** Unit tests validate the composable logic
**And** E2E tests validate IP is visible in rendered HTML
**And** E2E tests validate SSR renders IP before JavaScript loads

---

### Story 2.3: Implement Responsive Layout (Mobile, Tablet, Desktop)

As a visitor,
I want the application to work seamlessly on any device,
So that I have a great experience whether on mobile, tablet, or desktop.

**Acceptance Criteria:**

**Given** The IP display component exists
**When** I implement responsive layout using Tailwind breakpoints
**Then** Layout is mobile-first (320px minimum width)
**And** `UContainer` component provides consistent padding and max-width
**And** Mobile (320-639px): Single-column layout, 16px padding, full-width card
**And** Tablet (640-1023px): Centered layout, 24px padding, max-width 640px
**And** Desktop (1024px+): Centered layout, 32px padding, max-width 1280px
**And** IP typography scales: 32px mobile (text-3xl) → 48px tablet (text-5xl) → 64px desktop (text-6xl)
**And** Spacing scales: 16px mobile (space-y-4) → 24px tablet (space-y-6) → 32px desktop (space-y-8)
**And** No horizontal scrolling occurs at any breakpoint
**And** Content is readable at all breakpoints
**And** Touch targets are minimum 48px on mobile, 44px on desktop
**And** Layout transitions smoothly between breakpoints without jarring shifts
**And** E2E tests validate layout at 375px (mobile), 768px (tablet), 1280px (desktop)
**And** Lighthouse scores "mobile-friendly" on mobile viewport
**And** CLS (Cumulative Layout Shift) is < 0.1 during breakpoint transitions

---

### Story 2.4: Implement Dark Mode with Auto OS Detection

As a visitor,
I want dark mode to automatically match my operating system preferences,
So that the interface is comfortable for my eyes without manual configuration.

**Acceptance Criteria:**

**Given** NuxtUI is configured with ColorMode module
**When** I enable automatic dark mode detection
**Then** NuxtUI ColorMode module is configured in `nuxt.config.ts`
**And** ColorMode automatically detects OS preference via `prefers-color-scheme` media query
**And** Light mode is active when OS preference is "light"
**And** Dark mode is active when OS preference is "dark"
**And** Theme switches instantly when OS preference changes
**And** Theme transition is smooth without jarring flash (color-scheme CSS property)
**And** All NuxtUI components adapt to dark/light mode automatically
**And** Custom colors maintain WCAG AA contrast ratios in both modes
**And** IP address text is readable in both modes (gray-900 light, gray-100 dark)
**And** Background colors follow NuxtUI defaults (white light, gray-900 dark)
**And** No flash of unstyled content (FOUC) on initial load
**And** Theme preference is stored in localStorage for consistency
**And** SSR renders with system default, client hydrates with user preference
**And** E2E tests validate both light and dark modes render correctly
**And** Lighthouse validates color contrast in both modes

---

### Story 2.5: Add Manual Dark/Light Mode Toggle

As a visitor,
I want to manually toggle between dark and light modes,
So that I can override my OS preference if desired.

**Acceptance Criteria:**

**Given** Automatic dark mode detection is implemented
**When** I add a manual theme toggle control
**Then** A theme toggle button is added to the page (top-right corner)
**And** Toggle uses NuxtUI `UButton` with icon-only variant
**And** Icon changes based on current mode: sun icon (light mode), moon icon (dark mode)
**And** Button has `aria-label` describing the action: "Switch to dark mode" / "Switch to light mode"
**And** Clicking the toggle switches between light and dark modes
**And** Manual selection overrides automatic OS preference
**And** User's manual choice is persisted in localStorage
**And** Toggle button is keyboard accessible (Tab → Enter/Space)
**And** Toggle button has visible focus indicator
**And** Theme change is smooth without jarring transition
**And** Toggle button works on mobile, tablet, and desktop
**And** Touch target is minimum 48px on mobile, 44px on desktop
**And** E2E tests validate toggle switches themes correctly
**And** E2E tests validate manual preference persists after page reload
**And** Unit tests validate ColorMode composable toggle function

---

### Story 2.6: Implement Basic Accessibility (Semantic HTML, ARIA, Keyboard)

As a visitor using assistive technology,
I want the application to be fully accessible via keyboard and screen reader,
So that I can access all functionality regardless of my abilities.

**Acceptance Criteria:**

**Given** The responsive UI with dark mode is implemented
**When** I implement basic accessibility features
**Then** Page uses semantic HTML5 elements: `<header>`, `<main>`, `<footer>`, `<section>`
**And** Heading hierarchy is logical: H1 for site title, H2 for IP section
**And** Skip link is added: "Skip to main content" (visible on focus, hidden otherwise)
**And** Skip link navigates to `<main id="main-content">` on activation
**And** All interactive elements are keyboard accessible via Tab navigation
**And** Tab order is logical: Skip link → IP display → theme toggle → footer links
**And** All interactive elements have visible focus indicators (2px ring, primary color)
**And** ARIA landmarks are present: `role="banner"`, `role="main"`, `role="contentinfo"`
**And** ARIA labels describe interactive elements: `aria-label` on theme toggle
**And** Screen reader announces IP address with proper context
**And** Color contrast meets WCAG AA standards (4.5:1 normal text, 3:1 large text)
**And** Text can be resized up to 200% without loss of functionality
**And** No information is conveyed by color alone
**And** E2E tests validate keyboard navigation works correctly
**And** E2E tests with axe-core report zero critical accessibility violations
**And** Lighthouse Accessibility score is 100/100

---

## Epic 3: Geolocation & User Interactions

Visitors obtain detailed geographic information (country, city, region, ISP, coordinates) and can interact with their data by copying IP to clipboard, refreshing data, viewing location on Google Maps, with graceful error handling for API failures.

### Story 3.1: Create Geolocation API Endpoint with Caching

As a visitor,
I want the server to fetch my geolocation data with caching,
So that I get detailed location information quickly without overloading external APIs.

**Acceptance Criteria:**

**Given** The IP detection endpoint exists
**When** I create the `/api/geolocation` server endpoint
**Then** A new file `server/api/geolocation.get.ts` is created
**And** The endpoint uses `defineCachedEventHandler()` for Nitro Cache
**And** Cache TTL is set to 5 minutes (300 seconds) as per Architecture
**And** Cache key is based on visitor's IP address (unique per visitor)
**And** The endpoint calls ip-api.com: `http://ip-api.com/json/{ip}`
**And** External API response is transformed from snake_case to camelCase
**And** Response includes: ip, country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as
**And** TypeScript interface `GeolocationData` is defined in `types/index.ts`
**And** Error handling uses `createError()` with status 500 for API failures
**And** Rate limiting prevents exceeding ip-api.com free tier limits (150 req/min)
**And** Server-side rate limiter uses LRU cache: 10 requests per minute per IP
**And** Rate limit exceeded returns 429 status with clear error message
**And** The endpoint is accessible at `GET /api/geolocation`
**And** Unit tests validate data transformation from snake_case to camelCase
**And** Unit tests validate cache key generation
**And** E2E tests validate endpoint returns valid geolocation data
**And** E2E tests validate cached responses are served on repeat requests

---

### Story 3.2: Display Geolocation Data (Country, City, Region, ISP, Coordinates)

As a visitor,
I want to see detailed geolocation information about my IP address,
So that I understand my geographic location and network details.

**Acceptance Criteria:**

**Given** The `/api/geolocation` endpoint exists and returns data
**When** I create the geolocation display component
**Then** A new component `app/components/GeolocationCard.vue` is created
**And** A composable `app/composables/useGeolocation.ts` is created
**And** The composable fetches data from `/api/geolocation` endpoint
**And** The composable returns `geolocation`, `loading`, and `error` refs
**And** The composable implements try/catch/finally error handling pattern
**And** Geolocation data is displayed in a NuxtUI `UCard` component
**And** Data fields displayed: Country, Region/City, ISP, Coordinates (lat, lon), Timezone, AS number
**And** Each field uses clear labels with icon (heroicons): 🌍 Country, 📍 City, 🌐 ISP, 📡 Coordinates
**And** Data is displayed in a clean definition list (`<dl>`, `<dt>`, `<dd>`)
**And** Loading state shows skeleton placeholders for each field
**And** Component handles missing fields gracefully (shows "N/A" for unavailable data)
**And** Typography is readable: 14px labels (text-sm), 16px values (text-base)
**And** Responsive layout: stacks vertically on mobile, grid layout on tablet/desktop
**And** Component is rendered server-side when possible
**And** Unit tests validate composable logic
**And** E2E tests validate all geolocation fields are displayed
**And** E2E tests validate loading states render correctly

---

### Story 3.3: Implement Copy IP to Clipboard Feature

As a visitor,
I want to copy my IP address to clipboard with one click,
So that I can easily paste it elsewhere.

**Acceptance Criteria:**

**Given** The IP display component exists
**When** I add copy to clipboard functionality
**Then** A composable `app/composables/useCopyToClipboard.ts` is created
**And** The composable uses browser Clipboard API: `navigator.clipboard.writeText()`
**And** A "Copy IP" button is added to the IP display using NuxtUI `UButton`
**And** Button uses primary color and large size (48px height on mobile)
**And** Button has clipboard icon (i-heroicons-clipboard-document)
**And** Button is prominently placed next to IP address
**And** Clicking button copies IP address to clipboard
**And** Optimistic UI shows success toast immediately (UNotification)
**And** Success toast: Green color, "IP Copied!" title, checkmark icon, 3s auto-dismiss
**And** Button icon changes to checkmark for 500ms after successful copy
**And** If clipboard API fails, error toast is shown: Red color, "Copy Failed" title, exclamation icon
**And** Error toast includes "Try Again" action button
**And** Button has `aria-label`: "Copy IP address to clipboard"
**And** Button is keyboard accessible (Tab → Enter/Space)
**And** Touch target is minimum 48px on mobile, 44px on desktop
**And** Unit tests validate composable clipboard logic
**And** E2E tests validate copy button copies IP successfully
**And** E2E tests validate success toast appears after copy
**And** E2E tests validate keyboard activation works

---

### Story 3.4: Implement Manual Refresh with Rate Limiting

As a visitor,
I want to manually refresh my IP and geolocation data,
So that I can update the information if my network changes.

**Acceptance Criteria:**

**Given** IP and geolocation display components exist
**When** I add manual refresh functionality
**Then** A composable `app/composables/useIpRefresh.ts` is created
**And** The composable manages refresh state: `canRefresh`, `cooldownSeconds`
**And** A "Refresh" button is added using NuxtUI `UButton` outline variant
**And** Button has refresh icon (i-heroicons-arrow-path)
**And** Button is placed next to "Copy IP" button (secondary action)
**And** Clicking refresh fetches fresh data from both `/api/ip` and `/api/geolocation`
**And** Button shows loading spinner during refresh (replaces icon)
**And** Button is disabled during loading state
**And** Client-side rate limiting: 10 second cooldown between manual refreshes
**And** During cooldown, button is disabled with countdown timer in tooltip
**And** Cooldown toast notification: Blue color, "Please wait {X} seconds" message
**And** After successful refresh, success toast appears: "Data Refreshed!"
**And** Refresh bypasses cache (adds cache-busting query parameter)
**And** Loading state shows spinner on both IP and geolocation components
**And** Error handling displays friendly error toast if refresh fails
**And** Button has `aria-label`: "Refresh IP and location data"
**And** Button is keyboard accessible
**And** Unit tests validate cooldown timer logic
**And** E2E tests validate refresh updates displayed data
**And** E2E tests validate rate limiting prevents rapid refreshes

---

### Story 3.5: Add View on Map External Link

As a visitor,
I want to view my location on an interactive map,
So that I can visualize my geographic position.

**Acceptance Criteria:**

**Given** Geolocation data with coordinates (lat, lon) is displayed
**When** I add a "View on Map" link
**Then** A "View on Map" button is added using NuxtUI `UButton` ghost variant
**And** Button has map icon (i-heroicons-map)
**And** Button is placed below geolocation data
**And** Button links to Google Maps with coordinates: `https://www.google.com/maps?q={lat},{lon}`
**And** Link opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
**And** External link icon is shown (i-heroicons-arrow-top-right-on-square)
**And** Button has `aria-label`: "View location on Google Maps (opens in new tab)"
**And** Button is disabled when coordinates are not available (graceful degradation)
**And** Disabled state shows tooltip: "Location coordinates not available"
**And** Button works on mobile (opens native maps app: iOS Maps, Google Maps)
**And** Touch target is minimum 48px on mobile
**And** Button is keyboard accessible
**And** E2E tests validate link generates correct Google Maps URL
**And** E2E tests validate link opens in new tab
**And** E2E tests validate button is disabled when coordinates are missing

---

### Story 3.6: Implement Error Handling and Graceful Degradation

As a visitor,
I want the application to handle API failures gracefully,
So that I still get core value (my IP) even if geolocation fails.

**Acceptance Criteria:**

**Given** IP and geolocation components exist with error states
**When** I implement comprehensive error handling
**Then** A global Vue error handler is added in `plugins/errorHandler.ts`
**And** Global handler catches uncaught errors and logs to console (Sentry later)
**And** Global handler displays user-friendly toast for unexpected errors
**And** API errors in composables set error ref instead of throwing
**And** Component-level error states display inline `UAlert` components
**And** Geolocation API failure shows: "Location Unavailable" with "Try Again" button
**And** Error alert uses soft variant (not alarming): Red color, exclamation icon
**And** Error message tone is friendly: "We couldn't find your location" (not technical)
**And** Core IP value remains visible even if geolocation fails (SSR guarantee)
**And** "View on Map" button is hidden/disabled if geolocation fails
**And** Network timeout (> 5s) shows warning toast: "Taking longer than expected..."
**And** After 10s total timeout, error toast with "Try Again" action
**And** All error messages provide recovery action (retry button)
**And** Error states are accessible: `role="alert"`, `aria-live="assertive"`
**And** Screen readers announce errors clearly
**And** E2E tests validate IP remains visible when geolocation fails
**And** E2E tests validate error alert displays with "Try Again" button
**And** E2E tests validate retry button refetches geolocation data
**And** Unit tests validate error handling in all composables

---

## Epic 4: GitHub Repository Showcase & SEO

The project is discoverable and presents a professional image on GitHub and search engines. Visitors can find the project via GitHub topics/tags, see visual badges, view screenshots/GIFs, access live demo, and see tech stack.

### Story 4.1: Create README with Badges, Screenshots, and Tech Stack

As a GitHub visitor,
I want to see a comprehensive README with visual badges and screenshots,
So that I can quickly assess project quality and features.

**Acceptance Criteria:**

**Given** The project is deployed and CI/CD is operational
**When** I enhance the README with visual elements
**Then** README includes visual badges at the top: Build Status, Test Coverage, Lighthouse Score, License (MIT)
**And** Build status badge links to GitHub Actions workflow
**And** Test coverage badge shows 100% coverage from Codecov
**And** Lighthouse badge shows Performance > 90, Accessibility = 100
**And** Screenshot or animated GIF demonstrates the application in action
**And** Screenshot shows both light and dark mode side-by-side
**And** GIF demonstrates key interactions: IP display, copy, refresh, dark mode toggle
**And** "Features" section lists key capabilities with emojis: 🔍 IP Detection, 📍 Geolocation, ⚡ Fast, ✅ 100% Tests, ♿ WCAG AA
**And** "Tech Stack" section displays technology logos (SVG): Nuxt, Vue, TypeScript, Tailwind, NuxtUI, Playwright, Vitest
**And** Tech stack logos are properly sized and aligned
**And** "Live Demo" button is prominent with primary color styling
**And** Live Demo button links to production URL on Vercel
**And** All badges use shields.io or similar service for consistency
**And** README renders correctly on GitHub with proper formatting
**And** All images are optimized and load quickly
**And** E2E tests validate all README links are functional

---

### Story 4.2: Configure SEO Module with Meta Tags and Open Graph

As a site visitor or social media user,
I want rich preview cards when sharing links,
So that the project looks professional when shared on social platforms.

**Acceptance Criteria:**

**Given** The application is deployed
**When** I configure the @nuxtjs/seo module
**Then** @nuxtjs/seo module is installed: `bun add -D @nuxtjs/seo`
**And** Module is added to `nuxt.config.ts` modules array
**And** Site URL is configured in `nuxt.config.ts`: `site: { url: 'https://what-is-my-ip.vercel.app' }`
**And** Site name is configured: "What Is My IP"
**And** Site description is compelling (< 160 chars): "Instantly discover your IP address and geolocation. Modern, fast, and privacy-friendly IP lookup tool built with Nuxt 4."
**And** Default locale is set to "en"
**And** Page title is optimized (< 60 chars): "What Is My IP - Instant IP Detection & Geolocation"
**And** Meta description is set with compelling copy
**And** Open Graph tags are configured: og:title, og:description, og:image, og:url, og:type
**And** Twitter Card tags are configured: twitter:card, twitter:title, twitter:description, twitter:image
**And** Open Graph image is high-quality (1200x630px) and representative of application
**And** OG image shows application interface with branding
**And** Canonical URL is properly configured to prevent duplicate content
**And** `redirectToCanonicalSiteUrl` is enabled
**And** Social sharing preview looks professional on Twitter, Facebook, LinkedIn
**And** E2E tests validate meta tags are present in HTML
**And** Lighthouse SEO score is 95+ / 100

---

### Story 4.3: Add GitHub and Profile Links to Footer

As a visitor,
I want to easily navigate to the GitHub repository and developer profile,
So that I can explore the code or contact the developer.

**Acceptance Criteria:**

**Given** The application has a footer component
**When** I add GitHub and profile links
**Then** A footer component `app/components/Footer.vue` is created if not exists
**And** Footer uses semantic HTML: `<footer role="contentinfo">`
**And** Footer includes navigation with `<nav aria-label="Footer navigation">`
**And** "View Source Code" link points to GitHub repository
**And** GitHub link has GitHub icon (i-heroicons-code-bracket)
**And** GitHub link opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
**And** External link icon indicates new tab (i-heroicons-arrow-top-right-on-square)
**And** "Contact" or profile link points to developer's profile (GitHub, LinkedIn, or personal site)
**And** Profile link has appropriate icon
**And** Footer links use NuxtUI `ULink` component with proper styling
**And** Footer is responsive: vertical stack on mobile, horizontal on desktop
**And** Footer has proper spacing from main content
**And** Footer text is readable with proper contrast in both light and dark modes
**And** Links are keyboard accessible with visible focus indicators
**And** Touch targets are minimum 48px on mobile
**And** E2E tests validate all footer links navigate correctly
**And** Analytics track clicks on GitHub link (custom event: `github_link_click`)
**And** Analytics track clicks on profile link (custom event: `profile_link_click`)

---

### Story 4.4: Create Sitemap and Robots.txt

As a search engine crawler,
I want a sitemap and robots.txt file,
So that I can efficiently discover and index the application.

**Acceptance Criteria:**

**Given** The @nuxtjs/seo module is configured
**When** I enable sitemap and robots.txt generation
**Then** Sitemap is automatically generated at `/sitemap.xml`
**And** Sitemap includes homepage URL with priority 1.0
**And** Sitemap follows sitemaps.org protocol (valid XML)
**And** Sitemap includes `<lastmod>` timestamp
**And** Sitemap includes `<changefreq>` set to "weekly"
**And** Robots.txt is automatically generated at `/robots.txt`
**And** Robots.txt allows all user agents: `User-agent: *`
**And** Robots.txt allows indexing of homepage: `Allow: /`
**And** Robots.txt disallows indexing of API routes: `Disallow: /api`
**And** Robots.txt includes sitemap reference: `Sitemap: https://what-is-my-ip.vercel.app/sitemap.xml`
**And** Sitemap is accessible at production URL
**And** Robots.txt is accessible at production URL
**And** Google Search Console can successfully read sitemap
**And** Sitemap validates with sitemap validators
**And** E2E tests validate sitemap.xml returns valid XML
**And** E2E tests validate robots.txt is accessible and properly formatted

---

### Story 4.5: Add GitHub Topics and Repository Description

As a GitHub user searching for projects,
I want to discover this project via relevant topics and clear description,
So that I can find it when searching for Nuxt, IP detection, or portfolio projects.

**Acceptance Criteria:**

**Given** The GitHub repository exists
**When** I configure repository metadata
**Then** Repository description is clear and compelling: "Modern IP detection & geolocation app built with Nuxt 4 - Portfolio showcase with 100% test coverage, WCAG AA accessibility, and professional architecture"
**And** Repository topics include: nuxt, nuxt4, vue, typescript, tailwind, nuxtui, ip-detection, geolocation, portfolio, playwright, vitest, accessibility, wcag, lighthouse
**And** Repository has "About" section filled with website URL
**And** Website URL points to live Vercel deployment
**And** Repository is marked as public (not private)
**And** Repository has appropriate license file (MIT License)
**And** LICENSE file is present in repository root
**And** Repository settings enable Issues, Discussions (optional), Projects
**And** Repository README shows up-to-date commit activity
**And** Topics are discoverable via GitHub topic search
**And** Repository appears in GitHub Explore for relevant topics
**And** Social preview image (OG image) is set in repository settings
**And** Repository description is < 160 characters for optimal display

---

### Story 4.6: Create Installation and Development Instructions

As a developer or contributor,
I want clear installation and development instructions,
So that I can quickly set up the project locally.

**Acceptance Criteria:**

**Given** The README exists with basic information
**When** I add comprehensive setup instructions
**Then** "Prerequisites" section lists required tools: Bun, Node.js 18+, Git
**And** "Getting Started" section has step-by-step instructions
**And** Step 1: Clone repository with exact command: `git clone https://github.com/mathieumaf/what-is-my-ip.git`
**And** Step 2: Navigate to directory: `cd what-is-my-ip`
**And** Step 3: Install dependencies: `bun install`
**And** Step 4: Copy environment template: `cp .env.example .env`
**And** Step 5: Start dev server: `bun run dev`
**And** Step 6: Open browser: `http://localhost:3000`
**And** "Available Scripts" section documents all npm scripts
**And** Scripts include: `dev`, `build`, `preview`, `lint`, `format`, `typecheck`, `test:unit`, `test:e2e`
**And** Each script has brief description of its purpose
**And** "Development Workflow" section explains typical development flow
**And** Workflow mentions: create branch, make changes, run tests, commit, push, create PR
**And** "Troubleshooting" section addresses common setup issues
**And** Troubleshooting includes: Bun compatibility, port conflicts, environment variables
**And** Instructions are tested on fresh clone to ensure accuracy
**And** All commands are copy-pasteable and work as documented
**And** README has zero spelling or grammatical errors

---

## Epic 5: Contribution Infrastructure

Potential contributors can easily understand how to contribute and submit PRs. Comprehensive CONTRIBUTING.md guides contributors, "good first issues" are well-labeled with acceptance criteria, and automated CI/CD validates all contributions.

### Story 5.1: Create CONTRIBUTING.md Guide

As a potential contributor,
I want clear contribution guidelines,
So that I know how to contribute effectively to the project.

**Acceptance Criteria:**

**Given** The project welcomes contributions
**When** I create the CONTRIBUTING.md file
**Then** CONTRIBUTING.md file is created in repository root
**And** File starts with welcoming message encouraging contributions
**And** "Code of Conduct" section references respectful collaboration
**And** "Getting Started" section links to README setup instructions
**And** "How to Contribute" section outlines contribution workflow
**And** Workflow steps: Fork → Clone → Branch → Code → Test → Commit → Push → PR
**And** "Finding Issues" section explains "good first issue" label
**And** "Development Workflow" section explains branch naming conventions
**And** Branch naming: `feat/feature-name`, `fix/bug-name`, `docs/documentation-update`
**And** "Running Tests" section lists all test commands
**And** Test commands: `bun run test:unit`, `bun run test:e2e`, `bun run lint`, `bun run typecheck`
**And** "Submitting Pull Requests" section explains PR process
**And** PR guidelines: descriptive title, linked issue, passing tests, no merge conflicts
**And** "Code Review" section explains what to expect during review
**And** Review mentions: automated checks, Code Rabbit feedback, maintainer review
**And** "Questions?" section provides contact methods
**And** Document is friendly, welcoming, and non-intimidating
**And** README links to CONTRIBUTING.md in "Contributing" section
**And** File has zero spelling or grammatical errors
**And** Markdown formatting is consistent and renders correctly on GitHub

---

### Story 5.2: Create PR Template with Checklist

As a contributor,
I want a structured PR template,
So that I provide all necessary information when submitting pull requests.

**Acceptance Criteria:**

**Given** Contributors will submit pull requests
**When** I create the PR template
**Then** PR template file is created: `.github/PULL_REQUEST_TEMPLATE.md`
**And** Template includes "Description" section with prompt for summary
**And** Template includes "Related Issue" section with prompt to link issue
**And** Template includes "Type of Change" checkboxes: Bug fix, New feature, Breaking change, Documentation, Refactoring
**And** Template includes "Checklist" section with required items
**And** Checklist includes: "Code follows project style guidelines"
**And** Checklist includes: "Self-review performed"
**And** Checklist includes: "Code commented where needed"
**And** Checklist includes: "Unit tests added/updated"
**And** Checklist includes: "E2E tests added/updated"
**And** Checklist includes: "All tests passing locally"
**And** Checklist includes: "Documentation updated (if needed)"
**And** Checklist includes: "No breaking changes (or documented)"
**And** Template includes "Screenshots" section (optional for UI changes)
**And** Template includes "Additional Notes" section for extra context
**And** Template is automatically populated when creating new PR
**And** Template uses markdown checkboxes: `- [ ]` for unchecked items
**And** Template is clear, concise, and easy to follow
**And** E2E workflow validates new PRs include completed checklist

---

### Story 5.3: Create Issue Templates (Bug, Feature, Good First Issue)

As a contributor or user,
I want structured issue templates,
So that I can report bugs or request features with all necessary information.

**Acceptance Criteria:**

**Given** Users will report bugs and request features
**When** I create issue templates
**Then** Bug report template is created: `.github/ISSUE_TEMPLATE/bug_report.yml`
**And** Bug template includes: Title, Description, Steps to Reproduce, Expected Behavior, Actual Behavior, Environment (Browser, OS, Version)
**And** Bug template uses GitHub form schema (YAML) for structured input
**And** Bug template has "bug" label automatically applied
**And** Feature request template is created: `.github/ISSUE_TEMPLATE/feature_request.yml`
**And** Feature template includes: Title, Problem Statement, Proposed Solution, Alternatives Considered, Additional Context
**And** Feature template has "enhancement" label automatically applied
**And** Good first issue template is created: `.github/ISSUE_TEMPLATE/good_first_issue.yml`
**And** Good first issue template includes: Title, Description, Acceptance Criteria, Helpful Resources, Estimated Difficulty
**And** Good first issue template has "good first issue" label automatically applied
**And** Issue config file created: `.github/ISSUE_TEMPLATE/config.yml`
**And** Config file includes link to Discussions for questions
**And** Config file includes link to README for general information
**And** All templates are clear and guide users to provide useful information
**And** Templates prevent low-quality or incomplete issue submissions
**And** E2E workflow validates issue templates appear when creating new issue

---

### Story 5.4: Configure Code Rabbit Integration

As a contributor,
I want automated code review feedback,
So that I can improve my pull requests before maintainer review.

**Acceptance Criteria:**

**Given** Code Rabbit is available for automated reviews
**When** I configure Code Rabbit integration
**Then** Code Rabbit GitHub App is installed on repository
**And** Code Rabbit is configured via `.coderabbit.yaml` file in repository root
**And** Configuration enables automated PR reviews
**And** Code Rabbit reviews code quality, best practices, potential bugs
**And** Code Rabbit checks TypeScript types and ESLint rules
**And** Code Rabbit reviews test coverage changes
**And** Code Rabbit provides inline comments on PR diffs
**And** Code Rabbit suggestions are constructive and actionable
**And** Code Rabbit auto-approves minor changes (docs, formatting)
**And** Code Rabbit integrates with GitHub Actions workflow
**And** Code Rabbit reviews run automatically on every PR
**And** Code Rabbit results appear in PR checks section
**And** Configuration excludes generated files from review
**And** Configuration focuses on high-impact issues (not nitpicks)
**And** Contributors can request re-review after addressing feedback
**And** README mentions Code Rabbit in "Contributing" section

---

### Story 5.5: Document Code Style and Commit Conventions

As a contributor,
I want documented code style and commit conventions,
So that my contributions match project standards.

**Acceptance Criteria:**

**Given** The project has established patterns and conventions
**When** I document code style and commit conventions
**Then** Code style section is added to CONTRIBUTING.md
**And** Code style references Architecture document patterns
**And** Naming conventions are documented: camelCase variables, PascalCase components, UPPER_SNAKE_CASE constants
**And** File naming conventions are documented: `useFeatureName.ts`, `ComponentName.vue`, `[name].[method].ts`
**And** Directory structure is documented: `app/components/`, `app/composables/`, `server/api/`
**And** TypeScript strict mode is mentioned (no `any` types)
**And** Import order convention is documented (built-in → external → internal)
**And** Commit message conventions section is added
**And** Commit format follows Conventional Commits: `type(scope): description`
**And** Commit types are documented: feat, fix, docs, style, refactor, test, chore
**And** Examples of good commits: `feat(api): add geolocation caching`, `fix(ui): resolve dark mode flash on load`
**And** Examples of bad commits: "fix stuff", "WIP", "asdf"
**And** Commit messages should be imperative mood: "add feature" not "added feature"
**And** Co-author attribution is documented: `Co-Authored-By: Name <email>`
**And** ESLint and Prettier enforce code style automatically
**And** Pre-commit hooks validate commit message format (optional)
**And** Documentation is clear with examples for each convention

---

## Epic 6: Performance & Accessibility Excellence

The application achieves professional standards: Lighthouse Performance > 90, Accessibility = 100, WCAG 2.1 Level AA compliance, Core Web Vitals optimized, and optimized bundles.

### Story 6.1: Optimize Bundle Sizes (JS < 150KB, CSS < 30KB)

As a visitor,
I want fast page loads with minimal bundle sizes,
So that the application loads quickly even on slower connections.

**Acceptance Criteria:**

**Given** The application is built and deployed
**When** I analyze and optimize bundle sizes
**Then** Production JavaScript bundle is < 150KB gzipped
**And** Production CSS bundle is < 30KB gzipped
**And** Nuxt automatically code-splits routes and components
**And** NuxtUI components are tree-shaken (only used components included)
**And** Unused CSS is purged via Tailwind's built-in purging
**And** Images are optimized and served in modern formats (WebP with fallbacks)
**And** Nuxt Image module is configured for automatic image optimization
**And** Fonts are preloaded using `<link rel="preload">`
**And** Critical CSS is inlined in HTML head
**And** Non-critical JavaScript is deferred or lazy-loaded
**And** Third-party scripts (if any) are loaded asynchronously
**And** Bundle analyzer is used to identify large dependencies
**And** Build process generates bundle size report
**And** Bundle sizes are tracked in CI/CD (fail if exceeds thresholds)
**And** Lighthouse audit reports no excessive bundle size warnings
**And** E2E tests validate total page weight < 500KB on initial load

---

### Story 6.2: Implement Core Web Vitals Optimization (LCP, FID, CLS)

As a visitor,
I want excellent page performance metrics,
So that the application feels fast and responsive.

**Acceptance Criteria:**

**Given** The application is deployed
**When** I optimize Core Web Vitals
**Then** Largest Contentful Paint (LCP) is < 1.5 seconds
**And** First Input Delay (FID) is < 100 milliseconds
**And** Cumulative Layout Shift (CLS) is < 0.1
**And** Time to Interactive (TTI) is < 3 seconds
**And** First Contentful Paint (FCP) is < 1.0 second
**And** Server-side rendering ensures fast FCP
**And** Critical resources are preloaded (fonts, CSS)
**And** Images have explicit width/height to prevent layout shift
**And** Skeleton screens prevent CLS during data loading
**And** Font loading uses `font-display: swap` to prevent FOIT (Flash of Invisible Text)
**And** No layout shifts occur during theme toggle
**And** Responsive images use `srcset` for optimal loading
**And** Resource hints are used: preconnect, dns-prefetch for external APIs
**And** Lighthouse measures all Core Web Vitals and reports passing scores
**And** Vercel Analytics tracks real-user Core Web Vitals in production
**And** E2E tests validate Core Web Vitals thresholds

---

### Story 6.3: Configure Lighthouse CI with Quality Gates

As a developer,
I want automated Lighthouse audits in CI/CD,
So that performance and accessibility regressions are caught before deployment.

**Acceptance Criteria:**

**Given** GitHub Actions CI/CD pipeline exists
**When** I configure Lighthouse CI
**Then** Lighthouse CI job is added to `.github/workflows/ci.yml`
**And** Lighthouse CI runs on every pull request and push to main
**And** `lighthouserc.json` configuration file is created
**And** Configuration sets minimum score thresholds: Performance > 90, Accessibility = 100, Best Practices > 95, SEO > 95
**And** Lighthouse runs on both mobile and desktop viewports
**And** Lighthouse audits are performed on production build (not dev server)
**And** Build is served locally during CI using `bun run preview`
**And** Lighthouse reports are uploaded as GitHub Actions artifacts
**And** Failing scores block PR merges (CI job fails)
**And** Lighthouse results are commented on PRs automatically
**And** Performance budget is configured: JS < 150KB, CSS < 30KB, images < 200KB
**And** Budget violations fail the Lighthouse CI job
**And** Lighthouse CI uses multiple runs (3-5) and reports median scores
**And** Configuration is optimized for CI environment (no rate limiting, proper timeouts)
**And** E2E validates Lighthouse CI job runs successfully

---

### Story 6.4: Implement Comprehensive Keyboard Navigation

As a keyboard user,
I want full keyboard navigation support,
So that I can use the application without a mouse.

**Acceptance Criteria:**

**Given** The application has interactive elements
**When** I implement comprehensive keyboard navigation
**Then** All interactive elements are accessible via Tab key
**And** Tab order is logical: Skip link → IP display → Copy button → Refresh button → Theme toggle → Map link → Footer links
**And** Shift+Tab navigates backward through elements
**And** Enter and Space keys activate buttons and links
**And** Escape key dismisses toast notifications
**And** Focus indicators are visible on all interactive elements (2px ring, primary color)
**And** Focus indicators meet WCAG AA contrast requirements (3:1)
**And** Focus is not trapped in any component
**And** Skip link is visible when focused, hidden otherwise
**And** Skip link navigates to main content (`<main id="main-content">`)
**And** No keyboard navigation dead-ends exist
**And** Custom keyboard shortcuts work without conflicts (if implemented)
**And** Focus management is proper after modal/toast interactions
**And** Disabled elements are not focusable
**And** ARIA attributes support keyboard navigation (`aria-label`, `aria-describedby`)
**And** E2E tests validate complete keyboard navigation flow
**And** E2E tests validate Tab order matches expected sequence
**And** Manual testing with keyboard-only confirms usability

---

### Story 6.5: Add Screen Reader Optimization (Skip Links, ARIA)

As a screen reader user,
I want comprehensive screen reader support,
So that I can access all information and functionality.

**Acceptance Criteria:**

**Given** The application is accessible via keyboard
**When** I optimize for screen readers
**Then** Skip link is implemented: "Skip to main content"
**And** Semantic HTML is used throughout: `<header>`, `<main>`, `<nav>`, `<footer>`
**And** ARIA landmarks are present: `role="banner"`, `role="main"`, `role="contentinfo"`
**And** Heading hierarchy is logical: Single H1, properly nested H2-H6
**And** All images have descriptive alt text (or `alt=""` for decorative images)
**And** All interactive elements have descriptive `aria-label` attributes
**And** Live regions announce dynamic content: `aria-live="polite"` for toasts
**And** Error messages use `role="alert"` and `aria-live="assertive"`
**And** Loading states are announced: `aria-busy="true"` on loading buttons
**And** Visually hidden text provides context: `.sr-only` class for screen-reader-only text
**And** Button labels are descriptive: "Copy IP address to clipboard" not just "Copy"
**And** Link purposes are clear from link text alone
**And** Form inputs have associated labels (if forms added later)
**And** ARIA attributes are not overused (semantic HTML preferred)
**And** Screen reader testing with VoiceOver (macOS) confirms full accessibility
**And** Screen reader testing with NVDA (Windows) confirms full accessibility
**And** E2E tests with axe-core validate ARIA implementation
**And** Lighthouse Accessibility audit passes with 100/100

---

### Story 6.6: Validate WCAG 2.1 AA Compliance

As a user with disabilities,
I want the application to meet WCAG 2.1 Level AA standards,
So that I can use it effectively regardless of my abilities.

**Acceptance Criteria:**

**Given** All accessibility features are implemented
**When** I validate WCAG 2.1 AA compliance
**Then** Color contrast meets 4.5:1 ratio for normal text (< 18px)
**And** Color contrast meets 3:1 ratio for large text (>= 18px or 14px bold)
**And** Color contrast is validated in both light and dark modes
**And** Information is not conveyed by color alone (icons + text)
**And** Text can be resized up to 200% without loss of content or functionality
**And** No content flashes more than 3 times per second (seizure prevention)
**And** Touch targets are minimum 44x44 pixels (48x48 on mobile)
**And** Spacing between touch targets is minimum 8px
**And** Page has clear focus indicators on all interactive elements
**And** Page title is descriptive and unique
**And** Language of page is identified: `<html lang="en">`
**And** No keyboard traps exist
**And** All functionality is available via keyboard
**And** No unexpected context changes on focus or input
**And** Error messages are clear and provide suggestions
**And** Consistent navigation across the application
**And** axe-core automated testing reports zero critical violations
**And** pa11y automated testing passes WCAG AA checks
**And** Manual testing with assistive technologies confirms compliance
**And** Lighthouse Accessibility score is 100/100
**And** WCAG 2.1 AA checklist is completed and documented

---

## Epic 7: Production Analytics & Monitoring

Project maintainer can track application usage, detect errors, and measure portfolio impact. Privacy-friendly analytics track site visits and link clicks, Sentry monitors errors with alerts, and Vercel Analytics provides Web Vitals in real-time.

### Story 7.1: Configure Vercel Analytics for Web Vitals

As a project maintainer,
I want to track real-user performance metrics,
So that I can monitor Core Web Vitals and visitor statistics in production.

**Acceptance Criteria:**

**Given** The application is deployed on Vercel
**When** I configure Vercel Analytics
**Then** Vercel Analytics is enabled in project settings
**And** `@vercel/analytics` package is installed: `bun add @vercel/analytics`
**And** Analytics script is added to `app.vue` or `nuxt.config.ts`
**And** Analytics tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB
**And** Analytics tracks page views automatically
**And** Analytics tracks unique visitors (privacy-friendly, no cookies)
**And** Analytics dashboard shows real-time visitor data
**And** Analytics dashboard shows geographic distribution of visitors
**And** Analytics dashboard shows device breakdown (mobile, tablet, desktop)
**And** Analytics dashboard shows browser breakdown
**And** Core Web Vitals are displayed in Vercel dashboard
**And** Alerts are configured for Core Web Vitals degradation
**And** Analytics respects user privacy (GDPR compliant)
**And** No personal data is collected or stored
**And** Analytics data is accessible to project maintainer
**And** E2E tests validate analytics script loads correctly
**And** Production deployment confirms analytics data is being collected

---

### Story 7.2: Set Up Sentry Error Monitoring

As a project maintainer,
I want to be notified of runtime errors,
So that I can quickly identify and fix production issues.

**Acceptance Criteria:**

**Given** The application may encounter runtime errors
**When** I configure Sentry error monitoring
**Then** Sentry free tier account is created
**And** `@sentry/nuxt` package is installed: `bun add @sentry/nuxt`
**And** Sentry is configured in `nuxt.config.ts` with DSN
**And** Sentry captures uncaught JavaScript errors
**And** Sentry captures unhandled promise rejections
**And** Sentry captures Vue component errors via global error handler
**And** Sentry captures API errors from server routes
**And** Error reports include: stack trace, user agent, URL, timestamp
**And** Error reports include breadcrumbs (user actions leading to error)
**And** Source maps are uploaded to Sentry for readable stack traces
**And** Sentry environment is set to "production" for production builds
**And** Email alerts are configured for new error occurrences
**And** Sentry dashboard groups similar errors together
**And** Error severity levels are properly categorized (fatal, error, warning)
**And** Sensitive data is scrubbed from error reports (IPs, tokens)
**And** Sentry respects user privacy settings
**And** Error sampling rate is configured to stay within free tier limits
**And** E2E tests validate Sentry initialization
**And** Manual error triggers confirm Sentry captures and reports errors

---

### Story 7.3: Implement Custom Event Tracking

As a project maintainer,
I want to track specific user interactions,
So that I can understand how visitors use the application.

**Acceptance Criteria:**

**Given** Vercel Analytics is configured
**When** I implement custom event tracking
**Then** `track()` function from `@vercel/analytics` is used for custom events
**And** "copy_ip_click" event is tracked when user copies IP to clipboard
**And** "refresh_click" event is tracked when user manually refreshes data
**And** "github_link_click" event is tracked when user clicks GitHub repository link
**And** "profile_link_click" event is tracked when user clicks developer profile link
**And** "theme_toggle" event is tracked when user manually toggles dark/light mode
**And** "map_link_click" event is tracked when user clicks "View on Map" link
**And** Events include minimal metadata (no personal data)
**And** Events are batched to minimize network requests
**And** Event tracking does not impact page performance
**And** Events respect user privacy preferences (no tracking if DNT enabled)
**And** Events are visible in Vercel Analytics dashboard
**And** Event frequency and trends can be analyzed
**And** Custom events help measure portfolio project engagement
**And** E2E tests validate events are fired correctly
**And** Production deployment confirms events are being tracked

---

### Story 7.4: Create Analytics Dashboard Monitoring

As a project maintainer,
I want to monitor GitHub repository metrics,
So that I can track project visibility and community engagement.

**Acceptance Criteria:**

**Given** The project is on GitHub with analytics enabled
**When** I monitor repository analytics
**Then** GitHub Insights tab shows traffic statistics (views, clones)
**And** GitHub shows visitor count and unique visitors over time
**And** GitHub shows referring sites that link to the repository
**And** GitHub shows popular content (README, files)
**And** Repository stars count is visible and tracked over time
**And** Repository forks count is visible and tracked over time
**And** Repository watchers count is visible
**And** Pull request activity is tracked (opened, merged, closed)
**And** Issue activity is tracked (opened, closed)
**And** Contributor count is visible
**And** Commit activity graph shows development velocity
**And** GitHub Actions badge shows build status on README
**And** Codecov badge shows test coverage percentage on README
**And** Lighthouse badge shows performance score on README
**And** All badges are automatically updated (not static images)
**And** Project maintainer can access analytics via GitHub web interface
**And** Portfolio impact can be assessed via GitHub metrics
**And** README provides clear instructions for viewing analytics
