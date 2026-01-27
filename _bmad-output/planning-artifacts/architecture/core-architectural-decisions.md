# Core Architectural Decisions

## Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Infrastructure: Vercel hosting for Node.js SSR
- API Caching: Nitro Cache with 5-minute TTL
- Rate Limiting: Dual-layer (server + client)
- CI/CD Pipeline: GitHub Actions with quality gates
- Environment Configuration: .env local + Vercel environment variables

**Important Decisions (Shape Architecture):**

- Analytics: Vercel Analytics for Web Vitals tracking
- Error Monitoring: Sentry free tier
- Component Architecture: Pragmatic mix (composables + SFC)
- Error Handling: Dual-layer (Vue handlers + Nuxt error.vue)
- SEO Management: @nuxtjs/seo module (includes sitemap)

**Deferred Decisions (Post-MVP):**

- Advanced caching strategies (Redis, CDN edge cache)
- International analytics (multi-region tracking)
- Advanced error replay (LogRocket, session recording)
- Custom analytics dashboards

## Infrastructure & Deployment

**Decision: Hosting Platform**

**Selected:** Vercel

**Version:** Latest (Vercel CLI v33+, January 2026)

**Rationale:**

- **Optimal for Nuxt SSR:** Vercel is built by the creators of Next.js and has first-class Nuxt 4 support
- **Performance Requirements:** Edge network with global CDN meets < 1s load time requirement
- **Zero-downtime Deployments:** Automatic atomic deployments satisfy 99.9% uptime requirement
- **SSL/HTTPS:** Automatic SSL certificates with auto-renewal (meets NFR-SE1)
- **GitHub Integration:** Automatic deployments on push/PR (aligns with CI/CD requirements)
- **Monitoring Built-in:** Vercel Analytics and error tracking available
- **Cost:** Free tier for open source projects (hobby plan sufficient)

**Configuration:**

- Framework Preset: Nuxt.js (auto-detected)
- Build Command: `bun run build`
- Output Directory: `.output` (Nuxt default)
- Node.js Version: 18.x LTS
- Environment Variables: Managed via Vercel UI

**Deployment Strategy:**

- **Production:** `main` branch → automatic deployment to production
- **Preview:** Pull requests → automatic preview deployments
- **Rollback:** Instant rollback via Vercel dashboard if needed

**Affects:** All deployment workflows, CI/CD pipeline, environment configuration

---

## API & Communication Patterns

**Decision A: API Caching Strategy**

**Selected:** Nitro Cache (Built-in Nuxt)

**Implementation:** `defineCachedEventHandler()` with 5-minute TTL

**Rationale:**

- **Built-in Solution:** No external dependencies, integrated with Nuxt 4 Nitro engine
- **TTL Support:** Configurable cache duration (5 minutes per NFR-P6)
- **Vercel Compatible:** Works seamlessly on Vercel serverless functions
- **Simple Configuration:** Single decorator on API route
- **Cost:** Zero additional cost

**Implementation Pattern:**

```typescript
// server/api/geolocation.get.ts
export default defineCachedEventHandler(
  async event => {
    const ip = getRequestIP(event);
    const geoData = await $fetch(`http://ip-api.com/json/${ip}`);
    return geoData;
  },
  {
    maxAge: 60 * 5, // 5 minutes in seconds
    getKey: event => getRequestIP(event) || 'unknown', // Cache per IP
  }
);
```

**Cache Invalidation:**

- Automatic expiration after 5 minutes
- Manual refresh button bypasses cache (new request)
- Cache key: User's IP address (unique per visitor)

**Affects:** `server/api/geolocation.get.ts`, API response times, rate limit protection

---

**Decision B: Rate Limiting Protection**

**Selected:** Dual-layer (Server-side + Client-side)

**Rationale:**

- **Server-side Protection:** Prevents exceeding ip-api.com rate limits (150 req/min free tier)
- **Client-side UX:** Immediate user feedback, prevents unnecessary requests
- **Robust Approach:** Defense in depth against rate limit violations
- **Simple Implementation:** Minimal code overhead

**Server-side Implementation:**

```typescript
// server/utils/rateLimiter.ts
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache({
  max: 500,
  ttl: 60_000, // 1 minute
});

