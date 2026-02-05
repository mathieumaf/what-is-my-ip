# UX Consistency Patterns

These patterns ensure consistent, predictable interactions across all user touchpoints. All patterns leverage NuxtUI components with minimal customization, maintaining the "Default Excellence" philosophy.

---

## Feedback Patterns

**Philosophy:** Immediate, clear, non-intrusive feedback for all user actions.

### Toast Notifications (UNotification)

**When to Use:**

- Action confirmations (IP copied, refresh complete)
- Error messages (API failures, network timeouts)
- Informational messages (SSR warnings, feature notices)

**Visual Design:**

- **Component:** `UNotification` from NuxtUI
- **Position:** Top-right (standard web convention)
- **Duration:**
  - Success: 3 seconds auto-dismiss
  - Errors: Persistent until user dismisses
  - Info: 4 seconds auto-dismiss
- **Stacking:** Single toast at a time (new toast replaces old)

**Behavior:**

- Slide-in animation from right (60fps smooth)
- Fade-out on dismiss
- Click anywhere on toast to dismiss
- Close button always visible

**Notification Types:**

**1. Success Notifications**

```vue
// Example: IP Copied Successfully
<UNotification
  color="green"
  icon="i-heroicons-check-circle"
  title="IP Copied!"
  description="Your IP address is now in your clipboard"
/>
```

**Usage:**

- IP copied to clipboard
- Refresh completed successfully
- Data updated

**Visual Specs:**

- Background: NuxtUI green.500 (default success color)
- Icon: Checkmark circle (heroicons)
- Typography: Title 14px semibold, description 13px regular
- Auto-dismiss: 3 seconds

**2. Error Notifications**

```vue
// Example: API Geolocation Failed
<UNotification
  color="red"
  icon="i-heroicons-exclamation-triangle"
  title="Location Unavailable"
  description="We couldn't fetch your location data. Try again?"
  :actions="[
    {
      label: 'Try Again',
      click: () => retryGeolocation(),
    },
  ]"
/>
```

**Usage:**

- API geolocation failures
- Network timeout errors
- Unexpected errors

**Visual Specs:**

- Background: NuxtUI red.500 (default error color)
- Icon: Exclamation triangle (heroicons)
- Action button: Inline ghost variant
- Persistent: User must dismiss or click "Try Again"

**3. Info Notifications**

```vue
// Example: Feature Notice
<UNotification
  color="blue"
  icon="i-heroicons-information-circle"
  title="Pro Tip"
  description="Bookmark this page for instant IP lookups"
/>
```

**Usage:**

- Feature discovery hints
- SSR-related notices
- Non-critical information

**Visual Specs:**

- Background: NuxtUI blue.500 (default info color)
- Icon: Information circle (heroicons)
- Auto-dismiss: 4 seconds

**Accessibility:**

- ARIA live regions for screen readers
- Keyboard dismissible (Escape key)
- Focus trap when toast appears
- High contrast icons
- Minimum touch target: 44x44px for close button

**Mobile Considerations:**

- Full-width on mobile (< 640px)
- Top-center position on mobile for better reachability
- Larger touch targets (48x48px minimum)
- Reduced animation duration (200ms vs 300ms)

---

## Button Hierarchy

**Philosophy:** Clear visual hierarchy guides users to primary actions while keeping secondary options accessible.

### Primary Actions

**When to Use:** The single most important action on the page.

**Component:** `<UButton color="primary" size="lg" />`

**Example:** Copy IP Button

```vue
<UButton color="primary" size="lg" icon="i-heroicons-clipboard-document" @click="copyToClipboard">
  Copy IP
</UButton>
```

**Visual Specs:**

- NuxtUI primary color (default: green.500)
- Solid variant (highest visual weight)
- Large size: 48px height (lg)
- Icon + text label
- Prominent placement (primary card position)

**States:**

- **Default:** Solid primary color
- **Hover:** Darker shade (primary.600)
- **Active:** Even darker (primary.700)
- **Focus:** Focus ring visible (2px offset)
- **Disabled:** Opacity 50%, cursor not-allowed
- **Loading:** Spinner replaces icon, button disabled

**Behavior:**

