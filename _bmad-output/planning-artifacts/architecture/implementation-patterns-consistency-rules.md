# Implementation Patterns & Consistency Rules

## Pattern Categories Defined

**Critical Conflict Points Identified:** 15 areas where AI agents could make different choices

These patterns ensure all AI agents (Claude Code, future contributors, automated tools) write compatible code that integrates seamlessly.

**Why These Patterns Matter:**

- Multiple agents working on different stories must produce compatible code
- Prevents merge conflicts and integration issues
- Ensures consistent user experience across all features
- Simplifies testing and maintenance
- Enables confident parallel development

---

## Naming Patterns

**Code Naming Conventions:**

**Composables (Vue Composition API):**

**Pattern:** `useFeatureName` format (camelCase, descriptive)

**Rules:**

- Always start with `use` prefix
- Follow with descriptive feature name in camelCase
- Be specific enough to avoid conflicts, not overly verbose
- Use singular form for single-purpose composables

**Examples:**

```typescript
// ✅ GOOD
composables / useIpDetection.ts // Clear, specific
composables / useGeolocation.ts // Standard naming
composables / useCopyToClipboard.ts // Action-oriented

// ❌ BAD
composables / useIp.ts // Too vague
composables / useIPDetection.ts // Wrong case (IP should be Ip)
composables / ip - detection.ts // Wrong format (not composable pattern)
composables / getIpAddress.ts // Not a composable (use utility instead)
```

**Vue Components:**

**Pattern:** PascalCase without prefix

**Rules:**

- PascalCase naming (capitalize each word)
- No namespace prefix (small project, unnecessary)
- Descriptive single-word or compound names
- Suffix with purpose if generic (Card, Button, Modal)

**Examples:**

```vue
<!-- ✅ GOOD -->
components/IpDisplay.vue // Clear component name components/GeolocationCard.vue // Descriptive with
suffix components/ActionButtons.vue // Clear purpose components/Footer.vue // Simple, clear

<!-- ❌ BAD -->
components/ip-display.vue // Wrong case (kebab-case) components/IPDisplay.vue // Wrong case (IP
should be Ip) components/AppIpDisplay.vue // Unnecessary prefix components/ip_display.vue // Wrong
format (snake_case)
```

**Server API Routes:**

**Pattern:** Nuxt 4 file-based routing convention

**Rules:**

- Format: `[name].[method].ts` or `[name].[method].[format].ts`
- Use lowercase for file names
- HTTP method as suffix: `.get`, `.post`, `.put`, `.delete`
- Optional format suffix: `.json`, `.xml` (rarely needed)

**Examples:**

```typescript
// ✅ GOOD
server / api / ip.get.ts // GET /api/ip
server / api / geolocation.get.ts // GET /api/geolocation
server / api / health.get.ts // GET /api/health

// ❌ BAD
server / api / getIp.ts // Wrong format (no HTTP method)
server / api / IP.get.ts // Wrong case (should be lowercase)
server / api / get - ip.ts // Wrong format (not Nuxt convention)
```

**Types & Interfaces:**

**Pattern:** PascalCase without prefix

**Rules:**

- PascalCase for all types and interfaces
- No `I` prefix (modern TypeScript convention)
- Descriptive names ending with purpose if needed (Data, Config, Options)
- Use `type` for simple types, `interface` for objects

**Examples:**

```typescript
// ✅ GOOD
type IpAddress = string
interface GeolocationData {
  country: string
  city: string
  // ...
}
interface ToastOptions {
  title: string
  timeout?: number
}

// ❌ BAD
interface IGeolocationData { }     // Old convention (I prefix)
type geolocationData { }           // Wrong case
interface geoData { }              // Too abbreviated
type IPAddress = string            // Wrong case (IP should be Ip)
```

**Variables & Functions:**

**Pattern:** camelCase (JavaScript standard)

**Rules:**

- camelCase for all variables and functions
- Descriptive names (avoid abbreviations unless common)
- Boolean variables: prefix with `is`, `has`, `should`, `can`
- Functions: verb-first for actions (`fetch`, `get`, `set`, `update`)