export function checkRateLimit(identifier: string): boolean {
  const requests = (rateLimitCache.get(identifier) as number) || 0;
  if (requests >= 10) {
    // 10 requests per minute per IP
    return false;
  }
  rateLimitCache.set(identifier, requests + 1);
  return true;
}
```

**Client-side Implementation:**

```typescript
// composables/useIpRefresh.ts
export const useIpRefresh = () => {
  const canRefresh = ref(true);
  const cooldownSeconds = ref(0);

  const refresh = async () => {
    if (!canRefresh.value) return;

    canRefresh.value = false;
    cooldownSeconds.value = 10; // 10 second cooldown

    // Perform refresh...

    const interval = setInterval(() => {
      cooldownSeconds.value--;
      if (cooldownSeconds.value <= 0) {
        canRefresh.value = true;
        clearInterval(interval);
      }
    }, 1000);
  };

  return { refresh, canRefresh, cooldownSeconds };
};
```

**Rate Limit Strategy:**

- Server: 10 requests per minute per IP
- Client: 10 second cooldown between manual refreshes
- Cache: 5-minute cache reduces API calls further

**Affects:** `server/api/geolocation.get.ts`, refresh button component, user experience

---

## Analytics & Monitoring

**Decision A: Analytics Provider**

**Selected:** Vercel Analytics

**Version:** Vercel Analytics v1 (latest, January 2026)

**Rationale:**

- **Zero Configuration:** Automatic integration with Vercel hosting
- **Privacy-Friendly:** No cookies, GDPR compliant (meets privacy requirements)
- **Web Vitals Tracking:** Built-in LCP, FID, CLS monitoring (critical for NFR-P2, NFR-P3, NFR-P4)
- **Real User Monitoring:** Actual performance data from visitors
- **Cost:** $10/month for 100k events (reasonable for portfolio project)
- **Portfolio Value:** Demonstrates modern performance monitoring practices

**Metrics Tracked:**

- Page views and unique visitors
- Core Web Vitals (LCP, FID, CLS)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Geographic distribution
- Device/browser breakdown

**Installation:**

```bash
bun add @vercel/analytics
```

```typescript
// app.vue or plugins/analytics.ts
import { inject } from '@vercel/analytics';

export default defineNuxtPlugin(() => {
  inject();
});
```

**Custom Events (for PRD requirements):**

- `github_link_click` - Track repository link clicks (FR60)
- `profile_link_click` - Track personal profile clicks (FR61)
- `copy_ip_click` - Track copy to clipboard usage
- `refresh_ip_click` - Track manual refresh usage

**Affects:** All pages, performance monitoring workflow, portfolio showcase metrics

**Alternative Considered:** Umami (open source, self-hosted) - deferred for simplicity and Vercel integration benefits

---

**Decision B: Error Monitoring**

**Selected:** Sentry (Free Tier)

**Version:** @sentry/nuxt ^8.x (latest stable, January 2026)

**Rationale:**

- **Industry Standard:** Proven error tracking and debugging platform
- **Free Tier:** 5,000 errors/month (sufficient for portfolio project)
- **Source Maps:** Automatic source map upload for readable stack traces
- **Error Grouping:** Intelligent error deduplication and grouping
- **Alerting:** Email/Slack notifications for critical errors (supports 99.9% uptime goal)
- **Nuxt Integration:** Official `@sentry/nuxt` package with auto-instrumentation
- **Portfolio Value:** Demonstrates production-grade error handling practices

**Installation:**

```bash
bun add @sentry/nuxt
```

**Configuration:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sentry/nuxt/module'],
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0, // 100% for low-traffic portfolio
    replaysSessionSampleRate: 0.1, // 10% session replay
    replaysOnErrorSampleRate: 1.0, // 100% on errors
  },
});
```

**Error Tracking Strategy:**

- **Automatic:** Unhandled exceptions, promise rejections
- **Manual:** Structured error logging for API failures
- **Source Maps:** Uploaded automatically during build (Vercel integration)
- **User Context:** IP address (hashed for privacy), user agent, geographic region

**Alert Configuration:**

- Critical errors (API failures, SSR crashes): Immediate email
- Performance degradation: Daily digest
- Error rate spike: Slack notification

**Affects:** All application code, error handling strategy, CI/CD pipeline (source map upload)

---

## Frontend Architecture

**Decision A: Component Architecture Pattern**

**Selected:** Pragmatic Mix (Composables + SFC)

**Rationale:**

- **Composables for Logic:** Reusable business logic extracted to composables
- **SFC for UI:** Simple single-file components for presentational UI
- **No Over-Engineering:** Avoids unnecessary abstraction for simple app
- **Portfolio Value:** Demonstrates modern Vue 3 Composition API mastery
- **Maintainability:** Clear separation of concerns

