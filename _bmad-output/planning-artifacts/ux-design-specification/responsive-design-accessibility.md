# Responsive Design & Accessibility

## Responsive Strategy

**Philosophy:** Mobile-first, progressively enhanced design that maintains simplicity and clarity across all screen sizes.

### Design Approach

**Core Principle: Centered Simplicity Across All Devices**

what-is-my-ip employs a **single-column, centered layout** strategy that adapts gracefully from the smallest mobile device (320px) to large desktop displays (1280px+). The design maintains visual consistency while optimizing for each device context.

**Why This Approach:**
- **Simplicity First:** Single-column layout eliminates complexity, perfect for instant IP lookup
- **Content-Focused:** No sidebars or multi-column distractions, user sees their IP immediately
- **Universal Usability:** Same mental model across all devices, zero learning curve
- **Performance:** Minimal layout shifts between breakpoints, optimized for Core Web Vitals

---

### Device-Specific Strategies

**Mobile Strategy (320px - 639px)**

**Viewport Range:** 320px minimum to 639px maximum

**Layout Adaptations:**
- **Single-column layout:** All content stacked vertically
- **Full-width cards:** UContainer with padding-x for edge breathing room
- **Large touch targets:** 48px minimum height for all interactive elements
- **Bottom-aligned actions:** Primary actions (Copy IP) positioned for thumb reach
- **Reduced spacing:** 16px vertical spacing (space-y-4) between elements
- **Optimized typography:** 32px IP address (text-3xl), 16px body text

**Mobile-Specific Optimizations:**
- **Toast notifications:** Full-width, top-center position for visibility
- **Map links:** Open in native maps app (iOS Maps, Google Maps)
- **Reduced animation:** 200ms transitions (faster for perceived performance)
- **Simplified footer:** Stacked vertical links, larger touch targets

**Critical Mobile Considerations:**
- **Thumb Zone Optimization:** Primary actions (Copy IP) within easy reach (bottom 2/3 of screen)
- **Network Awareness:** SSR ensures instant render even on slow 3G/4G
- **Haptic Feedback:** Vibration on button press (iOS/Android native)
- **Viewport Lock:** Prevent zoom on input focus (user-scalable=no for specific inputs)

---

**Tablet Strategy (640px - 1023px)**

**Viewport Range:** 640px (sm) to 1023px (lg)

**Layout Adaptations:**
- **Centered content:** Max-width container (640px - 768px) for optimal reading
- **Increased spacing:** 24px vertical spacing (space-y-6) between elements
- **Medium touch targets:** 44px minimum (WCAG 2.1 AA compliant)
- **Balanced typography:** 48px IP address (text-5xl), 18px body text
- **Horizontal button groups:** Copy + Refresh side-by-side when space allows

**Tablet-Specific Optimizations:**
- **Touch-optimized interactions:** Both mouse and touch input supported seamlessly
- **Landscape mode:** Wider max-width (768px) for landscape orientation
- **Gesture support:** Swipe to refresh (optional enhancement)
- **Split keyboard:** Layout adjusts when iOS split keyboard appears

**Tablet Considerations:**
- **Hybrid Input:** Design for both touch and mouse pointer (hover states still valuable)
- **Orientation Changes:** Smooth transitions between portrait/landscape (no layout shift jank)
- **Multitasking:** iPad Split View support (minimum 320px width maintained)

---

**Desktop Strategy (1024px+)**

**Viewport Range:** 1024px to 1280px maximum

**Layout Adaptations:**
- **Max-width container:** 1280px maximum (prevents over-stretching on ultrawide displays)
- **Generous spacing:** 32px vertical spacing (space-y-8) between elements
- **Precise interactions:** 40px buttons (smaller than mobile, optimized for mouse)
- **Large typography:** 64px IP address (text-6xl), 20px body text
- **Hover states:** Rich hover interactions (color transitions, underlines, shadows)
- **Keyboard shortcuts:** Cmd/Ctrl+C shortcut hint visible on hover

**Desktop-Specific Optimizations:**
- **Extra screen real estate:** Use whitespace effectively, don't over-pack
- **Multi-column footer:** Links arranged horizontally with generous spacing
- **Enhanced animations:** 300ms smooth transitions (users expect polish on desktop)
- **Cursor affordances:** Pointer cursors, hover states, tooltips for enhanced discoverability