- Instant visual feedback on click (< 100ms)
- Loading state during async operations
- Success state briefly shown (checkmark icon, 500ms)
- Returns to default state

**Application in what-is-my-ip:**

- Copy IP to Clipboard (primary action on hero card)

---

### Secondary Actions

**When to Use:** Important but not primary actions. Available on-demand.

**Component:** `<UButton color="gray" variant="outline" />`

**Examples:** Refresh IP, View on Map

```vue
<!-- Refresh Button -->
<UButton
  color="gray"
  variant="outline"
  icon="i-heroicons-arrow-path"
  :loading="isRefreshing"
  @click="refreshIP"
>
  Refresh
</UButton>

<!-- Map Link -->
<UButton color="gray" variant="ghost" icon="i-heroicons-map" :to="mapUrl" external>
  View on Map
</UButton>
```

**Visual Specs:**

- **Outline variant:** Border + transparent background
- **Ghost variant:** No border, transparent background (for links)
- Gray color (neutral, lower visual weight than primary)
- Medium size: 40px height (default)
- Icon + text or icon-only

**States:**

- **Default:** Gray.500 border/text
- **Hover:** Gray.700, light background fill
- **Active:** Gray.800
- **Focus:** Focus ring visible
- **Loading:** Spinner on icon position, button disabled

**Application in what-is-my-ip:**

- Refresh IP (outline variant)
- View on Map (ghost variant, external link)

---

### Tertiary Actions (Links)

**When to Use:** Navigation links, footer links, external references.

**Component:** `<ULink />`

**Example:** GitHub Repository Link

```vue
<ULink
  to="https://github.com/mathieumaf/what-is-my-ip"
  target="_blank"
  class="flex items-center gap-1"
>
  <UIcon name="i-heroicons-code-bracket" />
  View Source Code
</ULink>
```

**Visual Specs:**

- NuxtUI link default styles
- Primary color on hover
- Underline on hover (text-decoration)
- Icon + text combination

**States:**

- **Default:** Gray.700 (dark mode: gray.300)
- **Hover:** Primary color, underline
- **Focus:** Focus outline
- **Visited:** Same as default (no color change)

**Behavior:**

- External links: `target="_blank"` + `rel="noopener"`
- Icon indicates external links (i-heroicons-arrow-top-right-on-square)
- No underline by default, underline on hover only

**Application in what-is-my-ip:**

- Footer navigation links
- GitHub repository link
- Documentation links

---

## Button Consistency Rules

**Spacing Between Buttons:**

- Horizontal: 12px gap (space-x-3)
- Vertical: 16px gap (space-y-4)

**Icon Usage:**

- Always use icons for actions (enhances scannability)
- Icon position: Leading (left) for buttons
- Icon size: 20px for lg buttons, 16px for default buttons

**Loading States:**

- Always show loading spinner during async operations
- Disable button during loading (prevent double-clicks)
- Loading spinner replaces icon (maintains layout)

**Touch Targets:**

- Minimum 44x44px for mobile (WCAG 2.1)
- Primary buttons: 48px height minimum
- Increased padding on mobile (px-6 → px-8)

**Keyboard Navigation:**

- Tab order: Primary → Secondary → Tertiary
- Enter/Space activates button
- Focus visible on keyboard navigation
- Skip to main content link for screen readers

---

## Loading States

**Philosophy:** Users always know when something is happening. No confusion, no "is this working?" moments.

### Skeleton Screens (First Load)

**When to Use:** Initial page load while SSR data is rendering.

**Component:** Native SSR (Nuxt 4) - no skeleton needed (SSR renders complete page)

**Fallback:** If client-side navigation occurs, use skeleton:

```vue
<div v-if="isLoading" class="space-y-4">
  <USkeleton class="h-12 w-48" /> <!-- IP Address -->
  <USkeleton class="h-8 w-64" />  <!-- Location -->
  <USkeleton class="h-10 w-32" /> <!-- Button -->
</div>
```

**Visual Specs:**

- Matches final content dimensions
- Subtle animation (pulse effect)
- NuxtUI gray.200 background (dark: gray.800)
- Duration: Typically < 1s (SSR ensures fast render)

**Application:**

- Rare: SSR handles initial render
- Client-side navigation fallback only

---

### Inline Spinners (Button Actions)