**Examples:**

```typescript
// ✅ GOOD
const ipAddress = ref<string>('')
const isLoading = ref(false)
const canRefresh = computed(() => !isLoading.value)

async function fetchGeolocation() {}
function copyToClipboard(text: string) {}

// ❌ BAD
const IPAddress = ref<string>('') // Wrong case
const ip = ref<string>('') // Too abbreviated
const loading = ref(false) // Should be isLoading for boolean
const ip_address = ref('') // Wrong format (snake_case)

async function get_geolocation() {} // Wrong format
function clipboard(text: string) {} // Not descriptive (verb missing)
```

**Constants:**

**Pattern:** UPPER_SNAKE_CASE for true constants, camelCase for configuration values

**Rules:**

- UPPER_SNAKE_CASE for compile-time constants (magic numbers, fixed values)
- camelCase for runtime configuration (imported from config, environment)
- Always `const`, never `let` for constants

**Examples:**

```typescript
// ✅ GOOD
const MAX_RETRIES = 3
const API_TIMEOUT_MS = 5000
const CACHE_DURATION_MINUTES = 5

const apiBaseUrl = useRuntimeConfig().public.apiUrl // Config value

// ❌ BAD
const maxRetries = 3 // Should be UPPER_SNAKE_CASE
const MAX_API_TIMEOUT = 5000 // Inconsistent (use MS suffix)
let MAX_RETRIES = 3 // Should be const
const api_base_url = config.url // Wrong format for config value
```

**API Naming Conventions:**

**Endpoint Paths:**

**Pattern:** Lowercase, hyphen-separated, RESTful

**Rules:**

- Lowercase paths
- Hyphen-separated for multi-word resources
- Plural for collections, singular for specific items
- Avoid verbs in paths (use HTTP methods instead)

**Examples:**

```
✅ GOOD
GET /api/ip                        # Get IP address
GET /api/geolocation              # Get geolocation data
GET /api/health                   # Health check

❌ BAD
GET /api/IP                       # Wrong case
GET /api/get-ip                   # Verb in path (use HTTP method)
GET /api/geoLocation              # Wrong case (camelCase not allowed)
```

**Query Parameters:**

**Pattern:** camelCase (consistent with JavaScript)

**Examples:**

```
✅ GOOD
/api/geolocation?ipAddress=1.2.3.4
/api/search?maxResults=10

❌ BAD
/api/geolocation?ip_address=1.2.3.4  # snake_case
/api/search?max-results=10            # kebab-case
```

---

## Structure Patterns

**Project Organization:**

**Pattern:** Nuxt 4 default structure with test separation

**Directory Structure:**

```
what-is-my-ip/
├── app/                           # Application source (Nuxt 4)
│   ├── components/                # Vue components (auto-imported)
│   │   ├── IpDisplay.vue
│   │   ├── GeolocationCard.vue
│   │   ├── ActionButtons.vue
│   │   └── Footer.vue
│   ├── composables/               # Composition API utilities (auto-imported)
│   │   ├── useIpDetection.ts
│   │   ├── useGeolocation.ts
│   │   └── useCopyToClipboard.ts
│   ├── layouts/                   # Layout components
│   │   └── default.vue
│   ├── pages/                     # File-based routing
│   │   └── index.vue
│   ├── plugins/                   # Vue plugins
│   │   ├── analytics.ts
│   │   └── errorHandler.ts
│   └── utils/                     # Utility functions (auto-imported)
│       └── formatters.ts
├── server/                        # Server-side code
│   ├── api/                       # API routes (auto-registered)
│   │   ├── ip.get.ts
│   │   ├── geolocation.get.ts
│   │   └── health.get.ts
│   ├── middleware/                # Server middleware
│   └── utils/                     # Server utilities
│       └── rateLimiter.ts
├── tests/                         # Test files (separated)
│   ├── unit/                      # Vitest unit tests
│   │   ├── composables/
│   │   │   ├── useIpDetection.test.ts
│   │   │   └── useGeolocation.test.ts
│   │   └── utils/
│   │       └── formatters.test.ts
│   └── e2e/                       # Playwright E2E tests
│       ├── ip-detection.spec.ts
│       └── user-journeys.spec.ts
├── types/                         # Shared TypeScript types
│   └── index.ts
├── public/                        # Static assets
│   ├── favicon.ico
│   └── og-image.png
├── .github/                       # GitHub configuration
│   └── workflows/
│       └── ci.yml
├── nuxt.config.ts                 # Nuxt configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
├── .env.example                   # Environment template
└── README.md                      # Project documentation
```