**Desktop Considerations:**
- **Keyboard-First:** Tab navigation optimized, focus indicators prominent
- **Multi-Monitor:** Design works on secondary displays (high contrast, large text)
- **Accessibility Tools:** Works with browser zoom (200%+), high contrast mode, screen readers

---

## Breakpoint Strategy

**Mobile-First Approach:** Design starts at 320px, progressively enhances for larger screens.

### Breakpoint Definitions

**Standard Breakpoints (Tailwind/NuxtUI defaults):**

```css
/* Mobile (default, no media query) */
320px - 639px

/* Tablet (sm) */
@media (min-width: 640px) { ... }

/* Tablet Landscape / Small Desktop (md) */
@media (min-width: 768px) { ... }

/* Desktop (lg) */
@media (min-width: 1024px) { ... }

/* Large Desktop (xl) */
@media (min-width: 1280px) { ... }

/* Ultra-wide (2xl) */
@media (min-width: 1536px) { ... }
```

**what-is-my-ip Active Breakpoints:**

We use **3 primary breakpoints** for simplicity:

1. **Mobile:** 320px - 639px (default, no media query)
2. **Tablet:** 640px - 1023px (`sm` and `md` breakpoints)
3. **Desktop:** 1024px+ (`lg`, `xl`, `2xl` breakpoints)

**Rationale:**
- **Simplicity:** Three breakpoints cover 99% of devices without over-engineering
- **NuxtUI Alignment:** Leverages Tailwind's default breakpoints (no custom config)
- **Performance:** Fewer media queries = smaller CSS bundle
- **Maintainability:** Developers only need to think about mobile, tablet, desktop

---

### Layout Behavior Across Breakpoints

**320px - 639px (Mobile):**
```vue
<UContainer class="px-4 py-8">
  <UCard class="text-center">
    <!-- Single column, stacked content -->
    <h1 class="text-3xl">{{ ipAddress }}</h1>
    <p class="text-base mt-4">{{ location }}</p>
    <UButton size="lg" class="w-full mt-6">Copy IP</UButton>
  </UCard>
</UContainer>
```

**640px - 1023px (Tablet):**
```vue
<UContainer class="px-6 py-12 max-w-2xl mx-auto">
  <UCard class="text-center">
    <!-- Centered, wider card -->
    <h1 class="text-5xl">{{ ipAddress }}</h1>
    <p class="text-lg mt-6">{{ location }}</p>
    <div class="flex gap-3 justify-center mt-8">
      <UButton size="lg">Copy IP</UButton>
      <UButton variant="outline">Refresh</UButton>
    </div>
  </UCard>
</UContainer>
```

**1024px+ (Desktop):**
```vue
<UContainer class="px-8 py-16 max-w-4xl mx-auto">
  <UCard class="text-center py-12">
    <!-- Generous spacing, max-width constrained -->
    <h1 class="text-6xl">{{ ipAddress }}</h1>
    <p class="text-xl mt-8">{{ location }}</p>
    <div class="flex gap-4 justify-center mt-10">
      <UButton size="xl">Copy IP</UButton>
      <UButton variant="outline" size="lg">Refresh</UButton>
    </div>
  </UCard>
</UContainer>
```

---

### Content Priority by Device

**Mobile (Most Restrictive):**
- ✅ IP Address (hero, 32px)
- ✅ Location (city, country)
- ✅ Copy IP button (primary action)
- ✅ Refresh button (secondary)
- ⚠️ Map link (below fold, optional)
- ⚠️ Footer links (minimal, collapsed)

**Tablet (Balanced):**
- ✅ All mobile content
- ✅ Map link (more prominent)
- ✅ Footer links (horizontal layout)
- ✅ Additional geolocation details (ISP, timezone if available)

**Desktop (Most Generous):**
- ✅ All tablet content
- ✅ Keyboard shortcut hints (Cmd+C to copy)
- ✅ Enhanced footer (multiple columns, more links)
- ✅ Optional: IP history (if implemented later)

---

## Breakpoint Testing Strategy

**Manual Testing Targets:**

**Physical Devices (Priority):**
- iPhone SE (375px) - Smallest common device
- iPhone 14/15 Pro (393px) - Modern iOS standard
- Samsung Galaxy S23 (360px) - Android standard
- iPad Air (820px landscape) - Tablet landscape
- MacBook Pro 14" (1512px) - Desktop standard