**When to Use:** User-triggered async actions (refresh, copy, API calls).

**Component:** `UButton :loading="true"`

**Example:** Refresh Button Loading

```vue
<UButton
  color="gray"
  variant="outline"
  icon="i-heroicons-arrow-path"
  :loading="isRefreshing"
  :disabled="isRefreshing"
  @click="refreshIP"
>
  Refresh
</UButton>
```

**Visual Specs:**

- Spinner replaces button icon
- Button text remains visible
- Button disabled during loading
- Spinner: 16px, primary color

**Behavior:**

- Loading starts on click (< 100ms)
- Spinner animates (smooth rotation)
- Loading completes: Success toast + button returns to default
- Error: Error toast + button returns to default

**Duration Expectations:**

- Typical: 200-500ms (API response)
- Maximum: 5s (timeout threshold)
- If > 2s: Additional feedback ("Taking longer than expected...")

---

### Optimistic UI (Copy to Clipboard)

**When to Use:** Actions that are guaranteed to succeed instantly.

**Pattern:** Show success immediately, no loading state.

**Example:** Copy IP to Clipboard

```vue
const copyToClipboard = async () => { // Optimistic: Show success immediately showSuccess('IP
Copied!') try { await navigator.clipboard.writeText(ipAddress) } catch (error) { // Rollback: Show
error if copy actually failed showError('Copy failed. Please try again.') } }
```

**Rationale:**

- Clipboard API is instant (< 50ms)
- Failures are extremely rare (browser support is universal)
- Optimistic feedback feels more responsive
- Rollback handles edge cases gracefully

**Visual Feedback:**

- Button icon changes to checkmark (500ms)
- Success toast appears immediately
- Returns to default state after 500ms

**Application:**

- Copy IP button (primary use case)
- Any action with < 100ms execution time

---

## Loading State Rules

**Timing Thresholds:**

- **< 100ms:** No loading indicator (feels instant)
- **100ms - 1s:** Inline spinner only
- **1s - 5s:** Spinner + "Loading..." text
- **> 5s:** Timeout, show error with retry

**Accessibility:**

- ARIA `aria-busy="true"` during loading
- Screen reader announces "Loading" state
- Focus remains on triggering button
- Loading announced when state changes

**Mobile Considerations:**

- Larger spinners (20px vs 16px)
- Haptic feedback on loading start (vibration)
- Loading state more prominent (mobile networks slower)

---

## Error & Empty States

**Philosophy:** Errors are friendly, actionable, and never block core value.

### Inline Error Messages

**When to Use:** Recoverable errors (API failures, network timeouts).

**Component:** `UAlert` or inline message in card

**Example:** Geolocation API Failure

```vue
<UAlert
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
      click: () => retryGeolocation(),
    },
  ]"
/>
```

**Visual Specs:**

- Soft variant (subtle background, not alarming)
- Red color for errors (orange for warnings)
- Icon communicates severity
- Action button for recovery

**Tone:**

- **Friendly:** "We couldn't find your location"
- **NOT Technical:** ~~"API request to ipapi.co returned 503"~~
- **Actionable:** "Try Again" button present
- **Reassuring:** "Your IP address is still visible"

**Behavior:**

