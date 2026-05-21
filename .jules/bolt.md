## 2024-05-24 - Optimize global scroll listener performance
**Learning:** Global scroll event listeners on Vue components can cause memory leaks and layout thrashing if not cleaned up properly in the `unmounted` hook, and if they rely on `getClientRects()[0]` without throttling.
**Action:** Always use `{ passive: true }`, `getBoundingClientRect()`, explicit throttling with `requestAnimationFrame`, and properly clean up the listener via `removeEventListener` and `cancelAnimationFrame` in the `unmounted()` hook. Also ensure null-safety checks on global DOM elements.