**Browser DevTools Emulation:**
- Chrome DevTools responsive mode (320px → 1920px sweep)
- Firefox Responsive Design Mode
- Safari Web Inspector (iOS device simulation)

**Automated Testing:**
- Lighthouse CI: Test at 375px (mobile) and 1920px (desktop)
- Percy.io visual regression (if budget allows)
- Playwright tests at all 3 breakpoints

---

## Accessibility Strategy

**Target Compliance: WCAG 2.1 Level AA (Non-Negotiable)**

**Lighthouse Accessibility Score: 100/100**

### WCAG 2.1 Level AA Requirements

**Perceivable:**

**1.3.1 Info and Relationships (Level A):**
- Semantic HTML structure (`<main>`, `<header>`, `<footer>`, `<nav>`)
- Proper heading hierarchy (H1 for IP address, H2 for sections)
- ARIA landmarks where semantic HTML isn't sufficient

**1.4.3 Contrast (Minimum) (Level AA):**
- **Normal Text:** 4.5:1 contrast ratio minimum
  - NuxtUI gray.900 on white (21:1 ✅)
  - NuxtUI gray.300 on gray.900 dark mode (7:1 ✅)
- **Large Text (18px+):** 3:1 contrast ratio minimum
  - IP address display: gray.900 on white (21:1 ✅)
- **UI Components:** 3:1 contrast ratio for interactive elements
  - Buttons, links, form controls all meet 3:1 minimum

**NuxtUI Default Colors (Pre-Validated):**
- Primary (green.500): 4.5:1 on white ✅
- Error (red.500): 4.5:1 on white ✅
- Success (green.500): 4.5:1 on white ✅

**1.4.4 Resize Text (Level AA):**
- Text can be resized to 200% without loss of content or functionality
- Use `rem` units exclusively (never `px` for font sizes)
- Test with browser zoom at 200%, 300%, 400%

**1.4.5 Images of Text (Level AA):**
- No images of text (all text rendered as actual text)
- IP address displayed as HTML text, not canvas/image
- Logo (if any) is SVG with accessible text alternative

---

**Operable:**

**2.1.1 Keyboard (Level A):**
- All functionality available via keyboard
- Tab order: Hero content → Copy button → Refresh → Map link → Footer links
- No keyboard traps (focus can always escape)

**2.1.2 No Keyboard Trap (Level A):**
- Modals (if any) can be closed with Escape key
- Toast notifications dismissible with Escape
- No infinite tab loops

**2.4.3 Focus Order (Level A):**
- Logical focus order: top to bottom, left to right
- Primary action (Copy IP) focused first after page load (optional, user preference)

**2.4.7 Focus Visible (Level AA):**
- Visible focus indicators on all interactive elements
- NuxtUI default focus ring: 2px offset, primary color
- High contrast focus ring in high contrast mode