**Rules:**

- **Components:** Flat structure in `app/components/` (no nested folders for small project)
- **Composables:** Flat structure in `app/composables/` (one file per composable)
- **Tests:** Mirrored structure in `tests/unit/` matching source files
- **Types:** Shared types in `types/index.ts`, feature-specific types co-located
- **Server:** API routes in `server/api/`, utilities in `server/utils/`

**File Naming Patterns:**

**Rule:** Match the export name

```typescript
// ✅ GOOD
app/components/IpDisplay.vue       → exports default component IpDisplay
app/composables/useIpDetection.ts  → exports useIpDetection
server/api/geolocation.get.ts      → GET /api/geolocation
types/index.ts                     → exports multiple types

// ❌ BAD
app/components/ip-display.vue      → Doesn't match PascalCase export
app/composables/ipDetection.ts     → Missing 'use' prefix
server/api/geo.get.ts              → Abbreviated name (unclear)
```

**Types Organization:**

**Pattern:** Shared types centralized, feature-specific types co-located

**Shared Types (in `types/index.ts`):**

```typescript
// types/index.ts
export type IpAddress = string

export interface GeolocationData {
  ip: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}

export interface ApiError {
  message: string
  statusCode: number
}
```

**Feature-Specific Types (co-located):**

```typescript
// composables/useIpRefresh.ts
interface RefreshState {
  canRefresh: boolean
  cooldownSeconds: number
}

export const useIpRefresh = (): RefreshState => {
  // Implementation
}
```

**Rules:**

- Types used in 2+ files → `types/index.ts`
- Types used in 1 file only → co-located with implementation
- Always export types that might be reused
- Import from `types/index.ts` using auto-import (Nuxt handles it)

---

## Format Patterns

**API Response Formats:**

**Pattern:** Direct response (no wrapper)

**Rules:**

- Return data directly without wrapper object
- Use HTTP status codes for success/error indication
- Errors thrown via `createError()` (Nuxt built-in)
- Consistent field naming (camelCase)

**Success Response Example:**

```typescript
// server/api/geolocation.get.ts
export default defineCachedEventHandler(async event => {
  const ip = getRequestIP(event)

  const data = await $fetch(`http://ip-api.com/json/${ip}`)

  // Return direct data (transformed to camelCase)
  return {
    ip: data.query,
    country: data.country,
    countryCode: data.countryCode,
    region: data.region,
    regionName: data.regionName,
    city: data.city,
    zip: data.zip,
    lat: data.lat,
    lon: data.lon,
    timezone: data.timezone,
    isp: data.isp,
    org: data.org,
    as: data.as,
  }
})
```

**Error Response Example:**

```typescript
// server/api/geolocation.get.ts
export default defineEventHandler(async event => {
  try {
    const data = await $fetch('...')
    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch geolocation data',
    })
  }
})
```

**Client receives:**

```json
// Success (200)
{
  "ip": "1.2.3.4",
  "country": "Canada",
  "city": "Montreal"
}

// Error (500)
{
  "statusCode": 500,
  "message": "Failed to fetch geolocation data"
}
```

**Data Exchange Formats:**

**JSON Field Naming:**

**Pattern:** camelCase for all JSON fields

**Transformation Rule:**

- External APIs (ip-api.com) may return `snake_case`
- Transform to `camelCase` in server API routes
- Frontend always receives `camelCase`

**Example Transformation:**

```typescript
// External API response (snake_case)
const externalData = {
  query: '1.2.3.4',
  country_code: 'CA',
  region_name: 'Quebec',
}