**Composable Strategy:**

**Core Composables:**

```typescript
// composables/useIpDetection.ts
export const useIpDetection = () => {
  const ipAddress = ref<string>('');
  const loading = ref(true);
  const error = ref<Error | null>(null);

  const detectIp = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await $fetch('/api/ip');
      ipAddress.value = data.ip;
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return { ipAddress, loading, error, detectIp };
};
```

```typescript
// composables/useGeolocation.ts
export const useGeolocation = (ip: Ref<string>) => {
  const geolocation = ref<GeolocationData | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchGeolocation = async () => {
    // ... implementation
  };

  return { geolocation, loading, error, fetchGeolocation };
};
```

```typescript
// composables/useCopyToClipboard.ts
export const useCopyToClipboard = () => {
  const toast = useToast();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.add({
        title: 'IP Copied!',
        icon: 'i-heroicons-check-circle',
        color: 'green',
      });
    } catch (error) {
      toast.add({
        title: 'Copy Failed',
        description: 'Please try again',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
      });
    }
  };

  return { copy };
};
```

**Component Structure:**

```
app/components/
├── IpDisplay.vue           # Hero IP display (SFC)
├── GeolocationCard.vue     # Geolocation data card (SFC)
├── ActionButtons.vue       # Copy/Refresh buttons (SFC)
├── Footer.vue              # Footer with links (SFC)
└── ErrorState.vue          # Error fallback component (SFC)
```

**Pattern Rules:**

- Composables: Business logic, API calls, state management
- Components: Presentation, user interaction, layout
- Props: Pass data down
- Emits: Bubble events up (minimal, prefer composables)
- Auto-imports: Leverage Nuxt auto-import for both

**Affects:** All components, code organization, testing strategy

---

**Decision B: Error Boundary Strategy**

**Selected:** Dual-layer (Vue Error Handlers + Nuxt Error Handling)

**Rationale:**

- **Global Error Handler:** Catches uncaught Vue errors, logs to Sentry
- **Nuxt Error Page:** User-friendly error page for critical failures
- **Graceful Degradation:** API errors handled at component level
- **User Experience:** Friendly error messages, recovery paths
- **Monitoring:** All errors tracked in Sentry

**Implementation:**

**Global Vue Error Handler:**

```typescript
// plugins/errorHandler.ts
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Log to Sentry
    console.error('Vue Error:', error, info);

    // Optionally show user-friendly toast
    const toast = useToast();
    toast.add({
      title: 'Something went wrong',
      description: 'Please refresh the page',
      color: 'red',
      timeout: 0, // Persistent
    });
  };
});
```

**Nuxt Error Page:**

```vue
<!-- error.vue -->
<template>
  <NuxtLayout>
    <div class="error-page">
      <h1>{{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}</h1>
      <p>{{ error.message }}</p>
      <UButton @click="handleError">Go Home</UButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; message: string };
}>();

const handleError = () => clearError({ redirect: '/' });
</script>
```

**Component-Level Error Handling:**

```typescript
// Example in composable
export const useGeolocation = (ip: Ref<string>) => {
  const geolocation = ref<GeolocationData | null>(null);
  const error = ref<Error | null>(null);

  const fetchGeolocation = async () => {
    try {
      const data = await $fetch('/api/geolocation');
      geolocation.value = data;
      error.value = null;
    } catch (e) {
      error.value = e as Error;
      // Component can display friendly error UI
    }
  };

  return { geolocation, error, fetchGeolocation };
};
```

**Error Hierarchy:**

1. **Critical Errors** (SSR failures, page crashes): `error.vue` page
2. **API Errors** (geolocation failed): Component error state with retry
3. **User Action Errors** (copy failed): Toast notification

**Affects:** All components, error.vue page, user experience, Sentry integration

---

## SEO & Discoverability

**Decision A: Sitemap Generation**

**Selected:** @nuxtjs/sitemap module

**Version:** @nuxtjs/sitemap v5.x (latest for Nuxt 4, January 2026)

**Rationale:**

- **Official Module:** Maintained by Nuxt team
- **Auto-generation:** Automatic sitemap from file-based routes
- **Dynamic Routes:** Supports dynamic route generation
- **Standards Compliant:** XML sitemap following sitemaps.org protocol
- **Vercel Compatible:** Works seamlessly on edge/serverless

**Installation:**

```bash
bun add -D @nuxtjs/sitemap
```