**2.5.5 Target Size (Level AAA - We're implementing this despite AA target):**
- **Mobile:** 48x48px minimum touch targets
- **Desktop:** 44x44px minimum (AA requirement: 24x24px, we exceed)
- Spacing between targets: 8px minimum

---

**Understandable:**

**3.1.1 Language of Page (Level A):**
- `<html lang="en">` attribute set correctly
- French version: `<html lang="fr">` (if multi-language support added)

**3.2.1 On Focus (Level A):**
- No unexpected context changes when element receives focus
- Focus on button doesn't trigger action (requires click/Enter)

**3.2.2 On Input (Level A):**
- No unexpected behavior when user interacts with controls
- Copy button requires explicit activation (click/Enter/Space)

**3.3.1 Error Identification (Level A):**
- Errors clearly identified with color + text + icon (not color alone)
- API errors: Red icon + "Location Unavailable" text + "Try Again" action

**3.3.3 Error Suggestion (Level AA):**
- Errors provide recovery suggestions
- Network timeout: "Check your network connection" + "Try Again" button

---

**Robust:**

**4.1.2 Name, Role, Value (Level A):**
- All UI components have accessible names
- Buttons: `<UButton aria-label="Copy IP address to clipboard">`
- Links: `<ULink aria-label="View location on Google Maps">`
- Icons: Include `aria-hidden="true"` for decorative icons, descriptive text for functional icons

**4.1.3 Status Messages (Level AA):**
- Toast notifications use ARIA live regions
- Success: `<div role="status" aria-live="polite">`
- Errors: `<div role="alert" aria-live="assertive">`
- Loading states: `aria-busy="true"` on buttons during async operations

---

### Screen Reader Optimization

**Semantic Structure:**

```html
<html lang="en">
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header role="banner">
    <h1>What Is My IP</h1>
  </header>

  <main id="main-content" role="main">
    <section aria-labelledby="ip-heading">
      <h2 id="ip-heading" class="sr-only">Your IP Address</h2>
      <div aria-label="IP Address: 192.168.1.1" class="text-6xl">
        192.168.1.1
      </div>
    </section>

    <section aria-labelledby="location-heading">
      <h2 id="location-heading" class="sr-only">Your Location</h2>
      <p>Montreal, Canada</p>
    </section>

    <div role="group" aria-label="Actions">
      <button aria-label="Copy IP address to clipboard">
        Copy IP
      </button>
      <button aria-label="Refresh IP address">
        Refresh
      </button>
    </div>
  </main>

  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <a href="/about">About</a>
      <a href="https://github.com/mathieumaf/what-is-my-ip">
        View Source Code
      </a>
    </nav>
  </footer>
</body>
</html>
```

**ARIA Live Regions for Dynamic Content:**

```vue
<!-- Toast Notifications -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  {{ toastMessage }}
</div>

<!-- Loading States -->
<button :aria-busy="isLoading" :aria-label="isLoading ? 'Refreshing IP address' : 'Refresh IP address'">
  Refresh
</button>

<!-- Error Messages -->
<div role="alert" aria-live="assertive" v-if="hasError">
  Location unavailable. Try again.
</div>
```

**Screen Reader Testing Checklist:**

✅ **VoiceOver (macOS/iOS):**
- Navigate entire page with VoiceOver enabled
- Test rotor navigation (headings, links, form controls)
- Verify all interactive elements are announced correctly

✅ **NVDA (Windows):**
- Browse mode navigation
- Focus mode for interactive elements
- Verify ARIA labels and live regions

✅ **JAWS (Windows) (if available):**
- Forms mode testing
- Virtual cursor navigation
- Verify landmark navigation

---

### Keyboard Navigation

**Tab Order:**

1. Skip to main content link (visible on focus)
2. Hero IP address (focusable for screen reader context)
3. Copy IP button (primary action)
4. Refresh button
5. View on Map link
6. Footer links (GitHub, About, etc.)

**Keyboard Shortcuts:**

**Primary Actions:**
- `Tab` - Navigate forward through interactive elements
- `Shift + Tab` - Navigate backward
- `Enter` / `Space` - Activate focused button/link
- `Escape` - Dismiss toast notifications, close modals (if any)

**Optional Enhancements (Future):**
- `Cmd/Ctrl + C` - Global copy shortcut (when focus anywhere on page)
- `Cmd/Ctrl + R` - Global refresh shortcut
- `?` - Show keyboard shortcuts help modal

**Focus Management:**

```vue
<template>
  <!-- Skip Link (visible on focus) -->
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <!-- Focus Ring Styles -->
  <UButton
    class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
  >
    Copy IP
  </UButton>

  <!-- Focus Trap in Modals -->
  <UModal v-model="isOpen" trap-focus>
    <!-- Modal content -->
  </UModal>
</template>

<style>
/* Skip Link Styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* High Contrast Focus Indicators */
@media (prefers-contrast: high) {
  *:focus {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }
}
</style>
```

---

### Color Accessibility

**Color Blindness Considerations:**

**Protanopia (Red-Blind) & Deuteranopia (Green-Blind):**
- Don't rely on red/green alone for success/error states
- Success: Green + Checkmark icon + "Success" text
- Error: Red + Exclamation icon + "Error" text

**Tritanopia (Blue-Blind):**
- Blue info notifications include info icon + "Info" text
- Links underlined on hover (not just color change)

**Testing Tools:**
- Chrome DevTools: Emulate vision deficiencies
- Stark plugin: Real-time color blindness simulation
- Color Oracle: System-wide color blindness simulator

**NuxtUI Color Validation:**
- All NuxtUI semantic colors tested for color blindness accessibility
- Icons always accompany color-coded messages
- Underline + color change for links (not color alone)

---

## Testing Strategy

### Automated Accessibility Testing

**Lighthouse CI (Continuous Integration):**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
          configPath: './lighthouserc.json'
          uploadArtifacts: true
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "onlyCategories": ["accessibility", "performance", "best-practices"]
      }
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", {"minScore": 1}],
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

