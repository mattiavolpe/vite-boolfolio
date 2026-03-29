## 2024-05-24 - Unthrottled Global Scroll Listeners in Vue Router

**Learning:** Global event listeners (like `window.addEventListener('scroll')`) added in component `mounted` hooks that perform heavy DOM readings (e.g. `getClientRects()`) on every tick can block the main thread and severely degrade scroll performance. Additionally, if these are not removed in `unmounted`, they cause memory leaks and run unnecessarily on other routes. Storing non-reactive scroll states in `data()` also introduces unnecessary reactivity tracking overhead.

**Action:**
1. Always bind global event listeners to a throttled method, using `requestAnimationFrame` for layout-syncing.
2. Initialize purely internal state variables (like a scroll tracking flag or the bound handler function) in the `created()` lifecycle hook to prevent unnecessary reactivity.
3. Always remove global event listeners in the `unmounted()` hook.