**Configuration:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: 'https://what-is-my-ip.vercel.app', // or custom domain
  },
  sitemap: {
    strictNuxtContentPaths: true,
    exclude: ['/api/**'], // Exclude API routes
  },
});
```

**Generated Sitemap:**

- URL: `/sitemap.xml`
- Includes: Homepage (index page)
- Frequency: Static (single-page app, no dynamic routes)
- Priority: 1.0 (homepage priority)

**Affects:** SEO discoverability, search engine crawling

---

**Decision B: Meta Tags Management**

**Selected:** @nuxtjs/seo module

**Version:** @nuxtjs/seo v2.x (latest for Nuxt 4, January 2026)

**Rationale:**

- **All-in-One Solution:** Sitemap + meta + Open Graph + Twitter Cards + robots.txt
- **Official Module:** Nuxt ecosystem module
- **Centralized Configuration:** Single source of truth for SEO
- **Dynamic Meta:** Per-page meta customization with `useSeoMeta()`
- **Social Sharing:** Automatic Open Graph and Twitter Card generation

**Installation:**

```bash
bun add -D @nuxtjs/seo
```

**Configuration:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],
  site: {
    url: 'https://what-is-my-ip.vercel.app',
    name: 'What Is My IP',
    description:
      'Instantly discover your IP address and geolocation. Modern, fast, and privacy-friendly IP lookup tool built with Nuxt 4.',
    defaultLocale: 'en',
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  ogImage: {
    enabled: true,
    // Auto-generates Open Graph images
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  robots: {
    allow: ['/'],
    disallow: ['/api'],
  },
});
```

**Page-Level Meta:**

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useSeoMeta({
  title: 'What Is My IP - Instant IP Detection & Geolocation',
  description:
    'Discover your IP address and location instantly. Fast, privacy-friendly IP lookup with geolocation data.',
  ogTitle: 'What Is My IP',
  ogDescription: 'Instant IP detection and geolocation lookup',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'What Is My IP',
  twitterDescription: 'Instant IP detection and geolocation',
  twitterImage: '/og-image.png',
});
</script>
```

**SEO Features Provided:**

- Unique title tags (< 60 chars, meets NFR-S1)
- Meta descriptions (< 160 chars, meets NFR-S2)
- Open Graph tags (meets NFR-S3)
- Twitter Card tags (meets NFR-S4)
- Canonical URLs (meets NFR-S5)
- Sitemap.xml (meets NFR-S6)
- robots.txt (meets NFR-S7)

**Affects:** All pages, social media sharing, search engine indexing

**Note:** Replaces separate @nuxtjs/sitemap module (included in @nuxtjs/seo)

---

## CI/CD Pipeline

**Decision: GitHub Actions Workflow Structure**

**Selected:** Matrix Strategy (Parallel Jobs with Quality Gates)

**Rationale:**

- **Parallel Execution:** Faster CI/CD (lint, test, build run simultaneously)
- **Quality Gates:** Deployment blocked if any job fails (meets NFR-M2, NFR-M3)
- **Clear Failures:** Isolated jobs make debugging easier
- **Cost Efficient:** GitHub Actions free for public repos
- **Vercel Integration:** Automatic deployment on successful pipeline

**Workflow Structure:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run format:check

  typecheck:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run typecheck

  test-unit:
    name: Unit Tests (Vitest)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test:unit --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  test-e2e:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bunx playwright install --with-deps
      - run: bun run build
      - run: bun run test:e2e
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  build:
    name: Build Validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - name: Check bundle size
        run: bun run analyze:bundle

  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          configPath: './lighthouserc.json'
          uploadArtifacts: true

  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test-unit, test-e2e, build, lighthouse]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Quality Gates:**

1. **Lint:** ESLint + Prettier checks must pass
2. **TypeCheck:** No TypeScript errors (strict mode)
3. **Unit Tests:** 100% coverage required (meets NFR-M1)
4. **E2E Tests:** All critical user journeys pass
5. **Build:** Successful build with bundle size validation
6. **Lighthouse:** Performance > 90, Accessibility = 100 (meets NFR-P1, NFR-A1)

**Deployment Flow:**

- Pull Requests: All checks run, no deployment (Vercel preview automatic)
- Main Branch: All checks + deployment to production
- Failure: Any job fails → deployment blocked

**Lighthouse Configuration:**

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Affects:** All code changes, deployment workflow, quality assurance process

---

## Environment Configuration

**Decision: Secrets Management**

**Selected:** Dual Approach (.env local + Vercel Environment Variables)

**Rationale:**

- **Local Development:** `.env` files for local development (git-ignored)
- **Production:** Vercel Environment Variables for deployed environments
- **Contributor Friendly:** `.env.example` template committed to repo
- **Type-Safe Access:** Nuxt `runtimeConfig` for typed environment variables
- **Security:** Secrets never committed to git

**Configuration Structure:**

**`.env.example` (committed):**

```bash
# Site Configuration
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optional for local dev)
# SENTRY_DSN=your-sentry-dsn-here