**Target Scores:**
- Accessibility: 100/100 (non-negotiable)
- Performance: 90+/100
- Best Practices: 90+/100

---

**Axe DevTools (Development & CI):**

```javascript
// tests/accessibility.spec.js
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Tab to Copy button
    await page.keyboard.press('Tab')
    await expect(page.locator('button:has-text("Copy IP")')).toBeFocused()

    // Activate with Enter
    await page.keyboard.press('Enter')
    await expect(page.locator('[role="status"]')).toContainText('IP Copied')
  })
})
```

---

**Pa11y CI (Automated WCAG Testing):**

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000?theme=dark"
  ]
}
```

---

### Manual Testing

**Screen Reader Testing:**

**VoiceOver (macOS):**
- Cmd + F5: Toggle VoiceOver
- VO + Right Arrow: Navigate forward
- VO + Left Arrow: Navigate backward
- VO + U: Open rotor (headings, links, landmarks)

**Test Scenarios:**
1. Navigate entire page with VoiceOver
2. Activate "Copy IP" button with VO + Space
3. Hear toast notification announcement
4. Navigate footer links with rotor
5. Test skip link with VO + Right Arrow from page load

**NVDA (Windows):**
- Ctrl + Alt + N: Start NVDA
- Insert + Down Arrow: Browse mode
- Insert + Space: Toggle focus/browse mode
- Insert + F7: Elements list

**Test Scenarios:**
1. Browse mode navigation (arrow keys)
2. Focus mode for buttons (Enter on button → focus mode)
3. Forms mode testing (if forms added later)
4. Landmark navigation (D key for main landmark)

---

**Keyboard-Only Testing:**

**Test Checklist:**
- [ ] Tab through entire page (no keyboard traps)
- [ ] Activate Copy IP with Enter/Space
- [ ] Activate Refresh with Enter/Space
- [ ] Dismiss toast with Escape
- [ ] Navigate footer links with Tab
- [ ] Use skip link (Tab from page load → Enter)
- [ ] Shift+Tab backward navigation works
- [ ] Focus indicators visible on all elements

**Testing Browsers:**
- Chrome (Windows/Mac)
- Firefox (Windows/Mac)
- Safari (Mac only)
- Edge (Windows)

---

**Color Contrast Testing:**

**Tools:**
- Chrome DevTools: Inspect → Accessibility pane → Contrast ratio
- Stark plugin: Real-time contrast checker
- WebAIM Contrast Checker: Manual verification

**Test Scenarios:**
- Normal text on light background (4.5:1 minimum)
- Large text on light background (3:1 minimum)
- Dark mode: Normal text (4.5:1 minimum)
- Dark mode: Large text (3:1 minimum)
- Button text contrast (4.5:1 minimum)
- Link contrast (4.5:1 minimum)

**All NuxtUI defaults pass WCAG AA contrast requirements** ✅

---

**Responsive Testing:**

**Physical Device Testing (Priority):**
- iPhone SE (iOS 17+): Smallest mobile device
- iPhone 14 Pro (iOS 17+): Standard iOS device
- Samsung Galaxy S23 (Android 13+): Standard Android device
- iPad Air (iPadOS 17+): Tablet testing
- MacBook Pro 14" (macOS): Desktop testing

**Browser DevTools Emulation:**
- Chrome: Responsive mode (320px → 1920px sweep)
- Firefox: Responsive Design Mode
- Safari: Responsive Design Mode (iOS device simulation)

**Test Scenarios:**
- Layout at 320px (smallest supported)
- Layout at 375px (iPhone SE)
- Layout at 393px (iPhone 14 Pro)
- Layout at 768px (iPad portrait)
- Layout at 1024px (desktop)
- Layout at 1920px (large desktop)
- Orientation change (portrait ↔ landscape)

---

### User Testing with Assistive Technologies

**Recruitment:**
- Recruit 2-3 users with disabilities (screen reader users, keyboard-only users, low vision users)
- Compensate fairly for their time ($50-100/hour industry standard)

**Testing Protocol:**
- **Task 1:** Navigate to site and find your IP address
- **Task 2:** Copy IP to clipboard using keyboard only
- **Task 3:** Refresh IP address and verify update
- **Task 4:** Navigate to GitHub link in footer

**Success Metrics:**
- 100% task completion rate
- No critical accessibility barriers identified
- Users feel experience is "as good as" non-assistive tech experience

---

## Implementation Guidelines

### Responsive Development Guidelines

**Use Relative Units:**

```vue
<!-- ❌ BAD: Fixed pixel values -->
<div style="font-size: 16px; padding: 20px; width: 500px">