// Transform to camelCase for frontend
const transformedData = {
  ip: externalData.query,
  countryCode: externalData.country_code,
  regionName: externalData.region_name,
}
```

**Date/Time Format:**

**Pattern:** ISO 8601 strings (JavaScript standard)

**Rules:**

- Always use `toISOString()` for dates
- Server sends ISO strings
- Client parses with `new Date(isoString)`
- Display formatting happens in UI layer (Vue components)

**Examples:**

```typescript
// ✅ GOOD
const timestamp = new Date().toISOString()
// "2026-01-23T10:30:00.000Z"

const date = new Date(timestamp)
// Display: formatDate(date) in component

// ❌ BAD
const timestamp = Date.now() // Unix timestamp (harder to read)
const dateString = date.toString() // Non-standard format
const formatted = '2026-01-23' // Pre-formatted (lose timezone)
```

**Boolean Representations:**

**Pattern:** JSON boolean primitives (`true`/`false`)

```typescript
// ✅ GOOD
{ isActive: true, canRefresh: false }

// ❌ BAD
{ isActive: 1, canRefresh: 0 }        // Numeric booleans
{ isActive: "true", canRefresh: "false" } // String booleans
```

**Null Handling:**

**Pattern:** Use `null` for absent values, never `undefined` in JSON

```typescript
// ✅ GOOD
{
  ip: "1.2.3.4",
  city: null  // City unknown
}

// ❌ BAD
{
  ip: "1.2.3.4",
  city: undefined  // Not valid JSON
}
// or omit the field entirely
{
  ip: "1.2.3.4"
  // city field missing - unclear if null or not fetched
}
```

---

## Communication Patterns

**Toast Notification Structure:**

**Pattern:** NuxtUI toast API with consistent structure

**Rules:**

- Always use `useToast()` composable
- Provide `title` (required), `description` (optional), `icon`, `color`
- Use semantic colors: `green` (success), `red` (error), `yellow` (warning), `blue` (info)
- Set `timeout: 0` for persistent notifications (errors)
- Use Heroicons for icons (`i-heroicons-*`)

**Success Toast Example:**

```typescript
const toast = useToast()

toast.add({
  title: 'IP Copied!',
  description: 'Your IP address is now in your clipboard',
  icon: 'i-heroicons-check-circle',
  color: 'green',
  timeout: 3000, // 3 seconds
})
```

**Error Toast Example:**

```typescript
toast.add({
  title: 'Copy Failed',
  description: 'Please try again',
  icon: 'i-heroicons-exclamation-triangle',
  color: 'red',
  timeout: 0, // Persistent until dismissed
})
```

**Info Toast Example:**

```typescript
toast.add({
  title: 'Rate Limit',
  description: 'Please wait 10 seconds before refreshing',
  icon: 'i-heroicons-information-circle',
  color: 'blue',
  timeout: 5000,
})
```

**State Management Patterns:**

**Error State in Composables:**

**Pattern:** Return error as `Ref<Error | null>`

**Rules:**

- Always initialize as `ref<Error | null>(null)`
- Set to `Error` object on failure
- Reset to `null` on success
- Let component decide how to display error

**Example:**

```typescript
export const useGeolocation = () => {
  const geolocation = ref<GeolocationData | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchGeolocation = async () => {
    loading.value = true
    error.value = null // Reset previous error

    try {
      const data = await $fetch('/api/geolocation')
      geolocation.value = data
    } catch (e) {
      error.value = e as Error
      // Component will check error.value and display UI
    } finally {
      loading.value = false
    }
  }

  return { geolocation, loading, error, fetchGeolocation }
}
```

**Loading State Naming:**

**Pattern:** Descriptive boolean refs with `is` prefix or specific action name

**Rules:**

- Generic loading: `loading` or `isLoading`
- Specific actions: `isRefreshing`, `isSubmitting`, `isFetching`
- Always boolean ref
- Set to `true` before async operation, `false` after (use `finally`)

**Examples:**

```typescript
// ✅ GOOD
const loading = ref(false) // Generic loading
const isRefreshing = ref(false) // Specific action
const isSubmitting = ref(false) // Form submission
const isCopying = ref(false) // Copy action