# API Keys (if needed in future)
# IP_API_KEY=your-api-key-here
```

**`.env` (git-ignored, local only):**

```bash
NUXT_PUBLIC_SITE_URL=http://localhost:3000
SENTRY_DSN=https://xxx@sentry.io/xxx
```

**`nuxt.config.ts` (runtimeConfig):**

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (server-only)
    ipApiKey: process.env.IP_API_KEY || '',

    // Public keys (client + server)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
});
```

**Vercel Environment Variables (Production):**

Via Vercel UI or CLI:

```bash
vercel env add NUXT_PUBLIC_SITE_URL production
vercel env add SENTRY_DSN production
```

**Environment Variable Categories:**

**Public (Client + Server):**

- `NUXT_PUBLIC_SITE_URL` - Canonical site URL for SEO

**Private (Server-only):**

- `SENTRY_DSN` - Sentry error tracking DSN
- `IP_API_KEY` - ip-api.com API key (if upgraded to paid plan)

**Auto-configured by Vercel:**

- `VERCEL_URL` - Automatic deployment URL
- `VERCEL_ENV` - Environment (production, preview, development)
- `VERCEL_ANALYTICS_ID` - Vercel Analytics ID (automatic)

**Access Pattern:**

```typescript
// Server-side (server/api/geolocation.get.ts)
const config = useRuntimeConfig();
const apiKey = config.ipApiKey; // Private, server-only

// Client-side (components or composables)
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl; // Public, available everywhere
```

**Security Best Practices:**

- `.env` in `.gitignore` (never commit secrets)
- `.env.example` provides template for contributors
- Vercel Environment Variables for staging/production
- No API keys in client-side code
- Rotation: Easy to rotate via Vercel UI

**Affects:** All environments, API routes, configuration management, contributor onboarding

---

## Decision Impact Analysis

**Implementation Sequence:**

1. **Foundation (Sprint 1):**
   - Initialize Nuxt 4 project
   - Configure Vercel deployment
   - Set up environment variables
   - Install @nuxtjs/seo module

2. **Quality Infrastructure (Sprint 1-2):**
   - Configure GitHub Actions CI/CD pipeline
   - Set up Lighthouse automation
   - Integrate Sentry error monitoring
   - Configure Vercel Analytics

3. **Core Features (Sprint 2-3):**
   - Implement composables (useIpDetection, useGeolocation, useCopyToClipboard)
   - Build UI components (IpDisplay, GeolocationCard, ActionButtons)
   - Add Nitro Cache with 5-minute TTL
   - Implement rate limiting (server + client)
   - Create error handling (error.vue + Vue error handlers)

4. **Testing & Polish (Sprint 3-4):**
   - Write unit tests (Vitest, 100% coverage)
   - Write E2E tests (Playwright, all user journeys)
   - Accessibility audit (WCAG AA compliance)
   - Performance optimization (Lighthouse > 90)

**Cross-Component Dependencies:**

**Analytics ← Error Monitoring:**

- Vercel Analytics tracks performance
- Sentry tracks errors
- Both feed into overall quality metrics

**CI/CD → All Quality Gates:**

- GitHub Actions orchestrates all checks
- Lighthouse validates performance
- Playwright validates E2E
- Vitest validates unit tests

**Caching ← Rate Limiting:**

- Nitro Cache reduces API calls (primary protection)
- Rate limiting provides secondary protection
- Both work together to stay within ip-api.com limits

**SEO → Environment Config:**

- @nuxtjs/seo requires `site.url` from runtime config
- Meta tags reference environment-specific URLs

**Error Handling → Monitoring:**

- Vue error handlers log to Sentry
- error.vue provides user-friendly fallback
- Sentry tracks error frequency and patterns

**Component Architecture → Testing:**

- Composables are unit tested (business logic)
- Components are E2E tested (user interactions)
- Clear separation simplifies testing strategy

**Deployment → CI/CD:**

- Vercel deployment triggered by GitHub Actions
- All quality gates must pass before deploy
- Automatic rollback if deployment fails