<!-- ✅ GOOD: Relative units -->
<div class="text-base p-5 max-w-lg">
  <!-- Tailwind uses rem units under the hood -->
</div>
```

**Mobile-First Media Queries:**

```css
/* ✅ GOOD: Mobile-first (scales up) */
.container {
  padding: 1rem; /* Mobile default */
}

@media (min-width: 640px) {
  .container {
    padding: 1.5rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 2rem; /* Desktop */
  }
}

/* ❌ BAD: Desktop-first (scales down) */
.container {
  padding: 2rem; /* Desktop default */
}

@media (max-width: 1024px) {
  .container {
    padding: 1.5rem; /* Tablet */
  }
}
```

**Tailwind Responsive Classes:**

```vue
<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
    <h1 class="text-3xl sm:text-5xl lg:text-6xl">
      {{ ipAddress }}
    </h1>

    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
      <UButton size="lg" class="w-full sm:w-auto">Copy IP</UButton>
      <UButton variant="outline" class="w-full sm:w-auto">Refresh</UButton>
    </div>
  </div>
</template>
```

---

**Touch Target Sizes:**

```vue
<!-- Mobile: 48x48px minimum -->
<UButton
  size="lg"
  class="min-h-[48px] min-w-[48px] sm:min-h-[44px]"
>
  Copy IP
</UButton>

<!-- Spacing between touch targets: 8px minimum -->
<div class="flex gap-2 sm:gap-3">
  <UButton>Action 1</UButton>
  <UButton>Action 2</UButton>
</div>
```

---

**Viewport Configuration:**

```html
<!-- nuxt.config.ts or app.vue -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
  <!-- Allow zoom up to 5x for accessibility -->
  <!-- DO NOT use user-scalable=no (fails WCAG) -->
</head>
```

---

### Accessibility Development Guidelines

**Semantic HTML:**

```vue
<!-- ✅ GOOD: Semantic HTML -->
<template>
  <header role="banner">
    <h1>What Is My IP</h1>
  </header>

  <main role="main">
    <section aria-labelledby="ip-heading">
      <h2 id="ip-heading">Your IP Address</h2>
      <!-- Content -->
    </section>
  </main>

  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <!-- Links -->
    </nav>
  </footer>
</template>

<!-- ❌ BAD: Divs for everything -->
<template>
  <div class="header">
    <div class="title">What Is My IP</div>
  </div>

  <div class="content">
    <!-- Content -->
  </div>

  <div class="footer">
    <!-- Links -->
  </div>
</template>
```

---

**ARIA Labels and Roles:**

```vue
<template>
  <!-- Buttons with descriptive labels -->
  <UButton
    aria-label="Copy IP address to clipboard"
    @click="copyToClipboard"
  >
    <UIcon name="i-heroicons-clipboard-document" aria-hidden="true" />
    Copy IP
  </UButton>

  <!-- Links with external indication -->
  <ULink
    to="https://github.com/mathieumaf/what-is-my-ip"
    target="_blank"
    aria-label="View source code on GitHub (opens in new tab)"
  >
    View Source
    <UIcon name="i-heroicons-arrow-top-right-on-square" aria-hidden="true" />
  </ULink>

  <!-- Loading states -->
  <UButton
    :aria-busy="isLoading"
    :aria-label="isLoading ? 'Refreshing IP address...' : 'Refresh IP address'"
  >
    Refresh
  </UButton>

  <!-- Live regions for dynamic content -->
  <div role="status" aria-live="polite" aria-atomic="true">
    {{ statusMessage }}
  </div>