// ❌ BAD
const load = ref(false) // Not clear it's a boolean
const refreshing = ref(false) // Missing 'is' prefix
const loadingState = ref(false) // Redundant 'State' suffix
```

**Event Naming (if needed):**

**Pattern:** kebab-case with namespace (rarely needed in this project)

**Example:**

```typescript
// Custom events (if needed)
emit('ip:detected', ipAddress)
emit('geolocation:failed', error)
```

---

## Process Patterns

**Error Handling Patterns:**

**Three-Layer Error Handling Strategy:**

**Layer 1: Composable Error Capture**

```typescript
// composables/useGeolocation.ts
export const useGeolocation = () => {
  const error = ref<Error | null>(null)

  const fetchGeolocation = async () => {
    try {
      const data = await $fetch('/api/geolocation')
      geolocation.value = data
      error.value = null
    } catch (e) {
      error.value = e as Error
      // Don't throw - let component handle
    }
  }

  return { geolocation, error, fetchGeolocation }
}
```

**Layer 2: Component Error Display**

```vue
<template>
  <div>
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
      title="Location Unavailable"
      description="We couldn't determine your location. Your IP address is still visible above."
      :actions="[
        {
          label: 'Try Again',
          color: 'red',
          variant: 'outline',
          click: () => fetchGeolocation(),
        },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
const { geolocation, error, fetchGeolocation } = useGeolocation()
</script>
```

**Layer 3: Global Error Handler (for uncaught errors)**

```typescript
// plugins/errorHandler.ts
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Log to Sentry
    console.error('Uncaught Vue Error:', error, info)

    // Show user-friendly toast
    const toast = useToast()
    toast.add({
      title: 'Something went wrong',
      description: 'Please refresh the page',
      color: 'red',
      icon: 'i-heroicons-exclamation-triangle',
      timeout: 0,
    })
  }
})
```

**Error Message Guidelines:**

**Rules:**

- User-facing: Friendly, actionable, no technical jargon
- Logs/Sentry: Technical details, stack traces
- Always provide recovery action ("Try Again" button)

**Examples:**

```typescript
// ✅ GOOD (user-facing)
"We couldn't load your location. Please try again."
'Copy failed. Please try again.'
'Network error. Check your connection.'

// ❌ BAD (user-facing)
'API request to ip-api.com returned 503'
"TypeError: Cannot read property 'country' of undefined"
'CORS policy blocked the request'
```

**Loading State Patterns:**

**Pattern:** Boolean ref with try/finally

**Rules:**

- Set to `true` immediately before async operation
- Set to `false` in `finally` block (ensures cleanup)
- Show loading UI in component when `loading.value === true`
- Disable actions during loading

**Example:**

```typescript
export const useIpDetection = () => {
  const ipAddress = ref<string>('')
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const detectIp = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch('/api/ip')
      ipAddress.value = data.ip
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false // Always cleanup
    }
  }

  return { ipAddress, loading, error, detectIp }
}
```

**Component Loading UI:**

```vue
<template>
  <div>
    <USkeleton v-if="loading" class="h-12 w-48" />
    <div v-else class="text-4xl">{{ ipAddress }}</div>

    <UButton :loading="isRefreshing" :disabled="isRefreshing" @click="refresh"> Refresh </UButton>
  </div>
</template>
```

**Retry Logic Pattern:**

**Pattern:** Manual retry via user action (no automatic retries)

**Rules:**

- No automatic retries (user control)
- Provide explicit "Try Again" button on errors
- Clear error message explaining what failed
- Rate limiting prevents abuse of retry

**Example:**

```vue
<template>
  <UAlert
    v-if="error"
    color="red"
    title="Location Unavailable"
    :actions="[
      {
        label: 'Try Again',
        click: () => fetchGeolocation(),
      },
    ]"
  />
