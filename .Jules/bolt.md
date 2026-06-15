## 2024-05-30 - Scroll Event Optimization in Vue
**Learning:** Using `getClientRects()[0]` in un-throttled scroll event listeners without cleanup causes memory leaks and layout thrashing in Vue components.
**Action:** Always throttle scroll events with `requestAnimationFrame`, use `getBoundingClientRect()`, add `{ passive: true }`, add null-safety checks for DOM elements managed by global state, and ensure cleanup in `unmounted()`.