</template>
```

---

**Keyboard Navigation Implementation:**

```vue
<template>
  <!-- Skip link (hidden until focused) -->
  <a
    href="#main-content"
    class="skip-link absolute -top-10 left-0 bg-black text-white px-4 py-2 focus:top-0 z-50"
  >
    Skip to main content
  </a>

  <main id="main-content" tabindex="-1">
    <!-- Main content -->
  </main>
</template>

<script setup>
// Handle Escape key to dismiss toasts
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dismissToast()
    }
  })
})

// Optional: Global keyboard shortcuts
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + C to copy IP
    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      copyToClipboard()
    }

    // Cmd/Ctrl + R to refresh (prevent default browser refresh)
    if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
      e.preventDefault()
      refreshIP()
    }
  })
})
</script>
```

---

**Focus Management:**

```vue
<script setup>
const toast = useToast()
const copyButton = ref(null)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(ipAddress.value)
    toast.add({
      title: 'IP Copied!',
      icon: 'i-heroicons-check-circle'
    })

    // Return focus to copy button after toast appears
    nextTick(() => {
      copyButton.value?.$el.focus()
    })
  } catch (error) {
    toast.add({
      title: 'Copy Failed',
      color: 'red',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
}
</script>

<template>
  <UButton
    ref="copyButton"
    @click="copyToClipboard"
  >
    Copy IP
  </UButton>
</template>
```

---

**High Contrast Mode Support:**

```vue
<style>
/* Automatically adapts to Windows High Contrast Mode */
@media (prefers-contrast: high) {
  /* Increase border thickness */
  .btn {
    border-width: 2px;
  }

  /* Stronger focus indicators */
  *:focus {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }

  /* Ensure all icons have visible outlines */
  svg {
    stroke: currentColor;
    stroke-width: 2;
  }
}

/* Forced colors mode (Windows High Contrast) */
@media (forced-colors: active) {
  /* Let system colors take over */
  .btn {
    border: 2px solid ButtonText;
    background: ButtonFace;
    color: ButtonText;
  }

  .btn:hover {
    background: Highlight;
    color: HighlightText;
  }
}
</style>
```

---

## Accessibility Checklist (Pre-Launch)

**Before deploying to production, verify:**

- [ ] Lighthouse Accessibility score = 100/100
- [ ] Axe DevTools reports 0 violations
- [ ] Pa11y CI passes all tests
- [ ] VoiceOver navigation works flawlessly
- [ ] NVDA navigation works flawlessly
- [ ] Keyboard-only navigation (no traps, all functionality accessible)
- [ ] Color contrast validated (all elements pass 4.5:1 or 3:1 as appropriate)
- [ ] Touch targets meet 48x48px minimum (mobile)
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip link works correctly
- [ ] ARIA labels accurate and descriptive
- [ ] Live regions announce dynamic content
- [ ] Forms (if any) have labels and error messages
- [ ] Text can resize to 200% without breaking layout
- [ ] High contrast mode tested
- [ ] Dark mode contrast validated
- [ ] All images have alt text (decorative images: `alt=""`)
- [ ] Videos (if any) have captions and transcripts
- [ ] No content flashing more than 3 times per second (seizure risk)

---

## Implementation Priority

**Phase 1 (MVP - Must Have):**
- ✅ Semantic HTML structure
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation support
- ✅ Screen reader optimization
- ✅ Color contrast validation
- ✅ Mobile-first responsive design
- ✅ Touch target sizes (48px mobile, 44px desktop)
- ✅ Lighthouse Accessibility 100/100

**Phase 2 (Post-MVP - Nice to Have):**
- ⚠️ Global keyboard shortcuts (Cmd+C, Cmd+R)
- ⚠️ Keyboard shortcuts help modal (?)
- ⚠️ User preference persistence (dark mode choice)
- ⚠️ Haptic feedback (mobile devices)
- ⚠️ Reduced motion support (prefers-reduced-motion)
- ⚠️ High contrast mode enhancements

**Phase 3 (Future - Optional):**
- 🔮 WCAG 2.2 compliance (when finalized)
- 🔮 Multi-language support (i18n)
- 🔮 Voice control optimization (Siri, Google Assistant)
- 🔮 Percy.io visual regression testing

---