</template>
```

---

## Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow Naming Conventions:**
   - Composables: `useFeatureName` format
   - Components: PascalCase without prefix
   - Types: PascalCase without `I` prefix
   - Variables/Functions: camelCase
   - Constants: UPPER_SNAKE_CASE
   - API routes: Nuxt 4 `[name].[method].ts` format

2. **Maintain Project Structure:**
   - Components in `app/components/` (flat)
   - Composables in `app/composables/` (flat)
   - Tests in `tests/unit/` and `tests/e2e/` (separated)
   - Types in `types/index.ts` (shared) or co-located (specific)
   - No nested folders unless project grows beyond 20+ files per category

3. **Use Consistent Formats:**
   - API responses: Direct (no wrapper)
   - JSON fields: camelCase
   - Dates: ISO 8601 strings
   - Errors: `{ message, statusCode }` format
   - Booleans: `true`/`false` (not 1/0 or strings)

4. **Follow Error Handling Pattern:**
   - Try/catch in composables → set error ref
   - Component displays user-friendly error UI
   - Global handler logs to Sentry
   - Always provide "Try Again" recovery action

5. **Implement Loading States Correctly:**
   - Boolean ref with descriptive name
   - Set in try/finally pattern
   - Disable actions during loading
   - Show loading UI (skeleton, spinner, disabled button)

6. **Use NuxtUI Toast API:**
   - Consistent structure: title, description, icon, color, timeout
   - Semantic colors: green (success), red (error), blue (info), yellow (warning)
   - Heroicons for icons
   - Timeout: 3s (success), 0 (error/persistent)

**Pattern Verification:**

**During Code Review:**

- Check all new files follow naming conventions
- Verify error handling uses three-layer pattern
- Confirm loading states use try/finally
- Validate API responses match format pattern
- Ensure types are properly defined and exported

**Automated Checks (ESLint/TypeScript):**

- ESLint enforces camelCase/PascalCase naming
- TypeScript strict mode prevents `any` types
- Prettier enforces consistent formatting
- Pre-commit hooks validate all patterns

**CI/CD Quality Gates:**

- Lint check fails if naming violations
- Type check fails if type errors
- Tests fail if patterns not followed
- Build fails if imports are incorrect

**Pattern Updates:**

**Process for Changing Patterns:**

1. Discuss change rationale with team (or in architecture doc)
2. Update this section of architecture document
3. Refactor existing code to match new pattern (if needed)
4. Update tests to validate new pattern
5. Communicate change to all contributors

**When to Update Patterns:**

- Pattern causes implementation conflicts
- Better pattern discovered through experience
- Technology upgrade requires pattern change
- Scalability requires restructuring

---

## Pattern Examples

**Good Examples (Follow These):**

**Composable with Full Pattern:**

```typescript
// composables/useGeolocation.ts
import type { GeolocationData } from '~/types'

export const useGeolocation = () => {
  const geolocation = ref<GeolocationData | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchGeolocation = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<GeolocationData>('/api/geolocation')
      geolocation.value = data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    geolocation: readonly(geolocation),
    loading: readonly(loading),
    error: readonly(error),
    fetchGeolocation,
  }
}
```

**Component with Full Pattern:**

```vue
<!-- components/GeolocationCard.vue -->
<template>
  <UCard>
    <template v-if="loading">
      <USkeleton class="h-8 w-64 mb-2" />
      <USkeleton class="h-6 w-48" />
    </template>

    <template v-else-if="error">
      <UAlert
        color="red"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        title="Location Unavailable"
        description="We couldn't determine your location."
        :actions="[
          {
            label: 'Try Again',
            color: 'red',
            variant: 'outline',
            click: () => fetchGeolocation(),
          },
        ]"
      />
    </template>

    <template v-else-if="geolocation">
      <h2 class="text-xl font-semibold mb-4">Your Location</h2>
      <dl class="space-y-2">
        <div>
          <dt class="text-sm text-gray-500">Country</dt>
          <dd class="text-base font-medium">{{ geolocation.country }}</dd>
        </div>
        <div>
          <dt class="text-sm text-gray-500">City</dt>
          <dd class="text-base font-medium">{{ geolocation.city }}</dd>
        </div>
      </dl>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { geolocation, loading, error, fetchGeolocation } = useGeolocation()