- Error appears inline (doesn't block UI)
- Core functionality still works (SSR IP visible)
- Retry button available
- Error dismissible (user can hide if not needed)

---

### Graceful Degradation Pattern

**When to Use:** Secondary features fail, but core value remains.

**Philosophy:** Never let secondary failures destroy core experience.

**Scenarios:**

**1. Geolocation API Fails**

```vue
<!-- Show IP (SSR, always works) -->
<div class="text-4xl font-bold">192.168.1.1</div>

<!-- Show graceful error for geolocation -->
<div class="text-gray-500">
  Location: <span class="italic">Unavailable</span>
  <UButton variant="link" @click="retry">Try Again</UButton>
</div>
```

**Result:** User still got their IP (primary value), location is bonus.

---

**2. JavaScript Fails to Load**

```html
<!-- SSR renders complete page -->
<div>
  <h1>Your IP Address</h1>
  <p class="text-4xl">192.168.1.1</p>
  <p>Location: Montreal, Canada</p>
  <!-- Copy button won't work, but IP is visible -->
  <a href="https://www.google.com/maps?q=45.5,-73.5">View on Map</a>
</div>
```

**Result:** Core value delivered, interactive features degrade gracefully.

---

**3. Network Timeout (> 5s)**

```vue
<UAlert
  color="orange"
  title="Taking Longer Than Expected"
  description="Your network might be slow. Still trying..."
  :actions="[
    {
      label: 'Cancel',
      click: () => cancelRequest(),
    },
  ]"
/>
```

**After 10s total:**

```vue
<UAlert
  color="red"
  title="Connection Timeout"
  description="We couldn't reach the server. Check your network connection."
  :actions="[
    {
      label: 'Try Again',
      click: () => retry(),
    },
  ]"
/>
```

---

### Empty State Pattern

**When to Use:** Feature not available yet, no data to show.

**Component:** Custom empty state with illustration (optional)

**Example:** No Geolocation Data Available

```vue
<div class="text-center py-8 text-gray-500">
  <UIcon name="i-heroicons-map" class="w-12 h-12 mx-auto mb-4" />
  <p class="font-medium">Location data unavailable</p>
  <p class="text-sm">Enable location services to see your approximate location</p>
</div>
```

**Visual Specs:**

- Centered content
- Muted colors (gray.500)
- Icon illustrating missing data
- Clear explanation (no technical jargon)
- Optional action (if applicable)

**Application in what-is-my-ip:**

- Rare: SSR ensures data is always present
- Fallback if both IP detection and geolocation fail (extremely rare)

---

## Error State Rules

**Error Hierarchy:**

**1. Critical Errors (Block Core Functionality)**

- **Example:** Can't detect IP at all
- **Treatment:** Full-page error with retry
- **Likelihood:** Extremely rare (< 0.1%)

**2. Feature Errors (Secondary Features Fail)**

- **Example:** Geolocation unavailable
- **Treatment:** Inline error, core value still accessible
- **Likelihood:** Low (< 5%)

**3. Action Errors (User Action Fails)**

- **Example:** Copy to clipboard failed
- **Treatment:** Toast notification with retry
- **Likelihood:** Very low (< 1%)

**Error Recovery Steps:**

- **1 click:** Retry failed action
- **Clear action:** Button labeled "Try Again" (not "Retry" or technical terms)
- **Alternative path:** Core value always accessible via SSR

**Accessibility:**

- ARIA `role="alert"` for errors
- Error announced to screen readers
- High contrast error colors (WCAG AA)
- Focus moves to error message for critical errors
- Retry button keyboard-accessible

**Mobile Considerations:**

- Larger error messages (more prominent)
- Touch-friendly "Try Again" buttons (48px height)
- Errors don't cover core content (inline, not modal)
- Network errors more prominent (mobile networks less reliable)

---

## Pattern Integration Summary

**How These Patterns Work Together:**

**Scenario: User Clicks "Copy IP"**

1. **Button State:** Loading spinner appears (< 100ms)
2. **Optimistic UI:** Success toast shows immediately
3. **Clipboard API:** Executes asynchronously
4. **Success:** Button shows checkmark (500ms), returns to default
5. **If Error:** Toast rolls back to error message with "Try Again"

**Scenario: Geolocation API Fails**

1. **SSR:** IP still visible (core value protected)
2. **Error State:** Inline alert shows friendly message
3. **Graceful Degradation:** Location shows "Unavailable"
4. **Recovery:** "Try Again" button available
5. **User Choice:** Can dismiss error, retry, or ignore

**Scenario: Network Timeout**

1. **Loading State:** Spinner shows during request
2. **5s threshold:** Warning toast appears ("Taking longer...")
3. **10s threshold:** Error toast with "Try Again"
4. **Fallback:** SSR data still visible (if page was SSR-rendered)
5. **Recovery:** One-click retry

**Consistency Principles:**

- **Feedback Timing:** All actions get feedback < 100ms
- **Error Tone:** Always friendly, never technical
- **Core Value:** Protected by SSR, always accessible
- **Recovery:** One-click retry for all errors
- **Hierarchy:** Primary action always most prominent
- **Accessibility:** Every pattern WCAG 2.1 AA compliant

---