onMounted(() => {
  fetchGeolocation()
})
</script>
```

**Server API Route with Full Pattern:**

```typescript
// server/api/geolocation.get.ts
export default defineCachedEventHandler(
  async event => {
    const ip = getRequestIP(event)

    if (!ip) {
      throw createError({
        statusCode: 400,
        message: 'IP address not found',
      })
    }

    try {
      const response = await $fetch(`http://ip-api.com/json/${ip}`)

      // Transform snake_case to camelCase
      return {
        ip: response.query,
        country: response.country,
        countryCode: response.countryCode,
        region: response.region,
        regionName: response.regionName,
        city: response.city,
        zip: response.zip,
        lat: response.lat,
        lon: response.lon,
        timezone: response.timezone,
        isp: response.isp,
        org: response.org,
        as: response.as,
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch geolocation data',
      })
    }
  },
  {
    maxAge: 60 * 5, // 5 minutes cache
    getKey: event => getRequestIP(event) || 'unknown',
  }
)
```

---

**Anti-Patterns (Avoid These):**

**❌ Wrong Naming:**

```typescript
// composables/ipDetection.ts - Missing 'use' prefix
export const ipDetection = () => {}

// components/ip-display.vue - Wrong case
// components/IPDisplay.vue - Wrong case for 'IP'

// server/api/getIp.ts - Missing HTTP method suffix
```

**❌ Inconsistent Error Handling:**

```typescript
// ❌ BAD: Throwing errors from composables
export const useGeolocation = () => {
  const fetchGeolocation = async () => {
    try {
      const data = await $fetch('/api/geolocation')
      return data
    } catch (e) {
      throw e // ❌ Don't throw - set error ref instead
    }
  }
}

// ❌ BAD: Not providing recovery action
<template>
  <div v-if="error">Error occurred</div> <!-- ❌ No "Try Again" button -->
</template>
```

**❌ Missing Loading State Cleanup:**

```typescript
// ❌ BAD: Not using finally
const fetchData = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/data')
    loading.value = false // ❌ Won't run if error thrown
  } catch (e) {
    error.value = e
    loading.value = false // ❌ Duplicated cleanup
  }
}

// ✅ GOOD: Use finally
const fetchData = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/data')
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false // ✅ Always runs
  }
}
```

**❌ Wrong API Response Format:**

```typescript
// ❌ BAD: Wrapped response
return {
  success: true,
  data: { ip: '1.2.3.4' },
}

// ✅ GOOD: Direct response
return {
  ip: '1.2.3.4',
}
```

**❌ Inconsistent JSON Field Naming:**

```typescript
// ❌ BAD: Mixed naming conventions
return {
  ipAddress: '1.2.3.4', // camelCase
  country_code: 'CA', // snake_case ❌
  'region-name': 'Quebec', // kebab-case ❌
}

// ✅ GOOD: Consistent camelCase
return {
  ipAddress: '1.2.3.4',
  countryCode: 'CA',
  regionName: 'Quebec',
}
```

**❌ Wrong File Organization:**

```
// ❌ BAD: Nested without reason (small project)
app/components/ip/Display.vue
app/components/ip/Card.vue
app/composables/ip/detection.ts
app/composables/ip/geolocation.ts

// ✅ GOOD: Flat structure (small project)
app/components/IpDisplay.vue
app/components/GeolocationCard.vue
app/composables/useIpDetection.ts
app/composables/useGeolocation.ts
```

---

**Summary of Critical Patterns:**

1. **Naming:** camelCase variables/functions, PascalCase components/types, UPPER_SNAKE_CASE constants
2. **Structure:** Flat folders for small project, tests separated in `tests/`
3. **Formats:** Direct API responses, camelCase JSON, ISO dates
4. **Errors:** Three-layer handling (composable → component → global)
5. **Loading:** Boolean ref with try/finally pattern
6. **Consistency:** All agents follow same patterns, no exceptions

**When in Doubt:**

- Check existing code for pattern precedent
- Reference this architecture document
- Ask for clarification rather than guessing
- Consistency > personal preference

---
